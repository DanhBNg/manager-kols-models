"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Settings, ArrowLeft, Bell, Key, LogOut, RefreshCw, CheckCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const router = useRouter();
  const [toasts, setToasts] = useState<{ id: number; message: string; type: "success" | "info" }[]>([]);

  const addToast = (message: string, type: "success" | "info" = "success") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const handleLogout = () => {
    localStorage.removeItem("vnp_talent_profile");
    addToast("Đang đăng xuất khỏi tài khoản...", "info");
    setTimeout(() => {
      router.push("/");
    }, 800);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => router.push("/talent/dashboard")} 
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#151b2d] bg-[#08090f] text-slate-400 hover:text-white transition-all cursor-pointer"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="font-display text-3xl font-black text-white tracking-tight uppercase leading-none">Cài Đặt</h1>
          <p className="text-xs text-slate-400 mt-2 font-medium">Thiết lập bảo mật tài khoản, thông báo đẩy & tùy chọn hiển thị.</p>
        </div>
      </div>

      {/* Settings Options container - styled like dashboard.htm tables */}
      <div className="rounded-2xl border border-[#151b2d] bg-[#08090f] divide-y divide-[#151b2d]/50 overflow-hidden shadow-2xl">
        
        {/* Switch portal */}
        <div 
          onClick={() => {
            addToast("Đang chuyển đổi cổng portal...", "info");
            setTimeout(() => router.push("/"), 800);
          }}
          className="flex items-center justify-between p-5 cursor-pointer hover:bg-slate-950/40 transition-colors duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-400/25 bg-amber-400/10 text-amber-300">
              <RefreshCw className="h-4.5 w-4.5 animate-spin-slow" />
            </div>
            <div>
              <span className="block text-xs font-bold text-white">Đổi Cổng Portal</span>
              <span className="block text-[10px] text-slate-500 mt-0.5">Chuyển đổi giao diện sang cổng Nhãn hàng (Brand) hoặc Admin</span>
            </div>
          </div>
        </div>

        {/* Change Password */}
        <div 
          onClick={() => addToast("Chức năng đổi mật khẩu đang được đồng bộ hóa với hệ thống xác thực.", "info")}
          className="flex items-center justify-between p-5 cursor-pointer hover:bg-slate-950/40 transition-colors duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/25 bg-cyan-400/10 text-cyan-300">
              <Key className="h-4.5 w-4.5" />
            </div>
            <div>
              <span className="block text-xs font-bold text-white">Cập Nhật Mật Khẩu</span>
              <span className="block text-[10px] text-slate-500 mt-0.5">Thay đổi mật khẩu đăng nhập tài khoản của bạn để tăng độ bảo mật</span>
            </div>
          </div>
        </div>

        {/* Push Notifications */}
        <div 
          onClick={() => addToast("Cài đặt thông báo đã được lưu thành công.", "success")}
          className="flex items-center justify-between p-5 cursor-pointer hover:bg-slate-950/40 transition-colors duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-purple-400/25 bg-purple-400/10 text-purple-300">
              <Bell className="h-4.5 w-4.5" />
            </div>
            <div>
              <span className="block text-xs font-bold text-white">Thông Báo Hệ Thống</span>
              <span className="block text-[10px] text-slate-500 mt-0.5">Tùy chỉnh thông báo đẩy qua Email hoặc Điện thoại khi có Brand booking</span>
            </div>
          </div>
        </div>

        {/* Logout */}
        <div 
          onClick={handleLogout}
          className="flex items-center justify-between p-5 cursor-pointer hover:bg-rose-500/5 transition-colors duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-rose-500/25 bg-rose-500/10 text-rose-400">
              <LogOut className="h-4.5 w-4.5" />
            </div>
            <div>
              <span className="block text-xs font-bold text-rose-400">Đăng Xuất Tài Khoản</span>
              <span className="block text-[10px] text-slate-500 mt-0.5">Xóa cookie đăng nhập, phiên hoạt động và rời khỏi hệ thống</span>
            </div>
          </div>
        </div>

      </div>

      {/* Toast system */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div 
            key={toast.id}
            className={`glass-panel border-l-4 px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom duration-300 min-w-[280px] max-w-[400px] ${
              toast.type === "success" ? "border-l-emerald-500" : "border-l-cyan-500"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle className="h-4.5 w-4.5 text-emerald-400 shrink-0" />
            ) : (
              <Sparkles className="h-4.5 w-4.5 text-cyan-400 shrink-0" />
            )}
            <p className="text-xs font-semibold text-white leading-snug">{toast.message}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
