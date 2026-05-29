# Kế Hoạch Backend Laravel

## 1. Mục tiêu hiện tại

Backend chính của dự án nằm trong thư mục `backend/` và dùng Laravel để cung cấp REST API cho frontend Next.js ở thư mục gốc.

Mục tiêu giai đoạn hiện tại là hoàn thiện nền backend cho Phase 1 MVP:

- Đăng ký, đăng nhập, đăng xuất bằng Laravel Sanctum.
- Phân loại tài khoản theo `talent`, `brand`, `admin`.
- Tự tạo hồ sơ nghiệp vụ ban đầu sau khi đăng ký.
- Quản lý hồ sơ talent.
- Quản lý hồ sơ đối tác/brand.
- Quản lý media, social metrics, lịch rảnh.
- Quản lý talent đã lưu, campaign, yêu cầu liên hệ, booking sơ bộ.
- Quản lý khảo sát xếp hạng talent/tier.
- Có trang admin nội bộ bằng Filament.

Frontend hiện tại vẫn còn nhiều dữ liệu demo/mock. Backend đã có API để nhận dữ liệu thật, nhưng các màn frontend chưa nối hết vào API.

## 2. Kiến trúc đã chốt

Kiến trúc đang áp dụng:

- Frontend: Next.js App Router ở thư mục gốc.
- Backend: Laravel 12 API ở thư mục `backend/`.
- Auth API: Laravel Sanctum token.
- Database local: SQLite.
- Admin panel: Filament 3 tại `/admin`.
- Social login: Laravel Socialite đã được cài, hiện có route Google/Facebook nhưng cần cấu hình OAuth thật trong `.env` nếu muốn dùng.

Không dùng XAMPP/MySQL cho local ở giai đoạn hiện tại. SQLite đủ nhẹ và tiện để chạy máy cá nhân.

File database local:

```text
backend/database/database.sqlite
```

Chạy backend:

```bash
cd backend
php artisan serve
```

Admin:

```text
http://127.0.0.1:8000/admin
```

## 3. Module đã triển khai

### 3.1. Authentication

