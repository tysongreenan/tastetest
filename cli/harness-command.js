import { HarnessError, HarnessRuntime } from "./harness.js";

export function runHarnessCommand(args) {
  try {
    const common = { projectRoot: args.dir, runId: args.runId };
    let result;
    if (args.subcommand === "start") {
      const runtime = HarnessRuntime.start({
        ...common,
        runClass: args.runClass,
        reviewOnly: args.reviewOnly,
      });
      result = runtime.status();
    } else {
      const runtime = HarnessRuntime.open(common);
      if (args.subcommand === "status") result = runtime.status();
      else if (args.subcommand === "events") result = runtime.events();
      else if (args.subcommand === "advance") {
        result = runtime.advance({
          phase: args.phase,
          artifacts: args.artifacts,
          permitId: args.permit,
        });
      } else if (args.subcommand === "authorize") {
        result = runtime.authorize({
          action: args.action,
          approvals: args.approvals,
          consensusDecision: args.consensus,
        });
      } else if (args.subcommand === "block") result = runtime.block(args.reason);
      else throw new HarnessError("SUBCOMMAND_INVALID", "Use harness start|status|events|advance|authorize|block.");
    }
    printResult(result, args.json);
    return { ok: true, result };
  } catch (error) {
    const code = error instanceof HarnessError ? error.code : "HARNESS_ERROR";
    if (args.json) console.log(JSON.stringify({ ok: false, error: { code, message: error.message } }, null, 2));
    else console.error(`Harness ${code}: ${error.message}`);
    return { ok: false, error };
  }
}

function printResult(result, json) {
  if (json) {
    console.log(JSON.stringify({ ok: true, result }, null, 2));
    return;
  }
  if (Array.isArray(result)) {
    for (const event of result) console.log(`${event.sequence}. ${event.type} · ${event.at} · ${event.hash.slice(0, 12)}`);
    return;
  }
  if (result.permitId) {
    console.log(`Write permit: ${result.permitId}\nAction: ${result.action}\nRun: ${result.runId}`);
    return;
  }
  console.log(`Run: ${result.runId}\nStatus: ${result.status}\nPhase: ${result.currentPhase}\nClass: ${result.runClass}`);
}
