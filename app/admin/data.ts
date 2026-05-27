import type { LucideIcon } from "lucide-react";
import {
  Activity,
  AlertTriangle,
  BadgeCheck,
  Banknote,
  BarChart3,
  Briefcase,
  Building2,
  CalendarClock,
  Crown,
  FileWarning,
  Gavel,
  LayoutDashboard,
  Megaphone,
  RadioTower,
  Settings,
  Shield,
  Sparkles,
  UserCheck,
  Users,
  Wallet,
} from "lucide-react";

export type Tone = "gold" | "cyan" | "purple" | "emerald" | "amber" | "rose" | "slate";

export type AdminMetric = {
  label: string;
  value: string;
  change: string;
  tone: Tone;
  icon: LucideIcon;
};

export type AdminTableRow = {
  id: string;
  primary: string;
  secondary: string;
  amount: string;
  status: string;
  risk: string;
  owner: string;
  action: string;
  tone: Tone;
};

export const adminNavigation = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Talents", href: "/admin/talents", icon: Users },
  { label: "Brands", href: "/admin/brands", icon: Building2 },
  { label: "Campaigns", href: "/admin/campaigns", icon: Megaphone },
  { label: "Jobs", href: "/admin/jobs", icon: Briefcase },
  { label: "Payments & Escrow", href: "/admin/payments-escrow", icon: Wallet },
  { label: "Competitions", href: "/admin/competitions", icon: Crown },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Moderation", href: "/admin/moderation", icon: Shield },
  { label: "CMS", href: "/admin/cms", icon: FileWarning },
  { label: "Users & Permissions", href: "/admin/users-permissions", icon: UserCheck },
  { label: "Notifications", href: "/admin/notifications", icon: RadioTower },
  { label: "Settings", href: "/admin/settings", icon: Settings },
  { label: "Audit Logs", href: "/admin/audit-logs", icon: Activity },
];

export const metrics: AdminMetric[] = [
  { label: "Total Talents", value: "58,420", change: "+12.5% MoM", tone: "cyan", icon: Users },
  { label: "Verified Brands", value: "1,248", change: "+8.2% MoM", tone: "purple", icon: BadgeCheck },
  { label: "Active Campaigns", value: "318", change: "42 high value", tone: "gold", icon: Megaphone },
  { label: "Escrow Holding", value: "12.8B", change: "VND secured", tone: "emerald", icon: Wallet },
  { label: "Monthly GMV", value: "3.4B", change: "+18.7% growth", tone: "gold", icon: Banknote },
  { label: "Pending Disputes", value: "12", change: "4 urgent cases", tone: "rose", icon: Gavel },
];

export const operations: AdminTableRow[] = [
  {
    id: "TL-9182",
    primary: "Mai Anh",
    secondary: "Tier A | Beauty KOL | Ha Noi",
    amount: "320M",
    status: "Verified",
    risk: "96%",
    owner: "Talent Ops",
    action: "Review tier",
    tone: "emerald",
  },
  {
    id: "BR-4421",
    primary: "Glow Beauty",
    secondary: "Cosmetics | 14 active campaigns",
    amount: "1.2B",
    status: "Active",
    risk: "92%",
    owner: "Brand Safety",
    action: "Open profile",
    tone: "cyan",
  },
  {
    id: "CP-1108",
    primary: "Mega Beauty Live",
    secondary: "18 talents | 420M escrowed",
    amount: "500M",
    status: "Monitoring",
    risk: "Medium",
    owner: "Campaign Ops",
    action: "Inspect",
    tone: "purple",
  },
  {
    id: "BK-12082",
    primary: "No-show dispute",
    secondary: "Glow Beauty vs Mai Anh",
    amount: "18M",
    status: "High Priority",
    risk: "High",
    owner: "Arbitration",
    action: "Resolve",
    tone: "rose",
  },
];

export const liveActivity = [
  "Brand Glow Beauty created campaign Mega Beauty Live.",
  "Talent Mai Anh accepted booking #BK12082.",
  "Escrow payment received: 28,000,000 VND.",
  "Dispute opened on booking #BK12031.",
  "New Tier S Talent verified.",
];

export const riskAlerts = [
  { label: "Brand Diamond Luxury cancelled 4 bookings this week.", tone: "amber" as Tone },
  { label: "Talent #TL9182 reported by 3 brands.", tone: "rose" as Tone },
  { label: "Unusual voting activity detected.", tone: "purple" as Tone },
  { label: "Escrow release delayed over 48h.", tone: "cyan" as Tone },
];

