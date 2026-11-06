"use client";

import React, { useState, useEffect } from "react";
import {
  ALL_TOPICS,
  SYLLABUS_UNITS,
  DIAGRAMS_DOSSIER,
  CASE_STUDIES_BANK,
  QUESTION_STRUCTURES,
  COMMAND_TERMS,
  GLOSSARY_TERMS,
} from "@/data";
import {
  Sparkles,
  CheckCircle2,
  Cpu,
  Layers,
  Activity,
  Zap,
  ArrowRight,
  ShieldCheck,
  Compass,
  TrendingUp,
  BarChart3,
  Globe2,
  GraduationCap,
  Play,
  Pause,
  Award,
  BookOpen,
  X,
} from "lucide-react";

interface StartupDiagnosticsOverlayProps {
  onComplete?: () => void;
  forceOpen?: boolean;
  onClose?: () => void;
}

interface PhaseContent {
  id: string;
  badge: string;
  title: string;
  unitRef: string;
  accentColor: string;
  glowColor: string;
  icon: React.ReactNode;
  quote: string;
  insight: string;
  telemetry: {
    label: string;
    value: string;
  }[];
  svgType: "ppf" | "micro" | "macro" | "global" | "exam";
}

const PHASES: PhaseContent[] = [
  {
    id: "foundations",
    badge: "PHASE 01 // FOUNDATIONS & KEY CONCEPTS",
    title: "The Fundamental Problem of Scarcity",
    unitRef: "Unit 1: Introduction to Economics",
    accentColor: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.25)",
    icon: <Compass className="w-5 h-5 text-amber-400" />,
    quote: "“Economics is the study of choice under scarcity — every choice bears an opportunity cost.”",
    insight:
      "Because resources (land, labour, capital, enterprise) are strictly finite while human needs and desires are boundless, societies face fundamental trade-offs: what to produce, how to produce, and for whom to produce.",
    telemetry: [
      { label: "9 Key Concepts", value: "Scarcity • Choice • Efficiency • Equity" },
      { label: "PPC Production Curve", value: "Constant vs Increasing Opportunity Cost (D-01)" },
      { label: "Economic Systems", value: "Free Market vs Mixed Planned Systems" },
    ],
    svgType: "ppf",
  },
  {
    id: "micro",
    badge: "PHASE 02 // MICROECONOMIC MECHANICS",
    title: "The Price Mechanism & Market Failure",
    unitRef: "Unit 2: Microeconomics",
    accentColor: "#0ea5e9",
    glowColor: "rgba(14, 165, 233, 0.25)",
    icon: <TrendingUp className="w-5 h-5 text-sky-400" />,
    quote: "“Prices signal scarcity, ration resources, and provide incentives for self-interested allocative efficiency.”",
    insight:
      "Competitive markets achieve equilibrium where Marginal Social Benefit equals Marginal Social Cost. When negative externalities, asymmetric information, or public goods create deadweight loss, intervention restores social surplus.",
    telemetry: [
      { label: "Micro Vector Diagrams", value: "10 Vector Models (D-02 to D-10)" },
      { label: "Elasticities Matrix", value: "PED, XED, YED, PES Formulas Pre-cached" },
      { label: "Market Failure Engines", value: "Pigouvian Taxes, Subsidies & Caps" },
    ],
    svgType: "micro",
  },
  {
    id: "macro",
    badge: "PHASE 03 // MACROECONOMIC STABILITY",
    title: "Aggregate Demand, Growth & The Phillips Curve",
    unitRef: "Unit 3: Macroeconomics",
    accentColor: "#a855f7",
    glowColor: "rgba(168, 85, 247, 0.25)",
    icon: <BarChart3 className="w-5 h-5 text-purple-400" />,
    quote: "“A nation must balance four core goals: sustainable growth, price stability, full employment, and equity.”",
    insight:
      "Through the circular flow of income, Aggregate Demand (C + I + G + (X - M)) interacts with Short-Run and Long-Run Aggregate Supply. Policymakers manage demand-pull inflation, cyclical recessions, and structural transitions.",
    telemetry: [
      { label: "Macro Vector Diagrams", value: "11 Vector Models (D-11 to D-21)" },
      { label: "AD/AS Views", value: "Keynesian vs Monetarist/Neoclassical" },
      { label: "Inflation & CPI Basket", value: "Weighted Laspeyres Price Index Ready" },
    ],
    svgType: "macro",
  },
  {
    id: "global",
    badge: "PHASE 04 // GLOBAL ECONOMY & CASES",
    title: "Comparative Advantage, Exchange Rates & Real Cases",
    unitRef: "Unit 4: The Global Economy",
    accentColor: "#10b981",
    glowColor: "rgba(16, 185, 129, 0.25)",
    icon: <Globe2 className="w-5 h-5 text-emerald-400" />,
    quote: "“Specialization and comparative advantage enhance global welfare, yet trade policy entails domestic distribution battles.”",
    insight:
      "International trade links nations through floating exchange rates, current account adjustments, and protectionist tariffs. Tested empirically against 40 detailed historical and contemporary case studies across 20+ countries.",
    telemetry: [
      { label: "Global Vector Diagrams", value: "8 Vector Models (D-22 to D-29)" },
      { label: "Empirical Case Bank", value: "40 Real-World Case Studies (US, EU, China, Kenya...)" },
      { label: "Trade Barriers Engine", value: "Tariff & Quota Shaders Calibrated" },
    ],
    svgType: "global",
  },
  {
    id: "exam",
    badge: "PHASE 05 // EXAM MASTERY & AO SYNTHESIS",
    title: "Assessment Objectives & Grade 7 Blueprint",
    unitRef: "Syllabus Synthesis: Paper 1 & Paper 2",
    accentColor: "#06b6d4",
    glowColor: "rgba(6, 182, 212, 0.25)",
    icon: <GraduationCap className="w-5 h-5 text-cyan-400" />,
    quote: "“A Grade 7 is won in AO4 Evaluation: balance, real-world context, short-run vs long-run, and stakeholder synthesis.”",
    insight:
      "Mastery requires decomposing questions through rigorous command terms: State/Define (AO1), Apply (AO2), Analyze/Explain (AO3), and Evaluate/Discuss (AO4). Structured blueprints calibrate 15M, 10M, 8M, 6M, 4M, and 2M rubrics.",
    telemetry: [
      { label: "Question Breakdowns", value: "15M, 10M, 8M, 6M, 4M, 2M Markschemes Live" },
      { label: "Command Terms Lexicon", value: "22 Terms & Dictator Rules Indexed" },
      { label: "Workspace Status", value: "21 Topics, 29 Diagrams, 40 Cases • 120 FPS Nominal" },
    ],
    svgType: "exam",
  },
];

