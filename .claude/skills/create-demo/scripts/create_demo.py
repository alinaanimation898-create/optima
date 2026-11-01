#!/usr/bin/env python3
"""create-demo: website URL(s) -> crawl -> knowledge base -> demo tenant via /demo-admin -> presentation -> page -> smoke test.

Only talks to the demo-admin API, so it can never touch a live tenant. Run from the optima repo root.
"""
import argparse
import json
import os
import re
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

import crawler  # noqa: E402
import demo_api  # noqa: E402
import prompt_builder  # noqa: E402

REPO = os.getcwd()
DEMO_DIR = os.path.join(REPO, "demo")


def slugify(text: str) -> str:
    text = re.sub(r"https?://(www\.)?", "", text.lower().strip())
    text = re.sub(r"[\s\-_.]+", "_", text)
    return re.sub(r"[^a-z0-9_]", "", text).strip("_")[:32] or "demo_custom"


def kb_document(markdown: str) -> dict:
    return {
        "prompt_modules": [{
            "slug": "company_context",
            "name": "Контекст компании",
            "category": "core",
            "override_mode": "replace",
            "priority_order": 50,
            "allowed_roles": ["client"],
            "content": markdown,
        }]
    }


def git(*args) -> bool:
    return subprocess.run(["git", *args], cwd=REPO).returncode == 0


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--urls", nargs="+", required=True)
    ap.add_argument("--name", default="")
    ap.add_argument("--tenant-id", default="")
    ap.add_argument("--env", default="prod", choices=["prod", "stage"])
    ap.add_argument("--api-key", default="")
    ap.add_argument("--extra-materials", default="", help="file path or literal text")
    ap.add_argument("--kb-file", default="", help="pre-written company_context markdown (skips synthesis)")
    ap.add_argument("--questions", nargs="+", default=None)
    ap.add_argument("--accent", default="#f59e0b", help="brand color, e.g. #C8102E")
    ap.add_argument("--logo-url", default="")
    ap.add_argument("--no-page", action="store_true", help="skip demo/<id>/ page generation")
    ap.add_argument("--no-smoke-test", action="store_true")
    ap.add_argument("--commit", action="store_true", help="create branch demo/<id> and commit the generated files")
    args = ap.parse_args()

    api = demo_api.DemoApi(args.env, args.api_key)

    print(f"[1/6] Crawling {len(args.urls)} URL(s) ...")
    crawl = crawler.crawl_site(args.urls)
    domain = crawl.get("domain", "")
    base_url = crawl.get("base_url", args.urls[0])
    name = args.name.strip()
    if not name:
        title = crawl["pages"][0]["title"] if crawl.get("pages") else domain
        name = prompt_builder.clean_company_name(title, domain) or "Новый клиент"
    tid = slugify(args.tenant_id.strip() or name or domain)

    print(f"[2/6] Building knowledge base for '{name}' ...")
    if args.kb_file:
        with open(args.kb_file, encoding="utf-8") as f:
            kb_md = f.read()
        questions = args.questions or ["Расскажите подробнее о ваших услугах", "Какие условия сотрудничества?", "Как с вами связаться?"]
    else:
        extra = ""
        if args.extra_materials:
            extra = open(args.extra_materials, encoding="utf-8").read() if os.path.exists(args.extra_materials) else args.extra_materials
        kb_md = prompt_builder.build_knowledge_base(
            business_name=name, base_url=base_url, combined_text=crawl.get("combined_text", ""),
            contacts=crawl.get("contacts", {}), extra_materials=extra,
        )
        questions = args.questions or prompt_builder.generate_suggested_questions(name, crawl.get("combined_text", ""))

    print(f"[3/6] Creating demo tenant '{tid}' on {args.env} ...")
    try:
        api.create_tenant(tid, name)
    except demo_api.ApiError as e:
        if e.status == 409:
            print(f"  '{tid}' already exists. Use the update-demo skill to change it, or pick another --tenant-id.")
            return 1
        raise
    api.put_kb(tid, kb_document(kb_md))

    print("[4/6] Saving presentation ...")
    welcome = f"Здравствуйте! Я ИИ-ассистент компании «{name}». Чем могу помочь?"
    presentation = {
        "display_name": name,
        "welcome_message": welcome,
        "suggested_questions": questions[:8],
        "accent_color": args.accent,
        "site_url": base_url if base_url.startswith("http") else "https://" + base_url,
        "optima_page_url": demo_api.page_url(tid, "prod"),
    }
    if args.logo_url:
        presentation["logo_url"] = args.logo_url
    api.put_presentation(tid, presentation)

    out_dir = os.path.join(DEMO_DIR, tid)
    os.makedirs(out_dir, exist_ok=True)
    with open(os.path.join(out_dir, "kb.json"), "w", encoding="utf-8") as f:
        json.dump(kb_document(kb_md), f, ensure_ascii=False, indent=2)
    with open(os.path.join(out_dir, "presentation.json"), "w", encoding="utf-8") as f:
        json.dump(presentation, f, ensure_ascii=False, indent=2)

    if not args.no_page:
        print("[5/6] Generating demo/%s/index.html ..." % tid)
        page_cfg = {
            "tenant_id": tid, "brand_name": name, "accent": args.accent,
            "hero_title": f"ИИ-сотрудник для компании «{name}»",
            "hero_text": "Задайте любой вопрос о продуктах, ценах и условиях — отвечает так, как ответил бы лучший менеджер.",
            "logo_url": args.logo_url,
        }
        with open(os.path.join(out_dir, "demo.json"), "w", encoding="utf-8") as f:
            json.dump(page_cfg, f, ensure_ascii=False, indent=2)
        subprocess.run([sys.executable, os.path.join(DEMO_DIR, "generate.py"), tid], check=True, cwd=REPO)

    reply = ""
    if not args.no_smoke_test:
        q = questions[0] if questions else "Расскажите в двух словах о компании."
        print(f"[6/6] Smoke test: {q!r}")
        try:
            r = api.chat(tid, q)
            reply = r.get("assistant_response", "")
            print(f"  ok={r.get('ok')} latency={r.get('latency_ms')} ms")
        except (demo_api.ApiError, SystemExit) as e:
            print(f"  [WARN] smoke test failed: {e}")

    if args.commit:
        if git("checkout", "-b", f"demo/{tid}") and git("add", os.path.join("demo", tid)):
            git("commit", "-m", f"demo: add {tid}")

    print("\n" + "=" * 60)
    print(f"Demo '{tid}' ready ({args.env})")
    print(f"  instant URL : {demo_api.generic_url(tid, args.env)}")
    if not args.no_page:
        print(f"  custom page : {demo_api.page_url(tid, args.env)}  (live after the commit is merged to main)")
    if reply:
        print(f"  reply       : {reply[:300]}")
    print("=" * 60)
    return 0


if __name__ == "__main__":
    sys.exit(main())
