Run: 2026-08-06T00-22-16-197Z-eb32ee0d

# Verification

Verdict: PASS

- Validator now requires `verification.states.focus_not_obscured` for SHIPPABLE runs.
- A negative test removes the field and confirms `STATE_COVERAGE_INCOMPLETE` names it.
- Fresh installs receive the updated run-state and verification templates.
- Test suite: 11 passed, 0 failed.
- Browser and WCAG state evidence: n/a; this change modifies protocol and validation code, not a rendered UI.

