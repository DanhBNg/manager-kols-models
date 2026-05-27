"use client";

import {
  ArrowRight,
  Check,
  Download,
  Filter,
  MoreHorizontal,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  controlSignals,
  getAdminModulePage,
  liveActivity,
  metrics,
  operations,
  revenueBars,
  riskAlerts,
  verificationQueue,
  type AdminMetric,
  type AdminTableRow,
  type Tone,
} from "../data";

const toneStyles: Record<Tone, { text: string; border: string; bg: string; glow: string; fill: string }> = {
  gold: {
    text: "text-amber-300",
    border: "border-amber-400/25",
    bg: "bg-amber-400/10",
    glow: "shadow-[0_0_22px_rgba(245,158,11,0.12)]",
    fill: "from-amber-200 via-amber-400 to-yellow-600",
  },
  cyan: {
    text: "text-cyan-300",
    border: "border-cyan-400/25",
    bg: "bg-cyan-400/10",
    glow: "shadow-[0_0_22px_rgba(34,211,238,0.12)]",
    fill: "from-cyan-300 to-blue-500",
  },
  purple: {
    text: "text-purple-300",
    border: "border-purple-400/25",
    bg: "bg-purple-400/10",
    glow: "shadow-[0_0_22px_rgba(168,85,247,0.12)]",
    fill: "from-purple-300 to-fuchsia-500",
  },
  emerald: {
    text: "text-emerald-300",
    border: "border-emerald-400/25",
    bg: "bg-emerald-400/10",
    glow: "shadow-[0_0_22px_rgba(52,211,153,0.12)]",
    fill: "from-emerald-300 to-teal-500",
  },
  amber: {
    text: "text-amber-300",
    border: "border-amber-400/25",
    bg: "bg-amber-400/10",
    glow: "shadow-[0_0_22px_rgba(251,191,36,0.12)]",
    fill: "from-amber-300 to-orange-500",
  },
  rose: {
    text: "text-rose-300",
    border: "border-rose-400/25",
    bg: "bg-rose-400/10",
    glow: "shadow-[0_0_22px_rgba(244,63,94,0.12)]",
    fill: "from-rose-300 to-red-500",
  },
  slate: {
    text: "text-slate-300",
    border: "border-white/10",
    bg: "bg-white/5",
    glow: "shadow-[0_0_22px_rgba(148,163,184,0.08)]",
    fill: "from-slate-300 to-slate-500",
  },
};

