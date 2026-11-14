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
  Flame,
  Building2,
  GraduationCap,
} from "lucide-react";

type MatrixTab = "dossier" | "heatmap" | "cases";

export const ThemeMatrixView: React.FC = () => {
  const { setActiveTopic, setViewMode } = useStudyStore();
  const [selectedConcept, setSelectedConcept] = useState<ConceptId>("scarcity");
  const [activeTab, setActiveTab] = useState<MatrixTab>("dossier");

  const currentConcept =
    KEY_CONCEPTS.find((k) => k.id === selectedConcept) || KEY_CONCEPTS[0];

  // Find all topics connected to this concept
  const relatedTopics = ALL_TOPICS.filter((t) =>
    t.conceptTracking.some((c) => c.conceptId === selectedConcept)
  );

  // All case studies across all topics
  const allCases = ALL_TOPICS.flatMap((topic) =>
    topic.cases.map((cs) => ({
      ...cs,
      topicId: topic.id,
      topicCode: topic.displayCode,
      topicTitle: topic.title,
    }))
  );

  return (
    <div className="space-y-6">
      {/* Top Segmented Navigation Bar */}
      <div className="liquid-glass-bento rounded-3xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Compass className="w-4 h-4 text-sky-400" />
            IB Economics 9 Key Concepts Matrix
          </h2>
          <p className="text-xs text-slate-400">
            Conceptual lenses: Scarcity, Choice, Efficiency, Equity, Well-Being, Sustainability, Change, Interdependence, Intervention
          </p>
        </div>

        {/* Segmented Mode Selector */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/40 border border-white/10">
          <button
            onClick={() => setActiveTab("dossier")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
              activeTab === "dossier"
                ? "bg-amber-500/25 text-amber-200 border border-amber-400/40 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Concepts Dossier
          </button>
          <button
            onClick={() => setActiveTab("heatmap")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
              activeTab === "heatmap"
                ? "bg-amber-500/25 text-amber-200 border border-amber-400/40 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Syllabus Heatmap
          </button>
          <button
            onClick={() => setActiveTab("cases")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
              activeTab === "cases"
                ? "bg-amber-500/25 text-amber-200 border border-amber-400/40 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Real-World Cases ({allCases.length})
          </button>
        </div>
      </div>

      {/* ==================== TAB 1: CONCEPTS DOSSIER ==================== */}
      {activeTab === "dossier" && (
        <div className="space-y-6">
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
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                  {currentConcept.description}
                </p>
              </div>
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-2">
                <span className="font-mono text-xs uppercase font-bold text-emerald-300 block">
                  Core Economic Mechanism
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                  {currentConcept.coreMechanism}
                </p>
              </div>
              <div className="p-4 sm:p-5 rounded-2xl bg-purple-950/20 border border-purple-500/20 space-y-2">
                <span className="font-mono text-xs uppercase font-bold text-purple-300 block">
                  Paper 1 & 2 Exam Tip
                </span>
                <p className="text-xs sm:text-sm text-purple-200 leading-relaxed font-sans">
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
      )}

      {/* ==================== TAB 2: SYLLABUS HEATMAP ==================== */}
      {activeTab === "heatmap" && (
        <div className="liquid-glass-bento rounded-3xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Flame className="w-4 h-4 text-rose-400" />
              Topic-by-Concept Thematic Heatmap ({ALL_TOPICS.length} Topics)
            </h3>
            <span className="text-[11px] font-mono text-slate-400">
              Click any row to jump directly into focus study
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 max-h-[600px] overflow-y-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-950/80 sticky top-0 z-10 border-b border-white/10 backdrop-blur-md">
                <tr>
                  <th className="py-2.5 px-3 font-mono text-[11px] text-slate-400 font-semibold">Topic</th>
                  <th className="py-2.5 px-3 font-mono text-[11px] text-slate-400 font-semibold">Title</th>
                  {KEY_CONCEPTS.map((c) => (
                    <th key={c.id} className="py-2.5 px-3 font-mono text-[10px] text-center font-semibold" style={{ color: c.color }}>
                      {c.shortName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {ALL_TOPICS.map((topic) => {
                  const conceptMap = new Map(
                    topic.conceptTracking.map((ct) => [ct.conceptId, ct.intensity])
                  );

                  return (
                    <tr
                      key={topic.id}
                      onClick={() => {
                        setActiveTopic(topic.id);
                        setViewMode("focus");
                      }}
                      className="hover:bg-white/5 transition-colors cursor-pointer group"
                    >
                      <td className="py-2 px-3 font-mono text-[11px] font-bold text-amber-300">
                        {topic.displayCode}
                      </td>
                      <td className="py-2 px-3 text-white font-medium max-w-[200px] truncate">
                        {topic.title}
                      </td>
                      {KEY_CONCEPTS.map((c) => {
                        const intensity = conceptMap.get(c.id as ConceptId) || 0;
                        return (
                          <td key={c.id} className="py-2 px-3 text-center">
                            {intensity > 0 ? (
                              <span
                                className="inline-block px-1.5 py-0.5 rounded font-mono text-[10px] font-bold"
                                style={{
                                  backgroundColor: `${c.color}25`,
                                  color: c.color,
                                  border: `1px solid ${c.color}50`,
                                }}
                              >
                                {intensity}★
                              </span>
                            ) : (
                              <span className="text-slate-600 font-mono text-[10px]">-</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==================== TAB 3: REAL-WORLD CASES ==================== */}
      {activeTab === "cases" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allCases.map((cs) => (
            <div
              key={cs.id}
              className="liquid-glass-bento rounded-3xl p-5 space-y-3 relative group border border-white/10 hover:border-sky-400/30 transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-400/30">
                      {cs.topicCode}
                    </span>
                    <h3 className="text-sm font-bold text-white">
                      {cs.title}
                    </h3>
                  </div>
                  <span className="text-[11px] text-slate-400 block font-mono">
                    {cs.countryOrContext}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setActiveTopic(cs.topicId);
                    setViewMode("focus");
                  }}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Jump to Topic in Focus View"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                {cs.realWorldMechanism}
              </p>

              <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/10 text-xs text-slate-300">
                <span className="font-bold text-emerald-300 font-mono">
                  Evaluation (AO3/AO4):{" "}
                </span>
                {cs.evaluationAO3AO4}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
