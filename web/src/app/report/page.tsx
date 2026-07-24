import { readFile } from "node:fs/promises";
import path from "node:path";
import { SiteFooter } from "@/components/marketing/site-footer";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const metadata = {
  title: "Sample report — Acme Checkout · TasteTest",
  description:
    "Example EmpathFlow output for a fictional Acme Checkout — scores, personas, P0s, and file paths.",
};

async function loadReport(): Promise<string> {
  const file = path.join(process.cwd(), "content", "sample-report.md");
  try {
    return await readFile(file, "utf8");
  } catch {
    return "# Report not found\n\nAdd `web/content/sample-report.md` or run EmpathFlow to generate a report.";
  }
}

/** Minimal markdown → HTML for the sample report (no extra deps). */
function renderMarkdown(md: string): string {
  const escaped = md
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const lines = escaped.split("\n");
  const out: string[] = [];
  let inList = false;
  let inCode = false;

  const closeList = () => {
    if (inList) {
      out.push("</ul>");
      inList = false;
    }
  };

  for (const line of lines) {
    if (line.startsWith("```")) {
      closeList();
      if (inCode) {
        out.push("</code></pre>");
        inCode = false;
      } else {
        out.push('<pre class="overflow-x-auto rounded-lg bg-muted p-4 text-sm"><code>');
        inCode = true;
      }
      continue;
    }
    if (inCode) {
      out.push(`${line}\n`);
      continue;
    }

    if (line.startsWith("### ")) {
      closeList();
      out.push(
        `<h3 class="mt-8 text-lg font-semibold tracking-tight">${inline(line.slice(4))}</h3>`
      );
    } else if (line.startsWith("## ")) {
      closeList();
      out.push(
        `<h2 class="mt-10 border-b pb-2 text-2xl font-semibold tracking-tight">${inline(line.slice(3))}</h2>`
      );
    } else if (line.startsWith("# ")) {
      closeList();
      out.push(
        `<h1 class="text-3xl font-semibold tracking-tight">${inline(line.slice(2))}</h1>`
      );
    } else if (line.startsWith("|") && line.includes("|")) {
      closeList();
      // keep tables as preformatted rows for simplicity
      out.push(
        `<div class="font-mono text-xs leading-relaxed text-muted-foreground">${inline(line)}</div>`
      );
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      if (!inList) {
        out.push('<ul class="my-3 list-disc space-y-1 pl-5">');
        inList = true;
      }
      out.push(`<li>${inline(line.slice(2))}</li>`);
    } else if (/^\d+\.\s/.test(line)) {
      closeList();
      out.push(`<p class="my-2">${inline(line)}</p>`);
    } else if (line.trim() === "" || line.trim() === "---") {
      closeList();
      if (line.trim() === "---") {
        out.push('<hr class="my-8 border-border" />');
      }
    } else {
      closeList();
      out.push(`<p class="my-3 leading-relaxed text-muted-foreground">${inline(line)}</p>`);
    }
  }
  closeList();
  if (inCode) out.push("</code></pre>");
  return out.join("\n");
}

function inline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong class=\"font-semibold text-foreground\">$1</strong>")
    .replace(
      /`([^`]+)`/g,
      '<code class="rounded bg-muted px-1.5 py-0.5 text-[0.85em] text-foreground">$1</code>'
    );
}

export default async function ReportPage() {
  const md = await loadReport();
  const html = renderMarkdown(md);

  return (
    <div className="min-h-full bg-background text-foreground">
      <header className="border-b">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-6 py-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Sample output · fictional product
            </p>
            <h1 className="text-lg font-semibold">Acme Checkout — EmpathFlow report</h1>
          </div>
          <div className="flex gap-2">
            <Link
              href="/"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              ← Home
            </Link>
            <a
              href="https://github.com/tysongreenan/tastetest"
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "default", size: "sm" }))}
            >
              GitHub
            </a>
          </div>
        </div>
      </header>
      <article
        className="mx-auto max-w-3xl px-6 py-12"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <SiteFooter />
    </div>
  );
}
