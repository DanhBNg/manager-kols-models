# Tài liệu Kinh doanh - Nền tảng Quản lý KOLs/Models

Chào mừng bạn đến với tài liệu kinh doanh của nền tảng quản lý KOLs, Models, PG và Người đẹp. Đây là hệ thống kết nối giữa các nhà tuyển dụng, công ty quản lý (Agency) và các nghệ sĩ/người mẫu.

## 📚 Tổng quan Tài liệu

Tài liệu này được chia thành các phần chính sau:

### [Luồng 1: Vận hành & Tính năng chính](./overview/Luồng%201_%20Về%20luồng%20vận%20hành%20&%20Tính%20năng%20chính.md) ✅ **Đã mở rộng**
Mô tả chi tiết về luồng vận hành cốt lõi của hệ thống, bao gồm:
- **Phía KOL/Model:** Đăng ký, tạo profile, upload portfolio, sync mạng xã hội, quản lý lịch
- **Phía Đối tác:** Tìm kiếm nâng cao, đăng job, quản lý ứng viên (ATS), analytics
- **Quy trình kết nối:** So sánh 2 mô hình (Kết nối mở vs Quản lý khép kín)
- **Kiến trúc hệ thống:** Frontend, API Gateway, Business Logic, Data Layer
- **Tính năng nâng cao:** AI matching, video upload, calendar sync, social media integration

**Điểm nhấn:** 
- Mobile-first cho KOL (85% dùng smartphone)
- Desktop-optimized cho Đối tác (cần màn hình lớn)
- Phương án MVP: Kết nối mở + Pay-per-lead
- Roadmap: Giai đoạn 1 (MVP) → Giai đoạn 2 (Migrate sang Escrow)

> **📌 Chi tiết kỹ thuật:** Database schema, API endpoints, code implementation → [`/docs/for-tech/plans/Core-Features-Technical-Specs.md`](../for-tech/plans/Core-Features-Technical-Specs.md)

---

### [Luồng 2: Mô hình Kinh doanh](./overview/Luồng%202_%20Mô%20hình%20kinh%20doanh%20(Monetization%20Model)%20.md) ✅ **Đã mở rộng**
Phân tích 4 nguồn thu chính của nền tảng:
1. **Thu từ Đối tác (B2B):** Gói subscription (Free/Silver/Gold/Diamond) và Pay-per-lead (50K/lần unlock)
2. **Thu từ Người đẹp (B2C):** Đẩy top profile (149K-999K/tuần), hồ sơ VIP, verified badge
3. **Hoa hồng theo Dự án:** Commission 10% qua Escrow (giai đoạn 2)
4. **Dịch vụ Giá trị gia tăng:** Premium booking, gói trọn gói, chụp ảnh profile

**Dự báo tài chính:**
- Năm 1: 300M revenue (chủ yếu từ subscription)
- Năm 2: 905M revenue (thêm commission từ escrow)
- ROI cho agencies: 160-808%

**Chiến lược Launch:** Miễn phí 3 tháng đầu để gom data (500 KOLs + 50 partners), sau đó áp dụng mô hình thu phí.

---

### [Luồng 3: Quản trị Admin](./overview/Luồng%203_%20Quản%20trị%20Admin.md)
Các tính năng quản trị hệ thống:
- **Quản lý người dùng:** KYC (xác minh CMND/CCCD), xác minh danh tính, phân quyền
- **Kiểm duyệt nội dung:** AI-powered moderation (ảnh NSFW, text toxic), manual review
- **Quản lý tài chính:** Transaction monitoring, escrow management, withdrawal approval
- **Thống kê & báo cáo:** Dashboard analytics (GMV, active users, conversion rates)
- **Phân quyền admin:** Super Admin vs Staff roles

**Quy trình KYC:**
1. User upload CMND/CCCD + ảnh selfie
2. AI OCR extract thông tin
3. Face matching (selfie vs CMND)
4. Manual review nếu confidence < 90%
5. Approve/Reject trong 24h

