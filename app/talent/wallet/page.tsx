"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { DollarSign, ArrowLeft, ArrowUpRight, TrendingUp, Vault, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export default function WalletPage() {
  const router = useRouter();

  const transactions = [
    {
      id: "tx1",
      title: "Giải ngân: Livestream Glow Son Môi",
      amount: "+7.600.000đ",
      date: "25 Tháng 5, 2026",
      status: "Thành công",
      type: "income"
    },
    {
      id: "tx2",
      title: "Ký quỹ: Summer Runway Collection",
      amount: "15.000.000đ",
      date: "23 Tháng 5, 2026",
      status: "Đang tạm khóa (Escrow)",
      type: "escrow"
    },
    {
      id: "tx3",
      title: "Giải ngân: Chụp ảnh BST Thu",
      amount: "+11.400.000đ",
      date: "18 Tháng 5, 2026",
      status: "Thành công",
      type: "income"
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center gap-2">
        <button onClick={() => router.push("/talent/dashboard")} className="text-slate-400 hover:text-white">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="font-display text-xl font-bold text-white tracking-tight">Thu Nhập & Ví</h1>
          <p className="text-xs text-slate-400">Quản lý số dư, lịch sử giải ngân & quỹ đang bảo vệ ký quỹ</p>
        </div>
      </div>

      {/* Available Balance Card */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-5 shadow-xl backdrop-blur-xl">
        <div className="absolute top-0 right-0 -z-10 h-32 w-32 rounded-full bg-amber-400/5 blur-2xl" />
        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Số dư khả dụng</span>
        <h2 className="font-display font-extrabold text-white text-3xl mt-1">19.000.000đ</h2>
        
        <div className="mt-5 border-t border-white/5 pt-4 flex gap-4">
          <button className="flex h-10 flex-1 items-center justify-center rounded-xl bg-gradient-to-r from-amber-200 to-amber-500 text-slate-950 font-display text-xs font-semibold shadow-md active:scale-98 transition-all">
            Rút tiền về ngân hàng
          </button>
        </div>
      </div>

      {/* Escrow summary */}
      <div className="rounded-xl border border-white/5 bg-slate-900/20 p-4 flex items-center justify-between backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
            <Vault className="h-4.5 w-4.5" />
          </div>
          <div>
            <span className="block text-[9px] text-slate-500 font-bold uppercase">Đang bảo vệ (Escrow)</span>
            <span className="font-display font-bold text-white text-sm">15.000.000đ</span>
          </div>
        </div>
        <span className="flex items-center gap-0.5 rounded bg-cyan-500/10 px-2 py-0.5 text-[8px] text-cyan-400 font-bold border border-cyan-500/15">
          <ShieldCheck className="h-3 w-3" /> Đã ký quỹ
        </span>
      </div>

      {/* Transaction Logs */}
      <div className="space-y-3">
        <h3 className="font-display font-bold text-sm text-white">📝 Lịch Sử Giao Dịch</h3>
        
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div key={tx.id} className="rounded-xl border border-white/5 bg-slate-900/15 p-4 flex justify-between items-center backdrop-blur-md">
              <div className="space-y-1">
                <h4 className="text-xs font-semibold text-white">{tx.title}</h4>
                <div className="flex items-center gap-1.5 text-[9px] text-slate-500">
                  <span>{tx.date}</span>
                  <span>•</span>
                  <span className={cn(
                    tx.status === "Thành công" ? "text-emerald-400" : "text-cyan-400"
                  )}>
                    {tx.status}
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                <span className={cn(
                  "font-display font-extrabold text-sm",
                  tx.type === "income" ? "text-amber-400" : "text-cyan-400"
                )}>
                  {tx.amount}
                </span>
                <span className="block text-[8px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">
                  {tx.type === "income" ? "Thu nhập" : "Khóa ký quỹ"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
