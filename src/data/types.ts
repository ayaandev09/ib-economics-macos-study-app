export type ConceptId =
  | "scarcity"
  | "choice"
  | "efficiency"
  | "equity"
  | "wellbeing"
  | "sustainability"
  | "change"
  | "interdependence"
  | "intervention";

export type UnitId = "unit-1" | "unit-2" | "unit-3" | "unit-4";

export interface ConceptDefinition {
  id: ConceptId;
  name: string;
  shortName: string;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  glowColor: string;
  description: string;
  coreMechanism: string;
  examTips: string;
}

export interface CheckYourUnderstanding {
  id: string;
  question: string;
  promptType: "explain" | "diagram-check" | "evaluation" | "calculation";
  hints: string[];
  modelAnswer: string;
  keyTermsToInclude: string[];
}

export interface SubSection {
  id: string;
  title: string;
  marker: string;
  content: string;
  analyticalTakeaway: string;
  keyFormulaOrFramework?: string;
  diagramRef?: string;
}

export interface CaseStudyItem {
  id: string;
  title: string;
  countryOrContext: string;
  realWorldMechanism: string;
  concepts: ConceptId[];
  syllabusLink: string;
  evaluationAO3AO4: string;
}

export interface ConceptTrackItem {
  conceptId: ConceptId;
  intensity: 1 | 2 | 3 | 4 | 5;
  manifestation: string;
}

export interface TopicAnalysis {
  coreThesis: string;
  theoreticalFoundations: string;
  strategicEvaluationAO3AO4: string;
  commonMisconceptions: string[];
  realWorldConnections: string;
  keyDiagrams: string[];
}

export interface ExamBlueprint {
  paper1EssayPrompt: string;
  commandTerm: "Explain" | "Evaluate" | "Discuss" | "To what extent";
  deeedStructure: {
    define: string;
    explain: string;
    exemplify: string;
    diagram: string;
  };
  slapEvaluation: {
    stakeholders: string;
    longShortTerm: string;
    assumptions: string;
    priorities: string;
  };
}

export interface TopicData {
  id: string;
  unitId: UnitId;
  unitNumber: 1 | 2 | 3 | 4;
  topicCode: string; // e.g. "1.1", "2.1", "2.7", "3.2", "4.2"
  displayCode: string; // e.g. "U1.1", "U2.7", "U3.2", "U4.2"
  syllabusRef: string; // e.g. "IB Guide 1.1 / Tragakes Ch. 1"
  title: string;
  subtitle: string;
  level: "SL" | "SL / HL";
  strategicImportance:
    | "CORE FOUNDATION"
    | "HIGH-YIELD MICRO"
    | "HIGH-YIELD MACRO"
    | "GLOBAL TRADE ESSENTIAL"
    | "PAPER 1 ESSAY HOTSPOT"
    | "PAPER 2 DATA RESPONSE";
  readingTimeMinutes: number;
  summary: string;
  speedReadBullets: string[];
  primer5Min: string;
  subSections: SubSection[];
  checkUnderstanding: CheckYourUnderstanding[];
  analysis: TopicAnalysis;
  cases: CaseStudyItem[];
  conceptTracking: ConceptTrackItem[];
  examPromptTakeaway: string;
  examBlueprint: ExamBlueprint;
  diagramIds: string[];
}

export interface UnitPart {
  id: UnitId;
  unitNumber: 1 | 2 | 3 | 4;
  title: string;
  subtitle: string;
  badge: string;
  overview: string;
  strategicArc: string;
  dominantConcepts: ConceptId[];
  topics: TopicData[];
}

export interface DiagramControlOption {
  id: string;
  label: string;
  effect: string;
}

export interface DiagramDossier {
  id: string;
  code: string;
  title: string;
  unitId: UnitId;
  category: "Foundations" | "Microeconomics" | "Macroeconomics" | "Global Economy";
  xAxisLabel: string;
  yAxisLabel: string;
  description: string;
  drawingSteps: string[];
  curves: { name: string; color: string; description: string }[];
  shadedRegions: { name: string; color: string; meaning: string }[];
  interactiveControls: DiagramControlOption[];
  examAnalysis: string;
  commonPitfalls: string[];
}

export interface FormulaItem {
  id: string;
  code: string;
  name: string;
  unit: string;
  formula: string;
  variables: { name: string; definition: string }[];
  benchmarkGuidance: string;
  evaluationInterpretation: string;
  workedExample: string;
}

export interface GlossaryTerm {
  term: string;
  unit: string;
  definition: string;
  examTip: string;
  category?: string;
}

export interface TheoristSchool {
  id: string;
  name: string;
  school: string;
  era: string;
  coreDoctrine: string;
  keyAssumptions: string[];
  evaluationAO3: string;
  realWorldExample: string;
}
