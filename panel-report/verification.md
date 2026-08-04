Run: 2026-08-04T17-48-20-903Z-d4080e50

# Verification

Verdict: PASS

- Installer integration test created a full install in a fresh directory.
- `.cursor/commands/panel-full.md` exists and contains the full-run and no-write-before-permit contract.
- `.claude/commands/panel-full.md` exists with the identical contract.
- Existing `/panel` command remains unchanged.
- Test suite: 11 passed, 0 failed.
- Browser states: n/a; this change installs host command files and has no rendered UI.

