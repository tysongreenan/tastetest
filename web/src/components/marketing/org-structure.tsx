"use client";

import { cn } from "@/lib/utils";
import { ExternalLink, Shield } from "lucide-react";

const GH_AGENTS =
  "https://github.com/tysongreenan/tastetest/blob/main/AGENTS.md";

const LAYERS: {
  label: string;
  seats: { name: string; role: string; to: string }[];
}[] = [
  {
    label: "Human",
    seats: [
      {
        name: "You",
        role: "Product owner · final override",
        to: "—",
      },
    ],
  },
  {
    label: "Lead",
    seats: [
      {
        name: "Orchestrator",
        role: "Preflight · phase order · ship",
        to: "You",
      },
    ],
  },
  {
    label: "Persona Managers",
    seats: [
      {
        name: "PM-Avery",
        role: "Founder · install clarity",
        to: "Orchestrator",
      },
      {
        name: "PM-Jordan",
        role: "Eng · real init / OSS",
        to: "Orchestrator",
      },
      {
        name: "PM-Sam",
        role: "Designer · craft / sample",
        to: "Orchestrator",
      },
    ],
  },
  {
    label: "Research",
    seats: [
      { name: "Product Analyst", role: "Purpose vs shipped", to: "Orchestrator" },
      { name: "Empathy Mapper", role: "Maps · seats PMs", to: "Orchestrator" },
      { name: "Journey Critic", role: "All-persona flows", to: "Orchestrator" },
      { name: "Heuristic Auditor", role: "playbook gates", to: "Orchestrator" },
    ],
  },
  {
    label: "Craft council",
    seats: [
      { name: "Craft Critic", role: "ANTI-SLOP.md", to: "Orchestrator" },
      { name: "Motion Critic", role: "MOTION.md", to: "Orchestrator" },
      { name: "Prose Critic", role: "stop-slop prose", to: "Orchestrator" },
      { name: "Design System", role: "DESIGN.md", to: "Orchestrator" },
      {
        name: "Frontend Design",
        role: "Proposes after brief",
        to: "Orchestrator + all PMs",
      },
    ],
  },
  {
    label: "Ship",
    seats: [
      {
        name: "Report Writer",
        role: "report.md after consensus",
        to: "Orchestrator",
      },
    ],
  },
];

export function OrgStructure({ className }: { className?: string }) {
  return (
    <div className={cn("w-full", className)}>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-2.5 rounded-xl border border-primary/20 bg-primary/5 px-3.5 py-3 text-sm text-muted-foreground sm:max-w-md">
          <Shield
            className="mt-0.5 size-4 shrink-0 text-primary"
            aria-hidden
          />
          <p>
            Frontend Design interviews{" "}
            <span className="font-medium text-foreground">
              PM-Avery, PM-Jordan, PM-Sam
            </span>{" "}
            before any redesign. PMs can veto harm to their human.
          </p>
        </div>
        <a
          href={GH_AGENTS}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          Full AGENTS.md
          <ExternalLink className="size-3.5 opacity-60" aria-hidden />
        </a>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/80 bg-card">
        <div className="divide-y divide-border/60">
          {LAYERS.map((layer) => (
            <div
              key={layer.label}
              className="grid gap-3 px-4 py-4 sm:grid-cols-[8.5rem_1fr] sm:gap-6 sm:px-6 sm:py-5"
            >
              <p className="pt-0.5 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                {layer.label}
              </p>
              <ul className="flex flex-wrap gap-2">
                {layer.seats.map((seat) => (
                  <li
                    key={seat.name}
                    className={cn(
                      "rounded-xl border px-3 py-2",
                      layer.label === "Lead" &&
                        "border-primary/35 bg-primary text-primary-foreground",
                      layer.label === "Persona Managers" &&
                        "border-primary/20 bg-primary/5",
                      layer.label === "Ship" &&
                        "border-emerald-500/25 bg-emerald-500/10",
                      layer.label !== "Lead" &&
                        layer.label !== "Persona Managers" &&
                        layer.label !== "Ship" &&
                        "border-border/70 bg-background"
                    )}
                  >
                    <p
                      className={cn(
                        "font-heading text-[13px] font-semibold tracking-tight",
                        layer.label === "Lead" && "text-primary-foreground"
                      )}
                    >
                      {seat.name}
                    </p>
                    <p
                      className={cn(
                        "mt-0.5 text-[11px] leading-snug",
                        layer.label === "Lead"
                          ? "text-primary-foreground/75"
                          : "text-muted-foreground"
                      )}
                    >
                      {seat.role}
                    </p>
                    {seat.to !== "—" ? (
                      <p
                        className={cn(
                          "mt-1 text-[10px] font-medium",
                          layer.label === "Lead"
                            ? "text-primary-foreground/60"
                            : "text-foreground/55"
                        )}
                      >
                        → {seat.to}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
