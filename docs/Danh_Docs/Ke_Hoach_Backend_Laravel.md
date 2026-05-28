# Káº¿ Hoáº¡ch Triá»ƒn Khai Backend Laravel

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** XÃ¢y dá»±ng backend Laravel cho ná»n táº£ng quáº£n lÃ½ KOLs/Models theo cÃ¡c tÃ i liá»‡u ká»¹ thuáº­t trong `docs/for-tech/plans`, Æ°u tiÃªn pháº§n lÃµi, Agency, booking, tÃ i chÃ­nh, admin vÃ  kiá»ƒm thá»­.

**Architecture:** DÃ¹ng app Laravel hiá»‡n cÃ³ trong thÆ° má»¥c `backend` lÃ m backend chÃ­nh. Backend nÃªn Ä‘i theo hÆ°á»›ng Laravel 12 + Eloquent + Form Request + Policy/Gate + Sanctum + Filament, khÃ´ng triá»ƒn khai láº¡i theo Node/Express trong spec cÅ©. Frontend Next.js/Inertia cÃ³ thá»ƒ Ä‘Æ°á»£c ngÆ°á»i khÃ¡c chá»‰nh sau, nÃªn pháº§n backend cáº§n cÃ³ API/route rÃµ rÃ ng, dá»¯ liá»‡u á»•n Ä‘á»‹nh vÃ  test Ä‘Æ°á»£c Ä‘á»™c láº­p.

**Tech Stack:** PHP 8.2+, Laravel 12, Composer, XAMPP/MySQL hoáº·c SQLite local, Laravel Sanctum, Laravel Breeze, Filament 3, PHPUnit, Eloquent ORM.

---

## 1. TÃ³m táº¯t hiá»‡n tráº¡ng project

Project hiá»‡n cÃ³ hai pháº§n:

- Root project lÃ  frontend Next.js/TypeScript vá»›i cÃ¡c trang `app/talent`, `app/brand`, component UI vÃ  tÃ i liá»‡u sáº£n pháº©m.
- ThÆ° má»¥c `backend` lÃ  Laravel 12 Ä‘Ã£ cÃ i Breeze, Sanctum, Filament, Inertia, React, Tailwind vÃ  Vite.

Trong Laravel backend Ä‘Ã£ cÃ³:

- Auth cÆ¡ báº£n cá»§a Breeze.
- Filament Admin Panel á»Ÿ `/admin`.
- API survey qua `backend/routes/api.php`.
- Module Talent Tiering Survey Ä‘Ã£ cÃ³ migration, model, service vÃ  controller:
  - `survey_responses`
  - `talent_scores`
  - `pageant_recommendations`
  - cá»™t `tier`, `tier_updated_at` trÃªn báº£ng `users`
  - `SurveyController`
  - `TalentScoringService`
  - `PageantRecommendationService`

Äiá»ƒm cáº§n lÆ°u Ã½: tÃ i liá»‡u `Core-Features-Technical-Specs.md` ban Ä‘áº§u mÃ´ táº£ Node.js + Express + PostgreSQL, nhÆ°ng tÃ i liá»‡u README ká»¹ thuáº­t vÃ  repo thá»±c táº¿ Ä‘Ã£ chuyá»ƒn hÆ°á»›ng sang Laravel. Khi lÃ m backend, nÃªn dá»‹ch cÃ¡c schema/API trong spec sang Laravel, khÃ´ng quay láº¡i Node.js.

## 2. TÃ i liá»‡u Ä‘Ã£ Ä‘á»c vÃ  nguá»“n yÃªu cáº§u chÃ­nh

CÃ¡c tÃ i liá»‡u ká»¹ thuáº­t quan trá»ng:

- `docs/for-tech/plans/Core-Features-Technical-Specs.md`
- `docs/for-tech/plans/Agency-Module-Technical-Specs.md`
- `docs/for-tech/plans/Talent-Tiering-Survey-System-Technical-Specs.md`
- `docs/for-tech/README.md`

CÃ¡c tÃ i liá»‡u nghiá»‡p vá»¥ trong `docs/for-bussinees` chá»‰ dÃ¹ng Ä‘á»ƒ tham kháº£o bá»‘i cáº£nh sáº£n pháº©m, khÃ´ng pháº£i nguá»“n chá»‘t ká»¹ thuáº­t cho backend:

