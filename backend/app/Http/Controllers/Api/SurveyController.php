<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PageantRecommendation;
use App\Models\SurveyResponse;
use App\Models\TalentScore;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SurveyController extends Controller
{
    public function submit(Request $request): JsonResponse
    {
        abort_unless($request->user()?->type === 'talent', 403);

        $validated = $request->validate([
            'section' => ['required', 'string', 'size:1'],
            'answers' => ['required', 'array', 'min:1'],
            'answers.*.question_code' => ['required', 'string', 'max:10'],
            'answers.*.answer_value' => ['required'],
        ]);

        foreach ($validated['answers'] as $answer) {
            SurveyResponse::updateOrCreate(
                [
                    'user_id' => $request->user()->id,
                    'question_code' => $answer['question_code'],
                ],
                [
                    'section' => $validated['section'],
                    'answer_value' => $answer['answer_value'],
                    'submitted_at' => now(),
                ]
            );
        }

        return response()->json([
            'success' => true,
            'section_completed' => $validated['section'],
            'answered_questions' => SurveyResponse::where('user_id', $request->user()->id)->count(),
        ]);
    }

    public function progress(Request $request): JsonResponse
    {
        $responses = SurveyResponse::where('user_id', $request->user()->id)->get();

        return response()->json([
            'completed_sections' => $responses->pluck('section')->unique()->values(),
            'total_questions' => 30,
            'answered_questions' => $responses->count(),
        ]);
    }

    public function calculate(Request $request): JsonResponse
    {
        abort_unless($request->user()?->type === 'talent', 403);

        $answers = SurveyResponse::where('user_id', $request->user()->id)
            ->pluck('answer_value', 'question_code')
            ->map(fn (mixed $value): mixed => is_array($value) && count($value) === 1 ? $value[0] : $value)
            ->all();

        $height = (int) ($answers['A1'] ?? 165);
        $experienceYears = (int) ($answers['B1'] ?? 0);
        $followers = (int) ($answers['C1'] ?? 0);

        $criteria = [
            'M1.1' => $height >= 170 ? 8.0 : ($height >= 160 ? 6.5 : 4.0),
            'M1.2' => 7.0,
            'M1.3' => $followers >= 100000 ? 8.5 : ($followers >= 10000 ? 7.0 : 5.0),
            'M1.4' => 7.0,
            'M1.5' => min(10, 5 + $experienceYears),
            'M1.6' => 6.5,
            'M1.7' => 7.0,
            'M1.8' => 7.0,
            'M1.9' => 7.0,
            'M1.10' => 6.5,
        ];

        $overall = array_sum($criteria) / count($criteria) * 10;
        $tier = $overall >= 90 ? 'S' : ($overall >= 70 ? 'A' : ($overall >= 45 ? 'B' : 'C'));

        foreach ($criteria as $code => $score) {
            TalentScore::updateOrCreate(
                ['user_id' => $request->user()->id, 'criterion_code' => $code],
                ['score' => $score, 'tier' => $tier, 'calculated_at' => now()]
            );
        }

        $request->user()->profile?->forceFill([
            'tier' => $tier,
            'tier_updated_at' => now(),
        ])->save();

        $this->storeRecommendations($request->user()->id, $tier);

        return response()->json([
            'tier' => $tier,
            'overall_score' => round($overall, 2),
            'criteria_scores' => $criteria,
        ]);
    }

    public function recommendations(Request $request): JsonResponse
    {
        return response()->json([
            'tier' => $request->user()->profile?->tier,
            'pageants' => PageantRecommendation::where('user_id', $request->user()->id)
                ->orderByDesc('match_score')
                ->get()
                ->map(fn (PageantRecommendation $item): array => [
                    'name' => $item->pageant_name,
                    'match_score' => (float) $item->match_score,
                    'reasoning' => $item->reasoning,
                ])
                ->values(),
        ]);
    }

    private function storeRecommendations(int $userId, string $tier): void
    {
        PageantRecommendation::where('user_id', $userId)->delete();

        $pool = match ($tier) {
            'S' => ['Miss Universe Vietnam', 'Miss World Vietnam', 'Miss International Vietnam'],
            'A' => ['Miss Earth Vietnam', 'Miss Grand Vietnam', 'Miss Cosmo Vietnam'],
            'B' => ['Miss Tourism Vietnam', 'Miss Charm Vietnam', 'Regional Pageant'],
            default => ['Local Pageant', 'Talent Show', 'Miss Photogenic'],
        };

        foreach ($pool as $index => $name) {
            PageantRecommendation::create([
                'user_id' => $userId,
                'pageant_name' => $name,
                'match_score' => 90 - ($index * 5),
                'reasoning' => 'Phu hop voi tier '.$tier.' va du lieu khao sat hien tai.',
                'recommended_at' => now(),
            ]);
        }
    }
}
