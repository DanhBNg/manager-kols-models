# Tính Năng Xác Thực 2 Bước Cho Admin

## 1. Mục tiêu

Tính năng xác thực 2 bước giúp tăng bảo mật cho tài khoản admin trong Filament.

Sau khi bật tính năng này, admin không chỉ cần email và mật khẩu, mà còn cần thêm mã xác minh 6 số từ ứng dụng xác thực trên điện thoại.

Ví dụ ứng dụng có thể dùng:

- Google Authenticator.
- Microsoft Authenticator.
- Authy.
- 1Password hoặc Bitwarden nếu có hỗ trợ mã TOTP.

## 2. Phạm vi hiện tại

Tính năng hiện chỉ áp dụng cho trang admin Laravel/Filament:

```text
/admin
```

Frontend Next.js cho talent/brand chưa dùng cơ chế 2FA này.

Hiện backend bật luồng QR/TOTP. Chưa bật đăng nhập bằng passkey trên giao diện.

## 3. Package đang dùng

Backend dùng package:

```text
stephenjude/filament-two-factor-authentication
```

Package này tương thích với Filament 3 trong project hiện tại.

Trong model `User`, backend thêm:

```php
use Stephenjude\FilamentTwoFactorAuthentication\TwoFactorAuthenticatable;
use Spatie\LaravelPasskeys\Models\Concerns\HasPasskeys;
```

Trait `TwoFactorAuthenticatable` là phần package dùng để:

- Tạo secret key 2FA.
- Tạo QR code.
- Kiểm tra tài khoản đã bật 2FA chưa.
- Đọc recovery codes.
- Đánh dấu phiên đăng nhập đã vượt qua thử thách 2FA.

## 4. Bảng và cột liên quan

Migration thêm các cột sau vào bảng `users`:

```text
two_factor_secret
two_factor_recovery_codes
two_factor_confirmed_at
```

Ý nghĩa:

- `two_factor_secret`: khóa bí mật dùng để tạo mã xác minh.
- `two_factor_recovery_codes`: danh sách mã khôi phục, dùng khi mất điện thoại hoặc mất app Authenticator.
- `two_factor_confirmed_at`: thời điểm admin xác nhận bật 2FA thành công.

Package cũng publish bảng:

```text
passkeys
```

Bảng này đến từ dependency của package. Hiện tại backend chưa bật passkey trên giao diện, nhưng migration vẫn được giữ để package hoạt động ổn định.

## 5. Luồng bật xác thực 2 bước

1. Admin đăng nhập vào `/admin`.
2. Admin bấm avatar góc trên bên phải.
3. Chọn `Xác minh 2 bước`.
4. Hệ thống tạo một `secret key` riêng cho tài khoản admin.
5. Hệ thống hiển thị QR code.
6. Admin dùng app Authenticator quét QR.
7. App Authenticator bắt đầu sinh mã 6 số.
8. Admin nhập mã 6 số vào hệ thống.
9. Nếu mã đúng, hệ thống lưu thời điểm xác nhận vào `two_factor_confirmed_at`.
10. Từ lần đăng nhập sau, admin phải nhập mã 2FA sau khi nhập đúng email/mật khẩu.

## 6. QR code hoạt động như thế nào

QR code không phải là mật khẩu dùng một lần.

QR code là cách tiện hơn để chuyển `secret key` từ server sang app Authenticator.

Sau khi app Authenticator quét QR:

- Server giữ `secret key` trong database.
- App Authenticator giữ cùng `secret key` trên điện thoại.
- Cả hai bên cùng dùng `secret key` và thời gian hiện tại để tạo mã 6 số.

Mã 6 số thường đổi sau khoảng 30 giây.

Khi admin nhập mã, server tự tính mã hợp lệ ở thời điểm đó rồi so sánh. Nếu trùng thì cho qua.

## 7. Luồng đăng nhập sau khi bật 2FA

1. Admin mở `/admin`.
2. Nhập email và mật khẩu.
3. Nếu email/mật khẩu đúng và tài khoản đã bật 2FA, hệ thống chuyển sang màn nhập mã xác minh.
4. Admin mở app Authenticator và nhập mã 6 số.
5. Nếu mã đúng, hệ thống cho vào admin panel.
6. Nếu mã sai, hệ thống từ chối đăng nhập.

## 8. Recovery code dùng để làm gì

Recovery code là mã dự phòng.

Admin cần lưu recovery code ở nơi an toàn sau khi bật 2FA.

Dùng recovery code khi:

- Mất điện thoại.
- Xóa app Authenticator.
- Đổi điện thoại nhưng chưa chuyển mã 2FA.
- App Authenticator không còn mã của hệ thống.

Mỗi recovery code chỉ nên dùng một lần.

## 9. Việt hóa giao diện

Các nội dung tiếng Việt của package được override tại:

```text
backend/lang/vendor/filament-two-factor-authentication/en/
```

Lý do dùng thư mục `en`:

- Laravel project hiện đang dùng locale mặc định là `en`.
- Nếu chỉ tạo thư mục `vi`, giao diện vẫn có thể hiện tiếng Anh nếu chưa đổi `APP_LOCALE`.
- Ghi đè namespace `en` giúp giao diện 2FA hiện tiếng Việt ngay mà không ảnh hưởng toàn bộ locale của Laravel.

Không sửa trực tiếp trong `vendor`, vì thư mục `vendor` có thể bị ghi đè khi chạy `composer install` hoặc update package.

## 10. Kiểm thử

Test liên quan nằm trong:

```text
backend/tests/Feature/AdminSecurityTest.php
```

Các test kiểm tra:

- Chỉ admin vào được Filament panel.
- Menu `Đổi mật khẩu` tồn tại.
- Model `User` hỗ trợ 2FA.
- Menu `Xác minh 2 bước` tồn tại.
- Nội dung 2FA đã được Việt hóa.
- Admin đổi mật khẩu đúng/sai theo mật khẩu hiện tại.

Chạy test:

```bash
cd backend
C:\php\php.exe artisan test
```

Kết quả gần nhất:

```text
29 passed, 122 assertions
```

## 11. Lưu ý khi deploy

Railway đang dùng PHP 8.3 trong `backend/nixpacks.toml`, nên việc nâng `composer.json` lên `php: ^8.3` là phù hợp với deploy hiện tại.

Khi deploy phải chạy migration:

```bash
php artisan config:clear && php artisan migrate --force
```

Nếu không chạy migration, admin có thể lỗi vì thiếu cột:

```text
two_factor_secret
two_factor_recovery_codes
two_factor_confirmed_at
```

Nếu giao diện 2FA vẫn hiện tiếng Anh sau deploy, chạy lại:

```bash
php artisan optimize:clear
```

Hoặc redeploy để build mới tự clear cache theo cấu hình hiện tại.

## 12. Lưu ý vận hành

- Không bật 2FA nếu admin chưa lưu recovery code.
- Không lưu recovery code trong repo.
- Không gửi recovery code qua chat công khai.
- Nếu mất thiết bị và mất recovery code, cần xử lý bằng quyền database hoặc command riêng để tắt 2FA cho tài khoản đó.
- Sau này nếu có nhiều admin, nên thêm quy trình bắt buộc bật 2FA cho toàn bộ admin.
