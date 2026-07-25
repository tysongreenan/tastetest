# StoryBrand (SB7) — for Panel marketing copy

Based on Donald Miller’s StoryBrand framework. Use as a **messaging map**, not as an excuse to write a novel.

## The story in one breath

The **customer** is the hero.  
They want something.  
They hit a problem.  
You are the **guide** (empathy + authority).  
You give a **simple plan**.  
You call them to **action**.  
You help them avoid **failure** and arrive at **success**.

If your draft makes the product the hero, rewrite.

---

## SB7 fields (required)

### 1. Character (hero)

Who, in concrete terms — not “everyone.”

- Panel default heroes: Avery (founder), Jordan (eng), Sam (designer) — pick **priority for this page**.  
- One line: “Indie founders shipping UI with Cursor who bounce first-time users.”

### 2. Problem (three levels)

| Level | Question | Example (Panel) |
|-------|----------|-----------------|
| **External** | What’s broken in the world? | Product works; buyers still leave |
| **Internal** | How do they feel? | “Is this another AI toy?” |
| **Philosophical** | Why is that wrong? | Shipping shouldn’t require a design PhD to feel trustworthy |

Lead with external; let internal show up in sub or proof. Don’t preach philosophical.

### 3. Guide

Two tools only:

- **Empathy:** “We know agents write UI that looks fine and still confuses buyers.”  
- **Authority:** sample report, OSS, install that works, real file paths — **show**, don’t claim “trusted by thousands” without proof.

### 4. Plan

**Maximum three steps.** Concrete verbs.

Example:

1. Init Panel in the repo  
2. Run a panel (agent seats personas)  
3. Ship from the report  

If you need four steps, you have two products — cut.

### 5. CTA

| Type | Use |
|------|-----|
| **Direct** | Primary: `npx @tysongreenan/panel init` / “Copy install” |
| **Transitional** | Lower commitment: “Sample report”, “See panel-report format” |

One direct CTA owns the page. Transitional never outshouts it.

### 6. Failure (stakes)

Short, honest cost of inaction — not fear-mongering.

- “Ship another week of pretty UI buyers bounce off.”  
- “Spend another night guessing which section is the problem.”

### 7. Success

Specific life-after — not utopia.

- “Report open in five minutes; two P0s filed the same day.”  
- “Install path obvious; sample looks client-safe.”

---

## Wire SB7 to page sections

| SB7 | Typical section |
|-----|-----------------|
| Character + Problem | Hero H1 + sub |
| Guide | Proof strip / sample / authority artifact |
| Plan | “How a panel runs” (3 steps) |
| CTA | Install block (repeated once at close) |
| Failure | Optional one line under sub or close — not a doom section |
| Success | Outcome line near CTA or in sample caption |

You do **not** need seven labeled sections. You need seven **answered** in the scan layer.

---

## Messaging one-liners (fill before draft)

```markdown
- One-liner: [Product] helps [hero] [result] without [pain].
- Problem word: …
- Success word: …
- Villain (force, not a competitor rant): e.g. “generic AI UI”
- Guide proof: …
```

---

## Anti-patterns (StoryBrand fails)

- Brand-as-hero: “We reinvented UX review…”  
- No plan: only vibes and feature soup  
- Vague CTA: “Join the revolution”  
- Competitor smear without product proof  
- Internal jargon the hero doesn’t use  

---

## Handoff to other seats

- **Persona Managers** must sign off that the hero voice matches their human.  
- **Product Analyst** confirms promised plan is shippable.  
- **Prose Critic** kills AI cadence after the story is right.  
- **Isa does not** invent metrics or customers — authority must be real.
