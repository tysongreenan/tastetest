"use client";

/**
 * Homepage — lean conversion
 * - Primary job: copy install (Avery)
 * - Prove: sample report + real files (Sam / Jordan)
 * - Plain language: no crew / Orchestrator / P0 / seats jargon
 */

import { SiteFooter } from "@/components/marketing/site-footer";
import ButtonCopy from "@/components/smoothui/button-copy";
import SiriOrb from "@/components/smoothui/siri-orb";
import { AnimatedGradientBackground } from "@/components/ui/animated-gradient-background";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, BookOpen, ExternalLink, Terminal } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useRef } from "react";

const INIT_COMMAND = "npx @tysongreenan/panel init";
const EASE = [0.23, 1, 0.32, 1] as const;
const GH = "https://github.com/tysongreenan/tastetest";
const GH_BLOB = `${GH}/blob/main`;
const GH_TREE = `${GH}/tree/main`;

const ORB_COLORS = {
  bg: "oklch(0.98 0.01 265)",
  c1: "oklch(0.5 0.2 265)",
  c2: "oklch(0.65 0.14 230)",
  c3: "oklch(0.55 0.16 290)",
};

const STEPS = [
  {
    n: "1",
    title: "Install",
    body: "One command puts the review process in your project.",
  },
  {
    n: "2",
    title: "Ask",
    body: "Tell your agent: “Run a panel.”",
  },
  {
    n: "3",
    title: "Fix",
    body: "You get a scored report with file paths — what to change first.",
  },
] as const;

const HARNESS_STEPS = [
  { phase: "01", label: "Hypothesis", artifact: "hypotheses.md" },
  { phase: "02", label: "Specialists", artifact: "craft.md · copy.md" },
  { phase: "03", label: "Cross-critique", artifact: "findings.json" },
  { phase: "04", label: "Decision", artifact: "council.md" },
  { phase: "05", label: "Verify + learn", artifact: "learning.md" },
] as const;

/** Mono file list — eng proof without jargon */
const SHIPPED_FILES = [
  { label: "PANEL.md", href: `${GH_BLOB}/PANEL.md` },
  { label: "ANTI-SLOP.md", href: `${GH_BLOB}/ANTI-SLOP.md` },
  { label: "MOTION.md", href: `${GH_BLOB}/MOTION.md` },
  { label: "COPY.md", href: `${GH_BLOB}/COPY.md` },
  { label: "FRONTEND.md", href: `${GH_BLOB}/FRONTEND.md` },
  { label: "AGENTS.md", href: `${GH_BLOB}/AGENTS.md` },
] as const;

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function InstallBlock({
  className,
  caption,
}: {
  className?: string;
  caption?: string;
}) {
  const commandRef = useRef<HTMLElement>(null);

  const selectCommand = () => {
    const command = commandRef.current;
    if (!command) return;
    const range = document.createRange();
    range.selectNodeContents(command);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  };

  const copyCommand = async () => {
    if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
    await navigator.clipboard.writeText(INIT_COMMAND);
  };

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "overflow-hidden rounded-2xl border border-border/80 bg-card text-foreground",
          "shadow-[0_1px_0_oklch(0_0_0_/_0.04),0_20px_56px_-24px_oklch(0.45_0.18_265_/_0.4)]"
        )}
      >
        <div className="flex items-center gap-2 border-b border-border/70 bg-muted/50 px-3.5 py-2.5">
          <Terminal className="size-3.5 text-muted-foreground" aria-hidden />
          <span className="font-mono text-[11px] text-muted-foreground">
            install
          </span>
          <span className="ml-auto font-mono text-[10px] text-muted-foreground/80">
            npm
          </span>
        </div>
        <div className="flex items-center gap-2 p-2 pl-3.5 sm:pl-4">
          <span className="select-none font-mono text-sm text-primary/80">$</span>
          <code ref={commandRef} className="min-w-0 flex-1 whitespace-normal break-all font-mono text-[12px] font-medium leading-snug tracking-tight text-foreground sm:truncate sm:whitespace-nowrap sm:text-[13px] sm:leading-normal">
            {INIT_COMMAND}
          </code>
          <ButtonCopy
            labels={{ idle: "Copy", loading: "…", success: "Copied", error: "Select text" }}
            onCopy={copyCommand}
            onError={selectCommand}
            className="shrink-0 border-transparent bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
          />
        </div>
      </div>
      {caption ? (
        <p className="mt-2.5 text-center text-[11px] leading-snug text-muted-foreground sm:text-left">
          {caption}
        </p>
      ) : null}
    </div>
  );
}

