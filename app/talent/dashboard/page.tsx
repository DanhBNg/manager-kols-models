"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Award, Calendar, DollarSign, Briefcase, ChevronRight,
  Sparkles, Star, Bell, Search, Info, Shield,
  Users, UserCheck, Play, Plus, BookOpen, Clock,
  ArrowUpRight, Flame, Heart, ShieldCheck, Activity,
  AlertTriangle, Radio
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
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
      // Mock seed data if not onboarded yet
      setProfile({
        name: "Nguyễn Mai Anh",
        tier: "A",
        profileScore: 82,
        location: "Hà Nội",
        mainCategory: "KOL / Người mẫu ảnh / Giải trí thế hệ mới",
        followersCount: 120000,
        avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&h=150&q=80"
      });
    }
  }, []);

  if (!profile) return null;

  const mockJobs = [
    {
      id: "j1",
      title: "KOL Livestream son môi mới",
      brand: "Glow Beauty Cosmetics",
      budget: "8.000.000đ - 12.000.000đ",
      matchScore: 94,
      tag: "Livestream",
      borderColor: "border-cyan-400/25 shadow-[0_0_22px_rgba(34,211,238,0.12)]",
      badgeColor: "border-cyan-400/25 bg-cyan-400/10 text-cyan-300",
      glowColor: "bg-gradient-to-br from-cyan-300 to-blue-500",
      iconColor: "text-cyan-300"
    },
    {
      id: "j2",
      title: "Người mẫu BST Thu Đông Luxury",
      brand: "Diamond Luxury Fashion",
      budget: "15.000.000đ - 20.000.000đ",
      matchScore: 89,
      tag: "Runway",
      borderColor: "border-purple-400/25 shadow-[0_0_22px_rgba(168,85,247,0.12)]",
      badgeColor: "border-purple-400/25 bg-purple-400/10 text-purple-300",
      glowColor: "bg-gradient-to-br from-purple-300 to-fuchsia-500",
      iconColor: "text-purple-300"
    },
    {
      id: "j3",
      title: "Chụp ảnh Lookbook BST Hè Vibe",
      brand: "Linen House Vietnam",
      budget: "6.000.000đ",
      matchScore: 82,
      tag: "Lookbook",
      borderColor: "border-amber-400/25 shadow-[0_0_22px_rgba(245,158,11,0.12)]",
      badgeColor: "border-amber-400/25 bg-amber-400/10 text-amber-300",
      glowColor: "bg-gradient-to-br from-amber-200 via-amber-400 to-yellow-600",
      iconColor: "text-amber-300"
    },
    {
      id: "j4",
      title: "MC song ngữ Lễ khai trương Showroom",
      brand: "Luxury Diamonds Co.",
      budget: "10.000.000đ",
      matchScore: 85,
      tag: "Event MC",
      borderColor: "border-rose-400/25 shadow-[0_0_22px_rgba(244,63,94,0.12)]",
      badgeColor: "border-rose-400/25 bg-rose-400/10 text-rose-300",
      glowColor: "bg-gradient-to-br from-rose-300 to-red-500",
      iconColor: "text-rose-300"
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">

      {/* Mobile Page Header (Hidden on Desktop) */}
      <div className="flex md:hidden items-center justify-between border-b border-[#151b2d] pb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-400/10 border border-amber-400/30">
            <span className="text-xs">👑</span>
          </div>
          <h1 className="font-display font-bold text-white text-xs tracking-wider uppercase">VNP BEAUTYTALENT</h1>
        </div>
      </div>

      {/* Welcome Title / Header Banner - exact replica of dashboard.htm banner styling */}
      <div className="relative overflow-hidden rounded-3xl border border-white/7 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.14),transparent_34%),linear-gradient(135deg,rgba(15,23,42,0.94),rgba(2,6,23,0.98))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

          <div className="max-w-3xl">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-md border px-2.5 py-1 text-[10px] font-black uppercase tracking-wider border-cyan-400/25 bg-cyan-400/10 text-cyan-300">
                Talent Control Center
              </span>
              <span className="inline-flex items-center rounded-md border px-2.5 py-1 text-[10px] font-black uppercase tracking-wider border-emerald-400/25 bg-emerald-400/10 text-emerald-300">
                Profile Active
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">
                May 2026
              </span>
            </div>

            <h1 className="font-display text-3xl font-black tracking-tight text-white md:text-5xl">
              CHÀO MỪNG QUAY LẠI <span className="bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-600 bg-clip-text text-transparent">{profile.name}</span>!
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
              Dưới đây là các thông số đánh giá định hướng AI, độ tin cậy và danh sách các chiến dịch đề xuất dành riêng cho hồ sơ của bạn.
            </p>
          </div>

          {/* Mini-metrics strip inside banner */}
          <div className="grid min-w-0 grid-cols-3 gap-3 lg:w-[360px] shrink-0">

            <div className="rounded-2xl border border-white/7 bg-black/20 p-3 text-left">
              <Sparkles className="mb-3 h-4.5 w-4.5 text-cyan-300" />
              <span className="block truncate text-lg font-black text-white">{profile.profileScore || 82}%</span>
              <span className="mt-1 block text-[9px] font-bold uppercase tracking-wider text-slate-500">Hồ Sơ Sắc Đẹp</span>
            </div>

            <div className="rounded-2xl border border-white/7 bg-black/20 p-3 text-left">
              <Award className="mb-3 h-4.5 w-4.5 text-emerald-300" />
              <span className="block truncate text-lg font-black text-white">Tier {profile.tier}</span>
              <span className="mt-1 block text-[9px] font-bold uppercase tracking-wider text-slate-500">Thứ Hạng AI</span>
            </div>

            <div className="rounded-2xl border border-white/7 bg-black/20 p-3 text-left">
              <Star className="mb-3 h-4.5 w-4.5 text-amber-300 fill-amber-300/20" />
              <span className="block truncate text-lg font-black text-white">4.9 ★</span>
              <span className="mt-1 block text-[9px] font-bold uppercase tracking-wider text-slate-500">Đánh Giá TB</span>
            </div>

          </div>

        </div>
      </div>

      {/* Quick Stats Grid - replica of dashboard.htm card styles */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* Thẻ 1: Job Phù Hợp - Cyan */}
        <div className="group relative overflow-hidden rounded-2xl border bg-gradient-to-b from-[#111421]/88 to-[#070913]/96 p-5 transition-all duration-300 hover:-translate-y-0.5 border-cyan-400/25 shadow-[0_0_22px_rgba(34,211,238,0.12)]">
          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-10 blur-2xl bg-gradient-to-br from-cyan-300 to-blue-500"></div>
          <div className="flex items-start justify-between gap-4">
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Job Phù Hợp</span>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/25 bg-cyan-400/10 text-cyan-300">
              <Briefcase className="h-4.5 w-4.5" />
            </div>
          </div>
          <strong className="mt-5 block text-2xl font-black tracking-tight text-white">5 Chiến dịch</strong>
          <span className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500">AI Matching</span>
        </div>

        {/* Thẻ 2: Lịch Trình - Purple */}
        <div className="group relative overflow-hidden rounded-2xl border bg-gradient-to-b from-[#111421]/88 to-[#070913]/96 p-5 transition-all duration-300 hover:-translate-y-0.5 border-purple-400/25 shadow-[0_0_22px_rgba(168,85,247,0.12)]">
          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-10 blur-2xl bg-gradient-to-br from-purple-300 to-fuchsia-500"></div>
          <div className="flex items-start justify-between gap-4">
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Lịch Trình Show</span>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-purple-400/25 bg-purple-400/10 text-purple-300">
              <Calendar className="h-4.5 w-4.5" />
            </div>
          </div>
          <strong className="mt-5 block text-2xl font-black tracking-tight text-white">3 Shows diễn</strong>
          <span className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500">Tháng 6/2026</span>
        </div>

        {/* Thẻ 3: Thu nhập - Gold */}
        <div className="group relative overflow-hidden rounded-2xl border bg-gradient-to-b from-[#111421]/88 to-[#070913]/96 p-5 transition-all duration-300 hover:-translate-y-0.5 border-amber-400/25 shadow-[0_0_22px_rgba(245,158,11,0.12)]">
          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-10 blur-2xl bg-gradient-to-br from-amber-200 via-amber-400 to-yellow-600"></div>
          <div className="flex items-start justify-between gap-4">
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Thu nhập khả dụng</span>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-400/25 bg-amber-400/10 text-amber-300">
              <DollarSign className="h-4.5 w-4.5" />
            </div>
          </div>
          <strong className="mt-5 block text-2xl font-black tracking-tight text-white">12.5M đ</strong>
          <span className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500">Ký quỹ bảo lãnh</span>
        </div>

        {/* Thẻ 4: Độ tin cậy - Emerald */}
        <div className="group relative overflow-hidden rounded-2xl border bg-gradient-to-b from-[#111421]/88 to-[#070913]/96 p-5 transition-all duration-300 hover:-translate-y-0.5 border-emerald-400/25 shadow-[0_0_22px_rgba(52,211,153,0.12)]">
          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-10 blur-2xl bg-gradient-to-br from-emerald-300 to-teal-500"></div>
          <div className="flex items-start justify-between gap-4">
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Độ tin cậy</span>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-400/25 bg-emerald-400/10 text-emerald-300">
              <Award className="h-4.5 w-4.5" />
            </div>
          </div>
          <strong className="mt-5 block text-2xl font-black tracking-tight text-white">98%</strong>
          <span className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500">Chất lượng diễn show</span>
        </div>

      </div>

      {/* Matched Jobs Grid - 2 columns style but using dashboard.htm luxury theme card styles */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-extrabold text-xs text-white uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="h-4.5 w-4.5 text-amber-400 fill-amber-400/20 animate-pulse" /> Chiến Dịch Nên Tham Gia
          </h3>
          <button
            onClick={() => router.push("/talent/jobs")}
            className="text-[9px] font-bold text-amber-400 bg-amber-400/10 border border-amber-500/20 px-3 py-1 rounded hover:bg-amber-400 hover:text-black transition-all uppercase tracking-wider"
          >
            Xem tất cả
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockJobs.map((job) => (
            <div
              key={job.id}
              onClick={() => router.push("/talent/jobs")}
              className={cn(
                "group relative overflow-hidden rounded-2xl border bg-gradient-to-b from-[#111421]/88 to-[#070913]/96 p-6 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between h-48",
                job.borderColor
              )}
            >
              <div className={cn("absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-10 blur-2xl", job.glowColor)}></div>

              <div className="flex justify-between items-start relative z-10">
                <span className={cn("inline-flex items-center rounded border px-2.5 py-0.5 text-[8px] font-black uppercase tracking-wider", job.badgeColor)}>
                  {job.tag === "Runway" ? "Người mẫu sàn diễn" : job.tag}
                </span>
                <div className="text-right">
                  <span className="font-display font-extrabold text-sm text-amber-400">{job.matchScore}% Match</span>
                  <span className="block text-[8px] text-slate-500 uppercase tracking-widest font-bold">AI SCORE</span>
                </div>
              </div>

              <div className="relative z-10 my-4">
                <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors duration-300 leading-snug">{job.title}</h4>
                <p className="text-[10px] text-slate-500 mt-1 font-bold">{job.brand}</p>
              </div>

              <div className="border-t border-white/5 pt-3 text-[10px] text-slate-400 flex justify-between items-center relative z-10">
                <span>Cát-xê đề xuất:</span>
                <b className="text-white font-mono font-extrabold">{job.budget}</b>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom section matching the design layout and styles of dashboard.htm widgets */}
      <div className="grid gap-6 xl:grid-cols-2">

        {/* Live Activity section */}
        <section className="relative overflow-hidden rounded-2xl border border-white/7 bg-gradient-to-b from-[#0d101b]/80 to-[#050712]/92 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.42)] backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent"></div>

          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-sm font-black uppercase tracking-[0.18em] text-white">Live Activity</h2>
            <span className="inline-flex items-center rounded-md border px-2.5 py-1 text-[10px] font-black uppercase tracking-wider border-emerald-400/25 bg-emerald-400/10 text-emerald-300">
              Realtime
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex gap-3 rounded-xl border border-white/5 bg-white/[0.025] p-3 text-xs leading-relaxed">
              <div className="mt-1 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
              <div>
                <p className="font-semibold text-slate-300">Brand Glow Beauty Cosmetics created campaign Mega Beauty Live.</p>
                <span className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-slate-600">3 min ago</span>
              </div>
            </div>
            <div className="flex gap-3 rounded-xl border border-white/5 bg-white/[0.025] p-3 text-xs leading-relaxed">
              <div className="mt-1 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
              <div>
                <p className="font-semibold text-slate-300">Bạn đã đồng ý ứng tuyển vào #BK12082 (Glow Beauty).</p>
                <span className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-slate-600">4 min ago</span>
              </div>
            </div>
            <div className="flex gap-3 rounded-xl border border-white/5 bg-white/[0.025] p-3 text-xs leading-relaxed">
              <div className="mt-1 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
              <div>
                <p className="font-semibold text-slate-300">Escrow payment received: 28,000,000 VND (Maison Design).</p>
                <span className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-slate-600">5 min ago</span>
              </div>
            </div>
            <div className="flex gap-3 rounded-xl border border-white/5 bg-white/[0.025] p-3 text-xs leading-relaxed">
              <div className="mt-1 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
              <div>
                <p className="font-semibold text-slate-300">Admin đã phê duyệt tích xanh của Brand Diamond Luxury.</p>
                <span className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-slate-600">12 min ago</span>
              </div>
            </div>
          </div>
        </section>

        {/* AI Orientation Alert card / Risk Alerts Style */}
        <section className="relative overflow-hidden rounded-2xl border border-white/7 bg-gradient-to-b from-[#0d101b]/80 to-[#050712]/92 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.42)] backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent"></div>

          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-sm font-black uppercase tracking-[0.18em] text-white">AI Career orientation & Alerts</h2>
            <span className="inline-flex items-center rounded-md border px-2.5 py-1 text-[10px] font-black uppercase tracking-wider border-purple-400/25 bg-purple-400/10 text-purple-300">
              System Info
            </span>
          </div>

          <div className="space-y-3">
            {/* Warning Alert: Yellow/Orange */}
            <div className="rounded-xl border p-3 border-amber-400/25 bg-amber-400/10 text-xs">
              <div className="flex items-start gap-3">
                <Info className="mt-0.5 h-4 w-4 text-amber-300 shrink-0" />
                <p className="font-bold leading-5 text-slate-200">Hãy cập nhật số đo nhân trắc thường xuyên để AI tối ưu hóa độ khớp job của bạn.</p>
              </div>
            </div>

            {/* AI Recommendation: Purple */}
            <div className="rounded-xl border p-3 border-purple-400/25 bg-purple-400/10 text-xs">
              <div className="flex items-start gap-3">
                <Sparkles className="mt-0.5 h-4 w-4 text-purple-300 shrink-0" />
                <p className="font-bold leading-5 text-slate-200">Liên kết tài khoản TikTok để nâng thứ hạng lên <b className="text-purple-300">Tier S</b> và tăng 80% tỷ lệ đàm phán.</p>
              </div>
            </div>

            {/* Verified: Cyan */}
            <div className="rounded-xl border p-3 border-cyan-400/25 bg-cyan-400/10 text-xs">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 text-cyan-300 shrink-0" />
                <p className="font-bold leading-5 text-slate-200">Tài khoản của bạn đã được kiểm định tích xanh bởi Ban Quản Trị VNP.</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
