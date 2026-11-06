"use client";

import React, { useState, useMemo } from "react";
import {
  QUESTION_STRUCTURES,
  COMMAND_TERMS,
  QuestionStructureBreakdown,
  CommandTermItem,
  AssessmentObjective,
} from "@/data";
import { useStudyStore } from "@/store/useStudyStore";
import {
  GraduationCap,
  Award,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  Search,
  Layers,
  ArrowRight,
  Sparkles,
  BookOpen,
  Filter,
  FileText,
  Lightbulb,
  ExternalLink,
} from "lucide-react";

export const ExamStructureMasteryView: React.FC = () => {
  const { setViewMode, setActiveDiagramId } = useStudyStore();

  // Active top-level subtab
  const [activeSubTab, setActiveSubTab] = useState<
    "structures" | "command-terms" | "cheatsheet"
  >("structures");

  // Selected mark breakdown tab (15, 10, 8, 6, 4, 2)
  const [selectedMark, setSelectedMark] = useState<15 | 10 | 8 | 6 | 4 | 2>(15);

  // Command terms state
  const [commandTermSearch, setCommandTermSearch] = useState("");
  const [selectedAoFilter, setSelectedAoFilter] = useState<
    AssessmentObjective | "all"
  >("all");

  // Copied toast state
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2200);
  };

  // Find active question structure
  const activeStructure: QuestionStructureBreakdown = useMemo(() => {
    return (
      QUESTION_STRUCTURES.find((q) => q.mark === selectedMark) ||
      QUESTION_STRUCTURES[0]
    );
  }, [selectedMark]);

  // Filtered command terms
  const filteredCommandTerms = useMemo(() => {
    const q = commandTermSearch.trim().toLowerCase();
    return COMMAND_TERMS.filter((ct) => {
      const matchesAo =
        selectedAoFilter === "all" || ct.ao === selectedAoFilter;
      if (!matchesAo) return false;
      if (!q) return true;
      return (
        ct.term.toLowerCase().includes(q) ||
        ct.officialIBDefinition.toLowerCase().includes(q) ||
        ct.whatExaminersExpect.toLowerCase().includes(q) ||
        ct.samplePrompt.toLowerCase().includes(q)
      );
    });
  }, [commandTermSearch, selectedAoFilter]);

  // Navigate to diagram in DiagramLab
  const handleOpenDiagram = (diagramCodeWithTitle: string) => {
    // Extract e.g. "D-13" or "D-04" or "D-26"
    const match = diagramCodeWithTitle.match(/D-\d+/);
    if (match) {
      const code = match[0];
      // Convert e.g. "D-13" to match diagram ID
      // Let's set viewMode to diagrams
      setViewMode("diagrams");
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* =====================================================================
          TOP HEADER HERO BANNER
          ===================================================================== */}
      <div className="relative rounded-3xl p-6 md:p-8 liquid-glass-bento overflow-hidden border border-white/10 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" />
                IB Economics SL Exam Blueprint
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/5 text-slate-400 text-xs font-mono">
                First Assessment 2022+ Syllabus
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Exam Structure Mastery & Command Terms
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-3xl mt-1 leading-relaxed">
              Tactical structural blueprints for every mark tier (15, 10, 8, 6, 4,
              and 2 marks), official Assessment Objectives (AO1, AO2, AO3) marking
              rubrics, annotated Band 4 model answers, and the complete Command Terms
              Lexicon.
            </p>
          </div>

          {/* Quick Sub-Navigation Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900/80 border border-white/10 self-stretch md:self-auto overflow-x-auto">
            <button
              onClick={() => setActiveSubTab("structures")}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeSubTab === "structures"
                  ? "bg-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Question Structures</span>
            </button>
            <button
              onClick={() => setActiveSubTab("command-terms")}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeSubTab === "command-terms"
                  ? "bg-sky-500 text-slate-950 shadow-[0_0_15px_rgba(56,189,248,0.5)]"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Command Terms ({COMMAND_TERMS.length})</span>
            </button>
            <button
              onClick={() => setActiveSubTab("cheatsheet")}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeSubTab === "cheatsheet"
                  ? "bg-purple-500 text-slate-950 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Formula Cheatsheet</span>
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          VIEW 1: QUESTION STRUCTURE BLUEPRINTS (15, 10, 8, 6, 4, 2 MARKS)
          ===================================================================== */}
      {activeSubTab === "structures" && (
        <div className="space-y-6">
          {/* Mark Selector Bar */}
          <div className="liquid-glass-bento rounded-2xl p-2.5 border border-white/10 flex items-center gap-2 overflow-x-auto">
            <span className="text-[11px] font-mono text-slate-400 px-3 uppercase tracking-wider hidden sm:inline">
              Mark Allocation:
            </span>
            {([15, 10, 8, 6, 4, 2] as (15 | 10 | 8 | 6 | 4 | 2)[]).map((m) => {
              const isSelected = selectedMark === m;
              return (
                <button
                  key={m}
                  onClick={() => setSelectedMark(m)}
                  className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                    isSelected
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.5)] scale-[1.02]"
                      : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className="text-sm font-extrabold">{m} MARKS</span>
                  <span
                    className={`text-[10px] font-normal ${
                      isSelected ? "text-slate-900" : "text-slate-400"
                    }`}
                  >
                    {m === 15
                      ? "Paper 1b / P2"
                      : m === 10
                      ? "Paper 1a"
                      : m === 8
                      ? "Paper 2 Comp"
                      : m === 6
                      ? "Paper 2 Diag"
                      : m === 4
                      ? "Paper 2 Factors"
                      : "Paper 2 Def"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Structure Blueprint Header Details */}
          <div className="liquid-glass-bento rounded-3xl p-6 border border-white/10 space-y-6 shadow-xl">
            {/* Header info */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold">
                    {activeStructure.mark} MARKS TOTAL
                  </span>
                  <span className="px-3 py-1 rounded-full bg-sky-500/20 border border-sky-500/30 text-sky-300 font-mono text-xs">
                    {activeStructure.paperContext}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-mono text-xs flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Target Time: {activeStructure.targetTimeMinutes}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                  {activeStructure.title}
                </h2>
                <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-4xl leading-relaxed">
                  {activeStructure.overview}
                </p>
              </div>

              {/* Core Framework Acronym Box */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-amber-500/20 lg:min-w-[280px]">
                <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 mb-0.5">
                  Core Framework
                </div>
                <div className="text-base font-extrabold text-white">
                  {activeStructure.coreFrameworkName}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                  {activeStructure.coreFrameworkSubtitle}
                </div>
              </div>
            </div>

            {/* Assessment Objectives Distribution Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                <span className="font-bold uppercase tracking-wider text-slate-400">
                  Assessment Objective (AO) Weighting Breakdown:
                </span>
                <span className="text-slate-400 text-[11px]">
                  {activeStructure.mark === 10
                    ? "Notice: 0% AO3 (Do NOT evaluate in Part a!)"
                    : activeStructure.mark === 15
                    ? "Notice: AO3 Evaluation is 45% of marks!"
                    : "Strictly Criterion-Based"}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {activeStructure.assessmentObjectives.map((aoItem) => (
                  <div
                    key={aoItem.ao}
                    className={`p-3 rounded-xl border flex items-center justify-between ${
                      aoItem.ao === "AO1"
                        ? "bg-emerald-950/30 border-emerald-500/30 text-emerald-200"
                        : aoItem.ao === "AO2"
                        ? "bg-sky-950/30 border-sky-500/30 text-sky-200"
                        : "bg-amber-950/30 border-amber-500/30 text-amber-200"
                    }`}
                  >
                    <div>
                      <span className="font-mono font-bold text-xs mr-2">
                        {aoItem.ao}
                      </span>
                      <span className="text-xs">{aoItem.label}</span>
                    </div>
                    <span className="font-mono font-extrabold text-sm">
                      {aoItem.percentage}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step-by-Step Writing Blueprint */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono">
                  Step-by-Step Response Blueprint ({activeStructure.structureSteps.length} Phases)
                </h3>
              </div>

              <div className="space-y-3">
                {activeStructure.structureSteps.map((step) => (
                  <div
                    key={step.stepNumber}
                    className="p-4 md:p-5 rounded-2xl bg-slate-950/60 border border-white/10 hover:border-amber-500/30 transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2.5">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 font-mono font-extrabold text-xs sm:text-sm flex items-center justify-center border border-amber-500/30">
                          {step.stepNumber}
                        </span>
                        <h4 className="text-base sm:text-lg font-bold text-white">
                          {step.title}
                        </h4>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-white/5 text-amber-300 font-mono text-xs font-bold self-start sm:self-auto">
                        {step.marksTargeted}
                      </span>
                    </div>

                    <p className="text-sm text-slate-300 font-medium italic">
                      🎯 Purpose: {step.purpose}
                    </p>

                    <div className="space-y-2 pl-3 border-l-2 border-amber-500/30">
                      {step.detailedInstructions.map((instruction, idx) => (
                        <div
                          key={idx}
                          className="text-sm sm:text-[15.5px] text-slate-200 flex items-start gap-2.5 leading-relaxed"
                        >
                          <span className="text-amber-400 font-bold mt-0.5">•</span>
                          <span>{instruction}</span>
                        </div>
                      ))}
                    </div>

                    {/* Writing Template & Sentence Starters */}
                    <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1 font-bold">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          Sentence Starter / Phrasing Template:
                        </span>
                        <button
                          onClick={() =>
                            handleCopy(
                              step.writingTemplate,
                              `step-${step.stepNumber}`
                            )
                          }
                          className="text-xs font-mono text-amber-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          {copiedId === `step-${step.stepNumber}` ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              Copy Template
                            </>
                          )}
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm font-mono text-slate-200 bg-black/30 p-3 rounded-lg border border-white/5 select-all leading-relaxed">
                        {step.writingTemplate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Annotated Model Answer (Band 4 / Full Marks) */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono">
                    Annotated Band 4 Model Response ({activeStructure.mark} Marks)
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  {activeStructure.annotatedModelAnswer.diagramToDraw !== "None" && (
                    <button
                      onClick={() =>
                        handleOpenDiagram(
                          activeStructure.annotatedModelAnswer.diagramToDraw
                        )
                      }
                      className="px-3 py-1.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30 text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>{activeStructure.annotatedModelAnswer.diagramToDraw}</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                  <button
                    onClick={() => {
                      const fullText = activeStructure.annotatedModelAnswer.sections
                        .map((s) => `${s.heading}\n${s.text}`)
                        .join("\n\n");
                      handleCopy(fullText, "model-answer");
                    }}
                    className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedId === "model-answer" ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied Essay!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Model Answer</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Prompt Callout Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2">
                <span className="text-xs font-mono text-amber-300 font-bold uppercase tracking-wider block">
                  Sample IB Official Exam Prompt:
                </span>
                <p className="text-base sm:text-lg font-bold text-white leading-snug">
                  "{activeStructure.annotatedModelAnswer.prompt}"
                </p>
                <p className="text-xs sm:text-sm text-slate-300">
                  Context: {activeStructure.annotatedModelAnswer.contextAndSetup}
                </p>
              </div>

              {/* Response Sections with Color-Coded AO Annotations */}
              <div className="space-y-4">
                {activeStructure.annotatedModelAnswer.sections.map((sec, idx) => (
                  <div
                    key={idx}
                    className="p-5 sm:p-6 rounded-2xl bg-slate-950/70 border border-white/10 space-y-3 shadow-lg"
                  >
                    <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                      <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider font-mono">
                        {sec.heading}
                      </h4>
                      <span
                        className={`px-3 py-1 rounded-full font-mono text-xs font-bold ${
                          sec.aoType === "AO1"
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            : sec.aoType === "AO2"
                            ? "bg-sky-500/20 text-sky-300 border border-sky-500/30"
                            : sec.aoType === "AO3"
                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                            : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                        }`}
                      >
                        {sec.aoType}
                      </span>
                    </div>

                    <p className="text-[16px] sm:text-[17.5px] text-slate-100 leading-relaxed font-normal">
                      {sec.text}
                    </p>

                    {/* Examiner Annotation Pill */}
                    <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs sm:text-sm font-mono text-slate-200 leading-relaxed">
                      {sec.commentary}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scoring Rubrics & Band Descriptors */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono">
                  Official Examiner Band Descriptors ({activeStructure.mark} Marks)
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {activeStructure.bandDescriptors.map((band) => (
                  <div
                    key={band.band}
                    className={`p-4 rounded-2xl border flex flex-col justify-between ${
                      band.band.includes("4") || band.band.includes("Full")
                        ? "bg-emerald-950/20 border-emerald-500/30"
                        : band.band.includes("3") || band.band.includes("Partial")
                        ? "bg-sky-950/20 border-sky-500/30"
                        : band.band.includes("2")
                        ? "bg-amber-950/20 border-amber-500/30"
                        : "bg-rose-950/20 border-rose-500/30"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-xs font-bold text-white">
                          {band.band}
                        </span>
                        <span className="font-mono text-xs font-bold text-amber-300">
                          {band.markRange}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
                        {band.descriptor}
                      </p>
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 pt-2 border-t border-white/5">
                      💡 {band.examinerCommentary}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Traps vs Golden Rules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
              {/* Common Examiner Traps */}
              <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2.5">
                <div className="flex items-center gap-2 text-rose-300 font-mono text-xs font-bold uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Fatal Examiner Traps (Why Students Lose Marks)</span>
                </div>
                <ul className="space-y-1.5">
                  {activeStructure.examinerTraps.map((trap, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-rose-200/90 flex items-start gap-2 leading-relaxed"
                    >
                      <span className="text-rose-400 font-bold mt-0.5">✕</span>
                      <span>{trap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Golden Exam Rules */}
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2.5">
                <div className="flex items-center gap-2 text-emerald-300 font-mono text-xs font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Golden Exam Rules for Maximum Marks</span>
                </div>
                <ul className="space-y-1.5">
                  {activeStructure.goldenRules.map((rule, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-emerald-200/90 flex items-start gap-2 leading-relaxed"
                    >
                      <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          VIEW 2: COMMAND TERMS VAULT (AO1, AO2, AO3 EXPLAINED)
          ===================================================================== */}
      {activeSubTab === "command-terms" && (
        <div className="space-y-6">
          {/* Filter and Search Bar */}
          <div className="liquid-glass-bento rounded-2xl p-4 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={commandTermSearch}
                onChange={(e) => setCommandTermSearch(e.target.value)}
                placeholder="Search command terms (e.g. evaluate, analyse)..."
                className="w-full bg-slate-950/80 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
              />
              {commandTermSearch && (
                <button
                  onClick={() => setCommandTermSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-mono"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Assessment Objective Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
              {(
                [
                  { id: "all", label: "All Terms (13)" },
                  { id: "AO3", label: "AO3: Evaluation (5)" },
                  { id: "AO2", label: "AO2: Analysis (5)" },
                  { id: "AO1", label: "AO1: Knowledge (3)" },
                ] as { id: AssessmentObjective | "all"; label: string }[]
              ).map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedAoFilter(f.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                    selectedAoFilter === f.id
                      ? f.id === "AO3"
                        ? "bg-amber-500 text-slate-950 shadow-md"
                        : f.id === "AO2"
                        ? "bg-sky-500 text-slate-950 shadow-md"
                        : f.id === "AO1"
                        ? "bg-emerald-500 text-slate-950 shadow-md"
                        : "bg-white text-slate-950"
                      : "bg-white/5 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Command Term Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCommandTerms.map((ct) => (
              <div
                key={ct.id}
                className="bg-slate-950/75 rounded-3xl p-6 border border-white/10 hover:border-sky-400/30 hover:bg-slate-900/80 transition-all flex flex-col justify-between space-y-4 shadow-lg group"
              >
                <div className="space-y-3">
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                            ct.ao === "AO3"
                              ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                              : ct.ao === "AO2"
                              ? "bg-sky-500/20 text-sky-300 border border-sky-500/30"
                              : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          }`}
                        >
                          {ct.aoName}
                        </span>
                        <div className="flex items-center gap-1">
                          {ct.typicalMarks.map((m) => (
                            <span
                              key={m}
                              className="px-2 py-0.5 rounded-full bg-white/5 text-slate-300 text-[10px] font-mono"
                            >
                              {m} Marks
                            </span>
                          ))}
                        </div>
                      </div>
                      <h3 className="text-xl font-extrabold text-white tracking-tight group-hover:text-amber-300 transition-colors">
                        "{ct.term}"
                      </h3>
                    </div>
                  </div>

                  {/* Official IB Subject Guide Definition */}
                  <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-white/10">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1 font-bold">
                      Official IB Definition:
                    </span>
                    <p className="text-sm sm:text-base text-slate-100 italic leading-relaxed">
                      "{ct.officialIBDefinition}"
                    </p>
                  </div>

                  {/* What Examiners Expect You to Do */}
                  <div className="space-y-1.5">
                    <span className="text-xs sm:text-sm font-mono text-amber-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4" />
                      What Examiners Expect You to Do:
                    </span>
                    <p className="text-sm sm:text-[15.5px] text-slate-200 leading-relaxed font-normal">
                      {ct.whatExaminersExpect}
                    </p>
                  </div>

                  {/* Sample Exam Prompt */}
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <span className="text-xs font-mono text-sky-400 uppercase tracking-wider block font-bold">
                      Sample Question Prompt:
                    </span>
                    <p className="text-sm sm:text-base font-semibold text-white leading-snug">
                      "{ct.samplePrompt}"
                    </p>
                  </div>

                  {/* Tactical Strategy Blueprint */}
                  <div className="space-y-2 pt-1">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block font-bold">
                      Tactical Strategy Blueprint:
                    </span>
                    <div className="space-y-1.5 pl-3 border-l-2 border-white/10">
                      {ct.strategyBlueprint.map((step, idx) => (
                        <div
                          key={idx}
                          className="text-xs sm:text-sm text-slate-200 leading-relaxed"
                        >
                          <span className="text-amber-400 font-bold mr-1.5">
                            {idx + 1}.
                          </span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Common Trap */}
                  <div className="p-3 rounded-xl bg-rose-950/25 border border-rose-500/25 text-xs sm:text-sm text-rose-200 leading-relaxed flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-rose-100 font-bold">Common Mistake:</strong>{" "}
                      {ct.commonMistakes}
                    </span>
                  </div>
                </div>

                {/* High-Yield Phrasing Starters with Copy */}
                <div className="pt-3 border-t border-white/10 space-y-2">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block font-bold">
                    High-Yield Starter Phrases:
                  </span>
                  <div className="space-y-1.5">
                    {ct.highYieldPhrases.slice(0, 2).map((phrase, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-black/30 border border-white/5 text-xs sm:text-sm text-slate-200 font-mono"
                      >
                        <span className="truncate pr-2">{phrase}</span>
                        <button
                          onClick={() => handleCopy(phrase, `${ct.id}-p-${idx}`)}
                          className="text-slate-400 hover:text-white shrink-0 cursor-pointer"
                          title="Copy phrasing"
                        >
                          {copiedId === `${ct.id}-p-${idx}` ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          VIEW 3: EXAMINER RUBRICS & FORMULA CHEATSHEET
          ===================================================================== */}
      {activeSubTab === "cheatsheet" && (
        <div className="space-y-6">
          {/* Summary Matrix Table for All Question Tiers */}
          <div className="liquid-glass-bento rounded-3xl p-6 border border-white/10 space-y-4 shadow-xl overflow-x-auto">
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              Complete Mark Scheme & Structure Comparison Matrix
            </h3>
            <p className="text-xs text-slate-300">
              Quick side-by-side reference across timing, paper location, required
              skills, diagram rules, and evaluation criteria.
            </p>

            <table className="w-full text-left text-xs font-mono border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-white/15 text-slate-400 uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-3">Mark</th>
                  <th className="py-3 px-3">Paper & Context</th>
                  <th className="py-3 px-3">Target Time</th>
                  <th className="py-3 px-3">Primary AOs</th>
                  <th className="py-3 px-3">Diagram Required?</th>
                  <th className="py-3 px-3">Evaluation (AO3)?</th>
                  <th className="py-3 px-3">Core Strategy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-200">
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-3 font-extrabold text-amber-400 text-sm">
                    15M
                  </td>
                  <td className="py-3 px-3">Paper 1b & Paper 2 Final</td>
                  <td className="py-3 px-3 text-emerald-400 font-bold">
                    32–35 min
                  </td>
                  <td className="py-3 px-3">AO1 (20%), AO2 (35%), AO3 (45%)</td>
                  <td className="py-3 px-3 text-emerald-300">
                    Mandatory (1–2 diagrams)
                  </td>
                  <td className="py-3 px-3 text-emerald-300 font-bold">
                    Crucial (45% of marks)
                  </td>
                  <td className="py-3 px-3 text-amber-300">CLASPP / SLAP</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-3 font-extrabold text-sky-400 text-sm">
                    10M
                  </td>
                  <td className="py-3 px-3">Paper 1a</td>
                  <td className="py-3 px-3 text-emerald-400 font-bold">
                    15–18 min
                  </td>
                  <td className="py-3 px-3">AO1 (35%), AO2 (65%), AO3 (0%)</td>
                  <td className="py-3 px-3 text-emerald-300">
                    Mandatory (1 diagram)
                  </td>
                  <td className="py-3 px-3 text-rose-400 font-bold">
                    FORBIDDEN (0 marks)
                  </td>
                  <td className="py-3 px-3 text-sky-300">DEED Framework</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-3 font-extrabold text-purple-400 text-sm">
                    8M
                  </td>
                  <td className="py-3 px-3">Paper 2 Comparative</td>
                  <td className="py-3 px-3 text-emerald-400 font-bold">
                    12–14 min
                  </td>
                  <td className="py-3 px-3">AO1 (25%), AO2 (75%)</td>
                  <td className="py-3 px-3 text-slate-300">If prompted</td>
                  <td className="py-3 px-3 text-slate-400">
                    Comparative synthesis
                  </td>
                  <td className="py-3 px-3 text-purple-300">
                    Compare & Contrast
                  </td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-3 font-extrabold text-cyan-400 text-sm">
                    6M
                  </td>
                  <td className="py-3 px-3">Paper 2 Analytical</td>
                  <td className="py-3 px-3 text-emerald-400 font-bold">
                    8–10 min
                  </td>
                  <td className="py-3 px-3">AO1 (40%), AO2 (60%)</td>
                  <td className="py-3 px-3 text-emerald-300 font-bold">
                    Mandatory (2 marks)
                  </td>
                  <td className="py-3 px-3 text-rose-400">None</td>
                  <td className="py-3 px-3 text-cyan-300">The 3-Part Rule</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-3 font-extrabold text-teal-400 text-sm">
                    4M
                  </td>
                  <td className="py-3 px-3">Paper 2 Structured</td>
                  <td className="py-3 px-3 text-emerald-400 font-bold">
                    5–6 min
                  </td>
                  <td className="py-3 px-3">AO1 (50%), AO2 (50%)</td>
                  <td className="py-3 px-3 text-slate-400">Rarely</td>
                  <td className="py-3 px-3 text-rose-400">None</td>
                  <td className="py-3 px-3 text-teal-300">The 2 × 2 Formula</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-3 font-extrabold text-emerald-400 text-sm">
                    2M
                  </td>
                  <td className="py-3 px-3">Paper 2 Definitions</td>
                  <td className="py-3 px-3 text-emerald-400 font-bold">
                    2–3 min
                  </td>
                  <td className="py-3 px-3">AO1 (100%)</td>
                  <td className="py-3 px-3 text-slate-400">None</td>
                  <td className="py-3 px-3 text-rose-400">None</td>
                  <td className="py-3 px-3 text-emerald-300">
                    Two-Point Criteria
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Deep-Dive Structural Framework Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* CLASPP Framework Card */}
            <div className="liquid-glass-bento rounded-3xl p-6 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/30">
                  15-Mark Essay Weapon
                </span>
                <span className="text-xs font-mono text-slate-400">
                  AO3 Evaluation
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-white">
                The CLASPP / SLAP Evaluation Framework
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Use these 5 criteria to construct nuanced evaluation instead of
                writing a superficial list of pros and cons:
              </p>
              <div className="space-y-2 pt-1 font-mono text-xs">
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                  <strong className="text-amber-400">S - Stakeholders:</strong>{" "}
                  Who wins and who loses? Consumers (regressivity/equity),
                  Producers (profit margins/reformulation), Government (budgetary
                  cost vs tax revenue), Third parties/Society (externalities).
                </div>
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                  <strong className="text-amber-400">L - Long-Run vs Short-Run:</strong>{" "}
                  Immediate adjustment shocks and inflationary spikes versus
                  long-term structural substitution, innovation, and behavioral
                  permanence.
                </div>
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                  <strong className="text-amber-400">A - Assumptions & Limitations:</strong>{" "}
                  Challenge ceteris paribus; test sensitivity to Price Elasticity
                  (PED/PES magnitudes); identify information deficits and risk of
                  government failure.
                </div>
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                  <strong className="text-amber-400">P - Priorities & Magnitude:</strong>{" "}
                  How large is the policy intervention? Does macroeconomic price
                  stability take priority over short-term employment in the current
                  cycle?
                </div>
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                  <strong className="text-amber-400">P - Probable Conditions:</strong>{" "}
                  State the exact conditions under which the policy succeeds (e.g.
                  when combined with hypothecated subsidies and education).
                </div>
              </div>
            </div>

            {/* DEED Framework Card */}
            <div className="liquid-glass-bento rounded-3xl p-6 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 font-mono text-xs font-bold border border-sky-500/30">
                  10-Mark Analysis Weapon
                </span>
                <span className="text-xs font-mono text-slate-400">
                  AO1 & AO2 Only
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-white">
                The DEED Analytical Framework
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Follow this exact sequence to secure a flawless 10/10 without
                wasting time on unrewarded evaluation:
              </p>
              <div className="space-y-2 pt-1 font-mono text-xs">
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                  <strong className="text-sky-400">D - Definitions (AO1):</strong>{" "}
                  Define 2 key terms with textbook precision and include syllabus
                  mathematical formulas where applicable.
                </div>
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                  <strong className="text-sky-400">E - Explanation (AO2):</strong>{" "}
                  Walk through the step-by-step causal chain. Detail the initial
                  disequilibrium (shortage or surplus at P1) and the price adjustment
                  rationing mechanism to P2.
                </div>
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                  <strong className="text-sky-400">E - Example (AO2):</strong>{" "}
                  Cite an authentic real-world case study with a specific country,
                  timeframe, and empirical statistics from your Case Studies Bank.
                </div>
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                  <strong className="text-sky-400">D - Diagram (AO1 + AO2):</strong>{" "}
                  Draw a fully labeled diagram with explicit curve names,
                  equilibrium projections (P1, Q1, P2, Q2), and directional shift
                  arrows. Mention all coordinates in your text!
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
