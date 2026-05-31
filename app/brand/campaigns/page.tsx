"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  MapPin,
  Plus,
  Users,
  X,
} from "lucide-react";
import type { Campaign, CampaignStage, TalentProfile } from "@/lib/brand-mvp-data";
import { fetchTalents } from "@/lib/brand-api";
import { closeCampaign, createCampaign, fetchCampaigns, publishCampaign } from "@/lib/api/campaigns";
import { createContactRequest } from "@/lib/api/contact-requests";
import { cn } from "@/lib/utils";

type CampaignStatusTab = "all" | Campaign["status"];

const stageLabels: Record<CampaignStage, string> = {
  new: "Mới",
  shortlisted: "Đã chọn sơ bộ",
  interview: "Phỏng vấn",
  accepted: "Đã chọn",
  confirmed: "Đã xác nhận",
};

const emptyForm = {
  title: "",
  jobType: "KOL livestream",
  city: "Hà Nội",
  address: "",
  startDate: "2026-06-15",
  endDate: "2026-06-30",
  deadline: "2026-06-10",
  talentQuantity: "3",
  budget: "20.000.000đ - 40.000.000đ",
  benefits: "",
  requirements: "",
  description: "",
};

function statusLabel(status: Campaign["status"]) {
  if (status === "published") return "Đang mở";
  if (status === "closed") return "Đã đóng";
  return "Nháp";
}