function FilesMonoList() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/80 bg-card">
      <ul>
        {SHIPPED_FILES.map((file, i) => (
          <li
            key={file.label}
            className={cn(
              i > 0 && "border-t border-border/60",
              "flex items-center"
            )}
          >
            <a
              href={file.href}
              target="_blank"
              rel="noreferrer"
              className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3.5 transition-colors hover:bg-muted/40 sm:px-5"
            >
              <span className="select-none font-mono text-xs text-primary/70">
                $
              </span>
              <span className="min-w-0 flex-1 font-mono text-[13px] font-medium tracking-tight text-foreground">
                {file.label}
              </span>
              <ExternalLink
                className="size-3.5 shrink-0 text-muted-foreground/70"
                aria-hidden
              />
              <span className="sr-only"> (opens on GitHub)</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function HomePage() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative flex min-h-full flex-col overflow-x-hidden bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-5 sm:h-16 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <SiriOrb size="26px" animationDuration={22} colors={ORB_COLORS} />
            <span className="font-heading text-[15px] font-semibold tracking-tight">
              Panel
            </span>
          </Link>
          <nav
            aria-label="Primary"
            className="flex items-center gap-0.5 text-[13px] font-medium text-muted-foreground sm:gap-1"
          >
            <a
              className="hidden rounded-full px-3 py-1.5 transition-colors hover:bg-muted hover:text-foreground sm:inline"
              href="#how"
            >
              How
            </a>
            <a
              className="hidden rounded-full px-3 py-1.5 transition-colors hover:bg-muted hover:text-foreground sm:inline"
              href="#files"
            >
              Files
            </a>
            <a
              className="hidden rounded-full px-3 py-1.5 transition-colors hover:bg-muted hover:text-foreground md:inline"
              href="/harness"
            >
              Harness
            </a>
            <a
              href={GH}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "h-8 gap-1.5 rounded-full px-3"
              )}
            >
              <GitHubIcon className="size-3.5" />
              <span className="hidden sm:inline" aria-hidden>
                GitHub
              </span>
            </a>
            <a
              href="#start"
              className={cn(
                buttonVariants({ size: "sm" }),
                "ml-0.5 h-8 gap-1 rounded-full px-3.5"
              )}
            >
              Install
              <ArrowRight className="size-3.5" aria-hidden />
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section id="start" className="relative overflow-hidden">
          <AnimatedGradientBackground
            breathing
            startingGap={118}
            breathingRange={5}
            animationSpeed={0.016}
            topOffset={12}
            containerClassName="z-0"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-32 bg-gradient-to-b from-transparent to-background"
          />

          <div className="relative z-10 mx-auto max-w-2xl px-5 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-24">
            <motion.div
              className="text-center"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                reduceMotion ? { duration: 0 } : { duration: 0.3, ease: EASE }
              }
            >
              <p className="font-mono text-[11px] font-medium tracking-wide text-primary uppercase">
                Lives in your repo
              </p>
              <h1 className="font-heading mt-3 text-balance text-[2.2rem] font-semibold leading-[1.1] tracking-[-0.035em] sm:text-5xl sm:leading-[1.05]">
                A design-review team so your product{" "}
                <span className="bg-gradient-to-r from-primary to-[oklch(0.55_0.16_250)] bg-clip-text text-transparent">
                  doesn’t look like AI slop
                </span>
              </h1>
              <p className="mx-auto mt-4 max-w-md text-pretty text-lg text-muted-foreground">
                Install once. Tell Cursor or Claude Code{" "}
                <span className="font-medium text-foreground">Run a panel</span>.
                Get a scored report with file paths — not vague redesign notes.
              </p>

              <div className="mx-auto mt-8 max-w-lg text-left">
                <InstallBlock caption="Shipped today: Cursor and Claude Code · /panel" />
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/report"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "h-10 gap-2 rounded-full px-5"
                  )}
                >
                  <BookOpen className="size-4" aria-hidden />
                  Sample report
                </Link>
                <a
                  href="#files"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "lg" }),
                    "h-10 gap-2 rounded-full px-4 text-muted-foreground"
                  )}
                >
                  What gets installed
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <section
          id="harness"
          data-panel-proof="harness"
          className="border-y border-border/60 bg-[oklch(0.965_0.018_265)]"
        >
          <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 sm:py-20">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
              <div className="max-w-md">
                <h2 className="font-heading text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                  A harness, not a group chat.
                </h2>
                <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
                  Every specialist must change an artifact, decision, hypothesis, or test. Phase order, evidence hashes, approval gates, and single-use write permits keep the review accountable.
                </p>
                <Link href="/report" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80">
                  Inspect a finished run <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </div>
              <ol className="border-t border-foreground/15">
                {HARNESS_STEPS.map((step) => (
                  <li key={step.phase} className="grid grid-cols-[2rem_1fr] gap-3 border-b border-foreground/15 py-4 sm:grid-cols-[2.5rem_0.8fr_1.2fr] sm:items-center">
                    <span className="font-mono text-[11px] text-primary">{step.phase}</span>
                    <span className="font-heading font-semibold">{step.label}</span>
                    <code className="col-start-2 font-mono text-xs text-muted-foreground sm:col-start-auto">panel-report/{step.artifact}</code>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section id="how" className="bg-card/40">
          <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 sm:py-16">
            <h2 className="font-heading text-center text-2xl font-semibold tracking-tight sm:text-left sm:text-3xl">
              Three steps. One command.
            </h2>
            <ol className="mt-8 grid gap-6 sm:grid-cols-3 sm:gap-8">
              {STEPS.map((step) => (
                <li key={step.n}>
                  <p className="font-mono text-xs font-semibold text-primary">
                    {step.n}
                  </p>
                  <p className="font-heading mt-1.5 text-lg font-semibold tracking-tight">
                    {step.title}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          id="files"
          className="mx-auto max-w-5xl px-5 py-14 sm:px-6 sm:py-16"
        >
          <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                What gets installed
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Markdown playbooks your agent loads — the review process, craft
                checks, motion, and copy rules.
              </p>
            </div>
            <a
              href={`${GH_TREE}/skills`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80"
            >
              Browse on GitHub
              <ExternalLink className="size-3.5 opacity-70" aria-hidden />
            </a>
          </div>
          <FilesMonoList />
          <p className="mt-4 text-center text-sm text-muted-foreground sm:text-left">
            How the review team is structured:{" "}
            <a
              href={`${GH_BLOB}/AGENTS.md`}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              AGENTS.md
            </a>
          </p>
        </section>

        <section className="border-t border-border/50 bg-foreground text-background">
          <div className="mx-auto flex max-w-md flex-col items-stretch gap-5 px-5 py-16 text-center sm:px-6 sm:py-20">
            <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
              Start in your project
            </h2>
            <p className="text-sm text-background/65">
              Copy the install. Say Run a panel. Read the sample first if you
              want to see the output.
            </p>
            <div className="text-left">
              <InstallBlock />
            </div>
            <Link
              href="/report"
              className="text-sm font-medium text-background/80 underline-offset-4 hover:underline"
            >
              Sample report →
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
