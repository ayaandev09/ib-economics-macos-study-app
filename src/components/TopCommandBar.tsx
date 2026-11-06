"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import {
  LayoutGrid,
  Rows3,
  Layers,
  Compass,
  Library,
  Brain,
  Briefcase,
  GraduationCap,
  Search,
  Zap,
  X,
  Play,
  Pause,
  RotateCcw,
  Clock,
  Activity,
  BookOpen,
  BookA,
  Eye,
  ListFilter,
  TrendingUp,
  Award,
  Flame,
  ArrowRight,
  Timer,
  Keyboard,
  PanelLeft,
} from "lucide-react";
import { ALL_TOPICS } from "@/data";
import { useStudyStore, ViewMode, AcademicStyle } from "@/store/useStudyStore";
import { ChromaticButton } from "./chromatic-button";
import { KeyboardShortcutsModal } from "./KeyboardShortcutsModal";
import { IBEconomicsAppLogo } from "./IBEconomicsAppLogo";

interface TopCommandBarProps {
  onOpenWalkthrough?: () => void;
}

interface ViewModeItem {
  id: ViewMode;
  label: string;
  shortLabel: string;
  badge?: string;
  icon: React.ReactNode;
}

const NAV_MODES: ViewModeItem[] = [
  {
    id: "focus",
    label: "Topics Bento",
    shortLabel: "Bento",
    badge: "21",
    icon: <LayoutGrid className="w-3.5 h-3.5" />,
  },
  {
    id: "stream",
    label: "Syllabus Flow",
    shortLabel: "Flow",
    badge: "Stream",
    icon: <Rows3 className="w-3.5 h-3.5" />,
  },
  {
    id: "diagrams",
    label: "Diagram Lab",
    shortLabel: "Diagrams",
    badge: "29",
    icon: <Layers className="w-3.5 h-3.5" />,
  },
  {
    id: "matrix",
    label: "9 Key Concepts",
    shortLabel: "Concepts",
    badge: "Matrix",
    icon: <Compass className="w-3.5 h-3.5" />,
  },
  {
    id: "cases",
    label: "Case Studies",
    shortLabel: "Cases",
    badge: "40",
    icon: <Briefcase className="w-3.5 h-3.5" />,
  },
  {
    id: "exam-guide",
    label: "Exam Blueprint",
    shortLabel: "Blueprint",
    badge: "15M",
    icon: <GraduationCap className="w-3.5 h-3.5" />,
  },
  {
    id: "lexicon",
    label: "Lexicon & Formulas",
    shortLabel: "Lexicon",
    badge: "Bank",
    icon: <Library className="w-3.5 h-3.5" />,
  },
  {
    id: "revision",
    label: "Active Recall Hub",
    shortLabel: "Recall",
    badge: "Quiz",
    icon: <Brain className="w-3.5 h-3.5" />,
  },
];

