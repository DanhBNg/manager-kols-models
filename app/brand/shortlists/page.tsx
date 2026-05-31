"use client";

import { useEffect, useMemo, useState } from "react";
import { BookmarkCheck, Briefcase, FileText, HeartOff, Plus, Send } from "lucide-react";
import { addCampaignTalent, fetchCampaigns } from "@/lib/api/campaigns";
import { createContactRequest } from "@/lib/api/contact-requests";
import { deleteWishlistItem, fetchWishlists, mapSavedTalents, type SavedTalent } from "@/lib/api/wishlists";
import type { Campaign } from "@/lib/brand-mvp-data";
import { cn } from "@/lib/utils";

export default function BrandShortlistsPage() {
  const [savedTalents, setSavedTalents] = useState<SavedTalent[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState("");
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [requestedIds, setRequestedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const selectedCampaign = useMemo(
    () => campaigns.find((campaign) => campaign.id === selectedCampaignId),
    [campaigns, selectedCampaignId],
  );

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      setLoading(true);
      setApiError("");

      try {
        const [wishlistData, campaignData] = await Promise.all([
          fetchWishlists(),
          fetchCampaigns(),
        ]);

        if (!mounted) return;

        const mapped = mapSavedTalents(wishlistData);
        setSavedTalents(mapped);
        setCampaigns(campaignData);
        setSelectedCampaignId(campaignData[0]?.id ?? "");
        setNotes(Object.fromEntries(mapped.map((talent) => [talent.id, talent.notes])));
      } catch (error) {
        if (mounted) {
          setApiError(error instanceof Error ? error.message : "Không tải được danh sách talent đã lưu.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      mounted = false;
    };
  }, []);

  async function removeTalent(talent: SavedTalent) {
    setApiError("");
    setSuccessMessage("");

    try {
      await deleteWishlistItem({ wishlistId: talent.wishlistId, itemId: talent.wishlistItemId });
      setSavedTalents((current) => current.filter((item) => item.wishlistItemId !== talent.wishlistItemId));
    } catch (error) {
      setApiError(error instanceof Error ? error.message : "Không xoá được talent khỏi danh sách đã lưu.");
    }
  }

  async function sendRequest(id: string) {
    setApiError("");
    setSuccessMessage("");

    try {
      await createContactRequest({
        profileId: id,
        campaignId: selectedCampaignId,
        message: notes[id] || "Brand muốn liên hệ talent trong danh sách đã lưu.",
      });
      setRequestedIds((current) => current.includes(id) ? current : [...current, id]);
      setSuccessMessage("Đã gửi yêu cầu liên hệ tới backend.");
    } catch (error) {
      setApiError(error instanceof Error ? error.message : "Không gửi được yêu cầu liên hệ.");
    }
  }

  async function attachToCampaign(talent: SavedTalent) {
    if (!selectedCampaignId) {
      setApiError("Hãy chọn campaign trước khi gắn talent.");
      return;
    }

    setApiError("");
    setSuccessMessage("");

    try {
      await addCampaignTalent({
        campaignId: selectedCampaignId,
        profileId: talent.id,
        status: "shortlisted",
        notes: notes[talent.id] || "Gắn từ danh sách talent đã lưu.",
      });
      setSuccessMessage(`Đã gắn ${talent.name} vào campaign.`);
    } catch (error) {
      setApiError(error instanceof Error ? error.message : "Không gắn được talent vào campaign.");
    }
  }

  return (
    <div className="space-y-6 pb-16">
      <section className="flex flex-col gap-4 border-b border-white/5 pb-5 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-md border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-amber-300">
              Talent đã lưu
            </span>
            <span className="text-[10px] font-semibold text-slate-500">Dữ liệu từ wishlist backend</span>
          </div>
          <h1 className="font-display text-2xl font-black tracking-tight text-white">
            Talent đã <span className="bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-500 bg-clip-text text-transparent">lưu</span>
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
            Quản lý danh sách talent đã lưu, thêm ghi chú nội bộ và gửi yêu cầu liên hệ theo campaign.
          </p>
        </div>

        <div className="rounded-xl border border-white/5 bg-slate-950/30 px-4 py-3">
          <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-500">Danh sách đã lưu</span>
          <span className="text-lg font-black text-white">{savedTalents.length} talent</span>
        </div>
      </section>

      {apiError && <div className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">{apiError}</div>}
      {successMessage && <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{successMessage}</div>}

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <aside className="h-fit rounded-2xl border border-white/5 bg-slate-950/25 p-5 lg:col-span-4">
          <div className="mb-4 flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-amber-300" />
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-300">Gắn vào campaign</h2>
          </div>

          <label className="block space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Campaign mục tiêu</span>
            <select
              value={selectedCampaignId}
              onChange={(event) => setSelectedCampaignId(event.target.value)}
              className="w-full rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2.5 text-xs text-white outline-none focus:border-amber-400/60"
            >
              <option value="">Không gắn campaign</option>
              {campaigns.map((campaign) => (
                <option key={campaign.id} value={campaign.id}>{campaign.title}</option>
              ))}
            </select>
          </label>

          {selectedCampaign && (
            <div className="mt-4 rounded-2xl border border-white/5 bg-slate-950/40 p-4">
              <div className="mb-2 flex items-center justify-between gap-3">
                <h3 className="text-sm font-black text-white">{selectedCampaign.title}</h3>
                <span className={cn(
                  "rounded px-2 py-0.5 text-[9px] font-black uppercase",
                  selectedCampaign.status === "published" ? "bg-emerald-500/10 text-emerald-300" : selectedCampaign.status === "closed" ? "bg-slate-500/10 text-slate-400" : "bg-amber-500/10 text-amber-300",
                )}>
                  {selectedCampaign.status === "published" ? "Đang mở" : selectedCampaign.status === "closed" ? "Đã đóng" : "Nháp"}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-slate-500">{selectedCampaign.description}</p>
            </div>
          )}
        </aside>

        <main className="space-y-4 lg:col-span-8">
          {loading ? (
            <div className="rounded-2xl border border-white/5 bg-slate-950/25 p-10 text-center text-sm text-slate-400">
              Đang tải danh sách đã lưu...
            </div>
          ) : savedTalents.length === 0 ? (
            <div className="rounded-2xl border border-white/5 bg-slate-950/25 p-10 text-center">
              <BookmarkCheck className="mx-auto mb-3 h-8 w-8 text-slate-600" />
              <h3 className="text-sm font-black text-white">Chưa có talent nào trong danh sách đã lưu</h3>
              <p className="mt-2 text-xs text-slate-500">Hãy vào màn Tìm tài năng để lưu talent phù hợp.</p>
            </div>
          ) : (
            savedTalents.map((talent) => {
              const requested = requestedIds.includes(talent.id);

              return (
                <article key={talent.wishlistItemId} className="rounded-2xl border border-white/5 bg-slate-950/25 p-4">
                  <div className="flex flex-col gap-4 md:flex-row">
                    <img src={talent.avatar} alt={talent.name} className="h-28 w-full rounded-2xl object-cover md:w-28" />
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-black text-white">{talent.name}</h3>
                        <span className="rounded bg-white/5 px-2 py-0.5 text-[9px] font-bold uppercase text-slate-400">{talent.type}</span>
                        <span className="rounded bg-amber-400 px-2 py-0.5 text-[9px] font-black uppercase text-slate-950">Tier {talent.tier}</span>
                      </div>
                      <p className="text-xs leading-relaxed text-slate-400">{talent.experience}</p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
                    <label className="md:col-span-2">
                      <span className="mb-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        <FileText className="h-3.5 w-3.5" />
                        Ghi chú nội bộ
                      </span>
                      <input
                        value={notes[talent.id] ?? ""}
                        onChange={(event) => setNotes((current) => ({ ...current, [talent.id]: event.target.value }))}
                        placeholder="Lý do lưu talent này..."
                        className="w-full rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2.5 text-xs text-white outline-none focus:border-amber-400/60"
                      />
                    </label>

                    <div className="flex items-end gap-2">
                      <button
                        onClick={() => attachToCampaign(talent)}
                        className="flex h-10 flex-1 items-center justify-center rounded-xl border border-white/5 bg-white/[0.03] text-[10px] font-black uppercase tracking-wider text-white hover:bg-white/10"
                      >
                        <Plus className="mr-1.5 h-3.5 w-3.5" />
                        Gắn campaign
                      </button>
                      <button
                        onClick={() => removeTalent(talent)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-rose-500/20 bg-rose-500/5 text-rose-300 hover:bg-rose-500/10"
                        title="Xóa khỏi danh sách đã lưu"
                      >
                        <HeartOff className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end border-t border-white/5 pt-4">
                    <button
                      onClick={() => sendRequest(talent.id)}
                      disabled={requested}
                      className={cn(
                        "flex h-10 items-center justify-center rounded-xl px-4 text-[10px] font-black uppercase tracking-wider",
                        requested ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-300" : "bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-500 text-slate-950",
                      )}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      {requested ? "Đã gửi yêu cầu" : "Gửi yêu cầu liên hệ"}
                    </button>
                  </div>
                </article>
              );
            })
          )}
        </main>
      </section>
    </div>
  );
}
