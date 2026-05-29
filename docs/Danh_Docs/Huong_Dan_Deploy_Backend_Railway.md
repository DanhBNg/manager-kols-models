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

Project đã có file:

```text
backend/nixpacks.toml
```

File này cấu hình Railway build Laravel.

Trên Railway UI, nên cấu hình migration bằng `Pre-deploy step`:

```bash
php artisan migrate --force
```

Nếu Railway yêu cầu cấu hình Root Directory, chọn:

```text
backend
```

Nếu Railway yêu cầu cấu hình Root Directory, chọn:

```text
backend
```

Không cần dùng `Procfile`.

Cấu hình deploy khuyến nghị trên Railway:

```text
Custom Build Command: để trống
Custom Start Command: để trống hoặc php artisan serve --host=0.0.0.0 --port=$PORT
Pre-deploy step: php artisan migrate --force
```

Nếu trang admin chỉ hiện HTML thô, kiểm tra asset Filament:

```text
https://domain-railway-cua-ban/css/filament/filament/app.css
https://domain-railway-cua-ban/js/filament/filament/app.js
```

Nếu các URL này 404, cần redeploy lại để chạy lệnh publish asset trong `backend/nixpacks.toml`.

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
- Không paste token, mật khẩu database hoặc biến môi trường chứa secret vào chat/tài liệu. Nếu đã lộ, nên rotate/regenerate lại secret trên Railway/GitHub.
- Nếu dùng đăng nhập Google/Facebook, cần cập nhật redirect URI theo domain production.

Ví dụ:

```text
https://domain-railway-cua-ban/api/auth/social/google/callback
https://domain-railway-cua-ban/api/auth/social/facebook/callback
```

## 5. Khi nào cần deploy lại

Railway có thể tự deploy lại khi bạn push code mới lên GitHub.

Mỗi lần deploy, migration nên chạy tự động qua `Pre-deploy step` của Railway.

## 6. Debug lỗi 500

Nếu mở domain hoặc `/admin` bị lỗi 500, kiểm tra theo thứ tự:

1. Vào Railway service backend, mở tab `Logs`.
2. Xem log runtime gần thời điểm mở trang.
3. Kiểm tra các biến môi trường bắt buộc:

```text
APP_ENV=production
APP_KEY=base64:...
APP_DEBUG=false
APP_URL=https://domain-railway-cua-ban
DB_CONNECTION=pgsql
DB_URL=${{Postgres.DATABASE_URL}}
SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=database
```

4. Nếu log báo thiếu bảng như `sessions`, `cache`, `users`, `migrations`, nghĩa là migration chưa chạy. Hãy kiểm tra `Pre-deploy step` trên Railway đã có `php artisan migrate --force`.
5. Nếu log báo `No application encryption key has been specified`, nghĩa là thiếu `APP_KEY`.
6. Nếu log báo không kết nối được database, kiểm tra PostgreSQL service đã được thêm vào cùng Railway project và biến `DB_URL` đã trỏ đúng `${{Postgres.DATABASE_URL}}`.

Có thể test health check:

```text
https://domain-railway-cua-ban/api/health
https://domain-railway-cua-ban/api/health/db
```

Ý nghĩa:

- `/api/health` chạy được: Laravel app đã start được.
- `/api/health/db` chạy được: Laravel kết nối được PostgreSQL.
- `/api/health` chạy được nhưng `/` hoặc `/admin` lỗi 500: thường là lỗi session/database migration/admin.
