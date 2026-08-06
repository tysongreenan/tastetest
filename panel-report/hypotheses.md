Run: 2026-08-06T00-22-16-197Z-eb32ee0d

# Hypotheses

## H-001

- Problem: A focused component can be completely hidden while Panel's existing focus-visible check still passes.
- Change: Add WCAG 2.4.11 as a separate browser procedure, run-state field, validator gate, and generated command requirement.
- Expected: SHIPPABLE UI runs fail when focus-obstruction evidence is missing or failing.
- Cross-critique result: upheld with new evidence; the negative validator test fails closed on omission.
- Status: measured

