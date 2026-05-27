"use client";

import React, { useState } from "react";
import {
  Sparkles, Search, Grid, List, Check, Plus, X, ChevronRight,
  ArrowRight, Shield, Award, Calendar, DollarSign, Eye, Star,
  SlidersHorizontal, CheckSquare, Heart, RefreshCw, Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

// Comprehensive Mock Data of Talents
const INITIAL_TALENTS = [
  {
    id: "tal-1",
    name: "Nguyễn Mai Anh",
    tier: "A",
    category: "KOL",
    followersCount: 120000,
    followers: "120K",
    er: "4.8%",
    rate: "từ 8M",
    rateVal: 8000000,
    location: "Hà Nội",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&h=300&q=80",
    cover: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
    height: "172cm",
    weight: "51kg",
    metrics: "85-60-90",
    skills: ["Catwalk", "MC", "Livestream"],
    reliability: 96,
    matchScore: 96,
    education: "Cử nhân Đại học Ngoại thương",
    languages: "Tiếng Anh, Tiếng Việt"
  },
  {
    id: "tal-2",
    name: "Khánh Linh (Kency)",
    tier: "B",
    category: "Model",
    followersCount: 85000,
    followers: "85K",
    er: "5.2%",
    rate: "từ 5.5M",
    rateVal: 5500000,
    location: "TP. Hồ Chí Minh",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&h=300&q=80",
    cover: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80",
    height: "175cm",
    weight: "53kg",
    metrics: "83-59-89",
    skills: ["Catwalk", "High Fashion Styling", "Tiktok Video"],
    reliability: 94,
    matchScore: 91,
    education: "Cao đẳng Nghệ thuật",
    languages: "Tiếng Việt, Tiếng Anh giao tiếp"
  },
  {
    id: "tal-3",
    name: "Lê Ngọc Hân",
    tier: "A",
    category: "KOL",
    followersCount: 240000,
    followers: "240K",
    er: "3.9%",
    rate: "từ 15M",
    rateVal: 15000000,
    location: "TP. Hồ Chí Minh",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&h=300&q=80",
    cover: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    height: "173cm",
    weight: "50kg",
    metrics: "86-61-91",
    skills: ["Catwalk", "Interviewing", "Public Speaking"],
    reliability: 98,
    matchScore: 88,
    education: "Cử nhân Báo chí truyền thông",
    languages: "Tiếng Anh trôi chảy, Tiếng Việt"
  },
  {
    id: "tal-4",
    name: "Trần Thu Thảo",
    tier: "B",
    category: "Model",
    followersCount: 62000,
    followers: "62K",
    er: "4.5%",
    rate: "từ 7M",
    rateVal: 7000000,
    location: "Hà Nội",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&h=300&q=80",
    cover: "https://images.unsplash.com/photo-1493655161922-ef98929de9d8?auto=format&fit=crop&w=800&q=80",
    height: "170cm",
    weight: "48kg",
    metrics: "84-58-88",
    skills: ["Catwalk", "Lookbook Shooting", "Livestream"],
    reliability: 92,
    matchScore: 89,
    education: "Học viện Bưu chính Viễn thông",
    languages: "Tiếng Việt"
  },
  {
    id: "tal-5",
    name: "Nguyễn Hương Giang",
    tier: "A",
    category: "MC",
    followersCount: 180000,
    followers: "180K",
    er: "4.1%",
    rate: "từ 12M",
    rateVal: 12000000,
    location: "Hà Nội",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&h=300&q=80",
    cover: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&w=800&q=80",
    height: "168cm",
    weight: "47kg",
    metrics: "82-60-88",
    skills: ["MC Event", "Voice acting", "Video Review"],
    reliability: 97,
    matchScore: 85,
    education: "Cử nhân Luật",
    languages: "Tiếng Anh IELTS 7.5, Tiếng Việt"
  }
];

export default function DiscoverTalentsPage() {
  const [talents, setTalents] = useState(INITIAL_TALENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTier, setSelectedTier] = useState<string>("All");
  const [selectedLocation, setSelectedLocation] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Comparison State
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  // Profile Drawer State
  const [selectedProfile, setSelectedProfile] = useState<typeof INITIAL_TALENTS[0] | null>(null);

  // Simulated Booking flow
  const handleQuickBook = (talent: typeof INITIAL_TALENTS[0]) => {
    alert(`Đã khởi tạo quy trình đặt lịch (Booking) thành công với ${talent.name}. Cát-xê dự kiến: ${talent.rate}.`);
    setSelectedProfile(null);
  };

  // Filter logic
  const filteredTalents = talents.filter((tal) => {
    const matchesSearch = tal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tal.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTier = selectedTier === "All" || tal.tier === selectedTier;
    const matchesLocation = selectedLocation === "All" || tal.location === selectedLocation;
    const matchesCategory = selectedCategory === "All" || tal.category === selectedCategory;

    return matchesSearch && matchesTier && matchesLocation && matchesCategory;
  });

  const toggleSelectForCompare = (id: string) => {
    if (selectedForCompare.includes(id)) {
      setSelectedForCompare((prev) => prev.filter((item) => item !== id));
    } else {
      if (selectedForCompare.length >= 3) {
        alert("Bạn chỉ có thể so sánh tối đa 3 tài năng cùng một lúc.");
        return;
      }
      setSelectedForCompare((prev) => [...prev, id]);
    }
  };

  const getComparisonTalents = () => {
    return talents.filter((t) => selectedForCompare.includes(t.id));
  };

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div>
        <h1 className="font-display text-2xl font-extrabold tracking-tight text-white">
          TÌM KIẾM & PHÂN TÍCH <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 bg-clip-text text-transparent">TÀI NĂNG</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Dùng AI để lọc theo số đo nhân trắc học, độ phủ mạng xã hội và đánh giá độ tin cậy.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">

        {/* Left Side: Filter Sidebar */}
        <aside className="lg:col-span-3 rounded-2xl border border-white/5 bg-slate-950/20 p-5 backdrop-blur-md h-fit space-y-5">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <SlidersHorizontal className="h-4 w-4 text-amber-400" /> Bộ Lọc AI
            </span>
            <button
              onClick={() => {
                setSelectedTier("All");
                setSelectedLocation("All");
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="text-[10px] text-slate-500 hover:text-white"
            >
              Reset
            </button>
          </div>

          {/* Search bar */}
          <div className="space-y-1">
            <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Tìm theo tên/kỹ năng</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
              <input
                type="text"
                placeholder="Nhập tên, kỹ năng..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-white/5 bg-slate-900/50 py-2 pl-9 pr-3 text-xs text-white focus:border-amber-400/50 focus:outline-none"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="space-y-1">
            <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Vai trò chính</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
            >
              <option value="All">Tất cả vai trò</option>
              <option value="KOL">KOL / Đại sứ thương hiệu</option>
              <option value="Model">Runway & Photo Model</option>
              <option value="MC">MC Sự Kiện / Livestream</option>
            </select>
          </div>

          {/* Tier Filter */}
          <div className="space-y-1">
            <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Phân Hạng Hạng Sắc Đẹp (Tier)</label>
            <div className="grid grid-cols-2 gap-2">
              {["All", "S", "A", "B"].map((t) => (
                <div
                  key={t}
                  onClick={() => setSelectedTier(t)}
                  className={cn(
                    "rounded-xl border p-2 cursor-pointer text-xs font-bold text-center transition-all",
                    selectedTier === t
                      ? "border-amber-400 bg-amber-400/5 text-amber-300"
                      : "border-white/5 bg-slate-900/30 text-slate-400 hover:bg-slate-900/50"
                  )}
                >
                  {t === "All" ? "Tất cả" : `Tier ${t}`}
                </div>
              ))}
            </div>
          </div>

          {/* Location Filter */}
          <div className="space-y-1">
            <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Địa điểm</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
            >
              <option value="All">Toàn bộ Việt Nam</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
            </select>
          </div>

        </aside>

        {/* Right Side: Main Listing Panel */}
        <main className="lg:col-span-9 space-y-4">

          {/* Top Bar inside listing */}
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <span className="text-xs text-slate-400">
              Tìm thấy <b className="text-white font-bold">{filteredTalents.length}</b> tài năng phù hợp.
            </span>

            <div className="flex gap-1.5 border border-white/5 rounded-xl bg-slate-950/30 p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-1.5 rounded-lg transition-colors",
                  viewMode === "grid" ? "bg-white/5 text-amber-400" : "text-slate-500 hover:text-white"
                )}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={cn(
                  "p-1.5 rounded-lg transition-colors",
                  viewMode === "table" ? "bg-white/5 text-amber-400" : "text-slate-500 hover:text-white"
                )}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* GRID VIEW */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {filteredTalents.map((tal) => (
                <div
                  key={tal.id}
                  className="relative rounded-2xl border border-white/5 bg-slate-950/20 overflow-hidden group hover:border-white/10 transition-all duration-300 flex flex-col justify-between"
                >

                  {/* Photo Container */}
                  <div className="relative h-60 w-full overflow-hidden">
                    <img
                      src={tal.avatar}
                      alt={tal.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Top float indicators */}
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      <span className="rounded bg-gradient-to-br from-amber-400 to-amber-600 px-2 py-0.5 font-display text-[9px] font-black text-slate-950 uppercase">
                        Tier {tal.tier}
                      </span>
                    </div>

                    <span className="absolute top-3 right-3 rounded-md bg-slate-950/80 border border-white/10 px-2 py-0.5 font-display text-[9px] font-black text-amber-400">
                      {tal.matchScore}% Match
                    </span>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#03050c] via-[#03050c]/10 to-transparent" />

                    {/* Bottom absolute title */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="font-display font-extrabold text-sm text-white truncate">{tal.name}</h3>
                      <span className="text-[10px] text-slate-400">{tal.category} • {tal.location}</span>
                    </div>
                  </div>

                  {/* Talent specifications */}
                  <div className="p-4 space-y-4">
                    <div className="flex justify-between items-center rounded-xl bg-slate-950/40 p-2.5 border border-white/5 text-center">
                      <div className="flex-1 border-r border-white/5">
                        <span className="block text-[8px] text-slate-500 uppercase font-bold">Followers</span>
                        <span className="text-[10px] font-bold text-white">{tal.followers}</span>
                      </div>
                      <div className="flex-1 border-r border-white/5">
                        <span className="block text-[8px] text-slate-500 uppercase font-bold">Engagement</span>
                        <span className="text-[10px] font-bold text-cyan-400">{tal.er}</span>
                      </div>
                      <div className="flex-1">
                        <span className="block text-[8px] text-slate-500 uppercase font-bold">Giá Dự Kiến</span>
                        <span className="text-[10px] font-bold text-amber-400">{tal.rate}</span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleSelectForCompare(tal.id)}
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-xl border transition-colors shrink-0",
                          selectedForCompare.includes(tal.id)
                            ? "bg-amber-400 border-amber-400 text-slate-950"
                            : "bg-white/3 border-white/5 text-slate-400 hover:text-white"
                        )}
                      >
                        <Check className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => setSelectedProfile(tal)}
                        className="flex-1 flex h-9 items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 font-display text-[10px] font-bold text-white transition-colors"
                      >
                        Xem Hồ Sơ Số <Eye className="ml-1.5 h-3.5 w-3.5" />
                      </button>
                    </div>

                  </div>

                </div>
              ))}
            </div>
          ) : (
            /* TABLE VIEW */
            <div className="overflow-x-auto rounded-2xl border border-white/5 bg-slate-950/20">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-white/2 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                    <th className="px-4 py-3">Tài Năng</th>
                    <th className="px-4 py-3">Phân Hạng</th>
                    <th className="px-4 py-3">Vai Trò</th>
                    <th className="px-4 py-3">Followers</th>
                    <th className="px-4 py-3">Độ Tương Tác</th>
                    <th className="px-4 py-3">Giá Dự Kiến</th>
                    <th className="px-4 py-3">Độ Tin Cậy</th>
                    <th className="px-4 py-3 text-center">So Sánh / Xem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/3">
                  {filteredTalents.map((tal) => (
                    <tr key={tal.id} className="hover:bg-white/2 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img src={tal.avatar} alt={tal.name} className="h-8 w-8 rounded-full object-cover border border-amber-400/20" />
                          <div>
                            <span className="block font-bold text-white">{tal.name}</span>
                            <span className="text-[10px] text-slate-500">{tal.location}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="rounded bg-gradient-to-br from-amber-400 to-amber-600 px-2 py-0.5 font-display text-[9px] font-black text-slate-950">
                          Tier {tal.tier}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-300 font-semibold">{tal.category}</td>
                      <td className="px-4 py-3 text-white font-bold">{tal.followers}</td>
                      <td className="px-4 py-3 text-cyan-400 font-bold">{tal.er}</td>
                      <td className="px-4 py-3 text-amber-400 font-bold">{tal.rate}</td>
                      <td className="px-4 py-3 text-emerald-400 font-bold">{tal.reliability}%</td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => toggleSelectForCompare(tal.id)}
                            className={cn(
                              "flex h-7 w-7 items-center justify-center rounded-lg border transition-colors",
                              selectedForCompare.includes(tal.id)
                                ? "bg-amber-400 border-amber-400 text-slate-950"
                                : "bg-white/3 border-white/5 text-slate-500 hover:text-white"
                            )}
                          >
                            <Check className="h-3.5 w-3.5" />
                          </button>

                          <button
                            onClick={() => setSelectedProfile(tal)}
                            className="flex h-7 px-3 items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-[9px] font-bold text-white transition-colors"
                          >
                            Hồ Sơ
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </main>

      </div>

      {/* BOTTOM COMPARE TRAY */}
      {selectedForCompare.length > 0 && (
        <div className="fixed bottom-16 md:bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-xl px-4 animate-in slide-in-from-bottom-10 duration-300">
          <div className="rounded-2xl border border-amber-500/20 bg-[#070913]/90 p-4 shadow-2xl backdrop-blur-md flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                <Activity className="h-4.5 w-4.5 animate-pulse" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">So sánh tài năng</h4>
                <p className="text-[9px] text-slate-400">Đã chọn {selectedForCompare.length}/3 ứng cử viên.</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {getComparisonTalents().map((t) => (
                  <img key={t.id} src={t.avatar} alt={t.name} className="h-7 w-7 rounded-full object-cover border border-slate-950" />
                ))}
              </div>

              <button
                onClick={() => setShowCompareModal(true)}
                disabled={selectedForCompare.length < 2}
                className={cn(
                  "flex h-9 items-center justify-center rounded-xl px-4 font-display text-[10px] font-bold transition-all shadow-md",
                  selectedForCompare.length >= 2
                    ? "bg-gradient-to-r from-amber-200 to-yellow-600 text-slate-950 shadow-amber-500/10 active:scale-98"
                    : "bg-white/5 text-slate-500 border border-white/5 cursor-default"
                )}
              >
                So Sánh Ngay
              </button>

              <button
                onClick={() => setSelectedForCompare([])}
                className="text-slate-500 hover:text-white p-1"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DETAILED COMPARISON OVERLAY */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-[#070913] p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Close */}
            <button
              onClick={() => setShowCompareModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="font-display font-extrabold text-base text-white mb-5 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="h-4.5 w-4.5 text-amber-400" /> Bảng So Sánh Chi Tiết AI
            </h2>

            {/* Comparison Matrix Grid */}
            <div className="grid grid-cols-4 gap-4 text-xs">
              {/* Labels Column */}
              <div className="space-y-4 text-slate-500 pt-16 font-bold uppercase text-[9px] tracking-wider">
                <div className="h-10">Phân hạng (Tier)</div>
                <div className="h-8">Địa điểm</div>
                <div className="h-8">Followers</div>
                <div className="h-8">Engagement</div>
                <div className="h-8">Cát-xê dự kiến</div>
                <div className="h-8">Độ tin cậy</div>
                <div className="h-8">Kỹ năng</div>
              </div>

              {/* Selected Candidates */}
              {getComparisonTalents().map((tal) => (
                <div key={tal.id} className="space-y-4 text-center border-l border-white/5 pl-4">
                  {/* Photo & Name */}
                  <div className="flex flex-col items-center gap-2 h-16">
                    <img src={tal.avatar} alt={tal.name} className="h-10 w-10 rounded-full object-cover border border-amber-400/20" />
                    <span className="font-bold text-white truncate max-w-full text-[11px]">{tal.name}</span>
                  </div>

                  <div className="h-10 flex items-center justify-center">
                    <span className="rounded bg-gradient-to-br from-amber-400 to-amber-600 px-2 py-0.5 font-display text-[9px] font-black text-slate-950">
                      Tier {tal.tier}
                    </span>
                  </div>

                  <div className="h-8 flex items-center justify-center text-slate-300 font-semibold">{tal.location}</div>

                  <div className="h-8 flex items-center justify-center text-white font-extrabold">{tal.followers}</div>

                  <div className="h-8 flex items-center justify-center text-cyan-400 font-extrabold">{tal.er}</div>

                  <div className="h-8 flex items-center justify-center text-amber-400 font-extrabold">{tal.rate}</div>

                  <div className="h-8 flex items-center justify-center text-emerald-400 font-bold">{tal.reliability}%</div>

                  <div className="h-8 flex flex-wrap gap-1 items-center justify-center">
                    {tal.skills.slice(0, 2).map((s, idx) => (
                      <span key={idx} className="rounded bg-white/5 px-1.5 py-0.2 text-[8px] text-slate-400">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 pt-5 border-t border-white/5 mt-6">
              <button
                onClick={() => setShowCompareModal(false)}
                className="flex h-10 items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 font-display text-[10px] font-bold text-white px-5 transition-colors"
              >
                Đóng So Sánh
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RIGHT SIDE DETAILED PROFILE DRAWER / SLIDE-OVER */}
      {selectedProfile && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-md bg-[#070913] border-l border-white/10 h-full overflow-y-auto p-6 shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col justify-between">

            {/* Close button */}
            <button
              onClick={() => setSelectedProfile(null)}
              className="absolute top-4 left-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-slate-950/80 border border-white/10 text-slate-400 hover:text-white"
            >
              <X className="h-4.5 w-4.5" />
            </button>

            <div>
              {/* Cover Photo */}
              <div className="relative h-44 w-full -mx-6 -mt-6 mb-4 overflow-hidden">
                <img src={selectedProfile.cover} alt="cover" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070913] to-transparent" />

                {/* Floating profile avatar */}
                <div className="absolute bottom-2 left-6 flex items-end gap-3">
                  <img src={selectedProfile.avatar} alt="avatar" className="h-16 w-16 rounded-full object-cover border-2 border-amber-400" />
                  <div className="mb-1 text-left">
                    <h3 className="font-display font-extrabold text-base text-white">{selectedProfile.name}</h3>
                    <span className="text-[10px] text-slate-400">{selectedProfile.category} • {selectedProfile.location}</span>
                  </div>
                </div>
              </div>

              {/* Bio details */}
              <div className="space-y-5">
                <div className="flex gap-2">
                  <span className="rounded bg-gradient-to-br from-amber-400 to-amber-600 px-2 py-0.5 font-display text-[9px] font-black text-slate-950">
                    Tier {selectedProfile.tier}
                  </span>
                  <span className="rounded bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 font-display text-[9px] font-bold text-emerald-400">
                    Độ Tin Cậy {selectedProfile.reliability}%
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="rounded-xl border border-white/5 bg-slate-950/40 p-2">
                    <span className="block text-[8px] text-slate-500 font-bold uppercase">Chiều cao</span>
                    <span className="font-bold text-white">{selectedProfile.height}</span>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-slate-950/40 p-2">
                    <span className="block text-[8px] text-slate-500 font-bold uppercase">Cân nặng</span>
                    <span className="font-bold text-white">{selectedProfile.weight}</span>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-slate-950/40 p-2">
                    <span className="block text-[8px] text-slate-500 font-bold uppercase">Số đo</span>
                    <span className="font-bold text-white">{selectedProfile.metrics}</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <h4 className="font-display font-bold text-[10px] text-slate-400 uppercase tracking-wider">Học Vấn & Ngôn Ngữ</h4>
                  <p className="text-slate-300"><b>Học vấn:</b> {selectedProfile.education}</p>
                  <p className="text-slate-300"><b>Ngôn ngữ:</b> {selectedProfile.languages}</p>
                </div>

                {/* Skills */}
                <div className="space-y-2">
                  <h4 className="font-display font-bold text-[10px] text-slate-400 uppercase tracking-wider">Kỹ Năng Nổi Bật</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProfile.skills.map((s, idx) => (
                      <span key={idx} className="rounded-lg bg-white/5 border border-white/5 px-2.5 py-1 text-xs text-slate-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Availability Calendar mockup */}
                <div className="space-y-2">
                  <h4 className="font-display font-bold text-[10px] text-slate-400 uppercase tracking-wider">Lịch Trống Tháng 06/2026</h4>
                  <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-slate-500 font-bold">
                    <span>CN</span><span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span><span>T7</span>
                    {[...Array(30)].map((_, idx) => {
                      const day = idx + 1;
                      const isBusy = day === 5 || day === 12 || day === 18 || day === 19 || day === 24;
                      return (
                        <div
                          key={idx}
                          className={cn(
                            "rounded py-1.5 font-bold transition-colors",
                            isBusy ? "bg-red-500/10 text-red-500" : "bg-emerald-500/10 text-emerald-400"
                          )}
                        >
                          {day}
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex gap-4 justify-center text-[9px] font-bold mt-2">
                    <span className="flex items-center gap-1"><div className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Ngày trống</span>
                    <span className="flex items-center gap-1"><div className="h-1.5 w-1.5 rounded-full bg-red-500" /> Ngày bận</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Decision Booking card panel at bottom */}
            <div className="border-t border-white/5 pt-4 mt-6 space-y-4">
              <div className="flex justify-between items-center bg-slate-950/40 p-3 rounded-xl border border-white/5">
                <div>
                  <span className="block text-[8px] text-slate-500 font-bold uppercase">Cát-xê Dự Kiến</span>
                  <span className="text-sm font-black text-amber-400">{selectedProfile.rate}</span>
                </div>
                <div>
                  <span className="block text-[8px] text-slate-500 font-bold uppercase">Thời gian phản hồi</span>
                  <span className="text-xs font-bold text-white">~2 giờ</span>
                </div>
              </div>

              <button
                onClick={() => handleQuickBook(selectedProfile)}
                className="flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 font-display font-bold text-slate-950 shadow-md hover:shadow-lg transition-all"
              >
                Gửi Đề Xuất Booking Ngay
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
