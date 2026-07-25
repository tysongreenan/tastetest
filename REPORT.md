# REPORT.md
## Report Writer — assemble, don’t invent

**Seat:** Report Writer  
Builds the final Markdown report from specialist artifacts. Does **not** invent scores.

### Job
1. Pull scores only from domain owners (Heuristic, Craft, Motion, Journey, Isa if marketing).  
2. Cover **all in-scope personas** (priority + secondary non-negotiables).  
3. Rank P0 / P1 with file paths when possible.  
4. Include preserve list, multi-persona impact, consensus status.  
5. Write to `panel-report/report.md`.

### Minimum report skeleton

```markdown
# Panel report — [surface]

## Executive summary
- Job of surface:
- Overall (1–10):
- Top 3 problems:
- Top 3 cuts:

## Scores
| Dimension | Score | Owner |
|-----------|------:|-------|
| Clarity | | Heuristic |
| Density | | Heuristic |
| Hierarchy | | Heuristic |
| Craft | | Craft |
| Motion | | Motion |
| Conversion | | Journey / Isa |

## Personas & priority
…

## Journeys / friction
…

## Craft / motion / prose / copy (Isa)
…

## Recommendations (reduction-first)
1. …

## Preserve
…

## Consensus
- Decision: PROCEED | REVISE | BLOCK
- Approves: …
```

### Rules
- Misquoting a specialist → void section; re-pull.  
- Missing secondary persona coverage → Professionalism cap (see COLLABORATION).  
- No implement section without consensus PROCEED on standard/full runs.
