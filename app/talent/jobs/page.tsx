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
      brand: "Glow Beauty Cosmetics",
      type: "Livestream",
      budget: "12.000.000đ",
      location: "Studio Cầu Giấy, Hà Nội",
      brief: "Livestream giới thiệu dòng son dưỡng mới và phấn phủ glowy skin. Cần Talent có khả năng tương tác tốt, am hiểu mỹ phẩm và năng động.",
      minHeight: 165,
      matchScore: 94,
      escrowed: true,
      color: "cyan",
      borderColor: "border-[#143d4d] hover:border-cyan-400/40 shadow-[0_0_15px_rgba(34,211,238,0.02)]",
      badgeColor: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
      glowColor: "from-cyan-500/5 to-transparent"
    },
    {
      id: "c2",
      title: "Summer Runway Collection 2026",
      brand: "Diamond Luxury Fashion",
      type: "Runway",
      budget: "20.000.000đ",
      location: "Gem Center, TP. Hồ Chí Minh",
      brief: "Trình diễn bộ sưu tập đầm dạ hội Haute Couture mùa hè. Yêu cầu catwalk phong thái sang trọng, uyển chuyển và đúng nhịp nhạc.",
      minHeight: 172,
      matchScore: 89,
      escrowed: true,
      color: "purple",
      borderColor: "border-[#2f1c4f] hover:border-[#a855f7]/40 shadow-[0_0_15px_rgba(168,85,247,0.02)]",
      badgeColor: "bg-[#a855f7]/10 border-[#a855f7]/20 text-[#a855f7]",
      glowColor: "from-purple-500/5 to-transparent"
    },
    {
      id: "c3",
      title: "Luxury Jewelry Launch Event",
      brand: "Luxury Diamonds Co.",
      type: "Event MC",
      budget: "45.000.000đ",
      location: "Metropole Hotel, Hà Nội",
      brief: "Tham gia với tư cách MC song ngữ và khách mời danh dự (Celeb). Chụp ảnh check-in thảm đỏ, mang trang sức kim cương của thương hiệu.",
      minHeight: 170,
      matchScore: 78,
      escrowed: false,
      color: "rose",
      borderColor: "border-[#4f1a2d] hover:border-rose-400/40 shadow-[0_0_15px_rgba(236,72,153,0.02)]",
      badgeColor: "bg-rose-500/10 border-rose-500/20 text-rose-400",
      glowColor: "from-rose-500/5 to-transparent"
    },
    {
      id: "c4",
      title: "BST Lookbook Mùa Thu Streetwear",
      brand: "Maison Design Studio",
      type: "Lookbook",
      budget: "8.000.000đ",
      location: "Hồ Tây, Hà Nội",
      brief: "Chụp bộ ảnh thời trang dạo phố mùa thu. Phong cách nhẹ nhàng, thơ mộng. Cần biểu cảm tốt trước máy ảnh cơ.",
      minHeight: 165,
      matchScore: 82,
      escrowed: true,
      color: "gold",
      borderColor: "border-[#3e3415] hover:border-amber-400/40 shadow-[0_0_15px_rgba(244,196,48,0.02)]",
      badgeColor: "bg-amber-400/10 border-amber-400/20 text-amber-400",
      glowColor: "from-amber-400/5 to-transparent"
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
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Title block */}
      <div>
        <h1 className="font-display text-3xl font-black text-white tracking-tight uppercase leading-none">Marketplace</h1>
        <p className="text-xs text-slate-400 mt-2 font-medium">Khám phá và ứng tuyển các job sắc đẹp phù hợp nhất từ Brand được bảo lãnh bởi Escrow.</p>
      </div>

      {/* Filter Tabs - Styled to match Admin button filters */}
      <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-none">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={cn(
              "rounded-xl px-4.5 py-2.5 text-xs font-bold whitespace-nowrap transition-all duration-300 cursor-pointer border",
              selectedTag === tag
                ? "bg-[#f4c430] border-amber-400/30 text-slate-950 shadow-[0_4px_12px_rgba(244,196,48,0.2)]"
                : "bg-[#08090f] border-[#151b2d] text-slate-400 hover:text-white hover:bg-white/2"
            )}
          >
            {tag === "Runway" ? "Người mẫu sàn diễn" : tag === "All" ? "Tất cả" : tag}
          </button>
        ))}
      </div>

      {/* Campaigns Listing - Premium grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCampaigns.map((camp) => {
          const isApplied = appliedJobs.includes(camp.id);
          
          return (
            <div
              key={camp.id}
              className={cn(
                "relative overflow-hidden rounded-2xl bg-[#08090f] border p-6 shadow-xl luxury-card-hover transition-all duration-300",
                camp.borderColor
              )}
            >
              <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none", camp.glowColor)} />

              {/* Card Header */}
              <div className="flex justify-between items-start relative z-10">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={cn("rounded border px-2.5 py-0.5 text-[8px] font-bold uppercase tracking-wider", camp.badgeColor)}>
                      {camp.type === "Runway" ? "Người mẫu sàn diễn" : camp.type}
                    </span>
                    {camp.escrowed && (
                      <span className="flex items-center gap-1 rounded bg-emerald-500/10 px-2.5 py-0.5 text-[8px] text-emerald-400 font-extrabold border border-emerald-500/20 uppercase tracking-wider">
                        <ShieldCheck className="h-3 w-3" /> Đã đặt cọc
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-extrabold text-sm text-white mt-2 group-hover:text-amber-400 transition-colors duration-300 leading-snug">{camp.title}</h3>
                  <p className="text-[10px] text-slate-500 font-bold">{camp.brand}</p>
                </div>

                <div className="text-right">
                  <span className="font-display font-extrabold text-sm text-amber-400">{camp.matchScore}%</span>
                  <span className="block text-[8px] text-slate-500 uppercase tracking-widest font-bold">AI Match</span>
                </div>
              </div>

              {/* Brief */}
              <p className="text-xs text-slate-400 leading-relaxed mt-4 font-medium relative z-10">{camp.brief}</p>

              {/* Specifications row */}
              <div className="mt-5 border-t border-[#151b2d] pt-3.5 grid grid-cols-2 gap-3 text-[10px] text-slate-400 relative z-10">
                <div className="flex items-center gap-1.5">
                  <DollarSign className="h-4 w-4 text-amber-400 shrink-0" />
                  <span>Cát-xê đề xuất: <b className="text-white font-mono font-extrabold">{camp.budget}</b></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-slate-500 shrink-0" />
                  <span className="truncate font-semibold">{camp.location}</span>
                </div>
              </div>

              {/* Application Button */}
              <button
                onClick={() => handleApply(camp.id)}
                disabled={isApplied}
                className={cn(
                  "mt-5 flex h-11 w-full items-center justify-center rounded-xl font-display text-xs font-bold transition-all duration-300 cursor-pointer relative z-10",
                  isApplied
                    ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                    : "bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 text-slate-950 shadow-md hover:shadow-lg hover:brightness-105 active:scale-[0.98]"
                )}
              >
                {isApplied ? (
                  <span className="flex items-center gap-1.5">
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
