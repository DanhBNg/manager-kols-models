"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Briefcase, Users, ShieldAlert, Sparkles, ArrowRight, CheckCircle2,
  TrendingUp, Award, Calendar, DollarSign, Wallet, Shield, AlertTriangle, ArrowUpRight
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data for Dashboard
const INITIAL_STATS = [
  {
    label: "Chiến Dịch Đang Chạy",
    value: "4",
    change: "+1 tuần này",
    icon: Briefcase,
    color: "text-amber-400 border-amber-500/30 bg-amber-500/5 shadow-[0_0_15px_rgba(245,158,11,0.05)]",
    gradient: "from-amber-500/10 to-transparent"
  },
  {
    label: "Người Mẫu Đã Book",
    value: "28",
    change: "+5 mới",
    icon: Users,
    color: "text-purple-400 border-purple-500/30 bg-purple-500/5 shadow-[0_0_15px_rgba(168,85,247,0.05)]",
    gradient: "from-purple-500/10 to-transparent"
  },
  {
    label: "Số Dư Đặt Cọc (Escrow)",
    value: "186.000.000đ",
    change: "An toàn 100%",
    icon: Shield,
    color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/5 shadow-[0_0_15px_rgba(6,182,212,0.05)]",
    gradient: "from-cyan-500/10 to-transparent"
  },
  {
    label: "Chờ Phản Hồi",
    value: "6",
    change: "Cần xử lý ngay",
    icon: ShieldAlert,
    color: "text-rose-400 border-rose-500/30 bg-rose-500/5 shadow-[0_0_15px_rgba(244,63,94,0.05)]",
    gradient: "from-rose-500/10 to-transparent"
  }
];

const INITIAL_CAMPAIGNS = [
  {
    id: "camp-1",
    name: "Beauty Mega Live 06/2026",
    type: "KOC Livestream",
    status: "Active",
    budget: "120.000.000đ",
    spent: "80.000.000đ",
    talentsBooked: 12,
    talentsTarget: 15,
    reachEstimate: "1.8M",
    progress: 80,
    accentColor: "from-amber-400 to-yellow-600"
  },
  {
    id: "camp-2",
    name: "Summer Fashion High-End Runway",
    type: "Runway Model",
    status: "Active",
    budget: "250.000.000đ",
    spent: "150.000.000đ",
    talentsBooked: 8,
    talentsTarget: 10,
    reachEstimate: "850K",
    progress: 75,
    accentColor: "from-purple-400 to-indigo-600"
  },
  {
    id: "camp-3",
    name: "Organic Glow Cosmetics Launch",
    type: "KOL Brand Ambassador",
    status: "Pending Escrow",
    budget: "90.000.000đ",
    spent: "0đ",
    talentsBooked: 3,
    talentsTarget: 3,
    reachEstimate: "2.4M",
    progress: 0,
    accentColor: "from-cyan-400 to-blue-600"
  }
];

const RECOMMENDED_TALENTS = [
  {
    id: "tal-1",
    name: "Nguyễn Mai Anh",
    tier: "A",
    matchScore: 96,
    category: "Beauty KOL & MC",
    followers: "120K",
    er: "4.8%",
    rate: "từ 8.0M",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&h=150&q=80",
    skills: ["Catwalk", "MC", "Livestream"]
  },
  {
    id: "tal-2",
    name: "Khánh Linh (Kency)",
    tier: "B",
    matchScore: 91,
    category: "Fashion Model & Content Creator",
    followers: "85K",
    er: "5.2%",
    rate: "từ 5.5M",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
    skills: ["Catwalk", "Styling", "Tiktok Video"]
  },
  {
    id: "tal-3",
    name: "Lê Ngọc Hân",
    tier: "A",
    matchScore: 88,
    category: "Beauty Queen & Brand Ambassador",
    followers: "240K",
    er: "3.9%",
    rate: "từ 15.0M",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&h=150&q=80",
    skills: ["Interviewing", "Catwalk", "Public Speaking"]
  }
];

