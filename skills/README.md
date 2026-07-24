# TasteTest agent skills

Skills agents load during EmpathFlow / craft / motion reviews.

| Skill | Path | Domain |
|-------|------|--------|
| EmpathFlow | [`../EMPATHFLOW.md`](../EMPATHFLOW.md) | Buyer UX, journeys, honesty |
| Anti-slop (UI) | [`../ANTI-SLOP.md`](../ANTI-SLOP.md) | Visual template DNA / “AI-looking” UI |
| Stop-slop (prose) | [`stop-slop-prose/`](stop-slop-prose/) | AI writing tells in microcopy & docs |
| Motion | [`../MOTION.md`](../MOTION.md) + [`motion/`](motion/) | Animation craft (Emil Kowalski standards) |
| Frontend Design | [`../FRONTEND.md`](../FRONTEND.md) + [`ui-ux-pro-max/`](ui-ux-pro-max/) | Premium pattern library (styles, palettes, type, stacks) |
| Playbook | [`../playbook.md`](../playbook.md) | Shared scoring criteria |
| Full roster | [`../AGENTS.md`](../AGENTS.md) | All 11 agents + when they run |

## Third-party attribution

| Package | Upstream | License |
|---------|----------|---------|
| Motion standards & methods | [emilkowalski/skills](https://github.com/emilkowalski/skills) | MIT — `motion/LICENSE` |
| Prose stop-slop | [hardikpandya/stop-slop](https://github.com/hardikpandya/stop-slop) | MIT — `stop-slop-prose/LICENSE` |
| UI/UX Pro Max pattern library | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | MIT — `ui-ux-pro-max/LICENSE` |

UI anti-slop is TasteTest-native. Library recommendations that fail craft/motion gates are rejected on purpose.

## Agent roster (skill-mapped)

See **[`AGENTS.md`](../AGENTS.md)** for the complete list (11 agents). Frontend-heavy order:

**Frontend Design → Craft Critic → Motion Critic → Prose Critic → EmpathFlow gates → implement**

## Install into a project

```bash
python -m empathflow init --project /path/to/app
```

Copies root skill entry files. Keep this `skills/` tree (or symlink) for motion standards, prose refs, and ui-ux-pro-max data.

```bash
# Optional global installs
npx skills@latest add emilkowalski/skills
# ui-ux-pro-max: use vendored skills/ui-ux-pro-max or upstream CLI (see uupm.cc)
```
