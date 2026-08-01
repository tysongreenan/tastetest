# Panel

**A buyer panel that lives in your repo.**

Panel seats personas on your product.  
They walk the flows, argue priority, and leave a scored report with file-level fixes — not another AI redesign.

---

## Quick Start

### One-command onboarding

In **any project** you want to review:

```bash
npx @tysongreenan/panel init
```

That installs the **lean** skill set (buyer review + craft + motion), Cursor rules/commands, and a Claude Code skill. Deep packs stay optional.

Then open your AI agent and say:

> Run a panel  
> or  
> Do a Panel review

**Cursor:** type `/panel`  
**Claude Code:** use the `panel` skill, or the same phrases above

```bash
# Options
npx @tysongreenan/panel init                  # lean (default)
npx @tysongreenan/panel init --full           # + FRONTEND.md + skills/ packs
npx @tysongreenan/panel init --dir ./my-app   # explicit path
npx @tysongreenan/panel init --force          # overwrite existing files
npx @tysongreenan/panel init --dry-run        # preview
```

### Upgrade an existing project

```bash
npx @tysongreenan/panel@latest upgrade
npx @tysongreenan/panel@latest upgrade --dry-run
```

`upgrade` refreshes managed Panel files and preserves locally changed versions under `.panel/backups/<timestamp>/`. It remembers whether the project was lean or full; pass `--full` to upgrade and add the full protocol pack. The installed version and managed-file hashes are recorded in `.panel/manifest.json`.

`update` is an alias for `upgrade`. Use the explicit `@latest` form above to bypass stale `npx` cache resolution. After these changes are published, existing projects must run this command once; npm packages cannot silently rewrite files in another repository.

### Check installation and output quality

```bash
npx @tysongreenan/panel doctor
npx @tysongreenan/panel validate
npx @tysongreenan/panel validate --json
```

`doctor` checks version drift, missing protocol files, local customizations, pack completeness, run-state health, and browser readiness. `validate` checks run-class requirements, seat artifacts, skill proof, structured findings, feedback-loop closure, and the evidence required to claim `SHIPPABLE`.

### Execution harness

```bash
npx @tysongreenan/panel harness start --run-class full
npx @tysongreenan/panel harness status
npx @tysongreenan/panel harness advance --phase preflight
npx @tysongreenan/panel harness events
```

The runtime enforces phase order, required artifacts, hash-chained events, project-scoped artifact paths, single-writer mutation, fail-closed approval gates, and single-use implementation permits. See [`docs/harness.md`](docs/harness.md) for the full workflow and current host-adapter limitation.

### Manual / Python

```bash
python -m panelcore init --project /path/to/your/app
```

We dogfood this on our own homepage — see `panel-report/report.md` or the sample at the marketing site `/report`.

---

## What it does

1. **Orchestrator preflight** — intent, preserve list, personas  
2. **Persona Managers** (one per persona) **negotiate priority** — secondaries keep non-negotiables  
3. Understands the product; journeys from **all** in-scope personas  
4. Critiques with a **secondary harm pass**  
5. **Frontend Design asks managers** for visual preferences **before** any design-system search or redesign  
6. Scores craft, motion, fluidity; council consensus before implement  
7. Produces a prioritized Markdown report  

Missing personas or skipped priority council on a full review → **NO-GO**.

### Locked structure

```text
PANEL.md               ← Core (always on)
playbook.md            ← Don’t Make Me Think + density
ANTI-SLOP.md           ← Craft / anti-template (UI)
MOTION.md              ← Emil motion rules
COPY.md                ← Isa — marketing / StoryBrand / product-show
FRONTEND.md            ← Optional — design-system only (--full)
skills/                ← Deep packs (NOT default; --full)
  ui-ux-pro-max/ | motion/ | stop-slop-prose/ | marketing-copy/
cli/ · docs/ · web/
```

### What loads when

| User says | Load |
|-----------|------|
| Run a panel / Panel review | `PANEL.md` + `playbook.md` |
| UI / craft / anti-slop | + `ANTI-SLOP.md` |
| Animations / motion | + `MOTION.md` |
| Marketing / StoryBrand / sell | + `COPY.md` (Isa) |
| Design system / colors / type | + `FRONTEND.md` + `skills/ui-ux-pro-max` |

**Priority of truth:** PANEL → ANTI-SLOP → MOTION → playbook → COPY → heavy packs (only when needed).

**Default install:** five thin files + Cursor/Claude wiring.  
**`--full`:** also `FRONTEND.md` + `skills/{ui-ux-pro-max,motion,stop-slop-prose,marketing-copy}/`.

```bash
# Design system from the premium pattern library (after --full)
python3 skills/ui-ux-pro-max/scripts/search.py \
  "developer tools SaaS" --design-system -p "Panel" -f markdown
```

---

## Guided by Real UX Principles

- **Steve Krug — *Don’t Make Me Think***
- Density: every block must earn its place
- Hierarchy: one primary action per view
- Craft restraint (anti-slop) and purposeful motion

See `playbook.md` for the short evaluation criteria agents use.

---

## Project Status

This is **V0.2** (rebrand to Panel).  
Core vision, skill file, UX playbook, and structure are ready.

---

## Marketing site

Homepage (Next.js) lives in `web/`:

```bash
cd web
npm install
npm run dev
```

---

## License

MIT
