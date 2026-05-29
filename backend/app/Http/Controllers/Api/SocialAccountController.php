<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use App\Models\SocialAccount;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SocialAccountController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'profile_id' => ['required', 'exists:profiles,id'],
            'platform' => ['required', 'string', 'max:50'],
            'handle' => ['nullable', 'string', 'max:100'],
            'username' => ['nullable', 'string', 'max:100'],
            'url' => ['nullable', 'url', 'max:1000'],
            'followers_count' => ['nullable', 'integer', 'min:0'],
        ]);

        $profile = Profile::findOrFail($validated['profile_id']);
        abort_unless($profile->user_id === $request->user()->id, 403);

        $account = $profile->socialAccounts()->create($validated + [
            'user_id' => $request->user()->id,
            'username' => $validated['username'] ?? $validated['handle'] ?? null,
            'followers_count' => $validated['followers_count'] ?? 0,
        ]);

        return response()->json(['data' => $account], 201);
    }

    public function metrics(Request $request, SocialAccount $socialAccount): JsonResponse
    {
        abort_unless($socialAccount->user_id === $request->user()->id, 403);

        $validated = $request->validate([
            'followers_count' => ['required', 'integer', 'min:0'],
            'following_count' => ['nullable', 'integer', 'min:0'],
            'posts_count' => ['nullable', 'integer', 'min:0'],
            'engagement_rate' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'authenticity_score' => ['nullable', 'numeric', 'min:0', 'max:100'],
        ]);

        $metric = $socialAccount->metricsHistory()->create($validated + ['recorded_at' => now()]);
        $socialAccount->forceFill([
            'followers_count' => $validated['followers_count'],
            'last_synced_at' => now(),
        ])->save();

        return response()->json(['data' => $metric], 201);
    }
}
