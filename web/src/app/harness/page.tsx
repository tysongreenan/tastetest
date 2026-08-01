import { SiteFooter } from "@/components/marketing/site-footer";
import SiriOrb from "@/components/smoothui/siri-orb";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Check, ChevronDown, FileCheck2, LockKeyhole, ScanSearch, ShieldCheck } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "How the Panel harness works",
  description: "Five steps turn agent opinions into evidence-gated product work.",
};

const ORB_COLORS = {
  bg: "oklch(0.98 0.01 265)", c1: "oklch(0.5 0.2 265)",
  c2: "oklch(0.65 0.14 230)", c3: "oklch(0.55 0.16 290)",
};

const LOOP = [
  ["01", "Load a skill", "A real rule, not a role name"],
  ["02", "Write an artifact", "Every seat leaves a file"],
  ["03", "Challenge it", "Mutate, reject, or uphold"],
  ["04", "Unlock writes", "Evidence earns one permit"],
  ["05", "Prove it", "Browser evidence closes the run"],
] as const;

const GATES = [
  { icon: FileCheck2, verb: "Stamp", title: "Stale work cannot sneak in.", body: "Every artifact carries the active run ID. Binary proof is bound to its SHA-256 hash.", code: "ARTIFACT_PROVENANCE_INVALID" },
  { icon: LockKeyhole, verb: "Permit", title: "Agents cannot self-authorize.", body: "Required reviewers cite evidence. The executor gets one write permit, consumed once.", code: "PERMIT_INVALID" },
  { icon: ScanSearch, verb: "Verify", title: "Code is not the experience.", body: "Desktop, mobile, interactions, overflow, keyboard, and runtime errors decide PASS.", code: "panel-report/verification.md" },
] as const;

export default function HarnessPage() {
  return (
    <div className="min-h-full bg-background text-foreground">
      <header className="border-b border-border/60">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Panel home">
            <SiriOrb size="26px" animationDuration={22} colors={ORB_COLORS} />
            <span className="font-heading text-sm font-semibold">Panel</span>
          </Link>
          <Link href="/" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-1.5 rounded-full")}>
            <ArrowLeft className="size-3.5" aria-hidden /> Home
          </Link>
        </div>
      </header>

      <main>
        <section className="overflow-hidden border-b border-border/60">
          <div className="mx-auto max-w-5xl px-5 pb-14 pt-16 sm:px-6 sm:pb-20 sm:pt-24">
            <div className="max-w-3xl">
              <p className="font-mono text-xs font-semibold text-primary">FROM OPINION → EVIDENCE</p>
              <h1 className="font-heading mt-4 text-balance text-[2.65rem] font-semibold leading-[0.98] tracking-[-0.04em] sm:text-7xl">
                An agent can talk. A harness makes it prove.
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
                Five gates turn specialist feedback into product work you can inspect, authorize, and verify.
              </p>
            </div>

            <ol className="mt-12 grid border-y border-foreground/20 sm:grid-cols-5">
              {LOOP.map(([number, title, body], index) => (
                <li key={number} className={cn("relative py-5 sm:px-4 sm:py-6", index > 0 && "border-t border-foreground/15 sm:border-t-0 sm:border-l")}>
                  <div className="flex items-baseline gap-3 sm:block">
                    <span className="font-mono text-xs text-primary">{number}</span>
                    <h2 className="font-heading font-semibold sm:mt-5">{title}</h2>
                  </div>
                  <p className="mt-1 pl-8 text-sm text-muted-foreground sm:mt-2 sm:pl-0">{body}</p>
                  {index < LOOP.length - 1 ? <ArrowRight className="absolute -right-2.5 top-1/2 z-10 hidden size-5 -translate-y-1/2 rounded-full bg-background p-1 text-primary sm:block" aria-hidden /> : null}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-foreground text-background">
          <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 sm:py-20">
            <div className="flex max-w-3xl items-start gap-4">
              <ShieldCheck className="mt-1 size-6 shrink-0 text-[oklch(0.75_0.13_250)]" aria-hidden />
              <div>
                <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">Three things the model cannot talk around.</h2>
                <p className="mt-3 text-background/60">Prompts suggest behavior. These checks enforce it.</p>
              </div>
            </div>

            <div className="mt-10 border-t border-background/20">
              {GATES.map(({ icon: Icon, verb, title, body, code }) => (
                <article key={verb} className="grid gap-3 border-b border-background/20 py-6 sm:grid-cols-[7rem_1fr_1.1fr] sm:items-center sm:gap-6">
                  <p className="flex items-center gap-2 font-mono text-xs font-semibold text-[oklch(0.75_0.13_250)]"><Icon className="size-4" aria-hidden />{verb.toUpperCase()}</p>
                  <div><h3 className="font-heading text-lg font-semibold">{title}</h3><code className="mt-1 block font-mono text-[11px] text-background/45">{code}</code></div>
                  <p className="text-sm leading-relaxed text-background/65">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 py-14 sm:px-6 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="font-mono text-xs font-semibold text-primary">REAL RUN · 14 EVENTS</p>
              <h2 className="font-heading mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">It blocked us, too.</h2>
              <p className="mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
                The homepage looked good and passed browser checks. The harness still refused to close because its learning record was incomplete.
              </p>
            </div>

            <div className="border-t border-foreground/20">
              <div className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-foreground/15 py-4">
                <div><p className="font-heading font-semibold">Production UI</p><p className="text-sm text-muted-foreground">Desktop, mobile, semantics, runtime</p></div>
                <span className="flex items-center gap-1.5 font-mono text-xs font-semibold text-emerald-700"><Check className="size-3.5" /> PASS</span>
              </div>
              <div className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-foreground/15 py-4">
                <div><p className="font-heading font-semibold">Learning record</p><p className="text-sm text-muted-foreground">Missing machine-readable fields</p></div>
                <span className="font-mono text-xs font-semibold text-red-700">BLOCKED</span>
              </div>
              <div className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-foreground/15 py-4">
                <div><p className="font-heading font-semibold">Corrected evidence</p><p className="text-sm text-muted-foreground">13 skills · 3 findings · permit consumed</p></div>
                <span className="flex items-center gap-1.5 font-mono text-xs font-semibold text-emerald-700"><Check className="size-3.5" /> CLOSED</span>
              </div>

              <details className="group border-b border-foreground/15 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium">What the full run records <ChevronDown className="size-4 transition-transform group-open:rotate-180" aria-hidden /></summary>
                <div className="mt-4 grid gap-2 font-mono text-xs text-muted-foreground sm:grid-cols-2">
                  {["phase order", "artifact hashes", "skill-use proof", "hypothesis mutations", "approval evidence", "write permits", "browser states", "durable learning"].map((item) => <span key={item}>→ {item}</span>)}
                </div>
              </details>
            </div>
          </div>
        </section>

        <section className="border-t border-border/60 bg-[oklch(0.965_0.018_265)]">
          <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 px-5 py-12 sm:flex-row sm:items-center sm:px-6">
            <div><p className="font-heading text-2xl font-semibold">Put the harness in your repo.</p><code className="mt-2 block font-mono text-sm text-primary">npx @tysongreenan/panel init</code></div>
            <Link href="/report" className={cn(buttonVariants({ size: "lg" }), "gap-2 rounded-full px-5")}>See a finished report <ArrowRight className="size-4" aria-hidden /></Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
