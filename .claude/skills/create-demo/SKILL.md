---
name: create-demo
description: >-
  Create a new demo stand (demo tenant + knowledge base + branded page) for ALTAI Optima from a company website.
  Crawls the site, builds the Vera knowledge base, creates a demo tenant through the demo-admin API with your
  personal key, saves the presentation (welcome text, brand color; no suggested questions), generates
  demo/<id>/index.html in this repo and runs a smoke test. Demo tenants only; live clients are unreachable.
  Use when asked to "создать демо", "сделай демо для сайта X", "new demo for <company>".
---

# create-demo

Works only with **demo tenants**. The API refuses anything else, so this skill cannot affect a live client.
Plain Python 3 (standard library). Run every command from the **root of the optima repo**.

## Setup (once)
1. Get a personal demo key from David (shown once). Save it outside the repo:
   ```bash
   mkdir -p ~/.config/altai && printf '%s' 'dmk_...' > ~/.config/altai/demo_api_key && chmod 600 ~/.config/altai/demo_api_key
   ```
   (or `export ALTAI_DEMO_API_KEY=dmk_...`). Never commit it. Stage and prod have separate keys.
2. Use `--env stage` while experimenting; the default is `prod`.

## Run
```bash
python3 .claude/skills/create-demo/scripts/create_demo.py \
  --urls "https://example.com" "https://example.com/pricing" \
  --name "Example" --tenant-id example --accent "#C8102E" --commit
```
Optional: `--extra-materials brief.txt` (file or text), `--kb-file my_kb.md` (use your own knowledge base),
`--questions "Q1" ...` (smoke test only: demos never show suggested-question chips), `--logo-url https://...`, `--no-page`, `--no-smoke-test`.

What it does: crawl → knowledge base (`prompt_builder.py`, structure in `references/knowledge_base_template.md`) →
`POST /demo-admin/tenants` (409 if the id exists: use **update-demo**) → `PUT .../kb` → `PUT .../presentation` →
`demo/<id>/{kb.json,presentation.json,demo.json,index.html}` → smoke test via `/demo/chat`.
With `--commit` it creates the branch `demo/<id>` and commits the files; merge to `main` to publish the page.

## Result
- Instant URL (works immediately, no deploy): `https://optima.altaiweb.online/demo/?t=<id>`
- Custom page (after the merge): `https://optima.altaiweb.online/demo/<id>/` — `noindex`, not in `sitemap.xml`.
- Improve the answers by editing `demo/<id>/kb.json` and using **update-demo**.

## Rules
- Do not try to create or edit live tenants, call `/admin/*`, or pass a tenant-manager key.
- Check the knowledge base before sharing the link: the crawler can miss prices and mix facts; fix with update-demo.
- If a demo becomes a customer, tell David: he switches it to live in place.
