"use client";

import React, { useState } from "react";
import { KEY_CONCEPTS, ALL_TOPICS, SYLLABUS_UNITS, ConceptId } from "@/data";
import { useStudyStore } from "@/store/useStudyStore";
import {
  Compass,
  Sparkles,
  Layers,
  ArrowRight,
  ExternalLink,
  BookOpen,
} from "lucide-react";

export const ThemeMatrixView: React.FC = () => {
  const { setActiveTopic, setViewMode } = useStudyStore();
  const [selectedConcept, setSelectedConcept] = useState<ConceptId>("scarcity");

  const currentConcept =
    KEY_CONCEPTS.find((k) => k.id === selectedConcept) || KEY_CONCEPTS[0];

  // Find all topics connected to this concept
  const relatedTopics = ALL_TOPICS.filter((t) =>
    t.conceptTracking.some((c) => c.conceptId === selectedConcept)
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="liquid-glass-bento rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-xs px-2.5 py-1 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-500/30 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" /> 9 Key Concepts Lens
            </span>
            <span className="text-xs font-mono text-slate-400">
              The Conceptual Architecture of IB Economics
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            IB Economics 9 Key Concepts Matrix
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            The 2022+ IB Economics syllabus organizes all microeconomic,
            macroeconomic, and international phenomena around 9 foundational
            concepts. High-scoring Paper 1 and Paper 2 evaluations explicitly weave
            these concepts into their arguments.
          </p>
        </div>
      </div>

      {/* 9 Concept Selector Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
        {KEY_CONCEPTS.map((c) => {
          const isSelected = selectedConcept === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedConcept(c.id)}
              className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                isSelected
                  ? "bg-slate-900/90 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                  : "bg-slate-950/60 border-white/10 hover:border-white/20 hover:bg-slate-900/60"
              }`}
              style={{
                borderColor: isSelected ? c.color : undefined,
              }}
            >
              <div
                className="w-3.5 h-3.5 rounded-full mx-auto mb-1.5 shadow-sm"
                style={{ backgroundColor: c.color }}
              />
              <span className="text-xs font-bold text-white block line-clamp-1">
                {c.shortName}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Concept Deep Dive Dossier */}
      <div className="liquid-glass-bento rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-5 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: currentConcept.color }}
              />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                Key Concept Dossier
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">
              {currentConcept.name}
            </h2>
          </div>
          <span
            className="px-3 py-1 rounded-xl text-xs font-mono font-bold self-start md:self-auto"
            style={{
              backgroundColor: currentConcept.badgeBg,
              color: currentConcept.color,
              border: `1px solid ${currentConcept.badgeBorder}`,
            }}
          >
            {relatedTopics.length} Connected Syllabus Topics
          </span>
        </div>

        {/* Concept Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-2">
            <span className="font-mono text-xs uppercase font-bold text-sky-300 block">
              Official Definition
            </span>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              {currentConcept.description}
            </p>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-2">
            <span className="font-mono text-xs uppercase font-bold text-emerald-300 block">
              Core Economic Mechanism
            </span>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              {currentConcept.coreMechanism}
            </p>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl bg-purple-950/20 border border-purple-500/20 space-y-2">
            <span className="font-mono text-xs uppercase font-bold text-purple-300 block">
              Paper 1 & 2 Exam Tip
            </span>
            <p className="text-sm sm:text-base text-purple-200 leading-relaxed font-normal">
              {currentConcept.examTips}
            </p>
          </div>
        </div>

        {/* Matrix of Connected Syllabus Topics */}
        <div className="space-y-3 pt-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-sky-400" /> Syllabus Topics Manifesting {currentConcept.name}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {relatedTopics.map((t) => {
              const tracking = t.conceptTracking.find(
                (c) => c.conceptId === selectedConcept
              );
              return (
                <div
                  key={t.id}
                  onClick={() => {
                    setActiveTopic(t.id);
                    setViewMode("focus");
                  }}
                  className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 hover:border-sky-500/40 transition-all cursor-pointer group space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-sky-400 group-hover:underline">
                      {t.displayCode}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      Intensity: {tracking?.intensity || 3}/5
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white line-clamp-1">
                    {t.title}
                  </h4>
                  <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                    {tracking?.manifestation}
                  </p>
                  <div className="text-[10px] font-mono text-sky-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    View Topic Breakdown →
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
