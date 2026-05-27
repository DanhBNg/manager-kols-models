"use client";

import React, { useState } from "react";
import { 
  Settings, User, Shield, Users, Wallet, CreditCard, DollarSign,
  Plus, Check, Trash2, ArrowUpRight, FileText, CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Team Members
const INITIAL_TEAM = [
  { id: "tm-1", name: "Nguyễn Văn Hùng", email: "hung.nguyen@brand.com", role: "Trưởng nhóm Agency", status: "Active", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80" },
  { id: "tm-2", name: "Lê Minh Thư", email: "thu.le@brand.com", role: "Quản lý chiến dịch", status: "Active", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&h=100&q=80" },
  { id: "tm-3", name: "Trần Bảo Ngọc", email: "ngoc.tran@brand.com", role: "Kế toán tài chính", status: "Active", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100&q=80" }
];

// Mock Invoices
const INITIAL_INVOICES = [
  { id: "INV-2903", date: "2026-05-24", campaign: "Beauty Mega Live 06/2026", amount: "120.000.000đ", method: "Chuyển khoản cọc" },
  { id: "INV-2845", date: "2026-05-18", campaign: "Summer Runway Phú Quốc", amount: "150.000.000đ", method: "Ký quỹ cọc" },
  { id: "INV-2501", date: "2026-05-10", campaign: "Organic Cosmetics", amount: "5.000.000đ", method: "Phí dịch vụ VIP" }
];

export default function BrandSettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "team" | "billing">("profile");
  
  // Profile settings state
  const [brandProfile, setBrandProfile] = useState({
    name: "L'Oréal Vietnam Cosmetics",
    sector: "Cosmetics & Beauty Care",
    website: "https://loreal.vn",
    representative: "Nguyễn Văn Hùng",
    phone: "0901234567",
    email: "contact@loreal-vietnam.com",
    address: "Tòa nhà Metropolitan, Đồng Khởi, Quận 1, TP. HCM"
  });

  // Team state
  const [team, setTeam] = useState(INITIAL_TEAM);
  const [newMember, setNewMember] = useState({ name: "", email: "", role: "Quản lý chiến dịch" });
  
  // Wallet/Billing simulation state
  const [walletBalance, setWalletBalance] = useState(44000000);
  const [depositAmount, setDepositAmount] = useState("50000000");
  const [invoices, setInvoices] = useState(INITIAL_INVOICES);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBrandProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Cập nhật thông tin hồ sơ doanh nghiệp thành công!");
  };

  const handleAddTeamMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMember.name || !newMember.email) return;

    const added = {
      id: `tm-${Date.now()}`,
      name: newMember.name,
      email: newMember.email,
      role: newMember.role,
      status: "Active",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80"
    };

    setTeam((prev) => [...prev, added]);
    setNewMember({ name: "", email: "", role: "Quản lý chiến dịch" });
    alert(`Đã thêm thành viên ${added.name} thành công!`);
  };

  const handleRemoveMember = (id: string) => {
    setTeam((prev) => prev.filter(m => m.id !== id));
  };

  const handleDepositSimulation = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(depositAmount);
    if (!amount || amount <= 0) return;

    setWalletBalance((prev) => prev + amount);

    const newInvoice = {
      id: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split("T")[0],
      campaign: "Nạp tiền quỹ khả dụng",
      amount: `${amount.toLocaleString("vi-VN")}đ`,
      method: "Nạp giả lập Hệ thống"
    };

    setInvoices(prev => [newInvoice, ...prev]);
    alert(`Đã nạp giả lập thành công ${amount.toLocaleString("vi-VN")}đ vào ví cọc ký quỹ!`);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="border-b border-white/5 pb-4 flex justify-between items-center">
        <div>
          <h1 className="font-display text-2xl font-extrabold tracking-tight text-white">
            THIẾT LẬP <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 bg-clip-text text-transparent">DOANH NGHIỆP</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Chỉnh sửa thông tin nhãn hàng, cấp quyền cho nhân viên quản lý chiến dịch và xem hóa đơn đỏ.
          </p>
        </div>
      </div>

      {/* Tabs list bar */}
      <div className="flex gap-1.5 border-b border-white/5 pb-1">
        <button
          onClick={() => setActiveTab("profile")}
          className={cn(
            "px-4 py-2 font-display text-xs font-bold uppercase tracking-wider border-b-2 transition-all",
            activeTab === "profile" ? "border-amber-400 text-amber-400" : "border-transparent text-slate-500 hover:text-slate-300"
          )}
        >
          Hồ Sơ Thương Hiệu
        </button>
        <button
          onClick={() => setActiveTab("team")}
          className={cn(
            "px-4 py-2 font-display text-xs font-bold uppercase tracking-wider border-b-2 transition-all",
            activeTab === "team" ? "border-amber-400 text-amber-400" : "border-transparent text-slate-500 hover:text-slate-300"
          )}
        >
          Thành Viên Đội Ngũ
        </button>
        <button
          onClick={() => setActiveTab("billing")}
          className={cn(
            "px-4 py-2 font-display text-xs font-bold uppercase tracking-wider border-b-2 transition-all",
            activeTab === "billing" ? "border-amber-400 text-amber-400" : "border-transparent text-slate-500 hover:text-slate-300"
          )}
        >
          Giao Dịch & Ví Nạp
        </button>
      </div>

      {/* Tab CONTENT 1: Profile Settings */}
      {activeTab === "profile" && (
        <form onSubmit={handleSaveProfile} className="rounded-2xl border border-white/5 bg-slate-950/20 p-6 backdrop-blur-md space-y-5 animate-in fade-in duration-300">
          
          <div className="flex items-center gap-4 border-b border-white/5 pb-5">
            <img 
              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&h=150&q=80" 
              alt="Brand avatar" 
              className="h-16 w-16 rounded-2xl object-cover border border-amber-400/30 shrink-0"
            />
            <div className="text-left">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                {brandProfile.name} 
                <span className="rounded bg-amber-400/10 border border-amber-500/20 px-2 py-0.2 text-[8px] font-extrabold text-amber-400 uppercase tracking-widest">
                  Verified Brand
                </span>
              </h3>
              <span className="text-xs text-slate-500 block mt-0.5">{brandProfile.sector}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Tên Nhãn Hàng / Doanh Nghiệp *</label>
              <input
                type="text"
                name="name"
                value={brandProfile.name}
                onChange={handleProfileChange}
                required
                className="w-full rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Lĩnh vực hoạt động *</label>
              <input
                type="text"
                name="sector"
                value={brandProfile.sector}
                onChange={handleProfileChange}
                required
                className="w-full rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Website Doanh Nghiệp</label>
              <input
                type="text"
                name="website"
                value={brandProfile.website}
                onChange={handleProfileChange}
                className="w-full rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Người đại diện liên hệ *</label>
              <input
                type="text"
                name="representative"
                value={brandProfile.representative}
                onChange={handleProfileChange}
                required
                className="w-full rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Số điện thoại liên hệ *</label>
              <input
                type="tel"
                name="phone"
                value={brandProfile.phone}
                onChange={handleProfileChange}
                required
                className="w-full rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Email liên hệ *</label>
              <input
                type="email"
                name="email"
                value={brandProfile.email}
                onChange={handleProfileChange}
                required
                className="w-full rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Địa chỉ trụ sở *</label>
              <input
                type="text"
                name="address"
                value={brandProfile.address}
                onChange={handleProfileChange}
                required
                className="w-full rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
              />
            </div>

          </div>

          <button
            type="submit"
            className="flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 px-5 font-display text-xs font-bold text-slate-950 shadow-md hover:shadow-lg transition-all"
          >
            Lưu Thay Đổi Hồ Sơ
          </button>

        </form>
      )}

      {/* Tab CONTENT 2: Team Members */}
      {activeTab === "team" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            
            {/* Add Team Member form */}
            <form onSubmit={handleAddTeamMember} className="lg:col-span-4 rounded-2xl border border-white/5 bg-slate-950/20 p-5 h-fit space-y-4">
              <h3 className="font-display font-bold text-xs text-slate-300 uppercase tracking-wider flex items-center gap-1.5 border-b border-white/5 pb-2.5">
                <Users className="h-4.5 w-4.5 text-amber-400" /> Thêm Thành Viên
              </h3>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Họ và tên *</label>
                <input
                  type="text"
                  placeholder="Lê Hoàng Bảo"
                  value={newMember.name}
                  onChange={(e) => setNewMember(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="w-full rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Email liên hệ *</label>
                <input
                  type="email"
                  placeholder="bao.le@brand.com"
                  value={newMember.email}
                  onChange={(e) => setNewMember(prev => ({ ...prev, email: e.target.value }))}
                  required
                  className="w-full rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Vai trò quản trị *</label>
                <select
                  value={newMember.role}
                  onChange={(e) => setNewMember(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                >
                  <option value="Quản lý chiến dịch">Quản lý chiến dịch (Campaign Manager)</option>
                  <option value="Kế toán tài chính">Kế toán tài chính (Finance Manager)</option>
                  <option value="Admin">Quản trị tối cao (Admin)</option>
                </select>
              </div>

              <button
                type="submit"
                className="flex h-10 w-full items-center justify-center rounded-xl bg-gradient-to-r from-amber-200 to-yellow-600 font-display text-xs font-bold text-slate-950 shadow-md hover:shadow-lg active:scale-98 transition-all"
              >
                <Plus className="mr-1 h-4 w-4" /> Kích Hoạt Lời Mời
              </button>
            </form>

            {/* Team Grid table */}
            <div className="lg:col-span-8 rounded-2xl border border-white/5 bg-slate-950/20 p-5">
              <h3 className="font-display font-bold text-xs text-white uppercase tracking-wider mb-4">Danh Sách Thành Viên Đang Quản Lý</h3>
              
              <div className="space-y-3.5">
                {team.map((member) => (
                  <div 
                    key={member.id}
                    className="rounded-xl border border-white/5 bg-slate-900/30 p-3.5 flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <img src={member.avatar} alt="tm" className="h-9 w-9 rounded-full object-cover border border-amber-400/20" />
                      <div>
                        <span className="block font-bold text-white text-xs">{member.name}</span>
                        <span className="block text-[10px] text-slate-500 mt-0.5">{member.email}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs">
                      <span className="rounded bg-white/5 px-2.5 py-0.5 text-[9px] font-semibold text-slate-400">
                        {member.role}
                      </span>
                      
                      <button
                        onClick={() => handleRemoveMember(member.id)}
                        className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Tab CONTENT 3: Billing & Wallet simulator */}
      {activeTab === "billing" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            
            {/* Deposit simulator card */}
            <div className="lg:col-span-4 space-y-4">
              
              {/* Wallet Summary */}
              <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 backdrop-blur-md relative overflow-hidden">
                <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Số dư khả dụng</span>
                <span className="text-xl font-black text-amber-400 tracking-tight">{walletBalance.toLocaleString("vi-VN")}đ</span>
                <span className="block text-[8px] text-slate-500 mt-1">Dùng để đặt cọc ký quỹ các chiến dịch mới</span>
              </div>

              {/* Deposit simulator form */}
              <form onSubmit={handleDepositSimulation} className="rounded-2xl border border-white/5 bg-slate-950/20 p-5 space-y-4">
                <h3 className="font-display font-bold text-xs text-slate-300 uppercase tracking-wider border-b border-white/5 pb-2.5 flex items-center gap-1.5">
                  <CreditCard className="h-4.5 w-4.5 text-amber-400" /> Nạp Tiền Giả Lập
                </h3>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Số tiền nạp (VNĐ) *</label>
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="w-full rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="flex h-10 w-full items-center justify-center rounded-xl bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 font-display text-xs font-bold text-slate-950 shadow-md hover:shadow-lg active:scale-98 transition-all"
                >
                  Kích Hoạt Nạp Tiền Simulator
                </button>
              </form>
            </div>

            {/* Invoices list panel */}
            <div className="lg:col-span-8 rounded-2xl border border-white/5 bg-slate-950/20 p-5 space-y-4">
              <h3 className="font-display font-bold text-xs text-white uppercase tracking-wider">Lịch Sử Giao Dịch & Hóa Đơn Đỏ</h3>
              
              <div className="overflow-x-auto rounded-xl border border-white/5 bg-slate-900/10">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/2 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                      <th className="px-4 py-3">Mã Hóa Đơn</th>
                      <th className="px-4 py-3">Ngày Tạo</th>
                      <th className="px-4 py-3">Mô tả giao dịch</th>
                      <th className="px-4 py-3 text-right">Số Tiền</th>
                      <th className="px-4 py-3">Phương thức</th>
                      <th className="px-4 py-3 text-center">Tải PDF</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/3">
                    {invoices.map((inv) => (
                      <tr key={inv.id} className="hover:bg-white/2 transition-colors">
                        <td className="px-4 py-3 font-semibold text-slate-400">{inv.id}</td>
                        <td className="px-4 py-3 text-slate-500">{inv.date}</td>
                        <td className="px-4 py-3 text-white font-bold truncate max-w-[120px]">{inv.campaign}</td>
                        <td className="px-4 py-3 text-right text-amber-400 font-extrabold">{inv.amount}</td>
                        <td className="px-4 py-3 text-slate-400">{inv.method}</td>
                        <td className="px-4 py-3 text-center">
                          <button 
                            onClick={() => alert(`Bắt đầu tải file hóa đơn điện tử VAT cho mã giao dịch ${inv.id}...`)}
                            className="text-slate-500 hover:text-cyan-400 p-1 transition-colors"
                          >
                            <FileText className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
