"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, RefreshCw, Send } from "lucide-react";
import { createBooking, fetchBookings, type BackendBooking } from "@/lib/api/bookings";
import { fetchCampaigns } from "@/lib/api/campaigns";
import { fetchTalents } from "@/lib/brand-api";
import type { Campaign, TalentProfile } from "@/lib/brand-mvp-data";

const defaultForm = {
  campaignId: "",
  profileId: "",
  startsAt: "2026-06-15T09:00",
  endsAt: "2026-06-15T12:00",
  location: "Hà Nội",
  compensationAmount: "5000000",
};

function formatDateTime(value: string) {
  return new Date(value).toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatMoney(value?: number | null) {
  return value ? `${value.toLocaleString("vi-VN")}đ` : "Thỏa thuận";
}

export default function BrandBookingsPage() {
  const [bookings, setBookings] = useState<BackendBooking[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [talents, setTalents] = useState<TalentProfile[]>([]);
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const canSubmit = form.profileId && form.startsAt && form.endsAt;

  const selectedTalent = useMemo(
    () => talents.find((talent) => talent.id === form.profileId),
    [form.profileId, talents],
  );

  async function loadData() {
    setLoading(true);
    setError("");

    try {
      const [bookingData, campaignData, talentData] = await Promise.all([
        fetchBookings(),
        fetchCampaigns(),
        fetchTalents(),
      ]);

      setBookings(bookingData);
      setCampaigns(campaignData);
      setTalents(talentData);
      setForm((current) => ({
        ...current,
        campaignId: current.campaignId || campaignData[0]?.id || "",
        profileId: current.profileId || talentData[0]?.id || "",
      }));
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Không tải được dữ liệu booking từ backend.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const booking = await createBooking(form);
      setBookings((current) => [booking, ...current]);
      setSuccess("Đã tạo booking sơ bộ. Có thể kiểm tra trong Filament Admin mục Booking.");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Không tạo được booking trên backend.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6 pb-16">
      <section className="flex flex-col gap-4 border-b border-white/5 pb-5 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-2 inline-flex rounded-md border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-amber-300">
            Booking test
          </div>
          <h1 className="font-display text-2xl font-black tracking-tight text-white">Booking sơ bộ</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
            Tạo booking thử từ brand sang talent. Dữ liệu được lưu vào backend deploy và hiện trong admin.
          </p>
        </div>
        <button
          type="button"
          onClick={loadData}
          className="flex h-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-4 text-xs font-black text-white hover:bg-white/10"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Tải lại
        </button>
      </section>

      {error && <div className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>}
      {success && <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{success}</div>}

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <form onSubmit={handleSubmit} className="rounded-2xl border border-white/5 bg-slate-950/25 p-5 xl:col-span-5">
          <h2 className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-300">
            <Send className="h-4 w-4 text-amber-300" />
            Tạo booking
          </h2>

          <div className="space-y-4">
            <label className="block">
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500">Campaign</span>
              <select
                value={form.campaignId}
                onChange={(event) => setForm((current) => ({ ...current, campaignId: event.target.value }))}
                className="h-11 w-full rounded-xl border border-white/5 bg-slate-900/50 px-3 text-xs text-white outline-none focus:border-amber-400/60"
              >
                <option value="">Không gắn campaign</option>
                {campaigns.map((campaign) => (
                  <option key={campaign.id} value={campaign.id}>{campaign.title}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500">Talent</span>
              <select
                value={form.profileId}
                onChange={(event) => setForm((current) => ({ ...current, profileId: event.target.value }))}
                required
                className="h-11 w-full rounded-xl border border-white/5 bg-slate-900/50 px-3 text-xs text-white outline-none focus:border-amber-400/60"
              >
                {talents.map((talent) => (
                  <option key={talent.id} value={talent.id}>{talent.name} - Tier {talent.tier}</option>
                ))}
              </select>
            </label>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <Field label="Bắt đầu" type="datetime-local" value={form.startsAt} onChange={(value) => setForm((current) => ({ ...current, startsAt: value }))} />
              <Field label="Kết thúc" type="datetime-local" value={form.endsAt} onChange={(value) => setForm((current) => ({ ...current, endsAt: value }))} />
            </div>

            <Field label="Địa điểm" value={form.location} onChange={(value) => setForm((current) => ({ ...current, location: value }))} />
            <Field label="Thù lao dự kiến" value={form.compensationAmount} onChange={(value) => setForm((current) => ({ ...current, compensationAmount: value }))} />

            {selectedTalent && (
              <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3 text-xs text-slate-400">
                Đang chọn <span className="font-black text-white">{selectedTalent.name}</span>, rate tham khảo {selectedTalent.rate}.
              </div>
            )}

            <button
              type="submit"
              disabled={!canSubmit || saving}
              className="flex h-11 w-full items-center justify-center rounded-xl bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-500 px-5 text-xs font-black uppercase tracking-wider text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <CalendarDays className="mr-2 h-4 w-4" />
              {saving ? "Đang tạo booking..." : "Tạo booking sơ bộ"}
            </button>
          </div>
        </form>

        <section className="space-y-3 xl:col-span-7">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-300">Booking đã tạo</h2>
          {loading ? (
            <div className="rounded-2xl border border-white/5 bg-slate-950/25 p-5 text-sm text-slate-400">Đang tải booking từ backend...</div>
          ) : bookings.length === 0 ? (
            <div className="rounded-2xl border border-white/5 bg-slate-950/25 p-5 text-sm text-slate-400">Chưa có booking nào.</div>
          ) : (
            bookings.map((booking) => (
              <article key={booking.id} className="rounded-2xl border border-white/5 bg-slate-950/25 p-5">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-black text-white">{booking.talent?.name ?? `Talent #${booking.talent_user_id}`}</h3>
                    <p className="mt-1 text-xs text-slate-500">{booking.campaign?.title ?? "Không gắn campaign"}</p>
                  </div>
                  <span className="rounded bg-amber-500/10 px-2 py-1 text-[9px] font-black uppercase text-amber-300">{booking.status}</span>
                </div>
                <div className="grid grid-cols-1 gap-2 text-xs text-slate-400 md:grid-cols-2">
                  <span>{formatDateTime(booking.starts_at)} - {formatDateTime(booking.ends_at)}</span>
                  <span>{booking.location ?? "Chưa có địa điểm"}</span>
                  <span>Thù lao: {formatMoney(booking.compensation_amount)}</span>
                  <span>Hoa hồng: {formatMoney(booking.platform_commission_amount)}</span>
                </div>
              </article>
            ))
          )}
        </section>
      </section>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-xl border border-white/5 bg-slate-900/50 px-3 text-xs text-white outline-none focus:border-amber-400/60"
      />
    </label>
  );
}
