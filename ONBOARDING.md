# Panel is installed

This project was onboarded with `npx @tysongreenan/panel init --full`.

**Lean core always on. Heavy packs optional. Reduction over addition.**

## Run a review

```
Run a panel
```

### What to load

| User says | Load |
|-----------|------|
| Run a panel / Panel review | `PANEL.md` + `playbook.md` |
| UI / craft / anti-slop | + `ANTI-SLOP.md` |
| Animations / motion | + `MOTION.md` |
| Marketing / StoryBrand / sell | + `COPY.md` (Isa) |
| Design system / colors / type | + `FRONTEND.md` + `skills/ui-ux-pro-max` |

### Priority of truth

1. `PANEL.md` — buyer job + reduction bias  
2. `ANTI-SLOP.md` — does this look AI-made?  
3. `MOTION.md` — Emil motion standard  
4. `playbook.md` — shared principles  
5. `COPY.md` — marketing sell (Isa)  
6. Heavy packs — only when explicitly needed  

### Cursor / Claude

- Cursor: **`/panel`** (quick) · **`/panel-full`** (complete harness)
- Claude Code: **`/panel-full`** · `.claude/skills/panel/`

## Files

| Path | Role |
|------|------|
| `PANEL.md` | Core — always on |
| `playbook.md` | Don’t Make Me Think + density |
| `ANTI-SLOP.md` | Craft / anti-template |
| `MOTION.md` | Motion (when anything moves) |
| `COPY.md` | Isa — marketing / StoryBrand / product-show |
| `PRODUCT.md` / `EMPATHY.md` / `JOURNEY.md` / `REPORT.md` | Specialist seats |
| `FRONTEND.md` | Design-system work only |
| `skills/` | Deep packs (ui-ux-pro-max, motion, prose, marketing-copy) |
| `AGENTS.md` | Roster · run classes · protocol pack |
| `COLLABORATION.md` | Handoffs · Approves · consensus |
| `panel-report/` | Reports + `run-state.template.yaml` |

### Full multi-agent runs

1. Copy `panel-report/run-state.template.yaml` → `run-state.yaml`  
2. Set `run_class` + `protocol`  
3. No implement without consensus **PROCEED** (see `COLLABORATION.md`)

### Health checks

`npx @tysongreenan/panel doctor` checks installation health.
`npx @tysongreenan/panel validate` must pass before claiming **SHIPPABLE**.

## Re-run

```bash
npx @tysongreenan/panel@latest upgrade
npx @tysongreenan/panel@latest upgrade --full
```

Upgrade backs up locally changed managed files under `.panel/backups/` before replacing them.
