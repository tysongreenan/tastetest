# Agent collaboration, permissions & consensus

Panel is a **crew**, not a pile of freelancers.  
No role may act outside its lane or ship work without the required approvals.

**When one model plays all roles:** still simulate this protocol in the transcript — write explicit handoffs, proposals, objections, and a consensus line before implementing. Skipping the protocol is a process failure.

### Two kinds of managers

| Role | Job |
|------|-----|
| **Orchestrator Manager** | Phase order, GO/NO-GO, mediate, final report ship, break process deadlocks |
| **Persona Manager (one per persona)** | Advocate for that human; negotiate run priority; veto harm to their non-negotiables |

Priority is **collaborative** for each run. Secondaries stay in the room — see §2b.

---

## 1. Authority levels

| Level | Meaning |
|-------|---------|
| **Propose** | May draft findings, options, or plans — not final |
| **Must-consult** | Must hear this role before decision; silence after one ping = abstain |
| **Approve** | Required **yes** before work proceeds |
| **Veto** | May block a proposal in their domain; Orchestrator escalates |
| **Execute** | May implement only after required Approves |

---

## 2. Permission matrix (who must approve)

### Phase work (review)

| Action | Propose | Must-consult | Approve (all required) | Veto domain |
|--------|---------|--------------|------------------------|-------------|
| Preflight GO/NO-GO | Orchestrator | Product Analyst, all Persona Managers | **Orchestrator** | — |
| Personas final | Empathy Mapper | Product Analyst, Journey Critic, **all Persona Managers** | **Orchestrator** | Empathy Mapper (stereotype) |
| **Persona priority (this run)** | Each Persona Manager (pitch) | Empathy Mapper, Journey Critic | **Orchestrator** + **all Persona Managers** (on the table) | Any PM if erased from “keep in mind” without reason |
| Journey list | Journey Critic | Empathy Mapper, **all in-scope Persona Managers** | **Orchestrator** + **Empathy Mapper** + **priority Persona Manager** | Secondary PM if their non-negotiable journey dropped |
| Journey critique publish | Journey Critic | Heuristic Auditor, relevant PMs | **Orchestrator** | — |
| Hard-gate scores | Heuristic Auditor | Journey Critic | **Orchestrator** | Heuristic Auditor |
| DESIGN.md draft / update | Design System Checker | Frontend Design, Craft Critic | **Orchestrator** + **Design System Checker** | Design System Checker |
| Craft score / redesign recs | Craft Critic | Frontend Design, Journey Critic, **priority PM** | **Orchestrator** + **Craft Critic** | Craft Critic |
| Motion Block/Approve | Motion Critic | Craft Critic | **Orchestrator** + **Motion Critic** | Motion Critic |
| Prose rewrites | Prose Critic | Empathy Mapper, **affected Persona Managers** | **Orchestrator** + **Prose Critic** | Prose Critic; PM if voice harms their human |
| **Marketing narrative / SB7 / CTA strategy** | **Isa · Marketing Copywriter** | Product Analyst, **priority PM**, Prose Critic | **Orchestrator** + **Isa** + **priority PM** | Isa (slogan fog / brand-as-hero); PM if voice wrong |
| **Product-show concept (how we demo)** | **Isa** | Craft, Frontend, Journey, priority PM | **Orchestrator** + **Isa** + **Craft** (if visual) + **priority PM** | Craft (template demo); Isa (no proof) |
| **Design brief (visual prefs)** | Frontend Design | — | **Orchestrator** + **required Persona Managers for the run class** | Frontend cannot proceed without required answers |
| Design system / library pick | Frontend Design | Craft, Motion, Empathy Mapper, **required PMs** (after brief) | **Orchestrator** + **Craft** + **Motion** + **priority PM** | Craft or Motion; PM if brief ignored |
| Full report ship | Report Writer | All score owners + **all Persona Managers** (coverage check) | **Orchestrator** | Domain owner if misquoted; PM if persona coverage missing |
| Rendered implementation verification | Implementation Verifier | Touched domain owners and affected PMs | **Orchestrator** + **Implementation Verifier** | Verifier on missing browser/state proof; domain owner on regression |
| **Code / UI implement** | Any specialist | See below | See below | See below |

### Implementation (after report, or scoped fix)

