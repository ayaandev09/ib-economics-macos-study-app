"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Compass,
  Zap,
  TrendingUp,
  X,
  Layers
} from "lucide-react";
import { useStudyStore } from "@/store/useStudyStore";
import { ALL_TOPICS } from "@/data";
import { IBEconomicsAppLogo } from "./IBEconomicsAppLogo";

/**
 * IB Economics SL Dedicated Vector Logo Emblem
 */
const EconomicsLogoSVG: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width="100%"
    height="100%"
    preserveAspectRatio="xMidYMid meet"
    className={className}
    fill="none"
  >
    <defs>
      <radialGradient id="econGlow" cx="50%" cy="50%" r="65%">
        <stop offset="0%" stopColor="#0d9488" stopOpacity="0.4" />
        <stop offset="45%" stopColor="#6366f1" stopOpacity="0.18" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="supplyGrad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="50%" stopColor="#14b8a6" />
        <stop offset="100%" stopColor="#10b981" />
      </linearGradient>
      <linearGradient id="demandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f43f5e" />
        <stop offset="50%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#6366f1" />
      </linearGradient>
      <linearGradient id="goldCoord" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="60%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#b45309" />
      </linearGradient>
    </defs>

    {/* Ambient Gauge Shield */}
    <circle cx="256" cy="256" r="236" fill="url(#econGlow)" />
    <circle cx="256" cy="256" r="220" fill="#050c16" stroke="url(#supplyGrad)" strokeWidth="4" strokeOpacity="0.9" />
    <circle cx="256" cy="256" r="206" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="6 6" strokeOpacity="0.45" />

    {/* Precision Macroeconomic Grid Axes */}
    <g opacity="0.4">
      <line x1="140" y1="130" x2="140" y2="370" stroke="#94a3b8" strokeWidth="2" />
      <line x1="140" y1="370" x2="380" y2="370" stroke="#94a3b8" strokeWidth="2" />
      <line x1="140" y1="250" x2="260" y2="250" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 4" />
      <line x1="260" y1="250" x2="260" y2="370" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 4" />
    </g>

    {/* Supply & Demand Curves */}
    <g>
      <path d="M 160 150 Q 250 240, 360 350" fill="none" stroke="url(#demandGrad)" strokeWidth="8" strokeLinecap="round" />
      <path d="M 160 350 Q 250 240, 360 150" fill="none" stroke="url(#supplyGrad)" strokeWidth="8" strokeLinecap="round" />
      <polygon points="260,234 276,250 260,266 244,250" fill="#ffffff" stroke="url(#goldCoord)" strokeWidth="3" />
      <circle cx="260" cy="250" r="4" fill="#050c16" />
    </g>
  </svg>
);

interface CinematicStartupIntroProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

