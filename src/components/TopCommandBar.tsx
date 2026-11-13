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
  Sparkles,
} from "lucide-react";
import { ALL_TOPICS } from "@/data";
import { useStudyStore, ViewMode, AcademicStyle } from "@/store/useStudyStore";
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
    shortLabel: "Lab",
    badge: "29",
    icon: <Layers className="w-3.5 h-3.5" />,
  },
  {
    id: "matrix",
    label: "9 Key Concepts",
    shortLabel: "Matrix",
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
    shortLabel: "Exam",
    badge: "15M",
    icon: <GraduationCap className="w-3.5 h-3.5" />,
  },
  {
    id: "lexicon",
    label: "Lexicon & Formulas",
    shortLabel: "Glossary",
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
    unitSheetOpen,
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

  const handleToggleSidebar = () => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setUnitSheetOpen(!unitSheetOpen);
    } else {
      toggleSidebar();
    }
  };

  return (
    <>
      <header
        data-tour="command-bar"
        className="liquid-glass-bar relative z-20 w-full max-w-full rounded-full px-2.5 py-2 mb-3 flex items-center justify-between gap-2 mac-drag-region"
      >
        <div className="flex items-center gap-2 min-w-0 mac-no-drag">
          <button
            onClick={handleToggleSidebar}
            title="Toggle sidebar (⌘B)"
            aria-label="Toggle sidebar"
            className={`w-9 h-9 rounded-full flex items-center justify-center cursor-pointer border transition-colors shrink-0 ${
              sidebarCollapsed
                ? "bg-amber-500/25 border-amber-300/50 text-amber-200"
                : "bg-white/[0.07] hover:bg-white/[0.14] border-white/15 text-slate-300"
            }`}
          >
            <PanelLeft className="w-4 h-4" />
          </button>
          <p className="text-sm font-semibold text-white truncate pl-1">
            {viewMode === "home" ? "Home" : NAV_MODES.find((m) => m.id === viewMode)?.label ?? "IB Economics"}
          </p>
        </div>

        <div className="flex items-center gap-1.5 mac-no-drag">
          <button onClick={openSpotlight} title="Search (⌘K)" className="flex items-center gap-1.5 h-9 px-3 rounded-full text-xs font-medium cursor-pointer transition-colors bg-white/[0.07] hover:bg-white/[0.14] border border-white/15 text-slate-200 shrink-0">
            <Search className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden md:inline">Search</span>
            <kbd className="hidden md:inline text-[10px] font-mono text-slate-400">⌘K</kbd>
          </button>
          <button onClick={openExamSprint} title="Timed sprint (⌘E)" className="flex items-center gap-1.5 h-9 px-3 rounded-full text-xs font-medium cursor-pointer transition-colors bg-white/[0.07] hover:bg-white/[0.14] border border-white/15 text-slate-200 shrink-0">
            <Timer className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden lg:inline">Sprint</span>
          </button>
          {!isInspectorOpen && (
            <button onClick={toggleInspector} title="Analysis panel (⌘I)" className="flex items-center gap-1.5 h-9 px-3 rounded-full text-xs font-medium cursor-pointer transition-colors bg-white/[0.07] hover:bg-white/[0.14] border border-white/15 text-slate-200 shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden lg:inline">Analysis</span>
            </button>
          )}
          <button
            onClick={() => setIsShortcutsOpen((prev) => !prev)}
            title="Keyboard shortcuts (?)"
            aria-label="Keyboard shortcuts"
            className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer border bg-white/[0.07] hover:bg-white/[0.14] border-white/15 text-slate-300 text-xs font-mono shrink-0"
          >
            ?
          </button>
        </div>

        <KeyboardShortcutsModal
          isOpen={isShortcutsOpen}
          onClose={() => setIsShortcutsOpen(false)}
          appName="IB Economics SL Codex"
          accentColor="#d97706"
          onOpenTour={onOpenWalkthrough}
        />
      </header>
    </>
  );
};