| Change type | Approve required | Notes |
|-------------|------------------|-------|
| Copy only (microcopy) | Prose + Orchestrator + **Persona Managers for voices touched** | |
| Marketing / landing narrative | **Isa** + Prose + Orchestrator + **priority PM** | SB7 + product-show in `panel-report/copy.md` first |
| Visual layout / section modernization / new sections | Craft + Orchestrator + **priority PM** (+ **Isa** if marketing) | Secondary PM if non-negotiable surface; new sections require missing-job evidence and reduction tradeoff |
| Motion / animation | Motion + Orchestrator | |
| Install / primary CTA | Orchestrator + Journey Critic + **priority PM** | Preserve-first |
| Remove feature / section | Orchestrator + Journey + Empathy Mapper + **all PMs who used it** | Never Craft alone |
| Tokens / DESIGN.md update | Design System Checker + Orchestrator | Skill `design-md`; same PR as code; Checker may veto layout if fail/rewrite |
| Layout implement | Craft + Design System Checker + priority PM + Orchestrator | Checker Approves with DESIGN.md section cite |
| Full homepage redesign | Orchestrator + **all Persona Managers** + Journey + Craft + Motion + **Isa** | Frontend proposes layout; Isa proposes narrative + product-show; multi-persona impact required |
| Mark UI SHIPPABLE | Implementation Verifier + Orchestrator + owners of touched domains | Requires `panel-report/verification.md`, browser evidence, state matrix, and no unresolved Block |

**Default:** If unsure who must approve → **Orchestrator + domain owner + priority Persona Manager**.

---

## 2b. Persona Managers & multi-persona discipline

### Seating
- After personas exist, create **PM-\<PersonaName\>** for each (e.g. PM-Avery, PM-Jordan, PM-Sam).  
- Empathy Mapper may draft maps; **Persona Managers advocate** ongoing.

### Priority negotiation (required every full run)
1. Each PM pitches why their persona should be **priority for this run**.  
2. Council sets: **Priority** · **Secondary (keep in mind)** · **Deferred** (rare, justified).  
3. Every Secondary lists **non-negotiables** (e.g. Jordan: “init must look real to engineers”).  
4. Log in report — file “primary” is a proposal, not automatic.

### Multi-persona impact (required on major proposals)
```markdown
**Impact**
- Priority (…): help | neutral | hurt — …
- Secondary (…): help | neutral | hurt — …
- If any hurt: needs that PM Approve or revise
```

### Design brief (Frontend Design — mandatory)

Before any visual redesign or ui-ux-pro-max search: (1) **Design System Checker** runs `DESIGN-SYSTEM.md` / `skills/design-md/` health (alignment + doc_quality → run-state); (2) Frontend Design **must ask** the required managers for preferences — `FRONTEND.md` Step 0 — then load **`DESIGN.md`** constraints from run-state — Step 0b. `standard` defaults to Orchestrator + priority PM; add secondary PMs only when their non-negotiable is touched; `full` requires all seated PMs. Library cannot override DESIGN.md. Visual Approves must cite a **DESIGN.md section name**. Checker **Veto** if `alignment: fail` or `doc_quality: rewrite`.

```markdown
### Frontend Design → Managers | design brief | question
**Surface:** homepage / …
**Questions:** feel · trust/bounce · references · depth · motion
**Answers:**
- Orchestrator: …
- PM-<A>: …
- PM-<B>: …
```

Also answer:
- Which page/section jobs are missing for your persona?
- If a new section is added, what should be reduced or merged so the page does not bloat?

No answers → **BLOCKED**. No inventing “what Avery wants” without PM-Avery speaking.

### Tunnel vision ban
Optimizing only for priority while harming a secondary without that PM’s Approve → **Persona coverage: weak**, Professionalism ≤ 6.

---

## 3. Talk protocol (how agents communicate)

Every handoff uses this shape (in the working transcript or `panel-report/council.md`).

### Handoff schema (required fields)

```markdown
### [FROM] → [TO] | [PHASE] | [TYPE: proposal | objection | approve | veto | question]

**Objective:** one sentence — what success looks like for this handoff  
**Out of scope:** what this role must not do (prevents duplicate / thrash)  
**Skill loaded:** exact file(s) used for this seat
**Skill hook used:** one concrete rule / framework / checklist item applied from the skill
**Inputs:** run-state fields + artifact paths (e.g. run-state §preserve, journeys.md)  
**Output:** exact `panel-report/...` path + format (e.g. `panel-report/craft.md` — table: hit | evidence | severity)
**Budget:** lite | standard | deep  
**Tools:** browser | static | library-search | none  

**Claim:** …
**Evidence:** (files / gates / persona / run-state)
**Hypothesis IDs:** `H-001` or `n/a: reason`
**Mutation:** artifact field / decision / hypothesis / test changed, or `upheld` with evidence
**Acceptance check:** observable condition that proves the claim after implementation
**Ask:** approve | revise | decide
**Blockers:** none | …
```