- `docs/for-bussinees/overview/Luá»“ng 1_ Vá» luá»“ng váº­n hÃ nh & TÃ­nh nÄƒng chÃ­nh.md`
- `docs/for-bussinees/overview/Luá»“ng 2_ MÃ´ hÃ¬nh kinh doanh (Monetization Model) .md`
- `docs/for-bussinees/overview/Luá»“ng 3_ Quáº£n trá»‹ Admin.md`
- `docs/for-bussinees/overview/Pháº§n 4_ MÃ´ hÃ¬nh Quáº£n lÃ½ linh hoáº¡t (Hybrid Management)..md`
- `docs/for-bussinees/overview/Pháº§n 4.2_ TÃ i khoáº£n cáº¥p CÃ´ng ty quáº£n lÃ½ (Agency_Manager).md`
- `docs/for-bussinees/overview/Chi-tiet-ky-thuat-va-van-hanh.md`

Quyáº¿t Ä‘á»‹nh ká»¹ thuáº­t Ä‘Ã£ chá»‘t: backend triá»ƒn khai báº±ng Laravel trong thÆ° má»¥c `backend`. KhÃ´ng triá»ƒn khai backend Node/Express cho giai Ä‘oáº¡n nÃ y.

## 3. NguyÃªn táº¯c lÃ m backend

- Æ¯u tiÃªn Laravel native: migration, model, relationship, Form Request, policy, service class, job/queue, event/listener.
- KhÃ´ng nhá»“i logic nghiá»‡p vá»¥ vÃ o controller. Controller chá»‰ nháº­n request, gá»i service, tráº£ response.
- Má»—i migration cáº§n cÃ³ index Ä‘Ãºng vá»›i query trong spec.
- CÃ¡c báº£ng tiá»n, vÃ­, giao dá»‹ch, escrow pháº£i dÃ¹ng `decimal`, transaction database vÃ  audit log.
- Má»i endpoint quan trá»ng cáº§n test feature. Má»i service tÃ­nh toÃ¡n tiá»n/Ä‘iá»ƒm/ranking cáº§n test unit.
- Má»i quyá»n agency/admin/brand/talent pháº£i kiá»ƒm tra báº±ng policy hoáº·c middleware, khÃ´ng kiá»ƒm tra ráº£i rÃ¡c trong controller.
- TÃ i liá»‡u tá»« giá» viáº¿t báº±ng tiáº¿ng Viá»‡t cÃ³ dáº¥u.

## 4. Thá»© tá»± Æ°u tiÃªn nÃªn lÃ m

### Giai Ä‘oáº¡n 0: Chuáº©n hÃ³a mÃ´i trÆ°á»ng local

- [ ] Kiá»ƒm tra PHP, Composer, MySQL trong XAMPP.
- [ ] VÃ o thÆ° má»¥c `backend`.
- [ ] Táº¡o/cáº­p nháº­t `.env`.
- [ ] Chá»n database local:
  - Náº¿u muá»‘n Ä‘Æ¡n giáº£n: SQLite.
  - Náº¿u bÃ¡m gáº§n production hÆ¡n: MySQL tá»« XAMPP.
- [ ] Cháº¡y migration vÃ  test hiá»‡n cÃ³.

Lá»‡nh dá»± kiáº¿n:

```bash
cd backend
composer install
copy .env.example .env
php artisan key:generate
php artisan migrate
php artisan test
```

Hiện tại local development dùng SQLite, không cần bật XAMPP hoặc cấu hình MySQL trong `.env`:

```env
DB_CONNECTION=sqlite
```

### Giai Ä‘oáº¡n 1: Sá»­a ná»n dá»¯ liá»‡u ngÆ°á»i dÃ¹ng vÃ  phÃ¢n vai

Hiá»‡n báº£ng `users` cá»§a Breeze cÃ²n quÃ¡ Ä‘Æ¡n giáº£n, trong khi spec yÃªu cáº§u cÃ¡c loáº¡i user: talent/KOL, brand/partner, agency, admin.

Viá»‡c cáº§n lÃ m:

- [ ] ThÃªm cÃ¡c cá»™t ná»n cho `users`: `phone`, `type`, `status`, `is_verified`, `is_ghost`, `last_login_at`.
- [ ] Cáº­p nháº­t `User` model: fillable, casts, relationship.
- [ ] Chuáº©n hÃ³a enum báº±ng class hoáº·c config:
  - user type: `talent`, `brand`, `agency`, `admin`
  - user status: `pending`, `active`, `suspended`, `banned`
