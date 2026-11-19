---
name: update-demo
description: >-
  Update an existing ALTAI Optima demo tenant: pull its knowledge base and presentation into demo/<id>/, edit them
  (by instruction or from new materials), review the diff, push and smoke test.
  Demo tenants only. Use when asked to "обнови демо", "поправь базу знаний демо X", "update demo <id>".
---

# update-demo

Same key and rules as **create-demo** (`~/.config/altai/demo_api_key_<env>` or `ALTAI_DEMO_API_KEY`, `--env stage|prod`).
Run from the **root of the optima repo**. Demo tenants only: the API returns 403 for anything else.

```bash
S=.claude/skills/update-demo/scripts/update_demo.py
python3 $S list                       # demo tenants you can manage
python3 $S pull  <id>                 # -> demo/<id>/kb.json, presentation.json
# ... edit the files (see below) ...
python3 $S diff  <id>                 # review what will change
python3 $S push  <id>                 # KB + presentation
python3 $S smoke <id> "Сколько стоит доставка?"
```

## Editing
- `kb.json`: `prompt_modules[]` (`company_context` is the main text) and optional `knowledge_nodes[]`
  (`path`, `title`, `tier` L0/L1/L2, `summary`, `content`, `high_confidence_triggers`). Keep facts verifiable; remove invented prices.
- `presentation.json`: `display_name`, `welcome_message`, `suggested_questions` (keep empty: demos never show question chips), `accent_color`, `logo_url`,
  `avatar_url`, `tagline`, `hero_description`, `placeholder_text`, `site_url`. URLs must be http(s).
- Items missing from `kb.json` stay live unless you push with `--prune`.

## Synced copies
If `pull` prints that the tenant is synced from another tenant (`source_tenant_id`), KB edits are overwritten by the next
sync (hourly). `push` then skips the KB and updates only the presentation; ask David to edit the source tenant instead.

## After pushing
The instant URL `https://optima.altaiweb.online/demo/?t=<id>` always reflects the live presentation. There is no page
to rebuild or commit (static pages `demo/<id>/` were dropped, #380).
