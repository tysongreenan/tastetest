# Live crew run — Homepage (review → brief → proposal → PM feedback → Orchestrator)

**No user approval required.** Orchestrator decides after Frontend presents context.

---

## 1. Review (current homepage)

### Journey Critic (Avery J1)
- Install CTA present and labeled Copy — **pass**
- Secondary actions now have icons — **improved**
- Risk: page still long; Avery may bounce before report if hero is heavy

### Craft Critic (ANTI-SLOP)
- Icons fixed; expand findings good
- Still risks: decorative grid + gradient hero can read “marketing template”
- Missing: stronger product chrome (sticky install after scroll optional)

### Motion Critic
- Expand findings + reduced-motion: OK
- Enter animations OK if &lt;300ms
- Don’t add marquee/ambient spam

### PM-Avery (review)
- Needs install obvious above fold — keep
- Report must feel usable in 30s — expand is good; needs clearer “this is the output”

### PM-Jordan
- Terminal install good
- GitHub with icon good
- Wants more “product” density less brochure padding

### PM-Sam
- Report card is main craft surface — push it further
- No missing icons on actions — enforce

---

## 2. Design brief (Frontend → Managers)

| | Feel | Trust | Depth | Motion | References |
|--|------|-------|-------|--------|------------|
| **PM-Avery** | Clear, fast | Init + report with paths | Built-out report OK | Light | Anti: busy AI gradients |
| **PM-Jordan** | Linear/Raycast | Real terminal, GitHub | Interactive product demo | Micro-interactions | linear.app, raycast.com |
| **PM-Sam** | Refined density | Serious report | Full sections | Purposeful only | Premium SaaS samples |
| **Orchestrator** | Avery priority | Preserve init | Secondaries non-negotiable | MOTION.md | Stack: Next/Tailwind/lucide/motion |

---

## 3. Frontend Design proposal

**Build:**
1. Tighter hero: less vertical waste, install #1, icons on every action
2. Sticky mini-install bar after scroll (Avery + Jordan)
3. Problem section denser chips with icons
4. How: icon steps + short motion
5. Report: interactive expand findings (keep), stronger chrome, link to /report with icons
6. Trust row with icons
7. Footer complete with icons

**Not build:** glassmorphism, scramble on H1, NumberFlow steppers, dogfood meta

---

## 4. Frontend Design → Persona Managers | feedback on proposal

| PM | Vote | Notes |
|----|------|-------|
| PM-Avery | **Approve** | Sticky install helps; don’t hide hero install |
| PM-Jordan | **Approve** | Sticky bar + terminal = product feel |
| PM-Sam | **Approve** | Report remains hero of craft; icons mandatory |

---

## 5. Frontend Design → Orchestrator Manager | request to build

**Context:** Homepage not launch-ready; icons were missing; sections felt thin.  
**Personas:** Avery priority; Jordan/Sam non-negotiables honored.  
**Changes requested:** Full rebuild of `home-page.tsx` per proposal above.  
**Preserve:** `npx tastetest init` + Copy labels.  
**PM Approves:** Avery ✓ Jordan ✓ Sam ✓  

### Orchestrator Manager decision

**PROCEED**

Evidence: preflight GO, brief complete, PM unanimous, preserve list intact, multi-persona impact help/neutral.  
Craft/Motion implicit approve of plan (icons, &lt;300ms motion, no slop toys).  
**Execute implement_approved now.**
