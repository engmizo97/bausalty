export type RiasecType = 'R' | 'I' | 'A' | 'S' | 'E' | 'C';

export interface RiasecCategoryInfo {
  code: RiasecType;
  nameEn: string;
  nameAr: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  color: string;
  iconName: string;
}

export interface Question {
  id: number;
  textEn: string;
  textAr: string;
  category: RiasecType;
}

export type UserScores = Record<RiasecType, number>;

export interface Major {
  id: string;
  nameEn: string;
  nameAr: string;
  riasecCode: string; // 3-letter Holland Code e.g. "IRC", "AIE"
  primaryType: RiasecType;
  descriptionEn: string;
  descriptionAr: string;
  isVision2030: boolean;
  vision2030SectorEn?: string;
  vision2030SectorAr?: string;
  sampleCareersEn: string[];
  sampleCareersAr: string[];
  saudiUniversitiesEn: string[];
  saudiUniversitiesAr: string[];
  matchScore?: number; // Calculated dynamically during assessment evaluation
}

export interface AssessmentResult {
  scores: UserScores;
  normalizedScores: Record<RiasecType, number>; // 0-100 scale
  topCode: string; // Top 3 letters e.g. "IAR"
  primaryType: RiasecType;
  secondaryType: RiasecType;
  tertiaryType: RiasecType;
  matchingMajors: Major[];
  completedAt: string;
}
