"use client";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "motion/react";
import { useState } from "react";

function HierarchyDemo() {
  const [fixed, setFixed] = useState(false);
  return (
    <DemoShell
      title="Weak hierarchy"
      fixed={fixed}
      onToggle={() => setFixed((v) => !v)}
    >
      <div className="flex flex-col gap-2 p-3">
        <div
          className={cn(
            "rounded-md px-3 py-2 text-center text-[11px] font-medium transition-[background-color,color,border-color,border-radius,box-shadow,font-weight,text-decoration-color] duration-200",
            fixed
              ? "bg-primary text-primary-foreground shadow-sm"
              : "border border-border bg-muted/40 text-muted-foreground"
          )}
        >
          Pay now
        </div>
        <div
          className={cn(
            "rounded-md px-3 py-2 text-center text-[11px] transition-[background-color,color,border-color,border-radius,box-shadow,font-weight,text-decoration-color] duration-200",
            fixed
              ? "border border-border text-muted-foreground"
              : "border border-border bg-muted/40 font-semibold text-foreground"
          )}
        >
          Save for later
        </div>
        <p className="text-[10px] text-muted-foreground">
          {fixed ? "Primary is obvious" : "Equal weight — buyer pauses"}
        </p>
      </div>
    </DemoShell>
  );
}

function ComponentsDemo() {
  const [fixed, setFixed] = useState(false);
  return (
    <DemoShell
      title="Inconsistent components"
      fixed={fixed}
      onToggle={() => setFixed((v) => !v)}
    >
      <div className="flex items-end justify-center gap-3 p-3">
        <button
          type="button"
          className={cn(
            "px-3 py-1.5 text-[11px] transition-[background-color,color,border-color,border-radius,box-shadow,font-weight,text-decoration-color] duration-200",
            fixed
              ? "rounded-lg bg-primary font-medium text-primary-foreground"
              : "rounded-none border-2 border-foreground bg-background font-bold uppercase"
          )}
        >
          Primary
        </button>
        <button
          type="button"
          className={cn(
            "px-3 py-1.5 text-[11px] transition-[background-color,color,border-color,border-radius,box-shadow,font-weight,text-decoration-color] duration-200",
            fixed
              ? "rounded-lg border border-border bg-background font-medium text-foreground"
              : "rounded-full bg-violet-500/20 text-xs text-violet-800 underline"
          )}
        >
          Secondary
        </button>
      </div>
      <p className="px-3 pb-2 text-center text-[10px] text-muted-foreground">
        {fixed ? "One system" : "Two different design languages"}
      </p>
    </DemoShell>
  );
}

function EmptyErrorDemo() {
  const [fixed, setFixed] = useState(false);
  return (
    <DemoShell
      title="Empty & error states"
      fixed={fixed}
      onToggle={() => setFixed((v) => !v)}
    >
      <div className="space-y-2 p-3">
        <div
          className={cn(
            "rounded-md px-2 py-2 text-[11px] transition-[background-color,color,border-color,border-radius,box-shadow,font-weight,text-decoration-color] duration-200",
            fixed
              ? "border border-border bg-background"
              : "bg-red-500/10 text-red-800"
          )}
        >
          {fixed ? (
            <div className="space-y-1.5">
              <p className="font-medium text-foreground">Payment failed</p>
              <div className="flex gap-1">
                <span className="rounded bg-primary px-2 py-0.5 text-[10px] text-primary-foreground">
                  Retry
                </span>
                <span className="rounded border border-border px-2 py-0.5 text-[10px]">
                  Edit card
                </span>
              </div>
            </div>
          ) : (
            "Payment failed."
          )}
        </div>
        <p className="text-[10px] text-muted-foreground">
          {fixed ? "Recovery path clear" : "Dead end — no next step"}
        </p>
      </div>
    </DemoShell>
  );
}

function FlowDemo() {
  const [fixed, setFixed] = useState(false);
  const steps = ["Cart", "Pay", "Done"];
  return (
    <DemoShell
      title="Flows that break"
      fixed={fixed}
      onToggle={() => setFixed((v) => !v)}
    >
      <div className="flex items-center justify-center gap-1 p-3">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-1">
            <span
              className={cn(
                "rounded-full px-2 py-1 text-[10px] font-medium transition-[background-color,color,border-color,border-radius,box-shadow,font-weight,text-decoration-color] duration-200",
                fixed
                  ? i < 2
                    ? "bg-primary/15 text-primary"
                    : "bg-emerald-500/15 text-emerald-800"
                  : i === 1
                    ? "bg-red-500/15 text-red-700 line-through"
                    : "bg-muted text-muted-foreground"
              )}
            >
              {s}
            </span>
            {i < steps.length - 1 ? (
              <span className="text-[10px] text-muted-foreground">→</span>
            ) : null}
          </div>
        ))}
      </div>
      <p className="px-3 pb-2 text-center text-[10px] text-muted-foreground">
        {fixed ? "End-to-end clear" : "Pay step fails silently"}
      </p>
    </DemoShell>
  );
}

function DemoShell({
  title,
  fixed,
  onToggle,
  children,
}: {
  title: string;
  fixed: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm">
      <div className="flex items-center justify-between gap-2 border-b border-border/60 px-3 py-2">
        <p className="text-xs font-semibold tracking-tight">{title}</p>
        <button
          type="button"
          onClick={onToggle}
          className={cn(
            "rounded-full px-2.5 py-1 text-[10px] font-semibold transition-colors",
            fixed
              ? "bg-emerald-500/15 text-emerald-800"
              : "bg-muted text-muted-foreground hover:text-foreground"
          )}
        >
          {fixed ? "After" : "Before"}
        </button>
      </div>
      <div
        className={cn(
          "min-h-[120px] transition-opacity",
          reduceMotion ? "" : "duration-200"
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function GapDemos({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-3 sm:grid-cols-2", className)}>
      <HierarchyDemo />
      <ComponentsDemo />
      <EmptyErrorDemo />
      <FlowDemo />
    </div>
  );
}
