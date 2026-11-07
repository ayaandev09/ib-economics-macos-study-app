"use client";

import React, { useMemo, useEffect, useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { AmbientAuroraCanvas } from "@/components/AmbientAuroraCanvas";
import { FloatingSidebar } from "@/components/FloatingSidebar";
import { TopCommandBar } from "@/components/TopCommandBar";
import { WidgetBridge } from "@/components/WidgetBridge";
import { StudyMiniHomepage } from "@/components/StudyMiniHomepage";
import { TopicBentoCard } from "@/components/TopicBentoCard";
import { DiagramLabView } from "@/components/DiagramLabView";
import { ThemeMatrixView } from "@/components/ThemeMatrixView";
import { CaseStudyVaultView } from "@/components/CaseStudyVaultView";
import { ExamStructureMasteryView } from "@/components/ExamStructureMasteryView";
import { LexiconDossierView } from "@/components/LexiconDossierView";
import { ActiveRecallRevisionView } from "@/components/ActiveRecallRevisionView";
import { FloatingBottomDock } from "@/components/FloatingBottomDock";
import { StartupDiagnosticsOverlay } from "@/components/StartupDiagnosticsOverlay";
import { CinematicStartupIntro } from "@/components/CinematicStartupIntro";
import { ImmersiveAppWalkthrough } from "@/components/ImmersiveAppWalkthrough";
import { EconomicsRightInspector } from "@/components/EconomicsRightInspector";
import { TimedExamSprintModal } from "@/components/TimedExamSprintModal";
import { JellySpotlightModal } from "@/components/JellySpotlightModal";
import { ChromaticButton } from "@/components/chromatic-button";
import { ALL_TOPICS, SYLLABUS_UNITS, UnitId } from "@/data";
import { useStudyStore } from "@/store/useStudyStore";
import {
  initLiveSyncConnection,
  decodeSyncFromUrl,
  pullSyncFromServer,
} from "@/lib/syncService";
import { initGlobalTactileListener } from "@/lib/tactileHaptics";
import {
  Sparkles,
  Layers,
  SearchX,
  BookOpen,
  ArrowRight,
  Monitor,
  CheckCircle2,
} from "lucide-react";

export default function IBEconomicsSLStudyDashboardPage() {
  const {
    activeTopicId,
    setActiveTopic,
    viewMode,
    searchQuery,
    setSearchQuery,
    activeUnitFilter,
    setActiveUnitFilter,
    deviceMode,
    setDeviceMode,
    academicStyle,
    completedTopics,
    diagnosticsModalOpen,
    setDiagnosticsModalOpen,
    applyRemoteSync,
    isInspectorOpen,
    toggleInspector,
    isExamSprintActive,
    closeExamSprint,
    toggleExamSprint,
    isSpotlightOpen,
    closeSpotlight,
    setLearningPosture,
  } = useStudyStore();

  const [isStartupActive, setIsStartupActive] = useState(true);
  const [showMainUI, setShowMainUI] = useState(false);
  const [isWalkthroughOpen, setIsWalkthroughOpen] = useState(false);

  const handleStartupComplete = useCallback(() => {
    setIsStartupActive(false);
    setShowMainUI(true);
    if (typeof window !== "undefined") {
      const hasSeen = localStorage.getItem("hasSeenAppWalkthrough_econ_v1");
      if (!hasSeen) {
        setIsWalkthroughOpen(true);
      }
    }
  }, []);

  // Synchronize dynamic scholarly typography engine (1984 style)
  useEffect(() => {
    if (typeof document !== "undefined") {
      const activeFont = academicStyle || "jakarta";
      document.documentElement.setAttribute("data-academic-font", activeFont);
      document.documentElement.setAttribute("data-handwritten-style", activeFont);
    }
  }, [academicStyle]);

  // Activate universal tactile mechanical feedback on buttons
  useEffect(() => {
    const cleanup = initGlobalTactileListener();
    return cleanup;
  }, []);

  // Global Keyboard Shortcut: Cmd/Ctrl + I to toggle Analytical Inspector, Cmd/Ctrl + E to toggle Exam Sprint
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "i") {
        e.preventDefault();
        toggleInspector();
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "e") {
        e.preventDefault();
        toggleExamSprint();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleInspector, toggleExamSprint]);

  // Live sync hydration
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const syncParam = params.get("sync");
      if (syncParam) {
        const decoded = decodeSyncFromUrl(syncParam);
        if (decoded) {
          applyRemoteSync(decoded);
        }
      } else {
        pullSyncFromServer().then((remote) => {
          if (remote) applyRemoteSync(remote);
        });
      }
    }

    const disconnectSync = initLiveSyncConnection((incoming) => {
      applyRemoteSync(incoming);
    });

    return () => {
      disconnectSync();
    };
  }, [applyRemoteSync]);

  const activeTopic = useMemo(
    () => ALL_TOPICS.find((t) => t.id === activeTopicId) || ALL_TOPICS[0],
    [activeTopicId]
  );

  const activeUnit = useMemo(
    () =>
      SYLLABUS_UNITS.find((u) => u.id === activeTopic.unitId) ||
      SYLLABUS_UNITS[0],
    [activeTopic.unitId]
  );

  const currentTopicIndex = useMemo(
    () => ALL_TOPICS.findIndex((t) => t.id === activeTopic.id),
    [activeTopic.id]
  );

  const nextTopic = useMemo(
    () =>
      currentTopicIndex >= 0 && currentTopicIndex < ALL_TOPICS.length - 1
        ? ALL_TOPICS[currentTopicIndex + 1]
        : null,
    [currentTopicIndex]
  );

  const filteredTopics = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return ALL_TOPICS.filter((t) => {
      // Global search across all units when query is present
      if (!q && activeUnitFilter !== "all" && t.unitId !== activeUnitFilter) {
        return false;
      }
      if (!q) return true;

      const inHeader =
        t.title.toLowerCase().includes(q) ||
        t.subtitle.toLowerCase().includes(q) ||
        t.displayCode.toLowerCase().includes(q) ||
        t.summary.toLowerCase().includes(q) ||
        t.syllabusRef.toLowerCase().includes(q);

      const inBullets = t.speedReadBullets.some((b) =>
        b.toLowerCase().includes(q)
      );
      const inSubsections = t.subSections.some(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.content.toLowerCase().includes(q) ||
          s.analyticalTakeaway.toLowerCase().includes(q)
      );
      const inCases = t.cases.some(
        (cs) =>
          cs.title.toLowerCase().includes(q) ||
          cs.countryOrContext.toLowerCase().includes(q) ||
          cs.realWorldMechanism.toLowerCase().includes(q)
      );

      return inHeader || inBullets || inSubsections || inCases;
    });
  }, [searchQuery, activeUnitFilter]);

  // When searching in focus mode, automatically sync active topic to first search match
  useEffect(() => {
    if (searchQuery.trim() && filteredTopics.length > 0) {
      if (!filteredTopics.some((t) => t.id === activeTopicId)) {
        setActiveTopic(filteredTopics[0].id);
      }
    }
  }, [searchQuery, filteredTopics, activeTopicId, setActiveTopic]);

  return (
    <>
      {/* 1. Bulletproof Zero-Latency Liquid Glass Startup Animation */}
      <AnimatePresence>
        {isStartupActive && (
          <CinematicStartupIntro
            isOpen={isStartupActive}
            onClose={handleStartupComplete}
            onComplete={handleStartupComplete}
          />
        )}
      </AnimatePresence>

      {/* 2. Main Study Dashboard - Buttery Liquid Glass reveal into main view */}
      <div
        className={`mac-dashboard-shell transition-opacity duration-700 ease-out ${
          showMainUI
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none select-none"
        }`}
      >
        <AmbientAuroraCanvas />
        {/* ==================== MAIN SHELL CONTAINER ==================== */}
        <div className="relative z-10 w-full flex flex-col lg:flex-row gap-4 xl:gap-5 items-start">
          {/* Left Floating Sidebar */}
          <FloatingSidebar isMobileSheet={false} />

          {/* Right Main Content Workspace */}
        <main className="flex-1 min-w-0 w-full pb-36">
          {/* Top Command & View Switcher Bar (Unified Long Bar) */}
          <WidgetBridge />
          <TopCommandBar onOpenWalkthrough={() => setIsWalkthroughOpen(true)} />

          {/* Mini Homepage & Live Widget Telemetry Hub */}
          <StudyMiniHomepage />

          {/* ==================== BUTTER-SMOOTH VIEW CONTENT WORKSPACE ==================== */}
          <div key={viewMode} className="liquid-view-enter">
            {/* ===============================================================
                MODE 1: SINGLE TOPIC BENTO CARD (FOCUS / HOME VIEW)
                =============================================================== */}
            {viewMode === "focus" && (
              <div className="space-y-5">
                {/* Unit Context Banner - 100% Full-Width Bulletproof Native Card */}
                <div className="liquid-glass-bento rounded-3xl p-5 mb-5 border border-white/15 shadow-xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2.5">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-300">
                      <BookOpen className="w-4 h-4 shrink-0 text-sky-400" />
                      <span className="font-bold text-sm text-white">{activeUnit.title}</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-sky-400/15 text-sky-300 border border-sky-400/30">
                      {activeUnit.strategicArc}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed w-full">
                    {activeUnit.overview}
                  </p>
                </div>

                {/* Active Topic Bento Grid with Buttery Smooth Swap */}
                <div key={activeTopic.id} data-tour="study-bento" className="liquid-chapter-swap">
                  <TopicBentoCard
                    topic={activeTopic}
                    showPrevNextControls={true}
                  />
                </div>

                {/* Seamless Next-Topic Speed-Read Transition Footer */}
                {nextTopic && (
                  <div className="liquid-glass-bento rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                        Up Next in Your Syllabus Queue
                      </div>
                      <div className="text-base sm:text-lg font-bold text-white">
                        {nextTopic.displayCode}: {nextTopic.title}
                      </div>
                      <div className="text-xs text-sky-300">
                        {nextTopic.readingTimeMinutes} min speed-read • {nextTopic.subSections.length} core sections
                      </div>
                    </div>

                    <ChromaticButton
                      onClick={() => {
                        setActiveTopic(nextTopic.id);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      color="#00802f"
                      colorMode="spectrum"
                      speed={0.7}
                      paused={false}
                      phase={0}
                      feather={100}
                      projectionScale={174.7}
                      intensity={1.4}
                      grain={0.105}
                      seed={7}
                      borderRadius={50}
                      hoverEffect="brighten"
                      entrance="blur-up"
                      entranceSpeed={1}
                      entranceBlur={10}
                      entranceDistance={20}
                      entranceScale={0.65}
                      className="!min-w-[240px] !h-12 !px-6 !text-xs font-bold shadow-xl cursor-pointer"
                    >
                      <span>Advance to Topic {nextTopic.displayCode}</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </ChromaticButton>
                  </div>
                )}
              </div>
            )}

            {/* ===============================================================
                MODE 2: CONTINUOUS FLOW STREAM
                =============================================================== */}
            {viewMode === "stream" && (
              <div className="space-y-6">
                {/* Units Quick Filter Header */}
                <div className="liquid-glass-bento rounded-3xl p-6 border border-white/10 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Layers className="w-5 h-5 text-sky-400" /> Continuous Syllabus Stream
                      </h2>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Seamlessly read through all 4 syllabus units from introduction to international trade.
                      </p>
                    </div>

                    {/* Unit Filters */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
                      {(
                        [
                          { id: "all", label: "All Units (21)" },
                          { id: "unit-1", label: "Unit 1 (2)" },
                          { id: "unit-2", label: "Unit 2 (8)" },
                          { id: "unit-3", label: "Unit 3 (7)" },
                          { id: "unit-4", label: "Unit 4 (6)" },
                        ] as { id: UnitId | "all"; label: string }[]
                      ).map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveUnitFilter(tab.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                            activeUnitFilter === tab.id
                              ? "liquid-glass-pill-active text-white"
                              : "liquid-glass-pill text-slate-300"
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Units Overviews Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {SYLLABUS_UNITS.map((u) => (
                      <div
                        key={u.id}
                        className="p-3.5 rounded-2xl bg-slate-950/55 border border-white/10"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-[11px] font-bold text-sky-300 uppercase">
                            {u.badge}
                          </span>
                          <span className="font-mono text-[10px] text-slate-400">
                            {u.topics.length} Topics
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-white mb-1 line-clamp-1">
                          {u.title}
                        </p>
                        <p className="text-[11px] text-slate-300 leading-relaxed mb-2 line-clamp-3">
                          {u.overview}
                        </p>
                        <p className="text-[10px] font-mono text-purple-300/90 line-clamp-1">
                          {u.strategicArc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* All Matching Topic Cards */}
                {filteredTopics.length > 0 ? (
                  filteredTopics.map((t, idx) => (
                    <TopicBentoCard
                      key={t.id}
                      topic={t}
                      isDeferred={idx > 0}
                      showPrevNextControls={false}
                    />
                  ))
                ) : (
                  <div className="liquid-glass-bento rounded-3xl p-12 text-center">
                    <SearchX className="w-8 h-8 text-rose-400 mx-auto mb-3" />
                    <h3 className="text-base font-bold text-white mb-1">
                      No Topics Match Your Filter
                    </h3>
                    <p className="text-xs text-slate-400 mb-4">
                      Try clearing your search query or switching back to All Units.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setActiveUnitFilter("all");
                      }}
                      className="liquid-glass-pill px-4 py-2 rounded-xl text-xs font-mono text-sky-300 cursor-pointer"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ===============================================================
                MODE 3: DIAGRAM LAB & VECTOR STUDIO (29 DIAGRAMS)
                =============================================================== */}
            {viewMode === "diagrams" && (
              <div>
                <DiagramLabView />
              </div>
            )}

            {/* ===============================================================
                MODE 4: 9 KEY CONCEPTS MATRIX VIEW
                =============================================================== */}
            {viewMode === "matrix" && (
              <div>
                <ThemeMatrixView />
              </div>
            )}

            {/* ===============================================================
                MODE 5: 15-MARK ESSAY CASE STUDY VAULT (40 CASE STUDIES)
                =============================================================== */}
            {viewMode === "cases" && (
              <div>
                <CaseStudyVaultView />
              </div>
            )}

            {/* ===============================================================
                MODE 6: EXAM STRUCTURE MASTERY & COMMAND TERMS BLUEPRINT
                =============================================================== */}
            {viewMode === "exam-guide" && (
              <div>
                <ExamStructureMasteryView />
              </div>
            )}

            {/* ===============================================================
                MODE 7: FORMULAS, THEORISTS & GLOSSARY DOSSIER
                =============================================================== */}
            {viewMode === "lexicon" && (
              <div>
                <LexiconDossierView />
              </div>
            )}

            {/* ===============================================================
                MODE 8: ACTIVE RECALL REVISION & EXAM FLASHCARD HUB
                =============================================================== */}
            {viewMode === "revision" && (
              <div>
                <ActiveRecallRevisionView />
              </div>
            )}
          </div>
        </main>

        {/* Right Sticky Liquid Glass Analytical Inspector */}
        <EconomicsRightInspector
          topic={activeTopic}
          isOpen={isInspectorOpen}
          onToggle={toggleInspector}
        />
      </div>



        {/* =====================================================================
            STARTUP DIAGNOSTICS & SYSTEM TELEMETRY OVERLAY
            ===================================================================== */}
        <StartupDiagnosticsOverlay
          forceOpen={diagnosticsModalOpen}
          onClose={() => setDiagnosticsModalOpen(false)}
        />
      </div>

      {/* Timed Exam Sprint Full-Screen Simulation Modal */}
      <TimedExamSprintModal
        isOpen={isExamSprintActive}
        onClose={closeExamSprint}
        topic={activeTopic}
      />

      {/* Flagship Jelly Spotlight Search Modal (Raycast Ergonomics) */}
      <JellySpotlightModal
        isOpen={isSpotlightOpen}
        onClose={closeSpotlight}
      />

      {/* Immersive Onboarding Walkthrough Tour */}
      <ImmersiveAppWalkthrough
        isOpen={isWalkthroughOpen}
        onClose={() => setIsWalkthroughOpen(false)}
        onSelectGoal={(goal) => setLearningPosture(goal === "revise" ? "pre-lesson-cram" : "learn-new")}
        isInspectorOpen={isInspectorOpen}
        onOpenInspector={() => {
          if (!isInspectorOpen) toggleInspector();
        }}
      />
    </>
  );
}