---

### [Phần 4: Mô hình Quản lý Linh hoạt](./overview/Phần%204_%20Mô%20hình%20Quản%20lý%20linh%20hoạt%20(Hybrid%20Management)..md)
Giải pháp kết hợp cả hai chiều quản lý:
- **Top-down:** Agency tự tạo "ghost profiles" (hồ sơ không có login) và quản lý hoàn toàn
- **Bottom-up:** KOL độc lập xin gia nhập Agency (chuyển quyền kiểm soát)
- **Tính năng ràng buộc:** Agency kiểm soát profile, pricing, booking inbox
- **Tính năng hủy liên kết:** Xử lý booking đang chạy, settlement, restore permissions

**Ma trận phân quyền:**
- Agency Manager: Full control (edit profile, set pricing, receive bookings)
- KOL Viewer: Read-only (xem profile, không sửa)
- Independent KOL: Full control (tự quản lý mọi thứ)

---

### [Phần 4.2: Tài khoản Agency/Manager](./overview/Phần%204.2_%20Tài%20khoản%20cấp%20Công%20ty%20quản%20lý%20(Agency_Manager).md) ✅ **Đã mở rộng**
Chi tiết về module dành cho công ty quản lý:
- **Quản lý Talent Roster:** Bulk import CSV, ghost profiles, contract management
- **Centralized Booking:** Nhận tất cả booking của talents, phân bổ công việc
- **Agency Wallet:** Available/Pending/Escrow balances, withdrawal, financial reports
- **Agency Landing Page:** Public profile, SEO optimization, analytics

**Pricing tiers:**
- Starter: 4.99M/tháng (20 talents, basic features)
- Professional: 12.99M/tháng (50 talents, advanced analytics)
- Enterprise: 29.99M/tháng (unlimited talents, API access)
- Custom: Thương lượng (white-label, dedicated support)

**Case studies:**
- Elite Models: Doanh thu tăng 131% (80M → 185M/tháng), ROI 808%
- Fresh Faces: Doanh thu tăng 160% (25M → 65M/tháng), roster tăng 88%

> **📌 Chi tiết kỹ thuật:** Agency database schema, API endpoints, permission system → [`/docs/for-tech/plans/Agency-Module-Technical-Specs.md`](../for-tech/plans/Agency-Module-Technical-Specs.md)

---

## 🎯 Mô hình Kinh doanh Tổng quan

Nền tảng hoạt động theo mô hình **B2B2C** với 3 nhóm đối tượng chính:

```
┌─────────────────┐
│  Nhà tuyển dụng │ ──► Trả phí subscription/pay-per-lead
│   (Đối tác)     │     (2-3M/tháng hoặc 50K/unlock)
└─────────────────┘
         │
         ▼
┌─────────────────┐
│   Nền tảng      │ ──► Thu hoa hồng (10%), phí dịch vụ
│   (Bạn)         │     Doanh thu: 300M (Năm 1) → 905M (Năm 2)
└─────────────────┘
         │
         ▼
┌─────────────────┐     ┌─────────────────┐
│  Agency/Manager │ ──► │  KOL/Model      │
│  (50+ talents)  │     │  (Người đẹp)    │
└─────────────────┘     └─────────────────┘
         │                       │
         └───────────────────────┘
              Trả phí đẩy top (149K-999K/tuần),
              VIP badge (499K/tháng)
```

**Nguồn thu chính:**
1. **Subscription từ Đối tác (60%):** 2-3M/tháng × 150 partners = 300-450M/tháng
2. **Commission từ Bookings (25%):** 10% × 100M GMV = 10M/tháng (giai đoạn 2)
3. **Profile Boost từ KOL (10%):** 149K/tuần × 500 KOLs = 75M/tháng
4. **Premium Services (5%):** Agency subscriptions, premium features

---

## 🚀 Lộ trình Triển khai (AI-First: 1/10 thời gian truyền thống)

