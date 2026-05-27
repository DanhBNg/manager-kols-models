# TÀI LIỆU THIẾT KẾ UI/UX
# ADMIN PORTAL — BEAUTY TALENT ECOSYSTEM

## 1. Vai trò của Admin Portal

Admin Portal là trung tâm vận hành toàn bộ hệ sinh thái Talent Platform.

Khác với Talent App và Brand Portal tập trung vào trải nghiệm người dùng cuối, Admin Portal có nhiệm vụ:

- Kiểm soát dữ liệu.
- Kiểm duyệt hồ sơ.
- Theo dõi giao dịch.
- Xử lý tranh chấp.
- Điều phối campaign.
- Theo dõi hiệu suất nền tảng.
- Quản lý dòng tiền.
- Quản lý cuộc thi.
- Quản lý voting/funding.
- Theo dõi AI scoring.
- Quản trị phân quyền hệ thống.

Admin Portal phải được thiết kế theo hướng:

**Enterprise SaaS Dashboard + Operational Control Center**

Tức là:

- Tối ưu cho xử lý dữ liệu.
- Tốc độ thao tác nhanh.
- Quản trị quy mô lớn.
- Giảm sai sót vận hành.
- Quan sát hệ thống theo thời gian thực.

---

## 2. Định vị giao diện Admin

## 2.1. Tính chất UI

Admin UI KHÔNG nên:

- Quá thiên về hình ảnh.
- Quá nhiều animation.
- Quá “hoa hậu”.
- Quá cảm xúc.

Admin UI phải:

- Rõ ràng.
- Có cấu trúc.
- Data-driven.
- Scannable.
- Có hierarchy mạnh.
- Dễ xử lý số lượng lớn dữ liệu.

### 2.2. Phong cách thiết kế

Phong cách đề xuất:

**Luxury Enterprise Dashboard**

Kết hợp:

- Dark SaaS.
- Glass panel.
- Gold accent.
- Financial dashboard.
- Control center.

### 2.3. Màu sắc

Giữ đồng bộ với Talent & Brand.

| Thành phần | Màu |
|---|---|
| Background | Deep Navy / Matte Black |
| Panel | Dark Blue Glass |
| Gold Accent | Premium / VIP / Revenue |
| Cyan | AI / Analytics |
| Purple | Campaign / Matching |
| Emerald | Thành công |
| Amber | Pending |
| Red | Dispute / Risk |

---

# PHẦN A — ADMIN INFORMATION ARCHITECTURE

## 3. Cấu trúc tổng thể Admin Portal

```text
Admin Portal
├── Dashboard Overview
├── Talents
│   ├── Talent List
│   ├── Verification Queue
│   ├── Talent Detail
│   ├── Tier Management
│   ├── Blacklist / Restriction
│   └── Reports
├── Brands
│   ├── Brand List
│   ├── Verification
│   ├── Brand Detail
│   ├── Spending Analytics
│   └── Brand Safety
├── Campaigns
│   ├── Campaign List
│   ├── Campaign Monitoring
│   ├── Active Campaigns
│   ├── Escrow Status
│   └── Performance Analytics
├── Jobs
│   ├── Job Queue
│   ├── Job Matching
│   ├── Pending Acceptance
│   ├── Active Jobs
│   ├── Completed Jobs
│   └── Cancelled Jobs
├── Payments & Escrow
│   ├── Escrow Dashboard
│   ├── Pending Releases
│   ├── Transactions
│   ├── Refunds
│   ├── Disputes
│   └── Revenue
├── Competitions
│   ├── Competition CMS
│   ├── Contestants
│   ├── Voting Engine
│   ├── Crown Funding
│   ├── Rankings
│   └── Revenue Share
├── Analytics
│   ├── Platform Metrics
│   ├── Talent Analytics
│   ├── Brand Analytics
│   ├── Revenue Analytics
│   ├── AI Matching Analytics
│   └── Fraud Detection
├── Moderation
│   ├── Reports
│   ├── Violations
│   ├── Content Review
│   ├── Brand Safety
│   └── Risk Scoring
├── CMS
│   ├── Homepage
│   ├── Banner Management
│   ├── Competition Pages
│   ├── Notifications
│   └── Blog / News
├── Users & Permissions
├── Notifications
├── System Settings
└── Audit Logs
```

---

# PHẦN B — ADMIN USER TYPES

## 4. Mô hình Admin đơn giản

Ở giai đoạn MVP, hệ thống chỉ cần một nhóm Admin vận hành tập trung, không cần triển khai hệ thống phân quyền quá phức tạp.

Admin sẽ có toàn quyền quản trị:

