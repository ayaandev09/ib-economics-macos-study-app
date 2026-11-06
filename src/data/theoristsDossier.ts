import { TheoristSchool } from "./types";

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
