"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  LayoutGrid,
  Layers,
  GraduationCap,
  Network,
  Library,
  LineChart,
  Briefcase,
  ClipboardList,
  ArrowUpRight,
  Play,
} from "lucide-react";
import { ALL_TOPICS } from "@/data";
import { useStudyStore, ViewMode } from "@/store/useStudyStore";

type Tile = {
  id: ViewMode;
  title: string;
  blurb: string;
  tint: string;
  icon: React.ReactNode;
  span: string;
};

const TILES: Tile[] = [
  { id: "focus", title: "Topics", blurb: "Study one topic at a time", tint: "tint-amber", icon: <LayoutGrid className="w-6 h-6" />, span: "sm:col-span-2" },
  { id: "diagrams", title: "Diagram Lab", blurb: "Practise drawing and shifting curves", tint: "tint-sky", icon: <LineChart className="w-6 h-6" />, span: "" },
  { id: "cases", title: "Case Studies", blurb: "Real-world examples to cite", tint: "tint-rose", icon: <Briefcase className="w-6 h-6" />, span: "" },
  { id: "exam-guide", title: "Exam Guide", blurb: "Paper structure and mark schemes", tint: "tint-violet", icon: <ClipboardList className="w-6 h-6" />, span: "" },
  { id: "revision", title: "Revise", blurb: "Flashcards and active recall", tint: "tint-emerald", icon: <GraduationCap className="w-6 h-6" />, span: "" },
  { id: "matrix", title: "Concept Matrix", blurb: "How the key concepts connect", tint: "tint-indigo", icon: <Network className="w-6 h-6" />, span: "" },
  { id: "lexicon", title: "Glossary", blurb: "Terms, formulas and theorists", tint: "tint-cyan", icon: <Library className="w-6 h-6" />, span: "" },
  { id: "stream", title: "Quick Read", blurb: "Skim the whole syllabus", tint: "tint-orange", icon: <Layers className="w-6 h-6" />, span: "sm:col-span-2" },
];

export function HomeDashboard() {
  const { setViewMode, setActiveTopic, activeTopicId, completedTopics } = useStudyStore();
  const total = ALL_TOPICS.length;
  const done = ALL_TOPICS.filter((t) => completedTopics[t.id]).length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const current = ALL_TOPICS.find((t) => t.id === activeTopicId) ?? ALL_TOPICS[0];

  return (
    <div className="max-w-5xl mx-auto py-4 sm:py-8 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="glass-tint tint-amber rounded-3xl p-6 sm:col-span-2 flex flex-col justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-200/80">Welcome back</p>
            <h1 className="text-3xl font-bold text-white tracking-tight mt-1">IB Economics</h1>
          </div>
          <button
            onClick={() => {
              setActiveTopic(current.id);
              setViewMode("focus");
            }}
            className="self-start flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-semibold cursor-pointer transition-colors"
          >
            <Play className="w-4 h-4" />
            Continue {current.displayCode}
          </button>
        </div>
        <div className="glass-tint tint-emerald rounded-3xl p-6 flex flex-col justify-between gap-4">
          <p className="text-xs uppercase tracking-widest text-emerald-200/80">Progress</p>
          <div>
            <p className="text-4xl font-bold text-white">{pct}%</p>
            <p className="text-xs text-slate-300 mt-1">{done} of {total} topics</p>
          </div>
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full bg-emerald-400"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        {TILES.map((t, i) => (
          <motion.button
            key={t.id}
            onClick={() => setViewMode(t.id)}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + i * 0.05, type: "spring", stiffness: 260, damping: 24 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            className={`glass-tint ${t.tint} ${t.span} text-left rounded-3xl p-5 min-h-[130px] flex flex-col justify-between cursor-pointer`}
          >
            <div className="flex items-start justify-between text-white/90">
              {t.icon}
              <ArrowUpRight className="w-4 h-4 opacity-60" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">{t.title}</h2>
              <p className="text-sm text-slate-300/90 mt-0.5">{t.blurb}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
