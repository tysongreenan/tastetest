"use client";

import { cn } from "@/lib/utils";
import { FileCode2, Sparkles, Terminal } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const EASE = [0.23, 1, 0.32, 1] as const;

const STAGES = [
  {
    id: "init" as const,
    title: "Init in your repo",
    blurb: "Skills + Cursor / Claude wiring land next to your code.",
    icon: Terminal,
  },
  {
    id: "agent" as const,
    title: "Tell your agent",
    blurb: "Run EmpathFlow — or /tastetest in Cursor.",
    icon: Sparkles,
  },
  {
    id: "report" as const,
    title: "Ship from the report",
    blurb: "Scores, paths, P0s — paste into issues tonight.",
    icon: FileCode2,
  },
];

type StageId = (typeof STAGES)[number]["id"];

function StageVisual({ id }: { id: StageId }) {
  if (id === "init") {
    return (
      <div className="rounded-xl border border-border/80 bg-background p-4 font-mono text-xs">
        <p className="text-muted-foreground">$</p>
        <p className="mt-1 text-foreground">
          npx @tysongreenan/tastetest init
          <span className="ml-1 inline-block h-3 w-0.5 animate-pulse bg-primary align-middle" />
        </p>
        <p className="mt-3 text-[11px] text-emerald-700">
          ✓ EMPATHFLOW.md · ANTI-SLOP.md · Cursor /tastetest
        </p>
      </div>
    );
  }
  if (id === "agent") {
    return (
      <div className="space-y-2 p-1">
        <div className="ml-auto max-w-[90%] rounded-2xl rounded-br-md bg-primary px-3 py-2 text-xs text-primary-foreground">
          Run EmpathFlow
        </div>
        <div className="rounded-2xl rounded-bl-md border border-border/80 bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
          Walking checkout as Riley…
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-2 p-1 text-xs">
      <div className="flex gap-2">
        {["6", "5", "4"].map((v, i) => (
          <div
            key={i}
            className="flex-1 rounded-lg border border-border/70 bg-muted/40 py-2 text-center font-semibold tabular-nums"
          >
            {v}
            <span className="text-[10px] font-normal text-muted-foreground">
              /10
            </span>
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-l-2 border-border/70 border-l-red-500/70 bg-background px-2 py-1.5">
        <span className="font-mono text-[10px] font-bold text-red-700">P0</span>
        <span className="ml-2 text-muted-foreground">Pay below fold</span>
      </div>
    </div>
  );
}

export function PipelineDemo({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<StageId>("init");

  useEffect(() => {
    if (reduceMotion) return;
    const order: StageId[] = ["init", "agent", "report"];
    let i = 0;
    const id = window.setInterval(() => {
      i = (i + 1) % order.length;
      setActive(order[i]);
    }, 2800);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <div className={cn("w-full", className)}>
      <div className="grid gap-3 lg:grid-cols-[1fr_1.1fr] lg:gap-8">
        <ol className="flex flex-col gap-2">
          {STAGES.map((stage, index) => {
            const Icon = stage.icon;
            const on = active === stage.id;
            return (
              <li key={stage.id}>
                <button
                  type="button"
                  onClick={() => setActive(stage.id)}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-2xl border px-4 py-3.5 text-left transition-[border-color,background-color,box-shadow] duration-200",
                    on
                      ? "border-primary/40 bg-primary/5 shadow-sm"
                      : "border-border/70 bg-card hover:border-border hover:bg-muted/30"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-xl",
                      on
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="text-[11px] font-medium text-muted-foreground">
                        Step {index + 1}
                      </span>
                      {on ? (
                        <span className="size-1.5 rounded-full bg-primary" />
                      ) : null}
                    </span>
                    <span className="mt-0.5 block font-heading text-[15px] font-semibold tracking-tight">
                      {stage.title}
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      {stage.blurb}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="flex min-h-[220px] flex-col rounded-2xl border border-border/80 bg-card p-5 shadow-sm lg:sticky lg:top-24">
          <p className="mb-3 text-[11px] font-medium text-primary">
            Live preview
          </p>
          <div className="flex flex-1 flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={reduceMotion ? false : { opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, x: -6 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { duration: 0.2, ease: EASE }
                }
              >
                <StageVisual id={active} />
              </motion.div>
            </AnimatePresence>
          </div>
          <p className="mt-4 text-center text-[11px] text-muted-foreground">
            Click a step — or watch the loop
          </p>
        </div>
      </div>
    </div>
  );
}
