"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { LiquidGlassLogo } from "./liquid-glass-logo";

const APP_LOGO_SVG = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgZmlsbD0ibm9uZSI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImVjb25TdXBwbHlHcmFkIiB4MT0iMCUiIHkxPSIxMDAlIiB4Mj0iMTAwJSIgeTI9IjAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzM4YmRmOCIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9IiMxNGI4YTYiIC8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzEwYjk4MSIgLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImVjb25EZW1hbmRHcmFkIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2ZjYTVhNSIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSI0MCUiIHN0b3AtY29sb3I9IiNmNDNmNWUiIC8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2UxMWQ0OCIgLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImVjb25Hb2xkQ29vcmQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjZmVmMDhhIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iI2Y1OWUwYiIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZDk3NzA2IiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxyYWRpYWxHcmFkaWVudCBpZD0iZWNvblJhZGlhbEF1cmEiIGN4PSI1MCUiIGN5PSI1MCUiIHI9IjUwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxNGI4YTYiIHN0b3Atb3BhY2l0eT0iMC40IiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjYwJSIgc3RvcC1jb2xvcj0iIzBkOTQ4OCIgc3RvcC1vcGFjaXR5PSIwLjE1IiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwNDJmMmUiIHN0b3Atb3BhY2l0eT0iMCIgLz4KICAgIDwvcmFkaWFsR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxjaXJjbGUgY3g9IjI1NiIgY3k9IjI1NiIgcj0iMjQwIiBmaWxsPSJ1cmwoI2Vjb25SYWRpYWxBdXJhKSIgLz4KICA8Y2lyY2xlIGN4PSIyNTYiIGN5PSIyNTYiIHI9IjIzMCIgZmlsbD0iIzA3MTUxZSIgc3Ryb2tlPSJ1cmwoI2Vjb25TdXBwbHlHcmFkKSIgc3Ryb2tlLXdpZHRoPSI4IiBzdHJva2Utb3BhY2l0eT0iMC45NSIgLz4KICA8Y2lyY2xlIGN4PSIyNTYiIGN5PSIyNTYiIHI9IjIxNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMTRiOGE2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1kYXNoYXJyYXk9IjggOCIgc3Ryb2tlLW9wYWNpdHk9IjAuNjUiIC8+CiAgPGxpbmUgeDE9IjExMCIgeTE9IjExMCIgeDI9IjExMCIgeTI9IjQwMiIgc3Ryb2tlPSIjNDc1NTY5IiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgLz4KICA8bGluZSB4MT0iMTEwIiB5MT0iNDAyIiB4Mj0iNDAyIiB5Mj0iNDAyIiBzdHJva2U9IiM0NzU1NjkiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgogIDxwb2x5Z29uIHBvaW50cz0iMTEwLDk2IDEwNCwxMTIgMTE2LDExMiIgZmlsbD0iIzk0YTNiOCIgLz4KICA8cG9seWdvbiBwb2ludHM9IjQxNiw0MDIgNDAwLDM5NiA0MDAsNDA4IiBmaWxsPSIjOTRhM2I4IiAvPgogIDxsaW5lIHgxPSIxMjQiIHkxPSIzODgiIHgyPSIzODgiIHkyPSIxMjQiIHN0cm9rZT0idXJsKCNlY29uU3VwcGx5R3JhZCkiIHN0cm9rZS13aWR0aD0iOSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgogIDxsaW5lIHgxPSIxMjQiIHkxPSIxMjQiIHgyPSIzODgiIHkyPSIzODgiIHN0cm9rZT0idXJsKCNlY29uRGVtYW5kR3JhZCkiIHN0cm9rZS13aWR0aD0iOSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgogIDxjaXJjbGUgY3g9IjI1NiIgY3k9IjI1NiIgcj0iMzIiIGZpbGw9IiMwZjE3MmEiIHN0cm9rZT0idXJsKCNlY29uR29sZENvb3JkKSIgc3Ryb2tlLXdpZHRoPSIzIiAvPgogIDxjaXJjbGUgY3g9IjI1NiIgY3k9IjI1NiIgcj0iMTYiIGZpbGw9InVybCgjZWNvbkdvbGRDb29yZCkiIC8+CiAgPGNpcmNsZSBjeD0iMjU2IiBjeT0iMjU2IiByPSI4IiBmaWxsPSIjZmZmZmZmIiAvPgogIDxsaW5lIHgxPSIxMTAiIHkxPSIyNTYiIHgyPSIyNTYiIHkyPSIyNTYiIHN0cm9rZT0iI2Y1OWUwYiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtZGFzaGFycmF5PSI0IDQiIHN0cm9rZS1vcGFjaXR5PSIwLjgiIC8+CiAgPGxpbmUgeDE9IjI1NiIgeTE9IjI1NiIgeDI9IjI1NiIgeTI9IjQwMiIgc3Ryb2tlPSIjZjU5ZTBiIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1kYXNoYXJyYXk9IjQgNCIgc3Ryb2tlLW9wYWNpdHk9IjAuOCIgLz4KPC9zdmc+";

