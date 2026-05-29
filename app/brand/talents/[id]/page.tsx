"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Award,
  Briefcase,
  Calendar,
  CheckCircle2,
  DollarSign,
  EyeOff,
  GraduationCap,
  Heart,
  Languages,
  MapPin,
  Ruler,
  Send,
  Share2,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import { campaigns, findTalentById, savedTalentIds } from "@/lib/brand-mvp-data";
import { cn } from "@/lib/utils";

export default function BrandTalentProfilePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const talent = useMemo(() => findTalentById(params.id), [params.id]);
  const [saved, setSaved] = useState(talent ? savedTalentIds.includes(talent.id) : false);
  const [contacted, setContacted] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState(campaigns[0]?.id ?? "");

  if (!talent) {
    return (
      <div className="flex min-h-[65vh] items-center justify-center">
        <div className="rounded-2xl border border-white/5 bg-slate-950/30 p-8 text-center">
          <h1 className="text-xl font-black text-white">Không tìm thấy hồ sơ talent</h1>
          <button onClick={() => router.push("/brand/discover")} className="mt-5 rounded-xl bg-white/10 px-4 py-2 text-xs font-bold text-white">
            Quay lại tìm kiếm
          </button>
        </div>
      </div>
    );
  }

  function sendContactRequest() {
    setContacted(true);
    window.alert("Đã tạo yêu cầu liên hệ demo. Khi nối backend, request sẽ gắn với brand, talent và campaign đã chọn.");
  }

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-300">
      <section className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#08090f] shadow-xl">
        <div className="relative h-56 w-full overflow-hidden bg-slate-950 md:h-72">
          <img src={talent.cover} alt={`${talent.name} cover`} className="h-full w-full object-cover opacity-65" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/35 to-black/75" />
          <button
            onClick={() => router.push("/brand/discover")}
            className="absolute left-4 top-4 flex h-10 items-center rounded-xl border border-white/10 bg-slate-950/70 px-3 text-xs font-bold text-slate-200 backdrop-blur hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại tìm kiếm
          </button>
          <div className="absolute right-4 top-4 rounded-md border border-amber-400/25 bg-amber-400/10 px-2 py-1 text-[9px] font-black uppercase tracking-widest text-amber-300">
            Brand view
          </div>
        </div>

        <div className="relative flex flex-col gap-5 px-6 pb-6 pt-4 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-5 md:flex-row md:items-end">
            <div className="-mt-20 h-32 w-32 shrink-0 rounded-2xl border-4 border-[#08090f] bg-slate-900 p-0.5 shadow-2xl">
              <img src={talent.avatar} alt={talent.name} className="h-full w-full rounded-xl object-cover" />
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-display text-2xl font-black tracking-wide text-white md:text-3xl">{talent.name}</h1>
                {talent.verified && <ShieldCheck className="h-6 w-6 text-amber-400" />}
                <span className="rounded bg-amber-400 px-2 py-1 text-[10px] font-black uppercase text-slate-950">Tier {talent.tier}</span>
              </div>
              <p className="flex items-center gap-1.5 text-sm font-medium text-slate-400">
                <MapPin className="h-4 w-4 text-slate-500" />
                {talent.district}, {talent.city} · {talent.type}
              </p>
              <p className="max-w-2xl text-sm leading-relaxed text-slate-400">{talent.experience}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button className="flex h-10 items-center rounded-xl border border-white/10 bg-white/5 px-4 text-xs font-bold text-slate-200 hover:text-white">
              <Share2 className="mr-2 h-4 w-4" />
              Chia sẻ nội bộ
            </button>
            <button
              onClick={() => setSaved((value) => !value)}
              className={cn(
                "flex h-10 items-center rounded-xl border px-4 text-xs font-black uppercase tracking-wider",
                saved ? "border-amber-400 bg-amber-400 text-slate-950" : "border-amber-500/30 bg-amber-500/10 text-amber-300"
              )}
            >
              <Heart className={cn("mr-2 h-4 w-4", saved && "fill-current")} />
              {saved ? "Đã lưu" : "Lưu talent"}
            </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <aside className="space-y-6 xl:col-span-4">
          <div className="rounded-2xl border border-white/5 bg-[#08090f] p-5">
            <h2 className="mb-4 flex items-center gap-2 border-b border-white/5 pb-3 text-xs font-black uppercase tracking-widest text-white">
              <Award className="h-4 w-4 text-amber-400" />
              Hình ảnh & ngoại hình
            </h2>
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-white/5 bg-slate-950">
              <img src={talent.fullBodyImage} alt={`${talent.name} full body`} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090f] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[8px] font-black uppercase tracking-widest text-amber-300">Portfolio image</span>
                <h3 className="mt-1 text-sm font-black text-white">{talent.name}</h3>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                ["Chiều cao", `${talent.height} cm`],
                ["Cân nặng", `${talent.weight} kg`],
                ["Vòng 1", `${talent.bust} cm`],
                ["Vòng 2", `${talent.waist} cm`],
                ["Vòng 3", `${talent.hips} cm`],
                ["Màu tóc", talent.hairColor],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-white/5 bg-slate-950/50 p-3 text-center">
                  <span className="block text-[9px] font-bold uppercase text-slate-500">{label}</span>
                  <span className="mt-1 block text-sm font-black text-white">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-[#08090f] p-5">
            <h2 className="mb-4 flex items-center gap-2 border-b border-white/5 pb-3 text-xs font-black uppercase tracking-widest text-white">
              <GraduationCap className="h-4 w-4 text-slate-300" />
              Học vấn & ngôn ngữ
            </h2>
            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex gap-3">
                <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
                <div>
                  <span className="block font-bold text-white">Học vấn</span>
                  <span className="text-xs text-slate-400">{talent.education}</span>
                </div>
              </div>
              <div className="flex gap-3 border-t border-white/5 pt-4">
                <Languages className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                <div>
                  <span className="block font-bold text-white">Ngôn ngữ</span>
                  <span className="text-xs text-slate-400">{talent.languages.join(", ")}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main className="space-y-6 xl:col-span-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {[
              { label: "Match", value: `${talent.matchScore}%`, icon: CheckCircle2, color: "text-emerald-300" },
              { label: "Rating", value: `${talent.rating}★`, icon: Star, color: "text-amber-300" },
              { label: "Đã hoàn thành", value: `${talent.completedJobs} job`, icon: Briefcase, color: "text-cyan-300" },
              { label: "Phản hồi", value: `${talent.responseRate}%`, icon: Users, color: "text-purple-300" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-2xl border border-white/5 bg-[#08090f] p-4">
                  <Icon className={cn("mb-3 h-5 w-5", item.color)} />
                  <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-500">{item.label}</span>
                  <span className="mt-1 block text-lg font-black text-white">{item.value}</span>
                </div>
              );
            })}
          </div>

          <div className="rounded-2xl border border-white/5 bg-[#08090f] p-6">
            <h2 className="mb-4 flex items-center gap-2 border-b border-white/5 pb-3 text-xs font-black uppercase tracking-widest text-white">
              <DollarSign className="h-4 w-4 text-amber-400" />
              Rate card tham khảo
            </h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {Object.entries(talent.rateCard).map(([label, value]) => (
                <div key={label} className="flex items-center justify-between rounded-xl border border-white/5 bg-slate-950/40 px-4 py-3">
                  <span className="text-xs font-semibold text-slate-300">{label}</span>
                  <span className="text-sm font-black text-amber-300">từ {value.toLocaleString("vi-VN")}đ</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-[#08090f] p-6">
            <h2 className="mb-4 flex items-center gap-2 border-b border-white/5 pb-3 text-xs font-black uppercase tracking-widest text-white">
              <Calendar className="h-4 w-4 text-cyan-300" />
              Lịch rảnh & portfolio
            </h2>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                <h3 className="mb-3 text-[10px] font-black uppercase tracking-widest text-slate-500">Ngày có thể nhận job</h3>
                <div className="grid grid-cols-3 gap-2">
                  {talent.availabilityDates.map((date) => (
                    <div key={date} className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-3 py-2 text-center text-xs font-black text-emerald-300">
                      {new Date(date).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" })}
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-xs text-slate-500">{talent.availability}</p>
              </div>
              <div>
                <h3 className="mb-3 text-[10px] font-black uppercase tracking-widest text-slate-500">Work samples</h3>
                <div className="space-y-2">
                  {talent.portfolio.map((item) => (
                    <div key={item} className="rounded-xl border border-white/5 bg-slate-950/40 px-3 py-2 text-xs font-semibold text-slate-300">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-[#08090f] p-6">
            <h2 className="mb-4 flex items-center gap-2 border-b border-white/5 pb-3 text-xs font-black uppercase tracking-widest text-white">
              <Ruler className="h-4 w-4 text-slate-300" />
              Kỹ năng & social
            </h2>
            <div className="mb-5 flex flex-wrap gap-2">
              {talent.skills.map((skill) => (
                <span key={skill} className="rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-slate-300">{skill}</span>
              ))}
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div className="rounded-xl border border-white/5 bg-slate-950/40 p-3">
                <span className="block text-[9px] font-bold uppercase text-slate-500">Follower</span>
                <span className="text-lg font-black text-white">{talent.followers}</span>
              </div>
              <div className="rounded-xl border border-white/5 bg-slate-950/40 p-3">
                <span className="block text-[9px] font-bold uppercase text-slate-500">Engagement</span>
                <span className="text-lg font-black text-cyan-300">{talent.engagementRate}%</span>
              </div>
              <div className="rounded-xl border border-white/5 bg-slate-950/40 p-3">
                <span className="block text-[9px] font-bold uppercase text-slate-500">Nền tảng</span>
                <span className="text-sm font-black text-white">{talent.platforms.join(", ")}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6">
            <div className="mb-4 flex items-start gap-3">
              <EyeOff className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
              <div>
                <h2 className="text-sm font-black text-white">Thông tin riêng tư được ẩn ở Brand View</h2>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">
                  Số điện thoại, email cá nhân và link liên hệ riêng của talent không hiển thị cho đối tác. Brand cần gửi yêu cầu liên hệ để hệ thống ghi nhận demand.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto]">
              <select value={selectedCampaignId} onChange={(event) => setSelectedCampaignId(event.target.value)} className="h-11 rounded-xl border border-white/5 bg-slate-950/60 px-3 text-xs text-white outline-none focus:border-amber-400/60">
                {campaigns.map((campaign) => (
                  <option key={campaign.id} value={campaign.id}>{campaign.title}</option>
                ))}
              </select>
              <button
                onClick={sendContactRequest}
                disabled={contacted}
                className={cn(
                  "flex h-11 items-center justify-center rounded-xl px-5 text-xs font-black uppercase tracking-wider",
                  contacted ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-300" : "bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-500 text-slate-950"
                )}
              >
                <Send className="mr-2 h-4 w-4" />
                {contacted ? "Đã gửi yêu cầu" : "Gửi yêu cầu liên hệ"}
              </button>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}