- Talent.
- Brand.
- Campaign.
- Booking.
- Escrow.
- Dispute.
- Competition.
- Voting.
- Crown Funding.
- CMS.
- Analytics.
- Moderation.

Mục tiêu ở giai đoạn đầu là:

- Tối ưu tốc độ phát triển sản phẩm.
- Giảm độ phức tạp backend.
- Giảm chi phí vận hành.
- Tập trung vào core business.

Do đó UI Admin nên thiết kế theo mô hình:

```text
Single Admin Control Center
```

Tức là:

- Một dashboard tổng.
- Một sidebar duy nhất.
- Một tài khoản quản trị toàn hệ thống.
- Không cần workflow approval nhiều tầng.
- Không cần permission matrix phức tạp.

### 4.1. Điều chỉnh UX theo mô hình Single Admin

Do không có nhiều role, UX nên:

- Giảm số bước thao tác.
- Tập trung vào tốc độ vận hành.
- Ưu tiên quick actions.
- Cho phép xử lý trực tiếp trên table.
- Hạn chế popup xác nhận dư thừa.

Ví dụ:

Admin có thể:

- Approve profile ngay trên danh sách.
- Release escrow ngay trong booking detail.
- Suspend talent bằng quick action.
- Resolve dispute trong một màn hình duy nhất.

### 4.2. Sidebar tối giản đề xuất

```text
Dashboard
Talents
Brands
Campaigns
Jobs
Escrow & Payments
Disputes
Competitions
Voting & Funding
Analytics
Moderation
CMS
Settings
```

### 4.3. Tư duy vận hành

Admin Portal nên hoạt động giống:

- Backoffice của marketplace.
- Control center của booking platform.
- Moderation dashboard của social platform.

Không nên biến thành hệ thống ERP doanh nghiệp quá nặng ở giai đoạn đầu.

---|---|
| Super Admin | Toàn quyền hệ thống |
| Operation Admin | Quản lý vận hành hằng ngày |
| Finance Admin | Escrow, payout, doanh thu |
| Moderation Admin | Kiểm duyệt hồ sơ, xử lý vi phạm |
| Competition Admin | Quản lý cuộc thi |
| Support Admin | Hỗ trợ Talent & Brand |
| Analytics Admin | Theo dõi dữ liệu & AI |

### 4.1. UX phân quyền

Admin UI phải có:

- Permission-based navigation.
- Hidden modules.
- Action restriction.
- Approval workflow.
- Audit log.

Ví dụ:

Finance Admin không được:

- Xóa Talent.
- Chỉnh sửa profile.
- Sửa kết quả voting.

Moderation Admin không được:

- Release payout.

---

# PHẦN C — DASHBOARD OVERVIEW

## 5. Admin Dashboard Overview

### 5.1. Mục tiêu

Admin Dashboard phải giúp đội vận hành:

- Quan sát tình trạng toàn hệ thống.
- Phát hiện vấn đề nhanh.
- Theo dõi dòng tiền.
- Theo dõi tăng trưởng.
- Theo dõi rủi ro.

### 5.2. Layout tổng thể

```text
--------------------------------------------------
Topbar
- Search
- Notifications
- Quick Actions
- Admin Profile
--------------------------------------------------
Sidebar Navigation
--------------------------------------------------
Overview KPI Cards
--------------------------------------------------
Live Activity Feed
--------------------------------------------------
Revenue / Escrow Analytics
--------------------------------------------------
Platform Health Monitoring
--------------------------------------------------
Pending Actions
--------------------------------------------------
Risk & Fraud Alerts
--------------------------------------------------
```

### 5.3. KPI Cards

Các card chính:

```text
Total Talents
58,420
+12.5%

Verified Brands
1,248
+8.2%

Active Campaigns
318

Escrow Holding
12.8B VNĐ

Monthly GMV
3.4B VNĐ

Pending Disputes
12
```

### 5.4. Live Activity Feed

Hiển thị realtime:

```text
- Brand Glow Beauty created campaign “Mega Beauty Live”.
- Talent Mai Anh accepted booking #BK12082.
- Escrow payment received: 28,000,000đ.
- Dispute opened on booking #BK12031.
- New Tier S Talent verified.
```

### 5.5. Risk Alerts

Ví dụ:

```text
⚠ Brand Diamond Luxury cancelled 4 bookings this week.
⚠ Talent #TL9182 reported by 3 brands.
⚠ Unusual voting activity detected.
⚠ Escrow release delayed >48h.
```

---

# PHẦN D — TALENT MANAGEMENT

## 6. Talent Management

