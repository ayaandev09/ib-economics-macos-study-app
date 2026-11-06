"use client";

import React, { useMemo } from "react";
import katex from "katex";

interface MathFormulaProps {
  math: string;
  block?: boolean;
  className?: string;
}

/**
 * Robust LaTeX sanitizer that restores control characters that might have been
 * mangled by JavaScript string escaping (e.g. \f = form feed, \t = tab).
 */
function sanitizeLaTeX(raw: string): string {
  if (!raw) return "";
  let clean = raw;

  // 1. Fix common JS escape collision artifacts
  clean = clean.replace(/[\x0c\u000c]rac/gi, "\\frac");
  clean = clean.replace(/[\x09\u0009]ext/gi, "\\text");
  clean = clean.replace(/[\x09\u0009]imes/gi, "\\times");
  clean = clean.replace(/[\x00-\x1f]/g, " ");

  // 2. Fix unescaped backslashes where word started without slash
  clean = clean.replace(/(^|[^\\])frac\{/g, "$1\\frac{");
  clean = clean.replace(/(^|[^\\])text\{/g, "$1\\text{");
  clean = clean.replace(/(^|[^\\])times(\b|[^a-zA-Z])/g, "$1\\times$2");
  clean = clean.replace(/(^|[^\\])Delta(\b|[^a-zA-Z])/g, "$1\\Delta$2");
  clean = clean.replace(/(^|[^\\])quad(\b|[^a-zA-Z])/g, "$1\\quad$2");
  clean = clean.replace(/(^|[^\\])sqrt/g, "$1\\sqrt");

  // 3. Catch words that lost initial letter e.g. "ext{" -> "\text{", "rac{" -> "\frac{"
  clean = clean.replace(/(^|\s|[^\\])ext\{/g, "$1\\text{");
  clean = clean.replace(/(^|\s|[^\\])rac\{/g, "$1\\frac{");
  clean = clean.replace(/(^|\s|[^\\])imes(\b|\s|\d)/g, "$1\\times $2");

  return clean;
}

// Global in-memory cache for rendered KaTeX formula HTML strings
const katexHtmlCache = new Map<string, string>();

const MathFormulaComponent: React.FC<MathFormulaProps> = ({
  math,
  block = false,
  className = "",
}) => {
  const renderedHtml = useMemo(() => {
    const cacheKey = `${block ? "B" : "I"}:${math}`;
    const cached = katexHtmlCache.get(cacheKey);
    if (cached) return cached;

    const sanitized = sanitizeLaTeX(math);

    try {
      let html = katex.renderToString(sanitized, {
        displayMode: block,
        throwOnError: false,
        strict: false,
      });

      // If KaTeX still output a katex-error, try fallback repair
      if (html.includes("class=\"katex-error\"")) {
        const repaired = sanitized
          .replace(/ext\{/g, "\\text{")
          .replace(/rac\{/g, "\\frac{")
          .replace(/imes/g, "\\times");

        const secondPass = katex.renderToString(repaired, {
          displayMode: block,
          throwOnError: false,
          strict: false,
        });

        if (!secondPass.includes("class=\"katex-error\"")) {
          html = secondPass;
        } else {
          // Never output red KaTeX error text: render pristine readable math typography
          html = `<span class="font-mono text-emerald-300 font-semibold tracking-wide">${sanitized}</span>`;
        }
      }

      katexHtmlCache.set(cacheKey, html);
      return html;
    } catch {
      const fallback = `<span class="font-mono text-emerald-300 font-bold">${sanitized}</span>`;
      katexHtmlCache.set(cacheKey, fallback);
      return fallback;
    }
  }, [math, block]);

  if (block) {
    return (
      <div
        className={`katex-formula-wrapper overflow-x-auto py-2.5 px-4 my-1.5 text-center text-emerald-300 font-mono rounded-xl bg-slate-950/70 border border-emerald-500/20 shadow-inner ${className}`}
        dangerouslySetInnerHTML={{ __html: renderedHtml }}
      />
    );
  }

  return (
    <span
      className={`katex-formula-wrapper inline-block text-emerald-300 font-mono px-1.5 py-0.5 rounded bg-slate-950/60 border border-emerald-500/20 ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
};

export const MathFormula = React.memo(MathFormulaComponent);
