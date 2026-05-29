<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Campaign;
use App\Models\Profile;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Booking::query()->with(['campaign', 'partner:id,name,type', 'talent:id,name,type']);

        if ($request->user()->type === 'brand') {
            $query->where('partner_id', $request->user()->id);
        } else {
            $query->where('talent_user_id', $request->user()->id);
        }

        return response()->json(['data' => $query->latest()->get()]);
    }

    public function store(Request $request): JsonResponse
    {
        abort_unless($request->user()?->type === 'brand', 403);

        $validated = $request->validate([
            'campaign_id' => ['nullable', 'exists:campaigns,id'],
            'profile_id' => ['required', 'exists:profiles,id'],
            'starts_at' => ['required', 'date'],
            'ends_at' => ['required', 'date', 'after:starts_at'],
            'location' => ['nullable', 'string', 'max:255'],
            'compensation_amount' => ['nullable', 'integer', 'min:0'],
        ]);

        if (isset($validated['campaign_id'])) {
            $campaign = Campaign::findOrFail($validated['campaign_id']);
            abort_unless($campaign->owner_user_id === $request->user()->id, 404);
        }

        $profile = Profile::findOrFail($validated['profile_id']);
        $commission = isset($validated['compensation_amount'])
            ? (int) round($validated['compensation_amount'] * 0.1)
            : null;

        $booking = Booking::create([
            'campaign_id' => $validated['campaign_id'] ?? null,
            'partner_id' => $request->user()->id,
            'talent_user_id' => $profile->user_id,
            'starts_at' => $validated['starts_at'],
            'ends_at' => $validated['ends_at'],
            'location' => $validated['location'] ?? null,
            'compensation_amount' => $validated['compensation_amount'] ?? null,
            'platform_commission_amount' => $commission,
            'status' => 'pending',
            'payment_status' => 'pending',
        ]);

        return response()->json(['data' => $booking], 201);
    }
}
