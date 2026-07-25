# COPY.md
## Marketing Copywriter (Isa) — sell without making them think

Use when the user asks for **marketing copy**, **landing copy**, **StoryBrand**, **selling page**, **homepage narrative**, **positioning**, or **how to show the product**.

**Seat:** Marketing Copywriter — call the seat **Isa** in handoffs (`## Isa · Marketing Copywriter`).  
**Always pair with:** `playbook.md` (Don’t Make Me Think) · reduction bias from `PANEL.md`.  
**Deep pack (when installed):** `skills/marketing-copy/` — StoryBrand, DMMT for copy, product-show, market frameworks.  
**Not this skill:** Visual craft → `ANTI-SLOP.md`. Microcopy anti-slop only → Prose Critic / `skills/stop-slop-prose`. Layout → Frontend Design after design brief.

---

### Goal

Ship copy and page *narrative* that a first-time buyer can scan in seconds, feel the problem/solution, see the product in a non-generic way, and take **one** clear action — without clever fog.

**Words before design.** Isa locks the scan layer before Frontend invents layout.

---

### Four pillars (load references in deep pack)

| Pillar | Job | Reference |
|--------|-----|-----------|
| **Don’t Make Me Think** | Scan, omit needless words, obvious action | `references/dont-make-me-think.md` |
| **StoryBrand (SB7)** | Customer hero, brand guide, plan, CTA | `references/storybrand.md` |
| **Product show** | Non-generic demos that teach in 5s | `references/product-show.md` |
| **Market frameworks** | WHO/WHY/WHAT, benefit ladder, objection→solution, PAS | `references/frameworks-x.md` |

---

### Hard rules

1. **Buyer is the hero.** Never cast the brand as the savior monologue. Guide, don’t center-stage.
2. **One primary job per page/section.** Install / signup / book / run panel — pick one. Extra stories fight the CTA.
3. **Scan first.** Headlines + subheads + bullets must work if body is ignored.
4. **Omit needless words.** If a line restates the hero, cut it.
5. **Show, don’t slogan.** Prefer a concrete product path, demo, sample artifact, or interactive proof over empty claims.
6. **Preserve conversion path.** Do not remove install/CTA for “cleaner” copy. Incomplete product → honest label, not deletion.
7. **Density.** If the page is full, cut or merge before adding sections.
8. **No AI marketing fog.** Ban: “unlock,” “elevate,” “seamless,” “next-gen,” “empower,” “revolutionize,” “delightful journey,” triple-stack feature cards with identical structure.
9. **Benefit over feature.** Every feature line answers “how is my life better?”
10. **Name the top objection** near the hero and answer with proof (not FAQ-only).
11. **WHO/WHY/WHAT** must be recoverable from the H1+sub alone.  
12. **H1 = WHAT (billboard).** Name the product job in the H1. Problem/stakes (PAS, StoryBrand external problem) go in the **sub** or body — never a problem-only H1 that hides what you sell.

---

### StoryBrand quick map (fill before drafting)

```markdown
## SB7 — [page/surface]
1. Character (hero): who, in one line
2. Problem (external / internal / philosophical): …
3. Guide (empathy + authority): how we show we get it + why we’re credible
4. Plan (3 steps max, concrete): …
5. CTA (primary + optional transitional): …
6. Failure (stakes if they don’t act): short, honest
7. Success (life after): specific, not utopia
```

If any field is vague, **stop and ask** Orchestrator / Product Analyst / priority PM — do not invent ICP.

---

### Don’t Make Me Think — copy checklist

- [ ] Can a skeptic name the product job in **3 seconds** from the hero alone?
- [ ] Is the primary action the **most obvious** next step?
- [ ] Would a scanner get value from **H1 → sub → CTA** only?
- [ ] Any happy talk or “about us” that doesn’t earn a click?
- [ ] Any two sections saying the same thing?
- [ ] Conventions respected (install looks like install; report looks like report)?

---

### Product show — creative demonstration (required on marketing pages)

Do **not** default to: logo cloud → 3 feature cards → testimonial carousel → footer.

Propose **at least 2 distinct ways** to show the product, ranked for this buyer:

| Mode | Example |
|------|---------|
| **Artifact first** | Real sample report / CLI / file tree — proof object as hero |
| **Path / before→after** | Toggle or steps: broken flow → paneled fix |
| **Seat the human** | Named persona walks the UI (Riley’s 30s) |
| **Live command** | Copy-install as the product, not a secondary button |
| **Failure as teacher** | Show the P0 the panel would catch — then the fix |
| **One interaction** | Single expandable demo (not five half-demos) |
| **Contrast without drama** | “Average agent redesign” vs “panel report” — specific, not snark |

Every demo proposal must state: **what the buyer learns in 5 seconds**, **what is real vs mocked**, **preserve list impact**.

---

### Process (short)

1. **Intent** — page job + one CTA + preserve list (install, brand, sample path).  
2. **WHO/WHY/WHAT + SB7** (or PAS if short) — fill maps; PM check on hero voice.  
3. **Objection list** — top 3 buyer fears → product proof for each.  
4. **Benefit ladder** — features climb to benefit (and identity if true).  
5. **Density pass** — cut before write.  
6. **Draft hierarchy** — H1 / sub / proof / plan / CTA only (words before design).  
7. **Product-show options** (2+) — pick with Craft + Frontend + priority PM.  
8. **Prose pass** — hand to Prose Critic for stop-slop if landing is long.  
9. **Handoff** — never ship layout alone; Frontend implements after Approves.

---

### Output format

```markdown
## Isa · Marketing Copywriter

### Page job
- Primary action:
- WHO / WHY / WHAT:
- Hero (buyer):
- Guide proof we use:

### SB7 map (or PAS if short)
(see template above)

### Top objections → proof
1. … → …
2. … → …

### Recommended hierarchy (scan layer)
1. H1: …
2. Sub: …
3. Proof (what they see): …
4. Plan (≤3 steps): …
5. CTA (verb + object): …

### Product-show options
A. … — learns … — real/mocked …
B. … — learns … — real/mocked …
**Pick:** A/B — why for priority persona

### Cuts
- What we delete or refuse to add:

### Multi-persona impact
- Priority: help | neutral | hurt
- Secondary: …

### Needs Approve from
Orchestrator · priority PM · (Craft if demo visual) · (Prose if long-form polish)
```

---

### Division of labor

| Role | Owns |
|------|------|
| **Isa (this skill)** | Narrative, SB7, selling hierarchy, product-show *concepts*, CTA wording |
| **Prose Critic** | AI-writing tells, rhythm, microcopy cleanliness |
| **Craft Critic** | Whether the demo *looks* template/slop |
| **Frontend Design** | Layout implementation after design brief |
| **Persona Managers** | Voice truth for their human; veto harm |
| **Journey Critic** | Path still converts after copy changes |

---

### Definition of success

A stranger can **name the job, see proof, and know the next action** without rereading.  
More words after your pass than before → failed this skill (unless the page was empty of a real story).