function GlassPanel({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/7 bg-gradient-to-b from-[#0d101b]/80 to-[#050712]/92 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.42)] backdrop-blur-xl",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />
      {children}
    </section>
  );
}

function StatusBadge({ label, tone = "slate" }: Readonly<{ label: string; tone?: Tone }>) {
  const style = toneStyles[tone];

  return (
    <span className={cn("inline-flex items-center rounded-md border px-2.5 py-1 text-[10px] font-black uppercase tracking-wider", style.border, style.bg, style.text)}>
      {label}
    </span>
  );
}

function AdminHeader() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/7 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.14),transparent_34%),linear-gradient(135deg,rgba(15,23,42,0.94),rgba(2,6,23,0.98))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <StatusBadge label="Single Admin Control Center" tone="cyan" />
            <StatusBadge label="Live Ops" tone="emerald" />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">May 2026</span>
          </div>
          <h1 className="font-display text-3xl font-black tracking-tight text-white md:text-5xl">
            ADMIN <span className="bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-600 bg-clip-text text-transparent">CONTROL CENTER</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            Van hanh toan bo Beauty Talent Ecosystem: kiem duyet ho so, giam sat escrow, dieu phoi campaign, xu ly tranh chap va theo doi rui ro nen tang.
          </p>
        </div>

        <div className="grid min-w-0 grid-cols-3 gap-3 lg:w-[360px]">
          {controlSignals.map((signal) => {
            const Icon = signal.icon;
            const tone = toneStyles[signal.tone];
            return (
              <div key={signal.label} className="rounded-2xl border border-white/7 bg-black/20 p-3">
                <Icon className={cn("mb-3 h-4 w-4", tone.text)} />
                <span className="block truncate text-lg font-black text-white">{signal.value}</span>
                <span className="mt-1 block text-[9px] font-bold uppercase tracking-wider text-slate-500">{signal.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MetricCard({ metric }: Readonly<{ metric: AdminMetric }>) {
  const Icon = metric.icon;
  const tone = toneStyles[metric.tone];

  return (
    <div className={cn("group relative overflow-hidden rounded-2xl border bg-gradient-to-b from-[#111421]/88 to-[#070913]/96 p-5 transition-all duration-300 hover:-translate-y-0.5", tone.border, tone.glow)}>
      <div className={cn("absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-10 blur-2xl bg-gradient-to-br", tone.fill)} />
      <div className="flex items-start justify-between gap-4">
        <span className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">{metric.label}</span>
        <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border", tone.border, tone.bg, tone.text)}>
          <Icon className="h-4.5 w-4.5" />
        </div>
      </div>
      <strong className="mt-5 block text-2xl font-black tracking-tight text-white">{metric.value}</strong>
      <span className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500">{metric.change}</span>
    </div>
  );
}

function OperationsTable({ rows = operations }: Readonly<{ rows?: AdminTableRow[] }>) {
  return (
    <GlassPanel className="p-0">
      <div className="flex flex-col gap-4 border-b border-white/7 p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.18em] text-white">Operational Queue</h2>
          <p className="mt-1 text-xs text-slate-500">Inline actions for profile, campaign, escrow and dispute review.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex h-9 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 text-[10px] font-black uppercase tracking-wider text-slate-300 transition hover:bg-white/10">
            <Filter className="h-3.5 w-3.5" /> Filters
          </button>
          <button className="flex h-9 items-center gap-2 rounded-xl border border-amber-400/20 bg-amber-400/10 px-3 text-[10px] font-black uppercase tracking-wider text-amber-300 transition hover:bg-amber-400/15">
            <Download className="h-3.5 w-3.5" /> Export
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse">
          <thead>
            <tr className="border-b border-white/7 text-left text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
              <th className="px-5 py-3">Entity</th>
              <th className="px-5 py-3">Owner</th>
              <th className="px-5 py-3">Value</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Risk</th>
              <th className="px-5 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-white/5 text-sm transition hover:bg-white/[0.025]">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl border text-[10px] font-black", toneStyles[row.tone].border, toneStyles[row.tone].bg, toneStyles[row.tone].text)}>
                      {row.id.slice(0, 2)}
                    </div>
                    <div>
                      <strong className="block text-sm font-black text-white">{row.primary}</strong>
                      <span className="mt-0.5 block text-xs text-slate-500">{row.secondary}</span>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-xs font-bold text-slate-400">{row.owner}</td>
                <td className="px-5 py-4 text-xs font-black text-amber-300">{row.amount}</td>
                <td className="px-5 py-4">
                  <StatusBadge label={row.status} tone={row.tone} />
                </td>
                <td className="px-5 py-4 text-xs font-black text-white">{row.risk}</td>
                <td className="px-5 py-4 text-right">
                  <button className="inline-flex h-9 items-center rounded-xl border border-white/10 bg-white/5 px-3 text-[10px] font-black uppercase tracking-wider text-slate-200 transition hover:border-amber-400/30 hover:text-amber-300">
                    {row.action}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassPanel>
  );
}

function ActivityAndRisk() {
  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <GlassPanel>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-sm font-black uppercase tracking-[0.18em] text-white">Live Activity</h2>
          <StatusBadge label="Realtime" tone="emerald" />
        </div>
        <div className="space-y-3">
          {liveActivity.map((item, index) => (
            <div key={item} className="flex gap-3 rounded-xl border border-white/5 bg-white/[0.025] p-3">
              <div className="mt-1 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
              <div>
                <p className="text-xs font-semibold text-slate-300">{item}</p>
                <span className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-slate-600">{index + 3} min ago</span>
              </div>
            </div>
          ))}
        </div>
      </GlassPanel>

      <GlassPanel>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-sm font-black uppercase tracking-[0.18em] text-white">Risk Alerts</h2>
          <StatusBadge label="4 open" tone="rose" />
        </div>
        <div className="space-y-3">
          {riskAlerts.map((item) => (
            <div key={item.label} className={cn("rounded-xl border p-3", toneStyles[item.tone].border, toneStyles[item.tone].bg)}>
              <div className="flex items-start gap-3">
                <MoreHorizontal className={cn("mt-0.5 h-4 w-4", toneStyles[item.tone].text)} />
                <p className="text-xs font-bold leading-5 text-slate-200">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassPanel>
    </div>
  );
}

function FinanceAndVerification() {
  return (
    <div className="grid gap-5 xl:grid-cols-12">
      <GlassPanel className="xl:col-span-7">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.18em] text-white">Revenue & Escrow</h2>
            <p className="mt-1 text-xs text-slate-500">GMV, platform fee, voting and funding flow.</p>
          </div>
          <StatusBadge label="Finance" tone="gold" />
        </div>
        <div className="space-y-5">
          {revenueBars.map((bar) => (
            <div key={bar.label}>
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="font-black uppercase tracking-wider text-slate-500">{bar.label}</span>
                <span className={cn("font-black", toneStyles[bar.tone].text)}>{bar.value}</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-white/5">
                <div className={cn("h-full rounded-full bg-gradient-to-r", toneStyles[bar.tone].fill)} style={{ width: bar.width }} />
              </div>
            </div>
          ))}
        </div>
      </GlassPanel>

      <GlassPanel className="xl:col-span-5">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-sm font-black uppercase tracking-[0.18em] text-white">Verification Queue</h2>
          <StatusBadge label="3 pending" tone="amber" />
        </div>
        <div className="space-y-3">
          {verificationQueue.map((item) => (
            <div key={item.name} className="rounded-xl border border-white/7 bg-black/20 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <strong className="block text-sm font-black text-white">{item.name}</strong>
                  <span className="mt-1 block text-xs text-slate-500">{item.type}</span>
                </div>
                <StatusBadge label={`Tier ${item.tier}`} tone={item.tone} />
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-white/7 pt-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Due in {item.due}</span>
                <button className="flex h-8 items-center gap-1.5 rounded-lg bg-white px-2.5 text-[10px] font-black uppercase tracking-wider text-slate-950">
                  <Check className="h-3.5 w-3.5" /> Approve
                </button>
              </div>
            </div>
          ))}
        </div>
      </GlassPanel>
    </div>
  );
}

export function AdminDashboard() {
  return (
    <div className="space-y-6 pb-10">
      <div className="space-y-6">
        <AdminHeader />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </div>
        <ActivityAndRisk />
        <FinanceAndVerification />
        <OperationsTable />
      </div>
    </div>
  );
}

export function AdminModulePage({
  title,
  kicker,
  description,
  icon: Icon,
  rows,
}: Readonly<{
  title: string;
  kicker: string;
  description: string;
  icon: React.ElementType;
  rows: AdminTableRow[];
}>) {
  return (
    <div className="space-y-6 pb-10">
      <div className="space-y-6">
        <GlassPanel className="rounded-3xl p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/25 bg-cyan-400/10 text-cyan-300">
                  <Icon className="h-5 w-5" />
                </div>
                <StatusBadge label={kicker} tone="cyan" />
              </div>
              <h1 className="font-display text-3xl font-black tracking-tight text-white md:text-4xl">{title}</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">{description}</p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  aria-label="Search admin records"
                  placeholder="Search records..."
                  className="h-11 w-full rounded-xl border border-white/10 bg-black/20 pl-9 pr-3 text-xs font-semibold text-white outline-none transition focus:border-cyan-400/40 sm:w-64"
                />
              </div>
              <button className="flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-600 px-4 text-[10px] font-black uppercase tracking-wider text-slate-950">
                Quick Action <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </GlassPanel>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {metrics.slice(0, 3).map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </div>

        <OperationsTable rows={rows.length > 0 ? rows : operations} />
        <ActivityAndRisk />
      </div>
    </div>
  );
}

export function AdminModuleRoutePage({ moduleKey }: Readonly<{ moduleKey: string }>) {
  return <AdminModulePage {...getAdminModulePage(moduleKey)} />;
}
