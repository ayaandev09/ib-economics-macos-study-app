"use client";

import React, { useRef } from "react";
import { MoveHorizontal, RotateCcw } from "lucide-react";

const AD_ACCENT = "#9D00FF";
const AS_ACCENT = "#00A3FF";
const VIEW_WIDTH = 640;
const VIEW_HEIGHT = 380;

function adPath(shift: number) {
  return `M ${110 + shift} 80 L ${560 + shift} 300`;
}

function asPath(shift: number) {
  return `M ${110 + shift} 300 L ${560 + shift} 80`;
}

function equilibrium(ad: number, as: number) {
  const x = 335 + 0.5 * (ad + as);
  const y = 190 + 0.25 * (as - ad);
  return { x, y };
}

export function MarketDiagramEngine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const adPathRef = useRef<SVGPathElement>(null);
  const asPathRef = useRef<SVGPathElement>(null);
  const adHandleRef = useRef<SVGGElement>(null);
  const asHandleRef = useRef<SVGGElement>(null);
  const equilibriumRef = useRef<SVGCircleElement>(null);
  const equilibriumLabelRef = useRef<SVGTextElement>(null);
  const adReadoutRef = useRef<HTMLSpanElement>(null);
  const asReadoutRef = useRef<HTMLSpanElement>(null);

  const shifts = useRef({ ad: 0, as: 0 });
  const drag = useRef<{ curve: "ad" | "as"; startX: number; origin: number } | null>(null);
  const frame = useRef<number | null>(null);

  const paint = () => {
    const { ad, as } = shifts.current;
    const container = containerRef.current;
    if (container) {
      container.style.setProperty("--curve-shift", `${ad.toFixed(2)}px`);
      container.style.setProperty("--as-shift", `${as.toFixed(2)}px`);
    }

    adPathRef.current?.setAttribute("d", adPath(ad));
    asPathRef.current?.setAttribute("d", asPath(as));
    adHandleRef.current?.setAttribute("transform", `translate(${ad} 0)`);
    asHandleRef.current?.setAttribute("transform", `translate(${as} 0)`);

    const eq = equilibrium(ad, as);
    equilibriumRef.current?.setAttribute("cx", `${eq.x}`);
    equilibriumRef.current?.setAttribute("cy", `${eq.y}`);
    equilibriumLabelRef.current?.setAttribute("x", `${eq.x + 12}`);
    equilibriumLabelRef.current?.setAttribute("y", `${eq.y - 10}`);

    if (adReadoutRef.current) {
      adReadoutRef.current.textContent = `${ad >= 0 ? "+" : ""}${Math.round(ad)}`;
    }
    if (asReadoutRef.current) {
      asReadoutRef.current.textContent = `${as >= 0 ? "+" : ""}${Math.round(as)}`;
    }
  };

  const schedule = () => {
    if (frame.current !== null) return;
    frame.current = window.requestAnimationFrame(() => {
      frame.current = null;
      paint();
    });
  };

  const beginDrag = (curve: "ad" | "as") => (event: React.PointerEvent<SVGGElement>) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    drag.current = {
      curve,
      startX: event.clientX,
      origin: curve === "ad" ? shifts.current.ad : shifts.current.as,
    };
  };

  const moveDrag = (event: React.PointerEvent<SVGGElement>) => {
    if (!drag.current) return;
    const width = svgRef.current?.getBoundingClientRect().width || VIEW_WIDTH;
    const delta = ((event.clientX - drag.current.startX) * VIEW_WIDTH) / width;
    const next = Math.max(-60, Math.min(60, drag.current.origin + delta));
    if (drag.current.curve === "ad") {
      shifts.current.ad = next;
    } else {
      shifts.current.as = next;
    }
    schedule();
  };

  const endDrag = (event: React.PointerEvent<SVGGElement>) => {
    if (drag.current) {
      event.currentTarget.releasePointerCapture?.(event.pointerId);
    }
    drag.current = null;
  };

  const reset = () => {
    shifts.current = { ad: 0, as: 0 };
    schedule();
  };

  return (
    <div ref={containerRef} className="ultraThinMaterial rounded-3xl p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-white">Macro Market Diagram Engine</h3>
          <p className="text-[11px] text-slate-400">
            Drag the AD/AS handles. Native pointer events write{" "}
            <code style={{ color: AD_ACCENT }}>--curve-shift</code> and{" "}
            <code style={{ color: AS_ACCENT }}>--as-shift</code> straight to the DOM — zero React re-renders.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="rounded-xl border border-white/10 bg-black/40 px-3 py-1.5 font-mono text-[10px] text-slate-300">
            AD <span ref={adReadoutRef} style={{ color: AD_ACCENT }}>+0</span>
            <span className="mx-1 text-slate-600">·</span>
            AS <span ref={asReadoutRef} style={{ color: AS_ACCENT }}>+0</span>
          </div>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[10px] text-slate-300 transition hover:bg-white/10"
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/45">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          className="h-auto w-full touch-none select-none"
          role="img"
          aria-label="Interactive aggregate demand and aggregate supply market diagram"
        >
          <defs>
            <marker id="market-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="rgba(255,255,255,0.5)" />
            </marker>
            <linearGradient id="market-ad-glow" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={AD_ACCENT} />
              <stop offset="100%" stopColor="#C77DFF" />
            </linearGradient>
            <linearGradient id="market-as-glow" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor={AS_ACCENT} />
              <stop offset="100%" stopColor="#7DD3FC" />
            </linearGradient>
          </defs>

          {Array.from({ length: 9 }).map((_, index) => (
            <line
              key={`grid-v-${index}`}
              x1={70 + index * 60}
              y1={40}
              x2={70 + index * 60}
              y2={330}
              stroke="rgba(255,255,255,0.055)"
              strokeWidth="1"
            />
          ))}
          {Array.from({ length: 6 }).map((_, index) => (
            <line
              key={`grid-h-${index}`}
              x1={70}
              y1={50 + index * 56}
              x2={610}
              y2={50 + index * 56}
              stroke="rgba(255,255,255,0.055)"
              strokeWidth="1"
            />
          ))}

          <line x1={70} y1={330} x2={615} y2={330} stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" markerEnd="url(#market-arrow)" />
          <line x1={70} y1={330} x2={70} y2={35} stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" markerEnd="url(#market-arrow)" />

          <text x={590} y={352} fill="rgba(226,232,240,0.75)" fontSize="12" fontFamily="monospace">
            Real GDP (Y)
          </text>
          <text x={16} y={30} fill="rgba(226,232,240,0.75)" fontSize="12" fontFamily="monospace">
            PL
          </text>

          <path
            ref={adPathRef}
            d={adPath(0)}
            fill="none"
            stroke="url(#market-ad-glow)"
            strokeWidth="4"
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 7px ${AD_ACCENT})` }}
            className="market-curve-ad"
          />
          <path
            ref={asPathRef}
            d={asPath(0)}
            fill="none"
            stroke="url(#market-as-glow)"
            strokeWidth="4"
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 7px ${AS_ACCENT})` }}
            className="market-curve-as"
          />

          <circle
            ref={equilibriumRef}
            cx={335}
            cy={190}
            r="6"
            fill="rgba(255,255,255,0.95)"
            stroke={AD_ACCENT}
            strokeWidth="2"
            style={{ filter: "drop-shadow(0 0 8px rgba(157,0,255,0.9))" }}
          />
          <text ref={equilibriumLabelRef} x={347} y={180} fill="#e9d5ff" fontSize="11" fontFamily="monospace">
            E*
          </text>

          <g
            ref={adHandleRef}
            onPointerDown={beginDrag("ad")}
            onPointerMove={moveDrag}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            style={{ cursor: "ew-resize", touchAction: "none" }}
            transform="translate(0 0)"
          >
            <circle cx={560} cy={300} r="13" fill="rgba(157,0,255,0.18)" stroke={AD_ACCENT} strokeWidth="2" />
            <circle cx={560} cy={300} r="4" fill={AD_ACCENT} />
            <text x={580} y={304} fill="#e9d5ff" fontSize="10" fontFamily="monospace">
              AD
            </text>
          </g>

          <g
            ref={asHandleRef}
            onPointerDown={beginDrag("as")}
            onPointerMove={moveDrag}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            style={{ cursor: "ew-resize", touchAction: "none" }}
            transform="translate(0 0)"
          >
            <circle cx={560} cy={80} r="13" fill="rgba(0,163,255,0.18)" stroke={AS_ACCENT} strokeWidth="2" />
            <circle cx={560} cy={80} r="4" fill={AS_ACCENT} />
            <text x={580} y={84} fill="#bae6fd" fontSize="10" fontFamily="monospace">
              AS
            </text>
          </g>

          <g style={{ transform: "translateX(var(--curve-shift, 0px))" }}>
            <text x={90} y={330} fill={AD_ACCENT} fontSize="10" fontFamily="monospace">
              AD shift
            </text>
          </g>
        </svg>

        <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/55 px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-slate-400">
          <MoveHorizontal className="h-3 w-3" />
          Native pointer · CSS variable driven
        </div>
      </div>
    </div>
  );
}
