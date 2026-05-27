"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Shield, Users, ShieldAlert, Gavel, BarChart3, 
  LayoutDashboard, Megaphone, Briefcase, Coins, 
  Trophy, FolderOpen, UserCheck, Activity, Bell, 
  Settings, ChevronRight, ArrowLeft, Search, Check, 
  X, Filter, Eye, AlertTriangle, RefreshCw, Send,
  Lock, ArrowUpRight, Radio, ShieldCheck, HelpCircle,
  Clock, Database, Plus, Sparkles, MessageSquare
} from "lucide-react";

// Mock Data representing the VNP BeautyTalent Ecosystem
interface Talent {
  id: string;
  name: string;
  avatar: string;
  tier: "S" | "A" | "B" | "C";
  role: string;
  matchingScore: number;
  status: "Chờ duyệt hồ sơ" | "Chờ duyệt Tier" | "Đã duyệt" | "Bị từ chối";
  email: string;
  followers: string;
}

interface Brand {
  id: string;
  name: string;
  logo: string;
  sector: string;
  escrowBalance: string;
  status: "Chờ tích xanh" | "Đã duyệt" | "Tạm khóa";
  campaignsCount: number;
}

interface EscrowTransaction {
  id: string;
  campaign: string;
  brand: string;
  talent: string;
  amount: string;
  status: "Đang giữ" | "Đã giải ngân" | "Tranh chấp" | "Đã hoàn trả";
  date: string;
}

interface Dispute {
  id: string;
  campaign: string;
  brand: string;
  talent: string;
  amount: string;
  reason: string;
  status: "Chờ Trọng Tài" | "Đã giải quyết" | "Đang thương lượng";
  date: string;
}

