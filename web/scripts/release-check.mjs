import { spawn } from "node:child_process";

const run = (command, args, options = {}) => new Promise((resolve, reject) => {
  const child = spawn(command, args, { stdio: "inherit", ...options });
  child.on("error", reject);
  child.on("close", (code) => code === 0 ? resolve() : reject(new Error(`${command} ${args.join(" ")} exited ${code}`)));
});

async function waitFor(url) {
  for (let attempt = 0; attempt < 40; attempt++) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Timed out waiting for ${url}`);
}

async function main() {
  await run("npm", ["run", "lint"]);
  await run("npm", ["run", "build"]);
  const server = spawn("npm", ["start"], { stdio: "inherit", env: { ...process.env, PORT: "3100", HOSTNAME: "127.0.0.1" } });
  try {
    await waitFor("http://127.0.0.1:3100");
    await run(process.execPath, ["scripts/panel-audit.mjs"], { env: { ...process.env, AUDIT_URL: "http://127.0.0.1:3100" } });
  } finally {
    server.kill("SIGTERM");
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
