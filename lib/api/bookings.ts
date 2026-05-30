import { apiFetch, type ApiResponse } from "@/lib/api-client";

export type BookingFormInput = {
  campaignId: string;
  profileId: string;
  startsAt: string;
  endsAt: string;
  location: string;
  compensationAmount: string;
};

export type BackendBooking = {
  id: number;
  campaign_id?: number | null;
  partner_id: number;
  talent_user_id: number;
  starts_at: string;
  ends_at: string;
  location?: string | null;
  compensation_amount?: number | null;
  platform_commission_amount?: number | null;
  status: string;
  payment_status: string;
  campaign?: {
    id: number;
    title: string;
  } | null;
  partner?: {
    id: number;
    name: string;
  } | null;
  talent?: {
    id: number;
    name: string;
  } | null;
};

function optionalNumber(value: string) {
  const parsed = Number.parseInt(value.replace(/[^\d]/g, ""), 10);
  return Number.isFinite(parsed) ? parsed : null;
}

export async function fetchBookings() {
  const response = await apiFetch<ApiResponse<BackendBooking[]>>("/bookings");

  return response.data;
}

export async function createBooking(input: BookingFormInput) {
  const response = await apiFetch<ApiResponse<BackendBooking>>("/bookings", {
    method: "POST",
    body: JSON.stringify({
      campaign_id: input.campaignId ? Number(input.campaignId) : null,
      profile_id: Number(input.profileId),
      starts_at: input.startsAt,
      ends_at: input.endsAt,
      location: input.location || null,
      compensation_amount: optionalNumber(input.compensationAmount),
    }),
  });

  return response.data;
}
