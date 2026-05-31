import { apiFetch, type ApiResponse } from "@/lib/api-client";
import { mapBackendTalent, type BackendTalentProfile } from "@/lib/brand-api";

type BackendCalendarEvent = {
  id: number;
  title: string;
  status: string;
  event_type?: string | null;
  starts_at: string;
  ends_at: string;
};

export const defaultTalentProfile = {
  name: "Nguyễn Mai Anh",
  birthYear: 2002,
  location: "Hà Nội",
  hometown: "Nam Định",
  phone: "0912345678",
  email: "maianh.nguyen@beautyapp.vn",
  avatar: "/avatar.png",
  height: 172,
  weight: 51,
  bust: 85,
  waist: 60,
  hips: 90,
  plasticSurgery: "false",
  maritalStatus: "Độc thân",
  education: "Cử nhân Học viện Ngoại giao",
  languages: ["Tiếng Việt", "Tiếng Anh (IELTS 7.5)"],
  skills: ["Catwalk", "MC song ngữ", "Social Content", "Pose dáng lookbook"],
  followersCount: 120000,
  engagementRate: 4.8,
  profileScore: 82,
  tier: "A",
  rateCard: {
    "Instagram Post": 3000000,
    "TikTok Video": 5000000,
    "Livestream 2h": 8000000,
    "Catwalk Show": 15000000,
  },
  availabilityCalendar: ["2026-06-24", "2026-06-25", "2026-06-28"],
  reliability: 96,
  reviewsCount: 18,
  averageRating: 4.9,
  surveyScores: { pageant: 50, runway: 45, kol: 95 },
  mainCategory: "KOL / Người mẫu ảnh / Giải trí thế hệ mới",
  isOnboarded: true,
};

function birthYearFromDate(value?: string | null) {
  if (!value) return defaultTalentProfile.birthYear;

  const year = new Date(value).getFullYear();
  return Number.isFinite(year) ? year : defaultTalentProfile.birthYear;
}

function parseMeasurements(value?: string | null) {
  const [bust, waist, hips] = (value ?? "")
    .split(/[/-]/)
    .map((item) => Number.parseInt(item.trim(), 10));

  return {
    bust: Number.isFinite(bust) ? bust : defaultTalentProfile.bust,
    waist: Number.isFinite(waist) ? waist : defaultTalentProfile.waist,
    hips: Number.isFinite(hips) ? hips : defaultTalentProfile.hips,
  };
}

export function mapBackendProfileToTalentUi(profile: BackendTalentProfile | null) {
  if (!profile) return null;

  const mapped = mapBackendTalent(profile);
  const measurements = parseMeasurements(profile.measurements);
  const rateMin = profile.budget_min ?? defaultTalentProfile.rateCard["Instagram Post"];
  const rateMax = profile.budget_max ?? rateMin;

  return {
    ...defaultTalentProfile,
    name: mapped.name,
    birthYear: birthYearFromDate(profile.birth_date),
    location: mapped.city,
    hometown: profile.district || mapped.district,
    avatar: mapped.avatar || defaultTalentProfile.avatar,
    height: mapped.height,
    weight: mapped.weight,
    bust: measurements.bust,
    waist: measurements.waist,
    hips: measurements.hips,
    languages: mapped.languages,
    skills: mapped.skills.length ? mapped.skills : defaultTalentProfile.skills,
    followersCount: mapped.followersCount,
    engagementRate: mapped.engagementRate,
    profileScore: mapped.completion,
    tier: mapped.tier,
    rateCard: {
      "Instagram Post": rateMin,
      "TikTok Video": rateMax,
      "Livestream 2h": rateMax,
      "Catwalk Show": rateMax,
    },
    availabilityCalendar: mapped.availabilityDates,
    averageRating: mapped.rating || defaultTalentProfile.averageRating,
    isOnboarded: true,
  };
}

export async function fetchMyTalentProfileForUi() {
  try {
    const response = await apiFetch<ApiResponse<BackendTalentProfile | null>>("/my/profile");
    return mapBackendProfileToTalentUi(response.data);
  } catch {
    return null;
  }
}

export async function fetchCalendarEventsForUi() {
  try {
    const response = await apiFetch<ApiResponse<BackendCalendarEvent[]>>("/calendar/events");

    return response.data.map((event) => {
      const startsAt = new Date(event.starts_at);
      const endsAt = new Date(event.ends_at);

      return {
        id: String(event.id),
        title: event.title,
        brand: event.event_type || "Lịch cá nhân",
        date: startsAt.toLocaleDateString("vi-VN", { day: "2-digit", month: "long", year: "numeric" }),
        time: `${startsAt.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })} - ${endsAt.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}`,
        location: "Chưa cập nhật địa điểm",
        status: event.status,
        startsAt: event.starts_at,
        borderColor: "border-[#3e3415] shadow-[0_0_15px_rgba(244,196,48,0.02)]",
        badgeColor: "bg-amber-400/10 border-amber-400/20 text-amber-300",
      };
    });
  } catch {
    return [];
  }
}
