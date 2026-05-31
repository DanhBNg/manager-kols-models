import { apiFetch, type ApiResponse } from "@/lib/api-client";
import type { Campaign, CampaignStage } from "@/lib/brand-mvp-data";

export type CampaignFormInput = {
  title: string;
  jobType: string;
  city: string;
  address: string;
  startDate: string;
  endDate: string;
  talentQuantity: string;
  budget: string;
  requirements: string;
  description: string;
};

type BackendCampaignTalent = {
  profile_id: number;
  status?: CampaignStage | string | null;
  notes?: string | null;
};

type BackendCampaign = {
  id: number;
  title: string;
  job_type: string;
  description?: string | null;
  city?: string | null;
  location?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  talent_quantity?: number | null;
  budget_min?: number | null;
  budget_max?: number | null;
  requirements?: string | null;
  status: Campaign["status"];
  talents?: BackendCampaignTalent[];
};

function formatDate(value?: string | null) {
  return value?.slice(0, 10) || "";
}

function formatMoneyRange(min?: number | null, max?: number | null) {
  if (min && max) {
    return `${min.toLocaleString("vi-VN")}đ - ${max.toLocaleString("vi-VN")}đ`;
  }

  if (min) {
    return `Từ ${min.toLocaleString("vi-VN")}đ`;
  }

  if (max) {
    return `Đến ${max.toLocaleString("vi-VN")}đ`;
  }

  return "Thỏa thuận";
}

function parseMoneyRange(value: string) {
  const numbers = value
    .split("-")
    .map((item) => Number.parseInt(item.replace(/[^\d]/g, ""), 10))
    .filter(Number.isFinite);

  return {
    budget_min: numbers[0] ?? null,
    budget_max: numbers[1] ?? numbers[0] ?? null,
  };
}

function normalizeStage(value?: string | null): CampaignStage {
  if (value === "shortlisted" || value === "interview" || value === "accepted" || value === "confirmed") {
    return value;
  }

  return "new";
}

export function mapBackendCampaign(campaign: BackendCampaign): Campaign {
  const applicants = campaign.talents?.map((item) => ({
    talentId: String(item.profile_id),
    stage: normalizeStage(item.status),
    note: item.notes || "Chưa có ghi chú.",
  })) ?? [];

  return {
    id: String(campaign.id),
    title: campaign.title,
    jobType: campaign.job_type,
    city: campaign.city || "Chưa cập nhật",
    address: campaign.location || campaign.city || "Chưa cập nhật",
    startDate: formatDate(campaign.start_date),
    endDate: formatDate(campaign.end_date),
    deadline: formatDate(campaign.start_date || campaign.end_date),
    talentQuantity: campaign.talent_quantity ?? 1,
    budget: formatMoneyRange(campaign.budget_min, campaign.budget_max),
    budgetValue: campaign.budget_max ?? campaign.budget_min ?? 0,
    benefits: "Thỏa thuận theo brief",
    status: campaign.status,
    shortlistedTalentIds: applicants.filter((item) => item.stage === "shortlisted").map((item) => item.talentId),
    applicants,
    contactRequests: 0,
    views: 0,
    description: campaign.description || "Chưa có mô tả brief.",
    requirements: campaign.requirements || "Chưa có yêu cầu chi tiết.",
  };
}

export function toCampaignPayload(input: CampaignFormInput) {
  const budget = parseMoneyRange(input.budget);

  return {
    title: input.title,
    job_type: input.jobType,
    description: input.description || null,
    city: input.city || null,
    location: input.address || input.city || null,
    start_date: input.startDate || null,
    end_date: input.endDate || null,
    talent_quantity: Number(input.talentQuantity) || 1,
    budget_min: budget.budget_min,
    budget_max: budget.budget_max,
    requirements: input.requirements || null,
  };
}

export async function fetchCampaigns() {
  const response = await apiFetch<ApiResponse<BackendCampaign[]>>("/campaigns");

  return response.data.map(mapBackendCampaign);
}

export async function createCampaign(input: CampaignFormInput) {
  const response = await apiFetch<ApiResponse<BackendCampaign>>("/campaigns", {
    method: "POST",
    body: JSON.stringify(toCampaignPayload(input)),
  });

  return mapBackendCampaign(response.data);
}

export async function publishCampaign(id: string) {
  const response = await apiFetch<ApiResponse<BackendCampaign>>(`/campaigns/${id}/publish`, {
    method: "POST",
  });

  return mapBackendCampaign(response.data);
}

export async function closeCampaign(id: string) {
  const response = await apiFetch<ApiResponse<BackendCampaign>>(`/campaigns/${id}/close`, {
    method: "POST",
  });

  return mapBackendCampaign(response.data);
}

export async function addCampaignTalent(input: {
  campaignId: string;
  profileId: string;
  status?: CampaignStage;
  notes?: string;
}) {
  await apiFetch(`/campaigns/${input.campaignId}/talents`, {
    method: "POST",
    body: JSON.stringify({
      profile_id: Number(input.profileId),
      status: input.status ?? "shortlisted",
      notes: input.notes || null,
    }),
  });
}
