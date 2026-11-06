"use client";

import React, { useState, useMemo } from "react";
import { CASE_STUDIES_BANK, CaseStudyDossier, KEY_CONCEPTS, ConceptId, UnitId } from "@/data";
import { useStudyStore } from "@/store/useStudyStore";
import {
  Briefcase,
  Search,
  Bookmark,
  BookmarkCheck,
  Sparkles,
  Layers,
  Copy,
  Check,
  Filter,
  ExternalLink,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Scale,
  ShieldAlert,
} from "lucide-react";

export const CaseStudyVaultView: React.FC = () => {
  const {
    bookmarkedCaseStudies,
    toggleCaseStudyBookmarked,
    setActiveDiagramId,
    setViewMode,
  } = useStudyStore();

  const [unitFilter, setUnitFilter] = useState<UnitId | "all">("all");
  const [conceptFilter, setConceptFilter] = useState<ConceptId | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredCases = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return CASE_STUDIES_BANK.filter((cs) => {
      if (showBookmarksOnly && !bookmarkedCaseStudies[cs.id]) return false;
      if (unitFilter !== "all" && cs.unitId !== unitFilter) return false;
      if (conceptFilter !== "all" && !cs.conceptIds.includes(conceptFilter))
        return false;

      if (!q) return true;
      return (
        cs.title.toLowerCase().includes(q) ||
        cs.countryOrContext.toLowerCase().includes(q) ||
        cs.empiricalData.toLowerCase().includes(q) ||
        cs.diagramToDraw.toLowerCase().includes(q) ||
        cs.economicMechanism.toLowerCase().includes(q) ||
        cs.topicCode.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, unitFilter, conceptFilter, showBookmarksOnly, bookmarkedCaseStudies]);

  const handleCopySnippet = (cs: CaseStudyDossier) => {
    const snippet = `[Real-World Evidence: ${cs.title} (${cs.countryOrContext}, ${cs.yearOrPeriod})]\nEmpirical Evidence: ${cs.empiricalData}\nEconomic Mechanism: ${cs.economicMechanism}\nEvaluation: For consumers, ${cs.stakeholderEvaluation.consumers} For producers, ${cs.stakeholderEvaluation.producers} For the government, ${cs.stakeholderEvaluation.government} Diagram to Draw: ${cs.diagramToDraw}`;
    navigator.clipboard.writeText(snippet);
    setCopiedId(cs.id);
    setTimeout(() => setCopiedId(null), 2200);
  };

  // Helper to extract diagram ID from diagramToDraw string (e.g. "D-10" -> "diag-indirect-tax")
  const handleOpenDiagram = (diagramString: string) => {
    const match = diagramString.match(/D-(\d+)/);
    if (match) {
      const code = `D-${match[1]}`;
      const diagMap: Record<string, string> = {
        "D-01": "diag-ppf",
        "D-02": "diag-circular-flow",
        "D-03": "diag-market-equilibrium",
        "D-04": "diag-demand-shifts",
        "D-05": "diag-supply-shifts",
        "D-06": "diag-ped-tr",
        "D-07": "diag-pes-curves",
        "D-08": "diag-price-ceiling",
        "D-09": "diag-price-floor",
        "D-10": "diag-indirect-tax",
        "D-11": "diag-subsidy",
        "D-12": "diag-neg-ext-production",
        "D-13": "diag-neg-ext-consumption",
        "D-14": "diag-pos-ext-consumption",
        "D-15": "diag-business-cycle",
        "D-16": "diag-ad-shifts",
        "D-17": "diag-sras-shocks",
        "D-18": "diag-monetarist-vs-keynesian",
        "D-19": "diag-inflationary-deflationary-gaps",
        "D-20": "diag-lorenz-curve",
        "D-21": "diag-monetary-policy-transmission",
        "D-22": "diag-fiscal-policy-ad",
        "D-23": "diag-crowding-out",
        "D-24": "diag-supply-side-lras",
        "D-25": "diag-free-trade-imports",
        "D-26": "diag-tariff-welfare",
        "D-27": "diag-quota-welfare",
        "D-28": "diag-forex-floating",
        "D-29": "diag-poverty-cycle",
      };
      const foundId = diagMap[code];
      if (foundId) {
        setActiveDiagramId(foundId);
        setViewMode("diagrams");
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="liquid-glass-bento rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-xs px-2.5 py-1 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" /> 15-Mark Essay Evidence Vault
            </span>
            <span className="text-xs font-mono text-slate-400">
              {CASE_STUDIES_BANK.length} Real-World Case Studies
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            Real-World Case Studies &amp; Evidence Dossier
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            In IB Economics Paper 1 and Paper 2, Band 4 (top mark) criteria requires
            &quot;relevant, specific real-world examples fully integrated into
            the economic analysis and evaluation.&quot; Memorize your preferred case
            studies below—each provides exact empirical data, step-by-step
            economic transmission mechanisms, stakeholder evaluation, and the
            exact diagram to pair with it.
          </p>
        </div>
      </div>

      {/* Filter and Search Ribbon */}
      <div className="space-y-3">
        {/* Top Controls Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Unit Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
            {(
              [
                { id: "all", label: `All Units (${CASE_STUDIES_BANK.length})` },
                { id: "unit-1", label: "Unit 1: Introduction to economics" },
                { id: "unit-2", label: "Unit 2: Microeconomics" },
                { id: "unit-3", label: "Unit 3: Macroeconomics" },
                { id: "unit-4", label: "Unit 4: Global Economy" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setUnitFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                  unitFilter === tab.id
                    ? "liquid-glass-pill-active text-white"
                    : "liquid-glass-pill text-slate-300 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search & Bookmarks */}
          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search country, policy, stats..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900/60 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500/60"
              />
            </div>
            <button
              onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                showBookmarksOnly
                  ? "bg-amber-500/30 text-amber-200 border border-amber-400/50 shadow-sm"
                  : "bg-white/5 text-slate-400 border border-white/10 hover:text-white"
              }`}
              title="Show only bookmarked case studies"
            >
              <Bookmark className="w-3.5 h-3.5" />
              My Arsenal ({Object.values(bookmarkedCaseStudies).filter(Boolean).length})
            </button>
          </div>
        </div>

        {/* Concept Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-[10px] font-mono uppercase text-slate-500 px-1 shrink-0">
            Concept Filter:
          </span>
          <button
            onClick={() => setConceptFilter("all")}
            className={`px-2 py-0.5 rounded-lg text-[11px] font-mono transition-all cursor-pointer ${
              conceptFilter === "all"
                ? "bg-sky-500/30 text-sky-200 border border-sky-400/50"
                : "bg-white/5 text-slate-400 hover:text-white"
            }`}
          >
            All Concepts
          </button>
          {KEY_CONCEPTS.map((c) => (
            <button
              key={c.id}
              onClick={() => setConceptFilter(c.id)}
              className={`px-2 py-0.5 rounded-lg text-[11px] font-mono transition-all cursor-pointer whitespace-nowrap ${
                conceptFilter === c.id
                  ? "bg-purple-500/30 text-purple-200 border border-purple-400/50"
                  : "bg-white/5 text-slate-400 hover:text-white"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Case Studies Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {filteredCases.map((cs) => {
          const isBookmarked = !!bookmarkedCaseStudies[cs.id];
          return (
            <div
              key={cs.id}
              className="bg-slate-950/75 rounded-3xl p-6 border border-white/10 space-y-4 relative overflow-hidden transition-all hover:border-sky-400/30 hover:bg-slate-900/80 shadow-xl"
            >
              {/* Header: Badges & Bookmark */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="font-mono text-xs px-2.5 py-1 rounded-lg bg-sky-500/20 text-sky-300 font-bold uppercase">
                      Topic {cs.topicCode}
                    </span>
                    <span className="font-mono text-xs px-2.5 py-1 rounded-lg bg-white/10 text-slate-200">
                      {cs.countryOrContext} • {cs.yearOrPeriod}
                    </span>
                    {cs.conceptIds.map((cid) => {
                      const cObj = KEY_CONCEPTS.find((k) => k.id === cid);
                      return (
                        <span
                          key={cid}
                          className="font-mono text-xs px-2 py-0.5 rounded-lg bg-purple-500/15 text-purple-300 border border-purple-500/20 uppercase font-semibold"
                        >
                          {cObj?.name || cid}
                        </span>
                      );
                    })}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
                    {cs.title}
                  </h3>
                </div>

                {/* Bookmark Button */}
                <button
                  onClick={() => toggleCaseStudyBookmarked(cs.id)}
                  className={`p-2 rounded-xl transition-all cursor-pointer shrink-0 ${
                    isBookmarked
                      ? "bg-amber-500/25 text-amber-300 border border-amber-400/40"
                      : "bg-white/5 text-slate-400 border border-white/10 hover:text-white"
                  }`}
                  title={isBookmarked ? "Remove from Arsenal" : "Save to Essay Arsenal"}
                >
                  {isBookmarked ? (
                    <BookmarkCheck className="w-5 h-5 text-amber-400" />
                  ) : (
                    <Bookmark className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* REQUIRED DIAGRAM CALLOUT BANNER (User Request: prominently mention diagram to draw) */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-950/60 to-purple-950/40 border border-sky-500/30 flex items-center justify-between gap-3 shadow-md">
                <div className="flex items-start gap-2.5">
                  <Layers className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-xs uppercase font-bold text-sky-300 tracking-wider block">
                      Required Diagram to Draw in 15-Mark Essay:
                    </span>
                    <p className="text-sm sm:text-base font-bold text-white mt-0.5">
                      {cs.diagramToDraw}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleOpenDiagram(cs.diagramToDraw)}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-sky-300 text-xs font-mono font-bold transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                >
                  View <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Empirical Data & Facts Box */}
              <div className="p-4 rounded-2xl bg-amber-950/25 border border-amber-500/30 text-slate-100 space-y-1.5 shadow-sm">
                <span className="font-mono text-xs uppercase font-bold text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" /> Empirical Data &amp; Evidence to Memorize:
                </span>
                <p className="text-[15px] sm:text-[16px] text-amber-100/95 leading-relaxed font-normal">
                  {cs.empiricalData}
                </p>
              </div>

              {/* Economic Mechanism */}
              <div className="space-y-1.5 text-slate-200">
                <span className="font-mono text-xs uppercase font-bold text-sky-300 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-sky-400" /> Economic Transmission Mechanism:
                </span>
                <p className="text-[15px] sm:text-[16px] text-slate-200 leading-relaxed font-normal">
                  {cs.economicMechanism}
                </p>
              </div>

              {/* Stakeholder & SLAP Evaluation Breakdown */}
              <div className="space-y-2.5 pt-2 border-t border-white/5">
                <span className="font-mono text-xs uppercase font-bold text-purple-300 flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-purple-400" /> Stakeholder &amp; SLAP Evaluation:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm">
                  <div className="p-3 rounded-xl bg-slate-950/50 border border-white/5">
                    <strong className="text-white block font-bold mb-0.5">Consumers:</strong>
                    <span className="text-slate-200 leading-relaxed">{cs.stakeholderEvaluation.consumers}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/50 border border-white/5">
                    <strong className="text-white block font-bold mb-0.5">Producers:</strong>
                    <span className="text-slate-200 leading-relaxed">{cs.stakeholderEvaluation.producers}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/50 border border-white/5">
                    <strong className="text-white block font-bold mb-0.5">Government:</strong>
                    <span className="text-slate-200 leading-relaxed">{cs.stakeholderEvaluation.government}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/50 border border-white/5">
                    <strong className="text-white block font-bold mb-0.5">Long vs Short Run:</strong>
                    <span className="text-slate-200 leading-relaxed">{cs.stakeholderEvaluation.longRunVsShortRun}</span>
                  </div>
                </div>
              </div>

              {/* Assumptions & Limitations */}
              <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/20 text-slate-200 space-y-1">
                <span className="font-mono text-xs uppercase font-bold text-rose-300 flex items-center gap-1 mb-1">
                  <ShieldAlert className="w-4 h-4 text-rose-400" /> Assumptions &amp; Evaluation Limitations:
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {cs.assumptionsAndLimitations}
                </p>
              </div>

              {/* Suggested 15-Mark Essay Prompts */}
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 space-y-1.5">
                <span className="font-mono text-xs uppercase font-bold text-slate-300 block">
                  Best Used in 15-Mark Essay Prompts:
                </span>
                <ul className="space-y-1 text-xs sm:text-sm text-slate-200 list-disc list-inside leading-relaxed">
                  {cs.essayPrompts.map((prompt, pIdx) => (
                    <li key={pIdx} className="italic">&quot;{prompt}&quot;</li>
                  ))}
                </ul>
              </div>

              {/* Footer Actions: Copy Snippet & Memorization Hook */}
              <div className="pt-2.5 flex flex-wrap items-center justify-between gap-2 border-t border-white/5">
                <span className="text-xs sm:text-sm text-amber-200/90 font-mono italic">
                  💡 {cs.memorizationHook}
                </span>
                <button
                  onClick={() => handleCopySnippet(cs)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                    copiedId === cs.id
                      ? "bg-emerald-500/25 text-emerald-300 border border-emerald-400/40"
                      : "bg-white/10 text-white hover:bg-white/15"
                  }`}
                >
                  {copiedId === cs.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied Essay Snippet!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-300" /> Copy 15-Mark Evidence
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
