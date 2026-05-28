# TÀI LIỆU THIẾT KẾ UI/UX
## Talent App & Brand Portal

## 1. Mục tiêu sản phẩm

Dự án được định vị là một nền tảng công nghệ dành cho ngành người đẹp, người mẫu và giải trí. Trọng tâm không phải chỉ là một app thi hoa hậu, mà là hệ thống giúp tài năng xây dựng hồ sơ số, được chấm điểm, được định hướng nghề nghiệp và được kết nối với nhãn hàng để tạo ra doanh thu.

Trong giai đoạn MVP, hệ thống nên tập trung vào 2 nhóm người dùng chính:

1. **Talent**: thí sinh, người đẹp, model, KOL, MC, PG, creator.
2. **Brand**: nhãn hàng, agency, đơn vị tổ chức sự kiện, ekip sản xuất, ban tổ chức cuộc thi.

Admin chỉ nên làm ở mức tối giản để duyệt hồ sơ, quản lý job, xử lý tranh chấp và theo dõi giao dịch.

---

## 2. Nguyên tắc thiết kế tổng thể

### 2.1. Định vị giao diện

Phong cách giao diện nên đi theo hướng:

**Luxury Tech / Beauty SaaS / Futuristic Minimalist**

Tức là kết hợp giữa cảm giác cao cấp của ngành sắc đẹp và sự rõ ràng, chính xác của một nền tảng công nghệ.

Không nên thiết kế quá rực rỡ, quá nhiều hiệu ứng hoa hậu truyền thống. Giao diện cần tạo cảm giác chuyên nghiệp, đáng tin cậy, hiện đại và có khả năng mở rộng thành nền tảng thương mại B2B.

### 2.2. Tông màu đề xuất

| Thành phần | Màu đề xuất | Vai trò |
|---|---|---|
| Nền chính | Deep Navy / Matte Black | Tạo cảm giác cao cấp, công nghệ |
| Màu nhấn chính | Gold Gradient | Đại diện cho sắc đẹp, vương miện, premium |
| Màu phụ | Purple Neon / Cyan Blue | Đại diện cho AI, dữ liệu, matching |
| Text chính | White / Ivory | Dễ đọc trên nền tối |
| Text phụ | Cool Gray | Mô tả, metadata |
| Thành công | Emerald Green | Job hoàn tất, thanh toán thành công |
| Cảnh báo | Amber | Hồ sơ thiếu, chờ xác minh |
| Lỗi | Red / Rose | Tranh chấp, hủy job, chưa đạt điều kiện |

### 2.3. Thiết kế theo phân hạng Talent

Hệ thống có thể dùng visual badge để phân biệt cấp độ tài năng:

| Tier | Ý nghĩa | UI Badge |
|---|---|---|
| S | Celeb / Super VIP | Viền vàng kim phát sáng |
| A | High-end Professional | Viền bạc ánh kim |
| B | Mid-range / Freelance | Viền tím/xanh neon |
| C | Entry-level / Newbie | Viền mint tối giản |

Tier không chỉ là yếu tố dữ liệu, mà còn là yếu tố thị giác quan trọng để Brand ra quyết định nhanh.

---

# PHẦN A — TALENT APP

## 3. Chân dung người dùng Talent

### 3.1. Nhóm người dùng chính

Talent có thể gồm:

- Thí sinh chuẩn bị thi hoa hậu/hoa khôi.
- Người mẫu runway.
- Người mẫu ảnh/lookbook.
- KOL/KOC/livestreamer.
- MC, PG, diễn viên MV, khách mời sự kiện.
- Người đẹp đã có danh hiệu và muốn khai thác thương mại sau cuộc thi.

### 3.2. Nhu cầu chính của Talent

Talent cần hệ thống giúp họ:

1. Biết mình phù hợp với hướng nào: hoa hậu, runway, KOL, giải trí.
2. Xây dựng hồ sơ chuyên nghiệp.
3. Có lịch trống và portfolio chuẩn để gửi cho Brand.
4. Nhận job phù hợp.
5. Biết cách tăng điểm hồ sơ.
6. Được kết nối với mentor, stylist, makeup, photographer, academy.
7. Theo dõi thu nhập, job, hợp đồng và thanh toán.
8. Gây quỹ/vận động cộng đồng nếu đang tham gia cuộc thi.