export const CinematicStartupIntro: React.FC<CinematicStartupIntroProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  const [currentTime, setCurrentTime] = useState("");
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [countdown, setCountdown] = useState(4);
  const [isDismissing, setIsDismissing] = useState(false);
  const isDismissingRef = useRef(false);

  const { completedTopics, activeTopicId, setActiveTopic } = useStudyStore();

  // 1. Live real-time digital clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // 2. Active study session timer
  useEffect(() => {
    const interval = setInterval(() => {
      setSessionSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDismiss = useCallback(() => {
    if (isDismissingRef.current) return;
    isDismissingRef.current = true;
    onClose();
    if (onComplete) onComplete();
  }, [onClose, onComplete]);

  // 3. Glancing countdown: 4.5s hold time to read key priorities
  useEffect(() => {
    if (!isOpen) return;
    isDismissingRef.current = false;
    let currentCount = 4;
    setCountdown(currentCount);

    const timer = setInterval(() => {
      currentCount -= 1;
      setCountdown(Math.max(0, currentCount));
      if (currentCount <= 0) {
        clearInterval(timer);
        handleDismiss();
      }
    }, 1100);

    return () => clearInterval(timer);
  }, [isOpen, handleDismiss]);

  // 4. Keyboard shortcuts: Space/Enter/Escape to instantly enter
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        handleDismiss();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, handleDismiss]);

  // Live syllabus metrics computation
  const totalTopicsCount = ALL_TOPICS.length;
  const completedCount = useMemo(() => {
    return Object.values(completedTopics).filter(Boolean).length;
  }, [completedTopics]);

  const masteryPercent =
    totalTopicsCount > 0
      ? Math.round((completedCount / totalTopicsCount) * 100)
      : 0;

  // Find the exact next topic STILL TO DO
  const nextTodoTopic = useMemo(() => {
    const uncompleted = ALL_TOPICS.find((t) => !completedTopics[t.id]);
    if (uncompleted) return uncompleted;
    return ALL_TOPICS.find((t) => t.id === activeTopicId) || ALL_TOPICS[0];
  }, [completedTopics, activeTopicId]);

  const remainingTopicsCount = totalTopicsCount - completedCount;
  const estimatedMins = remainingTopicsCount * 14;

  const formattedSessionTime = useMemo(() => {
    const mins = Math.floor(sessionSeconds / 60);
    const secs = sessionSeconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }, [sessionSeconds]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        filter: "blur(16px)",
        transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
      }}
      onClick={handleDismiss}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 select-none bg-[#020409] backdrop-blur-2xl overflow-hidden cursor-pointer"
      style={{
        background:
          "radial-gradient(circle at 50% 35%, rgba(13,148,136,0.22) 0%, rgba(2,4,9,0.98) 75%)",
      }}
    >
      {/* Dynamic Liquid Ambient Aura Blobs */}
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-teal-500/15 blur-[110px] pointer-events-none"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.14, 0.24, 0.14],
          x: [0, 24, 0],
          y: [0, 18, 0],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-cyan-500/12 blur-[110px] pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.12, 0.20, 0.12],
          x: [0, -24, 0],
          y: [0, -18, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Central Liquid Glass Briefing HUD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.90, y: 24, filter: "blur(12px)" }}
        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
        exit={{
          opacity: 0,
          scale: 1.04,
          y: -24,
          filter: "blur(20px)",
          transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
        }}
        transition={{
          type: "spring",
          stiffness: 280,
          damping: 26,
          mass: 0.8,
        }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg p-6 sm:p-7 rounded-[2rem] border border-white/12 ring-1 ring-inset ring-white/10 bg-white/[0.04] dark:bg-black/55 backdrop-blur-2xl shadow-[0_32px_80px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_0_24px_rgba(255,255,255,0.03)] flex flex-col text-left overflow-hidden cursor-default"
      >
        {/* Specular Ambient Reflection Sheen */}
        <div className="absolute inset-x-0 top-0 h-32 rounded-t-[2rem] bg-gradient-to-b from-white/[0.08] via-white/[0.02] to-transparent pointer-events-none" />

        {/* Authentic Liquid Glass Logo Showcase — 120 FPS Metal Accelerated */}
        <div className="w-full h-40 sm:h-48 rounded-2xl overflow-hidden relative mb-4 bg-gradient-to-b from-black/90 via-black/75 to-[#051722] border border-teal-400/40 shadow-2xl flex items-center justify-center p-4 relative">
          {/* Rotating Ambient Caustic Liquid Halo */}
          <div
            className="absolute w-60 h-60 rounded-full pointer-events-none liquid-caustic-halo"
            style={{
              background:
                "radial-gradient(circle, rgba(20,184,166,0.35) 0%, rgba(244,63,94,0.18) 45%, transparent 70%)",
            }}
          />

          {/* Liquid Glass Breathing Emblem */}
          <div className="w-28 h-28 sm:w-32 sm:h-32 relative z-10 flex items-center justify-center liquid-logo-float">
            <IBEconomicsAppLogo className="w-full h-full object-contain filter drop-shadow-[0_0_32px_rgba(20,184,166,0.65)]" />

            {/* Slow Sweeping Liquid Glass Refraction Sheen Beam */}
            <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
              <div
                className="w-full h-full liquid-glass-sheen"
                style={{
                  background:
                    "linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.55) 50%, transparent 80%)",
                }}
              />
            </div>
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-teal-400 animate-ping pointer-events-none" />
          </div>
        </div>

        {/* Header: Logo, App Title & Live Telemetry Badge */}
        <div className="flex items-center justify-between gap-3 mb-5 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-teal-500/15 border border-teal-400/35 p-1.5 flex items-center justify-center shrink-0 shadow-inner">
              <EconomicsLogoSVG className="w-full h-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold tracking-widest text-teal-400 uppercase">
                  EQUILIBRIUM // IB ECON
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
                IB Economics SL Briefing
              </h1>
            </div>
          </div>

          {/* Live Continuous Sync Beacon */}
          <div className="flex flex-col items-end shrink-0">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-[10px] font-mono text-emerald-300 font-semibold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              LIVE SYNC
            </div>
            <span className="text-[10px] font-mono text-slate-400 mt-1">
              {currentTime}
            </span>
          </div>
        </div>

        {/* Priority Card: Next Focus / What Still Needs To Be Done */}
        <div className="p-4 rounded-2xl bg-teal-950/40 border border-teal-400/30 mb-4 relative overflow-hidden backdrop-blur-md">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider text-teal-300">
              <Compass className="w-3 h-3 text-teal-400" /> Up Next • Still To Do
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              {remainingTopicsCount} topics remaining
            </span>
          </div>
          <h2 className="text-sm sm:text-base font-bold text-white mb-1 line-clamp-1">
            {nextTodoTopic?.displayCode}: {nextTodoTopic?.title}
          </h2>
          <p className="text-xs text-teal-100/70 line-clamp-2 font-sans mb-3">
            {nextTodoTopic?.summary || "Continue through next core syllabus theoretical milestone."}
          </p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              if (nextTodoTopic) setActiveTopic(nextTodoTopic.id);
              handleDismiss();
            }}
            className="w-full py-2 px-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
          >
            <span>Jump Directly to Topic</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>
        </div>

        {/* Bento Status Grid: Syllabus Progress & Study Pulse */}
        <div className="grid grid-cols-2 gap-3 mb-4 text-xs font-mono">
          {/* Progress Box */}
          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between backdrop-blur-md">
            <div className="flex items-center justify-between text-slate-400 text-[10px] mb-2">
              <span>MASTERY</span>
              <span className="text-teal-300 font-bold">{masteryPercent}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden mb-2">
              <div
                className="h-full rounded-full bg-gradient-to-r from-teal-400 to-emerald-400 transition-all duration-500"
                style={{ width: `${masteryPercent}%` }}
              />
            </div>
            <span className="text-slate-300 text-[11px] font-bold">
              {completedCount} / {totalTopicsCount} Done
            </span>
          </div>

          {/* Time & Session Box */}
          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between backdrop-blur-md">
            <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
              <span>PACE</span>
              <span className="text-cyan-300">~{estimatedMins}m left</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-200 text-[11px] font-semibold my-1">
              <Clock className="w-3.5 h-3.5 text-teal-400" />
              <span>Session: {formattedSessionTime}</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold">
              ● Nominal 120 FPS
            </span>
          </div>
        </div>

        {/* High-Yield Recall Anchor */}
        <div className="px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 mb-4 text-[11px] backdrop-blur-md">
          <span className="text-amber-300 font-bold font-mono text-[10px] uppercase block mb-0.5">
            Key Exam Anchor
          </span>
          <p className="text-slate-300 italic font-serif leading-snug line-clamp-2">
            “PED = %ΔQd / %ΔP • Always evaluate consumer vs producer burden on indirect taxes.”
          </p>
        </div>

        {/* Footer: Countdown & Skip Action */}
        <div className="flex items-center justify-between pt-1 border-t border-white/10 text-xs">
          <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
            <span>Opening in</span>
            <span className="text-teal-300 font-bold">{countdown}s</span>
            <span className="hidden sm:inline text-slate-500">• (Space to launch)</span>
          </span>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleDismiss}
            className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-colors flex items-center gap-1.5 cursor-pointer border border-white/10 shadow-sm"
          >
            <span>Enter Now</span>
            <ArrowRight className="w-3 h-3" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};
