import { apiFetch, type ApiResponse } from "@/lib/api-client";
import type { TalentProfile } from "@/lib/brand-mvp-data";

export type PartnerProfileForm = {
  organizationName: string;
  organizationType: string;
  industry: string;
  websiteUrl: string;
  fanpageUrl: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  city: string;
  description: string;
  verificationStatus?: string;
};

type BackendUser = {
  id: number;
  name: string;
  type: string;
  is_verified?: boolean;
  avatar?: string | null;
};

type BackendPhoto = {
  url?: string | null;
  path?: string | null;
  is_cover?: boolean;
  is_primary?: boolean;
};

type BackendSocialAccount = {
  platform: string;
  followers_count?: number;
};

export type BackendTalentProfile = {
  id: number;
  user?: BackendUser | null;
  full_name?: string | null;
  display_name?: string | null;
  talent_types?: string[] | null;
  city?: string | null;
  district?: string | null;
  gender?: string | null;
  birth_date?: string | null;
  height_cm?: number | null;
  weight_kg?: number | null;
  measurements?: string | null;
  skin_tone?: string | null;
  hair_color?: string | null;
  languages?: string[] | null;
  experience?: string | null;
  skills?: string[] | null;
  experience_years?: number | null;
  bio?: string | null;
  budget_min?: number | null;
  budget_max?: number | null;
  tier?: "A" | "B" | "C" | null;
  profile_completion?: number | null;
  rating?: string | number | null;
  verification_status?: string | null;
  photos?: BackendPhoto[];
  social_accounts?: BackendSocialAccount[];
  socialAccounts?: BackendSocialAccount[];
};

type BackendPartnerProfile = {
  organization_name?: string | null;
  organization_type?: string | null;
  industry?: string | null;
  website_url?: string | null;
  fanpage_url?: string | null;
  contact_name?: string | null;
  contact_phone?: string | null;
  contact_email?: string | null;
  city?: string | null;
  description?: string | null;
  verification_status?: string | null;
};

type BackendWishlist = {
  id: number;
  name: string;
  items?: Array<{
    id: number;
    profile_id: number;
    notes?: string | null;
    profile?: BackendTalentProfile;
  }>;
};

function calculateAge(birthDate?: string | null) {
  if (!birthDate) {
    return 22;
  }

  const birthday = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birthday.getFullYear();
  const monthDelta = today.getMonth() - birthday.getMonth();

  if (monthDelta < 0 || (monthDelta === 0 && today.getDate() < birthday.getDate())) {
    age -= 1;
  }

  return Number.isFinite(age) ? age : 22;
}

function parseMeasurements(value?: string | null) {
  const [bust, waist, hips] = (value ?? "")
    .split(/[/-]/)
    .map((item) => Number.parseInt(item.trim(), 10));

  return {
    bust: Number.isFinite(bust) ? bust : 84,
    waist: Number.isFinite(waist) ? waist : 60,
    hips: Number.isFinite(hips) ? hips : 88,
  };
}

function formatMoney(value?: number | null) {
  if (!value) {
    return "Liên hệ";
  }

  return `từ ${value.toLocaleString("vi-VN")}đ`;
}

function getPhotoUrl(profile: BackendTalentProfile, fallback: string) {
  const photo = profile.photos?.find((item) => item.is_primary || item.is_cover) ?? profile.photos?.[0];

  return photo?.url || photo?.path || profile.user?.avatar || fallback;
}

