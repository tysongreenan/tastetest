# ANTI-SLOP.md

## TasteTest craft skill — stop shipping AI-looking UI

Load this skill whenever you **build, redesign, or review** UI for visual quality.  
Pair with `EMPATHFLOW.md` for buyer/UX review. EmpathFlow answers “does it work for a human?”  
This file answers **“would a designer call this AI slop?”**

**Not the same as prose stop-slop.** AI *writing* tells → `skills/stop-slop-prose/` ([hardikpandya/stop-slop](https://github.com/hardikpandya/stop-slop)).  
AI *motion* mistakes → `MOTION.md` ([emilkowalski/skills](https://github.com/emilkowalski/skills)).  
This file is **layout / component / visual template DNA**.

**Trigger phrases:** anti-slop, craft pass, looks AI, generic UI, polish the design, visual quality, “make it not look AI-generated”

---

### Core thesis

Agents are good at **narrative** (section order, story beats, explaining the product).  
They are bad at **craft** (composition, rhythm, restraint, non-template structure).

A page can:
- Tell a clear story ↓ the fold  
- Pass Don’t Make Me Think  
- Still look like every other AI SaaS landing page  

That third failure is **slop**. TasteTest must detect it and refuse to produce it.

**If someone could screenshot this and say “AI made that” without doubt, it failed.**

---

### The split agents miss

| Dimension | What agents optimize | What craft needs |
|-----------|----------------------|------------------|
| Structure | Eyebrow → H2 → muted P → card grid | Varied layouts; one strong focal per screen |
| Proof | Fake “product UI” chrome | Real artifacts or intentionally designed ones |
| Density | Even padding everywhere | Rhythm: tight clusters, open air |
| Components | Reuse the same card shell | Different surfaces for different jobs |
| Copy scaffolding | “01 / 02 / 03” + uppercase kickers | Numbers only when sequence matters |
| Color | Safe blue + gray muted sections | Deliberate strategy; not default template |
| Motion | Orb + scramble + staggered cards | One memorable motion, not decoration spam |

**Rule:** After any UI change, run the **Slop test** below. EmpathFlow scores alone are not enough.

---

### Absolute bans (match → refuse → rewrite)

If you are about to ship any of these, stop and redesign the element.

#### Layout / structure
1. **Identical card grids** — same size cards, same icon/title/body pattern, 3–4 across  
2. **Section template on repeat** — every block is: tiny uppercase eyebrow + H2 + muted paragraph + grid  
3. **Numbered pipeline 01–04 as default** — only if order is the product; not as decoration  
4. **Sticky left marketing copy + right “mock”** — the 2024 SaaS cliché layout  
5. **Equal vertical sections forever** — same `py-20` + same card chrome with no climax  

#### Fake product chrome
6. **Traffic-light window dots** (red/yellow/green) on fake browser frames  
7. **Dashed mono “artifact” chips** as proof (`app/foo.tsx` in a dashed box) without a real product surface  
8. **Letter avatar circles** (M, J) as persona design  
9. **Green check / red bang journey steppers** that look like every onboarding template  
10. **Hero metric / score widgets** as decoration (big number + label + gradient) when not the actual product UI  

#### Type / chrome tells
11. **Tiny uppercase tracked eyebrow on every section** (“THE PRODUCT”, “THE ARTIFACT”)  
12. **All cards: `rounded-2xl` + `border` + soft shadow** — one treatment for everything  
13. **Muted gray body on near-white forever** — low contrast “elegance”  
14. **Stock Unsplash** as product explanation  

#### Behavior
15. **Interactive demos that don’t change the product story** (tag pickers, toys)  
16. **Shipping a rewrite that only rearranges slop patterns** (new narrative, same template DNA)

---

### Slop test (run before marking UI done)

Answer out loud (or in the report):

1. **Screenshot test** — Could a stranger tag this “AI landing page” in 2 seconds?  
2. **Template test** — Could I swap the logo/copy and sell a different product with zero layout change?  
3. **Section sameness** — Do 2+ major sections share the same skeleton?  
4. **Artifact honesty** — Is “product UI” real, designed, or cosplay?  
5. **Focal point** — Does each viewport have one thing the eye should hit first?  
6. **Restraint** — What did we *not* add on purpose?

If 1 or 2 is “yes” → failed. Rewrite structure, not only copy.

---

### Craft requirements (what “good” looks like)

When building or recommending UI:

1. **One composition idea per page** — not four stacked mini-landings  
2. **Vary section anatomy** — full-bleed vs inset, list vs split, dense vs sparse  
3. **Real or designed artifacts** — report should look like *this product’s* report, not generic browser chrome  
4. **Hierarchy via type & space first** — cards last  
5. **Fewer, better surfaces** — one excellent report preview beats three mediocre grids  
6. **Brand constraint** — honor `DESIGN.md`; if missing, draft one before inventing a system  
7. **Component libraries with jobs** — use library pieces for real interactions (copy, motion brand), not to fill space  

---

### Review mode (EmpathFlow integration)

When auditing, add a **Craft / Anti-slop** section:

| Score | Meaning |
|------:|---------|
| 1–3 | Obvious template / interchangeable SaaS |
| 4–5 | Clear story but section DNA is generic |
| 6–7 | Some intentional craft; a few template tells |
| 8–10 | Distinct, intentional, hard to call AI at a glance |

**Hard rule:** If craft ≤ 5, professionalism cannot exceed 6 — even if journeys are clear.

For each slop hit, cite:
- Pattern name (from bans list)
- File / section
- Why it reads as AI
- Minimum craft fix (structure change, not “use a nicer blue”)

---

### Build mode (when implementing UI)

Before writing JSX/CSS:

1. Read `DESIGN.md` (or create a tight one)  
2. List 3 **anti-references** (“not another 4-column pipeline”, “not fake window chrome”)  
3. Sketch **section anatomies** that differ (one sentence each)  
4. Implement  
5. Run Slop test  
6. If failed, **change layout**, don’t polish the same grid  

**Forbidden “fix”:** swapping copy inside the same eyebrow + H2 + 4 cards structure and calling it done.

---

### Dogfood examples (TasteTest homepage)

These shipped and looked like product narrative but **read as slop**:

| Pattern | Where it showed up |
|---------|-------------------|
| 01–04 equal pipeline cards | “From codebase to buyer critique” |
| Sticky pitch + fake report window | Report section with traffic-light dots |
| Letter avatar + 2×2 empathy grid | Buyer mode persona |
| ✓ / ! journey checklist | Critical journey column |
| Uppercase section eyebrows | Every block |
| Identical `rounded-2xl border shadow-sm` | Nearly all surfaces |

**Lesson for agents:** Explaining EmpathFlow visually ≠ designing a distinctive UI.  
Next pass must break section DNA and design one strong artifact, not four template zones.

---

### Pairing with EmpathFlow

| Skill | Job |
|-------|-----|
| `EMPATHFLOW.md` | Buyer journeys, honesty, cognitive load, conversion |
| `FRONTEND.md` | Premium pattern library (ui-ux-pro-max) |
| `ANTI-SLOP.md` | Visual craft / template DNA |
| `skills/stop-slop-prose/` | Microcopy & prose AI tells |
| `MOTION.md` | Animation craft, restraint, feel |
| `playbook.md` | Shared gates + catalogs |
| `AGENTS.md` | Full roster (11 agents) |

**Recommended agent order on a marketing page:** see `AGENTS.md`.  
Short version: **Frontend Design → Craft → Motion → Prose → EmpathFlow → implement.**
