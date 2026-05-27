"use client";

import React, { useState } from "react";
import { Send, Check, ShieldCheck, Search, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MessagesPage() {
  const [activeThreadId, setActiveThreadId] = useState("t1");
  const [inputText, setInputText] = useState("");
  const [threads, setThreads] = useState([
    {
      id: "t1",
      brandName: "Glow Beauty",
      campaignTitle: "Mega Live Son Môi",
      avatar: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=80&h=80&q=80",
      verified: true,
      lastMessage: "Bạn đã ký quỹ hợp đồng thành công.",
      time: "10:30",
      unread: true,
      messages: [
        { sender: "brand", text: "Chào Mai Anh, chúng tôi đã xem hồ sơ và điểm matching của bạn rất cao (94%).", time: "09:00" },
        { sender: "talent", text: "Em cảm ơn chị. Em đã nhận được lời mời và rất sẵn lòng tham gia chiến dịch son môi mới.", time: "09:15" },
        { sender: "brand", text: "Tốt quá, bên chị đã tiến hành chuyển khoản ký quỹ (Escrow) 8,000,000đ thành công vào ví hệ thống rồi nhé. Em check lịch để chuẩn bị dress code.", time: "10:28" },
        { sender: "brand", text: "Bạn đã ký quỹ hợp đồng thành công.", time: "10:30" }
      ]
    },
    {
      id: "t2",
      brandName: "VNDress Fashion",
      campaignTitle: "Summer Runway Show",
      avatar: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=80&h=80&q=80",
      verified: true,
      lastMessage: "Hạn gửi portfolio là trước ngày 20/06.",
      time: "Hôm qua",
      unread: false,
      messages: [
        { sender: "brand", text: "Chào Mai Anh, em có thể diễn catwalk vào ngày 28/06 tại Gem Center không?", time: "Hôm qua 14:00" },
        { sender: "talent", text: "Dạ được chị ạ, lịch đó em đang trống.", time: "Hôm qua 14:30" },
        { sender: "brand", text: "Ok em, hạn gửi portfolio chi tiết là trước ngày 20/06 để stylist chuẩn bị fitting đồ nhé.", time: "Hôm qua 15:00" }
      ]
    }
  ]);

  const activeThread = threads.find(t => t.id === activeThreadId);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeThread) return;

    const newMessage = {
      sender: "talent",
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setThreads(prevThreads => prevThreads.map(t => {
      if (t.id === activeThreadId) {
        return {
          ...t,
          lastMessage: inputText,
          time: newMessage.time,
          messages: [...t.messages, newMessage]
        };
      }
      return t;
    }));

    setInputText("");

    // Simulate mock auto-reply after 1.5 seconds to feel responsive
    setTimeout(() => {
      const replyMessage = {
        sender: "brand",
        text: `Cảm ơn bạn đã phản hồi! Đại diện phụ trách chiến dịch của chúng tôi sẽ phản hồi trong giây lát.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setThreads(prevThreads => prevThreads.map(t => {
        if (t.id === activeThreadId) {
          return {
            ...t,
            lastMessage: replyMessage.text,
            time: replyMessage.time,
            messages: [...t.messages, replyMessage]
          };
        }
        return t;
      }));
    }, 1500);
  };

  return (
    <div className="flex h-[80vh] flex-col rounded-2xl border border-white/10 bg-slate-950/40 overflow-hidden shadow-2xl backdrop-blur-xl">
      <div className="grid grid-cols-3 h-full divide-x divide-white/5">
        
        {/* Conversations Column */}
        <div className="col-span-1 flex flex-col h-full bg-slate-950/40">
          <div className="p-3 border-b border-white/5 flex gap-2">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
              <input
                type="text"
                placeholder="Tìm tin nhắn..."
                className="w-full rounded-lg border border-white/5 bg-slate-900/60 py-1.5 pl-8 pr-3 text-xs text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto divide-y divide-white/2">
            {threads.map((thread) => {
              const isActive = thread.id === activeThreadId;
              return (
                <div
                  key={thread.id}
                  onClick={() => setActiveThreadId(thread.id)}
                  className={cn(
                    "p-3 cursor-pointer flex gap-3 transition-colors",
                    isActive ? "bg-white/5" : "hover:bg-white/2"
                  )}
                >
                  <img src={thread.avatar} alt={thread.brandName} className="h-9 w-9 rounded-full object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-white truncate">{thread.brandName}</span>
                        {thread.verified && <ShieldCheck className="h-3.5 w-3.5 text-amber-400 shrink-0" />}
                      </div>
                      <span className="text-[9px] text-slate-500 shrink-0">{thread.time}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5">{thread.campaignTitle}</p>
                    <p className="text-[10px] text-slate-500 truncate mt-1">{thread.lastMessage}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chat thread details Column */}
        <div className="col-span-2 flex flex-col h-full bg-slate-950/20">
          {activeThread ? (
            <>
              {/* Header */}
              <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={activeThread.avatar} alt={activeThread.brandName} className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-1">
                      {activeThread.brandName}
                      {activeThread.verified && <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />}
                    </h4>
                    <p className="text-[9px] text-slate-400">{activeThread.campaignTitle}</p>
                  </div>
                </div>
              </div>

              {/* Message bubbles list */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {activeThread.messages.map((msg, index) => {
                  const isTalent = msg.sender === "talent";
                  return (
                    <div
                      key={index}
                      className={cn(
                        "flex flex-col max-w-[80%] rounded-2xl px-4 py-2.5 text-xs text-left",
                        isTalent
                          ? "self-end ml-auto bg-gradient-to-r from-amber-200 to-amber-500 text-slate-950 rounded-tr-none font-medium"
                          : "bg-slate-900 border border-white/5 text-slate-300 rounded-tl-none"
                      )}
                    >
                      <p>{msg.text}</p>
                      <span className={cn(
                        "text-[8px] mt-1.5 self-end flex items-center gap-0.5",
                        isTalent ? "text-slate-700" : "text-slate-500"
                      )}>
                        {msg.time} {isTalent && <Check className="h-2.5 w-2.5" />}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Message Input form */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-white/5 flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Nhập tin nhắn..."
                  className="flex-1 rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400 text-slate-950 hover:bg-amber-300 active:scale-95 transition-all shrink-0"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center flex-1 text-slate-500 gap-2">
              <MessageSquare className="h-10 w-10 text-slate-600" />
              <p className="text-xs">Hãy chọn một cuộc hội thoại bên trái để bắt đầu chat.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
