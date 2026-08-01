import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

export const WRITE_POLICIES = Object.freeze(["read-only", "artifact-write", "product-write"]);

const HOSTS = Object.freeze({
  claude: {
    command: "claude",
    output: "json",
    capabilities: {
      headless: true,
      structuredOutput: true,
      sessionResume: true,
      nativeSandbox: false,
      preWriteHook: true,
      usageEvents: true,
    },
    args(request) {
      const args = ["-p", request.prompt, "--output-format", "json", "--max-turns", String(request.maxTurns)];
      if (request.policy === "read-only") args.push("--disallowedTools", "Edit", "Write", "NotebookEdit", "Bash");
      return args;
    },
  },
  codex: {
    command: "codex",
    output: "jsonl",
    capabilities: {
      headless: true,
      structuredOutput: true,
      sessionResume: true,
      nativeSandbox: true,
      preWriteHook: true,
      usageEvents: true,
    },
    args(request) {
      const sandbox = request.policy === "read-only" ? "read-only" : "workspace-write";
      return ["exec", "--json", "--ephemeral", "--sandbox", sandbox, request.prompt];
    },
  },
  grok: {
    command: "grok",
    output: "jsonl",
    capabilities: {
      headless: true,
      structuredOutput: false,
      sessionResume: false,
      nativeSandbox: false,
      preWriteHook: false,
      usageEvents: true,
    },
    args(request) {
      return ["-p", request.prompt, "--output-format", "streaming-json"];
    },
  },
});

export function createHostAdapter({ host, command, args = [], capabilities = {}, spawnImpl = spawn }) {
  const preset = HOSTS[host];
  if (!preset && !command) throw new HostAdapterError("HOST_UNKNOWN", `Unknown host: ${host}`);
  return new SubprocessHostAdapter({
    host,
    command: command || preset.command,
    fixedArgs: args,
    capabilities: { ...(preset?.capabilities || {}), ...capabilities },
    buildArgs: preset?.args || ((request) => [...args, request.prompt]),
    output: preset?.output || "text",
    spawnImpl,
  });
}

export class SubprocessHostAdapter {
  constructor({ host, command, fixedArgs, capabilities, buildArgs, output, spawnImpl }) {
    this.host = host;
    this.command = command;
    this.fixedArgs = fixedArgs;
    this.hostCapabilities = Object.freeze({ host, ...capabilities });
    this.buildArgs = buildArgs;
    this.output = output;
    this.spawnImpl = spawnImpl;
    this.active = new Map();
  }

  capabilities() {
    return this.hostCapabilities;
  }

  async runSeat(request) {
    validateRequest(request);
    const prompt = buildSeatPrompt(request);
    const normalized = { ...request, prompt, maxTurns: request.maxTurns || 12 };
    const args = [...this.fixedArgs, ...this.buildArgs(normalized)];
    const enforcement = this._enforcement(request);
    const startedAt = new Date().toISOString();

    return new Promise((resolve, reject) => {
      const child = this.spawnImpl(this.command, args, {
        cwd: request.projectRoot,
        env: {
          ...process.env,
          PANEL_RUN_ID: request.runId,
          PANEL_WRITE_POLICY: request.policy,
          PANEL_ALLOWED_PATHS: JSON.stringify(request.allowedPaths),
          PANEL_PERMIT_ID: request.permitId || "",
          PANEL_HOOK_HOST: this.host,
        },
        stdio: ["ignore", "pipe", "pipe"],
      });
      this.active.set(request.runId, child);
      const stdout = [];
      const stderr = [];
      let bytes = 0;
      const maxBytes = request.maxOutputBytes || 2_000_000;
      const collect = (bucket) => (chunk) => {
        bytes += chunk.length;
        if (bytes > maxBytes) {
          child.kill("SIGTERM");
          return;
        }
        bucket.push(chunk);
      };
      child.stdout?.on("data", collect(stdout));
      child.stderr?.on("data", collect(stderr));
      const timeout = setTimeout(() => child.kill("SIGTERM"), request.timeoutMs || 300_000);
      child.on("error", (error) => {
        clearTimeout(timeout);
        this.active.delete(request.runId);
        reject(new HostAdapterError("HOST_START_FAILED", `${this.command}: ${error.message}`));
      });
      child.on("close", (code, signal) => {
        clearTimeout(timeout);
        this.active.delete(request.runId);
        const stdoutText = Buffer.concat(stdout).toString("utf8");
        const stderrText = Buffer.concat(stderr).toString("utf8");
        if (bytes > maxBytes) {
          reject(new HostAdapterError("HOST_OUTPUT_LIMIT", `Host exceeded ${maxBytes} output bytes.`));
          return;
        }
        if (signal === "SIGTERM") {
          reject(new HostAdapterError("HOST_TIMEOUT", `Host exceeded ${request.timeoutMs || 300_000}ms.`));
          return;
        }
        if (code !== 0) {
          reject(new HostAdapterError("HOST_EXIT_FAILED", `${this.command} exited ${code}: ${stderrText.slice(-1000)}`));
          return;
        }
        const missing = request.allowedPaths.filter((relative) => !existsSync(path.join(request.projectRoot, relative)));
        if (missing.length) {
          reject(new HostAdapterError("SEAT_OUTPUT_MISSING", `Host did not create: ${missing.join(", ")}.`));
          return;
        }
        resolve({
          host: this.host,
          startedAt,
          completedAt: new Date().toISOString(),
          enforcement,
          exitCode: code,
          stdout: parseOutput(stdoutText, this.output),
          stderr: stderrText,
          outputArtifacts: request.allowedPaths.map((relative) => ({
            path: relative,
            bytes: readFileSync(path.join(request.projectRoot, relative)).length,
          })),
        });
      });
    });
  }

