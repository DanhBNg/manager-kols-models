# Tài liệu Kỹ thuật - Nền tảng Quản lý KOLs/Models

> **Note:** This directory contains technical specifications, database schemas, API documentation, and implementation details for developers.

## 📚 Tổng quan

Tài liệu kỹ thuật được tổ chức theo từng module chức năng. Mỗi file chứa:
- Database schema (SQL)
- API endpoints (REST)
- Business logic implementation (code examples)
- Security & performance considerations

---

## 🏗️ Kiến trúc Hệ thống Khuyến nghị

### Mô hình Laravel + Inertia.js + React/Vue

| Thành phần | Công nghệ khuyến nghị | Vai trò |
|------------|----------------------|---------|
| **Backend** | PHP 8.3+ & Laravel | Xử lý Logic, Cơ sở dữ liệu, Bảo mật |
| **Cầu nối** | Inertia.js | Truyền dữ liệu trực tiếp, không cần viết REST API cồng kềnh |
| **Frontend** | React / Vue + TypeScript | Xây dựng giao diện ứng dụng Single Page App (SPA) mượt mà |
| **Bundler** | Vite | Biên dịch mã TypeScript cực nhanh |

**Lợi ích của stack này:**
- ✅ **Tốc độ phát triển nhanh:** Inertia.js giảm 50% code boilerplate
- ✅ **Type-safe:** TypeScript + Laravel typed properties
- ✅ **SEO-friendly:** Server-side rendering với Inertia SSR
- ✅ **Developer experience:** Hot reload, auto-completion, debugging tools
- ✅ **Ecosystem:** Laravel packages + React/Vue components

---

## 📁 Cấu trúc Tài liệu

### [Core Features Technical Specs](./plans/Core-Features-Technical-Specs.md)
Chi tiết kỹ thuật cho các tính năng cốt lõi (Luồng 1):

**Nội dung:**
- Technology Stack (React, Node.js, PostgreSQL, Redis, S3, Elasticsearch)
- Database Schema (10 tables: users, profiles, photos, videos, social_accounts, calendar_events, jobs, applications, bookings)
- API Endpoints (Authentication, Profile Management, Social Media Integration, Search, Job Posting, Calendar)
- Image Processing Pipeline (Upload → AI checks → Variants generation → CDN)
- Search Algorithm (Elasticsearch query + Ranking score calculation)
- Anti-Fraud Detection (Fake follower detection algorithm)
- Calendar Sync Logic (Google Calendar 2-way sync)
- Performance Optimization (Redis caching, Database indexes, Materialized views)
- Security Implementation (JWT authentication, Data encryption)

**Khi nào cần đọc:**
- Khi implement user registration & profile management
- Khi xây dựng search & filtering features
- Khi tích hợp social media APIs
- Khi implement calendar sync

---

### [Agency Module Technical Specs](./plans/Agency-Module-Technical-Specs.md)
Chi tiết kỹ thuật cho module Agency Management (Phần 4.2):

**Nội dung:**
- Database Schema (5 tables: agencies, agency_members, agency_talents, agency_wallets, agency_transactions)
- API Endpoints (Agency Management, Talent Management, Booking Management, Financial Management)
- Permission System (Role definitions: Owner/Admin/Coordinator/Viewer, Permission check middleware)
- Business Logic Implementation:
  - Ghost Profile Creation (Agency tạo profile không có login)
  - Talent Joining Agency (KOL join agency, transfer permissions)
  - Agency-Talent Separation (Xử lý khi kết thúc hợp đồng)

**Khi nào cần đọc:**
- Khi implement agency registration & management
- Khi xây dựng talent roster management
- Khi implement centralized booking for agencies
- Khi xây dựng agency wallet & financial reports

---

## 🛠️ Technology Stack Chi tiết

### Backend

| Component | Technology | Version | Purpose |
|-----------|------------|---------|---------|
| **Runtime** | Node.js | 20.x LTS | JavaScript runtime |
| **Framework** | Express.js | 4.x | Web framework |
| **Language** | TypeScript | 5.x | Type-safe JavaScript |
| **ORM** | Prisma / TypeORM | Latest | Database ORM |
| **Validation** | Zod / Joi | Latest | Request validation |
| **Authentication** | Passport.js + JWT | Latest | Auth middleware |

**Alternative (Recommended):**

| Component | Technology | Version | Purpose |
|-----------|------------|---------|---------|
| **Framework** | Laravel | 11.x | Full-stack PHP framework |
| **Language** | PHP | 8.3+ | Server-side language |
| **ORM** | Eloquent | Built-in | Laravel's ORM |
| **Validation** | Form Requests | Built-in | Laravel validation |
| **Authentication** | Laravel Sanctum | Built-in | API authentication |

### Frontend