Thin “Claim only” handoffs are a process failure on **full** / **standard** runs — they cause telephone-game context loss.

If `Skill loaded`, `Skill hook used`, `Output`, or `Mutation` is blank for an in-scope seat, that handoff is incomplete.

Recommendations such as “make it modern,” “improve hierarchy,” or “add delight” are invalid unless they name the exact surface, current evidence, concrete change, intended persona effect, and acceptance check.

### Cross-critique loop (required before consensus)

Cross-critique uses frozen proposal artifacts; it is not an open-ended brainstorm. The Orchestrator assigns at least one adjacent challenger to every material proposal:

| Proposal owner | Required adjacent challenge |
|----------------|-----------------------------|
| Frontend Design | Craft or Design System; Journey when structure changes |
| Isa / Prose | Product truth plus Journey or affected PM |
| Motion | Heuristic or Craft |
| Journey | Heuristic plus affected PM |
| Design System | Frontend or Craft |

The challenger must record one of these outcomes in `panel-report/hypotheses.md`: `mutated`, `rejected`, or `upheld with new evidence`. “Looks good,” repetition, and bare approval do not satisfy cross-critique. Material mutation returns to the proposal owner for acknowledgment before consensus.

### Hypothesis contract

Every material proposal receives a stable ID (`H-001`, `H-002`, …) and records: persona, observed problem, proposed change, expected outcome, possible secondary harm, falsifiable browser/test signal, owner, challenger, and status. Consensus may approve only hypotheses with an acceptance test and completed cross-critique.

“Material” means a proposal that changes a persona priority or journey, selling narrative, page/section structure, interaction or motion behavior, design-system rule, conversion path, or product/code files. Pure typo fixes and evidence collection may use `n/a: non-material`.

### Severity vocabulary (required)

| Severity | Meaning | Ship rule |
|----------|---------|-----------|
| **Block** | Prevents task completion, creates serious accessibility failure, breaks a preserve item, or materially harms an in-scope persona | Must fix before SHIPPABLE |
| **P0** | Major clarity, trust, conversion, responsive, or design-system regression on the primary path | Must fix before SHIPPABLE |
| **P1** | Noticeable friction or craft/state defect with a practical workaround | Fix this run or record an explicit owner and rationale |
| **P2** | Polish improvement with limited journey impact | May defer with evidence |

Severity follows user impact, not implementation effort or critic preference. Every finding needs evidence and a reproducible or visually observable acceptance check.

### Rules of engagement

1. **No silent execution** — before implementing, there must be a written **proposal**, required **approves**, and an updated **run-state** (`consensus.decision: PROCEED`).  
2. **ApprovalGate** — treat implement as blocked unless Approves for that change type are met (see §4 and `panelcore/permissions.py`). On npm harness-managed runs, approval gates issue a single-run permit and the runtime blocks implementation completion without consuming it. Non-harness agent runs retain the model/artifact soft gate. Host adapters must require the permit before exposing write tools for complete write enforcement.
3. **Consult before parallel work** — specialists may draft in parallel only after Orchestrator opens the phase; tasks must be **non-overlapping**.  
4. **One conversation thread per decision** — e.g. “Homepage What you get section” — not drive-by edits.  
5. **Objections are mandatory when you disagree** — domain owners must veto or approve; “whatever” is invalid for Approve roles.  
6. **Consensus timeout** — if a Must-consult role has no reply after one explicit ask in-session, Orchestrator notes `abstain` and continues only if Approves are already met.  
7. **Anti-thrash** — max **2 revise rounds** per decision (`run-state.consensus.revise_round`); then **BLOCK** or ask the user.  
8. **User is final authority** — explicit user instruction overrides crew consensus; Orchestrator records `User override: …`.
---

## 4. Consensus before doing

### Consensus types

| Type | When | Rule |
|------|------|------|
| **Unanimous domain** | Implement UI/motion/copy | All **Approve** roles for that change type = yes |
| **Manager + domain** | Scores, report ship | Manager + relevant critic |
| **Full council** | Homepage / marketing redesign, delete conversion path | Manager + Empathy Mapper + Journey Critic + Craft + Motion (and Prose if copy-heavy) |