### Giai đoạn 1 (Tháng 1-3): MVP Launch
**Mục tiêu:** Validate product-market fit
- ✅ Tính năng cơ bản: Đăng ký, tạo profile, tìm kiếm, đăng job
- ✅ Miễn phí 100% để gom data
- ✅ Mục tiêu: 500 profiles + 50 đối tác active
- 💰 Chi phí: 150-200M (thay vì 500M truyền thống)
- ⏱️ Thời gian: 2 tháng (thay vì 9-12 tháng)

**Tại sao nhanh hơn?**
- AI code generation: Giảm 70% thời gian dev
- No-code tools: Admin dashboard dùng Retool
- Pre-built components: React component libraries
- Cloud infrastructure: AWS managed services (không cần setup từ đầu)

### Giai đoạn 2 (Tháng 4-6): Monetization
**Mục tiêu:** Đạt break-even
- 💰 Áp dụng Pay-per-lead cho đối tác (50K/unlock)
- 📈 Bán vị trí đẩy top cho người đẹp (149K-999K/tuần)
- 💳 Tích hợp cổng thanh toán (VNPay, Momo)
- 🎯 Mục tiêu: 1,500 profiles + 150 partners + 50 paid
- 💵 Doanh thu: 100M/tháng

### Giai đoạn 3 (Tháng 7-12): Scale Up
**Mục tiêu:** Tăng trưởng bền vững
- 🏢 Module Agency Manager (B2B2C)
- 💰 Hệ thống Escrow & Commission (10%)
- 📱 Mobile app (React Native)
- 🤖 AI-powered matching
- 🎯 Mục tiêu: 5,000 profiles + 500 partners + 200 paid
- 💵 Doanh thu: 300M/tháng

### Giai đoạn 4 (Năm 2): Expansion
**Mục tiêu:** Market leader
- 🌍 Mở rộng 3 thành phố lớn (HN, DN, CT)
- 🏆 Premium features (video call interview, AI portfolio)
- 🔗 API for third-party integrations
- 🎯 Mục tiêu: 10,000 profiles + 1,000 partners + 500 paid
- 💵 Doanh thu: 800M/tháng

---

## 💡 Lợi thế Cạnh tranh

### 1. **Tích hợp API mạng xã hội**
- Đồng bộ follower thực tế từ TikTok, Instagram, Facebook
- Phát hiện fake followers (engagement rate < 1%)
- Verified badge dựa trên số lượng followers thật
- **Lợi thế:** Casting.vn không có, Facebook Groups không có

### 2. **Quản lý linh hoạt (Hybrid Model)**
- Hỗ trợ cả KOL độc lập và Agency
- Ghost profiles cho agency
- Permission handover khi KOL join/leave agency
- **Lợi thế:** Độc quyền, không competitor nào có

### 3. **Lịch rảnh thông minh**
- Sync với Google Calendar (2-way)
- Auto-block dates khi booking confirmed
- Buffer time giữa các jobs (travel time)
- **Lợi thế:** Tránh book trùng lịch, tăng show-up rate lên 95%

### 4. **Kiểm duyệt chặt chẽ**
- KYC bắt buộc (CMND/CCCD + selfie)
- AI face matching
- Manual review cho high-risk profiles
- **Lợi thế:** Đảm bảo chất lượng, tránh scam

### 5. **AI-Powered Matching**
- Ranking algorithm: Relevance (40%) + Quality (25%) + Popularity (15%)
- Smart recommendations: "People who saved this also saved..."
- Predictive analytics: Suggest best time to post job
- **Lợi thế:** Tìm đúng người trong <5 phút (thay vì 30 phút)

---

## 📊 Chỉ số Thành công (KPIs)

### North Star Metric
**Successful Bookings per Month**
- Tháng 3: 50 bookings
- Tháng 6: 200 bookings
- Tháng 12: 1,000 bookings
- Năm 2: 5,000 bookings/tháng

### Growth Metrics

