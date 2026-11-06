"use client";

import React, { useState, useMemo } from "react";
import { DIAGRAMS_DOSSIER, DiagramDossier, UnitId } from "@/data";
import { useStudyStore } from "@/store/useStudyStore";
import { InteractiveDiagram } from "./InteractiveDiagram";
import { MarketDiagramEngine } from "./MarketDiagramEngine";
import { LivingEconomicsDiagramSimulator } from "./LivingEconomicsDiagramSimulator";

import {
  Layers,
  Search,
  Filter,
  Sparkles,
  BookOpen,
  Zap,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

export const DiagramLabView: React.FC = () => {
  const {
    activeDiagramId,
    setActiveDiagramId,
    setActiveTopic,
    setViewMode,
  } = useStudyStore();

  const [categoryFilter, setCategoryFilter] = useState<
    "all" | "Foundations" | "Microeconomics" | "Macroeconomics" | "Global Economy"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewStudioMode, setViewStudioMode] = useState<"simulator" | "dossier">("simulator");


  const filteredDiagrams = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return DIAGRAMS_DOSSIER.filter((d) => {
      const matchesCategory =
        categoryFilter === "all" || d.category === categoryFilter;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        d.title.toLowerCase().includes(q) ||
        d.code.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q)
      );
    });
  }, [categoryFilter, searchQuery]);

  const selectedDiagram = useMemo(
    () =>
      DIAGRAMS_DOSSIER.find((d) => d.id === activeDiagramId) ||
      DIAGRAMS_DOSSIER[0],
    [activeDiagramId]
  );

  return (
    <div className="space-y-6">
      {/* Studio Mode Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-black/40 border border-white/10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider px-2">
            Diagram Studio Mode:
          </span>
          <button
            onClick={() => setViewStudioMode("simulator")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              viewStudioMode === "simulator"
                ? "bg-gradient-to-r from-sky-500/30 to-teal-500/30 text-white border border-sky-400/50 shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            Living Market Simulator &amp; Welfare Engine
          </button>
          <button
            onClick={() => setViewStudioMode("dossier")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              viewStudioMode === "dossier"
                ? "bg-gradient-to-r from-indigo-500/30 to-sky-500/30 text-white border border-indigo-400/50 shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            29 Core Syllabus Vector Diagrams
          </button>
        </div>
      </div>

      {viewStudioMode === "simulator" && <LivingEconomicsDiagramSimulator />}

      {viewStudioMode === "dossier" && (
        <div className="space-y-6">
      {/* Header Banner */}
      <div className="liquid-glass-bento rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-xs px-2.5 py-1 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-500/30 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" /> Interactive Vector Studio
            </span>
            <span className="text-xs font-mono text-slate-400">
              29 Core Syllabus Diagrams
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            IB Economics SL Diagram Lab & Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Diagrams represent up to 40% of marks in Paper 1 and Paper 2. Explore
            pixel-perfect interactive vector diagrams with step-by-step drawing
            instructions, shift mechanics, welfare loss shading, and common
            student pitfalls.
          </p>
        </div>
      </div>

      {/* Category Pills & Search Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
          {(
            [
              { id: "all", label: "All (29)" },
              { id: "Foundations", label: "Foundations (2)" },
              { id: "Microeconomics", label: "Micro (12)" },
              { id: "Macroeconomics", label: "Macro (10)" },
              { id: "Global Economy", label: "Global (5)" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCategoryFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                categoryFilter === tab.id
                  ? "liquid-glass-pill-active text-white"
                  : "liquid-glass-pill text-slate-300 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search diagrams by title, curve..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900/60 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500/60"
          />
        </div>
      </div>

      {/* Main Studio Grid: Left Diagram Selector List, Right Interactive Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Side: Diagram Selector Grid (Compact Ergonomic Master List) */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-2 max-h-[calc(100vh-14rem)] overflow-y-auto pr-1.5 no-scrollbar">
          {filteredDiagrams.map((d) => {
            const isSelected = d.id === selectedDiagram.id;
            return (
              <div
                key={d.id}
                onClick={() => setActiveDiagramId(d.id)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-slate-900/90 border-teal-400/60 shadow-[0_0_20px_rgba(20,184,166,0.25)]"
                    : "bg-slate-950/60 border-white/10 hover:border-white/25 hover:bg-slate-900/70"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`font-mono text-[10px] px-2 py-0.5 rounded-md font-bold ${
                        isSelected
                          ? "bg-teal-400 text-slate-950"
                          : "bg-white/10 text-teal-300"
                      }`}
                    >
                      {d.code}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {d.category}
                    </span>
                  </div>
                  <ChevronRight
                    className={`w-3.5 h-3.5 transition-transform ${
                      isSelected ? "text-teal-400 translate-x-1" : "text-slate-600"
                    }`}
                  />
                </div>
                <h4 className="text-xs font-bold text-white mb-0.5 line-clamp-1">
                  {d.title}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-1 leading-normal font-normal">
                  {d.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Side: Primary Interactive Diagram Canvas (Space-Optimized Studio Workspace) */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-4 w-full">
          <InteractiveDiagram diagramId={selectedDiagram.id} />
          <MarketDiagramEngine />

          {/* Quick Actions Card */}
          <div className="liquid-glass-bento rounded-2xl p-4 border border-white/10 flex flex-wrap items-center justify-between gap-3 shadow-lg">
            <div className="text-xs sm:text-sm text-slate-200">
              <span className="font-bold text-white">Next Step:</span> Test
              your active recall on this diagram or jump to related syllabus notes.
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("revision")}
                className="px-3 py-1.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-mono font-semibold hover:bg-purple-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5" /> Test in Active Recall
              </button>
            </div>
          </div>
        </div>
      </div>
        </div>
      )}
    </div>
  );
};
