"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, BookmarkCheck, Crown, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BottomNavigation() {
  const pathname = usePathname();

  // Guard: only render the bottom nav inside the app portals.
  if (!pathname.startsWith("/talent") && !pathname.startsWith("/brand")) {
    return null;
  }

  const navItems = pathname.startsWith("/brand") ? [
    {
      label: "Tổng quan",
      icon: Home,
      href: "/brand/dashboard",
    },
    {
      label: "Tìm kiếm",
      icon: Search,
      href: "/brand/discover",
    },
    {
      label: "Shortlist",
      icon: BookmarkCheck,
      href: "/brand/shortlists",
    },
    {
      label: "Campaign",
      icon: Briefcase,
      href: "/brand/campaigns",
    },
    {
      label: "Hồ sơ",
      icon: User,
      href: "/brand/settings",
    },
  ] : [
    {
      label: "Home",
      icon: Home,
      href: "/talent/dashboard",
    },
    {
      label: "Jobs",
      icon: Briefcase,
      href: "/talent/jobs",
    },
    {
      label: "Quỹ Vương Miện",
      icon: Crown,
      href: "/talent/crown",
    },
    {
      label: "Profile",
      icon: User,
      href: "/talent/portfolio",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4 pb-4 md:hidden">
      <nav className="flex h-16 w-full max-w-md items-center justify-around rounded-2xl border border-white/10 bg-slate-950/70 px-2 shadow-2xl backdrop-blur-xl">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/talent/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className="group flex flex-col items-center justify-center gap-1 py-1"
            >
              <div
                className={cn(
                  "relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 group-active:scale-90",
                  isActive
                    ? "bg-gradient-to-br from-amber-200 via-amber-400 to-yellow-600 text-slate-950 shadow-[0_0_12px_rgba(251,191,36,0.35)]"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <span
                className={cn(
                  "text-[10px] font-semibold tracking-wider uppercase transition-colors duration-300",
                  isActive ? "text-amber-400 font-bold" : "text-slate-500"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
