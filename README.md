# TasteTest (EmpathFlow)

**The UX review that lives in your repo.**

TasteTest acts like a real buyer.  
It reads your codebase, builds empathy maps, checks against proven UX principles, and tells you whether your product feels fluid and professional.

---

## Quick Start

### Recommended: one-command onboarding

In **any project** you want to review:

```bash
npx @tysongreenan/tastetest init
```

That installs the **lean** skill set (buyer review + craft + motion), Cursor rules/commands, and a Claude Code skill. Deep packs stay optional.

Then open your AI agent and say:

> Run EmpathFlow  
> or  
> Do a TasteTest review

**Cursor:** type `/tastetest`  
**Claude Code:** use the `tastetest` skill, or the same phrases above

```bash
# Options
npx @tysongreenan/tastetest init                  # lean (default)
npx @tysongreenan/tastetest init --full           # + FRONTEND.md + skills/ packs
npx @tysongreenan/tastetest init --dir ./my-app   # explicit path
npx @tysongreenan/tastetest init --force          # overwrite existing files
npx @tysongreenan/tastetest init --dry-run        # preview
```

### Manual / Python

```bash
python -m empathflow init --project /path/to/your/app
```

We dogfood this on our own homepage — see `tastetest-report/report.md` or the sample at the marketing site `/report`.

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
EMPATHFLOW.md          ← Core (always on)
playbook.md            ← Don’t Make Me Think + density
ANTI-SLOP.md           ← Craft / anti-template (UI)
MOTION.md              ← Emil motion rules
FRONTEND.md            ← Optional — design-system only (--full)
skills/                ← Deep packs (NOT default; --full)
  ui-ux-pro-max/ | motion/ | stop-slop-prose/
cli/ · docs/ · web/
```

### What loads when

| User says | Load |
|-----------|------|
| Run EmpathFlow / TasteTest | `EMPATHFLOW.md` + `playbook.md` |
| UI / craft / anti-slop | + `ANTI-SLOP.md` |
| Animations / motion | + `MOTION.md` |
| Design system / colors / type | + `FRONTEND.md` + `skills/ui-ux-pro-max` |

**Priority of truth:** EMPATHFLOW → ANTI-SLOP → MOTION → playbook → heavy packs (only when needed).

**Default install:** four thin files + Cursor/Claude wiring.  
**`--full`:** also `FRONTEND.md` + `skills/{ui-ux-pro-max,motion,stop-slop-prose}/`.

```bash
# Design system from the premium pattern library (after --full)
python3 skills/ui-ux-pro-max/scripts/search.py \
  "developer tools SaaS" --design-system -p "TasteTest" -f markdown
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

This is **V1**.  
Core vision, skill file, UX playbook, and structure are ready.

---

## Marketing site

Quick homepage (Next.js + SmoothUI) lives in `web/`:

```bash
cd web
npm install
npm run dev
```

---

## License

MIT
