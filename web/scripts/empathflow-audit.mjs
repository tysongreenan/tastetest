/**
 * Lightweight live audit for TasteTest homepage EmpathFlow dogfood.
 * Run: node scripts/empathflow-audit.mjs
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "../tastetest-report");
const URL = process.env.AUDIT_URL || "http://localhost:3000";

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });
  const page = await context.newPage();
  const findings = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") findings.push(`console.error: ${msg.text()}`);
  });
  page.on("pageerror", (err) => findings.push(`pageerror: ${err.message}`));

  const res = await page.goto(URL, { waitUntil: "networkidle", timeout: 30000 });
  findings.push(`status: ${res?.status()}`);

  await page.screenshot({ path: path.join(OUT, "desktop-hero.png"), fullPage: false });
  await page.screenshot({ path: path.join(OUT, "desktop-full.png"), fullPage: true });

  // Mobile
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: path.join(OUT, "mobile-hero.png"), fullPage: false });

  // Structure
  const audit = await page.evaluate(() => {
    const text = document.body.innerText;
    const h1 = document.querySelector("h1");
    const buttons = [...document.querySelectorAll("button")].map((b) => ({
      label: (b.getAttribute("aria-label") || b.textContent || "").trim().slice(0, 80),
      type: b.type,
    }));
    const links = [...document.querySelectorAll("a")].map((a) => ({
      text: (a.textContent || "").trim().slice(0, 60),
      href: a.getAttribute("href"),
    }));
    const playVideo = text.includes("Play video");
    const navLinks = document.querySelectorAll("header nav a").length;
    const headerVisible = getComputedStyle(document.querySelector("header nav") || document.body).display;
    const h1IsButton = !!h1?.querySelector("button");
    const copyButtons = buttons.filter((b) => /copy/i.test(b.label));
    const headings = [...document.querySelectorAll("h1,h2,h3")].map((h) =>
      h.textContent?.trim().slice(0, 80)
    );
    return {
      title: document.title,
      h1: h1?.textContent?.trim(),
      h1IsButton,
      playVideo,
      navLinkCount: navLinks,
      navDisplay: headerVisible,
      buttonCount: buttons.length,
      buttons: buttons.slice(0, 30),
      links: links.slice(0, 30),
      headings,
      copyButtons,
      hasInitCommand:
        text.includes("npx @tysongreenan/tastetest init") ||
        text.includes("npx tastetest init"),
      hasGithub: links.some((l) => l.href?.includes("github")),
    };
  });

  // Keyboard: tab through a few times
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto(URL, { waitUntil: "domcontentloaded" });
  const focused = [];
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press("Tab");
    const info = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      return {
        tag: el.tagName,
        label: (el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 60),
        outline: getComputedStyle(el).outlineStyle,
        outlineWidth: getComputedStyle(el).outlineWidth,
      };
    });
    if (info) focused.push(info);
  }

  // Click first expandable card if present
  const card = page.locator('[role="button"][data-card-id]').first();
  if (await card.count()) {
    await card.click();
    await page.screenshot({ path: path.join(OUT, "card-expanded.png") });
  }

  const report = {
    url: URL,
    findings,
    audit,
    keyboardSample: focused,
  };

  const { writeFile } = await import("node:fs/promises");
  await writeFile(path.join(OUT, "live-audit.json"), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
