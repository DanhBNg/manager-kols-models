import { apiFetch, type ApiResponse } from "@/lib/api-client";
import { mapBackendTalent, type BackendTalentProfile } from "@/lib/brand-api";
import type { TalentProfile } from "@/lib/brand-mvp-data";

export type BackendWishlist = {
  id: number;
  name: string;
  description?: string | null;
  items?: BackendWishlistItem[];
};

export type BackendWishlistItem = {
  id: number;
  wishlist_id: number;
  profile_id: number;
  notes?: string | null;
  profile?: BackendTalentProfile | null;
};

export type SavedTalent = TalentProfile & {
  wishlistId: string;
  wishlistItemId: string;
  notes: string;
};

export async function fetchWishlists() {
  const response = await apiFetch<ApiResponse<BackendWishlist[]>>("/wishlists");

  return response.data;
}

export function mapSavedTalents(wishlists: BackendWishlist[]): SavedTalent[] {
  return wishlists.flatMap((wishlist) => (
    wishlist.items ?? []
  ).filter((item) => item.profile).map((item) => ({
    ...mapBackendTalent(item.profile as BackendTalentProfile),
    wishlistId: String(wishlist.id),
    wishlistItemId: String(item.id),
    notes: item.notes ?? "",
  })));
}

export async function ensureDefaultWishlist(wishlists?: BackendWishlist[]) {
  const existing = wishlists?.[0];
  if (existing) {
    return existing;
  }

  const response = await apiFetch<ApiResponse<BackendWishlist>>("/wishlists", {
    method: "POST",
    body: JSON.stringify({
      name: "Talent đã lưu",
      description: "Danh sách talent lưu nhanh từ frontend test.",
    }),
  });

  return response.data;
}

export async function addWishlistItem(input: {
  wishlistId: string;
  profileId: string;
  notes?: string;
}) {
  const response = await apiFetch<ApiResponse<BackendWishlistItem>>(`/wishlists/${input.wishlistId}/items`, {
    method: "POST",
    body: JSON.stringify({
      profile_id: Number(input.profileId),
      notes: input.notes || null,
    }),
  });

  return response.data;
}

export async function deleteWishlistItem(input: {
  wishlistId: string;
  itemId: string;
}) {
  await apiFetch(`/wishlists/${input.wishlistId}/items/${input.itemId}`, {
    method: "DELETE",
  });
}
