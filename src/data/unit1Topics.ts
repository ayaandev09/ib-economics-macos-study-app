import { TopicData } from "./types";

export const UNIT_1_TOPICS: TopicData[] = [
  {
    id: "u1-1",
    unitId: "unit-1",
    unitNumber: 1,
    topicCode: "1.1",
    displayCode: "U1.1",
    syllabusRef: "IB Guide 1.1 / Course Notes 1.1 / Slides Unit 1.1",
    title: "What is Economics? Scarcity, Choice & The PPF",
    subtitle: "The Fundamental Economic Problem, Opportunity Cost, Factors of Production & PPC Dynamics",
    level: "SL / HL",
    strategicImportance: "CORE FOUNDATION",
    readingTimeMinutes: 7,
    summary:
      "Economics is the social science studying how individuals, firms, and societies allocate scarce resources with alternative uses to satisfy unlimited human wants and needs. Every choice incurs an opportunity cost—the value of the next best alternative forgone. The Production Possibility Frontier (PPF/PPC) illustrates scarcity, productive efficiency, trade-offs, and economic growth.",
    speedReadBullets: [
      "Fundamental Economic Problem: Human wants and needs are infinite, but productive resources are finite and scarce.",
      "Four Factors of Production: Land (rent), Labour (wages), Capital (interest), Enterprise (profit).",
      "Opportunity Cost: The value of the next best alternative sacrificed when an economic choice is made.",
      "Free Goods vs Economic Goods: Free goods have zero opportunity cost and infinite abundance (e.g., air, sunlight); economic goods are scarce, have an opportunity cost, and command a price.",
      "Three Core Economic Questions: What to produce, How to produce, and For Whom to produce.",
      "PPF Dynamics: Points inside the curve indicate productive inefficiency / unemployed resources; points on the curve represent productive efficiency; points outside are currently unattainable without economic growth (outward shift via increased quantity/quality of FOPs or technological innovation).",
      "PPF Curvature: Concave (bowed-out) curve reflects the law of increasing opportunity costs because factors of production are not perfectly adaptable to alternative uses.",
    ],
    primer5Min:
      "Start with the core conflict: unlimited wants vs scarce resources. This forces choice, which creates opportunity cost. When drawing the PPF, remember: moving along the curve demonstrates actual choice and opportunity cost; moving from inside to the curve represents reducing unemployment (actual growth); shifting the entire curve outward represents expanding potential capacity (long-term growth). In exams, always define opportunity cost precisely—not just 'a trade-off', but 'the next best alternative forgone'.",
    subSections: [
      {
        id: "u1-1-s1",
        title: "The Nature of Scarcity & The Four Factors of Production",
        marker: "Foundational Mechanics",
        content:
          "Scarcity is the condition where available productive resources cannot satisfy all human desires. Productive resources are categorized into four Factors of Production (FOPs): 1. Land: All natural gifts of nature (minerals, agricultural land, water, oil). 2. Labour: The physical and mental human effort exerted in production. 3. Capital: Man-made durable goods used to produce other goods (factories, machinery, computing infrastructure). 4. Enterprise: The human skill that combines the other three FOPs, takes financial and commercial risks, and drives innovation.",
        analyticalTakeaway:
          "High-scoring students explicitly connect each factor of production to its corresponding factor payment: Land earns Rent; Labour earns Wages; Capital earns Interest; Enterprise earns Profit.",
        keyFormulaOrFramework: "Income = Rent + Wages + Interest + Profit",
      },
      {
        id: "u1-1-s2",
        title: "Opportunity Cost, Free Goods & Economic Goods",
        marker: "Choice & Cost",
        content:
          "Because resources are finite, choosing to produce or consume one good directly denies society the benefits of another. Opportunity cost is defined as the value of the next best alternative forgone. Economic goods are scarce, require productive resources, have an opportunity cost, and command a market price. In contrast, Free Goods are naturally abundant (sunlight, ambient air, open sea water), require zero factor inputs to exist, and possess zero opportunity cost.",
        analyticalTakeaway:
          "Environmental resources like clean drinking water or unpolluted air have transitioned from free goods to economic goods due to pollution and overconsumption, creating critical market failure dilemmas.",
      },
      {
        id: "u1-1-s3",
        title: "The Production Possibility Frontier (PPF / PPC)",
        marker: "Diagrammatic Engine",
        content:
          "The PPF illustrates the maximum combinations of two goods or services an economy can produce when all resources are fully and efficiently employed with prevailing technology. Points along the boundary are productively efficient. Points inside denote resource misallocation or unemployment. Points outside are currently unattainable. The gradient of the PPF represents the marginal rate of transformation (opportunity cost). Increasing opportunity costs result in a concave curve due to imperfect factor substitutability.",
        analyticalTakeaway:
          "Distinguish clearly between Actual Growth (moving from a point inside the PPF toward the boundary, driven by increased aggregate demand) and Potential Growth (an outward shift of the entire boundary, driven by investment in capital, technology, or labor quality).",
        diagramRef: "diag-ppf",
      },
      {
        id: "u1-1-s4",
        title: "The Three Fundamental Economic Questions & Resource Allocation",
        marker: "Economic Systems",
        content:
          "Every society must resolve three foundational questions: 1. What to produce and in what quantities? 2. How to produce (capital-intensive vs labor-intensive techniques)? 3. For whom to produce (how national output is distributed among households)? Free market economies allocate resources through the price mechanism (decentralized consumer sovereignty). Command economies allocate resources via central government planning. Mixed economies combine private market incentives with state intervention to correct market failures.",
        analyticalTakeaway:
          "Most modern economies are mixed economies; the ongoing debate between economists focuses on the optimal degree of government intervention rather than an absolute binary choice.",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-1-1-1",
        question: "Explain why the Production Possibility Frontier is typically bowed outward (concave to the origin) rather than a straight line.",
        promptType: "explain",
        hints: ["Think about factor adaptability", "Can all farm workers build semiconductor chips immediately?"],
        modelAnswer:
          "The PPF is concave to the origin because of the Law of Increasing Opportunity Costs. Factors of production are not perfectly adaptable or specialized for all productive tasks. As an economy shifts more resources into producing one good (e.g., manufactured laptops), it must reassign resources that were increasingly better suited to the other good (e.g., agricultural wheat). Thus, progressively larger amounts of the alternative good must be sacrificed for each additional unit of the first good.",
        keyTermsToInclude: ["Law of Increasing Opportunity Cost", "Factor Specialization", "Imperfect Factor Substitutability", "Marginal Rate of Transformation"],
      },
      {
        id: "cu-1-1-2",
        question: "Distinguish between actual economic growth and potential economic growth using a PPF diagram.",
        promptType: "diagram-check",
        hints: ["Point movement vs boundary shift", "Spare capacity vs supply capacity"],
        modelAnswer:
          "Actual economic growth is represented by a movement from an inefficient point inside the PPF towards the curve boundary, indicating greater utilization of previously idle or unemployed resources. Potential economic growth is represented by an outward shift of the entire PPF boundary, signifying an increase in the productive capacity of the economy due to an increase in the quantity or quality of the factors of production (e.g., technological breakthrough, capital investment, or expanded skilled labor force).",
        keyTermsToInclude: ["Actual Growth", "Potential Growth", "Idle Resources", "Productive Capacity", "Outward Shift"],
      },
    ],
    analysis: {
      coreThesis:
        "All economic theory originates from scarcity. Without scarcity, choices carry zero cost, prices become redundant, and resource allocation mechanisms are unnecessary.",
      theoreticalFoundations:
        "Rooted in classical scarcity doctrine, Lionel Robbins' 1932 definition of economics as the study of scarce resources with alternative uses, and production frontier modeling by Vilfredo Pareto.",
      strategicEvaluationAO3AO4:
        "Evaluating economic systems requires balancing the productive efficiency and dynamism of free-market incentives against the equity, merit good provision, and stability ensured by government intervention.",
      commonMisconceptions: [
        "Confusing money with capital: In economics, capital refers strictly to physical machinery, tools, and infrastructure used to produce goods, not paper financial assets.",
        "Assuming a point inside the PPF means zero production: An inside point means production is occurring, but the economy has unemployed resources or productive inefficiency.",
      ],
      realWorldConnections:
        "Cape Town 'Day Zero' Water Crisis (2018): Severe drought forced strict municipal limits of 50 litres/person/day, dramatically illustrating water transitioning from a near-free good to an acutely scarce economic good requiring stringent non-price rationing.",
      keyDiagrams: ["Production Possibility Frontier (PPF)", "Actual vs Potential Growth"],
    },
    cases: [
      {
        id: "case-1-1-1",
        title: "Cape Town 'Day Zero' Drought Crisis",
        countryOrContext: "South Africa (2018)",
        realWorldMechanism:
          "Dam reservoirs dropped below 20% capacity due to a multi-year drought. The municipal government instituted emergency water quotas (50 litres/day), tariffs, and awareness campaigns to prevent taps being shut off.",
        concepts: ["scarcity", "intervention", "sustainability", "choice"],
        syllabusLink: "1.1 Scarcity, Free vs Economic Goods, and Non-Price Rationing",
        evaluationAO3AO4:
          "Highlights that even fundamental survival resources become scarce economic goods under climate shocks. Market-price rationing alone would have priced out low-income households, necessitating state-mandated consumption rationing.",
      },
      {
        id: "case-1-1-2",
        title: "Post-War Capital Reallocation in Germany (Wirtschaftswunder)",
        countryOrContext: "Germany (1950s)",
        realWorldMechanism:
          "Massive capital reinvestment under the Marshall Plan and social market economy shifted Germany's PPF outward through aggressive vocational education and industrial tooling.",
        concepts: ["choice", "efficiency", "change"],
        syllabusLink: "1.1 Potential Economic Growth & PPF Outward Shifts",
        evaluationAO3AO4:
          "Demonstrates how prioritizing capital goods over immediate consumer goods expands long-run productive capacity, at the expense of short-term consumption.",
      },
    ],
    conceptTracking: [
      {
        conceptId: "scarcity",
        intensity: 5,
        manifestation: "The central premise of the unit: finite factors of production confront infinite human wants.",
      },
      {
        conceptId: "choice",
        intensity: 5,
        manifestation: "Deciding resource allocation between consumer goods and capital goods along the PPF.",
      },
      {
        conceptId: "efficiency",
        intensity: 4,
        manifestation: "Operating on the frontier boundary achieves productive efficiency; choice of point determines allocative efficiency.",
      },
      {
        conceptId: "sustainability",
        intensity: 3,
        manifestation: "Current resource depletion can contract future PPF boundaries if natural capital is degraded.",
      },
    ],
    examPromptTakeaway:
      "Paper 1 essays frequently ask students to evaluate how an economy resolves the fundamental economic problem or to use a PPF diagram to distinguish actual growth from potential growth.",
    examBlueprint: {
      paper1EssayPrompt:
        "Explain how the fundamental economic problem forces individuals and societies to make choices, and evaluate whether a free market system allocates scarce resources more efficiently than a mixed economy. [15 marks]",
      commandTerm: "Evaluate",
      deeedStructure: {
        define: "Define Scarcity, Factors of Production, Opportunity Cost, and Free Market vs Mixed Economy.",
        explain: "Explain how price signals (Adam Smith's invisible hand) allocate resources to highest-value uses, and contrast with market failures where government intervention is required.",
        exemplify: "Reference Cape Town water rationing (non-market intervention) vs Singapore's market-based dynamic road pricing.",
        diagram: "Draw a concave PPF diagram showing consumer goods vs capital goods, illustrating opportunity cost, inefficiency, and an outward shift representing potential growth.",
      },
      slapEvaluation: {
        stakeholders: "Consumers enjoy choice and dynamic efficiency under free markets; low-income households suffer if basic merit goods (health, water) are solely price-rationed.",
        longShortTerm: "Free markets drive rapid short-run innovation and profit; mixed economies ensure long-term sustainability, infrastructure, and human capital.",
        assumptions: "Assumes consumer rationality, perfect information, and zero external costs in free markets—assumptions that fail in the real world.",
        priorities: "Governments must prioritize mixed-market intervention for public goods, common pool resources, and healthcare while preserving competitive market mechanisms.",
      },
    },
    diagramIds: ["diag-ppf"],
  },
  {
    id: "u1-2",
    unitId: "unit-1",
    unitNumber: 1,
    topicCode: "1.2",
    displayCode: "U1.2",
    syllabusRef: "IB Guide 1.2 / Course Notes 1.2 / Slides Unit 1.2",
    title: "How do Economists Approach the World? Methodology & Models",
    subtitle: "Positive vs Normative Economics, Ceteris Paribus, Circular Flow & Behavioural Economics",
    level: "SL / HL",
    strategicImportance: "CORE FOUNDATION",
    readingTimeMinutes: 6,
    summary:
      "Economists construct simplified visual and mathematical models to examine complex human interactions. Economic methodology separates testable factual statements (positive economics) from value judgments (normative economics). The assumption of ceteris paribus ('all other things being equal') isolates cause and effect. The circular flow of income models macro transactions between households and firms. Modern behavioural economics challenges traditional assumptions of rational consumer utility maximization.",
    speedReadBullets: [
      "Positive Economics: Objective, evidence-based, testable statements about 'what is'. Can be verified or refuted using empirical data.",
      "Normative Economics: Subjective value judgments, opinions, and ethical assertions about 'what ought to be'. Cannot be tested or refuted by data alone.",
      "Ceteris Paribus: Latin for 'all other things remaining equal'. Essential modeling technique to isolate the relationship between two specific variables while holding other influences constant.",
      "Circular Flow of Income (2-Sector): Households own factors of production and supply them to firms; firms pay factor incomes (wages, rent, interest, profits). Households spend income on goods and services (consumption); firms supply goods and services.",
      "Circular Flow Injections & Leakages (Open Economy): Leakages = Savings (S) + Taxes (T) + Imports (M). Injections = Investment (I) + Government Spending (G) + Exports (X). Equilibrium occurs when Leakages = Injections.",
      "Traditional Economic Theory: Assumes 'Homo Economicus'—rational economic agents acting with perfect information to maximize individual self-interest (consumers maximize utility, firms maximize profit).",
      "Behavioural Economics: Highlights that real humans exhibit bounded rationality, bounded willpower, bounded self-interest, cognitive heuristics, framing effects, and loss aversion. Gives rise to 'nudge theory'.",
    ],
    primer5Min:
      "Watch for command terms: if an essay asks you to 'distinguish between positive and normative economics', immediately provide paired examples (Positive: 'A 10% tax on cigarettes raises government revenue by $2B'; Normative: 'The government should raise cigarette taxes because smoking is immoral'). For the circular flow model, memorize the golden macroeconomic equilibrium: S + T + M = I + G + X. If injections exceed leakages, national income expands.",
    subSections: [
      {
        id: "u1-2-s1",
        title: "Positive vs Normative Economics",
        marker: "Scientific Method",
        content:
          "Positive economics deals with objective facts, empirical hypotheses, and verifiable causal mechanisms. It does not mean the statement is automatically true, but that it is testable against observational data (e.g., 'An increase in minimum wage from $10 to $15 will cause teen unemployment to rise by 3%'). Normative economics involves subjective value judgments, moral philosophy, and political priorities (e.g., 'The minimum wage should be $15 because every full-time worker deserves a living wage').",
        analyticalTakeaway:
          "Economists use positive analysis to predict consequences of policies, but final policy choices are inherently normative decisions made by elected governments.",
      },
      {
        id: "u1-2-s2",
        title: "Economic Modeling & The Ceteris Paribus Assumption",
        marker: "Analytical Framework",
        content:
          "Real economies are massively complex, dynamic systems with millions of simultaneous interactions. Economists construct stylized models (such as demand and supply curves) by imposing the ceteris paribus assumption. By holding all other non-price variables constant, economists isolate the pure relationship between price and quantity. While criticized for oversimplification, models provide predictive power and theoretical clarity.",
        analyticalTakeaway:
          "When an exogenous factor shifts (such as consumer income or input costs), the ceteris paribus assumption is relaxed, resulting in a shift of the entire curve rather than a movement along it.",
      },
      {
        id: "u1-2-s3",
        title: "The Circular Flow of Income: Two-Sector & Open Macro Economy",
        marker: "Macroeconomic Circuit",
        content:
          "The circular flow model represents national economic interdependence. In a simple two-sector closed economy: Households provide Factors of Production (Land, Labour, Capital, Enterprise) to Firms, and Firms supply finished Goods and Services to Households. In return, Firms pay Factor Income (Wages, Rent, Interest, Profit) to Households, who generate Consumer Expenditure. In an open economy with government and financial sectors, Leakages (Savings S, Taxes T, Imports M) pull funds out of the income stream, while Injections (Investment I, Government Spending G, Exports X) inject funds back.",
        analyticalTakeaway:
          "National Income expands when Injections > Leakages (I + G + X > S + T + M) and contracts when Leakages > Injections.",
        diagramRef: "diag-circular-flow",
      },
      {
        id: "u1-2-s4",
        title: "Rational Consumer Theory vs Behavioural Economics & Nudges",
        marker: "Modern Methodology",
        content:
          "Neoclassical economics rests on the axiom of rational consumer utility maximization and perfect information. However, empirical work by Daniel Kahneman, Amos Tversky, and Richard Thaler demonstrated that humans suffer from Bounded Rationality (computational limits), Bounded Willpower (present bias/procrastination), and Bounded Self-Interest (fairness/altruism). Governments deploy 'Nudges' (choice architecture) to steer consumer behavior toward socially desirable choices without forbidding any options (e.g., default opt-out organ donation, calorie labels on menus).",
        analyticalTakeaway:
          "Behavioural nudges offer low-cost policy interventions that preserve individual freedom of choice while overcoming cognitive biases.",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-1-2-1",
        question: "Identify whether the following statements are positive or normative, and explain why: (a) 'Cutting corporation tax from 25% to 19% will increase foreign direct investment by 8%.' (b) 'Wealthy individuals ought to pay at least 50% income tax to promote a fair society.'",
        promptType: "explain",
        hints: ["Is it factual/testable or an opinion?", "Look for words like 'ought' or 'should'"],
        modelAnswer:
          "Statement (a) is POSITIVE because it is a testable, empirical hypothesis regarding cause and effect; its truth can be verified or refuted with statistical economic data. Statement (b) is NORMATIVE because it contains an ethical value judgment ('ought to', 'fair society') reflecting a moral belief that cannot be scientifically falsified.",
        keyTermsToInclude: ["Positive Statement", "Normative Statement", "Empirical Testability", "Value Judgment"],
      },
      {
        id: "cu-1-2-2",
        question: "Explain what happens to national income when total leakages (S + T + M) exceed total injections (I + G + X) in the circular flow of income.",
        promptType: "explain",
        hints: ["Money leaves the income circuit", "What happens to firm revenue and hiring?"],
        modelAnswer:
          "When leakages exceed injections (S + T + M > I + G + X), more money is withdrawn from the circular flow than is being injected back. As a result, aggregate expenditure on domestic goods and services decreases. Firms face falling sales revenue and build up unsold inventory, prompting them to cut production and lay off workers. Consequently, factor payments (wages, rent, interest, profits) fall, leading to a contraction in total national income until leakages and injections restore equilibrium at a lower level of economic activity.",
        keyTermsToInclude: ["Leakages", "Injections", "Circular Flow Contraction", "National Income", "Factor Incomes"],
      },
    ],
    analysis: {
      coreThesis:
        "Economic knowledge is not static dogmatism but a dynamic discipline blending empirical quantitative modeling (positive science) with ethical philosophy (normative governance) and behavioral psychology.",
      theoreticalFoundations:
        "Spans the classical methodology of Adam Smith, Karl Marx's critique of capitalist ownership, John Maynard Keynes' aggregate demand circular flow, Milton Friedman's positive methodology, and Thaler & Sunstein's nudge architecture.",
      strategicEvaluationAO3AO4:
        "While traditional mathematical models provide elegant equilibrium solutions, their failure during systemic crises (like the 2008 financial crash) highlighted the dangerous over-reliance on the assumption of perfectly rational markets.",
      commonMisconceptions: [
        "Thinking positive statements must be factually true: A statement like 'Inflation is caused exclusively by aliens' is a positive statement because it is empirically testable (and readily disproven).",
        "Confusing behavioral nudges with regulatory bans: A nudge alters the environment to make the healthier choice easier (e.g., fruit at eye level) but leaves junk food available to purchase.",
      ],
      realWorldConnections:
        "UK 'Nudge Unit' (Behavioural Insights Team): Increased annual tax collection by over £200 million by simply rephrasing tax reminder letters to state: '9 out of 10 people in your local town pay their taxes on time', leveraging social proof bias.",
      keyDiagrams: ["Circular Flow of Income (2-Sector & Open Economy)"],
    },
    cases: [
      {
        id: "case-1-2-1",
        title: "The UK Behavioural Insights Team (Nudge Unit)",
        countryOrContext: "United Kingdom (2010–present)",
        realWorldMechanism:
          "Used behavioral economics insights (social proof, default options, simplification) to boost organ donation registration, pension enrollment, and tax payment compliance without passing coercive laws.",
        concepts: ["choice", "intervention", "efficiency"],
        syllabusLink: "1.2 Behavioural Economics, Nudge Theory & Choice Architecture",
        evaluationAO3AO4:
          "Demonstrates how low-cost psychological tweaks achieve significant policy outcomes at a fraction of the cost of enforcement, though critics debate whether nudges are subtly paternalistic.",
      },
    ],
    conceptTracking: [
      {
        conceptId: "choice",
        intensity: 5,
        manifestation: "Examining how humans actually make choices versus how neoclassical models predict they choose.",
      },
      {
        conceptId: "interdependence",
        intensity: 5,
        manifestation: "The circular flow model proves the complete domestic and international interdependence of households, firms, banks, and governments.",
      },
      {
        conceptId: "intervention",
        intensity: 4,
        manifestation: "Using normative policymaking and behavioral nudges to steer economic activity.",
      },
    ],
    examPromptTakeaway:
      "Essential for framing Paper 1 introductions: clearly classifying terms as positive or normative demonstrates high academic rigor.",
    examBlueprint: {
      paper1EssayPrompt:
        "Using the circular flow of income model, explain how an increase in leakages relative to injections affects national income, and evaluate whether governments should rely on market forces or government intervention to restore equilibrium. [15 marks]",
      commandTerm: "Evaluate",
      deeedStructure: {
        define: "Define Circular Flow of Income, Injections (I, G, X), Leakages (S, T, M), and National Income.",
        explain: "Explain the multiplier effect and how S+T+M > I+G+X reduces aggregate demand, forcing firms to contract output and lower factor incomes.",
        exemplify: "Reference the 2008 recession where consumer savings surged (leakage) and investment collapsed, requiring fiscal stimulus (injection).",
        diagram: "Draw a clean circular flow diagram showing households, firms, leakages, and injections.",
      },
      slapEvaluation: {
        stakeholders: "Unemployed workers suffer from reduced household income; governments face declining tax revenues and surging welfare claims.",
        longShortTerm: "In the short term, market forces adjust slowly due to wage stickiness; intervention can provide rapid injection, though accumulating debt in the long term.",
        assumptions: "Assumes classical price-wage flexibility can restore full employment without intervention—a premise strongly refuted by Keynes.",
        priorities: "Intervention is essential during sharp contractions to avert downward deflationary spirals.",
      },
    },
    diagramIds: ["diag-circular-flow"],
  },
];
