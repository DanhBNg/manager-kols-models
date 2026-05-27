"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Award, Calendar, DollarSign, Briefcase, ChevronRight, Sparkles, Star, Bell, Search, Info } from "lucide-react";
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
      brand: "Glow Beauty",
      budget: "8.000.000đ - 12.000.000đ",
      matchScore: 94,
      tag: "Livestream"
    },
    {
      id: "j2",
      title: "Người mẫu BST Thu Đông",
      brand: "VNDress Fashion",
      budget: "15.000.000đ - 20.000.000đ",
      matchScore: 89,
      tag: "Runway"
    },
    {
      id: "j3",
      title: "Chụp ảnh Lookbook BST Hè",
      brand: "Linen House",
      budget: "6.000.000đ",
      matchScore: 82,
      tag: "Lookbook"
    },
    {
      id: "j4",
      title: "MC song ngữ Lễ khai trương",
      brand: "Luxury Diamonds",
      budget: "10.000.000đ",
      matchScore: 85,
      tag: "Event MC"
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Mobile Page Header (Hidden on Desktop) */}
      <div className="flex md:hidden items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-xl">👑</div>
          <h1 className="font-display font-bold text-white text-sm">VNP BEAUTYTALENT</h1>
        </div>
      </div>

      {/* Main Grid: 2 columns on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Main dashboard metrics & items (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Dashboard Title Header */}
          <div className="hidden md:block">
            <h1 className="font-display text-2xl font-extrabold text-white tracking-tight">Chào quay lại, {profile.name}!</h1>
            <p className="text-xs text-slate-400 mt-1">Dưới đây là thông số hồ sơ số và cơ hội việc làm của bạn hôm nay.</p>
          </div>

          {/* Quick Stats Grid - 4 columns on desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-xl border border-white/5 bg-slate-900/10 p-4 hover:border-white/10 transition-colors backdrop-blur-md">
              <div className="mb-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400/10 text-amber-400">
                <Briefcase className="h-4.5 w-4.5" />
              </div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Job Phù Hợp</span>
              <h3 className="font-display text-base font-bold text-white mt-1">5 Chiến dịch</h3>
            </div>

            <div className="rounded-xl border border-white/5 bg-slate-900/10 p-4 hover:border-white/10 transition-colors backdrop-blur-md">
              <div className="mb-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                <Calendar className="h-4.5 w-4.5" />
              </div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Lịch Trình</span>
              <h3 className="font-display text-base font-bold text-white mt-1">3 Shows</h3>
            </div>

            <div className="rounded-xl border border-white/5 bg-slate-900/10 p-4 hover:border-white/10 transition-colors backdrop-blur-md">
              <div className="mb-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
                <DollarSign className="h-4.5 w-4.5" />
              </div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Thu nhập</span>
              <h3 className="font-display text-base font-bold text-white mt-1">12.5M đ</h3>
            </div>

            <div className="rounded-xl border border-white/5 bg-slate-900/10 p-4 hover:border-white/10 transition-colors backdrop-blur-md">
              <div className="mb-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                <Award className="h-4.5 w-4.5" />
              </div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Độ tin cậy</span>
              <h3 className="font-display text-base font-bold text-white mt-1">98%</h3>
            </div>
          </div>

          {/* Matched Jobs Grid - 2 columns on desktop */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-400" /> Chiến Dịch Khuyên Dùng
              </h3>
              <button 
                onClick={() => router.push("/talent/jobs")} 
                className="text-[10px] font-bold text-amber-400 uppercase tracking-wider hover:text-amber-300"
              >
                Xem tất cả
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockJobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => router.push("/talent/jobs")}
                  className="group rounded-2xl border border-white/5 bg-slate-900/10 p-4 hover:border-white/10 hover:bg-slate-900/20 active:scale-[0.99] transition-all duration-200 cursor-pointer space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <span className="rounded bg-white/5 px-2 py-0.5 text-[8px] text-slate-400 uppercase font-semibold">
                      {job.tag}
                    </span>
                    <div className="text-right">
                      <span className="font-display font-extrabold text-sm text-amber-400">{job.matchScore}%</span>
                      <span className="block text-[8px] text-slate-500 uppercase font-semibold">Match</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">{job.title}</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">{job.brand}</p>
                  </div>

                  <div className="border-t border-white/5 pt-2 text-[10px] text-slate-400">
                    Cát-xê đề xuất: <b className="text-white">{job.budget}</b>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Services Section */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-sm text-white">📸 Dịch Vụ Hỗ Trợ Độc Quyền</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-white/5 bg-slate-900/5 p-4 text-center hover:border-white/10 transition-all">
                <span className="text-2xl">📷</span>
                <h4 className="text-xs font-semibold text-white mt-1.5">Photographer Pro</h4>
                <p className="text-[9px] text-slate-500 mt-1">Giảm 10% gói chụp portfolio</p>
              </div>
              <div className="rounded-xl border border-white/5 bg-slate-900/5 p-4 text-center hover:border-white/10 transition-all">
                <span className="text-2xl">💄</span>
                <h4 className="text-xs font-semibold text-white mt-1.5">Stylist & Makeup</h4>
                <p className="text-[9px] text-slate-500 mt-1">Trang điểm lookbook chuyên nghiệp</p>
              </div>
              <div className="rounded-xl border border-white/5 bg-slate-900/5 p-4 text-center hover:border-white/10 transition-all col-span-2 sm:col-span-1">
                <span className="text-2xl">🎓</span>
                <h4 className="text-xs font-semibold text-white mt-1.5">Catwalk Academy</h4>
                <p className="text-[9px] text-slate-500 mt-1">Khóa đào tạo kỹ năng catwalk VIP</p>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Profile and completeness details (1/3 width) */}
        <div className="space-y-6">
          
          {/* Profile Card */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#070913]/60 p-5 shadow-xl backdrop-blur-xl">
            <div className="absolute top-0 right-0 -z-10 h-32 w-32 rounded-full bg-amber-400/5 blur-2xl" />
            
            <div className="flex flex-col items-center text-center pb-4 border-b border-white/5">
              <div className="relative h-20 w-20 rounded-full border-2 border-amber-400 p-0.5 shadow-md mb-3">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              
              <div className="flex items-center gap-1.5 justify-center">
                <h2 className="font-display text-base font-bold text-white">{profile.name}</h2>
                <span className={cn(
                  "inline-block rounded-md border px-1.5 py-0.2 font-display text-[8px] font-extrabold uppercase tracking-wide",
                  profile.tier === "S" && "border-amber-400 bg-amber-400/10 text-amber-400",
                  profile.tier === "A" && "border-slate-300 bg-slate-400/10 text-slate-200",
                  profile.tier === "B" && "border-purple-400 bg-purple-500/10 text-purple-300",
                  profile.tier === "C" && "border-emerald-400 bg-emerald-500/10 text-emerald-300"
                )}>
                  Tier {profile.tier}
                </span>
              </div>
              
              <p className="text-xs text-slate-400 mt-1">{profile.mainCategory || "Chưa hoàn thiện khảo sát"}</p>
              <p className="text-[10px] text-slate-500 mt-1">{profile.location} • {(profile.followersCount / 1000).toFixed(0)}k followers</p>
            </div>

            {/* Profile completeness */}
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span className="font-semibold">Độ hoàn thiện hồ sơ</span>
                <span className="font-bold text-amber-400">{profile.profileScore || 0}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-200 to-amber-500 transition-all duration-500"
                  style={{ width: `${profile.profileScore || 0}%` }}
                />
              </div>
              {profile.profileScore < 90 && (
                <button
                  onClick={() => router.push("/talent/onboarding")}
                  className="flex items-center text-[10px] font-bold text-amber-400 uppercase tracking-wider hover:text-amber-300 mt-2"
                >
                  Hoàn thiện hồ sơ ngay <ChevronRight className="ml-1 h-3 w-3" />
                </button>
              )}
            </div>
          </div>

          {/* AI Recommendation Alert card */}
          <div className="rounded-2xl border border-white/5 bg-[#070913]/30 p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5 text-amber-400" />
              <h4 className="font-display font-semibold text-xs text-white uppercase tracking-wider">Trợ Lý Định Hướng AI</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Hệ thống ghi nhận bạn có lợi thế hình ảnh rất lớn trên Instagram. 
              Hãy liên kết tài khoản TikTok để AI quét lượng tương tác và nâng cấp thứ hạng của bạn lên <b>Tier S</b> (Celeb VIP).
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
