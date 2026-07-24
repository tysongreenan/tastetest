"use client";

import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

const GH = "https://github.com/tysongreenan/tastetest/blob/main";

export type Agent = {
  id: string;
  name: string;
  role: string;
  blurb: string;
  photo: string;
  skills: { label: string; href: string }[];
  reportsTo: string;
  badge?: string;
};

const LEAD: Agent[] = [
  {
    id: "orchestrator",
    name: "Orchestrator",
    role: "Run lead",
    blurb:
      "Preflight, phase order, priority council, final ship. Breaks deadlocks without inventing taste.",
    photo: "/agents/orchestrator.jpg",
    skills: [
      { label: "EMPATHFLOW.md", href: `${GH}/EMPATHFLOW.md` },
      { label: "COLLABORATION.md", href: `${GH}/COLLABORATION.md` },
      { label: "AGENTS.md", href: `${GH}/AGENTS.md` },
    ],
    reportsTo: "You (the human)",
  },
  {
    id: "pm-avery",
    name: "PM-Avery",
    role: "Persona Manager",
    badge: "Avery · founder",
    blurb:
      "Advocates for the indie founder. Obvious install, report clear in minutes. Vetoes anything that hides the CTA.",
    photo: "/agents/pm-avery.jpg",
    skills: [
      { label: "docs/personas.md", href: `${GH}/docs/personas.md` },
      { label: "COLLABORATION.md", href: `${GH}/COLLABORATION.md` },
    ],
    reportsTo: "Orchestrator",
  },
  {
    id: "pm-jordan",
    name: "PM-Jordan",
    role: "Persona Manager",
    badge: "Jordan · eng",
    blurb:
      "Advocates for the product engineer. Real init, OSS credibility, skills that re-run. Vetoes toy demos.",
    photo: "/agents/pm-jordan.jpg",
    skills: [
      { label: "docs/personas.md", href: `${GH}/docs/personas.md` },
      { label: "AGENTS.md", href: `${GH}/AGENTS.md` },
    ],
    reportsTo: "Orchestrator",
  },
  {
    id: "pm-sam",
    name: "PM-Sam",
    role: "Persona Manager",
    badge: "Sam · designer",
    blurb:
      "Advocates for the agency designer. Client-safe sample, refined craft. Vetoes UI that looks like a template.",
    photo: "/agents/pm-sam.jpg",
    skills: [
      { label: "docs/personas.md", href: `${GH}/docs/personas.md` },
      { label: "ANTI-SLOP.md", href: `${GH}/ANTI-SLOP.md` },
    ],
    reportsTo: "Orchestrator",
  },
];

const COUNCIL: Agent[] = [
  {
    id: "empathy",
    name: "Empathy Mapper",
    role: "Maps & seats",
    blurb:
      "Builds empathy maps and seats Persona Managers. Blocks stereotypes before journeys start.",
    photo: "/agents/empathy.jpg",
    skills: [
      { label: "EMPATHFLOW.md", href: `${GH}/EMPATHFLOW.md` },
      { label: "docs/personas.md", href: `${GH}/docs/personas.md` },
    ],
    reportsTo: "Orchestrator",
  },
  {
    id: "journey",
    name: "Journey Critic",
    role: "Whole-product flows",
    blurb:
      "Walks flows for every in-scope persona. Priority weighted; secondary harm pass always on.",
    photo: "/agents/journey.jpg",
    skills: [
      { label: "EMPATHFLOW.md", href: `${GH}/EMPATHFLOW.md` },
      { label: "playbook.md", href: `${GH}/playbook.md` },
    ],
    reportsTo: "Orchestrator",
  },
  {
    id: "craft",
    name: "Craft Critic",
    role: "Visual anti-slop",
    blurb:
      "Template UI, equal-weight CTAs, empty decoration. The eye designers hire for.",
    photo: "/agents/craft.jpg",
    skills: [
      { label: "ANTI-SLOP.md", href: `${GH}/ANTI-SLOP.md` },
      { label: "playbook.md", href: `${GH}/playbook.md` },
    ],
    reportsTo: "Orchestrator",
  },
  {
    id: "motion",
    name: "Motion Critic",
    role: "Animation craft",
    blurb:
      "Emil Kowalski bar: purposeful motion, real easing, reduced-motion respect.",
    photo: "/agents/motion.jpg",
    skills: [
      { label: "MOTION.md", href: `${GH}/MOTION.md` },
      {
        label: "emilkowalski/skills",
        href: "https://github.com/emilkowalski/skills",
      },
    ],
    reportsTo: "Orchestrator",
  },
  {
    id: "frontend",
    name: "Frontend Design",
    role: "Pattern library",
    blurb:
      "Cannot invent taste. Interviews managers first, then proposes from UI UX Pro Max.",
    photo: "/agents/frontend.jpg",
    skills: [
      { label: "FRONTEND.md", href: `${GH}/FRONTEND.md` },
      {
        label: "ui-ux-pro-max",
        href: "https://github.com/nextlevelbuilder/ui-ux-pro-max-skill",
      },
    ],
    reportsTo: "Orchestrator + all PMs",
  },
];