export const TopCommandBar: React.FC<TopCommandBarProps> = ({
  onOpenWalkthrough,
}) => {
  const {
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    learningPosture,
    setLearningPosture,
    academicStyle,
    setAcademicStyle,
    timerSeconds,
    isTimerRunning,
    tickTimer,
    toggleTimerRunning,
    resetTimer,
    setDiagnosticsModalOpen,
    setUnitSheetOpen,
    completedTopics,
    setActiveTopic,
    isInspectorOpen,
    toggleInspector,
    openExamSprint,
    sidebarCollapsed,
    toggleSidebar,
    isSpotlightOpen,
    openSpotlight,
    toggleSpotlight,
  } = useStudyStore();

  const completedCount = Object.values(completedTopics || {}).filter(Boolean).length;
  const masteryPercentage = ALL_TOPICS.length > 0
    ? Math.round((completedCount / ALL_TOPICS.length) * 100)
    : 0;
  const activeStreak = 5;

  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  // MacBook Air M1 Native Keyboard Accelerators (⌘K, Escape, 1-8 View Switching)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if (e.key === "Escape") {
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        toggleSpotlight();
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        toggleSidebar();
        return;
      }

      if (e.key === "/" && !isInput) {
        e.preventDefault();
        openSpotlight();
        return;
      }

      if ((e.key === "?" || (e.shiftKey && e.key === "/")) && !isInput) {
        e.preventDefault();
        setIsShortcutsOpen((prev) => !prev);
        return;
      }

      if (!isInput && !e.metaKey && !e.ctrlKey && !e.altKey) {
        if (e.key === "1") {
          e.preventDefault();
          setViewMode("focus");
        } else if (e.key === "2") {
          e.preventDefault();
          setViewMode("stream");
        } else if (e.key === "3") {
          e.preventDefault();
          setViewMode("diagrams");
        } else if (e.key === "4") {
          e.preventDefault();
          setViewMode("matrix");
        } else if (e.key === "5") {
          e.preventDefault();
          setViewMode("cases");
        } else if (e.key === "6") {
          e.preventDefault();
          setViewMode("exam-guide");
        } else if (e.key === "7") {
          e.preventDefault();
          setViewMode("lexicon");
        } else if (e.key === "8") {
          e.preventDefault();
          setViewMode("revision");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setViewMode, toggleSpotlight, openSpotlight, toggleSidebar]);

  // Pomodoro countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        tickTimer();
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds, tickTimer]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const currentAcademicFont = academicStyle || "jakarta";

  return (
    <>
      <header className="liquid-glass-long-bar !rounded-3xl !overflow-visible p-4 mb-4 flex flex-col gap-3 shadow-2xl relative mac-drag-region transition-all z-20">
        {/* Top Segment: Brand (Left) & Controls/Actions (Right) */}
        <div className="flex items-center justify-between gap-3 w-full pb-2.5 border-b border-white/10 min-h-[44px]">
          {/* Brand & Breadcrumbs (Left) */}
          <div className="flex items-center gap-2 shrink-0 mac-no-drag">
            {/* Native macOS Sidebar Toggle (⌘B) */}
            <button
              onClick={toggleSidebar}
              title={sidebarCollapsed ? "Expand Topic Navigation Sidebar (⌘B)" : "Collapse Sidebar for Wide View (⌘B)"}
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer soft-button shrink-0 border ${
                sidebarCollapsed
                  ? "bg-teal-500/20 text-teal-300 border-teal-400/40 shadow-sm"
                  : "bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border-white/10"
              }`}
            >
              <PanelLeft className="w-4 h-4" />
            </button>

            {/* Brand Logo & Title */}
            <button
              onClick={() => setDiagnosticsModalOpen(true)}
              title="Click to run live Economics SL Diagnostics"
              className="flex items-center gap-2 min-w-0 text-left cursor-pointer group shrink-0"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-400/25 via-indigo-500/20 to-sky-500/25 border border-teal-400/40 flex items-center justify-center p-1 shadow-md relative shrink-0 group-hover:scale-105 transition-transform overflow-hidden">
                <IBEconomicsAppLogo className="w-full h-full object-contain" />
              </div>
              <div className="min-w-0 leading-tight">
                <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-sky-400 uppercase block truncate">
                  EQUILIBRIUM // IB ECON SL
                </span>
                <span className="text-xs font-semibold text-white tracking-tight block truncate">
                  Economics SL Codex
                </span>
              </div>
            </button>
          </div>

          {/* Right Section: Compact Ergonomic Modality Switchers, Font & Controls */}
          <div className="flex items-center justify-end gap-1.5 sm:gap-2 shrink-0 mac-no-drag">
            {/* Study Goal / Posture Switcher: Revision vs Study (Compact Segmented Pill) */}
            <div className="flex items-center p-0.5 rounded-full bg-black/60 border border-white/12 text-xs">
              <button
                onClick={() => setLearningPosture("pre-lesson-cram")}
                title="Pre-lesson cramming, exam traps & active recall"
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  learningPosture === "pre-lesson-cram"
                    ? "bg-amber-500/25 text-amber-200 border border-amber-400/40 shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Zap className="w-3 h-3 text-amber-300" />
                <span className="hidden lg:inline text-[11px]">Revise</span>
              </button>
              <button
                onClick={() => setLearningPosture("learn-new")}
                title="First-time guided study with conceptual breakdown"
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  learningPosture === "learn-new"
                    ? "bg-emerald-500/25 text-emerald-200 border border-emerald-400/40 shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <BookOpen className="w-3 h-3 text-emerald-300" />
                <span className="hidden lg:inline text-[11px]">Study</span>
              </button>
            </div>

            {/* Academic & Professional Typography Switcher */}
            <div className="flex items-center p-0.5 rounded-full bg-black/60 border border-white/12 text-xs">
              <span className="pl-2 text-slate-400 flex items-center">
                <BookA className="w-3 h-3 text-sky-400" />
              </span>
              <select
                value={currentAcademicFont}
                onChange={(e) => {
                  const val = e.target.value as AcademicStyle;
                  setAcademicStyle(val);
                }}
                title="Academic & Professional Typography Selection"
                className="bg-transparent text-[11px] font-bold text-sky-200 border-none rounded-full px-2 py-1 focus:outline-none cursor-pointer"
              >
                <option value="jakarta" className="bg-slate-900 text-white">
                  🔬 Jakarta
                </option>
                <option value="newsreader" className="bg-slate-900 text-white">
                  🎓 Newsreader
                </option>
                <option value="garamond" className="bg-slate-900 text-white">
                  🏛️ Garamond
                </option>
              </select>
            </div>

            {/* Pomodoro Focus Timer Pill */}
            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-white/12 font-mono text-xs text-slate-300">
              <Clock className="w-3 h-3 text-sky-400" />
              <span className="font-bold text-white tracking-wider text-[11px]">
                {formatTimer(timerSeconds)}
              </span>
              <button
                onClick={toggleTimerRunning}
                className="p-0.5 rounded hover:bg-white/10 text-slate-300 hover:text-white cursor-pointer"
                title={isTimerRunning ? "Pause Timer" : "Start Focus Timer"}
              >
                {isTimerRunning ? (
                  <Pause className="w-3 h-3 text-amber-400" />
                ) : (
                  <Play className="w-3 h-3 text-emerald-400" />
                )}
              </button>
              <button
                onClick={() => resetTimer(25 * 60)}
                className="p-0.5 rounded hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
                title="Reset Timer (25 min)"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>

            {/* Timed Exam Sprint Button */}
            <button
              onClick={openExamSprint}
              title="Launch Timed Exam Sprint (⌘E)"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border bg-teal-500/15 text-teal-200 border-teal-400/35 hover:bg-teal-500/25 shadow-sm soft-button shrink-0"
            >
              <Timer className="w-3.5 h-3.5 text-teal-300 animate-pulse" />
              <span className="hidden xl:inline text-[11px]">Sprint</span>
              <span className="text-[10px] font-mono text-teal-400/70">⌘E</span>
            </button>

            {/* Pro 3-Column Analytical Inspector Toggle (Shown only when tucked away to prevent collision) */}
            {!isInspectorOpen && (
              <button
                onClick={toggleInspector}
                title="Unfold Analytical Inspector from Top Navigation Bar (⌘I)"
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border soft-button shrink-0 bg-teal-950/60 text-teal-300 border-teal-400/40 tucked-pill-beacon-teal"
              >
                <TrendingUp className="w-3.5 h-3.5 text-teal-300" />
                <span className="hidden sm:inline text-[11px]">Inspector</span>
                <span className="px-1.5 py-0.2 rounded-full bg-teal-400/20 text-[9px] font-mono text-teal-200 uppercase tracking-wider font-semibold border border-teal-300/30">
                  Tucked
                </span>
                <span className="text-[10px] font-mono text-teal-400/70">⌘I</span>
              </button>
            )}

            {/* Interactive App Tour / Walkthrough */}
            {onOpenWalkthrough && (
              <button
                onClick={onOpenWalkthrough}
                title="Interactive App Walkthrough & Guide (Tour)"
                className="hidden sm:flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border-teal-400/35 shadow-sm soft-button shrink-0"
              >
                <Compass className="w-3.5 h-3.5 text-teal-400" />
                <span className="hidden xl:inline text-[11px]">Tour</span>
              </button>
            )}

            {/* Native Shortcuts Cheatsheet Guide (?) */}
            <button
              onClick={() => setIsShortcutsOpen((prev) => !prev)}
              title="Keyboard Shortcuts Cheatsheet (?)"
              className="flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all cursor-pointer border bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border-white/10 shadow-sm soft-button shrink-0"
            >
              <span className="text-xs font-mono font-bold text-slate-300">?</span>
            </button>

            {/* Mobile Units Index Trigger */}
            <button
              onClick={() => setUnitSheetOpen(true)}
              className="lg:hidden p-2 rounded-full liquid-glass-pill text-sky-200 active:scale-95 cursor-pointer"
              title="Open Syllabus Index"
            >
              <ListFilter className="w-4 h-4 text-sky-300" />
            </button>
          </div>
        </div>

        {/* Row 2: Dedicated Symmetrical Navigation Grid — 100% Adaptive to Any Mac */}
        <nav
          aria-label="Integrated Main Sections Bar"
          className="w-full grid grid-cols-4 sm:grid-cols-8 gap-1 p-1 bg-black/60 border border-white/12 rounded-2xl shadow-inner relative"
        >
          {NAV_MODES.map((mode) => {
            const isActive = viewMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setViewMode(mode.id)}
                className={`relative col-span-1 flex items-center justify-center gap-1.5 py-1.5 sm:py-2 px-1 rounded-xl text-xs font-bold transition-colors cursor-pointer truncate ${
                  isActive
                    ? "text-teal-200"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTabIndicator"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    className="absolute inset-0 rounded-xl bg-teal-500/25 border border-teal-400/50 shadow-md shadow-teal-500/20 pointer-events-none"
                  />
                )}
                <span className={`relative z-10 ${isActive ? "text-teal-300 shrink-0" : "text-slate-400 shrink-0"}`}>
                  {mode.icon}
                </span>
                <span className="relative z-10 hidden 2xl:inline truncate">{mode.label}</span>
                <span className="relative z-10 inline 2xl:hidden truncate">{mode.shortLabel}</span>
              </button>
            );
          })}
        </nav>

        {/* Row 3: Flagship Spacious Jelly Spotlight Command Pill (Raycast Ergonomics) */}
        <div className="w-full">
          <button
            type="button"
            onClick={openSpotlight}
            className="w-full px-4 py-2.5 rounded-2xl bg-black/55 hover:bg-black/70 border border-white/12 hover:border-teal-400/40 text-left flex items-center justify-between gap-3 shadow-inner transition-all group cursor-pointer soft-button"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-7 h-7 rounded-xl bg-teal-500/15 border border-teal-400/30 flex items-center justify-center text-teal-300 group-hover:scale-105 transition-transform shrink-0">
                <Search className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 truncate">
                <span className="text-xs text-slate-300 group-hover:text-white transition-colors">
                  Spotlight Search 21 Economics topics, 29 diagrams, 40 case studies, concepts...
                </span>
                <span className="hidden lg:inline text-[11px] text-slate-400 ml-2 font-mono">
                  (e.g. &ldquo;PED&rdquo;, &ldquo;Tariffs&rdquo;, &ldquo;AD/AS&rdquo;, &ldquo;Keynesian&rdquo;, &ldquo;U2.7&rdquo;)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold text-teal-300 bg-teal-500/15 border border-teal-400/30">
                <kbd className="font-sans text-[11px]">⌘</kbd>K
              </span>
              <span className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-mono text-slate-400 bg-white/5 border border-white/10">
                /
              </span>
            </div>
          </button>
        </div>

        {/* Global Native Keyboard Shortcuts Cheatsheet Modal */}
        <KeyboardShortcutsModal
          isOpen={isShortcutsOpen}
          onClose={() => setIsShortcutsOpen(false)}
          appName="IB Economics SL Codex"
          accentColor="#0d9488"
          onOpenTour={onOpenWalkthrough}
        />
      </header>
    </>
  );
};
