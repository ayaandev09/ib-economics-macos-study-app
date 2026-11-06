import os

formula_code = '''import { FormulaItem } from "./types";

export const FORMULA_BANK: FormulaItem[] = [
  {
    id: "f-ped",
    code: "PED",
    name: "Price Elasticity of Demand",
    unit: "Unit 2",
    formula: "\\\\text{PED} = \\\\frac{\\\\%\\\\Delta Q_d}{\\\\%\\\\Delta P} = \\\\frac{\\\\frac{Q_2 - Q_1}{Q_1} \\\\times 100}{\\\\frac{P_2 - P_1}{P_1} \\\\times 100}",
    variables: [
      { name: "Q1, Q2", definition: "Initial and new quantity demanded." },
      { name: "P1, P2", definition: "Initial and new price of the good." },
    ],
    benchmarkGuidance:
      "PED > 1: Elastic; PED < 1: Inelastic; PED = 1: Unit Elastic; PED = 0: Perfectly Inelastic; PED = \\\\infty: Perfectly Elastic. Because of the law of demand, PED is negative, but conventionally reported as an absolute positive value.",
    evaluationInterpretation:
      "Crucial for firm pricing decisions: If |PED| > 1, cutting price increases Total Revenue. If |PED| < 1, raising price increases Total Revenue. Governments levy excise taxes on price-inelastic goods to maximize tax revenue.",
    workedExample:
      "A cinema cuts ticket prices from $10 to $8 (%\\\\Delta P = -20\\\\%). Attendance rises from 200 to 260 (%\\\\Delta Qd = +30\\\\%). PED = +30\\\\% / -20\\\\% = -1.5. Absolute PED = 1.5 (Elastic). Total revenue rises from $2,000 to $2,080.",
  },
  {
    id: "f-pes",
    code: "PES",
    name: "Price Elasticity of Supply",
    unit: "Unit 2",
    formula: "\\\\text{PES} = \\\\frac{\\\\%\\\\Delta Q_s}{\\\\%\\\\Delta P} = \\\\frac{\\\\frac{Q_{s,2} - Q_{s,1}}{Q_{s,1}} \\\\times 100}{\\\\frac{P_2 - P_1}{P_1} \\\\times 100}",
    variables: [
      { name: "Qs1, Qs2", definition: "Initial and new quantity supplied." },
      { name: "P1, P2", definition: "Initial and new market price." },
    ],
    benchmarkGuidance:
      "PES > 1: Elastic Supply (supply curve cuts P-axis); PES < 1: Inelastic Supply (supply curve cuts Q-axis); PES = 1: Unit Elastic (through origin). Always positive.",
    evaluationInterpretation:
      "Reflects the speed and flexibility of producers to reallocate factors of production. Inelastic supply in agriculture means demand shifts cause wild price volatility.",
    workedExample:
      "Lithium prices rise from $20,000 to $25,000/tonne (+25\\\\%). Mine output increases from 10,000 to 11,000 tonnes (+10\\\\%). PES = +10\\\\% / +25\\\\% = 0.4 (Inelastic supply due to mining lead times).",
  },
  {
    id: "f-yed",
    code: "YED",
    name: "Income Elasticity of Demand",
    unit: "Unit 2",
    formula: "\\\\text{YED} = \\\\frac{\\\\%\\\\Delta Q_d}{\\\\%\\\\Delta Y} = \\\\frac{\\\\frac{Q_2 - Q_1}{Q_1} \\\\times 100}{\\\\frac{Y_2 - Y_1}{Y_1} \\\\times 100}",
    variables: [
      { name: "Q1, Q2", definition: "Initial and new quantity demanded." },
      { name: "Y1, Y2", definition: "Initial and new consumer disposable income." },
    ],
    benchmarkGuidance:
      "YED > 0: Normal Good (0 < YED < 1: Necessity; YED > 1: Luxury). YED < 0: Inferior Good (e.g. instant ramen, bus travel).",
    evaluationInterpretation:
      "Reveals how a firm's sales perform across business cycles. Luxury goods boom during macroeconomic expansions but suffer severe sales collapses in recessions.",
    workedExample:
      "Household income rises by 5\\\\%. Demand for luxury watches expands by 15\\\\%. YED = +15\\\\% / +5\\\\% = +3.0 (Luxury Normal Good).",
  },
  {
    id: "f-xed",
    code: "XED",
    name: "Cross-Price Elasticity of Demand",
    unit: "Unit 2",
    formula: "\\\\text{XED} = \\\\frac{\\\\%\\\\Delta Q_{d,A}}{\\\\%\\\\Delta P_B}",
    variables: [
      { name: "Qd,A", definition: "Quantity demanded of Good A." },
      { name: "P,B", definition: "Price of Good B." },
    ],
    benchmarkGuidance:
      "XED > 0: Substitute Goods (e.g. tea and coffee). XED < 0: Complementary Goods (e.g. cars and petrol). XED = 0: Unrelated Goods.",
    evaluationInterpretation:
      "Helps businesses predict how competitor price moves will impact their sales, and helps governments define antitrust market boundaries in monopoly regulation.",
    workedExample:
      "The price of butter rises by 10\\\\%. Demand for margarine increases by 8\\\\%. XED = +8\\\\% / +10\\\\% = +0.8 (Close substitutes).",
  },
  {
    id: "f-gdp",
    code: "GDP",
    name: "Gross Domestic Product (Expenditure Approach)",
    unit: "Unit 3",
    formula: "\\\\text{GDP} = C + I + G + (X - M)",
    variables: [
      { name: "C", definition: "Household Consumption expenditure." },
      { name: "I", definition: "Gross Private Domestic Investment." },
      { name: "G", definition: "Government spending on goods and services (excluding transfers)." },
      { name: "X - M", definition: "Net Exports (Exports minus Imports)." },
    ],
    benchmarkGuidance:
      "Measures total monetary value of final goods and services produced within national geographic borders over one year.",
    evaluationInterpretation:
      "Consumption typically constitutes 60-70% of total GDP in advanced market economies, making consumer confidence a primary driver of short-term economic fluctuations.",
    workedExample:
      "C = $500B, I = $150B, G = $200B, X = $80B, M = $100B. GDP = 500 + 150 + 200 + (80 - 100) = $830 Billion.",
  },
  {
    id: "f-real-gdp",
    code: "Real GDP",
    name: "Real GDP (Price Deflator Adjustment)",
    unit: "Unit 3",
    formula: "\\\\text{Real GDP} = \\\\frac{\\\\text{Nominal GDP}}{\\\\text{GDP Deflator}} \\\\times 100",
    variables: [
      { name: "Nominal GDP", definition: "GDP measured at current market prices." },
      { name: "GDP Deflator", definition: "Price index measuring general price level relative to base year (Base = 100)." },
    ],
    benchmarkGuidance:
      "Removes the distorting impact of price inflation to measure actual physical production volume across years.",
    evaluationInterpretation:
      "If nominal GDP grows by 6% but the price deflator rises by 6%, real economic growth is exactly 0%.",
    workedExample:
      "Nominal GDP = $660B, GDP Deflator = 110. Real GDP = ($660B / 110) x 100 = $600 Billion in constant base-year dollars.",
  },
  {
    id: "f-cpi",
    code: "CPI",
    name: "Consumer Price Index & Inflation Rate",
    unit: "Unit 3",
    formula: "\\\\text{Inflation Rate} = \\\\frac{\\\\text{CPI}_t - \\\\text{CPI}_{t-1}}{\\\\text{CPI}_{t-1}} \\\\times 100",
    variables: [
      { name: "CPIt", definition: "Consumer Price Index in current year." },
      { name: "CPIt-1", definition: "Consumer Price Index in previous year." },
    ],
    benchmarkGuidance:
      "CPI is a weighted index tracking a typical urban household shopping basket. Central banks target ~2% annual inflation.",
    evaluationInterpretation:
      "Limitations: Suffers from substitution bias (consumers switch to cheaper brands), quality change bias, and does not reflect atypical rural or pensioner households.",
    workedExample:
      "CPI was 120 in 2022 and 126 in 2023. Inflation Rate = [(126 - 120) / 120] x 100 = +5.0\\\\%.",
  },
  {
    id: "f-unemployment",
    code: "UR",
    name: "Unemployment Rate",
    unit: "Unit 3",
    formula: "\\\\text{Unemployment Rate} = \\\\frac{\\\\text{Number of Unemployed}}{\\\\text{Total Labour Force}} \\\\times 100",
    variables: [
      { name: "Number of Unemployed", definition: "People of working age without a job, actively seeking work, and available to work." },
      { name: "Total Labour Force", definition: "Sum of employed workers plus actively seeking unemployed individuals." },
    ],
    benchmarkGuidance:
      "Excludes economically inactive individuals (students, stay-at-home parents, discouraged workers who stopped looking). Full employment corresponds to the natural rate of unemployment (~3.5–4.5%).",
    evaluationInterpretation:
      "Official unemployment rates understate true labor distress by ignoring underemployed workers (part-time workers seeking full-time hours) and discouraged workers.",
    workedExample:
      "Labour Force = 20 million; Employed = 19 million; Unemployed = 1 million. Unemployment Rate = (1M / 20M) x 100 = 5.0\\\\%.",
  },
  {
    id: "f-gini",
    code: "Gini",
    name: "Gini Coefficient (Lorenz Curve)",
    unit: "Unit 3",
    formula: "\\\\text{Gini Coefficient} = \\\\frac{\\\\text{Area } A}{\\\\text{Area } A + \\\\text{Area } B}",
    variables: [
      { name: "Area A", definition: "Area between the 45-degree line of perfect equality and the Lorenz curve." },
      { name: "Area B", definition: "Area below the Lorenz curve." },
    ],
    benchmarkGuidance:
      "Ranges from 0 (perfect equality) to 1.0 (perfect inequality). Scandinavian countries: ~0.26; USA: ~0.41; South Africa: ~0.63.",
    evaluationInterpretation:
      "A falling Gini indicates more equitable income distribution, often achieved via progressive income taxation and social transfer payments.",
    workedExample:
      "If Area A = 0.15 and Area B = 0.35: Gini = 0.15 / (0.15 + 0.35) = 0.15 / 0.50 = 0.30.",
  },
  {
    id: "f-tariff-rev",
    code: "Tariff",
    name: "Government Tariff Revenue & Deadweight Loss",
    unit: "Unit 4",
    formula: "\\\\text{Tariff Revenue} = t \\\\times (Q_4 - Q_3), \\\\quad \\\\text{Net DWL} = \\\\frac{1}{2} t (Q_3 - Q_1) + \\\\frac{1}{2} t (Q_2 - Q_4)",
    variables: [
      { name: "t", definition: "Specific import tariff per unit ($)." },
      { name: "Q1, Q3", definition: "Domestic supply before and after tariff." },
      { name: "Q2, Q4", definition: "Domestic demand before and after tariff." },
    ],
    benchmarkGuidance:
      "Area b represents production inefficiency DWL; Area d represents consumption loss DWL. Total net societal loss = b + d.",
    evaluationInterpretation:
      "Proves that tariffs reduce overall national welfare even when counting government tariff revenues, because the triangles b and d represent sheer destruction of community surplus.",
    workedExample:
      "Tariff t = $10. Domestic supply expands from 100 to 140 (Q1=100, Q3=140). Domestic demand contracts from 300 to 260 (Q2=300, Q4=260). Imports = 260 - 140 = 120. Tariff Revenue = $10 x 120 = $1,200. Net DWL = 0.5(10)(40) + 0.5(10)(40) = $200 + $200 = $400.",
  },
];
'''