/** Full list for any consumer that still maps over all seats */
export const AGENTS: Agent[] = [...LEAD, ...COUNCIL];

function LeadCard({ agent }: { agent: Agent }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm transition-[box-shadow] duration-200 hover:shadow-md sm:flex-row sm:items-stretch">
      <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden bg-muted sm:aspect-auto sm:w-36 sm:min-h-[9.5rem]">
        <Image
          src={agent.photo}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, 144px"
          className="object-cover object-top transition-transform duration-300 [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="font-heading text-base font-semibold tracking-tight sm:text-lg">
          {agent.name}
        </h3>
        <p className="mt-0.5 text-sm font-medium text-primary">{agent.role}</p>
        {agent.badge ? (
          <p className="mt-0.5 text-xs text-muted-foreground">{agent.badge}</p>
        ) : null}
        <p className="mt-2 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">Reports to </span>
          {agent.reportsTo}
        </p>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {agent.blurb}
        </p>
        <ul className="mt-3 flex flex-wrap gap-1.5 border-t border-border/60 pt-3">
          {agent.skills.map((s) => (
            <li key={s.href + s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-border/80 bg-background px-2 py-0.5 font-mono text-[10px] font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                {s.label}
                <ExternalLink className="size-2.5 opacity-50" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function CouncilRow({ agent }: { agent: Agent }) {
  return (
    <li className="flex gap-3 border-b border-border/60 py-3.5 last:border-b-0 sm:gap-4 sm:py-4">
      <div className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-muted sm:size-14">
        <Image
          src={agent.photo}
          alt=""
          fill
          sizes="56px"
          className="object-cover object-top"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <h3 className="font-heading text-[15px] font-semibold tracking-tight">
            {agent.name}
          </h3>
          <span className="text-xs font-medium text-primary">{agent.role}</span>
        </div>
        <p className="mt-1 text-sm leading-snug text-muted-foreground">
          {agent.blurb}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-[11px] text-muted-foreground">
            → {agent.reportsTo}
          </span>
          {agent.skills.slice(0, 2).map((s) => (
            <a
              key={s.href + s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-mono text-[10px] font-medium text-foreground transition-colors hover:text-primary"
            >
              {s.label}
              <ExternalLink className="size-2.5 opacity-50" aria-hidden />
            </a>
          ))}
        </div>
      </div>
    </li>
  );
}

export function AgentRoster({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-10", className)}>
      <div>
        <p className="mb-4 text-xs font-semibold tracking-wide text-muted-foreground">
          Lead · managers
        </p>
        <ul className="grid gap-4 lg:grid-cols-2">
          {LEAD.map((agent) => (
            <li key={agent.id}>
              <LeadCard agent={agent} />
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-border/80 bg-card/80 px-4 sm:px-6">
        <div className="flex items-baseline justify-between gap-3 border-b border-border/60 py-4">
          <p className="text-xs font-semibold tracking-wide text-muted-foreground">
            Craft council · highlights
          </p>
          <p className="text-[11px] text-muted-foreground">
            Full list in AGENTS.md
          </p>
        </div>
        <ul>
          {COUNCIL.map((agent) => (
            <CouncilRow key={agent.id} agent={agent} />
          ))}
        </ul>
      </div>
    </div>
  );
}
