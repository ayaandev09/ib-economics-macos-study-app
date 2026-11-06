export type AssessmentObjective = "AO1" | "AO2" | "AO3";

export interface StructureStep {
  stepNumber: number;
  title: string;
  marksTargeted: string;
  purpose: string;
  detailedInstructions: string[];
  writingTemplate: string;
}

export interface RubricBand {
  band: string;
  markRange: string;
  descriptor: string;
  examinerCommentary: string;
}

export interface AnnotatedSection {
  heading: string;
  text: string;
  aoType: "AO1" | "AO2" | "AO3" | "EXAMINER_NOTE";
  commentary: string;
}

export interface QuestionStructureBreakdown {
  mark: 15 | 10 | 8 | 6 | 4 | 2;
  title: string;
  paperContext: string;
  targetTimeMinutes: string;
  assessmentObjectives: { ao: AssessmentObjective; label: string; percentage: string }[];
  coreFrameworkName: string;
  coreFrameworkSubtitle: string;
  overview: string;
  structureSteps: StructureStep[];
  bandDescriptors: RubricBand[];
  annotatedModelAnswer: {
    prompt: string;
    diagramToDraw: string;
    contextAndSetup: string;
    sections: AnnotatedSection[];
  };
  examinerTraps: string[];
  goldenRules: string[];
}

export interface CommandTermItem {
  id: string;
  term: string;
  ao: AssessmentObjective;
  aoName: string;
  officialIBDefinition: string;
  whatExaminersExpect: string;
  typicalMarks: number[];
  samplePrompt: string;
  strategyBlueprint: string[];
  commonMistakes: string;
  highYieldPhrases: string[];
}