export default function CampaignsPage() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [talents, setTalents] = useState<TalentProfile[]>([]);
  const [activeTab, setActiveTab] = useState<CampaignStatusTab>("all");
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [sentRequests, setSentRequests] = useState<Record<string, boolean>>({});
  const [loadingCampaigns, setLoadingCampaigns] = useState(true);
  const [savingCampaign, setSavingCampaign] = useState(false);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadCampaigns() {
      setLoadingCampaigns(true);
      setApiError("");

      try {
        const [campaignData, talentData] = await Promise.all([
          fetchCampaigns(),
          fetchTalents(),
        ]);
        if (mounted) {
          setCampaigns(campaignData);
          setTalents(talentData);
        }
      } catch (error) {
        if (mounted) {
          setApiError(error instanceof Error ? error.message : "Không tải được campaign từ backend.");
        }
      } finally {
        if (mounted) {
          setLoadingCampaigns(false);
        }
      }
    }

    loadCampaigns();

    return () => {
      mounted = false;
    };
  }, []);

  const filteredCampaigns = useMemo(() => {
    if (activeTab === "all") return campaigns;
    return campaigns.filter((campaign) => campaign.status === activeTab);
  }, [activeTab, campaigns]);

  async function updateCampaignStatus(id: string, status: Campaign["status"]) {
    setApiError("");

    try {
      const updatedCampaign = status === "published"
        ? await publishCampaign(id)
        : status === "closed"
          ? await closeCampaign(id)
          : campaigns.find((campaign) => campaign.id === id);

      if (!updatedCampaign) return;

      const nextCampaigns = campaigns.map((campaign) => campaign.id === id ? updatedCampaign : campaign);
      setCampaigns(nextCampaigns);
      setSelectedCampaign(updatedCampaign);
    } catch (error) {
      setApiError(error instanceof Error ? error.message : "Không cập nhật được trạng thái campaign.");
    }
  }

  function moveApplicant(campaignId: string, talentId: string, stage: CampaignStage) {
    const nextCampaigns = campaigns.map((campaign) => {
      if (campaign.id !== campaignId) return campaign;
      return {
        ...campaign,
        applicants: campaign.applicants.map((item) => item.talentId === talentId ? { ...item, stage } : item),
      };
    });

    setCampaigns(nextCampaigns);
    const updatedSelected = nextCampaigns.find((campaign) => campaign.id === campaignId);
    if (updatedSelected) setSelectedCampaign(updatedSelected);
  }

  async function handleCreateCampaign(event: React.FormEvent) {
    event.preventDefault();
    setSavingCampaign(true);
    setApiError("");

    try {
      const newCampaign = await createCampaign(form);
      setCampaigns((current) => [newCampaign, ...current]);
      setSelectedCampaign(newCampaign);
      setIsCreating(false);
      setForm(emptyForm);
    } catch (error) {
      setApiError(error instanceof Error ? error.message : "Không tạo được campaign trên backend.");
    } finally {
      setSavingCampaign(false);
    }
  }

  async function sendContactRequest(campaignId: string, talentId: string) {
    const key = `${campaignId}-${talentId}`;
    setApiError("");

    try {
      await createContactRequest({
        profileId: talentId,
        campaignId,
        message: "Brand muốn liên hệ talent từ bảng ATS campaign.",
      });
      setSentRequests((current) => ({ ...current, [key]: true }));
      setCampaigns((current) => current.map((campaign) => (
        campaign.id === campaignId ? { ...campaign, contactRequests: campaign.contactRequests + 1 } : campaign
      )));
      setSelectedCampaign((current) => current && current.id === campaignId ? { ...current, contactRequests: current.contactRequests + 1 } : current);
    } catch (error) {
      setApiError(error instanceof Error ? error.message : "Không gửi được yêu cầu liên hệ.");
    }
  }

  if (selectedCampaign) {
    return (
      <div className="space-y-6 pb-16">
        <section className="flex flex-col gap-4 border-b border-white/5 pb-5 md:flex-row md:items-start md:justify-between">
          <div className="flex gap-3">
            <button onClick={() => setSelectedCampaign(null)} className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/5 bg-slate-900/30 text-slate-400 hover:text-white">
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
              <button onClick={() => updateCampaignStatus(selectedCampaign.id, "published")} className="flex h-10 items-center rounded-xl bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-500 px-4 text-xs font-black text-slate-950">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Publish
              </button>
            )}
            {selectedCampaign.status !== "closed" && (
              <button onClick={() => updateCampaignStatus(selectedCampaign.id, "closed")} className="flex h-10 items-center rounded-xl border border-white/10 bg-white/[0.03] px-4 text-xs font-black text-white hover:bg-white/10">
                Đóng campaign
              </button>
            )}
          </div>
        </section>

        {apiError && (
          <div className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {apiError}
          </div>
        )}

        <section className="grid grid-cols-1 gap-4 md:grid-cols-5">
          {[
            { label: "Địa điểm", value: selectedCampaign.address, icon: MapPin, color: "text-amber-300" },
            { label: "Thời gian", value: `${selectedCampaign.startDate} - ${selectedCampaign.endDate}`, icon: Calendar, color: "text-cyan-300" },
            { label: "Deadline", value: selectedCampaign.deadline, icon: Clock, color: "text-purple-300" },
            { label: "Ứng viên", value: `${selectedCampaign.applicants.length}/${selectedCampaign.talentQuantity}`, icon: Users, color: "text-emerald-300" },
            { label: "Lượt xem", value: selectedCampaign.views.toString(), icon: Briefcase, color: "text-rose-300" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="rounded-2xl border border-white/5 bg-slate-950/25 p-4">
                <Icon className={cn("mb-3 h-5 w-5", item.color)} />
                <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-500">{item.label}</span>
                <span className="text-sm font-black text-white">{item.value}</span>
              </div>
            );
          })}
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <aside className="rounded-2xl border border-white/5 bg-slate-950/25 p-5 xl:col-span-4">
            <h2 className="mb-4 text-xs font-black uppercase tracking-widest text-slate-300">Job posting brief</h2>
            <div className="space-y-4 text-sm">
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Ngân sách</span>
                <p className="mt-1 font-black text-amber-300">{selectedCampaign.budget}</p>
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Yêu cầu</span>
                <p className="mt-1 leading-relaxed text-slate-300">{selectedCampaign.requirements}</p>
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Phúc lợi</span>
                <p className="mt-1 leading-relaxed text-slate-300">{selectedCampaign.benefits}</p>
              </div>
              <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3 text-xs leading-relaxed text-slate-500">
                ATS MVP dùng stage cơ bản: Mới, Đã chọn sơ bộ, Phỏng vấn, Đã chọn, Đã xác nhận. Chat, email/SMS automation và payment để phase sau.
              </div>
            </div>
          </aside>

          <main className="space-y-4 xl:col-span-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-black uppercase tracking-widest text-slate-300">Applicant tracking board</h2>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{selectedCampaign.applicants.length} ứng viên</span>
            </div>

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-5">
              {(Object.keys(stageLabels) as CampaignStage[]).map((stage) => {
                const items = selectedCampaign.applicants.filter((item) => item.stage === stage);
                return (
                  <div key={stage} className="min-h-52 rounded-2xl border border-white/5 bg-slate-950/25 p-3">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stageLabels[stage]}</span>
                      <span className="rounded bg-white/5 px-1.5 py-0.5 text-[9px] font-bold text-white">{items.length}</span>
                    </div>
                    <div className="space-y-2">
                      {items.map((item) => {
                        const talent = talents.find((candidate) => candidate.id === item.talentId);
                        if (!talent) return null;
                        const requestKey = `${selectedCampaign.id}-${talent.id}`;
                        return (
                          <article key={item.talentId} className="rounded-xl border border-white/5 bg-slate-900/40 p-3">
                            <button onClick={() => router.push(`/brand/talents/${talent.id}`)} className="flex w-full items-center gap-2 text-left">
                              <img src={talent.avatar} alt={talent.name} className="h-9 w-9 rounded-lg object-cover" />
                              <div className="min-w-0">
                                <h3 className="truncate text-[11px] font-black text-white">{talent.name}</h3>
                                <p className="text-[9px] text-slate-500">{talent.type} · {talent.matchScore}% match</p>
                              </div>
                            </button>
                            <p className="mt-2 line-clamp-2 text-[9px] leading-relaxed text-slate-500">{item.note}</p>
                            <div className="mt-2 flex gap-1">
                              {stage !== "confirmed" && (
                                <button onClick={() => moveApplicant(selectedCampaign.id, talent.id, nextStage(stage))} className="flex-1 rounded-lg bg-white/5 px-2 py-1 text-[8px] font-black uppercase text-slate-300 hover:bg-white/10">
                                  Chuyển
                                </button>
                              )}
                              <button
                                onClick={() => sendContactRequest(selectedCampaign.id, talent.id)}
                                disabled={sentRequests[requestKey]}
                                className={cn(
                                  "flex-1 rounded-lg px-2 py-1 text-[8px] font-black uppercase",
                                  sentRequests[requestKey] ? "bg-emerald-500/10 text-emerald-300" : "bg-amber-400 text-slate-950"
                                )}
                              >
                                {sentRequests[requestKey] ? "Đã gửi" : "Liên hệ"}
                              </button>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </main>
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
              Job posting & ATS
            </span>
            <span className="text-[10px] font-semibold text-slate-500">Phase 1</span>
          </div>
          <h1 className="font-display text-2xl font-black tracking-tight text-white">
            Quản lý campaign tuyển dụng
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
            Đăng job/campaign, theo dõi ứng viên theo stage và gửi yêu cầu liên hệ.
          </p>
        </div>

        <button onClick={() => setIsCreating(true)} className="flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-500 px-5 text-xs font-black text-slate-950">
          <Plus className="mr-2 h-4 w-4" />
          Tạo job/campaign
        </button>
      </section>

      {apiError && (
        <div className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {apiError}
        </div>
      )}

      <section className="flex flex-wrap gap-2 border-b border-white/5 pb-3">
        {[
          { id: "all", label: "Tất cả" },
          { id: "draft", label: "Nháp" },
          { id: "published", label: "Đang mở" },
          { id: "closed", label: "Đã đóng" },
        ].map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as CampaignStatusTab)} className={cn("rounded-xl px-4 py-2 text-xs font-black transition", activeTab === tab.id ? "bg-white/10 text-white" : "text-slate-500 hover:text-white")}>
            {tab.label}
          </button>
        ))}
      </section>

      {loadingCampaigns ? (
        <section className="rounded-2xl border border-white/5 bg-slate-950/25 p-6 text-sm text-slate-400">
          Đang tải campaign từ backend deploy...
        </section>
      ) : filteredCampaigns.length === 0 ? (
        <section className="rounded-2xl border border-white/5 bg-slate-950/25 p-6 text-sm text-slate-400">
          Chưa có campaign nào trong backend cho tài khoản brand đang đăng nhập.
        </section>
      ) : (
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredCampaigns.map((campaign) => (
          <article key={campaign.id} className="flex flex-col justify-between rounded-2xl border border-white/5 bg-slate-950/25 p-5 transition hover:border-white/10">
            <div>
              <div className="mb-3 flex items-start justify-between gap-3">
                <span className="rounded bg-white/5 px-2 py-0.5 text-[9px] font-bold uppercase text-slate-400">{campaign.jobType}</span>
                <span className={cn("rounded px-2 py-0.5 text-[9px] font-black uppercase", campaign.status === "published" ? "bg-emerald-500/10 text-emerald-300" : campaign.status === "closed" ? "bg-slate-500/10 text-slate-400" : "bg-amber-500/10 text-amber-300")}>
                  {statusLabel(campaign.status)}
                </span>
              </div>
              <h3 className="line-clamp-1 text-base font-black text-white">{campaign.title}</h3>
              <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-slate-500">{campaign.description}</p>
            </div>

            <div className="mt-5 border-t border-white/5 pt-4">
              <div className="mb-4 grid grid-cols-4 gap-2 text-xs">
                <div>
                  <span className="block text-[8px] font-bold uppercase text-slate-500">Views</span>
                  <span className="font-bold text-white">{campaign.views}</span>
                </div>
                <div>
                  <span className="block text-[8px] font-bold uppercase text-slate-500">Ứng viên</span>
                  <span className="font-bold text-white">{campaign.applicants.length}</span>
                </div>
                <div>
                  <span className="block text-[8px] font-bold uppercase text-slate-500">Đã lưu</span>
                  <span className="font-bold text-amber-300">{campaign.shortlistedTalentIds.length}</span>
                </div>
                <div>
                  <span className="block text-[8px] font-bold uppercase text-slate-500">Liên hệ</span>
                  <span className="font-bold text-emerald-300">{campaign.contactRequests}</span>
                </div>
              </div>
              <button onClick={() => setSelectedCampaign(campaign)} className="flex h-10 w-full items-center justify-center rounded-xl bg-white/5 text-[10px] font-black uppercase tracking-wider text-white hover:bg-white/10">
                Xem ATS & brief <ChevronRight className="ml-1 h-3.5 w-3.5" />
              </button>
            </div>
          </article>
        ))}
      </section>
      )}

      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <form onSubmit={handleCreateCampaign} className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-[#070913] p-6 shadow-2xl">
            <button type="button" onClick={() => setIsCreating(false)} className="absolute right-4 top-4 text-slate-400 hover:text-white">
              <X className="h-5 w-5" />
            </button>

            <div className="mb-5">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">Job posting form</span>
              <h2 className="mt-1 text-lg font-black text-white">Tạo job/campaign mới</h2>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormInput label="Tiêu đề job *" value={form.title} onChange={(value) => setForm((current) => ({ ...current, title: value }))} required />
              <label className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Loại hình *</span>
                <select value={form.jobType} onChange={(event) => setForm((current) => ({ ...current, jobType: event.target.value }))} className="w-full rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2.5 text-xs text-white outline-none focus:border-amber-400/60">
                  <option>KOL livestream</option>
                  <option>Model lookbook</option>
                  <option>PG event</option>
                  <option>MC sự kiện</option>
                  <option>Dancer performance</option>
                </select>
              </label>
              <FormInput label="Số lượng cần tuyển *" type="number" value={form.talentQuantity} onChange={(value) => setForm((current) => ({ ...current, talentQuantity: value }))} />
              <FormInput label="Thành phố *" value={form.city} onChange={(value) => setForm((current) => ({ ...current, city: value }))} />
              <FormInput label="Địa điểm *" value={form.address} onChange={(value) => setForm((current) => ({ ...current, address: value }))} />
              <FormInput label="Ngân sách" value={form.budget} onChange={(value) => setForm((current) => ({ ...current, budget: value }))} />
              <FormInput label="Ngày bắt đầu" type="date" value={form.startDate} onChange={(value) => setForm((current) => ({ ...current, startDate: value }))} />
              <FormInput label="Ngày kết thúc" type="date" value={form.endDate} onChange={(value) => setForm((current) => ({ ...current, endDate: value }))} />
              <FormInput label="Deadline ứng tuyển" type="date" value={form.deadline} onChange={(value) => setForm((current) => ({ ...current, deadline: value }))} />
              <FormInput label="Phúc lợi" value={form.benefits} onChange={(value) => setForm((current) => ({ ...current, benefits: value }))} />
              <label className="space-y-1 md:col-span-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Yêu cầu *</span>
                <textarea value={form.requirements} onChange={(event) => setForm((current) => ({ ...current, requirements: event.target.value }))} required rows={3} className="w-full resize-none rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2.5 text-xs text-white outline-none focus:border-amber-400/60" />
              </label>
              <label className="space-y-1 md:col-span-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Mô tả công việc *</span>
                <textarea value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} required rows={4} className="w-full resize-none rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2.5 text-xs text-white outline-none focus:border-amber-400/60" />
              </label>
            </div>

            {apiError && (
              <div className="mt-4 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {apiError}
              </div>
            )}


            <div className="mt-5 flex justify-end gap-3 border-t border-white/5 pt-5">
              <button type="button" onClick={() => setIsCreating(false)} className="h-10 rounded-xl border border-white/10 px-4 text-xs font-black text-white hover:bg-white/5">Hủy</button>
              <button type="submit" disabled={savingCampaign} className="flex h-10 items-center rounded-xl bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-500 px-5 text-xs font-black text-slate-950 disabled:cursor-not-allowed disabled:opacity-60">
                <Briefcase className="mr-2 h-4 w-4" />
                {savingCampaign ? "Đang lưu..." : "Lưu nháp"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function nextStage(stage: CampaignStage): CampaignStage {
  if (stage === "new") return "shortlisted";
  if (stage === "shortlisted") return "interview";
  if (stage === "interview") return "accepted";
  return "confirmed";
}

function FormInput({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="space-y-1">
      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</span>
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} required={required} className="w-full rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2.5 text-xs text-white outline-none focus:border-amber-400/60" />
    </label>
  );
}
