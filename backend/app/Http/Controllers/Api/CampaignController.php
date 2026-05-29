<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Campaign;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CampaignController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $this->ensureBrand($request);

        return response()->json([
            'data' => $request->user()->campaigns()->with('talents.profile.user:id,name,type,is_verified,avatar')->latest()->get(),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $this->ensureBrand($request);

        $campaign = $request->user()->campaigns()->create($this->validatedData($request) + [
            'status' => 'draft',
        ]);

        return response()->json(['data' => $campaign], 201);
    }

    public function show(Request $request, Campaign $campaign): JsonResponse
    {
        $this->ensureOwnsCampaign($request, $campaign);

        return response()->json([
            'data' => $campaign->load('talents.profile.user:id,name,type,is_verified,avatar'),
        ]);
    }

    public function update(Request $request, Campaign $campaign): JsonResponse
    {
        $this->ensureOwnsCampaign($request, $campaign);

        $campaign->update($this->validatedData($request));

        return response()->json(['data' => $campaign->fresh()]);
    }

    public function publish(Request $request, Campaign $campaign): JsonResponse
    {
        $this->ensureOwnsCampaign($request, $campaign);

        $campaign->forceFill([
            'status' => 'published',
            'published_at' => $campaign->published_at ?: now(),
        ])->save();

        return response()->json(['data' => $campaign->fresh()]);
    }

    public function close(Request $request, Campaign $campaign): JsonResponse
    {
        $this->ensureOwnsCampaign($request, $campaign);

        $campaign->forceFill(['status' => 'closed'])->save();

        return response()->json(['data' => $campaign->fresh()]);
    }

    /**
     * @return array<string, mixed>
     */
    private function validatedData(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'job_type' => ['required', 'string', 'max:100'],
            'description' => ['nullable', 'string', 'max:5000'],
            'city' => ['nullable', 'string', 'max:100'],
            'location' => ['nullable', 'string', 'max:255'],
            'start_date' => ['nullable', 'date'],
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],
            'talent_quantity' => ['nullable', 'integer', 'min:1', 'max:1000'],
            'budget_min' => ['nullable', 'integer', 'min:0'],
            'budget_max' => ['nullable', 'integer', 'min:0', 'gte:budget_min'],
            'requirements' => ['nullable', 'string', 'max:5000'],
            'status' => ['sometimes', Rule::in(['draft', 'published', 'closed'])],
        ]);
    }

    private function ensureBrand(Request $request): void
    {
        abort_unless($request->user()?->type === 'brand', 403);
    }

    private function ensureOwnsCampaign(Request $request, Campaign $campaign): void
    {
        $this->ensureBrand($request);
        abort_unless($campaign->owner_user_id === $request->user()->id, 404);
    }
}
