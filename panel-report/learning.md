Run: 2026-08-04T17-48-20-903Z-d4080e50

# Learning

- Keep `/panel` fast and scoped; expensive every-page work should be explicit as `/panel-full`.
- Generate host commands from one shared contract to prevent Cursor and Claude behavior drift.
- Installer wiring requires an integration test because core tests commonly disable host integrations.

