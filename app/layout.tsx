"use client";

import { Outfit } from "next/font/google";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import BottomNavigation from "@/components/BottomNavigation";
import { 
  Home, User, Briefcase, Crown, MessageSquare, Calendar, Wallet, Settings, 
  Sparkles, Shield, LogOut, LayoutDashboard, ChevronRight, Bell, Search 
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
  const router = useRouter();

  // Determine active portal type
  const isTalent = pathname.startsWith("/talent");
  const isBrand = pathname.startsWith("/brand");
  const isAdmin = pathname.startsWith("/admin");
  const isGateway = pathname === "/";

  // Sidebar Menu Items based on portal
  const talentMenuItems = [
    { label: "Dashboard", icon: Home, href: "/talent/dashboard" },
    { label: "Khảo sát", icon: Sparkles, href: "/talent/onboarding" },
    { label: "Portfolio", icon: User, href: "/talent/portfolio" },
    { label: "Jobs Marketplace", icon: Briefcase, href: "/talent/jobs" },
    { label: "Quỹ Vương Miện", icon: Crown, href: "/talent/crown" },
    { label: "Lịch Trình", icon: Calendar, href: "/talent/calendar" },
    { label: "Tin Nhắn", icon: MessageSquare, href: "/talent/messages" },
    { label: "Thu Nhập", icon: Wallet, href: "/talent/wallet" },
    { label: "Cài Đặt", icon: Settings, href: "/talent/settings" },
  ];

  const brandMenuItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/brand/dashboard" },
    { label: "Campaigns", icon: Briefcase, href: "/brand/campaigns" },
    { label: "Discover Talents", icon: Sparkles, href: "/brand/discover" },
    { label: "Escrow & Bookings", icon: Shield, href: "/brand/bookings" },
    { label: "Messages", icon: MessageSquare, href: "/brand/messages" },
    { label: "Settings", icon: Settings, href: "/brand/settings" },
  ];

  const adminMenuItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
    { label: "Duyệt Hồ Sơ", icon: User, href: "/admin/users" },
    { label: "Giao Dịch Escrow", icon: Shield, href: "/admin/transactions" },
    { label: "Tranh Chấp", icon: Shield, href: "/admin/disputes" },
    { label: "Settings", icon: Settings, href: "/admin/settings" },
  ];

  const currentMenuItems = isTalent ? talentMenuItems : isBrand ? brandMenuItems : isAdmin ? adminMenuItems : [];
  const portalName = isTalent ? "Talent App" : isBrand ? "Brand Portal" : isAdmin ? "Admin Portal" : "";

  if (isAdmin) {
    return (
      <html lang="vi" className={`${outfit.variable} h-full dark antialiased`} style={{ colorScheme: "dark" }}>
        <body className="h-full bg-[#08090f] text-slate-100 font-sans selection:bg-amber-500/30 selection:text-amber-200">
          <ThemeProvider>
            <div className="flex h-screen w-screen overflow-hidden bg-[#08090f]">
              {children}
            </div>
          </ThemeProvider>
        </body>
      </html>
    );
  }

  return (
    <html lang="vi" className={`${outfit.variable} h-full dark antialiased`} style={{ colorScheme: "dark" }}>
      <body className="h-full bg-[#03050c] text-slate-100 font-sans selection:bg-amber-500/30 selection:text-amber-200">
        <ThemeProvider>
          <div className="flex flex-col h-screen w-screen overflow-hidden relative">
            
            {/* Ambient background glows */}
            <div className="absolute top-[-10%] right-[-10%] -z-10 h-[600px] w-[600px] rounded-full bg-amber-500/5 blur-[150px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] -z-10 h-[700px] w-[700px] rounded-full bg-purple-600/5 blur-[160px] pointer-events-none" />

            {/* DESKTOP TOP BAR (Full width header at the top) */}
            {!isGateway && (
              <header className="sticky top-0 z-50 hidden md:flex h-16 shrink-0 items-center justify-between border-b border-white/5 bg-[#070913]/80 px-8 backdrop-blur-md">
                {/* Logo Section */}
                <div className="flex items-center gap-3 w-64 shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-b from-[#141830] to-[#0a0c1a] border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                    <span className="text-xl">👑</span>
                  </div>
                  <div>
                    <h1 className="font-display font-black text-sm tracking-widest text-white uppercase leading-none">
                      BEAUTY<span className="text-gradient-gold">TALENT</span>
                    </h1>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block mt-1">
                      {portalName}
                    </span>
                  </div>
                </div>

                {/* Searchbox in the header */}
                <div className="flex-1 flex items-center gap-4 max-w-md ml-4">
                  <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input 
                      type="text" 
                      placeholder="Tìm kiếm tài năng, chiến dịch, giao dịch..."
                      className="w-full rounded-xl border border-white/5 bg-slate-900/30 py-2 pl-9 pr-4 text-xs text-white focus:border-amber-400/50 focus:outline-none focus:bg-slate-900/50 transition-all"
                    />
                  </div>
                </div>
                
                {/* Notifications & Profile info */}
                <div className="flex items-center gap-6">
                  <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/5 bg-slate-900/30 text-slate-400 hover:text-white transition-colors">
                    <Bell className="h-4.5 w-4.5" />
                    <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-red-500" />
                  </button>
                  <div className="flex items-center gap-3 border-l border-white/5 pl-6">
                    <img 
                      src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=50&h=50&q=80" 
                      alt="Profile avatar" 
                      className="h-9 w-9 rounded-full object-cover border border-amber-400/30"
                    />
                    <div className="text-left">
                      <span className="block text-xs font-bold text-white">Quản trị viên</span>
                      <span className="block text-[10px] text-slate-500">Developer Portal</span>
                    </div>
                  </div>
                </div>
              </header>
            )}

            {/* Bottom Section: Sidebar + Main Content */}
            <div className="flex flex-1 overflow-hidden relative">
              
              {/* DESKTOP SIDEBAR (Visible only on md screens and up, hidden on root gateway) */}
              {!isGateway && currentMenuItems.length > 0 && (
                <aside className="hidden md:flex w-72 shrink-0 flex-col border-r border-white/5 bg-[#050711] p-6 relative">
                  
                  {/* Sidebar Navigation Links (Logo Section has been moved to Header) */}
                  <nav className="flex-1 space-y-2 overflow-y-auto pr-1">
                    {currentMenuItems.map((item) => {
                      const isActive = pathname === item.href || (item.href.split("/").length > 3 && pathname.startsWith(item.href));
                      const Icon = item.icon;

                      return (
                        <Link
                          key={item.label}
                          href={item.href}
                          className={cn(
                            "flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 group relative",
                            isActive
                              ? "bg-gradient-to-r from-amber-400/10 to-yellow-600/5 text-amber-300 border border-amber-500/20 shadow-[0_4px_12px_rgba(245,158,11,0.05)]"
                              : "text-slate-400 hover:bg-white/2 hover:text-slate-100 border border-transparent"
                          )}
                        >
                          {isActive && (
                            <div className="absolute left-0 top-1/3 bottom-1/3 w-0.5 rounded bg-amber-400" />
                          )}
                          <Icon className={cn("h-4.5 w-4.5 transition-transform duration-300 group-hover:scale-110", isActive ? "text-amber-400" : "text-slate-400 group-hover:text-slate-100")} />
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </nav>

                  {/* Footer Switch Portal */}
                  <div className="border-t border-white/5 pt-4 mt-auto">
                    <button 
                      onClick={() => router.push("/")}
                      className="flex w-full items-center justify-between rounded-xl border border-white/5 bg-slate-950/40 px-4 py-3 text-[11px] font-bold text-slate-400 hover:border-amber-400/40 hover:text-white hover:bg-slate-900/20 transition-all cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <LogOut className="h-4 w-4" /> Đổi Cổng Portal
                      </span>
                      <ChevronRight className="h-3 w-3" />
                    </button>
                  </div>
                </aside>
              )}

              {/* MAIN APP CONTENT */}
              <div className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Main scrollable body */}
                <main className="flex-1 overflow-y-auto px-6 py-6 md:px-10 md:py-8 pb-24 md:pb-8">
                  <div className="mx-auto w-full max-w-6xl">
                    {children}
                  </div>
                </main>
              </div>

            </div>

            {/* Mobile Bottom Navigation menu */}
            <BottomNavigation />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
