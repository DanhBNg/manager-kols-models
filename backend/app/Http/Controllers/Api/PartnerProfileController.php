<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PartnerProfileController extends Controller
{
    public function show(Request $request): JsonResponse
    {
        $this->ensureBrand($request);

        return response()->json([
            'data' => $request->user()->partnerProfile,
        ]);
    }

    public function update(Request $request): JsonResponse
    {
        $this->ensureBrand($request);

        $validated = $request->validate([
            'organization_name' => ['required', 'string', 'max:255'],
            'organization_type' => ['required', 'string', Rule::in(['brand', 'agency', 'recruiter', 'event_organizer'])],
            'industry' => ['nullable', 'string', 'max:100'],
            'website_url' => ['nullable', 'url', 'max:255'],
            'fanpage_url' => ['nullable', 'url', 'max:255'],
            'contact_name' => ['required', 'string', 'max:255'],
            'contact_phone' => ['nullable', 'string', 'max:20'],
            'contact_email' => ['required', 'email', 'max:255'],
            'city' => ['required', 'string', 'max:100'],
            'description' => ['nullable', 'string', 'max:2000'],
        ]);

        $profile = $request->user()->partnerProfile()->updateOrCreate(
            ['user_id' => $request->user()->id],
            $validated + ['verification_status' => 'pending']
        );

        return response()->json(['data' => $profile]);
    }

    private function ensureBrand(Request $request): void
    {
        abort_unless($request->user()?->type === 'brand', 403);
    }
}
