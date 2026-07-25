# Design system (Design System Checker)

**Run:** Homepage audit · 2026-07-25  
**Seat:** Design System Checker  
**Path:** `web/DESIGN.md`  
**Live surface:** `http://localhost:3000` (+ `/report`)

---

## Summary

| Field | Value |
|-------|--------|
| **status** | `loaded` |
| **alignment** | **pass** (post-implement 2026-07-25) |
| **doc_quality** | **professional** |
| **Ship gate (visual implement)** | **Open** for polish only — lean launch restored; further roster expansion still needs council |

---

### Constraints (3–5) — for this run

- Primary CTA = pill blue + terminal install; command `text-foreground` on `bg-card` (close band safe)
- Documented launch order: hero+preview → three steps → **skills mono list** → dark close
- No glass / traffic-light chrome / icon-only primary
- Sample at `/report` (Acme); full crew depth originally off-home → GitHub `AGENTS.md`
- Type: Space Grotesk / DM Sans / Geist Mono; electric blue primary

---

### Section matrix

| Section | Score | Evidence |
|---------|-------|----------|
| Overview / feel | **drift** | Overview still says “Skills depth is a mono file list; crew/org live on GitHub, not the homepage.” Shipped page is hero → how → **full AgentRoster** → close. |
| Colors | pass | Primary blue CTAs, light canvas, dark close only at end; install card light surface on dark band. |
| Typography | pass | Space Grotesk H1/H2, DM Sans body, mono command — matches hierarchy table. |
| Layout / page order | **drift** | Launch structure § lists Skills mono list + “Still off the homepage: full crew portraits.” Code: `#crew` + `AgentRoster` (4 lead portraits + specialist list). Nav: How · **Crew** (not Skills). |
| Components | **drift** | `install-block`, `product-preview` match. `agent-roster` is documented as optional/depth but ships as primary mid-page. Skills mono list / `skills-showcase` not on home. |
| Elevation | pass | Soft lift on install/preview; dark close flat; no glass sections. |
| Motion | pass | Hero enter, gradient, preview auto-cycle, orb — documented surfaces. |
| Do’s and Don’ts | **drift** | “Link to proof (sample) before deep crew/skills” — hero promotes **Meet the crew** (outline) over **Sample report** (ghost). Equal portrait cards approach “same card DNA” risk. |
| Voice | pass | Install string `npx @tysongreenan/panel init`; “Run a panel” present. |
| Agent contract | pass | Present; run-state fields known. |
| Known gaps | pass | Scoped npm package; Acme sample labeled fictional; portraits illustrative. |

**Overall alignment: drift** — zero brand-law *fails* (no glass, install readable), but shipped page anatomy ≠ Launch homepage structure.

---

### DESIGN.md quality

- **Missing / thin:** Launch structure not updated after crew-forward landing-copy direction (`docs/landing-copy.md`).
- **Strong:** Agent contract, install-block ink rules, colors/type, a11y baseline, known gaps.
- **Proposed patch (pick one with council):**  
  **A)** Restore lean: skills mono list; crew → GitHub only (match current DESIGN.md).  
  **B)** Amend Launch structure: hero → steps → compact crew highlights (Orchestrator + link) → dark close; mark full roster optional.

---

### Ship gate

- **Do not** expand roster further until DESIGN.md matches code.  
- **Approve** audit findings.  
- **Veto** visual implement that adds sections without section-order Approves.  
- Evidence cite: **Layout · Launch homepage structure**, **Do’s and Don’ts**.
