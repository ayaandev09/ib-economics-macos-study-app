"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UnitId, ConceptId } from "@/data/types";
import { ALL_TOPICS } from "@/data";

export type ViewMode =
  | "focus"
  | "stream"
  | "diagrams"
  | "matrix"
  | "cases"
  | "exam-guide"
  | "lexicon"
  | "revision";

export type DeviceMode = "mac" | "iphone16e";
export type LearningPosture = "learn-new" | "pre-lesson-cram";
export type AcademicStyle = "newsreader" | "garamond" | "jakarta";
export type WidgetTemplateSize = "small" | "medium" | "large";
export type FlashcardDeckType =
  | "glossary"
  | "diagrams"
  | "formulas"
  | "concepts"
  | "exam-questions";

interface StudyStoreState {
  // Navigation & View State
  activeTopicId: string;
  activeUnitFilter: UnitId | "all";
  activeConceptFilter: ConceptId | "all";
  viewMode: ViewMode;
  deviceMode: "mac";
  learningPosture: LearningPosture;
  academicStyle: AcademicStyle;
  speedReadMode: boolean;
  searchQuery: string;
  sidebarCollapsed: boolean;
  unitSheetOpen: boolean;
  qrModalOpen: boolean;
  diagnosticsModalOpen: boolean;
  isInspectorOpen: boolean;
  isExamSprintActive: boolean;
  isSpotlightOpen: boolean;
  widgetTemplate: WidgetTemplateSize;

  // Diagram Explorer State
  activeDiagramId: string;

  // Flashcards & Active Recall State
  activeFlashcardDeck: FlashcardDeckType;
  masteredFlashcards: Record<string, boolean>;

  // Study Progress State
  completedTopics: Record<string, boolean>;
  bookmarkedTopics: Record<string, boolean>;
  bookmarkedCaseStudies: Record<string, boolean>;
  topicNotes: Record<string, string>;

  // Focus Timer / Pomodoro
  timerSeconds: number;
  isTimerRunning: boolean;

  // Actions
  setActiveTopic: (topicId: string) => void;
  setActiveUnitFilter: (unitId: UnitId | "all") => void;
  setActiveConceptFilter: (conceptId: ConceptId | "all") => void;
  setViewMode: (mode: ViewMode) => void;
  setDeviceMode: (device: DeviceMode) => void;
  setLearningPosture: (posture: LearningPosture) => void;
  setAcademicStyle: (style: AcademicStyle) => void;
  toggleSpeedReadMode: () => void;
  setSearchQuery: (query: string) => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setUnitSheetOpen: (open: boolean) => void;
  setQrModalOpen: (open: boolean) => void;
  setDiagnosticsModalOpen: (open: boolean) => void;
  toggleInspector: () => void;
  setInspectorOpen: (open: boolean) => void;
  openExamSprint: () => void;
  closeExamSprint: () => void;
  toggleExamSprint: () => void;
  openSpotlight: () => void;
  closeSpotlight: () => void;
  toggleSpotlight: () => void;
  setSpotlightOpen: (open: boolean) => void;
  setWidgetTemplate: (template: WidgetTemplateSize) => void;
  setActiveDiagramId: (diagramId: string) => void;
  goToNextTopic: () => void;
  goToPrevTopic: () => void;
  resetAllProgress: () => void;

  // Flashcards Actions
  setActiveFlashcardDeck: (deck: FlashcardDeckType) => void;
  toggleFlashcardMastered: (id: string) => void;
  resetFlashcardProgress: () => void;

  // Progress Actions
  toggleTopicCompleted: (topicId: string) => void;
  toggleTopicBookmarked: (topicId: string) => void;
  toggleCaseStudyBookmarked: (caseId: string) => void;
  saveTopicNote: (topicId: string, note: string) => void;

  // Timer Actions
  tickTimer: () => void;
  toggleTimerRunning: () => void;
  resetTimer: (seconds?: number) => void;

  applyRemoteSync: (payload: any) => void;
}

