# Kế Hoạch Backend Laravel

## 1. Mục tiêu hiện tại

Backend chính nằm trong thư mục `backend/` và dùng Laravel 12 để cung cấp API cho frontend Next.js ở thư mục gốc.

Mục tiêu Phase 1 MVP:

- Đăng ký, đăng nhập, đăng xuất bằng Laravel Sanctum.
- Phân loại tài khoản theo `talent`, `brand`, `admin`.
- Tự tạo hồ sơ ban đầu sau khi đăng ký.
- Quản lý Brand/Talent profile.
- Quản lý media, social metrics, calendar.
- Quản lý wishlist, campaign, contact request, booking sơ bộ.
- Quản lý survey tiering.
- Có admin panel nội bộ bằng Filament.
- Bảo mật admin bằng đổi mật khẩu và xác minh 2 bước qua QR/TOTP.

Frontend hiện vẫn còn nhiều dữ liệu demo/mock. Backend đã có API để nhận dữ liệu thật, nhưng frontend chưa nối hết vào API.

## 2. Kiến trúc đã chốt

- Frontend: Next.js App Router ở thư mục gốc.
- Backend: Laravel 12 API ở `backend/`.
- Auth API: Laravel Sanctum token.
- Database local: SQLite.
- Database deploy: PostgreSQL trên Railway.
- Admin panel: Filament 3 tại `/admin`.
- Social login: Laravel Socialite đã scaffold, cần OAuth credentials thật nếu muốn dùng.
- PHP: yêu cầu PHP 8.3 trở lên.

Không dùng XAMPP/MySQL cho local ở giai đoạn hiện tại.

## 3. Module đã triển khai

### 3.1. Authentication

