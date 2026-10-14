import React from "react";
import ReactMarkdown from "react-markdown";
import { CitationAnchor } from "./citation-anchor";
import { BarChart3 } from "lucide-react";

interface MarkdownRendererProps {
  content: string;
}

// Recursively processes React nodes to replace [^n] or [n] with CitationAnchor
function processCitations(node: React.ReactNode): React.ReactNode {
  if (typeof node === "string") {
    const parts = node.split(/(\[\^?\d+\])/g);
    if (parts.length === 1) return node;

    return parts.map((part, i) => {
      const match = part.match(/^\[\^?(\d+)\]$/);
      if (match) {
        const refNumber = parseInt(match[1], 10);
        return <CitationAnchor key={i} refNumber={refNumber} />;
      }
      return part;
    });
  }

  if (Array.isArray(node)) {
    return React.Children.map(node, (child) => processCitations(child));
  }

  if (React.isValidElement(node) && node.props && node.props.children) {
    return React.cloneElement(node, {
      ...node.props,
      children: processCitations(node.props.children),
    });
  }

  return node;
}

// Helper to extract text from React nodes
function getNodeText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getNodeText).join("");
  if (React.isValidElement(node) && node.props && node.props.children) {
    return getNodeText(node.props.children);
  }
  return "";
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <article className="reading-column w-full text-[var(--color-text)] font-sans antialiased">
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text)] mt-12 mb-6">
              {processCitations(children)}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text)] mt-12 mb-4 border-b border-[var(--color-border)] pb-2.5">
              {processCitations(children)}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text)] mt-8 mb-3">
              {processCitations(children)}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-[17px] leading-[1.75] text-[var(--color-text)] mb-6 font-normal">
              {processCitations(children)}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-6 space-y-2 mb-6 text-[17px] leading-[1.7] text-[var(--color-text)]">
              {processCitations(children)}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 space-y-2 mb-6 text-[17px] leading-[1.7] text-[var(--color-text)]">
              {processCitations(children)}
            </ol>
          ),
          li: ({ children }) => (
            <li className="pl-1">
              {processCitations(children)}
            </li>
          ),
          blockquote: ({ children }) => {
            const rawText = getNodeText(children);
            const isStatCallout = rawText.includes("TALA NG DATOS");

            if (isStatCallout) {
              // Parse stat callout box
              return (
                <aside
                  aria-label="Tala ng Datos"
                  className="my-8 p-6 sm:p-7 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] not-italic space-y-3"
                >
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-primary)]">
                    <BarChart3 className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Tala ng Datos • Antas ng Banta</span>
                  </div>

                  <div className="pt-1 text-[var(--color-text)] text-[16px] leading-relaxed">
                    {processCitations(children)}
                  </div>
                </aside>
              );
            }

            // Broadsheet Editorial Pullquote
            return (
              <blockquote className="my-8 p-5 sm:p-6 bg-[var(--color-surface)] border-l-4 border-[var(--color-primary-large)] rounded-r-md text-[var(--color-text)] font-serif italic text-lg sm:text-xl leading-relaxed">
                {processCitations(children)}
              </blockquote>
            );
          },
          a: ({ href, children }) => {
            const isExternal = href && (href.startsWith("http://") || href.startsWith("https://"));
            return (
              <a
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="text-[var(--color-link)] underline underline-offset-4 decoration-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium transition-colors"
              >
                {processCitations(children)}
              </a>
            );
          },
          hr: () => (
            <hr className="my-10 border-t border-[var(--color-border)]" />
          ),
          strong: ({ children }) => {
            const raw = getNodeText(children);
            // Highlighting multiplier numbers in stat boxes (e.g. "3x")
            if (/^\d+(\.\d+)?(x|%|\+)?$/i.test(raw.trim())) {
              return (
                <strong className="block font-serif text-4xl sm:text-5xl font-extrabold text-emerald-700 dark:text-emerald-400 my-1">
                  {raw}
                </strong>
              );
            }
            return <strong className="font-bold text-[var(--color-text)]">{children}</strong>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
