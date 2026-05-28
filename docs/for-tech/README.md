# Tài liệu Kỹ thuật - Nền tảng Quản lý KOLs/Models

> Cập nhật ngày 28/05/2026: hướng triển khai hiện tại của repo là **Next.js frontend + Laravel API backend**. Backend chính nằm trong `backend/`, dùng Laravel 12, Sanctum và SQLite cho local development. Các phần mô tả Laravel + Inertia/Breeze/Filament bên dưới là tài liệu tham khảo từ hướng cũ, không phải cấu trúc đang chạy chính.

---
# TÃ i liá»‡u Ká»¹ thuáº­t - Ná»n táº£ng Quáº£n lÃ½ KOLs/Models

> **Note:** This directory contains technical specifications, database schemas, API documentation, and implementation details for developers.

## ðŸ“š Tá»•ng quan

TÃ i liá»‡u ká»¹ thuáº­t Ä‘Æ°á»£c tá»• chá»©c theo tá»«ng module chá»©c nÄƒng. Má»—i file chá»©a:
- Database schema (SQL)
- API endpoints (REST)
- Business logic implementation (code examples)
- Security & performance considerations

---

## ðŸ—ï¸ Kiáº¿n trÃºc Há»‡ thá»‘ng Khuyáº¿n nghá»‹

### MÃ´ hÃ¬nh Laravel + Inertia.js + React/Vue

| ThÃ nh pháº§n | CÃ´ng nghá»‡ khuyáº¿n nghá»‹ | Vai trÃ² |
|------------|----------------------|---------|
| **Backend** | PHP 8.3+ & Laravel | Xá»­ lÃ½ Logic, CÆ¡ sá»Ÿ dá»¯ liá»‡u, Báº£o máº­t |
| **Cáº§u ná»‘i** | Inertia.js | Truyá»n dá»¯ liá»‡u trá»±c tiáº¿p, khÃ´ng cáº§n viáº¿t REST API cá»“ng ká»nh |
| **Frontend** | React / Vue + TypeScript | XÃ¢y dá»±ng giao diá»‡n á»©ng dá»¥ng Single Page App (SPA) mÆ°á»£t mÃ  |
| **Bundler** | Vite | BiÃªn dá»‹ch mÃ£ TypeScript cá»±c nhanh |

**Lá»£i Ã­ch cá»§a stack nÃ y:**
- âœ… **Tá»‘c Ä‘á»™ phÃ¡t triá»ƒn nhanh:** Inertia.js giáº£m 50% code boilerplate
- âœ… **Type-safe:** TypeScript + Laravel typed properties
- âœ… **SEO-friendly:** Server-side rendering vá»›i Inertia SSR
- âœ… **Developer experience:** Hot reload, auto-completion, debugging tools
- âœ… **Ecosystem:** Laravel packages + React/Vue components

---

## ðŸ“ Cáº¥u trÃºc TÃ i liá»‡u

### [Core Features Technical Specs](./plans/Core-Features-Technical-Specs.md)
Chi tiáº¿t ká»¹ thuáº­t cho cÃ¡c tÃ­nh nÄƒng cá»‘t lÃµi (Luá»“ng 1):

**Ná»™i dung:**
- Technology Stack (React, Node.js, PostgreSQL, Redis, S3, Elasticsearch)
- Database Schema (10 tables: users, profiles, photos, videos, social_accounts, calendar_events, jobs, applications, bookings)
- API Endpoints (Authentication, Profile Management, Social Media Integration, Search, Job Posting, Calendar)
- Image Processing Pipeline (Upload â†’ AI checks â†’ Variants generation â†’ CDN)
- Search Algorithm (Elasticsearch query + Ranking score calculation)
- Anti-Fraud Detection (Fake follower detection algorithm)
- Calendar Sync Logic (Google Calendar 2-way sync)
- Performance Optimization (Redis caching, Database indexes, Materialized views)
- Security Implementation (JWT authentication, Data encryption)

**Khi nÃ o cáº§n Ä‘á»c:**
- Khi implement user registration & profile management
- Khi xÃ¢y dá»±ng search & filtering features
- Khi tÃ­ch há»£p social media APIs
- Khi implement calendar sync

---

### [Agency Module Technical Specs](./plans/Agency-Module-Technical-Specs.md)
Chi tiáº¿t ká»¹ thuáº­t cho module Agency Management (Pháº§n 4.2):

