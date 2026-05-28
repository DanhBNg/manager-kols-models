"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, BookmarkCheck, Send } from "lucide-react";

export default function BookingsRedirectPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-[65vh] items-center justify-center">
      <div className="max-w-lg rounded-2xl border border-white/5 bg-slate-950/30 p-8 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-500/25 bg-amber-500/10 text-amber-300">
          <Send className="h-6 w-6" />
        </div>
        <h1 className="text-xl font-black text-white">Booking và đặt cọc chưa nằm trong Phase 1</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          MVP hiện chỉ ghi nhận yêu cầu liên hệ sơ bộ. Hãy dùng Shortlist để lưu talent và gửi request.
        </p>
        <button
          onClick={() => router.push("/brand/shortlists")}
          className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-500 px-5 text-xs font-black uppercase tracking-wider text-slate-950"
        >
          <BookmarkCheck className="mr-2 h-4 w-4" />
          Mở Shortlist
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

