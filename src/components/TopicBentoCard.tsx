"use client";

import React, { useState } from "react";
import { TopicData, KEY_CONCEPTS, ConceptId, DIAGRAMS_DOSSIER } from "@/data";
import { useStudyStore } from "@/store/useStudyStore";
import { RecallFlipCard } from "@/components/RecallFlipCard";
import { InteractiveDiagram } from "./InteractiveDiagram";
import { MathFormula } from "./MathFormula";
import { AcademicNotesRenderer } from "./AcademicNotesRenderer";
import { AcademicNotesSurface } from "./AcademicNotesSurface";
import {
  GraduationCap,
  Zap,
  CheckCircle2,
  Circle,
  Bookmark,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Layers,
  HelpCircle,
  FileText,
  AlertTriangle,
  Lightbulb,
  Globe2,
  BookOpen,
  Calculator,
  Flame,
  ArrowRight,
} from "lucide-react";

interface TopicBentoCardProps {
  topic: TopicData;
  isDeferred?: boolean;
  showPrevNextControls?: boolean;
}

const TopicBentoCardComponent: React.FC<TopicBentoCardProps> = ({
  topic,
  isDeferred = false,
  showPrevNextControls = true,
}) => {
  const {
    learningPosture,
    setLearningPosture,
    completedTopics,
    toggleTopicCompleted,
    bookmarkedTopics,
    toggleTopicBookmarked,
    topicNotes,
    saveTopicNote,
    setActiveDiagramId,
    setViewMode,
    goToNextTopic,
    goToPrevTopic,
  } = useStudyStore();

  const isCompleted = !!completedTopics[topic.id];
  const isBookmarked = !!bookmarkedTopics[topic.id];
  const currentNote = topicNotes[topic.id] || "";

  const [activeCheckId, setActiveCheckId] = useState<string | null>(null);
  const [showNoteEditor, setShowNoteEditor] = useState<boolean>(false);
  const [noteInput, setNoteInput] = useState<string>(currentNote);
  const [useHandwrittenNotes, setUseHandwrittenNotes] = useState<boolean>(true);
  const [activeLocalDiagramId, setActiveLocalDiagramId] = useState<string>(
    topic.diagramIds[0] || ""
  );

  const currentDiagramId =
    topic.diagramIds.includes(activeLocalDiagramId)
      ? activeLocalDiagramId
      : topic.diagramIds[0] || "";

  const handleSaveNote = () => {
    saveTopicNote(topic.id, noteInput);
    setShowNoteEditor(false);
  };

  const unitNum = topic.unitId.replace("unit-", "");

  return (
    <article
      id={`topic-card-${topic.id}`}
      className={`space-y-5 topic-transition-enter ${isDeferred ? "deferred-chapter-card" : ""}`}
    >
      <RecallFlipCard
        moduleCode={topic.displayCode}
        title={`${topic.displayCode} · ${topic.title}`}
        prompt={topic.examPromptTakeaway || topic.summary}
        answer={topic.analysis.coreThesis || topic.summary}
        accent="#1d4ed8"
        secondary="#d97706"
        meta="ACTIVE RECALL"
      />

      {/* ==================== BENTO HERO HEADER (1984 STUDY APP STYLE) ==================== */}
      <div className="liquid-glass-bento rounded-3xl p-6 lg:p-7 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          {/* Hierarchy Breadcrumb: Unit ➔ Topic */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-sky-500/20 text-sky-300 border border-sky-400/40">
              Unit {unitNum} • Topic {topic.displayCode}
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border bg-blue-500/15 border-blue-500/35 text-blue-200">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              IMPORTANCE: {topic.strategicImportance}
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-slate-300 liquid-glass-pill">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              {topic.readingTimeMinutes} min speed-read
            </span>
          </div>

          {/* Interactive Topic Check-Off + Prev/Next Buttons */}
          <div className="flex items-center gap-2">
            {showPrevNextControls && (
              <div className="flex items-center gap-1 mr-1">
                <button
                  onClick={goToPrevTopic}
                  title="Previous Topic"
                  className="p-2 rounded-2xl liquid-glass-pill text-slate-300 hover:text-white cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={goToNextTopic}
                  title="Next Topic"
                  className="p-2 rounded-2xl liquid-glass-pill text-slate-300 hover:text-white cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Bookmark button */}
            <button
              onClick={() => toggleTopicBookmarked(topic.id)}
              className={`p-2 rounded-2xl transition-all cursor-pointer ${
                isBookmarked
                  ? "bg-amber-500/25 text-amber-300 border border-amber-400/40"
                  : "liquid-glass-pill text-slate-400 hover:text-white"
              }`}
              title="Bookmark Topic"
            >
              <Bookmark className="w-4 h-4" />
            </button>

            {/* Mark Done button */}
            <button
              onClick={() => toggleTopicCompleted(topic.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                isCompleted
                  ? "bg-emerald-500/25 text-emerald-200 border border-emerald-400/50 shadow-lg shadow-emerald-500/15"
                  : "bg-white/10 hover:bg-sky-500/25 text-white border border-white/25 hover:border-sky-300/50"
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Topic Completed</span>
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4 text-sky-300" />
                  <span>Mark Topic Read</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Topic Title & Subtitle */}
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-snug mb-1.5 font-display">
          {topic.title}
        </h1>
        <p className="text-xs sm:text-sm text-sky-200/85 font-medium mb-4">
          {topic.subtitle}
        </p>

        {/* Setting & Syllabus Metadata Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-4 border-t border-white/10 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <BookOpen className="w-4 h-4 text-sky-400 shrink-0" />
            <span className="text-slate-400 font-medium">Syllabus Ref:</span>
            <span className="text-white truncate">{topic.syllabusRef}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <GraduationCap className="w-4 h-4 text-blue-400 shrink-0" />
            <span className="text-slate-400 font-medium">Assessment Papers:</span>
            <span className="text-blue-200 truncate">Paper 1 (10M/15M) &amp; Paper 2 Data Response</span>
          </div>
        </div>
      </div>

      {/* =====================================================================
          MODE A: ⚡ PRE-LESSON / EXAM CRAM POSTURE VIEW
          ===================================================================== */}
      {learningPosture === "pre-lesson-cram" ? (
        <div className="space-y-6">
          {/* 5-Min Classroom Primer Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 to-slate-900/60 border border-amber-500/30">
            <span className="font-mono text-xs sm:text-sm font-bold text-amber-300 flex items-center gap-1.5 uppercase tracking-wider mb-2">
              <Zap className="w-4 h-4 text-amber-400" /> 5-Minute Classroom Primer / Cheat Sheet
            </span>
            <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-normal">
              {topic.primer5Min}
            </p>
          </div>

          {/* Speed-Read High-Yield Bullets */}
          <div>
            <h4 className="font-mono text-xs sm:text-sm uppercase tracking-wider text-slate-300 font-bold mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-sky-400" /> High-Yield Revision Memory Bullets
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {topic.speedReadBullets.map((bullet, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-950/50 border border-white/5 text-sm sm:text-base text-slate-200 flex items-start gap-3 leading-relaxed"
                >
                  <span className="w-6 h-6 rounded-lg bg-sky-500/15 text-sky-300 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Common Exam Traps & Misconceptions */}
          <div className="p-4 sm:p-5 rounded-2xl bg-rose-950/25 border border-rose-500/25">
            <h4 className="font-mono text-xs sm:text-sm uppercase tracking-wider text-rose-300 mb-2.5 flex items-center gap-1.5 font-bold">
              <AlertTriangle className="w-4 h-4 text-rose-400" /> Common Exam Traps & Examiner Pitfalls
            </h4>
            <ul className="space-y-2">
              {topic.analysis.commonMisconceptions.map((misc, idx) => (
                <li
                  key={idx}
                  className="text-sm sm:text-base text-slate-200 flex items-start gap-2.5 leading-relaxed"
                >
                  <span className="text-rose-400 font-bold shrink-0 mt-0.5">•</span>
                  <span>{misc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Paper 1 & Paper 2 Exam Blueprint (DEED & SLAP) */}
          <div className="p-5 rounded-2xl bg-blue-950/20 border border-blue-500/25 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs sm:text-sm uppercase font-bold text-blue-300 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-400" /> 15-Mark Essay Exam Blueprint (DEED & SLAP)
              </span>
              <span className="text-xs font-mono text-blue-300 px-2.5 py-0.5 rounded bg-blue-500/15 border border-blue-500/20">
                Command: {topic.examBlueprint.commandTerm}
              </span>
            </div>
            <p className="text-sm sm:text-base font-semibold text-white italic leading-relaxed">
              &quot;{topic.examBlueprint.paper1EssayPrompt}&quot;
            </p>

            {/* DEED Structure Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5">
                <span className="font-mono text-xs uppercase font-bold text-sky-300 block">
                  D - Define
                </span>
                <p className="text-xs sm:text-sm text-slate-200 mt-1.5 leading-relaxed">
                  {topic.examBlueprint.deeedStructure.define}
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5">
                <span className="font-mono text-xs uppercase font-bold text-emerald-300 block">
                  E - Explain
                </span>
                <p className="text-xs sm:text-sm text-slate-200 mt-1.5 leading-relaxed">
                  {topic.examBlueprint.deeedStructure.explain}
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5">
                <span className="font-mono text-xs uppercase font-bold text-amber-300 block">
                  E - Exemplify
                </span>
                <p className="text-xs sm:text-sm text-slate-200 mt-1.5 leading-relaxed">
                  {topic.examBlueprint.deeedStructure.exemplify}
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5">
                <span className="font-mono text-xs uppercase font-bold text-blue-300 block">
                  D - Diagram
                </span>
                <p className="text-xs sm:text-sm text-slate-200 mt-1.5 leading-relaxed">
                  {topic.examBlueprint.deeedStructure.diagram}
                </p>
              </div>
            </div>

            {/* SLAP Evaluation Criteria */}
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-blue-500/20 text-xs space-y-1">
              <span className="font-mono text-[10px] font-bold text-blue-300 uppercase">
                SLAP Evaluation Framework:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300 pt-1">
                <div>
                  <strong className="text-white">Stakeholders:</strong>{" "}
                  {topic.examBlueprint.slapEvaluation.stakeholders}
                </div>
                <div>
                  <strong className="text-white">Long vs Short Term:</strong>{" "}
                  {topic.examBlueprint.slapEvaluation.longShortTerm}
                </div>
                <div>
                  <strong className="text-white">Assumptions:</strong>{" "}
                  {topic.examBlueprint.slapEvaluation.assumptions}
                </div>
                <div>
                  <strong className="text-white">Priorities:</strong>{" "}
                  {topic.examBlueprint.slapEvaluation.priorities}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Diagram Preview for Exam Cram Mode */}
          {topic.diagramIds.length > 0 && currentDiagramId && (
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-amber-300 flex items-center gap-1.5 font-bold">
                  <Layers className="w-4 h-4 text-amber-400" /> Exam Cram Diagram Anchor
                </span>
                <button
                  onClick={() => {
                    setActiveDiagramId(currentDiagramId);
                    setViewMode("diagrams");
                  }}
                  className="text-xs font-mono text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  Open in Diagram Lab →
                </button>
              </div>
              <InteractiveDiagram diagramId={currentDiagramId} compact />
            </div>
          )}
        </div>
      ) : (
        /* =====================================================================
           MODE B: 🎓 STUDY AS NEW (FULL WALKTHROUGH)
           ===================================================================== */
        <div className="space-y-8">
          {/* Executive Summary */}
          <div className="p-4 sm:p-5 rounded-2xl bg-sky-950/20 border border-sky-500/20">
            <span className="font-mono text-[11px] font-bold text-sky-300 uppercase tracking-wider mb-1 block">
              Core Concept Summary
            </span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
              {topic.summary}
            </p>
          </div>

          {/* Embedded Interactive Vector Diagram (if diagram exists) */}
          {topic.diagramIds.length > 0 && currentDiagramId && (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs uppercase tracking-wider text-sky-300 flex items-center gap-1.5 font-bold">
                  <Layers className="w-4 h-4" /> Integrated Vector Diagram Model
                </span>
                <button
                  onClick={() => {
                    setActiveDiagramId(currentDiagramId);
                    setViewMode("diagrams");
                  }}
                  className="text-xs font-mono text-sky-400 hover:text-sky-300 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  Open in Diagram Lab →
                </button>
              </div>

              {/* Multi-diagram selection ribbon if topic has more than one diagram */}
              {topic.diagramIds.length > 1 && (
                <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-slate-950/40 border border-white/5">
                  <span className="text-[10px] font-mono uppercase text-slate-400 px-1.5">
                    Topic Diagrams:
                  </span>
                  {topic.diagramIds.map((dId) => {
                    const dItem = DIAGRAMS_DOSSIER.find((d) => d.id === dId);
                    const isSelected = currentDiagramId === dId;
                    return (
                      <button
                        key={dId}
                        onClick={() => setActiveLocalDiagramId(dId)}
                        className={`px-2.5 py-1 rounded-xl text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? "bg-sky-500/30 text-sky-200 border border-sky-400/50 shadow-sm"
                            : "bg-white/5 text-slate-400 hover:text-white"
                        }`}
                      >
                        <span className="font-bold">{dItem?.code || dId}</span>
                        <span className="text-[11px] opacity-80">
                          {dItem ? dItem.title.split(":")[0].split("&")[0].split("(")[0].trim() : dId}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              <InteractiveDiagram diagramId={currentDiagramId} />
            </div>
          )}

          {/* Detailed Subsections */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2.5">
              <h3 className="font-mono text-sm sm:text-base uppercase tracking-wider text-slate-300 font-bold flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-400" /> First-Principles Syllabus Breakdown
              </h3>
              <button
                onClick={() => setUseHandwrittenNotes(!useHandwrittenNotes)}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-mono transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer border jelly-hover ${
                  useHandwrittenNotes
                    ? "bg-sky-500/20 text-sky-200 border-sky-400/40 shadow-sm font-bold"
                    : "bg-white/5 text-slate-400 border-white/10 hover:text-white"
                }`}
                title="Academic typography mode"
              >
                <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                <span>{useHandwrittenNotes ? "Academic Typography: Expanded" : "Academic Typography: Compact"}</span>
              </button>
            </div>

            <div className="space-y-6">
              {topic.subSections.map((sub, sIdx) => (
                <div
                  key={sub.id}
                  className={`academic-notebook-section p-5 sm:p-7 space-y-4 shadow-xl jelly-card animate-jelly-enter stagger-${(sIdx % 6) + 1}`}
                >
                  <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-3">
                    <span className="font-mono text-xs px-3 py-1 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 uppercase font-bold tracking-wider">
                      {sub.marker}
                    </span>
                    <span className="font-mono text-xs text-slate-400 font-medium">
                      Section {sIdx + 1} of {topic.subSections.length}
                    </span>
                  </div>

                  <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
                    {sub.title}
                  </h4>

                  {/* Neatly structured academic notes */}
                  <AcademicNotesRenderer
                    content={sub.content}
                    isHandwritten={useHandwrittenNotes}
                  />

                  {/* Formula if present */}
                  {sub.keyFormulaOrFramework && (
                    <div className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/25 shadow-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                          <Calculator className="w-4 h-4 text-emerald-400" />
                          Mathematical Formula / Model:
                        </span>
                        <span className="text-xs font-mono text-emerald-500/80 font-medium">
                          LaTeX KaTeX
                        </span>
                      </div>
                      <MathFormula math={sub.keyFormulaOrFramework} block />
                    </div>
                  )}

                  {/* Analytical Exam Takeaway */}
                  <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-500/25 flex items-start gap-3 shadow-md">
                    <Lightbulb className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <div className="space-y-1 min-w-0">
                      <span className="text-xs font-mono uppercase tracking-wider text-blue-300 font-bold block">
                        Exam Takeaway:
                      </span>
                      <p
                        className="leading-relaxed text-blue-100 font-sans text-[15px] sm:text-[15.5px] font-normal"
                      >
                        {sub.analyticalTakeaway}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real-World Case Studies */}
          {topic.cases.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-emerald-400" /> Real-World Case Studies & Empirical Context
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {topic.cases.map((cs) => (
                  <div
                    key={cs.id}
                    className="p-4 rounded-2xl bg-slate-950/60 border border-emerald-500/20 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-300 font-mono">
                        {cs.countryOrContext}
                      </span>
                      <div className="flex gap-1">
                        {cs.concepts.map((cId) => (
                          <span
                            key={cId}
                            className="px-1.5 py-0.5 rounded text-[9px] font-mono uppercase font-semibold bg-white/10 text-slate-300"
                          >
                            {cId}
                          </span>
                        ))}
                      </div>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">
                      {cs.title}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {cs.realWorldMechanism}
                    </p>
                    <div className="pt-2 border-t border-white/5 text-[11px] text-slate-400 italic">
                      <strong className="text-slate-200">Evaluation:</strong>{" "}
                      {cs.evaluationAO3AO4}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Formative Checkpoints: Check Your Understanding */}
          {topic.checkUnderstanding.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="font-mono text-xs uppercase tracking-wider text-blue-300 flex items-center gap-2 font-bold">
                <HelpCircle className="w-4 h-4 text-blue-400" /> Check Your Understanding (Formative Checkpoints)
              </h3>
              <div className="space-y-3">
                {topic.checkUnderstanding.map((chk, cIdx) => {
                  const isOpen = activeCheckId === chk.id;
                  return (
                    <div
                      key={chk.id}
                      className="rounded-2xl border border-white/10 bg-slate-950/50 overflow-hidden"
                    >
                      <button
                        onClick={() =>
                          setActiveCheckId(isOpen ? null : chk.id)
                        }
                        className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-xs px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-300 font-bold shrink-0">
                            Q{cIdx + 1}
                          </span>
                          <span className="text-sm sm:text-base font-bold text-white leading-snug">
                            {chk.question}
                          </span>
                        </div>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-blue-400 shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="p-5 pt-2 border-t border-white/5 bg-blue-950/15 space-y-3.5 text-xs sm:text-sm animate-in fade-in duration-150">
                          {/* Hints */}
                          {chk.hints.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-xs font-mono uppercase text-slate-400 font-bold">
                                Hints:
                              </span>
                              {chk.hints.map((h, hIdx) => (
                                <span
                                  key={hIdx}
                                  className="px-2.5 py-1 rounded-lg bg-white/5 text-xs text-slate-300"
                                >
                                  {h}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Model Answer */}
                          <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/20 text-emerald-100 text-sm sm:text-[15.5px] leading-relaxed shadow-sm">
                            <span className="font-mono text-xs uppercase font-bold text-emerald-400 block mb-1.5">
                              ✓ Examiner Model Answer:
                            </span>
                            {chk.modelAnswer}
                          </div>

                          {/* Key Terms Required */}
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-mono uppercase text-slate-400 font-bold">
                              Essential Markscheme Terms:
                            </span>
                            {chk.keyTermsToInclude.map((kt, kIdx) => (
                              <span
                                key={kIdx}
                                className="px-2.5 py-1 rounded-lg bg-sky-500/15 text-sky-300 font-mono text-xs font-bold"
                              >
                                {kt}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          BOTTOM FOOTER: PERSONAL STUDY NOTE ACCORDION
          ===================================================================== */}
      <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNoteEditor(!showNoteEditor)}
            className="text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/5"
          >
            <FileText className="w-3.5 h-3.5" />
            {currentNote ? "Edit Personal Note" : "+ Add Study Note"}
          </button>
          {currentNote && !showNoteEditor && (
            <span className="text-[11px] text-sky-300 font-mono italic line-clamp-1 max-w-sm">
              Note: {currentNote}
            </span>
          )}
        </div>

        {/* 9 Key Concepts Tags */}
        <div className="flex flex-wrap items-center gap-1">
          <span className="text-[10px] font-mono text-slate-500 mr-1">
            Concepts:
          </span>
          {topic.conceptTracking.map((ct) => {
            const def = KEY_CONCEPTS.find((k) => k.id === ct.conceptId);
            return (
              <span
                key={ct.conceptId}
                className="px-2 py-0.5 rounded-lg text-[10px] font-mono font-semibold"
                style={{
                  backgroundColor: def?.badgeBg || "rgba(255,255,255,0.08)",
                  color: def?.color || "#ffffff",
                  border: `1px solid ${def?.badgeBorder || "rgba(255,255,255,0.15)"}`,
                }}
              >
                {def?.shortName || ct.conceptId}
              </span>
            );
          })}
        </div>
      </div>

      {/* Note Editor Dropdown */}
      {showNoteEditor && (
        <div className="mt-3 animate-in fade-in duration-150">
          <AcademicNotesSurface
            note={topicNotes[topic.id] || ""}
            onChange={(text) => saveTopicNote(topic.id, text)}
            title="Personal Study & Policy Marginalia"
            itemCode={topic.displayCode || topic.topicCode}
            accentColor="#0ea5e9"
            minRows={4}
          />
        </div>
      )}
    </article>
  );
};

export const TopicBentoCard = React.memo(TopicBentoCardComponent);
