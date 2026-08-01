# Panel execution harness

Panel's npm runtime owns run order, admitted artifacts, approval permits, validation, and event history. It does not yet launch model providers or intercept arbitrary editor writes.

## Start and inspect

```bash
npx @tysongreenan/panel harness start --run-class full
npx @tysongreenan/panel harness status
npx @tysongreenan/panel harness events
```

Use `--run-id <id>` to address a specific run. Without it, commands use `.panel/current-run.json`.

## Advance phases

The active phase is authoritative. Required artifacts must exist before it can advance.

```bash
npx @tysongreenan/panel harness advance --phase preflight
npx @tysongreenan/panel harness advance --phase product
npx @tysongreenan/panel harness advance --phase journeys
```

Additional artifacts may be admitted with repeated `--artifact <project-relative-path>` options. Artifacts are constrained to the project root and recorded with SHA-256 hashes.

### Artifact provenance

Managed runs reject stale artifacts even when the expected path already exists:

- Markdown, YAML, and text files require a line-level `Run: <active-run-id>`, `run_id: <active-run-id>`, or `runId: <active-run-id>` stamp.
- JSON files require top-level `"runId": "<active-run-id>"` (legacy `run_id` is accepted by the runtime).
- Binary evidence requires `<filename>.provenance.json` with `runId` and the binary's current `sha256`.

Changing a binary after creating its sidecar invalidates provenance. The runtime checks provenance before hashing and admitting every required or additional artifact.

Use `--review-only` with `standard` or `full` to omit consensus, implementation, and verification while retaining cross-critique and learning closure.

## Authorize implementation

After the consensus phase, issue a permit for one registered action:

```bash
npx @tysongreenan/panel harness authorize \
  --action implement_layout \
  --consensus PROCEED \
  --approve "Orchestrator Manager=panel-report/council.md#orchestrator" \
  --approve "Craft Critic=panel-report/craft.md#approve" \
  --approve "Design System Checker=panel-report/design-system.md#approve" \
  --approve "PM-Avery=panel-report/council.md#pm-avery"

npx @tysongreenan/panel harness advance --phase implement --permit <permit-id>
```

Unknown actions and bare approvals fail closed. Every approval must cite an existing `panel-report/path#section`. A permit belongs to one run, must be the active permit, and is consumed once.

## Block a run

```bash
npx @tysongreenan/panel harness block --reason "Browser verification unavailable"
```

Blocked and completed runs cannot advance.

## Storage and integrity

Each run is stored under `.panel/runs/<run-id>/`:

- `state.json` is the current materialized state.
- `events.jsonl` is a hash-chained append-only event history.
- `permits/*.json` records issued and consumed write permits.
- `write.lock` prevents concurrent mutation of one run.

The runtime verifies sequence numbers, previous hashes, event hashes, and state/event agreement before every operation. Manual changes are reported as tampering.

## Current enforcement limit

The harness blocks invalid phase completion and permit issuance. It cannot prevent a person or external coding agent from editing files outside the CLI. A model/host adapter must request a permit before exposing write tools to make write enforcement complete. Provider adapters, retries, checkpoints, cost traces, and autonomous seat scheduling are subsequent runtime layers.
