"use client";

import React, { useState } from "react";
import { SYLLABUS_UNITS, ALL_TOPICS } from "@/data";
import { useStudyStore } from "@/store/useStudyStore";

export function SceneSwitcher() {
  const { activeTopicId, setActiveTopic, completedTopics } = useStudyStore();
  const active = ALL_TOPICS.find((t) => t.id === activeTopicId) ?? ALL_TOPICS[0];
  const [unitId, setUnitId] = useState<string>(
    SYLLABUS_UNITS.find((u) => u.topics.some((t) => t.id === active.id))?.id ?? SYLLABUS_UNITS[0].id,
  );
  const currentUnit = SYLLABUS_UNITS.find((u) => u.id === unitId) ?? SYLLABUS_UNITS[0];

  return (
    <div className="glass-tint tint-amber rounded-3xl p-4 mb-4 space-y-3">
      <div className="flex flex-wrap gap-1.5">
        {SYLLABUS_UNITS.map((u) => (
          <button
            key={u.id}
            onClick={() => setUnitId(u.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
              u.id === unitId ? "bg-amber-500 text-slate-950" : "bg-white/8 text-slate-300 hover:bg-white/15"
            }`}
          >
            {u.badge || `Unit ${u.unitNumber}`}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {currentUnit.topics.map((t) => {
          const isActive = t.id === active.id;
          const done = !!completedTopics[t.id];
          return (
            <button
              key={t.id}
              onClick={() => setActiveTopic(t.id)}
              title={t.title}
              className={`px-3 py-1.5 rounded-xl text-xs cursor-pointer border transition-colors ${
                isActive
                  ? "bg-amber-400/25 border-amber-300/70 text-white font-semibold"
                  : done
                    ? "bg-emerald-500/15 border-emerald-400/30 text-emerald-100"
                    : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/12"
              }`}
            >
              {t.displayCode}
            </button>
          );
        })}
      </div>
      <p className="text-xs text-slate-400 truncate">{active.title}</p>
    </div>
  );
}
