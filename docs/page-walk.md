# Page walk — design a new page section by section, top to bottom

**Use when:** building a new page or rebuilding one end to end. Not for a single-section tweak (use a normal `standard` run).
**Artifact:** `panel-report/page-walk.md` (start from `docs/page-walk.template.md`), stamped with the active `Run:` ID.
**Command:** `/panel-page`.

AI page builds fail in a predictable way: every section is a heading, a paragraph and a card grid, stacked in the order the model has seen most often. The page walk stops that by making the panel decide, section by section, **why the section exists, what shape its content has, and what does the work besides text**, before anyone writes layout code.

---

## Where it sits in the harness

The walk is not a new phase. It fits the existing pipeline:

| Phase | Page-walk work |
|-------|----------------|
| `journeys` | Journey Critic drafts the **spine** (Step 1) from persona journeys |
| `critique` | Heuristic + Craft critique the spine and adjacent pages; Isa (full) drafts headlines for the ladder |
| `frontend` | Section **cards** (Step 2) and the **rhythm check** (Step 3). Pass `panel-report/page-walk.md` as an additional artifact: `panel harness advance --phase frontend --artifact panel-report/page-walk.md` |
| `cross_critique` | Adjacent seats challenge cards; each challenge mutates a card or upholds it with evidence |
| `consensus` | One consensus on the whole walk. Visual Approves cite a DESIGN.md section |
| `implement` | One Executor, one permit, builds **top to bottom** with a checkpoint per section (Step 4) |
| `verify` | Implementation Verifier as usual; optional `/jury` on the finished page (`docs/jury.md`) |

One run, one permit. There is no per-section permit and no redesign mid-build. A failed checkpoint stops the build and returns `REVISE`.

The discussion with the user happens at Orchestrator level, between phases: the user approves the spine before cards are written, and approves the cards before consensus. Seats work in their sandboxes and write to `page-walk.md`; they do not chat with the user.

---

## Step 1 — Spine (order before layout)

Owner: **Journey Critic**, with Isa on marketing pages and the priority PM.

1. **Page job** in one line, and the one primary action.
2. **Entry state:** who arrives, from where, knowing what, doubting what.
3. **The question ladder:** the questions that reader asks, in the order they ask them. Each question becomes at most one section. A typical buyer ladder: *What is this? → Is it for me? → Does it work? → How does it work? → What do I get? → Why trust it? → What do I do now?* Use the persona's real ladder, not this one.
4. For each section: **job**, the **question it answers**, and **what breaks if it is cut**. If nothing breaks, cut it (`PANEL.md` reduction bias applies to new pages too).
5. **Headline ladder test:** read only the section headlines top to bottom. They must tell the page's story on their own. If two headlines say the same thing, merge the sections.

**Gate:** the user and the priority PM approve the spine. No cards until then.

---

## Step 2 — Section cards (one per section, in order)

Owners per field. Each section gets one card:

| Field | Owner | Rule |
|-------|-------|------|
| **Job + question** | Journey | Copied from the spine |
| **Content shape** | Frontend + Isa | Name what the content *is* before choosing a layout (see below) |
| **Layout** | Frontend | Derived from the content shape, with a one-line reason. ASCII wireframe for desktop |
| **Visual carrier** | Frontend + Craft | The non-text thing that does the work: product artifact, live demo, diagram, real screenshot, one big number, comparison table, photo, interaction. "Icons" and "cards" do not count |
| **Text budget** | Isa (writes) · Craft (checks) | Word cap for the section; headline ≤ 10 words |
| **Mobile** | Frontend | What reorders, collapses, or is cut on mobile. Not "stacks" |
| **Motion** | Motion Critic | One purpose, or `none` |
| **DESIGN.md** | Design System Checker | Section cited, or `new pattern — needs DESIGN.md update` |
| **Persona impact** | PMs | help / neutral / hurt per seated PM |

### Content shape → layout

Choose the layout because of what the content is. Do not cycle through a list of trendy layouts. A bento grid or a marquee picked for variety is as generic as a card grid.

| Content shape | Layouts that fit | Usually wrong |
|---------------|------------------|---------------|
| One claim + one proof | Big statement beside or over the proof artifact | Three feature cards |
| A sequence / process | Numbered steps tied to one visual that changes per step; sticky scroll narrative | Icon + title + paragraph ×3 |
| A comparison | Table or side-by-side with the difference highlighted | Two marketing cards |
| One number that matters | Number as the hero of the section, source underneath | Stat strip of four vague numbers |
| A product artifact | Full-bleed or near full-bleed artifact, annotated | Artifact shrunk inside a fake window |
| Unequal set (one main, several minor) | Asymmetric: one large, the rest small | Equal grid |
| Equal set of truly parallel items | Compact list or table | Cards with eyebrows |
| Depth on demand | Tabs, accordion, or one expandable example | All the text up front |
| Voice / social proof (real only) | One quote large, attributed | Carousel of anonymous praise |

### Anti-boring checks (Craft runs these on every card)

- **Delete-the-body test:** remove the body copy. If the headline + visual carrier no longer does the section's job, the carrier is decoration. Fix the carrier, not the copy.
- **Text budget:** default caps for `Persuade` surfaces are headline ≤ 10 words, support line ≤ 25 words, **section total ≤ 60 words** excluding UI labels and code. Going over needs a written reason on the card (e.g. pricing details, legal). `Read` surfaces (docs, articles) set their own caps.
- **Neighbour check:** the same layout twice in a row needs a written reason (e.g. DESIGN.md consistency rule). It is a challenge, not a ban.
- **Template check:** would this section look the same on any other product's page? If yes, name what makes it this product's.

---

## Step 3 — Rhythm check (whole page)

Owner: **Craft Critic**, with Motion and the Design System Checker. One table, top to bottom:

| # | Section | Layout | Carrier | Words (cap) | Density | Background band |
|---|---------|--------|---------|-------------|---------|-----------------|

Check: dense and open sections alternate; the visual weight peaks at the sections that answer the hardest question; there is one signature moment at most; the primary action is reachable without scrolling back up; the mobile order still follows the question ladder.

---

## Step 4 — Build top to bottom (implement)

The Executor builds sections in spine order under the single permit. After each section:

1. Screenshot the section at desktop 1440 and mobile 390.
2. **Count words from the rendered DOM** for that section (not from source) and compare to the card's cap.
3. Check the card: layout matches the wireframe, carrier present and doing the job, mobile behaviour as written.
4. Record pass/fail per section in `page-walk.md` → *Build checkpoints*.

A failed checkpoint stops the build, records the reason, and returns `REVISE` to the panel. The Executor does not redesign the section on its own.

---

## Boundaries

- New section anatomy not in `DESIGN.md` → Design System Checker updates DESIGN.md in the same change, or it is drift (`web/DESIGN.md` agent contract).
- Reordering existing launch sections still needs Orchestrator + PM Approves.
- Isa owns the words; Craft enforces the budget but does not rewrite copy.
- Adjectives ("modern", "premium", "clean") on a card without a named layout, carrier and acceptance check make the card void.