### 6.1. Mục tiêu

Admin cần:

- Quản lý toàn bộ Talent.
- Kiểm duyệt hồ sơ.
- Theo dõi Tier.
- Theo dõi vi phạm.
- Theo dõi chất lượng Talent.

### 6.2. Talent List

Layout:

```text
Search Bar
-------------------------------------------------
Filters
-------------------------------------------------
Talent Table
-------------------------------------------------
```

### 6.3. Bộ lọc

- Tier.
- Verification status.
- Khu vực.
- Ngành nghề.
- Brand safety.
- Followers.
- Reliability score.
- Active jobs.
- Dispute history.
- Revenue generated.

### 6.4. Talent Table

| Talent | Tier | Verification | Followers | Reliability | Revenue | Active Jobs | Status |
|---|---|---|---|---|---|---|---|
| Mai Anh | A | Verified | 120K | 96% | 320M | 4 | Active |

### 6.5. Talent Detail Admin View

Admin cần thấy nhiều dữ liệu hơn Brand.

Sections:

- Basic Info.
- Verification.
- Tiering breakdown.
- Social metrics.
- Revenue history.
- Escrow history.
- Disputes.
- Reports.
- Moderation actions.
- Device/login history.
- AI risk score.

### 6.6. Tier Management

Admin có thể:

- Override tier.
- Force re-evaluation.
- Lock profile.
- Downgrade.
- Promote.

### 6.7. Verification Queue

Danh sách hồ sơ chờ xác minh:

```text
Pending:
- CCCD verification
- Face match
- Social ownership
- Competition certificate
- Portfolio approval
```

Admin có thể:

- Approve.
- Reject.
- Request revision.
- Suspend.

---

# PHẦN E — BRAND MANAGEMENT

## 7. Brand Management

### 7.1. Mục tiêu

Admin cần:

- Kiểm duyệt Brand.
- Theo dõi hành vi booking.
- Theo dõi doanh thu.
- Theo dõi dispute.
- Phát hiện scam.

### 7.2. Brand List

| Brand | Industry | Verification | Spending | Active Campaigns | Reliability |
|---|---|---|---|---|---|
| Glow Beauty | Cosmetics | Verified | 1.2B | 14 | 92% |

### 7.3. Brand Detail

Thông tin:

- Company profile.
- Tax info.
- Payment history.
- Escrow history.
- Campaign history.
- Talent reviews.
- Cancellation rate.
- Dispute history.
- Internal notes.

### 7.4. Brand Risk Monitoring

Admin cần thấy:

```text
Cancellation Rate: 18%
Delayed Escrow: 3
Disputes Opened: 7
Risk Level: Medium
```

---

# PHẦN F — CAMPAIGN MANAGEMENT

## 8. Campaign Monitoring

### 8.1. Mục tiêu

Admin cần quan sát toàn bộ campaign đang chạy.

### 8.2. Campaign Table

| Campaign | Brand | Budget | Talent Count | Escrow | Status |
|---|---|---|---|---|---|
| Mega Beauty Live | Glow Beauty | 500M | 18 | 420M | Active |

### 8.3. Campaign Detail

Sections:

- Campaign overview.
- Timeline.
- Talent pipeline.
- Escrow summary.
- Deliverables.
- Check-ins.
- Revenue.
- Risk alerts.
- Disputes.

### 8.4. Campaign Timeline

```text
Campaign Created
↓
Talents Invited
↓
Talents Accepted
↓
Escrow Paid
↓
Production Started
↓
Deliverables Uploaded
↓
Review & Approval
↓
Completed
```

### 8.5. Talent Pipeline

Dạng Kanban:

```text
Shortlisted → Invited → Accepted → Escrowed → In Progress → Completed
```

---

# PHẦN G — JOB OPERATIONS

## 9. Job Operations

### 9.1. Mục tiêu

Admin theo dõi toàn bộ booking/job.

### 9.2. Job States

| Status | Ý nghĩa |
|---|---|
| Draft | Brand tạo job |
| Pending | Chờ Talent phản hồi |
| Accepted | Talent chấp nhận |
| Escrow Pending | Chờ ký quỹ |
| Escrowed | Đã ký quỹ |
| In Progress | Đang thực hiện |
| Completed | Hoàn tất |
| Disputed | Có tranh chấp |
| Refunded | Hoàn tiền |
| Cancelled | Đã hủy |

### 9.3. Job Detail Admin View

Admin cần thấy:

- Full contract.
- Timeline.
- Messages.
- Check-in proof.
- Upload evidence.
- Escrow status.
- Refund logic.
- Violation logs.

---

