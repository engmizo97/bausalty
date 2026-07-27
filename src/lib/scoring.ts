import { Question, Major, UserScores, RiasecType } from '../types';
import { QUESTIONS } from '../data/questions';
import { MAJORS } from '../data/majors';

/**
 * Question scoring weights and bounds.
 * Assuming Likert scale 1 to 5 per question:
 * 1 = Strongly Disagree (لا أتفق بشدة)
 * 2 = Disagree (لا أتفق)
 * 3 = Neutral (محايد)
 * 4 = Agree (أتفق)
 * 5 = Strongly Agree (أتفق بشدة)
 */
export const MIN_RATING = 1;
export const MAX_RATING = 5;
export const QUESTIONS_PER_CATEGORY = 7;

export const MAX_RAW_SCORE_PER_CATEGORY = QUESTIONS_PER_CATEGORY * MAX_RATING; // 35
export const MIN_RAW_SCORE_PER_CATEGORY = QUESTIONS_PER_CATEGORY * MIN_RATING; // 7

export interface ScoringOutput {
  rawScores: UserScores;
  normalizedScores: Record<RiasecType, number>; // 0 - 100%
}

/**
 * 1. calculateScores(answers):
 * Calculates aggregate raw and normalized percentage scores (0–100%)
 * for each of the 6 RIASEC categories.
 *
 * @param answers Record mapping question ID (1..42) to answer value (1..5)
 */
export function calculateScores(
  answers: Record<number, number>,
  questionsList: Question[] = QUESTIONS
): ScoringOutput {
  const rawScores: UserScores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  const countPerCategory: Record<RiasecType, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

  // Sum scores for answered questions
  questionsList.forEach((q) => {
    const rating = answers[q.id];
    if (typeof rating === 'number' && rating >= MIN_RATING && rating <= MAX_RATING) {
      rawScores[q.category] += rating;
      countPerCategory[q.category] += 1;
    }
  });

  const normalizedScores: Record<RiasecType, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

  const categories: RiasecType[] = ['R', 'I', 'A', 'S', 'E', 'C'];

  categories.forEach((cat) => {
    const answeredCount = countPerCategory[cat] || QUESTIONS_PER_CATEGORY;
    const maxPossible = answeredCount * MAX_RATING;
    const minPossible = answeredCount * MIN_RATING;

    const raw = rawScores[cat];

    if (maxPossible === minPossible) {
      normalizedScores[cat] = 0;
    } else {
      // Scale linearly between 0% and 100%
      const percentage = Math.round(((raw - minPossible) / (maxPossible - minPossible)) * 100);
      normalizedScores[cat] = Math.max(0, Math.min(100, percentage));
    }
  });

  return {
    rawScores,
    normalizedScores,
  };
}

/**
 * 2. generateHollandCode(scores):
 * Returns the top 3 Holland Code letters (e.g., 'IRC', 'IAS', or 'SEC')
 * sorted by score descending. Ties broken by RIASEC canonical order (R, I, A, S, E, C).
 *
 * @param scores Normalized or raw scores for each RIASEC category
 */
export function generateHollandCode(scores: Record<RiasecType, number>): string {
  const categories: RiasecType[] = ['R', 'I', 'A', 'S', 'E', 'C'];

  // Sort categories by score descending
  const sorted = [...categories].sort((a, b) => {
    const diff = (scores[b] || 0) - (scores[a] || 0);
    if (diff !== 0) return diff;
    return categories.indexOf(a) - categories.indexOf(b);
  });

  // Top 3 Holland Code letters
  return sorted.slice(0, 3).join('');
}

/**
 * Converts a 3-letter Holland Code (e.g., "IRC") into a normalized 6D requirement vector.
 * Primary letter = 100%, Secondary = 75%, Tertiary = 50%, Others = 20%.
 */
function getMajorVector(riasecCode: string): Record<RiasecType, number> {
  const code = riasecCode.toUpperCase();
  const vector: Record<RiasecType, number> = { R: 20, I: 20, A: 20, S: 20, E: 20, C: 20 };

  if (code.length >= 1 && code[0] in vector) {
    vector[code[0] as RiasecType] = 100;
  }
  if (code.length >= 2 && code[1] in vector) {
    vector[code[1] as RiasecType] = 75;
  }
  if (code.length >= 3 && code[2] in vector) {
    vector[code[2] as RiasecType] = 50;
  }

  return vector;
}

/**
 * Computes Cosine Similarity between two 6-dimensional vectors.
 * Returns a float between 0 and 1.
 */
function cosineSimilarity(
  vecA: Record<RiasecType, number>,
  vecB: Record<RiasecType, number>
): number {
  const categories: RiasecType[] = ['R', 'I', 'A', 'S', 'E', 'C'];

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  categories.forEach((cat) => {
    const valA = vecA[cat] || 0;
    const valB = vecB[cat] || 0;

    dotProduct += valA * valB;
    normA += valA * valA;
    normB += valB * valB;
  });

  if (normA === 0 || normB === 0) return 0;

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * 3. getMajorRecommendations(scores, majorsList):
 * Computes vector similarity and weighted match percentage (0% - 100%)
 * between student RIASEC scores and major requirement vectors.
 * Returns major list ranked by matchScore descending.
 *
 * @param scores Student RIASEC scores (normalized 0-100 or raw)
 * @param majorsList List of majors to rank (defaults to MAJORS dataset)
 */
export function getMajorRecommendations(
  scores: Record<RiasecType, number>,
  majorsList: Major[] = MAJORS
): Major[] {
  const categories: RiasecType[] = ['R', 'I', 'A', 'S', 'E', 'C'];

  // Ensure student score values are valid
  const studentVector: Record<RiasecType, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  categories.forEach((cat) => {
    studentVector[cat] = Math.max(0, scores[cat] || 0);
  });

  const ranked = majorsList.map((major) => {
    const majorVector = getMajorVector(major.riasecCode);

    // 1. Cosine similarity score (0.0 to 1.0)
    const cosSim = cosineSimilarity(studentVector, majorVector);

    // 2. Primary Holland category match bonus (up to +10% bonus if primary matches)
    const studentTopCode = generateHollandCode(studentVector);
    const primaryStudentCat = studentTopCode[0] as RiasecType;
    const primaryMajorCat = major.primaryType;

    let primaryBonus = 0;
    if (primaryStudentCat === primaryMajorCat) {
      primaryBonus = 0.08; // 8% bonus for primary code match
    } else if (studentTopCode.includes(primaryMajorCat)) {
      primaryBonus = 0.04; // 4% bonus if major's primary category is in student top 3
    }

    // Combined match score percentage clamped to 0 - 100%
    const rawMatch = (cosSim + primaryBonus) * 100;
    const matchScore = Math.min(99, Math.max(35, Math.round(rawMatch)));

    return {
      ...major,
      matchScore,
    };
  });

  // Sort by matchScore descending; if equal, prioritize Vision 2030 majors
  return ranked.sort((a, b) => {
    const scoreDiff = (b.matchScore || 0) - (a.matchScore || 0);
    if (scoreDiff !== 0) return scoreDiff;
    if (a.isVision2030 !== b.isVision2030) {
      return a.isVision2030 ? -1 : 1;
    }
    return a.nameEn.localeCompare(b.nameEn);
  });
}