| Component | Technology | Version | Purpose |
|-----------|------------|---------|---------|
| **Framework** | React | 18.x | UI library |
| **Language** | TypeScript | 5.x | Type-safe JavaScript |
| **State Management** | Zustand / Redux Toolkit | Latest | Global state |
| **Routing** | React Router | 6.x | Client-side routing |
| **Forms** | React Hook Form | Latest | Form handling |
| **UI Components** | shadcn/ui + Tailwind CSS | Latest | Component library |
| **Data Fetching** | TanStack Query | Latest | Server state management |

**Alternative (with Laravel):**

| Component | Technology | Version | Purpose |
|-----------|------------|---------|---------|
| **Bridge** | Inertia.js | 1.x | Laravel ↔ React/Vue bridge |
| **Framework** | React / Vue | 18.x / 3.x | UI library |
| **Bundler** | Vite | 5.x | Fast build tool |
| **Styling** | Tailwind CSS | 3.x | Utility-first CSS |

### Database & Storage

| Component | Technology | Version | Purpose |
|-----------|------------|---------|---------|
| **Primary DB** | PostgreSQL | 16.x | Relational database |
| **Cache** | Redis | 7.x | In-memory cache |
| **Search** | Elasticsearch | 8.x | Full-text search |
| **File Storage** | AWS S3 | - | Object storage |
| **CDN** | CloudFront | - | Content delivery |
| **Queue** | RabbitMQ / Redis Queue | Latest | Job queue |

### DevOps & Infrastructure

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Hosting** | AWS EC2 / DigitalOcean | Virtual servers |
| **Container** | Docker | Containerization |
| **Orchestration** | Docker Compose / Kubernetes | Container orchestration |
| **CI/CD** | GitHub Actions | Automated deployment |
| **Monitoring** | Sentry + DataDog | Error tracking & APM |
| **Logging** | Winston / Pino | Application logging |

### Third-party Services

| Service | Provider | Purpose |
|---------|----------|---------|
| **Payment** | VNPay, Momo, Stripe | Payment processing |
| **SMS** | Twilio / AWS SNS | OTP & notifications |
| **Email** | SendGrid / AWS SES | Transactional emails |
| **Social Auth** | OAuth 2.0 | Google, Facebook login |
| **Social APIs** | Instagram, TikTok, Facebook | Follower sync |
| **AI/ML** | AWS Rekognition, Clarifai | Image moderation |
| **Maps** | Google Maps API | Location services |

---

## 🗄️ Database Schema Overview

### Core Tables (10 tables)

| Table | Records (Est.) | Purpose | Key Indexes |
|-------|----------------|---------|-------------|
| `users` | 10,000 | User accounts | email, phone, type |
| `profiles` | 10,000 | KOL/Model profiles | user_id, city, completion_score |
| `photos` | 100,000 | Profile photos | profile_id, category |
| `videos` | 10,000 | Profile videos | profile_id |
| `social_accounts` | 20,000 | Social media links | user_id, platform |
| `social_metrics_history` | 500,000 | Follower history | account_id, recorded_at |
| `calendar_events` | 50,000 | Availability calendar | user_id, start_time, end_time |
| `jobs` | 5,000 | Job postings | partner_id, status, deadline |
| `applications` | 50,000 | Job applications | job_id, kol_id, status |
| `bookings` | 10,000 | Confirmed bookings | partner_id, kol_id, status |

### Agency Tables (5 tables)

| Table | Records (Est.) | Purpose | Key Indexes |
|-------|----------------|---------|-------------|
| `agencies` | 500 | Agency accounts | slug, status, tier |
| `agency_members` | 2,000 | Agency staff | agency_id, user_id |
| `agency_talents` | 5,000 | Talents under agencies | agency_id, user_id, status |
| `agency_wallets` | 500 | Agency wallets | agency_id |
| `agency_transactions` | 50,000 | Transaction history | agency_id, created_at, type |

**Total:** 15 tables, ~800,000 records (Year 1 estimate)

---

## 🔌 API Endpoints Overview