export const StartupDiagnosticsOverlay: React.FC<
  StartupDiagnosticsOverlayProps
> = ({ onComplete, forceOpen = false, onClose }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(10);
  const [fps, setFps] = useState<number>(120);
  const [showFullModal, setShowFullModal] = useState<boolean>(forceOpen);

  // Auto-dismiss floating telemetry capsule after 3.8s if not manually opened
  useEffect(() => {
    if (isOpen && !showFullModal && !isClosing) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, 5200);
      return () => clearTimeout(timer);
    }
  }, [isOpen, showFullModal, isClosing]);

  // Skip auto-opening if user already booted in this session (unless forced)
  useEffect(() => {
    if (!forceOpen && typeof window !== "undefined") {
      const hasBooted = sessionStorage.getItem("ib_econ_booted_cinematic_v1");
      if (hasBooted === "true") {
        setIsOpen(false);
        if (onComplete) onComplete();
      }
    }
  }, [forceOpen, onComplete]);

  // Live FPS telemetry counter (118-121 FPS jitter for real-time telemetry feel)
  useEffect(() => {
    if (!isOpen) return;
    const fpsTimer = setInterval(() => {
      setFps(Math.floor(118 + Math.random() * 4));
    }, 250);
    return () => clearInterval(fpsTimer);
  }, [isOpen]);

  // Phase stepping auto-advancement sequence
  useEffect(() => {
    if (!isOpen || !isAutoPlaying) return;

    const phaseDuration = 1000; // ~1s per phase for smooth pacing

    const timer = setInterval(() => {
      setCurrentPhaseIndex((prev) => {
        if (prev < PHASES.length - 1) {
          const next = prev + 1;
          setProgress(Math.round(((next + 1) / PHASES.length) * 100));
          return next;
        } else {
          // Reached final phase! Auto dismiss gracefully after a brief moment
          clearInterval(timer);
          setProgress(100);
          setTimeout(() => {
            handleDismiss();
          }, 850);
          return prev;
        }
      });
    }, phaseDuration);

    return () => clearInterval(timer);
  }, [isOpen, isAutoPlaying]);

  const handleDismiss = () => {
    setIsClosing(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("ib_econ_booted_cinematic_v1", "true");
    }
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      if (onClose) onClose();
      if (onComplete) onComplete();
    }, 380);
  };

  const handleSelectPhase = (idx: number) => {
    setCurrentPhaseIndex(idx);
    setProgress(Math.round(((idx + 1) / PHASES.length) * 100));
    setIsAutoPlaying(false); // Pause auto play if user manually clicks
  };

  if (!isOpen && !forceOpen) return null;

  const currentPhase = PHASES[currentPhaseIndex];

  if (!showFullModal) {
    return (
      <aside
        aria-label="Equilibrium Telemetry Capsule"
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-auto transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isClosing
            ? "opacity-0 -translate-y-6 scale-90 pointer-events-none"
            : "liquid-jelly-enter"
        }`}
      >
        <div className="liquid-glass-dock rounded-full px-4 py-2 flex items-center gap-3.5 shadow-2xl border border-sky-400/40 bg-slate-950/90 backdrop-blur-2xl">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500/30 via-indigo-500/30 to-purple-500/30 border border-sky-300/40 flex items-center justify-center shrink-0">
            <TrendingUp className="w-4 h-4 text-sky-300 animate-pulse" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] font-bold text-sky-300 uppercase tracking-wider">
                EQUILIBRIUM // IB ECON SL
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-mono text-[10px] text-emerald-300 font-bold">
                {fps} FPS // 0.2ms
              </span>
            </div>
            <span className="text-[11px] text-slate-300 font-medium">
              23 Core Topics • 4 Syllabus Units Active
            </span>
          </div>

          <div className="flex items-center gap-1.5 pl-2 border-l border-white/15">
            <button
              onClick={() => setShowFullModal(true)}
              className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95 cursor-pointer"
            >
              Economic Beats
            </button>
            <button
              onClick={handleDismiss}
              className="p-1 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-all active:scale-90 cursor-pointer"
              title="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 select-none bg-[#05070f]/85 backdrop-blur-md transition-all duration-380 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isClosing
          ? "opacity-0 scale-[1.03] -translate-y-2 pointer-events-none"
          : "opacity-100 scale-100 translate-y-0"
      }`}
    >
      {/* Outer Liquid Glass Dashboard Card */}
      <div
        className="w-full max-w-4xl rounded-3xl border border-white/15 p-6 sm:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.92)] relative overflow-hidden flex flex-col justify-between min-h-[580px] sm:min-h-[620px]"
        style={{
          background:
            "radial-gradient(130% 60% at 50% 0%, rgba(255, 255, 255, 0.08) 0%, transparent 60%), " +
            "linear-gradient(145deg, rgba(20, 27, 48, 0.94) 0%, rgba(8, 12, 24, 0.98) 100%)",
        }}
      >
        {/* Dynamic Colored Ambient Radial Glow mapped to active phase */}
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[650px] h-72 rounded-full blur-[100px] pointer-events-none transition-colors duration-700 ease-out"
          style={{
            background: currentPhase.glowColor,
          }}
        />

        {/* ===================================================================
            HEADER: SYSTEM TITLE, TELEMETRY & CONTROLS
            =================================================================== */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-lg transition-colors duration-500"
              style={{
                backgroundColor: currentPhase.accentColor,
                boxShadow: `0 0 20px ${currentPhase.glowColor}`,
              }}
            >
              {currentPhase.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm sm:text-base tracking-tight">
                  IB Economics SL — Diagnostic Core & Syllabus Engine
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  v2.4 Live
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                {ALL_TOPICS.length} Topics • {DIAGRAMS_DOSSIER.length} Vector Diagrams • {CASE_STUDIES_BANK.length} Empirical Cases
              </p>
            </div>
          </div>

          {/* Telemetry Indicator & Play/Pause */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="p-2 rounded-xl bg-slate-950/70 border border-white/10 text-slate-300 hover:text-white cursor-pointer transition-all"
              title={isAutoPlaying ? "Pause Auto-Advance" : "Resume Auto-Advance"}
            >
              {isAutoPlaying ? (
                <Pause className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Play className="w-3.5 h-3.5 text-emerald-400" />
              )}
            </button>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-emerald-500/30 text-emerald-300 font-mono text-xs shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{fps} FPS</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-300">0.3ms</span>
            </div>
          </div>
        </div>

        {/* ===================================================================
            PHASE BREADCRUMB PILLS (INTERACTIVE MILESTONES)
            =================================================================== */}
        <div className="relative z-10 my-4 flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {PHASES.map((p, idx) => {
            const isCurrent = idx === currentPhaseIndex;
            const isDone = idx < currentPhaseIndex;

            return (
              <button
                key={p.id}
                onClick={() => handleSelectPhase(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 border ${
                  isCurrent
                    ? "text-white font-bold shadow-md"
                    : isDone
                    ? "bg-emerald-950/30 text-emerald-300 border-emerald-500/30"
                    : "bg-white/5 text-slate-400 border-white/5 hover:text-white hover:bg-white/10"
                }`}
                style={{
                  backgroundColor: isCurrent ? `${p.accentColor}25` : undefined,
                  borderColor: isCurrent ? p.accentColor : undefined,
                  boxShadow: isCurrent ? `0 0 16px ${p.glowColor}` : undefined,
                }}
              >
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: p.accentColor }}
                  />
                )}
                <span>0{idx + 1}. {p.id.toUpperCase()}</span>
              </button>
            );
          })}
        </div>

        {/* ===================================================================
            HERO NARRATIVE STAGE (SMOOTH FADE IN / OUT CONTENT)
            =================================================================== */}
        <div
          key={currentPhase.id}
          className="relative z-10 flex-1 my-2 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center animate-stage-fade-in"
        >
          {/* Left Column: Conceptual Narrative, Quote & Live Telemetry */}
          <div className="lg:col-span-7 space-y-3.5">
            <div className="flex items-center gap-2">
              <span
                className="font-mono text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-lg uppercase tracking-wider border shadow-sm"
                style={{
                  backgroundColor: `${currentPhase.accentColor}20`,
                  borderColor: `${currentPhase.accentColor}40`,
                  color: currentPhase.accentColor,
                }}
              >
                {currentPhase.badge}
              </span>
              <span className="font-mono text-xs text-slate-400">
                {currentPhase.unitRef}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
              {currentPhase.title}
            </h2>

            {/* Academic Golden Principle Quote */}
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/10 shadow-inner">
              <p className="text-xs sm:text-sm font-academic-notes italic text-slate-200 leading-relaxed">
                {currentPhase.quote}
              </p>
            </div>

            {/* Analytical Syllabus Insight */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentPhase.insight}
            </p>

            {/* Live Subsystem Telemetry Badges */}
            <div className="space-y-1.5 pt-1">
              {currentPhase.telemetry.map((t, tIdx) => (
                <div
                  key={tIdx}
                  className="flex items-center justify-between text-xs font-mono p-2 rounded-xl bg-slate-950/45 border border-white/5"
                >
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{t.label}</span>
                  </span>
                  <span
                    className="font-bold text-right"
                    style={{ color: currentPhase.accentColor }}
                  >
                    {t.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Dynamic SVG Mini-Visualizer Canvas */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-5 rounded-2xl bg-slate-950/70 border border-white/10 shadow-inner min-h-[260px] relative overflow-hidden group">
            <div className="absolute top-2.5 right-3 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
              Live Vector Telemetry
            </div>

            {/* Specialized SVG Canvas for each phase */}
            {currentPhase.svgType === "ppf" && (
              <svg viewBox="0 0 280 200" className="w-full max-w-[260px] h-auto">
                {/* Axes */}
                <line x1="30" y1="20" x2="30" y2="170" stroke="#475569" strokeWidth="2" />
                <line x1="30" y1="170" x2="260" y2="170" stroke="#475569" strokeWidth="2" />
                <text x="35" y="30" fill="#94a3b8" fontSize="10" fontFamily="monospace">Capital Goods</text>
                <text x="180" y="165" fill="#94a3b8" fontSize="10" fontFamily="monospace">Consumer Goods</text>

                {/* PPF Curve */}
                <path
                  d="M 30,35 Q 160,50 250,170"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="3"
                  className="animate-pulse"
                />

                {/* Shaded Area of Production */}
                <path
                  d="M 30,35 Q 160,50 250,170 L 30,170 Z"
                  fill="#f59e0b"
                  fillOpacity="0.08"
                />

                {/* Efficient Point A */}
                <circle cx="150" cy="85" r="5" fill="#10b981" />
                <text x="160" y="82" fill="#10b981" fontSize="11" fontWeight="bold">A (Efficient)</text>

                {/* Inefficient Point B */}
                <circle cx="80" cy="130" r="4" fill="#f43f5e" />
                <text x="90" y="133" fill="#f43f5e" fontSize="10">B (Inefficient)</text>

                {/* Unattainable Point C */}
                <circle cx="215" cy="70" r="4" fill="#a855f7" strokeDasharray="2,2" />
                <text x="185" y="60" fill="#a855f7" fontSize="10">C (Unattainable)</text>
              </svg>
            )}

            {currentPhase.svgType === "micro" && (
              <svg viewBox="0 0 280 200" className="w-full max-w-[260px] h-auto">
                {/* Axes */}
                <line x1="30" y1="20" x2="30" y2="170" stroke="#475569" strokeWidth="2" />
                <line x1="30" y1="170" x2="260" y2="170" stroke="#475569" strokeWidth="2" />
                <text x="35" y="30" fill="#94a3b8" fontSize="10" fontFamily="monospace">Price (P)</text>
                <text x="180" y="165" fill="#94a3b8" fontSize="10" fontFamily="monospace">Quantity (Q)</text>

                {/* Supply Curve */}
                <line x1="45" y1="155" x2="235" y2="35" stroke="#10b981" strokeWidth="3" />
                <text x="240" y="40" fill="#10b981" fontSize="11" fontWeight="bold">S = MPC</text>

                {/* Demand Curve */}
                <line x1="45" y1="35" x2="235" y2="155" stroke="#0ea5e9" strokeWidth="3" />
                <text x="240" y="160" fill="#0ea5e9" fontSize="11" fontWeight="bold">D = MPB</text>

                {/* Equilibrium Dash Lines */}
                <line x1="30" y1="95" x2="140" y2="95" stroke="#64748b" strokeDasharray="3,3" />
                <line x1="140" y1="95" x2="140" y2="170" stroke="#64748b" strokeDasharray="3,3" />

                {/* Equilibrium Point */}
                <circle cx="140" cy="95" r="6" fill="#38bdf8" className="animate-ping" />
                <circle cx="140" cy="95" r="5" fill="#0ea5e9" />
                <text x="145" y="90" fill="#ffffff" fontSize="11" fontWeight="bold">E* (P*, Q*)</text>
              </svg>
            )}

            {currentPhase.svgType === "macro" && (
              <svg viewBox="0 0 280 200" className="w-full max-w-[260px] h-auto">
                {/* Axes */}
                <line x1="30" y1="20" x2="30" y2="170" stroke="#475569" strokeWidth="2" />
                <line x1="30" y1="170" x2="260" y2="170" stroke="#475569" strokeWidth="2" />
                <text x="35" y="30" fill="#94a3b8" fontSize="10" fontFamily="monospace">Price Level (PL)</text>
                <text x="175" y="165" fill="#94a3b8" fontSize="10" fontFamily="monospace">Real GDP (Y)</text>

                {/* LRAS Vertical */}
                <line x1="190" y1="25" x2="190" y2="170" stroke="#f59e0b" strokeWidth="2.5" />
                <text x="180" y="20" fill="#f59e0b" fontSize="10" fontWeight="bold">LRAS (Yf)</text>

                {/* SRAS Upward */}
                <line x1="45" y1="150" x2="225" y2="40" stroke="#10b981" strokeWidth="2.5" />
                <text x="230" y="45" fill="#10b981" fontSize="10" fontWeight="bold">SRAS</text>

                {/* AD1 and AD2 */}
                <line x1="45" y1="60" x2="170" y2="160" stroke="#64748b" strokeWidth="2" strokeDasharray="3,3" />
                <line x1="75" y1="50" x2="210" y2="160" stroke="#a855f7" strokeWidth="3" />
                <text x="215" y="160" fill="#a855f7" fontSize="10" fontWeight="bold">AD₂</text>

                {/* Shift Arrow */}
                <path d="M 115,100 L 145,100 M 140,95 L 146,100 L 140,105" stroke="#a855f7" strokeWidth="2" fill="none" />
              </svg>
            )}

            {currentPhase.svgType === "global" && (
              <svg viewBox="0 0 280 200" className="w-full max-w-[260px] h-auto">
                {/* Axes */}
                <line x1="30" y1="20" x2="30" y2="170" stroke="#475569" strokeWidth="2" />
                <line x1="30" y1="170" x2="260" y2="170" stroke="#475569" strokeWidth="2" />
                <text x="35" y="30" fill="#94a3b8" fontSize="10" fontFamily="monospace">Price ($)</text>
                <text x="180" y="165" fill="#94a3b8" fontSize="10" fontFamily="monospace">Quantity</text>

                {/* Domestic Supply & Demand */}
                <line x1="40" y1="140" x2="220" y2="40" stroke="#94a3b8" strokeWidth="2" />
                <line x1="40" y1="40" x2="220" y2="140" stroke="#94a3b8" strokeWidth="2" />
                <text x="225" y="45" fill="#94a3b8" fontSize="10">Sd</text>
                <text x="225" y="145" fill="#94a3b8" fontSize="10">Dd</text>

                {/* World Price Pw */}
                <line x1="30" y1="130" x2="250" y2="130" stroke="#38bdf8" strokeWidth="2" />
                <text x="235" y="125" fill="#38bdf8" fontSize="10">Pw (Free Trade)</text>

                {/* Tariff Price P_tariff */}
                <line x1="30" y1="105" x2="250" y2="105" stroke="#10b981" strokeWidth="2.5" />
                <text x="220" y="100" fill="#10b981" fontSize="10" fontWeight="bold">P_tariff</text>

                {/* Tariff Revenue Rect */}
                <rect x="95" y="105" width="70" height="25" fill="#10b981" fillOpacity="0.25" stroke="#10b981" strokeDasharray="2,2" />
                <text x="105" y="122" fill="#10b981" fontSize="9" fontWeight="bold">Gov Revenue</text>
              </svg>
            )}

            {currentPhase.svgType === "exam" && (
              <svg viewBox="0 0 280 200" className="w-full max-w-[260px] h-auto">
                {/* Radar Grid Circles */}
                <circle cx="140" cy="100" r="70" fill="none" stroke="#334155" strokeWidth="1" />
                <circle cx="140" cy="100" r="45" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3,3" />

                {/* Radar Axis Cross */}
                <line x1="140" y1="20" x2="140" y2="180" stroke="#334155" strokeWidth="1" />
                <line x1="60" y1="100" x2="220" y2="100" stroke="#334155" strokeWidth="1" />

                {/* Polygon of Mastery */}
                <polygon
                  points="140,35 200,100 140,165 75,100"
                  fill="#06b6d4"
                  fillOpacity="0.2"
                  stroke="#06b6d4"
                  strokeWidth="2.5"
                />

                {/* AO Labels */}
                <text x="140" y="25" fill="#06b6d4" fontSize="10" fontWeight="bold" textAnchor="middle">AO1 Knowledge</text>
                <text x="210" y="104" fill="#06b6d4" fontSize="10" fontWeight="bold">AO2 Application</text>
                <text x="140" y="188" fill="#06b6d4" fontSize="10" fontWeight="bold" textAnchor="middle">AO3 Analysis</text>
                <text x="15" y="104" fill="#06b6d4" fontSize="10" fontWeight="bold">AO4 Evaluation</text>

                {/* Central Grade 7 Star Badge */}
                <circle cx="140" cy="100" r="14" fill="#05070f" stroke="#06b6d4" strokeWidth="2" />
                <text x="140" y="104" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">7</text>
              </svg>
            )}

            <div className="mt-2 text-center">
              <span
                className="text-[11px] font-mono font-bold"
                style={{ color: currentPhase.accentColor }}
              >
                ● Interactive Mathematical Model Calibrated
              </span>
            </div>
          </div>
        </div>

        {/* ===================================================================
            FOOTER: PROGRESS BAR & WORKSPACE ACCESS
            =================================================================== */}
        <div className="relative z-10 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-1/2 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                <span>Diagnostics & Pre-compilation</span>
              </span>
              <span className="font-bold text-white tracking-wider">
                {progress}%
              </span>
            </div>

            {/* Glowing Shimmer Progress Bar */}
            <div className="w-full h-2 rounded-full bg-slate-950/80 border border-white/10 overflow-hidden relative">
              <div
                className="h-full rounded-full transition-all duration-300 ease-out relative"
                style={{
                  width: `${progress}%`,
                  backgroundColor: currentPhase.accentColor,
                  boxShadow: `0 0 12px ${currentPhase.accentColor}`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
              </div>
            </div>
          </div>

          {/* Quick Enter & Skip Action */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={handleDismiss}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-mono text-xs font-bold text-slate-950 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95 hover:brightness-110"
              style={{
                backgroundColor: currentPhase.accentColor,
                boxShadow: `0 4px 20px ${currentPhase.glowColor}`,
              }}
            >
              <span>{progress === 100 ? "Open Workspace" : "Enter Directly →"}</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
