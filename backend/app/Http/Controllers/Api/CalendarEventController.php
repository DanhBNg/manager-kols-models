<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CalendarEvent;
use App\Models\Profile;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CalendarEventController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        return response()->json([
            'data' => CalendarEvent::query()
                ->where('user_id', $request->user()->id)
                ->orderBy('starts_at')
                ->get(),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'profile_id' => ['required', 'exists:profiles,id'],
            'title' => ['required', 'string', 'max:255'],
            'status' => ['required', 'string', 'max:50'],
            'event_type' => ['nullable', 'string', 'max:50'],
            'starts_at' => ['required', 'date'],
            'ends_at' => ['required', 'date', 'after:starts_at'],
        ]);

        $profile = Profile::findOrFail($validated['profile_id']);
        abort_unless($profile->user_id === $request->user()->id, 403);

        $event = CalendarEvent::create($validated + [
            'user_id' => $request->user()->id,
            'event_type' => $validated['event_type'] ?? 'personal',
        ]);

        return response()->json(['data' => $event], 201);
    }

    public function update(Request $request, CalendarEvent $event): JsonResponse
    {
        abort_unless($event->user_id === $request->user()->id, 403);

        $event->update($request->validate([
            'title' => ['sometimes', 'string', 'max:255'],
            'status' => ['sometimes', 'string', 'max:50'],
            'event_type' => ['sometimes', 'string', 'max:50'],
            'starts_at' => ['sometimes', 'date'],
            'ends_at' => ['sometimes', 'date'],
        ]));

        return response()->json(['data' => $event->fresh()]);
    }

    public function destroy(Request $request, CalendarEvent $event): JsonResponse
    {
        abort_unless($event->user_id === $request->user()->id, 403);
        $event->delete();

        return response()->json(null, 204);
    }
}
