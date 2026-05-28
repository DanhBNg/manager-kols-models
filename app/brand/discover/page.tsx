"use client";

import { useMemo, useState } from "react";
import {
  BookmarkCheck,
  CheckCircle2,
  Eye,
  Filter,
  Heart,
  Search,
  Send,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { savedTalentIds, talents, type TalentProfile } from "@/lib/brand-mvp-data";
import { cn } from "@/lib/utils";

const allValue = "all";

export default function DiscoverTalentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState(allValue);
  const [selectedCity, setSelectedCity] = useState(allValue);
  const [selectedTier, setSelectedTier] = useState(allValue);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [savedIds, setSavedIds] = useState<string[]>(savedTalentIds);
  const [selectedProfile, setSelectedProfile] = useState<TalentProfile | null>(null);
  const [sentRequests, setSentRequests] = useState<Record<string, boolean>>({});

  const filteredTalents = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase();

    return talents.filter((talent) => {
      const matchesSearch =
        !keyword ||
        talent.name.toLowerCase().includes(keyword) ||
        talent.skills.some((skill) => skill.toLowerCase().includes(keyword)) ||
        talent.type.toLowerCase().includes(keyword);
      const matchesType = selectedType === allValue || talent.type === selectedType;
      const matchesCity = selectedCity === allValue || talent.city === selectedCity;
      const matchesTier = selectedTier === allValue || talent.tier === selectedTier;
      const matchesVerified = !verifiedOnly || talent.verified;

      return matchesSearch && matchesType && matchesCity && matchesTier && matchesVerified;
    });
  }, [searchQuery, selectedCity, selectedTier, selectedType, verifiedOnly]);

  function resetFilters() {
    setSearchQuery("");
    setSelectedType(allValue);
    setSelectedCity(allValue);
    setSelectedTier(allValue);
    setVerifiedOnly(false);
  }

  function toggleSaved(id: string) {
    setSavedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function sendContactRequest(id: string) {
    setSentRequests((current) => ({ ...current, [id]: true }));
    window.alert("Đã tạo yêu cầu liên hệ sơ bộ. Khi nối backend, yêu cầu này sẽ được lưu vào contact_requests.");
  }

  return (
    <div className="space-y-6 pb-16">
      <section className="border-b border-white/5 pb-5">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-md border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-amber-300">
            Talent Discovery
          </span>
          <span className="text-[10px] font-semibold text-slate-500">MVP filter</span>
        </div>
        <h1 className="font-display text-2xl font-black tracking-tight text-white">
          Tìm kiếm <span className="bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-500 bg-clip-text text-transparent">talent</span>
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
          Lọc talent theo vai trò, khu vực, tier và trạng thái xác minh. Hành động chính trong MVP là xem hồ sơ, lưu shortlist và gửi yêu cầu liên hệ.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <aside className="h-fit space-y-5 rounded-2xl border border-white/5 bg-slate-950/25 p-5 lg:col-span-3">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <span className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white">
              <SlidersHorizontal className="h-4 w-4 text-amber-300" />
              Bộ lọc
            </span>
            <button onClick={resetFilters} className="text-[10px] font-bold uppercase text-slate-500 hover:text-white">
              Reset
            </button>
          </div>

          <label className="block space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Từ khóa</span>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Tên, kỹ năng, vai trò..."
                className="w-full rounded-xl border border-white/5 bg-slate-900/50 py-2.5 pl-9 pr-3 text-xs text-white outline-none transition focus:border-amber-400/60"
              />
            </div>
          </label>

          <label className="block space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Loại talent</span>
            <select value={selectedType} onChange={(event) => setSelectedType(event.target.value)} className="w-full rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2.5 text-xs text-white outline-none focus:border-amber-400/60">
              <option value={allValue}>Tất cả</option>
              <option value="KOL">KOL</option>
              <option value="Model">Model</option>
              <option value="MC">MC</option>
              <option value="PG">PG</option>
              <option value="Dancer">Dancer</option>
            </select>
          </label>

          <label className="block space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Thành phố</span>
            <select value={selectedCity} onChange={(event) => setSelectedCity(event.target.value)} className="w-full rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2.5 text-xs text-white outline-none focus:border-amber-400/60">
              <option value={allValue}>Toàn quốc</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
              <option value="Đà Nẵng">Đà Nẵng</option>
            </select>
          </label>

          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Tier</span>
            <div className="grid grid-cols-2 gap-2">
              {[allValue, "A", "B", "C"].map((tier) => (
                <button
                  key={tier}
                  onClick={() => setSelectedTier(tier)}
                  className={cn(
                    "rounded-xl border px-3 py-2 text-xs font-black transition",
                    selectedTier === tier
                      ? "border-amber-400 bg-amber-400/10 text-amber-300"
                      : "border-white/5 bg-slate-900/30 text-slate-400 hover:text-white"
                  )}
                >
                  {tier === allValue ? "Tất cả" : `Tier ${tier}`}
                </button>
              ))}
            </div>
          </div>

          <label className="flex cursor-pointer items-center justify-between rounded-xl border border-white/5 bg-slate-900/30 p-3">
            <span className="flex items-center gap-2 text-xs font-bold text-slate-300">
              <CheckCircle2 className="h-4 w-4 text-emerald-300" />
              Chỉ hồ sơ xác minh
            </span>
            <input type="checkbox" checked={verifiedOnly} onChange={(event) => setVerifiedOnly(event.target.checked)} />
          </label>
        </aside>

        <main className="space-y-4 lg:col-span-9">
          <div className="flex flex-col gap-3 border-b border-white/5 pb-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="flex items-center gap-2 text-xs text-slate-400">
              <Filter className="h-4 w-4 text-slate-500" />
              Tìm thấy <b className="text-white">{filteredTalents.length}</b> talent phù hợp.
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Đã lưu {savedIds.length} talent
            </span>
          </div>

          {filteredTalents.length === 0 ? (
            <div className="rounded-2xl border border-white/5 bg-slate-950/25 p-10 text-center">
              <Search className="mx-auto mb-3 h-8 w-8 text-slate-600" />
              <h3 className="text-sm font-black text-white">Không có talent phù hợp</h3>
              <p className="mt-2 text-xs text-slate-500">Hãy nới bớt bộ lọc hoặc thử từ khóa khác.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredTalents.map((talent) => {
                const isSaved = savedIds.includes(talent.id);
                return (
                  <article key={talent.id} className="overflow-hidden rounded-2xl border border-white/5 bg-slate-950/25 transition hover:border-white/10">
                    <div className="relative h-60">
                      <img src={talent.avatar} alt={talent.name} className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#03050c] via-[#03050c]/20 to-transparent" />
                      <div className="absolute left-3 top-3 flex gap-2">
                        <span className="rounded bg-amber-400 px-2 py-0.5 text-[9px] font-black uppercase text-slate-950">Tier {talent.tier}</span>
                        {talent.verified && (
                          <span className="rounded bg-emerald-500/90 px-2 py-0.5 text-[9px] font-black uppercase text-white">Đã xác minh</span>
                        )}
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="truncate text-base font-black text-white">{talent.name}</h3>
                        <p className="text-[11px] text-slate-300">{talent.type} · {talent.city}</p>
                      </div>
                    </div>

                    <div className="space-y-4 p-4">
                      <div className="grid grid-cols-3 gap-2 rounded-xl border border-white/5 bg-slate-950/60 p-2 text-center">
                        <div>
                          <span className="block text-[8px] font-bold uppercase text-slate-500">Tuổi</span>
                          <span className="text-[11px] font-black text-white">{talent.age}</span>
                        </div>
                        <div className="border-x border-white/5">
                          <span className="block text-[8px] font-bold uppercase text-slate-500">Cao</span>
                          <span className="text-[11px] font-black text-white">{talent.height}cm</span>
                        </div>
                        <div>
                          <span className="block text-[8px] font-bold uppercase text-slate-500">Follower</span>
                          <span className="text-[11px] font-black text-amber-300">{talent.followers}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {talent.skills.slice(0, 3).map((skill) => (
                          <span key={skill} className="rounded-lg border border-white/5 bg-white/[0.03] px-2 py-1 text-[10px] font-semibold text-slate-400">
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleSaved(talent.id)}
                          className={cn(
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition",
                            isSaved ? "border-amber-400 bg-amber-400 text-slate-950" : "border-white/5 bg-white/[0.03] text-slate-400 hover:text-white"
                          )}
                          title={isSaved ? "Đã lưu shortlist" : "Lưu shortlist"}
                        >
                          <Heart className={cn("h-4 w-4", isSaved && "fill-current")} />
                        </button>
                        <button onClick={() => setSelectedProfile(talent)} className="flex h-10 flex-1 items-center justify-center rounded-xl bg-white/5 text-[10px] font-black uppercase tracking-wider text-white transition hover:bg-white/10">
                          Xem hồ sơ <Eye className="ml-1.5 h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {selectedProfile && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm">
          <div className="relative flex h-full w-full max-w-lg flex-col overflow-y-auto border-l border-white/10 bg-[#070913] shadow-2xl">
            <button onClick={() => setSelectedProfile(null)} className="absolute left-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-slate-950/80 text-slate-400 hover:text-white">
              <X className="h-4.5 w-4.5" />
            </button>

            <div className="relative h-56">
              <img src={selectedProfile.cover} alt={selectedProfile.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070913] to-transparent" />
              <div className="absolute bottom-4 left-6 right-6 flex items-end gap-4">
                <img src={selectedProfile.avatar} alt={selectedProfile.name} className="h-20 w-20 rounded-2xl border-2 border-amber-300 object-cover" />
                <div>
                  <h2 className="text-xl font-black text-white">{selectedProfile.name}</h2>
                  <p className="text-xs text-slate-300">{selectedProfile.type} · {selectedProfile.city}</p>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-6 p-6">
              <div className="flex flex-wrap gap-2">
                <span className="rounded bg-amber-400 px-2 py-1 text-[10px] font-black uppercase text-slate-950">Tier {selectedProfile.tier}</span>
                <span className="rounded border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-black uppercase text-slate-300">Hoàn thiện {selectedProfile.completion}%</span>
                {selectedProfile.verified && <span className="rounded bg-emerald-500/10 px-2 py-1 text-[10px] font-black uppercase text-emerald-300">Đã xác minh</span>}
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl border border-white/5 bg-slate-950/40 p-3">
                  <span className="block text-[9px] font-bold uppercase text-slate-500">Tuổi</span>
                  <span className="font-black text-white">{selectedProfile.age}</span>
                </div>
                <div className="rounded-xl border border-white/5 bg-slate-950/40 p-3">
                  <span className="block text-[9px] font-bold uppercase text-slate-500">Chiều cao</span>
                  <span className="font-black text-white">{selectedProfile.height}cm</span>
                </div>
                <div className="rounded-xl border border-white/5 bg-slate-950/40 p-3">
                  <span className="block text-[9px] font-bold uppercase text-slate-500">Rate</span>
                  <span className="font-black text-amber-300">{selectedProfile.rate}</span>
                </div>
              </div>

              <section>
                <h3 className="mb-2 text-[10px] font-black uppercase tracking-widest text-slate-500">Kinh nghiệm</h3>
                <p className="text-sm leading-relaxed text-slate-300">{selectedProfile.experience}</p>
              </section>

              <section>
                <h3 className="mb-2 text-[10px] font-black uppercase tracking-widest text-slate-500">Portfolio</h3>
                <div className="space-y-2">
                  {selectedProfile.portfolio.map((item) => (
                    <div key={item} className="rounded-xl border border-white/5 bg-slate-950/40 px-3 py-2 text-xs font-semibold text-slate-300">
                      {item}
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="mb-2 text-[10px] font-black uppercase tracking-widest text-slate-500">Lịch rảnh cơ bản</h3>
                <p className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-3 py-2 text-xs font-semibold text-emerald-300">
                  {selectedProfile.availability}
                </p>
              </section>
            </div>

            <div className="border-t border-white/5 p-5">
              <div className="flex gap-2">
                <button
                  onClick={() => toggleSaved(selectedProfile.id)}
                  className="flex h-11 flex-1 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-xs font-black uppercase tracking-wider text-amber-300 hover:bg-amber-500/15"
                >
                  <BookmarkCheck className="mr-2 h-4 w-4" />
                  {savedIds.includes(selectedProfile.id) ? "Đã lưu shortlist" : "Lưu shortlist"}
                </button>
                <button
                  onClick={() => sendContactRequest(selectedProfile.id)}
                  disabled={sentRequests[selectedProfile.id]}
                  className={cn(
                    "flex h-11 flex-1 items-center justify-center rounded-xl text-xs font-black uppercase tracking-wider transition",
                    sentRequests[selectedProfile.id]
                      ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                      : "bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-500 text-slate-950"
                  )}
                >
                  <Send className="mr-2 h-4 w-4" />
                  {sentRequests[selectedProfile.id] ? "Đã gửi yêu cầu" : "Gửi liên hệ"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

