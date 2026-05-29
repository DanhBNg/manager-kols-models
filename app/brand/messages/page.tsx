"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Briefcase, MessageSquare } from "lucide-react";

export default function BrandMessagesPlaceholderPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-[65vh] items-center justify-center">
      <div className="max-w-lg rounded-2xl border border-white/5 bg-slate-950/30 p-8 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-500/25 bg-cyan-500/10 text-cyan-300">
          <MessageSquare className="h-6 w-6" />
        </div>
        <h1 className="text-xl font-black text-white">Tin nhắn realtime để sau Phase 1</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          Phase 1 chỉ cần campaign, talent đã lưu và yêu cầu liên hệ để đo demand. Chat realtime sẽ mở ở giai đoạn sau.
        </p>
        <button
          onClick={() => router.push("/brand/campaigns")}
          className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-500 px-5 text-xs font-black uppercase tracking-wider text-slate-950"
        >
          <Briefcase className="mr-2 h-4 w-4" />
          Mở Campaign
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
