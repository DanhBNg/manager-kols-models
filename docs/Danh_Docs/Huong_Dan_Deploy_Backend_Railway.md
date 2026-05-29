# Hướng Dẫn Deploy Backend Laravel Lên Railway

Tài liệu này dùng cho backend Laravel trong thư mục `backend`.

## 1. Khuyến nghị triển khai

Nên deploy backend Laravel lên Railway và dùng PostgreSQL cho môi trường test/public.

Không nên dùng SQLite khi deploy cloud vì dữ liệu có thể không ổn định nếu nền tảng dùng filesystem tạm thời. SQLite vẫn phù hợp để chạy local trên máy cá nhân.

## 2. Cần chuẩn bị

- Tài khoản GitHub có chứa repo project.
- Tài khoản Railway.
- Project backend nằm trong thư mục `backend`.
- Backend đã chạy được local bằng `php artisan serve`.

## 3. Cấu hình Railway

### Bước 1: Tạo project

Vào Railway, tạo `New Project`, chọn deploy từ GitHub repo.

Nếu Railway hỏi thư mục gốc, chọn:

```text
backend
```

### Bước 2: Tạo PostgreSQL

Trong project Railway, thêm service PostgreSQL.

Backend production nên dùng:

```text
DB_CONNECTION=pgsql
DB_URL=${{Postgres.DATABASE_URL}}
```

### Bước 3: Cấu hình biến môi trường

Tạo `APP_KEY` ở máy local:

```bash
cd backend
php artisan key:generate --show
```

Sau đó thêm các biến chính trên Railway:

```text
APP_NAME="KOLs Models Backend"
APP_ENV=production
APP_KEY=base64:...
APP_DEBUG=false
APP_URL=https://domain-railway-cua-ban
FRONTEND_URL=https://domain-frontend-cua-ban

LOG_CHANNEL=stderr
LOG_LEVEL=info

DB_CONNECTION=pgsql
DB_URL=${{Postgres.DATABASE_URL}}

SESSION_DRIVER=database
QUEUE_CONNECTION=database
CACHE_STORE=database
FILESYSTEM_DISK=local
```

Nếu chưa nối frontend public thì có thể để trống `FRONTEND_URL` tạm thời.

### Bước 4: Build và migrate

Trong phần cấu hình deploy của service backend:

Build command:

```bash
npm run build
```

Pre-deploy command:

```bash
chmod +x ./railway/init-app.sh && sh ./railway/init-app.sh
```

File `backend/railway/init-app.sh` sẽ tự chạy migrate database và optimize Laravel trước khi service public.

### Bước 5: Generate domain

Sau khi deploy xong, vào tab Networking của service backend và chọn `Generate Domain`.

Trang admin sẽ nằm ở:

```text
https://domain-railway-cua-ban/admin
```

## 4. Lưu ý bảo mật

- Không bật `APP_DEBUG=true` trên production.
- Không commit file `.env`.
- Không ghi tài khoản admin demo vào tài liệu.
- Nếu dùng đăng nhập Google/Facebook, cần cập nhật redirect URI theo domain production.

Ví dụ:

```text
https://domain-railway-cua-ban/api/auth/social/google/callback
https://domain-railway-cua-ban/api/auth/social/facebook/callback
```

## 5. Khi nào cần deploy lại

Railway có thể tự deploy lại khi bạn push code mới lên GitHub.

Mỗi lần deploy, migration sẽ chạy tự động qua script `railway/init-app.sh`.
