"use client";

/**
 * Homepage — Don’t Make Me Think, but still a product page
 * - Primary job: copy install (obvious)
 * - Secondary: prove it’s real (preview + short steps + sample)
 * - Depth lives in GitHub / /report — not a museum of sections
 */

import { ProductPreview } from "@/components/marketing/product-preview";
import { SiteFooter } from "@/components/marketing/site-footer";
import ButtonCopy from "@/components/smoothui/button-copy";
import SiriOrb from "@/components/smoothui/siri-orb";
import { AnimatedGradientBackground } from "@/components/ui/animated-gradient-background";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, BookOpen, ExternalLink, Terminal } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

const INIT_COMMAND = "npx tastetest init";
const REPO_INIT = "node bin/tastetest.js init";
const EASE = [0.23, 1, 0.32, 1] as const;
const GH = "https://github.com/tysongreenan/tastetest";
const GH_BLOB = `${GH}/blob/main`;

const ORB_COLORS = {
  bg: "oklch(0.98 0.01 265)",
  c1: "oklch(0.5 0.2 265)",
  c2: "oklch(0.65 0.14 230)",
  c3: "oklch(0.55 0.16 290)",
};

const STEPS = [
  {
    n: "1",
    title: "Init",
    body: "Drop skills into your repo.",
  },
  {
    n: "2",
    title: "Run",
    body: "Tell your agent: Run EmpathFlow.",
  },
  {
    n: "3",
    title: "Fix",
    body: "Ship from scores, P0s, and file paths.",
  },
] as const;

