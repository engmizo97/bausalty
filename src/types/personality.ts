export type PersonalityDimension = 'EI' | 'SN' | 'TF' | 'JP';
export type PersonalityTrait = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

export interface PersonalityQuestion {
  id: number;
  textEn: string;
  textAr: string;
  dimension: PersonalityDimension;
  optionA: {
    labelEn: string;
    labelAr: string;
    trait: PersonalityTrait;
  };
  optionB: {
    labelEn: string;
    labelAr: string;
    trait: PersonalityTrait;
  };
}

export interface ArchetypeInfo {
  code: string; // e.g. "INTJ"
  titleEn: string; // e.g. "The Architect"
  titleAr: string; // e.g. "العقل المدبر"
  groupEn: string; // e.g. "Analysts"
  groupAr: string; // e.g. "المحللون"
  descriptionEn: string;
  descriptionAr: string;
  strengthsEn: string[];
  strengthsAr: string[];
  learningStyleEn: string;
  learningStyleAr: string;
  linkedRiasecCodes: string[]; // e.g. ["IRC", "IAR"]
  linkedMajorsEn: string[];
  linkedMajorsAr: string[];
}

export interface PersonalityResult {
  code: string; // e.g. "INTJ"
  archetype: ArchetypeInfo;
  scores: {
    E: number;
    I: number;
    S: number;
    N: number;
    T: number;
    F: number;
    J: number;
    P: number;
  };
  percentages: {
    EI: { E: number; I: number };
    SN: { S: number; N: number };
    TF: { T: number; F: number };
    JP: { J: number; P: number };
  };
  completedAt: string;
}