# PHẦN H — PAYMENT & ESCROW

## 10. Escrow Dashboard

### 10.1. Mục tiêu

Đây là module cực kỳ quan trọng.

Admin cần:

- Theo dõi tiền ký quỹ.
- Theo dõi payout.
- Theo dõi hoàn tiền.
- Theo dõi doanh thu nền tảng.
- Phát hiện bất thường.

### 10.2. Dashboard Layout

```text
Escrow Holding
Pending Releases
Refund Queue
Completed Releases
Revenue Collected
```

### 10.3. Escrow Table

| Booking | Brand | Talent | Amount | Status | Release Date |
|---|---|---|---|---|---|
| BK1021 | Glow Beauty | Mai Anh | 12M | Escrowed | 24/06 |

### 10.4. Release Queue

Admin có thể:

- Approve release.
- Hold release.
- Manual review.
- Partial refund.
- Full refund.

### 10.5. Revenue Dashboard

Các chỉ số:

- GMV.
- Platform fee.
- Revenue share.
- Subscription revenue.
- Voting revenue.
- Funding revenue.

---

# PHẦN I — DISPUTE RESOLUTION

## 11. Dispute Management

### 11.1. Mục tiêu

Admin xử lý:

- Hủy show.
- Không đúng brief.
- Không thanh toán.
- Vi phạm hợp đồng.
- Content dispute.

### 11.2. Dispute Queue

| Booking | Brand | Talent | Issue | Amount | Priority |
|---|---|---|---|---|---|
| BK12082 | Glow Beauty | Mai Anh | No-show | 18M | High |

### 11.3. Dispute Detail

Admin cần:

- Timeline.
- Chat logs.
- Contract.
- Media evidence.
- GPS/QR check-in.
- Upload proof.
- Decision panel.

### 11.4. Decision Panel

```text
[Release to Talent]
[Refund Brand]
[Split Payment]
[Penalty]
[Suspend Account]
```

### 11.5. Penalty Logic

Hệ thống tự động:

- Trừ reliability score.
- Gắn risk flag.
- Giảm tier.
- Tăng review priority.

---

# PHẦN J — COMPETITION MANAGEMENT

## 12. Competition CMS

### 12.1. Mục tiêu

Dành cho BTC cuộc thi.

Admin cần:

- Quản lý cuộc thi.
- Quản lý thí sinh.
- Quản lý voting.
- Quản lý crown funding.
- Quản lý ranking.

### 12.2. Competition Dashboard

```text
Competition Name
Contestants: 128
Votes Today: 82,000
Funding Raised: 1.2B
Top Contestant: Nguyễn A
```

### 12.3. Contestant Table

| Contestant | Region | Score | Votes | Funding | Rank |
|---|---|---|---|---|---|
| Mai Anh | Hà Nội | 92 | 18,200 | 120M | #1 |

### 12.4. Voting Engine

Admin cần:

- Theo dõi vote realtime.
- Phát hiện spam.
- Khóa vote.
- Điều chỉnh ranking.
- Revenue sharing.

### 12.5. Fraud Detection

Ví dụ:

```text
⚠ Sudden vote spike detected.
⚠ Multiple accounts from same device.
⚠ Suspicious payment pattern.
```

---

# PHẦN K — ANALYTICS

## 13. Analytics Center

### 13.1. Mục tiêu

Admin cần dữ liệu tổng quan toàn hệ thống.

### 13.2. Dashboard modules

- Platform Growth.
- Talent Growth.
- Brand Growth.
- Revenue.
- Escrow.
- Campaign Performance.
- Matchmaking accuracy.
- AI scoring.
- Retention.
- Churn.

### 13.3. Charts

Nên có:

- Line chart.
- Funnel chart.
- Heatmap.
- Radar chart.
- Cohort chart.
- Revenue chart.
- Geo distribution.

### 13.4. AI Matching Analytics

Ví dụ:

```text
Average Match Accuracy: 84%
Successful Booking Rate: 68%
Average Campaign ROI: 3.2x
```

---

# PHẦN L — MODERATION & SAFETY

## 14. Moderation Center

### 14.1. Nội dung cần kiểm duyệt

- Profile.
- Ảnh.
- Video.
- Portfolio.
- Chat.
- Brand content.
- Competition content.

### 14.2. Safety Flags

Ví dụ:

```text
- Fake followers
- Toxic content
- Scam behavior
- NSFW content
- Hate speech
- Spam booking
```

### 14.3. Moderation Actions

- Warning.
- Hide content.
- Shadow restrict.
- Suspend account.
- Ban account.

---

# PHẦN M — CMS & CONTENT

