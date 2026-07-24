# TasteTest product personas

**Owner:** Orchestrator preflight + **Persona Managers** (one per persona below).  
**Last updated:** 2026-07-24  
**Default priority proposal (homepage conversion):** P1 — Avery — *must be re-negotiated each full run; secondaries always keep non-negotiables.*

These are **TasteTest’s** users (who install and run EmpathFlow), not personas EmpathFlow invents for a third-party app under review.

### Persona Managers (seat every full run)

| Manager seat | Persona | Default non-negotiables (even if not priority) | Visual prefs (answer when Frontend Design asks) |
|--------------|---------|-----------------------------------------------|--------------------------------------------------|
| **PM-Avery** | Avery | Obvious install; sample report understandable in minutes | Clear, fast, not flashy; trust > decoration; interactive proof of the report OK |
| **PM-Jordan** | Jordan | Init looks real/re-runnable; OSS/skills credibility | Product-grade UI (Linear/Raycast-adjacent); terminal/install feel real; no toy demos |
| **PM-Sam** | Sam | Sample report looks serious/client-safe; no toy UI | Refined type, density, craft; reference-quality sections; motion purposeful only |

**Frontend Design must ask each PM** for feel / references / depth / motion before redesigning (`FRONTEND.md` Step 0), then load **`web/DESIGN.md`** (Step 0b) before library search.

Priority for a run is decided in the **persona priority council** (EMPATHFLOW 0C-bis). Do not optimize only for the winner.

---

## P1 — Avery · Indie founder / vibe-coder (PRIMARY)

| | |
|--|--|
| **Who** | Solo or tiny team. Ships product UI with Cursor / Claude Code. Not a trained designer. |
| **Context** | App “works” but demos and first-time users bounce. Ships weekly. |
| **JTBD** | Get a clear, prioritized read on whether the product *feels* trustworthy — and what to fix tonight. |
| **Says** | “My code is fine. Why doesn’t it convert?” |
| **Thinks** | “Is this another AI toy, or will it catch real friction?” |
| **Does** | Skims hero → copies install command → looks for sample output → tries on their repo. |
| **Feels** | Time-poor, skeptical of pretty marketing, allergic to empty demos. |
| **Pains** | Vague design feedback; agents that rewrite the brand; tools that need a PhD to start. |
| **Gains** | `npx tastetest init` works; report with file paths; fixes they can paste into issues. |
| **Success** | Install in &lt;2 minutes; understands the report in &lt;5; ships 1–2 P0 fixes same day. |
| **Homepage must prove** | Obvious install; real sample report; not AI slop; honest about skill-first workflow. |
| **Code anchors** | Hero CTA, `npx tastetest init`, sample report, TASTETEST.md |

---

## P2 — Jordan · Product engineer (design-system owner)

| | |
|--|--|
| **Who** | Eng at a small SaaS. Reviews PRs; cares about consistency and a11y. |
| **Context** | Agents generate UI that drifts from the system. Needs a repeatable gate. |
| **JTBD** | Drop a review process into the repo that agents and humans can re-run. |
| **Says** | “I need something in the codebase, not another SaaS tour.” |
| **Thinks** | “Does this respect DESIGN.md and real heuristics?” |
| **Does** | Checks GitHub, skill files, whether init is real, sample report quality. |
| **Feels** | Protective of craft; impatient with false affordances on a UX tool’s own site. |
| **Pains** | One-off reviews; no shared language; tools that delete intentional product paths. |
| **Gains** | Skills in-repo; playbook; preserve-first; craft + motion scores. |
| **Success** | Init wires Cursor/Claude; full review maps to PRs; re-runnable. |
| **Homepage must prove** | Open source credibility; agent roster depth; init does real onboarding. |
| **Code anchors** | `EMPATHFLOW.md`, `AGENTS.md`, skill packs, GitHub |

---

## P3 — Sam · Agency / freelance designer (secondary)

| | |
|--|--|
| **Who** | Audits client sites; needs client-ready critique language. |
| **Context** | Short engagements; ships decks and issues, not always code. |
| **JTBD** | Produce structured UX critique without starting from a blank doc. |
| **Says** | “Show me the report format.” |
| **Thinks** | “If their marketing has no taste, I won’t trust the tool.” |
| **Does** | Judges professionalism in 5 seconds; opens sample report. |
| **Feels** | Judges craft hard; shares with clients only if output looks serious. |
| **Pains** | Template-looking tools; meta/demo content instead of real findings. |
| **Gains** | Clean sample report; personas + journeys in output; actionable P0s. |
| **Success** | Sample report looks client-safe; language is specific. |
| **Homepage must prove** | Artifact quality; no fake UI toys; clear what the deliverable is. |
| **Code anchors** | Sample report section, `/report`, finding format |

---

## Journey priority (from personas)

| Priority | Journey | Primary persona |
|----------|---------|-----------------|
| 1 | Land → understand → copy `npx tastetest init` | Avery |
| 2 | See sample report → trust output shape | Avery + Sam |
| 3 | Init → Run EmpathFlow → get report.md | Avery + Jordan |
| 4 | Re-run / skill depth / GitHub | Jordan |

---

## Orchestrator + Persona Manager checklist

- [x] ≥2 personas with JTBD  
- [x] Default priority proposal marked (Avery) — re-negotiate per run  
- [x] Persona Managers named (PM-Avery, PM-Jordan, PM-Sam)  
- [x] Secondary non-negotiables listed  
- [x] Anchors to product surfaces  
- [ ] Revisit after first 10 real users (replace assumptions with evidence)
