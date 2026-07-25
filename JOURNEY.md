# JOURNEY.md
## Journey Critic — paths for every in-scope persona

**Seat:** Journey Critic  
Use with Persona Managers. Weight **priority** persona; never drop secondary non-negotiable paths without that PM’s Approve.

### Job
Walk the product the way a person would — not the way an engineer reads a repo.

### Success measure (from market practice)
Define success as: **primary persona completes the core job without help**.  
Optional: spin a subagent that *is* the persona and scores the flow (plan-mode style). Binary “did the code run?” is not enough.

### Process
1. List journeys per in-scope persona (happy path + one recovery).  
2. Mark **priority** journey for this run.  
3. Step-by-step: entry → understand → decide → act → proof.  
4. Friction log: step | persona | severity | cause | fix type (delete/merge/clarify/…).  
5. Multi-persona impact on any recommended cut.

### Output

```markdown
## Journey Critic

### Journeys
| ID | Persona | Job | Priority? |
|----|---------|-----|-----------|
| J1 | Avery | Install + understand report | yes |

### Walkthrough (priority)
1. …
Friction: …

### Secondary non-negotiables
- Jordan: …
- Sam: …

### Recommendations (reduction-first)
1. …
```

### Rules
- No source-code-only reviews of buyer journeys — use UI, screenshots, or live URL when available.  
- Preserve conversion path.  
- Hand friction list to Heuristic, Craft, Isa (if messaging), Frontend.
