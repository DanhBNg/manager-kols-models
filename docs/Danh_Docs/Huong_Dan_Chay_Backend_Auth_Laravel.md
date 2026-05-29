# Hướng Dẫn Chạy Backend Auth Laravel

Tài liệu này dùng cho backend Laravel trong thư mục `backend/`.

## 1. Yêu cầu môi trường local

- PHP CLI 8.3 trở lên. Máy hiện đang dùng thư mục PHP: `C:\php`.
- Composer.
- Node.js và npm nếu cần build asset.
- Không cần bật XAMPP khi chạy local, vì local đang dùng SQLite.

Kiểm tra nhanh:

```bash
php -v
composer -V
```

## 2. Database local

Backend local đang dùng SQLite:

```text
backend/database/database.sqlite
```

Không cần tạo database trong phpMyAdmin.

Chạy migration:

```bash
cd backend
php artisan migrate
```

Reset database local nếu cần:

```bash
cd backend
php artisan migrate:fresh --seed
```

## 3. Chạy backend

```bash
cd backend
php artisan serve --host=127.0.0.1 --port=8000
```

Admin panel:

```text
http://127.0.0.1:8000/admin
```

Health check:

```text
http://127.0.0.1:8000/api/health
http://127.0.0.1:8000/api/health/db
```

## 4. Chạy frontend

Tại thư mục gốc project:

```bash
npm run dev -- --port 3000
```

Các màn hình auth frontend:

```text
http://localhost:3000/auth/login
http://localhost:3000/auth/register
```

Lưu ý: nhiều màn frontend hiện vẫn còn dữ liệu demo/mock. Khi chưa nối API Laravel thì thao tác trên frontend chưa chắc tạo dữ liệu trong admin.

## 5. API auth hiện có

Base URL local:

```text
http://127.0.0.1:8000/api
```

Endpoint chính:

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/logout
GET  /api/auth/social/google/redirect
GET  /api/auth/social/google/callback
GET  /api/auth/social/facebook/redirect
GET  /api/auth/social/facebook/callback
```

Actor auth hiện tại:

```text
talent
brand
admin
```

Không có actor auth riêng tên `agency`. Nếu cần phân biệt agency thì dùng `partner_profiles.organization_type = agency`.

## 6. Admin và bảo mật

Chỉ user có `type = admin` mới vào được `/admin`.

Trong avatar góc trên bên phải của Filament admin hiện có:

- `Đổi mật khẩu`.
- `Xác minh 2 bước`.
- `Sign out`.

Tính năng `Xác minh 2 bước` dùng mã QR/TOTP. Admin mở mục này, quét QR bằng Google Authenticator, Microsoft Authenticator hoặc app tương tự, rồi nhập mã xác nhận để bật 2FA.

Sau khi bật 2FA, lần đăng nhập admin tiếp theo sẽ cần nhập mã xác minh hoặc recovery code.

## 7. Đăng nhập Google/Facebook

Backend đã scaffold Laravel Socialite. Muốn dùng thật cần tạo OAuth App ở Google/Facebook rồi điền vào `backend/.env`:

```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=http://127.0.0.1:8000/api/auth/social/google/callback

FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=
FACEBOOK_REDIRECT_URI=http://127.0.0.1:8000/api/auth/social/facebook/callback
```

Nếu chưa có credentials, nút Google/Facebook chưa đăng nhập thật được.

## 8. Cho người khác chạy project

Người khác clone project về cần chạy:

```bash
cd backend
composer install
copy .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

Với SQLite local, người khác cũng không cần bật XAMPP.

## 9. Kiểm tra

Backend:

```bash
cd backend
php artisan test
```

Frontend:

```bash
npm run build
```

## 10. Deploy backend

Hướng dẫn deploy Railway nằm ở:

```text
docs/Danh_Docs/Huong_Dan_Deploy_Backend_Railway.md
```
