import os

diagrams_code = '''import { DiagramDossier } from "./types";

export const DIAGRAMS_DOSSIER: DiagramDossier[] = [
  {
    id: "diag-ppf",
    code: "D-01",
    title: "Production Possibility Frontier (PPF / PPC)",
    unitId: "unit-1",
    category: "Foundations",
    xAxisLabel: "Consumer Goods (Units)",
    yAxisLabel: "Capital Goods (Units)",
    description:
      "Illustrates scarcity, choice, opportunity cost, productive efficiency, and the boundary of maximum potential output. A concave (bowed-out) curve reflects the law of increasing opportunity costs due to imperfect factor substitutability.",
    drawingSteps: [
      "1. Draw vertical axis (Capital Goods) and horizontal axis (Consumer Goods).",
      "2. Draw a smooth concave curve bowed outward away from the origin.",
      "3. Plot point A on the curve to represent productive efficiency (full employment).",
      "4. Plot point B inside the curve to show productive inefficiency and unemployed resources.",
      "5. Plot point C outside the curve to illustrate scarcity (currently unattainable).",
      "6. Draw an arrow along the curve between two points to demonstrate opportunity cost.",
      "7. Draw a second curve shifted outwards to show long-term economic growth.",
    ],
    curves: [
      { name: "PPC 1 (Current Frontier)", color: "#38bdf8", description: "Maximum combinations of capital and consumer goods with current resources." },
      { name: "PPC 2 (Expanded Capacity)", color: "#10b981", description: "Outward shift representing long-term economic growth (increased factor quantity/quality)." },
    ],
    shadedRegions: [
      { name: "Unattainable Zone", color: "rgba(244, 63, 94, 0.15)", meaning: "Combinations that cannot be produced due to scarcity of productive resources." },
      { name: "Productive Inefficiency Zone", color: "rgba(245, 158, 11, 0.15)", meaning: "Combinations with idle labor, unused machines, or inefficient resource allocation." },
    ],
    interactiveControls: [
      { id: "show-shift", label: "Toggle Potential Growth (Outward Shift)", effect: "Shows PPF shifting outward due to technology/capital investment." },
      { id: "toggle-inefficiency", label: "Show Unemployed Resources Point", effect: "Highlights Point inside the curve." },
    ],
    examAnalysis:
      "Always define opportunity cost explicitly when using the PPF: 'the value of the next best alternative sacrificed'. Distinguish actual growth (moving from an inside point toward the curve) from potential growth (shifting the entire boundary outward).",
    commonPitfalls: [
      "Drawing a convex curve instead of a concave (bowed-out) curve.",
      "Confusing a movement along the curve (opportunity cost trade-off) with an outward shift (economic growth).",
    ],
  },
  {
    id: "diag-circular-flow",
    code: "D-02",
    title: "Circular Flow of Income (Open Macro Economy)",
    unitId: "unit-1",
    category: "Foundations",
    xAxisLabel: "Real Economic Activity",
    yAxisLabel: "Monetary Value of Flows",
    description:
      "Models the continuous monetary and physical flows between Households and Firms, integrated with the Financial Sector, Government, and Foreign Sector. Injections (I + G + X) expand national income; Leakages (S + T + M) contract national income.",
    drawingSteps: [
      "1. Draw two primary boxes: Households on the left, Firms on the right.",
      "2. Draw upper loop: Factor Services flowing from Households to Firms, and Factor Incomes (Wages, Rent, Interest, Profit) flowing from Firms to Households.",
      "3. Draw lower loop: Goods and Services flowing from Firms to Households, and Consumer Expenditure flowing from Households to Firms.",
      "4. Draw three intermediate sectors: Financial Sector, Government, and Foreign Sector.",
      "5. Draw Leakages flowing OUT of the main loop: Savings (S), Taxes (T), Imports (M).",
      "6. Draw Injections flowing INTO the main loop: Investment (I), Government Spending (G), Exports (X).",
    ],
    curves: [
      { name: "Injections (I + G + X)", color: "#10b981", description: "Additions of extra expenditure into the circular flow from outside the core household-firm circuit." },
      { name: "Leakages (S + T + M)", color: "#f43f5e", description: "Withdrawals of income from the circular flow diverted away from consumption of domestic output." },
    ],
    shadedRegions: [
      { name: "Core Income Circuit", color: "rgba(56, 189, 248, 0.12)", meaning: "Continuous exchange of factors of production for goods and consumer expenditure." },
    ],
    interactiveControls: [
      { id: "toggle-open-economy", label: "Toggle Open Economy Sectors", effect: "Shows Government, Financial, and Foreign trade flows." },
      { id: "simulate-injection", label: "Simulate Expansion (Injections > Leakages)", effect: "Shows national income expanding." },
    ],
    examAnalysis:
      "Crucial for Paper 1 macroeconomics introductions. Equilibrium national income occurs where Injections equal Leakages: S + T + M = I + G + X.",
    commonPitfalls: [
      "Confusing leakages with injections (e.g. thinking taxes are an injection).",
      "Omitting factor payments when defining factor service flows.",
    ],
  },
  {
    id: "diag-market-equilibrium",
    code: "D-03",
    title: "Competitive Market Equilibrium & Social Surplus",
    unitId: "unit-2",
    category: "Microeconomics",
    xAxisLabel: "Quantity (Q)",
    yAxisLabel: "Price (P)",
    description:
      "Demonstrates market clearing price (Pe) and quantity (Qe) where Qd = Qs. Illustrates Consumer Surplus, Producer Surplus, and Allocative Efficiency where Marginal Benefit equals Marginal Cost (MB = MC).",
    drawingSteps: [
      "1. Draw vertical price axis (P) and horizontal quantity axis (Q).",
      "2. Draw downward-sloping Demand curve (D = MB).",
      "3. Draw upward-sloping Supply curve (S = MC).",
      "4. Identify intersection and draw dashed projection lines to Pe on Y-axis and Qe on X-axis.",
      "5. Shade the triangular area below the demand curve and above Pe as Consumer Surplus (cyan).",
      "6. Shade the triangular area above the supply curve and below Pe as Producer Surplus (emerald).",
      "7. Note that at Qe, Total Community Surplus (CS + PS) is strictly maximized.",
    ],
    curves: [
      { name: "Demand (MB)", color: "#0ea5e9", description: "Marginal Private Benefit curve, reflecting consumer willingness and ability to pay." },
      { name: "Supply (MC)", color: "#10b981", description: "Marginal Private Cost curve, reflecting firm costs of production." },
    ],
    shadedRegions: [
      { name: "Consumer Surplus (CS)", color: "rgba(14, 165, 233, 0.25)", meaning: "Excess benefit enjoyed by consumers who were willing to pay higher than market price Pe." },
      { name: "Producer Surplus (PS)", color: "rgba(16, 185, 129, 0.25)", meaning: "Excess revenue received by producers above the minimum price required to supply." },
    ],
    interactiveControls: [
      { id: "toggle-shortage", label: "Simulate Low Price (Shortage)", effect: "Shows price below Pe with excess demand." },
      { id: "toggle-surplus", label: "Simulate High Price (Surplus)", effect: "Shows price above Pe with excess supply." },
    ],
    examAnalysis:
      "At equilibrium, Allocative Efficiency is achieved (MB = MC). Total social surplus is maximized with zero deadweight loss. Mention the signaling, incentive, and rationing functions of price.",
    commonPitfalls: [
      "Forgetting to label dashed coordinate lines Pe and Qe.",
      "Confusing consumer surplus with consumer total expenditure (P x Q).",
    ],
  },
  {
    id: "diag-demand-shifts",
    code: "D-04",
    title: "Shifts in Demand vs Movements Along Demand",
    unitId: "unit-2",
    category: "Microeconomics",
    xAxisLabel: "Quantity Demanded (Q)",
    yAxisLabel: "Price (P)",
    description:
      "Contrasts a change in quantity demanded (movement along curve caused strictly by a change in the good's own price) with a change in demand (shift of the entire curve caused by PASIFIC determinants).",
    drawingSteps: [
      "1. Draw downward-sloping initial demand curve D1.",
      "2. Pick two points on D1 (P1, Q1) and (P2, Q2) to show a movement along the curve (expansion or contraction).",
      "3. Draw a parallel curve D2 to the right to illustrate an Increase in Demand.",
      "4. Draw a parallel curve D3 to the left to illustrate a Decrease in Demand.",
      "5. Draw horizontal directional arrows indicating shifts at a constant price.",
    ],
    curves: [
      { name: "D1 (Baseline Demand)", color: "#38bdf8", description: "Initial consumer demand schedule." },
      { name: "D2 (Demand Shift Right)", color: "#a855f7", description: "Increase in demand caused by population growth, advertising, higher income, or substitute price rise." },
      { name: "D3 (Demand Shift Left)", color: "#f43f5e", description: "Decrease in demand caused by falling income (normal good), complement price rise, or preference change." },
    ],
    shadedRegions: [],
    interactiveControls: [
      { id: "shift-right", label: "Shift Demand Right (D1 -> D2)", effect: "Simulates increase in demand." },
      { id: "shift-left", label: "Shift Demand Left (D1 -> D3)", effect: "Simulates decrease in demand." },
    ],
    examAnalysis:
      "A guaranteed mark-loser in Paper 1 if confused. Always specify: 'movement along curve' = own price change; 'shift of curve' = non-price determinant (PASIFIC).",
    commonPitfalls: [
      "Saying 'demand increased' when you mean 'quantity demanded expanded due to a price cut'.",
    ],
  },
  {
    id: "diag-supply-shifts",
    code: "D-05",
    title: "Shifts in Supply vs Movements Along Supply",
    unitId: "unit-2",
    category: "Microeconomics",
    xAxisLabel: "Quantity Supplied (Q)",
    yAxisLabel: "Price (P)",
    description:
      "Contrasts a change in quantity supplied (movement along curve caused by own price) with a change in supply (shift of the entire curve caused by PINTS WC determinants).",
    drawingSteps: [
      "1. Draw upward-sloping initial supply curve S1.",
      "2. Show a movement along S1 as price changes from P1 to P2.",
      "3. Draw curve S2 shifted downwards and to the right to represent an Increase in Supply.",
      "4. Draw curve S3 shifted upwards and to the left to represent a Decrease in Supply.",
      "5. Label causes: S2 = technological advance or subsidy; S3 = wage rise or indirect tax.",
    ],
    curves: [
      { name: "S1 (Baseline Supply)", color: "#10b981", description: "Initial marginal cost supply schedule." },
      { name: "S2 (Supply Shift Right)", color: "#06b6d4", description: "Increase in supply: lower production costs, technology advance, or subsidy." },
      { name: "S3 (Supply Shift Left)", color: "#f59e0b", description: "Decrease in supply: higher factor costs (wages, energy), supply bottleneck, or indirect tax." },
    ],
    shadedRegions: [],
    interactiveControls: [
      { id: "shift-right", label: "Shift Supply Right (S1 -> S2)", effect: "Simulates lower costs / technology improvement." },
      { id: "shift-left", label: "Shift Supply Left (S1 -> S3)", effect: "Simulates energy shock / indirect tax." },
    ],
    examAnalysis:
      "Remember: a supply curve shifting 'down' is actually shifting to the RIGHT (an increase in supply). A supply curve shifting 'up' is shifting to the LEFT (a decrease in supply).",
    commonPitfalls: [
      "Thinking a downward shift in supply means a decrease; it is an increase because costs have fallen.",
    ],
  },
  {
    id: "diag-ped-tr",
    code: "D-06",
    title: "Price Elasticity of Demand (PED) & Total Revenue",
    unitId: "unit-2",
    category: "Microeconomics",
    xAxisLabel: "Quantity Demanded (Q)",
    yAxisLabel: "Price (P) / Total Revenue (TR)",
    description:
      "Shows how PED varies along a downward-sloping linear demand curve: elastic (PED > 1) in the upper half, unitary (PED = 1) at the midpoint, and inelastic (PED < 1) in the lower half, directly mapped to the Total Revenue curve.",
    drawingSteps: [
      "1. Draw upper diagram: A downward-sloping straight-line demand curve intersecting both axes.",
      "2. Mark midpoint: label PED = 1. Above midpoint: label PED > 1 (elastic). Below midpoint: label PED < 1 (inelastic).",
      "3. Draw lower diagram directly aligned: Total Revenue on Y-axis, Quantity on X-axis.",
      "4. Draw an inverted U-shaped parabolic Total Revenue (TR) curve.",
      "5. Connect the midpoint of the demand curve (PED = 1) with a dashed vertical line to the peak of the TR curve.",
      "6. Highlight that when PED > 1, cutting price increases TR; when PED < 1, cutting price reduces TR.",
    ],
    curves: [
      { name: "Demand Curve (D)", color: "#38bdf8", description: "Linear demand curve showing changing elasticity at each coordinate." },
      { name: "Total Revenue Curve (TR)", color: "#a855f7", description: "Parabolic curve peaking where demand is unit elastic (PED = 1)." },
    ],
    shadedRegions: [
      { name: "Revenue Gain vs Loss Zone", color: "rgba(168, 85, 247, 0.2)", meaning: "Demonstrates how price cuts in the elastic region create percentage quantity gains exceeding price cuts." },
    ],
    interactiveControls: [
      { id: "toggle-price-cut-elastic", label: "Price Cut in Elastic Region (TR rises)", effect: "Shows TR expanding." },
      { id: "toggle-price-cut-inelastic", label: "Price Cut in Inelastic Region (TR falls)", effect: "Shows TR shrinking." },
    ],
    examAnalysis:
      "A classic exam trap: slope is constant along a straight-line demand curve, but elasticity varies continuously from infinity at the price axis to zero at the quantity axis.",
    commonPitfalls: [
      "Assuming a straight-line demand curve has constant elasticity throughout.",
    ],
  },
  {
    id: "diag-pes-curves",
    code: "D-07",
    title: "Price Elasticity of Supply (PES) Curves & Intercepts",
    unitId: "unit-2",
    category: "Microeconomics",
    xAxisLabel: "Quantity Supplied (Q)",
    yAxisLabel: "Price (P)",
    description:
      "Visualizes the geometric rule for linear supply curves: any supply curve cutting the vertical price axis is Elastic (PES > 1); cutting the origin is Unit Elastic (PES = 1); cutting the horizontal quantity axis is Inelastic (PES < 1).",
    drawingSteps: [
      "1. Draw vertical price axis (P) and horizontal quantity axis (Q).",
      "2. Draw S1 starting from the vertical P-axis: label PES > 1 (Elastic).",
      "3. Draw S2 passing straight through the origin (0,0): label PES = 1 (Unit Elastic).",
      "4. Draw S3 starting from the horizontal Q-axis: label PES < 1 (Inelastic).",
      "5. Draw vertical supply curve S4: label PES = 0 (Perfectly Inelastic, e.g. agricultural harvest).",
      "6. Draw horizontal supply curve S5: label PES = infinity (Perfectly Elastic).",
    ],
    curves: [
      { name: "S1 (Elastic, cuts P-axis)", color: "#06b6d4", description: "PES > 1 everywhere along the curve." },
      { name: "S2 (Unit Elastic, through origin)", color: "#10b981", description: "PES = 1 everywhere along the curve." },
      { name: "S3 (Inelastic, cuts Q-axis)", color: "#f59e0b", description: "PES < 1 everywhere along the curve." },
      { name: "S4 (Perfectly Inelastic)", color: "#f43f5e", description: "PES = 0 (fixed physical quantity regardless of price)." },
    ],
    shadedRegions: [],
    interactiveControls: [
      { id: "highlight-elastic", label: "Highlight Elastic Curve", effect: "Emphasizes S1 (cuts P-axis)." },
      { id: "highlight-inelastic", label: "Highlight Inelastic Curve", effect: "Emphasizes S3 (cuts Q-axis)." },
    ],
    examAnalysis:
      "Remember the geometric rule for Paper 1: check where the line intersects the axes! It avoids tedious calculations when identifying elasticity from diagrams.",
    commonPitfalls: [
      "Believing a steep supply curve that passes through the vertical price axis is inelastic.",
    ],
  },
  {
    id: "diag-price-ceiling",
    code: "D-08",
    title: "Price Ceiling (Maximum Price) & Welfare Loss",
    unitId: "unit-2",
    category: "Microeconomics",
    xAxisLabel: "Quantity (Q)",
    yAxisLabel: "Price (P)",
    description:
      "Shows a legally enforced maximum price set BELOW equilibrium (Pmax < Pe), creating an unresolved market shortage (Qd - Qs), non-price rationing, black markets, and deadweight welfare loss.",
    drawingSteps: [
      "1. Draw demand (D) and supply (S) with free market equilibrium Pe and Qe.",
      "2. Draw a horizontal line Pmax BELOW equilibrium Pe across the entire diagram.",
      "3. Where Pmax intersects S, draw dashed line down to Qs (quantity supplied contracts).",
      "4. Where Pmax intersects D, draw dashed line down to Qd (quantity demanded expands).",
      "5. Label the horizontal distance between Qs and Qd as 'Shortage (Excess Demand)'.",
      "6. Extend a vertical line up from Qs to the demand curve to show the Black Market Price (Pb).",
      "7. Shade the Deadweight Loss triangle between Qs and Qe, bounded by demand and supply.",
    ],
    curves: [
      { name: "Demand (D)", color: "#0ea5e9", description: "Consumer demand schedule." },
      { name: "Supply (S)", color: "#10b981", description: "Producer supply schedule." },
      { name: "Price Ceiling (Pmax)", color: "#f43f5e", description: "Legally binding maximum price set below equilibrium." },
    ],
    shadedRegions: [
      { name: "Deadweight Welfare Loss (DWL)", color: "rgba(244, 63, 94, 0.28)", meaning: "Lost community surplus from trades blocked by the price ceiling (between Qs and Qe)." },
      { name: "Shortage Bracket", color: "rgba(245, 158, 11, 0.2)", meaning: "Unsatisfied consumer demand (Qd - Qs)." },
    ],
    interactiveControls: [
      { id: "show-black-market", label: "Show Black Market Price (Pb)", effect: "Displays vertical projection up to demand curve." },
      { id: "toggle-dwl", label: "Highlight Deadweight Loss Triangle", effect: "Emphasizes lost social surplus." },
    ],
    examAnalysis:
      "Always evaluate who gains and who loses: Consumers who get the good at Pmax gain surplus; consumers who are rationed out lose utility; landlords/producers lose revenue; black marketeers profit illegally.",
    commonPitfalls: [
      "Drawing the price ceiling above equilibrium (which would be non-binding and ineffective).",
      "Shading the deadweight loss triangle between Qe and Qd instead of between Qs and Qe.",
    ],
  },
  {
    id: "diag-price-floor",
    code: "D-09",
    title: "Price Floor (Minimum Price) & Surpluses",
    unitId: "unit-2",
    category: "Microeconomics",
    xAxisLabel: "Quantity (Q)",
    yAxisLabel: "Price (P)",
    description:
      "Shows a legally enforced minimum price set ABOVE equilibrium (Pmin > Pe), creating an excess supply (surplus) where Qs > Qd. In agriculture, governments must purchase the surplus; in labor markets, it causes unemployment.",
    drawingSteps: [
      "1. Draw demand (D) and supply (S) with free market equilibrium Pe and Qe.",
      "2. Draw a horizontal line Pmin ABOVE equilibrium Pe across the diagram.",
      "3. Where Pmin intersects D, project down to Qd (quantity demanded contracts).",
      "4. Where Pmin intersects S, project down to Qs (quantity supplied expands).",
      "5. Label the horizontal distance between Qd and Qs as 'Surplus (Excess Supply)'.",
      "6. If the government buys the surplus, shade the large rectangle: Cost to Government = Pmin x (Qs - Qd).",
      "7. Shade the Deadweight Loss triangle resulting from the misallocation of resources.",
    ],
    curves: [
      { name: "Demand (D)", color: "#0ea5e9", description: "Consumer demand schedule." },
      { name: "Supply (S)", color: "#10b981", description: "Producer supply schedule." },
      { name: "Price Floor (Pmin)", color: "#f59e0b", description: "Legally binding minimum price set above equilibrium." },
    ],
    shadedRegions: [
      { name: "Surplus (Excess Supply)", color: "rgba(245, 158, 11, 0.2)", meaning: "Unsold inventory produced by firms that consumers will not buy at Pmin." },
      { name: "Government Purchase Cost", color: "rgba(244, 63, 94, 0.2)", meaning: "Taxpayer funds spent by the state to buy up the surplus: Pmin x (Qs - Qd)." },
    ],
    interactiveControls: [
      { id: "show-gov-cost", label: "Show Government Purchase Burden", effect: "Highlights the large taxpayer expenditure rectangle." },
      { id: "labor-market-mode", label: "Switch to Minimum Wage Labels", effect: "Changes labels to Wage (W), Labor (L), and Unemployment." },
    ],
    examAnalysis:
      "In labor markets, a price floor is a Minimum Wage: Qd is labor demanded by firms, Qs is labor supplied by workers, and (Qs - Qd) represents involuntary unemployment.",
    commonPitfalls: [
      "Drawing the price floor below equilibrium (which is non-binding).",
      "Forgetting to calculate the fiscal cost to taxpayers if government commits to buying the surplus.",
    ],
  },
  {
    id: "diag-indirect-tax",
    code: "D-10",
    title: "Specific Indirect Tax & Tax Incidence",
    unitId: "unit-2",
    category: "Microeconomics",
    xAxisLabel: "Quantity (Q)",
    yAxisLabel: "Price (P)",
    description:
      "Shows a specific indirect tax shifting supply vertically upwards by the tax amount (S to S + tax). Identifies consumer price Pc, producer price Pp, government tax revenue, consumer vs producer burden, and deadweight welfare loss.",
    drawingSteps: [
      "1. Draw demand (D) and initial supply (S1) with equilibrium Pe and Qe.",
      "2. Draw S2 parallel and vertically above S1 by the exact per-unit tax amount (S1 + tax).",
      "3. Identify new equilibrium where S2 intersects D: project to consumer price Pc and new quantity Qt.",
      "4. From Qt, drop a vertical line to S1 to find producer net price Pp (Pp = Pc - tax).",
      "5. Shade Government Tax Revenue rectangle: (Pc - Pp) x Qt.",
      "6. Split tax revenue into Consumer Burden (upper box: [Pc - Pe] x Qt) and Producer Burden (lower box: [Pe - Pp] x Qt).",
      "7. Shade the Deadweight Loss triangle between Qt and Qe, bounded by D and S1.",
    ],
    curves: [
      { name: "Demand (D)", color: "#0ea5e9", description: "Consumer demand schedule." },
      { name: "S1 (Pre-Tax Supply)", color: "#10b981", description: "Original marginal cost curve." },
      { name: "S2 (S1 + Tax)", color: "#f43f5e", description: "Supply shifted vertically up by the exact per-unit specific tax." },
    ],
    shadedRegions: [
      { name: "Consumer Tax Burden", color: "rgba(14, 165, 233, 0.35)", meaning: "Portion of tax paid by consumers through higher retail price (Pc - Pe) x Qt." },
      { name: "Producer Tax Burden", color: "rgba(16, 185, 129, 0.35)", meaning: "Portion of tax absorbed by firms through lower net revenue (Pe - Pp) x Qt." },
      { name: "Deadweight Loss (DWL)", color: "rgba(244, 63, 94, 0.3)", meaning: "Lost community surplus from trades extinguished by the tax." },
    ],
    interactiveControls: [
      { id: "toggle-incidence", label: "Toggle Consumer vs Producer Incidence", effect: "Highlights the two distinct tax burden rectangles." },
      { id: "toggle-dwl", label: "Highlight Deadweight Loss Triangle", effect: "Emphasizes the DWL triangle pointing to Qe." },
    ],
    examAnalysis:
      "Tax Incidence depends on relative elasticity: If demand is price-inelastic (PED < PES, like tobacco), consumers pay most of the tax. If supply is inelastic (PES < PED), producers bear most of the burden.",
    commonPitfalls: [
      "Drawing the supply shift as a non-parallel rotation for a specific tax (a rotation is an ad valorem tax).",
      "Confusing producer net price Pp with free market price Pe.",
    ],
  },
  {
    id: "diag-subsidy",
    code: "D-11",
    title: "Production Subsidy & Welfare Analysis",
    unitId: "unit-2",
    category: "Microeconomics",
    xAxisLabel: "Quantity (Q)",
    yAxisLabel: "Price (P)",
    description:
      "Shows a government production subsidy shifting supply vertically downwards by the subsidy per unit (S to S - subsidy). Evaluates lower consumer price Pc, higher producer price Pp, government expenditure rectangle, and deadweight loss from overproduction.",
    drawingSteps: [
      "1. Draw demand (D) and initial supply (S1) with equilibrium Pe and Qe.",
      "2. Draw S2 parallel and vertically below S1 by the per-unit subsidy amount (S1 - subsidy).",
      "3. New equilibrium is where S2 intersects D: project to consumer price Pc and new output Qsub.",
      "4. From Qsub, extend a vertical line straight up to S1 to find total price received by producers (Pp = Pc + subsidy).",
      "5. Shade Total Government Cost rectangle: (Pp - Pc) x Qsub.",
      "6. Consumer surplus gains the area between Pe and Pc up to Qsub.",
      "7. Producer surplus gains the area between Pp and Pe down to S1.",
      "8. Shade the Deadweight Loss triangle between Qe and Qsub where MSC > MSB.",
    ],
    curves: [
      { name: "Demand (D)", color: "#0ea5e9", description: "Consumer demand schedule." },
      { name: "S1 (Pre-Subsidy Supply)", color: "#10b981", description: "Original marginal cost curve." },
      { name: "S2 (S1 - Subsidy)", color: "#06b6d4", description: "Supply shifted vertically down by the per-unit subsidy." },
    ],
    shadedRegions: [
      { name: "Government Expenditure Rectangle", color: "rgba(244, 63, 94, 0.2)", meaning: "Total fiscal cost to taxpayers: Subsidy per unit x Qsub." },
      { name: "Deadweight Welfare Loss", color: "rgba(245, 158, 11, 0.35)", meaning: "Welfare loss from overproduction where MSC exceeds MSB between Qe and Qsub." },
    ],
    interactiveControls: [
      { id: "show-gov-cost", label: "Show Total Cost to Government", effect: "Highlights the large taxpayer expenditure rectangle." },
      { id: "show-dwl", label: "Highlight Overproduction DWL Triangle", effect: "Emphasizes the DWL triangle pointing to Qe." },
    ],
    examAnalysis:
      "Subsidies increase both consumer and producer surplus, but the total government financial payout exceeds those gains, creating an overall deadweight loss unless positive externalities exist.",
    commonPitfalls: [
      "Forgetting that producer price Pp is located on the original supply curve S1 above Pe.",
    ],
  },
  {
    id: "diag-neg-ext-production",
    code: "D-12",
    title: "Negative Externality of Production (Industrial Pollution)",
    unitId: "unit-2",
    category: "Microeconomics",
    xAxisLabel: "Quantity (Q)",
    yAxisLabel: "Price, Costs & Benefits (P, C, B)",
    description:
      "Occurs when production imposes external spillover costs on third parties (MSC > MPC). Free market overproduces at Qm > Qopt. Deadweight loss triangle points towards the social optimum Qopt. Corrected via a Pigouvian carbon tax.",
    drawingSteps: [
      "1. Draw single demand curve: label MPB = MSB (no consumption externalities).",
      "2. Draw private supply curve MPC.",
      "3. Draw social cost curve MSC parallel and above MPC: MSC = MPC + MEC.",
      "4. Free market equilibrium: where MPC = MPB. Project down to Qm and across to Pm.",
      "5. Social optimum: where MSC = MSB. Project down to Qopt and across to Popt.",
      "6. Highlight that Qm > Qopt (overallocation of scarce resources / overproduction).",
      "7. Shade the Deadweight Loss triangle between Qopt and Qm, bounded by MSC and MSB (points left toward Qopt).",
      "8. Draw corrective tax shifting MPC up to coincide with MSC, eliminating DWL.",
    ],
    curves: [
      { name: "MPB = MSB", color: "#0ea5e9", description: "Marginal Social Benefit equals Marginal Private Benefit." },
      { name: "MPC (Private Supply)", color: "#10b981", description: "Marginal Private Cost incurred by polluting firms." },
      { name: "MSC (MPC + MEC)", color: "#f43f5e", description: "Marginal Social Cost including external environmental and healthcare damage." },
    ],
    shadedRegions: [
      { name: "Deadweight Welfare Loss (DWL)", color: "rgba(244, 63, 94, 0.35)", meaning: "Loss of social welfare from overproducing units where MSC exceeds MSB (points toward Qopt)." },
    ],
    interactiveControls: [
      { id: "apply-carbon-tax", label: "Apply Pigouvian Carbon Tax", effect: "Shifts MPC up to MSC, moving market to Qopt and Popt." },
      { id: "toggle-dwl", label: "Highlight Deadweight Loss Triangle", effect: "Emphasizes the DWL triangle." },
    ],
    examAnalysis:
      "A classic Paper 1 15-mark essay question. State clearly: Market produces at Qm where MPC = MPB; society desires Qopt where MSC = MSB. The deadweight loss triangle points like an arrow to Qopt.",
    commonPitfalls: [
      "Drawing two demand curves instead of two supply curves for a production externality.",
      "Pointing the deadweight loss triangle in the wrong direction.",
    ],
  },
  {
    id: "diag-neg-ext-consumption",
    code: "D-13",
    title: "Negative Externality of Consumption (Demerit Goods)",
    unitId: "unit-2",
    category: "Microeconomics",
    xAxisLabel: "Quantity (Q)",
    yAxisLabel: "Price, Costs & Benefits (P, C, B)",
    description:
      "Occurs when consumption imposes external spillover costs on society (MPB > MSB), e.g. tobacco, alcohol, sugary soft drinks. Free market overconsumes at Qm > Qopt, creating deadweight welfare loss.",
    drawingSteps: [
      "1. Draw single supply curve: label MPC = MSC (no production externalities).",
      "2. Draw private demand curve MPB.",
      "3. Draw social benefit curve MSB below and parallel to MPB: MSB = MPB - MEB.",
      "4. Free market equilibrium: where MPC = MPB. Project to Qm and Pm.",
      "5. Social optimum: where MSC = MSB. Project to Qopt and Popt.",
      "6. Highlight that Qm > Qopt (overconsumption of demerit good).",
      "7. Shade the Deadweight Loss triangle between Qopt and Qm, bounded by MSC and MSB (points left toward Qopt).",
      "8. Show corrective indirect excise tax shifting supply up/left to achieve Qopt.",
    ],
    curves: [
      { name: "MPC = MSC", color: "#10b981", description: "Marginal Private Cost equals Marginal Social Cost." },
      { name: "MPB (Private Demand)", color: "#0ea5e9", description: "Marginal Private Benefit perceived by individual consumers." },
      { name: "MSB (MPB - MEB)", color: "#f43f5e", description: "Marginal Social Benefit accounting for external healthcare costs on society." },
    ],
    shadedRegions: [
      { name: "Deadweight Welfare Loss (DWL)", color: "rgba(244, 63, 94, 0.35)", meaning: "Welfare loss from overconsuming units where MSC exceeds MSB (points toward Qopt)." },
    ],
    interactiveControls: [
      { id: "apply-sin-tax", label: "Apply Corrective Sin Tax", effect: "Shifts supply left to reduce consumption to Qopt." },
      { id: "toggle-dwl", label: "Highlight Deadweight Loss Triangle", effect: "Emphasizes the DWL triangle." },
    ],
    examAnalysis:
      "Crucial distinction: Consumption externalities have TWO demand curves (MPB and MSB) and ONE supply curve (MPC = MSC).",
    commonPitfalls: [
      "Placing MSB above MPB for a negative consumption externality (it must be BELOW MPB).",
    ],
  },
  {
    id: "diag-pos-ext-consumption",
    code: "D-14",
    title: "Positive Externality of Consumption (Merit Goods)",
    unitId: "unit-2",
    category: "Microeconomics",
    xAxisLabel: "Quantity (Q)",
    yAxisLabel: "Price, Costs & Benefits (P, C, B)",
    description:
      "Occurs when consumption generates external benefits for third parties (MSB > MPB), e.g. vaccines, primary healthcare, education. Free market underconsumes at Qm < Qopt, resulting in potential welfare loss.",
    drawingSteps: [
      "1. Draw single supply curve: label MPC = MSC.",
      "2. Draw private demand curve MPB.",
      "3. Draw social benefit curve MSB above and parallel to MPB: MSB = MPB + MEB.",
      "4. Free market equilibrium: where MPC = MPB. Project down to Qm and across to Pm.",
      "5. Social optimum: where MSC = MSB. Project down to Qopt and across to Popt.",
      "6. Highlight that Qm < Qopt (underconsumption and underallocation of resources).",
      "7. Shade the Potential Welfare Gain / Deadweight Loss triangle between Qm and Qopt, pointing right toward Qopt.",
      "8. Show corrective subsidy shifting supply down/right to achieve consumption at Qopt.",
    ],
    curves: [
      { name: "MPC = MSC", color: "#10b981", description: "Marginal Private Cost equals Marginal Social Cost." },
      { name: "MPB (Private Demand)", color: "#0ea5e9", description: "Marginal Private Benefit perceived by individual consumers." },
      { name: "MSB (MPB + MEB)", color: "#a855f7", description: "Marginal Social Benefit including positive spillovers (herd immunity, educated citizenry)." },
    ],
    shadedRegions: [
      { name: "Potential Welfare Gain Forgone", color: "rgba(168, 85, 247, 0.35)", meaning: "Welfare loss from failing to consume units where MSB exceeds MSC (points toward Qopt)." },
    ],
    interactiveControls: [
      { id: "apply-subsidy", label: "Apply Government Subsidy", effect: "Shifts supply right to expand consumption to Qopt." },
      { id: "toggle-dwl", label: "Highlight Potential Welfare Gain Triangle", effect: "Emphasizes the DWL triangle." },
    ],
    examAnalysis:
      "Explain herd immunity: when an individual gets vaccinated, they generate an external benefit (MEB) for immunocompromised citizens who cannot be vaccinated, justifying government subsidy or direct free provision.",
    commonPitfalls: [
      "Drawing MSB below MPB instead of ABOVE MPB.",
    ],
  },
  {
    id: "diag-business-cycle",
    code: "D-15",
    title: "The Business Cycle & Output Gaps",
    unitId: "unit-3",
    category: "Macroeconomics",
    xAxisLabel: "Time (Years)",
    yAxisLabel: "Real GDP ($)",
    description:
      "Depicts fluctuations of actual real GDP around the long-term trend path of potential GDP over time. Illustrates Expansion, Peak, Contraction (Recession), Trough, Positive Output Gap (Inflationary), and Negative Output Gap (Deflationary).",
    drawingSteps: [
      "1. Draw vertical axis (Real GDP) and horizontal axis (Time).",
      "2. Draw a smooth, upward-sloping straight line: label 'Potential GDP Trend Line'.",
      "3. Draw a sinusoidal periodic wave oscillating above and below the trend line: label 'Actual Real GDP'.",
      "4. Label four phases: 1. Expansion/Boom, 2. Peak, 3. Contraction/Recession, 4. Trough.",
      "5. Shade the region above the trend line as a 'Positive Output Gap (Inflationary Gap)'.",
      "6. Shade the region below the trend line as a 'Negative Output Gap (Deflationary/Recessionary Gap)'.",
    ],
    curves: [
      { name: "Potential GDP Trend Line", color: "#10b981", description: "Represents the long-term supply-side growth trajectory of full-capacity potential output." },
      { name: "Actual Real GDP Wave", color: "#38bdf8", description: "Periodic fluctuations in actual output driven by aggregate demand cycles." },
    ],
    shadedRegions: [
      { name: "Positive Output Gap (Inflationary)", color: "rgba(244, 63, 94, 0.25)", meaning: "Actual output exceeds sustainable potential GDP, causing inflationary pressure and resource shortages." },
      { name: "Negative Output Gap (Deflationary)", color: "rgba(245, 158, 11, 0.25)", meaning: "Actual output falls below potential GDP, causing spare capacity and cyclical unemployment." },
    ],
    interactiveControls: [
      { id: "toggle-gaps", label: "Toggle Output Gap Labels", effect: "Highlights Inflationary vs Deflationary gaps." },
      { id: "highlight-recession", label: "Highlight Official Recession Zone", effect: "Emphasizes two consecutive quarters of falling GDP." },
    ],
    examAnalysis:
      "A technical definition: A recession occurs when actual real GDP falls for at least two consecutive quarters. Relate the potential GDP trend line to shifts in the PPF and LRAS.",
    commonPitfalls: [
      "Drawing the trend line flat instead of upward sloping (modern economies experience long-term growth).",
    ],
  },
  {
    id: "diag-ad-shifts",
    code: "D-16",
    title: "Aggregate Demand Shifts (C + I + G + [X - M])",
    unitId: "unit-3",
    category: "Macroeconomics",
    xAxisLabel: "Real GDP (Y)",
    yAxisLabel: "Price Level (PL)",
    description:
      "Shows the downward-sloping Aggregate Demand curve and its components: C + I + G + (X - M). Illustrates rightward shift (expansionary fiscal/monetary policy, consumer confidence) and leftward shift (recession, tax hikes).",
    drawingSteps: [
      "1. Draw Price Level on Y-axis and Real GDP (Y) on X-axis.",
      "2. Draw downward-sloping initial curve AD1.",
      "3. Draw parallel curve AD2 to the right: label causes (lower interest rates, higher G, tax cuts, export boom).",
      "4. Draw parallel curve AD3 to the left: label causes (austerity, higher interest rates, collapse in consumer confidence).",
      "5. Note three reasons AD slopes downward: Wealth Effect, Interest Rate Effect, Net Export Effect.",
    ],
    curves: [
      { name: "AD1 (Baseline Aggregate Demand)", color: "#38bdf8", description: "Total planned spending at each price level: C + I + G + (X - M)." },
      { name: "AD2 (Expansion Shift Right)", color: "#10b981", description: "Expansionary demand shock: rate cuts, fiscal stimulus, surging consumer confidence." },
      { name: "AD3 (Contraction Shift Left)", color: "#f43f5e", description: "Contractionary shock: fiscal austerity, rate hikes, global trade slump." },
    ],
    shadedRegions: [],
    interactiveControls: [
      { id: "shift-ad-right", label: "Shift AD Right (Stimulus)", effect: "Simulates expansionary policy." },
      { id: "shift-ad-left", label: "Shift AD Left (Contraction)", effect: "Simulates recession / austerity." },
    ],
    examAnalysis:
      "Never explain the slope of AD using microeconomic substitution ('people buy tea instead of coffee'). Explain macroeconomic mechanisms: Wealth Effect, Interest Rate Effect, and Net Export Effect.",
    commonPitfalls: [
      "Labeling axes 'P' and 'Q' instead of 'Price Level (PL)' and 'Real GDP (Y)'.",
    ],
  },
  {
    id: "diag-sras-shocks",
    code: "D-17",
    title: "Short-Run Aggregate Supply (SRAS) Shocks & Stagflation",
    unitId: "unit-3",
    category: "Macroeconomics",
    xAxisLabel: "Real GDP (Y)",
    yAxisLabel: "Price Level (PL)",
    description:
      "Shows an upward-sloping SRAS curve and the impact of adverse supply shocks (crude oil price hikes, minimum wage surges, imported input costs). A leftward shift of SRAS causes Stagflation: simultaneously higher price level and lower real output.",
    drawingSteps: [
      "1. Draw Price Level (PL) on Y-axis and Real GDP (Y) on X-axis.",
      "2. Draw downward-sloping AD and upward-sloping initial SRAS1 with equilibrium PL1 and Y1.",
      "3. Draw SRAS2 shifted upwards and to the left (adverse supply shock).",
      "4. Identify new equilibrium where SRAS2 intersects AD: price level rises to PL2, and real GDP falls to Y2.",
      "5. Label the outcome as 'Stagflation' (rising inflation + rising unemployment).",
      "6. Highlight the policy dilemma: stimulating AD lowers unemployment but worsens inflation; contracting AD cools inflation but worsens recession.",
    ],
    curves: [
      { name: "Aggregate Demand (AD)", color: "#38bdf8", description: "Total expenditure in the economy." },
      { name: "SRAS1 (Initial Supply)", color: "#10b981", description: "Short-run aggregate supply with baseline factor production costs." },
      { name: "SRAS2 (Adverse Supply Shock)", color: "#f43f5e", description: "SRAS shifted leftward due to crude oil spike, wage hike, or currency depreciation." },
    ],
    shadedRegions: [
      { name: "Stagflation Zone", color: "rgba(244, 63, 94, 0.25)", meaning: "Economic zone characterized by concurrently high inflation and falling real output." },
    ],
    interactiveControls: [
      { id: "trigger-oil-shock", label: "Simulate Oil Supply Shock (SRAS left)", effect: "Shifts SRAS left, demonstrating stagflation." },
      { id: "trigger-favorable-shock", label: "Simulate Favorable Shock (SRAS right)", effect: "Shifts SRAS right, lowering PL and boosting GDP." },
    ],
    examAnalysis:
      "Stagflation is the ultimate macroeconomic dilemma because traditional demand-management tools cannot resolve both rising inflation and rising unemployment simultaneously.",
    commonPitfalls: [
      "Assuming a supply shock shifts AD; factor cost shocks shift SRAS.",
    ],
  },
  {
    id: "diag-monetarist-vs-keynesian",
    code: "D-18",
    title: "Monetarist vs Keynesian Aggregate Supply Models",
    unitId: "unit-3",
    category: "Macroeconomics",
    xAxisLabel: "Real GDP (Y)",
    yAxisLabel: "Price Level (PL)",
    description:
      "The great ideological divide in macroeconomics: Monetarist / New Classical vertical LRAS at full employment (Yf) with automatic self-correction vs Keynesian 3-phase AS curve with wage stickiness and persistent unemployment equilibrium.",
    drawingSteps: [
      "1. Monetarist Diagram: Draw AD, upward SRAS, and a perfectly vertical LRAS at potential output Yf.",
      "2. Show a deflationary gap: AD shifts left to AD2, output falls to Y1. Show self-correction: falling wages shift SRAS right, restoring output to Yf at lower PL.",
      "3. Keynesian Diagram: Draw a single AS curve with 3 segments: 1. Horizontal section (spare capacity), 2. Curving bottleneck section, 3. Vertical full-capacity section at Ymax.",
      "4. Show Keynesian recession: AD intersects AS in the horizontal section. Stimulating AD increases Real GDP from Y1 to Y2 with ZERO inflation.",
    ],
    curves: [
      { name: "Monetarist LRAS (Vertical at Yf)", color: "#06b6d4", description: "Reflects full long-run wage-price flexibility; output always returns to potential GDP Yf." },
      { name: "Keynesian AS (3-Phase Curve)", color: "#a855f7", description: "Reflects wage stickiness downwards; economy can remain trapped in spare capacity." },
      { name: "Aggregate Demand (AD)", color: "#38bdf8", description: "Aggregate expenditure curve." },
    ],
    shadedRegions: [
      { name: "Keynesian Spare Capacity Zone", color: "rgba(168, 85, 247, 0.2)", meaning: "Horizontal segment where output can expand with zero inflation due to idle resources." },
    ],
    interactiveControls: [
      { id: "toggle-monetarist", label: "Show Monetarist / New Classical Model", effect: "Displays vertical LRAS and self-correction mechanism." },
      { id: "toggle-keynesian", label: "Show Keynesian 3-Phase AS Model", effect: "Displays horizontal spare capacity and demand-driven growth." },
    ],
    examAnalysis:
      "In Paper 1 essays, state clearly which model you are drawing. If evaluating government intervention during a depression, draw the Keynesian model. If evaluating long-run non-inflationary growth, draw the Monetarist model.",
    commonPitfalls: [
      "Drawing an upward-sloping SRAS on a Keynesian diagram (Keynesians use a single curved AS).",
      "Drawing LRAS as vertical on a Keynesian diagram.",
    ],
  },
  {
    id: "diag-inflationary-deflationary-gaps",
    code: "D-19",
    title: "Equilibrium Output Gaps: Deflationary vs Inflationary",
    unitId: "unit-3",
    category: "Macroeconomics",
    xAxisLabel: "Real GDP (Y)",
    yAxisLabel: "Price Level (PL)",
    description:
      "Compares a Deflationary (Recessionary) Gap where actual equilibrium output Y1 is below full employment Yf (Y1 < Yf) with an Inflationary Gap where actual output Y2 is pushed beyond full employment Yf (Y2 > Yf).",
    drawingSteps: [
      "1. Draw vertical Price Level (PL) and horizontal Real GDP (Y).",
      "2. Draw vertical LRAS at potential full employment output Yf.",
      "3. Deflationary Gap: Draw AD1 and SRAS1 intersecting to the left of LRAS at Y1 (Y1 < Yf). Shade the gap between Y1 and Yf.",
      "4. Inflationary Gap: Draw AD2 and SRAS1 intersecting to the right of LRAS at Y2 (Y2 > Yf). Shade the gap between Yf and Y2.",
      "5. Explain policy solutions: Expansionary policy closes deflationary gap; Contractionary policy closes inflationary gap.",
    ],
    curves: [
      { name: "LRAS (Full Employment Yf)", color: "#10b981", description: "Potential capacity when all factors are fully employed at the natural rate of unemployment." },
      { name: "SRAS", color: "#38bdf8", description: "Short-run aggregate supply curve." },
      { name: "AD1 (Deflationary Gap)", color: "#f59e0b", description: "Deficient aggregate demand creating a recessionary gap." },
      { name: "AD2 (Inflationary Gap)", color: "#f43f5e", description: "Excessive aggregate demand creating an inflationary gap." },
    ],
    shadedRegions: [
      { name: "Deflationary (Recessionary) Gap", color: "rgba(245, 158, 11, 0.25)", meaning: "Shortfall of real output below full-employment capacity (Yf - Y1), resulting in cyclical unemployment." },
      { name: "Inflationary Gap", color: "rgba(244, 63, 94, 0.25)", meaning: "Excess of output beyond sustainable capacity (Y2 - Yf), creating upward wage and price pressure." },
    ],
    interactiveControls: [
      { id: "show-deflationary-gap", label: "Display Deflationary Gap", effect: "Emphasizes Y1 < Yf and cyclical unemployment." },
      { id: "show-inflationary-gap", label: "Display Inflationary Gap", effect: "Emphasizes Y2 > Yf and demand-pull inflation." },
    ],
    examAnalysis:
      "A guaranteed Paper 1 question. You must know how to draw both gaps in Monetarist and Keynesian frameworks, and explain how monetary and fiscal policies close them.",
    commonPitfalls: [
      "Placing Yf to the left of the equilibrium in a deflationary gap (it must be to the RIGHT).",
    ],
  },
  {
    id: "diag-lorenz-curve",
    code: "D-20",
    title: "Lorenz Curve & Gini Coefficient Dynamics",
    unitId: "unit-3",
    category: "Macroeconomics",
    xAxisLabel: "Cumulative % of Population (0–100%)",
    yAxisLabel: "Cumulative % of National Income (0–100%)",
    description:
      "Maps cumulative income distribution against population quintiles. Contrasts the 45-degree line of perfect equality with actual bowed-out Lorenz curves. Illustrates Gini coefficient calculation: Area A / (Area A + Area B), and the inward shift from progressive taxation.",
    drawingSteps: [
      "1. Draw a perfect square with axes from 0% to 100%.",
      "2. X-axis: Cumulative % of Population. Y-axis: Cumulative % of National Income.",
      "3. Draw the 45-degree diagonal line from (0,0) to (100,100): label 'Line of Perfect Equality'.",
      "4. Draw bowed-out curve Lorenz 1 below the diagonal: label initial pre-tax income distribution.",
      "5. Label Area A between the diagonal and the curve, and Area B below the curve.",
      "6. Write formula: Gini Coefficient = Area A / (Area A + Area B).",
      "7. Draw Lorenz 2 shifted inwards closer to the 45-degree line: label post-tax/transfer distribution (lower Gini, greater equity).",
    ],
    curves: [
      { name: "Line of Perfect Equality (45°)", color: "#10b981", description: "Hypothetical benchmark where every percentage of the population receives the exact same percentage of income." },
      { name: "Lorenz 1 (Pre-Tax)", color: "#f43f5e", description: "Actual market income distribution before government redistribution." },
      { name: "Lorenz 2 (Post-Tax & Transfer)", color: "#38bdf8", description: "More equal income distribution following progressive taxation and welfare transfers." },
    ],
    shadedRegions: [
      { name: "Area A (Inequality Gap)", color: "rgba(244, 63, 94, 0.25)", meaning: "Area between line of equality and Lorenz curve; smaller Area A means lower Gini and greater equity." },
      { name: "Area B", color: "rgba(56, 189, 248, 0.15)", meaning: "Area below the Lorenz curve." },
    ],
    interactiveControls: [
      { id: "apply-progressive-tax", label: "Apply Progressive Tax Redistribution", effect: "Shifts Lorenz curve inwards toward 45° line." },
      { id: "toggle-areas", label: "Highlight Area A & Area B", effect: "Displays shaded areas for Gini calculation." },
    ],
    examAnalysis:
      "Always state the mathematical limits of the Gini coefficient: Gini = 0 represents perfect equality; Gini = 1 represents total inequality (one person owns all income).",
    commonPitfalls: [
      "Swapping the axes (Population is ALWAYS horizontal X; Income is ALWAYS vertical Y).",
      "Saying an increase in Gini means more equality (higher Gini means GREATER inequality).",
    ],
  },
  {
    id: "diag-monetary-policy-transmission",
    code: "D-21",
    title: "Monetary Policy: Closing a Deflationary Gap",
    unitId: "unit-3",
    category: "Macroeconomics",
    xAxisLabel: "Real GDP (Y)",
    yAxisLabel: "Price Level (PL)",
    description:
      "Shows central bank expansionary monetary policy (cutting policy interest rates, quantitative easing) stimulating Consumption (C) and Investment (I), shifting AD rightward from AD1 to AD2 to close a deflationary gap at potential output Yf.",
    drawingSteps: [
      "1. Draw AD1 and SRAS intersecting at Y1 below potential full employment output Yf (deflationary gap).",
      "2. Draw vertical LRAS at Yf.",
      "3. Show central bank cutting interest rates: lowers borrowing costs for households and businesses.",
      "4. Draw AD2 shifted to the right, intersecting SRAS exactly at the LRAS full-employment line Yf.",
      "5. Project coordinates: Real GDP rises from Y1 to Yf (cyclical unemployment eliminated); Price Level rises mildly from PL1 to PL2.",
    ],
    curves: [
      { name: "LRAS (Full Employment Yf)", color: "#10b981", description: "Potential output capacity." },
      { name: "SRAS", color: "#38bdf8", description: "Short-run aggregate supply." },
      { name: "AD1 (Initial Slump)", color: "#f59e0b", description: "Recessionary aggregate demand creating a deflationary gap." },
      { name: "AD2 (After Rate Cut)", color: "#10b981", description: "Aggregate demand shifted right by expansionary monetary stimulus." },
    ],
    shadedRegions: [
      { name: "Closed Deflationary Gap", color: "rgba(16, 185, 129, 0.2)", meaning: "Output expansion from Y1 to Yf restoring full employment." },
    ],
    interactiveControls: [
      { id: "execute-rate-cut", label: "Execute Policy Rate Cut", effect: "Shifts AD right from AD1 to AD2, closing the gap." },
      { id: "execute-rate-hike", label: "Execute Rate Hike (Fight Inflation)", effect: "Shifts AD left to cool an inflationary gap." },
    ],
    examAnalysis:
      "Detail the transmission mechanism: Rate cut -> Commercial banks cut rates -> Cost of borrowing falls -> C & I expand -> AD shifts right -> Real GDP rises.",
    commonPitfalls: [
      "Assuming monetary policy shifts LRAS in the short term (it only shifts AD).",
    ],
  },
  {
    id: "diag-fiscal-policy-ad",
    code: "D-22",
    title: "Fiscal Policy: Stimulus & Deflationary Gap Closing",
    unitId: "unit-3",
    category: "Macroeconomics",
    xAxisLabel: "Real GDP (Y)",
    yAxisLabel: "Price Level (PL)",
    description:
      "Demonstrates discretionary expansionary fiscal policy: government expands spending on infrastructure (G) and cuts direct taxes (T), injecting purchasing power directly into the circular flow to shift AD rightward and close a recessionary gap.",
    drawingSteps: [
      "1. Draw AD1 and SRAS intersecting at Y1 below LRAS (Y1 < Yf).",
      "2. Show government launching fiscal stimulus: higher G (direct spending) and lower income/corporate taxes (stimulating C and I).",
      "3. Draw AD2 shifted rightward to intersect SRAS at potential output Yf.",
      "4. Label coordinates: output expands to Yf; price level rises to PL2.",
      "5. Note the Keynesian multiplier: initial government spending produces a more than proportionate increase in final national income.",
    ],
    curves: [
      { name: "LRAS (Yf)", color: "#10b981", description: "Potential output capacity." },
      { name: "SRAS", color: "#38bdf8", description: "Short-run aggregate supply." },
      { name: "AD1 (Pre-Stimulus)", color: "#f43f5e", description: "Deficient aggregate demand." },
      { name: "AD2 (Post-Stimulus)", color: "#10b981", description: "Aggregate demand shifted right by government spending and tax cuts." },
    ],
    shadedRegions: [
      { name: "Eliminated Output Gap", color: "rgba(16, 185, 129, 0.2)", meaning: "Restoration of full employment output." },
    ],
    interactiveControls: [
      { id: "launch-stimulus", label: "Launch Fiscal Stimulus (AD right)", effect: "Shifts AD right to Yf." },
      { id: "launch-austerity", label: "Launch Fiscal Austerity (AD left)", effect: "Shifts AD left to cool inflation." },
    ],
    examAnalysis:
      "Emphasize that G is a direct component of AD, making fiscal policy more reliable than monetary policy during deep crises when consumer confidence is paralyzed.",
    commonPitfalls: [
      "Including transfer payments (unemployment benefits) as part of G in the AD equation (they are transfers that only enter AD when spent as C).",
    ],
  },
  {
    id: "diag-crowding-out",
    code: "D-23",
    title: "The Crowding Out Effect (Loanable Funds Market)",
    unitId: "unit-3",
    category: "Macroeconomics",
    xAxisLabel: "Quantity of Loanable Funds (Q)",
    yAxisLabel: "Real Interest Rate (r)",
    description:
      "Illustrates why expansionary fiscal policy may be partially self-defeating: financing a budget deficit requires selling sovereign bonds, shifting the demand for loanable funds rightward, driving up interest rates, and 'crowding out' private corporate investment (I).",
    drawingSteps: [
      "1. Draw vertical Real Interest Rate (r) and horizontal Quantity of Loanable Funds (Q).",
      "2. Draw upward-sloping Supply of Loanable Funds (S = private savings) and downward-sloping Demand (D1 = private investment).",
      "3. Initial equilibrium: interest rate r1 and funds Q1.",
      "4. Government runs deficit: borrowing shifts total demand for loanable funds rightward to D2 (Private + Government Borrowing).",
      "5. Real interest rate rises from r1 to r2.",
      "6. Higher interest rate causes private firms to contract investment along their private demand curve from Q1 to Q3.",
      "7. Label the distance (Q1 - Q3) as 'Crowded Out Private Investment'.",
    ],
    curves: [
      { name: "Supply of Funds (Savings)", color: "#10b981", description: "Private household and institutional savings available for borrowing." },
      { name: "D1 (Private Investment Demand)", color: "#38bdf8", description: "Corporate demand for loans to finance capital projects." },
      { name: "D2 (Total Demand with Deficit)", color: "#f43f5e", description: "Demand for loanable funds shifted right by government bond sales." },
    ],
    shadedRegions: [
      { name: "Crowded Out Investment", color: "rgba(244, 63, 94, 0.25)", meaning: "Contraction in private sector capital investment caused by higher interest rates." },
    ],
    interactiveControls: [
      { id: "shift-deficit-borrowing", label: "Simulate Government Deficit Borrowing", effect: "Shifts demand for funds right, pushing interest rate from r1 to r2." },
    ],
    examAnalysis:
      "A premier Paper 1 evaluation tool. If asked whether fiscal policy is effective, explain the crowding out effect: the net rightward shift of AD is smaller because G rises but I falls.",
    commonPitfalls: [
      "Drawing an AD/AS diagram instead of a loanable funds diagram when explaining the direct interest rate mechanism of crowding out.",
    ],
  },
  {
    id: "diag-supply-side-lras",
    code: "D-24",
    title: "Supply-Side Policies: Outward Shift of LRAS",
    unitId: "unit-3",
    category: "Macroeconomics",
    xAxisLabel: "Real GDP (Y)",
    yAxisLabel: "Price Level (PL)",
    description:
      "Shows how interventionist (education, infrastructure, R&D) and market-based (deregulation, tax incentives) policies shift the LRAS curve to the right from LRAS1 to LRAS2, achieving non-inflationary long-term economic growth.",
    drawingSteps: [
      "1. Draw AD and initial vertical LRAS1 intersecting at price level PL1 and potential output Yf1.",
      "2. Apply supply-side policy: investment in vocational education and transport infrastructure expands productive capacity.",
      "3. Draw LRAS2 shifted to the right at a higher potential output Yf2.",
      "4. New macroeconomic equilibrium: Real GDP expands from Yf1 to Yf2; Price Level falls from PL1 to PL2.",
      "5. Highlight that supply-side policies simultaneously achieve economic growth and downward pressure on inflation.",
    ],
    curves: [
      { name: "Aggregate Demand (AD)", color: "#38bdf8", description: "Total planned expenditure." },
      { name: "LRAS1 (Initial Capacity)", color: "#f59e0b", description: "Initial potential output full employment level." },
      { name: "LRAS2 (Expanded Capacity)", color: "#10b981", description: "Expanded productive capacity resulting from supply-side policies." },
    ],
    shadedRegions: [
      { name: "Non-Inflationary Growth Zone", color: "rgba(16, 185, 129, 0.2)", meaning: "Expansion in potential GDP with downward pressure on the price level." },
    ],
    interactiveControls: [
      { id: "shift-lras-right", label: "Shift LRAS Right (Supply-Side Reform)", effect: "Shows potential GDP expanding to Yf2." },
    ],
    examAnalysis:
      "Emphasize the unique benefit of supply-side policies: unlike demand stimulus (which risks demand-pull inflation), supply-side growth expands output while lowering inflation.",
    commonPitfalls: [
      "Assuming supply-side policies have instantaneous effects; always evaluate their long time lags.",
    ],
  },
  {
    id: "diag-free-trade-imports",
    code: "D-25",
    title: "Free International Trade & Importing Equilibrium",
    unitId: "unit-4",
    category: "Global Economy",
    xAxisLabel: "Quantity of Good (Q)",
    yAxisLabel: "Price (P)",
    description:
      "Shows an open domestic economy facing World Price (Pw) below domestic autarky price Pe. Domestic production contracts to Q1, domestic consumption expands to Q2, and the deficit (Q2 - Q1) is imported. Consumer surplus expands dramatically.",
    drawingSteps: [
      "1. Draw domestic demand (Dd) and domestic supply (Sd) with autarky equilibrium Pe and Qe.",
      "2. Draw a horizontal, perfectly elastic World Supply curve at World Price Pw BELOW Pe (Pw < Pe).",
      "3. Where Pw intersects Sd, project down to Q1 (domestic production contracts).",
      "4. Where Pw intersects Dd, project down to Q2 (domestic consumption expands).",
      "5. Label the horizontal distance between Q1 and Q2 as 'Imports'.",
      "6. Highlight that Consumer Surplus expands to the entire large triangle below Dd and above Pw.",
      "7. Highlight that Producer Surplus contracts to the small triangle above Sd and below Pw.",
    ],
    curves: [
      { name: "Domestic Demand (Dd)", color: "#0ea5e9", description: "Domestic consumer demand schedule." },
      { name: "Domestic Supply (Sd)", color: "#10b981", description: "Domestic producer supply schedule." },
      { name: "World Supply (Pw)", color: "#38bdf8", description: "Perfectly elastic world supply at prevailing global price." },
    ],
    shadedRegions: [
      { name: "Import Volume Bracket", color: "rgba(56, 189, 248, 0.2)", meaning: "Quantity of foreign goods imported: (Q2 - Q1)." },
      { name: "Consumer Surplus Expansion", color: "rgba(14, 165, 233, 0.25)", meaning: "Massive consumer welfare gain resulting from lower world prices." },
    ],
    interactiveControls: [
      { id: "show-imports", label: "Highlight Import Volume (Q2 - Q1)", effect: "Emphasizes the import deficit bracket." },
      { id: "compare-surplus", label: "Compare Consumer vs Producer Surplus", effect: "Shows the dramatic welfare gain for consumers." },
    ],
    examAnalysis:
      "The foundation of trade diagrams. Total community surplus expands because the consumer surplus gain is larger than the producer surplus loss, yielding a net societal welfare gain.",
    commonPitfalls: [
      "Drawing the world price above domestic equilibrium for an importing country (if Pw > Pe, the country would be an EXPORTER).",
    ],
  },
  {
    id: "diag-tariff-welfare",
    code: "D-26",
    title: "Tariff on Imported Goods & The Four Welfare Areas",
    unitId: "unit-4",
    category: "Global Economy",
    xAxisLabel: "Quantity (Q)",
    yAxisLabel: "Price (P)",
    description:
      "Full welfare analysis of an import tariff. World price rises to Pw + tariff. Domestic production expands (Q1 to Q3), consumption contracts (Q2 to Q4), and imports shrink to (Q4 - Q3). Identifies Area a (producer gain), Area b (production DWL), Area c (tariff revenue), and Area d (consumption DWL).",
    drawingSteps: [
      "1. Draw domestic demand (Dd) and domestic supply (Sd) with horizontal World Price Pw.",
      "2. Draw a second horizontal line at Pw + tariff above Pw.",
      "3. Where Pw + tariff intersects Sd, project down to Q3 (domestic production expands from Q1 to Q3).",
      "4. Where Pw + tariff intersects Dd, project down to Q4 (domestic consumption contracts from Q2 to Q4).",
      "5. New import volume is (Q4 - Q3).",
      "6. Label Area a (trapezoid above Sd between Pw and Pw+t): Domestic Producer Surplus Gain.",
      "7. Label Area b (triangle between Q1 and Q3): Production Inefficiency Deadweight Loss.",
      "8. Label Area c (rectangle between Q3 and Q4, height t): Government Tariff Revenue.",
      "9. Label Area d (triangle between Q4 and Q2): Consumption Deadweight Loss.",
      "10. Consumer Surplus loses areas a + b + c + d.",
    ],
    curves: [
      { name: "Domestic Demand (Dd)", color: "#0ea5e9", description: "Domestic consumer demand schedule." },
      { name: "Domestic Supply (Sd)", color: "#10b981", description: "Domestic producer supply schedule." },
      { name: "World Supply (Pw)", color: "#38bdf8", description: "Initial free trade world price." },
      { name: "World Supply + Tariff (Pw + t)", color: "#f43f5e", description: "World price elevated by the specific import tariff." },
    ],
    shadedRegions: [
      { name: "Area a (Producer Gain)", color: "rgba(16, 185, 129, 0.35)", meaning: "Gain in domestic producer surplus transferred from consumers." },
      { name: "Area b (Production DWL)", color: "rgba(244, 63, 94, 0.4)", meaning: "Deadweight loss from domestic firms producing units at higher cost than world suppliers." },
      { name: "Area c (Tariff Revenue)", color: "rgba(6, 182, 212, 0.35)", meaning: "Government fiscal revenue collected at the border: t x (Q4 - Q3)." },
      { name: "Area d (Consumption DWL)", color: "rgba(245, 158, 11, 0.4)", meaning: "Deadweight loss from consumers priced out of mutually beneficial consumption." },
    ],
    interactiveControls: [
      { id: "highlight-dwl", label: "Highlight Deadweight Loss Triangles (b + d)", effect: "Emphasizes the two net welfare loss triangles." },
      { id: "highlight-gov-revenue", label: "Highlight Tariff Revenue (Area c)", effect: "Emphasizes the central fiscal revenue rectangle." },
    ],
    examAnalysis:
      "A guaranteed Paper 1 and Paper 2 question. You must memorize all four letters: a = producer surplus gain; b = production inefficiency DWL; c = government tariff revenue; d = consumption DWL. Net societal welfare loss = b + d.",
    commonPitfalls: [
      "Confusing Area b and Area d: Area b is PRODUCTION inefficiency; Area d is CONSUMPTION loss.",
      "Omitting the government revenue rectangle when calculating net welfare change.",
    ],
  },
  {
    id: "diag-quota-welfare",
    code: "D-27",
    title: "Import Quota & Quota Rents",
    unitId: "unit-4",
    category: "Global Economy",
    xAxisLabel: "Quantity (Q)",
    yAxisLabel: "Price (P)",
    description:
      "Shows an import quota shifting the domestic supply curve rightward by the quota volume at prices above Pw (Sd + quota). Raises domestic price to Pq, generates quota rents, and causes deadweight welfare losses.",
    drawingSteps: [
      "1. Draw Dd, Sd, and world price Pw with free trade imports (Q2 - Q1).",
      "2. At prices above Pw, shift Sd horizontally to the right by the exact quota amount: label 'Sd + quota'.",
      "3. Where Sd + quota intersects Dd, identify new quota equilibrium price Pq and consumption Q4.",
      "4. From Pq, project down to Sd to find domestic production Q3.",
      "5. The quota volume equals (Q4 - Q3).",
      "6. Label the central rectangle as 'Quota Rent' ([Pq - Pw] x Quota Quantity).",
      "7. Highlight that quota rents accrue to foreign exporters or import license holders, unlike tariff revenue which goes to the domestic government.",
    ],
    curves: [
      { name: "Domestic Demand (Dd)", color: "#0ea5e9", description: "Domestic consumer demand schedule." },
      { name: "Domestic Supply (Sd)", color: "#10b981", description: "Domestic producer supply schedule." },
      { name: "Sd + Quota", color: "#a855f7", description: "Effective market supply shifted rightward by the fixed physical quota limit." },
      { name: "World Supply (Pw)", color: "#38bdf8", description: "Free trade world price." },
    ],
    shadedRegions: [
      { name: "Quota Rent Rectangle", color: "rgba(168, 85, 247, 0.35)", meaning: "Windfall excess profits earned by foreign exporters holding import quota licenses: (Pq - Pw) x Quota." },
      { name: "Deadweight Losses", color: "rgba(244, 63, 94, 0.3)", meaning: "Production inefficiency and consumer utility losses." },
    ],
    interactiveControls: [
      { id: "highlight-quota-rent", label: "Highlight Quota Rent Rectangle", effect: "Emphasizes the central windfall profit area." },
    ],
    examAnalysis:
      "Crucial policy comparison: Why do governments prefer tariffs over quotas? Because in a tariff, Area c is collected by the domestic treasury; in a quota, Area c becomes 'Quota Rents' captured by foreign exporters.",
    commonPitfalls: [
      "Drawing the quota supply curve as parallel to demand instead of parallel to domestic supply.",
    ],
  },
  {
    id: "diag-forex-floating",
    code: "D-28",
    title: "Floating Foreign Exchange Market Dynamics",
    unitId: "unit-4",
    category: "Global Economy",
    xAxisLabel: "Quantity of Currency (e.g. USD)",
    yAxisLabel: "Exchange Rate (e.g. EUR per USD)",
    description:
      "Models the floating currency market where exchange rate equilibrium is determined purely by private demand and supply. Illustrates Appreciation (driven by hot money inflows or export demand) and Depreciation (driven by high domestic inflation or trade deficits).",
    drawingSteps: [
      "1. Y-axis: Price of Currency A in terms of Currency B (e.g., 'EUR per USD').",
      "2. X-axis: Quantity of Currency A (e.g., 'Quantity of USD').",
      "3. Draw downward-sloping Demand for USD curve (D1) and upward-sloping Supply of USD curve (S1).",
      "4. Identify equilibrium exchange rate e1 and quantity Q1.",
      "5. Currency Appreciation: Show US interest rate rise shifting Demand right to D2, driving rate up to e2.",
      "6. Currency Depreciation: Show high US inflation shifting Supply right (buying foreign imports) and Demand left, driving rate down to e3.",
    ],
    curves: [
      { name: "Demand for Currency (D1)", color: "#0ea5e9", description: "Foreign demand for domestic exports, FDI, and bank deposits (hot money)." },
      { name: "Supply of Currency (S1)", color: "#10b981", description: "Domestic residents supplying currency to buy foreign imports or invest abroad." },
      { name: "D2 (Appreciation Shift Right)", color: "#a855f7", description: "Increased demand driven by higher domestic interest rates or strong export boom." },
    ],
    shadedRegions: [],
    interactiveControls: [
      { id: "simulate-appreciation", label: "Simulate Currency Appreciation (D right)", effect: "Shows exchange rate rising from e1 to e2." },
      { id: "simulate-depreciation", label: "Simulate Currency Depreciation (S right)", effect: "Shows exchange rate falling from e1 to e3." },
    ],
    examAnalysis:
      "Always state the impacts of depreciation on macroeconomic goals: stimulates growth and employment via net exports (X - M), but risks imported cost-push inflation.",
    commonPitfalls: [
      "Labeling the vertical axis simply 'Price' instead of 'Price of Currency A in Currency B'.",
    ],
  },
  {
    id: "diag-poverty-cycle",
    code: "D-29",
    title: "The Poverty Cycle (Poverty Trap)",
    unitId: "unit-4",
    category: "Global Economy",
    xAxisLabel: "Intergenerational Time",
    yAxisLabel: "Productive Human Capital",
    description:
      "Illustrates the self-reinforcing systemic cycle of poverty: Low Household Income -> Low Savings -> Low Investment in Health/Education -> Low Productivity -> Low Household Income. Breaking the trap requires external capital or state provision.",
    drawingSteps: [
      "1. Draw a circular flowchart with five interconnected nodes.",
      "2. Node 1 (Top): Low Household Income.",
      "3. Arrow to Node 2: Low Domestic Savings.",
      "4. Arrow to Node 3: Low Investment in Physical Capital, Healthcare & Education.",
      "5. Arrow to Node 4: Low Human Capital & Low Productivity.",
      "6. Arrow back to Node 1: Low Household Income (closing the self-perpetuating trap).",
      "7. Draw external injection arrows breaking the cycle: Foreign Development Aid, Microfinance, and Universal Free Public Education.",
    ],
    curves: [
      { name: "The Vicious Cycle Circuit", color: "#f43f5e", description: "The self-reinforcing feedback loop that traps low-income households in multi-generational poverty." },
      { name: "External Intervention Injection", color: "#10b981", description: "Targeted external funding (microfinance, public schools) that breaks the cycle." },
    ],
    shadedRegions: [
      { name: "Poverty Trap Core", color: "rgba(244, 63, 94, 0.15)", meaning: "Structural economic trap where low income prevents capital accumulation." },
    ],
    interactiveControls: [
      { id: "break-the-cycle", label: "Inject Microfinance & Education", effect: "Shows external intervention breaking the vicious cycle into virtuous growth." },
    ],
    examAnalysis:
      "Use in Paper 1 development essays to explain why market forces alone cannot eliminate extreme poverty without state intervention in merit goods and infrastructure.",
    commonPitfalls: [
      "Confusing low income with low wealth; low income directly causes low savings, which starves investment.",
    ],
  },
];
'''

with open('/Users/ayaanatif/.gemini/antigravity/scratch/ib-economics-sl-liquid-shell/src/data/diagramsDossier.ts', 'w') as f:
    f.write(diagrams_code)

print("diagramsDossier.ts created successfully!")
