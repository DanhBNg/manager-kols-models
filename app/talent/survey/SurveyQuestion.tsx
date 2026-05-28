// Survey question types
export interface SurveyOption {
  text: string;
  group: "A" | "B" | "C";
}

export interface SurveyQuestion {
  id: number;
  question: string;
  options: SurveyOption[];
}

// Survey questions configuration from docs/Cuong_Docs/Y_Tuong_He_Thong.md
export const SURVEY_QUESTIONS: SurveyQuestion[] = [
  // II. ĐẶC ĐIỂM HÌNH THỂ & PHONG CÁCH
  {
    id: 11,
    question: "Mái tóc hiện tại của bạn phù hợp nhất với mô tả nào?",
    options: [
      { text: "Dài, đen mượt/nâu trầm tự nhiên, truyền thống", group: "A" },
      { text: "Tóc ngắn, tóc tém hoặc cắt layer cá tính", group: "B" },
      { text: "Tóc nhuộm màu thời trang, uốn xoăn hiện đại", group: "C" }
    ]
  },
  {
    id: 12,
    question: "Làn da của bạn thuộc tone nào và tình trạng hiện tại?",
    options: [
      { text: "Trắng mịn, đều màu, không tì vết", group: "A" },
      { text: "Nâu khỏe khoắn, bánh mật, mịn màng", group: "B" },
      { text: "Trắng sáng hoặc có hình xăm nhỏ nghệ thuật", group: "C" }
    ]
  },
  {
    id: 13,
    question: "Cấu trúc khung xương và gương mặt của bạn có đặc điểm gì nổi bật?",
    options: [
      { text: "Gương mặt hài hòa, phúc hậu, nụ cười rạng rỡ ăn ảnh", group: "A" },
      { text: "Khung xương góc cạnh, high-fashion, mặt lạnh/ấn tượng", group: "B" },
      { text: "Gương mặt thanh tú, trẻ trung, chuẩn style hotgirl/vlogger", group: "C" }
    ]
  },
  {
    id: 14,
    question: "Tỷ lệ cơ thể (Chân và lưng) của bạn như thế nào?",
    options: [
      { text: "Cân đối, thắt eo rõ ràng, hông quả táo tròn đầy", group: "A" },
      { text: "Lưng ngắn chân dài, tỷ lệ nhân trắc học vượt trội", group: "B" },
      { text: "Nhỏ nhắn, mảnh mai, dễ mặc đồ đa dạng phong cách", group: "C" }
    ]
  },
  {
    id: 15,
    question: "Gu thời trang hằng ngày của bạn hướng tới phong cách nào?",
    options: [
      { text: "Thanh lịch, nữ tính, váy đầm nhẹ nhàng hoặc áo dài", group: "A" },
      { text: "Độc lạ, phá cách, tối giản, Unisex hoặc High-street", group: "B" },
      { text: "Hợp trend, năng động, gợi cảm hoặc dễ thương", group: "C" }
    ]
  },
  {
    id: 16,
    question: "Bạn tự tin nhất với kỹ năng nào khi mang giày cao gót?",
    options: [
      { text: "Đi uyển chuyển, nhẹ nhàng, vừa đi vừa cười tương tác", group: "A" },
      { text: "Bước đi mạnh mẽ, đánh hông chuẩn, sải bước dài góc cạnh", group: "B" },
      { text: "Đi đứng cơ bản, tự tin tạo dáng đứng trước ống kính (Pose dáng)", group: "C" }
    ]
  },
  {
    id: 17,
    question: "Khả năng biểu cảm cơ mặt của bạn tốt nhất khi nào?",
    options: [
      { text: "Khi cười tươi rạng rỡ, ánh mắt ấm áp thân thiện", group: "A" },
      { text: "Khi làm mặt lạnh sắc sảo, thần thái cuốn hút, high-fashion", group: "B" },
      { text: "Biểu cảm đa dạng: Đáng yêu, tinh nghịch, quyến rũ linh hoạt", group: "C" }
    ]
  },
  // III. TÀI NĂNG, ĐAM MÊ & SỞ THÍCH
  {
    id: 18,
    question: "Sở thích lớn nhất của bạn trong thời gian rảnh rỗi là gì?",
    options: [
      { text: "Đọc sách, nấu ăn, yoga, tham gia hoạt động thiện nguyện", group: "A" },
      { text: "Xem các show thời trang quốc tế, tập gym, nghiên cứu phối đồ", group: "B" },
      { text: "Quay TikTok, chụp ảnh lookbook, nhảy hiện đại, ca hát", group: "C" }
    ]
  },
  {
    id: 19,
    question: "Bạn sở hữu năng khiếu nghệ thuật nào nổi bật nhất?",
    options: [
      { text: "Thuyết trình/Biện luận, múa dân gian, cắm hoa, hội họa", group: "A" },
      { text: "Cảm nhận âm nhạc tốt, khả năng làm chủ sàn diễn tốt", group: "B" },
      { text: "Ca hát, nhảy hiện đại, diễn xuất, làm MC/Livestream", group: "C" }
    ]
  },
  {
    id: 20,
    question: "Lĩnh vực xã hội nào bạn quan tâm và muốn đóng góp nhất?",
    options: [
      { text: "Giáo dục cho trẻ em vùng cao, bảo vệ phụ nữ, môi trường", group: "A" },
      { text: "Phát triển ngành công nghiệp thời trang bền vững", group: "B" },
      { text: "Thúc đẩy xu hướng giải trí số, xây dựng cộng đồng trẻ sáng tạo", group: "C" }
    ]
  },
  {
    id: 21,
    question: "Nếu được chọn một thần tượng để hướng tới, bạn sẽ chọn ai?",
    options: [
      { text: "Các Hoa hậu có sức ảnh hưởng quốc tế và giàu lòng nhân ái", group: "A" },
      { text: "Các Siêu mẫu thế giới hoặc Giám đốc sáng tạo thời trang", group: "B" },
      { text: "Các Hot TikToker, Beauty Blogger, Nghệ sĩ đa tài", group: "C" }
    ]
  },
  {
    id: 22,
    question: "Môi trường làm việc khiến bạn cảm thấy hào hứng nhất?",
    options: [
      { text: "Các hội thảo lớn, chương trình giao lưu văn hóa, sự kiện ngoại giao", group: "A" },
      { text: "Sàn diễn chữ T, studio chụp ảnh của các nhà thiết kế lớn", group: "B" },
      { text: "Phim trường, sự kiện giải trí ra mắt sản phẩm, thảm đỏ showbiz", group: "C" }
    ]
  },
  {
    id: 23,
    question: "Bạn nghĩ thế mạnh lớn nhất trong tính cách của mình là gì?",
    options: [
      { text: "Điềm đạm, biết lắng nghe, giàu lòng trắc ẩn và tinh tế", group: "A" },
      { text: "Bản lĩnh, cá tính mạnh, kiên trì và chịu được áp lực cao", group: "B" },
      { text: "Hoạt ngôn, năng động, hài hước và dễ thích nghi", group: "C" }
    ]
  },
  {
    id: 24,
    question: "Khi đối mặt với những lời bình luận tiêu cực trên mạng xã hội, bạn sẽ làm gì?",
    options: [
      { text: "Giữ im lặng, chọn lọc ý kiến đúng để sửa đổi, ứng xử văn minh", group: "A" },
      { text: "Không quan tâm, tập trung nâng cấp giá trị chuyên môn cá nhân", group: "B" },
      { text: "Thẳng thắn đối thoại hoặc biến nó thành nội dung sáng tạo một cách thông minh", group: "C" }
    ]
  },
  // IV. TƯ DUY NỀN TẢNG & MỤC TIÊU SỰ NGHIỆP
  {
    id: 25,
    question: "Mục tiêu lớn nhất của bạn khi quyết định tham gia một cuộc thi là gì?",
    options: [
      { text: "Trở thành người có sức ảnh hưởng để làm dự án cộng đồng lớn", group: "A" },
      { text: "Khẳng định vị thế nghề nghiệp, trở thành First Face/Vedette", group: "B" },
      { text: "Tăng độ nhận diện (Viral), tìm kiếm cơ hội lấn sân Showbiz/KOLs", group: "C" }
    ]
  },
  {
    id: 26,
    question: "Bạn định nghĩa như thế nào là một \"Người phụ nữ thành công\"?",
    options: [
      { text: "Là người dung hòa được gia đình, sự nghiệp và cống hiến cho xã hội", group: "A" },
      { text: "Là người đạt đến đỉnh cao chuyên môn trong lĩnh vực mình theo đuổi", group: "B" },
      { text: "Là người tự chủ tài chính, tự do sáng tạo và làm chủ cuộc sống", group: "C" }
    ]
  },
  {
    id: 27,
    question: "Kỹ năng mềm nào bạn cảm thấy mình cần được đào tạo thêm nhất hiện tại?",
    options: [
      { text: "Kỹ năng ứng xử trước câu hỏi khó, trả lời phỏng vấn (Interview)", group: "A" },
      { text: "Kỹ năng giải phóng hình thể chuyên sâu, tạo dáng high-fashion", group: "B" },
      { text: "Kỹ năng biên tập nội dung video, livestream, xây dựng thương hiệu cá nhân", group: "C" }
    ]
  },
  {
    id: 28,
    question: "Nếu ban giám khảo hỏi: \"Điểm yếu lớn nhất của bạn là gì?\", bạn chọn cách trả lời nào?",
    options: [
      { text: "Chia sẻ chân thành về một thiếu sót và cách bạn đang nỗ lực học tập để vượt qua", group: "A" },
      { text: "Biến điểm yếu thành nét độc bản/cá tính riêng biệt của bản thân", group: "B" },
      { text: "Trả lời một cách thông minh, khéo léo lồng ghép sự hài hước để tạo điểm nhấn", group: "C" }
    ]
  },
  {
    id: 29,
    question: "Bạn mong muốn cộng đồng nhớ đến mình với hình ảnh nào sau cuộc thi?",
    options: [
      { text: "Một người đẹp tri thức, thanh lịch, có trái tim ấm áp", group: "A" },
      { text: "Một biểu tượng thời trang sắc lạnh, chuyên nghiệp và đẳng cấp", group: "B" },
      { text: "Một cô gái năng lượng, đa tài, truyền cảm hứng tích cực cho giới trẻ", group: "C" }
    ]
  },
  {
    id: 30,
    question: "Mức độ sẵn sàng đầu tư (thời gian, công sức, tài chính) của bạn cho cuộc thi?",
    options: [
      { text: "Sẵn sàng bảo lưu học tập/công việc, tập trung 100% để đạt vương miện", group: "A" },
      { text: "Sẵn sàng rèn luyện thể hình khốc liệt để đạt chuẩn số đo khắt khe", group: "B" },
      { text: "Muốn vừa thi vừa trải nghiệm, tối ưu hóa hình ảnh ngay trong quá trình thi", group: "C" }
    ]
  }
];
