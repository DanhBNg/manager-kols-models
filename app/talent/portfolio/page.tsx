"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Shield, Sparkles, MapPin, Eye, Star, Share2,
  Award, Calendar, DollarSign, BookOpen, GraduationCap,
  Users, Check, ArrowUpRight, ShieldCheck, Heart, User, Crown, ShieldAlert
} from "lucide-react";
import { cn } from "@/lib/utils";
import RadarChart from "@/components/ui/RadarChart";
import { fetchMyTalentProfileForUi } from "@/lib/api/talent-profile";

const JOBS_LIST = [
  { id: 1, title: "Đại sứ thương hiệu", desc: "Gương mặt đại diện thương hiệu luxury", weights: { pageant: 0.4, runway: 0.2, kol: 0.4 } },
  { id: 2, title: "KOLs/Influencer quảng cáo", desc: "Sáng tạo nội dung video ngắn", weights: { pageant: 0.1, runway: 0.1, kol: 0.8 } },
  { id: 3, title: "KOC Livestream bán hàng", desc: "Thực hiện livestream bán hàng trực tiếp", weights: { pageant: 0.05, runway: 0.05, kol: 0.9 } },
  { id: 4, title: "Gương mặt trang bìa", desc: "Chụp ảnh bìa tạp chí, lookbook, ảnh PR", weights: { pageant: 0.3, runway: 0.5, kol: 0.2 } },
  { id: 5, title: "Người mẫu sàn diễn (Runway)", desc: "Trình diễn các bộ sưu tập thời trang cao cấp", weights: { pageant: 0.1, runway: 0.8, kol: 0.1 } },
  { id: 6, title: "Người mẫu quảng cáo", desc: "Diễn xuất trong các TVC quảng cáo", weights: { pageant: 0.2, runway: 0.3, kol: 0.5 } },
  { id: 7, title: "Diễn viên MV ca nhạc", desc: "Đóng vai nữ chính/nam chính MV ca nhạc", weights: { pageant: 0.2, runway: 0.2, kol: 0.6 } },
  { id: 8, title: "KOL sự kiện / Khách mời VIP", desc: "Tham dự thảm đỏ và sự kiện thương hiệu", weights: { pageant: 0.6, runway: 0.2, kol: 0.2 } },
  { id: 9, title: "Người dẫn chương trình (MC)", desc: "Dẫn dắt các sự kiện và chương trình giải trí", weights: { pageant: 0.7, runway: 0.1, kol: 0.2 } },
  { id: 10, title: "VIP Promotion Girl (PG)", desc: "Lễ tân đón tiếp khách tại sự kiện lớn", weights: { pageant: 0.4, runway: 0.3, kol: 0.3 } },
  { id: 11, title: "Huấn luyện viên Catwalk", desc: "Đào tạo kỹ thuật đi catwalk cho học viên", weights: { pageant: 0.1, runway: 0.8, kol: 0.1 } },
  { id: 12, title: "CEO thương hiệu riêng", desc: "Kinh doanh nhãn hàng thời trang, mỹ phẩm", weights: { pageant: 0.5, runway: 0.2, kol: 0.3 } },
  { id: 13, title: "Giám khảo cuộc thi sắc đẹp", desc: "Chấm điểm các cuộc thi hoa hậu, hoa khôi", weights: { pageant: 0.7, runway: 0.2, kol: 0.1 } },
  { id: 14, title: "Giám đốc hình ảnh / Stylist", desc: "Cố vấn định hình phong cách và trang phục", weights: { pageant: 0.1, runway: 0.6, kol: 0.3 } },
  { id: 15, title: "Sứ giả chiến dịch cộng đồng", desc: "Lan tỏa các giá trị nhân văn và dự án từ thiện", weights: { pageant: 0.8, runway: 0.1, kol: 0.1 } },
  { id: 16, title: "Vlogger du lịch & trải nghiệm", desc: "Quảng bá điểm đến, khách sạn, resort cao cấp", weights: { pageant: 0.2, runway: 0.1, kol: 0.7 } },
  { id: 17, title: "Người mẫu ảnh nghệ thuật", desc: "Hợp tác chụp ảnh thời trang Fine-art", weights: { pageant: 0.2, runway: 0.6, kol: 0.2 } },
  { id: 18, title: "Nhà sáng tạo nội dung tri thức", desc: "Chia sẻ kỹ năng mềm, kiến thức làm đẹp", weights: { pageant: 0.4, runway: 0.1, kol: 0.5 } },
  { id: 19, title: "Đại sứ Game / Esports", desc: "Hình ảnh đại diện cho các dự án game lớn", weights: { pageant: 0.1, runway: 0.1, kol: 0.8 } },
  { id: 20, title: "Người mẫu ảo / Metaverse", desc: "Scan 3D hình ảnh số để làm mẫu ảo", weights: { pageant: 0.1, runway: 0.6, kol: 0.3 } }
];

