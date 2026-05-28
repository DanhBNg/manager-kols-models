"use client";

import React, { useState } from "react";
import { 
  MessageSquare, Search, Send, FileText, Calendar, DollarSign, 
  Paperclip, Shield, Crown, Sparkles, Check, CheckCircle2, ChevronRight, X
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data for Chats
const INITIAL_CONVERSATIONS = [
  {
    id: "conv-1",
    talentName: "Nguyễn Mai Anh",
    talentAvatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&h=150&q=80",
    campaign: "Beauty Mega Live 06/2026",
    lastMsg: "Dạ em vừa đăng tải file nháp video Tiktok lên hệ thống rồi đó ạ!",
    time: "15:42",
    unread: true,
    bookingId: "BKG-3891",
    bookingRate: "8.000.000đ",
    bookingStatus: "Chờ Nghiệm Thu",
    messages: [
      { sender: "brand", text: "Chào Mai Anh, bạn đã nhận được trang phục mẫu gửi đến chưa?", time: "14:10" },
      { sender: "talent", text: "Dạ em nhận được rồi ạ! Váy rất vừa vặn và đẹp chuẩn concept.", time: "14:15" },
      { sender: "brand", text: "Tuyệt vời, bạn chuẩn bị quay và gửi file nháp Tiktok trước ngày 05/06 giúp mình nhé.", time: "14:20" },
      { sender: "talent", text: "Dạ em vừa đăng tải file nháp video Tiktok lên hệ thống rồi đó ạ!", time: "15:42" }
    ]
  },
  {
    id: "conv-2",
    talentName: "Khánh Linh (Kency)",
    talentAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
    campaign: "Summer Runway Phú Quốc",
    lastMsg: "Ok chị, lịch bay của em là 19/06 đúng không ạ?",
    time: "Hôm qua",
    unread: false,
    bookingId: "BKG-3892",
    bookingRate: "15.000.000đ",
    bookingStatus: "Đang Đặt Cọc",
    messages: [
      { sender: "talent", text: "Dạ chị ơi, em đã nhận được lời mời tham gia Summer Runway Phú Quốc rồi.", time: "Hôm qua" },
      { sender: "brand", text: "Chào Linh, bên chị đã đặt cọc 15M cho lịch diễn của em rồi nhé.", time: "Hôm qua" },
      { sender: "talent", text: "Ok chị, lịch bay của em là 19/06 đúng không ạ?", time: "Hôm qua" }
    ]
  },
  {
    id: "conv-3",
    talentName: "Lê Ngọc Hân",
    talentAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&h=150&q=80",
    campaign: "Organic Glow Cosmetics Launch",
    lastMsg: "Lời mời hợp tác mới được gửi",
    time: "25/05",
    unread: false,
    bookingId: "BKG-3893",
    bookingRate: "12.000.000đ",
    bookingStatus: "Chờ Đặt Cọc",
    messages: [
      { sender: "brand", text: "Chào Ngọc Hân, bên mình đang muốn mời bạn làm đại sứ cho chiến dịch Organic Glow. Bạn tham khảo brief đính kèm nhé.", time: "25/05" }
    ]
  }
];

export default function MessagesPage() {
  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
  const [activeConvId, setActiveConvId] = useState("conv-1");
  const [inputVal, setInputVal] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const activeConv = conversations.find((c) => c.id === activeConvId) || conversations[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const newMsg = {
      sender: "brand",
      text: inputVal,
      time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
    };

    const updatedConvs = conversations.map((conv) => {
      if (conv.id !== activeConv.id) return conv;
      return {
        ...conv,
        lastMsg: inputVal,
        time: newMsg.time,
        unread: false,
        messages: [...conv.messages, newMsg]
      };
    });

    setConversations(updatedConvs);
    setInputVal("");
  };

  // Simulate attaching a brief file shortcut directly into the chat
  const handleAttachBrief = () => {
    const briefMsg = {
      sender: "brand",
      text: "📎 Đã đính kèm Guidelines_Campaign_Brief.pdf (Nhấp để mở chi tiết tài liệu và đặt cọc).",
      time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
    };

    const updatedConvs = conversations.map((conv) => {
      if (conv.id !== activeConv.id) return conv;
      return {
        ...conv,
        lastMsg: "Đã đính kèm Brief",
        time: briefMsg.time,
        unread: false,
        messages: [...conv.messages, briefMsg]
      };
    });

    setConversations(updatedConvs);
    alert("Đã đính kèm file Brief chiến dịch thành công vào cuộc hội thoại!");
  };

  // Filter conversations
  const filteredConvs = conversations.filter((c) => {
    return c.talentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
           c.campaign.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="h-[80vh] flex rounded-2xl border border-white/5 bg-slate-950/20 backdrop-blur-md overflow-hidden animate-in fade-in duration-500">
      
      {/* Left Column: Conversation Sidebar */}
      <aside className="w-80 shrink-0 border-r border-white/5 bg-slate-950/40 p-4 flex flex-col justify-between">
        <div className="space-y-4">
          <h2 className="font-display font-bold text-sm tracking-wide text-white uppercase flex items-center gap-1.5 px-1">
            <MessageSquare className="h-4.5 w-4.5 text-amber-400" /> Trò Chuyện Nhóm
          </h2>

          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Tìm hội thoại, chiến dịch..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/5 bg-slate-900/50 py-2 pl-9 pr-3 text-xs text-white focus:border-amber-400/50 focus:outline-none"
            />
          </div>
        </div>

        {/* Scrollable Conversation List */}
        <div className="flex-1 overflow-y-auto mt-4 pr-1 space-y-2.5">
          {filteredConvs.map((conv) => {
            const isActive = conv.id === activeConv.id;
            return (
              <div
                key={conv.id}
                onClick={() => {
                  setActiveConvId(conv.id);
                  // Mark as read
                  setConversations(prev => prev.map(c => c.id === conv.id ? { ...c, unread: false } : c));
                }}
                className={cn(
                  "rounded-xl border p-3 cursor-pointer transition-all flex gap-3 relative group",
                  isActive
                    ? "border-amber-400 bg-amber-400/5"
                    : "border-white/5 bg-white/2 hover:bg-white/5"
                )}
              >
                {/* Unread indicator dot */}
                {conv.unread && (
                  <div className="absolute top-3.5 right-3 h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                )}

                <img src={conv.talentAvatar} alt={conv.talentName} className="h-9 w-9 rounded-full object-cover shrink-0 border border-amber-400/20" />
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <span className={cn("truncate text-xs font-bold text-white group-hover:text-amber-400 transition-colors", conv.unread && "text-amber-400")}>
                      {conv.talentName}
                    </span>
                    <span className="text-[9px] text-slate-500 font-semibold">{conv.time}</span>
                  </div>
                  <span className="block text-[8px] font-bold text-slate-400 truncate mb-1.5 uppercase tracking-wider">{conv.campaign}</span>
                  <p className="text-[10px] text-slate-500 truncate leading-relaxed">
                    {conv.lastMsg}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </aside>

      {/* Center Column: Chat Messages Window */}
      <main className="flex-1 flex flex-col justify-between bg-slate-900/10">
        
        {/* Chat window header */}
        <header className="h-16 border-b border-white/5 bg-slate-950/20 px-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <img src={activeConv.talentAvatar} alt={activeConv.talentName} className="h-9 w-9 rounded-full object-cover border border-amber-400/20" />
            <div className="text-left">
              <h3 className="text-xs font-bold text-white leading-tight">{activeConv.talentName}</h3>
              <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider">{activeConv.campaign}</span>
            </div>
          </div>
        </header>

        {/* Message body content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 pr-3">
          {activeConv.messages.map((msg, idx) => {
            const isBrand = msg.sender === "brand";
            return (
              <div 
                key={idx}
                className={cn(
                  "flex flex-col max-w-[70%] space-y-1.5",
                  isBrand ? "ml-auto items-end" : "mr-auto items-start"
                )}
              >
                <div 
                  className={cn(
                    "rounded-2xl px-4 py-3 text-xs leading-relaxed leading-5 shadow-md",
                    isBrand
                      ? "bg-gradient-to-r from-amber-400 to-yellow-600 text-slate-950 rounded-tr-none font-semibold"
                      : "bg-slate-900 border border-white/5 text-slate-200 rounded-tl-none"
                  )}
                >
                  {msg.text}
                </div>
                <span className="text-[8px] text-slate-600 font-semibold">{msg.time}</span>
              </div>
            );
          })}
        </div>

        {/* Input form panel */}
        <form onSubmit={handleSendMessage} className="h-16 border-t border-white/5 bg-slate-950/20 px-4 flex items-center gap-3 shrink-0">
          
          <button
            type="button"
            onClick={handleAttachBrief}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:text-white transition-colors"
          >
            <Paperclip className="h-4.5 w-4.5" />
          </button>

          <input
            type="text"
            placeholder="Nhập nội dung tin nhắn gửi đi..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="flex-1 h-10 rounded-xl border border-white/5 bg-slate-900/50 px-4 text-xs text-white focus:border-amber-400/50 focus:outline-none"
          />

          <button
            type="submit"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-amber-200 to-yellow-600 text-slate-950 shadow-md shadow-amber-500/10 hover:shadow-lg transition-transform active:scale-95"
          >
            <Send className="h-4.5 w-4.5" />
          </button>

        </form>

      </main>

      {/* Right Column: Mini Contract Sidebar Panel */}
      <aside className="w-64 shrink-0 border-l border-white/5 bg-slate-950/40 p-4 hidden lg:flex flex-col justify-between">
        <div className="space-y-4">
          <h4 className="font-display font-bold text-[10px] text-slate-500 uppercase tracking-widest px-1">Thông Tin Giao Dịch</h4>
          
          {/* Active Contract summary card */}
          <div className="rounded-xl border border-white/5 bg-slate-900/30 p-3.5 space-y-3.5">
            <div className="flex justify-between items-start">
              <div>
                <span className="block text-[8px] font-bold text-slate-500 uppercase">Mã Booking</span>
                <span className="text-[10px] font-bold text-white">{activeConv.bookingId}</span>
              </div>
              <span className={cn(
                "rounded px-1.5 py-0.2 text-[8px] font-extrabold",
                activeConv.bookingStatus === "Chờ Nghiệm Thu" ? "bg-cyan-500/10 text-cyan-400" :
                activeConv.bookingStatus === "Chờ Đặt Cọc" ? "bg-amber-500/10 text-amber-400" :
                "bg-emerald-500/10 text-emerald-400"
              )}>
                {activeConv.bookingStatus}
              </span>
            </div>

            <div className="border-t border-white/5 pt-2.5 flex justify-between">
              <div>
                <span className="block text-[8px] font-bold text-slate-500 uppercase">Cát-xê Hợp Đồng</span>
                <span className="text-xs font-black text-amber-400">{activeConv.bookingRate}</span>
              </div>
              <div>
                <span className="block text-[8px] font-bold text-slate-500 uppercase">Tín nhiệm</span>
                <span className="text-xs font-bold text-emerald-400">96%</span>
              </div>
            </div>

            <div className="border-t border-white/5 pt-2.5 space-y-1.5">
              <span className="block text-[8px] font-bold text-slate-500 uppercase">Bảo hiểm đặt cọc:</span>
              <div className="flex items-center gap-1.5 text-[9px] text-slate-400">
                <Shield className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                <span>Ví Escrow đã khóa cọc an toàn.</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <h5 className="font-display font-bold text-[9px] text-slate-500 uppercase tracking-widest px-1">Quy định hủy show:</h5>
            <p className="text-[9px] text-slate-500 leading-relaxed pl-1">
              * Hủy trước 48h: hoàn cọc 100% về ví.<br/>
              * Hủy trước 24h: hoàn cọc 50%.<br/>
              * Hủy sau 24h: cọc chuyển sang tài năng để bồi thường thời gian.
            </p>
          </div>
        </div>

      </aside>

    </div>
  );
}
