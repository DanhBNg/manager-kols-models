"use client";

import React from "react";
import Link from "next/link";
import { User, Shield, Briefcase, Crown } from "lucide-react";

export default function RootGatewayPage() {
  return (
    <div className="flex min-h-[85vh] flex-col items-center justify-center text-center animate-in fade-in duration-500">
      {/* Golden Glowing Logo */}
      <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-900 border border-amber-500/20 shadow-[0_0_40px_rgba(245,158,11,0.15)]">
        <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-amber-500/10 to-yellow-600/5 blur-xl" />
        <Crown className="h-10 w-10 text-amber-400 filter drop-shadow-[0_0_10px_rgba(245,158,11,0.4)]" />
      </div>

      <h1 className="mb-2 font-display text-2xl font-extrabold tracking-tight text-white md:text-3xl">
        VNP <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 bg-clip-text text-transparent">BEAUTYTALENT</span>
      </h1>
      
      <p className="mx-auto mb-10 max-w-sm text-xs leading-relaxed text-slate-400">
        Nền tảng công nghệ kết nối & thương mại hóa tài năng ngành sắc đẹp và giải trí.
      </p>

      <div className="w-full space-y-4">
        {/* Talent Portal Link */}
        <Link 
          href="/talent" 
          className="flex items-center gap-4 rounded-xl border border-white/10 bg-gradient-to-br from-slate-900/60 to-slate-950/80 p-5 text-left backdrop-blur-md transition-all duration-300 hover:border-amber-400/40 hover:-translate-y-0.5 group active:scale-99 block"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 group-hover:bg-amber-400 group-hover:text-slate-950 transition-all duration-300 shadow-[0_0_8px_rgba(245,158,11,0.15)]">
            <User className="h-6 w-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">Talent Portal</h3>
            <p className="text-xs text-slate-400 mt-1">Dành cho Thí sinh, KOLs, Models, MCs. Định hướng sự nghiệp, xây dựng hồ sơ số, ứng tuyển booking.</p>
          </div>
        </Link>

        {/* Brand Portal Link */}
        <Link 
          href="/brand" 
          className="flex items-center gap-4 rounded-xl border border-white/5 bg-gradient-to-br from-slate-900/40 to-slate-950/60 p-5 text-left backdrop-blur-md transition-all duration-300 hover:border-purple-400/40 hover:-translate-y-0.5 group active:scale-99 block"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-500 group-hover:text-slate-950 transition-all duration-300">
            <Briefcase className="h-6 w-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">Brand Portal</h3>
            <p className="text-xs text-slate-400 mt-1">Dành cho Nhãn hàng, Agency, Ban tổ chức cuộc thi. Tìm kiếm tài năng, đăng chiến dịch & quản lý ký quỹ.</p>
          </div>
        </Link>

        {/* Admin Portal Link */}
        <Link 
          href="/admin" 
          className="flex items-center gap-4 rounded-xl border border-white/5 bg-gradient-to-br from-slate-900/40 to-slate-950/60 p-5 text-left backdrop-blur-md transition-all duration-300 hover:border-cyan-400/40 hover:-translate-y-0.5 group active:scale-99 block"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-slate-950 transition-all duration-300">
            <Shield className="h-6 w-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">Admin Management</h3>
            <p className="text-xs text-slate-400 mt-1">Dành cho Ban quản trị hệ thống. Duyệt hồ sơ, đối chiếu giao dịch, trọng tài xử lý tranh chấp booking.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
