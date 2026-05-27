"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Settings, ArrowLeft, Bell, Key, LogOut, RefreshCw, Eye } from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("vnp_talent_profile");
    router.push("/");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center gap-2">
        <button onClick={() => router.push("/talent/dashboard")} className="text-slate-400 hover:text-white">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="font-display text-xl font-bold text-white tracking-tight">Cài Đặt</h1>
          <p className="text-xs text-slate-400">Quản lý cấu hình tài khoản, bảo mật & thông báo</p>
        </div>
      </div>

      {/* Settings Options */}
      <div className="rounded-xl border border-white/5 bg-slate-900/20 divide-y divide-white/5 overflow-hidden backdrop-blur-md">
        
        {/* Switch portal */}
        <div 
          onClick={() => router.push("/")}
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/2 transition-colors"
        >
          <div className="flex items-center gap-3">
            <RefreshCw className="h-4.5 w-4.5 text-amber-400" />
            <div>
              <span className="block text-xs font-semibold text-white">Đổi Cổng Portal</span>
              <span className="block text-[9px] text-slate-500">Chuyển sang Nhãn hàng hoặc Admin</span>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="flex items-center justify-between p-4 hover:bg-white/2 transition-colors">
          <div className="flex items-center gap-3">
            <Key className="h-4.5 w-4.5 text-slate-400" />
            <div>
              <span className="block text-xs font-semibold text-white">Đổi Mật Khẩu</span>
              <span className="block text-[9px] text-slate-500">Cập nhật mật khẩu đăng nhập</span>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="flex items-center justify-between p-4 hover:bg-white/2 transition-colors">
          <div className="flex items-center gap-3">
            <Bell className="h-4.5 w-4.5 text-slate-400" />
            <div>
              <span className="block text-xs font-semibold text-white">Thông Báo Đẩy</span>
              <span className="block text-[9px] text-slate-500">Bật/tắt thông báo job & lời mời</span>
            </div>
          </div>
        </div>

        {/* Logs out */}
        <div 
          onClick={handleLogout}
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-red-500/5 transition-colors"
        >
          <div className="flex items-center gap-3">
            <LogOut className="h-4.5 w-4.5 text-red-400" />
            <div>
              <span className="block text-xs font-semibold text-red-400">Đăng Xuất</span>
              <span className="block text-[9px] text-slate-500">Xóa dữ liệu cục bộ & thoát</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