const SKILL_LINKS = [
  { file: "EMPATHFLOW.md", href: `${GH_BLOB}/EMPATHFLOW.md` },
  { file: "ANTI-SLOP.md", href: `${GH_BLOB}/ANTI-SLOP.md` },
  { file: "MOTION.md", href: `${GH_BLOB}/MOTION.md` },
  { file: "FRONTEND.md", href: `${GH_BLOB}/FRONTEND.md` },
  { file: "AGENTS.md", href: `${GH_BLOB}/AGENTS.md` },
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
  showHonesty = true,
}: {
  className?: string;
  showHonesty?: boolean;
}) {
  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "overflow-hidden rounded-2xl border border-border/80 bg-card",
          "shadow-[0_1px_0_oklch(0_0_0_/_0.04),0_20px_56px_-24px_oklch(0.45_0.18_265_/_0.4)]"
        )}
      >
        <div className="flex items-center gap-2 border-b border-border/70 bg-muted/50 px-3.5 py-2.5">
          <Terminal className="size-3.5 text-muted-foreground" aria-hidden />
          <span className="font-mono text-[11px] text-muted-foreground">
            install
          </span>
        </div>
        <div className="flex items-center gap-2 p-2 pl-4">
          <span className="select-none font-mono text-sm text-primary/80">$</span>
          <code className="min-w-0 flex-1 truncate font-mono text-[13px] font-medium tracking-tight sm:text-sm">
            {INIT_COMMAND}
          </code>
          <ButtonCopy
            labels={{ idle: "Copy", loading: "…", success: "Copied" }}
            onCopy={async () => {
              await navigator.clipboard.writeText(INIT_COMMAND);
            }}
            className="shrink-0 border-transparent bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
          />
        </div>
      </div>
      {showHonesty ? (
        <p className="mt-2.5 text-center text-[11px] leading-snug text-muted-foreground sm:text-left">
          Not on npm yet ·{" "}
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-[10px] text-foreground sm:text-[11px]">
            {REPO_INIT}
          </code>
        </p>
      ) : null}
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
              TasteTest
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
              href="#skills"
            >
              Skills
            </a>
            <a
              href={GH}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "h-8 gap-1.5 rounded-full px-3"
              )}
            >
              <GitHubIcon className="size-3.5" />
              <span className="hidden sm:inline">GitHub</span>
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
        {/* Hero — primary conversion + animated gradient */}
        <section id="start" className="relative overflow-hidden">
          <AnimatedGradientBackground
            breathing
            startingGap={118}
            breathingRange={5}
            animationSpeed={0.016}
            topOffset={12}
            containerClassName="z-0"
          />
          {/* Fade gradient into page canvas so body sections stay clean */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-32 bg-gradient-to-b from-transparent to-background"
          />

          <div className="relative z-10 mx-auto max-w-5xl px-5 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
            <motion.div
              className="text-center lg:text-left"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                reduceMotion ? { duration: 0 } : { duration: 0.3, ease: EASE }
              }
            >
              <h1 className="font-heading text-balance text-[2.35rem] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-5xl sm:leading-[1.05]">
                The UX review that{" "}
                <span className="bg-gradient-to-r from-primary to-[oklch(0.55_0.16_250)] bg-clip-text text-transparent">
                  lives in your repo
                </span>
              </h1>
              <p className="mx-auto mt-4 max-w-md text-pretty text-lg text-muted-foreground lg:mx-0">
                Acts like a skeptical buyer. Scores, file paths, fixes you can
                ship tonight.
              </p>

              <div className="mx-auto mt-8 max-w-md lg:mx-0">
                <InstallBlock />
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
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
                  href={GH}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "lg" }),
                    "h-10 gap-2 rounded-full px-4 text-muted-foreground"
                  )}
                >
                  <GitHubIcon className="size-4" />
                  GitHub
                </a>
              </div>
            </motion.div>

            <motion.div
              className="mx-auto w-full max-w-md lg:max-w-none"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.32, delay: 0.05, ease: EASE }
              }
            >
              <ProductPreview />
            </motion.div>
          </div>
          </div>
        </section>

        {/* How — three short steps */}
        <section
          id="how"
          className="border-y border-border/50 bg-card/40"
        >
          <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 sm:py-16">
            <h2 className="font-heading text-center text-2xl font-semibold tracking-tight sm:text-left sm:text-3xl">
              Three steps
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

        {/* Skills — mono list, not a card museum */}
        <section id="skills" className="mx-auto max-w-5xl px-5 py-14 sm:px-6 sm:py-16">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                Skills in the pack
              </h2>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Open the files. Full crew and process live on GitHub.
              </p>
            </div>
            <a
              href={`${GH}/tree/main/skills`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80"
            >
              Browse skills/
              <ExternalLink className="size-3.5 opacity-60" aria-hidden />
            </a>
          </div>
          <ul className="mt-8 divide-y divide-border/60 rounded-2xl border border-border/80 bg-card">
            {SKILL_LINKS.map((s) => (
              <li key={s.file}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-3 px-4 py-3.5 transition-colors hover:bg-muted/40 sm:px-5"
                >
                  <span className="font-mono text-sm font-medium text-foreground">
                    {s.file}
                  </span>
                  <ExternalLink
                    className="size-3.5 shrink-0 text-muted-foreground"
                    aria-hidden
                  />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-center text-sm text-muted-foreground sm:text-left">
            Named agent seats and vetoes:{" "}
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

        {/* Close — install again, short */}
        <section className="border-t border-border/50 bg-foreground text-background">
          <div className="mx-auto flex max-w-md flex-col items-stretch gap-5 px-5 py-16 text-center sm:px-6 sm:py-20">
            <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
              Start in your repo
            </h2>
            <div className="text-left [&_.bg-card]:bg-background [&_.text-foreground]:text-foreground [&_.text-muted-foreground]:text-foreground/55 [&_.border-border\/80]:border-border/20 [&_.border-border\/70]:border-border/15 [&_.bg-muted\/50]:bg-muted [&_.bg-muted]:bg-background/10">
              <InstallBlock showHonesty={false} />
              <p className="mt-2.5 text-center text-[11px] text-background/55 sm:text-left">
                Not on npm yet ·{" "}
                <code className="rounded bg-background/10 px-1 py-0.5 font-mono text-[10px] text-background/80">
                  {REPO_INIT}
                </code>
              </p>
            </div>
            <Link
              href="/report"
              className="inline-flex items-center justify-center gap-2 text-sm font-medium text-background/80 transition-colors hover:text-background"
            >
              <BookOpen className="size-4" aria-hidden />
              Sample report
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