| Chỉ số | Tháng 3 | Tháng 6 | Tháng 12 | Năm 2 |
|--------|---------|---------|----------|-------|
| **Total KOLs** | 500 | 1,000 | 3,000 | 10,000 |
| **Active KOLs (30d)** | 200 | 400 | 1,200 | 4,000 |
| **Total Partners** | 50 | 100 | 300 | 1,000 |
| **Paid Partners** | 10 | 30 | 150 | 500 |

### Financial Metrics

| Chỉ số | Tháng 6 | Tháng 12 | Năm 2 |
|--------|---------|----------|-------|
| **MRR** | 60M | 200M | 800M |
| **ARPU** | 2M | 1.5M | 1.6M |
| **CAC** | 800K | 600K | 500K |
| **LTV** | 16M | 18M | 24M |
| **LTV/CAC** | 20x | 30x | 48x |

### Quality Metrics

| Chỉ số | Target | Tháng 6 | Tháng 12 |
|--------|--------|---------|----------|
| **Avg Rating (KOL)** | >4.5 | 4.3 | 4.6 |
| **Show-up Rate** | >95% | 92% | 96% |
| **Completion Rate** | >90% | 88% | 93% |
| **Dispute Rate** | <5% | 7% | 4% |
| **Churn Rate** | <5% | 8% | 4% |

---

## 💰 Ngân sách & Chi phí

### Development Cost (AI-First)

| Hạng mục | Truyền thống | AI-First | Tiết kiệm |
|----------|--------------|----------|-----------|
| **Backend API** | 90M (60 days) | 27M (18 days) | 70% |
| **Frontend Web** | 67.5M (45 days) | 20M (13 days) | 70% |
| **Mobile App** | 45M (30 days) | 13.5M (9 days) | 70% |
| **Database Design** | 15M (10 days) | 4.5M (3 days) | 70% |
| **DevOps Setup** | 22.5M (15 days) | 6.75M (4.5 days) | 70% |
| **Testing & QA** | 30M (20 days) | 9M (6 days) | 70% |
| **TOTAL** | **270M (180 days)** | **81M (54 days)** | **70%** |

### Infrastructure Cost (Monthly)

| Dịch vụ | Chi phí |
|---------|---------|
| AWS EC2 (2× t3.large) | 3M |
| AWS RDS (PostgreSQL) | 2.5M |
| AWS S3 + CloudFront | 2.5M |
| Redis Cache | 1M |
| Monitoring (Sentry + DataDog) | 2M |
| Email/SMS (SendGrid + Twilio) | 2M |
| **TOTAL** | **13M/tháng** |

### Marketing Budget (Tháng 1-6)

| Kênh | Budget/tháng | Expected Result |
|------|--------------|-----------------|
| Instagram/TikTok Ads | 25M | 250 KOL signups |
| Google Ads | 10M | 20 partner signups |
| Referral Program | 10M | 150 signups |
| Content Marketing | 10M | SEO, brand awareness |
| Events & PR | 10M | Credibility |
| **TOTAL** | **65M/tháng** | **420 signups/tháng** |

---

## 📞 Liên hệ & Tài liệu Kỹ thuật

**Tài liệu Kinh doanh (Business Docs):**
- Luồng 1: Vận hành & Tính năng → `./overview/Luồng 1_...md`
- Luồng 2: Mô hình Kinh doanh → `./overview/Luồng 2_...md`
- Luồng 3: Quản trị Admin → `./overview/Luồng 3_...md`
- Phần 4: Hybrid Management → `./overview/Phần 4_...md`
- Phần 4.2: Agency Module → `./overview/Phần 4.2_...md`

**Tài liệu Kỹ thuật (Technical Docs):**
- Core Features Specs → `/docs/for-tech/plans/Core-Features-Technical-Specs.md`
- Agency Module Specs → `/docs/for-tech/plans/Agency-Module-Technical-Specs.md`

---

**Cập nhật lần cuối:** 25/05/2026  
**Trạng thái:** 3/5 files đã mở rộng với giải thích tiếng Việt đầy đủ ✅
