<?php

return [
    'enable' => [
        'header' => 'Bạn chưa bật xác minh 2 bước.',
        'description' => 'Khi bật xác minh 2 bước, hệ thống sẽ yêu cầu mã bảo mật khi đăng nhập. Mã này được lấy từ ứng dụng xác thực trên điện thoại.',
    ],
    'logout' => [
        'button' => 'Đăng xuất',
    ],
    'enabled' => [
        'header' => 'Bạn đã bật xác minh 2 bước.',
        'description' => 'Hãy lưu các mã khôi phục ở nơi an toàn. Có thể dùng các mã này để khôi phục quyền truy cập nếu bạn mất thiết bị xác thực.',
    ],
    'setup_confirmation' => [
        'header' => 'Hoàn tất bật xác minh 2 bước.',
        'description' => 'Khi bật xác minh 2 bước, hệ thống sẽ yêu cầu mã bảo mật khi đăng nhập. Mã này được lấy từ ứng dụng xác thực trên điện thoại.',
        'scan_qr_code' => 'Để hoàn tất, hãy quét mã QR bằng Google Authenticator, Microsoft Authenticator hoặc ứng dụng tương tự. Sau đó nhập mã OTP được tạo trong ứng dụng.',
    ],
    'base' => [
        'wrong_user' => 'Tài khoản đang đăng nhập phải là model xác thực của Filament để có thể cập nhật trang hồ sơ.',
        'rate_limit_exceeded' => 'Bạn thao tác quá nhiều lần',
        'try_again' => 'Vui lòng thử lại sau :seconds giây',
    ],
    '2fa' => [
        'confirm' => 'Xác nhận',
        'cancel' => 'Hủy',
        'enable' => 'Bật',
        'disable' => 'Tắt',
        'confirm_password' => 'Xác nhận mật khẩu',
        'wrong_password' => 'Mật khẩu không chính xác.',
        'code' => 'Mã xác minh',
        'setup_key' => 'Khóa thiết lập: :setup_key.',
        'current_password' => 'Mật khẩu hiện tại',
        'regenerate_recovery_codes' => 'Tạo mã khôi phục mới',
    ],
    'passkey' => [
        'add' => 'Tạo passkey',
        'name' => 'Tên',
        'added' => 'Đã thêm passkey.',
        'login' => 'Đăng nhập bằng passkey',
    ],
];