### Authentication (6 endpoints)
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/otp/send
POST   /api/auth/otp/verify
POST   /api/auth/social
POST   /api/auth/logout
```

### Profile Management (6 endpoints)
```
GET    /api/profiles/:id
PUT    /api/profiles/:id
POST   /api/profiles/:id/photos
DELETE /api/profiles/:id/photos/:photo_id
POST   /api/profiles/:id/videos
GET    /api/profiles/:id/completion
```

### Social Media (4 endpoints)
```
POST   /api/social/connect
POST   /api/social/:id/sync
DELETE /api/social/:id
GET    /api/social/:id/metrics/history
```

### Search & Discovery (4 endpoints)
```
GET    /api/search/profiles
POST   /api/search/profiles/advanced
GET    /api/profiles/:id/similar
POST   /api/wishlists
```

### Job Posting (6 endpoints)
```
POST   /api/jobs
GET    /api/jobs/:id
PUT    /api/jobs/:id
DELETE /api/jobs/:id
GET    /api/jobs/:id/applications
PUT    /api/jobs/:id/applications/:app_id
```

### Calendar (6 endpoints)
```
GET    /api/calendar/events
POST   /api/calendar/events
PUT    /api/calendar/events/:id
DELETE /api/calendar/events/:id
POST   /api/calendar/sync/google
```

### Agency Management (12 endpoints)
```
POST   /api/agencies
GET    /api/agencies/:id
PUT    /api/agencies/:id
DELETE /api/agencies/:id
GET    /api/agencies/:id/talents
POST   /api/agencies/:id/talents
PUT    /api/agencies/:id/talents/:talent_id
DELETE /api/agencies/:id/talents/:talent_id
GET    /api/agencies/:id/bookings
GET    /api/agencies/:id/wallet
GET    /api/agencies/:id/transactions
POST   /api/agencies/:id/withdrawals
```

**Total:** 50+ API endpoints

---

## 🔐 Security Best Practices

### Authentication & Authorization
- ✅ JWT tokens with RS256 algorithm
- ✅ Refresh token rotation
- ✅ Rate limiting: 100 requests/minute per IP
- ✅ CORS configuration for allowed origins
- ✅ CSRF protection for state-changing operations

### Data Protection
- ✅ Encryption at rest (AES-256)
- ✅ Encryption in transit (TLS 1.3)
- ✅ PII tokenization (phone, email, ID cards)
- ✅ Database access control (IAM roles)
- ✅ Audit logging for sensitive operations

### Input Validation
- ✅ Request validation with Zod/Joi
- ✅ SQL injection prevention (parameterized queries)
- ✅ XSS prevention (Content Security Policy)
- ✅ File upload validation (type, size, content)
- ✅ NSFW image filtering (AI-powered)

---

## 🚀 Performance Optimization

### Caching Strategy
- **Profile data:** 1 hour TTL
- **Search results:** 5 minutes TTL
- **Social metrics:** 24 hours TTL
- **Static content:** 7 days TTL

### Database Optimization
- Indexes on frequently queried columns
- Materialized views for analytics
- Connection pooling (max 20 connections)
- Query optimization (EXPLAIN ANALYZE)

### CDN & Asset Optimization
- Image compression (WebP format, 80% quality)
- Lazy loading for images
- Code splitting for JavaScript
- Gzip compression for text assets

---

## 📊 Monitoring & Observability

### Metrics to Track
- **Performance:** API response time (p50, p95, p99)
- **Availability:** Uptime (target: 99.9%)
- **Errors:** Error rate (target: <1%)
- **Business:** Active users, bookings, revenue

### Tools
- **APM:** DataDog / New Relic
- **Error Tracking:** Sentry
- **Logging:** CloudWatch / ELK Stack
- **Uptime Monitoring:** StatusPage / Pingdom

---

## 🧪 Testing Strategy

### Unit Tests
- Business logic functions
- Utility functions
- Validation schemas
- **Target coverage:** 80%+

### Integration Tests
- API endpoints
- Database operations
- Third-party integrations
- **Target coverage:** 60%+

### E2E Tests
- Critical user flows
- Payment flows
- Booking flows
- **Target coverage:** Key scenarios only

---

## 📖 Tài liệu Liên quan

**Business Documentation:**
- [Luồng 1: Vận hành & Tính năng](../for-bussinees/overview/Luồng%201_%20Về%20luồng%20vận%20hành%20&%20Tính%20năng%20chính.md)
- [Luồng 2: Mô hình Kinh doanh](../for-bussinees/overview/Luồng%202_%20Mô%20hình%20kinh%20doanh%20(Monetization%20Model)%20.md)
- [Phần 4.2: Agency Module](../for-bussinees/overview/Phần%204.2_%20Tài%20khoản%20cấp%20Công%20ty%20quản%20lý%20(Agency_Manager).md)

**Technical Specifications:**
- [Core Features Technical Specs](./plans/Core-Features-Technical-Specs.md)
- [Agency Module Technical Specs](./plans/Agency-Module-Technical-Specs.md)

### Mô hình kiến trúc khuyến nghị khi dùng Laravel với TS

| Thành phần | Công nghệ khuyến nghị | Vai trò |
|---|---|---|
| Backend | PHP 8.3+ & Laravel | Xử lý Logic, Cơ sở dữ liệu, Bảo mật |
| Cầu nối | Inertia.js | Truyền dữ liệu trực tiếp, không cần viết REST API cồng kềnh |
| Frontend | React / Vue + TypeScript | Xây dựng giao diện ứng dụng Single Page App (SPA) mượt mà |
| Bundler | Vite | Biên dịch mã TypeScript cực nhanh |

**Admin Panel:** Filament

---

**Cập nhật lần cuối:** 25/05/2026  
**Maintainer:** Development Team
