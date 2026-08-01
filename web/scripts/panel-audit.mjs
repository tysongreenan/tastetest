import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "../panel-report");
const baseUrl = process.env.AUDIT_URL || "http://127.0.0.1:3000";

async function inspect(page, pathname, viewport) {
  await page.setViewportSize(viewport);
  const response = await page.goto(`${baseUrl}${pathname}`, { waitUntil: "networkidle", timeout: 30_000 });
  return page.evaluate((status) => ({
    status,
    title: document.title,
    h1Count: document.querySelectorAll("h1").length,
    unnamedLinks: [...document.querySelectorAll("a")].filter((element) => !element.textContent?.trim() && !element.getAttribute("aria-label")).length,
    unnamedButtons: [...document.querySelectorAll("button")].filter((element) => !element.textContent?.trim() && !element.getAttribute("aria-label")).length,
    overflow: document.documentElement.scrollWidth > window.innerWidth,
  }), response?.status() || 0);
}

async function main() {
  await mkdir(outDir, { recursive: true });
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
  } catch (error) {
    if (!String(error).includes("Executable doesn't exist")) throw error;
    browser = await chromium.launch({ channel: "chrome", headless: true });
  }
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 }, permissions: ["clipboard-read", "clipboard-write"] });
  const page = await context.newPage();
  const runtimeErrors = [];
  page.on("console", (message) => { if (message.type() === "error") runtimeErrors.push(message.text()); });
  page.on("pageerror", (error) => runtimeErrors.push(error.message));

  const desktop = await inspect(page, "/", { width: 1280, height: 800 });
  if (await page.locator('[data-panel-proof="harness"]').count() !== 1) {
    runtimeErrors.push("Harness proof section is missing or duplicated");
  }
  await page.screenshot({ path: path.join(outDir, "desktop-home.png"), fullPage: true });
  const copy = page.locator("#start button");
  await copy.click();
  await copy.getByText("Copied").waitFor({ timeout: 3_000 });
  const clipboard = await page.evaluate(() => navigator.clipboard.readText());

  const report = await inspect(page, "/report", { width: 1280, height: 800 });
  const semanticTableCount = await page.locator("table").count();
  const harness = await inspect(page, "/harness", { width: 1280, height: 800 });
  const mobile = await inspect(page, "/", { width: 375, height: 667 });
  const harnessMobile = await inspect(page, "/harness", { width: 375, height: 667 });
  await page.screenshot({ path: path.join(outDir, "mobile-home.png"), fullPage: true });

  const checks = {
    desktop,
    mobile,
    report,
    harness,
    harnessMobile,
    semanticTableCount,
    clipboard,
    runtimeErrors,
  };
  const failures = [];
  for (const [name, result] of Object.entries({ desktop, mobile, report, harness, harnessMobile })) {
    if (result.status !== 200) failures.push(`${name}: HTTP ${result.status}`);
    if (result.h1Count !== 1) failures.push(`${name}: expected one h1, found ${result.h1Count}`);
    if (result.overflow) failures.push(`${name}: horizontal overflow`);
    if (result.unnamedLinks || result.unnamedButtons) failures.push(`${name}: unnamed controls`);
  }
  if (clipboard !== "npx @tysongreenan/panel init") failures.push("install command was not copied");
  if (!semanticTableCount) failures.push("sample report has no semantic tables");
  if (runtimeErrors.length) failures.push(`runtime errors: ${runtimeErrors.join(" | ")}`);

  await writeFile(path.join(outDir, "homepage-smoke.json"), `${JSON.stringify({ ...checks, failures }, null, 2)}\n`);
  console.log(JSON.stringify({ ...checks, failures }, null, 2));
  await browser.close();
  if (failures.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
