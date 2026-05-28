<?php

namespace App\Services;

use App\Models\PageantRecommendation;
use Illuminate\Support\Facades\DB;

class PageantRecommendationService
{
    private const PAGEANT_POOLS = [
        'S' => [
            'Miss Universe Vietnam',
            'Miss World Vietnam',
            'Miss International Vietnam',
            'Miss Grand International Vietnam',
            'Miss Earth Vietnam',
        ],
        'A' => [
            'Miss Supranational Vietnam',
            'Miss Charm Vietnam',
            'Miss Tourism Vietnam',
            'Hoa Hậu Việt Nam',
            'Miss Universe Business',
        ],
        'B' => [
            'Miss Tourism World',
            'Miss Eco International',
            'Miss Global',
            'Regional Beauty Pageants',
            'Miss Photogenic',
        ],
        'C' => [
            'Local Beauty Pageants',
            'Miss Talent',
            'Miss Friendship',
            'Community Pageants',
            'Online Beauty Contests',
        ],
    ];

    private const PAGEANT_REQUIREMENTS = [
        'Miss Universe Vietnam' => [
            'min_height' => 165,
            'key_criteria' => ['M1.1', 'M1.2', 'M1.4'],
            'min_score' => 8.0,
        ],
        'Miss World Vietnam' => [
            'min_height' => 165,
            'key_criteria' => ['M1.2', 'M1.6', 'M1.7'],
            'min_score' => 8.0,
        ],
        'Miss International Vietnam' => [
            'min_height' => 163,
            'key_criteria' => ['M1.1', 'M1.4', 'M1.7'],
            'min_score' => 7.5,
        ],
        'Miss Grand International Vietnam' => [
            'min_height' => 165,
            'key_criteria' => ['M1.2', 'M1.3', 'M1.4'],
            'min_score' => 7.5,
        ],
        'Miss Earth Vietnam' => [
            'min_height' => 163,
            'key_criteria' => ['M1.6', 'M1.7', 'M1.10'],
            'min_score' => 7.0,
        ],
        'Miss Supranational Vietnam' => [
            'min_height' => 163,
            'key_criteria' => ['M1.1', 'M1.2', 'M1.3'],
            'min_score' => 7.0,
        ],
        'Miss Charm Vietnam' => [
            'min_height' => 160,
            'key_criteria' => ['M1.2', 'M1.7', 'M1.3'],
            'min_score' => 6.5,
        ],
        'Hoa Hậu Việt Nam' => [
            'min_height' => 165,
            'key_criteria' => ['M1.1', 'M1.2', 'M1.6'],
            'min_score' => 7.5,
        ],
    ];

    private TalentScoringService $scoringService;

    public function __construct(TalentScoringService $scoringService)
    {
        $this->scoringService = $scoringService;
    }

    public function generateRecommendations(int $userId): array
    {
        $tier = $this->scoringService->getTierForUser($userId);

        if (!$tier) {
            throw new \Exception('User tier not found. Please complete the survey first.');
        }

        $scores = $this->scoringService->getScoresForUser($userId);

        if (empty($scores)) {
            throw new \Exception('User scores not found. Please complete the survey first.');
        }

        $pageants = self::PAGEANT_POOLS[$tier] ?? [];
        $recommendations = [];

        foreach ($pageants as $pageant) {
            $matchScore = $this->calculateMatchScore($scores, $pageant);
            $reasoning = $this->generateReasoning($scores, $pageant, $tier);

            $recommendations[] = [
                'pageant_name' => $pageant,
                'match_score' => $matchScore,
                'reasoning' => $reasoning,
            ];
        }

        // Sort by match score descending
        usort($recommendations, fn($a, $b) => $b['match_score'] <=> $a['match_score']);

        // Take top 5
        $topRecommendations = array_slice($recommendations, 0, 5);

        // Save to database
        $this->saveRecommendations($userId, $topRecommendations);

        return [
            'tier' => $tier,
            'pageants' => $topRecommendations,
        ];
    }