### 3.3. Tâm lý người dùng Talent

Talent thường không muốn thấy giao diện quá phức tạp. Họ cần app có cảm giác:

- Đẹp.
- Dễ hiểu.
- Có tính định hướng.
- Có động lực hoàn thiện hồ sơ.
- Thấy rõ cơ hội nghề nghiệp.
- Không bị cảm giác như đang dùng phần mềm quản trị khô khan.

Vì vậy UI nên ưu tiên card lớn, ảnh đẹp, tiến trình rõ ràng, gợi ý hành động cụ thể.

---

## 4. Luồng trải nghiệm Talent

## 4.1. Luồng tổng quan

```text
Đăng ký / Đăng nhập
        ↓
Chọn vai trò: Talent
        ↓
Onboarding hồ sơ cơ bản (Đăng ký nhanh < 3 phút)
        ↓
Vào Dashboard (Xem điểm hoàn thiện hồ sơ ban đầu)
        ↓
Làm Khảo sát định hướng (Tự chọn từ Dashboard)
        ↓
Nhận kết quả phù hợp (Pageant / Runway / KOL-Giải trí) & Xác định phân hạng Tier
        ↓
Hoàn thiện Portfolio (Ảnh, Lịch rảnh, Liên kết mạng xã hội)
        ↓
Nhận gợi ý việc làm khớp thuật toán (AI Scored Job Matching)
        ↓
Ứng tuyển / Nhận đặt cọc hợp đồng bảo đảm (Escrowed Booking) / Crown Funding
```

---

## 5. Màn hình Talent Onboarding

### 5.1. Mục tiêu

Onboarding phải giúp hệ thống thu thập dữ liệu ban đầu để:

- Phân loại Talent.
- Định hướng cuộc thi phù hợp.
- Tính điểm hồ sơ ban đầu.
- Gợi ý việc cần bổ sung.

### 5.2. Cấu trúc onboarding

Nên chia thành nhiều bước nhỏ thay vì một form dài.

#### Step 1: Thông tin cơ bản

Các trường:

- Họ tên.
- Năm sinh.
- Khu vực sinh sống.
- Quê quán.
- Số điện thoại.
- Email.
- Ảnh đại diện.

#### Step 2: Nhân trắc học

Các trường:

- Chiều cao.
- Cân nặng.
- Số đo 3 vòng.
- Tình trạng phẫu thuật thẩm mỹ.
- Tình trạng hôn nhân/con cái.

UI nên dùng input dạng dễ nhập, có đơn vị rõ ràng:

```text
Chiều cao: [ 168 ] cm
Cân nặng: [ 49 ] kg
Vòng 1: [ 84 ] cm
Vòng 2: [ 60 ] cm
Vòng 3: [ 90 ] cm
```

#### Step 3: Học vấn & kỹ năng

Các trường:

- Học vấn.
- Ngoại ngữ.
- Kỹ năng nổi bật.
- Kinh nghiệm từng tham gia cuộc thi/job.

#### Step 4: Social & Portfolio

Các trường:

- TikTok.
- Instagram.
- Facebook.
- YouTube.
- Ảnh portfolio (Tối thiểu 3 ảnh).
- Video catwalk (Tự chọn).
- Video giới thiệu bản thân (Tự chọn).

#### Step 5: Hoàn thành & Điểm hồ sơ ban đầu

- Hiển thị màn hình chúc mừng hoàn tất đăng ký.
- Hiển thị tỷ lệ hoàn thành hồ sơ ban đầu (ví dụ: `30%`).
- Nút CTA lớn: "Làm bài khảo sát định hướng nghề nghiệp" (Optional - để làm khảo sát 30 câu định hướng vị trí và tính toán Tier).
- Nút phụ: "Vào Dashboard của tôi".

