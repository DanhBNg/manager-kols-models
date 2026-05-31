"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar as CalendarIcon, Clock, MapPin, ArrowLeft, Plus, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { fetchCalendarEventsForUi, fetchMyTalentProfileForUi } from "@/lib/api/talent-profile";

export default function CalendarPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [apiSchedules, setApiSchedules] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;

    async function loadCalendar() {
      const [backendProfile, backendSchedules] = await Promise.all([
        fetchMyTalentProfileForUi(),
        fetchCalendarEventsForUi(),
      ]);

      if (!mounted) return;

      if (backendProfile) {
        localStorage.setItem("vnp_talent_profile", JSON.stringify(backendProfile));
        setProfile(backendProfile);
      }

      setApiSchedules(backendSchedules);

    const stored = localStorage.getItem("vnp_talent_profile");
    if (!backendProfile && stored) {
      try {
        setProfile(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
    }

    loadCalendar();

    return () => {
      mounted = false;
    };
  }, []);

  const schedules = [
    {
      id: "s1",
      title: "Livestream Son Môi Glow",
      brand: "Glow Beauty Cosmetics",
      date: "25 Tháng 6, 2026",
      time: "20:00 - 22:00",
      location: "Studio Cầu Giấy, Hà Nội",
      status: "Đã đặt cọc",
      borderColor: "border-[#153f2d] shadow-[0_0_15px_rgba(16,185,129,0.02)]",
      badgeColor: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
    },
    {
      id: "s2",
      title: "Fitting Đầm Dạ Hội VIP",
      brand: "VNDress Fashion",
      date: "26 Tháng 6, 2026",
      time: "14:00 - 16:00",
      location: "Gem Center, TP. Hồ Chí Minh",
      status: "Thử trang phục",
      borderColor: "border-[#3e3415] shadow-[0_0_15px_rgba(244,196,48,0.02)]",
      badgeColor: "bg-amber-400/10 border-amber-400/20 text-amber-300"
    },
    {
      id: "s3",
      title: "Summer Runway Show 2026",
      brand: "VNDress Fashion",
      date: "28 Tháng 6, 2026",
      time: "09:00 - 18:00",
      location: "Gem Center, TP. Hồ Chí Minh",
      status: "Biểu diễn chính",
      borderColor: "border-[#2f1c4f] shadow-[0_0_15px_rgba(168,85,247,0.02)]",
      badgeColor: "bg-purple-500/10 border-purple-500/20 text-purple-300"
    }
  ];
  const visibleSchedules = apiSchedules.length > 0 ? apiSchedules : schedules;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push("/talent/dashboard")} 
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#151b2d] bg-[#08090f] text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="font-display text-3xl font-black text-white tracking-tight uppercase leading-none">Lịch Trình</h1>
            <p className="text-xs text-slate-400 mt-2 font-medium">Xem lịch trình show diễn, lịch fitting đồ & buổi chụp hình đã được lên lịch.</p>
          </div>
        </div>
        
        <button 
          onClick={() => router.push("/talent/settings")}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#151b2d] bg-[#08090f] text-white hover:bg-white/5 transition-all cursor-pointer"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      {/* Grid calendar indicators - styled like dashboard.htm banner */}
      <div className="relative overflow-hidden rounded-3xl border border-white/7 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.12),transparent_34%),linear-gradient(135deg,rgba(15,23,42,0.94),rgba(2,6,23,0.98))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
        <h3 className="font-display font-black text-xs text-white uppercase tracking-wider mb-5 flex items-center gap-2">
          <CalendarIcon className="h-4.5 w-4.5 text-amber-400" /> Tháng 6, 2026
        </h3>
        
        <div className="grid grid-cols-7 gap-2.5 text-center text-[10px] text-slate-500 font-black uppercase mb-4 border-b border-white/5 pb-3">
          <span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span><span>T7</span><span>CN</span>
        </div>

        <div className="grid grid-cols-7 gap-2.5 text-center">
          {/* Pad empty spots for Monday start */}
          <span></span><span></span><span></span>
          {Array.from({ length: 15 }).map((_, idx) => {
            const day = idx + 20; // dates 20 to 34 (June has 30 days)
            if (day > 30) return null;
            
            const isReserved = visibleSchedules.some(s => s.date.includes(String(day)) || s.startsAt?.slice(8, 10) === String(day).padStart(2, "0"));
            const isAvailable = profile?.availabilityCalendar?.some((d: string) => d.endsWith(String(day)));

            return (
              <div
                key={day}
                className={cn(
                  "flex flex-col items-center justify-center h-12 w-full rounded-xl text-xs font-bold transition-all duration-300",
                  isReserved && "bg-[#f4c430] text-slate-950 shadow-[0_0_12px_rgba(244,196,48,0.25)] font-black",
                  !isReserved && isAvailable && "border border-amber-400/30 bg-amber-400/5 text-amber-300",
                  !isReserved && !isAvailable && "border border-[#151b2d] bg-slate-950/20 text-slate-600"
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
        <h3 className="font-display font-black text-xs text-white uppercase tracking-wider flex items-center gap-2">
          🔥 Danh Sách Lịch Show Chi Tiết
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleSchedules.map((item) => (
            <div 
              key={item.id} 
              className={cn(
                "group relative overflow-hidden rounded-2xl border bg-[#08090f] p-6 transition-all duration-300 hover:bg-slate-950 flex flex-col justify-between h-48",
                item.borderColor
              )}
            >
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">{item.title}</h4>
                <span className={cn("inline-flex items-center rounded border px-2.5 py-0.5 text-[8px] font-bold uppercase tracking-wider", item.badgeColor)}>
                  {item.status}
                </span>
              </div>
              
              <p className="text-[10px] text-slate-500 font-bold mt-1.5">{item.brand}</p>
              
              <div className="border-t border-[#151b2d] pt-3.5 mt-4 flex flex-col gap-1.5 text-[10px] text-slate-400">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-amber-400 shrink-0" />
                  <span className="font-semibold">{item.date} • {item.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-slate-500 shrink-0" />
                  <span className="truncate font-semibold">{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
