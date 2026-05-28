<?php

namespace App\Http\Controllers;

use App\Models\SurveyResponse;
use App\Services\PageantRecommendationService;
use App\Services\TalentScoringService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class SurveyController extends Controller
{
    private TalentScoringService $scoringService;
    private PageantRecommendationService $recommendationService;

    public function __construct(
        TalentScoringService $scoringService,
        PageantRecommendationService $recommendationService
    ) {
        $this->scoringService = $scoringService;
        $this->recommendationService = $recommendationService;
    }

    public function submit(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'section' => 'required|string|in:A,B,C,D',
            'answers' => 'required|array|min:1',
            'answers.*.question_code' => 'required|string',
            'answers.*.answer_value' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $userId = $request->user()->id;
        $section = $request->input('section');
        $answers = $request->input('answers');

        try {
            DB::transaction(function () use ($userId, $section, $answers) {
                foreach ($answers as $answer) {
                    $answerValue = $answer['answer_value'];

                    // Convert arrays to JSON
                    if (is_array($answerValue)) {
                        $answerValue = json_encode($answerValue);
                    }

                    SurveyResponse::updateOrCreate(
                        [
                            'user_id' => $userId,
                            'question_code' => $answer['question_code'],
                        ],
                        [
                            'section' => $section,
                            'answer_value' => $answerValue,
                            'submitted_at' => now(),
                        ]
                    );
                }
            });

            $nextSection = $this->getNextSection($section);

            return response()->json([
                'success' => true,
                'section_completed' => $section,
                'next_section' => $nextSection,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to save survey responses',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function progress(Request $request): JsonResponse
    {
        $userId = $request->user()->id;

        $responses = SurveyResponse::where('user_id', $userId)
            ->select('section', DB::raw('COUNT(*) as count'))
            ->groupBy('section')
            ->get();

        $completedSections = $responses->pluck('section')->toArray();
        $answeredQuestions = $responses->sum('count');

        $currentSection = $this->determineCurrentSection($completedSections);

        return response()->json([
            'completed_sections' => $completedSections,
            'current_section' => $currentSection,
            'total_questions' => 30,
            'answered_questions' => $answeredQuestions,
        ]);
    }

    public function calculate(Request $request): JsonResponse
    {
        $userId = $request->user()->id;

        try {
            $result = $this->scoringService->calculateScoresForUser($userId);

            // Generate radar chart data
            $radarChartData = $this->formatRadarChartData($result['criteria_scores']);

            return response()->json([
                'tier' => $result['tier'],
                'overall_score' => $result['overall_score'],
                'criteria_scores' => $result['criteria_scores'],
                'radar_chart_data' => $radarChartData,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to calculate scores',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function recommendations(Request $request): JsonResponse
    {
        $userId = $request->user()->id;

        try {
            // Check if recommendations already exist
            $existingRecommendations = $this->recommendationService->getRecommendationsForUser($userId);

            if (empty($existingRecommendations)) {
                // Generate new recommendations
                $result = $this->recommendationService->generateRecommendations($userId);
            } else {
                // Return existing recommendations
                $tier = $this->scoringService->getTierForUser($userId);
                $result = [
                    'tier' => $tier,
                    'pageants' => $existingRecommendations,
                ];
            }

            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to get recommendations',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    private function getNextSection(string $currentSection): ?string
    {
        $sections = ['A', 'B', 'C', 'D'];
        $currentIndex = array_search($currentSection, $sections);

        if ($currentIndex === false || $currentIndex === count($sections) - 1) {
            return null;
        }

        return $sections[$currentIndex + 1];
    }

    private function determineCurrentSection(array $completedSections): string
    {
        $allSections = ['A', 'B', 'C', 'D'];

        foreach ($allSections as $section) {
            if (!in_array($section, $completedSections)) {
                return $section;
            }
        }

        return 'D'; // All completed
    }

    private function formatRadarChartData(array $criteriaScores): array
    {
        $labels = [
            'M1.1' => 'Physical',
            'M1.2' => 'Beauty',
            'M1.3' => 'Social Media',
            'M1.4' => 'Communication',
            'M1.5' => 'Experience',
            'M1.6' => 'Education',
            'M1.7' => 'Personality',
            'M1.8' => 'Availability',
            'M1.9' => 'Health',
            'M1.10' => 'Skills',
        ];

        $data = [];
        foreach ($labels as $code => $label) {
            $data[] = [
                'label' => $label,
                'value' => $criteriaScores[$code] ?? 0,
            ];
        }

        return $data;
    }
}