export function mapBackendTalent(profile: BackendTalentProfile): TalentProfile {
  const measurements = parseMeasurements(profile.measurements);
  const socialAccounts = profile.social_accounts ?? profile.socialAccounts ?? [];
  const followersCount = socialAccounts.reduce((total, account) => total + (account.followers_count ?? 0), 0);
  const followers = followersCount >= 1000 ? `${Math.round(followersCount / 1000)}K` : followersCount.toString();
  const completion = profile.profile_completion ?? 0;
  const avatar = getPhotoUrl(profile, "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&h=500&q=80");

  return {
    id: String(profile.id),
    name: profile.display_name || profile.full_name || profile.user?.name || "Talent chưa đặt tên",
    type: profile.talent_types?.[0] ?? "Talent",
    city: profile.city ?? "Chưa cập nhật",
    district: profile.district ?? "Chưa cập nhật",
    gender: profile.gender ?? "Khác",
    age: calculateAge(profile.birth_date),
    height: profile.height_cm ?? 165,
    weight: profile.weight_kg ?? 50,
    bust: measurements.bust,
    waist: measurements.waist,
    hips: measurements.hips,
    skinTone: profile.skin_tone ?? "Chưa cập nhật",
    hairColor: profile.hair_color ?? "Chưa cập nhật",
    yearsOfExperience: profile.experience_years ?? 0,
    tier: profile.tier ?? "C",
    verified: profile.verification_status === "verified" || Boolean(profile.user?.is_verified),
    rating: Number(profile.rating ?? 0),
    completedJobs: 0,
    responseRate: 90,
    followersCount,
    followers,
    engagementRate: 0,
    platforms: socialAccounts.map((account) => account.platform),
    rateValue: profile.budget_min ?? 0,
    rate: formatMoney(profile.budget_min),
    rateUnit: "dự án",
    avatar,
    cover: avatar,
    fullBodyImage: avatar,
    skills: profile.skills ?? [],
    experience: profile.experience || profile.bio || "Talent chưa cập nhật kinh nghiệm.",
    portfolio: profile.photos?.length ? profile.photos.map((_, index) => `Ảnh portfolio ${index + 1}`) : ["Portfolio đang cập nhật"],
    availability: "Lịch rảnh đang cập nhật",
    availabilityDates: [],
    completion,
    matchScore: completion,
    reliability: completion,
    education: "Chưa cập nhật",
    languages: profile.languages ?? ["Tiếng Việt"],
    rateCard: {
      "Dự án": profile.budget_min ?? 0,
      "Ngân sách tối đa": profile.budget_max ?? profile.budget_min ?? 0,
    },
  };
}

export function mapPartnerProfile(profile?: BackendPartnerProfile | null): PartnerProfileForm {
  return {
    organizationName: profile?.organization_name ?? "",
    organizationType: profile?.organization_type ?? "brand",
    industry: profile?.industry ?? "",
    websiteUrl: profile?.website_url ?? "",
    fanpageUrl: profile?.fanpage_url ?? "",
    contactName: profile?.contact_name ?? "",
    contactPhone: profile?.contact_phone ?? "",
    contactEmail: profile?.contact_email ?? "",
    city: profile?.city ?? "",
    description: profile?.description ?? "",
    verificationStatus: profile?.verification_status ?? "pending",
  };
}

export function toPartnerProfilePayload(profile: PartnerProfileForm) {
  return {
    organization_name: profile.organizationName,
    organization_type: profile.organizationType,
    industry: profile.industry || null,
    website_url: profile.websiteUrl || null,
    fanpage_url: profile.fanpageUrl || null,
    contact_name: profile.contactName,
    contact_phone: profile.contactPhone || null,
    contact_email: profile.contactEmail,
    city: profile.city,
    description: profile.description || null,
  };
}

export async function fetchPartnerProfile() {
  const response = await apiFetch<ApiResponse<BackendPartnerProfile | null>>("/partner/profile");

  return mapPartnerProfile(response.data);
}

export async function updatePartnerProfile(profile: PartnerProfileForm) {
  const response = await apiFetch<ApiResponse<BackendPartnerProfile>>("/partner/profile", {
    method: "PUT",
    body: JSON.stringify(toPartnerProfilePayload(profile)),
  });

  return mapPartnerProfile(response.data);
}

export async function fetchTalents(params?: URLSearchParams) {
  const query = params?.toString();
  const response = await apiFetch<ApiResponse<BackendTalentProfile[]>>(`/talents${query ? `?${query}` : ""}`);

  return response.data.map(mapBackendTalent);
}

export async function fetchTalent(id: string) {
  const response = await apiFetch<ApiResponse<BackendTalentProfile>>(`/talents/${id}`);

  return mapBackendTalent(response.data);
}

export async function fetchWishlists() {
  const response = await apiFetch<ApiResponse<BackendWishlist[]>>("/wishlists");

  return response.data;
}
