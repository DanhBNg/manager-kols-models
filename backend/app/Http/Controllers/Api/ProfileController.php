<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProfileController extends Controller
{
    public function showMine(Request $request): JsonResponse
    {
        abort_unless($request->user()?->type === 'talent', 403);

        return response()->json([
            'data' => $request->user()
                ->profile()
                ->with(['user:id,name,type,is_verified,avatar', 'photos', 'videos', 'socialAccounts', 'calendarEvents'])
                ->first(),
        ]);
    }

    public function show(Profile $profile): JsonResponse
    {
        abort_unless($profile->is_public || request()->user()?->id === $profile->user_id, 404);

        return response()->json([
            'data' => $profile->load(['user:id,name,type,is_verified,avatar', 'photos', 'videos', 'socialAccounts', 'calendarEvents']),
        ]);
    }

    public function updateMine(Request $request): JsonResponse
    {
        abort_unless($request->user()?->type === 'talent', 403);

        $validated = $this->validatedProfile($request);
        $validated['slug'] = $request->user()->profile?->slug ?: Str::slug($validated['display_name']).'-'.$request->user()->id;
        $validated['full_name'] = $request->user()->name;
        $validated['profile_completion'] = $this->completionScore($validated);

        $profile = $request->user()->profile()->updateOrCreate(
            ['user_id' => $request->user()->id],
            $validated
        );

        return response()->json(['data' => $profile]);
    }

    public function completion(Profile $profile): JsonResponse
    {
        $fields = [
            'display_name',
            'talent_types',
            'city',
            'gender',
            'birth_date',
            'height_cm',
            'skills',
            'bio',
        ];

        $missing = collect($fields)->filter(fn (string $field): bool => blank($profile->{$field}))->values();
        $score = (int) round((($fieldsCount = count($fields)) - $missing->count()) / $fieldsCount * 100);

        $profile->forceFill(['profile_completion' => $score])->save();

        return response()->json([
            'data' => [
                'score' => $score,
                'missing_fields' => $missing,
            ],
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    private function validatedProfile(Request $request): array
    {
        return $request->validate([
            'display_name' => ['required', 'string', 'max:100'],
            'talent_types' => ['required', 'array', 'min:1'],
            'talent_types.*' => ['string', 'max:50'],
            'city' => ['required', 'string', 'max:100'],
            'district' => ['nullable', 'string', 'max:100'],
            'gender' => ['nullable', 'string', 'max:20'],
            'birth_date' => ['nullable', 'date'],
            'height_cm' => ['nullable', 'integer', 'min:80', 'max:250'],
            'weight_kg' => ['nullable', 'integer', 'min:20', 'max:250'],
            'measurements' => ['nullable', 'string', 'max:50'],
            'skin_tone' => ['nullable', 'string', 'max:50'],
            'hair_color' => ['nullable', 'string', 'max:50'],
            'has_tattoo' => ['nullable', 'boolean'],
            'tattoo_description' => ['nullable', 'string', 'max:1000'],
            'languages' => ['nullable', 'array'],
            'languages.*' => ['string', 'max:50'],
            'experience' => ['nullable', 'string', 'max:3000'],
            'skills' => ['nullable', 'array'],
            'skills.*' => ['string', 'max:100'],
            'experience_years' => ['nullable', 'integer', 'min:0', 'max:80'],
            'work_radius' => ['nullable', 'integer', 'min:0', 'max:1000'],
            'preferred_cities' => ['nullable', 'array'],
            'preferred_cities.*' => ['string', 'max:100'],
            'bio' => ['nullable', 'string', 'max:3000'],
            'budget_min' => ['nullable', 'integer', 'min:0'],
            'budget_max' => ['nullable', 'integer', 'min:0', 'gte:budget_min'],
            'is_public' => ['nullable', 'boolean'],
        ]);
    }

    /**
     * @param array<string, mixed> $data
     */
    private function completionScore(array $data): int
    {
        $required = ['display_name', 'talent_types', 'city', 'gender', 'birth_date', 'height_cm', 'skills', 'bio'];
        $filled = collect($required)->filter(fn (string $field): bool => filled($data[$field] ?? null))->count();

        return (int) round($filled / count($required) * 100);
    }
}
