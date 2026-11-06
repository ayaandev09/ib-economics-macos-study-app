"use client";

import React, { useState, useEffect } from "react";
import { TopicData } from "@/data";
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  X,
  CheckCircle2,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Award,
  Scale,
} from "lucide-react";

interface TimedExamSprintModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic: TopicData;
}

type SprintDuration = 15 | 30 | 45;

export function TimedExamSprintModal({
  isOpen,
  onClose,
  topic,
}: TimedExamSprintModalProps) {
  const [durationMinutes, setDurationMinutes] = useState<SprintDuration>(15);
  const [secondsRemaining, setSecondsRemaining] = useState(15 * 60);
  const [isRunning, setIsRunning] = useState(true);
  const [showHints, setShowHints] = useState(false);
  const [isSelfGrading, setIsSelfGrading] = useState(false);
  const [essayContent, setEssayContent] = useState("");
  const [copied, setCopied] = useState(false);

  const [rubricScores, setRubricScores] = useState({
    definitions: false,
    diagramMechanics: false,
    realWorldCase: false,
    stakeholderAnalysis: false,
    policyEvaluation: false,
  });

  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem(`exam_sprint_econ_${topic.id}`);
      if (saved) setEssayContent(saved);
      setSecondsRemaining(durationMinutes * 60);
      setIsRunning(true);
      setIsSelfGrading(false);
    }
  }, [isOpen, topic.id, durationMinutes]);

  useEffect(() => {
    if (isOpen && essayContent) {
      localStorage.setItem(`exam_sprint_econ_${topic.id}`, essayContent);
    }
  }, [isOpen, essayContent, topic.id]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isOpen && isRunning && secondsRemaining > 0 && !isSelfGrading) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsSelfGrading(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isOpen, isRunning, secondsRemaining, isSelfGrading]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const isUrgent = secondsRemaining > 0 && secondsRemaining <= 180;

  const words = essayContent.trim() ? essayContent.trim().split(/\s+/).length : 0;
  const estimatedReadTime = Math.ceil(words / 200);

  const promptText =
    topic.examBlueprint?.paper1EssayPrompt ||
    `Evaluate the effectiveness of government intervention policies in resolving the economic challenges identified in ${topic.displayCode} (${topic.title}). [15 Marks]`;

  const toggleRubric = (key: keyof typeof rubricScores) => {
    setRubricScores((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const scoreCount = Object.values(rubricScores).filter(Boolean).length;
  const estimatedLevel =
    scoreCount === 5 ? "Level 7 (13-15 / 15)" :
    scoreCount === 4 ? "Level 6 (11-12 / 15)" :
    scoreCount === 3 ? "Level 5 (9-10 / 15)" :
    scoreCount >= 1 ? "Level 4 (6-8 / 15)" : "Drafting in Progress";

  const handleCopy = () => {
    const fullSummary = `=== IB ECONOMICS SL EXAM SPRINT: ${topic.displayCode} ===\nPrompt: ${promptText}\nWords: ${words} | Time Duration: ${durationMinutes} mins\nEstimated Score: ${estimatedLevel}\n\n${essayContent}`;
    navigator.clipboard.writeText(fullSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-2xl overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl liquid-glass-bento rounded-3xl p-6 sm:p-8 border border-teal-500/35 bg-slate-950/90 shadow-2xl flex flex-col gap-6 max-h-[92vh] overflow-hidden my-auto">
        {/* Top Sprint HUD Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-2xl bg-teal-500/20 text-teal-300 border border-teal-400/35 shadow-sm">
              <Timer className="w-5 h-5 animate-pulse" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold tracking-widest text-teal-400 uppercase">
                  Timed Exam Sprint
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-slate-300 border border-white/15">
                  {topic.displayCode} · {topic.title}
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
                Simulated 15-Mark Policy Essay Drill
              </h2>
            </div>
          </div>

          {/* Time Countdown Pill & Controls */}
          <div className="flex items-center gap-2.5">
            <div className="hidden sm:flex items-center gap-1 p-1 rounded-full bg-black/50 border border-white/12 text-xs">
              {([15, 30, 45] as SprintDuration[]).map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setDurationMinutes(m);
                    setSecondsRemaining(m * 60);
                  }}
                  className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                    durationMinutes === m
                      ? "bg-teal-500/25 text-teal-200 border border-teal-400/40"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {m}m
                </button>
              ))}
            </div>

            <div
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-2xl font-mono text-sm font-bold border transition-all ${
                isUrgent
                  ? "bg-rose-500/20 text-rose-300 border-rose-400/50 animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.35)]"
                  : "bg-black/60 text-teal-300 border-teal-400/30"
              }`}
            >
              <span>{formattedTime}</span>
              <button
                onClick={() => setIsRunning(!isRunning)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title={isRunning ? "Pause Countdown" : "Resume Countdown"}
              >
                {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
              <button
                onClick={() => {
                  setSecondsRemaining(durationMinutes * 60);
                  setIsRunning(false);
                }}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Reset Timer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
              title="Exit Sprint (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4 custom-scrollbar">
          {/* Prompt Banner */}
          <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-400/25 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-300 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" />
                Paper 1 Part (b) Essay Prompt (15 Marks)
              </span>
              <button
                onClick={() => setShowHints(!showHints)}
                className="text-[10px] font-mono text-teal-300/80 hover:text-teal-200 flex items-center gap-1 cursor-pointer"
              >
                <span>{showHints ? "Hide Examiner Hints" : "Show Examiner Hints"}</span>
                {showHints ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            </div>

            <p className="text-xs sm:text-sm font-semibold text-slate-100 leading-relaxed font-sans">
              &ldquo;{promptText}&rdquo;
            </p>

            {showHints && (
              <div className="pt-2 border-t border-teal-400/20 text-xs text-slate-300 space-y-1.5 animate-in fade-in duration-150">
                <span className="font-mono text-[10px] uppercase font-bold text-teal-300 block">
                  DEEED + SLAP Evaluation Rubric:
                </span>
                <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-300/90 leading-relaxed">
                  <li><strong>D (Define):</strong> Define all economic terms in question (AO1).</li>
                  <li><strong>E (Explain):</strong> Clarify incentive transmission mechanisms step-by-step.</li>
                  <li><strong>E (Exemplify):</strong> Provide specific country contexts and dates (e.g. EU, US, UK).</li>
                  <li><strong>D (Diagram):</strong> Describe the axes, shifts ($S_1 \to S_2$), and deadweight loss.</li>
                  <li><strong>D (Discuss):</strong> Evaluate using SLAP (Stakeholders, Long/Short term, Assumptions, Priorities).</li>
                </ul>
              </div>
            )}
          </div>

          {/* Self-Grading vs Writing Mode */}
          {isSelfGrading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-slate-300 uppercase">
                    Your Response ({words} words)
                  </span>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-xs font-mono text-teal-300 hover:text-white cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied" : "Copy Response"}</span>
                  </button>
                </div>
                <div className="p-4 rounded-2xl bg-black/50 border border-white/10 text-xs text-slate-200 leading-relaxed max-h-[360px] overflow-y-auto whitespace-pre-wrap font-sans">
                  {essayContent || "(No response entered.)"}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-teal-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-teal-300 font-bold font-mono text-xs">
                    <Award className="w-4 h-4" />
                    <span>15-Mark Examiner Rubric Checklist</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-teal-400/15 text-teal-300 border border-teal-400/30">
                    {estimatedLevel}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  {[
                    { key: "definitions", label: "Accurate definitions of key economic concepts in opening paragraph (AO1)" },
                    { key: "diagramMechanics", label: "Step-by-step description of diagram shifts, axes, and deadweight loss (AO2)" },
                    { key: "realWorldCase", label: "Integrated real-world economic anchor (e.g. US tariff, UK carbon tax) (AO2)" },
                    { key: "stakeholderAnalysis", label: "Thorough analysis of impacts on Consumers, Producers, and Government (AO3)" },
                    { key: "policyEvaluation", label: "SLAP synthesis: short vs long-run trade-offs and priority recommendations (AO4)" },
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => toggleRubric(item.key as keyof typeof rubricScores)}
                      className={`w-full p-2.5 rounded-xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                        rubricScores[item.key as keyof typeof rubricScores]
                          ? "bg-emerald-950/30 border-emerald-400/40 text-emerald-200"
                          : "bg-black/30 border-white/10 text-slate-300 hover:border-teal-400/30"
                      }`}
                    >
                      <CheckCircle2
                        className={`w-4 h-4 mt-0.5 shrink-0 ${
                          rubricScores[item.key as keyof typeof rubricScores]
                            ? "text-emerald-400"
                            : "text-slate-600"
                        }`}
                      />
                      <span className="leading-snug">{item.label}</span>
                    </button>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setIsSelfGrading(false)}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-mono text-slate-400 hover:text-white cursor-pointer"
                  >
                    ← Resume Editing
                  </button>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-teal-500/20 text-teal-200 border border-teal-400/40 hover:bg-teal-500/30 transition-all cursor-pointer"
                  >
                    Finish &amp; Close
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="text-white font-bold">{words}</span> words •{" "}
                  <span className="text-slate-400">~{estimatedReadTime} min read</span>
                </span>
                <span className="text-[11px] text-teal-400/70">
                  Auto-saved to local memory
                </span>
              </div>

              <textarea
                value={essayContent}
                onChange={(e) => setEssayContent(e.target.value)}
                placeholder="Begin drafting your 15-mark policy evaluation essay here under timed conditions..."
                rows={14}
                autoFocus
                className="w-full rounded-2xl bg-black/55 border border-white/15 p-4 sm:p-5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-teal-400/50 resize-none font-sans leading-relaxed tracking-wide shadow-inner"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        {!isSelfGrading && (
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/10 shrink-0">
            <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
              Tip: Explicitly analyze whether demand is price-elastic or price-inelastic.
            </span>
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={() => setIsSelfGrading(true)}
                className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-teal-500/20 text-teal-200 border border-teal-400/40 hover:bg-teal-500/30 transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-300" />
                <span>Finish &amp; Self-Grade</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
