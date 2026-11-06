"use client";

import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
  Zap,
  ListFilter,
} from "lucide-react";
import { ALL_TOPICS } from "@/data";
import { useStudyStore } from "@/store/useStudyStore";

export const FloatingBottomDock: React.FC = React.memo(() => {
  const {
    activeTopicId,
    setActiveTopic,
    completedTopics,
    toggleTopicCompleted,
    goToPrevTopic,
    goToNextTopic,
    speedReadMode,
    toggleSpeedReadMode,
    viewMode,
    setViewMode,
    setUnitSheetOpen,
  } = useStudyStore();

  const currentIdx = ALL_TOPICS.findIndex((t) => t.id === activeTopicId);
  const currentTopic = ALL_TOPICS[currentIdx] || ALL_TOPICS[0];
  const isCurrentDone = !!completedTopics[currentTopic.id];
  const totalDone = ALL_TOPICS.filter((t) => !!completedTopics[t.id]).length;

  const jumpToUnitFirstTopic = (firstId: string) => {
    setActiveTopic(firstId);
    if (viewMode !== "focus" && viewMode !== "stream") {
      setViewMode("focus");
    }
    if (viewMode === "stream") {
      document
        .getElementById(`topic-card-${firstId}`)
        ?.scrollIntoView({ behavior: "instant" });
    } else {
      window.scrollTo(0, 0);
    }
  };

  const prevTopic = currentIdx > 0 ? ALL_TOPICS[currentIdx - 1] : null;
  const nextTopic =
    currentIdx < ALL_TOPICS.length - 1 ? ALL_TOPICS[currentIdx + 1] : null;

  return (
    <div className="fixed bottom-[calc(env(safe-area-inset-bottom,16px)+0.5rem)] left-0 right-0 w-full flex justify-center items-center pointer-events-none z-40 px-3">
      <nav
        aria-label="Quick Topic & Unit Floating Dock"
        className="liquid-glass-dock liquid-pulse-rim rounded-full px-3.5 py-2 flex items-center justify-center gap-2 sm:gap-3 pointer-events-auto shadow-2xl"
      >
        {/* Mobile Index Trigger */}
        <button
          onClick={() => setUnitSheetOpen(true)}
          className="lg:hidden p-1.5 rounded-full liquid-glass-pill text-teal-300 active:scale-90 cursor-pointer"
          title="Open Syllabus Index Sheet"
        >
          <ListFilter className="w-4 h-4" />
        </button>

        {/* Unit Quick-Jump Pills (Visible on Mac & Tablets) */}
        <div className="hidden sm:flex items-center gap-1 pr-2 border-r border-white/15">
          <button
            onClick={() => jumpToUnitFirstTopic("u1-1")}
            className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold transition-colors cursor-pointer ${
              currentTopic.unitNumber === 1
                ? "bg-teal-500/30 text-teal-200 border border-teal-400/50"
                : "text-slate-300 hover:text-white hover:bg-white/10"
            }`}
          >
            Unit 1
          </button>
          <button
            onClick={() => jumpToUnitFirstTopic("u2-1")}
            className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold transition-colors cursor-pointer ${
              currentTopic.unitNumber === 2
                ? "bg-purple-500/30 text-purple-200 border border-purple-400/50"
                : "text-slate-300 hover:text-white hover:bg-white/10"
            }`}
          >
            Unit 2
          </button>
          <button
            onClick={() => jumpToUnitFirstTopic("u3-1")}
            className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold transition-colors cursor-pointer ${
              currentTopic.unitNumber === 3
                ? "bg-sky-500/30 text-sky-200 border border-sky-400/50"
                : "text-slate-300 hover:text-white hover:bg-white/10"
            }`}
          >
            Unit 3
          </button>
          <button
            onClick={() => jumpToUnitFirstTopic("u4-1")}
            className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold transition-colors cursor-pointer ${
              currentTopic.unitNumber === 4
                ? "bg-amber-500/30 text-amber-200 border border-amber-400/50"
                : "text-slate-300 hover:text-white hover:bg-white/10"
            }`}
          >
            Unit 4
          </button>
        </div>

        {/* Previous Topic Button */}
        <button
          onClick={goToPrevTopic}
          disabled={!prevTopic}
          title={prevTopic ? `Previous: ${prevTopic.title}` : "First topic"}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium transition-all ${
            prevTopic
              ? "liquid-glass-pill text-white cursor-pointer active:scale-95"
              : "opacity-30 cursor-not-allowed text-slate-500"
          }`}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        {/* Current Topic Badge & Mark Mastered Toggle */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/70 border border-white/15">
          <button
            onClick={() => toggleTopicCompleted(currentTopic.id)}
            title="Toggle topic mastered"
            className="cursor-pointer text-slate-300 hover:text-emerald-400 transition-colors"
          >
            {isCurrentDone ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <Circle className="w-4 h-4 text-slate-500 hover:text-teal-300" />
            )}
          </button>
          <span className="font-mono text-xs font-bold text-white tracking-wide">
            {currentTopic.displayCode}
          </span>
          <span className="text-[10px] font-mono text-slate-400 hidden md:inline">
            ({totalDone}/{ALL_TOPICS.length})
          </span>
        </div>

        {/* Next Topic Button */}
        <button
          onClick={goToNextTopic}
          disabled={!nextTopic}
          title={nextTopic ? `Next: ${nextTopic.title}` : "Last topic"}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium transition-all ${
            nextTopic
              ? "liquid-glass-pill text-white cursor-pointer active:scale-95"
              : "opacity-30 cursor-not-allowed text-slate-500"
          }`}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        {/* Speed-Read Toggle */}
        <button
          onClick={toggleSpeedReadMode}
          title="Toggle Speed-Read Mode"
          className={`hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            speedReadMode
              ? "bg-amber-400/30 text-amber-200 border border-amber-400/60 shadow"
              : "liquid-glass-pill text-slate-300 hover:text-white"
          }`}
        >
          <Zap
            className={`w-3.5 h-3.5 ${
              speedReadMode ? "text-amber-300 fill-amber-300" : "text-slate-400"
            }`}
          />
          <span className="hidden md:inline">Speed</span>
        </button>
      </nav>
    </div>
  );
});

FloatingBottomDock.displayName = "FloatingBottomDock";
