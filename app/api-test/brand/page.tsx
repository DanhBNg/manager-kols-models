"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { ArrowLeft, Database, Loader2, RefreshCw, Save, ShieldCheck } from "lucide-react";
import {
  fetchPartnerProfile,
  fetchTalents,
  fetchWishlists,
  updatePartnerProfile,
  type PartnerProfileForm,
} from "@/lib/brand-api";
import { getApiBaseUrl, getAuthToken } from "@/lib/api-client";

const blankProfile: PartnerProfileForm = {
  organizationName: "",
  organizationType: "brand",
  industry: "",
  websiteUrl: "",
  fanpageUrl: "",
  contactName: "",
  contactPhone: "",
  contactEmail: "",
  city: "",
  description: "",
  verificationStatus: "pending",
};

type ApiTestState = {
  status: "idle" | "loading" | "success" | "error";
  message: string;
  talentCount: number;
  wishlistCount: number;
};

export default function BrandApiTestPage() {
  const [profile, setProfile] = useState<PartnerProfileForm>(blankProfile);
  const [state, setState] = useState<ApiTestState>({
    status: "idle",
    message: "Chưa kiểm tra API.",
    talentCount: 0,
    wishlistCount: 0,
  });
  const [saving, setSaving] = useState(false);

  const hasToken = Boolean(getAuthToken());

  async function loadApiData() {
    setState((current) => ({ ...current, status: "loading", message: "Đang gọi API backend..." }));

    try {
      const [partnerProfile, talents, wishlists] = await Promise.all([
        fetchPartnerProfile(),
        fetchTalents(),
        fetchWishlists(),
      ]);

      setProfile(partnerProfile);
      setState({
        status: "success",
        message: "Đã gọi API backend thành công.",
        talentCount: talents.length,
        wishlistCount: wishlists.length,
      });
    } catch (error) {
      setState({
        status: "error",
        message: error instanceof Error ? error.message : "Không gọi được API backend.",
        talentCount: 0,
        wishlistCount: 0,
      });
    }
  }

  useEffect(() => {
    loadApiData();
  }, []);

  function updateField(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setProfile((current) => ({ ...current, [name]: value }));
  }

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);

    try {
      const savedProfile = await updatePartnerProfile(profile);
      setProfile(savedProfile);
      setState((current) => ({
        ...current,
        status: "success",
        message: "Đã lưu hồ sơ đối tác vào backend. Có thể kiểm tra lại trong admin Filament.",
      }));
    } catch (error) {
      setState((current) => ({
        ...current,
        status: "error",
        message: error instanceof Error ? error.message : "Không lưu được hồ sơ đối tác.",
      }));
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#050711] px-4 py-8 text-white md:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Link href="/brand" className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-amber-300">
              <ArrowLeft className="h-4 w-4" />
              Quay lại Brand
            </Link>
            <div className="flex items-center gap-2">
              <span className="rounded-md border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-cyan-300">
                API Test
              </span>
              <span className="text-xs text-slate-500">Tách riêng để tránh merge conflict giao diện chính</span>
            </div>
            <h1 className="mt-3 text-2xl font-black tracking-tight">Test nối backend cho phía Brand</h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
              Trang này dùng để thử gọi API Laravel mà không sửa các màn `app/brand/*` đang có người khác chỉnh giao diện.
            </p>
          </div>

          <button
            onClick={loadApiData}
            className="inline-flex h-11 items-center justify-center rounded-xl bg-white/10 px-4 text-xs font-black uppercase tracking-widest text-white hover:bg-white/15"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Gọi lại API
          </button>
        </header>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <StatusCard label="Backend URL" value={getApiBaseUrl()} />
          <StatusCard label="Token đăng nhập" value={hasToken ? "Đã có" : "Chưa có"} tone={hasToken ? "green" : "amber"} />
          <StatusCard label="Talent API" value={`${state.talentCount} hồ sơ`} />
          <StatusCard label="Wishlist API" value={`${state.wishlistCount} danh sách`} />
        </section>

        <section className={`rounded-2xl border p-4 text-sm ${
          state.status === "success"
            ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-100"
            : state.status === "error"
              ? "border-red-400/20 bg-red-500/10 text-red-100"
              : "border-white/10 bg-white/[0.03] text-slate-300"
        }`}>
          <div className="flex items-center gap-2">
            {state.status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Database className="h-4 w-4" />}
            <span>{state.message}</span>
          </div>
          {!hasToken && (
            <p className="mt-2 text-xs text-amber-200">
              Chưa có token. Hãy đăng nhập tài khoản brand ở `/auth/login` trước, sau đó quay lại trang này.
            </p>
          )}
        </section>

        <form onSubmit={saveProfile} className="rounded-2xl border border-white/10 bg-slate-950/40 p-5">
          <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="text-sm font-black uppercase tracking-widest">Hồ sơ đối tác</h2>
              <p className="mt-1 text-xs text-slate-500">GET/PUT `/api/partner/profile`</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded bg-white/5 px-2 py-1 text-[10px] font-bold text-slate-300">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
              {profile.verificationStatus ?? "pending"}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormInput label="Tên tổ chức *" name="organizationName" value={profile.organizationName} onChange={updateField} required />
            <label className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Loại tổ chức *</span>
              <select name="organizationType" value={profile.organizationType} onChange={updateField} className="w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2.5 text-xs outline-none focus:border-amber-400/60">
                <option value="brand">Brand</option>
                <option value="agency">Agency</option>
                <option value="recruiter">Nhà tuyển dụng</option>
                <option value="event_organizer">Event organizer</option>
              </select>
            </label>
            <FormInput label="Ngành hàng" name="industry" value={profile.industry} onChange={updateField} />
            <FormInput label="Thành phố *" name="city" value={profile.city} onChange={updateField} required />
            <FormInput label="Website" name="websiteUrl" value={profile.websiteUrl} onChange={updateField} />
            <FormInput label="Fanpage" name="fanpageUrl" value={profile.fanpageUrl} onChange={updateField} />
            <FormInput label="Người phụ trách *" name="contactName" value={profile.contactName} onChange={updateField} required />
            <FormInput label="Số điện thoại" name="contactPhone" value={profile.contactPhone} onChange={updateField} />
            <FormInput label="Email công việc *" name="contactEmail" value={profile.contactEmail} onChange={updateField} type="email" required className="md:col-span-2" />
            <label className="space-y-1 md:col-span-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Mô tả</span>
              <textarea name="description" value={profile.description} onChange={updateField} rows={4} className="w-full resize-none rounded-xl border border-white/10 bg-slate-900 px-3 py-2.5 text-xs outline-none focus:border-amber-400/60" />
            </label>
          </div>

          <div className="mt-5 flex justify-end">
            <button disabled={saving || !hasToken} className="inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-500 px-5 text-xs font-black uppercase tracking-widest text-slate-950 disabled:cursor-not-allowed disabled:opacity-60">
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Lưu vào backend
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

function StatusCard({ label, value, tone = "blue" }: { label: string; value: string; tone?: "blue" | "green" | "amber" }) {
  const color = tone === "green" ? "text-emerald-300" : tone === "amber" ? "text-amber-300" : "text-cyan-300";

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <span className="block text-[10px] font-black uppercase tracking-widest text-slate-500">{label}</span>
      <span className={`mt-2 block truncate text-sm font-black ${color}`}>{value}</span>
    </div>
  );
}

function FormInput({
  label,
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className={`space-y-1 ${className}`}>
      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</span>
      <input {...props} className="w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2.5 text-xs outline-none focus:border-amber-400/60" />
    </label>
  );
}
