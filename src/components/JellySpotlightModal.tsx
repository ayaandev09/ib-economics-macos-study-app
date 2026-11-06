"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Search,
  X,
  ArrowRight,
  BookOpen,
  Layers,
  Briefcase,
  Compass,
  Sparkles,
  CornerDownLeft,
} from "lucide-react";
import { searchEconomicsCodex, SearchFilterTab, SearchResultItem } from "@/lib/searchEngine";
import { useStudyStore } from "@/store/useStudyStore";

interface JellySpotlightModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FEATURED_QUICK_JUMPS = [
  { id: "u1-1", code: "U1.1", title: "Scarcity, Choice & PPF Shifts", tag: "Foundations" },
  { id: "u2-1", code: "U2.1", title: "Competitive Market Equilibrium", tag: "Micro" },
  { id: "u2-5", code: "U2.5", title: "Price Elasticity of Demand (PED)", tag: "Elasticity" },
  { id: "u2-7", code: "U2.7", title: "Market Failure: Negative Externalities", tag: "Intervention" },
  { id: "u3-1", code: "U3.1", title: "Circular Flow & GDP / GNI Accounting", tag: "Macro" },
  { id: "u3-2", code: "U3.2", title: "AD / AS Equilibrium: Keynesian vs Monetarist", tag: "AD/AS" },
  { id: "u3-5", code: "U3.5", title: "Monetary Policy & Central Bank Interest Rates", tag: "Policy" },
  { id: "u4-2", code: "U4.2", title: "Trade Protectionism: Tariffs & Quotas", tag: "Global" },
];

export const JellySpotlightModal: React.FC<JellySpotlightModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<SearchFilterTab>("all");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const { setActiveTopic, setViewMode } = useStudyStore();

  const results = useMemo(() => {
    return searchEconomicsCodex(query, activeTab);
  }, [query, activeTab]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query, activeTab]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 50);
    } else {
      setQuery("");
      setActiveTab("all");
    }
  }, [isOpen]);

  const handleSelect = (topicId: string) => {
    setActiveTopic(topicId);
    setViewMode("focus");
    onClose();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        results.length > 0 ? (prev + 1) % results.length : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        results.length > 0 ? (prev - 1 + results.length) % results.length : 0
      );
    } else if (e.key === "Enter" && results.length > 0) {
      e.preventDefault();
      handleSelect(results[selectedIndex]?.id || results[0].id);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Syllabus Spotlight Search"
      className="fixed inset-0 z-[99999] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-3xl border border-teal-400/40 shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_50px_rgba(20,184,166,0.25)] overflow-hidden flex flex-col max-h-[82vh] transition-all"
        style={{
          background:
            "linear-gradient(145deg, rgba(4, 28, 25, 0.96) 0%, rgba(2, 14, 15, 0.98) 100%)",
        }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Top Input Bar */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center gap-3 relative">
          <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-400/35 flex items-center justify-center text-teal-300 shrink-0">
            <Search className="w-5 h-5 text-teal-300 animate-pulse" />
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search IB Economics syllabus (e.g. 'PED', 'Tariffs', 'AD/AS', 'Keynesian', 'U2.7')..."
            className="w-full bg-transparent text-white placeholder-slate-400 text-sm sm:text-base font-medium focus:outline-none"
          />

          {query ? (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md">
              <span>ESC</span>
            </div>
          )}
        </div>

        {/* Filter Category Tabs */}
        <div className="px-4 py-2 border-b border-white/10 flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-black/40">
          {[
            { id: "all", label: "All Items", icon: Sparkles },
            { id: "topics", label: "Syllabus Topics", icon: BookOpen },
            { id: "diagrams", label: "Diagrams Lab", icon: Layers },
            { id: "cases", label: "Case Studies", icon: Briefcase },
            { id: "concepts", label: "9 Key Concepts", icon: Compass },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as SearchFilterTab)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-teal-500/30 text-teal-200 border border-teal-400/50 shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5 custom-scrollbar min-h-[220px]">
          {results.length > 0 ? (
            results.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`p-3 rounded-2xl flex items-start justify-between gap-3 cursor-pointer transition-all ${
                    isSelected
                      ? "bg-teal-500/20 border border-teal-400/40 shadow-md shadow-teal-500/10"
                      : "hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-mono text-xs font-bold text-teal-300 px-2 py-0.5 rounded-md bg-teal-500/15 border border-teal-400/30">
                        {item.displayCode}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                        {item.unitTitle}
                      </span>
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-white/10 text-slate-300 border border-white/10">
                        {item.matchCategory}
                      </span>
                    </div>

                    <h4
                      className={`text-xs sm:text-sm font-semibold truncate ${
                        isSelected ? "text-teal-200" : "text-white"
                      }`}
                    >
                      {item.title}
                    </h4>

                    {item.matchedDetail && (
                      <p className="text-xs text-amber-300/90 font-mono mt-0.5 truncate">
                        {item.matchedDetail}
                      </p>
                    )}

                    <p className="text-[11px] text-slate-300/80 line-clamp-1 mt-1 font-sans">
                      {item.snippet}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 self-center shrink-0">
                    {isSelected && (
                      <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-teal-300 bg-teal-500/15 px-2 py-1 rounded-md border border-teal-400/30">
                        <span>Select</span>
                        <CornerDownLeft className="w-3 h-3" />
                      </span>
                    )}
                    <ArrowRight
                      className={`w-4 h-4 ${
                        isSelected ? "text-teal-300 translate-x-0.5" : "text-slate-500"
                      } transition-transform`}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 px-4 text-center">
              <p className="text-sm text-slate-300 font-medium">
                No syllabus topics found for &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Try searching for concepts like &lsquo;elasticity&rsquo;, &lsquo;AD/AS&rsquo;, &lsquo;tariff&rsquo;, or topic codes like &lsquo;U2.1&rsquo;.
              </p>
            </div>
          )}
        </div>

        {/* Footer Quick Jumps */}
        {!query && (
          <div className="p-3 border-t border-white/10 bg-black/50">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2 px-1">
              Popular Quick Jumps
            </span>
            <div className="flex flex-wrap gap-1.5">
              {FEATURED_QUICK_JUMPS.map((qj) => (
                <button
                  key={qj.id}
                  onClick={() => handleSelect(qj.id)}
                  className="px-2.5 py-1 rounded-xl bg-white/5 hover:bg-teal-500/20 border border-white/10 hover:border-teal-400/30 text-slate-300 hover:text-teal-200 text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-teal-400 font-bold">{qj.code}</span>
                  <span className="text-slate-300 truncate max-w-[150px]">{qj.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Keyboard Navigation Cheatsheet Bar */}
        <div className="px-4 py-2 border-t border-white/10 bg-black/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px] text-white">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px] text-white">↓</kbd>
              <span>Navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px] text-white">↵</kbd>
              <span>Open</span>
            </span>
          </div>

          <span className="text-teal-300/80">Raycast Ergonomics</span>
        </div>
      </div>
    </div>
  );
};
