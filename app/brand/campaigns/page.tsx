"use client";

import React, { useState } from "react";
import { 
  Briefcase, Plus, ChevronRight, X, ArrowLeft, ArrowRight, Sparkles, 
  DollarSign, Calendar, Users, Eye, Target, CheckCircle2, Shield, AlertCircle,
  FileText, Upload, PlusCircle, ArrowUpRight, ArrowDownRight, RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data for Campaigns
const INITIAL_CAMPAIGNS = [
  {
    id: "camp-1",
    name: "Beauty Mega Live 06/2026",
    type: "KOC Livestream",
    status: "Đang Chạy",
    budget: "120.000.000đ",
    budgetVal: 120000000,
    spent: "80.000.000đ",
    talentsBooked: 12,
    talentsTarget: 15,
    reachEstimate: "1.8M",
    description: "Chiến dịch livestream đại sứ thương hiệu cho dòng sản phẩm Organic Cosmetics.",
    startDate: "2026-06-01",
    endDate: "2026-06-15",
    location: "Hà Nội & TP. HCM (Hybrid)",
    pipeline: {
      shortlist: [
        { id: "t-1", name: "Nguyễn Mai Anh", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&h=150&q=80", rate: "8M", match: 96 },
        { id: "t-2", name: "Trần Thu Thảo", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80", rate: "7M", match: 89 }
      ],
      invited: [
        { id: "t-3", name: "Khánh Linh", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80", rate: "6M", match: 91 }
      ],
      accepted: [
        { id: "t-4", name: "Nguyễn Hương Giang", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80", rate: "12M", match: 85 }
      ],
      escrowed: [
        { id: "t-5", name: "Lê Ngọc Hân", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&h=150&q=80", rate: "15M", match: 88 }
      ],
      inProgress: [
        { id: "t-6", name: "Phạm Minh Hằng", avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=150&h=150&q=80", rate: "9M", match: 82 }
      ],
      completed: [
        { id: "t-7", name: "Vũ Mỹ Linh", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80", rate: "10M", match: 94 }
      ]
    }
  },
  {
    id: "camp-2",
    name: "Summer Fashion High-End Runway",
    type: "Runway Model",
    status: "Đang Chạy",
    budget: "250.000.000đ",
    budgetVal: 250000000,
    spent: "150.000.000đ",
    talentsBooked: 8,
    talentsTarget: 10,
    reachEstimate: "850K",
    description: "Trình diễn sàn diễn thời trang Summer Collection 2026 cao cấp.",
    startDate: "2026-06-20",
    endDate: "2026-06-21",
    location: "Phú Quốc (Offline)",
    pipeline: {
      shortlist: [],
      invited: [],
      accepted: [],
      escrowed: [],
      inProgress: [],
      completed: []
    }
  },
  {
    id: "camp-3",
    name: "Organic Glow Cosmetics Launch",
    type: "KOL Ambassador",
    status: "Chờ Đặt Cọc",
    budget: "90.000.000đ",
    budgetVal: 90000000,
    spent: "0đ",
    talentsBooked: 3,
    talentsTarget: 3,
    reachEstimate: "2.4M",
    description: "Đại sứ thương hiệu dòng sản phẩm chống lão hóa thuần chay mới.",
    startDate: "2026-07-01",
    endDate: "2026-12-31",
    location: "Toàn quốc (Online)",
    pipeline: {
      shortlist: [],
      invited: [],
      accepted: [],
      escrowed: [],
      inProgress: [],
      completed: []
    }
  }
];

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState(INITIAL_CAMPAIGNS);
  const [activeTab, setActiveTab] = useState<"active" | "completed" | "draft">("active");
  const [selectedCampaign, setSelectedCampaign] = useState<typeof INITIAL_CAMPAIGNS[0] | null>(null);
  const [detailTab, setDetailTab] = useState<"pipeline" | "brief" | "budget">("pipeline");

  // Stepper Modal State
  const [isCreating, setIsCreating] = useState(false);
  const [createStep, setCreateStep] = useState(1);
  const [newCampaignForm, setNewCampaignForm] = useState({
    name: "",
    type: "KOL/Influencer quảng cáo",
    budget: "50000000",
    talentsTarget: "5",
    startDate: "2026-06-10",
    endDate: "2026-06-25",
    location: "Hà Nội",
    brief: "",
    gender: "Nữ",
    age: "18-25",
    height: "Trên 1m68",
    tier: "Tier A"
  });

  const handleCreateInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewCampaignForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    if (createStep < 5) setCreateStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    if (createStep > 1) setCreateStep((prev) => prev - 1);
  };

  const handleSaveCampaign = () => {
    const newCamp = {
      id: `camp-${Date.now()}`,
      name: newCampaignForm.name || "Chiến dịch mới",
      type: newCampaignForm.type,
      status: "Nháp",
      budget: `${Number(newCampaignForm.budget).toLocaleString("vi-VN")}đ`,
      budgetVal: Number(newCampaignForm.budget),
      spent: "0đ",
      talentsBooked: 0,
      talentsTarget: Number(newCampaignForm.talentsTarget) || 5,
      reachEstimate: "1.2M",
      description: newCampaignForm.brief || "Chưa có mô tả.",
      startDate: newCampaignForm.startDate,
      endDate: newCampaignForm.endDate,
      location: newCampaignForm.location,
      pipeline: {
        shortlist: [
          { id: "t-10", name: "Khánh Linh", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80", rate: "6M", match: 95 }
        ],
        invited: [],
        accepted: [],
        escrowed: [],
        inProgress: [],
        completed: []
      }
    };
    setCampaigns((prev) => [newCamp, ...prev]);
    setIsCreating(false);
    setCreateStep(1);
    // Reset form
    setNewCampaignForm({
      name: "",
      type: "KOL/Influencer quảng cáo",
      budget: "50000000",
      talentsTarget: "5",
      startDate: "2026-06-10",
      endDate: "2026-06-25",
      location: "Hà Nội",
      brief: "",
      gender: "Nữ",
      age: "18-25",
      height: "Trên 1m68",
      tier: "Tier A"
    });
  };

interface TalentInStage {
  id: string;
  name: string;
  avatar: string;
  rate: string;
  match: number;
}

interface CampaignPipeline {
  shortlist: TalentInStage[];
  invited: TalentInStage[];
  accepted: TalentInStage[];
  escrowed: TalentInStage[];
  inProgress: TalentInStage[];
  completed: TalentInStage[];
}

  // Drag-and-drop or simple stage move simulator inside pipeline
  const moveTalent = (talentId: string, currentStage: string, nextStage: string) => {
    if (!selectedCampaign) return;
    
    const updatedCampaigns = campaigns.map((camp) => {
      if (camp.id !== selectedCampaign.id) return camp;

      const pipeline = { ...camp.pipeline } as CampaignPipeline;
      const currentKey = currentStage as keyof CampaignPipeline;
      const nextKey = nextStage as keyof CampaignPipeline;

      const talentToMove = pipeline[currentKey].find((t) => t.id === talentId);
      
      if (!talentToMove) return camp;

      // Remove from current
      pipeline[currentKey] = pipeline[currentKey].filter((t) => t.id !== talentId);
      // Add to next
      pipeline[nextKey] = [...pipeline[nextKey], talentToMove];

      return {
        ...camp,
        pipeline
      };
    });

    setCampaigns(updatedCampaigns);
    
    // Update local state for selection view
    const newSelected = updatedCampaigns.find((c) => c.id === selectedCampaign.id);
    if (newSelected) setSelectedCampaign(newSelected);
  };

  return (
    <div className="space-y-6">
      
      {/* Campaign Detail View Panel */}
      {selectedCampaign ? (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Header breadcrumb & info */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-5">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setSelectedCampaign(null)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/5 bg-slate-900/30 text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-4.5 w-4.5" />
              </button>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-block rounded-full bg-white/5 px-2.5 py-0.5 text-[9px] font-semibold text-slate-400">
                    {selectedCampaign.type}
                  </span>
                  <span className="inline-block rounded-full bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[9px] font-bold text-amber-400">
                    {selectedCampaign.status}
                  </span>
                </div>
                <h1 className="font-display text-xl font-bold text-white tracking-wide">{selectedCampaign.name}</h1>
              </div>
            </div>

            <div className="flex gap-4 text-xs">
              <div className="rounded-xl border border-white/5 bg-slate-950/40 px-4 py-2.5">
                <span className="block text-[8px] font-semibold text-slate-500 uppercase tracking-wider">Ngân Sách</span>
                <span className="text-sm font-bold text-amber-400">{selectedCampaign.budget}</span>
              </div>
              <div className="rounded-xl border border-white/5 bg-slate-950/40 px-4 py-2.5">
                <span className="block text-[8px] font-semibold text-slate-500 uppercase tracking-wider">Đã Chi Tiêu</span>
                <span className="text-sm font-bold text-cyan-400">{selectedCampaign.spent}</span>
              </div>
              <div className="rounded-xl border border-white/5 bg-slate-950/40 px-4 py-2.5">
                <span className="block text-[8px] font-semibold text-slate-500 uppercase tracking-wider">Reach Dự Kiến</span>
                <span className="text-sm font-bold text-white">{selectedCampaign.reachEstimate}</span>
              </div>
            </div>
          </div>

          {/* Sub-tabs selection */}
          <div className="flex gap-1.5 border-b border-white/5 pb-1">
            <button
              onClick={() => setDetailTab("pipeline")}
              className={cn(
                "px-4 py-2 font-display text-xs font-bold uppercase tracking-wider border-b-2 transition-all",
                detailTab === "pipeline" ? "border-amber-400 text-amber-400" : "border-transparent text-slate-500 hover:text-slate-300"
              )}
            >
              Pipeline Nhân Sự (Kanban)
            </button>
            <button
              onClick={() => setDetailTab("brief")}
              className={cn(
                "px-4 py-2 font-display text-xs font-bold uppercase tracking-wider border-b-2 transition-all",
                detailTab === "brief" ? "border-amber-400 text-amber-400" : "border-transparent text-slate-500 hover:text-slate-300"
              )}
            >
              Nội Dung Brief
            </button>
            <button
              onClick={() => setDetailTab("budget")}
              className={cn(
                "px-4 py-2 font-display text-xs font-bold uppercase tracking-wider border-b-2 transition-all",
                detailTab === "budget" ? "border-amber-400 text-amber-400" : "border-transparent text-slate-500 hover:text-slate-300"
              )}
            >
              Thu Chi & Ví Đặt Cọc
            </button>
          </div>

          {/* Tab 1: Pipeline Kanban Board */}
          {detailTab === "pipeline" && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 overflow-x-auto pb-4">
              
              {/* Shortlist Column */}
              <div className="rounded-2xl border border-white/5 bg-slate-950/20 p-3 min-w-[180px] space-y-3">
                <div className="flex justify-between items-center px-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Shortlist</span>
                  <span className="rounded bg-white/5 px-1.5 py-0.2 text-[9px] font-bold text-white">{selectedCampaign.pipeline.shortlist.length}</span>
                </div>
                <div className="space-y-2">
                  {selectedCampaign.pipeline.shortlist.map((t) => (
                    <div key={t.id} className="rounded-xl border border-white/5 bg-slate-900/40 p-3 relative group">
                      <img src={t.avatar} alt={t.name} className="h-8 w-8 rounded-full object-cover border border-amber-400/20 mb-2" />
                      <h4 className="text-[11px] font-bold text-white truncate">{t.name}</h4>
                      <div className="flex justify-between text-[9px] text-slate-500 mt-1">
                        <span>Cát-xê: {t.rate}</span>
                        <span className="text-amber-400 font-semibold">{t.match}%</span>
                      </div>
                      <button 
                        onClick={() => moveTalent(t.id, "shortlist", "invited")}
                        className="mt-2.5 w-full rounded bg-amber-400/10 hover:bg-amber-400 hover:text-slate-950 border border-amber-500/20 text-[9px] font-bold py-1 transition-all"
                      >
                        Gửi lời mời
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Invited Column */}
              <div className="rounded-2xl border border-white/5 bg-slate-950/20 p-3 min-w-[180px] space-y-3">
                <div className="flex justify-between items-center px-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Đã Mời</span>
                  <span className="rounded bg-white/5 px-1.5 py-0.2 text-[9px] font-bold text-white">{selectedCampaign.pipeline.invited.length}</span>
                </div>
                <div className="space-y-2">
                  {selectedCampaign.pipeline.invited.map((t) => (
                    <div key={t.id} className="rounded-xl border border-white/5 bg-slate-900/40 p-3">
                      <img src={t.avatar} alt={t.name} className="h-8 w-8 rounded-full object-cover border border-amber-400/20 mb-2" />
                      <h4 className="text-[11px] font-bold text-white truncate">{t.name}</h4>
                      <span className="block text-[8px] text-slate-500 mt-1">Đang phản hồi...</span>
                      <button 
                        onClick={() => moveTalent(t.id, "invited", "accepted")}
                        className="mt-2 w-full rounded bg-cyan-400/10 hover:bg-cyan-400 hover:text-slate-950 border border-cyan-500/20 text-[9px] font-bold py-1 transition-all"
                      >
                        Chấp nhận (Giả lập)
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Accepted Column */}
              <div className="rounded-2xl border border-white/5 bg-slate-950/20 p-3 min-w-[180px] space-y-3">
                <div className="flex justify-between items-center px-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Đã Nhận</span>
                  <span className="rounded bg-white/5 px-1.5 py-0.2 text-[9px] font-bold text-white">{selectedCampaign.pipeline.accepted.length}</span>
                </div>
                <div className="space-y-2">
                  {selectedCampaign.pipeline.accepted.map((t) => (
                    <div key={t.id} className="rounded-xl border border-amber-500/10 bg-amber-500/5 p-3">
                      <img src={t.avatar} alt={t.name} className="h-8 w-8 rounded-full object-cover border border-amber-400/20 mb-2" />
                      <h4 className="text-[11px] font-bold text-white truncate">{t.name}</h4>
                      <span className="block text-[8px] text-amber-400 font-semibold mt-1">Chờ Đặt Cọc</span>
                      <button 
                        onClick={() => moveTalent(t.id, "accepted", "escrowed")}
                        className="mt-2 w-full rounded bg-gradient-to-r from-amber-200 to-yellow-600 font-bold text-slate-950 text-[9px] py-1 transition-all shadow-md"
                      >
                        Đặt Cọc Ngay
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Escrowed Column */}
              <div className="rounded-2xl border border-white/5 bg-slate-950/20 p-3 min-w-[180px] space-y-3">
                <div className="flex justify-between items-center px-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Đã Đặt Cọc</span>
                  <span className="rounded bg-white/5 px-1.5 py-0.2 text-[9px] font-bold text-white">{selectedCampaign.pipeline.escrowed.length}</span>
                </div>
                <div className="space-y-2">
                  {selectedCampaign.pipeline.escrowed.map((t) => (
                    <div key={t.id} className="rounded-xl border border-cyan-500/10 bg-cyan-500/5 p-3">
                      <img src={t.avatar} alt={t.name} className="h-8 w-8 rounded-full object-cover border border-cyan-400/20 mb-2" />
                      <h4 className="text-[11px] font-bold text-white truncate">{t.name}</h4>
                      <span className="block text-[8px] text-cyan-400 font-semibold mt-1">Đã khóa tiền</span>
                      <button 
                        onClick={() => moveTalent(t.id, "escrowed", "inProgress")}
                        className="mt-2 w-full rounded bg-cyan-500/10 hover:bg-cyan-500 hover:text-slate-950 border border-cyan-500/20 text-[9px] font-bold py-1 transition-all"
                      >
                        Bắt Đầu Thực Hiện
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* In Progress Column */}
              <div className="rounded-2xl border border-white/5 bg-slate-950/20 p-3 min-w-[180px] space-y-3">
                <div className="flex justify-between items-center px-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Đang Làm</span>
                  <span className="rounded bg-white/5 px-1.5 py-0.2 text-[9px] font-bold text-white">{selectedCampaign.pipeline.inProgress.length}</span>
                </div>
                <div className="space-y-2">
                  {selectedCampaign.pipeline.inProgress.map((t) => (
                    <div key={t.id} className="rounded-xl border border-white/5 bg-slate-900/40 p-3">
                      <img src={t.avatar} alt={t.name} className="h-8 w-8 rounded-full object-cover border border-slate-500 mb-2" />
                      <h4 className="text-[11px] font-bold text-white truncate">{t.name}</h4>
                      <span className="block text-[8px] text-slate-500 mt-1">Đang quay TVC...</span>
                      <button 
                        onClick={() => moveTalent(t.id, "inProgress", "completed")}
                        className="mt-2 w-full rounded bg-emerald-500/10 hover:bg-emerald-500 hover:text-slate-950 border border-emerald-500/20 text-[9px] font-bold py-1 transition-all"
                      >
                        Nghiệm Thu (Hoàn thành)
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Completed Column */}
              <div className="rounded-2xl border border-white/5 bg-slate-950/20 p-3 min-w-[180px] space-y-3">
                <div className="flex justify-between items-center px-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hoàn Tất</span>
                  <span className="rounded bg-white/5 px-1.5 py-0.2 text-[9px] font-bold text-white">{selectedCampaign.pipeline.completed.length}</span>
                </div>
                <div className="space-y-2">
                  {selectedCampaign.pipeline.completed.map((t) => (
                    <div key={t.id} className="rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-3">
                      <div className="flex justify-between">
                        <img src={t.avatar} alt={t.name} className="h-8 w-8 rounded-full object-cover border border-emerald-400/20 mb-2" />
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      </div>
                      <h4 className="text-[11px] font-bold text-white truncate">{t.name}</h4>
                      <span className="block text-[8px] text-emerald-400 font-semibold mt-1">Đã giải ngân cát-xê</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Tab 2: Campaign Brief */}
          {detailTab === "brief" && (
            <div className="rounded-2xl border border-white/5 bg-slate-950/20 p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="space-y-4">
                  <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider">Thông Tin Chi Tiết Brief</h3>
                  <div className="space-y-3.5 text-xs">
                    <div>
                      <span className="block text-slate-500">Mô tả chiến dịch:</span>
                      <p className="text-slate-300 mt-1 leading-relaxed">{selectedCampaign.description}</p>
                    </div>
                    <div>
                      <span className="block text-slate-500">Địa điểm:</span>
                      <p className="text-slate-200 mt-0.5">{selectedCampaign.location}</p>
                    </div>
                    <div>
                      <span className="block text-slate-500">Thời gian diễn ra:</span>
                      <p className="text-slate-200 mt-0.5">{selectedCampaign.startDate} đến {selectedCampaign.endDate}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
                  <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider">Tài Liệu Hướng Dẫn & Đính Kèm</h3>
                  <div className="rounded-xl border border-white/5 bg-slate-900/30 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-amber-400" />
                      <div>
                        <h4 className="text-xs font-bold text-white">Guidelines_TVC_Launch_Organic.pdf</h4>
                        <span className="text-[9px] text-slate-500">Kích thước: 4.8 MB</span>
                      </div>
                    </div>
                    <button className="text-xs text-slate-400 hover:text-white font-semibold">Tải về</button>
                  </div>

                  <div className="rounded-xl border border-dashed border-white/10 bg-slate-900/20 p-4 text-center cursor-pointer hover:bg-slate-900/40 transition-colors">
                    <Upload className="h-5 w-5 mx-auto text-slate-500 mb-1.5" />
                    <span className="block text-[10px] text-slate-400 font-semibold">Tải file tài liệu bổ sung (PDF, ZIP, DOCX)</span>
                    <span className="text-[8px] text-slate-600 block mt-0.5">Tối đa 15MB</span>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Tab 3: Campaign Budget & Escrow */}
          {detailTab === "budget" && (
            <div className="rounded-2xl border border-white/5 bg-slate-950/20 p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                <div className="rounded-xl border border-white/5 bg-slate-900/30 p-4">
                  <span className="block text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">Tổng Ngân Sách</span>
                  <span className="text-lg font-black text-amber-400">{selectedCampaign.budget}</span>
                </div>

                <div className="rounded-xl border border-white/5 bg-slate-900/30 p-4">
                  <span className="block text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">Đã Giải Ngân</span>
                  <span className="text-lg font-black text-emerald-400">{selectedCampaign.spent}</span>
                </div>

                <div className="rounded-xl border border-white/5 bg-slate-900/30 p-4">
                  <span className="block text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">Số Dư Khóa Đặt Cọc</span>
                  <span className="text-lg font-black text-cyan-400">
                    {((selectedCampaign.pipeline.escrowed.length + selectedCampaign.pipeline.inProgress.length) * 10000000).toLocaleString("vi-VN")}đ
                  </span>
                </div>

              </div>

              {/* Transactions table */}
              <div className="space-y-3">
                <h3 className="font-display font-bold text-xs text-white uppercase tracking-wider">Lịch Sử Giao Dịch Escrow</h3>
                <div className="overflow-x-auto rounded-xl border border-white/5 bg-slate-900/10">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/5 bg-white/2 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                        <th className="px-4 py-3">Giao Dịch ID</th>
                        <th className="px-4 py-3">Tài Năng</th>
                        <th className="px-4 py-3">Loại Giao Dịch</th>
                        <th className="px-4 py-3">Số Tiền</th>
                        <th className="px-4 py-3">Trạng Thái</th>
                        <th className="px-4 py-3">Thời Gian</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/3">
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-400">TXN-0091</td>
                        <td className="px-4 py-3 text-white">Vũ Mỹ Linh</td>
                        <td className="px-4 py-3 text-slate-300">Giải ngân Escrow</td>
                        <td className="px-4 py-3 text-emerald-400 font-bold">-10.000.000đ</td>
                        <td className="px-4 py-3"><span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[9px] text-emerald-400 font-bold">Thành công</span></td>
                        <td className="px-4 py-3 text-slate-500">2026-05-26 14:32</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-400">TXN-0084</td>
                        <td className="px-4 py-3 text-white">Lê Ngọc Hân</td>
                        <td className="px-4 py-3 text-slate-300">Đặt cọc (Escrow Locked)</td>
                        <td className="px-4 py-3 text-cyan-400 font-bold">+15.000.000đ</td>
                        <td className="px-4 py-3"><span className="rounded bg-cyan-500/10 px-2 py-0.5 text-[9px] text-cyan-400 font-bold">Đang Khóa</span></td>
                        <td className="px-4 py-3 text-slate-500">2026-05-24 10:15</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>
      ) : (
        <div className="space-y-6">
          
          {/* Header Campaigns List */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-4">
            <div>
              <h1 className="font-display text-2xl font-extrabold tracking-tight text-white">
                QUẢN LÝ <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 bg-clip-text text-transparent">CHIẾN DỊCH</span>
              </h1>
              <p className="text-xs text-slate-400">
                Theo dõi quy trình tuyển dụng tài năng, đặt cọc hợp đồng và phân phối nội dung quảng cáo.
              </p>
            </div>

            <button
              onClick={() => setIsCreating(true)}
              className="flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 px-5 font-display text-xs font-bold text-slate-950 shadow-lg shadow-amber-500/10 hover:shadow-xl active:scale-98 transition-all"
            >
              <Plus className="mr-1.5 h-4.5 w-4.5" /> Tạo Chiến Dịch
            </button>
          </div>

          {/* Active / Drafts / Completed Tabs Selection */}
          <div className="flex gap-2.5">
            <button
              onClick={() => setActiveTab("active")}
              className={cn(
                "rounded-xl px-4 py-2 text-xs font-bold tracking-wide transition-colors",
                activeTab === "active" ? "bg-white/5 text-white" : "bg-transparent text-slate-400 hover:text-white"
              )}
            >
              Đang Chạy ({campaigns.filter(c => c.status === "Đang Chạy" || c.status === "Chờ Đặt Cọc").length})
            </button>
            <button
              onClick={() => setActiveTab("draft")}
              className={cn(
                "rounded-xl px-4 py-2 text-xs font-bold tracking-wide transition-colors",
                activeTab === "draft" ? "bg-white/5 text-white" : "bg-transparent text-slate-400 hover:text-white"
              )}
            >
              Bản Nháp ({campaigns.filter(c => c.status === "Nháp").length})
            </button>
          </div>

          {/* Campaign Cards Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {campaigns
              .filter((c) => {
                if (activeTab === "active") return c.status === "Đang Chạy" || c.status === "Chờ Đặt Cọc";
                return c.status === "Nháp";
              })
              .map((camp) => (
                <div 
                  key={camp.id}
                  className="rounded-2xl border border-white/5 bg-slate-950/20 p-5 hover:border-white/10 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-[9px] font-semibold text-slate-400">
                        {camp.type}
                      </span>
                      <span className={cn(
                        "rounded px-2 py-0.5 text-[9px] font-bold",
                        camp.status === "Đang Chạy" ? "bg-emerald-500/10 text-emerald-400" : camp.status === "Chờ Đặt Cọc" ? "bg-amber-500/10 text-amber-400" : "bg-white/10 text-slate-400"
                      )}>
                        {camp.status}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-sm text-white tracking-wide mb-2 line-clamp-1">
                      {camp.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mb-4">
                      {camp.description}
                    </p>
                  </div>

                  <div className="border-t border-white/5 pt-4 space-y-4">
                    <div className="flex justify-between text-xs">
                      <div>
                        <span className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider">Ngân Sách</span>
                        <span className="font-bold text-amber-400">{camp.budget}</span>
                      </div>
                      <div>
                        <span className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider">Reach Dự Kiến</span>
                        <span className="font-bold text-white">{camp.reachEstimate}</span>
                      </div>
                      <div>
                        <span className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider">Booked</span>
                        <span className="font-bold text-slate-300">{camp.talentsBooked} / {camp.talentsTarget}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedCampaign(camp)}
                      className="flex h-9 w-full items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 font-display text-[10px] font-bold text-white transition-colors"
                    >
                      Quản lý Pipeline & Brief <ChevronRight className="ml-1 h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
          </div>

        </div>
      )}

      {/* CREATE CAMPAIGN WIZARD (Step Modal Overlay) */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#070913] p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button 
              onClick={() => { setIsCreating(false); setCreateStep(1); }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Stepper Header */}
            <div className="mb-6">
              <span className="font-display text-[10px] font-black uppercase tracking-widest text-amber-400">
                Bước {createStep} / 5
              </span>
              <h2 className="font-display font-extrabold text-base text-white mt-1">Tạo Chiến Dịch Mới</h2>
              <div className="mt-2.5 flex h-1.5 w-full gap-1 rounded-full bg-white/5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div
                    key={s}
                    className={cn(
                      "h-full flex-1 rounded-full transition-all duration-300",
                      s <= createStep ? "bg-gradient-to-r from-amber-200 to-amber-500" : "bg-transparent"
                    )}
                  />
                ))}
              </div>
            </div>

            {/* STEP 1: Campaign Type */}
            {createStep === 1 && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <h3 className="font-display font-bold text-xs text-slate-300 uppercase tracking-wider">1. Lựa Chọn Thể Loại Nhu Cầu</h3>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    "KOL/Influencer quảng cáo",
                    "KOC livestream bán hàng",
                    "Người mẫu lookbook",
                    "Người mẫu runway",
                    "MC sự kiện",
                    "Đại sứ thương hiệu"
                  ].map((type) => (
                    <div
                      key={type}
                      onClick={() => setNewCampaignForm(prev => ({ ...prev, type }))}
                      className={cn(
                        "rounded-xl border p-3.5 cursor-pointer text-xs font-semibold text-center transition-all",
                        newCampaignForm.type === type
                          ? "border-amber-400 bg-amber-400/5 text-amber-300"
                          : "border-white/5 bg-slate-900/30 hover:bg-slate-900/50 text-slate-400"
                      )}
                    >
                      <Briefcase className="h-4.5 w-4.5 mx-auto mb-2 opacity-80" />
                      {type}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: Talent Requirements */}
            {createStep === 2 && (
              <div className="space-y-3 animate-in fade-in duration-300">
                <h3 className="font-display font-bold text-xs text-slate-300 uppercase tracking-wider">2. Tiêu Chí Tài Năng Mong Muốn</h3>
                
                <div className="flex gap-3">
                  <div className="flex-1 space-y-1">
                    <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Phân hạng (Tier)</label>
                    <select
                      name="tier"
                      value={newCampaignForm.tier}
                      onChange={handleCreateInputChange}
                      className="w-full rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                    >
                      <option value="Tier S">Tier S (Đặc biệt cao cấp)</option>
                      <option value="Tier A">Tier A (Người nổi tiếng/Professional)</option>
                      <option value="Tier B">Tier B (Micro-KOL/New faces)</option>
                    </select>
                  </div>

                  <div className="flex-1 space-y-1">
                    <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Giới tính</label>
                    <select
                      name="gender"
                      value={newCampaignForm.gender}
                      onChange={handleCreateInputChange}
                      className="w-full rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                    >
                      <option value="Nữ">Nữ</option>
                      <option value="Nam">Nam</option>
                      <option value="Unisex / All">Tất cả</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-1 space-y-1">
                    <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Độ tuổi</label>
                    <input
                      type="text"
                      name="age"
                      value={newCampaignForm.age}
                      onChange={handleCreateInputChange}
                      placeholder="18-25"
                      className="w-full rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div className="flex-1 space-y-1">
                    <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Chiều cao</label>
                    <input
                      type="text"
                      name="height"
                      value={newCampaignForm.height}
                      onChange={handleCreateInputChange}
                      placeholder="Trên 1m70"
                      className="w-full rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Budget & Timeline */}
            {createStep === 3 && (
              <div className="space-y-3.5 animate-in fade-in duration-300">
                <h3 className="font-display font-bold text-xs text-slate-300 uppercase tracking-wider">3. Ngân Sách & Lịch Trình</h3>
                
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Tên chiến dịch *</label>
                  <input
                    type="text"
                    name="name"
                    value={newCampaignForm.name}
                    onChange={handleCreateInputChange}
                    placeholder="Mùa Hè Rực Rỡ 2026 Lookbook"
                    required
                    className="w-full rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div className="flex gap-3">
                  <div className="flex-1 space-y-1">
                    <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Tổng ngân sách (VNĐ) *</label>
                    <input
                      type="number"
                      name="budget"
                      value={newCampaignForm.budget}
                      onChange={handleCreateInputChange}
                      className="w-full rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div className="flex-1 space-y-1">
                    <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Số lượng Talent cần tuyển *</label>
                    <input
                      type="number"
                      name="talentsTarget"
                      value={newCampaignForm.talentsTarget}
                      onChange={handleCreateInputChange}
                      className="w-full rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-1 space-y-1">
                    <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Ngày bắt đầu</label>
                    <input
                      type="date"
                      name="startDate"
                      value={newCampaignForm.startDate}
                      onChange={handleCreateInputChange}
                      className="w-full rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Ngày kết thúc</label>
                    <input
                      type="date"
                      name="endDate"
                      value={newCampaignForm.endDate}
                      onChange={handleCreateInputChange}
                      className="w-full rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Content Brief */}
            {createStep === 4 && (
              <div className="space-y-3 animate-in fade-in duration-300">
                <h3 className="font-display font-bold text-xs text-slate-300 uppercase tracking-wider">4. Nội Dung Brief & Yêu Cầu Job</h3>
                
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Nội dung tóm tắt công việc (Brief) *</label>
                  <textarea
                    name="brief"
                    rows={4}
                    value={newCampaignForm.brief}
                    onChange={handleCreateInputChange}
                    placeholder="Nhập yêu cầu chi tiết về trang phục, dress code, thông điệp chủ đạo và các sản phẩm nghiệm thu (video, hình ảnh)..."
                    className="w-full rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Khu vực địa lý</label>
                  <input
                    type="text"
                    name="location"
                    value={newCampaignForm.location}
                    onChange={handleCreateInputChange}
                    placeholder="Hà Nội, TP.HCM hoặc Online..."
                    className="w-full rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* STEP 5: AI Recommendations Results Preview */}
            {createStep === 5 && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <h3 className="font-display font-bold text-xs text-slate-300 uppercase tracking-wider">5. Kết Quả Tìm Kiếm AI Matching</h3>
                
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-center">
                  <Sparkles className="h-5 w-5 mx-auto text-amber-400 mb-1.5" />
                  <h4 className="text-xs font-bold text-white">Phân tích AI tìm thấy 14 Tài Năng tương thích</h4>
                  <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                    Dựa trên độ tuổi {newCampaignForm.age}, giới tính {newCampaignForm.gender}, và ngân sách {Number(newCampaignForm.budget).toLocaleString("vi-VN")}đ, chúng tôi đã tạo shortlist gợi ý tốt nhất cho bạn.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-xl bg-slate-900/40 p-3 border border-white/5">
                    <div className="flex items-center gap-3">
                      <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=80&h=80&q=80" alt="Shortlist model" className="h-8 w-8 rounded-full object-cover border border-amber-400/20" />
                      <div>
                        <h5 className="text-xs font-bold text-white">Nguyễn Mai Anh</h5>
                        <span className="text-[9px] text-slate-500">Tier A | 95% Match</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-amber-400">Rate: từ 8M</span>
                  </div>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-3 pt-5 border-t border-white/5 mt-5">
              {createStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="flex h-11 flex-1 items-center justify-center rounded-xl border border-white/10 bg-transparent font-display text-xs font-bold text-white hover:bg-white/5 transition-colors"
                >
                  <ArrowLeft className="mr-1.5 h-4 w-4" /> Quay lại
                </button>
              )}

              {createStep < 5 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="flex h-11 flex-1 items-center justify-center rounded-xl bg-gradient-to-r from-amber-200 to-amber-500 font-display text-xs font-bold text-slate-950 shadow-md hover:shadow-lg transition-all"
                >
                  Tiếp tục <ArrowRight className="ml-1.5 h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSaveCampaign}
                  className="flex h-11 flex-1 items-center justify-center rounded-xl bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 font-display text-xs font-bold text-slate-950 shadow-md hover:shadow-lg transition-all"
                >
                  Lưu & Tạo Shortlist <CheckCircle2 className="ml-1.5 h-4 w-4" />
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
