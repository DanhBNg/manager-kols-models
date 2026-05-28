"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  CheckCircle2,
  ChevronRight,
  MapPin,
  Plus,
  Send,
  Users,
  X,
} from "lucide-react";
import { campaigns as initialCampaigns, talents, type Campaign } from "@/lib/brand-mvp-data";
import { cn } from "@/lib/utils";

type CampaignStatusTab = "all" | Campaign["status"];

const emptyForm = {
  title: "",
  jobType: "KOL livestream",
  city: "Hà Nội",
  startDate: "2026-06-15",
  endDate: "2026-06-30",
  talentQuantity: "3",
  budget: "20.000.000đ - 40.000.000đ",
  description: "",
};

function statusLabel(status: Campaign["status"]) {
  if (status === "published") return "Đang mở";
  if (status === "closed") return "Đã đóng";
  return "Nháp";
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [activeTab, setActiveTab] = useState<CampaignStatusTab>("all");
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [sentRequests, setSentRequests] = useState<Record<string, boolean>>({});

  const filteredCampaigns = useMemo(() => {
    if (activeTab === "all") return campaigns;
    return campaigns.filter((campaign) => campaign.status === activeTab);
  }, [activeTab, campaigns]);

  function updateCampaignStatus(id: string, status: Campaign["status"]) {
    const nextCampaigns = campaigns.map((campaign) => campaign.id === id ? { ...campaign, status } : campaign);
    setCampaigns(nextCampaigns);
    const updatedSelected = nextCampaigns.find((campaign) => campaign.id === id);
    if (updatedSelected) setSelectedCampaign(updatedSelected);
  }

  function handleCreateCampaign(event: React.FormEvent) {
    event.preventDefault();

    const newCampaign: Campaign = {
      id: `camp-${Date.now()}`,
      title: form.title || "Campaign mới",
      jobType: form.jobType,
      city: form.city,
      startDate: form.startDate,
      endDate: form.endDate,
      talentQuantity: Number(form.talentQuantity) || 1,
      budget: form.budget,
      status: "draft",
      shortlistedTalentIds: [],
      contactRequests: 0,
      description: form.description || "Chưa có mô tả brief.",
    };

    setCampaigns((current) => [newCampaign, ...current]);
    setSelectedCampaign(newCampaign);
    setIsCreating(false);
    setForm(emptyForm);
  }

  function sendContactRequest(campaignId: string, talentId: string) {
    const key = `${campaignId}-${talentId}`;
    setSentRequests((current) => ({ ...current, [key]: true }));
    setCampaigns((current) => current.map((campaign) => (
      campaign.id === campaignId ? { ...campaign, contactRequests: campaign.contactRequests + 1 } : campaign
    )));
    setSelectedCampaign((current) => current && current.id === campaignId ? { ...current, contactRequests: current.contactRequests + 1 } : current);
  }

  if (selectedCampaign) {
    const shortlistedTalents = talents.filter((talent) => selectedCampaign.shortlistedTalentIds.includes(talent.id));

    return (
      <div className="space-y-6 pb-16">
        <section className="flex flex-col gap-4 border-b border-white/5 pb-5 md:flex-row md:items-start md:justify-between">
          <div className="flex gap-3">
            <button
              onClick={() => setSelectedCampaign(null)}
              className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/5 bg-slate-900/30 text-slate-400 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="rounded bg-white/5 px-2 py-0.5 text-[9px] font-bold uppercase text-slate-400">{selectedCampaign.jobType}</span>
                <span className={cn(
                  "rounded px-2 py-0.5 text-[9px] font-black uppercase",
                  selectedCampaign.status === "published" ? "bg-emerald-500/10 text-emerald-300" : selectedCampaign.status === "closed" ? "bg-slate-500/10 text-slate-400" : "bg-amber-500/10 text-amber-300"
                )}>
                  {statusLabel(selectedCampaign.status)}
                </span>
              </div>
              <h1 className="font-display text-2xl font-black tracking-tight text-white">{selectedCampaign.title}</h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">{selectedCampaign.description}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {selectedCampaign.status === "draft" && (
              <button
                onClick={() => updateCampaignStatus(selectedCampaign.id, "published")}
                className="flex h-10 items-center rounded-xl bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-500 px-4 text-xs font-black text-slate-950"
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Publish
              </button>
            )}
            {selectedCampaign.status !== "closed" && (
              <button
                onClick={() => updateCampaignStatus(selectedCampaign.id, "closed")}
                className="flex h-10 items-center rounded-xl border border-white/10 bg-white/[0.03] px-4 text-xs font-black text-white hover:bg-white/10"
              >
                Đóng campaign
              </button>
            )}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-white/5 bg-slate-950/25 p-4">
            <MapPin className="mb-3 h-5 w-5 text-amber-300" />
            <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-500">Khu vực</span>
            <span className="text-sm font-black text-white">{selectedCampaign.city}</span>
          </div>
          <div className="rounded-2xl border border-white/5 bg-slate-950/25 p-4">
            <Calendar className="mb-3 h-5 w-5 text-cyan-300" />
            <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-500">Thời gian</span>
            <span className="text-sm font-black text-white">{selectedCampaign.startDate} - {selectedCampaign.endDate}</span>
          </div>
          <div className="rounded-2xl border border-white/5 bg-slate-950/25 p-4">
            <Users className="mb-3 h-5 w-5 text-emerald-300" />
            <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-500">Cần tuyển</span>
            <span className="text-sm font-black text-white">{selectedCampaign.talentQuantity} talent</span>
          </div>
          <div className="rounded-2xl border border-white/5 bg-slate-950/25 p-4">
            <Send className="mb-3 h-5 w-5 text-rose-300" />
            <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-500">Yêu cầu liên hệ</span>
            <span className="text-sm font-black text-white">{selectedCampaign.contactRequests}</span>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="rounded-2xl border border-white/5 bg-slate-950/25 p-5 lg:col-span-5">
            <h2 className="mb-4 text-xs font-black uppercase tracking-widest text-slate-300">Brief MVP</h2>
            <div className="space-y-4 text-sm">
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Ngân sách dự kiến</span>
                <p className="mt-1 font-black text-amber-300">{selectedCampaign.budget}</p>
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Yêu cầu chính</span>
                <p className="mt-1 leading-relaxed text-slate-300">{selectedCampaign.description}</p>
              </div>
              <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3 text-xs leading-relaxed text-slate-500">
                Phase 1 chỉ ghi nhận brief, shortlist và yêu cầu liên hệ. Hợp đồng, ví, escrow và chat realtime sẽ để giai đoạn sau.
              </div>
            </div>
          </div>

          <div className="space-y-4 lg:col-span-7">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-black uppercase tracking-widest text-slate-300">Talent trong shortlist campaign</h2>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{shortlistedTalents.length} talent</span>
            </div>

            {shortlistedTalents.length === 0 ? (
              <div className="rounded-2xl border border-white/5 bg-slate-950/25 p-8 text-center">
                <Users className="mx-auto mb-3 h-8 w-8 text-slate-600" />
                <h3 className="text-sm font-black text-white">Chưa có talent trong campaign</h3>
                <p className="mt-2 text-xs text-slate-500">Hãy lưu talent từ Discover hoặc Shortlist rồi gắn vào campaign.</p>
              </div>
            ) : (
              shortlistedTalents.map((talent) => {
                const requestKey = `${selectedCampaign.id}-${talent.id}`;
                const requested = sentRequests[requestKey];

                return (
                  <article key={talent.id} className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-slate-950/25 p-4 md:flex-row md:items-center">
                    <img src={talent.avatar} alt={talent.name} className="h-20 w-full rounded-2xl object-cover md:w-20" />
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-black text-white">{talent.name}</h3>
                      <p className="mt-1 text-xs text-slate-500">{talent.type} · {talent.city} · {talent.rate}</p>
                    </div>
                    <button
                      onClick={() => sendContactRequest(selectedCampaign.id, talent.id)}
                      disabled={requested}
                      className={cn(
                        "flex h-10 shrink-0 items-center justify-center rounded-xl px-4 text-[10px] font-black uppercase tracking-wider",
                        requested ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-300" : "bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-500 text-slate-950"
                      )}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      {requested ? "Đã gửi" : "Gửi liên hệ"}
                    </button>
                  </article>
                );
              })
            )}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16">
      <section className="flex flex-col gap-4 border-b border-white/5 pb-5 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-md border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-amber-300">
              Campaign MVP
            </span>
            <span className="text-[10px] font-semibold text-slate-500">Draft / Publish / Close</span>
          </div>
          <h1 className="font-display text-2xl font-black tracking-tight text-white">
            Quản lý <span className="bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-500 bg-clip-text text-transparent">campaign</span>
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
            Tạo brief tuyển dụng cơ bản, theo dõi shortlist và gửi yêu cầu liên hệ cho talent phù hợp.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(true)}
          className="flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-500 px-5 text-xs font-black text-slate-950"
        >
          <Plus className="mr-2 h-4 w-4" />
          Tạo campaign
        </button>
      </section>

      <section className="flex flex-wrap gap-2 border-b border-white/5 pb-3">
        {[
          { id: "all", label: "Tất cả" },
          { id: "draft", label: "Nháp" },
          { id: "published", label: "Đang mở" },
          { id: "closed", label: "Đã đóng" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as CampaignStatusTab)}
            className={cn(
              "rounded-xl px-4 py-2 text-xs font-black transition",
              activeTab === tab.id ? "bg-white/10 text-white" : "text-slate-500 hover:text-white"
            )}
          >
            {tab.label}
          </button>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredCampaigns.map((campaign) => (
          <article key={campaign.id} className="flex flex-col justify-between rounded-2xl border border-white/5 bg-slate-950/25 p-5 transition hover:border-white/10">
            <div>
              <div className="mb-3 flex items-start justify-between gap-3">
                <span className="rounded bg-white/5 px-2 py-0.5 text-[9px] font-bold uppercase text-slate-400">{campaign.jobType}</span>
                <span className={cn(
                  "rounded px-2 py-0.5 text-[9px] font-black uppercase",
                  campaign.status === "published" ? "bg-emerald-500/10 text-emerald-300" : campaign.status === "closed" ? "bg-slate-500/10 text-slate-400" : "bg-amber-500/10 text-amber-300"
                )}>
                  {statusLabel(campaign.status)}
                </span>
              </div>
              <h3 className="line-clamp-1 text-base font-black text-white">{campaign.title}</h3>
              <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-slate-500">{campaign.description}</p>
            </div>

            <div className="mt-5 border-t border-white/5 pt-4">
              <div className="mb-4 grid grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="block text-[8px] font-bold uppercase text-slate-500">Thành phố</span>
                  <span className="font-bold text-white">{campaign.city}</span>
                </div>
                <div>
                  <span className="block text-[8px] font-bold uppercase text-slate-500">Shortlist</span>
                  <span className="font-bold text-amber-300">{campaign.shortlistedTalentIds.length}</span>
                </div>
                <div>
                  <span className="block text-[8px] font-bold uppercase text-slate-500">Liên hệ</span>
                  <span className="font-bold text-emerald-300">{campaign.contactRequests}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedCampaign(campaign)}
                className="flex h-10 w-full items-center justify-center rounded-xl bg-white/5 text-[10px] font-black uppercase tracking-wider text-white hover:bg-white/10"
              >
                Xem chi tiết <ChevronRight className="ml-1 h-3.5 w-3.5" />
              </button>
            </div>
          </article>
        ))}
      </section>

      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <form onSubmit={handleCreateCampaign} className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-[#070913] p-6 shadow-2xl">
            <button type="button" onClick={() => setIsCreating(false)} className="absolute right-4 top-4 text-slate-400 hover:text-white">
              <X className="h-5 w-5" />
            </button>

            <div className="mb-5">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">Campaign brief</span>
              <h2 className="mt-1 text-lg font-black text-white">Tạo campaign mới</h2>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="space-y-1 md:col-span-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Tiêu đề *</span>
                <input value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} required className="w-full rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2.5 text-xs text-white outline-none focus:border-amber-400/60" />
              </label>
              <label className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Loại công việc</span>
                <select value={form.jobType} onChange={(event) => setForm((current) => ({ ...current, jobType: event.target.value }))} className="w-full rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2.5 text-xs text-white outline-none focus:border-amber-400/60">
                  <option>KOL livestream</option>
                  <option>Model lookbook</option>
                  <option>PG event</option>
                  <option>MC sự kiện</option>
                  <option>Dancer performance</option>
                </select>
              </label>
              <label className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Thành phố</span>
                <input value={form.city} onChange={(event) => setForm((current) => ({ ...current, city: event.target.value }))} className="w-full rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2.5 text-xs text-white outline-none focus:border-amber-400/60" />
              </label>
              <label className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Ngày bắt đầu</span>
                <input type="date" value={form.startDate} onChange={(event) => setForm((current) => ({ ...current, startDate: event.target.value }))} className="w-full rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2.5 text-xs text-white outline-none focus:border-amber-400/60" />
              </label>
              <label className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Ngày kết thúc</span>
                <input type="date" value={form.endDate} onChange={(event) => setForm((current) => ({ ...current, endDate: event.target.value }))} className="w-full rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2.5 text-xs text-white outline-none focus:border-amber-400/60" />
              </label>
              <label className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Số lượng talent</span>
                <input type="number" value={form.talentQuantity} onChange={(event) => setForm((current) => ({ ...current, talentQuantity: event.target.value }))} className="w-full rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2.5 text-xs text-white outline-none focus:border-amber-400/60" />
              </label>
              <label className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Ngân sách</span>
                <input value={form.budget} onChange={(event) => setForm((current) => ({ ...current, budget: event.target.value }))} className="w-full rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2.5 text-xs text-white outline-none focus:border-amber-400/60" />
              </label>
              <label className="space-y-1 md:col-span-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Mô tả brief *</span>
                <textarea value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} required rows={4} className="w-full resize-none rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2.5 text-xs text-white outline-none focus:border-amber-400/60" />
              </label>
            </div>

            <div className="mt-5 flex justify-end gap-3 border-t border-white/5 pt-5">
              <button type="button" onClick={() => setIsCreating(false)} className="h-10 rounded-xl border border-white/10 px-4 text-xs font-black text-white hover:bg-white/5">Hủy</button>
              <button type="submit" className="flex h-10 items-center rounded-xl bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-500 px-5 text-xs font-black text-slate-950">
                <Briefcase className="mr-2 h-4 w-4" />
                Lưu nháp
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

