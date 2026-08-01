import { initProject } from "./init.js";
import { doctorProject } from "./doctor.js";
import { validateProject } from "./validate.js";
import { runHarnessCommand } from "./harness-command.js";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { version } = require("../package.json");

const HELP = `
Panel — a buyer panel that lives in your repo

Usage:
  npx @tysongreenan/panel init [options]
  npx @tysongreenan/panel@latest upgrade [options]
  npx @tysongreenan/panel doctor [options]
  npx @tysongreenan/panel validate [options]
  npx @tysongreenan/panel harness <subcommand> [options]
  npx @tysongreenan/panel --help

Commands:
  init     Onboard Panel into a project (default)
  upgrade  Safely refresh an existing install (backs up local changes)
  update   Alias for upgrade
  doctor   Check installation, version, files, and run readiness
  validate Validate run artifacts and SHIPPABLE gates
  harness  Runtime state machine: start, status, events, advance, authorize, block
  run      Placeholder — use your AI agent after init

Options:
  --dir <path>     Project root (default: current directory)
  --full           Include full council, design-system files, and deep skill packs
  --lite           Alias for default lean install (no packs)
  --force          Overwrite existing skill files
  --no-cursor      Skip Cursor rules/commands
  --no-claude      Skip Claude Code skill registration
  --dry-run        Print actions without writing
  --json           Machine-readable doctor/validate output

Harness options:
  --run-id <id>         Run identifier (defaults to current run)
  --run-class <class>   lite | standard | full | implement
  --review-only         Omit consensus/implement/verify phases
  --phase <phase>       Phase to complete with harness advance
  --artifact <path>     Additional admitted artifact (repeatable)
  --action <action>     Registered write action for authorize
  --approve <role=ref>  Approving role + panel-report/path#section (repeatable)
  --consensus <value>   PROCEED | REVISE | BLOCK
  --permit <id>         Write permit consumed by implement advance
  --reason <text>       Required block reason

Default install is lean (locked structure):
  PANEL.md · playbook.md · ANTI-SLOP.md · MOTION.md · COPY.md (Isa) + Cursor/Claude wiring

After init, open your AI coding agent and say:

  Run a panel

Cursor: /panel
`.trim();

/**
 * @param {string[]} argv
 */
export async function main(argv) {
  const args = parseArgs(argv);

  if (args.help) {
    console.log(HELP);
    return;
  }

  if (args.version) {
    console.log(version);
    return;
  }

  const command = args.command || "init";

  if (command === "init") {
    const result = await initProject({
      dir: args.dir,
      full: args.full,
      lite: args.lite,
      force: args.force,
      packageVersion: version,
      cursor: args.cursor,
      claude: args.claude,
      dryRun: args.dryRun,
    });
    process.exitCode = result.ok ? 0 : 1;
    return;
  }

  if (command === "upgrade" || command === "update") {
    const result = await initProject({
      dir: args.dir,
      full: args.full,
      lite: args.lite,
      upgrade: true,
      packageVersion: version,
      cursor: args.cursor,
      claude: args.claude,
      dryRun: args.dryRun,
    });
    process.exitCode = result.ok ? 0 : 1;
    return;
  }

  if (command === "doctor") {
    const result = doctorProject({ dir: args.dir, packageVersion: version, json: args.json });
    process.exitCode = result.ok ? 0 : 1;
    return;
  }

  if (command === "validate") {
    const result = validateProject({ dir: args.dir, json: args.json });
    process.exitCode = result.ok ? 0 : 1;
    return;
  }

  if (command === "harness") {
    const result = runHarnessCommand(args);
    process.exitCode = result.ok ? 0 : 1;
    return;
  }

  if (command === "run") {
    console.log(
      [
        "Automated multi-agent `run` is still in progress.",
        "After init, use your coding agent:",
        "",
        "  Run a panel",
        "  Do a Panel review",
        "",
        "Cursor: /panel",
      ].join("\n")
    );
    return;
  }

  if (command === "help") {
    console.log(HELP);
    return;
  }

  console.error(`Unknown command: ${command}\n`);
  console.log(HELP);
  process.exitCode = 1;
}

/**
 * @param {string[]} argv
 */
function parseArgs(argv) {
  /** @type {Record<string, any>} */
  const out = {
    command: undefined,
    subcommand: undefined,
    dir: process.cwd(),
    full: false,
    lite: false,
    force: false,
    cursor: true,
    claude: true,
    dryRun: false,
    help: false,
    version: false,
    json: false,
    runId: undefined,
    runClass: "standard",
    reviewOnly: false,
    phase: undefined,
    artifacts: [],
    action: undefined,
    approvals: [],
    consensus: undefined,
    permit: undefined,
    reason: undefined,
  };

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "-h" || a === "--help") out.help = true;
    else if (a === "-v" || a === "--version") out.version = true;
    else if (a === "--full") out.full = true;
    else if (a === "--lite") out.lite = true;
    else if (a === "--force") out.force = true;
    else if (a === "--no-cursor") out.cursor = false;
    else if (a === "--no-claude") out.claude = false;
    else if (a === "--dry-run") out.dryRun = true;
    else if (a === "--json") out.json = true;
    else if (a === "--review-only") out.reviewOnly = true;
    else if (a === "--run-id") out.runId = argv[++i];
    else if (a === "--run-class") out.runClass = argv[++i];
    else if (a === "--phase") out.phase = argv[++i];
    else if (a === "--artifact") out.artifacts.push(argv[++i]);
    else if (a === "--action") out.action = argv[++i];
    else if (a === "--approve") out.approvals.push(parseApproval(argv[++i]));
    else if (a === "--consensus") out.consensus = argv[++i];
    else if (a === "--permit") out.permit = argv[++i];
    else if (a === "--reason") out.reason = argv[++i];
    else if (a === "--dir" || a === "--project") {
      out.dir = argv[++i];
    } else if (!a.startsWith("-") && !out.command) {
      out.command = a;
    } else if (!a.startsWith("-") && !out.subcommand) {
      out.subcommand = a;
    } else {
      console.warn(`Ignoring unknown arg: ${a}`);
    }
  }

  return out;
}

function parseApproval(value = "") {
  const separator = value.indexOf("=");
  if (separator < 1) return { role: value, status: "yes", evidence: "" };
  return {
    role: value.slice(0, separator).trim(),
    status: "yes",
    evidence: value.slice(separator + 1).trim(),
  };
}
