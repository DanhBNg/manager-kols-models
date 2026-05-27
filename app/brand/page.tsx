"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Briefcase, ArrowLeft, Lock, Star, Sparkles, ShieldAlert } from "lucide-react";

export default function BrandPortalPlaceholder() {
  const router = useRouter();

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-center p-6 animate-in fade-in duration-500">
      <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-purple-500/10 border border-purple-500/20 shadow-[0_0_40px_rgba(168,85,247,0.15)]">
        <Briefcase className="h-10 w-10 text-purple-400" />
      </div>

      <h1 className="mb-2 font-display text-2xl font-bold tracking-tight text-white">Brand Portal</h1>
      <span className="inline-block rounded-md border border-purple-500/30 bg-purple-500/10 px-3 py-1 font-display text-[10px] font-bold uppercase tracking-wider text-purple-300 mb-6">
        Giai Đoạn Phát Triển Tiếp Theo
      </span>

      <p className="mx-auto mb-8 max-w-sm text-xs leading-relaxed text-slate-400">
        Cổng thông tin dành cho Doanh nghiệp, Nhãn hàng và Agency giúp tìm kiếm, so sánh & booking Talent sắc đẹp tự động.
      </p>

      {/* Feature details */}
      <div className="w-full space-y-3 mb-8 text-left max-w-sm">
        <div className="flex items-center gap-3 rounded-lg bg-white/2 p-3.5 border border-white/5">
          <Sparkles className="h-4.5 w-4.5 text-purple-400 shrink-0" />
          <span className="text-xs text-slate-300"><b>AI Search & Filter:</b> Lọc theo nhân trắc học, độ tuổi, và mạng xã hội.</span>
        </div>
        <div className="flex items-center gap-3 rounded-lg bg-white/2 p-3.5 border border-white/5">
          <Star className="h-4.5 w-4.5 text-purple-400 shrink-0" />
          <span className="text-xs text-slate-300"><b>Compare Talents:</b> So sánh trực quan chỉ số 2-4 tài năng.</span>
        </div>
        <div className="flex items-center gap-3 rounded-lg bg-white/2 p-3.5 border border-white/5">
          <Lock className="h-4.5 w-4.5 text-purple-400 shrink-0" />
          <span className="text-xs text-slate-300"><b>Escrow Contracts:</b> Bảo vệ tiền đặt cọc bằng hợp đồng tự động.</span>
        </div>
      </div>

      <button
        onClick={() => router.push("/")}
        className="flex h-12 w-full max-w-xs items-center justify-center rounded-xl border border-white/10 bg-white/5 font-display text-xs font-semibold text-white hover:bg-white/10 transition-all"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại Gateway chính
      </button>
    </div>
  );
}
