# Tài liệu Kỹ thuật - Nền tảng Quản lý KOLs/Models

> 📌 **Cập nhật quan trọng (28/05/2026):** Cấu trúc triển khai hiện tại của dự án là **Next.js Frontend + Laravel API Backend (Tách biệt hai đầu)**.
> *   **Backend chính:** Nằm trong thư mục [backend/](file:///c:/CONG_VIEC/VNP_BeutyTalent/backend), sử dụng Laravel 12, Laravel Sanctum (Token-based API Authentication) và SQLite cho môi trường local (file cơ sở dữ liệu lưu tại `backend/database/database.sqlite`, không cần cài đặt XAMPP).
> *   **Frontend:** Sử dụng Next.js, giao tiếp thông qua REST API tại `http://127.0.0.1:8000/api`. Token xác thực được lưu tại `localStorage` với key `onstagevn_auth_token`.
> *   *Lưu ý:* Các tài liệu mô tả về Laravel + Inertia.js (Breeze/Inertia SSR) hoặc các cấu phần Vue/Inertia cũ chỉ mang tính chất tham khảo lịch sử, không phải kiến trúc đang áp dụng thực tế.

---

## 1. Tổng quan thư mục tài liệu

Thư mục này chứa toàn bộ tài liệu kỹ thuật, đặc tả cơ sở dữ liệu, thiết kế API endpoints và hướng dẫn triển khai hệ thống dành cho đội ngũ lập trình viên.

Các tài liệu kỹ thuật chi tiết theo Module bao gồm:
*   Database schema chi tiết (SQL)
*   Đặc tả API endpoints (RESTful)
*   Mã giả hoặc ví dụ triển khai Business Logic
*   Các giải pháp tối ưu bảo mật và hiệu năng hệ thống

---

## 2. Cấu trúc Tài liệu kỹ thuật chi tiết

### 📂 [Core Features Technical Specs](./plans/Core-Features-Technical-Specs.md)
Tập trung đặc tả các tính năng cốt lõi của Giai đoạn 1 (Lịch trình, Profile, Tìm kiếm):
*   **Hạ tầng & Dữ liệu:** Database Schema cho 10 bảng cốt lõi (`users`, `profiles`, `photos`, `videos`, `social_accounts`, `calendar_events`, `jobs`, `applications`, `bookings`).
*   **Quy trình xử lý ảnh:** Tải ảnh lên -> AI Moderation (NSFW check) -> Nén ảnh WebP -> Đưa lên CDN.
*   **Tìm kiếm & Thuật toán:** Cấu trúc truy vấn Elasticsearch, cách tính điểm độ phù hợp (Ranking Score) và thuật toán phát hiện gian lận follower (Anti-Fraud).
*   **Tích hợp lịch:** Logic đồng bộ lịch rảnh 2 chiều với Google Calendar (CalDAV/Google Calendar API).

### 📂 [Agency Module Technical Specs](./plans/Agency-Module-Technical-Specs.md)
Đặc tả chi tiết cho phân hệ quản lý của Công ty Quản lý (Agency/Manager):
*   **Database Schema:** Đặc tả 5 bảng dữ liệu chuyên biệt (`agencies`, `agency_members`, `agency_talents`, `agency_wallets`, `agency_transactions`).
*   **Phân quyền (RBAC):** Định nghĩa các vai trò Owner, Admin, Coordinator, Viewer và middleware kiểm tra quyền hạn.
*   **Nghiệp vụ đặc thù:** Cơ chế tạo Ghost Profile (Hồ sơ ảo chưa kích hoạt login), luồng chấp thuận chuyển quyền kiểm soát khi KOL gia nhập/rời khỏi Agency, quản lý tài chính và ví tổng.

---

## 3. Danh sách Technology Stack áp dụng

### 3.1. Frontend Web (Đối tác, KOL & Admin)
*   **Framework:** Next.js (React 18+, TypeScript 5.x)
*   **Styling:** Tailwind CSS + shadcn/ui component library
*   **State Management:** Zustand / Redux Toolkit
*   **Data Fetching:** TanStack Query (React Query)
*   **Routing:** Next.js App Router (Client-side routing)
*   **Xác thực:** Lưu trữ và quản lý Token JWT qua `localStorage`

### 3.2. Backend API
*   **Framework:** Laravel 12.x
*   **Ngôn ngữ:** PHP 8.3+
*   **Database ORM:** Eloquent ORM (đầy đủ model relationships và migrations)
*   **Xác thực API:** Laravel Sanctum (Token-based Authentication)
*   **Validation:** Form Requests validation (Kiểm tra dữ liệu đầu vào chặt chẽ)
*   **Social Auth:** Laravel Socialite (Google, Facebook OAuth 2.0)

### 3.3. Cơ sở dữ liệu & Lưu trữ
*   **Database Local:** SQLite (phát triển nhanh gọn, không phụ thuộc vào dịch vụ bên ngoài)
*   **Database Production:** PostgreSQL 16.x
*   **Caching & Queue:** Redis 7.x (lưu cache session, rate limit và quản lý hàng đợi)
*   **Tìm kiếm nâng cao:** Elasticsearch 8.x
*   **Lưu trữ tệp tin:** AWS S3 (hoặc các dịch vụ Object Storage tương đương)
*   **CDN:** AWS CloudFront (tăng tốc độ tải tài nguyên hình ảnh/video)

### 3.4. Dịch vụ bên thứ ba (Third-party)
*   **Thanh toán:** Cổng thanh toán nội địa VNPay / Momo / Stripe
*   **OTP & SMS:** Twilio / AWS SNS
*   **Email:** SendGrid / AWS SES
*   **Kiểm duyệt ảnh:** AWS Rekognition / Clarifai (AI Moderation)

---

## 4. Tổng quan Hệ cơ sở dữ liệu (Database Schema)

### 4.1. Bảng Cốt lõi (Core Tables - 10 bảng)
*   `users`: Lưu trữ thông tin tài khoản người dùng gốc.
*   `profiles`: Thông tin chi tiết của KOL/Model (số đo, chiều cao, cân nặng, rating).
*   `photos` & `videos`: Lưu trữ đường dẫn tệp tin media đã tải lên S3.
*   `social_accounts` & `social_metrics_history`: Lưu trữ liên kết và lịch sử chỉ số MXH.
*   `calendar_events`: Quản lý thời gian bận/rảnh của KOL.
*   `jobs`, `applications`, `bookings`: Quản lý chiến dịch tuyển dụng, hồ sơ ứng tuyển và đặt lịch thành công.

### 4.2. Bảng Phân hệ Agency (Agency Tables - 5 bảng)
*   `agencies`: Thông tin công ty quản lý tài năng.
*   `agency_members`: Danh sách nhân sự quản trị của Agency.
*   `agency_talents`: Danh sách các KOLs trực thuộc quản lý của Agency.
*   `agency_wallets` & `agency_transactions`: Quản lý số dư ví tổng và lịch sử giao dịch tài chính của Agency.

---

## 5. Danh sách API Endpoints chính

### 🔐 Authentication (Xác thực)
*   `POST /api/auth/register` - Đăng ký tài khoản
*   `POST /api/auth/login` - Đăng nhập nhận Sanctum Token
*   `GET /api/auth/me` - Lấy thông tin user hiện tại (Yêu cầu Token)
*   `POST /api/auth/logout` - Đăng xuất hủy Token
*   `GET /api/auth/social/:provider/redirect` - Redirect sang trang OAuth (Google/Facebook)
*   `GET /api/auth/social/:provider/callback` - Nhận callback xử lý đăng nhập Social

### 👤 Profile Management
*   `GET /api/profiles/:id` - Xem profile chi tiết
*   `PUT /api/profiles/:id` - Cập nhật thông tin profile
*   `POST /api/profiles/:id/photos` - Upload ảnh portfolio
*   `DELETE /api/profiles/:id/photos/:photo_id` - Xóa ảnh portfolio
*   `GET /api/profiles/:id/completion` - Lấy điểm % hoàn thiện hồ sơ

### 🔍 Search & Recommendation
*   `GET /api/search/profiles` - Tìm kiếm & lọc KOL cơ bản
*   `POST /api/search/profiles/advanced` - Tìm kiếm nâng cao kết hợp chỉ số MXH
*   `POST /api/wishlists` - Quản lý danh sách lưu trữ của đối tác

### 📅 Calendar (Lịch rảnh)
*   `GET /api/calendar/events` - Lấy danh sách lịch rảnh/bận
*   `POST /api/calendar/events` - Thêm sự kiện lịch mới
*   `DELETE /api/calendar/events/:id` - Xóa sự kiện lịch
*   `POST /api/calendar/sync/google` - Yêu cầu sync Google Calendar

---

## 6. Các Tiêu chuẩn Bảo mật áp dụng

1.  **Xác thực phân quyền:** Sử dụng Sanctum Token với thuật toán mã hóa an toàn. Áp dụng Middleware phân quyền nghiêm ngặt để tránh lỗi IDOR (truy cập trái phép dữ liệu của user khác).
2.  **Mã hóa thông tin nhạy cảm (PII):** Các trường thông tin cá nhân như số điện thoại, email, số tài khoản ngân hàng và tài liệu KYC phải được mã hóa bằng thuật toán `AES-256` trước khi lưu vào cơ sở dữ liệu.
3.  **An toàn dữ liệu đầu vào:** Sử dụng parameterized queries (thông qua Eloquent/PDO) để loại bỏ 100% rủi ro SQL Injection. Áp dụng Content Security Policy (CSP) và các filter chống tấn công XSS.
4.  **Giới hạn truy cập (Rate Limiting):** Cấu hình giới hạn tối đa 100 requests/phút đối với mỗi địa chỉ IP để tránh các cuộc tấn công Brute-force và DDoS.

---

## 7. Tài liệu Liên quan

**Tài liệu Kinh doanh (Business Docs):**
*   [Luồng 1: Vận hành & Tính năng chính](../for-bussinees/overview/Lu%E1%BB%93ng%201_%20V%E1%BB%81%20lu%E1%BB%93ng%20v%E1%BA%ADn%20h%C3%A0nh%20&%20T%C3%ADnh%20n%C4%83ng%20ch%C3%ADnh.md)
*   [Luồng 2: Mô hình Kinh doanh](../for-bussinees/overview/Lu%E1%BB%93ng%202_%20M%C3%B4%20h%C3%ACnh%20kinh%20doanh%20(Monetization%20Model)%20.md)
*   [Phần 4.2: Phân hệ Agency](../for-bussinees/overview/Ph%E1%BA%A7n%204.2_%20T%C3%A0i%20kho%E1%BA%A3n%20c%E1%BA%A5p%20C%C3%B4ng%20ty%20qu%E1%BA%A3n%20l%C3%BD%20(Agency_Manager).md)

**Tài liệu Kỹ thuật Chi tiết (Technical Specs):**
*   [Core Features Specs](./plans/Core-Features-Technical-Specs.md)
*   [Agency Module Specs](./plans/Agency-Module-Technical-Specs.md)

---
*Cập nhật lần cuối: 28/05/2026*  
*Duy trì bởi: Đội ngũ Phát triển Phần mềm (Development Team)*