- [ ] Viáº¿t migration riÃªng, khÃ´ng sá»­a migration cÅ© náº¿u database Ä‘Ã£ cÃ³ thá»ƒ Ä‘ang dÃ¹ng.
- [ ] Viáº¿t test cho Ä‘Äƒng kÃ½/login vÃ  phÃ¢n loáº¡i user.

Káº¿t quáº£ mong muá»‘n:

- Backend phÃ¢n biá»‡t Ä‘Æ°á»£c ngÆ°á»i dÃ¹ng cÃ¡ nhÃ¢n, brand, agency vÃ  admin.
- CÃ³ ná»n Ä‘á»ƒ policy/middleware kiá»ƒm tra quyá»n vá» sau.

### Giai Ä‘oáº¡n 2: HoÃ n thiá»‡n Talent Profile core

Spec core yÃªu cáº§u há»“ sÆ¡ talent cÃ³ thÃ´ng tin nhÃ¢n tráº¯c, portfolio, social, lá»‹ch ráº£nh vÃ  completion score.

Táº¡o cÃ¡c model/migration chÃ­nh:

- [ ] `Profile`
- [ ] `Photo`
- [ ] `Video`
- [ ] `SocialAccount`
- [ ] `SocialMetricHistory`
- [ ] `CalendarEvent`

API nÃªn cÃ³:

- [ ] `GET /api/profiles/{profile}`
- [ ] `PUT /api/profiles/{profile}`
- [ ] `POST /api/profiles/{profile}/photos`
- [ ] `DELETE /api/profiles/{profile}/photos/{photo}`
- [ ] `POST /api/profiles/{profile}/videos`
- [ ] `GET /api/profiles/{profile}/completion`

Service nÃªn cÃ³:

- [ ] `ProfileCompletionService`: tÃ­nh % hoÃ n thiá»‡n há»“ sÆ¡.
- [ ] `MediaUploadService`: validate file, lÆ°u local trÆ°á»›c; S3 Ä‘á»ƒ phase sau.
- [ ] `CalendarService`: quáº£n lÃ½ lá»‹ch ráº£nh/báº­n.

Test cáº§n cÃ³:

- [ ] Talent chá»‰ sá»­a Ä‘Æ°á»£c profile cá»§a mÃ¬nh.
- [ ] Agency chá»‰ sá»­a Ä‘Æ°á»£c profile talent thuá»™c roster cá»§a agency.
- [ ] Brand chá»‰ xem Ä‘Æ°á»£c pháº§n public.
- [ ] Upload áº£nh sai Ä‘á»‹nh dáº¡ng bá»‹ cháº·n.

### Giai Ä‘oáº¡n 3: RÃ  soÃ¡t vÃ  nÃ¢ng cáº¥p Talent Tiering Survey hiá»‡n cÃ³

Module survey Ä‘Ã£ cÃ³ nhÆ°ng cáº§n lÃ m cháº¯c hÆ¡n trÆ°á»›c khi ná»‘i vÃ o cÃ¡c luá»“ng khÃ¡c.

Viá»‡c cáº§n lÃ m:

- [ ] Kiá»ƒm tra `TalentScoringService` vá»›i 30 cÃ¢u há»i tháº­t trong `Plan-intop-models.md`.
- [ ] Äá»“ng bá»™ mÃ£ cÃ¢u há»i vá»›i tÃ i liá»‡u nghiá»‡p vá»¥. Hiá»‡n service dÃ¹ng A1-D6, trong tÃ i liá»‡u business cÃ³ 30 cÃ¢u Ä‘Ã¡nh sá»‘ 1-30 vÃ  nhÃ³m A/B/C Ä‘á»‹nh hÆ°á»›ng.
- [ ] Quyáº¿t Ä‘á»‹nh output chÃ­nh:
  - Tier S/A/B/C cho marketplace.
  - NhÃ³m Ä‘á»‹nh hÆ°á»›ng Hoa háº­u/Runway/KOL náº¿u váº«n cáº§n theo tÃ i liá»‡u 30 cÃ¢u há»i.
