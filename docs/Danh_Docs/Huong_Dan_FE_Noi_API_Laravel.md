# Hướng dẫn frontend nối API Laravel

Tài liệu này dành cho người làm giao diện frontend khi cần chuyển các màn đang dùng dữ liệu mock sang dữ liệu thật từ Laravel backend.

Mục tiêu chính là giữ UI hiện tại, chỉ thay nguồn dữ liệu phía sau. Không nên viết `fetch()` rải rác trong từng màn vì sau này rất dễ lỗi, khó đổi API và dễ conflict khi merge.

## 1. Kiến trúc thống nhất

Frontend Next.js gọi Laravel qua một lớp helper trung gian:

```txt
Màn hình trong app/
  -> lib/api-client.ts
  -> lib/brand-api.ts hoặc lib/api/<module>.ts
  -> Laravel API
  -> Database
  -> Filament Admin nhìn thấy dữ liệu
```

Không nên đi theo hướng:

```txt
Màn hình trong app/
  -> fetch trực tiếp từng nơi
```

Lý do: khi đổi domain backend, đổi token, đổi format response hoặc xử lý lỗi, chỉ cần sửa một chỗ trong helper.

## 2. Biến môi trường bắt buộc

Frontend cần biến:

```env
NEXT_PUBLIC_API_URL=https://manager-kols-models-production.up.railway.app/api
```

Khi chạy local và muốn gọi backend local:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
```

Nếu không có biến này, code hiện tại sẽ tự fallback:

- Local development: `http://127.0.0.1:8000/api`
- Production build: `https://manager-kols-models-production.up.railway.app/api`

Tuy vậy, cách chuẩn vẫn là đặt biến môi trường rõ ràng trên Vercel.

Sau khi thêm hoặc sửa `.env.local`, phải tắt `npm run dev` và bật lại.

## 3. Quy ước token đăng nhập

Sau khi đăng nhập thành công, frontend lưu:

```txt
localStorage.onstagevn_auth_token
localStorage.onstagevn_auth_user
```

`lib/api-client.ts` sẽ tự lấy token từ `localStorage.onstagevn_auth_token` và gửi header:

```http
Authorization: Bearer <token>
Accept: application/json
Content-Type: application/json
```

Bên UI không cần tự gắn token thủ công nếu dùng `apiFetch()`.

## 4. Quy tắc khi sửa màn UI

Khi một màn cần dữ liệu thật, làm theo thứ tự:

1. Tìm xem màn đó đang import mock từ đâu, thường là:

```ts
import { campaigns, talents } from "@/lib/brand-mvp-data";
```

2. Không sửa layout trước. Chỉ thay nguồn dữ liệu.

3. Tạo hoặc dùng helper API ở `lib/brand-api.ts` hoặc folder mới:

```txt
lib/api/
├── campaigns.ts
├── talents.ts
├── wishlists.ts
├── bookings.ts
├── contact-requests.ts
└── partner-profile.ts
```

4. Helper API nên trả về dữ liệu gần giống type UI hiện tại để màn hình phải sửa ít nhất.

Ví dụ:

```ts
const campaigns = await fetchCampaigns();
```

Hàm `fetchCampaigns()` nên trả về dạng mà UI đang dùng, không bắt UI phải hiểu toàn bộ format database Laravel.

## 5. Ví dụ nối màn Campaign

Hiện tại màn:

```txt
app/brand/campaigns/page.tsx
```

đang dùng mock:

```ts
const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
```

Khi bấm tạo campaign, code hiện tại chỉ thêm vào state:

```ts
setCampaigns((current) => [newCampaign, ...current]);
```

Dữ liệu này chỉ tồn tại trên trình duyệt. Reload trang là mất và Filament Admin không thấy.

Muốn admin thấy campaign mới, phải gọi Laravel:

```txt
POST /api/campaigns
```

Luồng đúng:

```txt
Người dùng nhập form campaign
  -> createCampaign(payload)
  -> POST /api/campaigns
  -> Laravel lưu vào bảng campaigns
  -> FE nhận campaign mới
  -> FE cập nhật state
  -> Filament Admin /admin/campaigns nhìn thấy dữ liệu
```

Ví dụ helper nên có:

```ts
export async function fetchCampaigns() {
  const response = await apiFetch<ApiResponse<BackendCampaign[]>>("/campaigns");
  return response.data.map(mapBackendCampaignToUiCampaign);
}

export async function createCampaign(payload: CreateCampaignPayload) {
  const response = await apiFetch<ApiResponse<BackendCampaign>>("/campaigns", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return mapBackendCampaignToUiCampaign(response.data);
}
```

Payload gửi lên Laravel dùng snake_case:

