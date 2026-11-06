"use client";

import React, { useMemo } from "react";
import { CheckCircle2, Bookmark, Sparkles } from "lucide-react";

interface AcademicNotesRendererProps {
  content: string;
  isHandwritten?: boolean;
}

interface ParsedSubItem {
  index: number;
  term: string;
  explanation: string;
}

interface ParsedNotes {
  introText: string;
  listHeader?: string;
  subItems: ParsedSubItem[];
  closingText?: string;
}

/**
 * Parses dense economic prose into neatly organized, academic structured sections.
 * Detects numbered patterns like "1. Cyclical Unemployment: ...; 2. Structural Unemployment: ..."
 */
function parseAcademicContent(raw: string): ParsedNotes {
  const numberedRegex = /(\d+)\.\s*([^:]+):\s*([^;]+(?:;|\.|$))/g;
  const matches = [...raw.matchAll(numberedRegex)];

  if (matches.length >= 2) {
    const firstMatchIndex = raw.indexOf(matches[0][0]);
    const introFull = raw.substring(0, firstMatchIndex).trim();

    // Look for a list header like "Unemployment is categorized by cause:"
    let introText = introFull;
    let listHeader: string | undefined = undefined;

    const colonIndex = introFull.lastIndexOf(":");
    if (colonIndex !== -1 && colonIndex > introFull.length - 60) {
      const sentenceBefore = introFull.substring(0, colonIndex);
      const lastPeriod = sentenceBefore.lastIndexOf(".");
      if (lastPeriod !== -1) {
        introText = introFull.substring(0, lastPeriod + 1).trim();
        listHeader = introFull.substring(lastPeriod + 1).trim() + ":";
      } else {
        listHeader = introFull;
        introText = "";
      }
    }

    const subItems: ParsedSubItem[] = matches.map((m) => {
      const idx = parseInt(m[1], 10);
      const term = m[2].trim();
      let explanation = m[3].trim();
      // Remove trailing semicolon
      if (explanation.endsWith(";")) {
        explanation = explanation.slice(0, -1).trim();
      }
      return { index: idx, term, explanation };
    });

    const lastMatch = matches[matches.length - 1];
    const lastMatchEnd = raw.indexOf(lastMatch[0]) + lastMatch[0].length;
    const closingText = raw.substring(lastMatchEnd).trim();

    return {
      introText,
      listHeader,
      subItems,
      closingText: closingText.length > 5 ? closingText : undefined,
    };
  }

  // Fallback: standard paragraph splitting
  return {
    introText: raw,
    subItems: [],
  };
}

const parsedNotesCache = new Map<string, ParsedNotes>();

const AcademicNotesRendererComponent: React.FC<AcademicNotesRendererProps> = ({
  content,
  isHandwritten = false,
}) => {
  const parsed = useMemo(() => {
    const cached = parsedNotesCache.get(content);
    if (cached) return cached;
    const res = parseAcademicContent(content);
    parsedNotesCache.set(content, res);
    return res;
  }, [content]);

  // Academic and professional typography with high contrast & comfortable readability
  const fontClass = "font-sans text-[15px] sm:text-[15.5px] leading-relaxed text-slate-100 tracking-[-0.01em]";

  if (parsed.subItems.length > 0) {
    return (
      <div className="space-y-4 my-2">
        {/* Introductory Conceptual Context */}
        {parsed.introText && (
          <p className={`${fontClass} text-slate-100 font-medium`}>
            {parsed.introText}
          </p>
        )}

        {/* List Header if detected */}
        {parsed.listHeader && (
          <div className="flex items-center gap-2 pt-1.5">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-sky-300">
              {parsed.listHeader}
            </span>
          </div>
        )}

        {/* Structured Academic Notes Grid / Sub-items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          {parsed.subItems.map((item) => (
            <div
              key={item.index}
              className="academic-subpoint-card p-4 rounded-xl border border-white/10 flex items-start gap-3 shadow-md jelly-hover"
            >
              {/* Number Badge */}
              <div className="w-7 h-7 rounded-lg bg-sky-500/20 border border-sky-400/40 text-sky-300 font-mono text-xs sm:text-sm font-extrabold flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                {item.index}
              </div>

              {/* Note Content */}
              <div className="space-y-1 min-w-0 flex-1">
                <h5 className="font-bold text-white text-sm sm:text-base flex items-center gap-1.5 tracking-tight">
                  <span className="text-sky-300">{item.term}</span>
                </h5>
                <p className={`${fontClass} text-slate-200`}>
                  {item.explanation}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Closing Notes if any */}
        {parsed.closingText && (
          <p className={`${fontClass} text-slate-300 italic pt-1`}>
            {parsed.closingText}
          </p>
        )}
      </div>
    );
  }

  // Default formatted text
  return (
    <div className="my-1.5">
      <p className={`${fontClass} leading-relaxed`}>
        {content}
      </p>
    </div>
  );
};

export const AcademicNotesRenderer = React.memo(AcademicNotesRendererComponent);