### Consensus log (required before implement)

```markdown
## Consensus: <decision title>
- **Proposal:** …
- **Hypothesis IDs:** H-…
- **From:** Frontend Design
- **Approves:** (each must cite ≥1 evidence line from that role’s own section — bare ✓ invalid; visual roles cite a DESIGN.md section)
  - Craft ✓ — evidence: …
  - Motion ✓ — evidence: …
  - Orchestrator ✓ — evidence: …
  - PM-Avery ✓ — evidence: …
  - PM-Jordan ✓ — evidence: …
- **Secondary harm pass:** each secondary PM lists one way this could hurt them if we ship — or “none”
- **Objections resolved:** …
- **Cross-critiques:** mutated | rejected | upheld — evidence in hypotheses.md
- **Rejected alternatives:** …
- **Priority persona this run:** …
- **Multi-persona impact:** Priority help/neutral/hurt · Secondary …
- **Preserve list intact?** yes/no
- **run-state updated?** yes (consensus.decision + approves)
- **Decision:** PROCEED | REVISE | BLOCK
```

**No consensus log → no code change** on standard/full Panel runs.  
**No cross-critiqued hypothesis IDs → no consensus PROCEED** for material proposals.
**Bare ✓ without evidence → consensus invalid** (anti rubber-stamp / theater).

### After PROCEED (write path)

1. **One Executor** applies the approved plan (or the human).  
2. Critics **re-score only** — no mid-edit redesign without a new consensus.  
3. If scores drop gates → **REVISE** (counts against revise_round cap).
4. **Implementation Verifier** inspects the running UI and writes the state matrix, screenshots, regression comparison, and verdict to `panel-report/verification.md`.
5. Any fix triggered by verification must be rechecked at the failed viewport/state. Only `verification.verdict: PASS` may set `delivery_status: SHIPPABLE`.
6. The verifier writes an outcome (`confirmed | disproved | inconclusive`) for every implemented hypothesis. A failed outcome routes back to its proposal owner and challenger, who must revise the artifact or test before another consensus.
7. The Orchestrator closes `panel-report/learning.md`: confirmed reusable learning updates its system of record; inconclusive learning becomes a named next-run test; disproved assumptions are marked so they are not repeated.

On review-only runs, unimplemented hypotheses are `untested`, not inconclusive or confirmed. They carry forward only when they retain an owner, trigger, and falsifiable test.

### Learning destinations

| Learning concerns | System of record owner | Durable destination |
|-------------------|------------------------|---------------------|
| Visual rule or component pattern | Design System Checker | `DESIGN.md` / `web/DESIGN.md` |
| Taste bar or anti-reference | Craft + Orchestrator | `docs/design-calibration.md` |
| Persona truth or non-negotiable | Empathy Mapper + affected PM | `docs/personas.md` |
| Journey behavior | Journey Critic | `panel-report/learning.md` until promoted to journey/product docs |
| Repeatable specialist method | Skill owner | relevant skill file |

Do not promote a one-off preference into a durable rule. Promotion requires observed evidence, owner approval, and a source run/hypothesis ID.

---

## 5. Conflict resolution

| Conflict | Resolution |
|----------|------------|
| Craft vs Frontend (library wants glass, craft says slop) | **Craft wins** on visual DNA; Frontend picks secondary style |
| Motion vs Frontend (heavy motion) | **Motion wins** on frequency/easing; delete or reduce |
| Journey vs Craft (ugly but converts) | Orchestrator: fix craft **without** removing conversion; both + priority PM approve final |
| Prose vs Persona Manager (voice) | **Persona Manager** on that human’s truth; Prose on anti-slop writing |
| Isa vs Prose (story vs polish) | **Isa** owns SB7 / sell structure; **Prose** owns AI-cadence kill — Prose must not delete the plan or CTA |
| Isa vs Craft (demo concept) | **Craft** wins if demo looks like template slop; Isa picks another product-show mode |
| Isa vs Frontend | Frontend does not invent hero/CTA copy; implements Isa’s approved scan layer after design brief |
| Two Persona Managers want priority | Negotiate for **this run**; losers get non-negotiables, not silence |
| Priority win harms secondary | Must get **hurt** PM Approve or revise — tunnel vision ban |
| Two Approves disagree | Orchestrator mediates with playbook; if still split → **BLOCK** and ask user |
| Specialist ignores matrix | Orchestrator voids their output; re-run with protocol |

