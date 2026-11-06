"use client";

import React from "react";

export const IBEconomicsAppLogo: React.FC<{ className?: string }> = ({
  className = "w-full h-full",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      fill="none"
    >
      <defs>
        {/* Teal Supply Gradient */}
        <linearGradient id="econSupplyGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#14b8a6" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>

        {/* Coral Demand Gradient */}
        <linearGradient id="econDemandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fca5a5" />
          <stop offset="40%" stopColor="#f43f5e" />
          <stop offset="100%" stopColor="#e11d48" />
        </linearGradient>

        {/* Equilibrium Gold Gradient */}
        <linearGradient id="econGoldCoord" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>

        <radialGradient id="econRadialAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.4" />
          <stop offset="60%" stopColor="#0d9488" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#042f2e" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ambient Equilibrium Radial Aura */}
      <circle cx="256" cy="256" r="240" fill="url(#econRadialAura)" />

      {/* Outer Glass Rim */}
      <circle
        cx="256"
        cy="256"
        r="230"
        fill="#07151e"
        stroke="url(#econSupplyGrad)"
        strokeWidth="8"
        strokeOpacity="0.95"
      />
      <circle
        cx="256"
        cy="256"
        r="214"
        fill="none"
        stroke="#14b8a6"
        strokeWidth="2"
        strokeDasharray="8 8"
        strokeOpacity="0.6"
      />

      {/* Precision Macroeconomic Cartesian Axes (P vs Q) */}
      <line x1="120" y1="110" x2="120" y2="390" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
      <line x1="120" y1="390" x2="400" y2="390" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />

      {/* Axis Arrowheads */}
      <polygon points="120,96 112,116 128,116" fill="#94a3b8" />
      <polygon points="414,390 394,382 394,398" fill="#94a3b8" />

      {/* Axis Metric Labels */}
      <text x="96" y="112" fontFamily="-apple-system, BlinkMacSystemFont, monospace" fontSize="22" fontWeight="900" fill="#f59e0b">P</text>
      <text x="402" y="420" fontFamily="-apple-system, BlinkMacSystemFont, monospace" fontSize="22" fontWeight="900" fill="#f59e0b">Q</text>

      {/* Equilibrium Coordinate Projections */}
      <line x1="120" y1="250" x2="260" y2="250" stroke="#f59e0b" strokeWidth="3" strokeDasharray="6 6" />
      <line x1="260" y1="250" x2="260" y2="390" stroke="#f59e0b" strokeWidth="3" strokeDasharray="6 6" />

      <circle cx="120" cy="250" r="5" fill="#f59e0b" />
      <circle cx="260" cy="390" r="5" fill="#f59e0b" />

      {/* Demand Curve D */}
      <path
        d="M 148 140 Q 248 242, 372 360"
        fill="none"
        stroke="url(#econDemandGrad)"
        strokeWidth="16"
        strokeLinecap="round"
      />

      {/* Supply Curve S */}
      <path
        d="M 148 360 Q 248 242, 372 140"
        fill="none"
        stroke="url(#econSupplyGrad)"
        strokeWidth="16"
        strokeLinecap="round"
      />

      {/* Curve End Labels */}
      <text x="382" y="136" fontFamily="-apple-system, BlinkMacSystemFont, sans-serif" fontSize="24" fontWeight="900" fill="#10b981">S</text>
      <text x="382" y="378" fontFamily="-apple-system, BlinkMacSystemFont, sans-serif" fontSize="24" fontWeight="900" fill="#f43f5e">D</text>

      {/* Equilibrium Center E* */}
      <circle cx="260" cy="250" r="28" fill="#f59e0b" fillOpacity="0.3" />
      <polygon
        points="260,226 284,250 260,274 236,250"
        fill="#ffffff"
        stroke="url(#econGoldCoord)"
        strokeWidth="5"
      />
      <circle cx="260" cy="250" r="6" fill="#07151e" />
    </svg>
  );
};
