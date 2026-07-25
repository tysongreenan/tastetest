# DESIGN.md professional quality bar

**Seat:** Design System Checker  
Scores the **document**, not the UI (UI = AUDIT alignment).

---

## Verdict

| `doc_quality` | Meaning |
|---------------|---------|
| **professional** | Agent-usable, specific, complete enough to enforce |
| **thin** | Usable but missing sections or specifics; patch this run or next |
| **rewrite** | Vague, generic AI brand essay, or unsafe to enforce; block visual invent until fixed |

---

## Required skeleton (professional)

Living DESIGN.md should include, in some form:

1. **Scope** — what surfaces this file governs  
2. **Overview / feel** — product-specific, one tight paragraph (not “modern premium SaaS”)  
3. **Colors** — token names + values or clear CSS var map  
4. **Typography** — families, roles, hierarchy notes  
5. **Layout** — page/section anatomy or grid rules  
6. **Components** — inventory of real building blocks  
7. **Do’s and Don’ts** — brand-specific bans (not only generic a11y)  
8. **File map** or source-of-truth paths for tokens/components  

**Strongly recommended for Panel / multi-agent repos:**

9. **Agent contract** — who loads, conflict rule, same-PR update  
10. **Motion** — allowed surfaces  
11. **A11y baseline**  
12. **Known gaps** — honest, current  
13. **Voice** — microcopy / conversion strings only (not full COPY)

Missing 1–8 → max **thin**. Missing feel + colors + components + don’ts → **rewrite**.

---

## Professional checks

| Check | Fail if |
|-------|---------|
| **Specificity** | Colors say “blue” with no token/value; type says “sans-serif only” |
| **Product voice** | Overview could apply to any startup; no install/proof/conversion truth |
| **Citeable sections** | Walls of prose without `##` sections agents can name in Approves |
| **No dead inventory** | Lists components/paths that don’t exist |
| **No silent invent** | “Optional” patterns described as shipping defaults when not in code |
| **Conflict clarity** | No statement that DESIGN.md beats pattern libraries (multi-agent) |
| **Length** | Either empty stubs **or** novel-length essays that bury tokens |
| **Anti-slop doc** | Gradient-word salad, “elevate the experience,” emoji decoration as structure |

---

## Thin vs rewrite (examples)

| Symptom | Verdict |
|---------|---------|
| Has tokens + components; missing Motion + Known gaps | **thin** — add sections |
| Has feel + don’ts; primary hex wrong vs CSS | **thin** + alignment **drift** |
| Only “use Tailwind and keep it clean” | **rewrite** |
| ui-ux-pro-max dump pasted as brand | **rewrite** — replace with product-inferred system |
| Excellent doc; one new component missing | **professional** + alignment **drift** |

---

## Refresh protocol

When `doc_quality` is thin or rewrite, Design System Checker **proposes** a DESIGN.md edit:

1. Preserve true brand decisions (feel, primary conversion, bans still intended).  
2. Pull facts from code (AUDIT sources).  
3. Fill skeleton gaps; delete dead inventory.  
4. Keep Agent contract if multi-agent.  
5. Do **not** expand into COPY/StoryBrand (point to COPY.md).  
6. Orchestrator Approves structural rewrites; same-PR for drift patches with UI.

---

## Output snippet

```markdown
### DESIGN.md quality
- doc_quality: professional | thin | rewrite
- Missing sections: …
- Specificity issues: …
- Proposed patch: (bullet list or link to diff)
```
