"use client";

import React, { useState } from "react";
import { DIAGRAMS_DOSSIER, DiagramDossier } from "@/data";
import { Sparkles, Layers, Sliders } from "lucide-react";

interface InteractiveDiagramProps {
  diagramId: string;
  className?: string;
  compact?: boolean;
}

const InteractiveDiagramComponent: React.FC<InteractiveDiagramProps> = ({
  diagramId,
  className = "",
  compact = false,
}) => {
  const dossier: DiagramDossier | undefined = DIAGRAMS_DOSSIER.find(
    (d) => d.id === diagramId
  );

  const [activeControl, setActiveControl] = useState<string>("default");
  const [highlightDWL, setHighlightDWL] = useState<boolean>(true);
  const [showSteps, setShowSteps] = useState<boolean>(false);

  if (!dossier) {
    return (
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 text-center text-xs text-slate-400">
        Diagram preview for &apos;{diagramId}&apos; not found in dossier.
      </div>
    );
  }

  // Diagrams that render their own custom multi-axis or flowchart canvases
  const isCustomAxes =
    diagramId === "diag-circular-flow" ||
    diagramId === "diag-poverty-cycle" ||
    diagramId === "diag-ped-tr";

  // Render specialized vector graphics based on diagramId
  const renderSvgContent = () => {
    switch (diagramId) {
      // ==========================================
      // D-01: Production Possibility Frontier
      // ==========================================
      case "diag-ppf": {
        const isShifted = activeControl === "show-shift";
        const isInefficient = activeControl === "toggle-inefficiency";
        return (
          <g>
            <path
              d="M 60,340 L 60,110 Q 240,130 430,340 Z"
              fill="rgba(56, 189, 248, 0.08)"
            />
            {/* PPC 1 */}
            <path
              d="M 60,110 Q 240,130 430,340"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="3.5"
            />
            <text x="435" y="335" fill="#38bdf8" fontSize="12" fontWeight="700">
              PPC 1
            </text>

            {/* Outward Shift PPC 2 - Wide & Highly Evident */}
            {isShifted && (
              <g>
                <path
                  d="M 60,50 Q 320,65 540,340"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="4"
                  strokeDasharray="6,4"
                />
                <text x="545" y="335" fill="#10b981" fontSize="12" fontWeight="700">
                  PPC 2
                </text>
                {/* Prominent outward shift arrows */}
                <line x1="240" y1="180" x2="330" y2="135" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrow-green)" />
                <line x1="340" y1="270" x2="430" y2="235" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrow-green)" />
                <rect x="230" y="45" width="260" height="26" rx="6" fill="rgba(16, 185, 129, 0.25)" stroke="#10b981" />
                <text x="360" y="62" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
                  Potential Growth: FOP Quantity/Quality ↑ (LRAS ↑)
                </text>
              </g>
            )}

            {/* Point A */}
            <circle cx="260" cy="205" r="5" fill="#38bdf8" />
            <text x="270" y="200" fill="#ffffff" fontSize="11" fontWeight="bold">
              A (Productive Efficiency)
            </text>

            {/* Point B */}
            <circle
              cx="160"
              cy="275"
              r={isInefficient ? 7 : 5}
              fill={isInefficient ? "#f59e0b" : "#94a3b8"}
              stroke={isInefficient ? "#ffffff" : "none"}
              strokeWidth="2"
            />
            <text x="175" y="280" fill={isInefficient ? "#fbbf24" : "#94a3b8"} fontSize="11" fontWeight="bold">
              B (Unemployed Resources)
            </text>

            {/* Point C */}
            <circle cx="430" cy="130" r="5" fill="#f43f5e" />
            <text x="440" y="125" fill="#f43f5e" fontSize="11" fontWeight="bold">
              C (Unattainable / Scarcity)
            </text>
          </g>
        );
      }

      // ==========================================
      // D-02: Circular Flow of Income (Open Macro)
      // ==========================================
      case "diag-circular-flow": {
        const isOpen = activeControl === "toggle-open-economy";
        const isInjection = activeControl === "simulate-injection";
        return (
          <g>
            {/* Background Container Box */}
            <rect x="25" y="25" width="550" height="350" rx="16" fill="rgba(15, 23, 42, 0.6)" stroke="rgba(255, 255, 255, 0.08)" />

            {/* Households Block (Left) */}
            <rect x="45" y="135" width="125" height="95" rx="14" fill="rgba(14, 165, 233, 0.15)" stroke="#0ea5e9" strokeWidth="2.5" />
            <text x="107" y="168" fill="#38bdf8" fontSize="13" fontWeight="800" textAnchor="middle">HOUSEHOLDS</text>
            <text x="107" y="186" fill="#94a3b8" fontSize="10" textAnchor="middle">Factor Owners</text>
            <text x="107" y="201" fill="#94a3b8" fontSize="10" textAnchor="middle">&amp; Consumers</text>

            {/* Firms Block (Right) */}
            <rect x="430" y="135" width="125" height="95" rx="14" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" strokeWidth="2.5" />
            <text x="492" y="168" fill="#34d399" fontSize="13" fontWeight="800" textAnchor="middle">FIRMS</text>
            <text x="492" y="186" fill="#94a3b8" fontSize="10" textAnchor="middle">Producers of</text>
            <text x="492" y="201" fill="#94a3b8" fontSize="10" textAnchor="middle">Goods &amp; Services</text>

            {/* Top Outer Loop: Factors of Production */}
            <path d="M 107,135 C 107,48 492,48 492,135" fill="none" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrow-cyan)" />
            <rect x="195" y="44" width="210" height="22" rx="6" fill="#090d1a" stroke="#38bdf8" strokeWidth="1" />
            <text x="300" y="59" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">
              Factors of Production (Land, Labour, Capital) →
            </text>

            {/* Top Inner Loop: Factor Incomes */}
            <path d="M 465,135 C 465,80 135,80 135,135" fill="none" stroke="#a855f7" strokeWidth="2.5" markerEnd="url(#arrow-purple)" />
            <rect x="185" y="76" width="230" height="22" rx="6" fill="#090d1a" stroke="#a855f7" strokeWidth="1" />
            <text x="300" y="91" fill="#c084fc" fontSize="10" fontWeight="bold" textAnchor="middle">
              ← Factor Incomes (Wages, Rent, Interest, Profit)
            </text>

            {/* Bottom Inner Loop: Goods & Services */}
            <path d="M 465,230 C 465,285 135,285 135,230" fill="none" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrow-green)" />
            <rect x="220" y="260" width="160" height="22" rx="6" fill="#090d1a" stroke="#10b981" strokeWidth="1" />
            <text x="300" y="275" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">
              ← Goods &amp; Services Flow
            </text>

            {/* Bottom Outer Loop: Consumer Expenditure C */}
            <path d="M 107,230 C 107,315 492,315 492,230" fill="none" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#arrow-amber)" />
            <rect x="195" y="304" width="210" height="22" rx="6" fill="#090d1a" stroke="#f59e0b" strokeWidth="1" />
            <text x="300" y="319" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">
              Consumer Expenditure (C) →
            </text>

            {/* Center Sectors: Financial, Government, Foreign */}
            <g>
              <rect x="235" y="115" width="130" height="32" rx="8" fill="rgba(30, 41, 59, 0.9)" stroke={isOpen ? "#38bdf8" : "rgba(255,255,255,0.15)"} />
              <text x="300" y="135" fill="#e2e8f0" fontSize="11" fontWeight="bold" textAnchor="middle">Financial Sector</text>

              <rect x="235" y="157" width="130" height="32" rx="8" fill="rgba(30, 41, 59, 0.9)" stroke={isOpen ? "#a855f7" : "rgba(255,255,255,0.15)"} />
              <text x="300" y="177" fill="#e2e8f0" fontSize="11" fontWeight="bold" textAnchor="middle">Government</text>

              <rect x="235" y="199" width="130" height="32" rx="8" fill="rgba(30, 41, 59, 0.9)" stroke={isOpen ? "#10b981" : "rgba(255,255,255,0.15)"} />
              <text x="300" y="219" fill="#e2e8f0" fontSize="11" fontWeight="bold" textAnchor="middle">Foreign Sector</text>

              {/* Leakages S, T, M */}
              <line x1="235" y1="131" x2="175" y2="131" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3,3" markerEnd="url(#arrow-rose)" />
              <line x1="235" y1="173" x2="175" y2="173" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3,3" markerEnd="url(#arrow-rose)" />
              <line x1="235" y1="215" x2="175" y2="215" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3,3" markerEnd="url(#arrow-rose)" />
              <text x="205" y="125" fill="#f43f5e" fontSize="9" fontWeight="bold" textAnchor="middle">S (Savings)</text>
              <text x="205" y="167" fill="#f43f5e" fontSize="9" fontWeight="bold" textAnchor="middle">T (Taxes)</text>
              <text x="205" y="209" fill="#f43f5e" fontSize="9" fontWeight="bold" textAnchor="middle">M (Imports)</text>

              {/* Injections I, G, X */}
              <line x1="365" y1="131" x2="425" y2="131" stroke="#10b981" strokeWidth={isInjection ? "3.5" : "2"} strokeDasharray={isInjection ? "none" : "3,3"} markerEnd="url(#arrow-green)" />
              <line x1="365" y1="173" x2="425" y2="173" stroke="#10b981" strokeWidth={isInjection ? "3.5" : "2"} strokeDasharray={isInjection ? "none" : "3,3"} markerEnd="url(#arrow-green)" />
              <line x1="365" y1="215" x2="425" y2="215" stroke="#10b981" strokeWidth={isInjection ? "3.5" : "2"} strokeDasharray={isInjection ? "none" : "3,3"} markerEnd="url(#arrow-green)" />
              <text x="395" y="125" fill="#10b981" fontSize="9" fontWeight="bold" textAnchor="middle">I (Investment)</text>
              <text x="395" y="167" fill="#10b981" fontSize="9" fontWeight="bold" textAnchor="middle">G (Gov Spending)</text>
              <text x="395" y="209" fill="#10b981" fontSize="9" fontWeight="bold" textAnchor="middle">X (Exports)</text>
            </g>

            {/* Bottom Status Ribbon */}
            <rect x="70" y="340" width="460" height="26" rx="8" fill={isInjection ? "rgba(16, 185, 129, 0.25)" : "rgba(30, 41, 59, 0.85)"} stroke={isInjection ? "#10b981" : "rgba(255,255,255,0.1)"} />
            <text x="300" y="357" fill={isInjection ? "#34d399" : "#e2e8f0"} fontSize="10.5" fontWeight="bold" textAnchor="middle">
              {isInjection
                ? "✓ Injections (I + G + X) > Leakages (S + T + M) ⇒ National Income Expands (Y ↑)"
                : "Macro Equilibrium: Injections (I + G + X) = Leakages (S + T + M)"}
            </text>
          </g>
        );
      }

      // ==========================================
      // D-03: Market Equilibrium & Surpluses
      // ==========================================
      case "diag-market-equilibrium": {
        const isShortage = activeControl === "toggle-shortage";
        const isSurplus = activeControl === "toggle-surplus";
        return (
          <g>
            {/* Consumer Surplus Triangle */}
            <polygon points="60,80 290,200 60,200" fill="rgba(14, 165, 233, 0.25)" stroke="#0ea5e9" strokeWidth="1" />
            <text x="120" y="155" fill="#38bdf8" fontSize="12" fontWeight="bold">Consumer Surplus</text>

            {/* Producer Surplus Triangle */}
            <polygon points="60,320 290,200 60,200" fill="rgba(16, 185, 129, 0.25)" stroke="#10b981" strokeWidth="1" />
            <text x="120" y="255" fill="#34d399" fontSize="12" fontWeight="bold">Producer Surplus</text>

            {/* Demand Line */}
            <line x1="60" y1="80" x2="520" y2="320" stroke="#0ea5e9" strokeWidth="3.5" />
            <text x="525" y="325" fill="#0ea5e9" fontSize="13" fontWeight="bold">D (MB)</text>

            {/* Supply Line */}
            <line x1="60" y1="320" x2="520" y2="80" stroke="#10b981" strokeWidth="3.5" />
            <text x="525" y="85" fill="#10b981" fontSize="13" fontWeight="bold">S (MC)</text>

            {/* Equilibrium Coordinates */}
            <line x1="290" y1="200" x2="290" y2="340" stroke="#94a3b8" strokeDasharray="4,4" strokeWidth="1.5" />
            <line x1="60" y1="200" x2="290" y2="200" stroke="#94a3b8" strokeDasharray="4,4" strokeWidth="1.5" />
            <circle cx="290" cy="200" r="5" fill="#ffffff" />
            <text x="300" y="195" fill="#ffffff" fontSize="11" fontWeight="bold">E (Pe, Qe)</text>
            <text x="38" y="204" fill="#94a3b8" fontSize="12" fontWeight="bold">Pe</text>
            <text x="285" y="358" fill="#94a3b8" fontSize="12" fontWeight="bold">Qe</text>

            {/* Allocative Efficiency Tag */}
            <rect x="330" y="35" width="220" height="26" rx="6" fill="rgba(15, 23, 42, 0.85)" stroke="#38bdf8" />
            <text x="440" y="52" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
              MB = MC (Allocative Efficiency)
            </text>

            {/* Shortage Mode */}
            {isShortage && (
              <g>
                <line x1="60" y1="265" x2="440" y2="265" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="5,3" />
                <text x="28" y="270" fill="#fbbf24" fontSize="11" fontWeight="bold">P_low</text>
                <circle cx="180" cy="265" r="5" fill="#10b981" />
                <circle cx="410" cy="265" r="5" fill="#0ea5e9" />
                <line x1="180" y1="280" x2="410" y2="280" stroke="#fbbf24" strokeWidth="2.5" markerEnd="url(#arrow-amber)" markerStart="url(#arrow-amber)" />
                <text x="295" y="298" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">
                  Shortage: Excess Demand (Qd &gt; Qs) → Price Upward Pressure
                </text>
              </g>
            )}

            {/* Surplus Mode */}
            {isSurplus && (
              <g>
                <line x1="60" y1="135" x2="440" y2="135" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="5,3" />
                <text x="25" y="140" fill="#f87171" fontSize="11" fontWeight="bold">P_high</text>
                <circle cx="170" cy="135" r="5" fill="#0ea5e9" />
                <circle cx="410" cy="135" r="5" fill="#10b981" />
                <line x1="170" y1="120" x2="410" y2="120" stroke="#f43f5e" strokeWidth="2.5" markerEnd="url(#arrow-rose)" markerStart="url(#arrow-rose)" />
                <text x="290" y="112" fill="#f87171" fontSize="11" fontWeight="bold" textAnchor="middle">
                  Surplus: Excess Supply (Qs &gt; Qd) → Price Downward Pressure
                </text>
              </g>
            )}
          </g>
        );
      }

      // ==========================================
      // D-04: Demand Shifts vs Movements Along
      // ==========================================
      case "diag-demand-shifts": {
        const isRight = activeControl === "shift-right";
        const isLeft = activeControl === "shift-left";
        return (
          <g>
            {/* Supply Line for market context */}
            <line x1="60" y1="330" x2="480" y2="80" stroke="#475569" strokeWidth="2.5" strokeDasharray="4,4" />
            <text x="485" y="85" fill="#64748b" fontSize="11">S (Supply)</text>

            {/* Baseline Demand D1 */}
            <line x1="90" y1="80" x2="440" y2="335" stroke="#38bdf8" strokeWidth="3.5" />
            <text x="445" y="335" fill="#38bdf8" fontSize="12" fontWeight="bold">D1</text>

            {/* Initial Equilibrium E1 */}
            <circle cx="265" cy="205" r="5" fill="#ffffff" />
            <line x1="265" y1="205" x2="265" y2="340" stroke="#94a3b8" strokeDasharray="4,4" />
            <line x1="60" y1="205" x2="265" y2="205" stroke="#94a3b8" strokeDasharray="4,4" />
            <text x="42" y="209" fill="#94a3b8" fontSize="11" fontWeight="bold">P1</text>
            <text x="260" y="358" fill="#94a3b8" fontSize="11" fontWeight="bold">Q1</text>

            {/* Movement Along Curve default indicators */}
            {!isRight && !isLeft && (
              <g>
                <circle cx="170" cy="140" r="4" fill="#38bdf8" />
                <circle cx="360" cy="275" r="4" fill="#38bdf8" />
                <path d="M 180,150 L 340,260" fill="none" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrow-cyan)" />
                <rect x="80" y="40" width="280" height="26" rx="6" fill="rgba(15, 23, 42, 0.85)" stroke="#38bdf8" />
                <text x="220" y="57" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                  Price Change = Movement Along Demand
                </text>
              </g>
            )}

            {/* Prominent Rightward Shift D2 */}
            {isRight && (
              <g>
                <line x1="210" y1="80" x2="550" y2="325" stroke="#a855f7" strokeWidth="4" />
                <text x="555" y="325" fill="#a855f7" fontSize="12" fontWeight="bold">D2 (Right)</text>
                {/* Large Shift Arrows */}
                <line x1="220" y1="130" x2="310" y2="130" stroke="#a855f7" strokeWidth="3" markerEnd="url(#arrow-purple)" />
                <line x1="330" y1="210" x2="420" y2="210" stroke="#a855f7" strokeWidth="3" markerEnd="url(#arrow-purple)" />
                {/* New Equilibrium E2 */}
                <circle cx="360" cy="145" r="6" fill="#a855f7" stroke="#ffffff" strokeWidth="2" />
                <line x1="360" y1="145" x2="360" y2="340" stroke="#a855f7" strokeDasharray="4,4" />
                <line x1="60" y1="145" x2="360" y2="145" stroke="#a855f7" strokeDasharray="4,4" />
                <text x="38" y="149" fill="#c084fc" fontSize="11" fontWeight="bold">P2</text>
                <text x="355" y="358" fill="#c084fc" fontSize="11" fontWeight="bold">Q2</text>
                <rect x="140" y="40" width="380" height="26" rx="6" fill="rgba(168, 85, 247, 0.25)" stroke="#a855f7" />
                <text x="330" y="57" fill="#c084fc" fontSize="11" fontWeight="bold" textAnchor="middle">
                  Demand Shifts Right: PASIFIC (Income ↑, Prefs ↑, Pop ↑, Sub Price ↑)
                </text>
              </g>
            )}

            {/* Prominent Leftward Shift D3 */}
            {isLeft && (
              <g>
                <line x1="60" y1="130" x2="330" y2="335" stroke="#f43f5e" strokeWidth="4" />
                <text x="335" y="335" fill="#f43f5e" fontSize="12" fontWeight="bold">D3 (Left)</text>
                {/* Large Shift Arrows */}
                <line x1="240" y1="210" x2="160" y2="210" stroke="#f43f5e" strokeWidth="3" markerEnd="url(#arrow-rose)" />
                <line x1="320" y1="270" x2="240" y2="270" stroke="#f43f5e" strokeWidth="3" markerEnd="url(#arrow-rose)" />
                {/* New Equilibrium E3 */}
                <circle cx="180" cy="265" r="6" fill="#f43f5e" stroke="#ffffff" strokeWidth="2" />
                <line x1="180" y1="265" x2="180" y2="340" stroke="#f43f5e" strokeDasharray="4,4" />
                <line x1="60" y1="265" x2="180" y2="265" stroke="#f43f5e" strokeDasharray="4,4" />
                <text x="38" y="270" fill="#f87171" fontSize="11" fontWeight="bold">P3</text>
                <text x="175" y="358" fill="#f87171" fontSize="11" fontWeight="bold">Q3</text>
                <rect x="140" y="40" width="380" height="26" rx="6" fill="rgba(244, 63, 94, 0.25)" stroke="#f43f5e" />
                <text x="330" y="57" fill="#f87171" fontSize="11" fontWeight="bold" textAnchor="middle">
                  Demand Shifts Left: Income ↓ (normal good), Complement Price ↑
                </text>
              </g>
            )}
          </g>
        );
      }

      // ==========================================
      // D-05: Supply Shifts vs Movements Along
      // ==========================================
      case "diag-supply-shifts": {
        const isRight = activeControl === "shift-right";
        const isLeft = activeControl === "shift-left";
        return (
          <g>
            {/* Demand Line for context */}
            <line x1="80" y1="80" x2="480" y2="330" stroke="#475569" strokeWidth="2.5" strokeDasharray="4,4" />
            <text x="485" y="335" fill="#64748b" fontSize="11">D (Demand)</text>

            {/* Baseline Supply S1 */}
            <line x1="80" y1="330" x2="450" y2="80" stroke="#10b981" strokeWidth="3.5" />
            <text x="455" y="85" fill="#10b981" fontSize="12" fontWeight="bold">S1</text>

            {/* Initial Equilibrium E1 */}
            <circle cx="265" cy="205" r="5" fill="#ffffff" />
            <line x1="265" y1="205" x2="265" y2="340" stroke="#94a3b8" strokeDasharray="4,4" />
            <line x1="60" y1="205" x2="265" y2="205" stroke="#94a3b8" strokeDasharray="4,4" />
            <text x="42" y="209" fill="#94a3b8" fontSize="11" fontWeight="bold">P1</text>
            <text x="260" y="358" fill="#94a3b8" fontSize="11" fontWeight="bold">Q1</text>

            {/* Default Movement Along Guide */}
            {!isRight && !isLeft && (
              <g>
                <circle cx="170" cy="265" r="4" fill="#10b981" />
                <circle cx="360" cy="140" r="4" fill="#10b981" />
                <path d="M 180,255 L 340,150" fill="none" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrow-green)" />
                <rect x="80" y="40" width="280" height="26" rx="6" fill="rgba(15, 23, 42, 0.85)" stroke="#10b981" />
                <text x="220" y="57" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
                  Price Change = Movement Along Supply
                </text>
              </g>
            )}

            {/* Prominent Supply Shift Right S2 */}
            {isRight && (
              <g>
                <line x1="190" y1="330" x2="550" y2="85" stroke="#06b6d4" strokeWidth="4" />
                <text x="555" y="90" fill="#06b6d4" fontSize="12" fontWeight="bold">S2 (Right)</text>
                {/* Large Shift Arrows */}
                <line x1="240" y1="220" x2="330" y2="220" stroke="#06b6d4" strokeWidth="3" markerEnd="url(#arrow-cyan)" />
                <line x1="340" y1="150" x2="430" y2="150" stroke="#06b6d4" strokeWidth="3" markerEnd="url(#arrow-cyan)" />
                {/* New Equilibrium E2 */}
                <circle cx="360" cy="265" r="6" fill="#06b6d4" stroke="#ffffff" strokeWidth="2" />
                <line x1="360" y1="265" x2="360" y2="340" stroke="#06b6d4" strokeDasharray="4,4" />
                <line x1="60" y1="265" x2="360" y2="265" stroke="#06b6d4" strokeDasharray="4,4" />
                <text x="38" y="270" fill="#22d3ee" fontSize="11" fontWeight="bold">P2</text>
                <text x="355" y="358" fill="#22d3ee" fontSize="11" fontWeight="bold">Q2</text>
                <rect x="140" y="40" width="380" height="26" rx="6" fill="rgba(6, 182, 212, 0.25)" stroke="#06b6d4" />
                <text x="330" y="57" fill="#22d3ee" fontSize="11" fontWeight="bold" textAnchor="middle">
                  Supply Shifts Right: PINTS WC (Tech ↑, Factor Costs ↓, Subsidy)
                </text>
              </g>
            )}

            {/* Prominent Supply Shift Left S3 */}
            {isLeft && (
              <g>
                <line x1="60" y1="270" x2="360" y2="60" stroke="#f59e0b" strokeWidth="4" />
                <text x="365" y="65" fill="#f59e0b" fontSize="12" fontWeight="bold">S3 (Left)</text>
                {/* Large Shift Arrows */}
                <line x1="280" y1="190" x2="200" y2="190" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow-amber)" />
                <line x1="360" y1="130" x2="280" y2="130" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow-amber)" />
                {/* New Equilibrium E3 */}
                <circle cx="180" cy="145" r="6" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                <line x1="180" y1="145" x2="180" y2="340" stroke="#f59e0b" strokeDasharray="4,4" />
                <line x1="60" y1="145" x2="180" y2="145" stroke="#f59e0b" strokeDasharray="4,4" />
                <text x="38" y="149" fill="#fbbf24" fontSize="11" fontWeight="bold">P3</text>
                <text x="175" y="358" fill="#fbbf24" fontSize="11" fontWeight="bold">Q3</text>
                <rect x="140" y="40" width="380" height="26" rx="6" fill="rgba(245, 158, 11, 0.25)" stroke="#f59e0b" />
                <text x="330" y="57" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">
                  Supply Shifts Left: Wages/Energy Costs ↑, Supply Shock, Indirect Tax
                </text>
              </g>
            )}
          </g>
        );
      }

      // ==========================================
      // D-06: PED & TOTAL REVENUE (COMPLETE OVERHAUL)
      // Canonical IB Economics Two-Tier Aligned Model
      // ==========================================
      case "diag-ped-tr": {
        const isElasticCut = activeControl === "toggle-price-cut-elastic";
        const isInelasticCut = activeControl === "toggle-price-cut-inelastic";
        return (
          <g>
            {/* -------------------------------------------------------------
                UPPER GRAPH: Linear Demand Curve & Changing PED Regimes
                ------------------------------------------------------------- */}
            {/* Upper Y-axis: Price */}
            <line x1="60" y1="190" x2="60" y2="35" stroke="#94a3b8" strokeWidth="2.5" markerEnd="url(#arrow-axis)" />
            <text x="60" y="24" fill="#e2e8f0" fontSize="11" fontWeight="bold" textAnchor="start">Price (P)</text>

            {/* Upper X-axis: Quantity */}
            <line x1="60" y1="190" x2="540" y2="190" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow-axis)" />
            <text x="540" y="204" fill="#e2e8f0" fontSize="11" fontWeight="bold" textAnchor="end">Quantity Demanded (Q)</text>
            <text x="48" y="196" fill="#64748b" fontSize="10" fontWeight="bold">0</text>

            {/* Linear Demand Curve from (60, 45) to (480, 190) */}
            <line x1="60" y1="45" x2="480" y2="190" stroke="#38bdf8" strokeWidth="3.5" />
            <text x="485" y="188" fill="#38bdf8" fontSize="12" fontWeight="bold">D</text>

            {/* Intercept Annotations */}
            <text x="65" y="48" fill="#94a3b8" fontSize="10">Pmax (|PED| = ∞)</text>
            <text x="440" y="180" fill="#94a3b8" fontSize="10">Qmax (|PED| = 0)</text>

            {/* Midpoint: Unit Elastic PED = 1 at (270, 117.5) */}
            <circle cx="270" cy="117.5" r="5" fill="#fbbf24" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="60" y1="117.5" x2="270" y2="117.5" stroke="#fbbf24" strokeDasharray="3,3" />
            <text x="35" y="121" fill="#fbbf24" fontSize="10" fontWeight="bold">Pm</text>
            <text x="278" y="114" fill="#fbbf24" fontSize="11" fontWeight="bold">Midpoint: |PED| = 1</text>

            {/* Upper Segment: Elastic */}
            <text x="140" y="80" fill="#38bdf8" fontSize="11" fontWeight="bold">|PED| &gt; 1 (Price Elastic)</text>

            {/* Lower Segment: Inelastic */}
            <text x="340" y="155" fill="#f43f5e" fontSize="11" fontWeight="bold">|PED| &lt; 1 (Price Inelastic)</text>

            {/* -------------------------------------------------------------
                LOWER GRAPH: Parabolic Total Revenue (TR) Curve
                ------------------------------------------------------------- */}
            {/* Lower Y-axis: Total Revenue */}
            <line x1="60" y1="365" x2="60" y2="225" stroke="#94a3b8" strokeWidth="2.5" markerEnd="url(#arrow-axis)" />
            <text x="60" y="220" fill="#e2e8f0" fontSize="11" fontWeight="bold" textAnchor="start">Total Revenue (TR = P × Q)</text>

            {/* Lower X-axis: Quantity */}
            <line x1="60" y1="365" x2="540" y2="365" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow-axis)" />
            <text x="540" y="380" fill="#e2e8f0" fontSize="11" fontWeight="bold" textAnchor="end">Quantity (Q)</text>
            <text x="48" y="372" fill="#64748b" fontSize="10" fontWeight="bold">0</text>

            {/* Parabolic TR Curve peaking at (270, 235) */}
            <path
              d="M 60,365 Q 270,230 480,365"
              fill="rgba(168, 85, 247, 0.15)"
              stroke="#a855f7"
              strokeWidth="3.5"
            />
            <text x="485" y="360" fill="#a855f7" fontSize="12" fontWeight="bold">TR</text>

            {/* Peak TR Point */}
            <circle cx="270" cy="230" r="5" fill="#a855f7" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="60" y1="230" x2="270" y2="230" stroke="#a855f7" strokeDasharray="3,3" />
            <text x="35" y="234" fill="#c084fc" fontSize="10" fontWeight="bold">TRmax</text>

            {/* Crucial Vertical Alignment Line linking Demand Midpoint to TR Peak to X-axis */}
            <line x1="270" y1="117.5" x2="270" y2="365" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4,4" />
            <text x="270" y="380" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">Qm</text>
            <rect x="280" y="222" width="220" height="24" rx="5" fill="rgba(15, 23, 42, 0.85)" stroke="#a855f7" />
            <text x="390" y="238" fill="#c084fc" fontSize="10" fontWeight="bold" textAnchor="middle">
              TR is Maximized where |PED| = 1 (MR = 0)
            </text>

            {/* Interactive Mode 1: Price Cut in Elastic Region */}
            {isElasticCut && (
              <g>
                {/* Revenue Loss vs Gain Rectangles on Demand */}
                <rect x="60" y="75" width="120" height="30" fill="rgba(244, 63, 94, 0.35)" stroke="#f43f5e" strokeWidth="1" />
                <rect x="180" y="105" width="60" height="85" fill="rgba(16, 185, 129, 0.45)" stroke="#10b981" strokeWidth="1.5" />
                <text x="120" y="93" fill="#fca5a5" fontSize="9" fontWeight="bold" textAnchor="middle">Price Loss</text>
                <text x="210" y="145" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Qty Gain</text>

                {/* Banner */}
                <rect x="70" y="35" width="460" height="26" rx="6" fill="rgba(16, 185, 129, 0.25)" stroke="#10b981" />
                <text x="300" y="52" fill="#34d399" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  ✓ Elastic Region (|PED| &gt; 1): %ΔQ &gt; %ΔP ⇒ Price Cut Expands Total Revenue (TR ↑)
                </text>
              </g>
            )}

            {/* Interactive Mode 2: Price Cut in Inelastic Region */}
            {isInelasticCut && (
              <g>
                {/* Revenue Loss vs Gain Rectangles on Demand */}
                <rect x="60" y="130" width="270" height="30" fill="rgba(244, 63, 94, 0.45)" stroke="#f43f5e" strokeWidth="1.5" />
                <rect x="330" y="160" width="50" height="30" fill="rgba(16, 185, 129, 0.35)" stroke="#10b981" strokeWidth="1" />
                <text x="195" y="148" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">Big Price Loss Box</text>
                <text x="355" y="178" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">Gain</text>

                {/* Banner */}
                <rect x="70" y="35" width="460" height="26" rx="6" fill="rgba(244, 63, 94, 0.25)" stroke="#f43f5e" />
                <text x="300" y="52" fill="#f87171" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  ⚠️ Inelastic Region (|PED| &lt; 1): %ΔQ &lt; %ΔP ⇒ Price Cut Shrinks Total Revenue (TR ↓)
                </text>
              </g>
            )}
          </g>
        );
      }

      // ==========================================
      // D-07: PES Curves & Geometric Intercepts
      // ==========================================
      case "diag-pes-curves": {
        const isElastic = activeControl === "highlight-elastic";
        const isInelastic = activeControl === "highlight-inelastic";
        return (
          <g>
            {/* S1: Elastic (cuts P-axis) */}
            <line
              x1="60"
              y1="190"
              x2="480"
              y2="70"
              stroke={isElastic ? "#06b6d4" : "rgba(6, 182, 212, 0.7)"}
              strokeWidth={isElastic ? "4.5" : "3"}
            />
            <text x="485" y="75" fill="#06b6d4" fontSize="12" fontWeight="bold">S1: Cuts P-axis (PES &gt; 1, Elastic)</text>

            {/* S2: Unit Elastic (through origin) */}
            <line x1="60" y1="340" x2="440" y2="100" stroke="#10b981" strokeWidth="3" />
            <text x="445" y="105" fill="#10b981" fontSize="12" fontWeight="bold">S2: Passes Origin (PES = 1)</text>

            {/* S3: Inelastic (cuts Q-axis) */}
            <line
              x1="180"
              y1="340"
              x2="400"
              y2="60"
              stroke={isInelastic ? "#f59e0b" : "rgba(245, 158, 11, 0.7)"}
              strokeWidth={isInelastic ? "4.5" : "3"}
            />
            <text x="405" y="65" fill="#f59e0b" fontSize="12" fontWeight="bold">S3: Cuts Q-axis (PES &lt; 1, Inelastic)</text>

            {/* S4: Perfectly Inelastic */}
            <line x1="280" y1="340" x2="280" y2="60" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="4,4" />
            <text x="285" y="55" fill="#f43f5e" fontSize="11" fontWeight="bold">S4: Vertical (PES = 0)</text>

            {/* Geometric Rule Box */}
            <rect x="70" y="35" width="220" height="42" rx="8" fill="rgba(15, 23, 42, 0.85)" stroke="#38bdf8" />
            <text x="180" y="52" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">
              Geometric Intercept Rule:
            </text>
            <text x="180" y="68" fill="#e2e8f0" fontSize="10" textAnchor="middle">
              Cuts P-axis = Elastic | Origin = Unit | Cuts Q = Inelastic
            </text>
          </g>
        );
      }

      // ==========================================
      // D-08: Price Ceiling (Maximum Price)
      // ==========================================
      case "diag-price-ceiling": {
        return (
          <g>
            {/* Equilibrium lines */}
            <line x1="280" y1="200" x2="280" y2="340" stroke="#64748b" strokeDasharray="4,4" strokeWidth="1.5" />
            <line x1="60" y1="200" x2="280" y2="200" stroke="#64748b" strokeDasharray="4,4" strokeWidth="1.5" />
            <text x="42" y="204" fill="#94a3b8" fontSize="11">Pe</text>
            <text x="275" y="358" fill="#94a3b8" fontSize="11">Qe</text>

            {/* Price Ceiling Line Pmax */}
            <line x1="60" y1="265" x2="520" y2="265" stroke="#f43f5e" strokeWidth="3.5" />
            <text x="525" y="270" fill="#f43f5e" fontSize="12" fontWeight="bold">Pmax (Ceiling)</text>
            <text x="25" y="269" fill="#f43f5e" fontSize="11" fontWeight="bold">Pmax</text>

            {/* Qs and Qd projections */}
            <line x1="170" y1="265" x2="170" y2="340" stroke="#f43f5e" strokeDasharray="4,4" strokeWidth="1.5" />
            <text x="165" y="358" fill="#f43f5e" fontSize="11" fontWeight="bold">Qs</text>
            <line x1="390" y1="265" x2="390" y2="340" stroke="#0ea5e9" strokeDasharray="4,4" strokeWidth="1.5" />
            <text x="385" y="358" fill="#0ea5e9" fontSize="11" fontWeight="bold">Qd</text>

            {/* Shortage indicator */}
            <line x1="170" y1="280" x2="390" y2="280" stroke="#fbbf24" strokeWidth="2.5" markerEnd="url(#arrow-amber)" markerStart="url(#arrow-amber)" />
            <text x="280" y="298" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">
              Shortage (Excess Demand: Qd - Qs)
            </text>

            {/* Deadweight Loss Triangle */}
            {highlightDWL && (
              <polygon
                points="170,265 280,200 170,135"
                fill="rgba(244, 63, 94, 0.4)"
                stroke="#f43f5e"
                strokeWidth="1.5"
              />
            )}
            <text x="195" y="205" fill="#fca5a5" fontSize="11" fontWeight="bold">DWL</text>

            {/* Black Market Price Pb */}
            {activeControl === "show-black-market" && (
              <g>
                <line x1="170" y1="265" x2="170" y2="135" stroke="#a855f7" strokeDasharray="4,4" strokeWidth="2" />
                <line x1="60" y1="135" x2="170" y2="135" stroke="#a855f7" strokeDasharray="4,4" strokeWidth="2" />
                <circle cx="170" cy="135" r="5" fill="#a855f7" />
                <text x="35" y="139" fill="#c084fc" fontSize="11" fontWeight="bold">Pb</text>
                <text x="180" y="130" fill="#c084fc" fontSize="11" fontWeight="bold">Black Market Price (Pb)</text>
              </g>
            )}

            {/* Demand and Supply Curves */}
            <line x1="60" y1="80" x2="500" y2="330" stroke="#0ea5e9" strokeWidth="3.5" />
            <text x="505" y="330" fill="#0ea5e9" fontSize="12" fontWeight="bold">D</text>
            <line x1="60" y1="330" x2="500" y2="80" stroke="#10b981" strokeWidth="3.5" />
            <text x="505" y="85" fill="#10b981" fontSize="12" fontWeight="bold">S</text>
          </g>
        );
      }

      // ==========================================
      // D-09: Price Floor (Minimum Price)
      // ==========================================
      case "diag-price-floor": {
        const isLabor = activeControl === "labor-market-mode";
        return (
          <g>
            {/* Equilibrium lines */}
            <line x1="280" y1="200" x2="280" y2="340" stroke="#64748b" strokeDasharray="4,4" strokeWidth="1.5" />
            <line x1="60" y1="200" x2="280" y2="200" stroke="#64748b" strokeDasharray="4,4" strokeWidth="1.5" />
            <text x="35" y="204" fill="#94a3b8" fontSize="11">{isLabor ? "We" : "Pe"}</text>
            <text x="275" y="358" fill="#94a3b8" fontSize="11">{isLabor ? "Le" : "Qe"}</text>

            {/* Price Floor Line Pmin */}
            <line x1="60" y1="135" x2="520" y2="135" stroke="#f59e0b" strokeWidth="3.5" />
            <text x="525" y="140" fill="#f59e0b" fontSize="12" fontWeight="bold">{isLabor ? "Wmin (Min Wage)" : "Pmin (Floor)"}</text>
            <text x="25" y="139" fill="#f59e0b" fontSize="11" fontWeight="bold">{isLabor ? "Wmin" : "Pmin"}</text>

            {/* Qd and Qs projections */}
            <line x1="170" y1="135" x2="170" y2="340" stroke="#0ea5e9" strokeDasharray="4,4" strokeWidth="1.5" />
            <text x="165" y="358" fill="#0ea5e9" fontSize="11" fontWeight="bold">{isLabor ? "Ld (Firms)" : "Qd"}</text>
            <line x1="390" y1="135" x2="390" y2="340" stroke="#10b981" strokeDasharray="4,4" strokeWidth="1.5" />
            <text x="385" y="358" fill="#10b981" fontSize="11" fontWeight="bold">{isLabor ? "Ls (Workers)" : "Qs"}</text>

            {/* Surplus indicator */}
            <line x1="170" y1="120" x2="390" y2="120" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#arrow-amber)" markerStart="url(#arrow-amber)" />
            <text x="280" y="112" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">
              {isLabor ? "Involuntary Unemployment (Ls - Ld)" : "Surplus: Excess Supply (Qs - Qd)"}
            </text>

            {/* Government Cost Rectangle */}
            {activeControl === "show-gov-cost" && (
              <g>
                <polygon points="170,135 390,135 390,340 170,340" fill="rgba(244, 63, 94, 0.25)" stroke="#f43f5e" strokeDasharray="4,4" />
                <text x="280" y="240" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">
                  Gov Purchase Cost = Pmin × (Qs - Qd)
                </text>
              </g>
            )}

            {/* Deadweight loss */}
            {highlightDWL && (
              <polygon
                points="170,135 280,200 170,265"
                fill="rgba(244, 63, 94, 0.35)"
                stroke="#f43f5e"
                strokeWidth="1.5"
              />
            )}

            {/* Curves */}
            <line x1="60" y1="80" x2="500" y2="330" stroke="#0ea5e9" strokeWidth="3.5" />
            <text x="505" y="330" fill="#0ea5e9" fontSize="12" fontWeight="bold">{isLabor ? "DL" : "D"}</text>
            <line x1="60" y1="330" x2="500" y2="80" stroke="#10b981" strokeWidth="3.5" />
            <text x="505" y="85" fill="#10b981" fontSize="12" fontWeight="bold">{isLabor ? "SL" : "S"}</text>
          </g>
        );
      }

      // ==========================================
      // D-10: Specific Indirect Tax
      // ==========================================
      case "diag-indirect-tax": {
        const isIncidence = activeControl === "toggle-incidence";
        return (
          <g>
            {/* Equilibrium Pe, Qe */}
            <line x1="280" y1="210" x2="280" y2="340" stroke="#64748b" strokeDasharray="4,4" strokeWidth="1.5" />
            <line x1="60" y1="210" x2="280" y2="210" stroke="#64748b" strokeDasharray="4,4" strokeWidth="1.5" />
            <text x="42" y="214" fill="#94a3b8" fontSize="11">Pe</text>
            <text x="275" y="358" fill="#94a3b8" fontSize="11">Qe</text>

            {/* New Qt */}
            <line x1="200" y1="150" x2="200" y2="340" stroke="#f43f5e" strokeDasharray="4,4" strokeWidth="1.5" />
            <text x="195" y="358" fill="#f43f5e" fontSize="11" fontWeight="bold">Qt</text>

            {/* Consumer Price Pc */}
            <line x1="60" y1="150" x2="200" y2="150" stroke="#0ea5e9" strokeDasharray="4,4" strokeWidth="1.5" />
            <text x="40" y="154" fill="#38bdf8" fontSize="11" fontWeight="bold">Pc</text>

            {/* Producer Price Pp */}
            <line x1="60" y1="270" x2="200" y2="270" stroke="#10b981" strokeDasharray="4,4" strokeWidth="1.5" />
            <text x="40" y="274" fill="#34d399" fontSize="11" fontWeight="bold">Pp</text>

            {/* Consumer Burden Box (Pc - Pe) * Qt */}
            <polygon points="60,150 200,150 200,210 60,210" fill={isIncidence ? "rgba(14, 165, 233, 0.45)" : "rgba(14, 165, 233, 0.25)"} stroke="#0ea5e9" strokeWidth="1" />
            <text x="130" y="185" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Consumer Burden</text>

            {/* Producer Burden Box (Pe - Pp) * Qt */}
            <polygon points="60,210 200,210 200,270 60,270" fill={isIncidence ? "rgba(16, 185, 129, 0.45)" : "rgba(16, 185, 129, 0.25)"} stroke="#10b981" strokeWidth="1" />
            <text x="130" y="245" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Producer Burden</text>

            {/* Deadweight Loss Triangle (points right toward Qe) */}
            {highlightDWL && (
              <polygon
                points="200,150 280,210 200,270"
                fill="rgba(244, 63, 94, 0.45)"
                stroke="#f43f5e"
                strokeWidth="1.5"
              />
            )}
            <text x="235" y="214" fill="#fca5a5" fontSize="11" fontWeight="bold">DWL</text>

            {/* Curves */}
            <line x1="60" y1="80" x2="500" y2="330" stroke="#0ea5e9" strokeWidth="3.5" />
            <text x="505" y="330" fill="#0ea5e9" fontSize="12" fontWeight="bold">D</text>

            {/* S1 */}
            <line x1="60" y1="330" x2="500" y2="80" stroke="#10b981" strokeWidth="3" />
            <text x="505" y="90" fill="#10b981" fontSize="12" fontWeight="bold">S1</text>

            {/* S2 = S1 + Tax (Wide 80px vertical shift) */}
            <line x1="60" y1="250" x2="500" y2="0" stroke="#f43f5e" strokeWidth="3.5" />
            <text x="505" y="15" fill="#f43f5e" fontSize="12" fontWeight="bold">S + tax</text>

            {/* Tax Arrow */}
            <line x1="360" y1="160" x2="360" y2="80" stroke="#f43f5e" strokeWidth="2.5" markerEnd="url(#arrow-rose)" />
            <text x="370" y="125" fill="#f43f5e" fontSize="11" fontWeight="bold">Specific Tax/unit</text>
          </g>
        );
      }

      // ==========================================
      // D-11: Production Subsidy
      // ==========================================
      case "diag-subsidy": {
        const isGovCost = activeControl === "show-gov-cost";
        return (
          <g>
            {/* Equilibrium Pe, Qe */}
            <line x1="260" y1="210" x2="260" y2="340" stroke="#64748b" strokeDasharray="4,4" />
            <line x1="60" y1="210" x2="260" y2="210" stroke="#64748b" strokeDasharray="4,4" />
            <text x="42" y="214" fill="#94a3b8" fontSize="11">Pe</text>
            <text x="255" y="358" fill="#94a3b8" fontSize="11">Qe</text>

            {/* New Subsidized Quantity Qsub */}
            <line x1="350" y1="150" x2="350" y2="340" stroke="#06b6d4" strokeDasharray="4,4" strokeWidth="1.5" />
            <text x="345" y="358" fill="#06b6d4" fontSize="11" fontWeight="bold">Qsub</text>

            {/* Consumer Price Pc */}
            <line x1="60" y1="270" x2="350" y2="270" stroke="#0ea5e9" strokeDasharray="4,4" />
            <text x="40" y="274" fill="#38bdf8" fontSize="11" fontWeight="bold">Pc</text>

            {/* Producer Net Price Pp */}
            <line x1="60" y1="150" x2="350" y2="150" stroke="#10b981" strokeDasharray="4,4" />
            <text x="40" y="154" fill="#34d399" fontSize="11" fontWeight="bold">Pp</text>

            {/* Government Cost Box: (Pp - Pc) * Qsub */}
            {isGovCost && (
              <polygon points="60,150 350,150 350,270 60,270" fill="rgba(244, 63, 94, 0.25)" stroke="#f43f5e" strokeDasharray="4,4" />
            )}

            {/* Deadweight Loss Triangle (MSC > MSB between Qe and Qsub) */}
            {highlightDWL && (
              <polygon
                points="260,210 350,150 350,270"
                fill="rgba(245, 158, 11, 0.45)"
                stroke="#f59e0b"
                strokeWidth="1.5"
              />
            )}
            <text x="315" y="210" fill="#fef08a" fontSize="11" fontWeight="bold">DWL</text>

            {/* Curves */}
            <line x1="60" y1="80" x2="500" y2="330" stroke="#0ea5e9" strokeWidth="3.5" />
            <text x="505" y="330" fill="#0ea5e9" fontSize="12" fontWeight="bold">D</text>

            {/* S1 */}
            <line x1="60" y1="330" x2="500" y2="80" stroke="#10b981" strokeWidth="3" />
            <text x="505" y="85" fill="#10b981" fontSize="12" fontWeight="bold">S1</text>

            {/* S2 = S1 - Subsidy (Wide 80px downward shift) */}
            <line x1="100" y1="340" x2="540" y2="120" stroke="#06b6d4" strokeWidth="3.5" />
            <text x="545" y="125" fill="#06b6d4" fontSize="12" fontWeight="bold">S - subsidy</text>

            {/* Subsidy Arrow */}
            <line x1="200" y1="210" x2="200" y2="290" stroke="#06b6d4" strokeWidth="2.5" markerEnd="url(#arrow-cyan)" />
            <text x="210" y="260" fill="#06b6d4" fontSize="11" fontWeight="bold">Subsidy/unit</text>
          </g>
        );
      }

      // ==========================================
      // D-12: Negative Externality of Production
      // ==========================================
      case "diag-neg-ext-production": {
        const withTax = activeControl === "apply-carbon-tax";
        return (
          <g>
            {/* Social Optimum Qopt, Popt */}
            <line x1="210" y1="160" x2="210" y2="340" stroke="#10b981" strokeDasharray="4,4" strokeWidth="1.5" />
            <line x1="60" y1="160" x2="210" y2="160" stroke="#10b981" strokeDasharray="4,4" strokeWidth="1.5" />
            <text x="35" y="164" fill="#34d399" fontSize="11" fontWeight="bold">Popt</text>
            <text x="200" y="358" fill="#34d399" fontSize="11" fontWeight="bold">Qopt</text>

            {/* Market Equilibrium Qm, Pm */}
            <line x1="320" y1="225" x2="320" y2="340" stroke="#f43f5e" strokeDasharray="4,4" strokeWidth="1.5" />
            <line x1="60" y1="225" x2="320" y2="225" stroke="#f43f5e" strokeDasharray="4,4" strokeWidth="1.5" />
            <text x="40" y="229" fill="#f87171" fontSize="11" fontWeight="bold">Pm</text>
            <text x="315" y="358" fill="#f87171" fontSize="11" fontWeight="bold">Qm</text>

            {/* DWL Triangle pointing left to Qopt */}
            {highlightDWL && !withTax && (
              <polygon
                points="210,160 320,225 320,95"
                fill="rgba(244, 63, 94, 0.45)"
                stroke="#f43f5e"
                strokeWidth="1.5"
              />
            )}
            <text x="290" y="165" fill="#fca5a5" fontSize="11" fontWeight="bold">
              {withTax ? "Tax Internalized" : "DWL ◀"}
            </text>

            {/* Demand MPB = MSB */}
            <line x1="60" y1="80" x2="500" y2="320" stroke="#0ea5e9" strokeWidth="3.5" />
            <text x="505" y="325" fill="#0ea5e9" fontSize="12" fontWeight="bold">MPB = MSB</text>

            {/* MPC (Private Supply) */}
            <line x1="60" y1="330" x2="500" y2="110" stroke={withTax ? "#64748b" : "#10b981"} strokeWidth="3" />
            <text x="505" y="115" fill={withTax ? "#64748b" : "#10b981"} fontSize="12" fontWeight="bold">
              MPC (Private Cost)
            </text>

            {/* MSC = MPC + MEC (Wide 70px vertical gap) */}
            <line x1="60" y1="240" x2="500" y2="20" stroke="#f43f5e" strokeWidth="3.5" />
            <text x="505" y="25" fill="#f43f5e" fontSize="12" fontWeight="bold">
              MSC (MPC + MEC)
            </text>

            {/* Carbon Tax Shift */}
            {withTax && (
              <g>
                <rect x="200" y="45" width="300" height="26" rx="6" fill="rgba(16, 185, 129, 0.25)" stroke="#10b981" />
                <text x="350" y="62" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
                  ✓ Pigouvian Tax Internalizes External Cost (MEC)
                </text>
              </g>
            )}
          </g>
        );
      }

      // ==========================================
      // D-13: Negative Externality of Consumption
      // ==========================================
      case "diag-neg-ext-consumption": {
        const isTax = activeControl === "apply-sin-tax";
        return (
          <g>
            {/* Supply Line (MPC = MSC) */}
            <line x1="60" y1="320" x2="500" y2="80" stroke="#10b981" strokeWidth="3.5" />
            <text x="505" y="85" fill="#10b981" fontSize="12" fontWeight="bold">MPC = MSC</text>

            {/* Private Demand MPB */}
            <line x1="80" y1="70" x2="500" y2="290" stroke="#0ea5e9" strokeWidth="3.5" />
            <text x="505" y="295" fill="#0ea5e9" fontSize="12" fontWeight="bold">MPB (Private)</text>

            {/* Social Demand MSB (Shifted 70px Below MPB) */}
            <line x1="60" y1="140" x2="480" y2="340" stroke="#f43f5e" strokeWidth="3.5" />
            <text x="485" y="340" fill="#f43f5e" fontSize="12" fontWeight="bold">MSB (Social)</text>

            {/* Market Equilibrium Qm, Pm */}
            <circle cx="320" cy="180" r="5" fill="#f43f5e" />
            <line x1="320" y1="180" x2="320" y2="340" stroke="#f43f5e" strokeDasharray="4,4" />
            <line x1="60" y1="180" x2="320" y2="180" stroke="#f43f5e" strokeDasharray="4,4" />
            <text x="40" y="184" fill="#f87171" fontSize="11" fontWeight="bold">Pm</text>
            <text x="315" y="358" fill="#f87171" fontSize="11" fontWeight="bold">Qm (Overconsumed)</text>

            {/* Social Optimum Qopt, Popt */}
            <circle cx="200" cy="240" r="5" fill="#10b981" />
            <line x1="200" y1="240" x2="200" y2="340" stroke="#10b981" strokeDasharray="4,4" />
            <line x1="60" y1="240" x2="200" y2="240" stroke="#10b981" strokeDasharray="4,4" />
            <text x="35" y="244" fill="#34d399" fontSize="11" fontWeight="bold">Popt</text>
            <text x="190" y="358" fill="#34d399" fontSize="11" fontWeight="bold">Qopt</text>

            {/* DWL Triangle (points left to Qopt) */}
            {highlightDWL && !isTax && (
              <polygon
                points="200,240 320,180 320,300"
                fill="rgba(244, 63, 94, 0.45)"
                stroke="#f43f5e"
                strokeWidth="1.5"
              />
            )}
            <text x="280" y="245" fill="#fca5a5" fontSize="11" fontWeight="bold">DWL ◀</text>

            {/* Sin Tax Intervention */}
            {isTax && (
              <g>
                <line x1="60" y1="240" x2="500" y2="0" stroke="#f59e0b" strokeWidth="3" strokeDasharray="5,3" />
                <text x="290" y="45" fill="#fbbf24" fontSize="11" fontWeight="bold">
                  ✓ Indirect Sin Tax shifts supply left to achieve Qopt
                </text>
              </g>
            )}
          </g>
        );
      }

      // ==========================================
      // D-14: Positive Externality of Consumption
      // ==========================================
      case "diag-pos-ext-consumption": {
        const isSub = activeControl === "apply-subsidy";
        return (
          <g>
            {/* Supply Line (MPC = MSC) */}
            <line x1="60" y1="320" x2="500" y2="80" stroke="#10b981" strokeWidth="3.5" />
            <text x="505" y="85" fill="#10b981" fontSize="12" fontWeight="bold">MPC = MSC</text>

            {/* Private Demand MPB */}
            <line x1="60" y1="150" x2="480" y2="340" stroke="#0ea5e9" strokeWidth="3.5" />
            <text x="485" y="340" fill="#0ea5e9" fontSize="12" fontWeight="bold">MPB (Private)</text>

            {/* Social Demand MSB (Shifted 70px Above MPB) */}
            <line x1="80" y1="60" x2="520" y2="270" stroke="#a855f7" strokeWidth="3.5" />
            <text x="525" y="275" fill="#a855f7" fontSize="12" fontWeight="bold">MSB (Social)</text>

            {/* Market Equilibrium Qm, Pm */}
            <circle cx="200" cy="240" r="5" fill="#0ea5e9" />
            <line x1="200" y1="240" x2="200" y2="340" stroke="#0ea5e9" strokeDasharray="4,4" />
            <line x1="60" y1="240" x2="200" y2="240" stroke="#0ea5e9" strokeDasharray="4,4" />
            <text x="40" y="244" fill="#38bdf8" fontSize="11" fontWeight="bold">Pm</text>
            <text x="190" y="358" fill="#38bdf8" fontSize="11" fontWeight="bold">Qm (Underconsumed)</text>

            {/* Social Optimum Qopt, Popt */}
            <circle cx="320" cy="170" r="5" fill="#a855f7" />
            <line x1="320" y1="170" x2="320" y2="340" stroke="#a855f7" strokeDasharray="4,4" />
            <line x1="60" y1="170" x2="320" y2="170" stroke="#a855f7" strokeDasharray="4,4" />
            <text x="35" y="174" fill="#c084fc" fontSize="11" fontWeight="bold">Popt</text>
            <text x="315" y="358" fill="#c084fc" fontSize="11" fontWeight="bold">Qopt</text>

            {/* Potential Welfare Gain (points right to Qopt) */}
            {highlightDWL && !isSub && (
              <polygon
                points="200,165 320,170 200,240"
                fill="rgba(168, 85, 247, 0.45)"
                stroke="#a855f7"
                strokeWidth="1.5"
              />
            )}
            <text x="240" y="200" fill="#c084fc" fontSize="11" fontWeight="bold">▶ Potential Gain</text>

            {/* Corrective Subsidy */}
            {isSub && (
              <g>
                <line x1="120" y1="340" x2="540" y2="110" stroke="#38bdf8" strokeWidth="3" strokeDasharray="5,3" />
                <text x="270" y="45" fill="#38bdf8" fontSize="11" fontWeight="bold">
                  ✓ Subsidy shifts supply right to expand consumption to Qopt
                </text>
              </g>
            )}
          </g>
        );
      }

      // ==========================================
      // D-15: The Business Cycle
      // ==========================================
      case "diag-business-cycle": {
        const isGaps = activeControl === "toggle-gaps";
        const isRecession = activeControl === "highlight-recession";
        return (
          <g>
            {/* Long-term Potential GDP Trend Line */}
            <line x1="80" y1="280" x2="520" y2="90" stroke="#10b981" strokeWidth="3.5" />
            <text x="525" y="95" fill="#10b981" fontSize="12" fontWeight="bold">Potential Trend</text>

            {/* Actual Real GDP Wave */}
            <path
              d="M 80,280 C 140,240 180,100 240,100 C 300,100 320,300 380,300 C 440,300 470,120 520,100"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="4"
            />

            {/* Phase Labels */}
            <circle cx="240" cy="100" r="5" fill="#f43f5e" />
            <text x="240" y="85" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">1. Peak / Boom</text>

            <circle cx="380" cy="300" r="5" fill="#f59e0b" />
            <text x="380" y="325" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">3. Trough</text>

            <text x="145" y="210" fill="#38bdf8" fontSize="11" fontWeight="bold">Expansion ↗</text>
            <text x="315" y="210" fill="#f87171" fontSize="11" fontWeight="bold">Recession ↘</text>

            {/* Output Gaps */}
            {isGaps && (
              <g>
                <polygon points="180,140 240,100 300,140" fill="rgba(244, 63, 94, 0.3)" stroke="#f43f5e" />
                <text x="240" y="130" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">
                  Positive (Inflationary) Gap
                </text>

                <polygon points="320,240 380,300 440,240" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" />
                <text x="380" y="270" fill="#fef08a" fontSize="10" fontWeight="bold" textAnchor="middle">
                  Negative (Deflationary) Gap
                </text>
              </g>
            )}

            {/* Recession Zone Highlight */}
            {isRecession && (
              <rect x="250" y="100" width="120" height="200" fill="rgba(244, 63, 94, 0.18)" stroke="#f43f5e" strokeDasharray="4,4" />
            )}
          </g>
        );
      }

      // ==========================================
      // D-16: Aggregate Demand Shifts
      // ==========================================
      case "diag-ad-shifts": {
        const isRight = activeControl === "shift-ad-right";
        const isLeft = activeControl === "shift-ad-left";
        return (
          <g>
            {/* SRAS curve for context */}
            <line x1="60" y1="310" x2="480" y2="80" stroke="#475569" strokeWidth="2.5" strokeDasharray="4,4" />
            <text x="485" y="85" fill="#64748b" fontSize="11">SRAS</text>

            {/* Baseline AD1 */}
            <line x1="90" y1="80" x2="450" y2="330" stroke="#38bdf8" strokeWidth="3.5" />
            <text x="455" y="335" fill="#38bdf8" fontSize="12" fontWeight="bold">AD1</text>

            {/* Initial Equilibrium E1 */}
            <circle cx="270" cy="205" r="5" fill="#ffffff" />
            <line x1="270" y1="205" x2="270" y2="340" stroke="#94a3b8" strokeDasharray="4,4" />
            <line x1="60" y1="205" x2="270" y2="205" stroke="#94a3b8" strokeDasharray="4,4" />
            <text x="35" y="209" fill="#94a3b8" fontSize="11" fontWeight="bold">PL1</text>
            <text x="265" y="358" fill="#94a3b8" fontSize="11" fontWeight="bold">Y1</text>

            {/* AD Formula Badge */}
            <rect x="70" y="35" width="220" height="26" rx="6" fill="rgba(15, 23, 42, 0.85)" stroke="#38bdf8" />
            <text x="180" y="52" fill="#38bdf8" fontSize="10.5" fontWeight="bold" textAnchor="middle">
              AD = C + I + G + (X - M)
            </text>

            {/* Wide Shift Right AD2 */}
            {isRight && (
              <g>
                <line x1="200" y1="80" x2="550" y2="325" stroke="#10b981" strokeWidth="4" />
                <text x="555" y="325" fill="#10b981" fontSize="12" fontWeight="bold">AD2 (Right)</text>
                <circle cx="360" cy="145" r="6" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                <line x1="360" y1="145" x2="360" y2="340" stroke="#10b981" strokeDasharray="4,4" />
                <line x1="60" y1="145" x2="360" y2="145" stroke="#10b981" strokeDasharray="4,4" />
                <text x="35" y="149" fill="#34d399" fontSize="11" fontWeight="bold">PL2</text>
                <text x="355" y="358" fill="#34d399" fontSize="11" fontWeight="bold">Y2</text>
                <line x1="260" y1="130" x2="350" y2="130" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow-green)" />
                <rect x="240" y="35" width="290" height="26" rx="6" fill="rgba(16, 185, 129, 0.25)" stroke="#10b981" />
                <text x="385" y="52" fill="#34d399" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  Fiscal Stimulus / Rate Cut ⇒ Real GDP (Y2) &amp; PL2 ↑
                </text>
              </g>
            )}

            {/* Wide Shift Left AD3 */}
            {isLeft && (
              <g>
                <line x1="60" y1="120" x2="340" y2="340" stroke="#f43f5e" strokeWidth="4" />
                <text x="345" y="340" fill="#f43f5e" fontSize="12" fontWeight="bold">AD3 (Left)</text>
                <circle cx="180" cy="265" r="6" fill="#f43f5e" stroke="#ffffff" strokeWidth="2" />
                <line x1="180" y1="265" x2="180" y2="340" stroke="#f43f5e" strokeDasharray="4,4" />
                <line x1="60" y1="265" x2="180" y2="265" stroke="#f43f5e" strokeDasharray="4,4" />
                <text x="35" y="270" fill="#f87171" fontSize="11" fontWeight="bold">PL3</text>
                <text x="175" y="358" fill="#f87171" fontSize="11" fontWeight="bold">Y3</text>
                <line x1="260" y1="270" x2="180" y2="270" stroke="#f43f5e" strokeWidth="3" markerEnd="url(#arrow-rose)" />
                <rect x="240" y="35" width="290" height="26" rx="6" fill="rgba(244, 63, 94, 0.25)" stroke="#f43f5e" />
                <text x="385" y="52" fill="#f87171" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  Austerity / Crisis ⇒ Real GDP (Y3) &amp; PL3 ↓
                </text>
              </g>
            )}
          </g>
        );
      }

      // ==========================================
      // D-17: SRAS Shocks & Stagflation
      // ==========================================
      case "diag-sras-shocks": {
        const isOil = activeControl === "trigger-oil-shock";
        const isFavorable = activeControl === "trigger-favorable-shock";
        return (
          <g>
            {/* Aggregate Demand */}
            <line x1="80" y1="80" x2="480" y2="330" stroke="#38bdf8" strokeWidth="3.5" />
            <text x="485" y="335" fill="#38bdf8" fontSize="12" fontWeight="bold">AD</text>

            {/* Baseline SRAS1 */}
            <line x1="60" y1="320" x2="480" y2="90" stroke="#10b981" strokeWidth="3" />
            <text x="485" y="90" fill="#10b981" fontSize="12" fontWeight="bold">SRAS1</text>

            {/* Baseline Equilibrium */}
            <circle cx="280" cy="205" r="5" fill="#ffffff" />
            <line x1="280" y1="205" x2="280" y2="340" stroke="#94a3b8" strokeDasharray="4,4" />
            <line x1="60" y1="205" x2="280" y2="205" stroke="#94a3b8" strokeDasharray="4,4" />
            <text x="35" y="209" fill="#94a3b8" fontSize="11" fontWeight="bold">PL1</text>
            <text x="275" y="358" fill="#94a3b8" fontSize="11" fontWeight="bold">Y1</text>

            {/* Oil Supply Shock (Stagflation) - Wide 80px leftward shift */}
            {isOil && (
              <g>
                <line x1="60" y1="240" x2="380" y2="40" stroke="#f43f5e" strokeWidth="4" />
                <text x="385" y="45" fill="#f43f5e" fontSize="12" fontWeight="bold">SRAS2 (Left)</text>
                <circle cx="190" cy="150" r="6" fill="#f43f5e" stroke="#ffffff" strokeWidth="2" />
                <line x1="190" y1="150" x2="190" y2="340" stroke="#f43f5e" strokeDasharray="4,4" />
                <line x1="60" y1="150" x2="190" y2="150" stroke="#f43f5e" strokeDasharray="4,4" />
                <text x="35" y="154" fill="#f87171" fontSize="11" fontWeight="bold">PL2</text>
                <text x="185" y="358" fill="#f87171" fontSize="11" fontWeight="bold">Y2</text>
                <line x1="280" y1="190" x2="200" y2="150" stroke="#f43f5e" strokeWidth="3" markerEnd="url(#arrow-rose)" />

                {/* Stagflation Alert Banner */}
                <rect x="150" y="35" width="380" height="30" rx="8" fill="rgba(244, 63, 94, 0.25)" stroke="#f43f5e" />
                <text x="340" y="55" fill="#fca5a5" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  ⚠️ STAGFLATION: Price Level Soars (PL2) + Real GDP Contracts (Y2)!
                </text>
              </g>
            )}

            {/* Favorable Shock */}
            {isFavorable && (
              <g>
                <line x1="150" y1="340" x2="550" y2="110" stroke="#06b6d4" strokeWidth="4" />
                <text x="555" y="115" fill="#06b6d4" fontSize="12" fontWeight="bold">SRAS3 (Right)</text>
                <circle cx="360" cy="255" r="6" fill="#06b6d4" stroke="#ffffff" strokeWidth="2" />
                <line x1="360" y1="255" x2="360" y2="340" stroke="#06b6d4" strokeDasharray="4,4" />
                <line x1="60" y1="255" x2="360" y2="255" stroke="#06b6d4" strokeDasharray="4,4" />
                <text x="35" y="259" fill="#22d3ee" fontSize="11" fontWeight="bold">PL3</text>
                <text x="355" y="358" fill="#22d3ee" fontSize="11" fontWeight="bold">Y3</text>
              </g>
            )}
          </g>
        );
      }

      // ==========================================
      // D-18: Monetarist vs Keynesian AS Models
      // ==========================================
      case "diag-monetarist-vs-keynesian": {
        const isKeynesian = activeControl === "toggle-keynesian";
        return isKeynesian ? (
          // Keynesian 3-Section AS Model
          <g>
            {/* Keynesian AS Curve */}
            <path
              d="M 60,250 L 260,250 Q 420,250 420,60"
              fill="none"
              stroke="#a855f7"
              strokeWidth="4"
            />
            <text x="425" y="65" fill="#a855f7" fontSize="12" fontWeight="bold">Keynesian AS</text>

            {/* Section 1: Depression / Spare Capacity */}
            <rect x="70" y="260" width="160" height="22" rx="4" fill="rgba(168, 85, 247, 0.2)" stroke="#a855f7" />
            <text x="150" y="275" fill="#c084fc" fontSize="10" fontWeight="bold" textAnchor="middle">
              1. Spare Capacity (Zero Inflation)
            </text>

            {/* Section 2: Bottlenecks */}
            <text x="290" y="210" fill="#c084fc" fontSize="10" fontWeight="bold">2. Bottlenecks</text>

            {/* Section 3: Full Physical Capacity */}
            <text x="430" y="110" fill="#a855f7" fontSize="10" fontWeight="bold">3. Ymax (Capacity)</text>

            {/* AD1 in horizontal section */}
            <line x1="100" y1="160" x2="200" y2="330" stroke="#38bdf8" strokeWidth="3" />
            <text x="205" y="330" fill="#38bdf8" fontSize="11" fontWeight="bold">AD1</text>
            <circle cx="150" cy="250" r="5" fill="#38bdf8" />
            <line x1="150" y1="250" x2="150" y2="340" stroke="#38bdf8" strokeDasharray="3,3" />
            <text x="145" y="358" fill="#38bdf8" fontSize="11">Y1</text>

            {/* AD2 in horizontal section - 100px wide shift */}
            <line x1="200" y1="160" x2="300" y2="330" stroke="#10b981" strokeWidth="3" />
            <text x="305" y="330" fill="#10b981" fontSize="11" fontWeight="bold">AD2</text>
            <circle cx="250" cy="250" r="5" fill="#10b981" />
            <line x1="250" y1="250" x2="250" y2="340" stroke="#10b981" strokeDasharray="3,3" />
            <text x="245" y="358" fill="#10b981" fontSize="11">Y2</text>

            {/* Banner */}
            <rect x="70" y="35" width="460" height="26" rx="6" fill="rgba(168, 85, 247, 0.2)" stroke="#a855f7" />
            <text x="300" y="52" fill="#c084fc" fontSize="10.5" fontWeight="bold" textAnchor="middle">
              Keynesian View: AD Stimulus Expands Output (Y1 → Y2) With Zero Inflation!
            </text>
          </g>
        ) : (
          // Monetarist / New Classical Model
          <g>
            {/* Vertical LRAS */}
            <line x1="330" y1="60" x2="330" y2="340" stroke="#06b6d4" strokeWidth="4" />
            <text x="335" y="65" fill="#06b6d4" fontSize="12" fontWeight="bold">LRAS (Vertical at Yf)</text>
            <text x="325" y="358" fill="#06b6d4" fontSize="12" fontWeight="bold">Yf</text>

            {/* SRAS1 */}
            <line x1="60" y1="310" x2="480" y2="90" stroke="#10b981" strokeWidth="3" />
            <text x="485" y="95" fill="#10b981" fontSize="12" fontWeight="bold">SRAS1</text>

            {/* AD1 */}
            <line x1="80" y1="80" x2="460" y2="330" stroke="#38bdf8" strokeWidth="3" />
            <text x="465" y="335" fill="#38bdf8" fontSize="12" fontWeight="bold">AD1</text>

            {/* Deflationary Gap E1 */}
            <circle cx="230" cy="225" r="5" fill="#f59e0b" />
            <line x1="230" y1="225" x2="230" y2="340" stroke="#f59e0b" strokeDasharray="4,4" />
            <text x="225" y="358" fill="#f59e0b" fontSize="11" fontWeight="bold">Y1</text>

            {/* Self-Correction Arrow: SRAS shifts right */}
            <line x1="160" y1="250" x2="540" y2="70" stroke="#10b981" strokeWidth="2.5" strokeDasharray="5,3" />
            <text x="545" y="75" fill="#10b981" fontSize="11">SRAS2 (Wages Fall)</text>
            <line x1="260" y1="210" x2="340" y2="210" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-green)" />

            <rect x="70" y="35" width="460" height="26" rx="6" fill="rgba(6, 182, 212, 0.2)" stroke="#06b6d4" />
            <text x="300" y="52" fill="#22d3ee" fontSize="10.5" fontWeight="bold" textAnchor="middle">
              New Classical: Flexible Wages Self-Correct Deflationary Gap Back to Yf
            </text>
          </g>
        );
      }

      // ==========================================
      // D-19: Inflationary vs Deflationary Gaps
      // ==========================================
      case "diag-inflationary-deflationary-gaps": {
        const isInflationary = activeControl === "show-inflationary-gap";
        return (
          <g>
            {/* Vertical LRAS */}
            <line x1="300" y1="60" x2="300" y2="340" stroke="#10b981" strokeWidth="4" />
            <text x="305" y="65" fill="#10b981" fontSize="12" fontWeight="bold">LRAS (Yf)</text>
            <text x="295" y="358" fill="#10b981" fontSize="12" fontWeight="bold">Yf</text>

            {/* SRAS */}
            <line x1="60" y1="310" x2="520" y2="90" stroke="#38bdf8" strokeWidth="3" />
            <text x="525" y="95" fill="#38bdf8" fontSize="12" fontWeight="bold">SRAS</text>

            {/* Deflationary Gap Mode */}
            {!isInflationary && (
              <g>
                <line x1="60" y1="100" x2="420" y2="330" stroke="#f59e0b" strokeWidth="3.5" />
                <text x="425" y="335" fill="#f59e0b" fontSize="12" fontWeight="bold">AD (Deflationary)</text>
                <circle cx="200" cy="240" r="5" fill="#f59e0b" />
                <line x1="200" y1="240" x2="200" y2="340" stroke="#f59e0b" strokeDasharray="4,4" />
                <line x1="60" y1="240" x2="200" y2="240" stroke="#f59e0b" strokeDasharray="4,4" />
                <text x="35" y="244" fill="#fbbf24" fontSize="11" fontWeight="bold">PL1</text>
                <text x="195" y="358" fill="#fbbf24" fontSize="11" fontWeight="bold">Y1</text>

                {/* Shaded Deflationary Gap */}
                <polygon points="200,340 300,340 300,200 200,240" fill="rgba(245, 158, 11, 0.25)" stroke="#f59e0b" strokeWidth="1" />
                <text x="250" y="310" fill="#fef08a" fontSize="11" fontWeight="bold" textAnchor="middle">
                  Deflationary Gap (Yf - Y1)
                </text>
              </g>
            )}

            {/* Inflationary Gap Mode */}
            {isInflationary && (
              <g>
                <line x1="160" y1="80" x2="550" y2="330" stroke="#f43f5e" strokeWidth="3.5" />
                <text x="555" y="335" fill="#f43f5e" fontSize="12" fontWeight="bold">AD (Inflationary)</text>
                <circle cx="400" cy="150" r="5" fill="#f43f5e" />
                <line x1="400" y1="150" x2="400" y2="340" stroke="#f43f5e" strokeDasharray="4,4" />
                <line x1="60" y1="150" x2="400" y2="150" stroke="#f43f5e" strokeDasharray="4,4" />
                <text x="35" y="154" fill="#f87171" fontSize="11" fontWeight="bold">PL2</text>
                <text x="395" y="358" fill="#f87171" fontSize="11" fontWeight="bold">Y2</text>

                {/* Shaded Inflationary Gap */}
                <polygon points="300,340 400,340 400,150 300,200" fill="rgba(244, 63, 94, 0.25)" stroke="#f43f5e" strokeWidth="1" />
                <text x="350" y="310" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">
                  Inflationary Gap (Y2 - Yf)
                </text>
              </g>
            )}
          </g>
        );
      }

      // ==========================================
      // D-20: Lorenz Curve & Gini Coefficient
      // ==========================================
      case "diag-lorenz-curve": {
        const isTaxed = activeControl === "apply-progressive-tax";
        return (
          <g>
            {/* Box bounds */}
            <rect x="80" y="60" width="360" height="280" fill="none" stroke="#64748b" strokeWidth="1.5" />

            {/* 45-degree Line of Perfect Equality */}
            <line x1="80" y1="340" x2="440" y2="60" stroke="#10b981" strokeWidth="3" strokeDasharray="5,4" />
            <text x="320" y="130" fill="#10b981" fontSize="11" fontWeight="bold">
              Line of Perfect Equality (45°)
            </text>

            {/* Pre-tax Lorenz 1 */}
            <path
              d="M 80,340 Q 340,330 440,60"
              fill="none"
              stroke="#f43f5e"
              strokeWidth="3.5"
            />
            <text x="360" y="310" fill="#f43f5e" fontSize="11" fontWeight="bold">
              Lorenz 1 (Pre-Tax)
            </text>

            {/* Post-tax Lorenz 2 */}
            {isTaxed && (
              <g>
                <path
                  d="M 80,340 Q 280,260 440,60"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="3.5"
                />
                <text x="250" y="240" fill="#38bdf8" fontSize="11" fontWeight="bold">
                  Lorenz 2 (Post-Tax/Transfer)
                </text>
              </g>
            )}

            {/* Area A & Area B labels */}
            <text x="240" y="190" fill="#f87171" fontSize="14" fontWeight="bold">Area A</text>
            <text x="320" y="280" fill="#64748b" fontSize="14" fontWeight="bold">Area B</text>

            {/* Formula badge */}
            <rect x="90" y="70" width="160" height="34" rx="8" fill="rgba(15,23,42,0.85)" stroke="rgba(255,255,255,0.15)" />
            <text x="170" y="92" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
              Gini = Area A / (A + B)
            </text>
          </g>
        );
      }

      // ==========================================
      // D-21: Monetary Policy Transmission
      // ==========================================
      case "diag-monetary-policy-transmission": {
        const isCut = activeControl === "execute-rate-cut";
        return (
          <g>
            {/* Vertical LRAS */}
            <line x1="340" y1="60" x2="340" y2="340" stroke="#10b981" strokeWidth="4" />
            <text x="345" y="65" fill="#10b981" fontSize="12" fontWeight="bold">LRAS (Yf)</text>
            <text x="335" y="358" fill="#10b981" fontSize="12" fontWeight="bold">Yf</text>

            {/* SRAS */}
            <line x1="60" y1="310" x2="520" y2="90" stroke="#38bdf8" strokeWidth="3" />
            <text x="525" y="95" fill="#38bdf8" fontSize="12" fontWeight="bold">SRAS</text>

            {/* Initial AD1 (Recessionary Slump) */}
            <line x1="60" y1="110" x2="420" y2="340" stroke="#f59e0b" strokeWidth="3.5" />
            <text x="425" y="340" fill="#f59e0b" fontSize="12" fontWeight="bold">AD1 (Slump)</text>
            <circle cx="220" cy="235" r="5" fill="#f59e0b" />
            <line x1="220" y1="235" x2="220" y2="340" stroke="#f59e0b" strokeDasharray="4,4" />
            <line x1="60" y1="235" x2="220" y2="235" stroke="#f59e0b" strokeDasharray="4,4" />
            <text x="35" y="239" fill="#fbbf24" fontSize="11" fontWeight="bold">PL1</text>
            <text x="215" y="358" fill="#fbbf24" fontSize="11" fontWeight="bold">Y1</text>

            {/* Wide Rate Cut Effect AD2 */}
            {isCut && (
              <g>
                <line x1="160" y1="90" x2="540" y2="330" stroke="#10b981" strokeWidth="4" />
                <text x="545" y="335" fill="#10b981" fontSize="12" fontWeight="bold">AD2 (Stimulus)</text>
                <circle cx="340" cy="175" r="6" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                <line x1="60" y1="175" x2="340" y2="175" stroke="#10b981" strokeDasharray="4,4" />
                <text x="35" y="179" fill="#34d399" fontSize="11" fontWeight="bold">PL2</text>
                <line x1="230" y1="180" x2="310" y2="180" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow-green)" />

                {/* Transmission Mechanism Box */}
                <rect x="70" y="35" width="460" height="26" rx="6" fill="rgba(16, 185, 129, 0.25)" stroke="#10b981" />
                <text x="300" y="52" fill="#34d399" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  Rate Cut ↓ ⇒ Borrowing Cost ↓ ⇒ C &amp; I ↑ ⇒ AD Shifts Right to Yf
                </text>
              </g>
            )}
          </g>
        );
      }

      // ==========================================
      // D-22: Fiscal Policy Stimulus
      // ==========================================
      case "diag-fiscal-policy-ad": {
        const isStimulus = activeControl === "launch-stimulus";
        return (
          <g>
            {/* Vertical LRAS */}
            <line x1="340" y1="60" x2="340" y2="340" stroke="#10b981" strokeWidth="4" />
            <text x="345" y="65" fill="#10b981" fontSize="12" fontWeight="bold">LRAS (Yf)</text>
            <text x="335" y="358" fill="#10b981" fontSize="12" fontWeight="bold">Yf</text>

            {/* SRAS */}
            <line x1="60" y1="310" x2="520" y2="90" stroke="#38bdf8" strokeWidth="3" />
            <text x="525" y="95" fill="#38bdf8" fontSize="12" fontWeight="bold">SRAS</text>

            {/* Initial AD1 */}
            <line x1="60" y1="110" x2="420" y2="340" stroke="#f43f5e" strokeWidth="3.5" />
            <text x="425" y="340" fill="#f43f5e" fontSize="12" fontWeight="bold">AD1 (Deficient)</text>
            <circle cx="220" cy="235" r="5" fill="#f43f5e" />
            <line x1="220" y1="235" x2="220" y2="340" stroke="#f43f5e" strokeDasharray="4,4" />
            <line x1="60" y1="235" x2="220" y2="235" stroke="#f43f5e" strokeDasharray="4,4" />
            <text x="35" y="239" fill="#f87171" fontSize="11" fontWeight="bold">PL1</text>
            <text x="215" y="358" fill="#f87171" fontSize="11" fontWeight="bold">Y1</text>

            {/* Stimulus AD2 */}
            {isStimulus && (
              <g>
                <line x1="160" y1="90" x2="540" y2="330" stroke="#10b981" strokeWidth="4" />
                <text x="545" y="335" fill="#10b981" fontSize="12" fontWeight="bold">AD2 (G ↑, T ↓)</text>
                <circle cx="340" cy="175" r="6" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                <line x1="60" y1="175" x2="340" y2="175" stroke="#10b981" strokeDasharray="4,4" />
                <text x="35" y="179" fill="#34d399" fontSize="11" fontWeight="bold">PL2</text>
                <line x1="240" y1="180" x2="310" y2="180" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow-green)" />

                {/* Keynesian Multiplier Callout */}
                <rect x="70" y="35" width="460" height="26" rx="6" fill="rgba(16, 185, 129, 0.25)" stroke="#10b981" />
                <text x="300" y="52" fill="#34d399" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  Fiscal Stimulus: Direct G Injection + Multiplier Closes Deflationary Gap!
                </text>
              </g>
            )}
          </g>
        );
      }

      // ==========================================
      // D-23: The Crowding Out Effect
      // ==========================================
      case "diag-crowding-out": {
        const isBorrowing = activeControl === "shift-deficit-borrowing";
        return (
          <g>
            {/* Supply of Loanable Funds (Savings) */}
            <line x1="80" y1="320" x2="480" y2="80" stroke="#10b981" strokeWidth="3.5" />
            <text x="485" y="85" fill="#10b981" fontSize="12" fontWeight="bold">S (Savings)</text>

            {/* Demand for Funds D1 (Private Investment) */}
            <line x1="80" y1="80" x2="480" y2="320" stroke="#38bdf8" strokeWidth="3.5" />
            <text x="485" y="325" fill="#38bdf8" fontSize="12" fontWeight="bold">D1 (Private Inv)</text>

            {/* Equilibrium 1 */}
            <circle cx="280" cy="200" r="5" fill="#ffffff" />
            <line x1="280" y1="200" x2="280" y2="340" stroke="#94a3b8" strokeDasharray="4,4" />
            <line x1="60" y1="200" x2="280" y2="200" stroke="#94a3b8" strokeDasharray="4,4" />
            <text x="40" y="204" fill="#94a3b8" fontSize="11" fontWeight="bold">r1</text>
            <text x="275" y="358" fill="#94a3b8" fontSize="11" fontWeight="bold">Q1</text>

            {/* Deficit Borrowing D2 - 90px shift */}
            {isBorrowing && (
              <g>
                <line x1="170" y1="80" x2="550" y2="310" stroke="#f43f5e" strokeWidth="4" />
                <text x="555" y="315" fill="#f43f5e" fontSize="12" fontWeight="bold">D2 (Private + Gov)</text>
                <circle cx="350" cy="160" r="6" fill="#f43f5e" stroke="#ffffff" strokeWidth="2" />
                <line x1="60" y1="160" x2="350" y2="160" stroke="#f43f5e" strokeDasharray="4,4" />
                <text x="40" y="164" fill="#f87171" fontSize="11" fontWeight="bold">r2</text>

                {/* Crowded Out Private Investment */}
                <line x1="190" y1="160" x2="190" y2="340" stroke="#f43f5e" strokeDasharray="4,4" />
                <circle cx="190" cy="160" r="5" fill="#f43f5e" />
                <text x="185" y="358" fill="#f43f5e" fontSize="11" fontWeight="bold">Q3</text>
                <line x1="280" y1="315" x2="190" y2="315" stroke="#f43f5e" strokeWidth="2.5" markerEnd="url(#arrow-rose)" />
                <text x="235" y="305" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">
                  Crowded Out (Q1 - Q3)
                </text>

                {/* Banner */}
                <rect x="70" y="35" width="460" height="26" rx="6" fill="rgba(244, 63, 94, 0.25)" stroke="#f43f5e" />
                <text x="300" y="52" fill="#fca5a5" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  Deficit Financing Drives Up Interest Rates (r1 → r2), Crowding Out Private Investment!
                </text>
              </g>
            )}
          </g>
        );
      }

      // ==========================================
      // D-24: Supply-Side Policies (LRAS Shift)
      // ==========================================
      case "diag-supply-side-lras": {
        const isShift = activeControl === "shift-lras-right";
        return (
          <g>
            {/* AD Curve */}
            <line x1="80" y1="80" x2="480" y2="320" stroke="#38bdf8" strokeWidth="3.5" />
            <text x="485" y="325" fill="#38bdf8" fontSize="12" fontWeight="bold">AD</text>

            {/* Initial LRAS1 */}
            <line x1="230" y1="60" x2="230" y2="340" stroke="#f59e0b" strokeWidth="4" />
            <text x="235" y="65" fill="#f59e0b" fontSize="12" fontWeight="bold">LRAS1</text>
            <circle cx="230" cy="170" r="5" fill="#f59e0b" />
            <line x1="60" y1="170" x2="230" y2="170" stroke="#f59e0b" strokeDasharray="4,4" />
            <text x="35" y="174" fill="#fbbf24" fontSize="11" fontWeight="bold">PL1</text>
            <text x="225" y="358" fill="#fbbf24" fontSize="11" fontWeight="bold">Yf1</text>

            {/* Expanded LRAS2 - 130px wide shift */}
            {isShift && (
              <g>
                <line x1="380" y1="60" x2="380" y2="340" stroke="#10b981" strokeWidth="4" />
                <text x="385" y="65" fill="#10b981" fontSize="12" fontWeight="bold">LRAS2</text>
                <circle cx="380" cy="260" r="6" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                <line x1="60" y1="260" x2="380" y2="260" stroke="#10b981" strokeDasharray="4,4" />
                <text x="35" y="264" fill="#34d399" fontSize="11" fontWeight="bold">PL2</text>
                <text x="375" y="358" fill="#34d399" fontSize="11" fontWeight="bold">Yf2</text>
                <line x1="250" y1="150" x2="360" y2="150" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow-green)" />

                {/* Growth Banner */}
                <rect x="70" y="35" width="460" height="26" rx="6" fill="rgba(16, 185, 129, 0.25)" stroke="#10b981" />
                <text x="300" y="52" fill="#34d399" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  Non-Inflationary Growth: Potential GDP Expands (Yf1 → Yf2) While PL Falls!
                </text>
              </g>
            )}
          </g>
        );
      }

      // ==========================================
      // D-25: Free International Trade Imports
      // ==========================================
      case "diag-free-trade-imports": {
        const isSurplus = activeControl === "compare-surplus";
        return (
          <g>
            {/* Domestic Demand Dd */}
            <line x1="80" y1="80" x2="480" y2="320" stroke="#0ea5e9" strokeWidth="3.5" />
            <text x="485" y="325" fill="#0ea5e9" fontSize="12" fontWeight="bold">Dd</text>

            {/* Domestic Supply Sd */}
            <line x1="80" y1="320" x2="480" y2="80" stroke="#10b981" strokeWidth="3.5" />
            <text x="485" y="85" fill="#10b981" fontSize="12" fontWeight="bold">Sd</text>

            {/* Autarky Equilibrium Pe */}
            <circle cx="280" cy="200" r="4" fill="#64748b" />
            <line x1="60" y1="200" x2="280" y2="200" stroke="#64748b" strokeDasharray="3,3" />
            <text x="38" y="204" fill="#64748b" fontSize="10">Pe (Autarky)</text>

            {/* World Price Pw (75px below Pe) */}
            <line x1="60" y1="275" x2="520" y2="275" stroke="#38bdf8" strokeWidth="3" />
            <text x="525" y="280" fill="#38bdf8" fontSize="12" fontWeight="bold">Pw (World Supply)</text>
            <text x="35" y="279" fill="#38bdf8" fontSize="11" fontWeight="bold">Pw</text>

            {/* Q1 (Domestic production contracts) */}
            <line x1="160" y1="275" x2="160" y2="340" stroke="#10b981" strokeDasharray="4,4" />
            <circle cx="160" cy="275" r="5" fill="#10b981" />
            <text x="155" y="358" fill="#10b981" fontSize="11" fontWeight="bold">Q1 (Sd)</text>

            {/* Q2 (Domestic consumption expands) */}
            <line x1="400" y1="275" x2="400" y2="340" stroke="#0ea5e9" strokeDasharray="4,4" />
            <circle cx="400" cy="275" r="5" fill="#0ea5e9" />
            <text x="395" y="358" fill="#0ea5e9" fontSize="11" fontWeight="bold">Q2 (Dd)</text>

            {/* Imports Bracket: 240px wide */}
            <line x1="160" y1="300" x2="400" y2="300" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrow-cyan)" markerStart="url(#arrow-cyan)" />
            <text x="280" y="318" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
              Imports = Q2 - Q1
            </text>

            {/* Consumer Surplus Expansion */}
            {isSurplus && (
              <polygon points="80,80 400,275 60,275 60,80" fill="rgba(14, 165, 233, 0.25)" stroke="#0ea5e9" strokeWidth="1" />
            )}
          </g>
        );
      }

      // ==========================================
      // D-26: Import Tariff & Welfare Areas
      // ==========================================
      case "diag-tariff-welfare": {
        const isDWL = activeControl === "highlight-dwl";
        const isRev = activeControl === "highlight-gov-revenue";
        return (
          <g>
            {/* World Price Pw */}
            <line x1="60" y1="270" x2="520" y2="270" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="525" y="275" fill="#38bdf8" fontSize="11" fontWeight="bold">Pw (Free Trade)</text>
            <text x="35" y="274" fill="#38bdf8" fontSize="11" fontWeight="bold">Pw</text>

            {/* Tariff Price Pw + t (70px wide gap) */}
            <line x1="60" y1="195" x2="520" y2="195" stroke="#f43f5e" strokeWidth="3" />
            <text x="525" y="200" fill="#f43f5e" fontSize="11" fontWeight="bold">Pw + Tariff</text>
            <text x="20" y="199" fill="#f43f5e" fontSize="11" fontWeight="bold">Pw + t</text>

            {/* Q1, Q3 (domestic supply) */}
            <line x1="130" y1="270" x2="130" y2="340" stroke="#38bdf8" strokeDasharray="4,4" />
            <text x="125" y="358" fill="#38bdf8" fontSize="11">Q1</text>
            <line x1="200" y1="195" x2="200" y2="340" stroke="#f43f5e" strokeDasharray="4,4" />
            <text x="195" y="358" fill="#f43f5e" fontSize="11" fontWeight="bold">Q3</text>

            {/* Q4, Q2 (domestic demand) */}
            <line x1="360" y1="195" x2="360" y2="340" stroke="#f43f5e" strokeDasharray="4,4" />
            <text x="355" y="358" fill="#f43f5e" fontSize="11" fontWeight="bold">Q4</text>
            <line x1="430" y1="270" x2="430" y2="340" stroke="#38bdf8" strokeDasharray="4,4" />
            <text x="425" y="358" fill="#38bdf8" fontSize="11">Q2</text>

            {/* Area a: Producer Surplus Gain */}
            <polygon points="60,195 200,195 130,270 60,270" fill="rgba(16, 185, 129, 0.4)" stroke="#10b981" strokeWidth="1" />
            <text x="110" y="235" fill="#10b981" fontSize="12" fontWeight="bold">a (PS Gain)</text>

            {/* Area b: Production Inefficiency DWL */}
            <polygon points="130,270 200,195 200,270" fill={isDWL ? "rgba(244, 63, 94, 0.7)" : "rgba(244, 63, 94, 0.4)"} stroke="#f43f5e" strokeWidth="1.5" />
            <text x="175" y="250" fill="#fca5a5" fontSize="11" fontWeight="bold">b</text>

            {/* Area c: Tariff Revenue Rectangle */}
            <polygon points="200,195 360,195 360,270 200,270" fill={isRev ? "rgba(6, 182, 212, 0.6)" : "rgba(6, 182, 212, 0.35)"} stroke="#06b6d4" strokeWidth="1.5" />
            <text x="245" y="235" fill="#22d3ee" fontSize="12" fontWeight="bold">c (Tariff Revenue)</text>

            {/* Area d: Consumption DWL */}
            <polygon points="360,195 430,270 360,270" fill={isDWL ? "rgba(245, 158, 11, 0.7)" : "rgba(245, 158, 11, 0.4)"} stroke="#f59e0b" strokeWidth="1.5" />
            <text x="375" y="250" fill="#fef08a" fontSize="11" fontWeight="bold">d</text>

            {/* Domestic Demand & Supply */}
            <line x1="60" y1="80" x2="500" y2="340" stroke="#0ea5e9" strokeWidth="3.5" />
            <text x="505" y="340" fill="#0ea5e9" fontSize="12" fontWeight="bold">Dd</text>
            <line x1="60" y1="340" x2="500" y2="80" stroke="#10b981" strokeWidth="3.5" />
            <text x="505" y="85" fill="#10b981" fontSize="12" fontWeight="bold">Sd</text>
          </g>
        );
      }

      // ==========================================
      // D-27: Import Quota & Quota Rents
      // ==========================================
      case "diag-quota-welfare": {
        const isRent = activeControl === "highlight-quota-rent";
        return (
          <g>
            {/* World Price Pw */}
            <line x1="60" y1="270" x2="520" y2="270" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="525" y="275" fill="#38bdf8" fontSize="11">Pw</text>

            {/* Quota Equilibrium Price Pq */}
            <line x1="60" y1="195" x2="520" y2="195" stroke="#a855f7" strokeWidth="3" />
            <text x="525" y="200" fill="#a855f7" fontSize="11" fontWeight="bold">Pq (Quota)</text>
            <text x="35" y="199" fill="#a855f7" fontSize="11" fontWeight="bold">Pq</text>

            {/* Domestic Demand & Supply */}
            <line x1="60" y1="80" x2="500" y2="340" stroke="#0ea5e9" strokeWidth="3.5" />
            <text x="505" y="340" fill="#0ea5e9" fontSize="12" fontWeight="bold">Dd</text>
            <line x1="60" y1="340" x2="500" y2="80" stroke="#10b981" strokeWidth="3.5" />
            <text x="505" y="85" fill="#10b981" fontSize="12" fontWeight="bold">Sd</text>

            {/* Sd + Quota curve */}
            <line x1="180" y1="270" x2="480" y2="80" stroke="#a855f7" strokeWidth="3" strokeDasharray="5,3" />
            <text x="485" y="75" fill="#a855f7" fontSize="11" fontWeight="bold">Sd + quota</text>

            {/* Coordinates */}
            <line x1="200" y1="195" x2="200" y2="340" stroke="#10b981" strokeDasharray="4,4" />
            <text x="195" y="358" fill="#10b981" fontSize="11" fontWeight="bold">Q3</text>
            <line x1="360" y1="195" x2="360" y2="340" stroke="#0ea5e9" strokeDasharray="4,4" />
            <text x="355" y="358" fill="#0ea5e9" fontSize="11" fontWeight="bold">Q4</text>

            {/* Central Quota Rent Box */}
            <polygon
              points="200,195 360,195 360,270 200,270"
              fill={isRent ? "rgba(168, 85, 247, 0.6)" : "rgba(168, 85, 247, 0.35)"}
              stroke="#a855f7"
              strokeWidth="1.5"
            />
            <text x="280" y="235" fill="#c084fc" fontSize="11" fontWeight="bold" textAnchor="middle">
              Quota Rent: (Pq - Pw) × Quota
            </text>

            {/* Production & Consumption DWLs */}
            <polygon points="130,270 200,195 200,270" fill="rgba(244, 63, 94, 0.4)" stroke="#f43f5e" strokeWidth="1" />
            <polygon points="360,195 430,270 360,270" fill="rgba(245, 158, 11, 0.4)" stroke="#f59e0b" strokeWidth="1" />
          </g>
        );
      }

      // ==========================================
      // D-28: Floating Exchange Rate Market
      // ==========================================
      case "diag-forex-floating": {
        const isApprec = activeControl === "simulate-appreciation";
        const isDeprec = activeControl === "simulate-depreciation";
        return (
          <g>
            {/* Supply of USD */}
            <line x1="80" y1="320" x2="480" y2="80" stroke="#10b981" strokeWidth="3.5" />
            <text x="485" y="85" fill="#10b981" fontSize="12" fontWeight="bold">S1 (Supply of USD)</text>

            {/* Demand for USD D1 */}
            <line x1="80" y1="80" x2="480" y2="320" stroke="#0ea5e9" strokeWidth="3.5" />
            <text x="485" y="325" fill="#0ea5e9" fontSize="12" fontWeight="bold">D1 (Demand for USD)</text>

            {/* Baseline Equilibrium */}
            <circle cx="280" cy="200" r="5" fill="#ffffff" />
            <line x1="280" y1="200" x2="280" y2="340" stroke="#94a3b8" strokeDasharray="4,4" />
            <line x1="60" y1="200" x2="280" y2="200" stroke="#94a3b8" strokeDasharray="4,4" />
            <text x="35" y="204" fill="#94a3b8" fontSize="11" fontWeight="bold">e1</text>
            <text x="275" y="358" fill="#94a3b8" fontSize="11" fontWeight="bold">Q1</text>

            {/* Currency Appreciation: D shifts right - 100px wide */}
            {isApprec && (
              <g>
                <line x1="180" y1="80" x2="550" y2="305" stroke="#a855f7" strokeWidth="4" />
                <text x="555" y="310" fill="#a855f7" fontSize="12" fontWeight="bold">D2 (Right)</text>
                <circle cx="350" cy="155" r="6" fill="#a855f7" stroke="#ffffff" strokeWidth="2" />
                <line x1="60" y1="155" x2="350" y2="155" stroke="#a855f7" strokeDasharray="4,4" />
                <text x="35" y="159" fill="#c084fc" fontSize="11" fontWeight="bold">e2</text>
                <line x1="270" y1="140" x2="350" y2="140" stroke="#a855f7" strokeWidth="3" markerEnd="url(#arrow-purple)" />

                {/* Banner */}
                <rect x="70" y="35" width="460" height="26" rx="6" fill="rgba(168, 85, 247, 0.25)" stroke="#a855f7" />
                <text x="300" y="52" fill="#c084fc" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  Higher Interest Rates / Export Boom ⇒ Demand Rises ⇒ Appreciation (e1 → e2)
                </text>
              </g>
            )}

            {/* Currency Depreciation: S shifts right - 100px wide */}
            {isDeprec && (
              <g>
                <line x1="180" y1="330" x2="550" y2="90" stroke="#f43f5e" strokeWidth="4" />
                <text x="555" y="95" fill="#f43f5e" fontSize="12" fontWeight="bold">S2 (Right)</text>
                <circle cx="350" cy="245" r="6" fill="#f43f5e" stroke="#ffffff" strokeWidth="2" />
                <line x1="60" y1="245" x2="350" y2="245" stroke="#f43f5e" strokeDasharray="4,4" />
                <text x="35" y="249" fill="#f87171" fontSize="11" fontWeight="bold">e3</text>
                <line x1="270" y1="220" x2="350" y2="220" stroke="#f43f5e" strokeWidth="3" markerEnd="url(#arrow-rose)" />

                {/* Banner */}
                <rect x="70" y="35" width="460" height="26" rx="6" fill="rgba(244, 63, 94, 0.25)" stroke="#f43f5e" />
                <text x="300" y="52" fill="#fca5a5" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  High Domestic Inflation / Trade Deficit ⇒ Supply Rises ⇒ Depreciation (e1 → e3)
                </text>
              </g>
            )}
          </g>
        );
      }

      // ==========================================
      // D-29: The Poverty Cycle (Poverty Trap)
      // ==========================================
      case "diag-poverty-cycle": {
        const isBroken = activeControl === "break-the-cycle";
        return (
          <g>
            {/* Background container */}
            <rect x="25" y="25" width="550" height="350" rx="16" fill="rgba(15, 23, 42, 0.6)" stroke="rgba(255, 255, 255, 0.08)" />

            {/* Node 1: Top Center - Low Income */}
            <rect x="220" y="45" width="160" height="42" rx="10" fill="rgba(244, 63, 94, 0.2)" stroke="#f43f5e" strokeWidth="2" />
            <text x="300" y="71" fill="#fca5a5" fontSize="12" fontWeight="bold" textAnchor="middle">
              1. Low Household Income
            </text>

            {/* Node 2: Top Right - Low Savings */}
            <rect x="410" y="140" width="150" height="42" rx="10" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2" />
            <text x="485" y="166" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">
              2. Low Domestic Savings
            </text>

            {/* Node 3: Bottom Right - Low Investment */}
            <rect x="360" y="270" width="170" height="42" rx="10" fill="rgba(244, 63, 94, 0.2)" stroke="#f43f5e" strokeWidth="2" />
            <text x="445" y="296" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">
              3. Low Capital Investment
            </text>

            {/* Node 4: Bottom Left - Low Human Capital */}
            <rect x="80" y="270" width="170" height="42" rx="10" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2" />
            <text x="165" y="296" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">
              4. Low Human Capital &amp; Health
            </text>

            {/* Node 5: Top Left - Low Productivity */}
            <rect x="40" y="140" width="150" height="42" rx="10" fill="rgba(244, 63, 94, 0.2)" stroke="#f43f5e" strokeWidth="2" />
            <text x="115" y="166" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">
              5. Low Productivity
            </text>

            {/* Connecting Vicious Loop Arrows (Clockwise) */}
            <path d="M 380,66 C 440,66 470,100 480,140" fill="none" stroke="#f43f5e" strokeWidth="2.5" markerEnd="url(#arrow-rose)" />
            <path d="M 485,182 C 485,220 470,250 455,270" fill="none" stroke="#f43f5e" strokeWidth="2.5" markerEnd="url(#arrow-rose)" />
            <path d="M 360,291 L 250,291" fill="none" stroke="#f43f5e" strokeWidth="2.5" markerEnd="url(#arrow-rose)" />
            <path d="M 120,270 C 105,250 95,220 100,182" fill="none" stroke="#f43f5e" strokeWidth="2.5" markerEnd="url(#arrow-rose)" />
            <path d="M 120,140 C 140,90 180,66 220,66" fill="none" stroke="#f43f5e" strokeWidth="2.5" markerEnd="url(#arrow-rose)" />

            {/* Center Label */}
            <circle cx="300" cy="180" r="45" fill="rgba(15, 23, 42, 0.9)" stroke="rgba(255,255,255,0.15)" />
            <text x="300" y="175" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">VICIOUS</text>
            <text x="300" y="192" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">CYCLE</text>

            {/* External Interventions: Breaking the Cycle */}
            {isBroken && (
              <g>
                {/* Microfinance Injection */}
                <path d="M 520,70 L 490,140" fill="none" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow-green)" />
                <rect x="420" y="30" width="140" height="24" rx="6" fill="#10b981" />
                <text x="490" y="46" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                  + Microfinance / Aid
                </text>

                {/* Free Schooling Injection */}
                <path d="M 50,330 L 110,312" fill="none" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow-green)" />
                <rect x="25" y="340" width="160" height="24" rx="6" fill="#10b981" />
                <text x="105" y="356" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                  + Free Universal Schools
                </text>

                {/* Virtuous Banner */}
                <rect x="160" y="335" width="390" height="26" rx="6" fill="rgba(16, 185, 129, 0.25)" stroke="#10b981" />
                <text x="355" y="352" fill="#34d399" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  ✓ External Intervention Transforms Trap into Virtuous Cycle of Growth!
                </text>
              </g>
            )}
          </g>
        );
      }

      default: {
        return (
          <g>
            <line x1="60" y1="80" x2="500" y2="340" stroke="#0ea5e9" strokeWidth="3.5" />
            <line x1="60" y1="340" x2="500" y2="80" stroke="#10b981" strokeWidth="3.5" />
            <circle cx="280" cy="210" r="5" fill="#f1f5f9" />
            <line x1="280" y1="210" x2="280" y2="340" stroke="#94a3b8" strokeDasharray="4,4" />
            <line x1="60" y1="210" x2="280" y2="210" stroke="#94a3b8" strokeDasharray="4,4" />
            <text x="285" y="205" fill="#ffffff" fontSize="12" fontWeight="bold">Equilibrium</text>
            <text x="40" y="215" fill="#94a3b8" fontSize="11">P*</text>
            <text x="275" y="358" fill="#94a3b8" fontSize="11">Q*</text>
          </g>
        );
      }
    }
  };

  return (
    <div
      className={`bg-slate-950/75 rounded-3xl p-5 border border-white/10 relative overflow-hidden shadow-inner ${className}`}
    >
      {/* Top Header & Metadata */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs px-2.5 py-0.5 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-500/30 font-bold">
            {dossier.code}
          </span>
          <span className="text-sm font-bold text-white tracking-tight">
            {dossier.title}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowSteps(!showSteps)}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-mono transition-all flex items-center gap-1 cursor-pointer ${
              showSteps
                ? "bg-purple-500/25 text-purple-300 border border-purple-500/40"
                : "bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Drawing Steps
          </button>
        </div>
      </div>

      {/* Interactive Controls Bar */}
      {dossier.interactiveControls.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 mb-3 p-2 rounded-2xl bg-slate-950/40 border border-white/5">
          <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1 pl-1 pr-2">
            <Sliders className="w-3 h-3 text-sky-400" /> Controls:
          </span>
          <button
            onClick={() => setActiveControl("default")}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              activeControl === "default"
                ? "bg-sky-500/30 text-sky-200 border border-sky-400/50"
                : "bg-white/5 text-slate-400 hover:text-white"
            }`}
          >
            Default View
          </button>
          {dossier.interactiveControls.map((ctrl) => (
            <button
              key={ctrl.id}
              onClick={() => setActiveControl(ctrl.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                activeControl === ctrl.id
                  ? "bg-purple-500/30 text-purple-200 border border-purple-400/50"
                  : "bg-white/5 text-slate-400 hover:text-white"
              }`}
            >
              {ctrl.label}
            </button>
          ))}
          {dossier.shadedRegions.length > 0 && (
            <button
              onClick={() => setHighlightDWL(!highlightDWL)}
              className={`ml-auto px-2 py-1 rounded-lg text-[10px] font-mono transition-all cursor-pointer ${
                highlightDWL
                  ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                  : "bg-white/5 text-slate-500"
              }`}
            >
              DWL Shading
            </button>
          )}
        </div>
      )}

      {/* Main SVG Render Canvas - Proportional Ergonomic Dimensions */}
      <div className="relative w-full max-w-4xl mx-auto rounded-2xl bg-[#080d1a] border border-white/10 overflow-hidden shadow-xl flex items-center justify-center p-2 sm:p-4">
        <svg
          viewBox="0 0 600 400"
          className="w-full h-auto select-none max-h-[380px] object-contain"
          style={{ minHeight: compact ? "180px" : "260px", maxHeight: compact ? "240px" : "380px" }}
        >
          <defs>
            <marker
              id="arrow-axis"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748b" />
            </marker>
            <marker
              id="arrow-green"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
            </marker>
            <marker
              id="arrow-rose"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#f43f5e" />
            </marker>
            <marker
              id="arrow-amber"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#f59e0b" />
            </marker>
            <marker
              id="arrow-cyan"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
            </marker>
            <marker
              id="arrow-purple"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#a855f7" />
            </marker>
          </defs>

          {/* Standard Cartesian Grid & Axes (hidden for custom multi-axis or flowchart diagrams) */}
          {!isCustomAxes && (
            <g>
              <g stroke="rgba(255,255,255,0.03)" strokeWidth="1">
                <line x1="60" y1="120" x2="540" y2="120" />
                <line x1="60" y1="190" x2="540" y2="190" />
                <line x1="60" y1="260" x2="540" y2="260" />
                <line x1="180" y1="40" x2="180" y2="340" />
                <line x1="300" y1="40" x2="300" y2="340" />
                <line x1="420" y1="40" x2="420" y2="340" />
              </g>

              {/* Y-axis */}
              <line
                x1="60"
                y1="340"
                x2="60"
                y2="30"
                stroke="#94a3b8"
                strokeWidth="2.5"
                markerEnd="url(#arrow-axis)"
              />
              {/* X-axis */}
              <line
                x1="60"
                y1="340"
                x2="550"
                y2="340"
                stroke="#94a3b8"
                strokeWidth="2.5"
                markerEnd="url(#arrow-axis)"
              />
              {/* Origin zero */}
              <text x="46" y="352" fill="#64748b" fontSize="11" fontWeight="bold">
                0
              </text>
              {/* Axis Labels */}
              <text
                x="60"
                y="20"
                fill="#e2e8f0"
                fontSize="12"
                fontWeight="bold"
                textAnchor="start"
              >
                {dossier.yAxisLabel}
              </text>
              <text
                x="545"
                y="365"
                fill="#e2e8f0"
                fontSize="12"
                fontWeight="bold"
                textAnchor="end"
              >
                {dossier.xAxisLabel}
              </text>
            </g>
          )}

          {/* Diagram Specific Graphics */}
          {renderSvgContent()}
        </svg>

        {/* Step-by-Step Drawing Guide Overlay */}
        {showSteps && (
          <div className="absolute inset-0 bg-slate-950/92 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
              <span className="text-xs font-mono font-bold text-purple-300 flex items-center gap-1.5">
                <Layers className="w-4 h-4" /> Official IB Exam Step-by-Step Drawing Guide
              </span>
              <button
                onClick={() => setShowSteps(false)}
                className="text-xs text-slate-400 hover:text-white cursor-pointer px-2 py-0.5 rounded bg-white/5"
              >
                Close
              </button>
            </div>
            <div className="space-y-2">
              {dossier.drawingSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="font-mono text-purple-400 font-bold shrink-0">
                    Step {idx + 1}:
                  </span>
                  <span>{step.replace(/^\d+\.\s*/, "")}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Legend & Curves Bar */}
      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
        {dossier.curves.map((c, idx) => (
          <div key={idx} className="flex items-center gap-1.5">
            <span
              className="w-3 h-1 rounded-full shrink-0"
              style={{ backgroundColor: c.color }}
            />
            <span className="text-slate-200 font-mono text-[11px] font-semibold">
              {c.name}:
            </span>
            <span className="text-slate-400 text-[11px]">{c.description}</span>
          </div>
        ))}
      </div>

      {/* Exam Guidance & Common Pitfalls Footer */}
      {!compact && (
        <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-2.5 rounded-xl bg-sky-950/30 border border-sky-500/20">
            <span className="font-mono text-[10px] uppercase font-bold text-sky-300 flex items-center gap-1 mb-1">
              <Sparkles className="w-3 h-3" /> IB Exam Analysis Note:
            </span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              {dossier.examAnalysis}
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-rose-950/30 border border-rose-500/20">
            <span className="font-mono text-[10px] uppercase font-bold text-rose-300 flex items-center gap-1 mb-1">
              ⚠️ Common Student Pitfalls:
            </span>
            <ul className="text-slate-300 text-[11px] space-y-0.5 list-disc list-inside">
              {dossier.commonPitfalls.map((pitfall, pIdx) => (
                <li key={pIdx}>{pitfall}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export const InteractiveDiagram = React.memo(InteractiveDiagramComponent);
