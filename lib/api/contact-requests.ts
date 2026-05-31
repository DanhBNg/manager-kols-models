import { apiFetch, type ApiResponse } from "@/lib/api-client";

export type BackendContactRequest = {
  id: number;
  brand_user_id: number;
  talent_user_id: number;
  campaign_id?: number | null;
  message?: string | null;
  status: string;
  created_at: string;
  talent?: {
    id: number;
    name: string;
    type: string;
    is_verified?: boolean;
    avatar?: string | null;
  } | null;
  campaign?: {
    id: number;
    title: string;
  } | null;
};

export async function fetchContactRequests() {
  const response = await apiFetch<ApiResponse<BackendContactRequest[]>>("/contact-requests");

  return response.data;
}

export async function createContactRequest(input: {
  profileId: string;
  campaignId?: string;
  message?: string;
}) {
  const response = await apiFetch<ApiResponse<BackendContactRequest>>("/contact-requests", {
    method: "POST",
    body: JSON.stringify({
      profile_id: Number(input.profileId),
      campaign_id: input.campaignId ? Number(input.campaignId) : null,
      message: input.message || null,
    }),
  });

  return response.data;
}
