"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BookmarkCheck,
  Briefcase,
  Building2,
  CheckCircle2,
  Clock,
  Search,
  Send,
  UserRoundCheck,
} from "lucide-react";
import { fetchPartnerProfile, fetchTalents, type PartnerProfileForm } from "@/lib/brand-api";
import { fetchCampaigns } from "@/lib/api/campaigns";
import { fetchContactRequests, type BackendContactRequest } from "@/lib/api/contact-requests";
import { fetchWishlists, mapSavedTalents } from "@/lib/api/wishlists";
import type { Campaign, TalentProfile } from "@/lib/brand-mvp-data";
import { cn } from "@/lib/utils";

const nextActions = [
  {
    title: "Hoàn thiện hồ sơ đối tác",
    description: "Bổ sung ngành hàng, người phụ trách và kênh liên hệ để sẵn sàng gửi yêu cầu.",
    href: "/brand/settings",
    icon: UserRoundCheck,
  },
  {
    title: "Tìm talent phù hợp",
    description: "Lọc theo vai trò, thành phố, tier, chiều cao và trạng thái xác minh.",
    href: "/brand/discover",
    icon: Search,
  },
  {
    title: "Tạo campaign mới",
    description: "Ghi nhận brief tuyển dụng để quản lý talent đã lưu theo từng nhu cầu.",
    href: "/brand/campaigns",
    icon: Briefcase,
  },
];

function statusLabel(status: string) {
  if (status === "published") return "Đang mở";
  if (status === "closed") return "Đã đóng";
  return "Nháp";
}

function calculateProfileCompletion(profile: PartnerProfileForm | null) {
  if (!profile) return 0;

  const requiredFields: Array<keyof PartnerProfileForm> = [
    "organizationName",
    "organizationType",
    "industry",
    "contactName",
    "contactPhone",
    "contactEmail",
    "city",
    "description",
  ];
  const completed = requiredFields.filter((field) => Boolean(profile[field])).length;

  return Math.round((completed / requiredFields.length) * 100);
}

