export type Tier = 'S' | 'A' | 'B' | 'C';

export type Section = 'A' | 'B' | 'C' | 'D';

export interface SurveyAnswer {
    question_code: string;
    answer_value: string | string[] | number;
}

export interface SurveySubmitRequest {
    section: Section;
    answers: SurveyAnswer[];
}

export interface SurveySubmitResponse {
    success: boolean;
    section_completed: Section;
    next_section: Section | null;
}

export interface SurveyProgress {
    completed_sections: Section[];
    current_section: Section;
    total_questions: number;
    answered_questions: number;
}

export interface CriteriaScores {
    'M1.1': number;
    'M1.2': number;
    'M1.3': number;
    'M1.4': number;
    'M1.5': number;
    'M1.6': number;
    'M1.7': number;
    'M1.8': number;
    'M1.9': number;
    'M1.10': number;
}

export interface RadarChartDataPoint {
    label: string;
    value: number;
}

export interface CalculateResponse {
    tier: Tier;
    overall_score: number;
    criteria_scores: CriteriaScores;
    radar_chart_data: RadarChartDataPoint[];
}

export interface PageantRecommendation {
    pageant_name: string;
    match_score: number;
    reasoning: string;
    recommended_at?: string;
}

export interface RecommendationsResponse {
    tier: Tier;
    pageants: PageantRecommendation[];
}

export interface Question {
    code: string;
    text: string;
    type: 'text' | 'number' | 'select' | 'multiselect' | 'date';
    options?: { value: string; label: string }[];
    required?: boolean;
    placeholder?: string;
    min?: number;
    max?: number;
}

export interface SurveySection {
    section: Section;
    title: string;
    description: string;
    questions: Question[];
}
