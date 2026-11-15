# CLAUDE.md — optima (marketing site + demo stands)

Static site for optima.altaiweb.online (GitHub Pages, `main`). Separate git repo (ignored by the ALTAI root repo).
Unused files (stray site copies, old logo/avatar/font variants, one-off docs) were archived 2026-11-03 to `/home/d/altai_no_vcs/optima_archive_20261103/` (root repo issue #84); they stay in git history.

## Demo stands
- Escalation in a demo: Vera writes nothing and `/demo/chat` returns a system note with `technical: true` (core #142). `vera-demo-chat.js` shows it as a grey line, `demo-page.js` as the escalation card. `ai-sales-widget.js`, `main.js` and `partner.html` show the note as a normal bubble.
- `assets/js/vera-demo-chat.js` (+ `assets/css/vera-demo-chat.css`): **the one chat client** (`VeraDemoChat`). Reads
  `GET /api/v1/demo/config`, talks to `POST /api/v1/demo/chat`. `?api=stage` switches to the stage API. Hooks
  (`onUser/onTyping/onReply/onError`) for custom layouts; `VeraDemoChat.mount(el, {tenantId})` renders a default UI.
  `index.html`/`en.html`/`partner.html` and `ai-sales-widget.js` use it — do not copy-paste another fetch.
- Voice (core issue #327, epic #325): `POST /api/v1/demo/voice` (multipart `audio`, `tenant_id`, `session_id`; reply = chat JSON + `transcript`; 400/404/413/429 carry a Russian `detail`). The mic shows only when `VeraDemoChat.voiceSupported()` (MediaRecorder, getUserMedia, secure context) **and** `/demo/config` has `voice_enabled: true` (old core: no mic). `vera-demo-chat.js` holds the recorder (webm/opus, mp4 for Safari, auto-stop and send at 60 s), `chat.sendVoice(blob, secs)`, hooks `onUserVoice`/`onTranscript`, and `VeraDemoChat.bindVoice()` + `createVoicePlayer()` (shared UI logic, class prefix `dp` or `vdc`; styles in `demo-page.css` and `vera-demo-chat.css`). Tap to start, then Cancel/Send; the transcript is small grey text under Vera's reply; mic denied shows a hint and text chat keeps working. Vera answers in text only. Landing widget (`ai-sales-widget.js`) has no voice yet. Bump the `?v=` of `demo-page.*` in the demo pages when these files change.
- `demo/index.html?t=<id>`: generic instant demo for any demo tenant. Page = `demo/assets/demo-page.{css,js}` (two-column intro + chat, accent/avatar/name/placeholder/questions from `/demo/config`) plus legacy extras from `demo/assets/brands.json` (hero photo, footer logo, integrations list, white background; images in `demo/assets/brand/`). New demos get the default intro; add a `brands.json` entry for a richer look.
- **No static demo pages** (dropped 2026-11, root issue #380, epic #357 decision 4): the only demo link is `demo/?t=<id>`. The old `demo/<id>/index.html` files (adiam, aerotur, cifra_broker, foreignpay, holodi_msk, paritetbank, paydigital, radisson_ulyanovsk, rhz, senat, stratoplan) are tiny redirect stubs to `../?t=<id>` (keeps other query params and the hash; GitHub Pages has no server-side redirects, `404.html` redirects `/demo/<id>` only for dirs that do not exist). Do not add new `demo/<id>/index.html`; `generate.py`, `_template/` and `demo.json` are gone. Old per-page overrides (`hero_text`, `brand_name`, `accent`) are not applied by the instant page: put them in the tenant presentation (`hero_description`, `display_name`, `accent_color`) or `brands.json`.
- The landing Tallora case runs on `tallora_landing_demo` (read-only copy of `tallora`, synced hourly by the backend).
- Skills (plain Python 3 stdlib, work for Claude Code and Antigravity): `.claude/skills/create-demo`, `.claude/skills/update-demo`.
  They use a personal demo key (`~/.config/altai/demo_api_key_prod` / `_stage` or `ALTAI_DEMO_API_KEY`, never committed) and only the
  `/api/v1/demo-admin/*` API, which refuses live tenants. `--env stage` for experiments.
- Working files per demo: `demo/<id>/{kb.json,presentation.json}` (written by create-demo/update-demo; the folder is public on GitHub Pages, so do not commit new ones). No git step for a new demo: the instant link works at once.

## SQL refill when the demo key is unavailable
The normal path is always `update-demo` / the `/api/v1/demo-admin/*` API. If the personal demo key is not available, a
demo tenant's KB and prompt can be refilled by SQL on the server (root repo issue #71). This is a **prod data write:
ask David each time, run it by hand, never from a script that loops over tenants.**
- Tables (`altai-core/src/db.rs`): `knowledge_nodes` (`tenant_id`, `path`, `title`, `tier`, `summary`, `content`,
  `high_confidence_triggers`, `is_active`, `version`), `prompt_modules` (`tenant_id`, `slug`, `content`, `is_active`,
  `version`), `tenants.demo_config` (presentation JSON: name, welcome message, accent, logo).
- **Every statement is guarded by `kind='demo'` on `tenants`**, so a live tenant can never be hit. Check the rows first
  with a SELECT using the same guard; bump `version` and `updated_at` with `CURRENT_TIMESTAMP`.
```sql
UPDATE prompt_modules SET content = $1, version = version + 1, updated_at = CURRENT_TIMESTAMP
WHERE slug = 'company_context' AND tenant_id = 'foreignpay'
  AND tenant_id IN (SELECT id FROM tenants WHERE kind = 'demo');
```
- A new node is an `INSERT ... SELECT ... FROM tenants WHERE id = $1 AND kind = 'demo'`. Synced copies
  (`source_tenant_id`) are overwritten by the next sync: edit the source tenant (through David) instead.

## Rules
- Never put an API key, admin key or tenant credentials in this repo.
- Demo tenants only: anything that needs a live tenant, `promote`, `source_tenant_id` goes through David.
