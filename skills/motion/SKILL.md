---
name: panel-motion
description: >
  Review, find, or plan UI motion against Emil Kowalski craft standards.
  Triggers: review animations, improve motion, find animation opportunities,
  make it feel better, motion critic, MOTION.md.
---

# Panel Motion Skill Pack

Entry point for agents: **`MOTION.md`** at repo root (Panel wiring + report format).

| File | Role |
|------|------|
| [../../MOTION.md](../../MOTION.md) | Primary skill for Panel agents |
| [STANDARDS.md](STANDARDS.md) | Curves, durations, springs, performance, a11y |
| [REVIEW.md](REVIEW.md) | Strict review method |
| [OPPORTUNITIES.md](OPPORTUNITIES.md) | What to animate / what to refuse |

## Upstream

Vendored and adapted from [emilkowalski/skills](https://github.com/emilkowalski/skills) (MIT).  
Install upstream directly: `npx skills@latest add emilkowalski/skills`

Panel packages a **Motion Critic** agent that always scores motion as part of Panel when UI is visual.
