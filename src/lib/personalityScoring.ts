import { PersonalityQuestion, PersonalityResult, PersonalityTrait } from '../types/personality';
import { PERSONALITY_QUESTIONS } from '../data/personalityQuestions';
import { ARCHETYPES } from '../data/archetypes';

/**
 * Calculates Myers-Briggs 16Personalities type from 12 assessment answers.
 * @param answers Record mapping question ID (1..12) to selected PersonalityTrait ('E'|'I'|'S'|'N'|'T'|'F'|'J'|'P')
 */
export function calculatePersonalityType(
  answers: Record<number, PersonalityTrait>,
  questionsList: PersonalityQuestion[] = PERSONALITY_QUESTIONS
): PersonalityResult {
  const traitCounts: Record<PersonalityTrait, number> = {
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0,
  };

  const dimensionTotals = {
    EI: 0,
    SN: 0,
    TF: 0,
    JP: 0,
  };

  questionsList.forEach((q) => {
    const selectedTrait = answers[q.id];
    if (selectedTrait && selectedTrait in traitCounts) {
      traitCounts[selectedTrait] += 1;
      dimensionTotals[q.dimension] += 1;
    }
  });

  // Determine dominant trait per dimension
  const letterEI = traitCounts.E > traitCounts.I ? 'E' : 'I';
  const letterSN = traitCounts.S > traitCounts.N ? 'S' : 'N';
  const letterTF = traitCounts.T > traitCounts.F ? 'T' : 'F';
  const letterJP = traitCounts.J > traitCounts.P ? 'J' : 'P';

  const code = `${letterEI}${letterSN}${letterTF}${letterJP}`;

  // Calculate percentages (clamped to 0 - 100%)
  const calcPct = (count: number, total: number) =>
    total > 0 ? Math.round((count / total) * 100) : 50;

  const totalEI = traitCounts.E + traitCounts.I || 3;
  const totalSN = traitCounts.S + traitCounts.N || 3;
  const totalTF = traitCounts.T + traitCounts.F || 3;
  const totalJP = traitCounts.J + traitCounts.P || 3;

  const percentages = {
    EI: {
      E: calcPct(traitCounts.E, totalEI),
      I: calcPct(traitCounts.I, totalEI),
    },
    SN: {
      S: calcPct(traitCounts.S, totalSN),
      N: calcPct(traitCounts.N, totalSN),
    },
    TF: {
      T: calcPct(traitCounts.T, totalTF),
      F: calcPct(traitCounts.F, totalTF),
    },
    JP: {
      J: calcPct(traitCounts.J, totalJP),
      P: calcPct(traitCounts.P, totalJP),
    },
  };

  // Lookup archetype details (fallback to INTJ if unknown)
  const archetype = ARCHETYPES[code] || ARCHETYPES['INTJ'];

  return {
    code,
    archetype,
    scores: traitCounts,
    percentages,
    completedAt: new Date().toISOString(),
  };
}
