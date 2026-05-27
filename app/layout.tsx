"use client";

import { Outfit } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import BottomNavigation from "@/components/BottomNavigation";
import { 
  Home, User, Briefcase, Crown, MessageSquare, Calendar, Wallet, Settings, 
  Sparkles, Shield, LogOut, LayoutDashboard, ChevronRight, Bell, Search,
  Building2, Megaphone, BarChart3, FileWarning, RadioTower, Activity
} from "lucide-react";
import { cn } from "@/lib/utils";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Determine active portal type
  const isTalent = pathname.startsWith("/talent");
  const isBrand = pathname.startsWith("/brand");
  const isAdmin = pathname.startsWith("/admin");
  const isGateway = pathname === "/";

  // Sidebar Menu Items based on portal
  const talentMenuItems = [
    { label: "Tổng quan", icon: Home, href: "/talent/dashboard" },
    { label: "Nhập hồ sơ", icon: Sparkles, href: "/talent/onboarding" },
    { label: "Hồ sơ năng lực", icon: User, href: "/talent/portfolio" },
    { label: "Việc phù hợp", icon: Briefcase, href: "/talent/jobs" },
    { label: "Quỹ vương miện", icon: Crown, href: "/talent/crown" },
    { label: "Lịch trình", icon: Calendar, href: "/talent/calendar" },
    { label: "Tin nhắn", icon: MessageSquare, href: "/talent/messages" },
    { label: "Thu nhập", icon: Wallet, href: "/talent/wallet" },
    { label: "Cài đặt", icon: Settings, href: "/talent/settings" },
  ];

  const brandMenuItems = [
    { label: "Tổng quan", icon: LayoutDashboard, href: "/brand/dashboard" },
    { label: "Chiến dịch", icon: Briefcase, href: "/brand/campaigns" },
    { label: "Tìm tài năng", icon: Sparkles, href: "/brand/discover" },
    { label: "Ký quỹ & Booking", icon: Shield, href: "/brand/bookings" },
    { label: "Tin nhắn", icon: MessageSquare, href: "/brand/messages" },
    { label: "Cài đặt", icon: Settings, href: "/brand/settings" },
  ];

  const adminMenuItems = [
    { label: "Tổng quan", icon: LayoutDashboard, href: "/admin/dashboard" },
    { label: "Tài năng", icon: User, href: "/admin/talents" },
    { label: "Nhãn hàng", icon: Building2, href: "/admin/brands" },
    { label: "Chiến dịch", icon: Megaphone, href: "/admin/campaigns" },
    { label: "Công việc", icon: Briefcase, href: "/admin/jobs" },
    { label: "Thanh toán & Ký quỹ", icon: Wallet, href: "/admin/payments-escrow" },
    { label: "Cuộc thi", icon: Crown, href: "/admin/competitions" },
    { label: "Phân tích", icon: BarChart3, href: "/admin/analytics" },
    { label: "Kiểm duyệt", icon: Shield, href: "/admin/moderation" },
    { label: "Quản trị nội dung", icon: FileWarning, href: "/admin/cms" },
    { label: "Người dùng & Quyền", icon: User, href: "/admin/users-permissions" },
    { label: "Thông báo", icon: RadioTower, href: "/admin/notifications" },
    { label: "Cài đặt", icon: Settings, href: "/admin/settings" },
    { label: "Nhật ký hệ thống", icon: Activity, href: "/admin/audit-logs" },
  ];

  const currentMenuItems = isTalent ? talentMenuItems : isBrand ? brandMenuItems : isAdmin ? adminMenuItems : [];
  const portalName = isTalent ? "Cổng tài năng" : isBrand ? "Cổng nhãn hàng" : isAdmin ? "Cổng quản trị" : "";

  return (
    <html lang="vi" className={`${outfit.variable} h-full dark antialiased`} style={{ colorScheme: "dark" }}>
      <body className="h-full bg-[#03050c] text-slate-100 font-sans selection:bg-amber-500/30 selection:text-amber-200">
        <ThemeProvider>
          <div className="flex h-screen w-screen overflow-hidden">
            
            {/* Ambient background glows */}
            <div className="absolute top-[-10%] right-[-10%] -z-10 h-[500px] w-[500px] rounded-full bg-amber-500/3 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] -z-10 h-[600px] w-[600px] rounded-full bg-purple-600/3 blur-[140px] pointer-events-none" />

            {/* DESKTOP SIDEBAR (Visible only on md screens and up, hidden on root gateway) */}
            {!isGateway && currentMenuItems.length > 0 && (
              <aside className="hidden md:flex w-72 shrink-0 flex-col border-r border-white/5 bg-[#070913] p-6">
                {/* Logo Section */}
                <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/10 border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]">
                    <Crown className="h-5 w-5 text-amber-300" />
                  </div>
                  <div>
                    <h1 className="font-display font-extrabold text-sm tracking-wide text-white uppercase">
                      BEAUTY<span className="bg-gradient-to-r from-amber-200 to-yellow-600 bg-clip-text text-transparent">TALENT</span>
                    </h1>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mt-0.5">
                      {portalName}
                    </span>
                  </div>
                </div>

                {/* Sidebar Navigation Links */}
                <nav className="flex-1 space-y-1.5 overflow-y-auto pr-1">
                  {currentMenuItems.map((item) => {
                    const isActive = pathname === item.href || (item.href.split("/").length > 3 && pathname.startsWith(item.href));
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 group",
                          isActive
                            ? "bg-gradient-to-r from-amber-400 to-yellow-600 text-slate-950 shadow-lg shadow-amber-500/10"
                            : "text-slate-400 hover:bg-white/3 hover:text-white"
                        )}
                      >
                        <Icon className={cn("h-4.5 w-4.5 transition-transform duration-200 group-hover:scale-110", isActive ? "text-slate-950" : "text-slate-400 group-hover:text-white")} />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>

                {/* Footer Switch Portal */}
                <div className="border-t border-white/5 pt-4 mt-auto">
                  <Link
                    href="/"
                    className="flex w-full items-center justify-between rounded-xl border border-white/5 bg-slate-900/30 px-4 py-3 text-xs font-semibold text-slate-400 hover:border-amber-400/40 hover:text-white transition-all"
                  >
                    <span className="flex items-center gap-2">
                      <LogOut className="h-4 w-4" /> Đổi cổng truy cập
                    </span>
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              </aside>
            )}

            {/* MAIN APP CONTAINER */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">
              
              {/* DESKTOP TOP BAR (Only visible on md screens and up when inside a portal) */}
              {!isGateway && (
                <header className="hidden md:flex h-16 shrink-0 items-center justify-between border-b border-white/5 bg-[#070913]/30 px-8 backdrop-blur-md">
                  <div className="flex items-center gap-4 w-96">
                    <div className="relative w-full">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                      <input 
                        type="text" 
                        placeholder="Tìm kiếm tài năng, chiến dịch, giao dịch..."
                        className="w-full rounded-xl border border-white/5 bg-slate-900/30 py-2 pl-9 pr-4 text-xs text-white focus:border-amber-400/50 focus:outline-none focus:bg-slate-900/50"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/5 bg-slate-900/30 text-slate-400 hover:text-white transition-colors">
                      <Bell className="h-4.5 w-4.5" />
                      <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-red-500" />
                    </button>
                    <div className="flex items-center gap-3 border-l border-white/5 pl-6">
                      <img 
                        src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=50&h=50&q=80" 
                        alt="Ảnh đại diện quản trị viên" 
                        className="h-9 w-9 rounded-full object-cover border border-amber-400/30"
                      />
                      <div className="text-left">
                        <span className="block text-xs font-bold text-white">Quản trị viên</span>
                        <span className="block text-[10px] text-slate-500">Cổng vận hành</span>
                      </div>
                    </div>
                  </div>
                </header>
              )}

              {/* Main scrollable body */}
              <main className="flex-1 overflow-y-auto px-6 py-6 md:px-10 md:py-8 pb-24 md:pb-8">
                <div className="mx-auto w-full max-w-6xl">
                  {children}
                </div>
              </main>

            </div>

            {/* Mobile Bottom Navigation menu */}
            <BottomNavigation />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

