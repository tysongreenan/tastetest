# DESIGN.md starter (client missing system)

**Seat:** Design System Checker  
**When:** No DESIGN.md on target product; UI review or implement in scope.  
**Result:** Draft file + run-state `status: missing-drafted`. Never paste Panel’s brand kit.

---

## Infer from code (required)

1. Read CSS variables / theme / tailwind colors actually used on primary routes.  
2. List fonts loaded and heading/body roles.  
3. Name 5–12 real components or section patterns on the main surface.  
4. Note primary CTA and conversion path if marketing.  
5. Record stack (Next, React, etc.) in Scope.

---

## Minimum draft skeleton

```markdown
# DESIGN.md — [Product]

**Scope:** [routes / surfaces]  
**Stack:** […]  
**Tokens:** [path]  
**Status:** starter drafted by Panel Design System Checker — validate with humans

## Overview
[2–4 sentences: what this product should feel like, from shipped UI — not aspirational fiction]

## Colors
| Role | Value / token | Use |
|------|---------------|-----|
| Primary | | |
| Background | | |
| Foreground | | |
| Muted | | |
| Border | | |

## Typography
| Role | Family | Notes |
|------|--------|-------|
| Heading | | |
| Body | | |
| Mono | | |

## Layout
- [page order or grid rules observed]

## Components
- [name — job — path if known]

## Do’s and Don’ts
### Do
- […]
### Don’t
- [bans inferred from craft risks; keep product-specific]

## File map
| Concern | Path |
|---------|------|
| Tokens | |
| Primary page | |

## Known gaps
| Gap | Note |
|-----|------|
| Starter only | Expand after brand owner review |
```

---

## Rules

- Prefer **observed** values over invented palettes.  
- If UI is chaotic, say so in Overview and Known gaps; still document dominant patterns.  
- Set `design_system.path` to where you wrote the draft.  
- `doc_quality` starts as **thin** until a human or later audit promotes it.  
- `alignment` scores against the starter once written (not “n/a forever”).
