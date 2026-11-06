import { FormulaItem } from "./types";

export const FORMULA_BANK: FormulaItem[] = [
  {
    id: "f-ped",
    code: "PED",
    name: "Price Elasticity of Demand",
    unit: "Unit 2",
    formula: "\\text{PED} = \\frac{\\%\\Delta Q_d}{\\%\\Delta P} = \\frac{\\frac{Q_2 - Q_1}{Q_1} \\times 100}{\\frac{P_2 - P_1}{P_1} \\times 100}",
    variables: [
      { name: "Q1, Q2", definition: "Initial and new quantity demanded." },
      { name: "P1, P2", definition: "Initial and new price of the good." },
    ],
    benchmarkGuidance:
      "PED > 1: Elastic; PED < 1: Inelastic; PED = 1: Unit Elastic; PED = 0: Perfectly Inelastic; PED = \\infty: Perfectly Elastic. Because of the law of demand, PED is negative, but conventionally reported as an absolute positive value.",
    evaluationInterpretation:
      "Crucial for firm pricing decisions: If |PED| > 1, cutting price increases Total Revenue. If |PED| < 1, raising price increases Total Revenue. Governments levy excise taxes on price-inelastic goods to maximize tax revenue.",
    workedExample:
      "A cinema cuts ticket prices from $10 to $8 (%\\Delta P = -20\\%). Attendance rises from 200 to 260 (%\\Delta Qd = +30\\%). PED = +30\\% / -20\\% = -1.5. Absolute PED = 1.5 (Elastic). Total revenue rises from $2,000 to $2,080.",
  },
  {
    id: "f-pes",
    code: "PES",
    name: "Price Elasticity of Supply",
    unit: "Unit 2",
    formula: "\\text{PES} = \\frac{\\%\\Delta Q_s}{\\%\\Delta P} = \\frac{\\frac{Q_{s,2} - Q_{s,1}}{Q_{s,1}} \\times 100}{\\frac{P_2 - P_1}{P_1} \\times 100}",
    variables: [
      { name: "Qs1, Qs2", definition: "Initial and new quantity supplied." },
      { name: "P1, P2", definition: "Initial and new market price." },
    ],
    benchmarkGuidance:
      "PES > 1: Elastic Supply (supply curve cuts P-axis); PES < 1: Inelastic Supply (supply curve cuts Q-axis); PES = 1: Unit Elastic (through origin). Always positive.",
    evaluationInterpretation:
      "Reflects the speed and flexibility of producers to reallocate factors of production. Inelastic supply in agriculture means demand shifts cause wild price volatility.",
    workedExample:
      "Lithium prices rise from $20,000 to $25,000/tonne (+25\\%). Mine output increases from 10,000 to 11,000 tonnes (+10\\%). PES = +10\\% / +25\\% = 0.4 (Inelastic supply due to mining lead times).",
  },
  {
    id: "f-yed",
    code: "YED",
    name: "Income Elasticity of Demand",
    unit: "Unit 2",
    formula: "\\text{YED} = \\frac{\\%\\Delta Q_d}{\\%\\Delta Y} = \\frac{\\frac{Q_2 - Q_1}{Q_1} \\times 100}{\\frac{Y_2 - Y_1}{Y_1} \\times 100}",
    variables: [
      { name: "Q1, Q2", definition: "Initial and new quantity demanded." },
      { name: "Y1, Y2", definition: "Initial and new consumer disposable income." },
    ],
    benchmarkGuidance:
      "YED > 0: Normal Good (0 < YED < 1: Necessity; YED > 1: Luxury). YED < 0: Inferior Good (e.g. instant ramen, bus travel).",
    evaluationInterpretation:
      "Reveals how a firm's sales perform across business cycles. Luxury goods boom during macroeconomic expansions but suffer severe sales collapses in recessions.",
    workedExample:
      "Household income rises by 5\\%. Demand for luxury watches expands by 15\\%. YED = +15\\% / +5\\% = +3.0 (Luxury Normal Good).",
  },
  {
    id: "f-xed",
    code: "XED",
    name: "Cross-Price Elasticity of Demand",
    unit: "Unit 2",
    formula: "\\text{XED} = \\frac{\\%\\Delta Q_{d,A}}{\\%\\Delta P_B}",
    variables: [
      { name: "Qd,A", definition: "Quantity demanded of Good A." },
      { name: "P,B", definition: "Price of Good B." },
    ],
    benchmarkGuidance:
      "XED > 0: Substitute Goods (e.g. tea and coffee). XED < 0: Complementary Goods (e.g. cars and petrol). XED = 0: Unrelated Goods.",
    evaluationInterpretation:
      "Helps businesses predict how competitor price moves will impact their sales, and helps governments define antitrust market boundaries in monopoly regulation.",
    workedExample:
      "The price of butter rises by 10\\%. Demand for margarine increases by 8\\%. XED = +8\\% / +10\\% = +0.8 (Close substitutes).",
  },
  {
    id: "f-gdp",
    code: "GDP",
    name: "Gross Domestic Product (Expenditure Approach)",
    unit: "Unit 3",
    formula: "\\text{GDP} = C + I + G + (X - M)",
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
    formula: "\\text{Real GDP} = \\frac{\\text{Nominal GDP}}{\\text{GDP Deflator}} \\times 100",
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
    formula: "\\text{Inflation Rate} = \\frac{\\text{CPI}_t - \\text{CPI}_{t-1}}{\\text{CPI}_{t-1}} \\times 100",
    variables: [
      { name: "CPIt", definition: "Consumer Price Index in current year." },
      { name: "CPIt-1", definition: "Consumer Price Index in previous year." },
    ],
    benchmarkGuidance:
      "CPI is a weighted index tracking a typical urban household shopping basket. Central banks target ~2% annual inflation.",
    evaluationInterpretation:
      "Limitations: Suffers from substitution bias (consumers switch to cheaper brands), quality change bias, and does not reflect atypical rural or pensioner households.",
    workedExample:
      "CPI was 120 in 2022 and 126 in 2023. Inflation Rate = [(126 - 120) / 120] x 100 = +5.0\\%.",
  },
  {
    id: "f-unemployment",
    code: "UR",
    name: "Unemployment Rate",
    unit: "Unit 3",
    formula: "\\text{Unemployment Rate} = \\frac{\\text{Number of Unemployed}}{\\text{Total Labour Force}} \\times 100",
    variables: [
      { name: "Number of Unemployed", definition: "People of working age without a job, actively seeking work, and available to work." },
      { name: "Total Labour Force", definition: "Sum of employed workers plus actively seeking unemployed individuals." },
    ],
    benchmarkGuidance:
      "Excludes economically inactive individuals (students, stay-at-home parents, discouraged workers who stopped looking). Full employment corresponds to the natural rate of unemployment (~3.5–4.5%).",
    evaluationInterpretation:
      "Official unemployment rates understate true labor distress by ignoring underemployed workers (part-time workers seeking full-time hours) and discouraged workers.",
    workedExample:
      "Labour Force = 20 million; Employed = 19 million; Unemployed = 1 million. Unemployment Rate = (1M / 20M) x 100 = 5.0\\%.",
  },
  {
    id: "f-gini",
    code: "Gini",
    name: "Gini Coefficient (Lorenz Curve)",
    unit: "Unit 3",
    formula: "\\text{Gini Coefficient} = \\frac{\\text{Area } A}{\\text{Area } A + \\text{Area } B}",
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
    formula: "\\text{Tariff Revenue} = t \\times (Q_4 - Q_3), \\quad \\text{Net DWL} = \\frac{1}{2} t (Q_3 - Q_1) + \\frac{1}{2} t (Q_2 - Q_4)",
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
