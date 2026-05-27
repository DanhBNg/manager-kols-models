"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { User, ShieldAlert, Award, Sparkles, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Survey questions configuration
const SURVEY_QUESTIONS = [
  {
    id: 1,
    question: "Định hướng phát triển nghề nghiệp ưu tiên của bạn là gì?",
    options: [
      "Đại sứ thương hiệu, quay TVC quảng cáo và làm KOL truyền thông",
      "Trình diễn thời trang cao cấp trên các sàn diễn thời trang lớn",
      "Tham gia các đấu trường sắc đẹp, các cuộc thi hoa hậu lớn"
    ]
  },
  {
    id: 2,
    question: "Mạng xã hội nào bạn đang hoạt động tích cực và nhiều tương tác nhất?",
    options: [
      "TikTok & YouTube (Tập trung video ngắn, sáng tạo content & livestream)",
      "Instagram & Facebook (Tập trung chụp ảnh lookbook, chia sẻ phong cách sống)",
      "Ít hoạt động mạng xã hội, chủ yếu diễn diễn sự kiện và catwalk offline"
    ]
  },
  {
    id: 3,
    question: "Mức chiều cao hiện tại của bạn nằm trong khoảng nào?",
    options: [
      "Dưới 1m68 (Phù hợp làm gương mặt KOC đại diện, review, beauty blogger)",
      "Từ 1m68 đến 1m73 (Chiều cao tiêu chuẩn cho Pageant và Model)",
      "Trên 1m73 (Chiều cao lý tưởng cho siêu mẫu thời trang, Người mẫu sàn diễn)"
    ]
  },
  {
    id: 4,
    question: "Khả năng nói trước đám đông và trình độ ngoại ngữ của bạn?",
    options: [
      "Tự tin trả lời phỏng vấn ứng xử sắc sảo, giao tiếp tiếng Anh trôi chảy",
      "Nói chuyện duyên dáng bằng tiếng Việt, hoạt ngôn phù hợp livestream/giao lưu",
      "Thường hướng nội, biểu cảm tốt hơn qua ngôn ngữ hình thể và thần thái chụp ảnh"
    ]
  },
  {
    id: 5,
    question: "Phong cách trang điểm và thời trang bạn yêu thích nhất?",
    options: [
      "Lộng lẫy, kiêu sa chuẩn các Hoa hậu sắc đẹp quốc tế (Beauty Queen)",
      "Độc lạ, góc cạnh, cá tính chuẩn High-Fashion model",
      "Trẻ trung, năng động, thời thượng bắt kịp xu hướng giới trẻ"
    ]
  }
];

