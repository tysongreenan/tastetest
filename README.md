# TasteTest (EmpathFlow)

**The UX review that lives in your repo.**

TasteTest acts like a real buyer.  
It reads your codebase, builds empathy maps, checks against proven UX principles, and tells you whether your product feels fluid and professional.

---

## Quick Start

### Recommended: one-command onboarding

In **any project** you want to review:

```bash
npx tastetest init
```

That installs skills, Cursor rules/commands, and a Claude Code skill. Then open your AI agent and say:

> Run EmpathFlow  
> or  
> Do a TasteTest review

**Cursor:** type `/tastetest`  
**Claude Code:** use the `tastetest` skill, or the same phrases above

```bash
# Options
npx tastetest init --dir ./my-app   # explicit path
npx tastetest init --lite           # entry skills only (no large packs)
npx tastetest init --force          # overwrite existing files
npx tastetest init --dry-run        # preview
```

Until the package is on npm, from this repo:

```bash
npx /path/to/tastetest init
# or
node bin/tastetest.js init --dir /path/to/your/app
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

### Skills (drop into a project)

| File | Job |
|------|-----|
| `EMPATHFLOW.md` | Buyer-level UX review — **reduction bias**, density-first (default) |
| `EMPATHFLOW.full.md` | Full crew protocol (personas, priority council, craft/motion) |
| `ANTI-SLOP.md` | Visual craft — template / “AI-looking” UI |
| `MOTION.md` | Motion critic — [Emil Kowalski](https://github.com/emilkowalski/skills) |
| `FRONTEND.md` | Frontend Design — brief + `web/DESIGN.md` + [UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) library |
| `web/DESIGN.md` | Marketing design system (tokens, type, components, page order) |
| `AGENTS.md` | **Full agent roster** (11 agents) and run order |
| `COLLABORATION.md` | Permissions, vetoes, talk protocol, consensus before execute |
| `skills/motion/` | Motion standards pack |
| `skills/stop-slop-prose/` | Prose craft — [stop-slop](https://github.com/hardikpandya/stop-slop) |
| `skills/ui-ux-pro-max/` | Searchable styles / palettes / type / UX rules |
| `playbook.md` | Shared evaluation criteria |

```bash
# Design system from the premium pattern library
python3 skills/ui-ux-pro-max/scripts/search.py \
  "developer tools SaaS" --design-system -p "TasteTest" -f markdown

# Optional: Emil’s pack in your agent host
npx skills@latest add emilkowalski/skills
```

---

## Guided by Real UX Principles

- **Steve Krug — *Don’t Make Me Think***
- Nielsen’s 10 Usability Heuristics
- Key Laws of UX
- Modern fluidity & professionalism checklist
- Accessibility baseline + AI-era patterns

See `playbook.md` for the full evaluation criteria the agents use.

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
