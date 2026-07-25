# ANTI-SLOP.md
## Visual craft — stop AI-looking UI

Use this when reviewing or building UI.  
**Seat:** Craft Critic.

### Core standard
Borrowed from the best anti-slop practice (Hallmark, Taste-Skill, Anthropic frontend-design, community “Design Slop” checklists):

- The UI must not look generically “AI-made”
- Prefer distinctive, intentional choices over safe averages
- One strong idea per section > many weak decorations
- **Evidence over vibes** — flag a pattern only with a concrete user-facing cost and the smallest fix

### Positive + negative references (required on redesign)

1. **Positive:** name 1–2 real products/sites whose craft we aim near (or project `DESIGN.md`).  
2. **Negative:** list 3–5 slop patterns to ban this run (gradient blob, card soup, fake dashboard…).  
3. Do not redesign from a blank “make it premium” prompt.

### Hard bans
- Identical card grids with the same eyebrow + title + body (“card soup”)
- Fake browser chrome / fake window frames used as decoration
- Purple gradients + Inter as the default “premium” look
- Icon rows that don’t do a job
- Extra badges, pills, and labels that add noise
- Sections that only restate the hero
- **Unsupported metrics / testimonials / logos** (invented social proof)
- **Fake product UI** that pretends to work (dead toggles, decorative charts)
- Thick decorative borders / glass everywhere with no hierarchy
- Mobile layout that only stacks desktop without re-prioritizing the job

### Required checks
1. **Glance test** — Can you tell what this product is in 3 seconds?
2. **Template test** — Does this look like every other AI landing page?
3. **Density test** — Is there more content than a first-time buyer needs?
4. **Hierarchy test** — Is the primary action the most obvious thing?
5. **States test** — Empty / loading / error / disabled exist where users hit them?
6. **Honesty test** — Claims and numbers have a source or are labeled sample/mock?
7. **A11y smoke** — Focus visible, labels on controls, contrast not decorative-only?

### Finding format (Craft Critic)

```markdown
- Pattern: …
- Evidence: (what on the page)
- User cost: …
- Smallest fix: …
- Verify: (how we know it’s fixed)
```

Do not declare “gradient = bad” without user cost. Prefer **delete or simplify** over restyle theater.

### Fix order
1. Delete
2. Merge
3. Clarify
4. Restructure
5. Add (last resort)

If craft is weak, do not add more content. Change structure.