interface CinematicStartupIntroProps {
  isOpen?: boolean;
  onClose?: () => void;
  onComplete?: () => void;
}

export const CinematicStartupIntro: React.FC<CinematicStartupIntroProps> = ({
  isOpen = true,
  onClose,
  onComplete,
}) => {
  const isDismissingRef = useRef(false);

  const handleDismiss = useCallback(() => {
    if (isDismissingRef.current) return;
    isDismissingRef.current = true;
    onClose?.();
    onComplete?.();
  }, [onClose, onComplete]);

  // Automatic dismiss after the liquid glass simulation finishes (~4.5s)
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      handleDismiss();
    }, 4500);
    return () => clearTimeout(timer);
  }, [isOpen, handleDismiss]);

  // Keyboard shortcut listener (Space, Enter, Esc)
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleDismiss();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleDismiss]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.02,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      }}
      onClick={handleDismiss}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-4 select-none overflow-hidden cursor-pointer"
      style={{
        backgroundColor: "rgba(6, 4, 2, 0.82)",
        backdropFilter: "blur(28px) saturate(160%)",
        WebkitBackdropFilter: "blur(28px) saturate(160%)",
        backgroundImage: `radial-gradient(ellipse at 12% 10%, rgba(217, 119, 6, 0.18) 0%, transparent 48%), radial-gradient(ellipse at 88% 14%, rgba(180, 83, 9, 0.14) 0%, transparent 46%), radial-gradient(ellipse at 50% 92%, rgba(245, 158, 11, 0.12) 0%, transparent 58%), linear-gradient(180deg, rgba(6, 4, 2, 0.88) 0%, rgba(18, 11, 5, 0.76) 52%, rgba(6, 4, 2, 0.90) 100%)`,
      }}
    >
      {/* Center Liquid Glass Frosted Card */}
      <div
        className="relative w-full max-w-2xl sm:max-w-3xl rounded-3xl p-6 sm:p-10 flex flex-col items-center justify-center pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(24, 14, 5, 0.40) 50%, rgba(6, 4, 2, 0.60) 100%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(245, 158, 11, 0.18)",
          boxShadow:
            "0 24px 60px -12px rgba(0, 0, 0, 0.75), inset 0 1px 1px 0 rgba(255, 255, 255, 0.16), inset 0 -1px 1px 0 rgba(245, 158, 11, 0.08)",
        }}
      >
        <div className="w-full h-72 sm:h-80 flex items-center justify-center">
          <LiquidGlassLogo
            logo={APP_LOGO_SVG}
            mark="logo"
            text="IB ECONOMICS"
            ending="wordmark"
            fontSize={46}
            fontFamily="'Cinzel', 'Times New Roman', Georgia, serif"
            fontWeight={800}
            letterSpacing={0.08}
            theme="dark"
            logoColor="original"
            logoRelief={0.8}
            textColor="#fef3c7"
            tileColor="#180e05"
            background="transparent"
            depth={1.3}
            dispersion={1.15}
            relief={1.0}
            caustics={1.35}
            highlights={1.25}
            bloom={0.55}
            speed={1.0}
            loop={false}
            style={{ background: "transparent" }}
            className="w-full h-full"
          />
        </div>

        {/* Elegant Minimalist Wordmark Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 flex flex-col items-center gap-1.5 text-center"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-amber-300 uppercase">
              ANALYTICAL CODEX · IB DIPLOMA PROGRAMME
            </span>
          </div>
          <p className="text-xs text-amber-200/50 font-serif italic">
            Microeconomics · Macroeconomics · The Global Economy
          </p>
        </motion.div>
      </div>

      {/* Subtle Bottom Skip Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 inset-x-0 text-center pointer-events-none"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
          Click anywhere or press Space to continue
        </span>
      </motion.div>
    </motion.div>
  );
};

export default CinematicStartupIntro;
