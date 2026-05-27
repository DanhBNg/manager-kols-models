"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Shield, ArrowLeft, Users, ShieldAlert, Gavel, BarChart3 } from "lucide-react";

export default function AdminPortalPlaceholder() {
  const router = useRouter();

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-center p-6 animate-in fade-in duration-500">
      <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-500/20 shadow-[0_0_40px_rgba(6,182,212,0.15)]">
        <Shield className="h-10 w-10 text-cyan-400" />
      </div>

      <h1 className="mb-2 font-display text-2xl font-bold tracking-tight text-white">Admin Management</h1>
      <span className="inline-block rounded-md border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-display text-[10px] font-bold uppercase tracking-wider text-cyan-300 mb-6">
        Giai Đoạn Phát Triển Tiếp Theo
      </span>

      <p className="mx-auto mb-8 max-w-sm text-xs leading-relaxed text-slate-400">
        Trang điều trị quản trị tối giản phục vụ kiểm duyệt hồ sơ số, xử lý khiếu nại & giám sát giao dịch tài chính.
      </p>

      {/* Feature details */}
      <div className="w-full space-y-3 mb-8 text-left max-w-sm">
        <div className="flex items-center gap-3 rounded-lg bg-white/2 p-3.5 border border-white/5">
          <Users className="h-4.5 w-4.5 text-cyan-400 shrink-0" />
          <span className="text-xs text-slate-300"><b>Verification Center:</b> Phê duyệt định dạng Tier & tích xanh.</span>
        </div>
        <div className="flex items-center gap-3 rounded-lg bg-white/2 p-3.5 border border-white/5">
          <Gavel className="h-4.5 w-4.5 text-cyan-400 shrink-0" />
          <span className="text-xs text-slate-300"><b>Dispute Arbitration:</b> Trọng tài phán quyết hoàn trả/giải ngân.</span>
        </div>
        <div className="flex items-center gap-3 rounded-lg bg-white/2 p-3.5 border border-white/5">
          <BarChart3 className="h-4.5 w-4.5 text-cyan-400 shrink-0" />
          <span className="text-xs text-slate-300"><b>Transaction Logs:</b> Lưu vết lịch sử chuyển đổi dòng tiền.</span>
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