    private function calculateMatchScore(array $scores, string $pageant): float
    {
        $requirements = self::PAGEANT_REQUIREMENTS[$pageant] ?? null;

        if (!$requirements) {
            // Generic scoring for pageants without specific requirements
            return $this->calculateGenericMatchScore($scores);
        }

        $keyCriteria = $requirements['key_criteria'];
        $minScore = $requirements['min_score'];

        $relevantScores = [];
        foreach ($keyCriteria as $criterion) {
            if (isset($scores[$criterion])) {
                $relevantScores[] = $scores[$criterion];
            }
        }

        if (empty($relevantScores)) {
            return 50.0;
        }

        $avgScore = array_sum($relevantScores) / count($relevantScores);

        // Calculate match percentage
        $matchScore = ($avgScore / 10) * 100;

        // Penalty if below minimum score
        if ($avgScore < $minScore) {
            $matchScore *= 0.7;
        }

        return round(min(100, max(0, $matchScore)), 2);
    }

    private function calculateGenericMatchScore(array $scores): float
    {
        if (empty($scores)) {
            return 50.0;
        }

        $avgScore = array_sum($scores) / count($scores);
        return round(($avgScore / 10) * 100, 2);
    }

    private function generateReasoning(array $scores, string $pageant, string $tier): string
    {
        $requirements = self::PAGEANT_REQUIREMENTS[$pageant] ?? null;

        if (!$requirements) {
            return $this->generateGenericReasoning($scores, $pageant, $tier);
        }

        $keyCriteria = $requirements['key_criteria'];
        $strengths = [];
        $improvements = [];

        $criteriaNames = [
            'M1.1' => 'Physical Attributes',
            'M1.2' => 'Beauty Standards',
            'M1.3' => 'Social Media Presence',
            'M1.4' => 'Communication Skills',
            'M1.5' => 'Experience',
            'M1.6' => 'Education',
            'M1.7' => 'Personality',
            'M1.8' => 'Availability',
            'M1.9' => 'Health',
            'M1.10' => 'Special Skills',
        ];

        foreach ($keyCriteria as $criterion) {
            $score = $scores[$criterion] ?? 0;
            $name = $criteriaNames[$criterion] ?? $criterion;

            if ($score >= 7.5) {
                $strengths[] = $name;
            } elseif ($score < 6.0) {
                $improvements[] = $name;
            }
        }

        $reasoning = "This pageant is a good match for your {$tier} tier profile. ";

        if (!empty($strengths)) {
            $reasoning .= "Your strengths in " . implode(', ', $strengths) . " align well with this pageant's requirements. ";
        }

        if (!empty($improvements)) {
            $reasoning .= "Consider improving your " . implode(', ', $improvements) . " to increase your chances.";
        } else {
            $reasoning .= "You meet all key criteria for this pageant.";
        }

        return trim($reasoning);
    }

    private function generateGenericReasoning(array $scores, string $pageant, string $tier): string
    {
        $avgScore = !empty($scores) ? array_sum($scores) / count($scores) : 5.0;

        if ($avgScore >= 8.0) {
            return "Excellent match! Your overall profile is very strong for this {$tier}-tier pageant. You have a high chance of success.";
        } elseif ($avgScore >= 6.5) {
            return "Good match for your {$tier} tier. Your profile aligns well with this pageant's typical requirements.";
        } elseif ($avgScore >= 5.0) {
            return "Moderate match. This pageant is within your tier, but consider strengthening key areas to improve your chances.";
        } else {
            return "This pageant is in your tier range. Focus on improving your overall scores to increase competitiveness.";
        }
    }

    private function saveRecommendations(int $userId, array $recommendations): void
    {
        DB::transaction(function () use ($userId, $recommendations) {
            // Delete old recommendations
            PageantRecommendation::where('user_id', $userId)->delete();

            // Insert new recommendations
            foreach ($recommendations as $recommendation) {
                PageantRecommendation::create([
                    'user_id' => $userId,
                    'pageant_name' => $recommendation['pageant_name'],
                    'match_score' => $recommendation['match_score'],
                    'reasoning' => $recommendation['reasoning'],
                    'recommended_at' => now(),
                ]);
            }
        });
    }

    public function getRecommendationsForUser(int $userId): array
    {
        $recommendations = PageantRecommendation::where('user_id', $userId)
            ->orderBy('match_score', 'desc')
            ->get();

        return $recommendations->map(function ($rec) {
            return [
                'pageant_name' => $rec->pageant_name,
                'match_score' => $rec->match_score,
                'reasoning' => $rec->reasoning,
                'recommended_at' => $rec->recommended_at->toIso8601String(),
            ];
        })->toArray();
    }
}
