import { ConceptDefinition } from "./types";

export const KEY_CONCEPTS: ConceptDefinition[] = [
  {
    id: "scarcity",
    name: "Scarcity",
    shortName: "Scarcity",
    color: "#f59e0b",
    badgeBg: "rgba(245, 158, 11, 0.16)",
    badgeBorder: "rgba(245, 158, 11, 0.4)",
    badgeText: "#fbbf24",
    glowColor: "rgba(245, 158, 11, 0.35)",
    description:
      "The fundamental economic problem: human wants and needs are infinite, but the productive resources (Land, Labour, Capital, Enterprise) available to satisfy them are finite and scarce.",
    coreMechanism:
      "Scarcity necessitates choice and rationing. Because resources cannot produce everything demanded, every economic decision incurs an opportunity cost—the next best alternative forgone.",
    examTips:
      "Link scarcity directly to the Production Possibility Frontier (PPF) and price rationing in free markets. Scarcity applies to all economies, whether free-market, command, or mixed.",
  },
  {
    id: "choice",
    name: "Choice",
    shortName: "Choice",
    color: "#a855f7",
    badgeBg: "rgba(168, 85, 247, 0.16)",
    badgeBorder: "rgba(168, 85, 247, 0.4)",
    badgeText: "#c084fc",
    glowColor: "rgba(168, 85, 247, 0.35)",
    description:
      "Because resources are scarce, economic agents (consumers, firms, governments) must decide what goods and services to produce, how to produce them, and for whom they are produced.",
    coreMechanism:
      "Every choice generates an opportunity cost. Rational choice theory assumes agents weigh marginal private benefits (MB) against marginal private costs (MC) to maximize utility or profit.",
    examTips:
      "Contrast classical rational consumer choice with behavioural economics (heuristics, framing, bounded rationality, and nudges). Always highlight the opportunity cost of government budget allocation.",
  },
  {
    id: "efficiency",
    name: "Efficiency",
    shortName: "Efficiency",
    color: "#10b981",
    badgeBg: "rgba(16, 185, 129, 0.16)",
    badgeBorder: "rgba(16, 185, 129, 0.4)",
    badgeText: "#34d399",
    glowColor: "rgba(16, 185, 129, 0.35)",
    description:
      "Allocative efficiency occurs when resources are allocated in the combination that generates the greatest social net benefit to society, achieved where Marginal Social Benefit equals Marginal Social Cost (MSB = MSC).",
    coreMechanism:
      "In competitive equilibrium without externalities, total social surplus (consumer surplus + producer surplus) is maximized. Market failures (monopoly, externalities, public goods) cause deadweight welfare loss, violating allocative efficiency.",
    examTips:
      "Distinguish between Productive Efficiency (producing at minimum average cost on the PPF) and Allocative Efficiency (producing the combination society desires most, MSB = MSC).",
  },
  {
    id: "equity",
    name: "Equity",
    shortName: "Equity",
    color: "#06b6d4",
    badgeBg: "rgba(6, 182, 212, 0.16)",
    badgeBorder: "rgba(6, 182, 212, 0.4)",
    badgeText: "#22d3ee",
    glowColor: "rgba(6, 182, 212, 0.35)",
    description:
      "Equity refers to fairness and economic justice in the distribution of income, wealth, and opportunities across society. It is distinct from absolute equality.",
    coreMechanism:
      "Unregulated markets reward factor ownership, leading to severe income disparity. Governments pursue equity through progressive income taxation, transfer payments, and universal provision of merit goods (education, healthcare).",
    examTips:
      "Crucial exam distinction: Equality means everyone receives the exact same share; Equity means a fair distribution based on need or contribution. Reference the Lorenz curve and Gini coefficient.",
  },
  {
    id: "wellbeing",
    name: "Economic Well-being",
    shortName: "Well-being",
    color: "#38bdf8",
    badgeBg: "rgba(56, 189, 248, 0.16)",
    badgeBorder: "rgba(56, 189, 248, 0.4)",
    badgeText: "#7dd3fc",
    glowColor: "rgba(56, 189, 248, 0.35)",
    description:
      "A multidimensional concept encompassing the overall quality of life, material living standards, security, health, education, and psychological satisfaction of individuals within a society.",
    coreMechanism:
      "Economic growth (rising GDP) does not automatically guarantee rising economic well-being. Negative externalities, income inequality, working hours, environmental degradation, and debt distress erode well-being.",
    examTips:
      "Critique real GDP per capita as an incomplete indicator of well-being. Contrast with the Human Development Index (HDI), OECD Better Life Index, and Happy Planet Index.",
  },
  {
    id: "sustainability",
    name: "Sustainability",
    shortName: "Sustainability",
    color: "#22c55e",
    badgeBg: "rgba(34, 197, 94, 0.16)",
    badgeBorder: "rgba(34, 197, 94, 0.4)",
    badgeText: "#4ade80",
    glowColor: "rgba(34, 197, 94, 0.35)",
    description:
      "The ability of the present generation to meet its economic needs without compromising the ability of future generations to meet their own needs (intergenerational equity).",
    coreMechanism:
      "Depleting common pool resources (fisheries, clean air, forests) without paying the external cost shifts liabilities onto future generations. Corrective market-based policies include Pigouvian carbon taxes, tradable permits, and green subsidies.",
    examTips:
      "Address market failure in Unit 2.8 and Green GDP in Unit 3.1. Evaluate the trade-off between short-run economic growth and long-run environmental sustainability.",
  },
  {
    id: "change",
    name: "Change",
    shortName: "Change",
    color: "#fb923c",
    badgeBg: "rgba(251, 146, 60, 0.16)",
    badgeBorder: "rgba(251, 146, 60, 0.4)",
    badgeText: "#fdba74",
    glowColor: "rgba(251, 146, 60, 0.35)",
    description:
      "The continuous evolution of economic phenomena over time, driven by technological advancement, institutional reforms, demographic shifts, global integration, and shocks.",
    coreMechanism:
      "Static equilibrium analyses are transformed into dynamic trajectories when determinants shift. Supply shocks, automation, inflation expectations, and trade policies force continuous economic structural adjustment.",
    examTips:
      "In Paper 1 essays, explicitly track the transition mechanism: how an exogenous shock alters incentives, shifts curves, creates shortages or surpluses, and establishes a new long-run equilibrium.",
  },
  {
    id: "interdependence",
    name: "Interdependence",
    shortName: "Interdependence",
    color: "#6366f1",
    badgeBg: "rgba(99, 102, 241, 0.16)",
    badgeBorder: "rgba(99, 102, 241, 0.4)",
    badgeText: "#818cf8",
    glowColor: "rgba(99, 102, 241, 0.35)",
    description:
      "Economic agents, markets, industries, and sovereign nations do not operate in isolation; actions taken by one directly impact others through interconnected global and domestic channels.",
    coreMechanism:
      "Reflected domestically in the circular flow of income (households, firms, financial, government, foreign) and internationally via global supply chains, floating exchange rates, and international trade balance.",
    examTips:
      "Use when discussing monetary policy transmission (interest rates affecting exchange rates and net exports) and trade protectionism (tariffs provoking retaliatory measures and harming domestic consumers).",
  },
  {
    id: "intervention",
    name: "Intervention",
    shortName: "Intervention",
    color: "#f43f5e",
    badgeBg: "rgba(244, 63, 94, 0.16)",
    badgeBorder: "rgba(244, 63, 94, 0.4)",
    badgeText: "#fb7185",
    glowColor: "rgba(244, 63, 94, 0.35)",
    description:
      "Deliberate actions taken by government authorities, central banks, or supranational bodies to manipulate market outcomes and macroeconomic performance.",
    coreMechanism:
      "Justified by market failure, macroeconomic instability (recession or runaway inflation), and inequality. Tools include indirect taxation, subsidies, price controls, regulation, monetary stimulus, and fiscal policy.",
    examTips:
      "Balance free-market arguments (Hayek/Adam Smith invisible hand, price signals, government failure, deadweight losses) against interventionist arguments (Keynes, Pigou, market failure, merit goods, public safety nets).",
  },
];
