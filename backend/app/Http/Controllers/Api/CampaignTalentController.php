<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Campaign;
use App\Models\CampaignTalent;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class CampaignTalentController extends Controller
{
    public function index(Request $request, Campaign $campaign): JsonResponse
    {
        $this->ensureOwnsCampaign($request, $campaign);

        return response()->json([
            'data' => $campaign->talents()->with('profile.user:id,name,type,is_verified,avatar')->get(),
        ]);
    }

    public function store(Request $request, Campaign $campaign): JsonResponse
    {
        $this->ensureOwnsCampaign($request, $campaign);

        $validated = $this->validatedData($request);

        if ($campaign->talents()->where('profile_id', $validated['profile_id'])->exists()) {
            throw ValidationException::withMessages([
                'profile_id' => ['Talent nay da nam trong campaign.'],
            ]);
        }

        $talent = $campaign->talents()->create($validated);

        return response()->json([
            'data' => $talent->load('profile.user:id,name,type,is_verified,avatar'),
        ], 201);
    }

    public function update(Request $request, Campaign $campaign, CampaignTalent $campaignTalent): JsonResponse
    {
        $this->ensureOwnsCampaign($request, $campaign);
        abort_unless($campaignTalent->campaign_id === $campaign->id, 404);

        $campaignTalent->update($this->validatedData($request, false));

        return response()->json([
            'data' => $campaignTalent->fresh()->load('profile.user:id,name,type,is_verified,avatar'),
        ]);
    }

    public function destroy(Request $request, Campaign $campaign, CampaignTalent $campaignTalent): JsonResponse
    {
        $this->ensureOwnsCampaign($request, $campaign);
        abort_unless($campaignTalent->campaign_id === $campaign->id, 404);

        $campaignTalent->delete();

        return response()->json(null, 204);
    }

    /**
     * @return array<string, mixed>
     */
    private function validatedData(Request $request, bool $requireProfile = true): array
    {
        return $request->validate([
            'profile_id' => [$requireProfile ? 'required' : 'sometimes', 'exists:profiles,id'],
            'status' => ['required', Rule::in(['new', 'shortlisted', 'interview', 'accepted', 'confirmed', 'rejected'])],
            'notes' => ['nullable', 'string', 'max:2000'],
        ]);
    }

    private function ensureOwnsCampaign(Request $request, Campaign $campaign): void
    {
        abort_unless($request->user()?->type === 'brand', 403);
        abort_unless($campaign->owner_user_id === $request->user()->id, 404);
    }
}