export default function PortfolioPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    let mounted = true;

    async function loadProfile() {
      const backendProfile = await fetchMyTalentProfileForUi();
      if (backendProfile && mounted) {
        localStorage.setItem("vnp_talent_profile", JSON.stringify(backendProfile));
        setProfile(backendProfile);
        return;
      }

    const stored = localStorage.getItem("vnp_talent_profile");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && (parsed.avatar?.includes("unsplash.com") || !parsed.avatar)) {
          parsed.avatar = "/avatar.png";
        }
        if (parsed) {
          if (parsed.name === "Nguyễn Mai Anh") {
            parsed.surveyScores = { pageant: 50, runway: 45, kol: 95 };
            parsed.mainCategory = "KOL / Người mẫu ảnh / Giải trí thế hệ mới";
          }
        }
        localStorage.setItem("vnp_talent_profile", JSON.stringify(parsed));
        setProfile(parsed);
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
        avatar: "/avatar.png",
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
        surveyScores: { pageant: 50, runway: 45, kol: 95 },
        mainCategory: "KOL / Người mẫu ảnh / Giải trí thế hệ mới"
      });
    }
    }

    loadProfile();

    return () => {
      mounted = false;
    };
  }, []);

  if (!profile) return null;



  return (
    <div className="space-y-8 animate-in fade-in duration-300">

      {/* Cover Banner Header - Premium styling */}
      <div className="relative rounded-2xl border border-[#151b2d] bg-[#08090f] p-5 shadow-xl">
        {/* Cover Background */}
        <div className="h-36 md:h-48 w-full rounded-xl relative overflow-hidden border border-white/5 bg-slate-950">
          <img
            src="/cover_image.png"
            alt="Cover banner"
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
        </div>

        {/* Profile Info Row */}
        <div className="relative px-6 pt-3 flex flex-col sm:flex-row gap-5 sm:items-end justify-between">
          <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-end">
            {/* Shift avatar upwards */}
            <div className="relative -mt-14 sm:-mt-20 h-28 w-28 shrink-0 rounded-full border-4 border-[#08090f] bg-slate-900 p-0.5 shadow-2xl">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="h-full w-full rounded-full object-cover"
              />
              <span className="absolute bottom-1 right-1 h-5 w-5 bg-emerald-500 border-4 border-[#08090f] rounded-full" />
            </div>

            <div className="space-y-1.5 pb-1">
              <div className="flex items-center gap-2.5">
                <h2 className="font-display font-black text-white text-xl md:text-2xl tracking-wide">Nguyễn Mai Anh</h2>
                <ShieldCheck className="h-6 w-6 text-amber-400 shrink-0" />
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
                <MapPin className="h-4 w-4 text-slate-500" /> {profile.location} • Quê quán: {profile.hometown || "Chưa cập nhật"}
              </p>
            </div>
          </div>

          <div className="flex gap-2 pb-1 relative z-10">
            <button className="flex h-10 px-4 items-center justify-center gap-1.5 rounded-xl bg-white/5 border border-white/5 text-slate-300 hover:text-white hover:bg-white/10 text-xs font-semibold transition-all">
              <Share2 className="h-4 w-4" /> Chia sẻ hồ sơ
            </button>
            <span className={cn(
              "flex h-10 items-center gap-1.5 rounded-xl border px-4 font-display text-xs font-black uppercase tracking-widest shadow-md transition-all duration-300",
              profile.tier === "S" && "border-amber-400 bg-gradient-to-r from-amber-500/25 to-[#221a0a]/90 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.25)]",
              profile.tier === "A" && "border-slate-300/60 bg-gradient-to-r from-slate-400/10 to-[#171922]/90 text-slate-200 shadow-[0_0_15px_rgba(203,213,225,0.1)]",
              profile.tier === "B" && "border-purple-400 bg-purple-500/10 text-purple-300",
              profile.tier === "C" && "border-teal-400 bg-teal-500/10 text-teal-300",
              profile.tier === "Potential" && "border-rose-500 bg-rose-500/10 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.15)]"
            )}>
              {profile.tier === "S" && <Crown className="h-4 w-4 text-amber-400 animate-pulse" />}
              {profile.tier === "A" && <Award className="h-4 w-4 text-slate-300" />}
              {profile.tier === "B" && <Star className="h-4 w-4 text-purple-400" />}
              {profile.tier === "C" && <Award className="h-4 w-4 text-teal-400" />}
              {profile.tier === "Potential" && <ShieldAlert className="h-4 w-4 text-rose-400" />}
              {profile.tier === "Potential" ? "Dự bị / Chờ cập nhật" : `Hạng ${profile.tier}`}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: 2 columns on Desktop (1/3 and 2/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT COLUMN: Profile Bio, Photo & Measurements (1/3 width) */}
        <div className="space-y-8">

          {/* Model Full-Body Photo Card */}
          <div className="rounded-2xl border border-[#151b2d] bg-[#08090f] p-5 space-y-4">
            <h3 className="font-display font-black text-xs text-white uppercase tracking-wider border-b border-[#151b2d] pb-3 flex items-center gap-2">
              <Award className="h-4.5 w-4.5 text-amber-400" /> Ảnh Người Mẫu (Full-body)
            </h3>

            <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-slate-950 border border-white/5 group shadow-inner">
              <img
                src="/fullbody_model.png"
                alt="Model Full-body portrait"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-102"
              />
              {/* Subtle luxury gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090f] via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div>
                  <span className="text-[8px] font-mono tracking-widest text-[#f4c430] font-bold uppercase">POLAROID BOOK</span>
                  <h4 className="text-xs font-black text-white mt-0.5">NGUYỄN MAI ANH</h4>
                </div>
                <div className="text-[8px] font-mono bg-black/40 border border-white/10 px-2 py-0.5 rounded text-slate-300">
                  Ratio: 3:4
                </div>
              </div>
            </div>
          </div>

          {/* Physical Measurements Card - Silver border style */}
          <div className="rounded-2xl border border-[#151b2d] bg-[#08090f] p-6 space-y-5">
            <h3 className="font-display font-black text-xs text-white uppercase tracking-wider border-b border-[#151b2d] pb-3 flex items-center gap-2">
              <User className="h-4.5 w-4.5 text-slate-400" /> Ngoại Hình
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-slate-950 p-3.5 text-center border border-white/2">
                <span className="block text-[9px] text-slate-500 font-bold uppercase tracking-wider">Chiều Cao</span>
                <span className="text-sm font-extrabold text-white mt-1 block">{profile.height} cm</span>
              </div>
              <div className="rounded-xl bg-slate-950 p-3.5 text-center border border-white/2">
                <span className="block text-[9px] text-slate-500 font-bold uppercase tracking-wider">Cân Nặng</span>
                <span className="text-sm font-extrabold text-white mt-1 block">{profile.weight} kg</span>
              </div>
            </div>

            <div className="space-y-3.5 border-t border-[#151b2d] pt-4">
              <div className="flex justify-between items-center text-xs text-slate-300">
                <span className="font-medium text-slate-400">Số đo Vòng 1 (Ngực)</span>
                <span className="font-bold text-white font-mono">{profile.bust} cm</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-300">
                <span className="font-medium text-slate-400">Số đo Vòng 2 (Eo)</span>
                <span className="font-bold text-white font-mono">{profile.waist} cm</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-300">
                <span className="font-medium text-slate-400">Số đo Vòng 3 (Mông)</span>
                <span className="font-bold text-white font-mono">{profile.hips} cm</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-300 border-t border-[#151b2d] pt-3.5">
                <span className="font-medium text-slate-400">Phẫu thuật thẩm mỹ</span>
                <span className="font-bold text-white">{profile.plasticSurgery === "true" ? "Đã can thiệp" : "Tự nhiên 100%"}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-300">
                <span className="font-medium text-slate-400">Tình trạng kết hôn</span>
                <span className="font-bold text-white">{profile.maritalStatus}</span>
              </div>
            </div>
          </div>

          {/* Education & Languages */}
          <div className="rounded-2xl border border-[#151b2d] bg-[#08090f] p-6 space-y-5">
            <h3 className="font-display font-black text-xs text-white uppercase tracking-wider border-b border-[#151b2d] pb-3 flex items-center gap-2">
              <GraduationCap className="h-4.5 w-4.5 text-slate-400" /> Học Vấn & Ngôn Ngữ
            </h3>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-400/10 text-amber-400">
                  <GraduationCap className="h-4.5 w-4.5" />
                </div>
                <div>
                  <span className="block font-bold text-white">Học vấn hiện tại</span>
                  <span className="block text-[10px] text-slate-400 mt-1">{profile.education}</span>
                </div>
              </div>

              <div className="flex gap-3 border-t border-[#151b2d] pt-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
                  <BookOpen className="h-4.5 w-4.5" />
                </div>
                <div>
                  <span className="block font-bold text-white">Ngoại ngữ: Tiếng Anh</span>
                  <span className="block text-[10px] text-slate-400 mt-1 leading-normal">
                    {Array.isArray(profile.languages) ? profile.languages.join(", ") : profile.languages}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Rate card, Availability and radar chart (2/3 width) */}
        <div className="lg:col-span-2 space-y-8">

          {/* Top statistics grid - Glowing stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

            {/* Card 1: Thứ Hạng Người Mẫu - Dynamic theme based on Tier */}
            {(() => {
              const t = profile.tier || "A";
              const tierConfig: Record<string, any> = {
                S: {
                  border: "border-amber-400/80",
                  bg: "bg-gradient-to-br from-amber-500/20 via-[#221a0a]/95 to-[#070913]/98",
                  shadow: "shadow-[0_0_20px_rgba(245,158,11,0.25)]",
                  hoverShadow: "hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]",
                  glow: "bg-amber-500/30",
                  icon: <Crown className="h-4.5 w-4.5 text-amber-400 fill-amber-400/25 animate-bounce" style={{ animationDuration: '3s' }} />,
                  label: "CELEB / SUPER VIP",
                  labelColor: "text-amber-400",
                  badge: "bg-amber-400/25 text-amber-300 border-amber-400/30",
                  badgeText: "90 - 100 ĐIỂM",
                  titleGradient: "bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-500",
                  titleText: "HẠNG S",
                  subtitleColor: "text-amber-300",
                  desc: "Hoa hậu Quốc gia, Ngôi sao hạng S."
                },
                A: {
                  border: "border-slate-300/60",
                  bg: "bg-gradient-to-br from-slate-400/10 via-[#171922]/90 to-[#070913]/95",
                  shadow: "shadow-[0_0_20px_rgba(203,213,225,0.08)]",
                  hoverShadow: "hover:shadow-[0_0_25px_rgba(203,213,225,0.18)]",
                  glow: "bg-slate-400/20",
                  icon: <Award className="h-4.5 w-4.5 text-slate-300" />,
                  label: "HIGH-END PRO",
                  labelColor: "text-slate-300",
                  badge: "bg-slate-400/20 text-slate-200 border-slate-400/30",
                  badgeText: "70 - 89 ĐIỂM",
                  titleGradient: "bg-gradient-to-r from-slate-100 via-slate-300 to-slate-400",
                  titleText: "HẠNG A",
                  subtitleColor: "text-slate-300",
                  desc: "Á hậu, Hoa khôi lớn, Siêu mẫu Runway chuyên nghiệp, MC VIP."
                },
                B: {
                  border: "border-purple-500/40",
                  bg: "bg-gradient-to-br from-purple-500/10 via-[#1a1128]/90 to-[#070913]/95",
                  shadow: "shadow-[0_0_20px_rgba(168,85,247,0.08)]",
                  hoverShadow: "hover:shadow-[0_0_25px_rgba(168,85,247,0.18)]",
                  glow: "bg-purple-500/20",
                  icon: <Star className="h-4.5 w-4.5 text-purple-400" />,
                  label: "MID FREELANCE",
                  labelColor: "text-purple-400",
                  badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
                  badgeText: "45 - 69 ĐIỂM",
                  titleGradient: "bg-gradient-to-r from-purple-200 to-pink-500",
                  titleText: "HẠNG B",
                  subtitleColor: "text-purple-300",
                  desc: "Người mẫu ảnh Lookbook, Micro/Mid-tier KOLs, PG VIP sự kiện cao cấp."
                },
                C: {
                  border: "border-teal-500/30",
                  bg: "bg-gradient-to-br from-teal-500/10 via-[#0e1f1e]/90 to-[#070913]/95",
                  shadow: "shadow-[0_0_20px_rgba(20,184,166,0.08)]",
                  hoverShadow: "hover:shadow-[0_0_25px_rgba(20,184,166,0.18)]",
                  glow: "bg-teal-500/20",
                  icon: <Award className="h-4.5 w-4.5 text-teal-400" />,
                  label: "ENTRY / NEWBIE",
                  labelColor: "text-teal-400",
                  badge: "bg-teal-500/20 text-teal-300 border-teal-500/30",
                  badgeText: "20 - 44 ĐIỂM",
                  titleGradient: "bg-gradient-to-r from-teal-200 to-emerald-400",
                  titleText: "HẠNG C",
                  subtitleColor: "text-teal-300",
                  desc: "Người mẫu tự do mới vào nghề, diễn viên phụ, PG sự kiện đại trà."
                },
                Potential: {
                  border: "border-rose-500/40",
                  bg: "bg-gradient-to-br from-rose-500/20 via-[#260f12]/95 to-[#070913]/98",
                  shadow: "shadow-[0_0_20px_rgba(244,63,94,0.15)]",
                  hoverShadow: "hover:shadow-[0_0_30px_rgba(244,63,94,0.3)]",
                  glow: "bg-rose-500/30",
                  icon: <ShieldAlert className="h-4.5 w-4.5 text-rose-400 animate-pulse" />,
                  label: "POTENTIAL PROFILE",
                  labelColor: "text-rose-400",
                  badge: "bg-rose-500/20 text-rose-300 border-rose-500/30",
                  badgeText: "< 20 ĐIỂM",
                  titleGradient: "bg-gradient-to-r from-rose-200 via-rose-300 to-red-500",
                  titleText: "DỰ BỊ",
                  subtitleColor: "text-rose-300",
                  desc: "Dự bị / Chờ cập nhật hồ sơ."
                }
              };
              const cfg = tierConfig[t] || tierConfig["A"];

              return (
                <div className={cn(
                  "relative overflow-hidden rounded-2xl border-2 p-4 text-left transition-all duration-300 hover:scale-[1.02]",
                  cfg.border, cfg.bg, cfg.shadow, cfg.hoverShadow
                )}>
                  <div className={cn("absolute -right-4 -top-4 h-16 w-16 rounded-full blur-xl pointer-events-none", cfg.glow)}></div>

                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-1.5">
                      {cfg.icon}
                      <span className={cn("text-[8px] font-black uppercase tracking-widest", cfg.labelColor)}>
                        {cfg.label}
                      </span>
                    </div>
                    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[7px] font-black uppercase tracking-wider border", cfg.badge)}>
                      {cfg.badgeText}
                    </span>
                  </div>
                  <span className={cn("block text-2xl font-black tracking-wide font-display bg-clip-text text-transparent", cfg.titleGradient)}>
                    {cfg.titleText}
                  </span>
                  <span className={cn("mt-0.5 block text-[9.5px] font-bold", cfg.subtitleColor)}>
                    {cfg.desc}
                  </span>
                </div>
              );
            })()}

            {/* Card 2: MXH Interaction - Cyan */}
            <div className="rounded-2xl bg-[#08090f] border border-[#143d4d] shadow-[0_0_15px_rgba(34,211,238,0.02)] p-4 hover:border-cyan-400/30 transition-colors">
              <span className="text-[9px] text-slate-500 uppercase font-bold tracking-wider block">Tương Tác MXH</span>
              <h4 className="text-lg font-extrabold text-white mt-1.5">{(profile.engagementRate || 4.8)}% ER</h4>
              <span className="text-[9px] text-cyan-400 block mt-1 font-semibold">{(Number(profile.followersCount || 120000) / 1000).toFixed(0)}k Followers</span>
            </div>

            {/* Card 3: Độ Tin Cậy - Purple */}
            <div className="rounded-2xl bg-[#08090f] border border-[#2f1c4f] shadow-[0_0_15px_rgba(168,85,247,0.02)] p-4 hover:border-purple-400/30 transition-colors">
              <span className="text-[9px] text-slate-500 uppercase font-bold tracking-wider block">Độ Tin Cậy</span>
              <h4 className="text-lg font-extrabold text-white mt-1.5">{(profile.reliability || 96)}%</h4>
              <span className="text-[9px] text-[#a855f7] block mt-1 font-semibold">{(profile.reviewsCount || 18)} Shows thành công</span>
            </div>

            {/* Card 4: Average Rating - Gold */}
            <div className="rounded-2xl bg-[#08090f] border border-[#3e3415] shadow-[0_0_15px_rgba(234,179,8,0.02)] p-4 hover:border-amber-400/30 transition-colors">
              <span className="text-[9px] text-slate-500 uppercase font-bold tracking-wider block">Đánh Giá TB</span>
              <h4 className="text-lg font-extrabold text-white mt-1.5 flex items-center gap-1">
                {(profile.averageRating || 4.9).toFixed(1)} <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
              </h4>
              <span className="text-[9px] text-amber-400 block mt-1 font-semibold">Xếp hạng 5 sao tuyệt đối</span>
            </div>

          </div>

          {/* Rate card section - Gold theme (finance) */}
          <div className="rounded-2xl border border-[#3e3415] bg-[#08090f] shadow-[0_0_15px_rgba(244,196,48,0.02)] p-6 space-y-4">
            <h3 className="font-display font-black text-xs text-white uppercase tracking-wider border-b border-[#151b2d] pb-3 flex items-center gap-2">
              <DollarSign className="h-4.5 w-4.5 text-amber-400" /> Bảng Giá Dịch Vụ Cố Định (Rate Card)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3.5">
              {Object.entries(profile.rateCard || {
                "Instagram Post": 3000000,
                "TikTok Video": 5000000,
                "Livestream 2h": 8000000,
                "Catwalk Show": 15000000
              }).map(([key, value]: any) => (
                <div key={key} className="flex justify-between py-2 text-xs border-b border-[#151b2d] md:border-b-0">
                  <span className="font-semibold text-slate-400">{key}</span>
                  <span className="font-extrabold text-amber-400 font-mono">từ {value.toLocaleString()}đ</span>
                </div>
              ))}
            </div>
          </div>

          {/* Availability Calendar */}
          <div className="rounded-2xl border border-[#151b2d] bg-[#08090f] p-6 space-y-4">
            <h3 className="font-display font-black text-xs text-white uppercase tracking-wider border-b border-[#151b2d] pb-3 flex items-center gap-2">
              <Calendar className="h-4.5 w-4.5 text-slate-400" /> Lịch Trình Nhận Show Tháng 6
            </h3>

            <div className="grid grid-cols-5 gap-2.5">
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
                    <span className="text-[9px] font-semibold mt-0.5">{isAvailable ? "Rảnh" : "Bận"}</span>
                  </div>
                );
              })}
            </div>
            <p className="text-[9px] text-slate-500 leading-normal">
              * Nhãn hàng có thể chọn ngày trống trên và ấn "Book" để gửi đề nghị đặt cọc.
            </p>
          </div>

          {/* AI Career Diagnostic Group: Radar Chart & 20 Recommended Roles */}
          <div className="rounded-2xl border border-[#2f1c4f] bg-[#08090f] shadow-[0_0_20px_rgba(168,85,247,0.03)] p-6 space-y-6">
            <div className="flex items-center gap-2.5 border-b border-[#151b2d] pb-4 justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-400 animate-pulse" />
                <div>
                  <h3 className="font-display font-black text-xs text-white uppercase tracking-wider">
                    Định Hướng Sự Nghiệp
                  </h3>
                  <span className="block text-[8px] text-slate-500 font-bold uppercase mt-0.5 tracking-wider">
                    Chẩn đoán năng lực & Tương thích việc làm
                  </span>
                </div>
              </div>
              <div className="text-[9px] font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20 uppercase">
                AI Powered
              </div>
            </div>

            {profile.tier === "Potential" ? (
              <div className="flex flex-col items-center justify-center text-center p-8 py-12 rounded-xl border border-white/5 bg-slate-950/40 max-w-xl mx-auto space-y-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400">
                  <Sparkles className="h-6 w-6 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-black text-white uppercase tracking-wider">Kích Hoạt Định Hướng Sự Nghiệp AI</h4>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                    Thực hiện bài khảo sát định hướng gồm 20 câu hỏi định tính để mở khóa bản đồ năng lực AI, biểu đồ radar & danh sách 20 vị trí tương thích nhất với bạn.
                  </p>
                </div>
                <button
                  onClick={() => router.push("/talent/survey?start=true")}
                  className="h-10 px-6 rounded-xl bg-gradient-to-r from-purple-400 to-purple-600 text-xs font-black text-white hover:brightness-105 shadow-lg shadow-purple-500/15 hover:shadow-purple-500/25 active:scale-98 transition-all uppercase tracking-wider cursor-pointer flex items-center gap-1.5"
                >
                  Làm Khảo Sát Ngay <ArrowUpRight className="h-4.5 w-4.5" />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                {/* Radar Chart Summary Column */}
                <div className="md:col-span-5 flex flex-col justify-between p-4 rounded-xl border border-white/2 bg-slate-950/40">
                  <div className="space-y-2">
                    <span className="block text-[8px] text-slate-500 uppercase tracking-widest font-black">Đề xuất phù hợp nhất</span>
                    <h4 className="text-xs font-bold text-white leading-relaxed">
                      {profile.mainCategory}
                    </h4>
                    <p className="text-[9px] text-slate-400 leading-normal">
                      Hệ thống đề xuất hướng đi chuyên nghiệp dựa trên nhân trắc học và phản hồi khảo sát định tính.
                    </p>
                  </div>

                  {/* SVG Radar */}
                  <div className="h-32 w-32 mx-auto my-4 shrink-0 rounded-xl border border-[#151b2d] bg-slate-950 p-2 shadow-inner">
                    <RadarChart
                      scores={profile.surveyScores}
                      fillColor="rgba(244,196,48,0.2)"
                      strokeColor="#f4c430"
                      strokeWidth={2.5}
                      labelFontSize={11}
                      labelFontWeight="bold"
                    />
                  </div>

                  <div className="flex justify-between items-center text-[9px] text-slate-500 border-t border-white/5 pt-2 mt-2">
                    <span>P: Pageant</span>
                    <span>R: Runway</span>
                    <span>K: KOL</span>
                  </div>
                </div>

                {/* 20 Recommended Roles Column */}
                <div className="md:col-span-7 space-y-3">
                  <span className="block text-[8px] text-slate-500 uppercase tracking-widest font-black text-left">Bảng xếp hạng 20 vị trí tương thích</span>

                  <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {(() => {
                      const scores = profile.surveyScores || { pageant: 50, runway: 50, kol: 50 };
                      const calculatedJobs = JOBS_LIST.map((job) => {
                        const matchScore = Math.round(
                          scores.pageant * job.weights.pageant +
                          scores.runway * job.weights.runway +
                          scores.kol * job.weights.kol
                        );
                        return { ...job, matchScore };
                      }).sort((a, b) => b.matchScore - a.matchScore);

                      return calculatedJobs.map((job, idx) => {
                        const isHigh = job.matchScore >= 80;
                        const isMid = job.matchScore >= 50 && job.matchScore < 80;

                        return (
                          <div
                            key={job.id}
                            className="flex items-center gap-3.5 rounded-xl border border-white/5 bg-slate-950 p-3 hover:bg-slate-900/20 hover:border-white/10 transition-all duration-300 group"
                          >
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white/5 text-[9px] font-bold text-slate-400 group-hover:bg-amber-400/10 group-hover:text-amber-400 transition-colors">
                              {idx + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-center">
                                <h4 className="text-[11px] font-bold text-white truncate group-hover:text-amber-400 transition-colors">
                                  {job.title}
                                </h4>
                                <span className={cn(
                                  "font-display text-[9px] font-extrabold",
                                  isHigh ? "text-amber-400" : isMid ? "text-purple-400" : "text-slate-500"
                                )}>
                                  {job.matchScore}% Match
                                </span>
                              </div>
                              <p className="text-[8px] text-slate-500 truncate mt-0.5">{job.desc}</p>
                              <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden mt-1.5">
                                <div
                                  className={cn(
                                    "h-full rounded-full transition-all duration-500",
                                    isHigh ? "bg-gradient-to-r from-amber-200 to-amber-500" : isMid ? "bg-purple-500" : "bg-slate-700"
                                  )}
                                  style={{ width: `${job.matchScore}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