theorists_code = '''import { TheoristSchool } from "./types";

export const THEORISTS_DOSSIER: TheoristSchool[] = [
  {
    id: "th-adam-smith",
    name: "Adam Smith",
    school: "Classical Economics",
    era: "1723–1790 (Enlightenment)",
    coreDoctrine:
      "The 'Invisible Hand' of competitive markets: self-interested economic agents pursuing private gain are led by competitive price signals to allocate scarce resources to their most socially beneficial and efficient uses without central planning.",
    keyAssumptions: [
      "Consumers and producers act rationally in pursuit of self-interest.",
      "Markets are competitive with flexible prices, free entry, and voluntary exchange.",
      "Specialization and division of labor drive exponential gains in labor productivity.",
    ],
    evaluationAO3:
      "While brilliant for competitive private goods, the invisible hand fails completely in the presence of externalities, monopoly market power, and public goods, necessitating state intervention.",
    realWorldExample:
      "Modern free market economies rely on Smith's price mechanism to coordinate millions of decentralized food, tech, and retail transactions daily without shortages.",
  },
  {
    id: "th-keynes",
    name: "John Maynard Keynes",
    school: "Keynesian Economics",
    era: "1883–1946 (Great Depression & Post-WWII)",
    coreDoctrine:
      "Aggregate demand is the primary driver of output and employment. Wages and prices are 'sticky downwards' due to labor contracts and worker morale, meaning economies can remain trapped indefinitely in high-unemployment deflationary depressions unless governments intervene with expansionary fiscal stimulus.",
    keyAssumptions: [
      "Wages are sticky downwards; market self-correction is too slow to alleviate human suffering.",
      "Investment is driven by volatile 'animal spirits' (business confidence).",
      "Government budget deficits during slumps stimulate aggregate demand via the Keynesian multiplier.",
    ],
    evaluationAO3:
      "Keynesian demand stimulus successfully cures depressions, but persistent peacetime deficit spending risks sovereign debt accumulation, crowding out, and stagflation.",
    realWorldExample:
      "The US New Deal (1930s), the 2008 fiscal bailouts, and the 2020 COVID-19 multi-trillion-dollar fiscal stimulus packages were textbook applications of Keynesian demand management.",
  },
  {
    id: "th-friedman",
    name: "Milton Friedman",
    school: "Monetarism / Chicago School",
    era: "1912–2006 (Late 20th Century)",
    coreDoctrine:
      "Inflation is 'always and everywhere a monetary phenomenon', caused by excessive growth in the money supply. In the long run, output naturally gravitates to potential GDP (Yf) and the Natural Rate of Unemployment; discretionary fiscal policy merely causes inflation and crowds out private investment.",
    keyAssumptions: [
      "Long-run aggregate supply is vertical at full employment Yf.",
      "Money supply growth should follow a steady, predictable rule (e.g. 3% annually).",
      "Wages and prices are flexible in the long run, rendering demand-management ineffective.",
    ],
    evaluationAO3:
      "Monetarism successfully defeated the 1970s stagflation through Paul Volcker's interest rate hikes, but strictly targeting money supply aggregates proved technically difficult in modern financialized banking.",
    realWorldExample:
      "The US Federal Reserve under Paul Volcker raised rates to 20% in 1980 to crush runaway inflation, vindicating Monetarist discipline.",
  },
  {
    id: "th-hayek",
    name: "Friedrich Hayek",
    school: "Austrian School",
    era: "1899–1992",
    coreDoctrine:
      "The Knowledge Problem: Economic knowledge is dispersed, localized, and subjective. Central planners can never possess the knowledge held by millions of individuals; market prices are the only information telecommunications system that efficiently coordinates decentralized resource allocation.",
    keyAssumptions: [
      "Central government planning leads inexorably to authoritarianism ('The Road to Serfdom').",
      "Artificial credit expansion by central banks causes asset bubbles and destructive business cycle crashes.",
      "Free markets and spontaneous order optimize freedom and efficiency.",
    ],
    evaluationAO3:
      "Hayekian skepticism of state intervention correctly anticipated the collapse of Soviet central planning, but Austrian calls for inaction during financial panics risk catastrophic systemic collapse.",
    realWorldExample:
      "Deregulation and privatization programs initiated by Margaret Thatcher in the UK and Ronald Reagan in the US drew heavily on Hayekian philosophy.",
  },
  {
    id: "th-pigou",
    name: "Arthur Cecil Pigou",
    school: "Welfare Economics",
    era: "1877–1959",
    coreDoctrine:
      "Welfare economics and externalities: Divergences between private and social marginal costs generate market failure. The state should impose a targeted excise tax on polluters equal to the marginal external cost (a 'Pigouvian Tax') to internalize the externality and restore allocative efficiency.",
    keyAssumptions: [
      "External spillover costs and benefits can be identified and quantified in monetary terms.",
      "Taxing harmful emissions raises prices and aligns private marginal cost with marginal social cost.",
    ],
    evaluationAO3:
      "Pigouvian taxation is the gold standard for environmental economics, but setting the exact monetary tax rate is politically difficult and administratively complex.",
    realWorldExample:
      "Sweden's carbon tax and the UK's soft drinks sugar tax are direct, highly successful implementations of Pigouvian welfare economics.",
  },
  {
    id: "th-ricardo",
    name: "David Ricardo",
    school: "Classical Trade Theory",
    era: "1772–1823",
    coreDoctrine:
      "The Law of Comparative Advantage: Mutual gains from international trade occur when nations specialize in goods where their opportunity cost of production is lowest, allowing global consumption to expand beyond domestic production frontiers.",
    keyAssumptions: [
      "Zero international transport costs and constant returns to scale.",
      "Factors of production are mobile domestically between sectors, but immobile internationally.",
      "No trade protection barriers (tariffs or quotas).",
    ],
    evaluationAO3:
      "Comparative advantage forms the bedrock of modern globalization and free trade agreements, though displaced domestic workers in sunset manufacturing face painful structural unemployment.",
    realWorldExample:
      "Global manufacturing value chains: Vietnam specializes in labor-intensive electronics assembly, while Taiwan specializes in capital-intensive semiconductor fabrication.",
  },
  {
    id: "th-ostrom",
    name: "Elinor Ostrom",
    school: "Institutional Economics / Common Property",
    era: "1933–2012 (First female Nobel laureate in Economics)",
    coreDoctrine:
      "Governing the Commons: Common pool resources (fisheries, forests, pastures) do not inevitably collapse in a 'Tragedy of the Commons'. Local communities can develop effective, decentralized cooperative governance rules and social monitoring to manage scarce resources sustainably without privatization or state coercion.",
    keyAssumptions: [
      "Local resource users possess superior local ecological knowledge than distant state bureaucrats.",
      "Clear boundary rules, graduated sanctions, and collective monitoring sustain common pool resources.",
    ],
    evaluationAO3:
      "Provides an empirical alternative to Garrett Hardin's fatalistic tragedy of the commons, though scaling local cooperative trust to global challenges (like ocean acidification or planetary climate change) remains difficult.",
    realWorldExample:
      "Sustainable management of centuries-old Swiss alpine pastures and centuries-old irrigation water distribution networks in Valencia, Spain.",
  },
  {
    id: "th-thaler",
    name: "Richard Thaler",
    school: "Behavioural Economics",
    era: "1945–present (2017 Nobel Laureate)",
    coreDoctrine:
      "Behavioural Economics and Nudge Theory: Human economic decision-makers are not perfectly rational calculating machines; they exhibit bounded rationality, self-control problems (present bias), and cognitive heuristics. Choice architecture can 'nudge' people toward healthier financial, health, and environmental choices without eliminating options or imposing taxes.",
    keyAssumptions: [
      "Individuals rely on mental shortcuts (heuristics), social proof, and framing effects.",
      "Default options exert disproportionate influence on human behavior.",
    ],
    evaluationAO3:
      "Nudges offer low-cost, politically acceptable public policy improvements, but critics argue they cannot substitute for structural regulations or taxes when combating systemic environmental crises.",
    realWorldExample:
      "Automatic pension enrollment in the UK and US increased employee retirement savings rates from 40% to over 85% by simply changing the default option to 'opt-out' rather than 'opt-in'.",
  },
];
'''

exam_questions_code = '''import { ExamBlueprint } from "./types";

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
'''

with open('/Users/ayaanatif/.gemini/antigravity/scratch/ib-economics-sl-liquid-shell/src/data/formulaBank.ts', 'w') as f:
    f.write(formula_code)
with open('/Users/ayaanatif/.gemini/antigravity/scratch/ib-economics-sl-liquid-shell/src/data/theoristsDossier.ts', 'w') as f:
    f.write(theorists_code)
with open('/Users/ayaanatif/.gemini/antigravity/scratch/ib-economics-sl-liquid-shell/src/data/examQuestions.ts', 'w') as f:
    f.write(exam_questions_code)

print("formulaBank.ts, theoristsDossier.ts, examQuestions.ts created successfully!")