---

## 6. What each role may never do alone

| Role | May not alone… |
|------|----------------|
| Frontend Design | Ship layout/code; override Craft/Motion; invent ICP; **search library or redesign without design brief from Orchestrator + Persona Managers** |
| Craft Critic | Delete install CTA; rewrite journeys; ship code without Manager |
| Motion Critic | Redesign IA; change copy strategy |
| Prose Critic | Change layout structure; rewrite StoryBrand plan without Isa |
| **Isa · Marketing Copywriter** | Ship layout/code; invent customers/metrics; override Craft on visual DNA; skip PM voice check |
| Journey Critic | Implement UI without Craft if visual surface changes |
| Empathy Mapper | Ship marketing page; approve craft scores alone |
| Persona Manager | Demand sole-priority always; rubber-stamp harm to their human |
| Heuristic Auditor | Implement; greenwash failed gates under pressure |
| Report Writer | Invent scores not produced by domain owners; drop secondary personas from report |
| Product Analyst | Approve personas as final without Orchestrator |
| **Orchestrator** | Skip preflight; skip priority council; single-persona tunnel vision; skip consensus; override PM Veto without user |

---

## 7. Single-agent simulation (Cursor / Claude / Grok)

When one model is the whole crew:

1. Label sections with role names (`## Orchestrator Manager`, `## Craft Critic`, …).  
2. Create / update `panel-report/run-state.yaml` at Phase 0.  
3. Run phases in order; do not merge “I decided everything” into one blob.  
4. Before editing product/code files on a standard/full run, write the **Consensus** block with evidence-cited Approves. Review artifacts and run-state updates are allowed before consensus.
5. If you catch yourself redesigning without personas → **stop**, open Phase 0.  
6. Prefer **isolated role sections + summary return** to the Orchestrator — do not paste every role’s full scratchpad into the next role.

---

## 8. Lite mode

User: “Only fix this button’s focus ring.”

- Preflight: **lite** · `run_class: lite` · `protocol: short`  
- Approves: Orchestrator (implicit) + Craft or Design System as relevant  
- No full council · no design brief  
- Report/note: `Preflight: lite · Consensus: lite`  
- Still write a one-line preserve check if touching conversion UI  

---

## 9. Process quality checklist (after full/standard runs)

After standard/full runs, write `panel-report/process-score.md` (`yes | no | n/a`):

1. Preflight GO + run_class + protocol set?  
2. Priority table + secondary non-negotiables in run-state?  
3. Design brief answered before library search (if UI redesign)?  
4. `design_system` loaded/drafted + alignment + **doc_quality** scored by Design System Checker?
5. Handoffs used Objective / Inputs / Output (not Claim-only)?  
6. Multi-persona impact on each implement proposal?  
7. Consensus log with evidence-cited Approves (visual → DESIGN.md section) before write?  
8. Preserve list intact after fixes?  
9. One Executor after PROCEED (no multi-author thrash)?  
10. New UI patterns updated DESIGN.md same change?  
11. Every in-scope seat produced its minimum `panel-report/*.md` artifact?
12. Every recommendation has evidence, persona effect, and an acceptance check?
13. Applicable interaction/content states are covered or explicitly `n/a`?
14. Desktop + mobile browser evidence captured after the final edit?
15. Visual regression and preserve-list comparison passed?
16. DESIGN.md delta recorded as updated or `none` with rationale?
17. Every material proposal has a hypothesis ID and falsifiable test?
18. Every required cross-critique records a mutation, rejection, or evidence-based uphold?
19. Every implemented hypothesis has a verifier outcome?
20. Confirmed learning updated the correct system of record, and unresolved learning has a next-run test?
21. Structured findings validate, deduplicate specialist overlap, and cite real source artifacts?

Any **no** → record process debt. On implement runs, the result is not SHIPPABLE and must be `REVISE` or `BLOCK` according to severity. On review-only runs, implementation-only checks are `n/a` with a reason and do not alter the report decision.

---

## Related

- Phase order / short buyer protocol: `PANEL.md`  
- Full crew + phases: `PANEL.full.md` · roster: `AGENTS.md`  
- Run-state template: `docs/run-state.template.yaml`  
- Personas: `docs/personas.md`  
- Runtime gates (stub → hard): `panelcore/permissions.py`
