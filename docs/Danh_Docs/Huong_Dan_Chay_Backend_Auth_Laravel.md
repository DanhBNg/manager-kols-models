# Hướng Dẫn Chạy Backend Auth Laravel

1. Chạy backend Laravel:

```bash
cd backend
php artisan serve --host=127.0.0.1 --port=8000
```

2. Chạy frontend Next.js:

```bash
Tại thư mục gốc
npm run dev -- --port 3000
```

3. Mở giao diện:

- Đăng nhập: `http://localhost:3000/auth/login`
- Đăng ký: `http://localhost:3000/auth/register`

## Cấu trúc hiện tại

- Frontend Next.js: `C:\Users\AMLT\Downloads\manager-kols-models`
- Backend Laravel API: `C:\Users\AMLT\Downloads\manager-kols-models\backend`

Thư mục `backend/` hiện là backend chính của project. Backend Laravel cũ dùng Inertia/Filament/Breeze đã được xóa theo quyết định ngày 28/05/2026 để tránh nhầm với hướng Next.js + Laravel API.

## Database local

Backend đang dùng SQLite cho local development:

- File database: `backend\database\database.sqlite`
- Không cần bật XAMPP.
- Không cần tạo database trong phpMyAdmin.
- Không cần cấu hình username/password database.

Khi cần tạo hoặc cập nhật bảng:

```bash
cd C:\Users\AMLT\Downloads\manager-kols-models\backend
php artisan migrate
```

Nếu muốn reset sạch database local:

```bash
cd C:\Users\AMLT\Downloads\manager-kols-models\backend
php artisan migrate:fresh
```


## API auth hiện có

Base URL mặc định frontend đang gọi:

```text
http://127.0.0.1:8000/api
```

Các endpoint:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`
- `GET /api/auth/social/google/redirect`
- `GET /api/auth/social/google/callback`
- `GET /api/auth/social/facebook/redirect`
- `GET /api/auth/social/facebook/callback`

Frontend lưu token tạm trong `localStorage` với key `onstagevn_auth_token`. Đây là cách đủ dùng cho MVP local; khi làm production nên đổi sang cookie HTTP-only hoặc cơ chế bảo mật chặt hơn.

## Bảng hiện có

Hiện tại chỉ tạo các bảng cần cho auth và hạ tầng Laravel. Các bảng nghiệp vụ trong `docs/for-tech/plans` sẽ được tạo khi bắt đầu làm module tương ứng.

Bảng `users` hiện có các trường nền:

- `id`
- `name`
- `email`
- `phone`
- `password`
- `type`
- `status`
- `is_verified`
- `is_ghost`
- `last_login_at`
- `social_provider`
- `social_id`
- `avatar`
- `email_verified_at`
- `remember_token`
- `created_at`
- `updated_at`

Các bảng như `profiles`, `photos`, `videos`, `social_accounts`, `bookings` chưa tạo ở bước auth này.

## Đăng nhập Google/Facebook

Backend đã scaffold Laravel Socialite. Để chạy thật cần tạo OAuth App ở Google/Facebook rồi điền vào `backend\.env`:

```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=http://127.0.0.1:8000/api/auth/social/google/callback

FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=
FACEBOOK_REDIRECT_URI=http://127.0.0.1:8000/api/auth/social/facebook/callback
```

Nếu chưa có credentials, nút Google/Facebook sẽ chưa đăng nhập thật được.

## Cho người khác chạy project

Người khác chạy được nếu có:

- PHP
- Composer
- Node.js

Các bước cơ bản:

```bash
cd C:\Users\AMLT\Downloads\manager-kols-models
npm install

cd backend
composer install
copy .env.example .env
php artisan key:generate
php artisan migrate
```

Với SQLite, người khác không cần bật XAMPP khi chạy local. Sau này nếu deploy production thì nên dùng PostgreSQL hoặc MySQL, và có thể chuẩn hóa môi trường bằng Docker hoặc Laravel Sail.

## Kiểm tra

Backend:

```bash
cd C:\Users\AMLT\Downloads\manager-kols-models\backend
php artisan test
```

Frontend:

```bash
cd C:\Users\AMLT\Downloads\manager-kols-models
npm run build
```