- [ ] Bá»• sung test unit cho hard rules:
  - chiá»u cao tháº¥p,
  - khÃ´ng cÃ³ social,
  - khÃ´ng cÃ³ kinh nghiá»‡m,
  - Ä‘iá»ƒm tá»•ng tÆ°Æ¡ng á»©ng S/A/B/C.
- [ ] Sá»­a `User` model Ä‘á»ƒ cast/fillable cÃ³ `tier`, `tier_updated_at`.
- [ ] CÃ¢n nháº¯c chuyá»ƒn tier sang `profiles` náº¿u profile lÃ  thá»±c thá»ƒ chÃ­nh cá»§a talent.

Káº¿t quáº£ mong muá»‘n:

- Thuáº­t toÃ¡n tiering cÃ³ test, cháº¡y á»•n vÃ  cÃ³ thá»ƒ dÃ¹ng cho search/matching.
- KhÃ´ng cÃ²n phá»¥ thuá»™c vÃ o dá»¯ liá»‡u giáº£ hoáº·c mapping mÆ¡ há»“.

### Giai Ä‘oáº¡n 4: Search, Discovery vÃ  Wishlist

ÄÃ¢y lÃ  pháº§n brand cáº§n Ä‘á»ƒ tÃ¬m talent. MVP nÃªn dÃ¹ng SQL/Eloquent trÆ°á»›c, chÆ°a cáº§n Elasticsearch ngay.

Táº¡o model/migration:

- [ ] `Wishlist`
- [ ] `WishlistItem`

API nÃªn cÃ³:

- [ ] `GET /api/search/profiles`
- [ ] `POST /api/search/profiles/advanced`
- [ ] `GET /api/profiles/{profile}/similar`
- [ ] `POST /api/wishlists`
- [ ] `GET /api/wishlists`

Logic cáº§n cÃ³:

- [ ] Filter theo thÃ nh phá»‘, giá»›i tÃ­nh, chiá»u cao, tier, ká»¹ nÄƒng, follower tá»‘i thiá»ƒu, tráº¡ng thÃ¡i verified.
- [ ] Sort theo Ä‘iá»ƒm phÃ¹ há»£p, Ä‘á»™ hoÃ n thiá»‡n profile, tier, thá»i gian cáº­p nháº­t.
- [ ] KhÃ´ng tráº£ thÃ´ng tin nháº¡y cáº£m nhÆ° sá»‘ Ä‘iá»‡n thoáº¡i náº¿u brand chÆ°a Ä‘Æ°á»£c phÃ©p xem.

Test cáº§n cÃ³:

- [ ] Search tráº£ Ä‘Ãºng filter.
- [ ] Brand khÃ´ng tháº¥y dá»¯ liá»‡u private.
- [ ] Wishlist khÃ´ng cho lÆ°u trÃ¹ng profile.

### Giai Ä‘oáº¡n 5: Job, Application vÃ  Booking

ÄÃ¢y lÃ  lÃµi marketplace giá»¯a brand vÃ  talent/agency.

Táº¡o model/migration:

- [ ] `Job`
- [ ] `Application`
- [ ] `Booking`
- [ ] `BookingTimeline`

API nÃªn cÃ³:

- [ ] `POST /api/jobs`
- [ ] `GET /api/jobs/{job}`
- [ ] `PUT /api/jobs/{job}`
- [ ] `DELETE /api/jobs/{job}`
- [ ] `GET /api/jobs/{job}/applications`
- [ ] `POST /api/jobs/{job}/applications`
- [ ] `PUT /api/jobs/{job}/applications/{application}`
- [ ] `POST /api/bookings`
- [ ] `PUT /api/bookings/{booking}/status`

Logic cáº§n cÃ³:

- [ ] Brand táº¡o job.
- [ ] Talent á»©ng tuyá»ƒn job.
- [ ] Agency á»©ng tuyá»ƒn báº±ng nhiá»u talent thuá»™c roster.
- [ ] Brand duyá»‡t application thÃ nh booking.
- [ ] Booking kiá»ƒm tra lá»‹ch trÃ¹ng.
- [ ] Má»i thay Ä‘á»•i tráº¡ng thÃ¡i booking ghi vÃ o timeline.

Test cáº§n cÃ³:

