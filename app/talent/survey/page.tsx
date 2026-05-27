"use client";

import React, { useState } from "react";
import SurveyForm from "./SurveyForm";
import ModelTiersGrid from "@/components/ui/ModelTiersGrid";
import { Sparkles } from "lucide-react";

export default function SurveyPage() {
  const [resetCounter, setResetCounter] = useState(0);

  const handleStartSurvey = () => {
    setResetCounter((prev) => prev + 1);
  };

  return (
    <div className="flex min-h-[85vh] flex-col items-center justify-center py-6 w-full max-w-6xl mx-auto space-y-8">
      <div className="mb-2 text-center max-w-2xl animate-in fade-in duration-500 flex flex-col items-center">
        <h1 className="font-display text-3xl font-black text-white tracking-tight uppercase">
          Khám Phá <span className="text-gradient-gold">Bản Thân</span>
        </h1>
        <p className="text-[12px] text-slate-300 mt-3 leading-relaxed max-w-xl">
          Làm bài khảo sát của chúng tôi để xem thứ hạng người mẫu của bạn. Chúng tôi sẽ phân tích và đo lường độ phù hợp với các việc làm, sau đó đề xuất các cuộc thi sắc đẹp phù hợp với bạn.
        </p>
        
        {/* Outstanding Survey Call-To-Action Button */}
        <button
          type="button"
          onClick={handleStartSurvey}
          className="mt-6 px-10 py-4 bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 rounded-full font-display text-xs font-black text-[#070913] shadow-[0_0_25px_rgba(245,158,11,0.25)] hover:shadow-[0_0_40px_rgba(245,158,11,0.45)] hover:scale-[1.04] active:scale-98 transition-all duration-300 cursor-pointer uppercase tracking-widest flex items-center gap-2"
        >
          <Sparkles className="h-4 w-4 text-[#070913] fill-[#070913]/25 animate-pulse" />
          Làm bài khảo sát
        </button>
      </div>

      <ModelTiersGrid />

      <SurveyForm resetCounter={resetCounter} />
    </div>
  );
}



