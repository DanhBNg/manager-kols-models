"use client";

import Link from "next/link";
import { User, Briefcase, Sparkles, Star, ChevronRight } from "lucide-react";

export default function RootGatewayPage() {
  return (
    <div className="relative flex min-h-[90vh] flex-col items-center justify-center text-center px-4 py-12 overflow-hidden">
      
      {/* Decorative luxury glowing backgrounds */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-b from-amber-500/5 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 -z-10 h-[350px] w-[350px] rounded-full bg-purple-650/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 -z-10 h-[350px] w-[350px] rounded-full bg-blue-650/5 blur-[100px] pointer-events-none" />

      {/* Enlarged, Borderless Logo Image */}
      <div className="relative mb-2 flex items-center justify-center group">
        {/* Gold pulsing backdrop glow */}
        <div className="absolute inset-0 -z-10 h-32 w-32 rounded-full bg-amber-500/10 blur-3xl group-hover:scale-125 transition-transform duration-1000 animate-pulse pointer-events-none" />
        <img 
          src="/logo_icon.png" 
          alt="OnstageVN Logo" 
          className="h-28 w-28 object-contain relative z-10 transition-transform duration-700 hover:scale-105" 
        />
      </div>

      {/* Title & Brand Header Block */}
      <div className="space-y-4 mb-12 max-w-xl flex flex-col items-center">
        <img 
          src="/logo_text.png" 
          alt="OnstageVN Logo Text" 
          className="h-16 md:h-20 object-contain" 
        />
        
        <p className="text-xs md:text-[13px] leading-relaxed text-slate-400 font-medium max-w-md mx-auto pt-2">
          Nền tảng công nghệ tối tân giúp kiến tạo hồ sơ số chuyên nghiệp, định hướng AI và tự động kết nối nhãn hàng cho các thế hệ tài năng sắc đẹp.
        </p>
      </div>

      {/* Grid of Portals with luxury styling */}
      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6 px-2">

        {/* Talent Portal Card */}
        <Link
          href="/talent"
          className="group relative flex flex-col justify-between items-start rounded-3xl bg-[#090b16]/40 border border-white/5 hover:border-amber-400/30 p-8 text-left transition-all duration-500 hover:bg-[#0c0f24]/60 hover:shadow-[0_0_30px_rgba(245,158,11,0.08)] backdrop-blur-xl"
        >
          {/* Subtle gold accent light inside the card */}
          <div className="absolute top-0 left-0 w-24 h-24 bg-amber-400/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          
          <div className="flex justify-between items-center w-full mb-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400/10 text-amber-300 border border-amber-400/20 group-hover:bg-gradient-to-r group-hover:from-amber-200 group-hover:to-yellow-500 group-hover:text-slate-950 transition-all duration-500 shadow-[0_0_15px_rgba(245,158,11,0.15)] group-hover:scale-105">
              <User className="h-6 w-6" />
            </div>
            
            <span className="text-[9px] font-black uppercase tracking-widest bg-amber-400/15 border border-amber-400/30 px-3 py-1 rounded-full text-amber-300 shadow-sm">
              Talent Portal
            </span>
          </div>

          <div className="space-y-4 w-full">
            <div>
              <h3 className="text-base font-black text-white group-hover:text-amber-300 transition-colors uppercase tracking-wider">
                Kênh Người Mẫu & KOLs
              </h3>
              <p className="text-[11px] text-slate-400 mt-2 leading-relaxed font-medium">
                Dành cho Model, KOL, Hoa khôi, MC. Khảo sát năng lực, tạo hồ sơ số, Rate Card & nhận lịch diễn tự động.
              </p>
            </div>

            {/* List of sub-features */}
            <div className="pt-3 border-t border-white/5 space-y-2 text-[10px] text-slate-450 font-semibold">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                <span>Khảo sát định hướng AI thông minh</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                <span>Hồ sơ số & Phân hạng Tier chuyên nghiệp</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                <span>Nhận booking & Đặt lịch trực tiếp</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-1 text-[10px] font-black text-amber-300 group-hover:translate-x-1 transition-transform uppercase tracking-wider">
              Khám phá ngay <ChevronRight className="h-4 w-4" />
            </div>
          </div>
        </Link>

        {/* Brand Portal Card */}
        <Link
          href="/brand"
          className="group relative flex flex-col justify-between items-start rounded-3xl bg-[#090b16]/40 border border-white/5 hover:border-purple-500/30 p-8 text-left transition-all duration-500 hover:bg-[#0c0f24]/60 hover:shadow-[0_0_30px_rgba(168,85,247,0.08)] backdrop-blur-xl"
        >
          {/* Subtle purple accent light inside the card */}
          <div className="absolute top-0 left-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

          <div className="flex justify-between items-center w-full mb-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-300 border border-purple-500/20 group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-fuchsia-500 group-hover:text-slate-950 transition-all duration-500 shadow-[0_0_15px_rgba(168,85,247,0.15)] group-hover:scale-105">
              <Briefcase className="h-6 w-6" />
            </div>
            
            <span className="text-[9px] font-black uppercase tracking-widest bg-purple-500/15 border border-purple-500/30 px-3 py-1 rounded-full text-purple-300 shadow-sm">
              Brand Portal
            </span>
          </div>

          <div className="space-y-4 w-full">
            <div>
              <h3 className="text-base font-black text-white group-hover:text-purple-300 transition-colors uppercase tracking-wider">
                Kênh Nhãn Hàng & Agency
              </h3>
              <p className="text-[11px] text-slate-400 mt-2 leading-relaxed font-medium">
                Dành cho Doanh nghiệp, Thương hiệu và Quản lý. Tìm kiếm tài năng bằng bộ lọc AI, khởi tạo chiến dịch & quản lý tài chính.
              </p>
            </div>

            {/* List of sub-features */}
            <div className="pt-3 border-t border-white/5 space-y-2 text-[10px] text-slate-450 font-semibold">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400 shrink-0" />
                <span>Tìm kiếm & Lọc hồ sơ Model, KOLs bằng AI</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400 shrink-0" />
                <span>Tạo chiến dịch, gom nhóm danh sách tuyển chọn</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400 shrink-0" />
                <span>Đặt cọc an toàn & thanh toán cát-xê tự động</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-1 text-[10px] font-black text-purple-300 group-hover:translate-x-1 transition-transform uppercase tracking-wider">
              Khám phá ngay <ChevronRight className="h-4 w-4" />
            </div>
          </div>
        </Link>

      </div>
    </div>
  );
}