**Ná»™i dung:**
- Database Schema (5 tables: agencies, agency_members, agency_talents, agency_wallets, agency_transactions)
- API Endpoints (Agency Management, Talent Management, Booking Management, Financial Management)
- Permission System (Role definitions: Owner/Admin/Coordinator/Viewer, Permission check middleware)
- Business Logic Implementation:
  - Ghost Profile Creation (Agency táº¡o profile khÃ´ng cÃ³ login)
  - Talent Joining Agency (KOL join agency, transfer permissions)
  - Agency-Talent Separation (Xá»­ lÃ½ khi káº¿t thÃºc há»£p Ä‘á»“ng)

**Khi nÃ o cáº§n Ä‘á»c:**
- Khi implement agency registration & management
- Khi xÃ¢y dá»±ng talent roster management
- Khi implement centralized booking for agencies
- Khi xÃ¢y dá»±ng agency wallet & financial reports

---

## ðŸ› ï¸ Technology Stack Chi tiáº¿t

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
| **Bridge** | Inertia.js | 1.x | Laravel â†” React/Vue bridge |
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

## ðŸ—„ï¸ Database Schema Overview

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

## ðŸ”Œ API Endpoints Overview

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

## ðŸ” Security Best Practices

### Authentication & Authorization
- âœ… JWT tokens with RS256 algorithm
- âœ… Refresh token rotation
- âœ… Rate limiting: 100 requests/minute per IP
- âœ… CORS configuration for allowed origins
- âœ… CSRF protection for state-changing operations

### Data Protection
- âœ… Encryption at rest (AES-256)
- âœ… Encryption in transit (TLS 1.3)
- âœ… PII tokenization (phone, email, ID cards)
- âœ… Database access control (IAM roles)
- âœ… Audit logging for sensitive operations

### Input Validation
- âœ… Request validation with Zod/Joi
- âœ… SQL injection prevention (parameterized queries)
- âœ… XSS prevention (Content Security Policy)
- âœ… File upload validation (type, size, content)
- âœ… NSFW image filtering (AI-powered)

---

## ðŸš€ Performance Optimization

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

## ðŸ“Š Monitoring & Observability

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

## ðŸ§ª Testing Strategy

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

## ðŸ“– TÃ i liá»‡u LiÃªn quan

**Business Documentation:**
- [Luá»“ng 1: Váº­n hÃ nh & TÃ­nh nÄƒng](../for-bussinees/overview/Luá»“ng%201_%20Vá»%20luá»“ng%20váº­n%20hÃ nh%20&%20TÃ­nh%20nÄƒng%20chÃ­nh.md)
- [Luá»“ng 2: MÃ´ hÃ¬nh Kinh doanh](../for-bussinees/overview/Luá»“ng%202_%20MÃ´%20hÃ¬nh%20kinh%20doanh%20(Monetization%20Model)%20.md)
- [Pháº§n 4.2: Agency Module](../for-bussinees/overview/Pháº§n%204.2_%20TÃ i%20khoáº£n%20cáº¥p%20CÃ´ng%20ty%20quáº£n%20lÃ½%20(Agency_Manager).md)

**Technical Specifications:**
- [Core Features Technical Specs](./plans/Core-Features-Technical-Specs.md)
- [Agency Module Technical Specs](./plans/Agency-Module-Technical-Specs.md)

### MÃ´ hÃ¬nh kiáº¿n trÃºc khuyáº¿n nghá»‹ khi dÃ¹ng Laravel vá»›i TS

| ThÃ nh pháº§n | CÃ´ng nghá»‡ khuyáº¿n nghá»‹ | Vai trÃ² |
|---|---|---|
| Backend | PHP 8.3+ & Laravel | Xá»­ lÃ½ Logic, CÆ¡ sá»Ÿ dá»¯ liá»‡u, Báº£o máº­t |
| Cáº§u ná»‘i | Inertia.js | Truyá»n dá»¯ liá»‡u trá»±c tiáº¿p, khÃ´ng cáº§n viáº¿t REST API cá»“ng ká»nh |
| Frontend | React / Vue + TypeScript | XÃ¢y dá»±ng giao diá»‡n á»©ng dá»¥ng Single Page App (SPA) mÆ°á»£t mÃ  |
| Bundler | Vite | BiÃªn dá»‹ch mÃ£ TypeScript cá»±c nhanh |

**Admin Panel:** Filament

---

**Cáº­p nháº­t láº§n cuá»‘i:** 25/05/2026  
**Maintainer:** Development Team
