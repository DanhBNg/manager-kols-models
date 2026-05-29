"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  Eye,
  Filter,
  Heart,
  MapPin,
  Search,
  Send,
  SlidersHorizontal,
  Star,
  Users,
} from "lucide-react";
import { savedTalentIds, talents } from "@/lib/brand-mvp-data";
import { cn } from "@/lib/utils";

const allValue = "all";

export default function DiscoverTalentsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGender, setSelectedGender] = useState(allValue);
  const [selectedType, setSelectedType] = useState(allValue);
  const [selectedCity, setSelectedCity] = useState(allValue);
  const [selectedPlatform, setSelectedPlatform] = useState(allValue);
  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(30);
  const [minHeight, setMinHeight] = useState(160);
  const [minFollowers, setMinFollowers] = useState(0);
  const [maxBudget, setMaxBudget] = useState(15000000);
  const [availableDate, setAvailableDate] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [savedIds, setSavedIds] = useState<string[]>(savedTalentIds);
  const [contactedIds, setContactedIds] = useState<string[]>([]);
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const filteredTalents = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase();

    return talents
      .filter((talent) => {
        const matchesSearch =
          !keyword ||
          talent.name.toLowerCase().includes(keyword) ||
          talent.skills.some((skill) => skill.toLowerCase().includes(keyword)) ||
          talent.type.toLowerCase().includes(keyword);
        const matchesGender = selectedGender === allValue || talent.gender === selectedGender;
        const matchesType = selectedType === allValue || talent.type === selectedType;
        const matchesCity = selectedCity === allValue || talent.city === selectedCity;
        const matchesPlatform = selectedPlatform === allValue || talent.platforms.includes(selectedPlatform);
        const matchesAge = talent.age >= minAge && talent.age <= maxAge;
        const matchesHeight = talent.height >= minHeight;
        const matchesFollowers = talent.followersCount >= minFollowers;
        const matchesBudget = talent.rateValue <= maxBudget;
        const matchesAvailable = !availableDate || talent.availabilityDates.includes(availableDate);
        const matchesVerified = !verifiedOnly || talent.verified;

        return matchesSearch && matchesGender && matchesType && matchesCity && matchesPlatform && matchesAge && matchesHeight && matchesFollowers && matchesBudget && matchesAvailable && matchesVerified;
      })
      .sort((a, b) => b.matchScore - a.matchScore);
  }, [availableDate, maxAge, maxBudget, minAge, minFollowers, minHeight, searchQuery, selectedCity, selectedGender, selectedPlatform, selectedType, verifiedOnly]);

  const comparedTalents = talents.filter((talent) => compareIds.includes(talent.id));

  function resetFilters() {
    setSearchQuery("");
    setSelectedGender(allValue);
    setSelectedType(allValue);
    setSelectedCity(allValue);
    setSelectedPlatform(allValue);
    setMinAge(18);
    setMaxAge(30);
    setMinHeight(160);
    setMinFollowers(0);
    setMaxBudget(15000000);
    setAvailableDate("");
    setVerifiedOnly(false);
  }

  function toggleSaved(id: string) {
    setSavedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function toggleCompare(id: string) {
    setCompareIds((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      if (current.length >= 4) {
        window.alert("MVP cho phép so sánh tối đa 4 hồ sơ một lần.");
        return current;
      }
      return [...current, id];
    });
  }

  function sendContactRequest(id: string) {
    setContactedIds((current) => current.includes(id) ? current : [...current, id]);
    window.alert("Đã tạo yêu cầu liên hệ demo. Khi nối backend, thao tác này sẽ gọi POST /api/contact-requests.");
  }

  return (
    <div className="space-y-6 pb-20">
      <section className="border-b border-white/5 pb-5">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-md border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-amber-300">
            Headhunting workspace
          </span>
          <span className="text-[10px] font-semibold text-slate-500">Advanced filters</span>
        </div>
        <h1 className="font-display text-2xl font-black tracking-tight text-white">
          Tìm đúng talent, đúng thời điểm, đúng ngân sách
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-400">
          Bộ lọc được thiết kế cho Brand Manager, Event Organizer, Agency và HR: nhân khẩu học, ngoại hình, chuyên môn, social, lịch rảnh, ngân sách và chất lượng hồ sơ.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <aside className="h-fit space-y-5 rounded-2xl border border-white/5 bg-slate-950/30 p-5 lg:sticky lg:top-24 lg:col-span-3">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <span className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white">
              <SlidersHorizontal className="h-4 w-4 text-amber-300" />
              Bộ lọc nâng cao
            </span>
            <button onClick={resetFilters} className="text-[10px] font-bold uppercase text-slate-500 hover:text-white">
              Reset
            </button>
          </div>

          <label className="block space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Tìm theo tên/kỹ năng</span>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="VD: MC, livestream, lookbook..."
                className="w-full rounded-xl border border-white/5 bg-slate-900/50 py-2.5 pl-9 pr-3 text-xs text-white outline-none transition focus:border-amber-400/60"
              />
            </div>
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="block space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Giới tính</span>
              <select value={selectedGender} onChange={(event) => setSelectedGender(event.target.value)} className="w-full rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2.5 text-xs text-white outline-none focus:border-amber-400/60">
                <option value={allValue}>Tất cả</option>
                <option value="Nữ">Nữ</option>
                <option value="Nam">Nam</option>
              </select>
            </label>
            <label className="block space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Vai trò</span>
              <select value={selectedType} onChange={(event) => setSelectedType(event.target.value)} className="w-full rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2.5 text-xs text-white outline-none focus:border-amber-400/60">
                <option value={allValue}>Tất cả</option>
                <option value="KOL">KOL</option>
                <option value="Model">Model</option>
                <option value="MC">MC</option>
                <option value="PG">PG</option>
                <option value="Dancer">Dancer</option>
              </select>
            </label>
          </div>

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
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500">
              <span>Độ tuổi</span>
              <span>{minAge}-{maxAge}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input type="number" min={16} max={60} value={minAge} onChange={(event) => setMinAge(Number(event.target.value))} className="rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2 text-xs text-white outline-none focus:border-amber-400/60" />
              <input type="number" min={16} max={60} value={maxAge} onChange={(event) => setMaxAge(Number(event.target.value))} className="rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2 text-xs text-white outline-none focus:border-amber-400/60" />
            </div>
          </div>

          <label className="block space-y-2">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500">
              <span>Chiều cao tối thiểu</span>
              <span>{minHeight}cm</span>
            </div>
            <input type="range" min={150} max={185} value={minHeight} onChange={(event) => setMinHeight(Number(event.target.value))} className="w-full accent-amber-400" />
          </label>

          <label className="block space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Social platform</span>
            <select value={selectedPlatform} onChange={(event) => setSelectedPlatform(event.target.value)} className="w-full rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2.5 text-xs text-white outline-none focus:border-amber-400/60">
              <option value={allValue}>Tất cả</option>
              <option value="TikTok">TikTok</option>
              <option value="Instagram">Instagram</option>
              <option value="Facebook">Facebook</option>
            </select>
          </label>

          <label className="block space-y-2">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500">
              <span>Follower tối thiểu</span>
              <span>{minFollowers.toLocaleString("vi-VN")}</span>
            </div>
            <input type="range" min={0} max={250000} step={10000} value={minFollowers} onChange={(event) => setMinFollowers(Number(event.target.value))} className="w-full accent-amber-400" />
          </label>

          <label className="block space-y-2">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500">
              <span>Budget tối đa</span>
              <span>{maxBudget.toLocaleString("vi-VN")}đ</span>
            </div>
            <input type="range" min={1000000} max={20000000} step={500000} value={maxBudget} onChange={(event) => setMaxBudget(Number(event.target.value))} className="w-full accent-amber-400" />
          </label>

          <label className="block space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Ngày rảnh</span>
            <input type="date" value={availableDate} onChange={(event) => setAvailableDate(event.target.value)} className="w-full rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2.5 text-xs text-white outline-none focus:border-amber-400/60" />
          </label>

          <label className="flex cursor-pointer items-center justify-between rounded-xl border border-white/5 bg-slate-900/30 p-3">
            <span className="flex items-center gap-2 text-xs font-bold text-slate-300">
              <CheckCircle2 className="h-4 w-4 text-emerald-300" />
              Chỉ verified
            </span>
            <input type="checkbox" checked={verifiedOnly} onChange={(event) => setVerifiedOnly(event.target.checked)} />
          </label>
        </aside>

        <main className="space-y-4 lg:col-span-9">
          <div className="flex flex-col gap-3 border-b border-white/5 pb-3 xl:flex-row xl:items-center xl:justify-between">
            <span className="flex items-center gap-2 text-xs text-slate-400">
              <Filter className="h-4 w-4 text-slate-500" />
              Tìm thấy <b className="text-white">{filteredTalents.length}</b> talent phù hợp, sắp xếp theo điểm match.
            </span>
            <div className="flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
              <span>Đã lưu {savedIds.length}</span>
              <span>Đang so sánh {compareIds.length}/4</span>
            </div>
          </div>

          {filteredTalents.length === 0 ? (
            <div className="rounded-2xl border border-white/5 bg-slate-950/25 p-10 text-center">
              <Search className="mx-auto mb-3 h-8 w-8 text-slate-600" />
              <h3 className="text-sm font-black text-white">Không có talent phù hợp</h3>
              <p className="mt-2 text-xs text-slate-500">Hãy nới bớt bộ lọc hoặc thử từ khóa khác.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              {filteredTalents.map((talent) => {
                const isSaved = savedIds.includes(talent.id);
                const isContacted = contactedIds.includes(talent.id);
                const isCompared = compareIds.includes(talent.id);

                return (
                  <article key={talent.id} className="grid grid-cols-1 overflow-hidden rounded-2xl border border-white/5 bg-slate-950/25 transition hover:border-white/10 md:grid-cols-[180px_1fr]">
                    <div className="relative min-h-64 md:min-h-full">
                      <img src={talent.avatar} alt={talent.name} className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#03050c] via-transparent to-transparent" />
                      <span className="absolute left-3 top-3 rounded bg-amber-400 px-2 py-0.5 text-[9px] font-black uppercase text-slate-950">
                        {talent.matchScore}% match
                      </span>
                    </div>

                    <div className="flex flex-col justify-between p-4">
                      <div>
                        <div className="mb-2 flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-base font-black text-white">{talent.name}</h3>
                              {talent.verified && <CheckCircle2 className="h-4 w-4 text-emerald-300" />}
                            </div>
                            <p className="mt-1 flex items-center gap-1 text-[11px] text-slate-400">
                              <MapPin className="h-3.5 w-3.5" />
                              {talent.district}, {talent.city}
                            </p>
                          </div>
                          <button
                            onClick={() => toggleSaved(talent.id)}
                            className={cn(
                              "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition",
                              isSaved ? "border-amber-400 bg-amber-400 text-slate-950" : "border-white/5 bg-white/[0.03] text-slate-400 hover:text-white"
                            )}
                            title={isSaved ? "Đã lưu talent" : "Lưu talent"}
                          >
                            <Heart className={cn("h-4 w-4", isSaved && "fill-current")} />
                          </button>
                        </div>

                        <div className="mb-3 flex flex-wrap gap-1.5">
                          <span className="rounded bg-white/5 px-2 py-0.5 text-[9px] font-bold uppercase text-slate-400">{talent.type}</span>
                          <span className="rounded bg-white/5 px-2 py-0.5 text-[9px] font-bold uppercase text-slate-400">{talent.age} tuổi</span>
                          <span className="rounded bg-white/5 px-2 py-0.5 text-[9px] font-bold uppercase text-slate-400">{talent.height}cm</span>
                          <span className="rounded bg-white/5 px-2 py-0.5 text-[9px] font-bold uppercase text-slate-400">Tier {talent.tier}</span>
                        </div>

                        <div className="mb-3 grid grid-cols-4 gap-2 rounded-xl border border-white/5 bg-slate-950/60 p-2 text-center">
                          <div>
                            <span className="block text-[8px] font-bold uppercase text-slate-500">Rating</span>
                            <span className="inline-flex items-center gap-1 text-[11px] font-black text-white">{talent.rating}<Star className="h-3 w-3 fill-amber-400 text-amber-400" /></span>
                          </div>
                          <div className="border-l border-white/5">
                            <span className="block text-[8px] font-bold uppercase text-slate-500">Jobs</span>
                            <span className="text-[11px] font-black text-white">{talent.completedJobs}</span>
                          </div>
                          <div className="border-l border-white/5">
                            <span className="block text-[8px] font-bold uppercase text-slate-500">Follower</span>
                            <span className="text-[11px] font-black text-amber-300">{talent.followers}</span>
                          </div>
                          <div className="border-l border-white/5">
                            <span className="block text-[8px] font-bold uppercase text-slate-500">ER</span>
                            <span className="text-[11px] font-black text-cyan-300">{talent.engagementRate}%</span>
                          </div>
                        </div>

                        <p className="line-clamp-2 text-xs leading-relaxed text-slate-400">{talent.experience}</p>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <button onClick={() => router.push(`/brand/talents/${talent.id}`)} className="flex h-10 flex-1 items-center justify-center rounded-xl bg-white/5 px-3 text-[10px] font-black uppercase tracking-wider text-white transition hover:bg-white/10">
                          Xem hồ sơ <Eye className="ml-1.5 h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => toggleCompare(talent.id)}
                          className={cn(
                            "flex h-10 items-center justify-center rounded-xl border px-3 text-[10px] font-black uppercase tracking-wider",
                            isCompared ? "border-cyan-400 bg-cyan-400/10 text-cyan-300" : "border-white/5 bg-white/[0.03] text-slate-300 hover:text-white"
                          )}
                        >
                          <Users className="mr-1.5 h-3.5 w-3.5" />
                          So sánh
                        </button>
                        <button
                          onClick={() => sendContactRequest(talent.id)}
                          disabled={isContacted}
                          className={cn(
                            "flex h-10 items-center justify-center rounded-xl px-3 text-[10px] font-black uppercase tracking-wider",
                            isContacted ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-300" : "bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-500 text-slate-950"
                          )}
                        >
                          <Send className="mr-1.5 h-3.5 w-3.5" />
                          {isContacted ? "Đã gửi" : "Liên hệ"}
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

      {comparedTalents.length > 0 && (
        <div className="fixed bottom-5 left-1/2 z-40 w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2 rounded-2xl border border-amber-500/20 bg-[#070913]/95 p-4 shadow-2xl backdrop-blur">
          <div className="mb-3 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-white">So sánh nhanh</h3>
              <p className="mt-1 text-[10px] text-slate-500">Tối đa 4 hồ sơ: ảnh, chỉ số, giá, lịch rảnh, rating.</p>
            </div>
            <button onClick={() => setCompareIds([])} className="text-[10px] font-black uppercase text-slate-500 hover:text-white">Xóa so sánh</button>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
            {comparedTalents.map((talent) => (
              <div key={talent.id} className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
                <div className="mb-2 flex items-center gap-2">
                  <img src={talent.avatar} alt={talent.name} className="h-9 w-9 rounded-lg object-cover" />
                  <div className="min-w-0">
                    <h4 className="truncate text-xs font-black text-white">{talent.name}</h4>
                    <p className="text-[9px] text-slate-500">{talent.type} · {talent.city}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400">
                  <span>{talent.height}cm</span>
                  <span>{talent.rating}★</span>
                  <span>{talent.followers}</span>
                  <span>{talent.rate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