export default function AdminControlCenter() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("Dashboard");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [toasts, setToasts] = useState<{ id: number; message: string; type: "success" | "warning" | "info" }[]>([]);

  // Function to trigger a toast notification
  const addToast = (message: string, type: "success" | "warning" | "info" = "success") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // State management for mock data to allow real-time interactivity
  const [talents, setTalents] = useState<Talent[]>([
    { id: "TL1082", name: "Nguyễn Mai Anh", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&q=80", tier: "A", role: "Model / KOL", matchingScore: 87, status: "Chờ duyệt hồ sơ", email: "maianh.nguyen@gmail.com", followers: "420K" },
    { id: "TL9182", name: "Lê Thu Hương", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80", tier: "S", role: "Pageant Queen", matchingScore: 94, status: "Đã duyệt", email: "thuhuong.le@gmail.com", followers: "1.2M" },
    { id: "TL4402", name: "Trần Minh Tú", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&q=80", tier: "B", role: "Runway Model", matchingScore: 78, status: "Chờ duyệt Tier", email: "minhtu.tran@gmail.com", followers: "185K" },
    { id: "TL2204", name: "Hoàng Yến Chi", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80", tier: "A", role: "KOL / Beauty", matchingScore: 82, status: "Chờ duyệt hồ sơ", email: "yenchi.hoang@gmail.com", followers: "310K" },
    { id: "TL3311", name: "Phạm Hải Đăng", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80", tier: "C", role: "Commercial Actor", matchingScore: 69, status: "Đã duyệt", email: "haidang.pham@gmail.com", followers: "95K" },
  ]);

  const [brands, setBrands] = useState<Brand[]>([
    { id: "BR8801", name: "Glow Beauty Cosmetics", logo: "💅", sector: "Mỹ phẩm & Chăm sóc da", escrowBalance: "120,000,000 VND", status: "Chờ tích xanh", campaignsCount: 3 },
    { id: "BR4402", name: "Diamond Luxury Fashion", logo: "💎", sector: "Thời trang cao cấp", escrowBalance: "450,000,000 VND", status: "Đã duyệt", campaignsCount: 12 },
    { id: "BR1109", name: "Saigon Summer Vibe", logo: "🌸", sector: "Trang sức & Phụ kiện", escrowBalance: "15,000,000 VND", status: "Chờ tích xanh", campaignsCount: 1 },
    { id: "BR9954", name: "L'Oreal Vietnam", logo: "💄", sector: "Mỹ phẩm toàn cầu", escrowBalance: "890,000,000 VND", status: "Đã duyệt", campaignsCount: 24 },
  ]);

  const [transactions, setTransactions] = useState<EscrowTransaction[]>([
    { id: "TX89012", campaign: "Mega Beauty Live 2026", brand: "Glow Beauty Cosmetics", talent: "Nguyễn Mai Anh", amount: "45,000,000 VND", status: "Đang giữ", date: "27/05/2026" },
    { id: "TX89013", campaign: "Fashion Show Spring/Summer", brand: "Diamond Luxury Fashion", talent: "Lê Thu Hương", amount: "120,000,000 VND", status: "Đang giữ", date: "26/05/2026" },
    { id: "TX89014", campaign: "KOL Review New Lipsticks", brand: "Saigon Summer Vibe", talent: "Hoàng Yến Chi", amount: "15,000,000 VND", status: "Tranh chấp", date: "25/05/2026" },
    { id: "TX89015", campaign: "Brand Ambassador Campaign", brand: "L'Oreal Vietnam", talent: "Lê Thu Hương", amount: "350,000,000 VND", status: "Đã giải ngân", date: "20/05/2026" },
  ]);

  const [disputes, setDisputes] = useState<Dispute[]>([
    { id: "DP4021", campaign: "Fashion Show Spring/Summer", brand: "Diamond Luxury Fashion", talent: "Lê Thu Hương", amount: "75,000,000 VND", reason: "Huỷ hợp đồng đơn phương sát ngày diễn ra sự kiện.", status: "Chờ Trọng Tài", date: "27/05/2026" },
    { id: "DP4022", campaign: "KOL Review New Lipsticks", brand: "Saigon Summer Vibe", talent: "Hoàng Yến Chi", amount: "15,000,000 VND", reason: "Chất lượng hình ảnh không đạt tiêu chuẩn như cam kết trong hợp đồng.", status: "Đang thương lượng", date: "25/05/2026" },
  ]);

  // Live Activities state
  const [liveActivities, setLiveActivities] = useState([
    { text: "Brand Glow Beauty created campaign Mega Beauty Live.", time: "3 MIN AGO" },
    { text: "Talent Mai Anh accepted booking #BK12082.", time: "4 MIN AGO" },
    { text: "Talent Thu Huong requested cashout 15,000,000 VND.", time: "12 MIN AGO" },
    { text: "Brand Diamond Luxury updated campaign terms.", time: "25 MIN AGO" }
  ]);

  // Interactive functions
  const handleApproveTalent = (id: string, name: string) => {
    setTalents(prev => prev.map(t => t.id === id ? { ...t, status: "Đã duyệt" } : t));
    addToast(`Đã phê duyệt hồ sơ Talent: ${name}`, "success");
    setLiveActivities(prev => [{ text: `Admin approved talent ${name} profile.`, time: "JUST NOW" }, ...prev]);
  };

  const handleVerifyTier = (id: string, name: string, tier: "S" | "A" | "B" | "C") => {
    setTalents(prev => prev.map(t => t.id === id ? { ...t, status: "Đã duyệt", tier } : t));
    addToast(`Đã nâng hạng Tier ${tier} và kích hoạt tài khoản của ${name}`, "success");
    setLiveActivities(prev => [{ text: `Admin verified talent ${name} as Tier ${tier}.`, time: "JUST NOW" }, ...prev]);
  };

  const handleVerifyBrand = (id: string, name: string) => {
    setBrands(prev => prev.map(b => b.id === id ? { ...b, status: "Đã duyệt" } : b));
    addToast(`Đã phê duyệt tích xanh doanh nghiệp cho: ${name}`, "success");
    setLiveActivities(prev => [{ text: `Admin verified brand ${name} (Blue badge granted).`, time: "JUST NOW" }, ...prev]);
  };

  const handleReleaseEscrow = (id: string, amount: string) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: "Đã giải ngân" } : t));
    addToast(`Giải ngân Escrow thành công: ${amount}`, "success");
    setLiveActivities(prev => [{ text: `Admin released escrow holding ${id} (${amount}).`, time: "JUST NOW" }, ...prev]);
  };

  const handleRefundEscrow = (id: string, amount: string) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: "Đã hoàn trả" } : t));
    addToast(`Hoàn trả Escrow về ví Brand thành công: ${amount}`, "warning");
    setLiveActivities(prev => [{ text: `Admin refunded escrow holding ${id} (${amount}).`, time: "JUST NOW" }, ...prev]);
  };

  const handleArbitrateDispute = (id: string, favor: "brand" | "talent", amount: string) => {
    setDisputes(prev => prev.map(d => d.id === id ? { ...d, status: "Đã giải quyết" } : d));
    // Update matching transaction status too
    const disputeItem = disputes.find(d => d.id === id);
    if (disputeItem) {
      setTransactions(prev => prev.map(t => (t.brand === disputeItem.brand && t.talent === disputeItem.talent) ? { ...t, status: favor === "brand" ? "Đã hoàn trả" : "Đã giải ngân" } : t));
    }
    
    addToast(`Phán quyết Dispute ${id}: ${favor === "brand" ? "Hoàn trả Brand" : "Giải ngân Talent"}`, "success");
    setLiveActivities(prev => [{ text: `Arbitrator resolved dispute ${id} in favor of ${favor === "brand" ? "Brand" : "Talent"}.`, time: "JUST NOW" }, ...prev]);
  };

  // Sidebar navigation menu
  const sidebarItems = [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "Talents", icon: Users },
    { label: "Brands", icon: Shield },
    { label: "Campaigns", icon: Megaphone },
    { label: "Jobs", icon: Briefcase },
    { label: "Payments & Escrow", icon: Coins, hasArrow: true },
    { label: "Competitions", icon: Trophy, hasArrow: true },
    { label: "Analytics", icon: BarChart3, hasArrow: true },
    { label: "Moderation", icon: ShieldAlert, hasArrow: true },
    { label: "CMS", icon: FolderOpen, hasArrow: true },
    { label: "Users & Permissions", icon: UserCheck, hasArrow: true },
    { label: "Notifications", icon: Bell },
    { label: "Settings", icon: Settings },
    { label: "Audit Logs", icon: Activity, hasArrow: true },
  ];

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#05070d] text-slate-200 font-sans selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Top Header / Search (Full width at the top) */}
      <header className="sticky top-0 z-50 h-16 border-b border-[#151b2d] bg-[#08090f]/80 px-8 flex items-center justify-between backdrop-blur-md shrink-0">
        
        {/* Sidebar Header / Logo Section moved here */}
        <div className="flex items-center gap-3 w-64 shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/10 border border-amber-400/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <svg className="h-5 w-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <div>
            <h1 className="font-display font-black text-sm tracking-widest text-amber-400 uppercase leading-none">
              ADMIN OPS
            </h1>
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block mt-1">
              HYP MODULES
            </span>
          </div>
        </div>

        {/* Search bar */}
        <div className="flex-1 flex items-center gap-4 max-w-md ml-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Tìm kiếm trong ${activeTab}...`}
              className="w-full rounded-xl border border-[#151b2d] bg-slate-950/40 py-2 pl-9 pr-4 text-xs text-white focus:border-[#f4c430]/50 focus:outline-none focus:bg-slate-950/60 transition-all duration-300"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-200"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Quick Info & User Profile */}
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Hệ thống ổn định</span>
          </div>

          <div className="flex items-center gap-3 border-l border-[#151b2d] pl-6">
            <div className="h-8 w-8 rounded-full bg-amber-400 text-black font-extrabold flex items-center justify-center text-xs">
              AD
            </div>
            <div className="text-left">
              <span className="block text-xs font-bold text-white leading-tight">Admin VNP</span>
              <span className="block text-[9px] text-[#f4c430] font-bold uppercase tracking-wider">Super Administrator</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Inner Layout (Sidebar + Scrollable Content side-by-side) */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* SIDEBAR */}
        <aside className="w-72 border-r border-[#151b2d] bg-[#08090f] flex flex-col h-full shrink-0">
          
          {/* Navigation Items (Logo Section has been moved to top-level Header) */}
          <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5 custom-scrollbar">
            {sidebarItems.map((item) => {
              const isActive = activeTab === item.label;
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    setActiveTab(item.label);
                    addToast(`Chuyển hướng sang phân hệ: ${item.label}`, "info");
                  }}
                  className={`flex w-full items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 ${
                    isActive
                      ? "bg-[#f4c430] text-black font-extrabold shadow-[0_4px_15px_rgba(244,196,48,0.25)]"
                      : "text-slate-400 hover:bg-white/2 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4.5 w-4.5 ${isActive ? "text-black" : "text-slate-400"}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.hasArrow && !isActive && (
                    <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
                  )}
                  {isActive && (
                    <ChevronRight className="h-3.5 w-3.5 text-black" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-[#151b2d] bg-[#06070b]">
            <button
              onClick={() => router.push("/")}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/5 py-3 text-[11px] font-bold text-slate-400 hover:border-amber-400/40 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Quay lại Gateway chính</span>
            </button>
          </div>
        </aside>

        {/* Scrollable Dashboard Panel */}
        <main className="flex-1 overflow-y-auto p-8 bg-[#05070d]">
          
          {/* TAB: DASHBOARD */}
          {activeTab === "Dashboard" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              
              {/* Header Info Banner */}
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 bg-[#08090f] border border-[#151b2d] p-8 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#f4c430]/5 rounded-full blur-[100px] pointer-events-none" />
                
                <div className="space-y-4 max-w-3xl">
                  {/* Badges row */}
                  <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold tracking-wider uppercase">
                    <span className="border border-cyan-500/30 text-cyan-400 bg-cyan-500/5 px-2.5 py-1 rounded-md">
                      SINGLE ADMIN CONTROL CENTER
                    </span>
                    <span className="border border-emerald-500/30 text-emerald-400 bg-emerald-500/5 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                      LIVE OPS
                    </span>
                    <span className="text-slate-500 font-semibold">
                      MAY 2026
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h1 className="text-4xl font-extrabold tracking-tight text-white font-display">
                    ADMIN CONTROL <span className="text-amber-400">CENTER</span>
                  </h1>
                  
                  {/* Description */}
                  <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
                    Vận hành toàn bộ Beauty Talent Ecosystem: kiểm duyệt hồ sơ, giám sát escrow, điều phối campaign, xử lý tranh chấp và theo dõi rủi ro nền tảng.
                  </p>
                </div>

                {/* Top Right Mini Metrics */}
                <div className="flex flex-row xl:flex-col gap-6 xl:gap-4 shrink-0 bg-[#0c0f1a] border border-[#1d263b] p-5 rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold text-white tracking-tight">84%</span>
                    <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest leading-tight block">AI MATCHING<br/>ACCURACY</span>
                  </div>
                  <div className="flex items-center gap-3 border-l xl:border-l-0 xl:border-t border-[#1d263b] pl-6 xl:pl-0 xl:pt-3">
                    <div className="flex items-center gap-1.5">
                      <Radio className="h-4 w-4 text-emerald-400" />
                      <span className="text-sm font-bold text-white">99.9%</span>
                    </div>
                    <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest leading-tight block">PLATFORM<br/>HEALTH</span>
                  </div>
                  <div className="flex items-center gap-3 border-l xl:border-l-0 xl:border-t border-[#1d263b] pl-6 xl:pl-0 xl:pt-3">
                    <div className="flex items-center gap-1.5">
                      <AlertTriangle className="h-4 w-4 text-amber-400" />
                      <span className="text-sm font-bold text-amber-400">7</span>
                    </div>
                    <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest leading-tight block font-bold">FRAUD<br/>SIGNALS</span>
                  </div>
                </div>
              </div>

              {/* Stats Grid (3x2) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* 1. TOTAL TALENTS */}
                <div className="bg-[#08090f] border border-[#143d4d] shadow-[0_0_15px_rgba(34,211,238,0.03)] p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between h-40">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">TOTAL TALENTS</span>
                      <h3 className="text-3xl font-extrabold text-white mt-2">58,420</h3>
                    </div>
                    <div className="p-3.5 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-cyan-400">
                      <Users className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="text-[11px] font-bold text-cyan-400 tracking-wide flex items-center gap-1">
                    <span>+12.5% MOM</span>
                  </div>
                </div>

                {/* 2. VERIFIED BRANDS */}
                <div className="bg-[#08090f] border border-[#2f1c4f] shadow-[0_0_15px_rgba(168,85,247,0.03)] p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between h-40">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">VERIFIED BRANDS</span>
                      <h3 className="text-3xl font-extrabold text-white mt-2">1,248</h3>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#a855f7]/5 border border-[#a855f7]/20 text-[#a855f7]">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="text-[11px] font-bold text-[#a855f7] tracking-wide flex items-center gap-1">
                    <span>+8.2% MOM</span>
                  </div>
                </div>

                {/* 3. ACTIVE CAMPAIGNS */}
                <div className="bg-[#08090f] border border-[#3d2f1d] shadow-[0_0_15px_rgba(245,158,11,0.03)] p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between h-40">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">ACTIVE CAMPAIGNS</span>
                      <h3 className="text-3xl font-extrabold text-white mt-2">318</h3>
                    </div>
                    <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 text-amber-500">
                      <Megaphone className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="text-[11px] font-bold text-amber-400 tracking-wide flex items-center gap-1">
                    <span>42 HIGH VALUE</span>
                  </div>
                </div>

                {/* 4. ESCROW HOLDING */}
                <div className="bg-[#08090f] border border-[#153f2d] shadow-[0_0_15px_rgba(16,185,129,0.03)] p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between h-40">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">ESCROW HOLDING</span>
                      <h3 className="text-3xl font-extrabold text-white mt-2">12.8B</h3>
                    </div>
                    <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-emerald-400">
                      <Coins className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="text-[11px] font-bold text-emerald-400 tracking-wide flex items-center gap-1">
                    <span>VND SECURED</span>
                  </div>
                </div>

                {/* 5. MONTHLY GMV */}
                <div className="bg-[#08090f] border border-[#3e3415] shadow-[0_0_15px_rgba(234,179,8,0.03)] p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between h-40">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">MONTHLY GMV</span>
                      <h3 className="text-3xl font-extrabold text-white mt-2">3.4B</h3>
                    </div>
                    <div className="p-3.5 rounded-xl bg-amber-400/5 border border-amber-400/20 text-amber-400">
                      <Database className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="text-[11px] font-bold text-amber-400 tracking-wide flex items-center gap-1">
                    <span>+18.7% GROWTH</span>
                  </div>
                </div>

                {/* 6. PENDING DISPUTES */}
                <div className="bg-[#08090f] border border-[#4f1a2d] shadow-[0_0_15px_rgba(236,72,153,0.03)] p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between h-40">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">PENDING DISPUTES</span>
                      <h3 className="text-3xl font-extrabold text-white mt-2">12</h3>
                    </div>
                    <div className="p-3.5 rounded-xl bg-rose-500/5 border border-rose-500/20 text-rose-400">
                      <Gavel className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="text-[11px] font-bold text-rose-400 tracking-wide flex items-center gap-1">
                    <span>4 URGENT CASES</span>
                  </div>
                </div>

              </div>

              {/* Bottom Sections: Live Activity (50%) & Risk Alerts (50%) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Live Activity Box */}
                <div className="bg-[#08090f] border border-[#151b2d] p-6 rounded-2xl flex flex-col h-[350px]">
                  <div className="flex justify-between items-center pb-4 border-b border-[#151b2d] mb-4">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">LIVE ACTIVITY</h3>
                    <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 uppercase tracking-wider">REALTIME</span>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar pr-1">
                    {liveActivities.map((act, index) => (
                      <div key={index} className="flex gap-3 text-xs leading-normal items-start group">
                        <span className="h-2 w-2 rounded-full bg-cyan-400 mt-1.5 shrink-0 group-hover:scale-125 transition-transform duration-200" />
                        <div className="flex-1">
                          <span className="text-slate-300">{act.text}</span>
                          <span className="block text-[9px] text-slate-600 mt-1 uppercase font-semibold">{act.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Risk Alerts Box */}
                <div className="bg-[#08090f] border border-[#151b2d] p-6 rounded-2xl flex flex-col h-[350px]">
                  <div className="flex justify-between items-center pb-4 border-b border-[#151b2d] mb-4">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">RISK ALERTS</h3>
                    <span className="text-[9px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20 uppercase tracking-wider">4 OPEN</span>
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-3.5 custom-scrollbar pr-1">
                    {/* Alert 1: Yellow/Orange styling */}
                    <div className="bg-[#1e1910] border border-[#3e3415] p-3.5 rounded-xl text-xs flex gap-3 leading-normal items-start">
                      <span className="text-amber-500 shrink-0 font-bold mt-0.5">...</span>
                      <div className="flex-1">
                        <span className="text-[#fcd34d] font-semibold">Brand Diamond Luxury</span> cancelled 4 bookings this week.
                      </div>
                    </div>

                    {/* Alert 2: Purple styling */}
                    <div className="bg-[#15111e] border border-[#2f1c4f] p-3.5 rounded-xl text-xs flex gap-3 leading-normal items-start">
                      <span className="text-[#a855f7] shrink-0 font-bold mt-0.5">...</span>
                      <div className="flex-1">
                        Talent <span className="text-[#c084fc] font-semibold">#TL9182</span> reported by 3 brands.
                      </div>
                    </div>

                    {/* Alert 3: Pink/Red styling */}
                    <div className="bg-[#1f1116] border border-[#4f1a2d] p-3.5 rounded-xl text-xs flex gap-3 leading-normal items-start">
                      <span className="text-rose-400 shrink-0 font-bold mt-0.5">...</span>
                      <div className="flex-1">
                        Unusual voting activity detected.
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB: TALENTS */}
          {activeTab === "Talents" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-white font-display">QUẢN LÝ TALENTS</h1>
                  <p className="text-xs text-slate-400 mt-1">Kiểm duyệt hồ sơ đăng ký mới, phân cấp hạng định dạng (Tier S/A/B/C) và quản lý tích xanh.</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => addToast("Đang đồng bộ dữ liệu...", "info")} className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-white/10 text-white transition-all">
                    <RefreshCw className="h-3.5 w-3.5" /> Đồng bộ
                  </button>
                </div>
              </div>

              {/* Talents Table */}
              <div className="bg-[#08090f] border border-[#151b2d] rounded-2xl overflow-hidden">
                <div className="p-5 border-b border-[#151b2d] flex items-center justify-between bg-slate-950/20">
                  <span className="text-xs font-bold text-slate-400">DANH SÁCH TALENTS</span>
                  <div className="flex gap-2">
                    <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20">Cần phê duyệt: {talents.filter(t => t.status.startsWith("Chờ")).length}</span>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#151b2d] text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-950/30">
                        <th className="p-4 pl-6">ID & Talent</th>
                        <th className="p-4">Hạng Tier</th>
                        <th className="p-4">Lĩnh vực hoạt động</th>
                        <th className="p-4">Lực lượng Fan</th>
                        <th className="p-4">AI Matching Score</th>
                        <th className="p-4">Trạng thái hồ sơ</th>
                        <th className="p-4 pr-6 text-right">Hành động</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#151b2d]">
                      {talents.map((t) => (
                        <tr key={t.id} className="hover:bg-white/1 text-xs transition-colors">
                          <td className="p-4 pl-6">
                            <div className="flex items-center gap-3">
                              <img src={t.avatar} alt={t.name} className="h-9 w-9 rounded-full object-cover border border-[#151b2d]" />
                              <div>
                                <span className="font-bold text-white block">{t.name}</span>
                                <span className="text-[10px] text-slate-500 block font-mono">{t.id} • {t.email}</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider ${
                              t.tier === "S" ? "bg-amber-400/10 text-amber-300 border border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.1)]" :
                              t.tier === "A" ? "bg-slate-300/10 text-slate-200 border border-slate-300/20" :
                              t.tier === "B" ? "bg-purple-500/10 text-purple-300 border border-purple-500/20" :
                              "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                            }`}>
                              Tier {t.tier}
                            </span>
                          </td>
                          <td className="p-4 text-slate-300">{t.role}</td>
                          <td className="p-4 font-semibold text-slate-400">{t.followers}</td>
                          <td className="p-4 font-bold text-cyan-400">{t.matchingScore}%</td>
                          <td className="p-4">
                            <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold ${
                              t.status === "Đã duyệt" ? "text-emerald-400" :
                              t.status === "Chờ duyệt Tier" ? "text-amber-400" :
                              t.status === "Bị từ chối" ? "text-rose-400" :
                              "text-cyan-400"
                            }`}>
                              <span className={`h-1.5 w-1.5 rounded-full ${
                                t.status === "Đã duyệt" ? "bg-emerald-500" :
                                t.status === "Chờ duyệt Tier" ? "bg-amber-500" :
                                t.status === "Bị từ chối" ? "bg-rose-500" :
                                "bg-cyan-500"
                              }`} />
                              {t.status}
                            </span>
                          </td>
                          <td className="p-4 pr-6 text-right space-x-2">
                            {t.status === "Chờ duyệt hồ sơ" && (
                              <>
                                <button 
                                  onClick={() => handleApproveTalent(t.id, t.name)}
                                  className="bg-emerald-500 hover:bg-emerald-600 text-black text-[10px] font-extrabold px-2.5 py-1 rounded transition-colors"
                                >
                                  Duyệt hồ sơ
                                </button>
                                <button 
                                  onClick={() => {
                                    setTalents(prev => prev.map(item => item.id === t.id ? { ...item, status: "Bị từ chối" } : item));
                                    addToast(`Đã bác bỏ hồ sơ của ${t.name}`, "warning");
                                  }}
                                  className="bg-white/5 hover:bg-white/10 text-rose-400 border border-rose-500/20 text-[10px] font-semibold px-2.5 py-1 rounded transition-colors"
                                >
                                  Từ chối
                                </button>
                              </>
                            )}
                            {t.status === "Chờ duyệt Tier" && (
                              <div className="inline-flex gap-1.5">
                                <button 
                                  onClick={() => handleVerifyTier(t.id, t.name, "S")}
                                  className="bg-amber-400 hover:bg-amber-500 text-black text-[10px] font-extrabold px-2 py-0.5 rounded transition-colors"
                                >
                                  Duyệt S
                                </button>
                                <button 
                                  onClick={() => handleVerifyTier(t.id, t.name, "A")}
                                  className="bg-slate-300 hover:bg-slate-400 text-black text-[10px] font-extrabold px-2 py-0.5 rounded transition-colors"
                                >
                                  Duyệt A
                                </button>
                              </div>
                            )}
                            {t.status === "Đã duyệt" && (
                              <span className="text-[10px] text-slate-500 italic">Đã kích hoạt</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: BRANDS */}
          {activeTab === "Brands" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-white font-display">QUẢN LÝ THƯƠNG HIỆU (BRANDS)</h1>
                  <p className="text-xs text-slate-400 mt-1">Xác thực pháp nhân doanh nghiệp, duyệt tích xanh quyền lực và kiểm soát số dư ký quỹ (Escrow).</p>
                </div>
              </div>

              {/* Brands Table */}
              <div className="bg-[#08090f] border border-[#151b2d] rounded-2xl overflow-hidden">
                <div className="p-5 border-b border-[#151b2d] flex items-center justify-between bg-slate-950/20">
                  <span className="text-xs font-bold text-slate-400">DANH SÁCH BRANDS ĐỐI TÁC</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#151b2d] text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-950/30">
                        <th className="p-4 pl-6">Doanh nghiệp</th>
                        <th className="p-4">Lĩnh vực kinh doanh</th>
                        <th className="p-4">Số dư ví Ký quỹ (Escrow)</th>
                        <th className="p-4">Chiến dịch đã chạy</th>
                        <th className="p-4">Xác minh</th>
                        <th className="p-4 pr-6 text-right">Hành động</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#151b2d]">
                      {brands.map((b) => (
                        <tr key={b.id} className="hover:bg-white/1 text-xs transition-colors">
                          <td className="p-4 pl-6">
                            <div className="flex items-center gap-3">
                              <div className="h-9 w-9 rounded-xl bg-[#0c0f1a] border border-[#151b2d] flex items-center justify-center text-lg">
                                {b.logo}
                              </div>
                              <div>
                                <span className="font-bold text-white block">{b.name}</span>
                                <span className="text-[10px] text-slate-500 block font-mono">{b.id}</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-slate-300">{b.sector}</td>
                          <td className="p-4 font-mono font-bold text-emerald-400">{b.escrowBalance}</td>
                          <td className="p-4 font-semibold text-slate-400">{b.campaignsCount} campaigns</td>
                          <td className="p-4">
                            <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold ${
                              b.status === "Đã duyệt" ? "text-cyan-400" : "text-amber-400"
                            }`}>
                              <span className={`h-1.5 w-1.5 rounded-full ${
                                b.status === "Đã duyệt" ? "bg-cyan-500" : "bg-amber-500"
                              }`} />
                              {b.status}
                            </span>
                          </td>
                          <td className="p-4 pr-6 text-right space-x-2">
                            {b.status === "Chờ tích xanh" && (
                              <button 
                                onClick={() => handleVerifyBrand(b.id, b.name)}
                                className="bg-cyan-500 hover:bg-cyan-600 text-black text-[10px] font-extrabold px-2.5 py-1 rounded transition-colors"
                              >
                                Phê duyệt tích xanh
                              </button>
                            )}
                            {b.status === "Đã duyệt" && (
                              <button 
                                onClick={() => {
                                  setBrands(prev => prev.map(item => item.id === b.id ? { ...item, status: "Tạm khóa" } : item));
                                  addToast(`Đã khóa tài khoản Brand: ${b.name}`, "warning");
                                }}
                                className="bg-white/5 hover:bg-rose-500/10 hover:text-rose-400 border border-white/5 text-slate-400 text-[10px] font-semibold px-2.5 py-1 rounded transition-colors"
                              >
                                Tạm khóa
                              </button>
                            )}
                            {b.status === "Tạm khóa" && (
                              <button 
                                onClick={() => {
                                  setBrands(prev => prev.map(item => item.id === b.id ? { ...item, status: "Đã duyệt" } : item));
                                  addToast(`Đã mở khóa tài khoản Brand: ${b.name}`, "success");
                                }}
                                className="bg-emerald-500 hover:bg-emerald-600 text-black text-[10px] font-bold px-2.5 py-1 rounded transition-colors"
                              >
                                Mở khóa
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: PAYMENTS & ESCROW */}
          {activeTab === "Payments & Escrow" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-white font-display">GIÁM SÁT KÝ QUỸ & THANH TOÁN (ESCROW)</h1>
                  <p className="text-xs text-slate-400 mt-1">Đảm bảo an toàn tài chính. Giải ngân khi chiến dịch hoàn tất hoặc hoàn trả brand khi có sự cố đơn phương.</p>
                </div>
                <div className="bg-[#08090f] border border-[#153f2d] px-4 py-2 rounded-xl flex items-center gap-3">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">QUỸ BẢO LÃNH</span>
                  <span className="text-base font-extrabold text-emerald-400">12.8 Tỷ VND</span>
                </div>
              </div>

              {/* Transactions Table */}
              <div className="bg-[#08090f] border border-[#151b2d] rounded-2xl overflow-hidden">
                <div className="p-5 border-b border-[#151b2d] bg-slate-950/20">
                  <span className="text-xs font-bold text-slate-400">DANH SÁCH CÁC KHOẢN KÝ QUỸ ĐANG GIỮ</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#151b2d] text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-950/30">
                        <th className="p-4 pl-6">ID & Ngày ký quỹ</th>
                        <th className="p-4">Tên chiến dịch</th>
                        <th className="p-4">Thương hiệu</th>
                        <th className="p-4">Talent thụ hưởng</th>
                        <th className="p-4">Ngân quỹ Ký quỹ</th>
                        <th className="p-4">Trạng thái Escrow</th>
                        <th className="p-4 pr-6 text-right">Thao tác giải quyết</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#151b2d]">
                      {transactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-white/1 text-xs transition-colors">
                          <td className="p-4 pl-6">
                            <span className="font-bold text-white block">{tx.id}</span>
                            <span className="text-[10px] text-slate-500 block font-mono">{tx.date}</span>
                          </td>
                          <td className="p-4 text-slate-300 font-semibold">{tx.campaign}</td>
                          <td className="p-4 text-slate-400">{tx.brand}</td>
                          <td className="p-4 text-slate-400">{tx.talent}</td>
                          <td className="p-4 font-mono font-extrabold text-white">{tx.amount}</td>
                          <td className="p-4">
                            <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold ${
                              tx.status === "Đang giữ" ? "text-amber-400" :
                              tx.status === "Đã giải ngân" ? "text-emerald-400" :
                              tx.status === "Tranh chấp" ? "text-rose-400" :
                              "text-slate-400"
                            }`}>
                              <span className={`h-1.5 w-1.5 rounded-full ${
                                tx.status === "Đang giữ" ? "bg-amber-500 animate-pulse" :
                                tx.status === "Đã giải ngân" ? "bg-emerald-500" :
                                tx.status === "Tranh chấp" ? "bg-rose-500" :
                                "bg-slate-500"
                              }`} />
                              {tx.status}
                            </span>
                          </td>
                          <td className="p-4 pr-6 text-right space-x-2">
                            {tx.status === "Đang giữ" && (
                              <>
                                <button 
                                  onClick={() => handleReleaseEscrow(tx.id, tx.amount)}
                                  className="bg-emerald-500 hover:bg-emerald-600 text-black text-[10px] font-extrabold px-2.5 py-1 rounded transition-colors"
                                >
                                  Giải ngân
                                </button>
                                <button 
                                  onClick={() => handleRefundEscrow(tx.id, tx.amount)}
                                  className="bg-white/5 hover:bg-white/10 text-amber-400 border border-amber-500/20 text-[10px] font-semibold px-2.5 py-1 rounded transition-colors"
                                >
                                  Hoàn trả
                                </button>
                              </>
                            )}
                            {tx.status === "Tranh chấp" && (
                              <button 
                                onClick={() => {
                                  setActiveTab("Moderation");
                                  addToast("Chuyển tới phiên điều trần tranh chấp", "info");
                                }}
                                className="bg-rose-500/20 hover:bg-rose-500 text-rose-400 hover:text-black border border-rose-500/30 text-[10px] font-bold px-2.5 py-1 rounded transition-colors"
                              >
                                Tới tòa trọng tài
                              </button>
                            )}
                            {(tx.status === "Đã giải ngân" || tx.status === "Đã hoàn trả") && (
                              <span className="text-[10px] text-slate-500 italic flex items-center justify-end gap-1">
                                <Check className="h-3 w-3" /> Hoàn tất
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: MODERATION (DISPUTES) */}
          {activeTab === "Moderation" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-white font-display">TÒA TRỌNG TÀI TRANH CHẤP (DISPUTES)</h1>
                  <p className="text-xs text-slate-400 mt-1">Phán quyết phân bổ dòng tiền ký quỹ dựa trên hồ sơ chứng cứ, chất lượng nghiệm thu và vi phạm hợp đồng.</p>
                </div>
              </div>

              {/* Disputes List */}
              <div className="grid grid-cols-1 gap-6">
                {disputes.map((d) => (
                  <div key={d.id} className="bg-[#08090f] border border-[#151b2d] rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl pointer-events-none" />
                    
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#151b2d] pb-4 mb-4 gap-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded uppercase">
                          {d.status}
                        </span>
                        <h3 className="font-extrabold text-white text-sm">{d.id} - {d.campaign}</h3>
                      </div>
                      <div className="flex items-center gap-4 text-xs">
                        <span className="text-slate-400">Giá trị hợp đồng: <strong className="text-white font-mono">{d.amount}</strong></span>
                        <span className="text-slate-600">Ngày lập: {d.date}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-slate-950/30 border border-[#151b2d] p-4 rounded-xl">
                        <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">CÁC BÊN LIÊN QUAN</span>
                        <div className="flex justify-between items-center text-xs mt-2">
                          <div>
                            <span className="text-slate-400 block">Thương hiệu (Brand)</span>
                            <span className="font-bold text-white">{d.brand}</span>
                          </div>
                          <span className="text-slate-600 font-bold">vs</span>
                          <div className="text-right">
                            <span className="text-slate-400 block">Tài năng (Talent)</span>
                            <span className="font-bold text-white">{d.talent}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-950/30 border border-[#151b2d] p-4 rounded-xl">
                        <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">LÝ DO TRANH CHẤP</span>
                        <p className="text-xs text-slate-300 leading-relaxed mt-1">{d.reason}</p>
                      </div>
                    </div>

                    {d.status === "Chờ Trọng Tài" ? (
                      <div className="flex justify-end gap-3 border-t border-[#151b2d] pt-4">
                        <button 
                          onClick={() => handleArbitrateDispute(d.id, "brand", d.amount)}
                          className="bg-white/5 hover:bg-white/10 text-amber-400 border border-amber-500/20 text-xs font-semibold px-4 py-2 rounded-xl transition-all"
                        >
                          Phán quyết: Hoàn trả Brand 100%
                        </button>
                        <button 
                          onClick={() => handleArbitrateDispute(d.id, "talent", d.amount)}
                          className="bg-emerald-500 hover:bg-emerald-600 text-black text-xs font-extrabold px-4 py-2 rounded-xl transition-all"
                        >
                          Phán quyết: Thanh toán Talent 100%
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-end border-t border-[#151b2d] pt-4 text-xs text-slate-500 italic">
                        <Check className="h-4 w-4 mr-1 text-emerald-400" /> Tranh chấp đã được xử lý bằng Trọng tài phân xử.
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* OTHER TABS PLACEHOLDER */}
          {activeTab !== "Dashboard" && activeTab !== "Talents" && activeTab !== "Brands" && activeTab !== "Payments & Escrow" && activeTab !== "Moderation" && (
            <div className="flex flex-col items-center justify-center text-center p-12 min-h-[50vh] animate-in fade-in duration-300">
              <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-400/10 border border-amber-400/20 shadow-[0_0_30px_rgba(245,158,11,0.1)]">
                <Lock className="h-8 w-8 text-amber-400" />
              </div>
              <h1 className="mb-2 font-display text-xl font-bold text-white">Mô đun Đang Được Phát Triển</h1>
              <span className="inline-block rounded-md border border-amber-400/30 bg-amber-400/10 px-3 py-1 font-display text-[9px] font-bold uppercase tracking-wider text-amber-300 mb-6">
                HYP MODULE • SYSTEM RESTRICTED
              </span>
              <p className="mx-auto mb-8 max-w-sm text-xs leading-relaxed text-slate-400">
                Phân hệ <strong className="text-white">"{activeTab}"</strong> đang được tích hợp vào Admin Control Center của Beauty Talent Ecosystem. Vui lòng quay lại sau.
              </p>
            </div>
          )}

        </main>
      </div>

      {/* TOAST SYSTEM */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div 
            key={toast.id}
            className={`glass-panel border-l-4 px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom duration-300 min-w-[280px] max-w-[400px] ${
              toast.type === "success" ? "border-l-emerald-500" :
              toast.type === "warning" ? "border-l-amber-500" :
              "border-l-cyan-500"
            }`}
          >
            {toast.type === "success" && <Check className="h-4.5 w-4.5 text-emerald-400 shrink-0" />}
            {toast.type === "warning" && <AlertTriangle className="h-4.5 w-4.5 text-amber-400 shrink-0" />}
            {toast.type === "info" && <Sparkles className="h-4.5 w-4.5 text-cyan-400 shrink-0" />}
            
            <p className="text-xs font-semibold text-white leading-snug">{toast.message}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
