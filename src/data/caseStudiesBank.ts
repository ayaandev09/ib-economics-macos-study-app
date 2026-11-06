import { UnitId, ConceptId } from "./types";

export interface CaseStudyDossier {
  id: string;
  title: string;
  countryOrContext: string;
  yearOrPeriod: string;
  unitId: UnitId;
  topicCode: string;
  conceptIds: ConceptId[];
  diagramToDraw: string;
  empiricalData: string;
  economicMechanism: string;
  stakeholderEvaluation: {
    consumers: string;
    producers: string;
    government: string;
    longRunVsShortRun: string;
  };
  assumptionsAndLimitations: string;
  essayPrompts: string[];
  memorizationHook: string;
}

export const CASE_STUDIES_BANK: CaseStudyDossier[] = [
  // =========================================================================
  // UNIT 1: INTRODUCTION TO ECONOMICS & FOUNDATIONS
  // =========================================================================
  {
    id: "cs-u1-nhs-opportunity-cost",
    title: "UK NHS Resource Allocation & NICE QALY Thresholds",
    countryOrContext: "United Kingdom",
    yearOrPeriod: "1999–Present",
    unitId: "unit-1",
    topicCode: "1.1",
    conceptIds: ["scarcity", "choice", "efficiency"],
    diagramToDraw: "D-01 (Production Possibility Frontier — Trade-offs between Cancer Drugs vs Preventive Primary Care)",
    empiricalData:
      "NICE operates a strict cost-effectiveness threshold of £20,000–£30,000 per Quality-Adjusted Life Year (QALY). In 2011, the £1.27bn Cancer Drugs Fund was created due to ethical controversies over rejecting life-extending oncology drugs that exceeded this threshold.",
    economicMechanism:
      "Because healthcare resources are strictly finite and scarce while medical demands are infinite, every pound allocated to expensive terminal care incurs an opportunity cost of forgone hip replacements, mental health care, or preventive screenings.",
    stakeholderEvaluation: {
      consumers: "Patients receiving approved drugs gain vital life years; patients suffering from conditions displaced by budget allocation suffer longer wait times.",
      producers: "Pharmaceutical companies face price ceilings and monopsony buying power from the NHS, forcing competitive drug price discounts.",
      government: "Rations healthcare via non-price rationing mechanisms (QALY limits) rather than market price mechanisms, ensuring equity of access.",
      longRunVsShortRun: "Short-run drug approvals soothe public outcry; long-run sustainability requires strict prioritization to prevent healthcare insolvency.",
    },
    assumptionsAndLimitations:
      "Assumes QALYs can objectively quantify human life quality across different age groups and disabilities without ethical discrimination.",
    essayPrompts: [
      "Evaluate how the concept of opportunity cost influences government allocation of scarce public funds.",
      "Discuss whether essential healthcare should be allocated through market price mechanisms or state non-price rationing.",
    ],
    memorizationHook: "NICE threshold of £20k–£30k per QALY illustrates acute opportunity cost on PPF (D-01).",
  },
  {
    id: "cs-u1-us-defense-production-act",
    title: "US Defense Production Act & COVID-19 Vaccine Reallocation",
    countryOrContext: "United States",
    yearOrPeriod: "2020–2021",
    unitId: "unit-1",
    topicCode: "1.1",
    conceptIds: ["scarcity", "choice", "change"],
    diagramToDraw: "D-01 (PPF Frontier — Movement along curve from Civilian Goods to Emergency Medical Supplies)",
    empiricalData:
      "Under Operation Warp Speed, the US government invoked the 1950 Defense Production Act 18 times, investing $18 billion to commandeer manufacturing plants and supply chains for ventilators, N95 masks, and mRNA vaccine vials.",
    economicMechanism:
      "Illustrates a sharp reallocation of scarce capital and labor along the nation's PPF: shifting factory capacity from commercial manufacturing toward public emergency medical supplies.",
    stakeholderEvaluation: {
      consumers: "Massive societal benefit from rapid vaccination; consumer goods experienced temporary supply shortages and waitlists.",
      producers: "Contracted pharmaceutical firms (Pfizer, Moderna) received guaranteed purchase contracts and de-risked capital subsidies.",
      government: "Achieved rapid public health mobilization but expanded national debt significantly.",
      longRunVsShortRun: "Short-run sacrifice of consumer goods trade-offs; long-run outward shift of PPF by restoring labor force productivity.",
    },
    assumptionsAndLimitations:
      "Assumes manufacturing facilities can quickly adapt factor inputs (imperfect factor mobility causes increasing opportunity costs).",
    essayPrompts: [
      "Examine how the Production Possibility Frontier can be used to explain resource reallocation in a national emergency.",
    ],
    memorizationHook: "Defense Production Act ($18bn Warp Speed) = emergency factor reallocation along PPF (D-01).",
  },
  {
    id: "cs-u1-organ-donation-nudge",
    title: "UK Organ Donation 'Opt-Out' Law (Max and Keira's Law)",
    countryOrContext: "United Kingdom (England)",
    yearOrPeriod: "2020–Present",
    unitId: "unit-1",
    topicCode: "1.2",
    conceptIds: ["choice", "wellbeing", "intervention"],
    diagramToDraw: "D-02 (Circular Flow & Behavioral Economics Choice Architecture / Default Bias)",
    empiricalData:
      "Passed in May 2020, changing the legal default from opt-in to deemed consent. Consent rates rose from ~58% under opt-in to over 67%, leading to over 1,400 additional organ transplants in the first two years.",
    economicMechanism:
      "Neoclassical economics assumes rational agents register their true preferences. Behavioral economics proves status quo bias and cognitive inertia: changing default choice architecture drastically alters societal outcomes without banning choices or imposing financial costs.",
    stakeholderEvaluation: {
      consumers: "Patients on transplant waitlists experience shorter waiting times and reduced mortality; families retain opt-out rights.",
      producers: "NHS transplant teams operate at higher capacity utilization, reducing long-term dialysis treatment costs (£30k/year per patient).",
      government: "Extremely cost-effective intervention with zero taxpayer deadweight loss.",
      longRunVsShortRun: "Requires ongoing public awareness so families do not veto organ retrieval at bedside.",
    },
    assumptionsAndLimitations:
      "Family refusal rates still remain around 30% due to cultural, emotional, and religious sensitivities.",
    essayPrompts: [
      "Evaluate the effectiveness of behavioral economics 'nudges' compared to legislative mandates in altering consumer decisions.",
    ],
    memorizationHook: "Max & Keira's Law (opt-out default) boosted consent from 58% to 67% using status quo bias.",
  },
  {
    id: "cs-u1-post-covid-circular-flow",
    title: "US CARES Act & German Kurzarbeit Wage Injections",
    countryOrContext: "USA & Germany",
    yearOrPeriod: "2020–2021",
    unitId: "unit-1",
    topicCode: "1.2",
    conceptIds: ["interdependence", "wellbeing", "change"],
    diagramToDraw: "D-02 (Circular Flow of Income — Government Injections G preventing circular collapse)",
    empiricalData:
      "The US CARES Act injected $2.2 trillion (including $1,200 stimulus checks and $600/week unemployment boosts). Germany supported up to 6 million workers via Kurzarbeit (state paying 60–67% of wages).",
    economicMechanism:
      "Lockdowns caused an unprecedented collapse in consumer expenditure (C) and investment (I). Massive government injections (G) bridged the circuit, preventing a catastrophic contraction in national income.",
    stakeholderEvaluation: {
      consumers: "Prevented mass poverty, home evictions, and severe food insecurity during mandatory employment pauses.",
      producers: "Prevented mass corporate insolvencies and preserved vital employer-employee matching relationships.",
      government: "Exploded public debt ratios (US Debt/GDP exceeded 120%; Germany abandoned its constitutional 'debt brake').",
      longRunVsShortRun: "Prevented acute economic depression in the short run; spurred demand-pull and supply-chain inflation in 2021–2023.",
    },
    assumptionsAndLimitations:
      "Assumed stimulus payments would be spent on domestic output rather than saved (S) or spent on imported goods (M).",
    essayPrompts: [
      "Using the Circular Flow of Income model, analyze the impact of massive government injections during an economic shock.",
    ],
    memorizationHook: "CARES Act ($2.2T) and Kurzarbeit = vital injections (G) keeping circular flow open (D-02).",
  },

  // =========================================================================
  // UNIT 2: MICROECONOMICS (MARKET FORCES, ELASTICITIES & INTERVENTION)
  // =========================================================================
  {
    id: "cs-u2-uk-sugar-tax",
    title: "UK Soft Drinks Industry Levy (Sugar Tax) 2018",
    countryOrContext: "United Kingdom",
    yearOrPeriod: "2018–Present",
    unitId: "unit-2",
    topicCode: "2.6 / 2.7",
    conceptIds: ["intervention", "wellbeing", "equity"],
    diagramToDraw: "D-10 (Specific Indirect Tax with Inelastic Demand) AND D-13 (Negative Externality of Consumption pointing to Qopt)",
    empiricalData:
      "Tiered tax: 18p/L for 5–8g sugar/100ml; 24p/L for >8g/100ml. Resulted in 50% of beverage manufacturers reformulating drinks prior to launch (e.g., Fanta cut sugar by 33%). Raised £340m annually, hypothecated to primary school sports.",
    economicMechanism:
      "Specific indirect tax shifts supply vertically upwards (S to S+tax). Producers faced strong incentive to reduce sugar content to avoid the tax bracket. Higher retail prices contract quantity demanded, internalizing the external NHS healthcare costs of obesity and type 2 diabetes.",
    stakeholderEvaluation: {
      consumers: "Regressive financial burden on lower-income households; long-run health improvement across children and vulnerable demographics.",
      producers: "Firms that reformulated preserved sales volumes; unreformulated brands (Classic Coca-Cola) suffered price hikes and volume declines.",
      government: "Successful hypothecated revenue generation with clear reductions in pediatric dental hospital admissions.",
      longRunVsShortRun: "Short run: price increases; long run: recipe changes eliminated sugar without permanent retail price inflation.",
    },
    assumptionsAndLimitations:
      "Cross-price elasticity (XED) risks: consumers may substitute toward untaxed sugar sources (fruit juices, milkshakes, confectionery).",
    essayPrompts: [
      "Evaluate the view that indirect taxation is the most effective policy to address market failure from demerit goods.",
      "Discuss whether government intervention in the market for sugary drinks improves overall economic well-being.",
    ],
    memorizationHook: "Tiered levy (18p/24p) prompted 50% reformulation before rollout; draws D-10 & D-13.",
  },
  {
    id: "cs-u2-eu-ets-carbon-market",
    title: "EU Emissions Trading System (ETS) Phase 4",
    countryOrContext: "European Union",
    yearOrPeriod: "2005–Present (Phase 4: 2021–2030)",
    unitId: "unit-2",
    topicCode: "2.7",
    conceptIds: ["intervention", "sustainability", "efficiency"],
    diagramToDraw: "D-12 (Negative Externality of Production — Internalizing MEC to move from Qm to Qopt)",
    empiricalData:
      "Covers ~40% of EU GHG emissions across 10,000 power stations and factories. Carbon prices rose from ~€5/tonne in 2013 to over €100/tonne in February 2023. Emissions in covered sectors have fallen by over 37% since 2005.",
    economicMechanism:
      "A cap-and-trade market establishes a legally binding cap on total emissions that contracts annually. Firms must surrender one European Union Allowance (EUA) per tonne emitted. The market price forces firms to internalize the Marginal External Cost (MEC), shifting private MPC up toward social MSC.",
    stakeholderEvaluation: {
      consumers: "Higher retail electricity and industrial product prices in the short term; long-term transition to renewable energy protects climate.",
      producers: "Clean, energy-efficient firms sell surplus permits for profit; carbon-intensive coal generators face severe economic penalties.",
      government: "Generates tens of billions of euros in auction revenue used to fund the EU Innovation Fund for green hydrogen and carbon capture.",
      longRunVsShortRun: "Dynamic efficiency incentive: firms have persistent motivation to invent new low-carbon technologies.",
    },
    assumptionsAndLimitations:
      "Risk of 'carbon leakage' (firms moving production outside the EU), which prompted the 2026 Carbon Border Adjustment Mechanism (CBAM).",
    essayPrompts: [
      "Evaluate market-based policies versus direct regulation in reducing negative externalities of production.",
      "Discuss the effectiveness of cap-and-trade carbon permit systems in achieving environmental sustainability.",
    ],
    memorizationHook: "EU ETS carbon price crossed €100/t in 2023, cutting covered emissions by 37%; draws D-12.",
  },
  {
    id: "cs-u2-singapore-erp-congestion",
    title: "Singapore Electronic Road Pricing (ERP 2.0)",
    countryOrContext: "Singapore",
    yearOrPeriod: "1998–Present",
    unitId: "unit-2",
    topicCode: "2.7",
    conceptIds: ["efficiency", "intervention", "sustainability"],
    diagramToDraw: "D-12 (Negative Externality of Production / Road Congestion with Pigouvian Pricing)",
    empiricalData:
      "Dynamic gantry tolls adjusted quarterly according to traffic speeds (target: 45–65 km/h on expressways). Peak rates reach S$6 (~$4.50) per gantry. Combined with the Certificate of Entitlement (COE) vehicle quota, public transit share is >67%.",
    economicMechanism:
      "Road travel incurs negative externalities: time lost in congestion, tailpipe emissions, and road wear. ERP imposes a variable Pigouvian charge equal to the Marginal External Cost (MEC) during peak hours, reducing road traffic to the socially optimal volume (Qopt).",
    stakeholderEvaluation: {
      consumers: "Motorists pay high direct tolls; public transit commuters enjoy uncongested rapid bus lanes and subway reliability.",
      producers: "Logistics and freight delivery firms save millions in driver transit times and fuel waste.",
      government: "Toll revenue funds world-class Mass Rapid Transit (MRT) infrastructure without raising general income taxes.",
      longRunVsShortRun: "Eliminates chronic gridlock without constructing endless lane expansions that induce more traffic.",
    },
    assumptionsAndLimitations:
      "Requires comprehensive, reliable public transit alternatives; otherwise, demand is price-inelastic, merely acting as a regressive travel penalty.",
    essayPrompts: [
      "Evaluate the use of price mechanisms to solve the problem of traffic congestion in urban areas.",
    ],
    memorizationHook: "Singapore ERP tolls adjust dynamically to keep expressway speeds at 45–65 km/h; draws D-12.",
  },
  {
    id: "cs-u2-us-farm-bill-subsidies",
    title: "US Agricultural Farm Bill Subsidies (Corn & Soybeans)",
    countryOrContext: "United States",
    yearOrPeriod: "1933–Present (2018 Farm Bill)",
    unitId: "unit-2",
    topicCode: "2.6",
    conceptIds: ["intervention", "efficiency", "interdependence"],
    diagramToDraw: "D-11 (Production Subsidy & Overproduction Deadweight Loss Rectangle & Triangles)",
    empiricalData:
      "US federal farm subsidies average $15–$25 billion annually through crop insurance subsidies, Price Loss Coverage (PLC), and Agricultural Risk Coverage (ARC). Over 75% of subsidies go to the top 10% largest corporate farming conglomerates.",
    economicMechanism:
      "Direct production and revenue subsidies shift supply downwards (S to S - subsidy). This expands output beyond the free-market equilibrium to Qsub, depressing domestic crop prices while creating deadweight welfare loss where MSC exceeds MSB.",
    stakeholderEvaluation: {
      consumers: "Lower prices for corn syrup, processed meat, and cereal; higher taxpayer bill funding multi-billion dollar farm appropriations.",
      producers: "Guaranteed revenue security for domestic agribusiness; small family farmers frequently squeezed out by industrial monoculture.",
      government: "Substantial fiscal cost ($20bn+/year) competing with education and healthcare budget priorities.",
      longRunVsShortRun: "Distorts international trade: surplus crops dumped abroad, devastating developing nation subsistence farmers (e.g. West African cotton).",
    },
    assumptionsAndLimitations:
      "Encourages over-application of nitrogen fertilizers and freshwater depletion, compounding environmental negative production externalities.",
    essayPrompts: [
      "Evaluate the economic effects of government subsidies on domestic and international markets.",
      "Discuss whether agricultural subsidies promote economic efficiency or misallocate scarce resources.",
    ],
    memorizationHook: "US Farm Bill ($20bn/yr) leads to overproduction and international dumping; draws D-11.",
  },
  {
    id: "cs-u2-berlin-rent-cap",
    title: "Berlin Rent Freeze / Price Ceiling (Mietendeckel)",
    countryOrContext: "Germany (Berlin)",
    yearOrPeriod: "2020–2021",
    unitId: "unit-2",
    topicCode: "2.6",
    conceptIds: ["equity", "intervention", "choice"],
    diagramToDraw: "D-08 (Price Ceiling / Maximum Price below Pe with Shortage Qd - Qs & Black Market Pb)",
    empiricalData:
      "In February 2020, Berlin froze rents on 1.5 million apartments for 5 years at June 2019 levels (capped at €9.80/m²). Supply of available rental listings collapsed by 57%, while demand surged, resulting in 100+ applicants per showing before being struck down as unconstitutional in April 2021.",
    economicMechanism:
      "A binding price ceiling (Pmax < Pe) prevents the price mechanism from clearing the market. Quantity supplied of rentals contracts (Qs) as landlords withdraw units to sell or renovate, while quantity demanded expands (Qd), creating a chronic shortage and informal grey markets.",
    stakeholderEvaluation: {
      consumers: "Existing incumbent tenants enjoyed lower monthly rental bills; new movers, young workers, and immigrants were completely shut out.",
      producers: "Landlords suffered capital losses, stopped maintenance, and halted new residential housing construction.",
      government: "Failed to expand housing supply; faced administrative chaos and legal repayment claims when the law was annulled.",
      longRunVsShortRun: "Immediate affordability for lucky insiders; severe long-run housing supply destruction.",
    },
    assumptionsAndLimitations:
      "Price controls fail to address the root underlying supply constraint (slow municipal zoning approvals and high construction costs).",
    essayPrompts: [
      "Evaluate the consequences of imposing price ceilings on essential markets such as housing.",
      "Discuss the trade-off between equity and efficiency when governments introduce rent controls.",
    ],
    memorizationHook: "Berlin Mietendeckel caused a 57% collapse in rental listings and massive shortages; draws D-08.",
  },
  {
    id: "cs-u2-california-fast-food-wage",
    title: "California $20 Fast-Food Minimum Wage (AB 1228)",
    countryOrContext: "United States (California)",
    yearOrPeriod: "2024–Present",
    unitId: "unit-2",
    topicCode: "2.6",
    conceptIds: ["equity", "intervention", "change"],
    diagramToDraw: "D-09 (Price Floor on Labor / Minimum Wage with Surplus / Involuntary Unemployment Ls - Ld)",
    empiricalData:
      "Took effect April 1, 2024, raising the sectoral minimum wage for chains with >60 locations nationwide to $20/hour (compared to California's general $16 minimum and the federal $7.25). Major chains (Chipotle, McDonald's) raised menu prices by 5–8% and accelerated self-service kiosk rollouts.",
    economicMechanism:
      "A binding wage floor (Wmin > We) set above labor market equilibrium increases the marginal cost of labor. Quantity of labor supplied by workers expands (Ls), while quantity demanded by fast-food franchises contracts (Ld) via automated ordering screens and reduced shift hours.",
    stakeholderEvaluation: {
      consumers: "Face higher retail fast-food meal prices and fewer counter service staff.",
      producers: "Fast-food franchises face compressed profit margins and accelerate capital-labor substitution (automated fryers, AI drive-thrus).",
      government: "Raises hourly living standards for low-wage workers, reducing eligibility for state food stamps and Medicaid.",
      longRunVsShortRun: "Immediate income boost for employed staff; long-run structural reduction in entry-level teenage job opportunities.",
    },
    assumptionsAndLimitations:
      "Impact depends heavily on the price elasticity of demand for fast food and factor substitutability between labor and kiosk automation.",
    essayPrompts: [
      "Evaluate the impact of minimum wage legislation on employment and consumer welfare.",
    ],
    memorizationHook: "California $20 wage floor triggered 5–8% menu inflation and automated kiosk adoption; draws D-09.",
  },
  {
    id: "cs-u2-scotland-mup-alcohol",
    title: "Scotland Minimum Unit Pricing (MUP) for Alcohol",
    countryOrContext: "United Kingdom (Scotland)",
    yearOrPeriod: "2018–Present",
    unitId: "unit-2",
    topicCode: "2.6 / 2.7",
    conceptIds: ["intervention", "wellbeing", "equity"],
    diagramToDraw: "D-09 (Price Floor on Demerit Goods) AND D-13 (Negative Externality of Consumption)",
    empiricalData:
      "Introduced in May 2018 at 50p per unit of alcohol (raised to 65p in September 2024). A Public Health Scotland study confirmed a 13.4% reduction in alcohol-attributable deaths and a 4.1% decline in hospital admissions, targeting cheap high-strength ciders.",
    economicMechanism:
      "Acts as a targeted price floor (Pmin > Pe) on cheap, mass-market industrial cider and vodka. Eliminates deep discounting, contracting quantity demanded specifically among chronic heavy drinkers who consume low-cost alcohol.",
    stakeholderEvaluation: {
      consumers: "Heavy drinkers pay substantially more per liter; public health gains deliver lives saved in Scotland's poorest quintiles.",
      producers: "Supermarkets and liquor stores captured the price premium (unlike a tax, excess revenue accrues to retailers).",
      government: "Substantially decreased alcohol-related trauma admissions in NHS emergency rooms without raising fiscal tax rates.",
      longRunVsShortRun: "Sustained long-run drop in chronic alcoholic liver disease mortalities.",
    },
    assumptionsAndLimitations:
      "Dependent on inflation adjustments (50p eroded over time, prompting the 65p hike in 2024); windfalls went to retailers rather than public treasuries.",
    essayPrompts: [
      "Compare the effectiveness of a minimum price (price floor) versus an indirect excise tax in reducing demerit good consumption.",
    ],
    memorizationHook: "Scotland MUP (50p/65p) reduced alcohol-attributable deaths by 13.4%; draws D-09 & D-13.",
  },
  {
    id: "cs-u2-covid-vaccine-provision",
    title: "Free Universal COVID-19 Vaccine State Provision",
    countryOrContext: "Global / UK NHS & US CDC",
    yearOrPeriod: "2020–2022",
    unitId: "unit-2",
    topicCode: "2.7",
    conceptIds: ["efficiency", "wellbeing", "intervention"],
    diagramToDraw: "D-14 (Positive Externality of Consumption — Merit Good Subsidized to Full Free Provision at Qopt)",
    empiricalData:
      "Governments worldwide provided free universal vaccination, administering over 13 billion doses globally by 2023. Studies estimate vaccines prevented over 14.4 million deaths in 185 countries in the first year alone.",
    economicMechanism:
      "Vaccines generate massive positive consumption externalities (herd immunity): when individual A gets vaccinated, they protect vulnerable third parties B and C who cannot be inoculated (MSB > MPB). Left to a private market, prices would exclude millions (Qm < Qopt). Full state subsidy shifts supply down to price = 0, achieving Qopt.",
    stakeholderEvaluation: {
      consumers: "Zero out-of-pocket cost eliminates financial barriers; herd protection restores freedom of movement and work.",
      producers: "Pfizer and Moderna earned tens of billions under Advance Market Commitments (AMCs) that funded research upfront.",
      government: "Enormous public expenditure offset by avoiding multi-trillion dollar economic lockdowns and ICU collapses.",
      longRunVsShortRun: "Massive societal welfare gain; illustrated that merit goods require zero-price provision to internalize full MSB.",
    },
    assumptionsAndLimitations:
      "Global vaccine nationalism led to severe under-allocation in low-income developing nations (COVAX supply shortages).",
    essayPrompts: [
      "Evaluate the view that merit goods with significant positive externalities should always be provided free of charge by the government.",
    ],
    memorizationHook: "13 billion free vaccine doses internalized herd immunity spillovers, saving 14M lives; draws D-14.",
  },

  // =========================================================================
  // UNIT 3: MACROECONOMICS (DEMAND MANAGEMENT, MONETARY, FISCAL & SUPPLY-SIDE)
  // =========================================================================
  {
    id: "cs-u3-us-american-rescue-plan",
    title: "US American Rescue Plan ($1.9T Fiscal Stimulus) 2021",
    countryOrContext: "United States",
    yearOrPeriod: "2021",
    unitId: "unit-3",
    topicCode: "3.6",
    conceptIds: ["intervention", "change", "wellbeing"],
    diagramToDraw: "D-16 (Aggregate Demand Shift Right) AND D-22 (Fiscal Policy Stimulus closing Deflationary Gap & Multiplier)",
    empiricalData:
      "Signed March 2021: $1.9 trillion fiscal package including $1,400 direct stimulus checks, expanded child tax credit ($3,600/child), and $350bn for state/local governments. US GDP surged 5.9% in 2021, but CPI inflation hit 9.1% by June 2022.",
    economicMechanism:
      "Government spending (G) is a direct component of AD, while direct transfers expand household disposable income, boosting consumption (C). The Keynesian multiplier shifted AD far to the right, pushing actual real GDP beyond full employment potential output (Yf), turning a deflationary gap into an inflationary gap.",
    stakeholderEvaluation: {
      consumers: "Child poverty dropped by ~50% temporarily; subsequently, household purchasing power eroded as inflation peaked at 9.1%.",
      producers: "Surging demand cleared inventory, but firms faced acute labor shortages and wage-push pressure.",
      government: "Federal debt expanded past $30 trillion, leaving little fiscal space for subsequent crises.",
      longRunVsShortRun: "Supercharged rapid economic recovery; ignited multi-decade high inflation requiring aggressive monetary tightening.",
    },
    assumptionsAndLimitations:
      "Demonstrates the Keynesian multiplier vs Monetarist crowding out debate: excessive stimulus causes demand-pull inflation when supply is inelastic.",
    essayPrompts: [
      "Evaluate the effectiveness of expansionary fiscal policy in achieving rapid macroeconomic recovery.",
      "Discuss whether fiscal stimulus risks creating more problems through inflation than it solves through growth.",
    ],
    memorizationHook: "$1.9T American Rescue Plan boosted GDP by 5.9% but stoked 9.1% inflation; draws D-16 & D-22.",
  },
  {
    id: "cs-u3-greek-austerity",
    title: "Greek Sovereign Debt Crisis & Troika Fiscal Austerity",
    countryOrContext: "Greece",
    yearOrPeriod: "2010–2018",
    unitId: "unit-3",
    topicCode: "3.6",
    conceptIds: ["intervention", "equity", "interdependence"],
    diagramToDraw: "D-16 (Aggregate Demand Contraction AD1 to AD3) AND D-19 (Deep Deflationary Gap Y1 << Yf)",
    empiricalData:
      "Under three bailout programs (€288bn), Greece implemented severe austerity: public sector wage cuts of 20–30%, VAT hikes to 24%, and pension cuts. Greek GDP shrank by 25%, and unemployment peaked at 27.9% in 2013 (youth unemployment >58%).",
    economicMechanism:
      "Sharp cuts in government expenditure (G) and aggressive increases in indirect and direct taxes (T) caused consumer spending (C) and investment (I) to collapse. The negative Keynesian multiplier shifted AD drastically to the left, triggering a deep recessionary death spiral.",
    stakeholderEvaluation: {
      consumers: "Severe loss of living standards, human capital flight (brain drain of 500,000 professionals), and soaring poverty rates.",
      producers: "Widespread bankruptcies among domestic Greek enterprises as aggregate purchasing power dried up.",
      government: "Achieved primary budget surpluses by 2016, but Debt-to-GDP ratio actually worsened (rising to 180%) because GDP denominator fell faster than debt.",
      longRunVsShortRun: "Short run: humanitarian and economic catastrophe; long run: restored Greek sovereign creditworthiness and bond market access by 2023.",
    },
    assumptionsAndLimitations:
      "Being in the Eurozone, Greece could not devalue its currency (forex channel) or lower interest rates independently to offset fiscal contraction.",
    essayPrompts: [
      "Evaluate the macroeconomic consequences of fiscal austerity during a severe economic downturn.",
      "Discuss the limitations of fiscal policy when a country belongs to a monetary union.",
    ],
    memorizationHook: "Troika austerity caused a 25% GDP contraction and 28% unemployment in Greece; draws D-16 & D-19.",
  },
  {
    id: "cs-u3-fed-rate-hikes",
    title: "US Federal Reserve Anti-Inflation Rate Hikes (2022–2023)",
    countryOrContext: "United States",
    yearOrPeriod: "2022–2023",
    unitId: "unit-3",
    topicCode: "3.5",
    conceptIds: ["intervention", "change", "efficiency"],
    diagramToDraw: "D-21 (Contractionary Monetary Policy Transmission — AD Shift Left to Cool Inflationary Gap)",
    empiricalData:
      "The Federal Reserve raised the Federal Funds Rate from 0.00–0.25% in March 2022 to 5.25–5.50% by July 2023 in 11 consecutive hikes. Headline CPI inflation fell from a 40-year peak of 9.1% (June 2022) to 3.0% by June 2023 without triggering a recession ('Soft Landing').",
    economicMechanism:
      "Transmission mechanism: Central bank rate hike $\\to$ commercial banks raise mortgage and commercial lending rates (30-year US mortgages jumped from 3% to >7%) $\\to$ borrowing costs surge $\\to$ consumer durable spending (C) and business capital investment (I) decelerate $\\to$ AD shifts left, cooling demand-pull price pressures.",
    stakeholderEvaluation: {
      consumers: "Homebuyers faced worst housing affordability in 30 years; savers enjoyed positive real yields on Treasury bills and CDs.",
      producers: "Tech startups and capital-intensive firms suffered asset repricing and venture funding contractions.",
      government: "Federal government debt servicing costs escalated dramatically, exceeding $1 trillion annually in interest payments.",
      longRunVsShortRun: "Short-run asset volatility; successfully anchored long-term inflation expectations at ~2%, avoiding 1970s-style wage-price spirals.",
    },
    assumptionsAndLimitations:
      "Monetary policy operates with long and variable time lags (12–18 months). Cannot directly fix supply-side commodity disruptions (e.g. crude oil or semiconductor shocks).",
    essayPrompts: [
      "Evaluate the effectiveness of monetary policy in curbing high inflation.",
      "Discuss the trade-offs between price stability and economic growth when central banks raise interest rates.",
    ],
    memorizationHook: "Fed hiked rates from 0% to 5.5%, bringing CPI from 9.1% down to 3.0% (Soft Landing); draws D-21.",
  },
  {
    id: "cs-u3-japan-abenomics-qqe",
    title: "Bank of Japan Abenomics, QQE & Negative Interest Rates",
    countryOrContext: "Japan",
    yearOrPeriod: "2013–2024",
    unitId: "unit-3",
    topicCode: "3.5",
    conceptIds: ["intervention", "change", "interdependence"],
    diagramToDraw: "D-21 (Expansionary Monetary Policy & Liquidity Trap — Inability to stimulate AD via Zero Lower Bound)",
    empiricalData:
      "Under Governor Kuroda, the BOJ implemented 'Three Arrows': 2% inflation target, massive asset purchases (buying ~50% of Japanese Government Bonds), Yield Curve Control (YCC capping 10-year yields at 0%), and a -0.1% policy rate. Finally exited negative rates in March 2024 after 17 years.",
    economicMechanism:
      "Illustrates the classical Keynesian liquidity trap and zero-lower-bound limitation: when nominal interest rates reach 0%, conventional monetary stimulus loses traction. Negative rates penalize bank reserves to spur corporate borrowing, but deflationary mindsets kept consumer spending subdued.",
    stakeholderEvaluation: {
      consumers: "Elderly demographic held high cash savings and did not accelerate consumption; yen depreciation raised imported food prices.",
      producers: "Major export conglomerates (Toyota, Sony) posted record yen earnings due to currency depreciation.",
      government: "BOJ monetized government debt, keeping state borrowing costs near zero despite debt/GDP exceeding 260%.",
      longRunVsShortRun: "Successfully broke structural deflation after 25 years, but distorted bond market pricing mechanisms.",
    },
    assumptionsAndLimitations:
      "Extreme monetary easing in an aging demographic cannot overcome structural headwinds without deep labor deregulation and immigration reform.",
    essayPrompts: [
      "Discuss the limitations of monetary policy when an economy is caught in a liquidity trap with near-zero interest rates.",
    ],
    memorizationHook: "BOJ held negative rates (-0.1%) and bought 50% of sovereign debt to escape liquidity trap; draws D-21.",
  },
  {
    id: "cs-u3-opec-stagflation",
    title: "1970s OPEC Oil Embargo & 2022 European Energy Crisis",
    countryOrContext: "Global / Europe & USA",
    yearOrPeriod: "1973–1979 & 2022",
    unitId: "unit-3",
    topicCode: "3.2 / 3.3",
    conceptIds: ["scarcity", "change", "interdependence"],
    diagramToDraw: "D-17 (SRAS Shock & Stagflation — Shift Left of SRAS causing PL up and Y down)",
    empiricalData:
      "In 1973, OPEC cut crude exports, quadrupling oil prices from $3 to $12/barrel; US inflation soared to 12.3% while unemployment jumped to 9%. In 2022, following Russia's invasion of Ukraine, European Title Transfer Facility (TTF) natural gas prices spiked 400% to >€300/MWh, pushing Eurozone inflation to 10.6%.",
    economicMechanism:
      "Energy is a universal intermediate factor of production. A critical supply shock drives up marginal production and transport costs across all industries, shifting the Short-Run Aggregate Supply (SRAS) curve sharply to the left. The result is Stagflation: rising price levels coupled with falling real output and rising unemployment.",
    stakeholderEvaluation: {
      consumers: "Devastating cost-of-living squeeze; real wages collapsed as energy and utility bills consumed up to 15% of disposable income.",
      producers: "Energy-intensive industries (fertilizers, steel, glass manufacturing) shut down factories due to negative margins.",
      government: "Macroeconomic policy dilemma: stimulating AD lowers unemployment but worsens inflation; contracting AD cools inflation but deepens recession.",
      longRunVsShortRun: "Catalyzed long-run structural shifts: 1970s spurred automobile fuel efficiency standards; 2022 spurred rapid renewable rollouts and LNG infrastructure.",
    },
    assumptionsAndLimitations:
      "Demand management tools (monetary/fiscal) cannot resolve supply-side stagflation without inflicting substantial short-term pain.",
    essayPrompts: [
      "Explain the policy dilemma faced by governments and central banks when an economy experiences stagflation.",
      "Analyze the causes and consequences of an adverse aggregate supply shock.",
    ],
    memorizationHook: "OPEC and 2022 gas spikes shifted SRAS left, causing textbook stagflation; draws D-17.",
  },
  {
    id: "cs-u3-singapore-supply-side",
    title: "Singapore SkillsFuture & Low Corporate Tax Strategy",
    countryOrContext: "Singapore",
    yearOrPeriod: "2015–Present",
    unitId: "unit-3",
    topicCode: "3.7",
    conceptIds: ["efficiency", "change", "intervention"],
    diagramToDraw: "D-24 (Supply-Side Policies — Outward Shift of LRAS from LRAS1 to LRAS2 without Inflation)",
    empiricalData:
      "SkillsFuture provides every Singaporean citizen aged 25+ with S$500–S$1,000 lifelong learning credits to upskill in AI, data analytics, and advanced manufacturing. Combined with a competitive 17% corporate tax rate and world-class port infrastructure, Singapore ranks #1 in global competitiveness.",
    economicMechanism:
      "Combines interventionist supply-side policies (state investment in human capital education and vocational tech training) with market-based supply-side policies (low marginal corporation taxes and deregulation). Increases the quality and productivity of labor and capital, shifting the vertical LRAS curve to the right, enabling non-inflationary long-term GDP growth.",
    stakeholderEvaluation: {
      consumers: "Workers maintain high employment employability despite global technological automation disruptions.",
      producers: "Multinational corporations (Google, Dyson, Pfizer) establish Asian headquarters in Singapore due to skilled labor and predictable low taxation.",
      government: "Sustained long-run economic growth without chronic inflationary pressures.",
      longRunVsShortRun: "Long time lags: training takes years to manifest as higher factor productivity; high fiscal training subsidies required.",
    },
    assumptionsAndLimitations:
      "Relies on workforce willingness to continuously retrain and structural reliance on foreign talent and global free trade.",
    essayPrompts: [
      "Evaluate the view that interventionist supply-side policies are superior to market-based supply-side policies in promoting economic growth.",
      "Discuss how supply-side policies contribute to achieving low inflation and sustained economic expansion simultaneously.",
    ],
    memorizationHook: "SkillsFuture credits + 17% corporate tax shift LRAS right for non-inflationary growth; draws D-24.",
  },
  {
    id: "cs-u3-denmark-flexicurity",
    title: "Danish 'Flexicurity' Labor Market Model",
    countryOrContext: "Denmark",
    yearOrPeriod: "1990s–Present",
    unitId: "unit-3",
    topicCode: "3.3 / 3.7",
    conceptIds: ["efficiency", "equity", "wellbeing"],
    diagramToDraw: "D-24 (Supply-Side Policies & Reducing the Natural Rate of Unemployment)",
    empiricalData:
      "Combines extreme labor market flexibility (employers can hire and fire workers with zero severance penalties) with high social security safety nets (unemployment benefits up to 90% of prior wage) and mandatory active labor market policies (ALMPs: retrain or lose benefits). Denmark's unemployment rate sits at ~2.5–3.5%.",
    economicMechanism:
      "Market-based labor flexibility eliminates structural rigidities and hiring hesitations for firms. Active labor market interventions rapidly retrain and reassign redundant workers into growing export sectors, drastically reducing the duration of frictional and structural unemployment.",
    stakeholderEvaluation: {
      consumers: "Workers have high employment security (readily finding new jobs) rather than obsolete job protection.",
      producers: "Firms can swiftly reallocate labor in response to changing global consumer demand and technological changes.",
      government: "High fiscal cost funded by high personal income tax rates (top bracket ~56%), requiring strong societal tax compliance.",
      longRunVsShortRun: "Prevents long-term hysteresis and skill atrophy among unemployed cohorts.",
    },
    assumptionsAndLimitations:
      "High tax burden could theoretically cause brain drain or work disincentives if social trust is low.",
    essayPrompts: [
      "Evaluate supply-side policies designed to reduce the natural rate of unemployment.",
      "Discuss whether labor market deregulation compromises worker equity in pursuit of economic efficiency.",
    ],
    memorizationHook: "Danish Flexicurity (easy firing + 90% benefits + mandatory retraining) keeps unemployment ~3%; draws D-24.",
  },
  {
    id: "cs-u3-zimbabwe-hyperinflation",
    title: "Zimbabwe Hyperinflation (2007–2008)",
    countryOrContext: "Zimbabwe",
    yearOrPeriod: "2007–2008",
    unitId: "unit-3",
    topicCode: "3.3",
    conceptIds: ["scarcity", "change", "intervention"],
    diagramToDraw: "D-16 (Extreme Aggregate Demand Shift via Excessive Money Supply) & Collapse of Real Output",
    empiricalData:
      "In November 2008, Zimbabwe's year-on-year inflation rate hit an astronomical 89.7 sextillion percent (89,700,000,000,000,000,000,000%), with prices doubling every 24.7 hours. The government printed 100-trillion-dollar banknotes before abandoning the Zimbabwean dollar in 2009 in favor of the US dollar.",
    economicMechanism:
      "Following the collapse of commercial agricultural output (FOP destruction), the Reserve Bank of Zimbabwe monetized government deficits by printing fiat currency relentlessly to pay military and civil service wages. The Quantity Theory of Money ($MV = PY$) was demonstrated: massive expansion in money supply ($M$) with collapsing output ($Y$) drove price levels ($P$) to infinity.",
    stakeholderEvaluation: {
      consumers: "Complete destruction of savings, pensions, and real wages; cash became worthless trash; citizens reverted to bartering and foreign currencies.",
      producers: "Commercial production collapsed; formal grocery stores had empty shelves due to unworkable price controls.",
      government: "Total loss of institutional monetary credibility; forced to dollarize the economy to halt price spirals.",
      longRunVsShortRun: "Complete economic ruin until external currency stabilization restored basic market clearing.",
    },
    assumptionsAndLimitations:
      "Illustrates that money is only a medium of exchange; printing currency cannot create real economic goods and services.",
    essayPrompts: [
      "Explain how excessive growth in the money supply leads to hyperinflation.",
      "Discuss the consequences of high inflation on economic growth and income distribution.",
    ],
    memorizationHook: "Zimbabwe 100-trillion dollar note proves MV=PY: printing money with no output causes hyperinflation.",
  },

  // =========================================================================
  // UNIT 4: THE GLOBAL ECONOMY (TRADE, PROTECTIONISM, FOREX & DEVELOPMENT)
  // =========================================================================
  {
    id: "cs-u4-us-china-tariffs-ev",
    title: "US Section 301 Tariffs on Chinese Electric Vehicles (100%)",
    countryOrContext: "United States vs China",
    yearOrPeriod: "2024–Present",
    unitId: "unit-4",
    topicCode: "4.2",
    conceptIds: ["intervention", "interdependence", "equity"],
    diagramToDraw: "D-26 (Tariff on Imported Goods — The Four Welfare Areas a, b, c, d & Deadweight Losses)",
    empiricalData:
      "In May 2024, the Biden Administration quadrupled import tariffs on Chinese electric vehicles from 25% to 100%, alongside 50% tariffs on solar cells and 25% on lithium-ion EV batteries and steel/aluminum, covering $18bn of imports.",
    economicMechanism:
      "A specific/ad valorem import tariff raises the landed price of imported goods above world supply ($P_w$ to $P_w + \\text{tariff}$). Domestic production expands from $Q_1$ to $Q_3$, domestic consumption contracts from $Q_2$ to $Q_4$, and imports shrink to $(Q_4 - Q_3)$. Creates Area a (producer surplus gain), Area b (production inefficiency DWL), Area c (tariff revenue), and Area d (consumption DWL).",
    stakeholderEvaluation: {
      consumers: "US consumers denied access to affordable $12,000 Chinese EVs (e.g. BYD Seagull), slowing the clean energy transition.",
      producers: "Domestic US automakers (GM, Ford, Tesla) gain temporary protection from heavily subsidized foreign competition.",
      government: "Federal government collects border tariff revenue (Area c) and protects strategic manufacturing jobs in Rust Belt swing states.",
      longRunVsShortRun: "Short run: protects domestic jobs; long run: risks retaliatory tariffs on US agricultural exports and stifles innovation.",
    },
    assumptionsAndLimitations:
      "Assumes domestic automakers will use the protected window to innovate rather than merely earning sheltered monopoly rents.",
    essayPrompts: [
      "Evaluate the economic arguments for and against the use of tariffs to protect strategic domestic industries.",
      "Discuss the impact of trade protectionism on consumers, domestic producers, and overall societal welfare.",
    ],
    memorizationHook: "US 100% EV tariff illustrates textbook tariff welfare areas a, b, c, d and clean energy trade-off; draws D-26.",
  },
  {
    id: "cs-u4-us-sugar-quota",
    title: "US Tariff-Rate Quota (TRQ) on Raw Cane Sugar",
    countryOrContext: "United States",
    yearOrPeriod: "1981–Present",
    unitId: "unit-4",
    topicCode: "4.2",
    conceptIds: ["intervention", "efficiency", "equity"],
    diagramToDraw: "D-27 (Import Quota & Quota Rents accrued to Foreign License Holders / Domestic Importers)",
    empiricalData:
      "The US sets an annual import quota limiting foreign sugar imports to ~1.4 million metric tons. US domestic sugar prices are consistently 50% to 100% higher than the world market price ($0.38/lb vs $0.22/lb global price).",
    economicMechanism:
      "Limits physical import volume to a fixed quota. Domestic supply shifts rightward at prices above world price ($S_d + \\text{quota}$). This drives domestic price up to Pq, generates deadweight welfare losses, and creates a large Quota Rent rectangle that accrues to foreign quota-holding license holders rather than the US government treasury.",
    stakeholderEvaluation: {
      consumers: "US consumers and food confectioners pay ~$3 billion extra annually for candy, baked goods, and soda.",
      producers: "Concentrated US sugar cane and beet growers in Florida and Louisiana reap massive windfall profits.",
      government: "Unlike a tariff (which generates state revenue), the quota generates zero tax revenue; the rent is captured by license holders.",
      longRunVsShortRun: "Incentivized US beverage makers to switch from cane sugar to High Fructose Corn Syrup (HFCS), distorting agriculture.",
    },
    assumptionsAndLimitations:
      "Classic public choice theory example: concentrated benefits for a small lobby (sugar growers) outweigh diffuse costs spread across 330 million consumers.",
    essayPrompts: [
      "Compare the welfare consequences of an import quota with those of an import tariff.",
      "Discuss why governments might choose an import quota over a tariff despite forgone fiscal revenues.",
    ],
    memorizationHook: "US sugar quota doubles domestic sugar prices and hands quota rents to license holders; draws D-27.",
  },
  {
    id: "cs-u4-swiss-franc-unpegging",
    title: "Swiss National Bank (SNB) Unpegging of the Franc 2015",
    countryOrContext: "Switzerland",
    yearOrPeriod: "January 15, 2015",
    unitId: "unit-4",
    topicCode: "4.3",
    conceptIds: ["change", "interdependence", "intervention"],
    diagramToDraw: "D-28 (Floating Forex Market Dynamics — Sudden Massive Currency Appreciation e1 to e2)",
    empiricalData:
      "On January 15, 2015, the SNB abruptly abandoned its 3-year currency peg of 1.20 Swiss Francs (CHF) per Euro. Within minutes, the Franc surged by over 30% against the Euro, settling around parity (1.00 CHF = 1.00 EUR). Swiss stock market plunged 10% in a single day.",
    economicMechanism:
      "Under the peg, the SNB printed Francs to buy Euros to keep the Franc artificially weak. When the ECB announced massive quantitative easing, the SNB realized defending the peg required infinite balance-sheet expansion. Releasing the peg allowed market demand for the Franc (safe-haven flows) to shift demand violently to the right, appreciating the exchange rate instantaneously.",
    stakeholderEvaluation: {
      consumers: "Swiss consumers gained huge purchasing power on foreign imports and holidays in France, Germany, and Italy.",
      producers: "Swiss exporters (luxury watchmakers like Swatch, machinery, luxury tourism) suffered severe competitive price shocks.",
      government: "The SNB recorded massive paper balance-sheet losses on its foreign exchange reserves.",
      longRunVsShortRun: "Immediate shock forced Swiss manufacturers to focus on hyper-high-margin, non-price-elastic luxury and pharmaceutical goods (Novartis, Roche).",
    },
    assumptionsAndLimitations:
      "Demonstrates the central bank 'Impossible Trinity': a country cannot simultaneously maintain free capital flows, a fixed exchange rate, and an independent monetary policy.",
    essayPrompts: [
      "Evaluate the advantages and disadvantages of fixed versus floating exchange rate regimes.",
      "Analyze the macroeconomic consequences of sudden currency appreciation on an export-dependent economy.",
    ],
    memorizationHook: "SNB abandoned 1.20 peg in 2015; Franc appreciated 30% in minutes, testing Swiss export elasticity; draws D-28.",
  },
  {
    id: "cs-u4-brexit-pound-depreciation",
    title: "UK Pound Sterling (£) Depreciation Following Brexit (2016)",
    countryOrContext: "United Kingdom",
    yearOrPeriod: "June 2016",
    unitId: "unit-4",
    topicCode: "4.3",
    conceptIds: ["change", "interdependence", "wellbeing"],
    diagramToDraw: "D-28 (Floating Forex Market Dynamics — Supply Shift Right / Demand Shift Left causing Depreciation)",
    empiricalData:
      "Following the June 23, 2016 referendum, the British Pound plunged 15% against the US Dollar (from $1.50 to $1.20) in hours, reaching its lowest level in over 30 years. UK CPI inflation accelerated from 0.5% in early 2016 to 3.1% in late 2017.",
    economicMechanism:
      "Political uncertainty and anticipated trade barriers caused foreign investors to liquidate sterling assets (demand for GBP shifted left) while domestic funds sought overseas diversification (supply of GBP shifted right). The resulting currency depreciation increased imported input prices, shifting SRAS left and causing imported cost-push inflation.",
    stakeholderEvaluation: {
      consumers: "Real wages contracted as food, energy, and electronics imports became substantially more expensive.",
      producers: "FTSE 100 multinational firms earning foreign revenues benefited; domestic firms relying on imported components suffered margin compression.",
      government: "Bank of England faced stagflationary pressures, cutting interest rates to 0.25% to support growth despite rising inflation.",
      longRunVsShortRun: "J-curve effect demonstrated: trade balance worsened in the short run before export contracts could adjust.",
    },
    assumptionsAndLimitations:
      "Marshall-Lerner condition ($|PED_x + PED_m| > 1$) must hold for depreciation to successfully improve the balance of trade in the long run.",
    essayPrompts: [
      "Evaluate the impact of a sharp currency depreciation on a nation's macroeconomic objectives.",
      "Discuss how exchange rate fluctuations affect domestic inflation and international trade balances.",
    ],
    memorizationHook: "Post-Brexit vote, Pound plunged 15%, sparking imported cost-push inflation and testing Marshall-Lerner; draws D-28.",
  },
  {
    id: "cs-u4-grameen-microfinance",
    title: "Bangladesh Grameen Bank & Microfinance Revolution",
    countryOrContext: "Bangladesh",
    yearOrPeriod: "1976–Present",
    unitId: "unit-4",
    topicCode: "4.6",
    conceptIds: ["equity", "wellbeing", "sustainability"],
    diagramToDraw: "D-29 (The Poverty Cycle — Injecting Microcredit to Break the Low Savings / Low Investment Trap)",
    empiricalData:
      "Founded by Nobel Laureate Muhammad Yunus, Grameen Bank has disbursed over $34 billion in collateral-free microloans averaging $200–$500 to over 9 million borrowers, 97% of whom are women. Repayment rates consistently exceed 96%.",
    economicMechanism:
      "The conventional commercial banking sector excludes the poor due to lack of physical collateral. By using social peer-lending groups, microfinance injects working capital directly into Node 3 of the Poverty Cycle. Borrowers purchase productive physical capital (sewing machines, livestock), boosting household productivity, income, and domestic savings, breaking the multi-generational poverty trap.",
    stakeholderEvaluation: {
      consumers: "Impoverished rural women gained financial independence, improved child nutrition, and paid for primary schooling.",
      producers: "Rural informal micro-enterprises expanded, creating local village employment and supply resilience.",
      government: "Poverty headcounts in Bangladesh declined from >44% in 1991 to under 18% in 2022.",
      longRunVsShortRun: "Virtuous cycle: micro-investments generate self-sustaining income streams without ongoing state welfare dependence.",
    },
    assumptionsAndLimitations:
      "Some commercial microfinance imitators charged usurious interest rates (30–50%), causing micro-debt traps in regions without consumer protection.",
    essayPrompts: [
      "Evaluate the role of microfinance in promoting economic growth and economic development in low-income countries.",
      "Discuss whether market-based institutional solutions can break the poverty cycle without direct foreign aid.",
    ],
    memorizationHook: "Grameen Bank's $200 loans to 9M women broke the low-investment link in the poverty cycle; draws D-29.",
  },
  {
    id: "cs-u4-rwanda-coffee-washing",
    title: "Rwanda National Coffee Strategy & Specialty Washing Stations",
    countryOrContext: "Rwanda",
    yearOrPeriod: "2000–Present",
    unitId: "unit-4",
    topicCode: "4.6",
    conceptIds: ["change", "sustainability", "interdependence"],
    diagramToDraw: "D-29 (Breaking the Primary Commodity Poverty Trap via Value Addition & Upward Terms of Trade)",
    empiricalData:
      "Following the 1994 genocide, Rwanda transitioned from exporting low-grade bulk coffee beans to high-grade specialty Arabica. The government and USAID supported the construction of over 300 communal Coffee Washing Stations (CWS). Farmers earned 2–3x higher prices per kilogram from international buyers like Starbucks.",
    economicMechanism:
      "Overcoming the Prebisch-Singer hypothesis (which states that raw primary commodity exporters suffer declining terms of trade over time due to low YED). By processing cherries immediately into washed specialty parchment coffee, farmers capture higher value-added margins, stabilizing export revenues and escaping the primary commodity trap.",
    stakeholderEvaluation: {
      consumers: "Global specialty coffee consumers receive traceable, high-quality ethical single-origin coffee.",
      producers: "Smallholder coffee farmers doubled household incomes, reinvesting in healthcare, fertilizer, and schooling for children.",
      government: "Diversified foreign exchange earnings, reduced trade deficits, and promoted rural post-conflict reconciliation.",
      longRunVsShortRun: "Shifted the country from volatile subsistence agriculture toward high-value agribusiness exports.",
    },
    assumptionsAndLimitations:
      "Remains susceptible to global climate change, coffee rust fungus, and volatile international wholesale commodity futures.",
    essayPrompts: [
      "Evaluate the strategies a developing country might adopt to overcome the problems associated with dependence on primary commodities.",
    ],
    memorizationHook: "Rwanda built 300 coffee washing stations to add value, escaping the Prebisch-Singer trap; draws D-29.",
  },
  {
    id: "cs-u4-kenya-mpesa",
    title: "Kenya M-Pesa Mobile Money Revolution",
    countryOrContext: "Kenya",
    yearOrPeriod: "2007–Present",
    unitId: "unit-4",
    topicCode: "4.6",
    conceptIds: ["change", "wellbeing", "efficiency"],
    diagramToDraw: "D-29 (Institutional Infrastructure Investment & Upward Shift of Productive Capacity / PPF)",
    empiricalData:
      "Launched by Safaricom in 2007, M-Pesa allows users to deposit, withdraw, and transfer money via basic SMS text messages. Over 96% of Kenyan households have an M-Pesa account. An MIT study found M-Pesa lifted 194,000 Kenyan households (2% of the population) out of extreme poverty.",
    economicMechanism:
      "Overcomes physical institutional market failures (lack of brick-and-mortar bank branches in rural villages). Dramatically lowers transaction costs of money transfers, facilitates secure peer-to-peer remittances from urban workers to rural families, and enables informal micro-savings, directly funding micro-investments.",
    stakeholderEvaluation: {
      consumers: "Drastic reduction in theft and travel costs to send money home; empowered female-headed households to start small businesses.",
      producers: "Kenyan merchants accept instant frictionless digital payments, reducing cash handling risks and expanding turnover.",
      government: "Broadened financial tax transparency and facilitated emergency mobile welfare disbursements during droughts.",
      longRunVsShortRun: "Leapfrogged traditional Western banking infrastructure, providing a blueprint for financial inclusion globally.",
    },
    assumptionsAndLimitations:
      "Requires reliable cellular telecommunications infrastructure and mobile network operator regulation to prevent monopoly pricing.",
    essayPrompts: [
      "Evaluate the importance of domestic institutional factors in promoting economic growth and economic development.",
    ],
    memorizationHook: "M-Pesa SMS banking lifted 194k households out of extreme poverty by slashing transaction costs; draws D-29.",
  },
  {
    id: "cs-u4-zambia-copper-trap",
    title: "Zambia Copper Commodity Dependency & Dutch Disease",
    countryOrContext: "Zambia",
    yearOrPeriod: "2000–Present",
    unitId: "unit-4",
    topicCode: "4.4 / 4.6",
    conceptIds: ["interdependence", "scarcity", "change"],
    diagramToDraw: "D-28 (Floating Forex Volatility) AND Prebisch-Singer Primary Commodity Dependency",
    empiricalData:
      "Copper accounts for over 70% of Zambia's total merchandise export earnings. When copper prices crashed from $10,000/tonne in 2011 to $4,500 in 2015, the Zambian Kwacha depreciated by 50%, foreign debt ballooned, and Zambia became Africa's first pandemic-era sovereign debt default in 2020.",
    economicMechanism:
      "Illustrates the 'Natural Resource Curse' and Dutch Disease: high copper export revenues appreciate the currency during commodity booms, pricing out domestic agriculture and manufacturing. When commodity prices collapse, export earnings crash, causing massive current account deficits, debt crises, and imported inflation.",
    stakeholderEvaluation: {
      consumers: "Citizens suffer wild boom-and-bust cycles: rapid inflation when the currency devalues, followed by cuts to public services.",
      producers: "Foreign multinational mining firms (First Quantum, Glencore) extract profits, often negotiating low corporate royalty rates.",
      government: "Trapped in fiscal deficits: unable to fund long-term infrastructure when copper revenues collapse.",
      longRunVsShortRun: "Demonstrates that economic growth driven purely by raw commodity extraction does not equate to sustainable economic development.",
    },
    assumptionsAndLimitations:
      "Requires sovereign wealth funds (like Norway's) to sterilize volatile capital inflows and diversify the economic base.",
    essayPrompts: [
      "Evaluate the problems caused by an over-reliance on a single primary commodity for export revenue.",
      "Discuss the relationship between economic growth and economic development in resource-rich nations.",
    ],
    memorizationHook: "Copper accounts for 70% of Zambia's exports, leading to severe Dutch Disease and debt default in 2020.",
  },
];