### 5.3. UX quan trọng

- **Đăng ký cực nhanh (< 3 phút):** Cho phép bỏ qua (Skip) hầu hết các bước không bắt buộc (như số đo chi tiết, liên kết mạng xã hội, video) để tránh drop-off.
- **Tách biệt khảo sát:** Tuyệt đối không bắt buộc làm bài khảo sát 30 câu ngay trong quá trình đăng ký. Đưa bài khảo sát thành một gợi ý nổi bật sau khi vào Dashboard.
- **Thanh tiến trình (Progress Bar):** Hiển thị rõ ràng tiến độ đăng ký kèm ước lượng thời gian còn lại (ví dụ: "Chỉ còn 1 phút").
- **Nhận diện trực quan:** Sau khi hoàn thành, cung cấp phản hồi tích cực và hiển thị điểm hoàn thiện hồ sơ ban đầu để tạo động lực cập nhật tiếp.

---

## 6. Màn hình kết quả định hướng Talent

### 6.1. Mục tiêu

Sau khảo sát, Talent cần biết ngay:

- Mình phù hợp với nhóm nào nhất.
- Vì sao hệ thống gợi ý như vậy.
- Mình nên làm gì tiếp theo.

### 6.2. Layout đề xuất

```text
[Hero Result]
Bạn phù hợp nhất với nhóm:
KOL / Người mẫu ảnh / Giải trí thế hệ mới
Độ phù hợp: 82%

[Radar Chart]
Hoa hậu/Hoa khôi: 64%
Runway: 58%
KOL/Giải trí: 82%

[AI Insight]
Bạn có lợi thế về biểu cảm, social content và sự linh hoạt trước camera.

[Next Actions]
- Hoàn thiện video giới thiệu
- Kết nối agency quảng cáo
- Ứng tuyển job KOC livestream
- Xem cuộc thi phù hợp
```

### 6.3. Component cần có

- Result hero card.
- Radar chart.
- Progress score.
- AI recommendation card.
- Competition suggestion card.
- Service suggestion card.
- CTA nổi bật.

---

## 7. Talent Dashboard

### 7.1. Mục tiêu

Dashboard là trung tâm điều hướng của Talent. Mỗi lần vào app, Talent cần biết:

- Hồ sơ đang mạnh/yếu ở đâu.
- Có job nào phù hợp.
- Có cuộc thi nào nên đăng ký.
- Có việc gì cần hoàn thiện.
- Thu nhập và lịch trình hiện tại ra sao.

### 7.2. Định hướng Thiết kế Giao diện (Responsive & Device Priority)

- **Ưu tiên Mobile-first:** Do 85% KOL/Model sử dụng điện thoại, giao diện Talent Portal được thiết kế tối ưu hóa 100% cho màn hình dọc di động (Mobile Web / PWA / Native App).
- **Layout Desktop:** Đóng vai trò là bản hiển thị co giãn (responsive) tương thích trên máy tính, không xây dựng giao diện desktop chuyên biệt cho Talent để tránh phình to codebase. Toàn bộ các tương tác (từ kéo thả, xem ảnh, check lịch đến nghiệm thu công việc) đều được thiết kế dễ dàng thao tác bằng 1 tay trên màn hình cảm ứng di động.

### 7.3. Layout mobile

Mobile nên ưu tiên bottom navigation:

```text
Home | Jobs | Crown | Messages | Profile
```

Home mobile nên hiển thị theo thứ tự:

1. Profile summary.
2. Việc cần làm hôm nay.
3. Job phù hợp.
4. Lịch sắp tới.
5. Điểm hồ sơ.
6. Cuộc thi/dịch vụ đề xuất.

### 7.4. Các card chính

#### Card 1: Profile Score

```text
Profile Score
68/100
Bạn còn thiếu: Video catwalk, rate card, lịch trống
[Hoàn thiện ngay]
```

#### Card 2: Tier Status

```text
Tier B
Mid-range / Freelance Talent
Cần +7 điểm để lên Tier A
```

#### Card 3: Job Matching

