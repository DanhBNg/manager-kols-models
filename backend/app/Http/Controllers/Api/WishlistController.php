<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Wishlist;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $this->ensureBrand($request);

        return response()->json([
            'data' => $request->user()->wishlists()->with('items.profile.user:id,name,type,is_verified,avatar')->get(),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $this->ensureBrand($request);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
        ]);

        $wishlist = $request->user()->wishlists()->create($validated);

        return response()->json(['data' => $wishlist], 201);
    }

    public function show(Request $request, Wishlist $wishlist): JsonResponse
    {
        $this->ensureOwnsWishlist($request, $wishlist);

        return response()->json([
            'data' => $wishlist->load('items.profile.user:id,name,type,is_verified,avatar'),
        ]);
    }

    private function ensureBrand(Request $request): void
    {
        abort_unless($request->user()?->type === 'brand', 403);
    }

    private function ensureOwnsWishlist(Request $request, Wishlist $wishlist): void
    {
        $this->ensureBrand($request);
        abort_unless($wishlist->user_id === $request->user()->id, 404);
    }
}
