<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Wishlist;
use App\Models\WishlistItem;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class WishlistItemController extends Controller
{
    public function store(Request $request, Wishlist $wishlist): JsonResponse
    {
        $this->ensureOwnsWishlist($request, $wishlist);

        $validated = $request->validate([
            'profile_id' => ['required', 'exists:profiles,id'],
            'notes' => ['nullable', 'string', 'max:1000'],
        ]);

        try {
            $item = $wishlist->items()->create($validated);
        } catch (QueryException) {
            throw ValidationException::withMessages([
                'profile_id' => ['Talent nay da nam trong danh sach da luu.'],
            ]);
        }

        return response()->json([
            'data' => $item->load('profile.user:id,name,type,is_verified,avatar'),
        ], 201);
    }

    public function destroy(Request $request, Wishlist $wishlist, WishlistItem $item): JsonResponse
    {
        $this->ensureOwnsWishlist($request, $wishlist);
        abort_unless($item->wishlist_id === $wishlist->id, 404);

        $item->delete();

        return response()->json(null, 204);
    }

    private function ensureOwnsWishlist(Request $request, Wishlist $wishlist): void
    {
        abort_unless($request->user()?->type === 'brand', 403);
        abort_unless($wishlist->user_id === $request->user()->id, 404);
    }
}
