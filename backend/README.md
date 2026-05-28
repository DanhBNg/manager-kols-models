# Nền tảng Quản lý KOLs/Models - Backend

## Tech Stack

- **Backend:** Laravel 12.x (PHP 8.2+)
- **Frontend:** React 18 + TypeScript
- **Bridge:** Inertia.js 3.x
- **Styling:** Tailwind CSS 3.x
- **Build Tool:** Vite 7.x
- **Authentication:** Laravel Sanctum
- **Database:** SQLite (development) / PostgreSQL (production)

## Cài đặt đã hoàn thành

✅ Laravel 12.x
✅ Laravel Breeze (Authentication starter kit)
✅ Filament 3.x (Admin Panel)
✅ Inertia.js 2.x
✅ React 18 + TypeScript
✅ Tailwind CSS 3.x
✅ Vite 7.x với React plugin
✅ Laravel Sanctum
✅ Ziggy (Laravel routes trong JavaScript)
✅ Livewire 3.x (cho Filament)

## Cấu trúc thư mục

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Auth/ (Breeze authentication)
│   │   │   └── ProfileController.php
│   │   └── Middleware/
│   │       └── HandleInertiaRequests.php
│   ├── Models/
│   │   └── User.php
│   └── Providers/
│       └── Filament/
│           └── AdminPanelProvider.php
├── resources/
│   ├── css/
│   │   └── app.css (Tailwind CSS)
│   ├── js/
│   │   ├── app.tsx (Entry point)
│   │   ├── Pages/
│   │   │   ├── Auth/ (Login, Register, etc.)
│   │   │   ├── Profile/
│   │   │   ├── Dashboard.tsx
│   │   │   └── Welcome.tsx
│   │   ├── Components/
│   │   └── Layouts/
│   │       ├── AuthenticatedLayout.tsx
│   │       └── GuestLayout.tsx
│   └── views/
│       └── app.blade.php (Root template)
├── routes/
│   ├── web.php
│   └── auth.php (Breeze routes)
├── public/
│   ├── css/filament/ (Filament assets)
│   └── js/filament/
├── tailwind.config.js
├── tsconfig.json
├── vite.config.js
└── package.json
```

## Khởi động Development Server

### 1. Cài đặt dependencies (nếu chưa)

```bash
# PHP dependencies
composer install

# Node dependencies
npm install
```

### 2. Cấu hình môi trường

```bash
# Copy .env file
cp .env.example .env

# Generate application key
php artisan key:generate

# Run migrations
php artisan migrate
```

### 3. Tạo Admin User cho Filament

```bash
php artisan make:filament-user
```

Nhập thông tin:
- Name: Admin
- Email: admin@example.com
- Password: (tùy chọn)

### 4. Chạy development servers

**Terminal 1 - Laravel Server:**
```bash
php artisan serve
```

**Terminal 2 - Vite Dev Server:**
```bash
npm run dev
```

**Truy cập:**
- Frontend (Breeze): http://localhost:8000
- Admin Panel (Filament): http://localhost:8000/admin

## Scripts có sẵn

```bash
# Development
npm run dev          # Start Vite dev server với HMR

# Production
npm run build        # Build production assets

# Laravel
php artisan serve    # Start Laravel development server
php artisan migrate  # Run database migrations
php artisan tinker   # Laravel REPL
```

## Tính năng đã setup

### 1. Laravel Breeze (Authentication)
- ✅ Login / Register / Forgot Password
- ✅ Email Verification
- ✅ Profile Management
- ✅ Password Reset
- ✅ React + TypeScript components
- ✅ Inertia.js integration

### 2. Filament Admin Panel
- ✅ Admin panel tại `/admin`
- ✅ User management
- ✅ Dashboard widgets
- ✅ Form builder
- ✅ Table builder
- ✅ Notifications
- ✅ Dark mode support

### 3. Inertia.js
- ✅ Middleware đã được đăng ký
- ✅ Root template (app.blade.php)
- ✅ React entry point (app.tsx)
- ✅ Page components với TypeScript

### 4. TypeScript
- ✅ tsconfig.json với strict mode
- ✅ Path aliases (@/* → resources/js/*)
- ✅ Type definitions cho React
- ✅ Ziggy types cho routes

### 5. Tailwind CSS
- ✅ Cấu hình tailwind.config.js
- ✅ PostCSS config
- ✅ Directives trong app.css
- ✅ Dark mode support

### 6. Vite
- ✅ React plugin
- ✅ Laravel Vite plugin
- ✅ Path aliases
- ✅ HMR (Hot Module Replacement)

## Bước tiếp theo

### 1. Tạo Filament Resources

```bash
# Tạo Resource cho quản lý KOLs/Models
php artisan make:filament-resource TalentProfile --generate

# Tạo Resource cho quản lý Jobs
php artisan make:filament-resource Job --generate

# Tạo Resource cho quản lý Agencies
php artisan make:filament-resource Agency --generate
```

### 2. Cài đặt thêm packages (tùy chọn)

```bash
# UI Components
npm install @headlessui/react @heroicons/react

# Form handling
npm install react-hook-form @hookform/resolvers zod

# State management
npm install zustand

# API client
npm install axios

# Date handling
npm install date-fns

# Icons
npm install lucide-react
```

### 2. Tạo Authentication

```bash
# Install Laravel Breeze với Inertia + React
composer require laravel/breeze --dev
php artisan breeze:install react --typescript
npm install
npm run dev
```

### 3. Setup Database

Cập nhật `.env` với thông tin database:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=kols_manager
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

### 4. Tạo Models và Migrations theo Tech Specs

Tham khảo:
- `docs/for-tech/plans/Core-Features-Technical-Specs.md`
- `docs/for-tech/plans/Agency-Module-Technical-Specs.md`

```bash
# Core tables
php artisan make:model Profile -m
php artisan make:model Photo -m
php artisan make:model Video -m
php artisan make:model SocialAccount -m
php artisan make:model CalendarEvent -m
php artisan make:model Job -m
php artisan make:model Application -m
php artisan make:model Booking -m

# Agency tables
php artisan make:model Agency -m
php artisan make:model AgencyMember -m
php artisan make:model AgencyTalent -m
php artisan make:model AgencyWallet -m
php artisan make:model AgencyTransaction -m
```

## Troubleshooting

### Lỗi "Vite manifest not found"
```bash
npm run build
```

### Lỗi TypeScript
```bash
# Xóa node_modules và reinstall
rm -rf node_modules package-lock.json
npm install
```

### Lỗi Tailwind không hoạt động
```bash
# Rebuild assets
npm run build
```

## Tài liệu tham khảo

**Framework & Libraries:**
- [Laravel Documentation](https://laravel.com/docs)
- [Laravel Breeze Documentation](https://laravel.com/docs/starter-kits#breeze)
- [Filament Documentation](https://filamentphp.com/docs)
- [Inertia.js Documentation](https://inertiajs.com)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev)

**Project Documentation:**
- [Business Requirements](../docs/for-bussinees/overview/)
- [Technical Specifications](../docs/for-tech/plans/)
- [Core Features Technical Specs](../docs/for-tech/plans/Core-Features-Technical-Specs.md)
- [Agency Module Technical Specs](../docs/for-tech/plans/Agency-Module-Technical-Specs.md)

## License

MIT