```text
5 job phù hợp hôm nay
Match cao nhất: 91%
```

#### Card 4: Income

```text
Thu nhập tháng này
12.500.000đ
Đang chờ giải ngân: 4.000.000đ
```

---

## 8. Talent Profile / Portfolio

### 8.1. Mục tiêu

Đây là hồ sơ công khai để Brand xem và booking. Profile phải vừa đẹp, vừa đủ dữ liệu để ra quyết định.

### 8.2. Cấu trúc profile

#### Header profile

```text
[Ảnh cover]
[Avatar]
Nguyễn Mai Anh  [Huy hiệu Phân hạng Mạng xã hội - ví dụ: 💎 Star]
Tier A | Verified Talent
KOL Beauty • MC • Event Guest
Location: Hà Nội | 🟢 Đang Rảnh (Lịch trống tuần này)
Profile Score: 82/100 (Tăng +200% khả năng nhận job)
[Book Talent] [Message] [Share]
```

- **Huy hiệu Phân hạng MXH (Social Badges):** Hiển thị dựa trên lượng follower được sync tự động hàng tuần (như 🥉 Micro, 🥈 Rising, 🥇 Influencer, 💎 Star, 👑 Celebrity).
- **Trạng thái lịch rảnh (Availability Badge):** Hiển thị trạng thái hoạt động tức thời (🟢 Rảnh / 🔴 Bận) giúp nhà tuyển dụng ra quyết định book nhanh mà không cần nhắn tin hỏi trước.

#### Section 1: Key Metrics

- Chiều cao.
- Cân nặng.
- Số đo.
- Độ tuổi.
- Khu vực.
- Follower.
- Engagement Rate.
- Job hoàn thành.
- Rating.

#### Section 2: Portfolio Media

- Ảnh beauty.
- Ảnh lookbook.
- Ảnh event.
- Video catwalk.
- Video giới thiệu.
- Video livestream/demo MC.

#### Section 3: Skill Radar

Các trục gợi ý:

- Catwalk.
- Pose dáng.
- MC.
- Livestream.
- Diễn xuất.
- Social content.
- Brand safety.
- Reliability.

#### Section 4: Rate Card

```text
Instagram Post: từ 3.000.000đ
TikTok Video: từ 5.000.000đ
Livestream 2h: từ 8.000.000đ
Event Appearance: từ 10.000.000đ
Catwalk Show: từ 15.000.000đ
```

#### Section 5: Availability Calendar

Hiển thị lịch trống theo tuần/tháng.

Brand có thể xem nhanh ngày nào book được.

#### Section 6: Reviews

- Đánh giá từ Brand.
- Điểm đúng giờ.
- Tỷ lệ hoàn thành job.
- Lịch sử hủy show.

### 8.3. UX quan trọng

- Brand phải đọc được hồ sơ trong 5 giây.
- Các con số quan trọng phải nằm trên đầu.
- Media phải đẹp, nhưng không được che mất dữ liệu.
- CTA “Book Talent” luôn hiển thị rõ.

---

## 9. Talent Job Marketplace

### 9.1. Mục tiêu

Talent dùng màn hình này để tìm và nhận job.

### 9.2. Danh sách job

Mỗi job card gồm:

```text
[KOL Livestream mỹ phẩm]
Brand: Glow Beauty
Match Score: 91%
Budget: 8.000.000đ - 12.000.000đ
Thời gian: 20:00, 25/06/2026
Địa điểm: Online / Studio Hà Nội
Yêu cầu: Nữ, nói tốt, có kinh nghiệm livestream
Escrow: Đã đặt cọc
[Chi tiết] [Ứng tuyển]
```

### 9.3. Bộ lọc job

- Loại job.
- Mức cát-xê.
- Địa điểm.
- Thời gian.
- Online/offline.
- Brand đã xác minh.
- Có escrow/chưa escrow.
- Match score.

### 9.4. Job Detail

Màn hình chi tiết job cần có:

