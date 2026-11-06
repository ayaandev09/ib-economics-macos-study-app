import { TopicData } from "./types";

export const UNIT_2_TOPICS: TopicData[] = [
  {
    id: "u2-1",
    unitId: "unit-2",
    unitNumber: 2,
    topicCode: "2.1",
    displayCode: "U2.1",
    syllabusRef: "IB Guide 2.1 / Course Notes 2.1 / Slides Unit 2.1",
    title: "Demand: The Law of Demand & Non-Price Determinants",
    subtitle: "Individual vs Market Demand, Income & Substitution Effects & PASIFIC Shifts",
    level: "SL / HL",
    strategicImportance: "HIGH-YIELD MICRO",
    readingTimeMinutes: 7,
    summary:
      "Demand is the quantity of a good or service that consumers are willing and able to purchase at various prices over a given time period, ceteris paribus. The Law of Demand states that price and quantity demanded have an inverse relationship. A change in price causes a movement along the curve (expansion or contraction), whereas changes in non-price determinants (PASIFIC) cause a complete shift of the demand curve.",
    speedReadBullets: [
      "Law of Demand: As price rises, quantity demanded falls; as price falls, quantity demanded rises, ceteris paribus (inverse relationship).",
      "Why Demand Curves Slope Downwards: 1. Law of Diminishing Marginal Utility (utility falls with each additional unit consumed, so consumers will only buy more at lower prices); 2. Income Effect (lower price increases real purchasing power); 3. Substitution Effect (lower price makes good relatively cheaper than alternatives).",
      "Movement Along vs Shift of Curve: A change in the good's OWN PRICE causes a movement along the demand curve (change in quantity demanded). A change in any NON-PRICE determinant shifts the entire demand curve (change in demand).",
      "Non-Price Determinants of Demand (PASIFIC): Population (demographics), Advertising & branding, Substitutes (price of alternative goods), Income (normal vs inferior goods), Fashion & tastes, Interest rates (credit availability), Complements (goods consumed together).",
      "Normal Goods vs Inferior Goods: Demand for normal goods increases as consumer income rises; demand for inferior goods (e.g. instant noodles, public buses) decreases as income rises.",
      "Substitutes vs Complements: An increase in the price of Good A increases demand for substitute Good B. An increase in the price of Good A decreases demand for complement Good C.",
    ],
    primer5Min:
      "The single most common mistake in IB Economics: confusing 'change in quantity demanded' (movement along the curve caused solely by a change in the good's own price) with a 'change in demand' (shift of the curve caused by non-price factors). Memorize PASIFIC: Population, Advertising, Substitutes, Income, Fashion, Interest rates, Complements. When drawing shifts, always label initial curve D1, new curve D2, and draw directional arrows.",
    subSections: [
      {
        id: "u2-1-s1",
        title: "The Law of Demand & Downward Slope Mechanics",
        marker: "Core Principle",
        content:
          "Demand reflects effective demand—desire backed by the ability to pay. The negative gradient of the demand curve is explained through three complementary economic principles: 1. The Law of Diminishing Marginal Utility: each successive unit of a good consumed provides less additional satisfaction (marginal utility) than the previous unit, meaning a rational consumer will only purchase additional units if the price declines; 2. The Substitution Effect: when price falls, the good becomes relatively more attractive than alternative substitutes; 3. The Income Effect: a price decrease expands consumers' real disposable purchasing power, allowing them to purchase more with the same nominal budget.",
        analyticalTakeaway:
          "For normal goods, both the income and substitution effects reinforce each other, driving a downward-sloping demand curve.",
      },
      {
        id: "u2-1-s2",
        title: "Movement Along vs Shifts of the Demand Curve",
        marker: "Graphical Precision",
        content:
          "A change in the price of the good itself results in a movement along the demand curve: a price fall leads to an expansion of demand, while a price rise leads to a contraction of demand. Conversely, when any non-price factor alters consumer willingness or ability to purchase, the entire curve shifts: a rightward shift represents an increase in demand (higher quantity at every price), and a leftward shift represents a decrease in demand (lower quantity at every price).",
        analyticalTakeaway:
          "Always state 'movement along the curve' when discussing price mechanisms or taxes passed on to price, and 'shift of the curve' when discussing external shocks.",
        diagramRef: "diag-demand-shifts",
      },
      {
        id: "u2-1-s3",
        title: "Non-Price Determinants of Demand (PASIFIC)",
        marker: "Exogenous Drivers",
        content:
          "Non-price determinants shift the market demand schedule: 1. Population: demographic growth expands total market size; 2. Advertising: successful campaigns shift consumer tastes rightward; 3. Substitutes: a price increase in Pepsi shifts Coca-Cola demand right; 4. Income: normal goods shift right with income; inferior goods shift left; 5. Fashion & Preferences: health trends, seasonal shifts, cultural trends; 6. Interest Rates: lower borrowing rates stimulate demand for credit-financed goods (automobiles, homes); 7. Complements: higher prices for gaming consoles reduce demand for video games.",
        analyticalTakeaway:
          "When analyzing real-world data responses, always specify whether the good is a normal good or inferior good before predicting the impact of GDP fluctuations.",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-2-1-1",
        question: "A popular coffee chain reduces the price of its lattes from $5.00 to $3.50. Concurrently, a rival chain launches an aggressive advertising campaign. Explain the distinct graphical effects on the demand curve for the first chain's lattes.",
        promptType: "explain",
        hints: ["Price change vs non-price competitor action", "Movement vs shift"],
        modelAnswer:
          "The reduction in latte price from $5.00 to $3.50 causes a downward movement along the existing demand curve, resulting in an expansion of quantity demanded (not a shift of the curve). Simultaneously, the rival chain's advertising campaign shifts consumer preferences away from the first chain, acting as a non-price determinant (competitor substitute) that shifts the first chain's entire demand curve to the left (a decrease in demand). The final market quantity depends on the relative magnitude of the price expansion versus the advertising leftward shift.",
        keyTermsToInclude: ["Movement along curve", "Expansion of quantity demanded", "Shift of demand curve", "Substitute Goods", "Non-price determinant"],
      },
    ],
    analysis: {
      coreThesis:
        "Demand reflects the willingness and ability of consumers to allocate scarce financial resources based on diminishing marginal utility and relative price incentives.",
      theoreticalFoundations:
        "Developed through Alfred Marshall's marginal utility synthesis (1890) and Hicks-Allen indifference curve decomposition of income and substitution effects.",
      strategicEvaluationAO3AO4:
        "Firms and governments must accurately assess whether consumer responses stem from price sensitivity or non-price preference shifts to avoid mispricing products or drafting ineffective tax policies.",
      commonMisconceptions: [
        "Confusing 'demand' with 'quantity demanded': Demand refers to the entire schedule/curve; quantity demanded is a specific numerical point corresponding to a given price.",
        "Assuming all goods have positive income elasticity: Inferior goods experience demand contractions when consumer incomes rise.",
      ],
      realWorldConnections:
        "Apple iPhone Product Launches: Apple uses brand differentiation and complementary ecosystem lock-in (iCloud, Apple Watch) to shift the entire demand curve rightward, enabling premium pricing while maintaining high sales volumes.",
      keyDiagrams: ["Demand Curve & Shifts (PASIFIC)", "Income and Substitution Effects"],
    },
    cases: [
      {
        id: "case-2-1-1",
        title: "Apple iPhone Ecosystem Demand Shock",
        countryOrContext: "Global Electronics Market",
        realWorldMechanism:
          "Through heavy advertising, closed ecosystem complementary services, and continuous feature updates, Apple permanently shifts its demand curve rightward and renders it more price-inelastic.",
        concepts: ["choice", "change", "interdependence"],
        syllabusLink: "2.1 Non-Price Determinants of Demand (Advertising & Complements)",
        evaluationAO3AO4:
          "Demonstrates how powerful non-price determinants allow a firm to raise prices without suffering significant contractions in quantity demanded.",
      },
    ],
    conceptTracking: [
      {
        conceptId: "choice",
        intensity: 5,
        manifestation: "Consumers make choices based on relative prices and marginal utility.",
      },
      {
        conceptId: "change",
        intensity: 4,
        manifestation: "Shifts in consumer income, tastes, and technology continually transform demand curves.",
      },
      {
        conceptId: "interdependence",
        intensity: 4,
        manifestation: "Interdependence between substitute goods and complementary goods in modern consumer markets.",
      },
    ],
    examPromptTakeaway:
      "A frequent Paper 1 Part (a) question: 'Distinguish between a movement along a demand curve and a shift of a demand curve, using examples.'",
    examBlueprint: {
      paper1EssayPrompt:
        "Explain how the law of demand illustrates the relationship between price and quantity demanded, and distinguish between a movement along the demand curve and a shift of the demand curve. [10 marks]",
      commandTerm: "Explain",
      deeedStructure: {
        define: "Define Law of Demand, Effective Demand, and Ceteris Paribus.",
        explain: "Explain diminishing marginal utility, income effect, and substitution effect. Contrast price-induced movements with non-price shifts (PASIFIC).",
        exemplify: "Use an example of an airline ticket discount (movement along) vs rising household disposable income (shift right).",
        diagram: "Draw a demand diagram showing a price cut from P1 to P2 with a downward movement along D1, and a secondary curve D2 showing an outward shift.",
      },
      slapEvaluation: {
        stakeholders: "N/A for 10-mark explanation questions; focus on technical precision and step-by-step diagrammatic exposition.",
        longShortTerm: "Short-run price changes trigger immediate movements; long-run demographic and preference shifts alter the entire demand structure.",
        assumptions: "Assumes ceteris paribus holds; in reality, prices and non-price factors often change simultaneously.",
        priorities: "Precision in distinguishing 'quantity demanded' from 'demand' is critical for top markbands.",
      },
    },
    diagramIds: ["diag-demand-shifts"],
  },
  {
    id: "u2-2",
    unitId: "unit-2",
    unitNumber: 2,
    topicCode: "2.2",
    displayCode: "U2.2",
    syllabusRef: "IB Guide 2.2 / Course Notes 2.2 / Slides Unit 2.2",
    title: "Supply: The Law of Supply & Non-Price Determinants",
    subtitle: "Diminishing Marginal Returns, Increasing Marginal Costs & PINTS WC Supply Shifts",
    level: "SL / HL",
    strategicImportance: "HIGH-YIELD MICRO",
    readingTimeMinutes: 7,
    summary:
      "Supply represents the quantity of a good or service that producers are willing and able to offer for sale at various prices over a given time period, ceteris paribus. The Law of Supply states that price and quantity supplied share a direct (positive) relationship. An increase in price creates a profit incentive, motivating firms to expand output despite facing rising marginal costs. Non-price determinants of supply (PINTS WC) shift the entire supply curve.",
    speedReadBullets: [
      "Law of Supply: As price rises, quantity supplied increases; as price falls, quantity supplied decreases, ceteris paribus (direct positive relationship).",
      "Why Supply Curves Slope Upwards: Law of Diminishing Marginal Returns in the short run means adding variable factors of production to fixed capital eventually yields smaller increases in output, causing marginal costs of production to rise. Firms will only produce higher output if price rises to cover higher marginal costs.",
      "Movement Along vs Shift of Supply: A change in the good's OWN PRICE causes a movement along the supply curve (expansion or contraction of quantity supplied). A change in NON-PRICE determinants shifts the entire curve (increase or decrease in supply).",
      "Non-Price Determinants of Supply (PINTS WC): Productivity (worker/machine output), Indirect taxes, Number of firms in industry, Technology improvements, Subsidies from government, Weather & natural shocks, Costs of factors of production (wages, raw materials, energy).",
      "Joint Supply vs Competitive Supply: Joint supply occurs when producing one good automatically yields an output of another (e.g. beef and leather, crude oil and petrol). Competitive supply occurs when two goods compete for the same scarce resources (e.g. farmer allocating acreage between wheat and corn).",
    ],
    primer5Min:
      "Remember why the supply curve slopes upwards: it is identical to the firm's marginal cost (MC) curve above average variable cost! Because of diminishing returns, producing more units costs more per unit; therefore, firms require higher market prices to incentivize expanded production. When shifting supply curves, remember: a rightward shift is down and to the right (lower cost/higher supply), while a leftward shift is up and to the left (higher cost/lower supply).",
    subSections: [
      {
        id: "u2-2-s1",
        title: "The Law of Supply & Marginal Cost Foundation",
        marker: "Theoretical Engine",
        content:
          "The positive relationship between price and quantity supplied is driven by the profit motive. In the short run, at least one factor of production is fixed (e.g., factory size). According to the Law of Diminishing Marginal Returns, as successive units of variable inputs (labour) are added to fixed capital, marginal product eventually declines. Consequently, the marginal cost of producing each additional unit increases. Firms will only rationally expand production if the market price rises sufficiently to cover these escalating marginal costs.",
        analyticalTakeaway:
          "The competitive market supply curve is the horizontal summation of individual firms' marginal cost curves.",
      },
      {
        id: "u2-2-s2",
        title: "Movement Along vs Shifts of the Supply Curve",
        marker: "Graphical Mechanics",
        content:
          "A change in the market price of the good itself induces a movement along the supply curve: a higher price triggers an expansion of quantity supplied, whereas a lower price induces a contraction of quantity supplied. An exogenous change in any non-price production factor shifts the entire curve: a rightward shift represents an increase in supply (firms supply more at every price), while a leftward shift represents a decrease in supply (firms supply less at every price).",
        analyticalTakeaway:
          "Technological innovations and production subsidies always shift the supply curve down and to the right, lowering unit production costs.",
        diagramRef: "diag-supply-shifts",
      },
      {
        id: "u2-2-s3",
        title: "Non-Price Determinants of Supply (PINTS WC)",
        marker: "Supply Drivers",
        content:
          "Key determinants shifting the supply curve include: 1. Productivity: improvements in labor skills or automation reduce per-unit costs; 2. Indirect Taxes: imposition of excise duties or VAT increases marginal costs, shifting supply up and to the left; 3. Number of Firms: entry of new competitors expands market supply; 4. Technology: advances in robotics or software reduce input requirements; 5. Subsidies: government grants lower production costs, shifting supply right; 6. Weather/Shocks: droughts or floods devastate agricultural yields; 7. Costs of FOPs: wage increases, energy spikes, or raw material inflation reduce supply.",
        analyticalTakeaway:
          "Distinguish clearly between joint supply (an increase in cattle slaughter raises supply of both beef and leather) and competitive supply (a farmer planting more canola reduces acreage available for barley).",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-2-2-1",
        question: "Explain the difference between joint supply and competitive supply, providing an economic example of each.",
        promptType: "explain",
        hints: ["Byproducts vs competing for the same land/resources", "Beef & leather vs wheat & soybeans"],
        modelAnswer:
          "Joint supply occurs when two or more distinct goods are derived from a single production process or raw material input; producing more of one good inevitably increases the supply of the other byproduct (e.g., raising cattle jointly supplies beef and leather). Competitive supply occurs when two or more goods compete for the exact same scarce factors of production; allocating land, labour, or capital to produce more of Good A inevitably reduces the resources available to produce Good B, shifting Good B's supply curve to the left (e.g., an agricultural farmer choosing between cultivating wheat or corn on a fixed plot of land).",
        keyTermsToInclude: ["Joint Supply", "Competitive Supply", "Byproduct", "Scarce Resources", "Factor Allocation"],
      },
    ],
    analysis: {
      coreThesis:
        "Supply reflects the willingness and ability of profit-maximizing producers to incur increasing marginal costs to supply goods to the market.",
      theoreticalFoundations:
        "Grounded in classical cost theory, David Ricardo's diminishing returns in agriculture, and neoclassical profit-maximization conditions where firms produce where Price = Marginal Cost.",
      strategicEvaluationAO3AO4:
        "Supply shocks (such as geopolitical disruptions to energy supply or global container shortages) exert profound macroeconomic stagflationary pressures by shifting microeconomic supply curves leftward across numerous interdependent industries.",
      commonMisconceptions: [
        "Confusing a shift 'down' with a decrease in supply: A supply curve shifting vertically down actually represents an INCREASE in supply (it has shifted to the right, meaning lower cost/higher quantity).",
        "Assuming technology can shift supply to the left: Technological progress always improves efficiency and shifts supply to the right; only technological loss or obsolescence could shift it left.",
      ],
      realWorldConnections:
        "Global Semiconductor Supply Crunch (2021–2022): Supply disruptions caused by fab shutdowns in Taiwan and surging freight costs shifted the automotive supply curve sharply to the left, causing production cuts and sharp price surges for new and used vehicles.",
      keyDiagrams: ["Supply Curve & Shifts (PINTS WC)", "Joint and Competitive Supply"],
    },
    cases: [
      {
        id: "case-2-2-1",
        title: "Global Semiconductor Bottlenecks & Auto Assembly",
        countryOrContext: "Global Automotive Industry (2021–2022)",
        realWorldMechanism:
          "Severe microchip shortages and escalating silicon wafer costs shifted global vehicle manufacturing supply curves sharply to the left, forcing major automakers (Ford, Toyota) to cut output by millions of units.",
        concepts: ["scarcity", "interdependence", "change"],
        syllabusLink: "2.2 Non-Price Determinants of Supply (Costs of FOPs & Bottlenecks)",
        evaluationAO3AO4:
          "Illustrates how an acute shortage in a single critical intermediate factor of production creates severe supply constraints across massive interdependent industries.",
      },
    ],
    conceptTracking: [
      {
        conceptId: "scarcity",
        intensity: 5,
        manifestation: "Rising marginal costs reflect the increasing scarcity of adaptable factors of production.",
      },
      {
        conceptId: "change",
        intensity: 4,
        manifestation: "Technological innovation and factor cost fluctuations drive continuous shifts in supply curves.",
      },
      {
        conceptId: "efficiency",
        intensity: 4,
        manifestation: "Firms optimize factor combinations to produce at minimum marginal cost.",
      },
    ],
    examPromptTakeaway:
      "Paper 1 microeconomics prompts frequently require students to explain how an increase in factor costs or technological breakthrough affects market supply.",
    examBlueprint: {
      paper1EssayPrompt:
        "Explain the law of supply and discuss how an increase in energy prices and an improvement in production technology will impact the market supply of manufactured goods. [10 marks]",
      commandTerm: "Explain",
      deeedStructure: {
        define: "Define Law of Supply, Marginal Cost, Costs of Production, and Technology.",
        explain: "Explain why supply slopes upward (increasing marginal costs). Analyze how energy price hikes increase FOP costs (shifting S left) while technology lowers production costs (shifting S right).",
        exemplify: "Reference automotive manufacturing where rising electricity tariffs raise assembly costs, while automated robotic welding lowers per-unit labor costs.",
        diagram: "Draw a supply diagram showing an initial supply curve S1, a leftward shift to S2 (energy shock), and a subsequent rightward shift to S3 (automation).",
      },
      slapEvaluation: {
        stakeholders: "Producers face margin pressure if energy hikes dominate; consumers benefit if technological savings outweigh cost increases.",
        longShortTerm: "Energy cost spikes are often short-run shocks; technological improvements represent permanent long-run outward shifts in productive efficiency.",
        assumptions: "Assumes firms operate under profit-maximization and cannot fully absorb cost increases through profit margin compression.",
        priorities: "Clarity on opposing supply shift forces is essential for full marks.",
      },
    },
    diagramIds: ["diag-supply-shifts"],
  },
  {
    id: "u2-3",
    unitId: "unit-2",
    unitNumber: 2,
    topicCode: "2.3",
    displayCode: "U2.3",
    syllabusRef: "IB Guide 2.3 / Course Notes 2.3 / Slides Unit 2.3",
    title: "Competitive Market Equilibrium & Allocative Efficiency",
    subtitle: "Price Mechanism, Consumer & Producer Surplus & Total Welfare Maximization",
    level: "SL / HL",
    strategicImportance: "HIGH-YIELD MICRO",
    readingTimeMinutes: 8,
    summary:
      "Competitive market equilibrium is established where quantity demanded equals quantity supplied (Qd = Qs). At this market clearing price, there are no shortages or surpluses. The price mechanism operates via three interrelated functions: signaling, incentives, and rationing. Market equilibrium achieves allocative efficiency where Marginal Social Benefit equals Marginal Social Cost (MSB = MSC), maximizing total community surplus (consumer surplus + producer surplus).",
    speedReadBullets: [
      "Market Equilibrium: The state of balance where quantity demanded equals quantity supplied (Qd = Qs) at equilibrium price Pe and quantity Qe.",
      "Excess Demand (Shortage): Occurs when market price is below equilibrium (P < Pe). Consumers demand more than firms supply (Qd > Qs). Upward pressure on price.",
      "Excess Supply (Surplus): Occurs when market price is above equilibrium (P > Pe). Firms supply more than consumers demand (Qs > Qd). Downward pressure on price.",
      "The Three Functions of the Price Mechanism: 1. Signalling: Prices convey information about changing market conditions and relative scarcity; 2. Incentive: Price changes motivate self-interested buyers and sellers to change behaviour; 3. Rationing: Price rations scarce goods to those with the highest willingness and ability to pay.",
      "Consumer Surplus (CS): The difference between what consumers are willing and able to pay (demand curve) and what they actually pay (market price). Area below demand curve and above price.",
      "Producer Surplus (PS): The difference between what producers actually receive (market price) and the minimum price they are willing to accept to supply (supply curve). Area above supply curve and below price.",
      "Allocative Efficiency: Achieved when resources are allocated in the combination society values most, occurring where MB = MC (or MSB = MSC). At this point, Community Surplus (CS + PS) is strictly maximized with zero deadweight loss.",
    ],
    primer5Min:
      "When explaining the price mechanism in exams, follow the step-by-step transmission: 1. An exogenous event shifts a curve (e.g. demand increases); 2. At the original price P1, a shortage exists (Qd > Qs); 3. Shortage signals excess demand and incentivizes producers to raise price; 4. Higher price causes a contraction of demand and an expansion of supply until a new equilibrium P2, Q2 is reached. Remember: at equilibrium, Allocative Efficiency is achieved (MB = MC).",
    subSections: [
      {
        id: "u2-3-s1",
        title: "Equilibrium, Excess Demand & Excess Supply",
        marker: "Market Mechanics",
        content:
          "In a free competitive market without government intervention, price acts as an automatic equilibrating mechanism. If price is set above equilibrium, firms produce Qs exceeding Qd, creating excess supply (surplus); unsold inventory forces competing sellers to discount prices. If price is set below equilibrium, Qd exceeds Qs, creating excess demand (shortage); buyers compete for limited stock, bidding prices upward until Qd = Qs at the market clearing equilibrium.",
        analyticalTakeaway:
          "In mathematical HL/SL problems, set the linear demand equation Qd = a - bP equal to the linear supply equation Qs = c + dP to solve for equilibrium price Pe.",
        diagramRef: "diag-market-equilibrium",
      },
      {
        id: "u2-3-s2",
        title: "The Three Functions of the Price Mechanism",
        marker: "Invisible Hand",
        content:
          "Adam Smith's 'invisible hand' functions through three distinct mechanisms: 1. Signalling Function: A change in price signals to economic agents that market conditions have changed (e.g., a rising oil price signals resource scarcity); 2. Incentive Function: High prices incentivize profit-seeking entrepreneurs to allocate more capital and labor to producing the good, while incentivizing consumers to conserve; 3. Rationing Function: Because goods are scarce, prices rise to ration output exclusively to consumers who place the highest financial value on the product.",
        analyticalTakeaway:
          "High exam marks require explaining ALL THREE functions sequentially: Signalling -> Incentive -> Rationing.",
      },
      {
        id: "u2-3-s3",
        title: "Consumer Surplus, Producer Surplus & Allocative Efficiency",
        marker: "Welfare Economics",
        content:
          "Consumer Surplus (CS) is the net benefit enjoyed by consumers, represented by the triangular area below the demand curve and above the market equilibrium price. Producer Surplus (PS) is the net economic rent earned by firms, represented by the triangular area above the supply curve and below the market price. Total Community Surplus is the sum of CS and PS. In competitive equilibrium without market failure, Demand represents Marginal Social Benefit (MSB) and Supply represents Marginal Social Cost (MSC). Where MSB = MSC, allocative efficiency is achieved and total community surplus is maximized.",
        analyticalTakeaway:
          "Any intervention or market imperfection that moves output away from Qe (where MSB = MSC) reduces community surplus and generates Deadweight Welfare Loss.",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-2-3-1",
        question: "Using the concepts of signaling, incentives, and rationing, explain how the price mechanism restores equilibrium when an unexpected frost destroys half the Brazilian coffee crop.",
        promptType: "explain",
        hints: ["Supply shifts left", "Shortage at initial price", "Signaling higher scarcity", "Incentive to conserve/produce"],
        modelAnswer:
          "1. Frost destroys crops, shifting the supply curve of coffee to the left (S1 to S2). 2. At the original equilibrium price P1, quantity demanded exceeds the reduced quantity supplied, creating a severe shortage (excess demand). 3. The shortage SIGNALS to buyers and sellers that coffee beans have become acutely scarce. 4. Buyers bid up prices; the rising price provides an INCENTIVE for consumers to contract their quantity demanded and seek substitutes (tea, chicory), while incentivizing rival coffee farmers in Colombia or Vietnam to harvest more beans. 5. The rising price RATIONS the scarce coffee supply to those consumers with the highest willingness and ability to pay, until a new higher equilibrium price P2 and lower quantity Q2 are established where Qd = Qs.",
        keyTermsToInclude: ["Supply shift left", "Shortage / Excess demand", "Signaling function", "Incentive function", "Rationing function", "New equilibrium"],
      },
    ],
    analysis: {
      coreThesis:
        "The competitive market equilibrium price coordinates millions of decentralized decisions without central planning, achieving allocative efficiency by aligning marginal social benefit with marginal social cost.",
      theoreticalFoundations:
        "Rooted in Adam Smith's Wealth of Nations (1776), Leon Walras' general equilibrium theory, and Alfred Marshall's partial equilibrium scissors analysis.",
      strategicEvaluationAO3AO4:
        "While competitive equilibrium maximizes total community surplus, it completely ignores equity: goods are rationed by ability to pay, meaning impoverished households may be denied essential merit goods despite experiencing immense marginal utility.",
      commonMisconceptions: [
        "Equating allocative efficiency with equity: Allocative efficiency means community surplus is maximized, not that the distribution of output is fair or socially desirable.",
        "Confusing consumer surplus with consumer expenditure: Consumer expenditure is Price x Quantity; consumer surplus is the excess benefit above expenditure.",
      ],
      realWorldConnections:
        "Brazilian Frost & Global Coffee Markets: In 2021, severe frost in Minas Gerais destroyed over 20% of Brazil's Arabica crop. Coffee futures surged over 70% within weeks as the price mechanism rationed scarce beans globally and triggered production expansions in Colombia and Ethiopia.",
      keyDiagrams: ["Competitive Market Equilibrium & Surpluses", "Price Mechanism Shortage & Adjustment"],
    },
    cases: [
      {
        id: "case-2-3-1",
        title: "Brazil Frost Shock & Global Arabica Coffee Surges",
        countryOrContext: "Global Agricultural Commodity Markets (2021)",
        realWorldMechanism:
          "Unprecedented freezing temperatures destroyed coffee plantations across Brazil. The supply curve shifted left, creating an acute global shortage. Arabica coffee prices nearly doubled on the ICE exchange, signaling scarcity, rationing consumption, and incentivizing alternative origin shipments.",
        concepts: ["scarcity", "efficiency", "change", "interdependence"],
        syllabusLink: "2.3 Market Equilibrium & The Three Functions of the Price Mechanism",
        evaluationAO3AO4:
          "Demonstrates how volatile climate events trigger textbook price mechanism responses across global commodity supply chains.",
      },
    ],
    conceptTracking: [
      {
        conceptId: "efficiency",
        intensity: 5,
        manifestation: "Competitive equilibrium achieves allocative efficiency where MSB = MSC.",
      },
      {
        conceptId: "scarcity",
        intensity: 4,
        manifestation: "The rationing function of price resolves resource scarcity.",
      },
      {
        conceptId: "interdependence",
        intensity: 4,
        manifestation: "Consumer demand and producer supply jointly determine market clearing coordinates.",
      },
    ],
    examPromptTakeaway:
      "Essential foundation for all microeconomics essays. You must be able to draw consumer and producer surplus accurately and shade changes when policies are implemented.",
    examBlueprint: {
      paper1EssayPrompt:
        "Explain how the price mechanism allocates scarce resources in a competitive market, and evaluate whether competitive market equilibrium always leads to allocative efficiency. [15 marks]",
      commandTerm: "Evaluate",
      deeedStructure: {
        define: "Define Competitive Equilibrium, Allocative Efficiency (MB = MC), Consumer Surplus, and Producer Surplus.",
        explain: "Explain how signaling, incentives, and rationing clear shortages and surpluses to maximize community surplus. Contrast with market failures (externalities, public goods) where competitive markets fail.",
        exemplify: "Reference agricultural shocks (Brazil coffee) vs healthcare markets where competitive pricing excludes low-income citizens.",
        diagram: "Draw a standard demand and supply diagram showing equilibrium Pe, Qe, shaded Consumer Surplus (cyan), and Producer Surplus (emerald).",
      },
      slapEvaluation: {
        stakeholders: "Competitive markets reward productive firms and consumers with purchasing power; vulnerable low-income consumers face exclusion from essential goods.",
        longShortTerm: "Short-term equilibrium operates efficiently for private consumer goods, but fails over the long term when external environmental costs are ignored.",
        assumptions: "Assumes perfect competition, zero transaction costs, perfect information, and absence of externalities—conditions rarely met in reality.",
        priorities: "Governments must preserve price signals for private goods while intervening in markets with significant externalities or public good characteristics.",
      },
    },
    diagramIds: ["diag-market-equilibrium"],
  },
  {
    id: "u2-4",
    unitId: "unit-2",
    unitNumber: 2,
    topicCode: "2.4",
    displayCode: "U2.4",
    syllabusRef: "IB Guide 2.4–2.5 / Course Notes 2.5 / Slides Unit 2.5",
    title: "Elasticities of Demand: PED, YED & Total Revenue",
    subtitle: "Price Elasticity, Income Elasticity, Cross-Price Elasticity & The Revenue Matrix",
    level: "SL / HL",
    strategicImportance: "HIGH-YIELD MICRO",
    readingTimeMinutes: 8,
    summary:
      "Elasticity measures the responsiveness of one economic variable to a change in another. Price Elasticity of Demand (PED) measures the percentage change in quantity demanded in response to a percentage change in price. PED determines whether a price change will increase or decrease a firm's total revenue. Income Elasticity of Demand (YED) classifies goods as normal, luxury, or inferior. Cross-Price Elasticity (XED) reveals whether goods are substitutes or complements.",
    speedReadBullets: [
      "PED Formula: PED = (% change in Quantity Demanded) / (% change in Price). Always negative due to the law of demand; economists conventionally discuss the absolute value.",
      "PED Value Ranges: PED > 1: Price Elastic (quantity is highly responsive); PED < 1: Price Inelastic (quantity is unresponsive); PED = 1: Unit Elastic; PED = 0: Perfectly Inelastic (vertical demand); PED = infinity: Perfectly Elastic (horizontal demand).",
      "Determinants of PED (SPLAT): Substitutes (number and closeness), Proportion of income spent on good, Luxury vs Necessity, Addiction/habit-forming nature, Time period after price change.",
      "PED & Total Revenue (TR = P x Q): If demand is Elastic (PED > 1), cutting price INCREASES TR (percentage gain in Q exceeds percentage drop in P). If demand is Inelastic (PED < 1), cutting price DECREASES TR (percentage drop in P outweighs percentage gain in Q). If Unitary (PED = 1), TR is maximized.",
      "PED Along a Linear Demand Curve: PED is NOT constant along a straight-line demand curve. In the upper half, demand is price-elastic (PED > 1); at the midpoint, PED = 1; in the lower half, demand is price-inelastic (PED < 1).",
      "Income Elasticity of Demand (YED): YED = (% change in Qd) / (% change in Income). Positive YED (> 0) = Normal Good (YED > 1 is a Luxury Good; 0 < YED < 1 is a Necessity). Negative YED (< 0) = Inferior Good.",
      "Cross-Price Elasticity of Demand (XED): XED = (% change in Qd of Good A) / (% change in Price of Good B). Positive XED = Substitutes. Negative XED = Complements. Zero XED = Unrelated Goods.",
    ],
    primer5Min:
      "Remember the Total Revenue rule for exams: Firms with INELASTIC demand should RAISE prices to increase revenue (e.g. tobacco, insulin, electricity). Firms with ELASTIC demand should LOWER prices to increase revenue (e.g. budget airlines, fast food). In your essays, always calculate PED using percentages: %ΔQ / %ΔP. For YED, the SIGN matters: positive means normal, negative means inferior. For XED, positive means substitutes, negative means complements.",
    subSections: [
      {
        id: "u2-4-s1",
        title: "Price Elasticity of Demand (PED) & The SPLAT Determinants",
        marker: "Quantitative Responsiveness",
        content:
          "PED quantifies consumer sensitivity to price variations: PED = (%ΔQd) / (%ΔP). The degree of responsiveness depends on: 1. Substitutes: goods with close alternatives (butter vs margarine) are elastic; goods without substitutes (water, insulin) are inelastic; 2. Proportion of Income: high-cost purchases (cars, vacations) are elastic; low-cost items (salt, chewing gum) are inelastic; 3. Luxury vs Necessity: food and heating are inelastic; designer jewelry is elastic; 4. Addiction: cigarettes and alcohol are inelastic; 5. Time: demand becomes more elastic over time as consumers find substitutes.",
        analyticalTakeaway:
          "Governments selectively tax goods with price-inelastic demand (excise taxes on petrol, tobacco, alcohol) because quantity demanded does not contract sharply, maximizing tax revenue.",
        keyFormulaOrFramework: "PED = \\frac{\\%\\Delta Q_d}{\\%\\Delta P} = \\frac{(Q_2 - Q_1)/Q_1 \\times 100}{(P_2 - P_1)/P_1 \\times 100}",
        diagramRef: "diag-ped-tr",
      },
      {
        id: "u2-4-s2",
        title: "PED & The Total Revenue Relationship",
        marker: "Strategic Pricing",
        content:
          "Total Revenue (TR) is calculated as Market Price multiplied by Quantity Sold (TR = P x Q). The effect of a price adjustment on TR is governed by PED: When demand is Elastic (|PED| > 1), price and total revenue move in opposite directions (a price cut increases TR; a price hike reduces TR). When demand is Inelastic (|PED| < 1), price and total revenue move in the same direction (a price hike increases TR; a price cut decreases TR). At unitary elasticity (|PED| = 1), total revenue is maximized.",
        analyticalTakeaway:
          "Along a downward-sloping linear demand curve, PED declines continuously from infinity at the vertical price intercept to zero at the horizontal quantity intercept.",
      },
      {
        id: "u2-4-s3",
        title: "Income Elasticity (YED) & Cross Elasticity (XED)",
        marker: "Income & Cross Linkages",
        content:
          "YED measures the sensitivity of demand to changes in real household income: YED = (%ΔQd) / (%ΔY). Normal goods have YED > 0 (necessities have 0 < YED < 1, such as staple foods; luxuries have YED > 1, such as fine dining and international tourism). Inferior goods have YED < 0 (canned food, second-hand clothing). Cross-Price Elasticity (XED = %ΔQd_A / %ΔP_B) measures interdependent relationships: positive XED denotes substitute goods (higher airfares boost high-speed rail demand); negative XED denotes complementary goods (higher car prices reduce gasoline demand).",
        analyticalTakeaway:
          "Firms with high positive YED experience rapid expansion during macroeconomic booms, but severe contractions during economic recessions.",
        keyFormulaOrFramework: "YED = \\frac{\\%\\Delta Q_d}{\\%\\Delta Y}, \\quad XED = \\frac{\\%\\Delta Q_{d,A}}{\\%\\Delta P_B}",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-2-4-1",
        question: "A cinema chain lowers ticket prices from $12.00 to $9.00. Consequently, average weekly attendance increases from 1,000 to 1,400 viewers. (a) Calculate the PED. (b) Explain what happened to total revenue.",
        promptType: "calculation",
        hints: ["%ΔQ = (1400-1000)/1000", "%ΔP = (9-12)/12", "TR = P x Q before and after"],
        modelAnswer:
          "(a) %ΔQd = (1,400 - 1,000) / 1,000 x 100 = +40%. %ΔP = (9.00 - 12.00) / 12.00 x 100 = -25%. PED = +40% / -25% = -1.6 (Absolute value = 1.6). Because |PED| > 1, demand is PRICE ELASTIC. (b) Initial TR = $12 x 1,000 = $12,000. New TR = $9 x 1,400 = $12,600. Total revenue increased by $600 because the percentage gain in quantity demanded (+40%) significantly outweighed the percentage reduction in price (-25%).",
        keyTermsToInclude: ["PED Calculation", "Price Elastic (|PED| > 1)", "Total Revenue Increase", "Percentage Change"],
      },
    ],
    analysis: {
      coreThesis:
        "Elasticity provides the quantitative bridge between economic theory and corporate pricing or government tax policy, revealing how agents adjust quantities to relative price and income shocks.",
      theoreticalFoundations:
        "Formalized by Alfred Marshall in Principles of Economics (1890), uniting the mathematical derivative of demand with commercial revenue optimization.",
      strategicEvaluationAO3AO4:
        "Governments imposing indirect taxes must evaluate PED: taxing inelastic goods generates stable fiscal revenue with minimal deadweight loss, but can be regressive, burdening low-income households.",
      commonMisconceptions: [
        "Confusing slope with elasticity: Slope is constant along a linear demand curve (ΔP/ΔQ), but PED varies continuously from infinity to zero.",
        "Omitting the negative sign in YED for inferior goods: A negative sign is essential in YED because it indicates the inverse relationship between income and demand.",
      ],
      realWorldConnections:
        "Airline Dynamic Pricing & Elasticity: Business travelers have inelastic demand (limited substitutes, time-sensitive, paid by employer), allowing airlines to charge $1,500+ for last-minute flights; leisure travelers have elastic demand, receiving discounted early bookings.",
      keyDiagrams: ["PED Variation along Linear Demand Curve & Total Revenue Curve"],
    },
    cases: [
      {
        id: "case-2-4-1",
        title: "Airline Yield Management & Fare Segmentation",
        countryOrContext: "Global Commercial Aviation",
        realWorldMechanism:
          "Airlines exploit differences in PED: business passengers (inelastic demand due to rigid meeting schedules) are charged high fares close to departure, while budget vacationers (elastic demand with flexible dates) are offered low fares months in advance.",
        concepts: ["choice", "efficiency", "change"],
        syllabusLink: "2.4 Price Elasticity of Demand (Determinants & Corporate Pricing Strategy)",
        evaluationAO3AO4:
          "Demonstrates how sophisticated price discrimination exploits differences in consumer elasticity to maximize producer surplus.",
      },
    ],
    conceptTracking: [
      {
        conceptId: "choice",
        intensity: 5,
        manifestation: "Consumer choices determine the sensitivity of quantity demanded to price and income shifts.",
      },
      {
        conceptId: "efficiency",
        intensity: 4,
        manifestation: "Pricing decisions that maximize total revenue approach the unitary elasticity efficiency benchmark.",
      },
      {
        conceptId: "intervention",
        intensity: 4,
        manifestation: "Governments target goods with inelastic demand for excise taxation.",
      },
    ],
    examPromptTakeaway:
      "A guaranteed Paper 1 and Paper 2 topic. Expect questions asking you to calculate PED/YED and evaluate why a government taxes specific commodities.",
    examBlueprint: {
      paper1EssayPrompt:
        "Explain the factors that determine whether the demand for a product is price elastic or price inelastic, and evaluate the importance of PED for a firm deciding whether to change the price of its product. [15 marks]",
      commandTerm: "Evaluate",
      deeedStructure: {
        define: "Define Price Elasticity of Demand (PED), Elastic Demand (PED > 1), and Inelastic Demand (PED < 1).",
        explain: "Explain the SPLAT determinants. Detail the mathematical relationship between PED and Total Revenue (TR = P x Q).",
        exemplify: "Contrast pharmaceutical insulin (inelastic) with luxury overseas holidays or rival coffee brands (elastic).",
        diagram: "Draw two demand curves side by side (one steep inelastic, one flat elastic) showing the revenue gain vs revenue loss boxes from a price increase.",
      },
      slapEvaluation: {
        stakeholders: "Firms with inelastic demand can raise prices to boost revenue and profits; consumers bear higher costs; low-income households suffer if goods are necessities.",
        longShortTerm: "In the short term, demand is more inelastic as consumers lack awareness of alternatives; over the long term, competitors enter and consumers find substitutes, making demand more elastic.",
        assumptions: "Assumes production costs do not rise disproportionately when quantity expands; a firm must consider Marginal Cost, not just Total Revenue.",
        priorities: "Firms must evaluate PED in tandem with competitor reactions (game theory) before adjusting pricing.",
      },
    },
    diagramIds: ["diag-ped-tr"],
  },
  {
    id: "u2-5",
    unitId: "unit-2",
    unitNumber: 2,
    topicCode: "2.5",
    displayCode: "U2.5",
    syllabusRef: "IB Guide 2.6 / Course Notes 2.6 / Slides Unit 2.5–2.6",
    title: "Elasticity of Supply: PES & Factor Mobility",
    subtitle: "Price Elasticity of Supply, Spare Capacity, Time Lags & Primary Commodity Volatility",
    level: "SL / HL",
    strategicImportance: "HIGH-YIELD MICRO",
    readingTimeMinutes: 6,
    summary:
      "Price Elasticity of Supply (PES) measures the responsiveness of the quantity supplied of a good to a change in its price. A high PES (elastic) means firms can rapidly expand production when market prices rise; a low PES (inelastic) means output is rigid. Determinants include spare capacity, inventory levels, factor mobility, and time periods. Agricultural and primary commodities typically suffer from price-inelastic supply in the short run, causing immense market price volatility.",
    speedReadBullets: [
      "PES Formula: PES = (% change in Quantity Supplied) / (% change in Price). Always positive due to the law of supply.",
      "PES Value Classifications: PES > 1: Elastic Supply; PES < 1: Inelastic Supply; PES = 1: Unit Elastic; PES = 0: Perfectly Inelastic (vertical supply); PES = infinity: Perfectly Elastic (horizontal supply).",
      "Supply Curves & Intercepts: Any linear supply curve passing through the price axis has PES > 1 (elastic). Any linear supply curve passing through the origin has PES = 1 (unit elastic). Any linear supply curve cutting the quantity axis has PES < 1 (inelastic).",
      "Determinants of PES: 1. Spare Productive Capacity (idle machines/workers allow fast expansion); 2. Level of Finished Goods Inventory/Stocks; 3. Mobility of Factors of Production (speed of reallocating labor and capital); 4. Length of Production Period; 5. Time Period Considered (Market Period: PES = 0; Short Run: Inelastic; Long Run: Elastic).",
      "Primary Commodities vs Manufactured Goods: Primary agricultural crops have low PES in the short run due to biological crop cycles (months to harvest); manufactured goods have high PES due to mechanized production lines and warehouse stockholding.",
    ],
    primer5Min:
      "A golden geometric trick for IB Economics diagrams: look at where the linear supply curve intercepts the axes! If it intercepts the vertical P-axis, it is ELASTIC everywhere (PES > 1). If it passes straight through the (0,0) origin, PES = 1 at all points. If it intercepts the horizontal Q-axis, it is INELASTIC everywhere (PES < 1). Always explain WHY supply is inelastic in agriculture: biological gestation periods and weather constraints mean farmers cannot instantly produce more wheat just because the price doubled today.",
    subSections: [
      {
        id: "u2-5-s1",
        title: "Price Elasticity of Supply (PES) & Mathematical Structure",
        marker: "Supply Responsiveness",
        content:
          "PES quantifies how flexible producers are in reacting to price signals: PES = (%ΔQs) / (%ΔP). When PES > 1, the percentage response in output exceeds the percentage price rise (elastic supply). When PES < 1, output responds weakly to price hikes (inelastic supply). Supply elasticity is dictated by technological agility and factor flexibility.",
        analyticalTakeaway:
          "In agricultural markets, short-run PES is nearly zero (perfectly inelastic) on harvest day, because crops are already planted and gathered regardless of prevailing market price.",
        keyFormulaOrFramework: "PES = \\frac{\\%\\Delta Q_s}{\\%\\Delta P} = \\frac{(Q_{s,2} - Q_{s,1})/Q_{s,1} \\times 100}{(P_2 - P_1)/P_1 \\times 100}",
        diagramRef: "diag-pes-curves",
      },
      {
        id: "u2-5-s2",
        title: "Key Determinants of PES & The Critical Role of Time",
        marker: "Determinants",
        content:
          "Four principal determinants dictate PES: 1. Spare Capacity: Factories with 30% idle equipment can instantly boost output (high PES); factories operating at 100% capacity have inelastic supply until new facilities are built; 2. Inventories & Storage: Perishable items (fresh fish) cannot be stored and have low PES; durable goods (canned goods, consumer electronics) held in warehouses can be released immediately, yielding high PES; 3. Factor Mobility: If workers and machinery can easily transition between product lines, PES is high; 4. Time Horizon: In the immediate market period, supply is fixed; in the short run, variable factors can be adjusted (moderately inelastic); in the long run, all factors are variable, making supply highly price-elastic.",
        analyticalTakeaway:
          "Combine low PES with low PED to explain why agricultural commodities suffer from wild price swings (the Cobweb model and commodity price volatility).",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-2-5-1",
        question: "Explain two reasons why the price elasticity of supply for agricultural commodities (such as wheat or soybeans) is generally lower than that for manufactured goods (such as smartphones).",
        promptType: "explain",
        hints: ["Biological harvest cycles vs mechanized factories", "Storage perishability vs warehouse durability"],
        modelAnswer:
          "1. Biological Production Lags: Agricultural crops have fixed biological gestation periods (several months from planting to harvest). If the market price of wheat surges mid-season, farmers cannot instantly accelerate crop growth, resulting in highly inelastic short-run supply (PES < 1). In contrast, smartphone manufacturers can run overtime shifts or increase factory throughput within days. 2. Storage & Perishability: Fresh agricultural produce is perishable and expensive to store in bulk, meaning farmers must sell output immediately at prevailing market prices rather than holding buffer stocks. Manufactured goods can be stored in climate-controlled warehouses and rapidly deployed onto the market when prices rise, yielding much higher PES.",
        keyTermsToInclude: ["Biological Gestation Period", "Time Horizon", "Perishability", "Storage / Inventory Stocks", "Factor Mobility"],
      },
    ],
    analysis: {
      coreThesis:
        "PES measures the technological and operational agility of firms to reallocate scarce factors of production in response to shifting market price incentives.",
      theoreticalFoundations:
        "Derived from Marshall's temporal analysis of supply (the momentary market period, the short-run cost period, and the long-run entry/exit period).",
      strategicEvaluationAO3AO4:
        "Primary commodity dependent developing economies face macroeconomic vulnerability because inelastic supply combined with inelastic demand causes severe export revenue volatility.",
      commonMisconceptions: [
        "Believing a steep supply curve is always inelastic: A steep line that passes through the vertical price axis is still technically price-elastic (PES > 1).",
        "Confusing factor mobility with labor specialization: Highly specialized neurosurgeons or semiconductor lithographers have low factor mobility, reducing PES.",
      ],
      realWorldConnections:
        "OPEC+ Crude Oil Supply Restrictions: Oil extraction has low PES in the short run because drilling new offshore wells requires billions in capital and years of lead time; OPEC+ leverages this inelasticity to manipulate global oil prices via coordinated quota adjustments.",
      keyDiagrams: ["PES Curves & Intercepts (Elastic, Inelastic, Unitary)"],
    },
    cases: [
      {
        id: "case-2-5-1",
        title: "Lithium Mining & The Electric Vehicle Boom",
        countryOrContext: "Global Battery Metals Supply Chains",
        realWorldMechanism:
          "Skyrocketing demand for EV batteries sent lithium carbonate prices soaring 500% in 2021-2022. Because commissioning new lithium brine or hard-rock mines takes 4 to 7 years, supply was highly price-inelastic, causing unprecedented commodity price spikes.",
        concepts: ["scarcity", "change", "sustainability"],
        syllabusLink: "2.5 Price Elasticity of Supply (Time Lags & Capital Lead Times)",
        evaluationAO3AO4:
          "Illustrates how long industrial lead times make supply acutely inelastic, generating massive short-term economic rents for early producers.",
      },
    ],
    conceptTracking: [
      {
        conceptId: "scarcity",
        intensity: 5,
        manifestation: "Inelastic supply reflects physical constraints on productive capacity.",
      },
      {
        conceptId: "change",
        intensity: 4,
        manifestation: "PES shifts from inelastic to elastic as the time horizon extends into the long run.",
      },
      {
        conceptId: "interdependence",
        intensity: 3,
        manifestation: "Upstream raw material PES dictates downstream manufacturing output flexibility.",
      },
    ],
    examPromptTakeaway:
      "Paper 2 data response questions regularly ask you to calculate PES and evaluate why agricultural or mineral exports create trade instability.",
    examBlueprint: {
      paper1EssayPrompt:
        "Explain the determinants of price elasticity of supply, and discuss the importance of PES for producers of primary commodities and manufactured goods. [10 marks]",
      commandTerm: "Explain",
      deeedStructure: {
        define: "Define Price Elasticity of Supply (PES), Elastic Supply (PES > 1), and Inelastic Supply (PES < 1).",
        explain: "Explain determinants: spare capacity, inventory levels, factor mobility, and time horizon (market period vs short run vs long run).",
        exemplify: "Contrast copper mining (capital intensive, long gestation lags, low PES) with apparel manufacturing (high spare capacity, high PES).",
        diagram: "Draw two supply curves: an inelastic supply curve cutting the quantity axis and an elastic supply curve cutting the price axis.",
      },
      slapEvaluation: {
        stakeholders: "N/A for 10-mark questions; focus on precise definitions, diagrams, and clear real-world examples.",
        longShortTerm: "Short-run supply is heavily constrained by fixed capital; long-run supply becomes elastic as new capacity is built.",
        assumptions: "Assumes factor markets have available resources to expand when prices rise.",
        priorities: "Distinguishing primary commodities from manufactured goods is essential for full marks.",
      },
    },
    diagramIds: ["diag-pes-curves"],
  },
  {
    id: "u2-6",
    unitId: "unit-2",
    unitNumber: 2,
    topicCode: "2.6",
    displayCode: "U2.6",
    syllabusRef: "IB Guide 2.7 / Course Notes 2.7 / Slides Unit 2.7",
    title: "Role of Government in Microeconomics: Price Controls & Interventions",
    subtitle: "Price Ceilings, Price Floors, Specific Indirect Taxes, Subsidies & Deadweight Loss",
    level: "SL / HL",
    strategicImportance: "HIGH-YIELD MICRO",
    readingTimeMinutes: 9,
    summary:
      "Governments intervene in competitive markets to correct market failures, alter income distribution, support vulnerable producers, or raise tax revenue. Four core microeconomic tools are: 1. Price Ceilings (maximum prices below equilibrium, causing shortages and underground markets); 2. Price Floors (minimum prices above equilibrium, causing surpluses); 3. Indirect Taxes (shifting supply up, creating consumer/producer tax incidence and deadweight loss); 4. Subsidies (shifting supply down, reducing consumer price, boosting producer revenue, but generating fiscal costs). All interventions create trade-offs and welfare losses.",
    speedReadBullets: [
      "Why Governments Intervene: Support producer incomes (agriculture), protect low-income consumers (rent control, staple foods), discourage demerit goods (cigarettes), encourage merit goods (education, vaccines), and generate fiscal revenue.",
      "Price Ceiling (Maximum Price): Legally established maximum price set BELOW equilibrium (Pmax < Pe). Intended to keep necessities affordable. Consequences: Shortage (Qd > Qs), non-price rationing (queues, favoritism), parallel black markets, quality deterioration, deadweight welfare loss.",
      "Price Floor (Minimum Price): Legally established minimum price set ABOVE equilibrium (Pmin > Pe). Intended to guarantee producer incomes or protect workers (minimum wage). Consequences: Surplus (Qs > Qd), government stockpiling costs (CAP), unemployment in labor markets, deadweight welfare loss.",
      "Specific Indirect Tax: Imposed on expenditure, shifting supply vertically upwards by the exact tax amount. Creates a wedge between price paid by consumers (Pc) and price received by producers (Pp). Tax Revenue = Tax per unit x Qt. Consumer burden vs producer burden depends on relative PED and PES.",
      "Production Subsidy: A government financial payment to producers per unit output, shifting supply vertically downwards. Consumer price falls to Pc, producer price rises to Pp. Cost to government = Subsidy per unit x Qsub. Deadweight welfare loss arises from overproduction (MSC > MSB).",
      "Deadweight Welfare Loss (DWL): The loss of total community surplus that occurs when market output differs from the allocatively efficient competitive equilibrium (where MB = MC).",
    ],
    primer5Min:
      "Crucial diagram rules for government intervention: 1. A price ceiling must be drawn BELOW equilibrium to be binding (if drawn above, it has no effect). 2. A price floor must be drawn ABOVE equilibrium to be binding. 3. In indirect taxes, the deadweight loss triangle ALWAYS points toward the free market equilibrium Qe. 4. Tax Incidence rule: the burden falls more heavily on whichever side of the market is MORE INELASTIC (e.g. if demand is inelastic, consumers bear most of the tax).",
    subSections: [
      {
        id: "u2-6-s1",
        title: "Price Ceilings (Maximum Prices) & Market Shortages",
        marker: "Price Caps",
        content:
          "A price ceiling sets a legal ceiling above which prices cannot rise. To be binding, it must be established below the free market equilibrium (Pmax < Pe). At Pmax, quantity demanded expands while quantity supplied contracts, creating an unresolved shortage (excess demand = Qd - Qs). Because price can no longer ration the good, alternative rationing mechanisms emerge: physical queues, waiting lists, seller nepotism, and black markets where goods are illegally resold at high prices. Furthermore, producers cut quality or maintenance (e.g., rent-controlled apartments decay).",
        analyticalTakeaway:
          "Total community surplus declines under a price ceiling, generating a deadweight loss triangle of lost mutually beneficial transactions.",
        diagramRef: "diag-price-ceiling",
      },
      {
        id: "u2-6-s2",
        title: "Price Floors (Minimum Prices) & Agricultural Surpluses",
        marker: "Price Supports",
        content:
          "A price floor establishes a legal minimum price below which goods cannot be sold. To be binding, it must be set above equilibrium (Pmin > Pe). At Pmin, producers are incentivized to expand supply (Qs) while consumers contract demand (Qd), creating a persistent surplus (excess supply = Qs - Qd). In agricultural markets (such as the EU Common Agricultural Policy), governments must purchase and stockpile the surplus at massive taxpayer expense, store it, destroy it, or dump it abroad. In labor markets, a minimum wage set above equilibrium causes surplus labor (unemployment).",
        analyticalTakeaway:
          "While agricultural producers gain higher revenue (guaranteed by government purchases), consumers suffer higher prices and taxpayers bear the fiscal burden of purchasing the surplus.",
        diagramRef: "diag-price-floor",
      },
      {
        id: "u2-6-s3",
        title: "Specific Indirect Taxes & Tax Incidence",
        marker: "Excise Duties",
        content:
          "An indirect tax is levied on expenditure. A specific tax is a fixed dollar amount per unit (e.g., $2.00 per pack of cigarettes), shifting the supply curve vertically upwards by exactly the tax amount (S1 to S1 + tax). The market price rises from Pe to Pc (price paid by consumers), while the net price received by producers falls to Pp (Pp = Pc - tax). Government Tax Revenue is the rectangle (Pc - Pp) x Qt. Consumer Tax Incidence is the upper portion (Pc - Pe) x Qt; Producer Tax Incidence is the lower portion (Pe - Pp) x Qt. The deadweight loss triangle represents trades that no longer occur.",
        analyticalTakeaway:
          "Tax Incidence Theorem: If PED < PES, consumers bear the majority of the tax. If PES < PED, producers bear the majority.",
        keyFormulaOrFramework: "Tax Revenue = t \\times Q_t, \\quad DWL = \\frac{1}{2} \\times t \\times (Q_e - Q_t)",
        diagramRef: "diag-indirect-tax",
      },
      {
        id: "u2-6-s4",
        title: "Production Subsidies & Welfare Effects",
        marker: "State Subsidies",
        content:
          "A subsidy is a financial grant paid by the government to firms to lower production costs and encourage output. It shifts the supply curve vertically downwards by the subsidy per unit (S1 to S1 - subsidy). The market price falls to Pc, stimulating consumption to Qsub, while producers receive a total price of Pp (Pp = Pc + subsidy). Both consumer surplus and producer surplus expand. However, the total cost to government is the rectangle Subsidy x Qsub, which exceeds the combined gains in surplus, creating a deadweight welfare loss from overproduction (where MSC > MSB for all units beyond Qe).",
        analyticalTakeaway:
          "Subsidies create significant opportunity costs for government budgets, diverting funds from education, healthcare, or deficit reduction.",
        diagramRef: "diag-subsidy",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-2-6-1",
        question: "With the aid of a diagram, explain how the imposition of a specific indirect tax on sugary soft drinks affects consumers, producers, and the government.",
        promptType: "diagram-check",
        hints: ["Supply shifts up by tax amount", "Price rises to Pc, producer receives Pp", "Tax revenue rectangle and DWL triangle"],
        modelAnswer:
          "1. Supply shifts vertically upwards by the exact per-unit tax amount (S to S + tax). 2. Market price paid by consumers rises from Pe to Pc, causing a contraction in quantity demanded from Qe to Qt; consumer surplus shrinks. 3. Net price received by producers drops from Pe to Pp, reducing producer revenue and shrinking producer surplus. 4. Government gains tax revenue equal to the shaded rectangle [ (Pc - Pp) x Qt ]. 5. Society experiences a deadweight welfare loss (shaded triangle) due to the reduction in output below the free market equilibrium. However, if sugar drinks generated negative externalities, this tax may actually improve allocative efficiency by internalizing the external health cost.",
        keyTermsToInclude: ["Specific Indirect Tax", "Supply shift upward", "Consumer Incidence", "Producer Incidence", "Tax Revenue", "Deadweight Loss"],
      },
    ],
    analysis: {
      coreThesis:
        "Government intervention alters market coordinates to achieve normative social objectives, but inevitably creates trade-offs between equity and allocative efficiency that generate deadweight welfare losses.",
      theoreticalFoundations:
        "Derived from Pigouvian welfare economics, Harberger's deadweight loss triangle analysis, and public choice theory critiques of government failure.",
      strategicEvaluationAO3AO4:
        "Evaluating policy interventions requires SLAP criteria: Stakeholders (consumers vs producers vs taxpayers), Long-term vs short-term consequences, Assumptions (elasticity estimates, administrative corruption), and Policy Priorities.",
      commonMisconceptions: [
        "Thinking a price ceiling must be drawn above equilibrium: A ceiling above equilibrium is non-binding and has zero market effect.",
        "Assuming governments always lose revenue from subsidies: Governments incur fiscal costs, but if the subsidy stimulates green tech exports, long-run tax revenues may rise.",
      ],
      realWorldConnections:
        "New York & Berlin Rent Controls: Berlin's 2020 Mietendeckel capped residential rents, leading to a 57% collapse in available rental listings within a year and the emergence of illegal 'key money' black-market fees, confirming textbook price ceiling distortions.",
      keyDiagrams: ["Price Ceiling Shortage & Black Market", "Price Floor Surplus & Stockpiling", "Specific Indirect Tax & Incidence", "Production Subsidy & Welfare Loss"],
    },
    cases: [
      {
        id: "case-2-6-1",
        title: "Berlin Mietendeckel (Rent Control) Price Ceiling",
        countryOrContext: "Germany (2020–2021)",
        realWorldMechanism:
          "The Berlin city senate froze and capped rents on 1.5 million apartments. The price ceiling led to a severe shortage: newly advertised rental apartments collapsed by over 50%, maintenance halted, and the constitutional court eventually struck down the law.",
        concepts: ["intervention", "equity", "efficiency", "scarcity"],
        syllabusLink: "2.6 Price Ceilings (Shortages, Welfare Loss & Informal Markets)",
        evaluationAO3AO4:
          "Demonstrates how well-intentioned equity policies aimed at protecting low-income tenants can severely harm market efficiency, choke housing supply, and generate deadweight losses.",
      },
      {
        id: "case-2-6-2",
        title: "UK Soft Drinks Industry Levy (Sugar Tax)",
        countryOrContext: "United Kingdom (2018–present)",
        realWorldMechanism:
          "The UK introduced a tiered specific indirect tax on beverages with over 5g of sugar per 100ml. Rather than passing the full tax to consumers, over 50% of beverage manufacturers reformulated recipes to reduce sugar below the tax threshold.",
        concepts: ["intervention", "change", "wellbeing"],
        syllabusLink: "2.6 Specific Indirect Taxes & Corporate Tax Incidence",
        evaluationAO3AO4:
          "Shows how an indirect tax can successfully incentivize product reformulation, internalizing negative externalities without destroying firm revenues.",
      },
    ],
    conceptTracking: [
      {
        conceptId: "intervention",
        intensity: 5,
        manifestation: "Direct government use of price controls, indirect taxes, and subsidies to override free market outcomes.",
      },
      {
        conceptId: "equity",
        intensity: 5,
        manifestation: "Using price ceilings and minimum wages to protect vulnerable socioeconomic groups.",
      },
      {
        conceptId: "efficiency",
        intensity: 4,
        manifestation: "Interventions create deadweight loss triangles when interfering with competitive equilibrium.",
      },
    ],
    examPromptTakeaway:
      "A core Paper 1 15-mark essay hotspot. You must know how to draw and evaluate all four intervention diagrams with complete stakeholder analysis.",
    examBlueprint: {
      paper1EssayPrompt:
        "Evaluate the view that government intervention through price ceilings is an effective policy to make essential goods affordable for low-income households. [15 marks]",
      commandTerm: "Evaluate",
      deeedStructure: {
        define: "Define Price Ceiling (Maximum Price), Market Equilibrium, Shortage (Excess Demand), and Deadweight Loss.",
        explain: "Explain how setting Pmax below Pe creates a shortage (Qd > Qs). Detail non-price rationing, black markets, and misallocation of resources.",
        exemplify: "Reference rent control in New York or Berlin, and maximum price caps on staple foods in Venezuela.",
        diagram: "Draw a price ceiling diagram showing Pe, Pmax, Qd, Qs, the shortage bracket, and the shaded Deadweight Loss triangle.",
      },
      slapEvaluation: {
        stakeholders: "Low-income tenants who secure capped apartments benefit greatly; tenants locked out suffer homelessness or extortionate black-market rents; landlords lose rental income and neglect maintenance.",
        longShortTerm: "In the short term, price caps offer immediate inflation relief; in the long term, supply contracts severely and quality degrades.",
        assumptions: "Assumes government can enforce legal caps without rampant corruption or informal gray markets.",
        priorities: "Direct cash transfer payments or government supply-side housing construction are superior long-term alternatives to distortionary price ceilings.",
      },
    },
    diagramIds: ["diag-price-ceiling", "diag-price-floor", "diag-indirect-tax", "diag-subsidy"],
  },
  {
    id: "u2-7",
    unitId: "unit-2",
    unitNumber: 2,
    topicCode: "2.7",
    displayCode: "U2.7",
    syllabusRef: "IB Guide 2.8 / Course Notes 2.8 / Slides Unit 2.8",
    title: "Market Failure: Externalities & Common Pool Resources",
    subtitle: "Negative & Positive Externalities, Pigouvian Taxes, Cap-and-Trade & The Tragedy of the Commons",
    level: "SL / HL",
    strategicImportance: "HIGH-YIELD MICRO",
    readingTimeMinutes: 10,
    summary:
      "Market failure occurs when the unregulated free market mechanism fails to allocate resources efficiently, causing allocative inefficiency and deadweight welfare loss. Externalities are side-effects of production or consumption experienced by third parties without financial compensation. We analyze four cases: Negative Externalities of Production (MSC > MPC), Negative Externalities of Consumption (MPB > MSB), Positive Externalities of Production (MPC > MSC), and Positive Externalities of Consumption (MSB > MPB). Common Pool Resources suffer from the Tragedy of the Commons due to non-excludability and rivalry.",
    speedReadBullets: [
      "Definition of Market Failure: The failure of the market mechanism to achieve allocative efficiency (where MSB = MSC), resulting in an over- or under-allocation of scarce resources.",
      "Marginal Equations: Marginal Social Cost = Marginal Private Cost + Marginal External Cost (MSC = MPC + MEC). Marginal Social Benefit = Marginal Private Benefit + Marginal External Benefit (MSB = MPB + MEB).",
      "Negative Externality of Production: Production creates external spillover costs on third parties (e.g. factory pollution, carbon emissions). MSC > MPC. Free market overproduces (Qm > Qopt). Deadweight loss triangle points towards the social optimum Qopt. Solutions: Carbon tax, Pigouvian tax, tradable carbon permits (cap-and-trade), regulation.",
      "Negative Externality of Consumption: Consumption of demerit goods creates external costs on society (e.g. cigarettes, alcohol, sugary drinks, loud noise). MPB > MSB. Free market overconsumes (Qm > Qopt). Deadweight loss triangle points to Qopt. Solutions: Sin taxes, minimum pricing, advertising bans, health warnings.",
      "Positive Externality of Production: Production generates external benefits for third parties (e.g. firm investing in employee training, green tech R&D). MPC > MSC. Free market underproduces (Qm < Qopt). Deadweight loss arises from underprovision. Solutions: Government subsidies, tax credits, state provision.",
      "Positive Externality of Consumption: Consumption of merit goods generates external benefits for third parties (e.g. vaccines, primary healthcare, education). MSB > MPB. Free market underconsumes (Qm < Qopt). Potential welfare gain forgone. Solutions: Direct state provision, subsidies, mandatory vaccination laws.",
      "Common Pool Resources (CPRs): Goods that are RIVALROUS in consumption but NON-EXCLUDABLE in access (e.g. open ocean fisheries, clean atmosphere, pastures). Suffers from the 'Tragedy of the Commons'—individuals acting in self-interest deplete the shared resource to the detriment of all.",
    ],
    primer5Min:
      "The definitive guide to externality diagrams: 1. Externalities of PRODUCTION mean TWO COST CURVES (MPC and MSC) and ONE BENEFIT CURVE (MPB = MSB). 2. Externalities of CONSUMPTION mean TWO BENEFIT CURVES (MPB and MSB) and ONE COST CURVE (MPC = MSC). 3. Market equilibrium Qm is always found where MPC = MPB. 4. Social optimum Qopt is always found where MSC = MSB. 5. The Deadweight Loss triangle ALWAYS points like an arrow toward the socially optimal output Qopt!",
    subSections: [
      {
        id: "u2-7-s1",
        title: "Negative Externalities of Production & Pigouvian Carbon Taxes",
        marker: "Industrial Pollution",
        content:
          "Occurs when industrial production imposes external costs onto society not reflected in private market prices (e.g., a coal-fired power station emitting sulfur dioxide and CO2). The Marginal Social Cost exceeds the Marginal Private Cost by the Marginal External Cost (MSC = MPC + MEC). In an unregulated free market, profit-maximizing firms produce where MPC = MPB at market quantity Qm and price Pm. However, the socially optimal output is at Qopt (where MSC = MSB). Because Qm > Qopt, the market overallocates resources to this good, generating a deadweight welfare loss equal to the shaded area where MSC > MSB. Corrective solutions include Pigouvian emissions taxes set equal to the MEC, which internalizes the externality, shifting MPC upward to MSC.",
        analyticalTakeaway:
          "An indirect tax equal to MEC shifts the private supply curve (MPC) up to MSC, aligning market equilibrium exactly with the socially optimal output Qopt.",
        diagramRef: "diag-neg-ext-production",
      },
      {
        id: "u2-7-s2",
        title: "Negative Externalities of Consumption & Demerit Goods",
        marker: "Demerit Goods",
        content:
          "Demerit goods (tobacco, alcohol, sugary soft drinks) generate external costs when consumed, meaning Marginal Private Benefit exceeds Marginal Social Benefit (MPB > MSB). For example, smoking causes passive smoke inhalation diseases and burdens publicly funded healthcare systems. The free market overconsumes the good (Qm > Qopt), generating deadweight welfare loss. Policy remedies include specific excise taxes (shifting supply left to lower consumption to Qopt), legal age restrictions, advertising prohibitions, and mandatory graphic health warnings.",
        analyticalTakeaway:
          "Because demand for demerit goods is often highly price-inelastic due to addiction, excise taxes raise significant fiscal revenue but may require accompanying public education campaigns to reduce consumption.",
        diagramRef: "diag-neg-ext-consumption",
      },
      {
        id: "u2-7-s3",
        title: "Positive Externalities of Consumption & Merit Goods",
        marker: "Merit Goods",
        content:
          "Merit goods (vaccines, education, healthcare) create positive spillover benefits for third parties: an individual getting vaccinated protects immunocompromised members of society via herd immunity. Because consumers only consider their private benefits, MPB lies below MSB (MSB = MPB + MEB). The free market underconsumes the merit good at Qm < Qopt, leaving potential welfare gains uncaptured. Governments intervene through subsidies to consumers or producers (shifting supply down), direct free state provision (public schools and hospitals), and legal mandates.",
        analyticalTakeaway:
          "In positive externality diagrams, the welfare loss triangle represents the forgone net social benefits from underconsumption between Qm and Qopt.",
        diagramRef: "diag-pos-ext-consumption",
      },
      {
        id: "u2-7-s4",
        title: "Common Pool Resources & The Tragedy of the Commons",
        marker: "Sustainability Crisis",
        content:
          "Common pool resources are non-excludable (impossible or prohibitively expensive to prevent individuals from accessing them) but rivalrous (one person's consumption diminishes the quantity available to others). Examples include international ocean fisheries, tropical rainforests, and the Earth's atmosphere. In the absence of property rights, individual economic agents act rationally to extract maximum individual benefit, leading to rapid depletion, environmental collapse, and intergenerational inequity (the Tragedy of the Commons). Remedies include tradable permits (cap-and-trade), assigning property rights, collective governance (Elinor Ostrom's local resource management), and international climate treaties.",
        analyticalTakeaway:
          "Ostrom proved that local communities can successfully manage common pool resources through cooperative agreements and monitoring without centralized state control or full privatization.",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-2-7-1",
        question: "Using a diagram, explain why the unregulated market overproduces electricity generated from coal, and evaluate whether a carbon tax is the most effective policy to correct this market failure.",
        promptType: "diagram-check",
        hints: ["MSC > MPC by external cost", "Market output Qm > Qopt", "Deadweight loss points to Qopt", "Tax shifts MPC to MSC"],
        modelAnswer:
          "1. Coal power generation creates greenhouse gas emissions, imposing external environmental and healthcare costs (MEC) on society. 2. Therefore, MSC = MPC + MEC lies above the MPC curve, while MPB = MSB. 3. Profit-maximizing energy firms produce where MPC = MPB at market quantity Qm and price Pm. 4. The socially optimal allocation is where MSC = MSB at Qopt and Popt. 5. Because Qm > Qopt, the market overallocates resources, generating a deadweight loss triangle pointing to Qopt. 6. A carbon tax equal to MEC shifts MPC upward to coincide with MSC, raising electricity prices to Popt and cutting output to Qopt, eliminating the welfare loss. Evaluation: Highly effective at incentivizing clean fuel switching, but risks regressive impacts on low-income household energy bills and depends on government accurately calculating the true monetary cost of MEC.",
        keyTermsToInclude: ["Negative Externality of Production", "MSC = MPC + MEC", "Social Optimum (Qopt)", "Overproduction", "Deadweight Loss", "Carbon Tax / Pigouvian Tax"],
      },
    ],
    analysis: {
      coreThesis:
        "When private costs and benefits diverge from social costs and benefits, the invisible hand fails, necessitating corrective intervention to align private incentives with societal welfare.",
      theoreticalFoundations:
        "Formulated by Arthur Pigou (The Economics of Welfare, 1920), Ronald Coase (The Problem of Social Cost, 1960), Garrett Hardin (Tragedy of the Commons, 1968), and Elinor Ostrom (Governing the Commons, 1990).",
      strategicEvaluationAO3AO4:
        "Market-based solutions (taxes, tradable permits) are cost-effective but depend on accurate economic valuation of externalities; command-and-control regulations provide legal certainty but lack dynamic efficiency.",
      commonMisconceptions: [
        "Placing the externality on the wrong curve: Production externalities create two supply curves (MPC, MSC); consumption externalities create two demand curves (MPB, MSB).",
        "Assuming the deadweight loss triangle points randomly: In ALL externality diagrams, the DWL triangle points directly towards the socially optimal quantity Qopt.",
      ],
      realWorldConnections:
        "Sweden Carbon Tax & EU ETS: Sweden introduced a carbon tax of €115/tonne in 1991, successfully reducing greenhouse gas emissions by 27% while GDP expanded by 78%, proving that Pigouvian taxation decouples economic growth from carbon emissions.",
      keyDiagrams: ["Negative Externality of Production", "Negative Externality of Consumption", "Positive Externality of Consumption", "Common Pool Resource Depletion"],
    },
    cases: [
      {
        id: "case-2-7-1",
        title: "Sweden's Carbon Tax on Fossil Fuels",
        countryOrContext: "Sweden (1991–present)",
        realWorldMechanism:
          "Sweden enacted a direct carbon tax on fossil fuels (currently over €115/tonne of CO2). This shifted the MPC of heating and energy directly toward MSC, driving widespread adoption of district biomass heating and heat pumps.",
        concepts: ["intervention", "sustainability", "efficiency", "change"],
        syllabusLink: "2.7 Negative Externalities of Production & Market-Based Corrective Taxes",
        evaluationAO3AO4:
          "Demonstrates that a high, predictable Pigouvian tax internalizes environmental costs effectively without impeding macroeconomic growth.",
      },
      {
        id: "case-2-7-2",
        title: "North Sea Cod Fishery Collapse & CPR Depletion",
        countryOrContext: "United Kingdom & Northern Europe (1980s–2000s)",
        realWorldMechanism:
          "Open access and rival fishing led to overexploitation of North Sea cod stocks, which plummeted by over 80%. Lack of defined property rights created a classic Tragedy of the Commons, forcing the EU to institute total allowable catches (TACs) and boat decommissioning grants.",
        concepts: ["sustainability", "scarcity", "intervention"],
        syllabusLink: "2.7 Common Pool Resources & Tragedy of the Commons",
        evaluationAO3AO4:
          "Highlights the failure of unregulated markets to protect rivalrous open-access resources, necessitating multinational regulatory catch quotas.",
      },
    ],
    conceptTracking: [
      {
        conceptId: "sustainability",
        intensity: 5,
        manifestation: "Internalizing production externalities and managing CPRs protects future natural capital.",
      },
      {
        conceptId: "efficiency",
        intensity: 5,
        manifestation: "Correcting market failure restores allocative efficiency where MSB = MSC.",
      },
      {
        conceptId: "intervention",
        intensity: 5,
        manifestation: "Governments deploy Pigouvian taxes, subsidies, cap-and-trade, and regulations to align market incentives.",
      },
    ],
    examPromptTakeaway:
      "The single most tested topic in IB Economics Paper 1. You must be able to draw, label, and explain all four externality diagrams flawlessly.",
    examBlueprint: {
      paper1EssayPrompt:
        "Explain why negative externalities of production lead to market failure, and evaluate the view that carbon taxes are the most effective method for governments to reduce carbon emissions. [15 marks]",
      commandTerm: "Evaluate",
      deeedStructure: {
        define: "Define Market Failure, Allocative Inefficiency, Negative Externality of Production, and Carbon Tax.",
        explain: "Explain why MSC > MPC creates overproduction (Qm > Qopt) and deadweight loss. Explain how a carbon tax shifts MPC to MSC, restoring allocative efficiency.",
        exemplify: "Reference coal-fired power stations and Sweden's successful carbon tax model.",
        diagram: "Draw a complete Negative Externality of Production diagram showing MPC, MSC, MPB=MSB, Qm, Qopt, Pm, Popt, and the shaded DWL triangle pointing to Qopt.",
      },
      slapEvaluation: {
        stakeholders: "Polluting firms face higher costs and may lose international competitiveness; green tech firms benefit; low-income households face regressive energy bills unless tax revenues are returned via dividends.",
        longShortTerm: "In the short term, firms face adjustment costs; in the long term, high carbon prices drive dynamic innovation in renewable energy.",
        assumptions: "Assumes government can accurately calculate the monetary value of external damage (MEC); if tax is set too high or low, misallocation persists.",
        priorities: "Carbon taxes should be combined with green infrastructure subsidies and targeted transfer payments to protect vulnerable households.",
      },
    },
    diagramIds: ["diag-neg-ext-production", "diag-neg-ext-consumption", "diag-pos-ext-consumption"],
  },
  {
    id: "u2-8",
    unitId: "unit-2",
    unitNumber: 2,
    topicCode: "2.8",
    displayCode: "U2.8",
    syllabusRef: "IB Guide 2.9 / Course Notes 2.9 / Slides Unit 2.8–2.9",
    title: "Market Failure: Public Goods & The Free Rider Problem",
    subtitle: "Non-Rivalry, Non-Excludability, Missing Markets & Direct State Provision",
    level: "SL / HL",
    strategicImportance: "HIGH-YIELD MICRO",
    readingTimeMinutes: 6,
    summary:
      "Public goods represent an extreme form of market failure where free competitive markets fail to provide the good at all, resulting in a 'missing market'. Pure public goods possess two defining characteristics: Non-Excludability (it is impossible to prevent non-payers from consuming the good) and Non-Rivalry (one person's consumption does not diminish the quantity or quality available to others). Because of non-excludability, consumers have an incentive to free-ride, meaning private firms cannot charge a commercial price or earn profits.",
    speedReadBullets: [
      "Two Defining Features of Public Goods: 1. Non-Excludable (once provided, nobody can be excluded from benefits, even if they refuse to pay); 2. Non-Rivalrous (one person using the good does not reduce its availability to anyone else; marginal cost of supplying an additional user is zero).",
      "Examples of Pure Public Goods: National defence, flood barrier systems, street lighting, lighthouses, police force, clean air.",
      "The Free Rider Problem: Individuals know they can enjoy the benefits of a public good without paying for it because they cannot be excluded. Because everyone has an incentive to withhold payment, effective market demand is zero, and private profit-seeking firms will not produce it.",
      "Quasi-Public Goods: Goods that are partially non-rivalrous and partially non-excludable (e.g. toll roads with congestion, public parks, public beaches).",
      "Government Policy Solutions: 1. Direct Government Provision financed via general taxation (the primary solution); 2. Contracting out to private sector firms funded by state contracts; 3. Public-Private Partnerships (PPPs).",
    ],
    primer5Min:
      "Do NOT confuse Public Goods with Merit Goods! Merit goods (education, healthcare) ARE rivalrous and excludable (a hospital bed used by Patient A cannot be used by Patient B; a private school can lock non-payers out). Public goods (national defense, streetlights) are completely NON-RIVAL and NON-EXCLUDABLE. In free markets, merit goods are UNDERPROVIDED; public goods are NOT PROVIDED AT ALL (missing market).",
    subSections: [
      {
        id: "u2-8-s1",
        title: "Non-Excludability, Non-Rivalry & The Missing Market",
        marker: "Economic Characteristics",
        content:
          "Private goods are excludable (sellers can withhold the product from non-payers) and rivalrous (consumption by one person prevents another from consuming it, e.g. an apple or a haircut). Pure public goods exhibit: 1. Non-excludability: It is physically impossible or prohibitively expensive to exclude non-paying individuals from enjoying the benefits once provided (e.g. national defence missile shields protect all citizens equally); 2. Non-rivalry: One citizen benefiting from street lighting does not reduce the illumination available to fellow citizens. Because the marginal cost of providing the good to an additional user is zero (MC = 0), allocative efficiency requires Price = MC = 0, which guarantees private commercial bankruptcy.",
        analyticalTakeaway:
          "Because private firms cannot charge a price, the market demand curve fails to materialize, resulting in complete market failure (missing market).",
      },
      {
        id: "u2-8-s2",
        title: "The Free Rider Problem & State Financing",
        marker: "Free Riding",
        content:
          "The free rider problem is a rational choice dilemma: If a private firm constructs a tsunami warning siren or lighthouse, non-paying ships cannot be prevented from seeing the light. Rational self-interested consumers will conceal their true willingness to pay, hoping others will finance the installation so they can 'free-ride'. When all consumers act this way, total private revenue is zero, and the good is never supplied. The solution is collective action through government coercion: the state finances the public good using mandatory tax revenue, ensuring universal provision.",
        analyticalTakeaway:
          "Governments utilize Cost-Benefit Analysis (CBA) to estimate total social benefit vs social cost before allocating taxpayer capital to public goods.",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-2-8-1",
        question: "Distinguish between a public good and a merit good, explaining why the market mechanism provides an insufficient quantity of merit goods but fails to provide pure public goods entirely.",
        promptType: "explain",
        hints: ["Rivalry and excludability differences", "Underprovision vs missing market", "Healthcare vs street lighting"],
        modelAnswer:
          "Public goods are strictly NON-RIVALROUS (one person's use does not diminish another's) and NON-EXCLUDABLE (impossible to exclude non-payers), such as national defence or streetlights. Because of non-excludability, the free-rider problem arises: nobody pays, creating a complete 'missing market' where private firms produce zero output. In contrast, merit goods (such as healthcare and schooling) ARE RIVALROUS (a doctor's consultation or classroom desk cannot be consumed simultaneously by others) and EXCLUDABLE (private clinics turn away non-payers). Private markets CAN and do provide merit goods for profit, but they UNDERPROVIDE them because consumers only consider private benefits, ignoring positive externalities (MSB > MPB).",
        keyTermsToInclude: ["Public Good", "Merit Good", "Non-rivalrous", "Non-excludable", "Free Rider Problem", "Missing Market", "Underprovision"],
      },
    ],
    analysis: {
      coreThesis:
        "Pure public goods represent the definitive boundary of free markets: without excludability, the price mechanism cannot operate, making coercive collective taxation the only viable economic solution.",
      theoreticalFoundations:
        "Formulated by Paul Samuelson (The Pure Theory of Public Expenditure, 1954) and Richard Musgrave's theory of public finance.",
      strategicEvaluationAO3AO4:
        "While state provision solves the missing market, governments face the challenge of accurately estimating social valuation without market price signals, risking government failure and wasteful public spending.",
      commonMisconceptions: [
        "Confusing 'public sector goods' with 'public goods': Goods provided by the government (like public trains or public swimming pools) are NOT pure public goods; they are excludable by tickets and rivalrous when congested.",
        "Assuming lighthouses can be privatized easily: While GPS has transformed navigation, coastal lighthouses remain textbook public goods.",
      ],
      realWorldConnections:
        "The Thames Barrier Flood Defense: Protects 1.4 million London residents and £320 billion in property from North Sea storm surges. It is completely non-rivalrous and non-excludable; no private firm could commercialize flood protection without the state collecting taxes.",
      keyDiagrams: ["Public Good vs Merit Good Taxonomy Matrix"],
    },
    cases: [
      {
        id: "case-2-8-1",
        title: "The Thames Barrier Flood Defense System",
        countryOrContext: "London, United Kingdom",
        realWorldMechanism:
          "A massive mechanical storm surge barrier operated by the UK Environment Agency. Protects over 1.4 million residents and £320 billion of property. Entirely funded by national taxation because flood protection is non-excludable and non-rivalrous.",
        concepts: ["intervention", "efficiency", "wellbeing"],
        syllabusLink: "2.8 Public Goods & Direct State Provision",
        evaluationAO3AO4:
          "A quintessential example of a pure public good where private markets would never invest due to the free-rider problem, yet the social net benefit is immense.",
      },
    ],
    conceptTracking: [
      {
        conceptId: "intervention",
        intensity: 5,
        manifestation: "Direct government provision funded by compulsory taxation is mandatory to resolve missing markets.",
      },
      {
        conceptId: "efficiency",
        intensity: 4,
        manifestation: "Providing public goods where social benefit exceeds social cost eliminates complete market failure.",
      },
      {
        conceptId: "wellbeing",
        intensity: 4,
        manifestation: "National defence, public sanitation, and flood protection provide the foundational stability for economic well-being.",
      },
    ],
    examPromptTakeaway:
      "A frequent 10-mark Paper 1 question: 'Explain why public goods are not provided by the free market mechanism.'",
    examBlueprint: {
      paper1EssayPrompt:
        "Explain why public goods are not provided by free markets, and evaluate whether direct government provision is the most effective solution. [15 marks]",
      commandTerm: "Evaluate",
      deeedStructure: {
        define: "Define Public Good, Non-Excludability, Non-Rivalry, and Free Rider Problem.",
        explain: "Explain why non-excludability prevents price charging, causing private market demand to collapse. Explain how state provision resolves the missing market.",
        exemplify: "Reference national defence, tsunami warning sirens, or the Thames Barrier.",
        diagram: "Construct a comparative taxonomy table or vertical demand summation contrast between private and public goods.",
      },
      slapEvaluation: {
        stakeholders: "All citizens benefit from universal safety and infrastructure; taxpayers bear the financing burden.",
        longShortTerm: "Provides permanent long-term structural security that enables private market investment to thrive.",
        assumptions: "Assumes government planners can accurately assess optimal capacity without market price discovery.",
        priorities: "Direct state provision is indispensable for pure public goods; public-private partnerships can introduce operational efficiency.",
      },
    },
    diagramIds: [],
  },
];