- [ ] Brand chá»‰ sá»­a job cá»§a mÃ¬nh.
- [ ] Talent khÃ´ng á»©ng tuyá»ƒn trÃ¹ng.
- [ ] KhÃ´ng táº¡o booking náº¿u lá»‹ch bá»‹ trÃ¹ng.
- [ ] Agency khÃ´ng Ä‘Æ°á»£c submit talent khÃ´ng thuá»™c agency.

### Giai Ä‘oáº¡n 6: Agency Management

ÄÃ¢y lÃ  pháº§n user Ä‘ang Ä‘Æ°á»£c yÃªu cáº§u lÃ m nhiá»u kháº£ nÄƒng nháº¥t vÃ¬ file Ä‘ang má»Ÿ lÃ  `Agency-Module-Technical-Specs.md`.

Táº¡o model/migration:

- [ ] `Agency`
- [ ] `AgencyMember`
- [ ] `AgencyTalent`
- [ ] `AgencyWallet`
- [ ] `AgencyTransaction`
- [ ] `ProfilePermission` hoáº·c cÆ¡ cháº¿ tÆ°Æ¡ng Ä‘Æ°Æ¡ng Ä‘á»ƒ quáº£n lÃ½ quyá»n profile.

API nÃªn cÃ³:

- [ ] `POST /api/agencies`
- [ ] `GET /api/agencies/{agency}`
- [ ] `PUT /api/agencies/{agency}`
- [ ] `DELETE /api/agencies/{agency}`
- [ ] `GET /api/agencies/{agency}/talents`
- [ ] `POST /api/agencies/{agency}/talents`
- [ ] `PUT /api/agencies/{agency}/talents/{agencyTalent}`
- [ ] `DELETE /api/agencies/{agency}/talents/{agencyTalent}`
- [ ] `POST /api/agencies/{agency}/talents/import`
- [ ] `POST /api/agencies/{agency}/talents/{talent}/separate`

Quyá»n agency:

- owner: toÃ n quyá»n.
- admin: quáº£n lÃ½ talent/booking, xem tÃ i chÃ­nh.
- coordinator: quáº£n lÃ½ booking, xem/sá»­a giá»›i háº¡n talent.
- viewer: chá»‰ xem.

Service cáº§n cÃ³:

- [ ] `AgencyPermissionService`
- [ ] `AgencyTalentService`
- [ ] `GhostProfileService`
- [ ] `AgencySeparationService`
- [ ] `CsvTalentImportService`

Luá»“ng báº¯t buá»™c:

- [ ] Agency táº¡o ghost profile.
- [ ] Talent Ä‘á»™c láº­p xin gia nháº­p agency.
- [ ] Agency cháº¥p nháº­n/tá»« chá»‘i.
- [ ] Khi talent vÃ o agency, profile bá»‹ chuyá»ƒn quyá»n quáº£n lÃ½ theo policy.
- [ ] Khi tÃ¡ch khá»i agency, kiá»ƒm tra booking Ä‘ang cháº¡y, lÆ°u settlement, tráº£ quyá»n profile.

Test cáº§n cÃ³:

- [ ] Owner thÃªm/sá»­a/xÃ³a talent.
- [ ] Viewer khÃ´ng sá»­a Ä‘Æ°á»£c talent.
- [ ] Ghost profile táº¡o user `is_ghost = true`.
- [ ] Talent khÃ´ng thá»ƒ thuá»™c hai agency active náº¿u Ä‘ang dÃ¹ng mÃ´ hÃ¬nh Ä‘á»™c quyá»n.
- [ ] Separation khÃ´ng lÃ m máº¥t booking history.

### Giai Ä‘oáº¡n 7: Wallet, Transaction, Payment vÃ  Escrow

TÃ i liá»‡u business cÃ³ nhiá»u mÃ´ hÃ¬nh tiá»n: subscription, pay-per-lead, boost, verified, commission, escrow. MVP nÃªn lÃ m ledger trÆ°á»›c, tÃ­ch há»£p cá»•ng thanh toÃ¡n sau.

Táº¡o model/migration:

- [ ] `Wallet`
- [ ] `Transaction`
- [ ] `EscrowAccount`
- [ ] `Withdrawal`
- [ ] `PaymentMethod`
- [ ] `SubscriptionPlan`
- [ ] `Subscription`
- [ ] `Invoice`

Service cáº§n cÃ³:

