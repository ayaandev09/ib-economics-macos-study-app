"use client";

import React, { useState, useMemo } from "react";
import { SYLLABUS_UNITS, ALL_TOPICS, UnitId } from "@/data";
import { useStudyStore } from "@/store/useStudyStore";
import { IBEconomicsAppLogo } from "./IBEconomicsAppLogo";
import {
  BookOpen,
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronRight,
  Bookmark,
  Sparkles,
  Clock,
  RotateCcw,
  X,
} from "lucide-react";

interface FloatingSidebarProps {
  isMobileSheet?: boolean;
}

export const FloatingSidebar: React.FC<FloatingSidebarProps> = React.memo(({
  isMobileSheet = false,
}) => {
  const {
    activeTopicId,
    setActiveTopic,
    completedTopics,
    bookmarkedTopics,
    unitSheetOpen,
    setUnitSheetOpen,
    setDiagnosticsModalOpen,
    resetAllProgress,
    toggleTopicCompleted,
    setViewMode,
    sidebarCollapsed,
  } = useStudyStore();

  const [expandedUnits, setExpandedUnits] = useState<Record<string, boolean>>({
    "unit-1": true,
    "unit-2": true,
    "unit-3": true,
    "unit-4": true,
  });

  const toggleUnitExpand = (unitId: string) => {
    setExpandedUnits((prev) => ({
      ...prev,
      [unitId]: !prev[unitId],
    }));
  };

  const totalCompleted = useMemo(
    () => ALL_TOPICS.filter((t) => !!completedTopics[t.id]).length,
    [completedTopics]
  );

  const progressPercent = Math.round(
    (totalCompleted / Math.max(1, ALL_TOPICS.length)) * 100
  );

  const remainingMinutes = useMemo(
    () =>
      ALL_TOPICS.reduce(
        (sum, t) => (completedTopics[t.id] ? sum : sum + t.readingTimeMinutes),
        0
      ),
    [completedTopics]
  );

  const totalReadingMinutes = useMemo(
    () => ALL_TOPICS.reduce((sum, t) => sum + t.readingTimeMinutes, 0),
    []
  );

  const toggleUnitComplete = (unitId: string) => {
    const unit = SYLLABUS_UNITS.find((u) => u.id === unitId);
    if (!unit) return;
    const allDone = unit.topics.every((t) => !!completedTopics[t.id]);
    unit.topics.forEach((t) => {
      if (allDone) {
        if (completedTopics[t.id]) toggleTopicCompleted(t.id);
      } else {
        if (!completedTopics[t.id]) toggleTopicCompleted(t.id);
      }
    });
  };

  const handleSelectTopic = (topicId: string) => {
    setActiveTopic(topicId);
    if (isMobileSheet) {
      setUnitSheetOpen(false);
    }
    setViewMode("focus");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // If mobile sheet mode and closed, return null
  if (isMobileSheet && !unitSheetOpen) return null;

  const content = (
    <>
      {/* Top Header */}
      {isMobileSheet ? (
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 shrink-0">
          <div>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-sky-300 block">
              SYLLABUS INDEX • MAC CODEX
            </span>
            <h2 className="text-base font-bold text-white">
              Syllabus Units &amp; Topics (U1.1 ➔ U4.6)
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {totalCompleted > 0 && (
              <button
                onClick={resetAllProgress}
                title="Reset all reading progress"
                className="p-2.5 rounded-2xl liquid-glass-pill text-slate-300 active:scale-95 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setUnitSheetOpen(false)}
              aria-label="Close syllabus index"
              className="p-2.5 rounded-2xl liquid-glass-pill text-slate-200 active:scale-95 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 shrink-0 min-h-[44px] w-full mac-drag-region">
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              onClick={() => setDiagnosticsModalOpen(true)}
              title="Click to run live Economics SL System Diagnostics"
              className="w-10 h-10 rounded-2xl bg-gradient-to-br from-teal-400/25 via-indigo-500/20 to-sky-500/25 border border-teal-400/30 flex items-center justify-center overflow-hidden p-1 shadow-inner hover:brightness-110 active:scale-95 transition-all cursor-pointer group mac-no-drag shrink-0"
            >
              <IBEconomicsAppLogo className="w-full h-full object-contain" />
            </button>
            <div className="min-w-0">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-sky-400 block font-mono truncate">
                IB ECON SL // 2026
              </span>
              <h2 className="text-sm font-bold text-white tracking-tight truncate">
                Economics SL Codex
              </h2>
            </div>
          </div>

          {totalCompleted > 0 && (
            <button
              onClick={resetAllProgress}
              title="Reset progress"
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Speed-Read & Progress Telemetry Bar (Matching Business Management Blueprint) */}
          <div className="liquid-glass-bento rounded-2xl p-3 mb-3 shrink-0">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-slate-300 font-medium flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Syllabus Mastered</span>
          </span>
          <span className="font-mono font-bold text-sky-300">
            {totalCompleted}/{ALL_TOPICS.length} ({progressPercent}%)
          </span>
        </div>

        {/* Progress Fill Bar */}
        <div className="w-full h-2 rounded-full bg-slate-950/80 overflow-hidden border border-white/10 mb-2.5">
          <div
            className="h-full bg-gradient-to-r from-teal-400 via-sky-400 to-indigo-400 rounded-full transition-all duration-300"
            style={{ width: `${Math.max(progressPercent, 4)}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-sky-300" />
            {remainingMinutes}m remaining
          </span>
          <span className="text-slate-300">4 Units • 21 Topics</span>
        </div>
      </div>

      {/* Accordion Units & Topics Scroll Area (Full Height, Zero Redundant Clutter) */}
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-2 pr-0.5">
        {SYLLABUS_UNITS.map((unit) => {
          const isExpanded = !!expandedUnits[unit.id];
          const unitDoneCount = unit.topics.filter(
            (t) => !!completedTopics[t.id]
          ).length;
          const isUnitAllDone =
            unitDoneCount === unit.topics.length && unit.topics.length > 0;

          return (
            <div
              key={unit.id}
              className="rounded-2xl border border-white/10 overflow-hidden bg-slate-950/40"
            >
              {/* Unit Header Accordion Trigger */}
              <div
                onClick={() => toggleUnitExpand(unit.id)}
                className="flex items-center justify-between p-3 cursor-pointer hover:bg-white/[0.04] transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className="font-mono text-xs font-bold text-sky-400 shrink-0">
                    {unit.badge}
                  </span>
                  <span className="text-xs font-semibold text-white truncate">
                    {unit.title}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  <span className="font-mono text-[10px] text-slate-400">
                    {unitDoneCount}/{unit.topics.length}
                  </span>

                  <button
                    type="button"
                    title={
                      isUnitAllDone
                        ? "Mark unit uncompleted"
                        : "Mark all topics in unit completed"
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleUnitComplete(unit.id);
                    }}
                    className="p-1 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    {isUnitAllDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Circle className="w-3.5 h-3.5 text-slate-500" />
                    )}
                  </button>

                  <div className="text-slate-400">
                    {isExpanded ? (
                      <ChevronDown className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5" />
                    )}
                  </div>
                </div>
              </div>

              {/* Collapsible Topics List */}
              {isExpanded && (
                <div className="p-1.5 space-y-1 border-t border-white/[0.06] bg-slate-950/60">
                  {unit.topics.map((topic) => {
                    const isActive = topic.id === activeTopicId;
                    const isDone = !!completedTopics[topic.id];
                    const isMarked = !!bookmarkedTopics[topic.id];

                    return (
                      <div
                        key={topic.id}
                        onClick={() => handleSelectTopic(topic.id)}
                        className={`group flex items-center justify-between gap-2 p-2 rounded-xl text-xs transition-all cursor-pointer ${
                          isActive
                            ? "bg-gradient-to-r from-teal-500/35 to-sky-500/25 text-white border border-teal-400/50 shadow-sm"
                            : "text-slate-300 hover:text-white hover:bg-white/[0.05]"
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleTopicCompleted(topic.id);
                            }}
                            className="shrink-0 cursor-pointer p-0.5 rounded text-slate-400 hover:text-emerald-400"
                          >
                            {isDone ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Circle className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400" />
                            )}
                          </button>
                          <span className="font-mono text-[10px] font-bold text-teal-300 shrink-0">
                            {topic.displayCode}
                          </span>
                          <span
                            className={`truncate ${
                              isDone ? "line-through text-slate-500" : ""
                            }`}
                          >
                            {topic.title}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0 font-mono text-[10px] text-slate-400">
                          {isMarked && (
                            <Bookmark className="w-3 h-3 text-amber-400 fill-amber-400" />
                          )}
                          <span>{topic.readingTimeMinutes}m</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Attribution (Mac Desktop) */}
      {!isMobileSheet && (
        <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 shrink-0">
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-teal-300" />
            IB Economics SL Specification
          </span>
          <span className="font-mono text-slate-300">
            {totalReadingMinutes}m total
          </span>
        </div>
      )}
    </>
  );

  // If Mobile Sheet
  if (isMobileSheet) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm"
        onClick={() => setUnitSheetOpen(false)}
      >
        <aside
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-[420px] max-h-[85dvh] flex flex-col liquid-glass-sheet rounded-t-3xl p-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] overflow-hidden select-none"
        >
          <div className="w-10 h-1.5 rounded-full bg-white/25 mx-auto mb-3 shrink-0" />
          {content}
        </aside>
      </div>
    );
  }

  // Desktop Floating Sidebar (Exact Apple HIG Proportions with Collapse Support)
  return (
    <aside
      data-tour="sidebar"
      className={`hidden lg:flex shrink-0 lg:sticky lg:top-5 lg:h-[calc(100vh-2.5rem)] flex-col liquid-glass-sidebar rounded-3xl overflow-hidden select-none z-20 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        sidebarCollapsed
          ? "w-0 max-w-0 p-0 -mr-4 xl:-mr-5 border-0 opacity-0 pointer-events-none"
          : "w-64 xl:w-72 p-4 opacity-100"
      }`}
    >
      <div
        className={`w-64 xl:w-72 flex flex-col h-full min-h-0 shrink-0 transition-opacity duration-200 ${
          sidebarCollapsed ? "opacity-0 pointer-events-none invisible" : "opacity-100 visible"
        }`}
      >
        {content}
      </div>
    </aside>
  );
});

FloatingSidebar.displayName = "FloatingSidebar";
