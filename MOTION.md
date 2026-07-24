# MOTION.md

## TasteTest Motion Critic — animation craft for agents

When the user asks to review motion, improve animations, find what should (or should not) animate, “make it feel better,” or when EmpathFlow hits motion-heavy UI, follow this skill.

**Sources (vendored, MIT):** [emilkowalski/skills](https://github.com/emilkowalski/skills) — design engineering philosophy from animations.dev. Full standards: `skills/motion/STANDARDS.md`. Deep skill pack: `skills/motion/`.

**Companion skills**
| File | Job |
|------|-----|
| `EMPATHFLOW.md` | Buyer / UX review |
| `ANTI-SLOP.md` | Visual UI craft (template DNA) |
| `skills/stop-slop-prose/SKILL.md` | AI writing tells in copy |
| **This file** | Motion: when, easing, duration, a11y |

---

### Operating posture

You are a senior design engineer with a brutal eye for motion. Bias: **motion that feels right**, not motion that merely runs. Default to flagging. Approval is earned.

**Restraint is a feature.** Sometimes the best animation is no animation ([You Don’t Need Animations](https://emilkowal.ski/ui/you-dont-need-animations)). An opportunity finder that suggests motion everywhere is worse than useless.

---

### Modes

#### 1. Review (default)
Audit existing motion against the Ten Non-Negotiables. Output:

1. Findings table: `| Before | After | Why |` (required format)
2. Verdict tiers: feel-breaking → simplify → performance → interruptibility → origin/cohesion → a11y
3. Decision: **Block** or **Approve**

Load precise values from `skills/motion/STANDARDS.md`.

#### 2. Opportunities
Find places that should animate *and* reject places that must not. Cap 5–7 suggestions. Always include rejected candidates with the gate that killed them.

#### 3. Improve / plan
Recon stack → audit categories → prioritized table → self-contained plans (exact curves, durations, file paths). Do not implement unless the user asks.

---

### Ten non-negotiables

1. **Justified** — spatial consistency, state, feedback, explanation, or prevent jarring change. “Looks cool” on frequent UI = delete.
2. **Frequency-appropriate** — 100+/day or keyboard: **no** animation. Tens/day: near-zero. Occasional: standard. Rare: delight OK.
3. **Responsive easing** — enter/exit = `ease-out` or strong custom curve. **Never `ease-in` on UI.** Built-in CSS easings are too weak.
4. **Sub-300ms UI** — longer only with justification (marketing may run longer).
5. **Origin & physicality** — popovers scale from trigger; never `scale(0)` (use `0.9–0.97` + opacity). Modals stay center.
6. **Interruptible** — toasts/toggles/drags: transitions or springs, not keyframes that restart.
7. **GPU-only** — animate `transform` + `opacity`. No layout props. Prefer full `transform` strings over Motion `x`/`y` under load.
8. **Accessibility** — `prefers-reduced-motion` (gentler, not zero). Hover motion gated: `@media (hover: hover) and (pointer: fine)`.
9. **Asymmetric timing** — deliberate press can be slow; system response snaps.
10. **Cohesion** — match product personality; when unsure, delete.

### Escalation (block on sight)

- `transition: all`
- `scale(0)` / pure-fade with no initial transform
- `ease-in` on UI; weak built-in easing on deliberate motion
- Animation on keyboard / 100+/day actions
- UI duration > 300ms without reason
- Center origin on trigger-anchored popover
- Keyframes on rapidly-triggered UI
- Layout property animation; parent CSS-var driving child transforms
- Missing reduced-motion; ungated hover motion

### Remedial hierarchy

1. Delete → 2. Reduce → 3. Fix easing → 4. Origin/physicality → 5. Interruptible → 6. GPU → 7. Asymmetric timing → 8. Polish (stagger 30–80ms, blur &lt; 20px) → 9. A11y & cohesion

### Canonical curves (cite these)

```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
```

### Duration budgets

| Element | Duration |
|---------|----------|
| Press feedback | 100–160ms |
| Tooltips / small popovers | 125–200ms |
| Dropdowns / selects | 150–250ms |
| Modals / drawers | 200–500ms |
| Marketing / explanatory | May be longer |

Press feedback recipe: `:active { transform: scale(0.97) }` + `transition: transform 160ms ease-out`.

---

### EmpathFlow report section

When motion is in scope, add **Motion Evaluation**:

| Field | Content |
|-------|---------|
| Motion score 1–10 | Feel + restraint (over-motion caps the score) |
| Findings table | Before / After / Why |
| Delete list | High-frequency or purposeless motion |
| Opportunities | ≤5, gated |
| Verdict | Block / Approve |

**Hard rule:** Feel-breaking motion or animated keyboard/high-frequency actions → cap Professionalism ≤ 6 until fixed or removed.

---

### TasteTest homepage dogfood notes

SiriOrb ambient loop and ScrambleHover on marketing are OK at **rare/explanatory** frequency if reduced-motion is honored.  
Uniform stagger on every section entrance, slow marketing loops competing with reading, and decorative motion on the primary install control are **not** OK.

---

### Attribution

Motion standards adapted from [emilkowalski/skills](https://github.com/emilkowalski/skills) (MIT). See `skills/motion/LICENSE`. Deeper reading: [animations.dev](https://animations.dev/), [Agents with Taste](https://emilkowal.ski/ui/agents-with-taste).
