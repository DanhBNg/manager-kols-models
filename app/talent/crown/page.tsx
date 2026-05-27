"use client";

import React, { useState } from "react";
import { Crown, Heart, Share2, Users, Calendar, Award } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CrownPage() {
  const [raised, setRaised] = useState(62500000);
  const [supportersCount, setSupportersCount] = useState(1248);
  const [donationAmount, setDonationAmount] = useState("200000");
  const goal = 100000000;

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    const val = Number(donationAmount);
    if (!val || val <= 0) return;
    setRaised((prev) => prev + val);
    setSupportersCount((prev) => prev + 1);
    alert(`Cảm ơn bạn đã ủng hộ ${val.toLocaleString()}đ cho dự án nhân ái!`);
  };

  const percent = Math.round((raised / goal) * 100);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h1 className="font-display text-xl font-bold text-white tracking-tight">Quỹ Vương Miện</h1>
        <p className="text-xs text-slate-400">Gây quỹ cho các dự án nhân ái, dự án cộng đồng & vận động bình chọn</p>
      </div>

      {/* Hero Campaign Card */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40 p-5 shadow-xl backdrop-blur-xl">
        <div className="h-40 w-full rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden mb-4">
          <img
            src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&h=300&q=80"
            alt="Tủ sách cho em"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
          <div className="absolute bottom-3 left-3">
            <span className="rounded bg-amber-400 px-2 py-0.5 text-[9px] text-slate-950 font-bold uppercase tracking-wider">
              Nhân Ái
            </span>
          </div>
        </div>

        <h3 className="font-display font-bold text-base text-white">Dự án: Tủ sách cho em</h3>
        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
          Người thực hiện: <b className="text-amber-400 font-semibold">Nguyễn Mai Anh</b> (Verified Talent)
        </p>
        
        <p className="text-xs text-slate-400 leading-relaxed mt-3">
          Gây quỹ xây dựng 5 tủ sách cộng đồng với hơn 2,000 đầu sách cho các học sinh tại trường tiểu học vùng cao Hà Giang.
        </p>

        {/* Progress details */}
        <div className="mt-5 border-t border-white/5 pt-4 space-y-2">
          <div className="flex justify-between items-end text-xs">
            <div className="space-y-0.5">
              <span className="block text-[9px] text-slate-500 font-bold uppercase">Đã đạt được</span>
              <span className="font-display font-bold text-white text-base">{raised.toLocaleString()}đ</span>
            </div>
            <div className="text-right space-y-0.5">
              <span className="block text-[9px] text-slate-500 font-bold uppercase">Mục tiêu</span>
              <span className="text-slate-300 font-semibold">{goal.toLocaleString()}đ</span>
            </div>
          </div>

          <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 transition-all duration-500"
              style={{ width: `${Math.min(100, percent)}%` }}
            />
          </div>
          
          <div className="flex justify-between items-center text-[10px] text-slate-400">
            <span>Tiến độ: <b className="text-amber-400">{percent}%</b></span>
            <span className="flex items-center gap-1"><Users className="h-3 w-3" /> <b>{supportersCount}</b> nhà ủng hộ</span>
          </div>
        </div>
      </div>

      {/* Donate form */}
      <div className="rounded-xl border border-white/5 bg-slate-900/20 p-4 space-y-4">
        <h3 className="font-display font-semibold text-xs text-white uppercase tracking-wider flex items-center gap-1.5">
          <Heart className="h-4 w-4 text-red-500 shrink-0" /> Ủng hộ dự án nhân ái
        </h3>

        <form onSubmit={handleDonate} className="space-y-3">
          <div className="flex gap-2">
            {["100000", "200000", "500000"].map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => setDonationAmount(amount)}
                className={cn(
                  "flex-1 rounded-lg py-2 text-xs font-semibold border transition-all duration-200",
                  donationAmount === amount
                    ? "border-amber-400 bg-amber-400/10 text-amber-300 font-bold"
                    : "border-white/5 bg-slate-950/40 text-slate-400 hover:text-white"
                )}
              >
                {(Number(amount) / 1000).toFixed(0)}k đ
              </button>
            ))}
          </div>

          <div className="relative">
            <input
              type="number"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-amber-400 focus:outline-none"
              placeholder="Nhập số tiền khác"
              required
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-500 font-bold">VNĐ</span>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex h-11 flex-1 items-center justify-center rounded-xl bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 font-display text-xs font-semibold text-slate-950 shadow-md hover:shadow-lg active:scale-98 transition-all"
            >
              Ủng Hộ Ngay
            </button>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-transparent text-slate-300 hover:bg-white/5 hover:text-white"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Top Sponsors */}
      <div className="rounded-xl border border-white/5 bg-slate-900/20 p-4 space-y-3">
        <h3 className="font-display font-semibold text-xs text-white uppercase tracking-wider">Nhà Tài Trợ Hàng Đầu</h3>
        <div className="space-y-2.5">
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center gap-2">
              <span className="text-sm">🥇</span>
              <span className="font-semibold text-white">Glow Beauty Brand</span>
            </div>
            <span className="font-bold text-amber-400">10.000.000đ</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center gap-2">
              <span className="text-sm">🥈</span>
              <span className="font-semibold text-white">CEO Minh Hằng</span>
            </div>
            <span className="font-bold text-amber-400">5.000.000đ</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center gap-2">
              <span className="text-sm">🥉</span>
              <span className="font-semibold text-white">VNDress Group</span>
            </div>
            <span className="font-bold text-amber-400">2.000.000đ</span>
          </div>
        </div>
      </div>
    </div>
  );
}
