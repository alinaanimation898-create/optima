#!/usr/bin/env python3
"""Generate demo/<id>/index.html from demo/<id>/demo.json using demo/_template/page.html (stdlib only).

Usage: python3 demo/generate.py <tenant_id> [<tenant_id> ...]   |   python3 demo/generate.py --all

demo.json keys: tenant_id, brand_name, title, description, hero_text (replaces the intro paragraph),
accent (css color, optional; the API accent_color is used otherwise), og_image (optional), index (bool, default false).
Pages are `noindex` and not listed in sitemap.xml unless "index": true (and then add them to sitemap.xml by hand).
"""
import html
import json
import re
import sys
from pathlib import Path
from string import Template

ROOT = Path(__file__).resolve().parent
ID_RE = re.compile(r"^[a-z0-9_]{1,64}$")


def esc(value) -> str:
    return html.escape(str(value or ""), quote=True)


def safe_url(value) -> str:
    value = str(value or "").strip()
    return value if re.match(r"^(https?://|/|\.\./)", value) else ""


def safe_color(value) -> str:
    value = str(value or "").strip()
    return value if re.match(r"^#[0-9a-fA-F]{3,8}$|^rgb\([\d\s,.%]+\)$", value) else "#f59e0b"


def render(cfg: dict) -> str:
    tid = cfg["tenant_id"]
    if not ID_RE.match(tid):
        raise SystemExit(f"bad tenant_id: {tid!r}")
    template = Template((ROOT / "_template" / "page.html").read_text(encoding="utf-8"))
    og = safe_url(cfg.get("og_image"))
    brand = cfg.get("brand_name") or tid
    overrides = {}
    if cfg.get("hero_text"):
        overrides["hero_description"] = str(cfg["hero_text"])
    if cfg.get("brand_name"):
        overrides["name"] = str(cfg["brand_name"])
    if cfg.get("accent"):
        overrides["accent"] = safe_color(cfg["accent"])
    return template.substitute(
        robots="" if cfg.get("index") else '<meta name="robots" content="noindex">',
        title=esc(cfg.get("title") or f"{brand} — ИИ-сотрудник"),
        description=esc(cfg.get("description") or f"Демо ИИ-сотрудника для {brand}"),
        og_image=f'<meta property="og:image" content="{esc(og)}">' if og else "",
        tenant_id_js=json.dumps(tid),
        overrides_js=json.dumps(overrides).replace("</", "<\\/"),
    )


def main(argv: list) -> int:
    if not argv:
        print(__doc__)
        return 2
    ids = sorted(p.parent.name for p in ROOT.glob("*/demo.json")) if argv == ["--all"] else argv
    for tid in ids:
        src = ROOT / tid / "demo.json"
        if not src.exists():
            raise SystemExit(f"missing {src}")
        cfg = json.loads(src.read_text(encoding="utf-8"))
        cfg.setdefault("tenant_id", tid)
        (ROOT / tid / "index.html").write_text(render(cfg), encoding="utf-8")
        print(f"generated demo/{tid}/index.html")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