## 15. CMS Management

Admin có thể quản lý:

- Homepage banners.
- Featured talents.
- Featured campaigns.
- Competition pages.
- Push notifications.
- Blog/news.
- Promotional events.

### 15.1. Banner Management

| Banner | Placement | Status | CTR |
|---|---|---|---|
| Summer Fashion Week | Homepage Hero | Active | 8.2% |

### 15.2. Notification Center

Admin gửi:

- Broadcast notification.
- Segment notification.
- Campaign invite.
- Competition announcement.

---

# PHẦN N — SYSTEM SETTINGS

## 16. System Settings

Admin có thể cấu hình:

- Platform fee.
- Escrow rules.
- Tier thresholds.
- Verification requirements.
- Voting rules.
- Funding fee.
- Currency.
- Tax settings.
- Notification rules.
- AI scoring weights.

---

# PHẦN O — DESIGN SYSTEM

## 17. Admin Design System

### 17.1. Layout Rules

- Sidebar fixed.
- Topbar sticky.
- Data table optimized.
- Multi-column desktop layout.
- Dense information mode.

### 17.2. Component Library

- KPI Card.
- Data Table.
- Activity Feed.
- Risk Alert.
- Escrow Timeline.
- Dispute Panel.
- Campaign Kanban.
- Verification Card.
- Audit Log Viewer.
- Revenue Chart.
- Analytics Panel.

### 17.3. Interaction Rules

- Bulk actions.
- Keyboard shortcuts.
- Quick search.
- Command palette.
- Multi-filter.
- Export CSV/XLSX.
- Sticky filters.
- Saved views.

---

# PHẦN P — UX CHO ADMIN

## 18. UX Principles

### 18.1. Ưu tiên tốc độ thao tác

Admin không cần animation nặng.

Cần:

- Fast loading.
- Quick actions.
- Bulk moderation.
- One-click approval.
- Shortcut workflows.

### 18.2. Giảm cognitive overload

Không hiển thị toàn bộ dữ liệu cùng lúc.

Dùng:

- Tabs.
- Expandable sections.
- Side drawers.
- Progressive disclosure.

### 18.3. Luôn hiển thị trạng thái

Mọi entity đều phải có status rõ ràng:

```text
Verified
Pending
Escrowed
Risky
Suspended
Disputed
Completed
```

### 18.4. Auditability

Mọi action quan trọng cần log:

```text
Admin Nguyễn A approved escrow release at 20:12.
```

---

# PHẦN Q — MVP ADMIN

## 19. MVP cần làm trước

### 19.1. Priority 1

- Admin Dashboard.
- Talent Management.
- Brand Management.
- Campaign Monitoring.
- Job Management.
- Escrow Dashboard.
- Dispute Center.
- Verification Queue.

### 19.2. Priority 2

- Competition CMS.
- Voting Engine.
- Crown Funding.
- Revenue Analytics.
- Fraud Detection.

### 19.3. Priority 3

- AI moderation.
- Automation workflows.
- Advanced analytics.
- Team permissions nâng cao.
- Tax automation.

---

# PHẦN R — FIGMA ROADMAP

## 20. Thứ tự thiết kế Figma

### Batch 1 — Foundation

1. Admin design system.
2. KPI cards.
3. Tables.
4. Sidebar.
5. Filters.
6. Charts.

### Batch 2 — Core Operations

1. Admin dashboard.
2. Talent management.
3. Brand management.
4. Campaign monitoring.
5. Job operations.

### Batch 3 — Finance & Risk

1. Escrow dashboard.
2. Transactions.
3. Dispute center.
4. Risk alerts.
5. Fraud analytics.

### Batch 4 — Competition & CMS

1. Competition dashboard.
2. Voting engine.
3. Crown funding.
4. CMS.
5. Notification center.

---

# 21. Kết luận

Admin Portal là trái tim vận hành của toàn bộ hệ sinh thái Beauty Talent Ecosystem.

Nếu Talent App là nơi tạo cảm hứng cho người đẹp và Brand Portal là nơi thương mại hóa tài năng, thì Admin Portal là nơi đảm bảo:

- Hệ thống vận hành ổn định.
- Giao dịch minh bạch.
- Matchmaking hiệu quả.
- Dòng tiền an toàn.
- Cuộc thi được số hóa.
- Nội dung được kiểm duyệt.
- Hệ sinh thái phát triển bền vững.

Admin UI cần mang cảm giác:

**Luxury Enterprise Control Center**

Tức là vừa cao cấp, vừa công nghệ, vừa mạnh về dữ liệu và vận hành.

