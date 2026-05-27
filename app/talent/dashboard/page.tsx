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
            <h1 className="font-display text-2xl font-black text-white tracking-tight uppercase">
              Chào quay lại, <span className="text-gradient-gold">{profile.name}</span>!
            </h1>
            <p className="text-xs text-slate-400 mt-1.5 font-medium">Dưới đây là thông số hồ sơ số và cơ hội việc làm dành riêng cho bạn hôm nay.</p>
          </div>

          {/* Quick Stats Grid - 4 columns on desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-2xl glass-panel-light p-4 hover:bg-white/5 transition-all duration-300 relative group overflow-hidden border border-white/5">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/10">
                <Briefcase className="h-4.5 w-4.5" />
              </div>
              <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Job Phù Hợp</span>
              <h3 className="font-display text-sm font-extrabold text-white mt-1">5 Chiến dịch</h3>
            </div>

            <div className="rounded-2xl glass-panel-light p-4 hover:bg-white/5 transition-all duration-300 relative group overflow-hidden border border-white/5">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/10">
                <Calendar className="h-4.5 w-4.5" />
              </div>
              <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Lịch Trình</span>
              <h3 className="font-display text-sm font-extrabold text-white mt-1">3 Shows</h3>
            </div>

            <div className="rounded-2xl glass-panel-light p-4 hover:bg-white/5 transition-all duration-300 relative group overflow-hidden border border-white/5">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/10">
                <DollarSign className="h-4.5 w-4.5" />
              </div>
              <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Thu nhập</span>
              <h3 className="font-display text-sm font-extrabold text-white mt-1">12.5M đ</h3>
            </div>

            <div className="rounded-2xl glass-panel-light p-4 hover:bg-white/5 transition-all duration-300 relative group overflow-hidden border border-white/5">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/10">
                <Award className="h-4.5 w-4.5" />
              </div>
              <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Độ tin cậy</span>
              <h3 className="font-display text-sm font-extrabold text-white mt-1">98%</h3>
            </div>
          </div>

          {/* Matched Jobs Grid - 2 columns on desktop */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-extrabold text-xs text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="h-4.5 w-4.5 text-amber-400 fill-amber-400/20" /> Chiến Dịch Khuyên Dùng
              </h3>
              <button 
                onClick={() => router.push("/talent/jobs")} 
                className="text-[9px] font-bold text-amber-400 uppercase tracking-widest hover:text-amber-300 transition-colors"
              >
                Xem tất cả
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockJobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => router.push("/talent/jobs")}
                  className="group rounded-2xl glass-panel p-5 luxury-card-hover cursor-pointer space-y-3.5 hover:border-amber-400/20 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 h-1 w-full bg-gradient-to-r from-transparent via-amber-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="flex justify-between items-start">
                    <span className="rounded bg-white/5 border border-white/5 px-2.5 py-0.5 text-[8px] text-slate-300 uppercase tracking-wider font-semibold">
                      {job.tag === "Runway" ? "Người mẫu sàn diễn" : job.tag}
                    </span>
                    <div className="text-right">
                      <span className="font-display font-extrabold text-sm text-gradient-gold">{job.matchScore}%</span>
                      <span className="block text-[8px] text-slate-500 uppercase tracking-wider font-bold">AI Match</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors duration-300">{job.title}</h4>
                    <p className="text-[10px] text-slate-500 mt-1 font-semibold">{job.brand}</p>
                  </div>

                  <div className="border-t border-white/5 pt-3 text-[10px] text-slate-400 flex justify-between items-center">
                    <span>Cát-xê đề xuất:</span>
                    <b className="text-white font-bold">{job.budget}</b>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Services Section */}
          <div className="space-y-4">
            <h3 className="font-display font-extrabold text-xs text-white uppercase tracking-wider">📸 Dịch Vụ Hỗ Trợ Độc Quyền</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl glass-panel-light p-4 text-center hover:bg-white/5 transition-all duration-300 border border-white/5 group">
                <span className="text-2xl group-hover:scale-110 transition-transform block">📷</span>
                <h4 className="text-xs font-bold text-white mt-2">Photographer Pro</h4>
                <p className="text-[9px] text-slate-500 mt-1 font-medium">Giảm 10% gói chụp portfolio</p>
              </div>
              <div className="rounded-2xl glass-panel-light p-4 text-center hover:bg-white/5 transition-all duration-300 border border-white/5 group">
                <span className="text-2xl group-hover:scale-110 transition-transform block">💄</span>
                <h4 className="text-xs font-bold text-white mt-2">Stylist & Makeup</h4>
                <p className="text-[9px] text-slate-500 mt-1 font-medium">Trang điểm lookbook chuyên nghiệp</p>
              </div>
              <div className="rounded-2xl glass-panel-light p-4 text-center hover:bg-white/5 transition-all duration-300 border border-white/5 group col-span-2 sm:col-span-1">
                <span className="text-2xl group-hover:scale-110 transition-transform block">🎓</span>
                <h4 className="text-xs font-bold text-white mt-2">Catwalk Academy</h4>
                <p className="text-[9px] text-slate-500 mt-1 font-medium">Khóa đào tạo kỹ năng catwalk VIP</p>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Profile and completeness details (1/3 width) */}
        <div className="space-y-6">
          
          {/* Profile Card */}
          <div className="relative overflow-hidden rounded-2xl glass-panel p-6 shadow-2xl border-glow-gold">
            <div className="absolute top-0 right-0 -z-10 h-32 w-32 rounded-full bg-amber-400/5 blur-3xl" />
            
            <div className="flex flex-col items-center text-center pb-5 border-b border-white/5">
              <div className="relative h-20 w-20 rounded-full border border-amber-400/30 p-1 shadow-[0_0_15px_rgba(245,158,11,0.15)] mb-4">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              
              <div className="flex items-center gap-2 justify-center">
                <h2 className="font-display text-sm font-black text-white uppercase tracking-wider">{profile.name}</h2>
                <span className={cn(
                  "inline-block rounded border px-1.5 py-0.2 font-display text-[7px] font-extrabold uppercase tracking-widest",
                  profile.tier === "S" && "border-amber-400 bg-amber-400/10 text-amber-400",
                  profile.tier === "A" && "border-slate-300 bg-slate-400/10 text-slate-200",
                  profile.tier === "B" && "border-purple-400 bg-purple-500/10 text-purple-300",
                  profile.tier === "C" && "border-emerald-400 bg-emerald-500/10 text-emerald-300"
                )}>
                  Tier {profile.tier}
                </span>
              </div>
              
              <p className="text-[10px] text-amber-400 font-semibold mt-1.5">{profile.mainCategory || "Chưa hoàn thiện khảo sát"}</p>
              <p className="text-[9px] text-slate-500 mt-1 uppercase font-bold tracking-wider">{profile.location} • {(profile.followersCount / 1000).toFixed(0)}k followers</p>
            </div>

            {/* Profile completeness */}
            <div className="mt-5 space-y-2.5">
              <div className="flex justify-between items-center text-[10px] text-slate-400">
                <span className="font-bold uppercase tracking-wider">Độ hoàn thiện hồ sơ</span>
                <span className="font-bold text-amber-400">{profile.profileScore || 0}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-200 to-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)] transition-all duration-500"
                  style={{ width: `${profile.profileScore || 0}%` }}
                />
              </div>
              {profile.profileScore < 90 && (
                <button
                  onClick={() => router.push("/talent/onboarding")}
                  className="flex items-center text-[9px] font-bold text-amber-400 uppercase tracking-widest hover:text-amber-300 mt-3 transition-colors cursor-pointer"
                >
                  Hoàn thiện hồ sơ ngay <ChevronRight className="ml-1 h-3 w-3" />
                </button>
              )}
            </div>
          </div>

          {/* AI Recommendation Alert card */}
          <div className="rounded-2xl glass-panel p-5 space-y-3.5 border-glow-purple bg-gradient-to-br from-[#0e0a24]/30 to-transparent">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5 text-purple-400" />
              <h4 className="font-display font-extrabold text-[10px] text-white uppercase tracking-wider">Trợ Lý Định Hướng AI</h4>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
              Hệ thống ghi nhận bạn có lợi thế hình ảnh rất lớn trên Instagram. 
              Hãy liên kết tài khoản TikTok để AI quét lượng tương tác và nâng cấp thứ hạng của bạn lên <b className="text-purple-400">Tier S</b> (Celeb VIP).
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
