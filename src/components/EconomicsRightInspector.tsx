"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TopicData } from "@/data";
import { useStudyStore } from "@/store/useStudyStore";
import { RecallFlipCard } from "@/components/RecallFlipCard";
import {
  TrendingUp,
  Globe2,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  PanelRightClose,
  X,
  Edit3,
  Copy,
  Check,
  GraduationCap,
  Scale,
  AlertTriangle,
  Layers,
  LineChart,
  Timer,
} from "lucide-react";

interface EconomicsRightInspectorProps {
  topic: TopicData;
  isOpen: boolean;
  onToggle: () => void;
}

type InspectorTab = "eval" | "cases" | "diagrams" | "notes";

export function EconomicsRightInspector({
  topic,
  isOpen,
  onToggle,
}: EconomicsRightInspectorProps) {
  const [activeTab, setActiveTab] = useState<InspectorTab>("eval");
  const [copiedNote, setCopiedNote] = useState(false);

  const {
    completedTopics,
    toggleTopicCompleted,
    topicNotes,
    saveTopicNote,
    openExamSprint,
  } = useStudyStore();

  const userNote = topicNotes[topic.id] || "";
  const isCompleted = !!completedTopics[topic.id];

  const handleCopyNote = () => {
    if (userNote.trim()) {
      navigator.clipboard.writeText(userNote);
      setCopiedNote(true);
      setTimeout(() => setCopiedNote(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          key="economics-analytical-inspector"
          initial={{ opacity: 0, x: 36, y: -16, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          exit={{
            opacity: 0,
            x: 44,
            y: -32,
            scale: 0.92,
            transition: {
              duration: 0.26,
              ease: [0.16, 1, 0.3, 1],
            },
          }}
          transition={{
            duration: 0.32,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ willChange: "transform, opacity" }}
          data-tour="inspector"
          className="w-80 lg:w-88 shrink-0 sticky top-3 select-none overflow-hidden transition-all z-10"
        >
          <div className="liquid-glass-bento rounded-3xl p-4 border border-teal-500/30 bg-slate-950/70 backdrop-blur-2xl shadow-2xl flex flex-col max-h-[calc(100vh-1.5rem)] overflow-hidden">
            {/* Top Header */}
            <div className="flex items-center justify-between gap-2 pb-2.5 mb-3 border-b border-white/10 shrink-0 min-h-[44px]">
              <div className="flex items-center gap-2 min-w-0">
                <div className="p-1.5 rounded-xl bg-teal-500/20 border border-teal-400/40 text-teal-300 shrink-0">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-teal-400 uppercase block truncate">
                    EQUILIBRIUM INSPEKTOR
                  </span>
                  <h3 className="text-xs font-semibold text-white tracking-tight truncate">
                    {topic.displayCode} · {topic.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => toggleTopicCompleted(topic.id)}
                  title={isCompleted ? "Mark Incomplete" : "Mark Topic Mastered"}
                  className={`p-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    isCompleted
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/35"
                      : "bg-white/5 text-slate-400 hover:text-white border border-white/10"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                </button>
                <button
                  onClick={onToggle}
                  title="Tuck Inspector away (⌘I)"
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-black/40 rounded-xl border border-white/10 mb-3 shrink-0">
          <button
            onClick={() => setActiveTab("eval")}
            className={`py-1.5 px-1 rounded-lg text-[10px] font-mono font-bold uppercase transition-all cursor-pointer truncate ${
              activeTab === "eval"
                ? "bg-teal-500/25 text-teal-200 border border-teal-400/40 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            ⚖️ Eval
          </button>
          <button
            onClick={() => setActiveTab("cases")}
            className={`py-1.5 px-1 rounded-lg text-[10px] font-mono font-bold uppercase transition-all cursor-pointer truncate ${
              activeTab === "cases"
                ? "bg-teal-500/25 text-teal-200 border border-teal-400/40 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            🌍 Cases
          </button>
          <button
            onClick={() => setActiveTab("diagrams")}
            className={`py-1.5 px-1 rounded-lg text-[10px] font-mono font-bold uppercase transition-all cursor-pointer truncate ${
              activeTab === "diagrams"
                ? "bg-teal-500/25 text-teal-200 border border-teal-400/40 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            📈 Model
          </button>
          <button
            onClick={() => setActiveTab("notes")}
            className={`py-1.5 px-1 rounded-lg text-[10px] font-mono font-bold uppercase transition-all cursor-pointer truncate ${
              activeTab === "notes"
                ? "bg-teal-500/25 text-teal-200 border border-teal-400/40 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            📝 Notes
          </button>
        </div>

        {/* Scrollable Tab Content */}
        <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 custom-scrollbar text-xs">
          {/* TAB 1: 15-MARK POLICY EVALUATION */}
          {activeTab === "eval" && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-teal-500/10 border border-teal-400/25 space-y-2">
                <div className="flex items-center gap-1.5 text-teal-300 font-bold font-mono text-[11px]">
                  <Scale className="w-3.5 h-3.5" />
                  <span>15-Mark Policy Evaluation (CLASSPIT / SLAP)</span>
                </div>
                <p className="text-[11px] text-slate-200 leading-relaxed">
                  {topic.analysis?.strategicEvaluationAO3AO4 ||
                    "Contrast immediate price/welfare adjustments with long-run structural effects on productivity, government budgets, and equity."}
                </p>
              </div>

              {/* SLAP Stakeholder Matrix */}
              {topic.examBlueprint?.slapEvaluation && (
                <div className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                    SLAP Evaluation Checklist
                  </span>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex items-start gap-1.5">
                      <span className="text-teal-400 font-bold shrink-0">Stakeholders:</span>
                      <span className="text-slate-300">{topic.examBlueprint.slapEvaluation.stakeholders}</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <span className="text-sky-400 font-bold shrink-0">Short vs Long:</span>
                      <span className="text-slate-300">{topic.examBlueprint.slapEvaluation.longShortTerm}</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <span className="text-amber-400 font-bold shrink-0">Assumptions:</span>
                      <span className="text-slate-300">{topic.examBlueprint.slapEvaluation.assumptions}</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <span className="text-rose-400 font-bold shrink-0">Priorities:</span>
                      <span className="text-slate-300">{topic.examBlueprint.slapEvaluation.priorities}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Active Recall Flipcard */}
              <div className="space-y-1">
                <span className="font-mono text-[9px] uppercase tracking-wider text-teal-400 block font-bold">
                  Active Recall Flipcard
                </span>
                <RecallFlipCard
                  moduleCode={topic.displayCode}
                  title={`${topic.displayCode} · ${topic.title}`}
                  prompt={
                    topic.examBlueprint?.paper1EssayPrompt ||
                    topic.summary ||
                    `Evaluate economic effects in ${topic.displayCode}.`
                  }
                  answer={topic.analysis?.coreThesis || topic.summary}
                  accent="#1d4ed8"
                  secondary="#d97706"
                  meta="IB ECON ACTIVE RECALL"
                />
              </div>

              {/* Launch Timed Exam Sprint Action Card */}
              <button
                onClick={openExamSprint}
                className="w-full p-3 rounded-2xl bg-gradient-to-r from-teal-500/20 via-teal-500/15 to-rose-500/15 border border-teal-400/40 hover:border-teal-400/70 text-left transition-all cursor-pointer flex items-center justify-between group shadow-lg"
              >
                <div className="flex items-center gap-2.5">
                  <span className="p-2 rounded-xl bg-teal-400/20 text-teal-300 border border-teal-400/30 group-hover:scale-105 transition-transform">
                    <Timer className="w-4 h-4 animate-pulse" />
                  </span>
                  <div>
                    <span className="font-mono text-xs font-bold text-white block">
                      Launch 15-Mark Policy Sprint
                    </span>
                    <span className="text-[10px] text-teal-200/80">
                      15m / 30m / 45m timed policy essay drill
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-teal-300 font-bold px-2 py-1 rounded-lg bg-black/40 border border-white/10">
                  ⌘E
                </span>
              </button>
            </div>
          )}

          {/* TAB 2: REAL-WORLD CASE STUDIES */}
          {activeTab === "cases" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-wider text-teal-400 font-bold">
                  Economic Real-World Anchors ({topic.cases?.length || 0})
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Paper 1/2 Evidence</span>
              </div>

              {topic.cases?.map((cs, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2 hover:border-teal-400/35 transition-all"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] text-teal-300 font-bold px-2 py-0.5 rounded-md bg-teal-500/15 border border-teal-400/20 flex items-center gap-1">
                      <Globe2 className="w-3 h-3" />
                      {cs.countryOrContext}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {cs.syllabusLink}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-200 leading-relaxed font-semibold">
                    {cs.title}
                  </p>

                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {cs.realWorldMechanism}
                  </p>

                  <div className="p-2 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-teal-400 font-bold block">
                      Evaluation Anchor (AO3/AO4)
                    </span>
                    <p className="text-[10px] text-slate-300 leading-relaxed">
                      {cs.evaluationAO3AO4}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: DIAGRAM MECHANICS */}
          {activeTab === "diagrams" && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-teal-500/10 border border-teal-400/25 space-y-1.5">
                <span className="font-mono text-[10px] uppercase tracking-wider text-teal-300 font-bold flex items-center gap-1.5">
                  <LineChart className="w-3.5 h-3.5" />
                  Key Syllabus Diagrams
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {topic.analysis?.keyDiagrams?.map((diag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-teal-500/15 text-teal-200 border border-teal-400/25"
                    >
                      {diag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Common Student Pitfalls */}
              {topic.analysis?.commonMisconceptions && topic.analysis.commonMisconceptions.length > 0 && (
                <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-400/25 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-rose-300 font-bold font-mono text-[10px]">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Examiner Warning: Common Diagram Pitfalls</span>
                  </div>
                  <ul className="space-y-1 text-[11px] text-rose-100/90 list-disc list-inside">
                    {topic.analysis.commonMisconceptions.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: PERSONAL NOTES */}
          {activeTab === "notes" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-teal-400 font-bold flex items-center gap-1.5">
                  <Edit3 className="w-3.5 h-3.5" />
                  Economic Policy Notes
                </span>
                <button
                  onClick={handleCopyNote}
                  className="flex items-center gap-1 text-[10px] font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  {copiedNote ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <textarea
                value={userNote}
                onChange={(e) => saveTopicNote(topic.id, e.target.value)}
                placeholder="Draft essay evaluations, real-world examples, or transmission steps for this unit..."
                rows={10}
                className="w-full rounded-2xl bg-black/40 border border-white/10 p-3 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-teal-400/50 resize-none font-sans leading-relaxed"
              />

              <p className="text-[10px] text-slate-400 font-mono">
                💾 Auto-saved to local encrypted storage. Persists across sessions.
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
      )}
    </AnimatePresence>
  );
}