```ts
{
  title: "Tên campaign",
  job_type: "KOL livestream",
  description: "Mô tả công việc",
  city: "Hà Nội",
  location: "Địa điểm",
  start_date: "2026-06-15",
  end_date: "2026-06-30",
  talent_quantity: 3,
  budget_min: 20000000,
  budget_max: 40000000,
  requirements: "Yêu cầu"
}
```

UI có thể vẫn giữ camelCase trong form, nhưng helper cần đổi sang snake_case trước khi gửi backend.

## 6. Danh sách API Phase 1 đang có

Các API này cần đăng nhập và có token Sanctum.

### Auth

```txt
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/logout
```

### Brand profile

```txt
GET /api/partner/profile
PUT /api/partner/profile
```

### Talent profile và danh sách talent

```txt
GET /api/talents
GET /api/talents/{profile}
GET /api/profiles/{profile}
PUT /api/my/profile
GET /api/profiles/{profile}/completion
```

### Media

```txt
POST   /api/profiles/{profile}/photos
DELETE /api/profiles/{profile}/photos/{photo}
POST   /api/profiles/{profile}/videos
```

### Social metrics

```txt
POST /api/social/accounts
POST /api/social/accounts/{socialAccount}/metrics
```

### Calendar

```txt
GET    /api/calendar/events
POST   /api/calendar/events
PUT    /api/calendar/events/{event}
DELETE /api/calendar/events/{event}
```

### Wishlist, shortlist

```txt
GET    /api/wishlists
POST   /api/wishlists
GET    /api/wishlists/{wishlist}
POST   /api/wishlists/{wishlist}/items
DELETE /api/wishlists/{wishlist}/items/{item}
```

### Campaign

```txt
GET  /api/campaigns
POST /api/campaigns
GET  /api/campaigns/{campaign}
PUT  /api/campaigns/{campaign}
POST /api/campaigns/{campaign}/publish
POST /api/campaigns/{campaign}/close
```

### Campaign talent

```txt
GET    /api/campaigns/{campaign}/talents
POST   /api/campaigns/{campaign}/talents
PUT    /api/campaigns/{campaign}/talents/{campaignTalent}
DELETE /api/campaigns/{campaign}/talents/{campaignTalent}
```

### Contact request

```txt
GET  /api/contact-requests
POST /api/contact-requests
GET  /api/contact-requests/{contactRequest}
POST /api/contact-requests/{contactRequest}/cancel
```

### Booking sơ bộ

```txt
GET  /api/bookings
POST /api/bookings
```

### Survey tiering

```txt
POST /api/survey/submit
GET  /api/survey/progress
POST /api/survey/calculate
GET  /api/recommendations
```

## 7. Quy ước quyền tài khoản

Một số API yêu cầu đúng loại tài khoản:

- API campaign yêu cầu user `type = brand`.
- API profile talent yêu cầu user `type = talent` khi cập nhật hồ sơ của chính mình.
- API admin không dùng cho frontend người dùng, chỉ vào qua Filament `/admin`.

Nếu gọi API campaign bằng tài khoản talent, backend sẽ trả `403`.

## 8. Checklist khi một màn không thấy dữ liệu trong admin

Kiểm tra theo thứ tự:

1. Màn đó đã gọi API Laravel chưa hay vẫn dùng mock?
2. Có token trong `localStorage.onstagevn_auth_token` chưa?
3. Tài khoản đăng nhập có đúng type không?
4. Request trong tab Network có trả `200` hoặc `201` không?
5. Payload gửi lên backend có đúng snake_case không?
6. Backend local có đang chạy không?

Backend local:

```powershell
cd backend
C:\php\php.exe artisan serve --host=127.0.0.1 --port=8000
```

Test nhanh:

```txt
http://127.0.0.1:8000/api/health
```

## 9. Nguyên tắc tránh conflict khi merge UI

Nên để người làm frontend sửa chủ yếu trong `app/`.

Phần backend/API helper nên để riêng:

```txt
lib/api-client.ts
lib/brand-api.ts
lib/api/*.ts
```

Khi cần nối một màn mới, chỉ cần thêm helper hoặc dùng helper có sẵn. Không nên copy logic gọi API vào nhiều màn.

Ưu tiên nối từng luồng theo thứ tự:

1. Đăng nhập, đăng ký.
2. Campaign.
3. Brand profile.
4. Talent list và talent detail.
5. Wishlist/shortlist.
6. Contact request và booking.
7. Calendar.
8. Survey tiering.

Màn nào chưa nối API thì vẫn có thể giữ mock để demo giao diện, nhưng cần hiểu rằng dữ liệu đó sẽ không xuất hiện trong Filament Admin.

