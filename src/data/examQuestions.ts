import { ExamBlueprint } from "./types";

export interface ExamQuestionCard {
  id: string;
  unit: string;
  commandTerm: string;
  marks: number;
  question: string;
  guidance: string;
  modelAnswerStructure: string[];
  keyConcept: string;
  diagramsNeeded: string[];
}

export const HIGH_YIELD_EXAM_QUESTIONS: ExamQuestionCard[] = [
  {
    id: "eq-1",
    unit: "Unit 2: Microeconomics",
    commandTerm: "Evaluate (15 marks)",
    marks: 15,
    question: "Evaluate the view that government intervention through price ceilings is the most effective policy to make essential goods affordable for low-income households.",
    guidance: "Use DEED (Define, Explain, Exemplify, Diagram) and SLAP (Stakeholders, Long/Short term, Assumptions, Priorities).",
    modelAnswerStructure: [
      "Define Price Ceiling (maximum price set below equilibrium Pmax < Pe), Shortage (Qd > Qs), and Deadweight Loss.",
      "Draw complete price ceiling diagram showing Pe, Pmax, Qs, Qd, the shortage bracket, and the shaded Deadweight Loss triangle.",
      "Explain the mechanics: lower price stimulates demand but discourages supply, creating chronic shortages, queues, black markets (Pb), and quality degradation.",
      "Evaluate Stakeholders: Consumers who get the good at Pmax benefit; excluded consumers suffer; producers lose revenue; government incurs enforcement costs.",
      "Contrast with alternative policies: Direct cash transfer payments or government supply-side subsidies keep goods affordable without causing shortages.",
      "Conclusion: Price ceilings distort market signals; targeted income support or direct state provision is far more effective long term.",
    ],
    keyConcept: "Intervention",
    diagramsNeeded: ["Price Ceiling Shortage & Deadweight Loss Diagram"],
  },
  {
    id: "eq-2",
    unit: "Unit 2: Microeconomics",
    commandTerm: "Evaluate (15 marks)",
    marks: 15,
    question: "Evaluate the effectiveness of carbon taxes compared to cap-and-trade permit systems in correcting the market failure caused by negative externalities of production.",
    guidance: "Compare market-based policies for carbon emissions. Address price certainty vs emissions quantity certainty.",
    modelAnswerStructure: [
      "Define Market Failure, Allocative Inefficiency, Negative Externality of Production (MSC > MPC), and Carbon Tax.",
      "Draw Negative Externality of Production diagram showing MPC, MSC, MPB=MSB, Qm, Qopt, and shaded DWL triangle pointing to Qopt.",
      "Explain how a carbon tax equal to MEC shifts MPC upward to MSC, eliminating the deadweight loss and generating tax revenue.",
      "Explain Cap-and-Trade (EU ETS): Government caps total emissions quantity and auctions permits; market price of permits fluctuates with demand.",
      "Compare Carbon Tax vs Cap-and-Trade: Tax provides price certainty (businesses can plan capital investments) but uncertain emissions cuts; Cap-and-trade guarantees emissions targets but suffers volatile permit prices.",
      "Evaluate equity: Carbon taxes can be regressive for low-income energy consumers unless revenues are redistributed via green dividends.",
    ],
    keyConcept: "Sustainability",
    diagramsNeeded: ["Negative Externality of Production Diagram with Corrective Tax"],
  },
  {
    id: "eq-3",
    unit: "Unit 3: Macroeconomics",
    commandTerm: "Evaluate (15 marks)",
    marks: 15,
    question: "Evaluate the view that expansionary monetary policy is the most effective policy for reducing unemployment during an economic recession.",
    guidance: "Contrast interest rate cuts with fiscal stimulus. Address the liquidity trap and business confidence.",
    modelAnswerStructure: [
      "Define Expansionary Monetary Policy, Central Bank, Policy Interest Rates, Cyclical Unemployment, and Deflationary Gap.",
      "Draw an AD/AS diagram showing AD shifting right from AD1 to AD2 to close a deflationary gap at potential output Yf.",
      "Trace the transmission mechanism: Rate cuts -> commercial banks lower loan/mortgage rates -> lower debt servicing -> C and I expand -> AD shifts right -> real output rises to Yf.",
      "Evaluate strengths: Independence from political election cycles; rapid monthly implementation; flexible fine-tuning.",
      "Evaluate critical limitations: Time lags (12-18 months); ineffective during severe panic if consumer and business confidence is shattered ('liquidity trap'); banks may refuse to lend.",
      "Contrast with Fiscal Policy: Direct government spending (G) injects demand immediately without waiting for private borrowing.",
      "Conclusion: Monetary policy works for mild slowdowns; deep recessions require coordinated fiscal stimulus.",
    ],
    keyConcept: "Intervention",
    diagramsNeeded: ["AD/AS Deflationary Gap Closed via Expansionary Policy"],
  },
  {
    id: "eq-4",
    unit: "Unit 3: Macroeconomics",
    commandTerm: "Evaluate (15 marks)",
    marks: 15,
    question: "Compare and contrast the Monetarist/New Classical and Keynesian views of the long-run aggregate supply curve, and evaluate the policy implications of each view for a government facing high unemployment.",
    guidance: "Contrast vertical LRAS (wage flexibility) with 3-phase Keynesian AS (wage stickiness downwards).",
    modelAnswerStructure: [
      "Define Aggregate Supply, LRAS, Full Employment Output (Yf), and Wage-Price Flexibility.",
      "Draw side-by-side diagrams: 1. Monetarist AD/AS with vertical LRAS at Yf; 2. Keynesian 3-phase AS with horizontal spare capacity phase.",
      "Explain Monetarist self-correction: Unemployment causes workers to accept lower nominal wages, shifting SRAS rightward to restore Yf automatically.",
      "Explain Keynesian wage stickiness: Trade unions, contracts, and minimum wages prevent nominal wage cuts; the economy can remain trapped in chronic unemployment indefinitely.",
      "Evaluate policy implications: Monetarists advise government inaction (stimulus only causes inflation); Keynesians advocate aggressive fiscal stimulus to shift AD rightward in the horizontal zone with zero inflation.",
      "Conclusion: Keynesian analysis applies to deep depressions with massive spare capacity; Monetarist analysis holds in long-run full-employment growth.",
    ],
    keyConcept: "Change",
    diagramsNeeded: ["Monetarist AD/AS Diagram", "Keynesian 3-Phase AS Diagram"],
  },
  {
    id: "eq-5",
    unit: "Unit 4: Global Economy",
    commandTerm: "Evaluate (15 marks)",
    marks: 15,
    question: "Using a diagram, explain the economic effects of an import tariff on domestic consumers, domestic producers, and the government, and evaluate whether trade protectionism protects domestic employment.",
    guidance: "Draw the full tariff diagram with areas a, b, c, d and analyze trade retaliation.",
    modelAnswerStructure: [
      "Define Protectionism, Import Tariff, World Price (Pw), Consumer Surplus, and Deadweight Loss.",
      "Draw complete tariff diagram showing Dd, Sd, Pw, Pw+t, Q1, Q2, Q3, Q4, and areas a, b, c, d.",
      "Explain welfare impacts: Consumers lose surplus (a+b+c+d); Domestic producers gain surplus (a); Government collects tariff revenue (c).",
      "Explain the two deadweight loss triangles: Area b (production inefficiency) and Area d (consumption loss).",
      "Evaluate the employment argument: Protects concentrated jobs in domestic import-competing sunset industries (steel, textiles).",
      "Counter-arguments: Higher component costs harm downstream domestic manufacturers; trading partners launch retaliatory tariffs, devastating domestic export sectors (e.g. US farmers in US-China trade war).",
      "Conclusion: Tariffs destroy more jobs than they protect and create permanent deadweight losses; retraining programs and adjustment subsidies are superior.",
    ],
    keyConcept: "Interdependence",
    diagramsNeeded: ["Tariff Diagram with Four Welfare Areas (a, b, c, d)"],
  },
  {
    id: "eq-6",
    unit: "Unit 4: Global Economy",
    commandTerm: "Evaluate (15 marks)",
    marks: 15,
    question: "Explain the determinants of a floating exchange rate, and evaluate the consequences of a currency depreciation for a country's macroeconomic objectives.",
    guidance: "Draw foreign exchange diagram. Evaluate inflation vs growth vs current account using Marshall-Lerner condition.",
    modelAnswerStructure: [
      "Define Floating Exchange Rate, Currency Depreciation, Foreign Exchange Market, and Net Exports.",
      "Draw forex market diagram showing Demand and Supply of currency, with an outward shift of Supply or inward shift of Demand lowering the exchange rate.",
      "Explain determinants: relative interest rates (hot money), relative inflation rates, current account balance, and inward FDI.",
      "Evaluate impact on Growth & Employment: Exports become cheaper in foreign currency, imports become dearer; (X - M) expands, shifting AD right and boosting real GDP.",
      "Evaluate impact on Inflation: Imported raw materials (oil, wheat) become expensive in domestic currency, shifting SRAS left and causing imported cost-push inflation.",
      "Condition: Marshall-Lerner condition (|PEDx + PEDm| > 1) must hold for depreciation to improve trade balance; in the short run, the J-Curve may worsen the deficit.",
      "Conclusion: Depreciation stimulates export competitiveness but endangers price stability, especially in import-dependent developing nations.",
    ],
    keyConcept: "Interdependence",
    diagramsNeeded: ["Foreign Exchange Market Diagram (Depreciation)"],
  },
];