export default function BrandDashboard() {
  const router = useRouter();
  const [invitedTalents, setInvitedTalents] = useState<Record<string, boolean>>({});

  const handleInvite = (id: string) => {
    setInvitedTalents((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      alert("Đã gửi lời mời hợp tác thành công đến tài năng!");
    }, 100);
  };

  return (
    <div className="space-y-10 pb-16 animate-in fade-in duration-500">

      {/* Luxury Header Section */}
      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-white/5 pb-8">
        {/* Soft background light leak */}
        <div className="absolute -left-10 -top-20 -z-20 h-44 w-44 rounded-full bg-amber-400/5 blur-3xl pointer-events-none" />

        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-block rounded-md border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 font-display text-[9px] font-black uppercase tracking-widest text-amber-300">
              Luxury Tech SaaS
            </span>
            <span className="text-[10px] text-slate-500">•</span>
            <span className="text-[10px] font-semibold text-slate-400">Tháng 05/2026</span>
          </div>
          <h1 className="font-display text-3xl font-black tracking-tight text-white md:text-4xl">
            BẢNG ĐIỀU KHIỂN <span className="bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-500 bg-clip-text text-transparent filter drop-shadow-[0_2px_10px_rgba(245,158,11,0.15)]">BRAND</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl leading-relaxed">
            Kết nối thông minh nhãn hàng với các biểu tượng sắc đẹp hàng đầu Việt Nam thông qua dữ liệu số và quy trình giao dịch đặt cọc an toàn 24h.
          </p>
        </div>

        <button
          onClick={() => router.push("/brand/campaigns")}
          className="relative overflow-hidden group flex h-12 items-center justify-center rounded-xl bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-500 px-6 font-display text-xs font-black text-slate-950 shadow-[0_4px_20px_rgba(245,158,11,0.2)] hover:shadow-[0_4px_25px_rgba(245,158,11,0.3)] hover:-translate-y-0.5 active:scale-98 transition-all duration-300 shrink-0"
        >
          {/* Subtle shine overlay */}
          <div className="absolute inset-0 w-1/2 h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:animate-shine" />
          <Briefcase className="mr-2 h-4 w-4" /> Tạo Chiến Dịch Mới
        </button>
      </div>

      {/* KPI Glassmorphism Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {INITIAL_STATS.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-b from-[#0f111e]/80 to-[#070913]/90 p-6 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)] group hover:border-white/10 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Radial gradient glow */}
              <div className={cn("absolute -right-6 -top-6 -z-10 h-20 w-20 rounded-full bg-gradient-to-br opacity-5 blur-xl group-hover:opacity-10 transition-opacity duration-300", stat.gradient)} />

              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-110", stat.color)}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>

              <div className="space-y-1">
                <span className="block text-2xl font-black text-white tracking-tight md:text-3xl bg-gradient-to-b from-white to-slate-200 bg-clip-text text-transparent">
                  {stat.value}
                </span>
                <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-emerald-500" /> {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">

        {/* Left Section: Active work and Campaigns */}
        <div className="space-y-8 lg:col-span-8">

          {/* Work-to-do Action Center (Glassmorphism layout) */}
          <div className="rounded-3xl border border-white/5 bg-gradient-to-b from-[#0a0c16]/50 to-[#03050c]/80 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl relative">
            {/* Soft top border glow */}
            <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />

            <div className="flex items-center gap-2 mb-6">
              <div className="h-2 w-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
              <h2 className="font-display font-black text-xs tracking-widest text-slate-300 uppercase">Hành Động Cần Phê Duyệt</h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              {/* Action 1 */}
              <div
                onClick={() => router.push("/brand/bookings")}
                className="group relative overflow-hidden rounded-2xl border border-amber-500/10 bg-[#070913]/30 p-5 cursor-pointer hover:border-amber-400/40 hover:bg-amber-400/[0.02] shadow-[inset_0_1px_1px_rgba(255,255,255,0.01)] transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 group-hover:scale-105 transition-transform">
                    <Users className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-black text-white group-hover:text-amber-300 transition-colors flex items-center gap-1.5">
                      3 Booking Mới Chờ Đặt Cọc <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h4>
                    <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">Người mẫu đã xác nhận, nhấp để thực hiện đặt cọc ví cọc bảo đảm.</p>
                  </div>
                </div>
              </div>

              {/* Action 2 */}
              <div
                onClick={() => router.push("/brand/bookings")}
                className="group relative overflow-hidden rounded-2xl border border-cyan-500/10 bg-[#070913]/30 p-5 cursor-pointer hover:border-cyan-400/40 hover:bg-cyan-400/[0.02] shadow-[inset_0_1px_1px_rgba(255,255,255,0.01)] transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:scale-105 transition-transform">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-black text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                      2 Job Cần Nghiệm Thu <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h4>
                    <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">Tài năng đã nộp sản phẩm nghiệm thu (Proof of Work). Duyệt giải ngân.</p>
                  </div>
                </div>
              </div>

              {/* Action 3 */}
              <div
                onClick={() => router.push("/brand/bookings")}
                className="group relative overflow-hidden rounded-2xl border border-rose-500/10 bg-[#070913]/30 p-5 cursor-pointer hover:border-rose-400/40 hover:bg-rose-400/[0.02] shadow-[inset_0_1px_1px_rgba(255,255,255,0.01)] transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 group-hover:scale-105 transition-transform">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-black text-white group-hover:text-rose-300 transition-colors flex items-center gap-1.5">
                      1 Tranh Chấp Trọng Tài <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h4>
                    <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">Campaign Organic Glow có tranh chấp. Ban quản trị đang hỗ trợ hòa giải.</p>
                  </div>
                </div>
              </div>

              {/* Action 4 */}
              <div
                onClick={() => router.push("/brand/discover")}
                className="group relative overflow-hidden rounded-2xl border border-purple-500/10 bg-[#070913]/30 p-5 cursor-pointer hover:border-purple-400/40 hover:bg-purple-400/[0.02] shadow-[inset_0_1px_1px_rgba(255,255,255,0.01)] transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 group-hover:scale-105 transition-transform">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-black text-white group-hover:text-purple-300 transition-colors flex items-center gap-1.5">
                      5 Gợi Ý AI Matching <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h4>
                    <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">Phân tích hồ sơ mới tương thích với chiến dịch Beauty Mega Live.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Active Campaigns overview section */}
          <div className="rounded-3xl border border-white/5 bg-gradient-to-b from-[#0a0c16]/50 to-[#03050c]/80 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-black text-xs tracking-widest text-slate-300 uppercase">Chiến Dịch Đang Chạy</h2>
              <button
                onClick={() => router.push("/brand/campaigns")}
                className="group flex items-center text-[10px] font-black text-amber-400 hover:text-amber-300 uppercase tracking-widest transition-colors"
              >
                TẤT CẢ CHIẾN DỊCH <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            <div className="space-y-4">
              {INITIAL_CAMPAIGNS.map((camp) => (
                <div
                  key={camp.id}
                  className="rounded-2xl border border-white/5 bg-[#070913]/30 p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.01)] hover:border-white/10 transition-all duration-300"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div>
                      <span className="inline-block rounded-md bg-white/5 border border-white/5 px-2.5 py-0.5 text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                        {camp.type}
                      </span>
                      <h3 className="text-sm font-black text-white tracking-wide">{camp.name}</h3>
                    </div>

                    <div className="flex items-center gap-6 text-left border-l border-white/5 pl-6 shrink-0">
                      <div>
                        <span className="block text-[8px] font-black text-slate-500 uppercase tracking-widest">Booked</span>
                        <span className="text-xs font-black text-white mt-0.5">{camp.talentsBooked} <span className="text-[10px] font-normal text-slate-500">/ {camp.talentsTarget}</span></span>
                      </div>
                      <div>
                        <span className="block text-[8px] font-black text-slate-500 uppercase tracking-widest">Ngân sách</span>
                        <span className="text-xs font-black text-amber-400 mt-0.5">{camp.budget}</span>
                      </div>
                      <div className="hidden sm:block">
                        <span className="block text-[8px] font-black text-slate-500 uppercase tracking-widest">Reach</span>
                        <span className="text-xs font-black text-cyan-400 mt-0.5">{camp.reachEstimate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Sleek luxury progress bar with glow overlay */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-[9px] font-bold text-slate-500">
                      <span>TIẾN ĐỘ TUYỂN DỤNG</span>
                      <span className="text-slate-300">{camp.progress}%</span>
                    </div>
                    <div className="relative h-2 w-full rounded-full bg-white/5 overflow-hidden">
                      <div
                        className={cn("h-full rounded-full bg-gradient-to-r shadow-[0_0_8px_rgba(251,191,36,0.3)] transition-all duration-700 ease-out", camp.accentColor)}
                        style={{ width: `${camp.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section: AI recommendations and wallets */}
        <div className="space-y-8 lg:col-span-4">

          {/* AI recommendations (Luxury tech card look) */}
          <div className="rounded-3xl border border-white/5 bg-gradient-to-b from-[#0a0c16]/50 to-[#03050c]/80 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl relative overflow-hidden">
            {/* Gold ambient light source behind heading */}
            <div className="absolute top-[-40px] right-[-40px] -z-10 h-28 w-28 rounded-full bg-amber-400/5 blur-2xl pointer-events-none" />

            <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
              <Sparkles className="h-4.5 w-4.5 text-amber-400 animate-pulse" />
              <h2 className="font-display font-black text-xs tracking-widest text-slate-300 uppercase">AI Matching Gợi Ý</h2>
            </div>

            <div className="space-y-5">
              {RECOMMENDED_TALENTS.map((talent) => (
                <div
                  key={talent.id}
                  className="relative rounded-2xl border border-white/5 bg-[#070913]/30 p-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.01)] hover:border-white/10 transition-all duration-300 group"
                >
                  {/* Floating match badge */}
                  <span className="absolute top-4 right-4 rounded bg-amber-400/10 border border-amber-500/20 px-2 py-0.5 font-display text-[8px] font-black text-amber-400 tracking-wider">
                    {talent.matchScore}% MATCH
                  </span>

                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="relative shrink-0">
                      <img
                        src={talent.avatar}
                        alt={talent.name}
                        className="h-12 w-12 rounded-full object-cover border border-amber-400/30"
                      />
                      <span className="absolute -bottom-1 -right-1 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 px-1 py-0.2 font-display text-[7px] font-black text-slate-950">
                        {talent.tier}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h4 className="truncate text-xs font-black text-white group-hover:text-amber-400 transition-colors">
                        {talent.name}
                      </h4>
                      <span className="block text-[9px] text-slate-500 font-semibold mt-0.5 uppercase tracking-wider">
                        {talent.category}
                      </span>
                    </div>
                  </div>

                  {/* Metrics grid block */}
                  <div className="grid grid-cols-3 gap-1 rounded-xl bg-slate-950/60 p-2.5 mb-4 border border-white/5 text-center">
                    <div>
                      <span className="block text-[7px] text-slate-500 font-bold uppercase tracking-wider">Followers</span>
                      <span className="text-[10px] font-black text-white mt-0.5">{talent.followers}</span>
                    </div>
                    <div className="border-l border-white/5">
                      <span className="block text-[7px] text-slate-500 font-bold uppercase tracking-wider">ER</span>
                      <span className="text-[10px] font-black text-cyan-400 mt-0.5">{talent.er}</span>
                    </div>
                    <div className="border-l border-white/5">
                      <span className="block text-[7px] text-slate-500 font-bold uppercase tracking-wider">Cát-xê</span>
                      <span className="text-[10px] font-black text-amber-400 mt-0.5">{talent.rate}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => !invitedTalents[talent.id] && handleInvite(talent.id)}
                    disabled={invitedTalents[talent.id]}
                    className={cn(
                      "flex h-9 w-full items-center justify-center rounded-xl font-display text-[9px] font-black uppercase tracking-wider transition-all duration-300 border",
                      invitedTalents[talent.id]
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 cursor-default"
                        : "bg-white/5 border-white/5 hover:bg-gradient-to-r hover:from-amber-100 hover:to-yellow-500 hover:text-slate-950 hover:border-transparent text-white shadow-md active:scale-97"
                    )}
                  >
                    {invitedTalents[talent.id] ? "Đã Gửi Lời Mời" : "Gửi Lời Mời Hợp Tác"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Escrow ring summary with dynamic glow borders */}
          <div className="rounded-3xl border border-white/5 bg-gradient-to-b from-[#0a0c16]/50 to-[#03050c]/80 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl relative">
            <div className="absolute bottom-[-20px] left-[-20px] -z-10 h-28 w-28 rounded-full bg-cyan-400/5 blur-2xl pointer-events-none" />

            <h2 className="font-display font-black text-xs tracking-widest text-slate-300 uppercase mb-5 border-b border-white/5 pb-4">Tài Khoản Đặt Cọc (Escrow)</h2>

            <div className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-transparent p-4 border border-cyan-500/20 mb-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.15)]">
                <Wallet className="h-5 w-5 animate-pulse" />
              </div>
              <div>
                <span className="block text-[8px] font-black text-slate-500 uppercase tracking-widest">Tổng Ngân Sách Quỹ</span>
                <span className="text-lg font-black text-white mt-0.5 bg-gradient-to-b from-white to-slate-200 bg-clip-text text-transparent">460.000.000đ</span>
              </div>
            </div>

            <div className="space-y-3.5">
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
                  <span className="text-slate-400 font-medium">Đặt Cọc Đang Khóa</span>
                </div>
                <span className="font-black text-white">186.000.000đ</span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                  <span className="text-slate-400 font-medium">Đã Giải Ngân</span>
                </div>
                <span className="font-black text-white">230.000.000đ</span>
              </div>

              <div className="flex justify-between items-center text-xs border-t border-white/5 pt-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
                  <span className="text-slate-400 font-black">Khả Dụng Hợp Tác</span>
                </div>
                <span className="font-black text-amber-400">44.000.000đ</span>
              </div>
            </div>

            <button
              onClick={() => router.push("/brand/settings?tab=billing")}
              className="mt-6 flex h-11 w-full items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/5 font-display text-[9px] font-black uppercase tracking-widest text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400/40 active:scale-98 transition-all duration-300"
            >
              NẠP TIỀN & ĐỐI CHIẾU
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