const JOBS_LIST = [
  { id: 1, title: "Đại sứ thương hiệu", desc: "Gương mặt đại diện thương hiệu luxury", weights: { pageant: 0.4, runway: 0.2, kol: 0.4 } },
  { id: 2, title: "KOLs/Influencer quảng cáo", desc: "Sáng tạo nội dung video ngắn", weights: { pageant: 0.1, runway: 0.1, kol: 0.8 } },
  { id: 3, title: "KOC Livestream bán hàng", desc: "Thực hiện livestream bán hàng trực tiếp", weights: { pageant: 0.05, runway: 0.05, kol: 0.9 } },
  { id: 4, title: "Gương mặt trang bìa", desc: "Chụp ảnh bìa tạp chí, lookbook, ảnh PR", weights: { pageant: 0.3, runway: 0.5, kol: 0.2 } },
  { id: 5, title: "Người mẫu sàn diễn (Runway)", desc: "Trình diễn các bộ sưu tập thời trang cao cấp", weights: { pageant: 0.1, runway: 0.8, kol: 0.1 } },
  { id: 6, title: "Người mẫu quảng cáo", desc: "Diễn xuất trong các TVC quảng cáo", weights: { pageant: 0.2, runway: 0.3, kol: 0.5 } },
  { id: 7, title: "Diễn viên MV ca nhạc", desc: "Đóng vai nữ chính/nam chính MV ca nhạc", weights: { pageant: 0.2, runway: 0.2, kol: 0.6 } },
  { id: 8, title: "KOL sự kiện / Khách mời VIP", desc: "Tham dự thảm đỏ và sự kiện thương hiệu", weights: { pageant: 0.6, runway: 0.2, kol: 0.2 } },
  { id: 9, title: "Người dẫn chương trình (MC)", desc: "Dẫn dắt các sự kiện và chương trình giải trí", weights: { pageant: 0.7, runway: 0.1, kol: 0.2 } },
  { id: 10, title: "VIP Promotion Girl (PG)", desc: "Lễ tân đón tiếp khách tại sự kiện lớn", weights: { pageant: 0.4, runway: 0.3, kol: 0.3 } },
  { id: 11, title: "Huấn luyện viên Catwalk", desc: "Đào tạo kỹ thuật đi catwalk cho học viên", weights: { pageant: 0.1, runway: 0.8, kol: 0.1 } },
  { id: 12, title: "CEO thương hiệu riêng", desc: "Kinh doanh nhãn hàng thời trang, mỹ phẩm", weights: { pageant: 0.5, runway: 0.2, kol: 0.3 } },
  { id: 13, title: "Giám khảo cuộc thi sắc đẹp", desc: "Chấm điểm các cuộc thi hoa hậu, hoa khôi", weights: { pageant: 0.7, runway: 0.2, kol: 0.1 } },
  { id: 14, title: "Giám đốc hình ảnh / Stylist", desc: "Cố vấn định hình phong cách và trang phục", weights: { pageant: 0.1, runway: 0.6, kol: 0.3 } },
  { id: 15, title: "Sứ giả chiến dịch cộng đồng", desc: "Lan tỏa các giá trị nhân văn và dự án từ thiện", weights: { pageant: 0.8, runway: 0.1, kol: 0.1 } },
  { id: 16, title: "Vlogger du lịch & trải nghiệm", desc: "Quảng bá điểm đến, khách sạn, resort cao cấp", weights: { pageant: 0.2, runway: 0.1, kol: 0.7 } },
  { id: 17, title: "Người mẫu ảnh nghệ thuật", desc: "Hợp tác chụp ảnh thời trang Fine-art", weights: { pageant: 0.2, runway: 0.6, kol: 0.2 } },
  { id: 18, title: "Nhà sáng tạo nội dung tri thức", desc: "Chia sẻ kỹ năng mềm, kiến thức làm đẹp", weights: { pageant: 0.4, runway: 0.1, kol: 0.5 } },
  { id: 19, title: "Đại sứ Game / Esports", desc: "Hình ảnh đại diện cho các dự án game lớn", weights: { pageant: 0.1, runway: 0.1, kol: 0.8 } },
  { id: 20, title: "Người mẫu ảo / Metaverse", desc: "Scan 3D hình ảnh số để làm mẫu ảo", weights: { pageant: 0.1, runway: 0.6, kol: 0.3 } }
];

