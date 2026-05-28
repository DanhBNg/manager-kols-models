# 🚀 Quick Start Guide

## Cài đặt đã hoàn thành ✅

- ✅ **Laravel 12.x** - Backend framework
- ✅ **Laravel Breeze** - Authentication starter kit (Login, Register, Profile)
- ✅ **Filament 3.x** - Admin panel tại `/admin`
- ✅ **Inertia.js 2.x** - Bridge Laravel ↔ React
- ✅ **React 18 + TypeScript** - Frontend framework
- ✅ **Tailwind CSS 3.x** - Styling
- ✅ **Vite 7.x** - Build tool với HMR
- ✅ **Laravel Sanctum** - API authentication
- ✅ **Livewire 3.x** - Cho Filament admin panel

---

## 🏃 Khởi động nhanh

### 1. Cài đặt dependencies (nếu chưa)

```bash
cd backend

# PHP dependencies
composer install

# Node dependencies  
npm install --legacy-peer-deps
```

### 2. Cấu hình database

File `.env` đã được tạo sẵn với SQLite:

```env
DB_CONNECTION=sqlite
DB_DATABASE=/path/to/database/database.sqlite
```

Chạy migrations:

```bash
php artisan migrate
```

### 3. Tạo Admin User cho Filament

```bash
php artisan make:filament-user
```

Nhập thông tin:
- **Name:** Admin
- **Email:** admin@example.com  
- **Password:** (tùy chọn, ví dụ: password)

### 4. Chạy development servers

**Terminal 1 - Laravel:**
```bash
php artisan serve
```

**Terminal 2 - Vite:**
```bash
npm run dev
```

### 5. Truy cập ứng dụng

- **Frontend (Breeze):** http://localhost:8000
  - Login, Register, Dashboard, Profile
  
- **Admin Panel (Filament):** http://localhost:8000/admin
  - Đăng nhập với tài khoản admin vừa tạo

---

## 📁 Cấu trúc Project

```
backend/
├── app/
│   ├── Http/Controllers/Auth/     # Breeze authentication
│   ├── Models/                    # Eloquent models
│   └── Providers/Filament/        # Filament admin panel config
│
├── resources/
│   ├── js/
│   │   ├── Pages/                 # React pages (Inertia)
│   │   │   ├── Auth/              # Login, Register
│   │   │   ├── Profile/           # User profile
│   │   │   ├── Dashboard.tsx
│   │   │   └── Welcome.tsx
│   │   ├── Components/            # React components
│   │   ├── Layouts/               # Layout components
│   │   └── app.tsx                # Entry point
│   │
│   ├── css/app.css                # Tailwind CSS
│   └── views/app.blade.php        # Root template
│
├── routes/
│   ├── web.php                    # Web routes
│   └── auth.php                   # Breeze auth routes
│
└── database/
    └── migrations/                # Database migrations
```

---

## 🎯 Bước tiếp theo

### 1. Tạo Models theo Tech Specs

```bash
# Core tables (theo Core-Features-Technical-Specs.md)
php artisan make:model Profile -m
php artisan make:model Photo -m
php artisan make:model Video -m
php artisan make:model SocialAccount -m
php artisan make:model CalendarEvent -m
php artisan make:model Job -m
php artisan make:model Application -m
php artisan make:model Booking -m

# Agency tables (theo Agency-Module-Technical-Specs.md)
php artisan make:model Agency -m
php artisan make:model AgencyMember -m
php artisan make:model AgencyTalent -m
php artisan make:model AgencyWallet -m
php artisan make:model AgencyTransaction -m
```

### 2. Tạo Filament Resources

```bash
# Tạo admin interface cho các models
php artisan make:filament-resource Profile --generate
php artisan make:filament-resource Job --generate
php artisan make:filament-resource Agency --generate
```

### 3. Tạo React Pages

Tạo các trang mới trong `resources/js/Pages/`:
- `Profiles/Index.tsx` - Danh sách KOLs/Models
- `Jobs/Index.tsx` - Danh sách công việc
- `Bookings/Index.tsx` - Quản lý bookings

### 4. Setup Production Database

Cập nhật `.env` với PostgreSQL:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=kols_manager
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

---

## 🛠️ Commands hữu ích

```bash
# Development
npm run dev              # Start Vite dev server
php artisan serve        # Start Laravel server

# Database
php artisan migrate      # Run migrations
php artisan migrate:fresh --seed  # Fresh database with seeders
php artisan db:seed      # Run seeders

# Filament
php artisan make:filament-resource ModelName
php artisan make:filament-page PageName
php artisan make:filament-widget WidgetName
php artisan make:filament-user   # Create admin user

# Laravel
php artisan make:model ModelName -m  # Model + migration
php artisan make:controller ControllerName --resource
php artisan route:list   # List all routes
php artisan tinker       # Laravel REPL

# Production
npm run build            # Build for production
php artisan optimize     # Optimize Laravel
```

---

## 📚 Tài liệu

- **Business Docs:** `docs/for-bussinees/overview/`
- **Tech Specs:** `docs/for-tech/plans/`
- **README:** `backend/README.md`

---

## 🐛 Troubleshooting

### Lỗi "Vite manifest not found"
```bash
npm run build
```

### Lỗi npm dependencies
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Lỗi Filament không load
```bash
php artisan filament:optimize
php artisan optimize:clear
```

### Lỗi permissions
```bash
chmod -R 775 storage bootstrap/cache
```

---

**Happy Coding! 🎉**
