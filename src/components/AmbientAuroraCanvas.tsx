"use client";

import React, { useEffect, useRef } from "react";

export function AmbientAuroraCanvas() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    let targetX = typeof window !== "undefined" ? window.innerWidth * 0.5 : 700;
    let targetY = typeof window !== "undefined" ? window.innerHeight * 0.35 : 400;
    let currentX = targetX;
    let currentY = targetY;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentX - 420}px, ${currentY - 420}px, 0)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Interactive Cursor-Tracking Liquid Specular Light */}
      <div
        ref={glowRef}
        className="w-[840px] h-[840px] rounded-full will-change-transform opacity-75 transition-opacity duration-700"
        style={{
          background:
            "radial-gradient(circle, rgba(20, 184, 166, 0.085) 0%, rgba(56, 189, 248, 0.045) 38%, transparent 70%)",
        }}
      />

      {/* Ambient Breathing Aurora Orbs */}
      <div
        className="absolute -top-44 -left-32 w-[620px] h-[620px] rounded-full blur-[120px] opacity-30 animate-aurora-slow-1"
        style={{
          background: "radial-gradient(circle, rgba(20, 184, 166, 0.22), transparent 72%)",
        }}
      />
      <div
        className="absolute top-[28%] -right-44 w-[560px] h-[560px] rounded-full blur-[130px] opacity-25 animate-aurora-slow-2"
        style={{
          background: "radial-gradient(circle, rgba(56, 189, 248, 0.20), transparent 72%)",
        }}
      />
      <div
        className="absolute -bottom-48 left-[24%] w-[680px] h-[680px] rounded-full blur-[140px] opacity-20 animate-aurora-slow-3"
        style={{
          background: "radial-gradient(circle, rgba(45, 212, 191, 0.16), transparent 72%)",
        }}
      />
    </div>
  );
}
