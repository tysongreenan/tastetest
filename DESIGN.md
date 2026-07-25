# DESIGN.md — router

**Panel marketing system of record:** [`web/DESIGN.md`](web/DESIGN.md)

Do not maintain a second token table here. Agents and humans load **`web/DESIGN.md`** for colors, type, components, do/don’t, and the **Agent contract**.

---

## Load order (reliable)

| Surface | Path | Owner seats |
|---------|------|-------------|
| Panel marketing (`web/`) | `web/DESIGN.md` | **Design System Checker** (owner) · Frontend · Craft · Motion · Executor |
| Client product under review | Client `DESIGN.md` if present; else draft starter | **Design System Checker** |
| Non-visual / copy-only | Skip full load; note in run-state `design_system.status: n/a` | Orchestrator |

**Maintainer skill:** [`DESIGN-SYSTEM.md`](DESIGN-SYSTEM.md) + [`skills/design-md/`](skills/design-md/).

---

## Phase 0 (Orchestrator)

1. Resolve path → write `design_system.path` in `panel-report/run-state.yaml`.  
2. Require load for `run_class` standard/full when UI or marketing is in scope.  
3. **Design System Checker** runs design-md health: set `status`, `constraints` (3–5), `alignment`, `doc_quality`.  
4. Frontend Step 0b loads constraints from run-state — does not re-own scores.

See **Agent contract** in [`web/DESIGN.md`](web/DESIGN.md#agent-contract-all-visual-seats).

---

## Conflict rule

`web/DESIGN.md` + `ANTI-SLOP.md` + `MOTION.md` beat any pattern library or external frontend skill.