export const verificationQueue = [
  { name: "Linh Dan", type: "CCCD + face match", due: "12 min", tier: "A", tone: "amber" as Tone },
  { name: "Ngoc Han", type: "Social ownership", due: "28 min", tier: "S", tone: "gold" as Tone },
  { name: "Khanh Linh", type: "Portfolio approval", due: "45 min", tier: "B", tone: "cyan" as Tone },
];

export const revenueBars = [
  { label: "GMV", value: "3.4B", width: "92%", tone: "gold" as Tone },
  { label: "Platform fee", value: "428M", width: "68%", tone: "cyan" as Tone },
  { label: "Voting revenue", value: "820M", width: "76%", tone: "purple" as Tone },
  { label: "Funding revenue", value: "1.2B", width: "84%", tone: "emerald" as Tone },
];

export type ModulePageConfig = {
  title: string;
  kicker: string;
  description: string;
  icon: LucideIcon;
  rows: AdminTableRow[];
};

export const modulePages: Record<string, ModulePageConfig> = {
  "talents": {
    title: "Talent Management",
    kicker: "Verification Queue + Talent Control",
    description: "Kiem duyet ho so, theo doi tier, doanh thu, reliability va cac hanh dong han che tai khoan.",
    icon: UserCheck,
    rows: operations.filter((row) => row.id.startsWith("TL")),
  },
  "talents/list": {
    title: "Talent List",
    kicker: "Search + Filter + Bulk Actions",
    description: "Danh sach talent voi tier, verification, followers, reliability, revenue, active jobs va status.",
    icon: Users,
    rows: operations.filter((row) => row.id.startsWith("TL")),
  },
  "talents/verification-queue": {
    title: "Verification Queue",
    kicker: "CCCD + Face Match + Portfolio",
    description: "Hang doi ho so cho xac minh, cho phep approve, reject, request revision hoac suspend.",
    icon: BadgeCheck,
    rows: operations.filter((row) => row.id.startsWith("TL")),
  },
  "talents/detail": {
    title: "Talent Detail",
    kicker: "Admin-Only Intelligence",
    description: "Xem basic info, verification, tier breakdown, social metrics, escrow history, reports va AI risk score.",
    icon: UserCheck,
    rows: operations.filter((row) => row.id.startsWith("TL")),
  },
  "talents/tier-management": {
    title: "Tier Management",
    kicker: "Override + Re-evaluation",
    description: "Override tier, force re-evaluation, lock profile, downgrade hoac promote talent.",
    icon: Sparkles,
    rows: operations.filter((row) => row.id.startsWith("TL")),
  },
  "talents/blacklist-restriction": {
    title: "Blacklist / Restriction",
    kicker: "Account Controls",
    description: "Quan ly han che tai khoan, risk flag, shadow restriction, suspension va blacklist.",
    icon: Shield,
    rows: operations.filter((row) => row.id.startsWith("TL")),
  },
  "talents/reports": {
    title: "Talent Reports",
    kicker: "Reports + Violations",
    description: "Tong hop report ve talent, dispute history, brand safety va moderation signals.",
    icon: FileWarning,
    rows: operations.filter((row) => row.id.startsWith("TL")),
  },
  brands: {
    title: "Brand Management",
    kicker: "Brand Safety + Spending Analytics",
    description: "Quan ly doanh nghiep, xac minh ho so, cancellation rate, dispute history va tong chi tieu.",
    icon: Building2,
    rows: operations.filter((row) => row.id.startsWith("BR")),
  },
  "brands/list": {
    title: "Brand List",
    kicker: "Company Directory",
    description: "Danh sach brand voi industry, verification, spending, active campaigns va reliability.",
    icon: Building2,
    rows: operations.filter((row) => row.id.startsWith("BR")),
  },
  "brands/verification": {
    title: "Brand Verification",
    kicker: "Tax + Company Checks",
    description: "Xac minh company profile, tax info, payment readiness va brand safety baseline.",
    icon: BadgeCheck,
    rows: operations.filter((row) => row.id.startsWith("BR")),
  },
  "brands/detail": {
    title: "Brand Detail",
    kicker: "Company + Risk View",
    description: "Thong tin cong ty, payment history, escrow history, campaign history, reviews va internal notes.",
    icon: Building2,
    rows: operations.filter((row) => row.id.startsWith("BR")),
  },
  "brands/spending-analytics": {
    title: "Spending Analytics",
    kicker: "Budget + GMV",
    description: "Phan tich tong chi tieu, campaign budget, escrow flow va lifetime value cua brand.",
    icon: BarChart3,
    rows: operations.filter((row) => row.id.startsWith("BR") || row.id.startsWith("CP")),
  },
  "brands/brand-safety": {
    title: "Brand Safety",
    kicker: "Cancellation + Scam Signals",
    description: "Theo doi cancellation rate, delayed escrow, disputes opened va risk level cua brand.",
    icon: Shield,
    rows: operations.filter((row) => row.id.startsWith("BR")),
  },
  campaigns: {
    title: "Campaign Monitoring",
    kicker: "Pipeline + Escrow + Performance",
    description: "Giam sat campaign dang chay, talent pipeline, escrow status, deliverables va risk alerts.",
    icon: Megaphone,
    rows: operations.filter((row) => row.id.startsWith("CP")),
  },
  "campaigns/list": {
    title: "Campaign List",
    kicker: "All Campaigns",
    description: "Danh sach campaign voi brand, budget, talent count, escrow va status.",
    icon: Megaphone,
    rows: operations.filter((row) => row.id.startsWith("CP")),
  },
  "campaigns/monitoring": {
    title: "Campaign Monitoring",
    kicker: "Timeline + Risk",
    description: "Theo doi timeline, deliverables, check-ins, revenue, risk alerts va disputes.",
    icon: Activity,
    rows: operations.filter((row) => row.id.startsWith("CP")),
  },
  "campaigns/active": {
    title: "Active Campaigns",
    kicker: "Live Execution",
    description: "Giam sat cac campaign dang chay voi status, talent pipeline va operational blockers.",
    icon: Megaphone,
    rows: operations.filter((row) => row.id.startsWith("CP")),
  },
  "campaigns/escrow-status": {
    title: "Campaign Escrow Status",
    kicker: "Funds By Campaign",
    description: "Trang thai ky quy theo campaign, pending release, refund risk va finance notes.",
    icon: Wallet,
    rows: operations.filter((row) => row.id.startsWith("CP")),
  },
  "campaigns/performance-analytics": {
    title: "Campaign Performance Analytics",
    kicker: "ROI + Deliverables",
    description: "Phan tich reach, engagement, completed jobs, ROI va AI matching quality.",
    icon: BarChart3,
    rows: operations.filter((row) => row.id.startsWith("CP")),
  },
  jobs: {
    title: "Job Operations",
    kicker: "Booking State Control",
    description: "Theo doi job lifecycle tu pending, accepted, escrowed, in progress den completed/disputed.",
    icon: CalendarClock,
    rows: operations,
  },
  "jobs/queue": {
    title: "Job Queue",
    kicker: "Operational Backlog",
    description: "Hang doi booking/job can admin theo doi va can thiep khi qua SLA.",
    icon: Briefcase,
    rows: operations,
  },
  "jobs/matching": {
    title: "Job Matching",
    kicker: "AI Matching Control",
    description: "Theo doi ket qua matching, acceptance rate va ly do mismatch.",
    icon: Sparkles,
    rows: operations,
  },
  "jobs/pending-acceptance": {
    title: "Pending Acceptance",
    kicker: "Talent Response Queue",
    description: "Cac job dang cho talent chap nhan hoac tu choi loi moi.",
    icon: CalendarClock,
    rows: operations,
  },
  "jobs/active": {
    title: "Active Jobs",
    kicker: "In Progress",
    description: "Theo doi check-in, proof upload, deliverables va blockers cua job dang chay.",
    icon: Briefcase,
    rows: operations,
  },
  "jobs/completed": {
    title: "Completed Jobs",
    kicker: "Review + Release",
    description: "Job da hoan tat, can nghiem thu, rating hoac giai ngan.",
    icon: BadgeCheck,
    rows: operations,
  },
  "jobs/cancelled": {
    title: "Cancelled Jobs",
    kicker: "Cancellation Audit",
    description: "Theo doi job bi huy, refund logic, penalty va risk flag lien quan.",
    icon: FileWarning,
    rows: operations,
  },
  "payments-escrow": {
    title: "Escrow & Payments",
    kicker: "Financial Control Center",
    description: "Theo doi tien ky quy, pending release, refund queue, completed release va doanh thu nen tang.",
    icon: Wallet,
    rows: operations.filter((row) => row.id.startsWith("BK") || row.id.startsWith("CP")),
  },
  "payments-escrow/escrow-dashboard": {
    title: "Escrow Dashboard",
    kicker: "Holding + Releases",
    description: "Tong quan escrow holding, pending releases, refund queue, completed releases va revenue collected.",
    icon: Wallet,
    rows: operations.filter((row) => row.id.startsWith("BK") || row.id.startsWith("CP")),
  },
  "payments-escrow/pending-releases": {
    title: "Pending Releases",
    kicker: "Approve + Hold + Review",
    description: "Hang doi giai ngan cho phep approve release, hold release, manual review va refund.",
    icon: Banknote,
    rows: operations.filter((row) => row.id.startsWith("BK") || row.id.startsWith("CP")),
  },
  "payments-escrow/transactions": {
    title: "Transactions",
    kicker: "Payment Ledger",
    description: "Lich su giao dich escrow, platform fee, payout, refund va reconciliation.",
    icon: Activity,
    rows: operations.filter((row) => row.id.startsWith("BK") || row.id.startsWith("CP")),
  },
  "payments-escrow/refunds": {
    title: "Refunds",
    kicker: "Refund Queue",
    description: "Quan ly partial refund, full refund, policy reason va audit trail.",
    icon: FileWarning,
    rows: operations.filter((row) => row.id.startsWith("BK")),
  },
  "payments-escrow/disputes": {
    title: "Dispute Center",
    kicker: "Arbitration Workbench",
    description: "Xu ly no-show, content dispute, refund, penalty va suspend account trong mot man hinh.",
    icon: Gavel,
    rows: operations.filter((row) => row.id.startsWith("BK")),
  },
  "payments-escrow/revenue": {
    title: "Revenue",
    kicker: "Revenue Dashboard",
    description: "GMV, platform fee, revenue share, subscription revenue, voting revenue va funding revenue.",
    icon: BarChart3,
    rows: operations.filter((row) => row.id.startsWith("BK") || row.id.startsWith("CP")),
  },
  competitions: {
    title: "Competition CMS",
    kicker: "Voting + Crown Funding",
    description: "Quan ly thi sinh, ranking, vote realtime, funding raised va phat hien gian lan.",
    icon: Crown,
    rows: operations,
  },
  "competitions/cms": {
    title: "Competition CMS",
    kicker: "Competition Pages",
    description: "Quan ly thong tin cuoc thi, noi dung landing, timeline va cau hinh hien thi.",
    icon: Crown,
    rows: operations,
  },
  "competitions/contestants": {
    title: "Contestants",
    kicker: "Contestant Operations",
    description: "Danh sach thi sinh voi region, score, votes, funding va rank.",
    icon: Users,
    rows: operations,
  },
  "competitions/voting-engine": {
    title: "Voting Engine",
    kicker: "Realtime Voting",
    description: "Theo doi vote realtime, phat hien spam, khoa vote, dieu chinh ranking va revenue sharing.",
    icon: RadioTower,
    rows: operations,
  },
  "competitions/crown-funding": {
    title: "Crown Funding",
    kicker: "Funding Raised",
    description: "Quan ly dong tien crown funding, supporter flow, fee va revenue share.",
    icon: Banknote,
    rows: operations,
  },
  "competitions/rankings": {
    title: "Rankings",
    kicker: "Leaderboard Control",
    description: "Theo doi bang xep hang, score, vote, funding va risk signals.",
    icon: BarChart3,
    rows: operations,
  },
  "competitions/revenue-share": {
    title: "Revenue Share",
    kicker: "Competition Finance",
    description: "Quan ly chia se doanh thu voting/funding giua platform, BTC va doi tac.",
    icon: Wallet,
    rows: operations,
  },
  analytics: {
    title: "Analytics Center",
    kicker: "Platform Health + AI Matching",
    description: "Tong hop growth, revenue, escrow, fraud detection, retention va matchmaking accuracy.",
    icon: Activity,
    rows: operations,
  },
  "analytics/platform-metrics": {
    title: "Platform Metrics",
    kicker: "System Overview",
    description: "Growth, active users, job velocity, conversion va system health.",
    icon: Activity,
    rows: operations,
  },
  "analytics/talent-analytics": {
    title: "Talent Analytics",
    kicker: "Talent Growth",
    description: "Talent growth, tier distribution, reliability, revenue va retention.",
    icon: Users,
    rows: operations.filter((row) => row.id.startsWith("TL")),
  },
  "analytics/brand-analytics": {
    title: "Brand Analytics",
    kicker: "Brand Growth",
    description: "Brand activation, spending, campaign success va cancellation signals.",
    icon: Building2,
    rows: operations.filter((row) => row.id.startsWith("BR")),
  },
  "analytics/revenue-analytics": {
    title: "Revenue Analytics",
    kicker: "Financial Metrics",
    description: "GMV, platform fee, voting revenue, funding revenue va payout trends.",
    icon: BarChart3,
    rows: operations,
  },
  "analytics/ai-matching-analytics": {
    title: "AI Matching Analytics",
    kicker: "Match Quality",
    description: "Average match accuracy, successful booking rate va campaign ROI.",
    icon: Sparkles,
    rows: operations,
  },
  "analytics/fraud-detection": {
    title: "Fraud Detection",
    kicker: "Risk Signals",
    description: "Phat hien fake followers, vote spike, suspicious payment pattern va device duplication.",
    icon: AlertTriangle,
    rows: operations,
  },
  moderation: {
    title: "Moderation Center",
    kicker: "Content Review + Risk Scoring",
    description: "Duyet profile, anh, video, portfolio, brand content va cac flag spam/scam/NSFW.",
    icon: Shield,
    rows: operations,
  },
  "moderation/reports": {
    title: "Moderation Reports",
    kicker: "Report Queue",
    description: "Tong hop reports tu talent, brand, booking, content va competition.",
    icon: FileWarning,
    rows: operations,
  },
  "moderation/violations": {
    title: "Violations",
    kicker: "Policy Enforcement",
    description: "Xu ly warning, hide content, shadow restrict, suspend hoac ban account.",
    icon: Shield,
    rows: operations,
  },
  "moderation/content-review": {
    title: "Content Review",
    kicker: "Profile + Media",
    description: "Duyet profile, anh, video, portfolio, chat, brand content va competition content.",
    icon: BadgeCheck,
    rows: operations,
  },
  "moderation/brand-safety": {
    title: "Moderation Brand Safety",
    kicker: "Scam + Spam Control",
    description: "Theo doi fake followers, toxic content, scam behavior, hate speech va spam booking.",
    icon: Shield,
    rows: operations,
  },
  "moderation/risk-scoring": {
    title: "Risk Scoring",
    kicker: "AI Risk Signals",
    description: "Theo doi diem rui ro, ly do flag va lich su can thiep moderation.",
    icon: AlertTriangle,
    rows: operations,
  },
  cms: {
    title: "CMS Management",
    kicker: "Homepage + Notifications",
    description: "Quan ly banner, featured talents, competition pages, push notification va blog/news.",
    icon: FileWarning,
    rows: operations,
  },
  "cms/homepage": {
    title: "Homepage CMS",
    kicker: "Portal Homepage",
    description: "Quan ly noi dung homepage, featured modules va hero placements.",
    icon: FileWarning,
    rows: operations,
  },
  "cms/banner-management": {
    title: "Banner Management",
    kicker: "Placements + CTR",
    description: "Quan ly banner, placement, status va CTR.",
    icon: Megaphone,
    rows: operations,
  },
  "cms/competition-pages": {
    title: "Competition Pages",
    kicker: "Competition Content",
    description: "Quan ly landing page, page sections va noi dung cuoc thi.",
    icon: Crown,
    rows: operations,
  },
  "cms/notifications": {
    title: "CMS Notifications",
    kicker: "Broadcast + Segments",
    description: "Gui broadcast notification, segment notification, campaign invite va competition announcement.",
    icon: RadioTower,
    rows: operations,
  },
  "cms/blog-news": {
    title: "Blog / News",
    kicker: "Editorial CMS",
    description: "Quan ly blog, tin tuc, promotional events va content publishing.",
    icon: FileWarning,
    rows: operations,
  },
  "users-permissions": {
    title: "Users & Permissions",
    kicker: "Admin Access",
    description: "Quan ly tai khoan admin MVP, trang thai truy cap va audit cua hanh dong quan trong.",
    icon: UserCheck,
    rows: operations,
  },
  notifications: {
    title: "Notifications",
    kicker: "Notification Center",
    description: "Theo doi va gui thong bao he thong cho talent, brand, campaign va competition segments.",
    icon: RadioTower,
    rows: operations,
  },
  settings: {
    title: "System Settings",
    kicker: "Rules + Thresholds",
    description: "Cau hinh platform fee, escrow rules, tier thresholds, voting rules va AI scoring weights.",
    icon: Settings,
    rows: operations,
  },
  "audit-logs": {
    title: "Audit Logs",
    kicker: "Action History",
    description: "Luu vet admin approvals, escrow releases, dispute decisions va system setting changes.",
    icon: Activity,
    rows: operations,
  },
};

export function getAdminModulePage(key: string): ModulePageConfig {
  return modulePages[key] ?? modulePages.analytics;
}

export const controlSignals = [
  { label: "AI Matching Accuracy", value: "84%", icon: Sparkles, tone: "cyan" as Tone },
  { label: "Platform Health", value: "99.98%", icon: RadioTower, tone: "emerald" as Tone },
  { label: "Fraud Signals", value: "7", icon: AlertTriangle, tone: "amber" as Tone },
];
