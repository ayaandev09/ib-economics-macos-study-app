import { ALL_TOPICS, SYLLABUS_UNITS, DIAGRAMS_DOSSIER, KEY_CONCEPTS } from "@/data";
import { TopicData } from "@/data/types";

export type SearchFilterTab = "all" | "topics" | "diagrams" | "cases" | "concepts";

export interface SearchResultItem {
  id: string;
  displayCode: string;
  unitTitle: string;
  title: string;
  subtitle: string;
  matchCategory: "Topic" | "Diagram" | "Case Study" | "Key Concept" | "Formula & Analysis";
  matchedDetail?: string;
  snippet: string;
  score: number;
}

export function searchEconomicsCodex(
  query: string,
  filterTab: SearchFilterTab = "all"
): SearchResultItem[] {
  const q = query.trim().toLowerCase();
  const tokens = q.split(/\s+/).filter(Boolean);

  if (tokens.length === 0) {
    // Default featured topics
    return ALL_TOPICS.slice(0, 8).map((topic) => {
      const unit = SYLLABUS_UNITS.find((u) => u.id === topic.unitId);
      return {
        id: topic.id,
        displayCode: topic.displayCode,
        unitTitle: unit?.title || `Unit ${topic.unitNumber}`,
        title: topic.title,
        subtitle: topic.subtitle,
        matchCategory: "Topic",
        snippet: topic.summary || topic.strategicImportance,
        score: 10,
      };
    });
  }

  const results: SearchResultItem[] = [];

  for (const topic of ALL_TOPICS) {
    const unit = SYLLABUS_UNITS.find((u) => u.id === topic.unitId);
    const unitTitle = unit?.title || `Unit ${topic.unitNumber}`;

    let score = 0;
    let matchCategory: SearchResultItem["matchCategory"] = "Topic";
    let matchedDetail: string | undefined;
    let snippet = topic.summary || topic.subtitle;

    const displayCodeLower = topic.displayCode.toLowerCase();
    const topicCodeLower = topic.topicCode.toLowerCase();
    const titleLower = topic.title.toLowerCase();
    const subtitleLower = (topic.subtitle || "").toLowerCase();
    const summaryLower = (topic.summary || "").toLowerCase();
    const syllabusRefLower = (topic.syllabusRef || "").toLowerCase();

    // 1. Exact or prefix match on Display / Topic code (e.g. "U2.1", "2.1", "1.1")
    if (displayCodeLower === q || topicCodeLower === q) {
      score += 200;
      matchCategory = "Topic";
    } else if (displayCodeLower.startsWith(q) || topicCodeLower.startsWith(q)) {
      score += 120;
      matchCategory = "Topic";
    }

    // 2. Title matching
    if (titleLower === q) {
      score += 150;
      matchCategory = "Topic";
    } else if (titleLower.includes(q)) {
      score += 80;
      matchCategory = "Topic";
    } else if (tokens.every((t) => titleLower.includes(t))) {
      score += 60;
      matchCategory = "Topic";
    }

    // 3. Subtitle & Syllabus Ref matching
    if (subtitleLower.includes(q) || syllabusRefLower.includes(q)) {
      score += 45;
      if (score < 70) snippet = topic.subtitle;
    }

    // 4. Diagram matching
    if (topic.analysis?.keyDiagrams) {
      for (const diag of topic.analysis.keyDiagrams) {
        if (diag.toLowerCase().includes(q)) {
          score += 85;
          matchCategory = "Diagram";
          matchedDetail = `Diagram: ${diag}`;
          snippet = `Key diagram: ${diag}. Analyzed in ${topic.displayCode}.`;
          break;
        }
      }
    }

    // 5. Case studies matching
    if (topic.cases && topic.cases.length > 0) {
      for (const cs of topic.cases) {
        const csTitleLower = cs.title.toLowerCase();
        const csContextLower = cs.countryOrContext.toLowerCase();
        const csMechLower = cs.realWorldMechanism.toLowerCase();

        if (csTitleLower.includes(q) || csContextLower.includes(q)) {
          score += 75;
          matchCategory = "Case Study";
          matchedDetail = `${cs.title} (${cs.countryOrContext})`;
          snippet = `Case Study: ${cs.title} - ${cs.countryOrContext}. ${cs.realWorldMechanism.slice(0, 110)}...`;
          break;
        } else if (csMechLower.includes(q)) {
          score += 40;
          matchCategory = "Case Study";
          matchedDetail = cs.title;
          snippet = `Real-World Application: ${cs.realWorldMechanism.slice(0, 120)}...`;
          break;
        }
      }
    }

    // 6. 9 Key Concepts matching
    if (topic.conceptTracking && topic.conceptTracking.length > 0) {
      for (const ct of topic.conceptTracking) {
        if (ct.conceptId.toLowerCase().includes(q) || ct.manifestation.toLowerCase().includes(q)) {
          score += 55;
          matchCategory = "Key Concept";
          matchedDetail = `Concept: ${ct.conceptId.toUpperCase()}`;
          snippet = `Concept Focus [${ct.conceptId.toUpperCase()}]: ${ct.manifestation.slice(0, 110)}...`;
          break;
        }
      }
    }

    // 7. SubSections & Analytical formulas
    if (topic.subSections && topic.subSections.length > 0) {
      for (const sub of topic.subSections) {
        const subTitleLower = sub.title.toLowerCase();
        const subContentLower = sub.content.toLowerCase();
        const subTakeaway = (sub.analyticalTakeaway || "").toLowerCase();

        if (subTitleLower.includes(q)) {
          score += 50;
          if (score < 60) {
            matchCategory = "Formula & Analysis";
            matchedDetail = sub.title;
            snippet = sub.analyticalTakeaway || sub.content.slice(0, 120);
          }
          break;
        } else if (subTakeaway.includes(q) || subContentLower.includes(q)) {
          score += 30;
          if (score < 50) {
            matchCategory = "Formula & Analysis";
            snippet = sub.analyticalTakeaway || `${sub.content.slice(0, 110)}...`;
          }
          break;
        }
      }
    }

    // 8. General Summary fallback
    if (summaryLower.includes(q) && score === 0) {
      score += 25;
    }

    // Filter Tab Validation
    if (score > 0) {
      let keep = true;
      if (filterTab === "topics") {
        keep = true;
      } else if (filterTab === "diagrams") {
        keep = matchCategory === "Diagram" || Boolean(topic.analysis?.keyDiagrams?.length);
      } else if (filterTab === "cases") {
        keep = matchCategory === "Case Study" || Boolean(topic.cases && topic.cases.length > 0);
      } else if (filterTab === "concepts") {
        keep = matchCategory === "Key Concept" || Boolean(topic.conceptTracking?.length);
      }

      if (keep) {
        results.push({
          id: topic.id,
          displayCode: topic.displayCode,
          unitTitle,
          title: topic.title,
          subtitle: topic.subtitle || "",
          matchCategory,
          matchedDetail,
          snippet,
          score,
        });
      }
    }
  }

  // Rank by score descending, then by display code
  return results.sort((a, b) => b.score - a.score);
}
