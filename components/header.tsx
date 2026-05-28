"use client";

import { Bell, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 hidden md:flex h-16 shrink-0 items-center justify-between border-b border-white/5 bg-[#070913]/80 px-8 backdrop-blur-md">
      {/* Logo Section */}
      <div className="flex items-center gap-3 w-64 shrink-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-b from-[#141830] to-[#0a0c1a] border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
          <span className="text-xl">👑</span>
        </div>
        <div>
          <h1 className="text-xl font-display font-black tracking-widest leading-none text-white">
            <span className="text-gradient-gold">Onstage</span>VN
          </h1>
        </div>
      </div>

      {/* Searchbox */}
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

      {/* Notifications & Profile */}
      <div className="flex items-center gap-6">
        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/5 bg-slate-900/30 text-slate-400 hover:text-white transition-colors">
          <Bell className="h-4.5 w-4.5" />
          <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-red-500" />
        </button>
        <div className="flex items-center gap-3 border-l border-white/5 pl-6">
          <img
            src="/avatar.png"
            alt="Profile avatar"
            className="h-9 w-9 rounded-full object-cover border border-amber-400/30"
          />
          <div className="text-left">
            <span className="block text-xs font-bold text-white">Nguyễn Mai Anh</span>
            <span className="block text-[10px] text-slate-500">Tier A</span>
          </div>
        </div>
      </div>
    </header>
  );
}
