"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Sparkles, MapPin, Eye, Star, Share2, Award, Calendar, DollarSign, BookOpen, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PortfolioPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("vnp_talent_profile");
    if (stored) {
      try {
        setProfile(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    } else {
      // Mock seed data if not onboarded
      setProfile({
        name: "Nguyễn Mai Anh",
        birthYear: 2002,
        location: "Hà Nội",
        hometown: "Nam Định",
        phone: "0912345678",
        email: "maianh.nguyen@beautyapp.vn",
        avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&h=150&q=80",
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
          "Catwalk Show": 15000000
        },
        availabilityCalendar: ["2026-06-24", "2026-06-25", "2026-06-28"],
        reliability: 96,
        reviewsCount: 18,
        averageRating: 4.9,
        surveyScores: { pageant: 75, runway: 80, kol: 91 },
        mainCategory: "KOL / Người mẫu ảnh / Giải trí thế hệ mới"
      });
    }
  }, []);

  if (!profile) return null;

  const calculateRadarPath = () => {
    const cx = 100;
    const cy = 100;
    const maxVal = 100;
    const radius = 60;
    const scores = profile.surveyScores || { pageant: 50, runway: 50, kol: 50 };

    const getCoords = (val: number, angleDeg: number) => {
      const rad = (angleDeg - 90) * (Math.PI / 180);
      const dist = (val / maxVal) * radius;
      return {
        x: cx + dist * Math.cos(rad),
        y: cy + dist * Math.sin(rad)
      };
    };

    const ptPageant = getCoords(scores.pageant, 0);
    const ptRunway = getCoords(scores.runway, 120);
    const ptKol = getCoords(scores.kol, 240);

    return `${ptPageant.x},${ptPageant.y} ${ptRunway.x},${ptRunway.y} ${ptKol.x},${ptKol.y}`;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Cover Banner Header */}
      <div className="relative rounded-2xl border border-white/5 bg-[#070913] p-4">
        {/* Cover Background */}
        <div className="h-36 md:h-48 w-full rounded-xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.06),transparent)]" />
        </div>

        {/* Profile Info Row */}
        <div className="relative px-6 pt-2 flex flex-col sm:flex-row gap-4 sm:items-end justify-between">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
            {/* Shift avatar upwards */}
            <div className="relative -mt-12 sm:-mt-16 h-24 w-24 shrink-0 rounded-full border-4 border-[#070913] bg-slate-900 p-0.5 shadow-2xl">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="h-full w-full rounded-full object-cover"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="font-display font-extrabold text-white text-lg md:text-xl">{profile.name}</h2>
                <Shield className="h-5 w-5 text-amber-400 shrink-0" />
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-slate-500" /> {profile.location} • Quê quán: {profile.hometown || "Chưa cập nhật"}
              </p>
            </div>
          </div>

          <div className="flex gap-2 pb-1">
            <button className="flex h-10 px-4 items-center justify-center gap-1.5 rounded-xl bg-white/5 border border-white/5 text-slate-300 hover:text-white text-xs font-semibold">
              <Share2 className="h-4 w-4" /> Chia sẻ hồ sơ
            </button>
            <span className={cn(
              "flex h-10 items-center rounded-xl border px-4 font-display text-xs font-extrabold uppercase tracking-wide",
              profile.tier === "S" && "border-amber-400 bg-amber-400/10 text-amber-400 shadow-md shadow-amber-500/10",
              profile.tier === "A" && "border-slate-300 bg-slate-400/10 text-slate-200",
              profile.tier === "B" && "border-purple-400 bg-purple-500/10 text-purple-300",
              profile.tier === "C" && "border-emerald-400 bg-emerald-500/10 text-emerald-300"
            )}>
              Tier {profile.tier}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: 2 columns on Desktop (1/3 and 2/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Profile Bio & Measurements (1/3 width) */}
        <div className="space-y-6">
          
          {/* Physical Measurements Card */}
          <div className="rounded-2xl border border-white/5 bg-[#070913]/30 p-5 space-y-4">
            <h3 className="font-display font-semibold text-xs text-white uppercase tracking-wider border-b border-white/5 pb-2.5">
              Thông Số Nhân Trắc
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-white/2 p-3 text-center border border-white/2">
                <span className="block text-[9px] text-slate-500 font-bold uppercase">Chiều Cao</span>
                <span className="text-sm font-extrabold text-white mt-0.5 block">{profile.height} cm</span>
              </div>
              <div className="rounded-xl bg-white/2 p-3 text-center border border-white/2">
                <span className="block text-[9px] text-slate-500 font-bold uppercase">Cân Nặng</span>
                <span className="text-sm font-extrabold text-white mt-0.5 block">{profile.weight} kg</span>
              </div>
            </div>

            <div className="space-y-2 border-t border-white/5 pt-3">
              <div className="flex justify-between items-center text-xs text-slate-300 py-1">
                <span className="font-medium text-slate-400">Số đo Vòng 1</span>
                <span className="font-bold text-white">{profile.bust} cm</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-300 py-1">
                <span className="font-medium text-slate-400">Số đo Vòng 2</span>
                <span className="font-bold text-white">{profile.waist} cm</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-300 py-1">
                <span className="font-medium text-slate-400">Số đo Vòng 3</span>
                <span className="font-bold text-white">{profile.hips} cm</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-300 py-1 border-t border-white/5 pt-2">
                <span className="font-medium text-slate-400">Phẫu thuật thẩm mỹ</span>
                <span className="font-bold text-white">{profile.plasticSurgery === "true" ? "Đã từng phẫu thuật" : "Chưa từng phẫu thuật"}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-300 py-1">
                <span className="font-medium text-slate-400">Hôn nhân</span>
                <span className="font-bold text-white">{profile.maritalStatus}</span>
              </div>
            </div>
          </div>

          {/* Education & Languages */}
          <div className="rounded-2xl border border-white/5 bg-[#070913]/30 p-5 space-y-4">
            <h3 className="font-display font-semibold text-xs text-white uppercase tracking-wider border-b border-white/5 pb-2.5">
              Học Vấn & Ngôn Ngữ
            </h3>
            
            <div className="space-y-3.5 text-xs text-slate-300">
              <div className="flex gap-3">
                <GraduationCap className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-white">Học vấn</span>
                  <span className="block text-[10px] text-slate-400 mt-0.5">{profile.education}</span>
                </div>
              </div>
              
              <div className="flex gap-3 border-t border-white/5 pt-3">
                <BookOpen className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-white">Ngôn ngữ</span>
                  <span className="block text-[10px] text-slate-400 mt-0.5">
                    {Array.isArray(profile.languages) ? profile.languages.join(", ") : profile.languages}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Rate card, Availability and radar chart (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Top statistics strip */}
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl border border-white/5 bg-slate-900/10 p-4">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Tương Tác MXH</span>
              <h4 className="text-base font-extrabold text-white mt-1">{(profile.engagementRate || 4.8)}% ER</h4>
              <span className="text-[9px] text-slate-400 block mt-0.5">{(Number(profile.followersCount || 120000) / 1000).toFixed(0)}k Followers</span>
            </div>

            <div className="rounded-xl border border-white/5 bg-slate-900/10 p-4">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Độ Tin Cậy</span>
              <h4 className="text-base font-extrabold text-white mt-1">{(profile.reliability || 96)}%</h4>
              <span className="text-[9px] text-slate-400 block mt-0.5">{(profile.reviewsCount || 18)} Shows thành công</span>
            </div>

            <div className="rounded-xl border border-white/5 bg-slate-900/10 p-4">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Đánh Giá TB</span>
              <h4 className="text-base font-extrabold text-white mt-1 flex items-center gap-1">
                {(profile.averageRating || 4.9).toFixed(1)} <Star className="h-4.5 w-4.5 text-amber-400 fill-amber-400" />
              </h4>
              <span className="text-[9px] text-slate-400 block mt-0.5">Xếp hạng 5 sao tuyệt đối</span>
            </div>
          </div>

          {/* Rate card section */}
          <div className="rounded-2xl border border-white/5 bg-[#070913]/30 p-5 space-y-3">
            <h3 className="font-display font-semibold text-xs text-white uppercase tracking-wider border-b border-white/5 pb-2.5">
              Bảng Giá Dịch Vụ (Rate Card)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2.5">
              {Object.entries(profile.rateCard || {
                "Instagram Post": 3000000,
                "TikTok Video": 5000000,
                "Livestream 2h": 8000000,
                "Catwalk Show": 15000000
              }).map(([key, value]: any) => (
                <div key={key} className="flex justify-between py-2 text-xs text-slate-300 border-b border-white/2 md:border-b-0">
                  <span className="font-semibold text-slate-400">{key}</span>
                  <span className="font-extrabold text-amber-400">từ {value.toLocaleString()}đ</span>
                </div>
              ))}
            </div>
          </div>

          {/* Availability and Radar Chart Side-by-Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Calendar Availability */}
            <div className="rounded-2xl border border-white/5 bg-[#070913]/30 p-5 space-y-4">
              <h3 className="font-display font-semibold text-xs text-white uppercase tracking-wider border-b border-white/5 pb-2.5">
                Lịch Trình Nhận Show
              </h3>
              
              <div className="grid grid-cols-5 gap-2">
                {["24/06", "25/06", "26/06", "27/06", "28/06"].map((date) => {
                  const day = date.split("/")[0];
                  const isAvailable = profile.availabilityCalendar?.some((d: string) => d.endsWith(day));

                  return (
                    <div
                      key={date}
                      className={cn(
                        "flex flex-col items-center justify-center h-14 w-full rounded-xl border text-center transition-all",
                        isAvailable
                          ? "border-amber-400/40 bg-amber-400/5 text-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.1)]"
                          : "border-white/5 bg-slate-950/40 text-slate-600"
                      )}
                    >
                      <span className="text-xs uppercase font-bold">{day}</span>
                      <span className="text-[9px] font-semibold">{isAvailable ? "Rảnh" : "Bận"}</span>
                    </div>
                  );
                })}
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                * Nhãn hàng có thể chọn ngày trống trên và ấn "Book" để gửi thỏa thuận đặt show diễn.
              </p>
            </div>

            {/* AI Radar Chart */}
            <div className="rounded-2xl border border-white/5 bg-[#070913]/30 p-5 flex gap-4 items-center justify-between">
              <div className="space-y-2 flex-1">
                <h3 className="font-display font-semibold text-xs text-white uppercase tracking-wider">
                  Định Hướng AI
                </h3>
                <p className="text-[10px] leading-relaxed text-slate-400">
                  Phù hợp nhất: <b className="text-amber-400 font-bold block mt-1">{profile.mainCategory}</b>
                </p>
              </div>

              {/* SVG Radar */}
              <div className="h-28 w-28 shrink-0 rounded-xl border border-white/5 bg-slate-950 p-2 shadow-inner">
                <svg viewBox="0 0 200 200" className="h-full w-full">
                  <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(255,255,255,0.05)" />
                  <circle cx="100" cy="100" r="30" fill="none" stroke="rgba(255,255,255,0.05)" />
                  <polygon points={calculateRadarPath()} fill="rgba(251,191,36,0.2)" stroke="#fbbf24" strokeWidth="2" />
                  <text x="100" y="25" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">P</text>
                  <text x="35" y="145" fill="#a855f7" fontSize="10" fontWeight="bold" textAnchor="middle">R</text>
                  <text x="165" y="145" fill="#06b6d4" fontSize="10" fontWeight="bold" textAnchor="middle">K</text>
                </svg>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
