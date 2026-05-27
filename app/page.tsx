"use client";

import Link from "next/link";
import { User, Briefcase, Crown, Sparkles, Star } from "lucide-react";

export default function RootGatewayPage() {
  return (
    <div className="relative flex min-h-[85vh] flex-col items-center justify-center text-center px-4 py-8 animate-in fade-in duration-700">
      
      {/* Background Decorative Ambient Lights */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 -z-10 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      
      {/* Premium Golden Header Crown */}
      <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-slate-950/60 border border-amber-500/30 shadow-[0_0_50px_rgba(245,158,11,0.25)] backdrop-blur-md">
        <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-amber-400/20 to-yellow-600/10 blur-xl" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-b from-[#0f1224] to-[#040612] border border-amber-400/10">
          <Crown className="h-10 w-10 text-amber-300 filter drop-shadow-[0_0_12px_rgba(245,158,11,0.6)]" />
        </div>
      </div>

      <div className="space-y-3 mb-12">
        <h1 className="font-display text-3xl font-black tracking-widest text-white md:text-5xl uppercase">
          BEAUTY<span className="text-gradient-gold">TALENT</span>
        </h1>
        <div className="flex items-center justify-center gap-2">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-amber-500/50" />
          <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 flex items-center gap-1">
            <Star className="h-3 w-3 fill-amber-400" /> LUXURY ENTERTAINMENT NETWORK
          </span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-amber-500/50" />
        </div>
        <p className="mx-auto max-w-md text-xs leading-relaxed text-slate-400 font-medium">
          Nền tảng công nghệ tối tân giúp kiến tạo hồ sơ số chuyên nghiệp, định hướng AI và tự động kết nối nhãn hàng cho các thế hệ tài năng sắc đẹp.
        </p>
      </div>

      {/* Grid of Portals with luxury styling */}
      <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Talent Portal */}
        <Link
          href="/talent"
          className="group relative flex flex-col justify-between items-start rounded-2xl glass-panel p-6 text-left luxury-card-hover border-glow-gold hover:bg-slate-900/40"
        >
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <Sparkles className="h-4 w-4 text-amber-400 animate-pulse" />
          </div>
          <div className="mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400/10 text-amber-300 border border-amber-400/20 group-hover:bg-amber-400 group-hover:text-slate-950 transition-all duration-300 shadow-[0_0_10px_rgba(245,158,11,0.15)]">
              <User className="h-5 w-5" />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors uppercase tracking-wider">Talent Portal</h3>
            <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
              Dành cho Model, KOL, Hoa khôi, MC. Khảo sát năng lực, tạo hồ sơ số & nhận booking tự động.
            </p>
          </div>
        </Link>

        {/* Brand Portal */}
        <Link
          href="/brand"
          className="group relative flex flex-col justify-between items-start rounded-2xl glass-panel p-6 text-left luxury-card-hover hover:border-purple-500/30 hover:bg-slate-900/40 border-glow-purple"
        >
          <div className="mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-300 border border-purple-500/20 group-hover:bg-purple-500 group-hover:text-slate-950 transition-all duration-300 shadow-[0_0_10px_rgba(168,85,247,0.15)]">
              <Briefcase className="h-5 w-5" />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors uppercase tracking-wider">Brand Portal</h3>
            <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
              Dành cho Nhãn hàng & Agency. Khám phá tài năng với AI Match, đăng chiến dịch & ký quỹ an toàn.
            </p>
          </div>
        </Link>

      </div>
    </div>
  );
}
