<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Campaign;
use App\Models\ContactRequest;
use App\Models\Profile;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactRequestController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $this->ensureBrand($request);

        return response()->json([
            'data' => ContactRequest::query()
                ->where('brand_user_id', $request->user()->id)
                ->with(['talent:id,name,type,is_verified,avatar', 'campaign'])
                ->latest()
                ->get(),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $this->ensureBrand($request);

        $validated = $request->validate([
            'profile_id' => ['required', 'exists:profiles,id'],
            'campaign_id' => ['nullable', 'exists:campaigns,id'],
            'message' => ['nullable', 'string', 'max:3000'],
        ]);

        $profile = Profile::query()->public()->findOrFail($validated['profile_id']);

        if (isset($validated['campaign_id'])) {
            $campaign = Campaign::findOrFail($validated['campaign_id']);
            abort_unless($campaign->owner_user_id === $request->user()->id, 404);
        }

        $contactRequest = ContactRequest::create([
            'brand_user_id' => $request->user()->id,
            'talent_user_id' => $profile->user_id,
            'campaign_id' => $validated['campaign_id'] ?? null,
            'message' => $validated['message'] ?? null,
            'status' => 'pending',
        ]);

        return response()->json([
            'data' => $contactRequest->load(['talent:id,name,type,is_verified,avatar', 'campaign']),
        ], 201);
    }

    public function show(Request $request, ContactRequest $contactRequest): JsonResponse
    {
        $this->ensureOwnsContactRequest($request, $contactRequest);

        return response()->json([
            'data' => $contactRequest->load(['talent:id,name,type,is_verified,avatar', 'campaign']),
        ]);
    }

    public function cancel(Request $request, ContactRequest $contactRequest): JsonResponse
    {
        $this->ensureOwnsContactRequest($request, $contactRequest);

        $contactRequest->forceFill(['status' => 'cancelled'])->save();

        return response()->json([
            'data' => $contactRequest->fresh()->load(['talent:id,name,type,is_verified,avatar', 'campaign']),
        ]);
    }

    private function ensureBrand(Request $request): void
    {
        abort_unless($request->user()?->type === 'brand', 403);
    }

    private function ensureOwnsContactRequest(Request $request, ContactRequest $contactRequest): void
    {
        $this->ensureBrand($request);
        abort_unless($contactRequest->brand_user_id === $request->user()->id, 404);
    }
}