export default function OnboardingForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    birthYear: "2002",
    location: "Hà Nội",
    hometown: "",
    phone: "",
    email: "",
    height: "172",
    weight: "51",
    bust: "85",
    waist: "60",
    hips: "90",
    plasticSurgery: "false",
    maritalStatus: "Độc thân",
    education: "Cử nhân Đại học",
    languages: "Tiếng Việt, Tiếng Anh",
    skills: "Catwalk, MC",
    tiktok: "",
    instagram: "",
    facebook: "",
    followersCount: "120000"
  });

  const [surveyAnswers, setSurveyAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [results, setResults] = useState({
    pageant: 0,
    runway: 0,
    kol: 0,
    mainCategory: "",
    tier: "C" as "S" | "A" | "B" | "C",
    profileScore: 0
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSurveySelect = (qId: number, optionIdx: number) => {
    setSurveyAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const nextStep = () => {
    if (step < 5) setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (step < 5) {
      nextStep();
      return;
    }

    // Validate that all survey questions are answered (only when step === 5)
    for (const q of SURVEY_QUESTIONS) {
      if (surveyAnswers[q.id] === undefined) {
        return;
      }
    }
    // Survey grading algorithm
    let pageantSum = 0;
    let runwaySum = 0;
    let kolSum = 0;

    const gradingMatrix: Record<number, { pageant: number; runway: number; kol: number }[]> = {
      1: [
        { pageant: 10, runway: 5, kol: 25 },
        { pageant: 10, runway: 30, kol: 5 },
        { pageant: 30, runway: 15, kol: 5 }
      ],
      2: [
        { pageant: 5, runway: 5, kol: 30 },
        { pageant: 10, runway: 20, kol: 15 },
        { pageant: 20, runway: 10, kol: 5 }
      ],
      3: [
        { pageant: 10, runway: 5, kol: 30 },
        { pageant: 25, runway: 20, kol: 15 },
        { pageant: 25, runway: 30, kol: 10 }
      ],
      4: [
        { pageant: 30, runway: 10, kol: 25 },
        { pageant: 15, runway: 10, kol: 30 },
        { pageant: 10, runway: 25, kol: 5 }
      ],
      5: [
        { pageant: 30, runway: 15, kol: 10 },
        { pageant: 10, runway: 30, kol: 5 },
        { pageant: 5, runway: 5, kol: 30 }
      ]
    };

    SURVEY_QUESTIONS.forEach((q) => {
      const ansIdx = surveyAnswers[q.id];
      const points = gradingMatrix[q.id][ansIdx];
      pageantSum += points.pageant;
      runwaySum += points.runway;
      kolSum += points.kol;
    });

    const scores = {
      pageant: Math.round((pageantSum / 150) * 100),
      runway: Math.round((runwaySum / 150) * 100),
      kol: Math.round((kolSum / 150) * 100)
    };

    let mainCategory = "KOL / Người mẫu ảnh / Giải trí thế hệ mới";
    if (scores.pageant >= scores.runway && scores.pageant >= scores.kol) {
      mainCategory = "Hoa hậu / Hoa khôi / Đại sứ sắc đẹp";
    } else if (scores.runway >= scores.pageant && scores.runway >= scores.kol) {
      mainCategory = "Người mẫu sàn diễn / High-end Professional";
    }

    // Profile completion score calculation
    let completeness = 35; // base info
    if (formData.height && formData.weight && formData.bust) completeness += 20;
    if (formData.skills && formData.education) completeness += 15;
    if (formData.tiktok || formData.instagram) completeness += 15;
    completeness += 15; // completed survey

    // Determine Tier
    const followers = Number(formData.followersCount) || 10000;
    let tier: "S" | "A" | "B" | "C" = "C";
    if (completeness >= 90 && followers >= 1000000) tier = "S";
    else if (completeness >= 80 && followers >= 100000) tier = "A";
    else if (completeness >= 60 && followers >= 30000) tier = "B";

    const computedResults = {
      pageant: scores.pageant,
      runway: scores.runway,
      kol: scores.kol,
      mainCategory,
      tier,
      profileScore: completeness
    };

    setResults(computedResults);

    // Save to local storage for other views
    const userProfile = {
      ...formData,
      surveyScores: scores,
      mainCategory,
      profileScore: completeness,
      tier,
      isOnboarded: true,
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&h=300&q=80",
      skills: formData.skills.split(",").map(s => s.trim()),
      languages: formData.languages.split(",").map(s => s.trim())
    };
    localStorage.setItem("vnp_talent_profile", JSON.stringify(userProfile));

    setIsSubmitted(true);
  };

  // SVG Radar Points calculation (center at 100, 100, radius 80)
  const calculateRadarPath = () => {
    const cx = 100;
    const cy = 100;
    const maxVal = 100;
    const radius = 80;

    // Angle of Pageant (90deg / top), Runway (210deg / bottom-left), KOL (330deg / bottom-right)
    const getCoords = (val: number, angleDeg: number) => {
      const rad = (angleDeg - 90) * (Math.PI / 180);
      const dist = (val / maxVal) * radius;
      return {
        x: cx + dist * Math.cos(rad),
        y: cy + dist * Math.sin(rad)
      };
    };

    const ptPageant = getCoords(results.pageant, 0);
    const ptRunway = getCoords(results.runway, 120);
    const ptKol = getCoords(results.kol, 240);

    return `${ptPageant.x},${ptPageant.y} ${ptRunway.x},${ptRunway.y} ${ptKol.x},${ptKol.y}`;
  };

  if (isSubmitted) {
    const calculatedJobs = JOBS_LIST.map((job) => {
      const matchScore = Math.round(
        results.pageant * job.weights.pageant +
        results.runway * job.weights.runway +
        results.kol * job.weights.kol
      );
      return { ...job, matchScore };
    }).sort((a, b) => b.matchScore - a.matchScore);

    return (
      <div className="w-full max-w-5xl mx-auto bg-[#08090f] p-6 md:p-8 rounded-3xl shadow-2xl animate-in fade-in slide-in-from-bottom-6 duration-500 border border-[#151b2d] text-left relative overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 h-72 w-72 rounded-full bg-amber-400/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -z-10 h-72 w-72 rounded-full bg-[#a855f7]/5 blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row gap-8 items-stretch">
          
          {/* LEFT SIDE: Radar Chart & Main Stats */}
          <div className="md:w-2/5 flex flex-col items-center justify-between border-r border-[#151b2d] pr-0 md:pr-8">
            <div className="text-center w-full">
              <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-400/10 border border-amber-400/30 shadow-[0_0_20px_rgba(244,196,48,0.15)]">
                <CheckCircle2 className="h-8 w-8 text-amber-400" />
              </div>
              <h2 className="mb-2 font-display text-xl font-extrabold tracking-tight text-white uppercase">
                Khảo Sát Hoàn Tất
              </h2>
              <p className="text-xs text-slate-400">
                AI đã phân tích dữ liệu & đánh giá chỉ số năng lực của bạn.
              </p>
            </div>

            {/* Dynamic Interactive SVG Radar Chart */}
            <div className="relative my-6 h-52 w-52 rounded-2xl border border-[#151b2d] bg-slate-950 p-4 shadow-inner">
              <svg viewBox="0 0 200 200" className="h-full w-full">
                <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                <circle cx="100" cy="100" r="50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                <circle cx="100" cy="100" r="30" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                
                <line x1="100" y1="30" x2="100" y2="170" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                <line x1="39" y1="135" x2="161" y2="65" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                <line x1="39" y1="65" x2="161" y2="135" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

                <polygon
                  points={calculateRadarPath()}
                  fill="rgba(244,196,48,0.18)"
                  stroke="url(#goldGradient)"
                  strokeWidth="2.5"
                  className="animate-in zoom-in-50 duration-700"
                />

                <text x="100" y="20" fill="#f4c430" fontSize="9" fontWeight="bold" textAnchor="middle">PAGEANT</text>
                <text x="30" y="152" fill="#a855f7" fontSize="9" fontWeight="bold" textAnchor="middle">SÀN DIỄN</text>
                <text x="170" y="152" fill="#06b6d4" fontSize="9" fontWeight="bold" textAnchor="middle">KOL</text>

                <defs>
                  <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fef08a" />
                    <stop offset="50%" stopColor="#f4c430" />
                    <stop offset="100%" stopColor="#b45309" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="w-full space-y-4">
              <div className="rounded-2xl border border-[#3e3415] bg-[#08090f] p-4">
                <span className="block text-[8px] text-slate-500 uppercase tracking-widest font-bold">Định hướng cốt lõi</span>
                <span className="block text-xs font-bold text-amber-400 mt-1">{results.mainCategory}</span>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-1 rounded-xl bg-slate-950 p-3.5 text-center border border-[#151b2d]">
                  <span className="block text-[8px] text-slate-500 uppercase tracking-widest font-bold">Tier Ban Đầu</span>
                  <span className="text-base font-extrabold text-amber-400 mt-1 block">Tier {results.tier}</span>
                </div>
                <div className="flex-1 rounded-xl bg-slate-950 p-3.5 text-center border border-[#151b2d]">
                  <span className="block text-[8px] text-slate-500 uppercase tracking-widest font-bold">Điểm Hoàn Thiện</span>
                  <span className="text-base font-extrabold text-white mt-1 block">{results.profileScore}/100</span>
                </div>
              </div>

              <button
                onClick={() => router.push("/talent/dashboard")}
                className="flex h-11 w-full items-center justify-center rounded-xl bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 font-display text-xs font-bold text-slate-950 shadow-lg hover:shadow-xl hover:brightness-105 active:scale-98 transition-all cursor-pointer"
              >
                Truy Cập Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>

          {/* RIGHT SIDE: 20 Suitable Jobs (Danh mục 20 công việc phù hợp) - Purple border (AI) */}
          <div className="flex-1 space-y-4 flex flex-col">
            <div>
              <h3 className="font-display font-extrabold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="h-4.5 w-4.5 text-amber-400 animate-pulse" />
                Danh mục định hướng việc làm phù hợp (AI Recommended Roles)
              </h3>
              <p className="text-[11px] text-slate-400 mt-1">
                Dưới đây là xếp hạng 20 công việc trong ngành thời trang & giải trí dựa trên mức độ phù hợp với năng lực của bạn:
              </p>
            </div>

            {/* Scrollable list of 20 jobs */}
            <div className="flex-1 overflow-y-auto max-h-[460px] pr-2 space-y-2 custom-scrollbar">
              {calculatedJobs.map((job, idx) => {
                const isHigh = job.matchScore >= 80;
                const isMid = job.matchScore >= 50 && job.matchScore < 80;

                return (
                  <div
                    key={job.id}
                    className="flex items-center gap-4 rounded-xl border border-white/5 bg-[#08090f] p-3.5 hover:bg-slate-900/20 hover:border-white/10 transition-all duration-300 group"
                  >
                    {/* Position badge */}
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/5 text-[10px] font-bold text-slate-400 group-hover:bg-amber-400/10 group-hover:text-amber-400 transition-colors">
                      {idx + 1}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors duration-300 truncate">
                          {job.title}
                        </h4>
                        <span className={cn(
                          "font-display text-xs font-extrabold",
                          isHigh ? "text-amber-400" : isMid ? "text-purple-400" : "text-slate-500"
                        )}>
                          {job.matchScore}% Match
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 truncate mt-1 font-medium">{job.desc}</p>
                      
                      {/* Matching meter bar */}
                      <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden mt-2">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all duration-500",
                            isHigh ? "bg-gradient-to-r from-amber-200 to-amber-500" : isMid ? "bg-purple-500" : "bg-slate-700"
                          )}
                          style={{ width: `${job.matchScore}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl rounded-2xl border border-[#151b2d] bg-[#08090f] p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 -z-10 h-32 w-32 bg-amber-400/5 rounded-full blur-2xl pointer-events-none" />
      {/* Header Stepper */}
      <div className="mb-6">
        <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
          <span className="uppercase tracking-wider text-amber-400 font-bold">Bước {step} / 5</span>
          <span>{Math.round((step / 5) * 100)}% Hoàn thành</span>
        </div>
        <div className="mt-2.5 flex h-1.5 w-full gap-1 rounded-full bg-slate-950">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={cn(
                "h-full flex-1 rounded-full transition-all duration-300",
                s <= step ? "bg-gradient-to-r from-amber-200 to-amber-500" : "bg-transparent"
              )}
            />
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* STEP 1: BASIC INFO */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h3 className="font-display font-bold text-lg text-white">1. Thông Tin Cơ Bản</h3>
            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-semibold">Họ và tên *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-amber-400 focus:outline-none"
                placeholder="Nguyễn Mai Anh"
                required
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1 space-y-1">
                <label className="text-xs text-slate-400 font-semibold">Năm sinh *</label>
                <input
                  type="number"
                  name="birthYear"
                  value={formData.birthYear}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-amber-400 focus:outline-none"
                  required
                />
              </div>
              <div className="flex-1 space-y-1">
                <label className="text-xs text-slate-400 font-semibold">Nơi sinh sống *</label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-amber-400 focus:outline-none"
                >
                  <option value="Hà Nội">Hà Nội</option>
                  <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                </select>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-semibold">Quê quán</label>
              <input
                type="text"
                name="hometown"
                value={formData.hometown}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-amber-400 focus:outline-none"
                placeholder="Nam Định"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1 space-y-1">
                <label className="text-xs text-slate-400 font-semibold">Điện thoại *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-amber-400 focus:outline-none"
                  placeholder="0912345678"
                  required
                />
              </div>
              <div className="flex-1 space-y-1">
                <label className="text-xs text-slate-400 font-semibold">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-amber-400 focus:outline-none"
                  placeholder="name@gmail.com"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: BODY METRICS */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h3 className="font-display font-bold text-lg text-white">2. Số Đo Nhân Trắc</h3>
            <div className="flex gap-4">
              <div className="flex-1 space-y-1">
                <label className="text-xs text-slate-400 font-semibold">Chiều cao (cm) *</label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-amber-400 focus:outline-none"
                  required
                />
              </div>
              <div className="flex-1 space-y-1">
                <label className="text-xs text-slate-400 font-semibold">Cân nặng (kg) *</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-amber-400 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-semibold">Số đo 3 vòng (cm) *</label>
              <div className="flex gap-3">
                <input
                  type="number"
                  name="bust"
                  placeholder="V1"
                  value={formData.bust}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-white/10 bg-slate-900/60 py-3 text-center text-sm text-white focus:border-amber-400 focus:outline-none"
                  required
                />
                <input
                  type="number"
                  name="waist"
                  placeholder="V2"
                  value={formData.waist}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-white/10 bg-slate-900/60 py-3 text-center text-sm text-white focus:border-amber-400 focus:outline-none"
                  required
                />
                <input
                  type="number"
                  name="hips"
                  placeholder="V3"
                  value={formData.hips}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-white/10 bg-slate-900/60 py-3 text-center text-sm text-white focus:border-amber-400 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1 space-y-1">
                <label className="text-xs text-slate-400 font-semibold">Phẫu thuật thẩm mỹ *</label>
                <select
                  name="plasticSurgery"
                  value={formData.plasticSurgery}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-amber-400 focus:outline-none"
                >
                  <option value="false">Chưa từng phẫu thuật</option>
                  <option value="true">Đã từng phẫu thuật</option>
                </select>
              </div>
              <div className="flex-1 space-y-1">
                <label className="text-xs text-slate-400 font-semibold">Tình trạng hôn nhân *</label>
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-amber-400 focus:outline-none"
                >
                  <option value="Độc thân">Độc thân</option>
                  <option value="Đã kết hôn">Đã kết hôn</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: EDUCATION & SKILLS */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h3 className="font-display font-bold text-lg text-white">3. Kỹ Năng & Học Vấn</h3>
            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-semibold">Trình độ học vấn *</label>
              <input
                type="text"
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-amber-400 focus:outline-none"
                placeholder="Cử nhân Học viện Ngoại giao"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-semibold">Ngoại ngữ (Ngăn cách bằng dấu phẩy) *</label>
              <input
                type="text"
                name="languages"
                value={formData.languages}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-amber-400 focus:outline-none"
                placeholder="Tiếng Anh, Tiếng Việt, Tiếng Trung"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-semibold">Kỹ năng nổi bật (Ngăn cách bằng dấu phẩy) *</label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-amber-400 focus:outline-none"
                placeholder="Catwalk, Diễn xuất trước ống kính, Livestream"
                required
              />
            </div>
          </div>
        )}

        {/* STEP 4: SOCIALS & PORTFOLIO */}
        {step === 4 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h3 className="font-display font-bold text-lg text-white">4. Mạng Xã Hội & Độ Phủ</h3>
            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-semibold">Số lượng Followers (Tổng các kênh) *</label>
              <input
                type="number"
                name="followersCount"
                value={formData.followersCount}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-amber-400 focus:outline-none"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-semibold">TikTok ID</label>
              <input
                type="text"
                name="tiktok"
                value={formData.tiktok}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-amber-400 focus:outline-none"
                placeholder="@maianh_beauty"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-semibold">Instagram Username</label>
              <input
                type="text"
                name="instagram"
                value={formData.instagram}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-amber-400 focus:outline-none"
                placeholder="maianh.nguyen"
              />
            </div>
          </div>
        )}

        {/* STEP 5: SURVEY QUESTIONS */}
        {step === 5 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h3 className="font-display font-bold text-lg text-white">5. Khảo Sát Định Hướng</h3>
            
            {/* Show only one question at a time depending on answers count to keep page scroll light */}
            {SURVEY_QUESTIONS.map((q, idx) => {
              const selectedIdx = surveyAnswers[q.id];
              return (
                <div key={q.id} className="rounded-xl border border-[#151b2d] bg-[#08090f] p-5 space-y-3.5">
                  <h4 className="text-xs font-bold text-slate-200">
                    Câu {idx + 1}: {q.question}
                  </h4>
                  <div className="space-y-2">
                    {q.options.map((opt, oIdx) => {
                      const isSelected = selectedIdx === oIdx;
                      return (
                        <div
                          key={oIdx}
                          onClick={() => handleSurveySelect(q.id, oIdx)}
                          className={cn(
                            "flex items-center gap-3.5 rounded-xl border px-5 py-3.5 text-xs text-left cursor-pointer transition-all duration-300",
                            isSelected
                              ? "border-amber-400 bg-amber-400/10 text-amber-300 font-bold shadow-[0_0_15px_rgba(244,196,48,0.05)]"
                              : "border-[#151b2d] bg-slate-950/40 hover:bg-white/2 text-slate-400"
                          )}
                        >
                          <div className={cn(
                            "h-4 w-4 rounded-full border flex items-center justify-center",
                            isSelected ? "border-amber-400" : "border-slate-500"
                          )}>
                            {isSelected && <div className="h-2 w-2 rounded-full bg-amber-400" />}
                          </div>
                          <span className="flex-1 leading-normal">{opt}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-white/5">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="flex h-12 flex-1 items-center justify-center rounded-xl border border-white/10 bg-transparent font-display text-sm font-semibold text-white hover:bg-white/5 transition-all"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại
            </button>
          )}

          {step < 5 ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex h-12 flex-1 items-center justify-center rounded-xl bg-gradient-to-r from-amber-200 to-amber-500 font-display text-sm font-semibold text-slate-950 shadow-md hover:shadow-lg active:scale-98 transition-all"
            >
              Tiếp tục <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              className="flex h-12 flex-1 items-center justify-center rounded-xl bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 font-display text-sm font-semibold text-slate-950 shadow-md hover:shadow-lg active:scale-98 transition-all"
            >
              Hoàn Thành Khảo Sát <Sparkles className="ml-2 h-4 w-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
