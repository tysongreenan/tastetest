"use client";

import { cn } from "@/lib/utils";
import {
  ExternalLink,
  Eye,
  Layers,
  PenLine,
  Sparkles,
  Wand2,
  Workflow,
  type LucideIcon,
} from "lucide-react";

const GH = "https://github.com/tysongreenan/tastetest/blob/main";

type Skill = {
  icon: LucideIcon;
  name: string;
  file: string;
  href: string;
  pitch: string;
  badge: string;
  featured?: boolean;
  upstream?: { label: string; href: string };
};

const SKILLS: Skill[] = [
  {
    icon: Workflow,
    name: "EmpathFlow",
    file: "EMPATHFLOW.md",
    href: `${GH}/EMPATHFLOW.md`,
    pitch:
      "Buyer-level process: personas, journeys, priority council, preserve-first, scored report.",
    badge: "Core process",
    featured: true,
  },
  {
    icon: Eye,
    name: "Anti-slop craft",
    file: "ANTI-SLOP.md",
    href: `${GH}/ANTI-SLOP.md`,
    pitch:
      "Catches template UI, equal-weight buttons, and decoration that pretends to be hierarchy.",
    badge: "Craft Critic",
    featured: true,
  },
  {
    icon: Wand2,
    name: "Motion critic",
    file: "MOTION.md",
    href: `${GH}/MOTION.md`,
    pitch:
      "Emil Kowalski standards — easing, duration, GPU transforms, reduced motion.",
    badge: "Emil-inspired",
    upstream: {
      label: "emilkowalski/skills",
      href: "https://github.com/emilkowalski/skills",
    },
  },
  {
    icon: Layers,
    name: "Frontend Design",
    file: "FRONTEND.md",
    href: `${GH}/FRONTEND.md`,
    pitch:
      "UI UX Pro Max pattern library. Agents ask managers before searching.",
    badge: "Pattern library",
    upstream: {
      label: "ui-ux-pro-max",
      href: "https://github.com/nextlevelbuilder/ui-ux-pro-max-skill",
    },
  },
  {
    icon: PenLine,
    name: "Stop-slop prose",
    file: "skills/stop-slop-prose/",
    href: `${GH}/skills/stop-slop-prose`,
    pitch: "Strips inflated AI writing from microcopy, landing, and reports.",
    badge: "Copy craft",
    upstream: {
      label: "hardikpandya/stop-slop",
      href: "https://github.com/hardikpandya/stop-slop",
    },
  },
  {
    icon: Sparkles,
    name: "Collaboration law",
    file: "COLLABORATION.md",
    href: `${GH}/COLLABORATION.md`,
    pitch:
      "Permissions, vetoes, multi-persona impact, consensus before UI ships.",
    badge: "Process guardrails",
  },
];

function FeaturedCard({ skill }: { skill: Skill }) {
  const Icon = skill.icon;
  return (
    <article className="flex flex-col rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5">
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon className="size-6" aria-hidden />
        </span>
        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-primary">
          {skill.badge}
        </span>
      </div>
      <h3 className="font-heading mt-5 text-xl font-semibold tracking-tight">
        {skill.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground sm:text-base">
        {skill.pitch}
      </p>
      <a
        href={skill.href}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex w-fit items-center gap-1.5 font-mono text-xs font-medium text-foreground transition-colors hover:text-primary"
      >
        {skill.file}
        <ExternalLink className="size-3 opacity-50" aria-hidden />
      </a>
    </article>
  );
}

function SkillRow({ skill }: { skill: Skill }) {
  return (
    <li className="flex flex-col gap-1 border-b border-border/60 py-3.5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <a
            href={skill.href}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[13px] font-semibold text-foreground transition-colors hover:text-primary"
          >
            {skill.file}
          </a>
          <span className="text-[11px] text-muted-foreground">{skill.badge}</span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{skill.pitch}</p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {skill.upstream ? (
          <a
            href={skill.upstream.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-background px-2 py-0.5 font-mono text-[10px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            ↗ {skill.upstream.label}
          </a>
        ) : null}
        <a
          href={skill.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary/80"
        >
          Open
          <ExternalLink className="size-3 opacity-60" aria-hidden />
        </a>
      </div>
    </li>
  );
}

export function SkillsShowcase({ className }: { className?: string }) {
  const featured = SKILLS.filter((s) => s.featured);
  const rest = SKILLS.filter((s) => !s.featured);

  return (
    <div className={cn("space-y-8", className)}>
      <div className="grid gap-4 md:grid-cols-2">
        {featured.map((skill) => (
          <FeaturedCard key={skill.file} skill={skill} />
        ))}
      </div>
      <div className="rounded-2xl border border-border/80 bg-card px-4 sm:px-5">
        <p className="border-b border-border/60 py-3 text-xs font-semibold tracking-wide text-muted-foreground">
          Also in the pack
        </p>
        <ul>
          {rest.map((skill) => (
            <SkillRow key={skill.file} skill={skill} />
          ))}
        </ul>
      </div>
    </div>
  );
}
