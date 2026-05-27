"use client";

import React, { useState } from "react";
import { Search, MapPin, DollarSign, Sparkles, Filter, ShieldCheck, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function JobsPage() {
  const [selectedTag, setSelectedTag] = useState("All");
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);

  const mockCampaigns = [
    {
      id: "c1",
      title: "Beauty Mega Live 06/2026",
      brand: "Glow Beauty",
      type: "Livestream",
      budget: "12.000.000đ",
      location: "Studio Cầu Giấy, Hà Nội",
      brief: "Livestream giới thiệu dòng son dưỡng mới và phấn phủ glowy skin. Cần Talent có khả năng tương tác tốt, am hiểu mỹ phẩm và năng động.",
      minHeight: 165,
      matchScore: 94,
      escrowed: true
    },
    {
      id: "c2",
      title: "Summer Runway Collection 2026",
      brand: "VNDress Fashion",
      type: "Runway",
      budget: "20.000.000đ",
      location: "Gem Center, TP. Hồ Chí Minh",
      brief: "Trình diễn bộ sưu tập đầm dạ hội Haute Couture mùa hè. Yêu cầu catwalk phong thái sang trọng, uyển chuyển và đúng nhịp nhạc.",
      minHeight: 172,
      matchScore: 89,
      escrowed: true
    },
    {
      id: "c3",
      title: "Luxury Jewelry Launch Event",
      brand: "Luxury Diamonds",
      type: "Event MC",
      budget: "45.000.000đ",
      location: "Metropole Hotel, Hà Nội",
      brief: "Tham gia với tư cách MC song ngữ và khách mời danh dự (Celeb). Chụp ảnh check-in thảm đỏ, mang trang sức kim cương của thương hiệu.",
      minHeight: 170,
      matchScore: 78,
      escrowed: false
    },
    {
      id: "c4",
      title: "BST Lookbook Mùa Thu",
      brand: "Maison Design",
      type: "Lookbook",
      budget: "8.000.000đ",
      location: "Hồ Tây, Hà Nội",
      brief: "Chụp bộ ảnh thời trang dạo phố mùa thu. Phong cách nhẹ nhàng, thơ mộng. Cần biểu cảm tốt trước máy ảnh cơ.",
      minHeight: 165,
      matchScore: 82,
      escrowed: true
    }
  ];

  const handleApply = (id: string) => {
    if (appliedJobs.includes(id)) return;
    setAppliedJobs((prev) => [...prev, id]);
  };

  const filteredCampaigns = selectedTag === "All"
    ? mockCampaigns
    : mockCampaigns.filter(c => c.type === selectedTag);

  const tags = ["All", "Livestream", "Runway", "Lookbook", "Event MC"];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display text-xl font-bold text-white tracking-tight">Marketplace</h1>
          <p className="text-xs text-slate-400">Khám phá và ứng tuyển các job phù hợp nhất từ Brand</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={cn(
              "rounded-lg px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-all duration-200",
              selectedTag === tag
                ? "bg-amber-400 text-slate-950 shadow-[0_2px_8px_rgba(251,191,36,0.2)]"
                : "bg-slate-900/40 border border-white/5 text-slate-400 hover:text-white"
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Campaigns Listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCampaigns.map((camp) => {
          const isApplied = appliedJobs.includes(camp.id);
          
          return (
            <div
              key={camp.id}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40 p-5 shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-white/20"
            >
              {/* Card Header */}
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-white/5 px-2 py-0.5 text-[9px] text-slate-400 uppercase font-semibold">
                      {camp.type}
                    </span>
                    {camp.escrowed && (
                      <span className="flex items-center gap-0.5 rounded bg-emerald-500/10 px-2 py-0.5 text-[9px] text-emerald-400 font-semibold border border-emerald-500/20">
                        <ShieldCheck className="h-3 w-3" /> Đã ký quỹ
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-bold text-sm text-white mt-1.5">{camp.title}</h3>
                  <p className="text-[10px] text-slate-400">{camp.brand}</p>
                </div>

                <div className="text-right">
                  <span className="font-display font-extrabold text-sm text-amber-400">{camp.matchScore}%</span>
                  <span className="block text-[8px] text-slate-500 uppercase font-semibold">Match</span>
                </div>
              </div>

              {/* Brief */}
              <p className="text-xs text-slate-400 leading-relaxed mt-3">{camp.brief}</p>

              {/* Specifications row */}
              <div className="mt-4 border-t border-white/5 pt-3 grid grid-cols-2 gap-2 text-[10px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <DollarSign className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <span>Cát-xê: <b className="text-white font-semibold">{camp.budget}</b></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                  <span className="truncate">{camp.location}</span>
                </div>
              </div>

              {/* Application Button */}
              <button
                onClick={() => handleApply(camp.id)}
                disabled={isApplied}
                className={cn(
                  "mt-4 flex h-10 w-full items-center justify-center rounded-xl font-display text-xs font-semibold transition-all duration-300",
                  isApplied
                    ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400"
                    : "bg-white/5 border border-white/10 text-white hover:bg-white/10 active:scale-[0.98]"
                )}
              >
                {isApplied ? (
                  <span className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4" /> Đã ứng tuyển thành công
                  </span>
                ) : (
                  "Ứng tuyển ngay"
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
