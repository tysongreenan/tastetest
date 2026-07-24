# TasteTest sample report — Acme Checkout

**Example output** (fictional product).  
This is what a run can look like after `npx tastetest init` and **Run EmpathFlow**.

**Target:** Acme web checkout  
**Method:** EmpathFlow full crew (preflight GO, personas, journeys, craft, motion)  
**Primary persona (for Acme):** Riley — first-time mobile buyer  

---

## Executive Summary

| Score | Value |
|-------|------:|
| **Fluidity** | **6 / 10** |
| **Professionalism** | **5 / 10** |
| **Craft / Anti-slop** | **6 / 10** |
| **Motion** | **7 / 10** |
| **Conversion readiness** | **4 / 10** |

Checkout works in happy path but first-time mobile buyers miss the primary action and cannot recover from card errors.

### Top issues
1. **P0** Pay CTA below the fold on mobile  
2. **P0** Card failure has no recovery path  
3. **P1** Empty cart does not guide next step  

### Quick wins
1. Pin Pay CTA in a sticky mobile bar  
2. Error state: Retry + Edit card + Support  
3. Empty cart: CTA to `/products`  

---

## Preflight

| Item | Result |
|------|--------|
| Personas | Riley (primary), Casey (returning buyer) |
| Preserve list | Cart line items, trust badges, Pay label |
| **Status** | **GO** |

---

## Personas (excerpt)

### Riley — first-time mobile buyer (PRIMARY)
- **JTBD:** Complete purchase quickly without guessing  
- **Does:** Lands from ad → scans total → looks for Pay  
- **Pains:** Tiny type, surprise fees, dead-end errors  
- **Anchors:** `app/checkout/page.tsx`, `components/PaymentForm.tsx`

### Casey — returning buyer
- **JTBD:** Reorder with saved card  
- **Pains:** Forced re-entry of address  

---

## Critical journeys

| Journey | Persona | Success criteria |
|---------|---------|------------------|
| J1 Checkout complete | Riley | Pay visible without scroll; success state clear |
| J2 Recover from card decline | Riley | Know next step in &lt;3 seconds |
| J3 Empty cart → browse | Riley | One clear path to products |

---

## Journey critique

### J1 — Checkout complete
**Fail.** On 390px width, primary **Pay** sits below the fold. Riley does not see the obvious action.  
**Evidence:** `app/checkout/page.tsx` — order summary stacks above CTA.

### J2 — Card decline
**Fail.** Red banner: “Payment failed.” No Retry, Edit card, or Support.  
**Evidence:** `components/PaymentForm.tsx`.

### J3 — Empty cart
**Partial.** “Nothing here yet” with no link.  
**Evidence:** `components/CartEmpty.tsx`.

---

## Hard gates

| Gate | Result |
|------|--------|
| Primary action visibility | **Fail** (mobile) |
| Error recovery | **Fail** |
| False affordances | Pass |
| Artifact / system status | Partial |

---

## Craft / Motion (summary)

- Craft 6/10 — consistent components; weak empty/error states  
- Motion 7/10 — no high-frequency abuse; spinner OK  

---

## Prioritized recommendations

| Pri | Action | Evidence |
|-----|--------|----------|
| P0 | Sticky mobile Pay bar | `app/checkout/page.tsx` |
| P0 | Decline: Retry + Edit + Support | `components/PaymentForm.tsx` |
| P1 | Empty cart → Shop products | `components/CartEmpty.tsx` |
| P2 | Show tax/shipping before Pay | summary component |

---

## Ideal first-time flow

1. Land on checkout with **total + Pay** visible  
2. Enter card → clear validation  
3. On decline → recover without leaving the form  
4. Success → order id + next step  

---

*Generated as a **sample** of TasteTest / EmpathFlow output. Your report will cite your real files and journeys.*
