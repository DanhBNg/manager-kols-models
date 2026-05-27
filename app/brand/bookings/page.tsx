"use client";

import React, { useState } from "react";
import { 
  Shield, DollarSign, Clock, Users, ArrowUpRight, ArrowDownRight, CheckCircle2,
  AlertTriangle, ChevronRight, X, Eye, FileText, Lock, Unlock, Play, Star
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data for Bookings and Escrow
const INITIAL_BOOKINGS = [
  {
    id: "BKG-3891",
    campaign: "Beauty Mega Live 06/2026",
    talentName: "Nguyễn Mai Anh",
    talentAvatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&h=150&q=80",
    rate: 8000000,
    fee: 400000,
    total: 8400000,
    status: "Chờ Nghiệm Thu",
    stage: 4, // 1: Invited, 2: Accepted, 3: Escrowed, 4: Pending Review, 5: Completed
    proofUrl: "https://tiktok.com/@maianh_beauty/video/73912903",
    proofNotes: "Đã hoàn thành quay TVC giới thiệu sản phẩm và đăng tải nháp lên Tiktok chờ duyệt.",
    dateCreated: "2026-05-20",
    dateScheduled: "2026-06-05"
  },
  {
    id: "BKG-3892",
    campaign: "Summer Fashion High-End Runway",
    talentName: "Khánh Linh (Kency)",
    talentAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
    rate: 15000000,
    fee: 750000,
    total: 15750000,
    status: "Đang Thực Hiện",
    stage: 3,
    proofUrl: "",
    proofNotes: "",
    dateCreated: "2026-05-22",
    dateScheduled: "2026-06-20"
  },
  {
    id: "BKG-3893",
    campaign: "Organic Glow Cosmetics Launch",
    talentName: "Lê Ngọc Hân",
    talentAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&h=150&q=80",
    rate: 12000000,
    fee: 600000,
    total: 12600000,
    status: "Chờ Ký Quỹ",
    stage: 2,
    proofUrl: "",
    proofNotes: "",
    dateCreated: "2026-05-25",
    dateScheduled: "2026-07-01"
  },
  {
    id: "BKG-3894",
    campaign: "Organic Glow Cosmetics Launch",
    talentName: "Vũ Mỹ Linh",
    talentAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    rate: 10000000,
    fee: 500000,
    total: 10500000,
    status: "Hoàn Tất",
    stage: 5,
    proofUrl: "https://drive.google.com/file/d/lookbook_mylinh",
    proofNotes: "Đã giao file gốc ảnh lookbook chất lượng cao.",
    dateCreated: "2026-05-18",
    dateScheduled: "2026-05-25"
  },
  {
    id: "BKG-3895",
    campaign: "Organic Glow Cosmetics Launch",
    talentName: "Trần Thu Thảo",
    talentAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80",
    rate: 7000000,
    fee: 350000,
    total: 7350000,
    status: "Tranh Chấp",
    stage: 3,
    proofUrl: "",
    proofNotes: "Talent tự ý hủy buổi quay thử không báo trước.",
    dateCreated: "2026-05-19",
    dateScheduled: "2026-05-26"
  }
];

export default function BookingsEscrowPage() {
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [activeTab, setActiveTab] = useState<string>("All");
  
  // Wallet Balances State
  const [escrowLocked, setEscrowLocked] = useState(186000000);
  const [escrowReleased, setEscrowReleased] = useState(230000000);
  const [walletAvailable, setWalletAvailable] = useState(44000000);

  // Modal Review Proof State
  const [selectedBookingForReview, setSelectedBookingForReview] = useState<typeof INITIAL_BOOKINGS[0] | null>(null);

  // Review (Rating) Modal State
  const [reviewBooking, setReviewBooking] = useState<typeof INITIAL_BOOKINGS[0] | null>(null);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  const handlePayEscrow = (id: string, totalAmount: number) => {
    if (walletAvailable < totalAmount) {
      alert("Số dư tài khoản khả dụng không đủ! Vui lòng nạp thêm tiền trong phần Cài Đặt Ví.");
      return;
    }

    const updatedBookings = bookings.map((b) => {
      if (b.id !== id) return b;
      return {
        ...b,
        status: "Đang Thực Hiện",
        stage: 3
      };
    });

    setBookings(updatedBookings);
    setWalletAvailable((prev) => prev - totalAmount);
    setEscrowLocked((prev) => prev + totalAmount);
    alert("Đã ký quỹ thành công số tiền cát-xê! Tiền hiện đã được đóng băng an toàn trên hệ thống.");
  };

  const handleReleaseEscrow = (id: string, rate: number) => {
    const updatedBookings = bookings.map((b) => {
      if (b.id !== id) return b;
      return {
        ...b,
        status: "Hoàn Tất",
        stage: 5
      };
    });

    setBookings(updatedBookings);
    setEscrowLocked((prev) => prev - rate);
    setEscrowReleased((prev) => prev + rate);
    
    // Save target for rating/review prompt
    const bk = bookings.find(b => b.id === id);
    setSelectedBookingForReview(null);

    setTimeout(() => {
      alert("Đã giải ngân cát-xê thành công cho tài năng! Cảm ơn bạn đã hợp tác.");
      if (bk) setReviewBooking(bk);
    }, 100);
  };

  const handleDispute = (id: string) => {
    const updatedBookings = bookings.map((b) => {
      if (b.id !== id) return b;
      return {
        ...b,
        status: "Tranh Chấp"
      };
    });

    setBookings(updatedBookings);
    setSelectedBookingForReview(null);
    alert("Đã mở khiếu nại tranh chấp thành công. Ban quản trị hệ thống sẽ liên hệ với hai bên trong vòng 24h để giải quyết.");
  };

  const submitReview = () => {
    alert("Cảm ơn bạn đã gửi đánh giá! Điểm uy tín của tài năng sẽ được cập nhật tự động.");
    setReviewBooking(null);
    setRating(5);
    setReviewText("");
  };

  // Filter Bookings based on Tab
  const filteredBookings = bookings.filter((b) => {
    if (activeTab === "All") return true;
    if (activeTab === "escrow-pending") return b.status === "Chờ Ký Quỹ";
    if (activeTab === "escrowed") return b.status === "Đang Thực Hiện";
    if (activeTab === "pending-review") return b.status === "Chờ Nghiệm Thu";
    if (activeTab === "completed") return b.status === "Hoàn Tất";
    if (activeTab === "disputed") return b.status === "Tranh Chấp";
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div>
        <h1 className="font-display text-2xl font-extrabold tracking-tight text-white">
          BOOKING & <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 bg-clip-text text-transparent">KÝ QUỸ ESCROW</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Hệ thống đảm bảo quyền lợi giao dịch 2 bên. Cát-xê được khóa an toàn và chỉ giải ngân khi brief được hoàn thành.
        </p>
      </div>

      {/* Wallet Escrow Summaries row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5 backdrop-blur-md relative overflow-hidden">
          <div className="absolute right-4 top-4 text-cyan-500/20"><Lock className="h-10 w-10" /></div>
          <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Đang Ký Quỹ (Đóng Băng)</span>
          <span className="text-xl font-black text-cyan-400 tracking-tight">{escrowLocked.toLocaleString("vi-VN")}đ</span>
          <span className="block text-[8px] text-slate-500 mt-1">An toàn tuyệt đối trên hệ thống</span>
        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 backdrop-blur-md relative overflow-hidden">
          <div className="absolute right-4 top-4 text-emerald-500/20"><Unlock className="h-10 w-10" /></div>
          <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Đã Giải Ngân Cho Talent</span>
          <span className="text-xl font-black text-emerald-400 tracking-tight">{escrowReleased.toLocaleString("vi-VN")}đ</span>
          <span className="block text-[8px] text-slate-500 mt-1">Cát-xê đã chuyển cho người đẹp</span>
        </div>

        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 backdrop-blur-md relative overflow-hidden">
          <div className="absolute right-4 top-4 text-amber-500/20"><DollarSign className="h-10 w-10" /></div>
          <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Ví Khả Dụng Để Book</span>
          <span className="text-xl font-black text-amber-400 tracking-tight">{walletAvailable.toLocaleString("vi-VN")}đ</span>
          <span className="block text-[8px] text-slate-500 mt-1">Dùng để kích hoạt cọc ký quỹ mới</span>
        </div>
      </div>

      {/* Tabs Filter */}
      <div className="flex flex-wrap gap-2 border-b border-white/5 pb-2">
        {[
          { id: "All", label: "Tất cả" },
          { id: "escrow-pending", label: "Chờ Ký Quỹ" },
          { id: "escrowed", label: "Đang Chạy" },
          { id: "pending-review", label: "Chờ Nghiệm Thu" },
          { id: "completed", label: "Hoàn Tất" },
          { id: "disputed", label: "Tranh Chấp" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "rounded-xl px-4 py-2 text-xs font-bold transition-all",
              activeTab === tab.id
                ? "bg-white/5 text-white"
                : "bg-transparent text-slate-400 hover:text-white"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Bookings list */}
      <div className="space-y-4">
        {filteredBookings.map((b) => (
          <div 
            key={b.id}
            className="rounded-2xl border border-white/5 bg-slate-950/20 p-5 hover:border-white/10 transition-all flex flex-col justify-between"
          >
            {/* Header booking info */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
              <div className="flex items-center gap-3">
                <img src={b.talentAvatar} alt={b.talentName} className="h-11 w-11 rounded-full object-cover border border-amber-400/20" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-slate-400">{b.id}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-[10px] text-slate-500 font-semibold">{b.campaign}</span>
                  </div>
                  <h3 className="font-display font-bold text-sm text-white">{b.talentName}</h3>
                </div>
              </div>

              {/* Booking state indicators */}
              <div className="flex items-center gap-4 text-xs">
                <div className="text-left">
                  <span className="block text-[8px] font-bold text-slate-500 uppercase">Cát-xê</span>
                  <span className="font-extrabold text-white">{b.rate.toLocaleString("vi-VN")}đ</span>
                </div>
                <div className="text-left">
                  <span className="block text-[8px] font-bold text-slate-500 uppercase">Phí sàn (5%)</span>
                  <span className="font-semibold text-slate-400">{b.fee.toLocaleString("vi-VN")}đ</span>
                </div>
                <div className="text-left">
                  <span className="block text-[8px] font-bold text-slate-500 uppercase">Trạng Thái</span>
                  <span className={cn(
                    "rounded px-2 py-0.5 text-[9px] font-extrabold",
                    b.status === "Hoàn Tất" ? "bg-emerald-500/10 text-emerald-400" :
                    b.status === "Chờ Nghiệm Thu" ? "bg-cyan-500/10 text-cyan-400" :
                    b.status === "Chờ Ký Quỹ" ? "bg-amber-500/10 text-amber-400" :
                    b.status === "Tranh Chấp" ? "bg-rose-500/10 text-rose-400" :
                    "bg-white/10 text-slate-300"
                  )}>
                    {b.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="border-t border-white/5 pt-4 mb-4">
              <div className="flex justify-between items-center text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-2">
                <span>Trình Tự Hợp Đồng</span>
                <span className="text-slate-300">Giai đoạn {b.stage} / 5</span>
              </div>
              <div className="flex h-1 w-full gap-1 rounded-full bg-white/5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div
                    key={s}
                    className={cn(
                      "h-full flex-1 rounded-full transition-all duration-300",
                      s <= b.stage
                        ? b.status === "Tranh Chấp" ? "bg-rose-500" : "bg-gradient-to-r from-amber-200 to-amber-500"
                        : "bg-transparent"
                    )}
                  />
                ))}
              </div>
              <div className="grid grid-cols-5 text-center text-[8px] text-slate-500 font-bold mt-1">
                <span>1. Đã mời</span>
                <span>2. Nhận Lời</span>
                <span>3. Đã Ký Quỹ</span>
                <span>4. Nghiệm Thu</span>
                <span>5. Giải Ngân</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-end gap-2 border-t border-white/5 pt-4">
              {b.status === "Chờ Ký Quỹ" && (
                <button
                  onClick={() => handlePayEscrow(b.id, b.total)}
                  className="flex h-9 items-center justify-center rounded-xl bg-gradient-to-r from-amber-200 to-yellow-600 px-5 font-display text-[10px] font-bold text-slate-950 shadow-md hover:shadow-lg transition-all"
                >
                  Nạp Cọc Ký Quỹ Ngay
                </button>
              )}

              {b.status === "Chờ Nghiệm Thu" && (
                <button
                  onClick={() => setSelectedBookingForReview(b)}
                  className="flex h-9 items-center justify-center rounded-xl bg-cyan-500 hover:bg-cyan-400 px-5 font-display text-[10px] font-bold text-slate-950 shadow-md hover:shadow-lg transition-all"
                >
                  Xác Thực Proof & Nghiệm Thu
                </button>
              )}

              {b.status === "Đang Thực Hiện" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDispute(b.id)}
                    className="flex h-9 items-center justify-center rounded-xl border border-rose-500/20 bg-rose-500/5 px-4 font-display text-[10px] font-bold text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    Khiếu Nại Hợp Đồng
                  </button>
                  <button
                    disabled
                    className="flex h-9 items-center justify-center rounded-xl bg-white/5 border border-white/5 px-4 font-display text-[10px] font-bold text-slate-400 cursor-default"
                  >
                    Đợi Nộp Proof...
                  </button>
                </div>
              )}

              {b.status === "Hoàn Tất" && (
                <button
                  onClick={() => setReviewBooking(b)}
                  className="flex h-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 font-display text-[10px] font-bold text-white hover:bg-white/10 transition-colors"
                >
                  Gửi Đánh Giá Tài Năng <Star className="ml-1 h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                </button>
              )}
            </div>

          </div>
        ))}
      </div>

      {/* PROOF REVIEW & ESCROW RELEASE DRAWER */}
      {selectedBookingForReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#070913] p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Close */}
            <button 
              onClick={() => setSelectedBookingForReview(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="font-display font-extrabold text-base text-white mb-4 uppercase tracking-wider flex items-center gap-1.5">
              <Shield className="h-4.5 w-4.5 text-cyan-400" /> Xác Thực Kết Quả Nghiệm Thu
            </h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-center gap-3 rounded-xl bg-slate-950/40 p-3 border border-white/5">
                <img src={selectedBookingForReview.talentAvatar} alt="model" className="h-9 w-9 rounded-full object-cover border border-amber-400/20" />
                <div>
                  <h4 className="font-bold text-white">{selectedBookingForReview.talentName}</h4>
                  <span className="text-[10px] text-slate-500">Mã Booking: {selectedBookingForReview.id}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="block text-[9px] font-bold text-slate-500 uppercase">Sản phẩm nghiệm thu (Proof of Work):</span>
                <div className="rounded-xl border border-white/5 bg-slate-900/40 p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 truncate">
                    <FileText className="h-5 w-5 text-cyan-400 shrink-0" />
                    <span className="truncate text-slate-300 font-bold underline cursor-pointer">{selectedBookingForReview.proofUrl}</span>
                  </div>
                  <button className="text-[10px] text-slate-400 hover:text-white font-bold">Mở xem</button>
                </div>
              </div>

              <div className="space-y-1">
                <span className="block text-[9px] font-bold text-slate-500 uppercase">Mô tả của tài năng:</span>
                <p className="rounded-xl border border-white/5 bg-slate-900/40 p-3 text-slate-400 leading-relaxed">
                  {selectedBookingForReview.proofNotes}
                </p>
              </div>

              <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4 text-center">
                <Lock className="h-5 w-5 mx-auto text-cyan-400 mb-1.5" />
                <h4 className="font-bold text-white">Số tiền cát-xê cọc ký quỹ:</h4>
                <span className="text-base font-extrabold text-amber-400">{selectedBookingForReview.rate.toLocaleString("vi-VN")}đ</span>
                <p className="text-[8px] text-slate-500 mt-1 leading-relaxed">
                  Hệ thống sẽ thực hiện chuyển thẳng số tiền này vào tài khoản của {selectedBookingForReview.talentName} sau khi bạn duyệt. Không thể hoàn tác.
                </p>
              </div>

            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-5 border-t border-white/5 mt-5">
              <button
                onClick={() => handleDispute(selectedBookingForReview.id)}
                className="flex h-11 flex-1 items-center justify-center rounded-xl border border-rose-500/20 bg-rose-500/5 font-display text-xs font-bold text-rose-400 hover:bg-rose-500/10 transition-all"
              >
                Khiếu Nại & Sửa brief
              </button>

              <button
                onClick={() => handleReleaseEscrow(selectedBookingForReview.id, selectedBookingForReview.rate)}
                className="flex h-11 flex-1 items-center justify-center rounded-xl bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 font-display text-xs font-bold text-slate-950 shadow-md hover:shadow-lg transition-all"
              >
                Duyệt Giải Ngân <Unlock className="ml-1.5 h-4 w-4" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* LEAVE REVIEW RATING MODAL */}
      {reviewBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#070913] p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Close */}
            <button 
              onClick={() => setReviewBooking(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="font-display font-extrabold text-base text-white mb-4 uppercase tracking-wider text-center">
              Đánh Giá Tài Năng Hợp Tác
            </h2>

            <div className="space-y-4 text-center">
              <img src={reviewBooking.talentAvatar} alt="model" className="h-16 w-16 rounded-full object-cover border border-amber-400/20 mx-auto" />
              <div>
                <h4 className="font-bold text-white">{reviewBooking.talentName}</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Campaign: {reviewBooking.campaign}</p>
              </div>

              {/* Star selection rating */}
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star className={cn("h-7 w-7", star <= rating ? "text-amber-400 fill-amber-400" : "text-slate-600")} />
                  </button>
                ))}
              </div>

              <div className="space-y-1 text-left">
                <span className="block text-[9px] font-bold text-slate-500 uppercase">Nhận xét về thái độ & chất lượng công việc:</span>
                <textarea
                  rows={3}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Nhập cảm nhận của bạn về sự hợp tác này..."
                  className="w-full rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none resize-none"
                />
              </div>

              <button
                onClick={submitReview}
                className="flex h-11 w-full items-center justify-center rounded-xl bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 font-display text-xs font-bold text-slate-950 shadow-md hover:shadow-lg transition-all"
              >
                Gửi Đánh Giá Cho Sàn
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
