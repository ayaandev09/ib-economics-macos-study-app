"use client";

import React, { useState, useMemo } from "react";
import {
  TrendingUp,
  Sliders,
  DollarSign,
  Scale,
  Sparkles,
  RotateCcw,
  Layers,
  ArrowRight,
  ShieldAlert,
  Percent,
  Activity,
  Zap,
  Info,
} from "lucide-react";

type SimTab = "market-intervention" | "elasticity-tr" | "adas-phillips";

export function LivingEconomicsDiagramSimulator() {
  const [activeTab, setActiveTab] = useState<SimTab>("market-intervention");

  // =========================================================================
  // 1. MARKET INTERVENTION STATE (Tax, Subsidy, Price Ceiling, Price Floor)
  // =========================================================================
  const [demandShift, setDemandShift] = useState(0); // -40 to +40
  const [supplyShift, setSupplyShift] = useState(0); // -40 to +40
  const [intervention, setIntervention] = useState<"none" | "tax" | "subsidy" | "ceiling" | "floor">("tax");
  const [taxAmount, setTaxAmount] = useState(15); // $ per unit
  const [subsidyAmount, setSubsidyAmount] = useState(12); // $ per unit
  const [ceilingPrice, setCeilingPrice] = useState(35); // $
  const [floorPrice, setFloorPrice] = useState(65); // $

  // Mathematical Equilibrium Calculations:
  // Baseline Linear Equations:
  // Qd = (100 + demandShift) - P
  // Qs = (-20 + supplyShift) + P  => P = Q + 20 - supplyShift
  // Equilibrium without intervention:
  // (100 + dShift) - P = P - 20 + sShift
  // 2P = 120 + dShift - sShift => P0 = 60 + (dShift - sShift)/2
  const p0 = 60 + (demandShift - supplyShift) / 2;
  const q0 = Math.max(5, 100 + demandShift - p0);

  // When Tax is imposed: Supply shifts UP vertically by taxAmount:
  // P_consumer = P0 + taxAmount/2
  // P_producer = P_consumer - taxAmount
  // Q_tax = 100 + demandShift - P_consumer
  const pTaxConsumer = p0 + taxAmount * 0.5;
  const pTaxProducer = pTaxConsumer - taxAmount;
  const qTax = Math.max(5, 100 + demandShift - pTaxConsumer);
  const taxRevenue = taxAmount * qTax;
  const consumerTaxBurden = (pTaxConsumer - p0) * qTax;
  const producerTaxBurden = (p0 - pTaxProducer) * qTax;
  const deadweightLossTax = 0.5 * taxAmount * (q0 - qTax);

  // When Subsidy is imposed: Supply shifts DOWN vertically by subsidyAmount:
  const pSubConsumer = p0 - subsidyAmount * 0.5;
  const pSubProducer = pSubConsumer + subsidyAmount;
  const qSub = 100 + demandShift - pSubConsumer;
  const subsidyCost = subsidyAmount * qSub;
  const deadweightLossSubsidy = 0.5 * subsidyAmount * (qSub - q0);

  // When Price Ceiling:
  const qCeilingD = Math.max(0, 100 + demandShift - ceilingPrice);
  const qCeilingS = Math.max(0, ceilingPrice - 20 + supplyShift);
  const ceilingShortage = Math.max(0, qCeilingD - qCeilingS);

  // When Price Floor:
  const qFloorD = Math.max(0, 100 + demandShift - floorPrice);
  const qFloorS = Math.max(0, floorPrice - 20 + supplyShift);
  const floorSurplus = Math.max(0, qFloorS - qFloorD);

  // Chart coordinate mappings (viewBox 0 0 500 360, padX 50, padY 20, w 420, h 280)
  const padX = 50;
  const padY = 25;
  const chartW = 420;
  const chartH = 280;

  const toX = (q: number) => padX + (Math.min(q, 120) / 120) * chartW;
  const toY = (p: number) => padY + chartH - (Math.min(p, 120) / 120) * chartH;

  // Baseline Demand Line: from (0, 100+dShift) to (100+dShift, 0)
  const dX1 = toX(0);
  const dY1 = toY(100 + demandShift);
  const dX2 = toX(100 + demandShift);
  const dY2 = toY(0);

  // Baseline Supply Line: from (0, 20-sShift) to (100, 120-sShift)
  const sX1 = toX(0);
  const sY1 = toY(20 - supplyShift);
  const sX2 = toX(100);
  const sY2 = toY(120 - supplyShift);

  // Shifted Supply with Tax:
  const sTaxY1 = toY(20 - supplyShift + taxAmount);
  const sTaxY2 = toY(120 - supplyShift + taxAmount);

  // Shifted Supply with Subsidy:
  const sSubY1 = toY(20 - supplyShift - subsidyAmount);
  const sSubY2 = toY(120 - supplyShift - subsidyAmount);

  // =========================================================================
  // 2. ELASTICITY & TOTAL REVENUE (PED / TR) STATE
  // =========================================================================
  const [sliderPrice, setSliderPrice] = useState(50); // $0 to $100

  // Standard linear demand: Q = 100 - P
  const simQ = Math.max(0, 100 - sliderPrice);
  const simTR = sliderPrice * simQ;
  const ped = simQ > 0 ? (sliderPrice / simQ).toFixed(2) : "∞";

  const elasticityZone =
    sliderPrice > 50 ? "elastic" : sliderPrice === 50 ? "unitary" : "inelastic";

  // =========================================================================
  // 3. AD/AS & PHILLIPS CURVE DUAL-VIEW STATE
  // =========================================================================
  const [adShift, setAdShift] = useState(15); // -30 to +30
  const [srasShift, setSrasShift] = useState(0); // -30 to +30 (negative = supply shock / stagflation)

  // Macro variables:
  // Base: Y = 100, APL = 100, Unemployment = 5.0%, Inflation = 2.0%
  const realGDP = 100 + adShift * 0.6 + srasShift * 0.5;
  const priceLevel = 100 + adShift * 0.5 - srasShift * 0.6;
  const unemploymentRate = Math.max(2.0, 5.0 - adShift * 0.1 - srasShift * 0.08).toFixed(1);
  const inflationRate = Math.max(-1.0, 2.0 + adShift * 0.12 - srasShift * 0.15).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Flagship Hero Header */}
      <div className="relative overflow-hidden rounded-3xl p-6 md:p-8 bg-gradient-to-br from-slate-950 via-sky-950/30 to-slate-900 border border-sky-500/20 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30 shadow-inner">
                IB Economics SL Flagship
              </span>
              <span className="font-mono text-xs text-slate-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Live Quantitative Market Simulator
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight font-display">
              Living Market Diagram &amp; Welfare Simulator
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Dynamically manipulate supply, demand, elasticity zones, and government interventions in real-time with automated Deadweight Welfare Loss ($DWL$) and tax burden geometry.
            </p>
          </div>

          {/* Module Selector Pill Bar */}
          <div className="flex flex-wrap md:flex-col gap-2 p-1.5 rounded-2xl bg-black/50 border border-white/10 shrink-0">
            <button
              onClick={() => setActiveTab("market-intervention")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all cursor-pointer ${
                activeTab === "market-intervention"
                  ? "bg-gradient-to-r from-sky-600 to-teal-600 text-white shadow-lg border border-sky-400/40"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Scale className="w-4 h-4 text-sky-300" />
              <span>S&amp;D Welfare &amp; Interventions</span>
            </button>
            <button
              onClick={() => setActiveTab("elasticity-tr")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all cursor-pointer ${
                activeTab === "elasticity-tr"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg border border-purple-400/40"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Percent className="w-4 h-4 text-purple-300" />
              <span>PED Zones &amp; Total Revenue</span>
            </button>
            <button
              onClick={() => setActiveTab("adas-phillips")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all cursor-pointer ${
                activeTab === "adas-phillips"
                  ? "bg-gradient-to-r from-amber-600 to-rose-600 text-white shadow-lg border border-amber-400/40"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Activity className="w-4 h-4 text-amber-300" />
              <span>AD/AS &amp; Phillips Curve Sync</span>
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          TAB 1: LIVE S&D MARKET INTERVENTION & WELFARE SIMULATOR
          ===================================================================== */}
      {activeTab === "market-intervention" && (
        <div className="space-y-6">
          {/* Top Intervention Selector */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-950/70 border border-white/10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider px-2">
                Market Policy:
              </span>
              {[
                { id: "none", label: "Free Market Equilibrium" },
                { id: "tax", label: "Specific Indirect Tax (t)" },
                { id: "subsidy", label: "Specific Subsidy (s)" },
                { id: "ceiling", label: "Price Ceiling (Pmax)" },
                { id: "floor", label: "Price Floor (Pmin)" },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setIntervention(p.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                    intervention === p.id
                      ? "bg-sky-500/25 text-sky-200 border border-sky-400/50 shadow-md"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setDemandShift(0);
                setSupplyShift(0);
                setTaxAmount(15);
                setSubsidyAmount(12);
              }}
              className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Market
            </button>
          </div>

          {/* Key Metric Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/10">
              <span className="font-mono text-[10px] uppercase text-slate-400 block tracking-wider">
                Equilibrium Price (P*)
              </span>
              <div className="text-2xl font-black text-sky-400 font-mono mt-1">
                ${p0.toFixed(1)}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Q* = {q0.toFixed(0)} units
              </div>
            </div>

            {intervention === "tax" && (
              <>
                <div className="p-4 rounded-2xl bg-slate-900/70 border border-amber-500/30">
                  <span className="font-mono text-[10px] uppercase text-amber-400 block tracking-wider">
                    Govt Tax Revenue
                  </span>
                  <div className="text-2xl font-black text-amber-300 font-mono mt-1">
                    ${taxRevenue.toFixed(0)}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    t = ${taxAmount}/unit • Qt = {qTax.toFixed(0)}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/70 border border-purple-500/30">
                  <span className="font-mono text-[10px] uppercase text-purple-400 block tracking-wider">
                    Incidence (Consumer/Producer)
                  </span>
                  <div className="text-xl font-black text-purple-300 font-mono mt-1">
                    ${consumerTaxBurden.toFixed(0)} / ${producerTaxBurden.toFixed(0)}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Pc = ${pTaxConsumer.toFixed(1)} • Pp = ${pTaxProducer.toFixed(1)}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/40">
                  <span className="font-mono text-[10px] uppercase text-rose-400 block tracking-wider">
                    Deadweight Loss (DWL)
                  </span>
                  <div className="text-2xl font-black text-rose-400 font-mono mt-1">
                    ${deadweightLossTax.toFixed(1)}
                  </div>
                  <div className="text-[11px] text-rose-300/80 mt-0.5">
                    Welfare lost to society
                  </div>
                </div>
              </>
            )}

            {intervention === "subsidy" && (
              <>
                <div className="p-4 rounded-2xl bg-slate-900/70 border border-emerald-500/30">
                  <span className="font-mono text-[10px] uppercase text-emerald-400 block tracking-wider">
                    Govt Subsidy Cost
                  </span>
                  <div className="text-2xl font-black text-emerald-300 font-mono mt-1">
                    ${subsidyCost.toFixed(0)}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    s = ${subsidyAmount}/unit • Qsub = {qSub.toFixed(0)}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/70 border border-sky-500/30">
                  <span className="font-mono text-[10px] uppercase text-sky-400 block tracking-wider">
                    Consumer Price Benefit
                  </span>
                  <div className="text-xl font-black text-sky-300 font-mono mt-1">
                    ${pSubConsumer.toFixed(1)}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Firms receive Pp = ${pSubProducer.toFixed(1)}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/40">
                  <span className="font-mono text-[10px] uppercase text-rose-400 block tracking-wider">
                    Allocative DWL
                  </span>
                  <div className="text-2xl font-black text-rose-400 font-mono mt-1">
                    ${deadweightLossSubsidy.toFixed(1)}
                  </div>
                  <div className="text-[11px] text-rose-300/80 mt-0.5">
                    Inefficient overproduction
                  </div>
                </div>
              </>
            )}

            {intervention === "ceiling" && (
              <>
                <div className="p-4 rounded-2xl bg-slate-900/70 border border-amber-500/30">
                  <span className="font-mono text-[10px] uppercase text-amber-400 block tracking-wider">
                    Price Ceiling (Pmax)
                  </span>
                  <div className="text-2xl font-black text-amber-300 font-mono mt-1">
                    ${ceilingPrice}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Legal maximum price
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/40">
                  <span className="font-mono text-[10px] uppercase text-rose-400 block tracking-wider">
                    Market Shortage (Excess Demand)
                  </span>
                  <div className="text-2xl font-black text-rose-400 font-mono mt-1">
                    {ceilingShortage.toFixed(0)} units
                  </div>
                  <div className="text-[11px] text-rose-300/80 mt-0.5">
                    Qd ({qCeilingD.toFixed(0)}) − Qs ({qCeilingS.toFixed(0)})
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/70 border border-purple-500/30">
                  <span className="font-mono text-[10px] uppercase text-purple-400 block tracking-wider">
                    Consequence
                  </span>
                  <div className="text-sm font-bold text-white mt-1">
                    Underground Black Markets &amp; Queues
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Non-price rationing required
                  </div>
                </div>
              </>
            )}

            {intervention === "floor" && (
              <>
                <div className="p-4 rounded-2xl bg-slate-900/70 border border-emerald-500/30">
                  <span className="font-mono text-[10px] uppercase text-emerald-400 block tracking-wider">
                    Price Floor (Pmin)
                  </span>
                  <div className="text-2xl font-black text-emerald-300 font-mono mt-1">
                    ${floorPrice}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Minimum wage / price guarantee
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40">
                  <span className="font-mono text-[10px] uppercase text-amber-400 block tracking-wider">
                    Market Surplus (Excess Supply)
                  </span>
                  <div className="text-2xl font-black text-amber-300 font-mono mt-1">
                    {floorSurplus.toFixed(0)} units
                  </div>
                  <div className="text-[11px] text-amber-300/80 mt-0.5">
                    Qs ({qFloorS.toFixed(0)}) − Qd ({qFloorD.toFixed(0)})
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/70 border border-rose-500/30">
                  <span className="font-mono text-[10px] uppercase text-rose-400 block tracking-wider">
                    Govt Storage / Disposal
                  </span>
                  <div className="text-lg font-black text-rose-300 font-mono mt-1">
                    ${(floorSurplus * floorPrice).toFixed(0)}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Buyout cost to maintain floor
                  </div>
                </div>
              </>
            )}

            {intervention === "none" && (
              <>
                <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/10">
                  <span className="font-mono text-[10px] uppercase text-slate-400 block tracking-wider">
                    Consumer Surplus (CS)
                  </span>
                  <div className="text-2xl font-black text-emerald-400 font-mono mt-1">
                    ${(0.5 * (100 + demandShift - p0) * q0).toFixed(0)}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Area below Demand, above P*
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/10">
                  <span className="font-mono text-[10px] uppercase text-slate-400 block tracking-wider">
                    Producer Surplus (PS)
                  </span>
                  <div className="text-2xl font-black text-sky-400 font-mono mt-1">
                    ${(0.5 * (p0 - (20 - supplyShift)) * q0).toFixed(0)}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Area above Supply, below P*
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40">
                  <span className="font-mono text-[10px] uppercase text-emerald-400 block tracking-wider">
                    Allocative Efficiency
                  </span>
                  <div className="text-2xl font-black text-emerald-300 font-mono mt-1">
                    MAXIMUM
                  </div>
                  <div className="text-[11px] text-emerald-300/80 mt-0.5">
                    MSB = MSC • No Welfare Loss
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Interactive Dynamic SVG Market Canvas */}
          <div className="p-6 rounded-3xl bg-slate-950/80 border border-white/10 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-sky-400" />
                  Live Geometric S&amp;D Market Canvas
                </h3>
                <p className="text-xs text-slate-400">
                  Real-time welfare geometry with exact Price &amp; Quantity projections.
                </p>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-sky-300">
                  <span className="w-3 h-0.5 bg-sky-400 rounded-full" /> Demand (MSB)
                </span>
                <span className="flex items-center gap-1.5 text-emerald-300">
                  <span className="w-3 h-0.5 bg-emerald-400 rounded-full" /> Supply (MSC)
                </span>
                {intervention === "tax" && (
                  <span className="flex items-center gap-1.5 text-amber-400">
                    <span className="w-3 h-0.5 bg-amber-400 rounded-full" /> S + Tax
                  </span>
                )}
                {intervention === "subsidy" && (
                  <span className="flex items-center gap-1.5 text-teal-300">
                    <span className="w-3 h-0.5 bg-teal-400 rounded-full" /> S + Subsidy
                  </span>
                )}
                <span className="flex items-center gap-1.5 text-rose-400">
                  <span className="w-2.5 h-2.5 rounded-sm bg-rose-500/30 border border-rose-400" /> DWL Triangle
                </span>
              </div>
            </div>

            {/* SVG Chart */}
            <div className="w-full overflow-x-auto py-2">
              <svg viewBox="0 0 500 360" className="w-full min-w-[500px] h-[340px] select-none font-sans">
                {/* Axes */}
                <line x1={padX} y1={padY} x2={padX} y2={padY + chartH} stroke="#475569" strokeWidth="2" />
                <line x1={padX} y1={padY + chartH} x2={padX + chartW} y2={padY + chartH} stroke="#475569" strokeWidth="2" />

                {/* TAX WELFARE REGIONS */}
                {intervention === "tax" && (
                  <>
                    {/* Tax Revenue Rectangle */}
                    <polygon
                      points={`${padX},${toY(pTaxConsumer)} ${toX(qTax)},${toY(pTaxConsumer)} ${toX(qTax)},${toY(pTaxProducer)} ${padX},${toY(pTaxProducer)}`}
                      fill="rgba(245, 158, 11, 0.20)"
                      stroke="#F59E0B"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                    />

                    {/* Deadweight Loss Triangle */}
                    <polygon
                      points={`${toX(qTax)},${toY(pTaxConsumer)} ${toX(q0)},${toY(p0)} ${toX(qTax)},${toY(pTaxProducer)}`}
                      fill="rgba(244, 63, 94, 0.35)"
                      stroke="#F43F5E"
                      strokeWidth="1.5"
                    />
                    <text x={toX(qTax) + 6} y={toY(p0) + 4} fill="#F43F5E" fontSize="11" fontWeight="bold">
                      DWL
                    </text>

                    {/* S + Tax Line */}
                    <line x1={sX1} y1={sTaxY1} x2={sX2} y2={sTaxY2} stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="4 2" />
                    <text x={toX(95)} y={sTaxY2 - 8} fill="#F59E0B" fontSize="11" fontWeight="bold">S + Tax</text>

                    {/* Projections for Pc, Pp, Qt */}
                    <line x1={padX} y1={toY(pTaxConsumer)} x2={toX(qTax)} y2={toY(pTaxConsumer)} stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1={padX} y1={toY(pTaxProducer)} x2={toX(qTax)} y2={toY(pTaxProducer)} stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1={toX(qTax)} y1={toY(pTaxConsumer)} x2={toX(qTax)} y2={padY + chartH} stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 3" />

                    <text x={padX - 6} y={toY(pTaxConsumer) + 4} textAnchor="end" fill="#F59E0B" fontSize="10" fontWeight="bold">Pc</text>
                    <text x={padX - 6} y={toY(pTaxProducer) + 4} textAnchor="end" fill="#F59E0B" fontSize="10" fontWeight="bold">Pp</text>
                    <text x={toX(qTax)} y={padY + chartH + 16} textAnchor="middle" fill="#F59E0B" fontSize="10" fontWeight="bold">Qt</text>
                  </>
                )}

                {/* SUBSIDY WELFARE REGIONS */}
                {intervention === "subsidy" && (
                  <>
                    {/* S + Subsidy Line */}
                    <line x1={sX1} y1={sSubY1} x2={sX2} y2={sSubY2} stroke="#14B8A6" strokeWidth="2.5" strokeDasharray="4 2" />
                    <text x={toX(95)} y={sSubY2 + 16} fill="#14B8A6" fontSize="11" fontWeight="bold">S + Subsidy</text>

                    {/* DWL Triangle for Overproduction */}
                    <polygon
                      points={`${toX(q0)},${toY(p0)} ${toX(qSub)},${toY(pSubProducer)} ${toX(qSub)},${toY(pSubConsumer)}`}
                      fill="rgba(244, 63, 94, 0.35)"
                      stroke="#F43F5E"
                      strokeWidth="1.5"
                    />
                    <text x={toX(qSub) - 24} y={toY(p0) + 4} fill="#F43F5E" fontSize="11" fontWeight="bold">
                      DWL
                    </text>
                  </>
                )}

                {/* PRICE CEILING */}
                {intervention === "ceiling" && (
                  <>
                    <line x1={padX} y1={toY(ceilingPrice)} x2={padX + chartW} y2={toY(ceilingPrice)} stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="5 3" />
                    <text x={padX + 8} y={toY(ceilingPrice) - 6} fill="#F59E0B" fontSize="11" fontWeight="bold">
                      Price Ceiling (Pmax = ${ceilingPrice})
                    </text>
                    {/* Shortage indicator */}
                    <line x1={toX(qCeilingS)} y1={toY(ceilingPrice)} x2={toX(qCeilingD)} y2={toY(ceilingPrice)} stroke="#F43F5E" strokeWidth="4" />
                    <circle cx={toX(qCeilingS)} cy={toY(ceilingPrice)} r="5" fill="#F43F5E" />
                    <circle cx={toX(qCeilingD)} cy={toY(ceilingPrice)} r="5" fill="#F43F5E" />
                  </>
                )}

                {/* PRICE FLOOR */}
                {intervention === "floor" && (
                  <>
                    <line x1={padX} y1={toY(floorPrice)} x2={padX + chartW} y2={toY(floorPrice)} stroke="#10B981" strokeWidth="2.5" strokeDasharray="5 3" />
                    <text x={padX + 8} y={toY(floorPrice) - 6} fill="#10B981" fontSize="11" fontWeight="bold">
                      Price Floor (Pmin = ${floorPrice})
                    </text>
                    {/* Surplus indicator */}
                    <line x1={toX(qFloorD)} y1={toY(floorPrice)} x2={toX(qFloorS)} y2={toY(floorPrice)} stroke="#F59E0B" strokeWidth="4" />
                    <circle cx={toX(qFloorD)} cy={toY(floorPrice)} r="5" fill="#F59E0B" />
                    <circle cx={toX(qFloorS)} cy={toY(floorPrice)} r="5" fill="#F59E0B" />
                  </>
                )}

                {/* Baseline Demand Line */}
                <line x1={dX1} y1={dY1} x2={dX2} y2={dY2} stroke="#38BDF8" strokeWidth="3" />
                <text x={dX2 - 15} y={dY2 - 8} fill="#38BDF8" fontSize="12" fontWeight="bold">D</text>

                {/* Baseline Supply Line */}
                <line x1={sX1} y1={sY1} x2={sX2} y2={sY2} stroke="#34D399" strokeWidth="3" />
                <text x={sX2 - 15} y={sY2 - 8} fill="#34D399" fontSize="12" fontWeight="bold">S</text>

                {/* Free Market Equilibrium Point (P*, Q*) */}
                <line x1={padX} y1={toY(p0)} x2={toX(q0)} y2={toY(p0)} stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 3" />
                <line x1={toX(q0)} y1={toY(p0)} x2={toX(q0)} y2={padY + chartH} stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx={toX(q0)} cy={toY(p0)} r="5" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="2" />

                <text x={padX - 8} y={toY(p0) + 4} textAnchor="end" fill="#E2E8F0" fontSize="10" fontWeight="bold">P*</text>
                <text x={toX(q0)} y={padY + chartH + 16} textAnchor="middle" fill="#E2E8F0" fontSize="10" fontWeight="bold">Q*</text>

                {/* Axes Labels */}
                <text x={padX + chartW - 10} y={padY + chartH + 20} textAnchor="end" fill="#94A3B8" fontSize="11" fontWeight="bold">
                  Quantity (Q) →
                </text>
                <text x={padX - 8} y={padY + 10} textAnchor="end" fill="#94A3B8" fontSize="11" fontWeight="bold">
                  Price ($) ↑
                </text>
              </svg>
            </div>

            {/* Shift Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-white/10">
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Shift Demand (ΔD):</span>
                  <span className="font-mono text-sky-300 font-bold">{demandShift > 0 ? `+${demandShift}` : demandShift}</span>
                </div>
                <input
                  type="range"
                  min={-30}
                  max={30}
                  step={2}
                  value={demandShift}
                  onChange={(e) => setDemandShift(Number(e.target.value))}
                  className="w-full accent-sky-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Shift Supply (ΔS):</span>
                  <span className="font-mono text-emerald-300 font-bold">{supplyShift > 0 ? `+${supplyShift}` : supplyShift}</span>
                </div>
                <input
                  type="range"
                  min={-30}
                  max={30}
                  step={2}
                  value={supplyShift}
                  onChange={(e) => setSupplyShift(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {intervention === "tax" && (
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Tax Amount ($/unit):</span>
                    <span className="font-mono text-amber-300 font-bold">${taxAmount}</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={35}
                    step={1}
                    value={taxAmount}
                    onChange={(e) => setTaxAmount(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              )}

              {intervention === "subsidy" && (
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Subsidy Amount ($/unit):</span>
                    <span className="font-mono text-teal-300 font-bold">${subsidyAmount}</span>
                  </div>
                  <input
                    type="range"
                    min={4}
                    max={30}
                    step={1}
                    value={subsidyAmount}
                    onChange={(e) => setSubsidyAmount(Number(e.target.value))}
                    className="w-full accent-teal-500 cursor-pointer"
                  />
                </div>
              )}

              {intervention === "ceiling" && (
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Price Ceiling ($):</span>
                    <span className="font-mono text-amber-300 font-bold">${ceilingPrice}</span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={p0 - 2}
                    step={1}
                    value={ceilingPrice}
                    onChange={(e) => setCeilingPrice(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              )}

              {intervention === "floor" && (
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Price Floor ($):</span>
                    <span className="font-mono text-emerald-300 font-bold">${floorPrice}</span>
                  </div>
                  <input
                    type="range"
                    min={p0 + 2}
                    max={90}
                    step={1}
                    value={floorPrice}
                    onChange={(e) => setFloorPrice(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>
              )}
            </div>

            {/* IB Exam Evaluative Callout */}
            <div className="p-4 rounded-2xl bg-sky-950/20 border border-sky-500/30 flex items-start gap-3">
              <Info className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <span className="font-bold text-sky-300 uppercase tracking-wider font-mono">
                  IB Exam Diagramming &amp; Evaluation Tip (Paper 1 &amp; Paper 2)
                </span>
                <p className="text-slate-300 leading-relaxed">
                  Always mark both price outcomes clearly: Consumer price ($P_c$) and Producer price ($P_p$). State whether demand or supply is relatively more inelastic—the <strong>more inelastic party always carries the larger tax incidence</strong>!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 2: PED ELASTICITY ZONES & TOTAL REVENUE CURVE
          ===================================================================== */}
      {activeTab === "elasticity-tr" && (
        <div className="space-y-6">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-5 rounded-2xl border transition-all ${
              elasticityZone === "elastic"
                ? "bg-sky-950/30 border-sky-500/50"
                : elasticityZone === "unitary"
                ? "bg-emerald-950/30 border-emerald-500/50"
                : "bg-purple-950/30 border-purple-500/50"
            }`}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-xs uppercase font-bold text-slate-400">Elasticity Zone</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  elasticityZone === "elastic"
                    ? "bg-sky-500/20 text-sky-300"
                    : elasticityZone === "unitary"
                    ? "bg-emerald-500/20 text-emerald-300"
                    : "bg-purple-500/20 text-purple-300"
                }`}>
                  PED = {ped}
                </span>
              </div>
              <div className="text-2xl font-black text-white font-mono uppercase">
                {elasticityZone}
              </div>
              <div className="text-xs text-slate-300 mt-1">
                {elasticityZone === "elastic" && "Price drop increases Total Revenue (P↓ → TR↑)"}
                {elasticityZone === "unitary" && "Total Revenue is maximized at the curve midpoint!"}
                {elasticityZone === "inelastic" && "Price hike increases Total Revenue (P↑ → TR↑)"}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/70 border border-white/10">
              <span className="font-mono text-xs uppercase text-slate-400 block mb-1">Total Revenue (TR)</span>
              <div className="text-2xl font-black text-amber-300 font-mono">
                ${simTR.toLocaleString()}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Price: ${sliderPrice} • Quantity: {simQ} units
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/70 border border-white/10">
              <span className="font-mono text-xs uppercase text-slate-400 block mb-1">Revenue Maximization</span>
              <div className="text-2xl font-black text-emerald-400 font-mono">
                $2,500
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Occurs at P = $50, Q = 50 units (PED = 1.0)
              </div>
            </div>
          </div>

          {/* Interactive Dual-Chart (Demand Curve on top, TR Curve on bottom) */}
          <div className="p-6 rounded-3xl bg-slate-950/80 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Percent className="w-4 h-4 text-purple-400" />
                  Demand Curve Elasticity &amp; Parabolic Total Revenue Sync
                </h3>
                <p className="text-xs text-slate-400">
                  Drag the price slider to watch the exact operating point travel across both curves simultaneously.
                </p>
              </div>
            </div>

            {/* Dual SVG Viewport */}
            <div className="w-full overflow-x-auto py-2">
              <svg viewBox="0 0 500 360" className="w-full min-w-[500px] h-[320px] select-none font-sans">
                {/* Upper Chart: Demand Curve (P vs Q) */}
                <line x1="50" y1="20" x2="50" y2="160" stroke="#475569" strokeWidth="1.5" />
                <line x1="50" y1="160" x2="470" y2="160" stroke="#475569" strokeWidth="1.5" />

                {/* Demand Line */}
                <line x1="50" y1="30" x2="450" y2="160" stroke="#38BDF8" strokeWidth="3" />
                <text x="455" y="155" fill="#38BDF8" fontSize="11" fontWeight="bold">D</text>

                {/* Midpoint marker (P=50, Q=50) */}
                <circle cx="250" cy="95" r="3" fill="#10B981" />
                <text x="255" y="90" fill="#10B981" fontSize="9" fontWeight="bold">Unitary (PED=1)</text>

                {/* Active Slider Price Point on Demand */}
                {(() => {
                  const x = 50 + ((100 - sliderPrice) / 100) * 400;
                  const y = 160 - (sliderPrice / 100) * 130;
                  return (
                    <>
                      <circle cx={x} cy={y} r="5" fill="#A855F7" stroke="#FFFFFF" strokeWidth="2" />
                      <line x1="50" y1={y} x2={x} y2={y} stroke="#A855F7" strokeWidth="1" strokeDasharray="2 2" />
                      <line x1={x} y1={y} x2={x} y2="160" stroke="#A855F7" strokeWidth="1" strokeDasharray="2 2" />
                      <text x="44" y={y + 4} textAnchor="end" fill="#A855F7" fontSize="9" fontWeight="bold">
                        ${sliderPrice}
                      </text>
                    </>
                  );
                })()}

                <text x="50" y="14" fill="#94A3B8" fontSize="10">Price ($)</text>

                {/* Lower Chart: Total Revenue Parabola (TR vs Q) */}
                <line x1="50" y1="200" x2="50" y2="330" stroke="#475569" strokeWidth="1.5" />
                <line x1="50" y1="330" x2="470" y2="330" stroke="#475569" strokeWidth="1.5" />

                {/* Parabola path */}
                <path
                  d="M 50,330 Q 250,210 450,330"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="2.5"
                />
                <text x="455" y="325" fill="#F59E0B" fontSize="11" fontWeight="bold">TR</text>

                {/* Active Point on TR Parabola */}
                {(() => {
                  const x = 50 + (simQ / 100) * 400;
                  const y = 330 - (simTR / 2500) * 115;
                  return (
                    <>
                      <circle cx={x} cy={y} r="5" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2" />
                      <line x1="50" y1={y} x2={x} y2={y} stroke="#F59E0B" strokeWidth="1" strokeDasharray="2 2" />
                      <line x1={x} y1={y} x2={x} y2="330" stroke="#F59E0B" strokeWidth="1" strokeDasharray="2 2" />
                      <text x="44" y={y + 4} textAnchor="end" fill="#F59E0B" fontSize="9" fontWeight="bold">
                        ${simTR}
                      </text>
                    </>
                  );
                })()}

                <text x="50" y="194" fill="#94A3B8" fontSize="10">Total Revenue ($)</text>
                <text x="465" y="348" textAnchor="end" fill="#94A3B8" fontSize="10">Quantity (Q)</text>
              </svg>
            </div>

            {/* Slider Control */}
            <div className="pt-4 border-t border-white/10 space-y-2">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Adjust Product Price Point:</span>
                <span className="font-mono text-purple-300 font-bold text-sm">${sliderPrice} / unit</span>
              </div>
              <input
                type="range"
                min={5}
                max={95}
                step={1}
                value={sliderPrice}
                onChange={(e) => setSliderPrice(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 3: MACROECONOMIC AD/AS & PHILLIPS CURVE DUAL-VIEW
          ===================================================================== */}
      {activeTab === "adas-phillips" && (
        <div className="space-y-6">
          {/* Top Macro Metric Gauges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/10">
              <span className="font-mono text-[10px] uppercase text-slate-400 block tracking-wider">Real GDP (Y)</span>
              <div className="text-2xl font-black text-emerald-400 font-mono mt-1">
                ${realGDP.toFixed(1)}B
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Potential Yfe = $100B
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/10">
              <span className="font-mono text-[10px] uppercase text-slate-400 block tracking-wider">Average Price Level (APL)</span>
              <div className="text-2xl font-black text-sky-400 font-mono mt-1">
                {priceLevel.toFixed(1)}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Index Base = 100.0
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/10">
              <span className="font-mono text-[10px] uppercase text-slate-400 block tracking-wider">Unemployment Rate</span>
              <div className="text-2xl font-black text-amber-300 font-mono mt-1">
                {unemploymentRate}%
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Natural Rate (NRU) ≈ 5.0%
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/10">
              <span className="font-mono text-[10px] uppercase text-slate-400 block tracking-wider">Inflation Rate</span>
              <div className="text-2xl font-black text-rose-400 font-mono mt-1">
                {inflationRate}%
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Target = 2.0%
              </div>
            </div>
          </div>

          {/* Interactive Dual Macro Diagrams */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Chart 1: AD/AS Diagram */}
            <div className="p-5 rounded-3xl bg-slate-950/80 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono font-bold uppercase text-sky-400">
                  1. Neo-Classical / Monetarist AD/AS
                </h4>
                <span className="text-[10px] font-mono text-slate-400">Price Level vs Real Output</span>
              </div>

              <div className="w-full overflow-x-auto py-2">
                <svg viewBox="0 0 340 240" className="w-full h-[200px] select-none font-sans">
                  <line x1="40" y1="20" x2="40" y2="210" stroke="#475569" strokeWidth="1.5" />
                  <line x1="40" y1="210" x2="320" y2="210" stroke="#475569" strokeWidth="1.5" />

                  {/* LRAS Vertical Line */}
                  <line x1="180" y1="30" x2="180" y2="210" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 3" />
                  <text x="180" y="24" textAnchor="middle" fill="#F59E0B" fontSize="9" fontWeight="bold">LRAS (Yfe)</text>

                  {/* AD Line */}
                  {(() => {
                    const adOffset = adShift * 1.5;
                    return (
                      <>
                        <line x1={60 + adOffset} y1="40" x2={290 + adOffset} y2="190" stroke="#38BDF8" strokeWidth="2.5" />
                        <text x={295 + adOffset} y="195" fill="#38BDF8" fontSize="10" fontWeight="bold">AD</text>
                      </>
                    );
                  })()}

                  {/* SRAS Line */}
                  {(() => {
                    const srasOffset = -srasShift * 1.5;
                    return (
                      <>
                        <line x1={60} y1={190 + srasOffset} x2={290} y2={40 + srasOffset} stroke="#34D399" strokeWidth="2.5" />
                        <text x="295" y={45 + srasOffset} fill="#34D399" fontSize="10" fontWeight="bold">SRAS</text>
                      </>
                    );
                  })()}

                  {/* Equilibrium Intersection Marker */}
                  <circle cx="180" cy="115" r="4" fill="#FFFFFF" />
                  <text x="35" y="22" textAnchor="end" fill="#94A3B8" fontSize="9">APL</text>
                  <text x="315" y="225" textAnchor="end" fill="#94A3B8" fontSize="9">Real GDP</text>
                </svg>
              </div>
            </div>

            {/* Chart 2: Phillips Curve */}
            <div className="p-5 rounded-3xl bg-slate-950/80 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono font-bold uppercase text-rose-400">
                  2. Short-Run Phillips Curve (SRPC)
                </h4>
                <span className="text-[10px] font-mono text-slate-400">Inflation vs Unemployment</span>
              </div>

              <div className="w-full overflow-x-auto py-2">
                <svg viewBox="0 0 340 240" className="w-full h-[200px] select-none font-sans">
                  <line x1="40" y1="20" x2="40" y2="210" stroke="#475569" strokeWidth="1.5" />
                  <line x1="40" y1="210" x2="320" y2="210" stroke="#475569" strokeWidth="1.5" />

                  {/* LRPC Vertical Line */}
                  <line x1="170" y1="30" x2="170" y2="210" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 3" />
                  <text x="170" y="24" textAnchor="middle" fill="#F59E0B" fontSize="9" fontWeight="bold">LRPC (NRU 5%)</text>

                  {/* SRPC Curve */}
                  {(() => {
                    const srpcYOffset = -srasShift * 1.5;
                    return (
                      <>
                        <path
                          d={`M 60,${45 + srpcYOffset} Q 140,${150 + srpcYOffset} 300,${195 + srpcYOffset}`}
                          fill="none"
                          stroke="#F43F5E"
                          strokeWidth="2.5"
                        />
                        <text x="305" y={200 + srpcYOffset} fill="#F43F5E" fontSize="10" fontWeight="bold">SRPC</text>
                      </>
                    );
                  })()}

                  {/* Operating Point */}
                  <circle cx="170" cy="120" r="4" fill="#FFFFFF" />
                  <text x="35" y="22" textAnchor="end" fill="#94A3B8" fontSize="9">Inflation %</text>
                  <text x="315" y="225" textAnchor="end" fill="#94A3B8" fontSize="9">Unemployment %</text>
                </svg>
              </div>
            </div>
          </div>

          {/* Macro Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Aggregate Demand Shift (ΔAD):</span>
                <span className="font-mono text-sky-400 font-bold">{adShift > 0 ? `+${adShift}` : adShift}</span>
              </div>
              <input
                type="range"
                min={-25}
                max={25}
                step={1}
                value={adShift}
                onChange={(e) => setAdShift(Number(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                Shifting AD causes movement along the SRPC (trading off inflation against unemployment).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Short-Run Aggregate Supply Shock (ΔSRAS):</span>
                <span className="font-mono text-emerald-400 font-bold">{srasShift > 0 ? `+${srasShift}` : srasShift}</span>
              </div>
              <input
                type="range"
                min={-25}
                max={25}
                step={1}
                value={srasShift}
                onChange={(e) => setSrasShift(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                A negative supply shock (stagflation) shifts the entire SRPC outward to the right!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