export default function BrandDashboard() {
  const router = useRouter();
  const [partnerProfile, setPartnerProfile] = useState<PartnerProfileForm | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [talents, setTalents] = useState<TalentProfile[]>([]);
  const [savedTalentCount, setSavedTalentCount] = useState(0);
  const [contactRequests, setContactRequests] = useState<BackendContactRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadDashboard() {
      setLoading(true);
      setApiError("");

      try {
        const [profileData, campaignData, talentData, wishlistData, requestData] = await Promise.all([
          fetchPartnerProfile(),
          fetchCampaigns(),
          fetchTalents(),
          fetchWishlists(),
          fetchContactRequests(),
        ]);

        if (!mounted) return;

        setPartnerProfile(profileData);
        setCampaigns(campaignData);
        setTalents(talentData);
        setSavedTalentCount(mapSavedTalents(wishlistData).length);
        setContactRequests(requestData);
      } catch (error) {
        if (mounted) {
          setApiError(error instanceof Error ? error.message : "Không tải được dữ liệu dashboard từ backend.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      mounted = false;
    };
  }, []);

  const profileCompletion = useMemo(() => calculateProfileCompletion(partnerProfile), [partnerProfile]);
  const recommendedTalents = talents.filter((talent) => talent.verified).slice(0, 3);
  const recentCampaigns = campaigns.slice(0, 4);
  const recentContactRequests = contactRequests.slice(0, 5);

  const stats = [
    {
      label: "Hồ sơ đối tác",
      value: `${profileCompletion}%`,
      hint: partnerProfile?.verificationStatus ?? "Chưa có hồ sơ",
      icon: Building2,
      color: "text-amber-300 border-amber-500/25 bg-amber-500/10",
    },
    {
      label: "Talent đã lưu",
      value: savedTalentCount.toString(),
      hint: "Trong danh sách đã lưu",
      icon: BookmarkCheck,
      color: "text-cyan-300 border-cyan-500/25 bg-cyan-500/10",
    },
    {
      label: "Campaign đang mở",
      value: campaigns.filter((campaign) => campaign.status === "published").length.toString(),
      hint: "Có thể gắn talent",
      icon: Briefcase,
      color: "text-emerald-300 border-emerald-500/25 bg-emerald-500/10",
    },
    {
      label: "Yêu cầu liên hệ",
      value: contactRequests.length.toString(),
      hint: "Tín hiệu booking sơ bộ",
      icon: Send,
      color: "text-rose-300 border-rose-500/25 bg-rose-500/10",
    },
  ];

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-500">
      <section className="flex flex-col gap-5 border-b border-white/5 pb-7 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-md border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-amber-300">
              Phase 1 MVP
            </span>
            <span className="text-[10px] font-semibold text-slate-500">Workspace đối tác</span>
          </div>
          <h1 className="font-display text-3xl font-black tracking-tight text-white md:text-4xl">
            Tổng quan <span className="bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-500 bg-clip-text text-transparent">đối tác</span>
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
            Theo dõi nhanh hồ sơ tổ chức, talent đã lưu, campaign đang mở và các yêu cầu liên hệ đầu tiên.
          </p>
        </div>

        <button
          onClick={() => router.push("/brand/discover")}
          className="flex h-11 cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-500 px-5 text-xs font-black text-slate-950 shadow-[0_4px_20px_rgba(245,158,11,0.18)] transition hover:-translate-y-0.5"
        >
          <Search className="mr-2 h-4 w-4" />
          Tìm talent ngay
        </button>
      </section>

      {apiError && (
        <div className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {apiError}
        </div>
      )}

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-2xl border border-white/5 bg-[#0a0c16]/80 p-5 shadow-[0_12px_36px_rgba(0,0,0,0.28)]">
              <div className="mb-4 flex items-start justify-between gap-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</span>
                <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl border", stat.color)}>
                  <Icon className="h-4.5 w-4.5" />
                </div>
              </div>
              <div className="text-3xl font-black tracking-tight text-white">{loading ? "..." : stat.value}</div>
              <div className="mt-1 text-[11px] font-semibold text-slate-500">{stat.hint}</div>
            </div>
          );
        })}
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <div className="rounded-2xl border border-white/5 bg-[#0a0c16]/70 p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xs font-black uppercase tracking-widest text-slate-300">Việc nên làm tiếp theo</h2>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {nextActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.title}
                    onClick={() => router.push(action.href)}
                    className="group cursor-pointer rounded-2xl border border-white/5 bg-slate-950/30 p-4 text-left transition hover:border-amber-400/30 hover:bg-amber-400/[0.03]"
                  >
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-300">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <h3 className="text-sm font-black text-white">{action.title}</h3>
                    <p className="mt-2 text-[11px] leading-relaxed text-slate-500">{action.description}</p>
                    <div className="mt-4 flex items-center text-[10px] font-black uppercase tracking-widest text-amber-300">
                      Mở màn hình <ArrowRight className="ml-1 h-3 w-3 transition group-hover:translate-x-1" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-[#0a0c16]/70 p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xs font-black uppercase tracking-widest text-slate-300">Campaign gần đây</h2>
              <button onClick={() => router.push("/brand/campaigns")} className="flex cursor-pointer items-center text-[10px] font-black uppercase tracking-widest text-amber-300">
                Tất cả <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </button>
            </div>
            <div className="space-y-3">
              {loading ? (
                <div className="rounded-2xl border border-white/5 bg-slate-950/30 p-4 text-sm text-slate-400">Đang tải campaign...</div>
              ) : recentCampaigns.length === 0 ? (
                <div className="rounded-2xl border border-white/5 bg-slate-950/30 p-4 text-sm text-slate-400">Chưa có campaign nào.</div>
              ) : recentCampaigns.map((campaign) => (
                <button
                  key={campaign.id}
                  onClick={() => router.push("/brand/campaigns")}
                  className="flex w-full cursor-pointer flex-col gap-3 rounded-2xl border border-white/5 bg-slate-950/30 p-4 text-left transition hover:border-white/10 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="rounded bg-white/5 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-400">{campaign.jobType}</span>
                      <span className={cn(
                        "rounded px-2 py-0.5 text-[9px] font-black",
                        campaign.status === "published" ? "bg-emerald-500/10 text-emerald-300" : campaign.status === "closed" ? "bg-slate-500/10 text-slate-400" : "bg-amber-500/10 text-amber-300",
                      )}>
                        {statusLabel(campaign.status)}
                      </span>
                    </div>
                    <h3 className="text-sm font-black text-white">{campaign.title}</h3>
                    <p className="mt-1 line-clamp-1 text-[11px] text-slate-500">{campaign.description}</p>
                  </div>
                  <div className="flex gap-4 text-xs">
                    <div>
                      <span className="block text-[9px] font-bold uppercase text-slate-500">Đã lưu</span>
                      <span className="font-black text-white">{campaign.shortlistedTalentIds.length}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] font-bold uppercase text-slate-500">Liên hệ</span>
                      <span className="font-black text-amber-300">{campaign.contactRequests}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6 lg:col-span-4">
          <div className="rounded-2xl border border-white/5 bg-[#0a0c16]/70 p-6">
            <h2 className="mb-5 text-xs font-black uppercase tracking-widest text-slate-300">Talent nên xem</h2>
            <div className="space-y-4">
              {loading ? (
                <div className="rounded-2xl border border-white/5 bg-slate-950/30 p-4 text-sm text-slate-400">Đang tải talent...</div>
              ) : recommendedTalents.length === 0 ? (
                <div className="rounded-2xl border border-white/5 bg-slate-950/30 p-4 text-sm text-slate-400">Chưa có talent phù hợp.</div>
              ) : recommendedTalents.map((talent) => (
                <button
                  key={talent.id}
                  onClick={() => router.push(`/brand/talents/${talent.id}`)}
                  className="flex w-full cursor-pointer gap-3 rounded-2xl border border-white/5 bg-slate-950/30 p-3 text-left transition hover:border-amber-400/20"
                >
                  <img src={talent.avatar} alt={talent.name} className="h-12 w-12 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate text-xs font-black text-white">{talent.name}</h3>
                      {talent.verified && <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-300" />}
                    </div>
                    <p className="mt-1 text-[10px] text-slate-500">{talent.type} · {talent.city}</p>
                    <p className="mt-2 text-[10px] font-bold text-amber-300">{talent.rate}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-[#0a0c16]/70 p-6">
            <div className="mb-4 flex items-center gap-2">
              <Clock className="h-4 w-4 text-cyan-300" />
              <h2 className="text-xs font-black uppercase tracking-widest text-slate-300">Yêu cầu liên hệ</h2>
            </div>
            <div className="space-y-3">
              {loading ? (
                <div className="rounded-xl border border-white/5 bg-slate-950/30 p-3 text-xs text-slate-400">Đang tải yêu cầu...</div>
              ) : recentContactRequests.length === 0 ? (
                <div className="rounded-xl border border-white/5 bg-slate-950/30 p-3 text-xs text-slate-400">Chưa có yêu cầu liên hệ.</div>
              ) : recentContactRequests.map((request) => (
                <div key={request.id} className="rounded-xl border border-white/5 bg-slate-950/30 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-bold text-white">{request.talent?.name ?? "Talent"}</span>
                    <span className="rounded bg-white/5 px-2 py-0.5 text-[9px] font-bold uppercase text-slate-400">{request.status}</span>
                  </div>
                  <p className="mt-1 text-[10px] text-slate-500">{request.campaign?.title ?? "Chưa gắn campaign"}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
