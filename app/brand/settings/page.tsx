"use client";

import { useEffect, useState } from "react";
import { Building2, CheckCircle2, Globe2, Mail, MapPin, Phone, Save, UserRound } from "lucide-react";
import { fetchPartnerProfile, updatePartnerProfile, type PartnerProfileForm } from "@/lib/brand-api";

const emptyProfile: PartnerProfileForm = {
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

function completion(profile: PartnerProfileForm) {
  const fields = [
    profile.organizationName,
    profile.organizationType,
    profile.industry,
    profile.contactName,
    profile.contactEmail,
    profile.contactPhone,
    profile.city,
    profile.description,
  ];

  return Math.round((fields.filter(Boolean).length / fields.length) * 100);
}

function verificationLabel(status?: string) {
  if (status === "verified") return "Đã xác minh";
  if (status === "rejected") return "Cần bổ sung";
  return "Đang xác minh";
}

export default function BrandSettingsPage() {
  const [profile, setProfile] = useState<PartnerProfileForm>(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadProfile() {
      setLoading(true);
      setError("");

      try {
        const data = await fetchPartnerProfile();
        if (mounted) {
          setProfile({ ...emptyProfile, ...data });
        }
      } catch (requestError) {
        if (mounted) {
          setError(requestError instanceof Error ? requestError.message : "Không tải được hồ sơ đối tác.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      mounted = false;
    };
  }, []);

  function updateField(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setProfile((current) => ({ ...current, [name]: value }));
  }

  async function saveProfile(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const data = await updatePartnerProfile(profile);
      setProfile({ ...emptyProfile, ...data });
      setSuccess("Đã lưu hồ sơ đối tác lên backend.");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Không lưu được hồ sơ đối tác.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6 pb-16">
      <section className="flex flex-col gap-4 border-b border-white/5 pb-5 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-md border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-amber-300">
              Partner Profile
            </span>
            <span className="text-[10px] font-semibold text-slate-500">Brand / Agency / Recruiter</span>
          </div>
          <h1 className="font-display text-2xl font-black tracking-tight text-white">
            Hồ sơ <span className="bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-500 bg-clip-text text-transparent">đối tác</span>
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
            Thông tin này được lưu vào bảng `partner_profiles` và admin có thể kiểm tra trong Filament.
          </p>
        </div>

        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
          <div className="flex items-center gap-2 text-emerald-300">
            <CheckCircle2 className="h-4 w-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">{verificationLabel(profile.verificationStatus)}</span>
          </div>
          <div className="mt-1 text-lg font-black text-white">{completion(profile)}% hoàn thiện</div>
        </div>
      </section>

      {loading && <div className="rounded-xl border border-white/5 bg-slate-950/25 px-4 py-3 text-sm text-slate-400">Đang tải hồ sơ đối tác...</div>}
      {error && <div className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>}
      {success && <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{success}</div>}

      <form onSubmit={saveProfile} className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <aside className="h-fit rounded-2xl border border-white/5 bg-slate-950/25 p-5 lg:col-span-4">
          <div className="mb-5 flex items-center gap-4 border-b border-white/5 pb-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 text-amber-300">
              <Building2 className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-sm font-black text-white">{profile.organizationName || "Chưa đặt tên tổ chức"}</h2>
              <p className="mt-1 text-xs text-slate-500">{profile.industry || "Chưa cập nhật ngành hàng"}</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <InfoLine icon={UserRound} value={profile.contactName || "Chưa có người phụ trách"} />
            <InfoLine icon={Phone} value={profile.contactPhone || "Chưa có số điện thoại"} />
            <InfoLine icon={Mail} value={profile.contactEmail || "Chưa có email"} />
            <InfoLine icon={MapPin} value={profile.city || "Chưa có thành phố"} />
            <InfoLine icon={Globe2} value={profile.websiteUrl || "Chưa có website"} />
          </div>
        </aside>

        <main className="rounded-2xl border border-white/5 bg-slate-950/25 p-6 lg:col-span-8">
          <div className="mb-5">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-300">Thông tin tổ chức</h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field name="organizationName" label="Tên tổ chức / cá nhân tuyển dụng *" value={profile.organizationName} onChange={updateField} required />
            <label className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Loại tổ chức *</span>
              <select name="organizationType" value={profile.organizationType} onChange={updateField} required className="w-full rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2.5 text-xs text-white outline-none focus:border-amber-400/60">
                <option value="brand">Brand</option>
                <option value="agency">Agency</option>
                <option value="recruiter">Nhà tuyển dụng</option>
                <option value="event_organizer">Event organizer</option>
              </select>
            </label>
            <Field name="industry" label="Ngành hàng *" value={profile.industry} onChange={updateField} required />
            <Field name="city" label="Thành phố *" value={profile.city} onChange={updateField} required />
            <Field name="websiteUrl" label="Website" value={profile.websiteUrl} onChange={updateField} />
            <Field name="fanpageUrl" label="Fanpage" value={profile.fanpageUrl} onChange={updateField} />
            <Field name="contactName" label="Người phụ trách *" value={profile.contactName} onChange={updateField} required />
            <Field name="contactPhone" label="Số điện thoại" value={profile.contactPhone} onChange={updateField} />
            <Field name="contactEmail" label="Email công việc *" type="email" value={profile.contactEmail} onChange={updateField} required className="md:col-span-2" />
            <label className="space-y-1 md:col-span-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Mô tả ngắn</span>
              <textarea name="description" value={profile.description} onChange={updateField} rows={4} className="w-full resize-none rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2.5 text-xs text-white outline-none focus:border-amber-400/60" />
            </label>
          </div>

          <div className="mt-6 flex justify-end border-t border-white/5 pt-5">
            <button type="submit" disabled={saving} className="flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-500 px-5 text-xs font-black text-slate-950 disabled:cursor-not-allowed disabled:opacity-60">
              <Save className="mr-2 h-4 w-4" />
              {saving ? "Đang lưu..." : "Lưu hồ sơ đối tác"}
            </button>
          </div>
        </main>
      </form>
    </div>
  );
}

function InfoLine({ icon: Icon, value }: { icon: typeof UserRound; value: string }) {
  return (
    <div className="flex items-center gap-2 text-slate-400">
      <Icon className="h-4 w-4 text-amber-300" />
      {value}
    </div>
  );
}

function Field({
  name,
  label,
  value,
  onChange,
  type = "text",
  required = false,
  className = "",
}: {
  name: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={`space-y-1 ${className}`}>
      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</span>
      <input name={name} type={type} value={value} onChange={onChange} required={required} className="w-full rounded-xl border border-white/5 bg-slate-900/50 px-3 py-2.5 text-xs text-white outline-none focus:border-amber-400/60" />
    </label>
  );
}
