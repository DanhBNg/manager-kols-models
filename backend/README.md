# Backend Laravel API

Backend chính của project `manager-kols-models`.

## Stack

- Laravel 12
- PHP 8.2+
- Laravel Sanctum
- Laravel Socialite
- SQLite cho local development
- PHPUnit

## Chạy local

```bash
composer install
copy .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve --host=127.0.0.1 --port=8000
```

Không cần bật XAMPP khi dùng SQLite local.

## API hiện có

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/logout
GET  /api/auth/social/{provider}/redirect
GET  /api/auth/social/{provider}/callback
```

`provider` hiện hỗ trợ `google` và `facebook`.

## Kiểm tra

```bash
php artisan test
```