- [ ] `WalletService`
- [ ] `LedgerService`
- [ ] `EscrowService`
- [ ] `CommissionService`
- [ ] `WithdrawalService`

NguyÃªn táº¯c báº¯t buá»™c:

- [ ] Má»i thay Ä‘á»•i sá»‘ dÆ° cháº¡y trong `DB::transaction`.
- [ ] KhÃ´ng sá»­a sá»‘ dÆ° trá»±c tiáº¿p trong controller.
- [ ] Má»—i giao dá»‹ch tiá»n pháº£i cÃ³ `reference_type`, `reference_id`, `description`, `balance_after`.
- [ ] KhÃ´ng xÃ³a transaction.
- [ ] Escrow cÃ³ tráº¡ng thÃ¡i: `locked`, `released`, `refunded`, `disputed`.

Test cáº§n cÃ³:

- [ ] Náº¡p tiá»n táº¡o transaction credit.
- [ ] Lock escrow trá»« available balance, tÄƒng escrow balance.
- [ ] Release escrow chia tiá»n Ä‘Ãºng theo commission.
- [ ] Refund tráº£ tiá»n Ä‘Ãºng.
- [ ] KhÃ´ng thá»ƒ rÃºt quÃ¡ sá»‘ dÆ°.

### Giai Ä‘oáº¡n 8: Admin vÃ  Filament

Repo Ä‘Ã£ cÃ³ Filament nÃªn dÃ¹ng Filament Ä‘á»ƒ lÃ m admin trÆ°á»›c, khÃ´ng cáº§n tá»± viáº¿t dashboard tá»« Ä‘áº§u.

Resource cáº§n táº¡o:

- [ ] UserResource
- [ ] ProfileResource
- [ ] AgencyResource
- [ ] JobResource
- [ ] BookingResource
- [ ] TransactionResource
- [ ] WithdrawalResource
- [ ] KycSubmissionResource
- [ ] ContentModerationResource
- [ ] DisputeResource

Admin workflow cáº§n cÃ³:

- [ ] Duyá»‡t KYC.
- [ ] Duyá»‡t agency.
- [ ] Duyá»‡t job nháº¡y cáº£m.
- [ ] Xem transaction/wallet.
- [ ] Duyá»‡t withdrawal.
- [ ] Xá»­ lÃ½ dispute.
- [ ] KhÃ³a/má»Ÿ khÃ³a user.

Test cáº§n cÃ³:

- [ ] User thÆ°á»ng khÃ´ng vÃ o Ä‘Æ°á»£c admin.
- [ ] Admin vÃ o Ä‘Æ°á»£c Filament.
- [ ] Action duyá»‡t/rÃºt tiá»n táº¡o audit log.

### Giai Ä‘oáº¡n 9: KYC, kiá»ƒm duyá»‡t ná»™i dung vÃ  audit log

Táº¡o model/migration:

- [ ] `KycSubmission`
- [ ] `ModerationItem`
- [ ] `Report`
- [ ] `AuditLog`

Service cáº§n cÃ³:

- [ ] `KycService`
- [ ] `ModerationService`
- [ ] `AuditLogService`

MVP nÃªn lÃ m manual trÆ°á»›c:

- [ ] User upload CCCD/selfie.
- [ ] Admin approve/reject.
- [ ] Profile/job/photo cÃ³ tráº¡ng thÃ¡i pending/approved/rejected.
- [ ] LÃ½ do reject lÆ°u rÃµ Ä‘á»ƒ frontend hiá»ƒn thá»‹.

AI moderation, OCR, face matching Ä‘á»ƒ phase sau.

### Giai Ä‘oáº¡n 10: Notifications, queue vÃ  background jobs

Táº¡o cÃ¡c notification/event:

- [ ] Talent Ä‘Æ°á»£c má»i booking.
- [ ] Application Ä‘Æ°á»£c duyá»‡t/tá»« chá»‘i.
- [ ] Agency nháº­n yÃªu cáº§u gia nháº­p.
- [ ] Booking Ä‘á»•i tráº¡ng thÃ¡i.
- [ ] Escrow Ä‘Æ°á»£c release/refund.
- [ ] KYC Ä‘Æ°á»£c approve/reject.

Ká»¹ thuáº­t:

