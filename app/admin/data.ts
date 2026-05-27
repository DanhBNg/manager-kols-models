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
  { label: "Tổng quan", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Tài năng", href: "/admin/talents", icon: Users },
  { label: "Nhãn hàng", href: "/admin/brands", icon: Building2 },
  { label: "Chiến dịch", href: "/admin/campaigns", icon: Megaphone },
  { label: "Công việc", href: "/admin/jobs", icon: Briefcase },
  { label: "Thanh toán & Ký quỹ", href: "/admin/payments-escrow", icon: Wallet },
  { label: "Cuộc thi", href: "/admin/competitions", icon: Crown },
  { label: "Phân tích", href: "/admin/analytics", icon: BarChart3 },
  { label: "Kiểm duyệt", href: "/admin/moderation", icon: Shield },
  { label: "Quản trị nội dung", href: "/admin/cms", icon: FileWarning },
  { label: "Người dùng & Phân quyền", href: "/admin/users-permissions", icon: UserCheck },
  { label: "Thông báo", href: "/admin/notifications", icon: RadioTower },
  { label: "Cài đặt", href: "/admin/settings", icon: Settings },
  { label: "Nhật ký hệ thống", href: "/admin/audit-logs", icon: Activity },
];

export const metrics: AdminMetric[] = [
  { label: "Tổng tài năng", value: "58,420", change: "+12.5% MoM", tone: "cyan", icon: Users },
  { label: "Nhãn hàng đã xác minh", value: "1,248", change: "+8.2% MoM", tone: "purple", icon: BadgeCheck },
  { label: "Chiến dịch đang chạy", value: "318", change: "42 chiến dịch giá trị cao", tone: "gold", icon: Megaphone },
  { label: "Tiền ký quỹ đang giữ", value: "12.8B", change: "VND được bảo chứng", tone: "emerald", icon: Wallet },
  { label: "GMV tháng", value: "3.4B", change: "+18.7% tăng trưởng", tone: "gold", icon: Banknote },
  { label: "Tranh chấp chờ xử lý", value: "12", change: "4 vụ khẩn cấp", tone: "rose", icon: Gavel },
];

export const operations: AdminTableRow[] = [
  {
    id: "TL-9182",
    primary: "Mai Anh",
    secondary: "Hạng A | KOL làm đẹp | Hà Nội",
    amount: "320M",
    status: "Đã xác minh",
    risk: "96%",
    owner: "Vận hành tài năng",
    action: "Rà soát hạng",
    tone: "emerald",
  },
  {
    id: "BR-4421",
    primary: "Glow Beauty",
    secondary: "Mỹ phẩm | 14 chiến dịch đang chạy",
    amount: "1.2B",
    status: "Đang hoạt động",
    risk: "92%",
    owner: "An toàn nhãn hàng",
    action: "Mở hồ sơ",
    tone: "cyan",
  },
  {
    id: "CP-1108",
    primary: "Mega Beauty Live",
    secondary: "18 tài năng | 420M đã ký quỹ",
    amount: "500M",
    status: "Đang giám sát",
    risk: "Trung bình",
    owner: "Vận hành chiến dịch",
    action: "Kiểm tra",
    tone: "purple",
  },
  {
    id: "BK-12082",
    primary: "Tranh chấp vắng mặt",
    secondary: "Glow Beauty vs Mai Anh",
    amount: "18M",
    status: "Ưu tiên cao",
    risk: "Cao",
    owner: "Trọng tài xử lý",
    action: "Xử lý",
    tone: "rose",
  },
];

export const liveActivity = [
  "Nhãn hàng Glow Beauty tạo chiến dịch Mega Beauty Live.",
  "Tài năng Mai Anh đã nhận booking #BK12082.",
  "Đã nhận thanh toán ký quỹ: 28.000.000 VND.",
  "Đã mở tranh chấp cho booking #BK12031.",
  "Đã xác minh tài năng hạng S mới.",
];

