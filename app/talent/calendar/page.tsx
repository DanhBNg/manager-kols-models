"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar as CalendarIcon, Clock, MapPin, ArrowLeft, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CalendarPage() {
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
    }
  }, []);

  const schedules = [
    {
      id: "s1",
      title: "Livestream Son Môi Glow",
      brand: "Glow Beauty",
      date: "25 Tháng 6, 2026",
      time: "20:00 - 22:00",
      location: "Studio Cầu Giấy, Hà Nội",
      status: "Đã ký quỹ"
    },
    {
      id: "s2",
      title: "Fitting Đầm Dạ Hội",
      brand: "VNDress Fashion",
      date: "26 Tháng 6, 2026",
      time: "14:00 - 16:00",
      location: "Gem Center, TP. Hồ Chí Minh",
      status: "Thử trang phục"
    },
    {
      id: "s3",
      title: "Summer Runway Show",
      brand: "VNDress Fashion",
      date: "28 Tháng 6, 2026",
      time: "09:00 - 18:00",
      location: "Gem Center, TP. Hồ Chí Minh",
      status: "Biểu diễn chính"
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={() => router.push("/talent/dashboard")} className="text-slate-400 hover:text-white">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="font-display text-xl font-bold text-white tracking-tight">Lịch Trình</h1>
            <p className="text-xs text-slate-400">Xem show diễn, buổi chụp ảnh & fitting đồ đã đặt trước</p>
          </div>
        </div>
        <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white">
          <Plus className="h-4.5 w-4.5" />
        </button>
      </div>

      {/* Grid calendar indicators */}
      <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5 shadow-lg backdrop-blur-xl">
        <h3 className="font-display font-semibold text-xs text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
          <CalendarIcon className="h-4.5 w-4.5 text-amber-400" /> Tháng 6, 2026
        </h3>
        
        <div className="grid grid-cols-7 gap-2 text-center text-[10px] text-slate-500 font-bold uppercase mb-2 border-b border-white/5 pb-2">
          <span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span><span>T7</span><span>CN</span>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center">
          {/* Pad empty spots for Monday start */}
          <span></span><span></span><span></span>
          {Array.from({ length: 15 }).map((_, idx) => {
            const day = idx + 20; // dates 20 to 34 (June has 30 days)
            if (day > 30) return null;
            
            const isReserved = schedules.some(s => s.date.includes(String(day)));
            const isAvailable = profile?.availabilityCalendar?.some((d: string) => d.endsWith(String(day)));

            return (
              <div
                key={day}
                className={cn(
                  "flex flex-col items-center justify-center h-10 w-full rounded-lg text-xs font-bold transition-all",
                  isReserved && "bg-amber-400 text-slate-950 shadow-[0_0_8px_rgba(251,191,36,0.25)]",
                  !isReserved && isAvailable && "border border-amber-400/30 text-amber-300",
                  !isReserved && !isAvailable && "border border-white/5 text-slate-600"
                )}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed show lists */}
      <div className="space-y-4">
        <h3 className="font-display font-bold text-sm text-white">🔥 Danh sách Lịch Diễn</h3>
        
        <div className="space-y-3">
          {schedules.map((item) => (
            <div key={item.id} className="rounded-xl border border-white/5 bg-slate-900/20 p-4 space-y-2.5 backdrop-blur-md">
              <div className="flex justify-between items-start">
                <h4 className="text-xs font-semibold text-white">{item.title}</h4>
                <span className={cn(
                  "rounded px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider",
                  item.status === "Đã ký quỹ" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-white/5 text-slate-400"
                )}>
                  {item.status}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-semibold">{item.brand}</p>
              
              <div className="border-t border-white/5 pt-2 flex flex-col gap-1 text-[10px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-amber-400" />
                  <span>{item.date} • {item.time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-slate-500" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
