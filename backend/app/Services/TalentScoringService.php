<?php

namespace App\Services;

use App\Models\SurveyResponse;
use App\Models\TalentScore;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class TalentScoringService
{
    private const CRITERIA_WEIGHTS = [
        'M1.1' => 0.15, // Physical Attributes
        'M1.2' => 0.15, // Beauty Standards
        'M1.3' => 0.10, // Social Media
        'M1.4' => 0.10, // Communication
        'M1.5' => 0.10, // Experience
        'M1.6' => 0.10, // Education
        'M1.7' => 0.10, // Personality
        'M1.8' => 0.08, // Availability
        'M1.9' => 0.07, // Health
        'M1.10' => 0.05, // Special Skills
    ];

    private const QUESTION_TO_CRITERIA_MAP = [
        'A1' => 'M1.1', // Height
        'A2' => 'M1.1', // Weight
        'A3' => 'M1.2', // Facial features
        'A4' => 'M1.2', // Skin quality
        'A5' => 'M1.1', // Body proportions
        'A6' => 'M1.2', // Hair quality
        'A7' => 'M1.1', // Posture
        'A8' => 'M1.2', // Overall appearance

        'B1' => 'M1.5', // Modeling experience
        'B2' => 'M1.5', // Pageant experience
        'B3' => 'M1.10', // Special skills
        'B4' => 'M1.4', // Public speaking
        'B5' => 'M1.10', // Talents
        'B6' => 'M1.6', // Education level
        'B7' => 'M1.5', // Professional achievements
        'B8' => 'M1.4', // Language skills

        'C1' => 'M1.3', // Social media presence
        'C2' => 'M1.3', // Follower count
        'C3' => 'M1.3', // Engagement rate
        'C4' => 'M1.7', // Personality traits
        'C5' => 'M1.7', // Confidence level
        'C6' => 'M1.4', // Communication style
        'C7' => 'M1.7', // Emotional intelligence
        'C8' => 'M1.9', // Mental health

        'D1' => 'M1.8', // Availability
        'D2' => 'M1.8', // Commitment level
        'D3' => 'M1.9', // Physical health
        'D4' => 'M1.7', // Career goals
        'D5' => 'M1.8', // Travel flexibility
        'D6' => 'M1.7', // Motivation
    ];

    public function calculateScoresForUser(int $userId): array
    {
        $responses = SurveyResponse::where('user_id', $userId)->get();

        if ($responses->isEmpty()) {
            throw new \Exception('No survey responses found for user');
        }

        $responsesArray = $this->formatResponses($responses);

        // Check hard rules first
        $hardRuleTier = $this->applyHardRules($responsesArray);

        // Map answers to criteria scores
        $criteriaScores = $this->mapAnswersToCriteria($responsesArray);

        // Calculate overall weighted score
        $overallScore = $this->calculateWeightedScore($criteriaScores);

        // Assign tier (use hard rule if triggered)
        $tier = $hardRuleTier ?? $this->assignTier($overallScore);

        // Save scores to database
        $this->saveScores($userId, $criteriaScores, $tier);

        // Update user tier
        $this->updateUserTier($userId, $tier);

        return [
            'tier' => $tier,
            'overall_score' => round($overallScore, 2),
            'criteria_scores' => $criteriaScores,
        ];
    }

    private function formatResponses($responses): array
    {
        $formatted = [];
        foreach ($responses as $response) {
            $formatted[$response->question_code] = $response->answer_value;
        }
        return $formatted;
    }

    private function applyHardRules(array $responses): ?string
    {
        // Height < 160cm → Auto C tier
        if (isset($responses['A1']) && (float)$responses['A1'] < 160) {
            return 'C';
        }

        // No social media presence → Auto B tier max
        if (empty($responses['C1']) || $responses['C1'] === 'none') {
            return 'B';
        }

        // No experience at all → Auto C tier
        if (empty($responses['B1']) && empty($responses['B2'])) {
            return 'C';
        }

        return null;
    }

    private function mapAnswersToCriteria(array $responses): array
    {
        $criteriaScores = [];

        foreach (self::QUESTION_TO_CRITERIA_MAP as $questionCode => $criterionCode) {
            if (!isset($responses[$questionCode])) {
                continue;
            }

            $score = $this->calculateQuestionScore($questionCode, $responses[$questionCode]);

            if (!isset($criteriaScores[$criterionCode])) {
                $criteriaScores[$criterionCode] = [];
            }

            $criteriaScores[$criterionCode][] = $score;
        }

        // Average scores per criterion
        foreach ($criteriaScores as $code => $scores) {
            $criteriaScores[$code] = round(array_sum($scores) / count($scores), 2);
        }

        return $criteriaScores;
    }

    private function calculateQuestionScore(string $questionCode, $answerValue): float
    {
        // Scoring logic based on question type
        // This is a simplified version - you'll need to customize per question

        if (is_numeric($answerValue)) {
            // Normalize numeric values to 0-10 scale
            return $this->normalizeNumericAnswer($questionCode, (float)$answerValue);
        }

        if (is_array($answerValue) || $this->isJsonArray($answerValue)) {
            // Multi-select: score based on number of positive selections
            $selections = is_array($answerValue) ? $answerValue : json_decode($answerValue, true);
            return min(10, count($selections) * 2);
        }

        // Text/select answers: map to score
        return $this->mapTextAnswerToScore($questionCode, $answerValue);
    }

    private function normalizeNumericAnswer(string $questionCode, float $value): float
    {
        // Question-specific normalization
        switch ($questionCode) {
            case 'A1': // Height (cm)
                return min(10, max(0, ($value - 150) / 10));
            case 'A2': // Weight (kg) - relative to height
                return 7.0; // Simplified - needs BMI calculation
            case 'C2': // Follower count
                if ($value >= 100000) return 10;
                if ($value >= 50000) return 8;
                if ($value >= 10000) return 6;
                if ($value >= 1000) return 4;
                return 2;
            default:
                return min(10, $value);
        }
    }

    private function mapTextAnswerToScore(string $questionCode, $answerValue): float
    {
        // Map text answers to scores (simplified)
        $scoreMap = [
            'excellent' => 10,
            'very_good' => 8,
            'good' => 6,
            'average' => 5,
            'fair' => 4,
            'poor' => 2,
            'none' => 0,
        ];

        $answer = strtolower($answerValue);
        return $scoreMap[$answer] ?? 5.0;
    }

    private function isJsonArray($value): bool
    {
        if (!is_string($value)) {
            return false;
        }
        json_decode($value);
        return json_last_error() === JSON_ERROR_NONE;
    }

    private function calculateWeightedScore(array $criteriaScores): float
    {
        $totalScore = 0;

        foreach ($criteriaScores as $code => $score) {
            $weight = self::CRITERIA_WEIGHTS[$code] ?? 0;
            $totalScore += $score * $weight;
        }

        return $totalScore * 10; // Scale to 0-100
    }

    private function assignTier(float $overallScore): string
    {
        if ($overallScore >= 90) return 'S';
        if ($overallScore >= 70) return 'A';
        if ($overallScore >= 45) return 'B';
        return 'C';
    }

    private function saveScores(int $userId, array $criteriaScores, string $tier): void
    {
        DB::transaction(function () use ($userId, $criteriaScores, $tier) {
            foreach ($criteriaScores as $code => $score) {
                TalentScore::updateOrCreate(
                    [
                        'user_id' => $userId,
                        'criterion_code' => $code,
                    ],
                    [
                        'score' => $score,
                        'tier' => $tier,
                        'calculated_at' => now(),
                    ]
                );
            }
        });
    }

    private function updateUserTier(int $userId, string $tier): void
    {
        User::where('id', $userId)->update([
            'tier' => $tier,
            'tier_updated_at' => now(),
        ]);
    }

    public function getScoresForUser(int $userId): array
    {
        $scores = TalentScore::where('user_id', $userId)->get();

        $result = [];
        foreach ($scores as $score) {
            $result[$score->criterion_code] = $score->score;
        }

        return $result;
    }

    public function getTierForUser(int $userId): ?string
    {
        $user = User::find($userId);
        return $user?->tier;
    }
}