Endpoint chính:

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/logout
GET  /api/auth/social/{provider}/redirect
GET  /api/auth/social/{provider}/callback
```

Khi đăng ký:

- `type = talent`: tự tạo bản ghi ban đầu trong `profiles`.
- `type = brand`: tự tạo bản ghi ban đầu trong `partner_profiles`.
- Không cho đăng ký public bằng `admin`.
- Không có actor auth riêng tên `agency`.

Nếu cần phân biệt agency ở phía đối tác, dùng `partner_profiles.organization_type = agency`.

### 3.2. Talent profile

Bảng chính:

```text
profiles
photos
videos
social_accounts
social_metrics_history
calendar_events
```

API nền:

```text
PUT  /api/my/profile
GET  /api/profiles/{profile}
GET  /api/profiles/{profile}/completion
POST /api/profiles/{profile}/photos
POST /api/profiles/{profile}/videos
POST /api/social/accounts
POST /api/social/accounts/{socialAccount}/metrics
GET  /api/calendar/events
POST /api/calendar/events
PUT  /api/calendar/events/{event}
DELETE /api/calendar/events/{event}
```

### 3.3. Partner/Brand profile

Bảng chính:

```text
partner_profiles
```

API:

```text
GET /api/partner/profile
PUT /api/partner/profile
```

Thông tin chính: tên tổ chức, loại tổ chức, ngành hàng, website/fanpage, người phụ trách, số điện thoại, email liên hệ, thành phố, mô tả, trạng thái duyệt.

### 3.4. Talent discovery

API:

```text
GET /api/talents
GET /api/talents/{profile}
```

Filter hiện có: `q`, `city`, `type`, `gender`, `min_age`, `max_age`, `min_height`, `max_height`, `verified`, `tier`, `sort`.

### 3.5. Wishlist

Bảng:

```text
wishlists
wishlist_items
```

API:

```text
GET    /api/wishlists
POST   /api/wishlists
GET    /api/wishlists/{wishlist}
POST   /api/wishlists/{wishlist}/items
DELETE /api/wishlists/{wishlist}/items/{item}
```

### 3.6. Campaign

Bảng:

```text
campaigns
campaign_talents
```

API:

```text
GET  /api/campaigns
POST /api/campaigns
GET  /api/campaigns/{campaign}
PUT  /api/campaigns/{campaign}
POST /api/campaigns/{campaign}/publish
POST /api/campaigns/{campaign}/close
GET    /api/campaigns/{campaign}/talents
POST   /api/campaigns/{campaign}/talents
PUT    /api/campaigns/{campaign}/talents/{campaignTalent}
DELETE /api/campaigns/{campaign}/talents/{campaignTalent}
```

### 3.7. Contact request và booking sơ bộ

Bảng:

```text
contact_requests
bookings
```

API:

```text
GET  /api/contact-requests
POST /api/contact-requests
GET  /api/contact-requests/{contactRequest}
POST /api/contact-requests/{contactRequest}/cancel
GET  /api/bookings
POST /api/bookings
```

Booking hiện ở mức MVP, chưa có escrow, payment gateway, hợp đồng và dispute workflow đầy đủ.

### 3.8. Survey tiering

Bảng:

```text
survey_responses
talent_scores
pageant_recommendations
```

API:

```text
POST /api/survey/submit
GET  /api/survey/progress
POST /api/survey/calculate
GET  /api/recommendations
```

Scoring hiện ở mức MVP, cần tiếp tục đồng bộ với bộ câu hỏi business thật.

## 4. Admin panel Filament

Admin chạy tại:

```text
http://127.0.0.1:8000/admin
```

Chỉ user có `type = admin` mới vào được.

Resource đã có:

```text
Người dùng
Hồ sơ talent
Hồ sơ đối tác
Campaign
Booking
Yêu cầu liên hệ
Khảo sát talent
Điểm tier
```

Trong avatar góc trên bên phải có:

- `Đổi mật khẩu`.
- `Xác minh 2 bước`.
- `Sign out`.

2FA dùng package `stephenjude/filament-two-factor-authentication`. Package này thêm:

- Trait `TwoFactorAuthenticatable` vào model `User`.
- Cột `two_factor_secret`, `two_factor_recovery_codes`, `two_factor_confirmed_at` trong bảng `users`.
- Bảng `passkeys` do dependency của package publish.

Hiện chỉ bật luồng QR/TOTP, chưa bật đăng nhập passkey trên giao diện.

## 5. Dữ liệu demo

Seeder hiện tạo dữ liệu demo để admin không bị trống:

- Admin.
- Brand có partner profile.
- Talent có profile.
- Social account và metrics.
- Calendar event.
- Campaign demo.
- Wishlist.
- Contact request.
- Booking.
- Survey response, talent score, pageant recommendation.

Chạy seed:

```bash
cd backend
php artisan db:seed --class=DatabaseSeeder
```

Reset local:

```bash
cd backend
php artisan migrate:fresh --seed
```

## 6. Việc cần làm tiếp

Ưu tiên 1: nối frontend vào API thật.

- Auth.
- Talent profile form.
- Brand partner profile.
- Brand campaign form.
- Wishlist.
- Contact request.
- Booking request.
- Survey tiering.

Ưu tiên 2: tách service cho logic phức tạp.

```text
ProfileCompletionService
TalentScoringService
PageantRecommendationService
BookingService
CampaignService
MediaUploadService
```

Ưu tiên 3: hoàn thiện admin.

- Dashboard thống kê.
- Action duyệt/từ chối profile.
- Action duyệt/từ chối partner profile.
- Action cập nhật trạng thái booking/contact request.
- Audit log thao tác admin.

Ưu tiên 4: production hardening.

- KYC.
- Moderation.
- Payment.
- Wallet/ledger.
- Redis queue.
- S3/MinIO.
- CDN.
- Audit log.

## 7. Kiểm thử

Chạy test:

```bash
cd backend
php artisan test
```

Các nhóm test hiện có:

- Auth API.
- Admin security.
- Partner profile.
- Talent discovery.
- Wishlist.
- Campaign.
- Contact request.
- Profile/media.
- Social metrics.
- Calendar.
- Booking.
- Survey tiering.

## 8. Deploy

Tài liệu deploy Railway:

```text
docs/Danh_Docs/Huong_Dan_Deploy_Backend_Railway.md
```

Khi deploy phải chạy migration để tạo đủ bảng/cột, bao gồm cột 2FA trong `users`.

## 9. Kết luận

Backend Laravel hiện đã đủ nền Phase 1 để nối frontend thật theo luồng:

```text
Auth -> Profile -> Search -> Wishlist -> Campaign -> Contact Request -> Booking -> Admin
```

Trọng tâm tiếp theo là nối giao diện Next.js vào API Laravel, không phải tạo thêm nhiều bảng mới.
