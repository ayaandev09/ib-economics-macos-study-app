import { UnitPart, UnitId } from "./types";
import { UNIT_1_TOPICS } from "./unit1Topics";
import { UNIT_2_TOPICS } from "./unit2Topics";
import { UNIT_3_TOPICS } from "./unit3Topics";
import { UNIT_4_TOPICS } from "./unit4Topics";

export const SYLLABUS_UNITS: UnitPart[] = [
  {
    id: "unit-1",
    unitNumber: 1,
    title: "Unit 1: Introduction to economics",
    subtitle: "Scarcity, Choice, Methodology & The Circular Flow",
    badge: "Unit 1",
    overview:
      "Explores the fundamental economic problem of scarcity and unlimited wants, opportunity cost, the production possibility frontier, positive vs normative economics, and the circular flow of income.",
    strategicArc:
      "Core foundation required for every theoretical concept and evaluation in the syllabus.",
    dominantConcepts: ["scarcity", "choice", "efficiency", "change"],
    topics: UNIT_1_TOPICS,
  },
  {
    id: "unit-2",
    unitNumber: 2,
    title: "Unit 2: Microeconomics",
    subtitle: "Demand, Supply, Elasticity, Government Intervention & Market Failure",
    badge: "Unit 2",
    overview:
      "Analyzes how competitive market forces determine prices and allocate scarce resources. Examines elasticities (PED, PES, YED, XED), government intervention (price controls, taxes, subsidies), and market failures (externalities, common pool resources, public goods).",
    strategicArc:
      "The heaviest diagrammatic and quantitative core of Paper 1 and Paper 2 exams.",
    dominantConcepts: ["efficiency", "intervention", "equity", "sustainability", "choice"],
    topics: UNIT_2_TOPICS,
  },
  {
    id: "unit-3",
    unitNumber: 3,
    title: "Unit 3: Macroeconomics",
    subtitle: "National Income, AD/AS, Macro Goals, Inequality & Demand Management",
    badge: "Unit 3",
    overview:
      "Examines the whole economy: measuring economic activity (GDP, GNI, Green GDP), Aggregate Demand and Aggregate Supply models (Monetarist vs Keynesian), macroeconomic objectives (growth, low unemployment, price stability), poverty and inequality, monetary policy, fiscal policy, and supply-side policies.",
    strategicArc:
      "The primary policy toolkit: evaluating how governments manage recessions and inflation.",
    dominantConcepts: ["wellbeing", "change", "intervention", "equity", "interdependence"],
    topics: UNIT_3_TOPICS,
  },
  {
    id: "unit-4",
    unitNumber: 4,
    title: "Unit 4: The global economy",
    subtitle: "International Trade, Protectionism, Exchange Rates & Sustainable Development",
    badge: "Unit 4",
    overview:
      "Investigates cross-border economic interdependence: gains from international trade, comparative advantage, trade protectionism (tariffs, quotas, subsidies), foreign exchange markets (appreciation and depreciation), balance of payments, economic integration, and multidimensional sustainable economic development.",
    strategicArc:
      "Essential for Paper 2 international data responses and contemporary geopolitical evaluation.",
    dominantConcepts: ["interdependence", "equity", "sustainability", "change", "intervention"],
    topics: UNIT_4_TOPICS,
  },
];

export const ALL_TOPICS = [
  ...UNIT_1_TOPICS,
  ...UNIT_2_TOPICS,
  ...UNIT_3_TOPICS,
  ...UNIT_4_TOPICS,
];