  cancel(runId) {
    const child = this.active.get(runId);
    if (!child) return false;
    child.kill("SIGTERM");
    return true;
  }

  _enforcement(request) {
    if (request.policy === "read-only" && this.hostCapabilities.nativeSandbox) return "hard-sandbox";
    if (this.hostCapabilities.preWriteHook && request.hooksInstalled) return "hard-hook";
    return "soft-audit";
  }
}

export class HostAdapterError extends Error {
  constructor(code, message) {
    super(message);
    this.name = "HostAdapterError";
    this.code = code;
  }
}

function validateRequest(request) {
  if (!request?.runId || !request?.role || !request?.objective || !request?.projectRoot) {
    throw new HostAdapterError("SEAT_REQUEST_INVALID", "runId, role, objective, and projectRoot are required.");
  }
  if (!WRITE_POLICIES.includes(request.policy)) {
    throw new HostAdapterError("WRITE_POLICY_INVALID", `Unknown write policy: ${request.policy}.`);
  }
  if (!Array.isArray(request.allowedPaths) || (request.policy === "artifact-write" && !request.allowedPaths.length)) {
    throw new HostAdapterError("ALLOWED_PATHS_INVALID", "Artifact-write seats require explicit allowed paths.");
  }
  if (request.policy === "product-write" && !request.permitId) {
    throw new HostAdapterError("PERMIT_REQUIRED", "Product-write seats require a harness permit.");
  }
}

function buildSeatPrompt(request) {
  const skills = request.skillFiles.map((relative) => {
    const absolute = path.join(request.projectRoot, relative);
    if (!existsSync(absolute)) throw new HostAdapterError("SKILL_MISSING", `Missing skill: ${relative}.`);
    return `\n## Skill: ${relative}\n${readFileSync(absolute, "utf8")}`;
  }).join("\n");
  return `# Panel seat packet

Run: ${request.runId}
Phase: ${request.phase}
Seat: ${request.role}
Objective: ${request.objective}
Write policy: ${request.policy}
Allowed outputs: ${request.allowedPaths.join(", ") || "none"}
Inputs: ${request.inputArtifacts.join(", ") || "none"}

Read the supplied skills completely. Work only this seat. Write exactly the allowed outputs. Do not advance the harness or perform another seat's work.
Stamp every Markdown/YAML/text output with a line exactly like \`Run: ${request.runId}\`. Put \`"runId": "${request.runId}"\` at the top level of JSON outputs. Binary outputs require a sibling \`<filename>.provenance.json\` containing that runId and the binary SHA-256.
${skills}`;
}

function parseOutput(value, format) {
  if (!value.trim()) return [];
  if (format === "json") {
    try { return JSON.parse(value); } catch { return value; }
  }
  if (format === "jsonl") {
    return value.trim().split("\n").map((line) => {
      try { return JSON.parse(line); } catch { return { type: "raw", value: line }; }
    });
  }
  return value;
}
