# DESIGN.md sync audit

**Seat:** Design System Checker  
**Use with:** [SKILL.md](SKILL.md) · living DESIGN.md path from run-state

Goal: prove the document matches **what ships**, and flag UI that violates **brand law**.

---

## 1. Resolve sources

| Source | Panel dogfood | Client |
|--------|---------------|--------|
| DESIGN.md | `web/DESIGN.md` | first hit: `DESIGN.md`, `docs/DESIGN.md`, `web/DESIGN.md`, brand.md |
| Tokens | `web/src/app/globals.css` | theme CSS, tailwind config, CSS vars |
| Fonts | `web/src/app/layout.tsx` | layout / theme provider |
| Components | `web/src/components/**` | app component dirs |
| Marketing page | `web/src/components/home-page.tsx` | landing route |

If no DESIGN.md → stop audit; run [STARTER.md](STARTER.md).

---

## 2. Section matrix

Score each row: **pass** (doc ↔ code agree) · **drift** (doc stale or code new without doc) · **fail** (UI violates doc law) · **n/a**

| Section | Check |
|---------|--------|
| **Overview / feel** | Feel paragraph still true of shipped page? |
| **Colors** | Primary, bg, fg, muted, border values/tokens match CSS vars or utilities in use |
| **Typography** | Families/weights/roles match font loading + class usage |
| **Layout / page order** | Documented section order matches homepage (or noted intentional change) |
| **Components** | Named components exist; major shipped blocks appear in inventory |
| **Shapes / elevation** | Radius/shadow claims match dominant patterns |
| **Motion** | Only documented surfaces animate; no new motion families silent |
| **Do’s and Don’ts** | Spot-check: no banned patterns in primary routes |
| **Voice** | Conversion strings (install cmd, CTA labels) match doc |
| **File map** | Paths resolve; no dead links |
| **Agent contract** | Present when multi-agent project; run-state fields known |
| **Known gaps** | Gaps still accurate; closed gaps removed |

---

## 3. Drift vs fail (critical distinction)

| Finding | alignment impact | Action |
|---------|------------------|--------|
| Doc lists token A; code uses token B intentionally shipped | **drift** | Update DESIGN.md to B |
| Code has new `FooCard` not in Components | **drift** | Add FooCard to DESIGN.md same PR |
| Code uses glassmorphism; doc bans it | **fail** | Fix code (or formal brand change + council) |
| Doc missing Agent contract / empty Colors | Use **doc_quality** (QUALITY.md); alignment may still pass for UI |

**Overall `alignment`:**

- **pass** — no fail; drift count 0 (or only n/a)  
- **drift** — ≥1 drift, 0 fail  
- **fail** — ≥1 fail (UI vs brand law)

---

## 4. Constraints extract (every load)

After matrix, write **3–5** constraints agents must honor this run, e.g.:

- Primary CTA = pill blue; install = terminal + labeled Copy  
- Launch order: hero+install+preview → steps → skills → dark close  
- No glass / traffic-light chrome / icon-only primary  
- Sample proof at `/report` (Acme), not dogfood  
- Type: Space Grotesk / DM Sans / Geist Mono  

Store in `design_system.constraints`.

---

## 5. Evidence format

```markdown
| Section | Score | Evidence |
|---------|-------|----------|
| Colors | pass | --primary in globals.css matches DESIGN.md table |
| Components | drift | ProductPreview ships; not listed under Components |
| Do’s and Don’ts | fail | glassmorphism on hero (home-page.tsx:…) |
```

One path or token cite per row. No vibes-only rows.