export const QUESTION_STRUCTURES: QuestionStructureBreakdown[] = [
  {
    mark: 15,
    title: "15 Marks — Extended Synthesis, Critical Evaluation & Policy Recommendation",
    paperContext: "Paper 1 (Part b) & Paper 2 (Final Synthesis & Evaluation Section)",
    targetTimeMinutes: "32–35 minutes",
    assessmentObjectives: [
      { ao: "AO1", label: "Knowledge & Understanding", percentage: "20%" },
      { ao: "AO2", label: "Application & Economic Analysis", percentage: "35%" },
      { ao: "AO3", label: "Synthesis, Critical Evaluation & Judgment", percentage: "45%" },
    ],
    coreFrameworkName: "CLASPP / SLAP + DEED",
    coreFrameworkSubtitle: "Stakeholders, Long-run vs Short-run, Assumptions, Priorities + Definitions, Explanations, Examples, Diagrams",
    overview:
      "The 15-mark essay is the single highest-yield question on the IB Economics SL examination. To reach top Band 4 (13–15 marks), candidates must demonstrate effective synthesis of economic theory and real-world empirical context, integrated diagrams with full step-by-step causal mechanisms, and a balanced, prioritized, and justified evaluation answering the prompt directly.",
    structureSteps: [
      {
        stepNumber: 1,
        title: "Introduction, Definitions & Economic Dilemma (AO1)",
        marksTargeted: "2–3 Marks (AO1)",
        purpose: "Anchor the essay by defining syllabus terms and outlining the central trade-off.",
        detailedInstructions: [
          "Define 2–3 core economic terms from the prompt with absolute textbook precision.",
          "Identify the market failure, macroeconomic goal, or trade policy dilemma at stake.",
          "State a concise 1-sentence thesis or analytical roadmap outlining the key perspectives.",
        ],
        writingTemplate:
          "[Term 1] is defined as... while [Term 2] refers to... The central economic problem centers on whether [Policy A] can successfully achieve [Goal] without generating severe unintended consequences such as...",
      },
      {
        stepNumber: 2,
        title: "Primary Argument + Diagram 1 + Step-by-Step Mechanism (AO1 + AO2)",
        marksTargeted: "4–5 Marks (AO1 + AO2)",
        purpose: "Build the foundational economic case with a fully integrated diagram.",
        detailedInstructions: [
          "Draw a fully labeled, canonical diagram (e.g. D-10 Indirect Tax, D-13 Negative Externality, or D-21 Monetary Stimulus).",
          "Walk through the causal transmission mechanism step-by-step (e.g. Tax → MSC shifts upwards → Market price rises from P1 to P2 → Contraction in quantity demanded from Q1 to Q2 → Deadweight welfare loss eliminated).",
          "Explicitly cite and integrate real-world empirical data (e.g. UK Sugar Tax 2018, 24p/L levy, 47.5g/100ml drop in sugar content).",
        ],
        writingTemplate:
          "As illustrated in Diagram 1, the implementation of [Policy] causes [Curve 1] to shift from... to... This creates a temporary [excess demand/supply] of [Q1-Q2] at the initial price P1. Consequently, prices adjust to P2, causing a movement along [Curve 2] to the new equilibrium at...",
      },
      {
        stepNumber: 3,
        title: "Counter-Argument / Alternative Policy + Diagram 2 (AO1 + AO2 + AO3)",
        marksTargeted: "3–4 Marks (AO2 + AO3)",
        purpose: "Introduce a balanced counter-perspective or alternative market-based/interventionist tool.",
        detailedInstructions: [
          "Explain why the primary policy may fail or have severe unintended consequences.",
          "Draw or reference a second diagram (e.g. D-11 Subsidy on substitutes, D-22 Fiscal Crowding Out, or D-27 Quota vs Tariff).",
          "Compare the relative effectiveness of the alternative policy using empirical evidence.",
        ],
        writingTemplate:
          "However, critics argue that [Policy 1] is insufficient because... Alternatively, governments often employ [Policy 2], which operates by... As shown in Diagram 2, this shifts [Curve] resulting in...",
      },
      {
        stepNumber: 4,
        title: "Critical Evaluation via CLASPP / SLAP (AO3)",
        marksTargeted: "4–5 Marks (AO3)",
        purpose: "Execute rigorous evaluation across multiple evaluative dimensions.",
        detailedInstructions: [
          "S - Stakeholders: Dissect winners and losers (Consumers: regressive tax burden vs health gains; Producers: margin compression vs innovation; Government: tax revenues vs administrative enforcement costs).",
          "L - Long-Run vs Short-Run: Contrast immediate adjustment frictions with long-term behavioral transformation and structural capital reallocation.",
          "A - Assumptions & Limitations: Challenge ceteris paribus, discuss price elasticity (PED/PES magnitudes), information deficits, and government failure.",
          "P - Priorities & Magnitude: Weigh which stakeholder or macroeconomic objective takes precedence in the specific national context.",
        ],
        writingTemplate:
          "In evaluating this policy, the stakeholder impacts diverge sharply. For consumers... whereas producers... Furthermore, while in the short run... in the long run... Crucially, the ultimate efficacy depends upon the magnitude of PED, because if demand is highly price inelastic...",
      },
      {
        stepNumber: 5,
        title: "Supported, Nuanced Conclusion / Recommendation (AO3)",
        marksTargeted: "2–3 Marks (AO3)",
        purpose: "Deliver an authoritative, non-repetitive final judgment directly answering the prompt.",
        detailedInstructions: [
          "Provide a definitive, reasoned answer to 'To what extent' or 'Evaluate'.",
          "State under what specific conditions the policy is optimal (e.g. combined with ring-fenced subsidies and educational nudges).",
          "Never summarize earlier paragraphs; synthesize new comparative judgment.",
        ],
        writingTemplate:
          "In conclusion, [Policy] is effective only 'to a moderate extent' if implemented in isolation. Its success is heavily contingent on [Factor 1, e.g. PED elasticity] and [Factor 2, e.g. government fiscal capacity]. Therefore, the most economically efficient policy mix requires...",
      },
    ],
    bandDescriptors: [
      {
        band: "Band 4",
        markRange: "13–15 Marks",
        descriptor:
          "Comprehensive economic knowledge and understanding. Fully integrated, correctly labeled diagrams with clear step-by-step causal chains. Authentic, context-specific real-world examples. In-depth, balanced evaluation with critical thinking and a supported, justified conclusion.",
        examinerCommentary:
          "Top-band responses don't just 'list pros and cons'; they interrogate economic trade-offs using concepts like elasticity, opportunity cost, and time lags, arriving at a distinct judgment.",
      },
      {
        band: "Band 3",
        markRange: "9–12 Marks",
        descriptor:
          "Good economic knowledge and understanding. Relevant diagrams with minor errors or incomplete textual explanation. Real-world example is present but superficial. Evaluation is present but may be unbalanced or listed rather than synthesized.",
        examinerCommentary:
          "Typically a strong analysis followed by a standard 'pros vs cons' list without genuine evaluation or without answering 'to what extent'.",
      },
      {
        band: "Band 2",
        markRange: "5–8 Marks",
        descriptor:
          "Some relevant economic knowledge with gaps. Diagram is inaccurate, incomplete, or not referenced in prose. Hypothetical or generic example (e.g. 'Country X'). Minimal or unsubstantiated evaluation.",
        examinerCommentary:
          "Candidate understands the general topic but fails to explain the causal mechanism step-by-step or omits real-world data.",
      },
      {
        band: "Band 1",
        markRange: "1–4 Marks",
        descriptor:
          "Little relevant economic knowledge. No diagram or completely incorrect diagram. No real-world context. Purely descriptive or emotional statements.",
        examinerCommentary:
          "Off-topic or general knowledge essay lacking economic terminology and analytical models.",
      },
    ],
    annotatedModelAnswer: {
      prompt:
        "Evaluate the view that imposing an indirect tax on sugary beverages is the most effective policy to correct market failure arising from consumption externalities. [15 marks]",
      diagramToDraw:
        "D-13 (Negative Externality of Consumption with Indirect Tax shifting MSC / MPC)",
      contextAndSetup:
        "Based on standard Microeconomics (Unit 2.8 & 2.5), evaluating Pigouvian indirect taxation vs subsidies and behavioral nudges using the UK Soft Drinks Industry Levy.",
      sections: [
        {
          heading: "1. Introduction & Theoretical Foundations",
          text: "An indirect tax is a tax imposed on producers by the government on goods and services, which increases the cost of production and can be shifted onto consumers. A negative externality of consumption occurs when the social benefit of consumption is less than the private benefit (MSB < MPB), imposing uncompensated spillover costs on third parties—such as elevated healthcare expenditures on obesity and Type-2 diabetes funded by taxpayers. In an unregulated free market, self-interested consumers consume at MPB = MPC (Qm, Pm), generating overconsumption of (Qm - Qopt) and a deadweight welfare loss (DWL) represented by the welfare loss triangle pointing toward the social optimum.",
          aoType: "AO1",
          commentary:
            "🟢 AO1 Mastery: Precise definitions of indirect tax and negative externality of consumption, specifying MSB < MPB, free market equilibrium vs social optimum, and DWL.",
        },
        {
          heading: "2. Diagrammatic Analysis & Step-by-Step Transmission Mechanism",
          text: "As illustrated in Diagram D-13, the free market produces output Qm at price Pm where MPB = MPC. To internalize the external cost (MEC), the government imposes a specific indirect tax equal to the marginal external cost at Qopt. This raises the private marginal cost from MPC to MPC + Tax (MSC). At the original price Pm, this creates excess demand, bidding up the consumer price to Pc while producers receive Pp. This price increase induces a contraction of quantity demanded along the MPB curve from Qm to the socially optimal level Qopt, eliminating the deadweight welfare loss triangle and restoring allocative efficiency. In the real world, the UK implemented the Soft Drinks Industry Levy (SDIL) in April 2018, levying 24p per liter on drinks with over 8g of sugar per 100ml. This directly led to over 50% of beverage manufacturers reformulating recipes, reducing total domestic sugar consumption from sodas by 47,500 tonnes per year.",
          aoType: "AO2",
          commentary:
            "🔵 AO2 Mastery: Step-by-step causal chain explicitly linked to diagram coordinates (Pm, Pc, Pp, Qm, Qopt), followed immediately by verified empirical data (UK SDIL 2018).",
        },
        {
          heading: "3. Alternative Policy Analysis: Subsidies on Healthy Substitutes & Education",
          text: "However, indirect taxes may not be the 'most effective' intervention in isolation. An alternative approach is subsidizing healthy substitute goods (such as fresh fruits, bottled spring water, or milk) combined with public health education campaigns. A subsidy shifts the MPC curve downwards to MPC - Subsidy, lowering consumer prices and expanding consumption of merit goods towards their socially optimal output (MSB = MSC). Concurrently, targeted educational campaigns shift the MPB curve inward toward MSB by eliminating consumer information failure, addressing the root cognitive bias rather than merely penalizing purchasing power.",
          aoType: "AO2",
          commentary:
            "🔵 AO2 Extension: Introduces alternative policy tools (subsidies on substitutes + educational nudges) to build a robust basis for comparative evaluation.",
        },
        {
          heading: "4. In-Depth Critical Evaluation (CLASPP / SLAP Framework)",
          text: "Evaluating this policy reveals significant economic trade-offs across multiple dimensions: (1) Stakeholders: Low-income households suffer from the regressive nature of indirect taxes, spending a higher proportion of their disposable income on consumer staples. However, beverage producers like Coca-Cola and Britvic reformulated over 70% of product portfolios to escape higher tax brackets, meaning consumers consumed less sugar without facing massive price hikes. The government collected £336 million in year-one revenues, which were ring-fenced to fund school breakfast clubs and sports facilities. (2) Elasticity (Assumptions): The effectiveness of an indirect tax depends heavily on the Price Elasticity of Demand (PED). If sugary beverages are addictive with few close substitutes, demand is price inelastic (|PED| < 1), causing a large rise in price but only a negligible contraction in quantity consumed. (3) Long-run vs Short-run: In the short run, tax incidence falls heavily on consumers with minimal behavioral change; however, in the long run, reformulation and shifting consumer tastes establish permanent reductions in obesity-related externalities.",
          aoType: "AO3",
          commentary:
            "🟡 AO3 Mastery: Dissects Stakeholders (equity/regressivity vs health), PED magnitude assumptions, and Short-run vs Long-run dynamics with specific tax revenue figures.",
        },
        {
          heading: "5. Supported Final Judgment & Policy Recommendation",
          text: "In conclusion, the view that an indirect tax is the 'most effective' policy is valid only to a moderate extent if used as a standalone instrument. While taxation creates immediate economic incentives and generates ring-fenced public revenue, it fails to address consumer addiction and disproportionately burdens low-income groups due to regressivity. Therefore, the optimal economic solution is a multi-pronged policy mix: an indirect tax with tiered thresholds (to force producer recipe reformulation) paired with full hypothecation of tax revenues into subsidizing healthy alternatives and early-childhood nutritional education.",
          aoType: "AO3",
          commentary:
            "🟡 AO3 Synthesis: Authoritative, balanced conclusion answering 'To what extent' with conditionality and recommending a superior policy mix.",
        },
      ],
    },
    examinerTraps: [
      "Failing to answer 'To what extent' or 'Evaluate' directly in the conclusion.",
      "Writing a generic list of pros and cons instead of evaluating specific stakeholders and elasticities.",
      "Omitting real-world empirical examples or using hypothetical 'Country X' scenarios.",
      "Drawing a diagram without walking through every curve shift and equilibrium movement in the text.",
      "Ignoring the regressive nature of indirect taxes or opportunity costs of subsidies.",
    ],
    goldenRules: [
      "Always follow the CLASPP framework: Stakeholders, Long vs Short run, Assumptions, Priorities, Probable outcomes.",
      "Ensure your diagram has every axis, curve, and equilibrium projection labeled (P1, P2, Q1, Q2, DWL).",
      "Explicitly quote empirical evidence (dates, percentages, dollar figures) from your Case Studies Bank.",
      "Reserve at least 5 minutes at the end to craft a justified, non-repetitive final judgment.",
    ],
  },
  {
    mark: 10,
    title: "10 Marks — Structured Extended Analysis with Diagram & Real-World Example",
    paperContext: "Paper 1 (Part a) & Select Paper 2 Conceptual Analysis Questions",
    targetTimeMinutes: "15–18 minutes",
    assessmentObjectives: [
      { ao: "AO1", label: "Knowledge & Understanding", percentage: "35%" },
      { ao: "AO2", label: "Application & Economic Analysis", percentage: "65%" },
    ],
    coreFrameworkName: "DEED Framework",
    coreFrameworkSubtitle: "Definitions, Explanations, Examples, Diagrams (NO EVALUATION REQUIRED!)",
    overview:
      "The 10-mark question strictly assesses AO1 (Knowledge & Understanding) and AO2 (Application & Analysis). Candidates are required to explain an economic theory or market mechanism using a correctly labeled diagram and an authentic real-world example. Crucially, ZERO marks are awarded for evaluation or pros/cons—wasting time evaluating in Part (a) severely penalizes your available time for the 15-mark Part (b)!",
    structureSteps: [
      {
        stepNumber: 1,
        title: "D - Definitions (AO1)",
        marksTargeted: "2 Marks (AO1)",
        purpose: "Establish clear conceptual boundaries by defining key terms.",
        detailedInstructions: [
          "Define the 2 key economic concepts in the prompt accurately and concisely.",
          "Include any relevant syllabus equations (e.g. PED = %ΔQd / %ΔP or AD = C + I + G + (X - M)).",
        ],
        writingTemplate:
          "[Term 1] is defined as... [Term 2] refers to... Mathematically, it can be expressed as...",
      },
      {
        stepNumber: 2,
        title: "D - Diagram Setup & Labeling (AO1 + AO2)",
        marksTargeted: "3 Marks (AO1 + AO2)",
        purpose: "Draw an accurate, standard canonical economic diagram.",
        detailedInstructions: [
          "Draw clear Cartesian axes with correct labels (e.g. Price of Coffee vs Quantity of Coffee, or Average Price Level vs Real GDP).",
          "Draw initial equilibrium (E1, P1, Q1 or PL1, Y1).",
          "Show a clear, visible curve shift with directional arrow and new equilibrium (E2, P2, Q2).",
        ],
        writingTemplate:
          "In the diagram below, the vertical axis measures [Axis Y] and the horizontal axis measures [Axis X]. Initial market equilibrium is established at point E1 where...",
      },
      {
        stepNumber: 3,
        title: "E - Step-by-Step Causal Explanation (AO2)",
        marksTargeted: "3 Marks (AO2)",
        purpose: "Deconstruct the mechanism step-by-step from cause to final equilibrium.",
        detailedInstructions: [
          "Explain what triggered the shift in economic terms (e.g. rise in raw material costs increases production costs).",
          "Explain the temporary market disequilibrium (shortage or surplus at original price).",
          "Explain how price acts as a signal and incentive to ration resources until new equilibrium is reached.",
        ],
        writingTemplate:
          "When [event] occurs, this impacts [determinant], shifting [Curve 1] from... to... At the original price [P1], there is now an excess [demand/supply] equal to [distance]. This disequilibrium causes...",
      },
      {
        stepNumber: 4,
        title: "E - Integrated Real-World Example (AO2)",
        marksTargeted: "2 Marks (AO2)",
        purpose: "Ground the theoretical explanation in a specific real-world event.",
        detailedInstructions: [
          "Name the specific country, market, and time period.",
          "Cite empirical details (e.g. Brazil frost 2021 destroying 20% of arabica coffee harvest, doubling wholesale coffee prices).",
          "Link the real-world facts directly back to the curves and equilibrium points in your diagram.",
        ],
        writingTemplate:
          "A real-world example of this occurred in [Year/Country] in the market for [Good/Service], where [Specific Event] resulted in [Empirical Outcome], mirroring the shift from P1 to P2 in Diagram 1.",
      },
    ],
    bandDescriptors: [
      {
        band: "Band 4",
        markRange: "9–10 Marks",
        descriptor:
          "Precise definitions of all relevant terms. Flawlessly labeled diagram that is explicitly referenced in the written prose. Rigorous, step-by-step causal chain. Specific, authentic real-world example that fits the economic theory perfectly.",
        examinerCommentary:
          "Candidates who get 10/10 walk the examiner through the diagram curve by curve and connect their real-world numbers directly to the coordinates on the axes.",
      },
      {
        band: "Band 3",
        markRange: "6–8 Marks",
        descriptor:
          "Accurate definitions with minor omissions. Diagram is mostly correct and referenced. Causal explanation is logical but may skip intermediate steps (e.g. jumping from tax to higher price without mentioning shortage/cost). Real-world example is mentioned but lacks depth.",
        examinerCommentary:
          "Good theoretical knowledge, but explanation lacks full depth or uses a vague/generic example like 'farmers in developing countries'.",
      },
      {
        band: "Band 2",
        markRange: "3–5 Marks",
        descriptor:
          "Partial definitions. Diagram has errors in axes or curve labeling. Causal explanation is weak or superficial. Example is hypothetical (e.g. 'Company A produces cars').",
        examinerCommentary:
          "Common trap: candidate spent time evaluating the policy or discussing pros and cons, which earned 0 marks and resulted in an incomplete explanation.",
      },
      {
        band: "Band 1",
        markRange: "1–2 Marks",
        descriptor:
          "Largely inaccurate or irrelevant response. Inappropriate diagram or no diagram. Descriptive and lacking economic concepts.",
        examinerCommentary:
          "Fails to demonstrate basic understanding of the required syllabus mechanism.",
      },
    ],
    annotatedModelAnswer: {
      prompt:
        "Explain how the price mechanism allocates resources in response to an increase in consumer demand for electric vehicles. [10 marks]",
      diagramToDraw:
        "D-04 (Rightward Shift of Demand with Price Mechanism Signaling, Incentive, and Rationing)",
      contextAndSetup:
        "Unit 2.2 & 2.4 Microeconomics: The Price Mechanism (Signaling, Incentive, Rationing functions).",
      sections: [
        {
          heading: "1. Precise Syllabus Definitions",
          text: "The price mechanism refers to the system in a free market economy where the forces of demand and supply determine the prices of goods and services, which subsequently act as signals to allocate scarce resources. Demand is the quantity of a good or service that consumers are willing and able to purchase at various prices over a given period of time, ceteris paribus.",
          aoType: "AO1",
          commentary:
            "🟢 AO1: Two precise, formal definitions capturing resource allocation and willingness/ability to pay under ceteris paribus.",
        },
        {
          heading: "2. Fully Labeled Diagram (D-04)",
          text: "Diagram 1 depicts the competitive market for Electric Vehicles (EVs). The vertical axis represents the Price of EVs ($/unit) and the horizontal axis represents the Quantity of EVs per year. Initial equilibrium is at point E1, where initial demand D1 intersects initial supply S1, establishing equilibrium price P1 and equilibrium quantity Q1.",
          aoType: "AO1",
          commentary:
            "🟢 AO1 Diagram Context: Clearly establishes axes and initial equilibrium coordinates.",
        },
        {
          heading: "3. Step-by-Step Causal Mechanism (Signaling, Incentive, Rationing)",
          text: "When consumer preferences shift in favor of electric vehicles (due to environmental awareness and rising petrol costs), the demand curve shifts rightward from D1 to D2. At the initial price P1, quantity demanded (Qd) now exceeds quantity supplied (Qs), resulting in a temporary market shortage of (Qd - P1). This shortage causes prices to rise from P1 towards P2, triggering the three functions of the price mechanism: (1) Signaling function: The higher market price signals to producers that there is an excess demand and that consumers value EVs more highly. (2) Incentive function: Higher prices increase potential profit margins, providing an incentive for profit-seeking automakers to reallocate scarce factors of production (capital and skilled engineering labor) into EV manufacturing. Consequently, there is an extension of supply along S1 from Q1 to Q2. (3) Rationing function: At the higher price P2, marginal consumers with lower willingness or ability to pay contract their demand along D2 from Qd down to Q2. Allocative equilibrium is restored at point E2 (P2, Q2) with a higher quantity of resources allocated to EV production.",
          aoType: "AO2",
          commentary:
            "🔵 AO2 Step-by-Step Rigor: Explicitly details the shortage, price increase, and all three classic functions of the price mechanism (Signaling, Incentive, Rationing).",
        },
        {
          heading: "4. Real-World Empirical Example",
          text: "A concrete real-world example of this mechanism occurred in Norway between 2018 and 2023. As consumer demand for zero-emission vehicles surged, wholesale EV prices initially held firm while legacy ICE sales collapsed. In response to price signals and higher profit opportunities, traditional automakers like Volkswagen transformed assembly lines (such as the Zwickau plant) exclusively to modular electric drive platforms (MEB). By 2023, electric vehicles captured over 82% of all new car registrations in Norway, illustrating how the price mechanism successfully reallocated automotive capital toward sustainable transport.",
          aoType: "AO2",
          commentary:
            "🟣 AO2 Authentic Evidence: Real-world country (Norway), timeframe (2018–2023), empirical market share figure (82%), and corporate resource reallocation (Volkswagen MEB).",
        },
      ],
    },
    examinerTraps: [
      "DO NOT EVALUATE! Part (a) is strictly AO1 and AO2. Writing pros, cons, or limitations earns exactly 0 marks.",
      "Forgetting to explain the 3 distinct functions of the price mechanism (signaling, incentive, rationing).",
      "Drawing an unreferenced diagram in the corner without mentioning E1, E2, P1, P2 in the written text.",
      "Using a made-up or hypothetical example like 'Product X in Country Y'.",
    ],
    goldenRules: [
      "Follow the DEED structure: Definitions → Explanations → Examples → Diagrams.",
      "Spend no more than 18 minutes so you have at least 32 minutes for Part (b).",
      "Always quote specific coordinates from your diagram (e.g. 'as price rises from P1 to P2, quantity supplied extends from Q1 to Q2').",
    ],
  },
  {
    mark: 8,
    title: "8 Marks — Comparative Data Response & Cross-Extract Synthesis",
    paperContext: "Paper 2 (Data Response Comparative Questions / Mock Examinations)",
    targetTimeMinutes: "12–14 minutes",
    assessmentObjectives: [
      { ao: "AO1", label: "Knowledge & Understanding", percentage: "25%" },
      { ao: "AO2", label: "Application & Comparative Analysis", percentage: "75%" },
    ],
    coreFrameworkName: "Compare, Contrast & Synthesize",
    coreFrameworkSubtitle: "Two-Perspective Theoretical Analysis Backed by Explicit Extract Citations",
    overview:
      "8-mark questions typically ask candidates to examine two contrasting policy measures, compare economic performance across two countries or time periods, or analyze the economic impact of an external shock using provided text extracts and data tables. Success requires balancing both sides equally and quoting quantitative data from the stimulus material.",
    structureSteps: [
      {
        stepNumber: 1,
        title: "Definitions & Contextual Orientation",
        marksTargeted: "2 Marks (AO1)",
        purpose: "Define the core concepts and extract focus.",
        detailedInstructions: [
          "Define the primary economic concepts mentioned in the prompt (e.g. floating vs fixed exchange rate, or tariff vs quota).",
          "Identify the specific countries, sectors, or extracts referenced in the question.",
        ],
        writingTemplate:
          "[Concept A] is defined as... whereas [Concept B] is... As indicated in Extract [X], Country [Y] is confronting...",
      },
      {
        stepNumber: 2,
        title: "Perspective 1: Detailed Mechanism with Extract Evidence",
        marksTargeted: "3 Marks (AO2)",
        purpose: "Analyze the first policy/country/impact thoroughly.",
        detailedInstructions: [
          "Explain the theoretical causal chain for the first option/effect.",
          "Cite direct quotes, percentages, or figures from the text (e.g. 'According to Table 1, inflation rose from 2.1% to 6.8%').",
          "Reference relevant diagrammatic logic if the prompt specifies a diagram.",
        ],
        writingTemplate:
          "Regarding the first factor, [Mechanism 1] operates by... As stated in Extract [Letter], paragraph [Number], '[Quote/Data]'. This implies that...",
      },
      {
        stepNumber: 3,
        title: "Perspective 2: Comparative Analysis with Extract Evidence",
        marksTargeted: "3 Marks (AO2)",
        purpose: "Analyze the second contrasting factor with equal rigor.",
        detailedInstructions: [
          "Compare or contrast with the second policy, country, or impact.",
          "Demonstrate why the outcome differs (e.g. due to structural elasticity differences or fiscal constraints).",
          "Synthesize a clear comparative summary answering the prompt directly.",
        ],
        writingTemplate:
          "In contrast, the alternative policy of [Option 2] impacts the economy through... Evidence from Extract [Letter] demonstrates that '[Quote/Data]'. Comparing both approaches reveals that...",
      },
    ],
    bandDescriptors: [
      {
        band: "Band 4",
        markRange: "7–8 Marks",
        descriptor:
          "Accurate definitions and thorough economic understanding. Balanced comparative analysis covering both dimensions equally. Consistent, effective use of extract data and quantitative evidence. Clear analytical synthesis.",
        examinerCommentary:
          "Top answers explicitly link economic theory to the specific data points in the text rather than writing general textbook paragraphs.",
      },
      {
        band: "Band 3",
        markRange: "5–6 Marks",
        descriptor:
          "Sound understanding with minor errors. Covers both perspectives, but one is notably more developed than the other. References text data, but intermittently.",
        examinerCommentary:
          "Good economic analysis, but unbalanced or treats the case study as generic rather than using the provided data.",
      },
      {
        band: "Band 2",
        markRange: "3–4 Marks",
        descriptor:
          "Superficial understanding. Only analyzes one perspective in depth. Minimal or inaccurate reference to the stimulus material.",
        examinerCommentary:
          "Fails to provide a genuine comparative analysis; reads like a simple summary of the text without economic theory.",
      },
      {
        band: "Band 1",
        markRange: "1–2 Marks",
        descriptor:
          "Weak understanding. Copied chunks from the text without economic analysis. No clear structure.",
        examinerCommentary:
          "Direct transcription of the case study with no demonstrated economic analysis.",
      },
    ],
    annotatedModelAnswer: {
      prompt:
        "Using the information in Extract A and Table 1, compare the effectiveness of contractionary monetary policy versus supply-side policies in reducing persistent inflation in Country Z. [8 marks]",
      diagramToDraw:
        "Comparative AD/AS shifts (Monetary AD leftward shift vs Supply-side LRAS rightward shift)",
      contextAndSetup:
        "Paper 2 Macroeconomics data response examining cost-push vs demand-pull inflation management.",
      sections: [
        {
          heading: "1. Definitions & Context Framing",
          text: "Contractionary monetary policy involves central bank action to increase interest rates or reduce money supply to dampen aggregate demand (AD). Supply-side policies aim to increase the productive capacity and efficiency of the economy, shifting long-run aggregate supply (LRAS) outwards. Extract A indicates that Country Z faces an annual inflation rate of 8.4%, driven by both domestic consumer spending and supply chain bottlenecks.",
          aoType: "AO1",
          commentary:
            "🟢 AO1: Clear definitions of both policies and direct quotation of Country Z's inflation rate (8.4%).",
        },
        {
          heading: "2. Analysis of Contractionary Monetary Policy with Extract Evidence",
          text: "Contractionary monetary policy operates by increasing the central bank policy interest rate. As stated in Extract A, the central bank raised rates from 1.5% to 4.75%. This increases the cost of borrowing for households and firms, discouraging debt-financed consumption (C) and business investment (I). Furthermore, higher mortgage servicing costs reduce discretionary incomes, leading to an inward shift of AD from AD1 to AD2. This alleviates demand-pull pressures and reduces the average price level from PL1 to PL2. However, Table 1 reveals that unemployment increased from 4.2% to 6.1%, confirming the short-run trade-off of a recessionary output contraction.",
          aoType: "AO2",
          commentary:
            "🔵 AO2: Step-by-step AD contraction mechanism supported by specific interest rate data (1.5% to 4.75%) and unemployment consequences (4.2% to 6.1%).",
        },
        {
          heading: "3. Comparative Analysis of Supply-Side Policies with Extract Evidence",
          text: "In contrast, interventionist supply-side policies target the structural roots of inflation. Extract A notes that the government allocated $12 billion toward port automation and renewable energy grid modernization. This investment reduces freight bottlenecks and lowers energy input costs for domestic producers, shifting short-run and long-run aggregate supply curves rightward (SRAS and LRAS). Unlike monetary tightening, supply-side expansion lowers the price level while simultaneously increasing real GDP (Y1 to Y2), avoiding unemployment spikes. However, Table 1 shows that government debt reached 78% of GDP, indicating severe fiscal constraints, and the time lag for infrastructure completion is projected at 4 to 6 years, making it ineffective for immediate disinflation.",
          aoType: "AO2",
          commentary:
            "🔵 AO2 Synthesis: Thorough comparative contrast highlighting different cost drivers, fiscal debt metrics ($12B, 78% debt/GDP), and time lag limitations.",
        },
      ],
    },
    examinerTraps: [
      "Only discussing one policy in depth while treating the other in one brief sentence.",
      "Failing to quote the exact figures (e.g. inflation 8.4%, interest rate 4.75%, debt 78%) from the extract.",
      "Writing a normative essay on which policy is morally superior instead of analyzing economic mechanisms.",
    ],
    goldenRules: [
      "Always quote at least two distinct numerical data points or direct textual excerpts.",
      "Dedicate equal analytical space to both policies or perspectives.",
      "Conclude with a crisp analytical synthesis highlighting the key trade-off (e.g. speed vs long-run capacity).",
    ],
  },
  {
    mark: 6,
    title: "6 Marks — Diagrammatic Explanation with Direct Extract Integration",
    paperContext: "Paper 2 (Data Response Core Analytical Questions, Parts b/c/d)",
    targetTimeMinutes: "8–10 minutes",
    assessmentObjectives: [
      { ao: "AO1", label: "Diagram & Economic Knowledge", percentage: "40%" },
      { ao: "AO2", label: "Application & Extract Integration", percentage: "60%" },
    ],
    coreFrameworkName: "The 3-Part Formula",
    coreFrameworkSubtitle: "Diagram (2M) + Step-by-Step Causal Mechanism (2M) + Text Data Quote (2M)",
    overview:
      "The 6-mark question in Paper 2 is an exercise in surgical precision. It explicitly states: 'Using a diagram and the information in Extract [X], explain...' The marking is strictly segmented: 2 marks for a fully labeled diagram showing initial and new equilibriums, 2 marks for explaining the economic transmission mechanism, and 2 marks for directly applying extract data.",
    structureSteps: [
      {
        stepNumber: 1,
        title: "Part 1: Accurate, Fully Labeled Diagram (2 Marks)",
        marksTargeted: "2 Marks (AO1)",
        purpose: "Draw the exact diagram required with zero labeling errors.",
        detailedInstructions: [
          "Correctly label the axes with appropriate units (e.g. Price of Solar Panels in $ vs Quantity of Solar Panels; or Price Level vs Real GDP).",
          "Draw and label initial curves (D1, S1) and initial equilibrium (P1, Q1).",
          "Draw the shifted curve (e.g. S2 shifted right for subsidy, or D2 shifted left for tax) with a visible arrow.",
          "Identify and label the new equilibrium (P2, Q2).",
        ],
        writingTemplate:
          "[Draw diagram neatly within a boxed area. Label axes, curves, equilibrium projections P1, Q1, P2, Q2, and shift arrow clearly.]",
      },
      {
        stepNumber: 2,
        title: "Part 2: Step-by-Step Economic Mechanism (2 Marks)",
        marksTargeted: "2 Marks (AO2)",
        purpose: "Explain why and how the curve shifted and how price adjusts.",
        detailedInstructions: [
          "Identify the economic determinant that triggered the shift (e.g. fall in production costs, change in tastes).",
          "Explain the disequilibrium at initial price P1 (surplus or shortage).",
          "Explain the resulting price adjustment and movement along the other curve to (P2, Q2).",
        ],
        writingTemplate:
          "As shown in the diagram, [event] causes [Curve] to shift from... to... At the original price P1, there is a temporary [surplus/shortage] of [Q1 to Q*]. Market forces push prices to P2, resulting in a new equilibrium at...",
      },
      {
        stepNumber: 3,
        title: "Part 3: Direct Extract Data & Context Integration (2 Marks)",
        marksTargeted: "2 Marks (AO2)",
        purpose: "Prove to the examiner that you applied the theory to the extract.",
        detailedInstructions: [
          "Quote the specific extract paragraph, product name, and numerical statistic.",
          "Connect the quote directly to the curve shift in your diagram.",
        ],
        writingTemplate:
          "This is directly supported by Extract [Letter], paragraph [Number], which states that '[Quote specific statistic or event]'. This real-world factor accounts for the shift from [P1/Q1] to [P2/Q2].",
      },
    ],
    bandDescriptors: [
      {
        band: "Full Marks",
        markRange: "5–6 Marks",
        descriptor:
          "Accurate, complete, and properly labeled diagram showing correct shift and equilibrium changes. Precise, logical step-by-step causal explanation. Explicit, accurate quotation and application of data/text from the extract.",
        examinerCommentary:
          "Candidate successfully integrates all three elements: the diagram, the theoretical mechanism, and the text data.",
      },
      {
        band: "Partial Marks",
        markRange: "3–4 Marks",
        descriptor:
          "Diagram is present with minor labeling omissions (e.g. forgot arrow or generic axis labels). Causal explanation is sound but brief. Data from extract is referenced vaguely without specific figures.",
        examinerCommentary:
          "Most common loss: student drew a good diagram and explained it, but completely neglected to quote the extract, automatically capping their score at 4/6.",
      },
      {
        band: "Low Marks",
        markRange: "1–2 Marks",
        descriptor:
          "Inaccurate diagram (wrong curve shifted or missing axes). Very superficial explanation. No reference to extract.",
        examinerCommentary:
          "Candidate treated the question as an abstract theory prompt without using the case study.",
      },
    ],
    annotatedModelAnswer: {
      prompt:
        "Using a demand and supply diagram and the information in Extract B, explain how the imposition of a 15% tariff on imported washing machines affected the domestic market for washing machines in Country M. [6 marks]",
      diagramToDraw:
        "D-26 (Tariff Diagram showing World Price Pw, Tariff Price Pw+t, Domestic Supply Sd, Domestic Demand Dd)",
      contextAndSetup:
        "Paper 2 Global Economy (Unit 4.2 Trade Protectionism: Tariffs).",
      sections: [
        {
          heading: "1. Diagram: Domestic Market with Tariff (2 Marks)",
          text: "[Diagram D-26]: Vertical axis = Price of Washing Machines ($), Horizontal axis = Quantity of Washing Machines per year. Domestic Supply (Sd) and Domestic Demand (Dd). World Price line = Pw (perfectly elastic). With tariff, world supply shifts upwards to Pw + Tariff. Domestic production expands from Q1 to Q2, domestic consumption contracts from Q4 to Q3, and imports shrink from (Q4 - Q1) down to (Q3 - Q2).",
          aoType: "AO1",
          commentary:
            "🟢 Diagram (2/2): Fully labeled axes, domestic supply/demand, world price line, tariff price line, and four distinct quantity projections (Q1, Q2, Q3, Q4).",
        },
        {
          heading: "2. Step-by-Step Causal Mechanism (2 Marks)",
          text: "Prior to the tariff, domestic consumers purchased quantity Q4 at the world price Pw, with domestic producers only supplying Q1 and imports satisfying the deficit (Q4 - Q1). The imposition of a 15% tariff raises the price of imported washing machines to Pw + Tariff. This price increase provides an incentive for domestic manufacturers to expand production along Sd from Q1 to Q2. Concurrently, the higher market price forces domestic consumers to contract their demand along Dd from Q4 to Q3. Consequently, the volume of imported washing machines contracts from (Q4 - Q1) to (Q3 - Q2), protecting domestic industry at the expense of higher consumer prices.",
          aoType: "AO2",
          commentary:
            "🔵 Mechanism (2/2): Systematic explanation of domestic supply expansion, consumer demand contraction, and shrinking import volume.",
        },
        {
          heading: "3. Direct Extract Data Application (2 Marks)",
          text: "As stated in Extract B, paragraph 2, 'the government of Country M imposed a 15% import tariff after domestic washing machine sales plunged by 35% between 2021 and 2023.' Furthermore, paragraph 3 notes that following the tariff, 'domestic washing machine manufacturer ElectraCo increased its domestic factory output by 120,000 units, while average retail prices rose from $400 to $460.' This empirical evidence directly corresponds to the expansion from Q1 to Q2 and the price rise from Pw ($400) to Pw+t ($460).",
          aoType: "AO2",
          commentary:
            "🟣 Extract Integration (2/2): Explicitly quotes paragraph 2 & 3, includes the exact percentage tariff (15%), sales slump (35%), unit output gain (120,000 units), and retail price figures ($400 to $460).",
        },
      ],
    },
    examinerTraps: [
      "Drawing the diagram but forgetting to quote or reference the extract (instant 2-mark deduction).",
      "Writing a detailed extract summary without drawing or referencing the diagram.",
      "Labeling macroeconomic axes (Price Level / Real GDP) for a microeconomic market question, or vice-versa.",
      "Failing to indicate the direction of curve shifts with arrows.",
    ],
    goldenRules: [
      "Always structure into 3 distinct visual sections: 1) Diagram, 2) Step-by-Step Economic Explanation, 3) Extract Quotation & Integration.",
      "Always quote at least one exact number and paragraph from the text.",
      "Spend no more than 9 minutes on this question.",
    ],
  },
  {
    mark: 4,
    title: "4 Marks — Two-Factor Causal Explanation or Calculate & Interpret",
    paperContext: "Paper 2 (Data Response Structured Questions, Parts a(ii)/b)",
    targetTimeMinutes: "5–6 minutes",
    assessmentObjectives: [
      { ao: "AO1", label: "Identification & Knowledge", percentage: "50%" },
      { ao: "AO2", label: "Causal Explanation & Calculation", percentage: "50%" },
    ],
    coreFrameworkName: "The 2 × 2 Formula",
    coreFrameworkSubtitle: "[Factor 1 + Causal Chain] (2M) & [Factor 2 + Causal Chain] (2M)",
    overview:
      "4-mark questions appear across Paper 2 in two formats: (1) 'Explain two reasons why...' or (2) 'Calculate [metric] and explain one consequence of this result.' In both cases, the marking follows a clean 2 × 2 structure. For an explanation question, identifying each factor earns 1 mark, and providing the economic causal mechanism with text context earns the second mark.",
    structureSteps: [
      {
        stepNumber: 1,
        title: "Point 1: Identification + Causal Mechanism (2 Marks)",
        marksTargeted: "2 Marks (AO1 + AO2)",
        purpose: "State the first economic reason clearly and explain how it leads to the outcome.",
        detailedInstructions: [
          "State Factor 1 using precise economic vocabulary (1 Mark).",
          "Explain the causal mechanism linking this factor to the prompt's outcome, citing text data (1 Mark).",
        ],
        writingTemplate:
          "Firstly, one reason for [outcome] is [Factor 1] (1 mark). When this occurs, it causes [economic mechanism], which leads to [result], as seen in Extract [X] where [data quote] (1 mark).",
      },
      {
        stepNumber: 2,
        title: "Point 2: Identification + Causal Mechanism (2 Marks)",
        marksTargeted: "2 Marks (AO1 + AO2)",
        purpose: "State the second distinct economic reason and explain its mechanism.",
        detailedInstructions: [
          "State Factor 2, ensuring it is conceptually distinct from Factor 1 (1 Mark).",
          "Explain its independent causal mechanism with context/data (1 Mark).",
        ],
        writingTemplate:
          "Secondly, another reason is [Factor 2] (1 mark). This operates by [economic mechanism], resulting in [outcome], evidenced by [data/context] (1 mark).",
      },
    ],
    bandDescriptors: [
      {
        band: "4 Marks",
        markRange: "4 Marks",
        descriptor:
          "Two distinct reasons correctly identified. Both reasons accompanied by a clear, logical economic causal mechanism linked to the extract context.",
        examinerCommentary: "Clear, crisp, well-structured response using bullet points or two distinct paragraphs.",
      },
      {
        band: "2–3 Marks",
        markRange: "2–3 Marks",
        descriptor:
          "Identifies two reasons, but only one is fully explained; OR identifies only one reason but explains it thoroughly.",
        examinerCommentary:
          "Candidate lost marks because the two reasons were actually variations of the same point, or they failed to explain the 'why/how'.",
      },
      {
        band: "0–1 Marks",
        markRange: "0–1 Marks",
        descriptor:
          "Only one reason identified with no explanation; OR vague, non-economic everyday assertions.",
        examinerCommentary: "Fails to use economic concepts or identify valid syllabus determinants.",
      },
    ],
    annotatedModelAnswer: {
      prompt:
        "Using the information in Extract C, explain two reasons why the depreciation of Country K's currency failed to improve its trade balance. [4 marks]",
      diagramToDraw: "None required (unless specified)",
      contextAndSetup:
        "Paper 2 Global Economy (Unit 4.4 & 4.5 Exchange Rates and the Current Account).",
      sections: [
        {
          heading: "1. Reason 1: Inelastic Demand for Critical Imports (2 Marks)",
          text: "Firstly, Country K exhibits price inelastic demand for essential imports such as crude oil and pharmaceutical raw materials (1 mark). When the currency depreciates, import prices rise in domestic currency terms; however, because these goods lack domestic substitutes (|PED| < 1), the quantity of imports demanded does not fall significantly. Consequently, total import expenditure actually increases, worsening the current account deficit, as Extract C notes that 'Country K imports 85% of its industrial fuel with zero short-term alternatives' (1 mark).",
          aoType: "AO2",
          commentary:
            "🟢 2/2 Marks: Identifies PED inelasticity for critical imports (1M) and explains why higher import prices increase total expenditure using extract fuel data (1M).",
        },
        {
          heading: "2. Reason 2: The J-Curve Effect and Short-Term Contract Rigidity (2 Marks)",
          text: "Secondly, the short-run Marshall-Lerner condition was not met due to the J-curve effect and pre-existing contractual agreements (1 mark). Export contracts in Country K are fixed months in advance in foreign currencies. In the immediate aftermath of currency depreciation, export revenues cannot expand instantaneously, whereas import payments adjust upward immediately. As stated in paragraph 4, 'firms faced a 6-month lag before foreign buyers renegotiated orders,' leading to a temporary worsening of the trade deficit (1 mark).",
          aoType: "AO2",
          commentary:
            "🟢 2/2 Marks: Identifies J-curve / Marshall-Lerner time lags (1M) and explains contract rigidity backed by the 6-month lag text quote (1M).",
        },
      ],
    },
    examinerTraps: [
      "Providing only one reason (instantly caps your score at 2/4).",
      "Stating two reasons that are virtually identical (e.g. 'imports cost more' and 'goods from abroad are more expensive').",
      "Forgetting to explain the causal mechanism (e.g. stating 'demand was inelastic' without explaining why inelastic demand raises total import expenditure).",
    ],
    goldenRules: [
      "Visually separate your answer into 'Reason 1:' and 'Reason 2:'.",
      "Ensure each point has: 1) Identification of economic concept, 2) Causal chain explaining the mechanism, 3) Reference to extract.",
      "Complete in under 6 minutes.",
    ],
  },
  {
    mark: 2,
    title: "2 Marks — Precise Formal Definition / State Concept",
    paperContext: "Paper 2 (Part a(i) Definitional Questions)",
    targetTimeMinutes: "2–3 minutes",
    assessmentObjectives: [
      { ao: "AO1", label: "Knowledge & Understanding", percentage: "100%" },
    ],
    coreFrameworkName: "The Two-Point Criteria",
    coreFrameworkSubtitle: "[Core Concept / Formula] (1M) + [Qualifying Condition / Boundary] (1M)",
    overview:
      "The 2-mark definition question is binary and uncompromising. The IB Economics mark scheme awards 1 mark for a partial or vague definition and 2 marks for a complete, precise definition containing the essential qualifying terms. Leaving out words like 'ceteris paribus', 'sustained', 'final goods', or 'per unit of time' regularly costs students a full mark.",
    structureSteps: [
      {
        stepNumber: 1,
        title: "Element 1: Core Economic Definition (1 Mark)",
        marksTargeted: "1 Mark (AO1)",
        purpose: "State what the concept fundamentally is.",
        detailedInstructions: [
          "State the exact textbook identification of the term (e.g. 'the total market value of all final goods and services produced...').",
        ],
        writingTemplate: "[Term] is defined as [core economic concept]...",
      },
      {
        stepNumber: 2,
        title: "Element 2: Essential Qualifying Condition or Formula (1 Mark)",
        marksTargeted: "1 Mark (AO1)",
        purpose: "Add the necessary economic boundary or conditions.",
        detailedInstructions: [
          "State the crucial condition: time horizon (e.g. 'over a given period of time, usually one year'), geographic scope (e.g. 'within an economy/borders'), or operational condition (e.g. 'seeking work and unable to find employment').",
          "Where applicable, add the standard syllabus equation.",
        ],
        writingTemplate: "...within the domestic boundaries of an economy over a specified time period, usually one year.",
      },
    ],
    bandDescriptors: [
      {
        band: "2 Marks",
        markRange: "2 Marks",
        descriptor: "Clear, precise, and complete syllabus definition containing both essential elements.",
        examinerCommentary: "Exact match with IB subject guide definitions.",
      },
      {
        band: "1 Mark",
        markRange: "1 Mark",
        descriptor: "Vague, incomplete, or partially correct definition that omits a key qualifying clause.",
        examinerCommentary:
          "Example: defining inflation as 'when prices go up' instead of 'a sustained increase in the average price level over time'.",
      },
      {
        band: "0 Marks",
        markRange: "0 Marks",
        descriptor: "Completely incorrect definition or confused with a different concept.",
        examinerCommentary: "Confusing fiscal policy with monetary policy, or tariff with quota.",
      },
    ],
    annotatedModelAnswer: {
      prompt: "Define the term gross domestic product (GDP). [2 marks]",
      diagramToDraw: "None",
      contextAndSetup: "Standard Paper 2 Part a(i) definition.",
      sections: [
        {
          heading: "Model 2/2 Answer",
          text: "Gross Domestic Product (GDP) is the total monetary value of all final goods and services produced (1 mark) within the geographic boundaries of a country over a specific period of time, usually one year (1 mark).",
          aoType: "AO1",
          commentary:
            "🟢 2/2 Marks: 'total monetary value of all final goods and services produced' (1M) + 'within a country over a specified time period, usually one year' (1M).",
        },
        {
          heading: "Contrast: Why students get 1/2 Marks",
          text: "Student answer getting 1/2: 'GDP is the amount of money made in a country.' (Too vague: misses 'final goods and services produced' and the time period).",
          aoType: "EXAMINER_NOTE",
          commentary:
            "🔴 Examiner Warning: Vague colloquial phrasing loses the second mark every single time.",
        },
      ],
    },
    examinerTraps: [
      "Leaving out the word 'sustained' or 'average price level' when defining inflation.",
      "Leaving out 'willing and able to work' when defining unemployment.",
      "Leaving out 'over a given period of time' when defining demand, supply, or GDP.",
      "Writing a full paragraph: 2-markers should be 1–2 sentences maximum. Do not waste precious exam minutes.",
    ],
    goldenRules: [
      "Memorize the exact 2-point criteria for all high-yield terms in the Lexicon.",
      "Always include time frames ('over a given period of time') and geographic boundaries where relevant.",
      "Spend at most 2 minutes on each 2-mark question.",
    ],
  },
];

