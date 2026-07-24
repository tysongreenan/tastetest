# Review animations (method)

Strict review only. Does not write features or review non-motion code.

## Posture

Default to flagging. Approval is earned. Bar: [STANDARDS.md](STANDARDS.md) and root [MOTION.md](../../MOTION.md).

## Output (required)

### 1. Findings table

| Before | After | Why |
| --- | --- | --- |

One row per issue. Never a Before:/After: prose list. Cite `file:line`. Pull exact curves/durations from STANDARDS.md.

### 2. Verdict tiers

1. Feel-breaking regressions  
2. Missed simplifications (delete/reduce)  
3. Performance  
4. Interruptibility & timing  
5. Origin, physicality & cohesion  
6. Accessibility  

Close with **Block** or **Approve**.

**Block if:** feel-breaking easing/origin, animation on keyboard/high-frequency actions, `scale(0)`/`ease-in` on UI, non-GPU animation with easy GPU fix.

Adapted from emilkowalski/skills `review-animations` (MIT).
