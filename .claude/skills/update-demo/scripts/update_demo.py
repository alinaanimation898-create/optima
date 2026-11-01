#!/usr/bin/env python3
"""update-demo: pull / diff / push / smoke for an existing DEMO tenant. Run from the optima repo root.

  update_demo.py pull  <id>              -> demo/<id>/kb.json + presentation.json (+ demo.json if missing)
  update_demo.py diff  <id>              -> local working files vs what is live
  update_demo.py push  <id> [--prune]    -> push KB + presentation, regenerate the page
  update_demo.py smoke <id> "question"   -> ask the demo bot
  update_demo.py list                    -> demo tenants visible to your key

The API refuses non-demo tenants (403). For synced copies (source_tenant_id set) KB edits are overwritten by the
next sync, so only the presentation is pushed unless --force-kb is given.
"""
import argparse
import difflib
import json
import os
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, "..", "..", "create-demo", "scripts"))
import demo_api  # noqa: E402

REPO = os.getcwd()
DEMO_DIR = os.path.join(REPO, "demo")


def wpath(tid: str, name: str) -> str:
    return os.path.join(DEMO_DIR, tid, name)


def dump(obj) -> str:
    return json.dumps(obj, ensure_ascii=False, indent=2, sort_keys=True)


def read_local(tid: str, name: str):
    try:
        with open(wpath(tid, name), encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        return None


MODULE_DEFAULTS = {"category": "custom", "override_mode": "replace", "priority_order": 100,
                   "allowed_employees": ["*"], "allowed_roles": ["client"], "allowed_channels": ["*"],
                   "case_tags": [], "is_active": True}
NODE_DEFAULTS = {"node_type": "article", "tier": "L1", "summary": "", "parent_path": None,
                 "media_attachments": [], "high_confidence_triggers": [],
                 "allowed_employees": ["*"], "allowed_roles": ["*"], "valid_from": None, "valid_until": None}


def normalize_kb(kb: dict) -> dict:
    """Fill server defaults so a hand-written kb.json compares equal to the exported one."""
    out = {"prompt_modules": [], "knowledge_nodes": []}
    for m in kb.get("prompt_modules", []):
        m = {**MODULE_DEFAULTS, **m}
        m.setdefault("name", m.get("slug"))
        out["prompt_modules"].append(m)
    for n in kb.get("knowledge_nodes", []):
        out["knowledge_nodes"].append({**NODE_DEFAULTS, **n})
    return out


def remote_state(api, tid: str):
    kb = api.get_kb(tid)
    kb.pop("tenant_id", None)
    # versions are server bookkeeping, not part of the editable document
    for m in kb.get("prompt_modules", []):
        m.pop("version", None)
    for n in kb.get("knowledge_nodes", []):
        n.pop("version", None)
    pres = api.get_presentation(tid)["demo_config"]
    return kb, pres


def cmd_pull(api, tid):
    tenant = api.get_tenant(tid)
    kb, pres = remote_state(api, tid)
    os.makedirs(os.path.join(DEMO_DIR, tid), exist_ok=True)
    for name, obj in (("kb.json", kb), ("presentation.json", pres)):
        with open(wpath(tid, name), "w", encoding="utf-8") as f:
            f.write(dump(obj) + "\n")
    if not os.path.exists(wpath(tid, "demo.json")):
        with open(wpath(tid, "demo.json"), "w", encoding="utf-8") as f:
            json.dump({
                "tenant_id": tid, "brand_name": pres.get("display_name") or tenant["business_name"],
                "accent": pres.get("accent_color", "#f59e0b"), "logo_url": pres.get("logo_url", ""),
            }, f, ensure_ascii=False, indent=2)
    print(f"pulled demo/{tid}/kb.json and presentation.json")
    if tenant.get("source_tenant_id"):
        print(f"NOTE: '{tid}' is synced from '{tenant['source_tenant_id']}': KB edits are overwritten by the next sync; "
              "change presentation only (or ask David to edit the source tenant).")


def cmd_diff(api, tid) -> bool:
    kb, pres = remote_state(api, tid)
    changed = False
    for name, remote in (("kb.json", kb), ("presentation.json", pres)):
        local = read_local(tid, name)
        if local is None:
            print(f"{name}: no local file (run pull first)")
            continue
        local.pop("prune", None)
        if name == "kb.json":
            local = normalize_kb(local)
        a, b = dump(remote).splitlines(), dump(local).splitlines()
        d = list(difflib.unified_diff(a, b, f"live/{name}", f"local/{name}", lineterm=""))
        if d:
            changed = True
            print("\n".join(d))
        else:
            print(f"{name}: no changes")
    return changed


def cmd_push(api, tid, prune: bool, force_kb: bool):
    tenant = api.get_tenant(tid)
    synced = bool(tenant.get("source_tenant_id"))
    kb = read_local(tid, "kb.json")
    pres = read_local(tid, "presentation.json")
    if kb is None and pres is None:
        raise SystemExit("nothing to push: run pull first")
    if kb is not None:
        if synced and not force_kb:
            print(f"SKIP KB: '{tid}' is synced from '{tenant['source_tenant_id']}' (use --force-kb to push anyway)")
        else:
            kb["prune"] = prune
            print("KB:", api.put_kb(tid, kb)["imported"])
    if pres is not None:
        api.put_presentation(tid, pres)
        print("presentation updated")
    gen = os.path.join(DEMO_DIR, "generate.py")
    if os.path.exists(wpath(tid, "demo.json")) and os.path.exists(gen):
        subprocess.run([sys.executable, gen, tid], check=True, cwd=REPO)


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("command", choices=["pull", "diff", "push", "smoke", "list"])
    ap.add_argument("tenant_id", nargs="?")
    ap.add_argument("question", nargs="?", default="Расскажите в двух словах о компании.")
    ap.add_argument("--env", default="prod", choices=["prod", "stage"])
    ap.add_argument("--api-key", default="")
    ap.add_argument("--prune", action="store_true", help="also remove KB items missing from kb.json")
    ap.add_argument("--force-kb", action="store_true", help="push KB even for synced copies")
    args = ap.parse_args()

    api = demo_api.DemoApi(args.env, args.api_key)
    try:
        if args.command == "list":
            for t in api.list_tenants():
                src = f"  <- {t['source_tenant_id']}" if t.get("source_tenant_id") else ""
                print(f"{t['tenant_id']:<28} {t['business_name']}{src}")
            return 0
        if not args.tenant_id:
            ap.error("tenant_id required")
        tid = args.tenant_id
        if args.command == "pull":
            cmd_pull(api, tid)
        elif args.command == "diff":
            cmd_diff(api, tid)
        elif args.command == "push":
            cmd_push(api, tid, args.prune, args.force_kb)
        elif args.command == "smoke":
            r = api.chat(tid, args.question)
            print(f"ok={r.get('ok')} latency={r.get('latency_ms')} ms\n{r.get('assistant_response', '')}")
    except demo_api.ApiError as e:
        if e.status == 403:
            print(f"Refused: '{args.tenant_id}' is not a demo tenant (or not yours to manage). {e.detail}")
        elif e.status == 404:
            print(f"Not found: {e.detail}")
        else:
            print(f"API error: {e}")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
