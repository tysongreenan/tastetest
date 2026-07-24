# Agent collaboration, permissions & consensus

TasteTest is a **crew**, not a pile of freelancers.  
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
| DESIGN.md draft | Design System Checker | Frontend Design, Craft Critic | **Orchestrator** | Design System Checker |
| Craft score / redesign recs | Craft Critic | Frontend Design, Journey Critic, **priority PM** | **Orchestrator** + **Craft Critic** | Craft Critic |
| Motion Block/Approve | Motion Critic | Craft Critic | **Orchestrator** + **Motion Critic** | Motion Critic |
| Prose rewrites | Prose Critic | Empathy Mapper, **affected Persona Managers** | **Orchestrator** + **Prose Critic** | Prose Critic; PM if voice harms their human |
| **Design brief (visual prefs)** | Frontend Design | — | **Orchestrator** + **all seated Persona Managers** (must answer) | Frontend cannot proceed without answers |
| Design system / library pick | Frontend Design | Craft, Motion, Empathy Mapper, **all PMs** (after brief) | **Orchestrator** + **Craft** + **Motion** + **priority PM** | Craft or Motion; PM if brief ignored |
| Full report ship | Report Writer | All score owners + **all Persona Managers** (coverage check) | **Orchestrator** | Domain owner if misquoted; PM if persona coverage missing |
| **Code / UI implement** | Any specialist | See below | See below | See below |

### Implementation (after report, or scoped fix)

| Change type | Approve required | Notes |
|-------------|------------------|-------|
| Copy only | Prose + Orchestrator + **Persona Managers for voices touched** | |
| Visual layout / new sections | Craft + Orchestrator + **priority PM** | Secondary PM if non-negotiable surface |
| Motion / animation | Motion + Orchestrator | |
| Install / primary CTA | Orchestrator + Journey Critic + **priority PM** | Preserve-first |
| Remove feature / section | Orchestrator + Journey + Empathy Mapper + **all PMs who used it** | Never Craft alone |
| Tokens / DESIGN.md | Design System + Orchestrator | |
| Full homepage redesign | Orchestrator + **all Persona Managers** + Journey + Craft + Motion | Frontend proposes only; multi-persona impact required |

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

Before any visual redesign or ui-ux-pro-max search, Frontend Design **must ask** Orchestrator + every Persona Manager for preferences (feel, trust, references, depth, motion) — `FRONTEND.md` Step 0 — then load project **`DESIGN.md`** (`web/DESIGN.md` for TasteTest marketing) — Step 0b. Library cannot override DESIGN.md without Craft + Orchestrator.

```markdown
### Frontend Design → Managers | design brief | question
**Surface:** homepage / …
**Questions:** feel · trust/bounce · references · depth · motion
**Answers:**
- Orchestrator: …
- PM-<A>: …
- PM-<B>: …
```

No answers → **BLOCKED**. No inventing “what Avery wants” without PM-Avery speaking.

### Tunnel vision ban
Optimizing only for priority while harming a secondary without that PM’s Approve → **Persona coverage: weak**, Professionalism ≤ 6.

---

## 3. Talk protocol (how agents communicate)

Every handoff uses this shape (in the working transcript or `tastetest-report/council.md`):

```markdown
### [FROM] → [TO] | [PHASE] | [TYPE: proposal | objection | approve | veto | question]

**Claim:** …
**Evidence:** (files / gates / persona)
**Ask:** approve | revise | decide
**Blockers:** none | …
```

### Rules of engagement

1. **No silent execution** — before implementing, there must be a written **proposal** and required **approves**.  
2. **Consult before parallel work** — specialists may draft in parallel only after Manager opens the phase.  
3. **One conversation thread per decision** — e.g. “Homepage What you get section” — not drive-by edits.  
4. **Objections are mandatory when you disagree** — domain owners must veto or approve; “whatever” is invalid for Approve roles.  
5. **Consensus timeout** — if a Must-consult role has no reply after one explicit ask in-session, Manager notes `abstain` and continues only if Approves are already met.  
6. **User is final authority** — explicit user instruction overrides crew consensus; Manager records `User override: …`.

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
- **From:** Frontend Design
- **Approves:** Craft ✓ · Motion ✓ · Orchestrator ✓ · PM-Avery ✓ · PM-Jordan ✓ …
- **Objections resolved:** …
- **Rejected alternatives:** …
- **Priority persona this run:** …
- **Multi-persona impact:** Priority help/neutral/hurt · Secondary …
- **Preserve list intact?** yes/no
- **Decision:** PROCEED | REVISE | BLOCK
```

**No consensus log → no code change** on full EmpathFlow runs.

---

## 5. Conflict resolution

| Conflict | Resolution |
|----------|------------|
| Craft vs Frontend (library wants glass, craft says slop) | **Craft wins** on visual DNA; Frontend picks secondary style |
| Motion vs Frontend (heavy motion) | **Motion wins** on frequency/easing; delete or reduce |
| Journey vs Craft (ugly but converts) | Orchestrator: fix craft **without** removing conversion; both + priority PM approve final |
| Prose vs Persona Manager (voice) | **Persona Manager** on that human’s truth; Prose on anti-slop writing |
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
| Prose Critic | Change layout structure |
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

1. Label sections with role names (`## Manager`, `## Craft Critic`, …).  
2. Run phases in order; do not merge “I decided everything” into one blob.  
3. Before any file edit on a full run, write the **Consensus** block.  
4. If you catch yourself redesigning without personas → **stop**, open Phase 0.  

---

## 8. Lite mode

User: “Only fix this button’s focus ring.”

- Preflight: **lite**  
- Approves: Manager (implicit) + Craft or Design System as relevant  
- No full council  
- Report/note: `Preflight: lite · Consensus: lite`

---

## Related

- Phase order: `EMPATHFLOW.md`  
- Roster: `AGENTS.md`  
- Personas: `docs/personas.md`
