"use client";

import { cn } from "@/lib/utils";
import { FileCode2, MessageSquare, ScrollText } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const EASE = [0.23, 1, 0.32, 1] as const;
const TABS = [
  { id: "code" as const, label: "Code", icon: FileCode2 },
  { id: "agent" as const, label: "Agent", icon: MessageSquare },
  { id: "report" as const, label: "Report", icon: ScrollText },
];

type TabId = (typeof TABS)[number]["id"];

function CodePanel() {
  return (
    <div className="space-y-1 font-mono text-[11px] leading-relaxed sm:text-xs">
      <div className="flex gap-3 text-muted-foreground">
        <span className="w-4 shrink-0 text-right opacity-50">12</span>
        <span>
          <span className="text-primary/80">export function</span>{" "}
          <span className="text-foreground">Checkout</span>() {"{"}
        </span>
      </div>
      <div className="flex gap-3 text-muted-foreground">
        <span className="w-4 shrink-0 text-right opacity-50">13</span>
        <span className="pl-4">
          <span className="text-primary/80">return</span> (
        </span>
      </div>
      <div className="flex gap-3 rounded bg-primary/10 text-foreground">
        <span className="w-4 shrink-0 text-right text-primary opacity-80">
          14
        </span>
        <span className="pl-8">
          &lt;<span className="text-primary">PayButton</span> /&gt;
          <span className="ml-2 text-[10px] text-amber-700">← buried</span>
        </span>
      </div>
      <div className="flex gap-3 text-muted-foreground">
        <span className="w-4 shrink-0 text-right opacity-50">15</span>
        <span className="pl-4">)</span>
      </div>
      <div className="flex gap-3 text-muted-foreground">
        <span className="w-4 shrink-0 text-right opacity-50">16</span>
        <span>{"}"}</span>
      </div>
      <p className="mt-4 border-t border-border/60 pt-3 text-[11px] text-muted-foreground">
        TasteTest reads routes & components — not just screenshots.
      </p>
    </div>
  );
}

function TypingPrompt({ text }: { text: string }) {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setTyped(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, 45);
    return () => window.clearInterval(id);
  }, [text]);

  return (
    <>
      {typed}
      <span className="ml-0.5 inline-block h-3 w-0.5 animate-pulse bg-primary-foreground/80 align-middle" />
    </>
  );
}

function AgentPanel({ reduceMotion }: { reduceMotion: boolean | null }) {
  const full = "Run EmpathFlow";

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-primary px-3 py-2 text-xs text-primary-foreground shadow-sm">
        {reduceMotion ? full : <TypingPrompt text={full} />}
      </div>
      <div className="max-w-[92%] rounded-2xl rounded-bl-md border border-border/80 bg-muted/50 px-3 py-2.5 text-xs leading-relaxed text-foreground">
        <p className="font-medium text-primary">EmpathFlow</p>
        <p className="mt-1 text-muted-foreground">
          Reading checkout flow… building persona{" "}
          <span className="text-foreground">Riley</span>… scoring fluidity.
        </p>
        <ul className="mt-2 space-y-1 text-muted-foreground">
          <li className="flex gap-2">
            <span className="text-primary">✓</span> Personas + journeys
          </li>
          <li className="flex gap-2">
            <span className="text-primary">✓</span> Craft + motion gates
          </li>
          <li className="flex gap-2">
            <span className="text-amber-600">…</span> Writing report.md
          </li>
        </ul>
      </div>
    </div>
  );
}

function ReportPanel() {
  return (
    <div className="space-y-3 text-xs">
      <div className="flex gap-2">
        {[
          { l: "Fluidity", v: 6 },
          { l: "Craft", v: 5 },
          { l: "Conv.", v: 4 },
        ].map((s) => (
          <div
            key={s.l}
            className="flex-1 rounded-lg border border-border/70 bg-muted/40 px-2 py-2 text-center"
          >
            <p className="text-[9px] font-medium tracking-wide text-muted-foreground uppercase">
              {s.l}
            </p>
            <p className="font-heading text-lg font-semibold tabular-nums">
              {s.v}
              <span className="text-[10px] font-normal text-muted-foreground">
                /10
              </span>
            </p>
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-border/70 border-l-2 border-l-red-500/60 bg-background px-3 py-2">
        <p className="font-mono text-[10px] font-bold text-red-700">P0</p>
        <p className="mt-0.5 font-medium text-foreground">
          Pay below fold on mobile
        </p>
        <p className="mt-1 font-mono text-[10px] text-primary">
          app/checkout/page.tsx
        </p>
      </div>
      <p className="text-[11px] text-muted-foreground">
        Output: scored report with file-level fixes.
      </p>
    </div>
  );
}

export function ProductPreview({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const [tab, setTab] = useState<TabId>("code");

  useEffect(() => {
    if (reduceMotion) return;
    const order: TabId[] = ["code", "agent", "report"];
    let i = 0;
    const id = window.setInterval(() => {
      i = (i + 1) % order.length;
      setTab(order[i]);
    }, 3200);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border/80 bg-card",
        "shadow-[0_1px_0_oklch(0_0_0_/_0.03),0_28px_72px_-24px_oklch(0.35_0.12_265_/_0.38)]",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b border-border/70 bg-muted/35 px-3 py-2">
        <p className="font-mono text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
          Product path
        </p>
        <p className="hidden text-[10px] text-muted-foreground sm:block">
          Live preview
        </p>
      </div>
      <div className="flex items-center gap-1 border-b border-border/60 bg-muted/20 p-1.5">
        {TABS.map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                "flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-xs font-medium transition-colors",
                active
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="size-3.5" aria-hidden />
              {t.label}
            </button>
          );
        })}
      </div>
      <div className="min-h-[230px] p-4 sm:min-h-[250px] sm:p-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
            transition={
              reduceMotion ? { duration: 0 } : { duration: 0.2, ease: EASE }
            }
          >
            {tab === "code" ? <CodePanel /> : null}
            {tab === "agent" ? (
              <AgentPanel reduceMotion={reduceMotion} />
            ) : null}
            {tab === "report" ? <ReportPanel /> : null}
          </motion.div>
        </AnimatePresence>
      </div>
      <p className="border-t border-border/60 px-4 py-2.5 text-center text-[11px] text-muted-foreground">
        Code → agent → report — click tabs or watch the loop
      </p>
    </div>
  );
}