export const COMMAND_TERMS: CommandTermItem[] = [
  // AO3 Command Terms
  {
    id: "cmd-evaluate",
    term: "Evaluate",
    ao: "AO3",
    aoName: "AO3: Synthesis & Evaluation",
    officialIBDefinition:
      "Make an appraisal by weighing up the strengths and limitations of different arguments, strategies, or points of view, and drawing a balanced, supported conclusion.",
    whatExaminersExpect:
      "Examiners expect you to look at both sides of the economic issue (e.g. pros vs cons of fiscal stimulus, or market-based vs interventionist policies), analyze impacts across different stakeholders (consumers, producers, government), evaluate short-run vs long-run outcomes, examine underlying assumptions (like PED elasticity or ceteris paribus), and conclude with an authoritative, justified final judgment.",
    typicalMarks: [15],
    samplePrompt:
      "Evaluate the view that government intervention through price ceilings is the most effective method to ensure housing affordability. [15 marks]",
    strategyBlueprint: [
      "Step 1: Define key terms and establish the central trade-off.",
      "Step 2: Build the primary case with a fully labeled diagram (e.g. D-08 Price Ceiling) and step-by-step causal mechanism.",
      "Step 3: Construct the counter-perspective (e.g. chronic shortages, black markets, degraded quality).",
      "Step 4: Execute CLASPP evaluation across Stakeholders, Long vs Short run, Assumptions, and Priorities.",
      "Step 5: Write an authoritative conclusion stating 'to what extent' and recommending an optimal policy combination.",
    ],
    commonMistakes:
      "Treating 'Evaluate' as a simple 'pros vs cons' list without any synthesis, or writing a conclusion that merely repeats what was said in earlier paragraphs without a justified verdict.",
    highYieldPhrases: [
      "While this policy effectively achieves... in the short run, its long-run efficacy is severely undermined by...",
      "The degree of success is heavily contingent on the magnitude of the price elasticity of demand...",
      "From the perspective of consumers, the policy enhances equity, yet for producers it squeezes marginal revenues...",
      "Ultimately, this intervention is justified only to a moderate extent, as it must be accompanied by...",
    ],
  },
  {
    id: "cmd-to-what-extent",
    term: "To what extent",
    ao: "AO3",
    aoName: "AO3: Synthesis & Evaluation",
    officialIBDefinition:
      "Consider the merits or otherwise of an argument or concept. Opinions and conclusions should be presented clearly and supported with appropriate evidence and sound argument.",
    whatExaminersExpect:
      "You must directly address the degree to which an economic claim holds true (e.g. 'to a large extent', 'to a limited extent', or 'only under specific macroeconomic conditions'). You cannot simply sit on the fence; you must weigh the evidence, analyze counter-arguments, and make a qualified, evidence-backed assessment of the statement's validity.",
    typicalMarks: [15],
    samplePrompt:
      "To what extent is economic growth always beneficial for a developing nation? [15 marks]",
    strategyBlueprint: [
      "Step 1: Define economic growth and distinguish between GDP expansion and economic development.",
      "Step 2: Analyze the benefits with a diagram (e.g. D-24 LRAS rightward shift): higher tax receipts, employment, poverty alleviation.",
      "Step 3: Analyze the severe costs/drawbacks: negative externalities (D-12 pollution), worsening income inequality (Gini coefficient), depletion of natural capital.",
      "Step 4: Evaluate conditionality: does growth translate to wellbeing? Depends on governance, corruption, and redistributive tax systems.",
      "Step 5: Conclude definitively: 'Growth is beneficial only to a moderate extent unless paired with inclusive institutional policies.'",
    ],
    commonMistakes:
      "Answering 'it is 100% beneficial' or avoiding giving an answer altogether. Failing to use the exact words 'To a [large/moderate/limited] extent' in the final paragraph.",
    highYieldPhrases: [
      "This claim holds true to a significant extent in economies with substantial spare capacity, because...",
      "However, the assertion breaks down when considering structural income distribution...",
      "Therefore, one can argue to a limited extent that...",
      "The extent of success is determined primarily by the institutional quality and redistributive efficiency of the state...",
    ],
  },
  {
    id: "cmd-discuss",
    term: "Discuss",
    ao: "AO3",
    aoName: "AO3: Synthesis & Evaluation",
    officialIBDefinition:
      "Offer a considered and balanced review that includes a range of arguments, factors or hypotheses. Opinions or conclusions should be presented clearly and supported by appropriate evidence.",
    whatExaminersExpect:
      "Requires a wide-ranging, balanced exploration of multiple economic perspectives or policies. Unlike a narrow pro/con appraisal, 'Discuss' invites you to compare alternative approaches (e.g. discussing whether monetary policy or fiscal policy is better suited to combat a recession) and evaluate their comparative trade-offs.",
    typicalMarks: [15],
    samplePrompt:
      "Discuss the consequences of an economy experiencing a high and rising rate of inflation. [15 marks]",
    strategyBlueprint: [
      "Step 1: Define inflation and distinguish between creeping inflation and hyperinflation.",
      "Step 2: Analyze negative consequences (loss of purchasing power, shoe-leather costs, menu costs, export uncompetitiveness, uncertainty chilling investment).",
      "Step 3: Analyze nuances or potential beneficiaries (debtors gain as real value of debt falls, firms with pricing power, government fiscal drag).",
      "Step 4: Evaluate based on severity and predictability: anticipated vs unanticipated inflation.",
      "Step 5: Conclude with a synthesized judgment on why price stability is the bedrock of long-term economic prosperity.",
    ],
    commonMistakes:
      "Only discussing the negative effects of inflation and completely ignoring who gains (debtors) or the difference between anticipated and unanticipated inflation.",
    highYieldPhrases: [
      "A balanced discussion reveals that while lenders and fixed-income earners suffer severe real income erosion...",
      "Conversely, borrowers and mortgage holders experience an effective reduction in the real burden of liabilities...",
      "The severity of these consequences is fundamentally governed by whether the inflation is anticipated or unanticipated...",
    ],
  },
  {
    id: "cmd-examine",
    term: "Examine",
    ao: "AO3",
    aoName: "AO3: Synthesis & Evaluation",
    officialIBDefinition:
      "Consider an argument or concept in a way that uncovers the assumptions and interrelationships of the issue.",
    whatExaminersExpect:
      "Unpack what lies beneath an economic statement. You are expected to examine the underlying assumptions (e.g. rational consumers, perfect information, ceteris paribus) and identify how different variables interact (e.g. how a change in interest rates ripples through exchange rates, net exports, and inflation).",
    typicalMarks: [15, 8],
    samplePrompt:
      "Examine the view that free trade inevitably leads to superior economic welfare compared to protectionism. [15 marks]",
    strategyBlueprint: [
      "Step 1: Define free trade and protectionism; establish comparative advantage theory.",
      "Step 2: Draw D-25 (Free Trade Imports) and explain welfare gains: consumer surplus expansion, access to lower world prices, economies of scale.",
      "Step 3: Examine the underlying assumptions: perfect factor mobility, absence of transport costs, no structural unemployment.",
      "Step 4: Draw D-26 (Tariff) and explain why developing economies use infant industry protection and anti-dumping arguments.",
      "Step 5: Conclude by examining whether dynamic long-term advantages outweigh static allocative efficiency losses.",
    ],
    commonMistakes:
      "Merely describing what free trade is without challenging the theoretical assumptions (e.g. neglecting structural unemployment or sunset industries).",
    highYieldPhrases: [
      "Examining the foundational assumptions of comparative advantage reveals significant real-world frictions...",
      "This model presupposes zero factor immobility; in reality, laid-off domestic manufacturing workers cannot instantly transition into high-tech sectors...",
      "The interrelationship between exchange rate volatility and trade flows further complicates...",
    ],
  },
  {
    id: "cmd-justify",
    term: "Justify",
    ao: "AO3",
    aoName: "AO3: Synthesis & Evaluation",
    officialIBDefinition:
      "Give valid reasons or evidence to support an answer or conclusion.",
    whatExaminersExpect:
      "You are expected to provide rigorous economic justification for a proposed policy or economic decision. You must not only explain why the chosen policy works, but also explain why alternative options were rejected based on comparative opportunity costs.",
    typicalMarks: [15, 8],
    samplePrompt:
      "Justify the recommendation of an interventionist supply-side policy rather than a market-based policy for a country with high structural youth unemployment. [15 marks]",
    strategyBlueprint: [
      "Step 1: Define structural unemployment and interventionist supply-side policies.",
      "Step 2: Justify interventionist policy: market forces cannot solve skills mismatches; state-funded apprenticeships and vocational STEM training directly resolve factor immobility.",
      "Step 3: Contrast with market-based failure: cutting minimum wages or deregulating labor markets does not give an untrained worker modern digital skills.",
      "Step 4: Acknowledge costs: high fiscal expenditure and long time lags.",
      "Step 5: Conclude with definitive justification: long-run human capital return vastly exceeds the short-run budgetary outlay.",
    ],
    commonMistakes:
      "Asserting that a policy is 'good' without providing comparative economic reasons why other policies are inferior.",
    highYieldPhrases: [
      "This policy is justified on the grounds of market failure, because private training firms underinvest due to positive externalities...",
      "The justification rests on the failure of market-based deregulation to resolve occupational labor immobility...",
      "Weighing the fiscal burden against the long-term expansion of potential GDP confirms that...",
    ],
  },

  // AO2 Command Terms
  {
    id: "cmd-analyse",
    term: "Analyse",
    ao: "AO2",
    aoName: "AO2: Application & Analysis",
    officialIBDefinition:
      "Break down in order to bring out the essential elements or structure of an economic issue, model, or causal relationship.",
    whatExaminersExpect:
      "Deconstruct an economic phenomenon into its component causal parts. You must explain WHY and HOW variable A causes variable B, which in turn leads to variable C. Do not merely state that something happens; show the exact transmission mechanism and link it to an economic model or diagram.",
    typicalMarks: [10, 8, 6],
    samplePrompt:
      "Analyse the factors that determine the price elasticity of supply (PES) for agricultural commodities. [10 marks]",
    strategyBlueprint: [
      "Step 1: Define Price Elasticity of Supply (PES) and state the formula (PES = %ΔQs / %ΔP).",
      "Step 2: Break down the primary determinants: time period (market period vs short run vs long run), biological production lags, storage/perishability, and spare capacity.",
      "Step 3: Draw a diagram showing steep inelastic supply (PES < 1) vs flatter elastic supply (PES > 1).",
      "Step 4: Walk through the causal transmission: agricultural planting cycles mean farmers cannot instantly expand harvest when prices spike.",
      "Step 5: Conclude with a synthesized analytical overview of why primary commodities exhibit inherently volatile prices.",
    ],
    commonMistakes:
      "Listing the determinants without explaining the economic mechanics of why biological production cycles or storage costs make supply unresponsive.",
    highYieldPhrases: [
      "Deconstructing this transmission mechanism reveals that an initial change in [X] alters [Y], which subsequently causes...",
      "The structural inelasticity arises from the biological gestation period, meaning that in the short run...",
      "Breaking this down into factor mobility components demonstrates that...",
    ],
  },
  {
    id: "cmd-explain",
    term: "Explain",
    ao: "AO2",
    aoName: "AO2: Application & Analysis",
    officialIBDefinition:
      "Give a detailed account including reasons or causes for an economic event, theory, or relationship.",
    whatExaminersExpect:
      "The most common command term on the entire syllabus. It demands a thorough, step-by-step causal explanation of 'cause and effect'. You must always define the terms, draw a fully labeled diagram showing initial and final equilibrium points, and systematically explain the disequilibrium that forces market adjustment.",
    typicalMarks: [10, 6, 4],
    samplePrompt:
      "Using an AD/AS diagram, explain how cost-push inflation can lead to stagflation. [10 marks]",
    strategyBlueprint: [
      "Step 1: Define inflation, cost-push inflation, and stagflation.",
      "Step 2: Draw D-17 (Stagflation / SRAS leftward shock). Label PL1, Y1, PL2, Y2.",
      "Step 3: Explain the trigger: an exogenous surge in raw material or energy input costs (e.g. oil price shock).",
      "Step 4: Detail the mechanism: higher unit costs of production force firms to reduce output at every price level, shifting SRAS left.",
      "Step 5: Trace the dual consequence: price level rises (PL1 to PL2 = inflation) while real output falls below full employment (Y1 to Y2 = recession/unemployment).",
    ],
    commonMistakes:
      "Jumping straight from the cause to the final result without explaining the intermediate transmission mechanism (e.g. saying 'oil went up so we had inflation' without mentioning SRAS shift or production costs).",
    highYieldPhrases: [
      "The underlying economic cause of this shift is... which elevates the marginal costs of production...",
      "At the initial price level PL1, firms experience compressed margins, resulting in an inward shift of SRAS to...",
      "This simultaneously causes an upward movement in the general price level to PL2 and a contraction in real GDP to Y2...",
    ],
  },
  {
    id: "cmd-distinguish",
    term: "Distinguish",
    ao: "AO2",
    aoName: "AO2: Application & Analysis",
    officialIBDefinition:
      "Make clear the differences between two or more economic concepts, items, or models.",
    whatExaminersExpect:
      "Focus exclusively on the differentiating characteristics. Do not just define term A and then define term B in isolation; you must actively contrast them across criteria such as purpose, mechanism, control authority, and economic outcomes.",
    typicalMarks: [4, 6],
    samplePrompt:
      "Distinguish between a specific indirect tax and an ad valorem indirect tax. [4 marks]",
    strategyBlueprint: [
      "Step 1: Define specific indirect tax: fixed physical dollar amount added per unit sold (e.g. $0.50 per pack). State that it causes a parallel upward shift of the supply curve.",
      "Step 2: Define ad valorem indirect tax: percentage tax levied on the selling price (e.g. 20% VAT). State that it causes a pivoting/divergent upward shift of the supply curve.",
      "Step 3: Directly contrast the key difference: for specific taxes, the absolute tax gap remains constant as price rises; for ad valorem taxes, the absolute dollar tax expands proportionally as price increases.",
    ],
    commonMistakes:
      "Defining both terms separately without writing the crucial comparative sentence that explicitly highlights how they differ.",
    highYieldPhrases: [
      "The fundamental distinction between these two concepts lies in...",
      "While [Concept A] is characterized by a fixed absolute charge resulting in a parallel shift, [Concept B] involves...",
      "In contrast to [Concept A], which is controlled by [Entity 1], [Concept B] is governed by...",
    ],
  },
  {
    id: "cmd-calculate",
    term: "Calculate",
    ao: "AO2",
    aoName: "AO2: Application & Analysis",
    officialIBDefinition:
      "Obtain a numerical result showing the relevant stages in the working.",
    whatExaminersExpect:
      "Full working must be explicitly written out. State the syllabus formula, substitute the numbers from the data table, write out the intermediate calculation, and state the final answer clearly with the correct units (e.g. $, %, million, index points). An answer without working risks getting 0 marks if the final digit is wrong.",
    typicalMarks: [2, 3, 4],
    samplePrompt:
      "Using Table 2, calculate the price elasticity of demand (PED) when the price rises from $10 to $12 and quantity demanded falls from 100 units to 80 units. [2 marks]",
    strategyBlueprint: [
      "Step 1: State formula: PED = (%ΔQd) / (%ΔP).",
      "Step 2: Calculate %ΔQd: [(80 - 100) / 100] × 100 = -20%.",
      "Step 3: Calculate %ΔP: [(12 - 10) / 10] × 100 = +20%.",
      "Step 4: Compute final value: PED = -20% / +20% = -1.0 (or absolute value 1.0). State that demand is unitary elastic.",
    ],
    commonMistakes:
      "Omitting the minus sign or failing to specify units; not showing intermediate working.",
    highYieldPhrases: [
      "Formula: PED = (% Change in Quantity Demanded) / (% Change in Price)",
      "Working: %ΔQ = [(Q2 - Q1) / Q1] × 100...",
      "Final Result: = [Number] [Unit] (Unitary elastic / Inelastic / Elastic)",
    ],
  },
  {
    id: "cmd-construct-draw",
    term: "Construct / Draw",
    ao: "AO2",
    aoName: "AO2: Application & Analysis",
    officialIBDefinition:
      "Display information in a diagrammatic or logical form (accurately scaled or unscaled sketch with labeled axes and curves).",
    whatExaminersExpect:
      "A clean, unambiguous diagram drawn with a ruler. Axes must be explicitly labeled with appropriate context (e.g. Price of Wheat, not just 'P'). Curves must be titled (D1, S1, MSC). Initial and final equilibrium points must be projected to both axes with dashed lines and labeled (P1, Q1, P2, Q2). Shift arrows must show direction.",
    typicalMarks: [2, 3, 4],
    samplePrompt:
      "Draw a fully labeled diagram showing the welfare loss caused by the imposition of an import quota. [3 marks]",
    strategyBlueprint: [
      "Step 1: Draw perpendicular Cartesian axes with ruler. Label Price ($) and Quantity (units/year).",
      "Step 2: Draw domestic supply (Sd) and domestic demand (Dd).",
      "Step 3: Draw perfectly elastic world supply line (Pw).",
      "Step 4: Draw quota supply curve (Sd + Quota) shifting rightward parallel to Sd above Pw.",
      "Step 5: Label the new market equilibrium price Pq, the quota rent rectangle, and the two deadweight loss triangles (b and d).",
    ],
    commonMistakes:
      "Unlabeled axes, missing arrows, curved lines where straight lines are expected, or forgetting to drop dashed projection lines to axes.",
    highYieldPhrases: [
      "Axes: Vertical = Price ($), Horizontal = Quantity (units)",
      "Initial Equilibrium: (P1, Q1) at intersection of...",
      "Shift Indicator: Arrow showing rightward/leftward movement of [Curve]...",
    ],
  },

  // AO1 Command Terms
  {
    id: "cmd-define",
    term: "Define",
    ao: "AO1",
    aoName: "AO1: Knowledge & Understanding",
    officialIBDefinition:
      "Give the precise meaning of a word, phrase, concept or physical quantity.",
    whatExaminersExpect:
      "Examiners mark this strictly against the official glossary in the IB Subject Guide. You need the exact 2-point definition: the core concept (1 mark) plus the essential qualifying condition, boundary, or time period (1 mark). Do not write an essay—two concise, authoritative sentences are ideal.",
    typicalMarks: [2],
    samplePrompt: "Define the term fiscal policy. [2 marks]",
    strategyBlueprint: [
      "Step 1: State what the policy is: 'The use of government spending and taxation...'",
      "Step 2: State its economic objective or scope: '...to influence aggregate demand and the level of economic activity in the economy.'",
      "Step 3: Stop writing! Move on to the next question.",
    ],
    commonMistakes:
      "Writing a long paragraph explaining how fiscal policy works instead of just defining what it is.",
    highYieldPhrases: [
      "[Concept] is defined as the [formal economic category]...",
      "...measured over a given period of time, usually one year.",
      "...operating under the assumption of ceteris paribus.",
    ],
  },
  {
    id: "cmd-state",
    term: "State",
    ao: "AO1",
    aoName: "AO1: Knowledge & Understanding",
    officialIBDefinition:
      "Give a specific name, value or other brief answer without explanation or calculation.",
    whatExaminersExpect:
      "A one-word, one-phrase, or one-number answer. No explanation, derivation, or reasoning is required or rewarded.",
    typicalMarks: [1],
    samplePrompt:
      "State one example of an interventionist supply-side policy. [1 mark]",
    strategyBlueprint: [
      "Write a single precise economic policy name, such as: 'Government expenditure on vocational education and worker training.'",
    ],
    commonMistakes:
      "Writing three sentences explaining why education helps workers, wasting precious exam time.",
    highYieldPhrases: [
      "Answer: Government investment in public transport infrastructure.",
    ],
  },
  {
    id: "cmd-outline",
    term: "Outline",
    ao: "AO1",
    aoName: "AO1: Knowledge & Understanding",
    officialIBDefinition:
      "Give a brief summary of the essential features or principles of an economic concept or policy.",
    whatExaminersExpect:
      "A concise overview covering the primary points without detailed causal analysis. Briefly sketch the main characteristics, mechanisms, or objectives.",
    typicalMarks: [2, 3],
    samplePrompt:
      "Outline the circular flow of income in a closed economy without government. [2 marks]",
    strategyBlueprint: [
      "Point 1: Households provide factors of production (land, labor, capital, enterprise) to firms in exchange for factor payments (wages, rent, interest, profit).",
      "Point 2: Firms supply goods and services to households in exchange for consumer expenditure, creating a continuous closed loop between real flows and monetary flows.",
    ],
    commonMistakes:
      "Going into excessive detail about leakages and injections when the question specifies a closed economy with no government.",
    highYieldPhrases: [
      "The essential features include...",
      "Firstly... and secondly, the corresponding monetary flow consists of...",
    ],
  },
];