export const useStudyStore = create<StudyStoreState>()(
  persist(
    (set, get) => ({
      activeTopicId: "u1-1",
      activeUnitFilter: "all",
      activeConceptFilter: "all",
      viewMode: "focus",
      deviceMode: "mac",
      learningPosture: "learn-new",
      academicStyle: "jakarta",
      speedReadMode: false,
      searchQuery: "",
      sidebarCollapsed: false,
      unitSheetOpen: false,
      qrModalOpen: false,
      diagnosticsModalOpen: false,
      isInspectorOpen: true,
      isExamSprintActive: false,
      isSpotlightOpen: false,
      widgetTemplate: "medium",

      activeDiagramId: "diag-ppf",

      activeFlashcardDeck: "diagrams",
      masteredFlashcards: {},

      completedTopics: {},
      bookmarkedTopics: {},
      bookmarkedCaseStudies: {},
      topicNotes: {},

      timerSeconds: 25 * 60,
      isTimerRunning: false,

      setActiveTopic: (topicId) =>
        set((state) => ({
          activeTopicId: topicId,
          viewMode:
            state.viewMode === "focus" || state.viewMode === "stream"
              ? state.viewMode
              : "focus",
        })),

      setActiveUnitFilter: (unitId) => set({ activeUnitFilter: unitId }),
      setActiveConceptFilter: (conceptId) =>
        set({ activeConceptFilter: conceptId }),
      setViewMode: (mode) => set({ viewMode: mode }),
      setDeviceMode: () => set({ deviceMode: "mac" }),
      setLearningPosture: (posture) => set({ learningPosture: posture }),
      setAcademicStyle: (style) => set({ academicStyle: style }),
      toggleSpeedReadMode: () =>
        set((state) => ({ speedReadMode: !state.speedReadMode })),
      setSearchQuery: (query) => set({ searchQuery: query }),
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      setUnitSheetOpen: (open) => set({ unitSheetOpen: open }),
      setQrModalOpen: (open) => set({ qrModalOpen: open }),
      setDiagnosticsModalOpen: (open) => set({ diagnosticsModalOpen: open }),
      toggleInspector: () =>
        set((state) => ({
          isInspectorOpen: !state.isInspectorOpen,
        })),
      setInspectorOpen: (open) =>
        set({
          isInspectorOpen: open,
        }),
      openExamSprint: () =>
        set({
          isExamSprintActive: true,
        }),
      closeExamSprint: () =>
        set({
          isExamSprintActive: false,
        }),
      toggleExamSprint: () =>
        set((state) => ({
          isExamSprintActive: !state.isExamSprintActive,
        })),
      openSpotlight: () =>
        set({
          isSpotlightOpen: true,
        }),
      closeSpotlight: () =>
        set({
          isSpotlightOpen: false,
        }),
      toggleSpotlight: () =>
        set((state) => ({
          isSpotlightOpen: !state.isSpotlightOpen,
        })),
      setSpotlightOpen: (open) =>
        set({
          isSpotlightOpen: open,
        }),
      setWidgetTemplate: (template) =>
        set({
          widgetTemplate: template,
        }),
      setActiveDiagramId: (diagramId) => set({ activeDiagramId: diagramId }),

      goToNextTopic: () => {
        const curIdx = ALL_TOPICS.findIndex((t) => t.id === get().activeTopicId);
        if (curIdx >= 0 && curIdx < ALL_TOPICS.length - 1) {
          set({ activeTopicId: ALL_TOPICS[curIdx + 1].id });
        }
      },
      goToPrevTopic: () => {
        const curIdx = ALL_TOPICS.findIndex((t) => t.id === get().activeTopicId);
        if (curIdx > 0) {
          set({ activeTopicId: ALL_TOPICS[curIdx - 1].id });
        }
      },
      resetAllProgress: () =>
        set({ completedTopics: {}, masteredFlashcards: {} }),

      setActiveFlashcardDeck: (deck) => set({ activeFlashcardDeck: deck }),
      toggleFlashcardMastered: (id) =>
        set((state) => ({
          masteredFlashcards: {
            ...state.masteredFlashcards,
            [id]: !state.masteredFlashcards[id],
          },
        })),
      resetFlashcardProgress: () => set({ masteredFlashcards: {} }),

      toggleTopicCompleted: (topicId) =>
        set((state) => ({
          completedTopics: {
            ...state.completedTopics,
            [topicId]: !state.completedTopics[topicId],
          },
        })),
      toggleTopicBookmarked: (topicId) =>
        set((state) => ({
          bookmarkedTopics: {
            ...state.bookmarkedTopics,
            [topicId]: !state.bookmarkedTopics[topicId],
          },
        })),
      toggleCaseStudyBookmarked: (caseId) =>
        set((state) => ({
          bookmarkedCaseStudies: {
            ...state.bookmarkedCaseStudies,
            [caseId]: !state.bookmarkedCaseStudies[caseId],
          },
        })),
      saveTopicNote: (topicId, note) =>
        set((state) => ({
          topicNotes: {
            ...state.topicNotes,
            [topicId]: note,
          },
        })),

      tickTimer: () =>
        set((state) => ({
          timerSeconds: Math.max(0, state.timerSeconds - 1),
        })),
      toggleTimerRunning: () =>
        set((state) => ({ isTimerRunning: !state.isTimerRunning })),
      resetTimer: (seconds = 25 * 60) =>
        set({ timerSeconds: seconds, isTimerRunning: false }),

      applyRemoteSync: (payload) =>
        set((state) => ({
          ...(payload.activeTopicId ? { activeTopicId: payload.activeTopicId } : {}),
          ...(payload.studyGoal ? { learningPosture: (payload.studyGoal === "revise" ? "pre-lesson-cram" : "learn-new") as LearningPosture } : {}),
          ...(payload.academicStyle ? { academicStyle: payload.academicStyle } : {}),
          ...(payload.completedTopics
            ? { completedTopics: { ...state.completedTopics, ...payload.completedTopics } }
            : {}),
        })),
    }),
    {
      name: "ib-econ-sl-study-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        learningPosture: state.learningPosture,
        academicStyle: state.academicStyle,
        speedReadMode: state.speedReadMode,
        completedTopics: state.completedTopics,
        bookmarkedTopics: state.bookmarkedTopics,
        bookmarkedCaseStudies: state.bookmarkedCaseStudies,
        masteredFlashcards: state.masteredFlashcards,
        topicNotes: state.topicNotes,
        activeFlashcardDeck: state.activeFlashcardDeck,
        activeDiagramId: state.activeDiagramId,
      }),
    }
  )
);
