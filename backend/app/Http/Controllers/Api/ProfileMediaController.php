<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Photo;
use App\Models\Profile;
use App\Models\Video;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProfileMediaController extends Controller
{
    public function storePhoto(Request $request, Profile $profile): JsonResponse
    {
        $this->ensureOwnsProfile($request, $profile);

        $validated = $request->validate([
            'file' => ['required', 'file', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
            'category' => ['nullable', 'string', 'max:50'],
            'caption' => ['nullable', 'string', 'max:255'],
            'is_primary' => ['nullable', 'boolean'],
        ]);

        $file = $request->file('file');
        $path = $file->store('profiles/'.$profile->id.'/photos', 'public');
        [$width, $height] = function_exists('getimagesize')
            ? (@getimagesize($file->getRealPath()) ?: [null, null])
            : [null, null];

        $photo = $profile->photos()->create([
            'path' => $path,
            'url' => '/storage/'.$path,
            'disk' => 'public',
            'caption' => $validated['caption'] ?? null,
            'category' => $validated['category'] ?? 'portfolio',
            'width' => $width,
            'height' => $height,
            'file_size' => $file->getSize(),
            'is_cover' => (bool) ($validated['is_primary'] ?? false),
            'is_primary' => (bool) ($validated['is_primary'] ?? false),
            'uploaded_at' => now(),
        ]);

        return response()->json(['data' => $photo], 201);
    }

    public function destroyPhoto(Request $request, Profile $profile, Photo $photo): JsonResponse
    {
        $this->ensureOwnsProfile($request, $profile);
        abort_unless($photo->profile_id === $profile->id, 404);
        $photo->delete();

        return response()->json(null, 204);
    }

    public function storeVideo(Request $request, Profile $profile): JsonResponse
    {
        $this->ensureOwnsProfile($request, $profile);

        $validated = $request->validate([
            'url' => ['required', 'url', 'max:1000'],
            'title' => ['nullable', 'string', 'max:255'],
            'video_type' => ['nullable', 'string', 'max:50'],
            'duration' => ['nullable', 'integer', 'min:0'],
            'thumbnail_url' => ['nullable', 'url', 'max:1000'],
        ]);

        $video = $profile->videos()->create($validated + ['uploaded_at' => now()]);

        return response()->json(['data' => $video], 201);
    }

    private function ensureOwnsProfile(Request $request, Profile $profile): void
    {
        abort_unless($request->user()?->id === $profile->user_id, 403);
    }
}
