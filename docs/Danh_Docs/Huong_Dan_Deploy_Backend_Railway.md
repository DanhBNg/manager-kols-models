# Hướng Dẫn Deploy Backend Laravel Lên Railway

Tài liệu này dùng cho backend Laravel trong thư mục `backend/`.

## 1. Khuyến nghị triển khai

- Deploy backend Laravel lên Railway.
- Dùng PostgreSQL cho môi trường public/test.
- Không dùng SQLite trên cloud, vì filesystem có thể không bền vững.
- Local vẫn dùng SQLite để phát triển nhanh.

## 2. Cấu hình service Railway

Khi tạo service từ GitHub repo:

```text
Root Directory: /backend
Builder: Nixpacks
Custom Build Command: để trống
Custom Start Command: để trống
```

Project đã có file:

```text
backend/nixpacks.toml
```

File này cấu hình PHP 8.3, Composer, Node.js, build Vite asset và publish asset Filament.

Không cần dùng `Procfile`.

## 3. PostgreSQL

Trong cùng Railway project, tạo thêm service PostgreSQL.

Backend service cần trỏ tới PostgreSQL bằng các biến riêng của backend service, không đặt nhầm ở service PostgreSQL.

Biến chính trên backend service:

```text
APP_NAME="KOLs Models Backend"
APP_ENV=production
APP_KEY=base64:...
APP_DEBUG=false
APP_URL=https://domain-railway-cua-ban
FRONTEND_URL=

LOG_CHANNEL=stderr
LOG_LEVEL=info

DB_CONNECTION=pgsql
DB_HOST=postgres.railway.internal
DB_PORT=5432
DB_DATABASE=railway
DB_USERNAME=postgres
DB_PASSWORD=mat-khau-postgres-cua-ban

SESSION_DRIVER=database
QUEUE_CONNECTION=database
CACHE_STORE=database
FILESYSTEM_DISK=local
```

Không nên để `DB_URL` trên backend nếu Railway đang resolve sai host hoặc sai database.

Với frontend Vercel hiện tại, nên đặt:

```text
FRONTEND_URL=https://vnp-2026-beuty-talent.vercel.app
```

Ở phía Vercel frontend, cần đặt Environment Variable:

```text
NEXT_PUBLIC_API_URL=https://manager-kols-models-production.up.railway.app/api
```

Nếu thiếu `NEXT_PUBLIC_API_URL`, frontend deploy sẽ fallback về `http://127.0.0.1:8000/api`, chỉ đúng khi chạy local và sẽ sai trên Vercel.

## 4. APP_KEY

Tạo `APP_KEY` ở local:

```bash
cd backend
php artisan key:generate --show
```

Copy kết quả lên biến `APP_KEY` của backend service.

## 5. Pre-deploy step

Trên Railway backend service, thêm Pre-deploy command:

```bash
php artisan config:clear && php artisan migrate --force
```

Migration bắt buộc vì backend có các bảng:

- `users`, `sessions`, `cache`, `jobs`.
- Bảng nghiệp vụ Phase 1.
- Cột 2FA trong `users`.
- Bảng `passkeys` do plugin 2FA publish.

Nếu log báo thiếu bảng như `sessions` hoặc thiếu cột `two_factor_secret`, nghĩa là migration chưa chạy đúng.

## 6. Kiểm tra sau deploy

Health check:

```text
https://domain-railway-cua-ban/api/health
https://domain-railway-cua-ban/api/health/db
```

Admin panel:

```text
https://domain-railway-cua-ban/admin
```

Nếu admin chỉ hiện HTML thô, kiểm tra asset Filament:

```text
https://domain-railway-cua-ban/css/filament/filament/app.css
https://domain-railway-cua-ban/js/filament/filament/app.js
```

Nếu 404, redeploy để chạy lại các lệnh trong `nixpacks.toml`.

## 7. Admin 2FA

Admin có mục `Xác minh 2 bước` trong avatar góc trên bên phải.

Luồng bật 2FA:

1. Admin đăng nhập `/admin`.
2. Bấm avatar góc trên bên phải.
3. Chọn `Xác minh 2 bước`.
4. Quét QR bằng Google Authenticator, Microsoft Authenticator hoặc app tương tự.
5. Nhập mã xác nhận để bật.
6. Lưu recovery code ở nơi an toàn.

Sau khi bật 2FA, lần đăng nhập tiếp theo sẽ yêu cầu mã xác minh.

## 8. Debug lỗi 500

Kiểm tra theo thứ tự:

1. Xem runtime logs của backend service.
2. Kiểm tra `APP_KEY`.
3. Kiểm tra biến DB nằm ở backend service, không nằm nhầm ở PostgreSQL service.
4. Mở `/api/health/db` để xác nhận Laravel kết nối được database.
5. Kiểm tra Pre-deploy command đã chạy migration.
6. Tạm bật `APP_DEBUG=true` để xem lỗi, sau khi xong phải đổi lại `false`.

## 9. Lưu ý bảo mật

- Không commit file `.env`.
- Không để `APP_DEBUG=true` trên production.
- Không ghi tài khoản admin, token hoặc mật khẩu database vào tài liệu.
- Nếu đã lộ secret, cần rotate lại trên Railway/GitHub.
- Nếu dùng Google/Facebook login production, cần cập nhật redirect URI theo domain thật.