API đã có:

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/logout
GET  /api/auth/social/{provider}/redirect
GET  /api/auth/social/{provider}/callback
```

Khi đăng ký:

- Nếu `type = talent`, backend tự tạo bản ghi ban đầu trong `profiles`.
- Nếu `type = brand`, backend tự tạo bản ghi ban đầu trong `partner_profiles`.
- Không cho đăng ký `agency` như một actor auth riêng.
- `admin` chỉ tạo qua seed/admin, không cho đăng ký public.

Actor hiện tại:

```text
talent
brand
admin
```

Lưu ý: agency hiện chưa phải loại tài khoản đăng nhập riêng. Nếu cần phân biệt agency ở phía đối tác, dùng `partner_profiles.organization_type = agency`.

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

API đã có:

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

Ý nghĩa:

- Talent cập nhật hồ sơ thật qua `PUT /api/my/profile`.
- Ảnh/video/social/lịch rảnh đã có API nền.
- Upload ảnh hiện lưu local qua disk `public`.
- Chưa có xử lý AI moderation, nén ảnh WebP, CDN hoặc S3 thật.

### 3.3. Partner/Brand profile

Bảng chính:

```text
partner_profiles
```

API đã có:

```text
GET /api/partner/profile
PUT /api/partner/profile
```

Brand dùng API này để hoàn thiện thông tin tổ chức:

- Tên tổ chức.
- Loại tổ chức: `brand`, `agency`, `recruiter`, `event_organizer`.
- Ngành hàng.
- Website/fanpage.
- Người phụ trách.
- Số điện thoại.
- Email liên hệ.
- Thành phố.
- Mô tả.
- Trạng thái duyệt.

### 3.4. Talent discovery

API đã có:

```text
GET /api/talents
GET /api/talents/{profile}
```

Filter hiện hỗ trợ:

```text
q
city
type
gender
min_age
max_age
min_height
max_height
verified
tier
sort
```

Hiện search dùng SQL/Eloquent, chưa dùng Elasticsearch.

### 3.5. Talent đã lưu

Bảng chính:

```text
wishlists
wishlist_items
```

API đã có:

```text
GET    /api/wishlists
POST   /api/wishlists
GET    /api/wishlists/{wishlist}
POST   /api/wishlists/{wishlist}/items
DELETE /api/wishlists/{wishlist}/items/{item}
```

Mục tiêu:

- Brand lưu talent để xem lại.
- Có ghi chú nội bộ.
- Không cho lưu trùng cùng một talent trong cùng một wishlist.

### 3.6. Campaign

Bảng chính:

```text
campaigns
campaign_talents
```

API đã có:

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

Campaign dùng thay cho bảng `jobs` nghiệp vụ để tránh trùng với bảng `jobs` mặc định của Laravel queue.

Trạng thái campaign:

```text
draft
published
closed
```

Trạng thái talent trong campaign:

```text
new
shortlisted
interview
accepted
confirmed
rejected
```

### 3.7. Contact request

Bảng chính:

```text
contact_requests
```

API đã có:

```text
GET  /api/contact-requests
POST /api/contact-requests
GET  /api/contact-requests/{contactRequest}
POST /api/contact-requests/{contactRequest}/cancel
```

Mục tiêu:

- Brand gửi yêu cầu liên hệ/booking sơ bộ cho talent.
- Admin theo dõi demand thật.
- Chưa có chat realtime.
- Chưa mở thông tin liên hệ riêng tư tự động.

### 3.8. Booking sơ bộ

Bảng chính:

```text
bookings
```

API đã có:

```text
GET  /api/bookings
POST /api/bookings
```

Booking hiện ở mức MVP:

- Brand tạo booking request với talent.
- Có thời gian bắt đầu/kết thúc.
- Có địa điểm.
- Có thù lao.
- Có commission tạm tính.
- Có `status` và `payment_status`.

Chưa có escrow thật, payment gateway, hợp đồng, dispute workflow đầy đủ.

### 3.9. Survey tiering

Bảng chính:

```text
survey_responses
talent_scores
pageant_recommendations
```

API đã có:

```text
POST /api/survey/submit
GET  /api/survey/progress
POST /api/survey/calculate
GET  /api/recommendations
```

Hiện thuật toán tính tier đang ở mức MVP:

- Nhận câu trả lời khảo sát.
- Tính điểm theo một số tiêu chí chính.
- Gán tier `S/A/B/C`.
- Lưu điểm vào `talent_scores`.
- Sinh gợi ý cuộc thi vào `pageant_recommendations`.

Cần làm tiếp:

- Đồng bộ đầy đủ với bộ 30 câu hỏi thật trong tài liệu business.
- Tách scoring logic ra service riêng nếu thuật toán phức tạp hơn.
- Viết thêm unit test cho các hard rules.

## 4. Admin panel Filament

Admin chạy tại:

```text
http://127.0.0.1:8000/admin
```

Các resource đã tạo:

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

Chỉ user có `type = admin` mới vào được admin panel.

Admin hiện dùng để:

- Xem và sửa user.
- Duyệt/sửa hồ sơ talent.
- Duyệt/sửa hồ sơ đối tác.
- Xem campaign.
- Xem booking.
- Xem contact request.
- Xem khảo sát và điểm tier.

Chưa có:

- Dashboard thống kê sâu.
- Role/permission admin chi tiết.
- Audit log thao tác admin.
- KYC workflow.
- Moderation workflow.
- Wallet/transaction/escrow resources.

## 5. Dữ liệu demo

Seeder hiện tạo dữ liệu demo để admin không bị trống:

Dữ liệu demo gồm:

- 1 admin.
- 1 brand có partner profile.
- 2 talent có profile.
- Social account và metrics.
- Calendar event.
- Campaign demo.
- Talent trong campaign.
- Wishlist/talent đã lưu.
- Contact request.
- Booking.
- Survey response.
- Talent score.
- Pageant recommendation.

Chạy seed:

```bash
cd backend
php artisan db:seed --class=DatabaseSeeder
```

Reset database local nếu cần:

```bash
cd backend
php artisan migrate:fresh --seed
```

## 6. Lưu ý quan trọng về frontend

Backend đã có API, nhưng frontend hiện chưa nối hết.

Hiện trạng cần hiểu rõ:

- Giao diện Brand/Talent ở Next.js hiện còn nhiều dữ liệu mock/demo.
- Nếu frontend không gọi API Laravel thì admin sẽ không thấy dữ liệu mới.
- Campaign trên giao diện Brand hiện chưa chắc đã ghi vào bảng `campaigns`.
- Talent profile trên giao diện Talent hiện chưa chắc đã ghi vào bảng `profiles`.

Luồng đúng sau khi nối frontend:

1. User đăng ký talent/brand.
2. Backend tạo `users` và profile placeholder.
3. Talent hoàn thiện hồ sơ, frontend gọi `PUT /api/my/profile`.
4. Talent upload ảnh/video/social/lịch, frontend gọi API tương ứng.
5. Brand hoàn thiện hồ sơ đối tác, frontend gọi `PUT /api/partner/profile`.
6. Brand tạo campaign, frontend gọi `POST /api/campaigns`.
7. Brand lưu talent, frontend gọi wishlist API.
8. Brand gửi yêu cầu liên hệ/booking, frontend gọi contact request hoặc booking API.
9. Admin sẽ thấy dữ liệu thật trong Filament.

## 7. Việc đã kiểm thử

Backend hiện có feature tests cho:

- Auth API.
- Tự tạo profile sau register.
- Partner profile.
- Talent discovery.
- Wishlist.
- Campaign.
- Campaign talent stage.
- Contact request.
- Talent profile/media.
- Social metrics.
- Calendar.
- Booking.
- Survey tiering.

Lệnh kiểm thử:

```bash
cd backend
php artisan test
```

Kết quả gần nhất:

```text
22 passed, 110 assertions
```

## 8. Việc nên làm tiếp theo

### Ưu tiên 1: Nối frontend vào API thật

Các màn nên nối trước:

- Đăng ký/đăng nhập.
- Talent profile form.
- Brand partner profile.
- Brand campaign form.
- Brand talent đã lưu.
- Contact request.
- Booking request.

Mục tiêu:

- Thao tác trên giao diện tạo dữ liệu thật trong SQLite.
- Admin thấy được dữ liệu mới ngay.

### Ưu tiên 2: Tách service cho logic phức tạp

Hiện một số logic còn nằm trong controller để đi nhanh MVP. Nên tách dần:

```text
ProfileCompletionService
TalentScoringService
PageantRecommendationService
BookingService
CampaignService
MediaUploadService
```

### Ưu tiên 3: Hoàn thiện admin

Cần bổ sung:

- Dashboard thống kê số user, talent, brand, campaign, booking.
- Action duyệt/từ chối profile.
- Action duyệt/từ chối partner profile.
- Action cập nhật trạng thái booking/contact request.
- Audit log thao tác admin.

### Ưu tiên 4: KYC, moderation, payment

Các phần này chưa nên làm quá sâu ngay:

- KYC manual trước, AI/OCR sau.
- Moderation ảnh/video manual trước, AI moderation sau.
- Ledger/transaction trước, VNPay/Momo/Stripe sau.
- Local storage trước, S3/MinIO sau.
- SQL search trước, Elasticsearch sau.

## 9. Các phần chưa triển khai production thật

Chưa có:

- Elasticsearch.
- Redis queue production.
- S3/MinIO thật.
- CDN.
- AI moderation.
- Google Calendar sync thật.
- Payment gateway.
- Escrow thật.
- Wallet/ledger.
- KYC.
- Audit log.
- Chat realtime.
- Agency RBAC phức tạp.

Các phần này nên làm sau khi frontend đã nối được các luồng Phase 1 căn bản.

## 10. Cách chạy nhanh

Cài dependency nếu máy mới clone:

```bash
cd backend
composer install
php artisan key:generate
php artisan migrate --seed
php artisan test
php artisan serve
```

Mở admin:

```text
http://127.0.0.1:8000/admin
```

Mở API base:

```text
http://127.0.0.1:8000/api
```

Nếu muốn xem dữ liệu SQLite bằng giao diện:

- Dùng extension SQLite Viewer trong VS Code.
- Hoặc dùng DB Browser for SQLite.
- File cần mở: `backend/database/database.sqlite`.

## 11. Kết luận

Backend Laravel hiện đã có nền Phase 1 đủ để bắt đầu nối frontend thật:

```text
Auth -> Profile -> Search -> Wishlist -> Campaign -> Contact Request -> Booking -> Admin
```

Trọng tâm tiếp theo không phải tạo thêm nhiều bảng mới, mà là nối các màn frontend hiện có vào API Laravel, sau đó admin sẽ có dữ liệu thật thay vì chỉ dữ liệu seed/demo.

## 12. Deploy

Backend đã có tài liệu deploy riêng:

```text
docs/Danh_Docs/Huong_Dan_Deploy_Backend_Railway.md
```

Khuyến nghị deploy backend Laravel lên Railway với PostgreSQL. Local vẫn có thể dùng SQLite để phát triển nhanh, nhưng môi trường public/test nhiều người nên dùng database cloud ổn định hơn.