- Tên chiến dịch.
- Brand.
- Mục tiêu chiến dịch.
- Mô tả công việc.
- Kịch bản/yêu cầu nội dung.
- Trang phục.
- Thời gian.
- Địa điểm.
- Cát-xê.
- Điều kiện thanh toán.
- Trạng thái escrow.
- Người phụ trách.
- Nút chấp nhận/từ chối.

### 9.5. UX bảo vệ Talent

Nên hiển thị rõ:

```text
Tiền đã được đặt cọc bảo đảm bởi Brand.
Bạn sẽ được hệ thống tự động giải ngân sau khi Brand xác nhận hoàn thành, hoặc tự động giải ngân sau 48h (kể từ khi bạn gửi sản phẩm nghiệm thu) nếu không có khiếu nại phát sinh từ phía Brand.
```

Điều này tạo niềm tin tuyệt đối cho người mẫu và khác biệt so với việc nhận job tự do bên ngoài.

---

## 10. Crown Funding cho Talent

### 10.1. Mục tiêu

Dành cho thí sinh đang tham gia cuộc thi cần gây quỹ cho dự án nhân ái, vote hoặc vận động cộng đồng.

### 10.2. Màn hình Campaign Funding

```text
Dự án: Tủ sách cho em
Người thực hiện: Nguyễn Mai Anh
Mục tiêu: 100.000.000đ
Đã đạt: 62.500.000đ
Số người ủng hộ: 1.248

[Ủng hộ ngay] [Chia sẻ]
```

### 10.3. Thành phần UI

- Progress funding bar.
- Danh sách nhà tài trợ.
- Bảng sao kê minh bạch.
- Video giới thiệu dự án.
- Cập nhật tiến độ.
- Nút chia sẻ social.
- Fan voting/gifting.

---

## 11. Màn hình Ví & Quản lý thu nhập (Wallet / Earnings)

### 11.1. Mục tiêu
Giúp Talent có cái nhìn trực quan về tiền cát-xê của mình, phân định rõ ràng giữa tiền khả dụng và tiền đang bị khóa đặt cọc (Escrow) để yên tâm thực hiện công việc.

### 11.2. Cấu trúc màn hình di động

```text
[VÍ CỦA TÔI] 
Số dư khả dụng (Rút được): 12.500.000đ
[Nút: Rút Tiền Về Bank]

---------------------------------------------------
🔒 ĐANG KHÓA ĐẶT CỌC (ESCROW): 8.000.000đ
(Cát-xê đã được Brand chuyển vào sàn, đang bảo vệ chờ bạn làm xong job)
- Job: Livestream Mỹ phẩm Glow Beauty (8.000.000đ) -> Chờ nộp proof
---------------------------------------------------
LỊCH SỬ GIAO DỊCH
- 25/05/2026 | +7.600.000đ (Đã giải ngân - Live Beauty Mega)
- 24/05/2026 | +8.000.000đ (Khóa đặt cọc từ Glow Beauty)
- 20/05/2026 | -5.000.000đ (Đã rút về tài khoản VCB)
```

### 11.3. UX quan trọng
- Hiển thị biểu tượng 🔒 Khóa an toàn bên cạnh số tiền Escrow để tăng cảm giác tin cậy.
- Giải thích rõ ràng ý nghĩa của "Tiền đang khóa": KOL nhìn thấy tiền này đã được Brand cọc trên sàn, chắc chắn sẽ không bị bùng tiền sau khi diễn xong.

---
# PHẦN C — INFORMATION ARCHITECTURE

App/Talent
├── Home / Dashboard
├── Onboarding
│   ├── Basic Info
│   ├── Body Metrics
│   ├── Skills
│   ├── Social Links
│   └── Survey
├── Result / Recommendation
├── Profile / Portfolio
│   ├── Overview
│   ├── Media
│   ├── Skills
│   ├── Rate Card
│   ├── Availability
│   └── Reviews
├── Jobs
│   ├── Recommended Jobs
│   ├── Applied Jobs
│   ├── Active Jobs
│   └── Job History
├── Crown Funding
├── Calendar
├── Messages
├── Wallet / Earnings
└── Settings