export const riskAlerts = [
  { label: "Nhãn hàng Diamond Luxury đã hủy 4 booking trong tuần này.", tone: "amber" as Tone },
  { label: "Tài năng #TL9182 bị 3 nhãn hàng báo cáo.", tone: "rose" as Tone },
  { label: "Phát hiện hoạt động bình chọn bất thường.", tone: "purple" as Tone },
  { label: "Giải ngân ký quỹ chậm quá 48 giờ.", tone: "cyan" as Tone },
];

export const verificationQueue = [
  { name: "Linh Dan", type: "CCCD + đối chiếu khuôn mặt", due: "12 phút", tier: "A", tone: "amber" as Tone },
  { name: "Ngoc Han", type: "Xác minh sở hữu mạng xã hội", due: "28 phút", tier: "S", tone: "gold" as Tone },
  { name: "Khanh Linh", type: "Duyệt portfolio", due: "45 phút", tier: "B", tone: "cyan" as Tone },
];

export const revenueBars = [
  { label: "GMV", value: "3.4B", width: "92%", tone: "gold" as Tone },
  { label: "Phí nền tảng", value: "428M", width: "68%", tone: "cyan" as Tone },
  { label: "Doanh thu bình chọn", value: "820M", width: "76%", tone: "purple" as Tone },
  { label: "Doanh thu tài trợ", value: "1.2B", width: "84%", tone: "emerald" as Tone },
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
    title: "Quản lý tài năng",
    kicker: "Hàng đợi xác minh + Kiểm soát tài năng",
    description: "Kiểm duyệt hồ sơ, theo dõi hạng, doanh thu, độ tin cậy và các biện pháp hạn chế tài khoản.",
    icon: UserCheck,
    rows: operations.filter((row) => row.id.startsWith("TL")),
  },
  "talents/list": {
    title: "Danh sách tài năng",
    kicker: "Tìm kiếm + Lọc + Thao tác hàng loạt",
    description: "Danh sách tài năng với hạng, xác minh, người theo dõi, độ tin cậy, doanh thu, việc đang chạy và trạng thái.",
    icon: Users,
    rows: operations.filter((row) => row.id.startsWith("TL")),
  },
  "talents/verification-queue": {
    title: "Hàng đợi xác minh",
    kicker: "CCCD + Đối chiếu khuôn mặt + Hồ sơ năng lực",
    description: "Hàng đợi hồ sơ cần xác minh, cho phép duyệt, từ chối, yêu cầu chỉnh sửa hoặc tạm khóa.",
    icon: BadgeCheck,
    rows: operations.filter((row) => row.id.startsWith("TL")),
  },
  "talents/detail": {
    title: "Chi tiết tài năng",
    kicker: "Dữ liệu nội bộ quản trị",
    description: "Xem thông tin cơ bản, xác minh, phân tích hạng, chỉ số xã hội, lịch sử ký quỹ, báo cáo và điểm rủi ro AI.",
    icon: UserCheck,
    rows: operations.filter((row) => row.id.startsWith("TL")),
  },
  "talents/tier-management": {
    title: "Quản lý hạng",
    kicker: "Điều chỉnh + Chấm lại",
    description: "Điều chỉnh hạng, yêu cầu chấm lại, khóa hồ sơ, hạ hạng hoặc thăng hạng tài năng.",
    icon: Sparkles,
    rows: operations.filter((row) => row.id.startsWith("TL")),
  },
  "talents/blacklist-restriction": {
    title: "Danh sách hạn chế",
    kicker: "Kiểm soát tài khoản",
    description: "Quản lý hạn chế tài khoản, cờ rủi ro, hạn chế ẩn, tạm khóa và danh sách đen.",
    icon: Shield,
    rows: operations.filter((row) => row.id.startsWith("TL")),
  },
  "talents/reports": {
    title: "Báo cáo tài năng",
    kicker: "Báo cáo + Vi phạm",
    description: "Tổng hợp báo cáo về tài năng, lịch sử tranh chấp, an toàn nhãn hàng và tín hiệu kiểm duyệt.",
    icon: FileWarning,
    rows: operations.filter((row) => row.id.startsWith("TL")),
  },
  brands: {
    title: "Quản lý nhãn hàng",
    kicker: "An toàn nhãn hàng + Phân tích chi tiêu",
    description: "Quản lý doanh nghiệp, xác minh hồ sơ, tỷ lệ hủy, lịch sử tranh chấp và tổng chi tiêu.",
    icon: Building2,
    rows: operations.filter((row) => row.id.startsWith("BR")),
  },
  "brands/list": {
    title: "Danh sách nhãn hàng",
    kicker: "Danh bạ doanh nghiệp",
    description: "Danh sách nhãn hàng với ngành hàng, trạng thái xác minh, chi tiêu, chiến dịch đang chạy và độ tin cậy.",
    icon: Building2,
    rows: operations.filter((row) => row.id.startsWith("BR")),
  },
  "brands/verification": {
    title: "Xác minh nhãn hàng",
    kicker: "Thuế + Xác minh doanh nghiệp",
    description: "Xác minh hồ sơ công ty, thông tin thuế, khả năng thanh toán và chuẩn an toàn nhãn hàng.",
    icon: BadgeCheck,
    rows: operations.filter((row) => row.id.startsWith("BR")),
  },
  "brands/detail": {
    title: "Chi tiết nhãn hàng",
    kicker: "Doanh nghiệp + Rủi ro",
    description: "Thông tin công ty, lịch sử thanh toán, lịch sử ký quỹ, lịch sử chiến dịch, đánh giá và ghi chú nội bộ.",
    icon: Building2,
    rows: operations.filter((row) => row.id.startsWith("BR")),
  },
  "brands/spending-analytics": {
    title: "Phân tích chi tiêu",
    kicker: "Ngân sách + GMV",
    description: "Phân tích tổng chi tiêu, ngân sách chiến dịch, dòng ký quỹ và giá trị vòng đời của nhãn hàng.",
    icon: BarChart3,
    rows: operations.filter((row) => row.id.startsWith("BR") || row.id.startsWith("CP")),
  },
  "brands/brand-safety": {
    title: "An toàn nhãn hàng",
    kicker: "Tín hiệu hủy booking + Lừa đảo",
    description: "Theo dõi tỷ lệ hủy booking, ký quỹ chậm, tranh chấp đã mở và mức rủi ro của nhãn hàng.",
    icon: Shield,
    rows: operations.filter((row) => row.id.startsWith("BR")),
  },
  campaigns: {
    title: "Giám sát chiến dịch",
    kicker: "Quy trình + Ký quỹ + Hiệu suất",
    description: "Giám sát chiến dịch đang chạy, quy trình tài năng, trạng thái ký quỹ, sản phẩm bàn giao và cảnh báo rủi ro.",
    icon: Megaphone,
    rows: operations.filter((row) => row.id.startsWith("CP")),
  },
  "campaigns/list": {
    title: "Danh sách chiến dịch",
    kicker: "Tất cả chiến dịch",
    description: "Danh sách chiến dịch với nhãn hàng, ngân sách, số tài năng, ký quỹ và trạng thái.",
    icon: Megaphone,
    rows: operations.filter((row) => row.id.startsWith("CP")),
  },
  "campaigns/monitoring": {
    title: "Giám sát chiến dịch",
    kicker: "Tiến trình + Rủi ro",
    description: "Theo dõi timeline, sản phẩm bàn giao, check-in, doanh thu, cảnh báo rủi ro và tranh chấp.",
    icon: Activity,
    rows: operations.filter((row) => row.id.startsWith("CP")),
  },
  "campaigns/active": {
    title: "Chiến dịch đang chạy",
    kicker: "Đang triển khai",
    description: "Giám sát các chiến dịch đang chạy với trạng thái, quy trình tài năng và điểm nghẽn vận hành.",
    icon: Megaphone,
    rows: operations.filter((row) => row.id.startsWith("CP")),
  },
  "campaigns/escrow-status": {
    title: "Trạng thái ký quỹ chiến dịch",
    kicker: "Dòng tiền theo chiến dịch",
    description: "Trạng thái ký quỹ theo chiến dịch, khoản chờ giải ngân, rủi ro hoàn tiền và ghi chú tài chính.",
    icon: Wallet,
    rows: operations.filter((row) => row.id.startsWith("CP")),
  },
  "campaigns/performance-analytics": {
    title: "Phân tích hiệu suất chiến dịch",
    kicker: "ROI + Sản phẩm bàn giao",
    description: "Phân tích tiếp cận, tương tác, việc đã hoàn tất, ROI và chất lượng ghép cặp AI.",
    icon: BarChart3,
    rows: operations.filter((row) => row.id.startsWith("CP")),
  },
  jobs: {
    title: "Vận hành công việc",
    kicker: "Kiểm soát trạng thái booking",
    description: "Theo dõi vòng đời công việc từ chờ phản hồi, đã nhận, đã ký quỹ, đang thực hiện đến hoàn tất hoặc tranh chấp.",
    icon: CalendarClock,
    rows: operations,
  },
  "jobs/queue": {
    title: "Hàng đợi công việc",
    kicker: "Tồn đọng vận hành",
    description: "Hàng đợi booking/công việc cần quản trị theo dõi và can thiệp khi quá SLA.",
    icon: Briefcase,
    rows: operations,
  },
  "jobs/matching": {
    title: "Ghép cặp công việc",
    kicker: "Kiểm soát ghép cặp AI",
    description: "Theo dõi kết quả ghép cặp, tỷ lệ chấp nhận và lý do không phù hợp.",
    icon: Sparkles,
    rows: operations,
  },
  "jobs/pending-acceptance": {
    title: "Chờ chấp nhận",
    kicker: "Hàng đợi phản hồi tài năng",
    description: "Các công việc đang chờ tài năng chấp nhận hoặc từ chối lời mời.",
    icon: CalendarClock,
    rows: operations,
  },
  "jobs/active": {
    title: "Công việc đang chạy",
    kicker: "Đang thực hiện",
    description: "Theo dõi check-in, bằng chứng tải lên, sản phẩm bàn giao và điểm nghẽn của công việc đang chạy.",
    icon: Briefcase,
    rows: operations,
  },
  "jobs/completed": {
    title: "Công việc đã hoàn tất",
    kicker: "Nghiệm thu + Giải ngân",
    description: "Công việc đã hoàn tất, cần nghiệm thu, đánh giá hoặc giải ngân.",
    icon: BadgeCheck,
    rows: operations,
  },
  "jobs/cancelled": {
    title: "Công việc đã hủy",
    kicker: "Kiểm tra hủy booking",
    description: "Theo dõi công việc bị hủy, logic hoàn tiền, phạt và cờ rủi ro liên quan.",
    icon: FileWarning,
    rows: operations,
  },
  "payments-escrow": {
    title: "Ký quỹ & Thanh toán",
    kicker: "Trung tâm kiểm soát tài chính",
    description: "Theo dõi tiền ký quỹ, khoản chờ giải ngân, hàng đợi hoàn tiền, giải ngân hoàn tất và doanh thu nền tảng.",
    icon: Wallet,
    rows: operations.filter((row) => row.id.startsWith("BK") || row.id.startsWith("CP")),
  },
  "payments-escrow/escrow-dashboard": {
    title: "Tổng quan ký quỹ",
    kicker: "Đang giữ + Giải ngân",
    description: "Tổng quan tiền ký quỹ đang giữ, khoản chờ giải ngân, hàng đợi hoàn tiền, giải ngân hoàn tất và doanh thu đã thu.",
    icon: Wallet,
    rows: operations.filter((row) => row.id.startsWith("BK") || row.id.startsWith("CP")),
  },
  "payments-escrow/pending-releases": {
    title: "Chờ giải ngân",
    kicker: "Duyệt + Giữ + Rà soát",
    description: "Hàng đợi giải ngân cho phép duyệt, giữ, rà soát thủ công và hoàn tiền.",
    icon: Banknote,
    rows: operations.filter((row) => row.id.startsWith("BK") || row.id.startsWith("CP")),
  },
  "payments-escrow/transactions": {
    title: "Giao dịch",
    kicker: "Sổ giao dịch",
    description: "Lịch sử giao dịch ký quỹ, phí nền tảng, payout, hoàn tiền và đối soát.",
    icon: Activity,
    rows: operations.filter((row) => row.id.startsWith("BK") || row.id.startsWith("CP")),
  },
  "payments-escrow/refunds": {
    title: "Hoàn tiền",
    kicker: "Hàng đợi hoàn tiền",
    description: "Quản lý hoàn tiền một phần, hoàn tiền toàn phần, lý do chính sách và vết kiểm toán.",
    icon: FileWarning,
    rows: operations.filter((row) => row.id.startsWith("BK")),
  },
  "payments-escrow/disputes": {
    title: "Trung tâm tranh chấp",
    kicker: "Bàn xử lý trọng tài",
    description: "Xử lý vắng mặt, tranh chấp nội dung, hoàn tiền, phạt và tạm khóa tài khoản trong một màn hình.",
    icon: Gavel,
    rows: operations.filter((row) => row.id.startsWith("BK")),
  },
  "payments-escrow/revenue": {
    title: "Doanh thu",
    kicker: "Tổng quan doanh thu",
    description: "GMV, phí nền tảng, chia sẻ doanh thu, doanh thu đăng ký, doanh thu bình chọn và doanh thu tài trợ.",
    icon: BarChart3,
    rows: operations.filter((row) => row.id.startsWith("BK") || row.id.startsWith("CP")),
  },
  competitions: {
    title: "Quản trị cuộc thi",
    kicker: "Bình chọn + Quỹ vương miện",
    description: "Quản lý thí sinh, xếp hạng, bình chọn thời gian thực, quỹ đã gọi và phát hiện gian lận.",
    icon: Crown,
    rows: operations,
  },
  "competitions/cms": {
    title: "Quản trị cuộc thi",
    kicker: "Trang cuộc thi",
    description: "Quản lý thông tin cuộc thi, nội dung landing, timeline và cấu hình hiển thị.",
    icon: Crown,
    rows: operations,
  },
  "competitions/contestants": {
    title: "Thí sinh",
    kicker: "Vận hành thí sinh",
    description: "Danh sách thí sinh với khu vực, điểm, lượt bình chọn, tài trợ và thứ hạng.",
    icon: Users,
    rows: operations,
  },
  "competitions/voting-engine": {
    title: "Hệ thống bình chọn",
    kicker: "Bình chọn thời gian thực",
    description: "Theo dõi bình chọn thời gian thực, phát hiện spam, khóa bình chọn, điều chỉnh xếp hạng và chia sẻ doanh thu.",
    icon: RadioTower,
    rows: operations,
  },
  "competitions/crown-funding": {
    title: "Quỹ vương miện",
    kicker: "Quỹ đã gọi",
    description: "Quản lý dòng tiền Quỹ vương miện, luồng người ủng hộ, phí và chia sẻ doanh thu.",
    icon: Banknote,
    rows: operations,
  },
  "competitions/rankings": {
    title: "Xếp hạng",
    kicker: "Kiểm soát bảng xếp hạng",
    description: "Theo dõi bảng xếp hạng, điểm, bình chọn, tài trợ và tín hiệu rủi ro.",
    icon: BarChart3,
    rows: operations,
  },
  "competitions/revenue-share": {
    title: "Chia sẻ doanh thu",
    kicker: "Tài chính cuộc thi",
    description: "Quản lý chia sẻ doanh thu bình chọn/tài trợ giữa nền tảng, BTC và đối tác.",
    icon: Wallet,
    rows: operations,
  },
  analytics: {
    title: "Trung tâm phân tích",
    kicker: "Sức khỏe nền tảng + Ghép cặp AI",
    description: "Tổng hợp tăng trưởng, doanh thu, ký quỹ, phát hiện gian lận, giữ chân người dùng và độ chính xác ghép cặp.",
    icon: Activity,
    rows: operations,
  },
  "analytics/platform-metrics": {
    title: "Chỉ số nền tảng",
    kicker: "Tổng quan hệ thống",
    description: "Tăng trưởng, người dùng hoạt động, tốc độ xử lý việc, chuyển đổi và sức khỏe hệ thống.",
    icon: Activity,
    rows: operations,
  },
  "analytics/talent-analytics": {
    title: "Phân tích tài năng",
    kicker: "Tăng trưởng tài năng",
    description: "Tăng trưởng tài năng, phân bổ hạng, độ tin cậy, doanh thu và giữ chân.",
    icon: Users,
    rows: operations.filter((row) => row.id.startsWith("TL")),
  },
  "analytics/brand-analytics": {
    title: "Phân tích nhãn hàng",
    kicker: "Tăng trưởng nhãn hàng",
    description: "Kích hoạt nhãn hàng, chi tiêu, hiệu quả chiến dịch và tín hiệu hủy booking.",
    icon: Building2,
    rows: operations.filter((row) => row.id.startsWith("BR")),
  },
  "analytics/revenue-analytics": {
    title: "Phân tích doanh thu",
    kicker: "Chỉ số tài chính",
    description: "GMV, phí nền tảng, doanh thu bình chọn, doanh thu tài trợ và xu hướng payout.",
    icon: BarChart3,
    rows: operations,
  },
  "analytics/ai-matching-analytics": {
    title: "Phân tích ghép cặp AI",
    kicker: "Chất lượng ghép cặp",
    description: "Độ chính xác ghép cặp trung bình, tỷ lệ booking thành công và ROI chiến dịch.",
    icon: Sparkles,
    rows: operations,
  },
  "analytics/fraud-detection": {
    title: "Phát hiện gian lận",
    kicker: "Tín hiệu rủi ro",
    description: "Phát hiện follower giả, tăng bình chọn bất thường, mẫu thanh toán đáng ngờ và trùng thiết bị.",
    icon: AlertTriangle,
    rows: operations,
  },
  moderation: {
    title: "Trung tâm kiểm duyệt",
    kicker: "Duyệt nội dung + Chấm điểm rủi ro",
    description: "Duyệt hồ sơ, ảnh, video, portfolio, nội dung nhãn hàng và các cờ spam/lừa đảo/NSFW.",
    icon: Shield,
    rows: operations,
  },
  "moderation/reports": {
    title: "Báo cáo kiểm duyệt",
    kicker: "Hàng đợi báo cáo",
    description: "Tổng hợp báo cáo từ tài năng, nhãn hàng, booking, nội dung và cuộc thi.",
    icon: FileWarning,
    rows: operations,
  },
  "moderation/violations": {
    title: "Vi phạm",
    kicker: "Thực thi chính sách",
    description: "Xử lý cảnh báo, ẩn nội dung, hạn chế ẩn, tạm khóa hoặc cấm tài khoản.",
    icon: Shield,
    rows: operations,
  },
  "moderation/content-review": {
    title: "Duyệt nội dung",
    kicker: "Hồ sơ + Hình ảnh/video",
    description: "Duyệt hồ sơ, ảnh, video, portfolio, chat, nội dung nhãn hàng và nội dung cuộc thi.",
    icon: BadgeCheck,
    rows: operations,
  },
  "moderation/brand-safety": {
    title: "An toàn nhãn hàng trong kiểm duyệt",
    kicker: "Kiểm soát lừa đảo + Spam",
    description: "Theo dõi follower giả, nội dung độc hại, hành vi lừa đảo, ngôn từ thù ghét và spam booking.",
    icon: Shield,
    rows: operations,
  },
  "moderation/risk-scoring": {
    title: "Chấm điểm rủi ro",
    kicker: "AI Tín hiệu rủi ro",
    description: "Theo dõi điểm rủi ro, lý do gắn cờ và lịch sử can thiệp kiểm duyệt.",
    icon: AlertTriangle,
    rows: operations,
  },
  cms: {
    title: "Quản trị nội dung",
    kicker: "Trang chủ + Thông báo",
    description: "Quản lý banner, tài năng nổi bật, trang cuộc thi, thông báo đẩy và blog/tin tức.",
    icon: FileWarning,
    rows: operations,
  },
  "cms/homepage": {
    title: "Quản trị trang chủ",
    kicker: "Trang chủ cổng",
    description: "Quản lý nội dung trang chủ, module nổi bật và vị trí hero.",
    icon: FileWarning,
    rows: operations,
  },
  "cms/banner-management": {
    title: "Quản lý banner",
    kicker: "Vị trí + CTR",
    description: "Quản lý banner, vị trí, trạng thái và CTR.",
    icon: Megaphone,
    rows: operations,
  },
  "cms/competition-pages": {
    title: "Trang cuộc thi",
    kicker: "Nội dung cuộc thi",
    description: "Quản lý landing page, các phần trang và nội dung cuộc thi.",
    icon: Crown,
    rows: operations,
  },
  "cms/notifications": {
    title: "Thông báo CMS",
    kicker: "Gửi toàn hệ thống + Theo nhóm",
    description: "Gửi thông báo toàn hệ thống, thông báo theo nhóm, lời mời chiến dịch và thông báo cuộc thi.",
    icon: RadioTower,
    rows: operations,
  },
  "cms/blog-news": {
    title: "Blog / Tin tức",
    kicker: "Quản trị biên tập",
    description: "Quản lý blog, tin tức, sự kiện khuyến mại và xuất bản nội dung.",
    icon: FileWarning,
    rows: operations,
  },
  "users-permissions": {
    title: "Người dùng & Phân quyền",
    kicker: "Quyền truy cập quản trị",
    description: "Quản lý tài khoản quản trị MVP, trạng thái truy cập và kiểm toán các hành động quan trọng.",
    icon: UserCheck,
    rows: operations,
  },
  notifications: {
    title: "Thông báo",
    kicker: "Trung tâm thông báo",
    description: "Theo dõi và gửi thông báo hệ thống cho tài năng, nhãn hàng, chiến dịch và nhóm cuộc thi.",
    icon: RadioTower,
    rows: operations,
  },
  settings: {
    title: "Cài đặt hệ thống",
    kicker: "Quy tắc + Ngưỡng",
    description: "Cấu hình phí nền tảng, quy tắc ký quỹ, ngưỡng hạng, quy tắc bình chọn và trọng số chấm điểm AI.",
    icon: Settings,
    rows: operations,
  },
  "audit-logs": {
    title: "Nhật ký hệ thống",
    kicker: "Lịch sử thao tác",
    description: "Lưu vết phê duyệt quản trị, giải ngân ký quỹ, quyết định tranh chấp và thay đổi cài đặt hệ thống.",
    icon: Activity,
    rows: operations,
  },
};

export function getAdminModulePage(key: string): ModulePageConfig {
  return modulePages[key] ?? modulePages.analytics;
}

export const controlSignals = [
  { label: "Độ chính xác ghép cặp AI", value: "84%", icon: Sparkles, tone: "cyan" as Tone },
  { label: "Sức khỏe nền tảng", value: "99.98%", icon: RadioTower, tone: "emerald" as Tone },
  { label: "Tín hiệu gian lận", value: "7", icon: AlertTriangle, tone: "amber" as Tone },
];


