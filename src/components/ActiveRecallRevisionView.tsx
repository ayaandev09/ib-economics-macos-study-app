"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GLOSSARY_TERMS,
  FORMULA_BANK,
  THEORISTS_DOSSIER,
  KEY_CONCEPTS,
  DIAGRAMS_DOSSIER,
  HIGH_YIELD_EXAM_QUESTIONS,
  GlossaryTerm,
  FormulaItem,
  TheoristSchool,
  DiagramDossier,
  UnitId,
} from "@/data";
import { useStudyStore, FlashcardDeckType } from "@/store/useStudyStore";
import { MathFormula } from "./MathFormula";
import { InteractiveDiagram } from "./InteractiveDiagram";
import {
  Brain,
  Sparkles,
  RotateCw,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  RotateCcw,
  BookOpen,
  Calculator,
  Layers,
  GraduationCap,
  Zap,
  Filter,
  Eye,
  FileText,
  Compass,
} from "lucide-react";

interface FlashcardItem {
  id: string;
  deck: FlashcardDeckType;
  title: string;
  badge: string;
  badgeColor: string;
  frontPrompt: string;
  frontSubtext?: string;
  backContent: React.ReactNode;
  unit: string;
  diagramRef?: string;
}

export const ActiveRecallRevisionView: React.FC = () => {
  const {
    activeFlashcardDeck,
    setActiveFlashcardDeck,
    masteredFlashcards,
    toggleFlashcardMastered,
    resetFlashcardProgress,
  } = useStudyStore();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [unitFilter, setUnitFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"card" | "sheet">("card");
  const [shuffledSeed, setShuffledSeed] = useState<number>(0);

  // Compile deck items based on active deck
  const rawDeckItems: FlashcardItem[] = useMemo(() => {
    switch (activeFlashcardDeck) {
      case "diagrams":
        return DIAGRAMS_DOSSIER.map((d) => ({
          id: `fc-diag-${d.id}`,
          deck: "diagrams" as FlashcardDeckType,
          title: d.title,
          badge: d.code,
          badgeColor: "bg-sky-500/20 text-sky-300 border-sky-500/30",
          frontPrompt: `Draw and explain the ${d.title}. What are the axes labels, initial curves, and key welfare areas?`,
          frontSubtext: `Category: ${d.category} | Y-axis: ${d.yAxisLabel} | X-axis: ${d.xAxisLabel}`,
          backContent: (
            <div className="space-y-3 text-left">
              <div className="p-3 rounded-xl bg-slate-900 border border-white/10">
                <span className="font-mono text-[10px] uppercase font-bold text-sky-300 block mb-1">
                  Step-by-Step Drawing Guide:
                </span>
                <ol className="text-xs text-slate-200 space-y-1 list-decimal list-inside font-sans">
                  {d.drawingSteps.slice(0, 5).map((step, sIdx) => (
                    <li key={sIdx}>{step.replace(/^\d+\.\s*/, "")}</li>
                  ))}
                </ol>
              </div>
              <div className="p-2.5 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-200">
                <strong className="text-purple-300">Exam Analysis:</strong>{" "}
                {d.examAnalysis}
              </div>
              {d.id && (
                <div className="mt-2">
                  <InteractiveDiagram diagramId={d.id} compact />
                </div>
              )}
            </div>
          ),
          unit: d.unitId,
          diagramRef: d.id,
        }));

      case "formulas":
        return FORMULA_BANK.map((f) => ({
          id: `fc-form-${f.id}`,
          deck: "formulas" as FlashcardDeckType,
          title: f.name,
          badge: f.code,
          badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
          frontPrompt: `State the mathematical formula and benchmark interpretation for: ${f.name}`,
          frontSubtext: `${f.unit} Calculation Toolkit`,
          backContent: (
            <div className="space-y-3 text-left">
              <div className="p-3 rounded-xl bg-slate-900 border border-white/10 text-center">
                <MathFormula math={f.formula} block />
              </div>
              <div className="text-sm text-slate-200 leading-relaxed">
                <strong className="text-emerald-300 font-mono">Benchmarks:</strong>{" "}
                {f.benchmarkGuidance}
              </div>
              <div className="p-3 rounded-xl bg-slate-950/70 border border-white/5 text-sm text-slate-200 leading-relaxed">
                <strong className="text-sky-300 font-mono">Worked Example:</strong>{" "}
                {f.workedExample}
              </div>
            </div>
          ),
          unit: f.unit,
        }));

      case "glossary":
        return GLOSSARY_TERMS.map((g) => ({
          id: `fc-term-${g.term.toLowerCase().replace(/\\s+/g, "-")}`,
          deck: "glossary" as FlashcardDeckType,
          title: g.term,
          badge: g.unit,
          badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
          frontPrompt: `Define the IB syllabus term: "${g.term}"`,
          frontSubtext: `Unit: ${g.unit}`,
          backContent: (
            <div className="space-y-3.5 text-left">
              <div className="p-4 rounded-xl bg-slate-900 border border-white/10 text-sm sm:text-base text-slate-100 leading-relaxed">
                <strong className="text-purple-300 font-mono block mb-1.5 text-xs sm:text-sm uppercase font-bold">
                  Authoritative Definition:
                </strong>
                {g.definition}
              </div>
              <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/20 text-sm text-amber-100 leading-relaxed">
                <strong className="text-amber-300 font-bold">Exam Tip:</strong> {g.examTip}
              </div>
            </div>
          ),
          unit: g.unit,
        }));

      case "concepts":
        return [
          ...KEY_CONCEPTS.map((k) => ({
            id: `fc-concept-${k.id}`,
            deck: "concepts" as FlashcardDeckType,
            title: k.name,
            badge: "Key Concept",
            badgeColor: "bg-sky-500/20 text-sky-300 border-sky-500/30",
            frontPrompt: `Explain the IB Key Concept of "${k.name}". How does it operate as a core economic mechanism?`,
            frontSubtext: "Overarching Syllabus Lens",
            backContent: (
              <div className="space-y-3 text-left">
                <p className="text-xs text-slate-200 leading-relaxed">
                  {k.description}
                </p>
                <div className="p-3 rounded-xl bg-slate-900 border border-white/10 text-xs text-slate-300">
                  <strong className="text-sky-300 font-mono">Core Mechanism:</strong>{" "}
                  {k.coreMechanism}
                </div>
                <div className="p-2.5 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-200">
                  <strong className="text-purple-300">Paper 1/2 Tip:</strong>{" "}
                  {k.examTips}
                </div>
              </div>
            ),
            unit: "All Units",
          })),
          ...THEORISTS_DOSSIER.map((th) => ({
            id: `fc-theorist-${th.id}`,
            deck: "concepts" as FlashcardDeckType,
            title: th.name,
            badge: th.school,
            badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
            frontPrompt: `What is the core economic doctrine and assumption set of ${th.name} (${th.school})?`,
            frontSubtext: `Era: ${th.era}`,
            backContent: (
              <div className="space-y-3 text-left">
                <p className="text-xs text-slate-200 leading-relaxed">
                  {th.coreDoctrine}
                </p>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-slate-300">
                  <strong className="text-amber-300 font-mono">Assumptions:</strong>{" "}
                  {th.keyAssumptions.join(" • ")}
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-200">
                  <strong className="text-emerald-300">Real-World Case:</strong>{" "}
                  {th.realWorldExample}
                </div>
              </div>
            ),
            unit: "Theory",
          })),
        ];

      case "exam-questions":
        return HIGH_YIELD_EXAM_QUESTIONS.map((eq) => ({
          id: `fc-eq-${eq.id}`,
          deck: "exam-questions" as FlashcardDeckType,
          title: eq.commandTerm,
          badge: eq.unit,
          badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/30",
          frontPrompt: eq.question,
          frontSubtext: `Key Concept: ${eq.keyConcept} | ${eq.guidance}`,
          backContent: (
            <div className="space-y-3 text-left">
              <span className="font-mono text-[10px] uppercase font-bold text-rose-300 block">
                Model Answer Structure & Evaluation:
              </span>
              <ul className="text-xs text-slate-200 space-y-1.5 list-disc list-inside">
                {eq.modelAnswerStructure.map((st, sIdx) => (
                  <li key={sIdx}>{st}</li>
                ))}
              </ul>
            </div>
          ),
          unit: eq.unit,
        }));

      default:
        return [];
    }
  }, [activeFlashcardDeck]);

  // Apply unit filter & shuffle
  const filteredCards = useMemo(() => {
    let list = rawDeckItems;
    if (unitFilter !== "all") {
      list = list.filter((c) =>
        c.unit.toLowerCase().includes(unitFilter.toLowerCase())
      );
    }
    if (shuffledSeed > 0) {
      list = [...list].sort(() => Math.sin(shuffledSeed) - 0.5);
    }
    return list;
  }, [rawDeckItems, unitFilter, shuffledSeed]);

  const activeCard = filteredCards[currentIndex] || filteredCards[0];
  const isMastered = activeCard ? !!masteredFlashcards[activeCard.id] : false;

  const masteredCount = useMemo(() => {
    return filteredCards.filter((c) => !!masteredFlashcards[c.id]).length;
  }, [filteredCards, masteredFlashcards]);

  const handleNext = useCallback(() => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, filteredCards.length));
  }, [filteredCards.length]);

  const handlePrev = useCallback(() => {
    setIsFlipped(false);
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, filteredCards.length - 1) : prev - 1
    );
  }, [filteredCards.length]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== "card") return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)
        return;

      if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "1" || e.key.toLowerCase() === "m") {
        e.preventDefault();
        if (activeCard) {
          toggleFlashcardMastered(activeCard.id);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [viewMode, handleNext, handlePrev, activeCard, toggleFlashcardMastered]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="liquid-glass-bento rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs px-2.5 py-1 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5" /> Active Recall Revision Hub
              </span>
              <span className="text-xs font-mono text-slate-400">
                Spaced Repetition & Exam Cram Engine
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Interactive 3D Revision Flashcards
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Master diagrams, formulas, definitions, key concepts, and 15-mark essay
              blueprints using active recall with keyboard shortcuts.
            </p>
          </div>

          {/* Progress Badge */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/10 text-right shrink-0">
            <span className="text-[11px] font-mono text-slate-400 block mb-0.5">
              Deck Mastery Progress
            </span>
            <span className="text-2xl font-mono font-extrabold text-emerald-400">
              {masteredCount} / {filteredCards.length}
            </span>
            <span className="text-[10px] font-mono text-slate-500 block mt-0.5">
              {filteredCards.length > 0
                ? Math.round((masteredCount / filteredCards.length) * 100)
                : 0}
              % Mastered
            </span>
          </div>
        </div>
      </div>

      {/* Deck Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Decks */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
          {(
            [
              { id: "diagrams", label: "Diagrams (29)", icon: Layers },
              { id: "formulas", label: "Formulas (10)", icon: Calculator },
              { id: "glossary", label: "Glossary (180+)", icon: BookOpen },
              { id: "concepts", label: "Concepts & Theorists", icon: Compass },
              { id: "exam-questions", label: "15-Mark Essays", icon: FileText },
            ] as const
          ).map((tab) => {
            const Icon = tab.icon;
            const isActive = activeFlashcardDeck === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveFlashcardDeck(tab.id);
                  setCurrentIndex(0);
                  setIsFlipped(false);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "liquid-glass-pill-active text-white"
                    : "liquid-glass-pill text-slate-300 hover:text-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* View Mode Toggle & Shuffle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShuffledSeed(Date.now())}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
            title="Shuffle Deck"
          >
            <Shuffle className="w-4 h-4" />
          </button>
          <div className="p-1 rounded-xl bg-slate-900 border border-white/10 flex items-center gap-1">
            <button
              onClick={() => setViewMode("card")}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono cursor-pointer transition-all ${
                viewMode === "card"
                  ? "bg-sky-500/30 text-white font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Card Mode
            </button>
            <button
              onClick={() => setViewMode("sheet")}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono cursor-pointer transition-all ${
                viewMode === "sheet"
                  ? "bg-purple-500/30 text-white font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Cram Sheet
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          VIEW MODE 1: INTERACTIVE 3D FLIP CARD
          ===================================================================== */}
      {viewMode === "card" && activeCard && (
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Card Viewport with Hardware-Accelerated 3D Flip */}
          <div
            className="w-full min-h-[380px] cursor-pointer select-none"
            style={{ perspective: "1400px" }}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <AnimatePresence mode="wait" initial={false}>
              {!isFlipped ? (
                <motion.div
                  key={`front-${activeCard.id}`}
                  initial={{ rotateY: -80, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: 80, opacity: 0 }}
                  transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full min-h-[380px] rounded-3xl p-6 sm:p-8 liquid-glass-bento jelly-card-interactive border border-white/15 relative flex flex-col justify-between hover:border-sky-400/50 shadow-2xl"
                >
                  {/* Top Card Badge & Flip Indicator */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-mono text-xs px-2.5 py-1 rounded-xl border font-bold ${activeCard.badgeColor}`}
                      >
                        {activeCard.badge}
                      </span>
                      <span className="font-mono text-xs text-slate-400">
                        Card {currentIndex + 1} of {filteredCards.length}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                      <RotateCw className="w-3.5 h-3.5 animate-spin-slow text-sky-400" />
                      <span>Click / Space to Flip</span>
                    </div>
                  </div>

                  {/* Central Prompt Content */}
                  <div className="my-auto py-4 text-center">
                    <div className="space-y-3">
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                        {activeCard.frontPrompt}
                      </h3>
                      {activeCard.frontSubtext && (
                        <p className="text-xs sm:text-sm text-slate-400 font-mono">
                          {activeCard.frontSubtext}
                        </p>
                      )}
                      <span className="inline-block mt-4 px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-[11px] font-mono text-slate-400">
                        [Press Spacebar to Reveal Answer]
                      </span>
                    </div>
                  </div>

                  {/* Bottom Card Controls */}
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-sky-400" />
                      {activeCard.unit}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFlashcardMastered(activeCard.id);
                      }}
                      className={`px-3 py-1 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                        isMastered
                          ? "bg-emerald-500/25 text-emerald-300 border border-emerald-500/40"
                          : "bg-white/5 text-slate-400 border border-white/10 hover:text-white"
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {isMastered ? "Mastered (Press 1)" : "Mark Mastered (1)"}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={`back-${activeCard.id}`}
                  initial={{ rotateY: -80, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: 80, opacity: 0 }}
                  transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full min-h-[380px] rounded-3xl p-6 sm:p-8 liquid-glass-bento jelly-card-interactive border border-sky-400/40 bg-slate-900/95 relative flex flex-col justify-between shadow-[0_0_35px_-5px_rgba(14,165,233,0.3)]"
                >
                  {/* Top Card Badge & Flip Indicator */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-mono text-xs px-2.5 py-1 rounded-xl border font-bold ${activeCard.badgeColor}`}
                      >
                        {activeCard.badge} Solution
                      </span>
                      <span className="font-mono text-xs text-slate-400">
                        Card {currentIndex + 1} of {filteredCards.length}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
                      <RotateCw className="w-3.5 h-3.5 animate-spin-slow text-sky-400" />
                      <span>Showing Answer (Click to Flip)</span>
                    </div>
                  </div>

                  {/* Central Answer Content */}
                  <div className="my-auto py-4 text-center">
                    {activeCard.backContent}
                  </div>

                  {/* Bottom Card Controls */}
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-sky-400" />
                      {activeCard.unit}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFlashcardMastered(activeCard.id);
                      }}
                      className={`px-3 py-1 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                        isMastered
                          ? "bg-emerald-500/25 text-emerald-300 border border-emerald-500/40"
                          : "bg-white/5 text-slate-400 border border-white/10 hover:text-white"
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {isMastered ? "Mastered (Press 1)" : "Mark Mastered (1)"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Controls Bar */}
          <div className="flex items-center justify-between gap-3 px-2">
            <button
              onClick={handlePrev}
              className="px-4 py-2 rounded-2xl liquid-glass-pill text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <div className="text-xs font-mono text-slate-500 hidden sm:block">
              Shortcuts: [Space] Flip • [← →] Next/Prev • [1] Master
            </div>
            <button
              onClick={handleNext}
              className="px-4 py-2 rounded-2xl liquid-glass-pill text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5 cursor-pointer"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* =====================================================================
          VIEW MODE 2: FULL CRAM SHEET TABLE
          ===================================================================== */}
      {viewMode === "sheet" && (
        <div className="space-y-4">
          <div className="liquid-glass-bento rounded-3xl p-6 border border-white/10">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" /> Complete Rapid Cram Sheet ({filteredCards.length} Cards)
            </h3>
            <div className="space-y-3">
              {filteredCards.map((card, idx) => {
                const isCardMastered = !!masteredFlashcards[card.id];
                return (
                  <div
                    key={card.id}
                    className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-400">
                          #{idx + 1}
                        </span>
                        <span
                          className={`font-mono text-[10px] px-2 py-0.5 rounded-lg border font-bold ${card.badgeColor}`}
                        >
                          {card.badge}
                        </span>
                        <span className="text-xs font-bold text-white">
                          {card.title}
                        </span>
                      </div>
                      <button
                        onClick={() => toggleFlashcardMastered(card.id)}
                        className={`text-xs font-mono px-2 py-0.5 rounded-lg cursor-pointer ${
                          isCardMastered
                            ? "bg-emerald-500/20 text-emerald-300"
                            : "bg-white/5 text-slate-500 hover:text-white"
                        }`}
                      >
                        {isCardMastered ? "✓ Mastered" : "Mark Mastered"}
                      </button>
                    </div>
                    <p className="text-xs text-sky-200/90 font-medium">
                      Q: {card.frontPrompt}
                    </p>
                    <div className="pt-2 border-t border-white/5 text-xs text-slate-300">
                      {card.backContent}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
