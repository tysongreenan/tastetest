---
name: panel-design-md
description: >
  Keep project DESIGN.md current, complete, and professional. Audit doc vs shipped UI,
  score professional quality, draft starters for missing systems, propose same-PR updates.
  Triggers: design system checker, DESIGN.md audit, design system stale, update DESIGN.md,
  design-md skill, brand tokens doc, design system alignment.
---

# Panel DESIGN.md skill pack

**Owner seat:** **Design System Checker** only (proposes updates; may veto visual ship when doc is fail/stale).  
**Living system of record:** path from root [`DESIGN.md`](../../DESIGN.md) → usually [`web/DESIGN.md`](../../web/DESIGN.md).  
**Panel wiring / report format:** root [`DESIGN-SYSTEM.md`](../../DESIGN-SYSTEM.md).

| File | Role |
|------|------|
| [../../DESIGN-SYSTEM.md](../../DESIGN-SYSTEM.md) | Seat card — when to run, outputs, blocks |
| [AUDIT.md](AUDIT.md) | Sync audit: DESIGN.md vs code |
| [QUALITY.md](QUALITY.md) | Professional bar for the document itself |
| [STARTER.md](STARTER.md) | Minimal starter skeleton when client has no DESIGN.md |

**Not this pack:** inventing marketing layout (`FRONTEND.md`), generic anti-slop (`ANTI-SLOP.md`), pattern library search (`ui-ux-pro-max`). Those **consume** DESIGN.md; this pack **maintains** it.

---

## Job (Design System Checker)

1. **Resolve** path (root router → product DESIGN.md).  
2. **Load** full file (or draft via STARTER if missing).  
3. **Sync audit** (AUDIT.md) → matrix + `alignment: pass | drift | fail`.  
4. **Quality audit** (QUALITY.md) → `doc_quality: professional | thin | rewrite`.  
5. **Write run-state** `design_system` fields (path, status, constraints, alignment, sections_cited, doc_quality).  
6. **Propose DESIGN.md patch** when drift/thin — same change as code when UI also ships.  
7. **Veto** visual implement / homepage redesign if `alignment: fail` or `doc_quality: rewrite` until fixed or Orchestrator records explicit exception.

---

## Modes

| Mode | When | Output |
|------|------|--------|
| **Load** | Every UI-scoped run Phase 0–4 | `status: loaded`, 3–5 constraints |
| **Audit** | Standard/full visual runs; after implement | Section matrix + alignment + doc_quality |
| **Refresh** | Drift or thin doc; Executor shipping new patterns | DESIGN.md patch list or file edit |
| **Starter** | Client missing DESIGN.md | Draft file + `status: missing-drafted` |

---

## Hard rules

1. **You own the doc.** Frontend may cite sections; only Design System Checker scores alignment/doc_quality and proposes structural DESIGN.md rewrites.  
2. **Code wins on facts; DESIGN.md wins on brand law.** If code shipped a new pattern without doc → drift (update doc). If code violates Do’s and Don’ts → fail UI (fix code), not “update doc to match slop.”  
3. **Never replace Panel DESIGN.md with ui-ux-pro-max MASTER.md.** Library may inform constraints language only.  
4. **Never paste Panel brand into a client starter.** Infer from client tokens/components.  
5. **Same-PR rule:** new component/section/token in code → DESIGN.md update in the same change, or alignment stays `drift`/`fail`.

---

## Run-state fields (this seat writes)

```yaml
design_system:
  path: web/DESIGN.md
  status: loaded          # loaded | missing-drafted | missing-blocked | n/a
  constraints: []         # 3–5 bullets
  alignment: pass         # pass | drift | fail
  doc_quality: professional  # professional | thin | rewrite
  sections_cited: []
  audit_path: panel-report/design-system.md  # optional artifact
```

---

## Artifact

Prefer `panel-report/design-system.md` (or section in report). Template in DESIGN-SYSTEM.md.
