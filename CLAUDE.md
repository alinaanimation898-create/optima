# CLAUDE.md — optima (marketing site + demo stands)

Static site for optima.altaiweb.online (GitHub Pages, `main`). Separate git repo (ignored by the ALTAI root repo).
Unused files (stray site copies, old logo/avatar/font variants, one-off docs) were archived 2026-11-03 to `/home/d/altai_no_vcs/optima_archive_20261103/` (root repo issue #84); they stay in git history.

## Demo stands
- Escalation in a demo: Vera writes nothing and `/demo/chat` returns a system note with `technical: true` (core #142). `vera-demo-chat.js` shows it as a grey line, `demo-page.js` as the escalation card. `ai-sales-widget.js`, `main.js` and `partner.html` show the note as a normal bubble.
- `assets/js/vera-demo-chat.js` (+ `assets/css/vera-demo-chat.css`): **the one chat client** (`VeraDemoChat`). Reads
  `GET /api/v1/demo/config`, talks to `POST /api/v1/demo/chat`. `?api=stage` switches to the stage API. Hooks
  (`onUser/onTyping/onReply/onError`) for custom layouts; `VeraDemoChat.mount(el, {tenantId})` renders a default UI.
  `index.html`/`en.html`/`partner.html` and `ai-sales-widget.js` use it — do not copy-paste another fetch.
- `demo/index.html?t=<id>`: generic instant demo for any demo tenant. Page = `demo/assets/demo-page.{css,js}` (two-column intro + chat, accent/avatar/name/placeholder/questions from `/demo/config`) plus legacy extras from `demo/assets/brands.json` (hero photo, footer logo, integrations list, white background; images in `demo/assets/brand/`). New demos get the default intro; add a `brands.json` entry for a richer look.
- `demo/_template/page.html` + `demo/generate.py`: `demo/<id>/demo.json` -> `demo/<id>/index.html` (`python3 demo/generate.py <id>`): same page, with fixed title/OG tags and optional overrides (`hero_text`, `brand_name`, `accent`).
  Pages are `noindex` and not in `sitemap.xml` unless `"index": true`.
- The landing Tallora case runs on `tallora_landing_demo` (read-only copy of `tallora`, synced hourly by the backend).
- Skills (plain Python 3 stdlib, work for Claude Code and Antigravity): `.claude/skills/create-demo`, `.claude/skills/update-demo`.
  They use a personal demo key (`~/.config/altai/demo_api_key` or `ALTAI_DEMO_API_KEY`, never committed) and only the
  `/api/v1/demo-admin/*` API, which refuses live tenants. `--env stage` for experiments.
- Working files per demo: `demo/<id>/{kb.json,presentation.json,demo.json,index.html}`; commit them on a branch.

## Rules
- Never put an API key, admin key or tenant credentials in this repo.
- Demo tenants only: anything that needs a live tenant, `promote`, `source_tenant_id` goes through David.