- [ ] DÃ¹ng Laravel Notifications.
- [ ] DÃ¹ng queue cho email, import CSV, xá»­ lÃ½ áº£nh/video.
- [ ] Vá»›i XAMPP local, cÃ³ thá»ƒ cháº¡y queue báº±ng `php artisan queue:work`.

## 5. Cáº¥u trÃºc file Laravel nÃªn hÆ°á»›ng tá»›i

```text
backend/
  app/
    Http/
      Controllers/
        Api/
          ProfileController.php
          SearchController.php
          JobController.php
          BookingController.php
          AgencyController.php
          AgencyTalentController.php
          WalletController.php
      Requests/
        Profile/
        Agency/
        Booking/
        Wallet/
      Resources/
        ProfileResource.php
        AgencyResource.php
        BookingResource.php
    Models/
      Profile.php
      Photo.php
      Video.php
      SocialAccount.php
      CalendarEvent.php
      Job.php
      Application.php
      Booking.php
      Agency.php
      AgencyMember.php
      AgencyTalent.php
      Wallet.php
      Transaction.php
      EscrowAccount.php
    Policies/
      ProfilePolicy.php
      AgencyPolicy.php
      JobPolicy.php
      BookingPolicy.php
      WalletPolicy.php
    Services/
      ProfileCompletionService.php
      TalentScoringService.php
      SearchService.php
      BookingService.php
      AgencyTalentService.php
      AgencyPermissionService.php
      WalletService.php
      EscrowService.php
      CommissionService.php
      AuditLogService.php
  database/
    migrations/
    seeders/
  tests/
    Feature/
    Unit/
```

## 6. Checklist kiá»ƒm thá»­ trÆ°á»›c má»—i láº§n bÃ n giao

- [ ] `php artisan migrate:fresh --seed` cháº¡y sáº¡ch trÃªn database local.
- [ ] `php artisan test` pass.
- [ ] CÃ¡c API chÃ­nh Ä‘Æ°á»£c test báº±ng Feature Test.
- [ ] CÃ¡c service tÃ­nh Ä‘iá»ƒm, tiá»n, quyá»n Ä‘Æ°á»£c test báº±ng Unit Test.
- [ ] KhÃ´ng cÃ³ controller chá»©a logic tiá»n hoáº·c logic quyá»n phá»©c táº¡p.
- [ ] KhÃ´ng tráº£ dá»¯ liá»‡u nháº¡y cáº£m ra API náº¿u khÃ´ng cÃ³ quyá»n.
- [ ] Migration cÃ³ rollback Ä‘Æ°á»£c.
- [ ] CÃ¡c enum/status Ä‘Æ°á»£c thá»‘ng nháº¥t trong toÃ n backend.

## 7. Lá»™ trÃ¬nh lÃ m viá»‡c Ä‘á» xuáº¥t cho cÃ¡ nhÃ¢n backend

### Tuáº§n 1: Ná»n táº£ng

- [ ] Cháº¡y Ä‘Æ°á»£c backend local báº±ng XAMPP/Composer.
- [ ] Cháº¡y Ä‘Æ°á»£c test hiá»‡n cÃ³.
- [ ] Chuáº©n hÃ³a `users` vÃ  phÃ¢n vai.
- [ ] HoÃ n thiá»‡n profile core migration/model cÆ¡ báº£n.
- [ ] Viáº¿t test auth/profile/role.

### Tuáº§n 2: Talent profile vÃ  survey

- [ ] LÃ m profile CRUD API.
- [ ] LÃ m photo/video upload local.
- [ ] RÃ  láº¡i survey scoring.
- [ ] Viáº¿t test cho survey scoring.
- [ ] LÃ m profile completion.

### Tuáº§n 3: Search, job vÃ  booking

- [ ] LÃ m search profile báº±ng SQL.
- [ ] LÃ m job/application.
- [ ] LÃ m booking vÃ  booking timeline.
- [ ] Cháº·n booking trÃ¹ng lá»‹ch.
- [ ] Viáº¿t test job/booking.

### Tuáº§n 4: Agency MVP

- [ ] LÃ m agency CRUD.
- [ ] LÃ m agency member/role/permission.
- [ ] LÃ m agency talent roster.
- [ ] LÃ m ghost profile.
- [ ] LÃ m talent join/separate agency.
- [ ] Viáº¿t test agency permission.

### Tuáº§n 5: Wallet vÃ  admin

