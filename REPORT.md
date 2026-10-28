# REPORT.md
## Report Writer — assemble, don’t invent

**Seat:** Report Writer  
Builds the final Markdown report from specialist artifacts. Does **not** invent scores.

### Job
1. Pull scores only from domain owners (Heuristic, Craft, Motion, Journey, Isa if marketing).  
2. Cover **all in-scope personas** (priority + secondary non-negotiables).  
3. Rank `Block | P0 | P1 | P2` findings with file paths when possible.
4. Include preserve list, multi-persona impact, consensus status.  
5. Include a short skill-use audit for in-scope seats.
6. Validate minimum artifact paths for every in-scope seat.
7. Reject generic recommendations that lack evidence, persona effect, and an observable acceptance check.
8. For implement runs, pull the final verdict from `panel-report/verification.md`; never infer browser quality from code or tests.
9. Include hypothesis outcomes and durable-learning updates without inventing causality.
10. Build recommendations from deduplicated `panel-report/findings.json`; do not copy the same problem from multiple seat artifacts.
11. Write to `panel-report/report.md`.

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

## Skill-use audit
| Seat | Skill files loaded | Hook actually used | Minimum artifact | Artifact / evidence |
|------|--------------------|--------------------|------------------|---------------------|
| … | … | … | … | … |

## Journeys / friction
…

## Design system alignment (Design System Checker only)
- path / status / doc_quality (professional | thin | rewrite):
- alignment: pass | drift | fail
- constraints applied:
- section matrix (token / type / component / don’ts):
- DESIGN.md updates required before ship:
- artifact: panel-report/design-system.md

## Craft / motion / prose / copy (Isa)
…

## Recommendations (reduction-first)
| ID | Severity | Surface | Evidence | Change | Persona effect | Acceptance check |
|----|----------|---------|----------|--------|----------------|------------------|
| H-… | … | … | … | … | … | … |

- structured source: panel-report/findings.json

## Feedback loop
- hypotheses: panel-report/hypotheses.md
- cross-critique outcomes:
- confirmed / disproved / inconclusive / untested:
- learning: panel-report/learning.md
- systems of record updated:
- next-run tests:

## Preserve
…

## Implementation verification (implement runs)
- delivery status: IMPLEMENTED | REVISE | BLOCKED | SHIPPABLE
- verifier verdict: PASS | REVISE | BLOCK
- browser evidence: panel-report/verification.md
- desktop/mobile snapshots:
- state coverage exceptions:
- visual regressions:
- DESIGN.md delta: updated | none — rationale

## Consensus
- Decision: PROCEED | REVISE | BLOCK
- Approves: … (visual Approves must cite DESIGN.md section)
```

### Rules
- Misquoting a specialist → void section; re-pull.  
- Missing secondary persona coverage → Professionalism cap (see COLLABORATION).  
- No implement section without consensus PROCEED on standard/full runs.  
- UI in scope but `design_system.status` not loaded/drafted → report must say **BLOCKED**, not invent alignment.  
- Visual PROCEED without Design System Checker `alignment` when design-system seat was seated → incomplete report.
- In-scope seat with no skill-use evidence → mark that seat **invalid** and do not present its output as authoritative.
- In-scope seat with no minimum artifact path or missing artifact output → mark that seat **invalid** and do not present its output as authoritative.
- Use only `Block | P0 | P1 | P2` severity from `COLLABORATION.md`; never inflate severity because a fix is aesthetically preferred.
- “Modern,” “premium,” “clean,” “delightful,” or similar adjectives are not recommendations without a specified visual/interaction change and acceptance check.
- An implement run without final rendered desktop/mobile evidence is **IMPLEMENTED**, never **SHIPPABLE**.
- A process-complete run with a generic, regressed, inaccessible, or persona-worse result is a **failed run**; report the outcome honestly.
- Do not claim a hypothesis was confirmed when multiple changes prevent attribution; mark it `inconclusive` and state what narrower test is needed.
- Do not close the run with confirmed reusable learning only in the report; cite its durable destination and owner approval.