- [ ] LÃ m wallet/transaction ledger.
- [ ] LÃ m escrow lock/release/refund cÆ¡ báº£n.
- [ ] LÃ m Filament resource cho user/profile/agency/job/booking/transaction.
- [ ] Viáº¿t test wallet/escrow.

### Tuáº§n 6: HoÃ n thiá»‡n MVP backend

- [ ] LÃ m KYC manual.
- [ ] LÃ m moderation manual.
- [ ] LÃ m audit log.
- [ ] LÃ m notification cÆ¡ báº£n.
- [ ] Cháº¡y toÃ n bá»™ test.
- [ ] Viáº¿t tÃ i liá»‡u API ngáº¯n cho frontend.

## 8. Viá»‡c chÆ°a nÃªn lÃ m ngay

- ChÆ°a cáº§n Elasticsearch á»Ÿ MVP; dÃ¹ng SQL trÆ°á»›c.
- ChÆ°a cáº§n AWS S3/CDN ngay; dÃ¹ng local storage trÆ°á»›c rá»“i trá»«u tÆ°á»£ng hÃ³a service Ä‘á»ƒ Ä‘á»•i sau.
- ChÆ°a cáº§n AI moderation/OCR/face matching ngay; lÃ m manual workflow trÆ°á»›c.
- ChÆ°a cáº§n VNPay/Momo tháº­t ngay; lÃ m ledger vÃ  payment abstraction trÆ°á»›c.
- ChÆ°a cáº§n microservices; Laravel monolith modular lÃ  Ä‘á»§ cho giai Ä‘oáº¡n Ä‘áº§u.
- ChÆ°a cáº§n mobile app backend riÃªng; API hiá»‡n táº¡i nÃªn Ä‘á»§ cho web/mobile dÃ¹ng chung.

## 9. Rá»§i ro cáº§n bÃ¡o sá»›m

- Spec ká»¹ thuáº­t Ä‘ang cÃ³ chá»— khÃ´ng Ä‘á»“ng nháº¥t: tÃ i liá»‡u core nÃ³i Node/Express, repo dÃ¹ng Laravel.
- CÃ³ hai frontend: Next.js á»Ÿ root vÃ  Inertia React trong `backend`. Cáº§n thá»‘ng nháº¥t frontend nÃ o sáº½ gá»i backend chÃ­nh.
- Survey hiá»‡n cÃ³ chÆ°a cháº¯c khá»›p 100% vá»›i báº£ng 30 cÃ¢u há»i trong tÃ i liá»‡u business.
- CÃ¡c tÃ i liá»‡u tÃ i chÃ­nh/escrow cÃ³ nhiá»u mÃ´ hÃ¬nh tÃ­nh phÃ­; cáº§n chá»‘t MVP dÃ¹ng mÃ´ hÃ¬nh nÃ o trÆ°á»›c khi code payment tháº­t.
- Dá»¯ liá»‡u tiá»n vÃ  quyá»n agency náº¿u lÃ m sai sáº½ khÃ³ sá»­a, nÃªn pháº£i cÃ³ test trÆ°á»›c khi má»Ÿ rá»™ng UI.

## 10. Káº¿t luáº­n Ä‘á»‹nh hÆ°á»›ng

HÆ°á»›ng lÃ m há»£p lÃ½ nháº¥t lÃ  coi `backend` Laravel hiá»‡n táº¡i lÃ  nguá»“n backend chÃ­nh, sau Ä‘Ã³ triá»ƒn khai theo thá»© tá»±:

1. Chuáº©n hÃ³a user/role/profile.
2. LÃ m cháº¯c Talent Tiering Survey Ä‘Ã£ cÃ³.
3. XÃ¢y Search, Job, Application, Booking.
4. XÃ¢y Agency Management theo `Agency-Module-Technical-Specs.md`.
5. XÃ¢y Wallet/Escrow/Transaction ledger.
6. DÃ¹ng Filament cho Admin.
7. Sau khi backend á»•n má»›i Ä‘á»ƒ frontend ná»‘i giao diá»‡n chi tiáº¿t.

Táº¥t cáº£ tÃ i liá»‡u tiáº¿p theo trong thÆ° má»¥c `docs/Danh_Docs` nÃªn viáº¿t báº±ng tiáº¿ng Viá»‡t cÃ³ dáº¥u.
