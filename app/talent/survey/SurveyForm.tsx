"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  User, ShieldAlert, Award, Sparkles, ArrowRight, ArrowLeft, 
  CheckCircle2, Info, Star, ChevronRight, Trophy, Heart,
  Globe, Shield, Upload, FileText, Video, Check, Crown
} from "lucide-react";
import { cn } from "@/lib/utils";

// Custom SVG Icons to avoid import errors from old lucide version
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TiktokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

// Survey questions configuration from c:\CONG_VIEC\VNP_BeutyTalent\docs\Y_Tuong_He_Thong.md
const SURVEY_QUESTIONS = [
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

const JOBS_LIST = [
  { id: 1, title: "Đại sứ thương hiệu", desc: "Gương mặt đại diện thương hiệu luxury", weights: { pageant: 0.4, runway: 0.2, kol: 0.4 } },
  { id: 2, title: "KOLs/Influencer quảng cáo", desc: "Sáng tạo nội dung video ngắn", weights: { pageant: 0.1, runway: 0.1, kol: 0.8 } },
  { id: 3, title: "KOC Livestream bán hàng", desc: "Thực hiện livestream bán hàng trực tiếp", weights: { pageant: 0.05, runway: 0.05, kol: 0.9 } },
  { id: 4, title: "Gương mặt trang bìa", desc: "Chụp ảnh bìa tạp chí, lookbook, ảnh PR", weights: { pageant: 0.3, runway: 0.5, kol: 0.2 } },
  { id: 5, title: "Người mẫu sàn diễn (Runway)", desc: "Trình diễn các bộ sưu tập thời trang cao cấp", weights: { pageant: 0.1, runway: 0.8, kol: 0.1 } },
  { id: 6, title: "Người mẫu quảng cáo", desc: "Diễn xuất trong các TVC quảng cáo", weights: { pageant: 0.2, runway: 0.3, kol: 0.5 } },
  { id: 7, title: "Diễn viên MV ca nhạc", desc: "Đóng vai nữ chính/nam chính MV ca nhạc", weights: { pageant: 0.2, runway: 0.2, kol: 0.6 } },
  { id: 8, title: "KOL sự kiện / Khách mời VIP", desc: "Tham dự thảm đỏ và sự kiện thương hiệu", weights: { pageant: 0.6, runway: 0.2, kol: 0.2 } },
  { id: 9, title: "Người dẫn chương trình (MC)", desc: "Dẫn dắt các sự kiện và chương trình giải trí", weights: { pageant: 0.7, runway: 0.1, kol: 0.2 } },
  { id: 10, title: "VIP Promotion Girl (PG)", desc: "Lễ tân đón tiếp khách tại sự kiện lớn", weights: { pageant: 0.4, runway: 0.3, kol: 0.3 } },
  { id: 11, title: "Huấn luyện viên Catwalk", desc: "Đào tạo kỹ thuật đi catwalk cho học viên", weights: { pageant: 0.1, runway: 0.8, kol: 0.1 } },
  { id: 12, title: "CEO thương hiệu riêng", desc: "Kinh doanh nhãn hàng thời trang, mỹ phẩm", weights: { pageant: 0.5, runway: 0.2, kol: 0.3 } },
  { id: 13, title: "Giám khảo cuộc thi sắc đẹp", desc: "Chấm điểm các cuộc thi hoa hậu, hoa khôi", weights: { pageant: 0.7, runway: 0.2, kol: 0.1 } },
  { id: 14, title: "Giám đốc hình ảnh / Stylist", desc: "Cố vấn định hình phong cách và trang phục", weights: { pageant: 0.1, runway: 0.6, kol: 0.3 } },
  { id: 15, title: "Sứ giả chiến dịch cộng đồng", desc: "Lan tỏa các giá trị nhân văn và dự án từ thiện", weights: { pageant: 0.8, runway: 0.1, kol: 0.1 } },
  { id: 16, title: "Vlogger du lịch & trải nghiệm", desc: "Quảng bá điểm đến, khách sạn, resort cao cấp", weights: { pageant: 0.2, runway: 0.1, kol: 0.7 } },
  { id: 17, title: "Người mẫu ảnh nghệ thuật", desc: "Hợp tác chụp ảnh thời trang Fine-art", weights: { pageant: 0.2, runway: 0.6, kol: 0.2 } },
  { id: 18, title: "Nhà sáng tạo nội dung tri thức", desc: "Chia sẻ kỹ năng mềm, kiến thức làm đẹp", weights: { pageant: 0.4, runway: 0.1, kol: 0.5 } },
  { id: 19, title: "Đại sứ Game / Esports", desc: "Hình ảnh đại diện cho các dự án game lớn", weights: { pageant: 0.1, runway: 0.1, kol: 0.8 } },
  { id: 20, title: "Người mẫu ảo / Metaverse", desc: "Scan 3D hình ảnh số để làm mẫu ảo", weights: { pageant: 0.1, runway: 0.6, kol: 0.3 } }
];

interface SurveyFormProps {
  resetCounter?: number;
  onActiveChange?: (active: boolean) => void;
}

export default function SurveyForm({ resetCounter, onActiveChange }: SurveyFormProps = {}) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  
  // Outer Step 5 (Orientation survey) inner question tracker (0 to 19)
  const [activeSurveyQIdx, setActiveSurveyQIdx] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    birthYear: "2002",
    location: "Hà Nội",
    hometown: "",
    phone: "",
    email: "",
    height: "172",
    weight: "51",
    bust: "85",
    waist: "60",
    hips: "90",
    plasticSurgery: "Vẻ đẹp hoàn toàn tự nhiên, chưa từng can thiệp",
    maritalStatus: "Độc thân, chưa từng sinh con",
    education: "Cao đẳng / Đại học",
    languages: "Thành thạo / Lưu loát (Tương đương IELTS 6.5 trở lên)",
    skills: "Catwalk, Diễn xuất trước ống kính, Thuyết trình",
    experience: "",
    tiktokUrl: "",
    instagramUrl: "",
    facebookUrl: "",
    youtubeUrl: "",
    tiktokFollowers: "80000",
    instagramFollowers: "30000",
    facebookFollowers: "10000",
    youtubeFollowers: "0"
  });

  // Mock Upload state to feel realistic & premium
  const [mediaUploads, setMediaUploads] = useState({
    avatar: null as string | null,
    portfolio: null as string | null, // Portfolio/CV (required)
    introVideo: null as string | null // Intro video (optional)
  });

  const getTotalFollowers = () => {
    return (
      (parseInt(formData.tiktokFollowers) || 0) +
      (parseInt(formData.instagramFollowers) || 0) +
      (parseInt(formData.facebookFollowers) || 0) +
      (parseInt(formData.youtubeFollowers) || 0)
    );
  };

  const [surveyAnswers, setSurveyAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [registeredComp, setRegisteredComp] = useState<Record<string, boolean>>({});

  const [results, setResults] = useState({
    pageant: 0,
    runway: 0,
    kol: 0,
    mainCategory: "",
    tier: "C" as "S" | "A" | "B" | "C" | "Potential",
    profileScore: 0,
    date: "",
    hardRules: {
      strictPageantAllowed: true,
      runwayAllowed: true,
      hasLanguagePriority: false
    }
  });

  const [showHistoryDashboard, setShowHistoryDashboard] = useState(false);
  const [historyList, setHistoryList] = useState<any[]>([]);

  React.useEffect(() => {
    if (resetCounter && resetCounter > 0) {
      setShowHistoryDashboard(false);
      setIsSubmitted(false);
      setStep(1);
      setActiveSurveyQIdx(0);
      setSurveyAnswers({});
    }
  }, [resetCounter]);

  React.useEffect(() => {
    if (onActiveChange) {
      onActiveChange(!showHistoryDashboard);
    }
  }, [showHistoryDashboard, onActiveChange]);

  React.useEffect(() => {
    let existingHistory = localStorage.getItem("vnp_talent_survey_history");
    let parsedHistory = [];
    if (existingHistory) {
      try {
        parsedHistory = JSON.parse(existingHistory);
      } catch (e) {
        console.error(e);
      }
    }
    
    // Always seed a mock history entry if empty, so the user sees it immediately on startup
    if (!Array.isArray(parsedHistory) || parsedHistory.length === 0) {
      parsedHistory = [{
        id: 1779889600000,
        date: "20:27:06 27/05/2026",
        mainCategory: "Người mẫu Runway chuyên nghiệp",
        tier: "A",
        pageant: 15,
        runway: 80,
        kol: 10,
        profileScore: 100
      }];
      localStorage.setItem("vnp_talent_survey_history", JSON.stringify(parsedHistory));
      
      // Also seed the matching profile so it matches
      const existingProfile = localStorage.getItem("vnp_talent_profile");
      if (!existingProfile) {
        const defaultProfile = {
          name: "Nguyễn Mai Anh",
          birthYear: "2002",
          location: "Hà Nội",
          hometown: "Nam Định",
          phone: "0912345678",
          email: "maianh@gmail.com",
          height: "172",
          weight: "51",
          bust: "85",
          waist: "60",
          hips: "90",
          plasticSurgery: "Vẻ đẹp hoàn toàn tự nhiên, chưa từng can thiệp",
          maritalStatus: "Độc thân, chưa từng sinh con",
          education: "Cao đẳng / Đại học",
          languages: "Thành thạo / Lưu loát (Tương đương IELTS 6.5 trở lên)",
          skills: "Catwalk, Diễn xuất trước ống kính, Thuyết trình",
          experience: "Đại sứ thương hiệu VNP 2026, Top 10 Face of Vietnam",
          tiktokUrl: "https://tiktok.com/@maianh",
          instagramUrl: "https://instagram.com/maianh",
          facebookUrl: "https://facebook.com/maianh",
          youtubeUrl: "https://youtube.com/maianh",
          tiktokFollowers: "80000",
          instagramFollowers: "30000",
          facebookFollowers: "10000",
          youtubeFollowers: "0",
          followersCount: "120000",
          surveyScores: {
            pageant: 15,
            runway: 80,
            kol: 10
          },
          mainCategory: "Người mẫu Runway chuyên nghiệp",
          profileScore: 100,
          tier: "A",
          isOnboarded: true,
          avatar: "/avatar.png",
          skillsList: ["Catwalk", "Diễn xuất trước ống kính", "Thuyết trình"],
          languagesList: ["Tiếng Việt", "Tiếng Anh (IELTS 7.5)"],
          mediaUploads: {
            avatar: "maianh_avatar.jpg",
            portfolio: "portfolio_cv_maianh.pdf",
            introVideo: "video_introduction.mp4"
          }
        };
        localStorage.setItem("vnp_talent_profile", JSON.stringify(defaultProfile));
      } else {
        try {
          const parsed = JSON.parse(existingProfile);
          if (parsed && (parsed.avatar?.includes("unsplash.com") || !parsed.avatar)) {
            parsed.avatar = "/avatar.png";
            localStorage.setItem("vnp_talent_profile", JSON.stringify(parsed));
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
    
    setHistoryList(parsedHistory);
    setShowHistoryDashboard(true);
  }, []);

  const handleViewHistoryDetail = (entry: any) => {
    setResults({
      pageant: entry.pageant,
      runway: entry.runway,
      kol: entry.kol,
      mainCategory: entry.mainCategory,
      tier: entry.tier,
      profileScore: entry.profileScore,
      date: entry.date,
      hardRules: {
        strictPageantAllowed: true,
        runwayAllowed: entry.runway >= 50,
        hasLanguagePriority: entry.pageant >= 70
      }
    });
    setIsSubmitted(true);
    setShowHistoryDashboard(false);
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSurveySelect = (qId: number, optionIdx: number) => {
    setSurveyAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
    // Auto advance to next question after short delay for optimal speed & comfort
    if (activeSurveyQIdx < SURVEY_QUESTIONS.length - 1) {
      setTimeout(() => {
        setActiveSurveyQIdx((prev) => prev + 1);
      }, 350);
    }
  };

  // Check completeness and provide real-time feedback: "Hồ sơ của bạn đã hoàn thiện [X]%"
  const getCompletenessPercent = () => {
    if (isSubmitted) return 100;
    
    let basePct = 0;
    if (step === 1) {
      // Basic info inputs filled ratio
      let count = 0;
      if (formData.name) count++;
      if (formData.birthYear) count++;
      if (formData.location) count++;
      if (formData.hometown) count++;
      if (formData.phone) count++;
      if (formData.email) count++;
      if (mediaUploads.avatar) count++;
      basePct = Math.round((count / 7) * 20); // max 20%
    } else if (step === 2) {
      basePct = 20;
      let count = 0;
      if (formData.height) count++;
      if (formData.weight) count++;
      if (formData.bust) count++;
      if (formData.waist) count++;
      if (formData.hips) count++;
      basePct += Math.round((count / 5) * 20); // max 40%
    } else if (step === 3) {
      basePct = 40;
      let count = 0;
      if (formData.education) count++;
      if (formData.languages) count++;
      if (formData.skills) count++;
      basePct += Math.round((count / 3) * 20); // max 60%
    } else if (step === 4) {
      basePct = 60;
      let count = 0;
      if (getTotalFollowers() > 0) count++;
      if (formData.tiktokUrl || formData.instagramUrl || formData.facebookUrl || formData.youtubeUrl) count++;
      if (mediaUploads.portfolio) count++;
      basePct += Math.round((count / 3) * 20); // max 80%
    } else if (step === 5) {
      basePct = 80;
      // Survey answered count ratio
      const answeredCount = Object.keys(surveyAnswers).length;
      basePct += Math.round((answeredCount / SURVEY_QUESTIONS.length) * 20); // max 100%
    }
    return Math.min(100, basePct);
  };

  const isStepValid = () => {
    if (step === 1) {
      return formData.name.trim() !== "" && formData.phone.trim() !== "" && formData.email.trim() !== "";
    }
    if (step === 2) {
      return formData.height.trim() !== "" && formData.weight.trim() !== "" && formData.bust.trim() !== "" && formData.waist.trim() !== "" && formData.hips.trim() !== "";
    }
    if (step === 3) {
      return formData.education.trim() !== "" && formData.skills.trim() !== "";
    }
    if (step === 4) {
      return mediaUploads.portfolio !== null;
    }
    if (step === 5) {
      // Valid if all 20 questions are answered
      return SURVEY_QUESTIONS.every((q) => surveyAnswers[q.id] !== undefined);
    }
    return true;
  };

  const nextStep = () => {
    if (step < 5 && isStepValid()) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleMockUpload = (field: keyof typeof mediaUploads, fileName: string) => {
    setMediaUploads(prev => ({ ...prev, [field]: fileName }));
  };

  const handleRegisterComp = (compName: string) => {
    setRegisteredComp(prev => ({ ...prev, [compName]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStepValid()) return;

    // Hard Rules checks (Q1 - Q10)
    // Rule 1: Married or Major Surgery -> Excluded from strict national pageants
    const isMarriedOrChild = formData.maritalStatus === "Đã kết hôn / Đã sinh con";
    const hasMajorSurgery = formData.plasticSurgery === "Đã đại phẫu (Nâng mũi, nâng ngực, gọt hàm...)";
    const strictPageantAllowed = !isMarriedOrChild && !hasMajorSurgery;

    // Rule 2: Height < 165cm -> Excluded from Runway Model
    const heightVal = parseFloat(formData.height) || 0;
    const runwayAllowed = heightVal >= 165;

    // Rule 3: English proficient -> priority points
    const hasLanguagePriority = formData.languages.includes("Thành thạo");

    // Survey grading algorithm
    let countA = 0;
    let countB = 0;
    let countC = 0;

    SURVEY_QUESTIONS.forEach((q) => {
      const answerIdx = surveyAnswers[q.id];
      if (answerIdx !== undefined) {
        const group = q.options[answerIdx].group;
        if (group === "A") countA++;
        if (group === "B") countB++;
        if (group === "C") countC++;
      }
    });

    // 20 questions total. Each A/B/C choice is 3 points. Total maximum is 60.
    const scoreA = countA * 3;
    const scoreB = countB * 3;
    const scoreC = countC * 3;

    let pageantPct = Math.round((scoreA / 60) * 100);
    let runwayPct = Math.round((scoreB / 60) * 100);
    let kolPct = Math.round((scoreC / 60) * 100);

    // Apply Hard Rules to the scores/outcomes
    if (!runwayAllowed) {
      runwayPct = Math.max(0, runwayPct - 30); // Heavily penalize runway if height is insufficient
    }

    if (hasLanguagePriority) {
      pageantPct = Math.min(100, pageantPct + 5); // Add small priority bonus to pageant
    }

    // Determine highest score category
    let mainCategory = "Người đẹp thương hiệu / KOLs / Giải trí & Thế hệ mới";
    if (pageantPct >= runwayPct && pageantPct >= kolPct) {
      mainCategory = "Hoa hậu / Hoa khôi truyền thống & Nhân ái";
    } else if (runwayPct >= pageantPct && runwayPct >= kolPct && runwayAllowed) {
      mainCategory = "Người mẫu Runway chuyên nghiệp";
    }

    // Profile completeness score
    const completeness = getCompletenessPercent();

    // Determine Tier rating based on evaluation score (0-100)
    const evaluationScore = Math.max(pageantPct, runwayPct, kolPct);
    let tier: "S" | "A" | "B" | "C" | "Potential" = "C";

    if (evaluationScore >= 90) {
      tier = "S";
    } else if (evaluationScore >= 70) {
      tier = "A";
    } else if (evaluationScore >= 45) {
      tier = "B";
    } else if (evaluationScore >= 20) {
      tier = "C";
    } else {
      tier = "Potential";
    }

    const computedResults = {
      pageant: pageantPct,
      runway: runwayPct,
      kol: kolPct,
      mainCategory,
      tier,
      profileScore: evaluationScore,
      date: new Date().toLocaleString("vi-VN"),
      hardRules: {
        strictPageantAllowed,
        runwayAllowed,
        hasLanguagePriority
      }
    };

    setResults(computedResults);

    // Save to history list in local storage
    const newHistoryEntry = {
      id: Date.now(),
      date: computedResults.date,
      mainCategory,
      tier,
      pageant: pageantPct,
      runway: runwayPct,
      kol: kolPct,
      profileScore: evaluationScore
    };

    let updatedHistory: any[] = [];
    const existingHistory = localStorage.getItem("vnp_talent_survey_history");
    if (existingHistory) {
      try {
        updatedHistory = JSON.parse(existingHistory);
        if (!Array.isArray(updatedHistory)) {
          updatedHistory = [];
        }
      } catch (e) {
        updatedHistory = [];
      }
    }
    updatedHistory.unshift(newHistoryEntry);
    localStorage.setItem("vnp_talent_survey_history", JSON.stringify(updatedHistory));
    setHistoryList(updatedHistory);

    // Save to local storage for other views in the application
    const userProfile = {
      ...formData,
      followersCount: getTotalFollowers().toString(),
      surveyScores: {
        pageant: pageantPct,
        runway: runwayPct,
        kol: kolPct
      },
      mainCategory,
      profileScore: evaluationScore,
      tier,
      isOnboarded: true,
      avatar: mediaUploads.avatar ? `/uploads/${mediaUploads.avatar}` : "/avatar.png",
      skills: formData.skills.split(",").map(s => s.trim()),
      languages: formData.languages.split(",").map(s => s.trim()),
      mediaUploads
    };
    localStorage.setItem("vnp_talent_profile", JSON.stringify(userProfile));

    setIsSubmitted(true);
  };

  // SVG Radar Points calculation (center at 100, 100, radius 70)
  const calculateRadarPath = () => {
    const cx = 100;
    const cy = 100;
    const maxVal = 100;
    const radius = 70;

    const getCoords = (val: number, angleDeg: number) => {
      const rad = (angleDeg - 90) * (Math.PI / 180);
      const dist = (val / maxVal) * radius;
      return {
        x: cx + dist * Math.cos(rad),
        y: cy + dist * Math.sin(rad)
      };
    };

    const ptPageant = getCoords(results.pageant, 0); // 12 o'clock
    const ptRunway = getCoords(results.runway, 120); // 4 o'clock
    const ptKol = getCoords(results.kol, 240); // 8 o'clock

    return `${ptPageant.x},${ptPageant.y} ${ptRunway.x},${ptRunway.y} ${ptKol.x},${ptKol.y}`;
  };

  // Dynamic Suggest 3 Competitions based on Results
  const getSuggestedCompetitions = () => {
    const isPageantHighest = results.pageant >= results.runway && results.pageant >= results.kol;
    const isRunwayHighest = results.runway >= results.pageant && results.runway >= results.kol && results.hardRules.runwayAllowed;

    if (isPageantHighest) {
      if (results.hardRules.strictPageantAllowed) {
        return [
          { name: "Miss World Vietnam 2026", type: "Pageant Sắc Đẹp Quốc Gia", deadline: "30/08/2026", status: "Đang mở đơn" },
          { name: "Hoa hậu Việt Nam 2026", type: "Pageant Truyền Thống Việt Nam", deadline: "15/10/2026", status: "Đang mở đơn" },
          { name: "Hoa khôi Du lịch Việt Nam 2026", type: "Pageant Quảng Bá Du Lịch", deadline: "20/09/2026", status: "Đang mở đơn" }
        ];
      } else {
        return [
          { name: "Mrs Vietnam Pageant 2026", type: "Hoa Hậu Quý Bà Việt Nam", deadline: "10/09/2026", status: "Đang mở đơn" },
          { name: "Hoa khôi Doanh nhân Việt Nam 2026", type: "Cuộc Thi Sắc Đẹp Doanh Nhân", deadline: "05/11/2026", status: "Đang mở đơn" },
          { name: "Miss Grand Vietnam 2026", type: "Pageant Sắc Đẹp Giải Trí", deadline: "25/08/2026", status: "Đang mở đơn" }
        ];
      }
    } else if (isRunwayHighest) {
      return [
        { name: "The New Mentor 2026", type: "Truyền Hình Thực Tế Runway", deadline: "10/08/2026", status: "Đang mở đơn" },
        { name: "Vietnam's Next Top Model 2026", type: "Người Mẫu Runway Chuyên Nghiệp", deadline: "15/09/2026", status: "Đang mở đơn" },
        { name: "Supermodel Vietnam 2026", type: "Tìm Kiếm Siêu Mẫu Quốc Gia", deadline: "01/10/2026", status: "Đang mở đơn" }
      ];
    } else {
      return [
        { name: "Miss Grand Vietnam 2026", type: "Pageant Sắc Đẹp Giải Trí", deadline: "25/08/2026", status: "Đang mở đơn" },
        { name: "The Face Vietnam 2026", type: "Gương Mặt Thương Hiệu / KOLs", deadline: "05/09/2026", status: "Đang mở đơn" },
        { name: "VNP KOL/KOC Tournament 2026", type: "Đại Sứ Thương Hiệu Thế Hệ Mới", deadline: "12/10/2026", status: "Đang mở đơn" }
      ];
    }
  };

  const activeQuestion = SURVEY_QUESTIONS[activeSurveyQIdx];
  const completenessPercent = getCompletenessPercent();

  // Setup Tier style attributes
  let tierStyles = {
    wrapperBorder: "border-teal-500/30",
    glowBg: "shadow-[0_0_20px_rgba(20,184,166,0.12)]",
    badgeColor: "bg-teal-500/10 text-teal-300 border-teal-500/30",
    gradientText: "text-teal-300",
    aura: "bg-teal-500/5"
  };

  if (results.tier === "S") {
    tierStyles = {
      wrapperBorder: "border-amber-400/40",
      glowBg: "shadow-[0_0_35px_rgba(245,158,11,0.25)]",
      badgeColor: "bg-amber-400/15 text-amber-300 border-amber-400/40",
      gradientText: "bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 bg-clip-text text-transparent font-black",
      aura: "bg-amber-500/10"
    };
  } else if (results.tier === "A") {
    tierStyles = {
      wrapperBorder: "border-slate-300/40",
      glowBg: "shadow-[0_0_30px_rgba(203,213,225,0.22)]",
      badgeColor: "bg-slate-300/10 text-slate-100 border-slate-300/40",
      gradientText: "bg-gradient-to-r from-slate-100 via-slate-300 to-slate-400 bg-clip-text text-transparent font-extrabold",
      aura: "bg-slate-300/5"
    };
  } else if (results.tier === "Potential") {
    tierStyles = {
      wrapperBorder: "border-rose-500/40",
      glowBg: "shadow-[0_0_30px_rgba(244,63,94,0.2)]",
      badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/30",
      gradientText: "text-rose-400 font-black tracking-wide",
      aura: "bg-rose-500/5"
    };
  }

  if (isSubmitted) {
    const sortedJobs = JOBS_LIST.map((job) => {
      const matchScore = Math.round(
        results.pageant * job.weights.pageant +
        results.runway * job.weights.runway +
        results.kol * job.weights.kol
      );
      return { ...job, matchScore };
    }).sort((a, b) => b.matchScore - a.matchScore);

    const suggestedComps = getSuggestedCompetitions();

    return (
      <div className={cn(
        "w-full max-w-6xl mx-auto bg-[#070913]/90 p-6 md:p-10 rounded-3xl border transition-all duration-700 animate-in fade-in slide-in-from-bottom-8",
        tierStyles.wrapperBorder,
        tierStyles.glowBg
      )}>
        <div className={cn("absolute -top-12 -right-12 h-64 w-64 rounded-full blur-[100px] -z-10 pointer-events-none", tierStyles.aura)} />
        <div className="absolute -bottom-12 -left-12 h-64 w-64 rounded-full blur-[100px] -z-10 bg-slate-900 pointer-events-none" />

        {/* Back to history button row */}
        {historyList.length > 0 && (
          <div className="flex justify-between items-center pb-4 border-b border-white/5 mb-6">
            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false);
                setShowHistoryDashboard(true);
              }}
              className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Quay lại lịch sử khảo sát
            </button>
            <div className="text-[9px] font-bold text-slate-500 bg-white/5 px-2 py-0.5 rounded">
              Thời gian: {results.date || "Vừa thực hiện"}
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-10 items-stretch">
          {/* LEFT SIDE: Radar Chart & Tier & Status checks */}
          <div className="lg:w-[42%] flex flex-col justify-between space-y-8 border-b lg:border-b-0 lg:border-r border-white/5 pb-8 lg:pb-0 lg:pr-8">
            <div className="text-center lg:text-left">
              <div className="inline-flex mb-3.5 items-center gap-1.5 rounded-full bg-amber-400/10 px-3 py-1 text-[10px] font-bold text-amber-300 uppercase tracking-wider border border-amber-400/25">
                <Sparkles className="h-3 w-3 animate-pulse" /> AI Diagnostic Completed
              </div>
              <h2 className="font-display text-2xl font-black tracking-tight text-white uppercase leading-tight">
                KẾT QUẢ ĐỊNH HƯỚNG
              </h2>
              <p className="text-[11px] text-slate-400 mt-1">
                Thuật toán đã đối soát 10 thông số cơ bản & chấm điểm 20 câu hỏi trắc nghiệm.
              </p>
            </div>

            {/* Radar SVG */}
            <div className="relative mx-auto my-2 flex h-56 w-56 items-center justify-center rounded-2xl border border-white/5 bg-[#03050c]/60 p-4 shadow-inner">
              <svg viewBox="0 0 200 200" className="h-full w-full">
                <polygon points="100,30 160,135 40,135" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                <polygon points="100,50 142,123 58,123" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                <polygon points="100,70 125,112 75,112" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                <polygon points="100,90 108,102 92,102" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

                <line x1="100" y1="100" x2="100" y2="30" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                <line x1="100" y1="100" x2="160" y2="135" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                <line x1="100" y1="100" x2="40" y2="135" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

                <polygon
                  points={calculateRadarPath()}
                  fill="rgba(245,158,11,0.12)"
                  stroke="url(#radarGoldGradient)"
                  strokeWidth="2.5"
                  className="animate-in zoom-in-50 duration-1000"
                />

                <circle cx="100" cy="30" r="1.5" fill="#f5a623" />
                <circle cx="160" cy="135" r="1.5" fill="#a855f7" />
                <circle cx="40" cy="135" r="1.5" fill="#14b8a6" />

                <text x="100" y="20" fill="#f5a623" fontSize="8.5" fontWeight="bold" textAnchor="middle">PAGEANT ({results.pageant}%)</text>
                <text x="172" y="145" fill="#a855f7" fontSize="8.5" fontWeight="bold" textAnchor="end">RUNWAY ({results.runway}%)</text>
                <text x="28" y="145" fill="#14b8a6" fontSize="8.5" fontWeight="bold" textAnchor="start">KOL ({results.kol}%)</text>

                <defs>
                  <linearGradient id="radarGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fef08a" />
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#d97706" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="w-full space-y-4">
              <div className="rounded-xl border border-white/5 bg-[#03050c]/80 p-4">
                <span className="block text-[8px] text-slate-500 uppercase tracking-widest font-black">Nhóm Định Hướng Cốt Lõi</span>
                <span className="block text-xs font-bold text-white mt-1.5 flex items-center gap-1.5">
                  <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                  {results.mainCategory}
                </span>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-1 rounded-xl border border-white/5 bg-[#03050c]/80 p-3 text-center">
                  <span className="block text-[8px] text-slate-500 uppercase tracking-widest font-black">Xếp Hạng Tier</span>
                  <span className={cn("text-lg font-black mt-1 block tracking-wider", tierStyles.gradientText)}>
                    {results.tier === "Potential" ? "Potential" : `Tier ${results.tier}`}
                  </span>
                </div>
                <div className="flex-1 rounded-xl border border-white/5 bg-[#03050c]/80 p-3 text-center">
                  <span className="block text-[8px] text-slate-500 uppercase tracking-widest font-black">Độ Hoàn Thiện</span>
                  <span className="text-lg font-black text-slate-200 mt-1 block">
                    {results.profileScore}/100
                  </span>
                </div>
              </div>

              {/* Hard Rules analysis section */}
              <div className="rounded-xl border border-white/5 bg-[#03050c]/40 p-4 space-y-2.5">
                <span className="block text-[8px] text-slate-500 uppercase tracking-widest font-black">Đánh Giá Điều Kiện Cần (Hard Rules Check)</span>
                
                <div className="flex items-start gap-2.5 text-[10px]">
                  {results.hardRules.strictPageantAllowed ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                      <span className="text-slate-300 leading-normal">Đủ tiêu chuẩn nhân thân / thẩm mỹ cho các cuộc thi Quốc gia chính thống (Hoa hậu VN, Miss World...)</span>
                    </>
                  ) : (
                    <>
                      <ShieldAlert className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                      <span className="text-slate-400 leading-normal">Có can thiệp đại phẫu hoặc tình trạng hôn nhân đặc thù. Khuyên dùng: Mrs Pageant, Hoa khôi du lịch, Model/KOL.</span>
                    </>
                  )}
                </div>

                <div className="flex items-start gap-2.5 text-[10px]">
                  {results.hardRules.runwayAllowed ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                      <span className="text-slate-300 leading-normal">Chiều cao đạt tiêu chuẩn Catwalk chuyên nghiệp (&ge;1m65).</span>
                    </>
                  ) : (
                    <>
                      <Info className="h-4 w-4 shrink-0 text-slate-500 mt-0.5" />
                      <span className="text-slate-400 leading-normal">Chiều cao dưới 1m65. Phù hợp hướng tới KOL, Photo Model, hoặc Review thương mại.</span>
                    </>
                  )}
                </div>

                {results.hardRules.hasLanguagePriority && (
                  <div className="flex items-start gap-2.5 text-[10px]">
                    <Sparkles className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                    <span className="text-amber-300/90 leading-normal font-medium">Trình độ tiếng Anh xuất sắc. Có điểm ưu tiên đặc cách khi xét duyệt đại diện Việt Nam thi Quốc tế.</span>
                  </div>
                )}
              </div>

              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setStep(1);
                    setActiveSurveyQIdx(0);
                    setSurveyAnswers({});
                    setShowHistoryDashboard(false);
                  }}
                  className="flex h-11 w-full items-center justify-center rounded-xl border border-white/10 bg-transparent hover:bg-white/5 hover:text-white font-display text-xs font-bold text-slate-300 transition-all cursor-pointer"
                >
                  Làm lại bài khảo sát
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/talent/portfolio")}
                  className="flex h-11 w-full items-center justify-center rounded-xl bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 font-display text-xs font-bold text-[#070913] shadow-lg hover:shadow-amber-500/10 hover:brightness-105 active:scale-98 transition-all cursor-pointer"
                >
                  Chuyển đến hồ sơ cá nhân <ArrowRight className="ml-1.5 h-4 w-4" />
                </button>
                
                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => router.push("/talent/dashboard")}
                    className="text-[10px] text-slate-500 hover:text-slate-300 underline transition-colors cursor-pointer"
                  >
                    Về trang chủ Dashboard
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: 20 Suitable Jobs & Suggest 3 Open Competitions */}
          <div className="flex-1 space-y-6 flex flex-col">
            {/* Suggested Open Competitions */}
            <div>
              <h3 className="font-display font-extrabold text-[11px] text-white uppercase tracking-wider flex items-center gap-2">
                <Trophy className="h-4 w-4 text-amber-400" />
                Gợi Ý Cuộc Thi Phù Hợp (Đăng ký nhanh)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                {suggestedComps.map((comp, idx) => (
                  <div 
                    key={idx} 
                    className="flex flex-col justify-between rounded-xl border border-white/5 bg-[#03050c]/80 p-3.5 hover:border-amber-400/25 transition-all duration-300 relative group"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-1">
                        <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wider">{comp.type}</span>
                        <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                      </div>
                      <h4 className="font-bold text-xs text-white mt-1 group-hover:text-amber-300 transition-colors">{comp.name}</h4>
                      <p className="text-[9px] text-slate-500 mt-0.5">Hạn đơn: {comp.deadline}</p>
                    </div>

                    <button
                      onClick={() => handleRegisterComp(comp.name)}
                      disabled={registeredComp[comp.name]}
                      className={cn(
                        "mt-3.5 w-full h-8 rounded-lg text-[9px] font-bold transition-all flex items-center justify-center gap-1",
                        registeredComp[comp.name]
                          ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                          : "bg-white/5 hover:bg-amber-400/10 border border-white/10 hover:border-amber-400/30 text-slate-300 hover:text-amber-300"
                      )}
                    >
                      {registeredComp[comp.name] ? <>Đã nộp đơn ✔</> : <>Đăng ký qua VNP</>}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* List of 20 Career Suitability */}
            <div className="flex-1 flex flex-col min-h-0">
              <div>
                <h3 className="font-display font-extrabold text-[11px] text-white uppercase tracking-wider flex items-center gap-2">
                  <Star className="h-4 w-4 text-purple-400" />
                  Mức Độ Phù Hợp 20 Việc Làm Xu Hướng (AI Scored)
                </h3>
                <p className="text-[9.5px] text-slate-500 mt-0.5">
                  Xếp hạng các vị trí công việc từ cao xuống thấp dựa trên chỉ số năng lực của bạn:
                </p>
              </div>

              {/* Scroll Container */}
              <div className="flex-1 overflow-y-auto max-h-[300px] pr-2 space-y-2 mt-3 custom-scrollbar border-t border-white/5 pt-3">
                {sortedJobs.map((job, idx) => {
                  const isHigh = job.matchScore >= 80;
                  const isMid = job.matchScore >= 50 && job.matchScore < 80;

                  return (
                    <div
                      key={job.id}
                      className="flex items-center gap-3 rounded-xl border border-white/5 bg-[#03050c]/60 p-2.5 hover:bg-slate-900/10 hover:border-white/10 transition-all duration-300 group"
                    >
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-white/5 text-[9px] font-bold text-slate-500 group-hover:bg-amber-400/10 group-hover:text-amber-400 transition-all">
                        {idx + 1}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h4 className="text-[11px] font-bold text-slate-200 group-hover:text-amber-400 transition-colors duration-300 truncate">
                            {job.title}
                          </h4>
                          <span className={cn(
                            "font-display text-[10px] font-black tracking-tighter",
                            isHigh ? "text-amber-400" : isMid ? "text-purple-400" : "text-slate-500"
                          )}>
                            {job.matchScore}% Match
                          </span>
                        </div>
                        <p className="text-[9.5px] text-slate-500 truncate mt-0.5">{job.desc}</p>
                        
                        <div className="h-1 w-full bg-slate-950 rounded-full overflow-hidden mt-1.5">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all duration-500",
                              isHigh ? "bg-gradient-to-r from-amber-300 to-amber-500" : isMid ? "bg-purple-500" : "bg-slate-700"
                            )}
                            style={{ width: `${job.matchScore}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showHistoryDashboard) {
    return (
      <div className="w-full max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
        
        {/* CARD 2: Lịch Sử Khảo Sát & Định Hướng */}
        <div className="bg-[#070913]/95 p-6 md:p-8 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden transition-all duration-500">
          <div className="absolute top-0 right-0 -z-10 h-32 w-32 bg-amber-400/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -z-10 h-32 w-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />

          <div className="border-b border-white/5 pb-4 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-xl font-black text-white uppercase tracking-tight">
                Lịch Sử Khảo Sát & Định Hướng
              </h2>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed text-left">
                Xem lại kết quả chẩn đoán năng lực sắc đẹp và lịch sử làm khảo sát của bạn.
              </p>
            </div>
            
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => router.push("/talent/portfolio")}
                className="h-9 px-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white text-[10px] font-bold text-slate-300 transition-all cursor-pointer"
              >
                Hồ Sơ Cá Nhân
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowHistoryDashboard(false);
                  setIsSubmitted(false);
                  setStep(1);
                  setActiveSurveyQIdx(0);
                  setSurveyAnswers({});
                }}
                className="h-9 px-4 rounded-lg bg-gradient-to-r from-amber-200 to-amber-500 text-[10px] font-bold text-[#070913] hover:brightness-105 transition-all cursor-pointer"
              >
                Làm Khảo Sát Mới
              </button>
            </div>
          </div>

          {/* History Log list */}
          <div className="space-y-4">
            <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-black text-left">Các lượt khảo sát đã thực hiện</span>
            
            <div className="rounded-2xl border border-white/5 bg-[#03050c]/60 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/2 text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="py-3 px-4">Thời gian</th>
                      <th className="py-3 px-4">Định hướng cốt lõi</th>
                      <th className="py-3 px-4 text-center">Phân hạng (Tier)</th>
                      <th className="py-3 px-4 text-center">Tương thích</th>
                      <th className="py-3 px-4 text-center">Độ hoàn thiện</th>
                      <th className="py-3 px-4 text-right">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-[11px]">
                    {historyList.map((entry: any) => (
                      <tr key={entry.id} className="hover:bg-white/2 transition-colors group">
                        <td className="py-3.5 px-4 font-medium text-slate-300">{entry.date}</td>
                        <td className="py-3.5 px-4 text-slate-200">
                          <span className="flex items-center gap-1.5 font-bold">
                            <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                            {entry.mainCategory}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className={cn(
                            "inline-block px-2 py-0.5 rounded text-[9px] font-extrabold tracking-wider border",
                            entry.tier === "S" ? "bg-amber-400/10 text-amber-300 border-amber-400/30" :
                            entry.tier === "A" ? "bg-slate-300/10 text-slate-100 border-slate-300/30" :
                            entry.tier === "B" ? "bg-purple-500/10 text-purple-300 border-purple-500/30" :
                            entry.tier === "C" ? "bg-teal-500/10 text-teal-300 border-teal-500/30" :
                            "bg-rose-500/10 text-rose-300 border-rose-500/30"
                          )}>
                            {entry.tier === "Potential" ? "Potential" : `Tier ${entry.tier}`}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center text-[10px] text-slate-400">
                          P: <strong className="text-amber-400 font-bold">{entry.pageant}%</strong> | 
                          R: <strong className="text-purple-400 font-bold">{entry.runway}%</strong> | 
                          K: <strong className="text-teal-400 font-bold">{entry.kol}%</strong>
                        </td>
                        <td className="py-3.5 px-4 text-center text-slate-300 font-bold">{entry.profileScore}/100</td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => handleViewHistoryDetail(entry)}
                            className="inline-flex items-center gap-1 text-[9px] font-bold text-amber-400 hover:text-amber-300 transition-colors uppercase cursor-pointer"
                          >
                            Xem Lại <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Info advice box */}
          <div className="mt-6 rounded-xl border border-amber-400/10 bg-amber-400/5 p-4 flex items-start gap-3">
            <Info className="h-4.5 w-4.5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-[10px] text-slate-400 leading-relaxed text-left">
              <strong className="text-amber-300 font-bold">Lời khuyên từ AI:</strong> Định hướng nghề nghiệp của bạn có thể thay đổi dựa trên các số liệu nhân trắc hoặc mức độ phủ sóng truyền thông (Followers) cập nhật mới. Bạn nên làm lại bài khảo sát định kỳ 3 tháng một lần để cập nhật chẩn đoán chính xác nhất từ hệ thống.
            </div>
          </div>
        </div>

      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto rounded-3xl border border-white/5 bg-[#070913]/95 p-6 md:p-8 shadow-2xl relative overflow-hidden transition-all duration-500">
      
      {/* Top ambient glow light */}
      <div className="absolute top-0 right-0 -z-10 h-32 w-32 bg-amber-400/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -z-10 h-32 w-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Modern Stepper Header Progress */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">
              Khảo Sát: Bước {step} / 5
            </span>
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 text-slate-400 font-medium">
              {step === 1 && "Thông tin cơ bản"}
              {step === 2 && "Nhân trắc học"}
              {step === 3 && "Học vấn & Kỹ năng"}
              {step === 4 && "Social & Portfolio"}
              {step === 5 && "Khảo sát định hướng"}
            </span>
          </div>
          {/* Micro feedback text */}
          <p className="text-[10px] text-slate-500 mt-1">
            Hồ sơ định hướng của bạn đã hoàn thiện <strong className="text-amber-400 font-bold">{completenessPercent}%</strong>
          </p>
        </div>

        {/* Step indicators / History link */}
        <div className="flex items-center gap-4">
          {historyList.length > 0 && (
            <button
              type="button"
              onClick={() => setShowHistoryDashboard(true)}
              className="text-[10px] font-bold text-slate-400 hover:text-white transition-colors underline cursor-pointer"
            >
              Xem lịch sử khảo sát
            </button>
          )}
          
          <div className="flex items-center gap-1 w-full md:w-48">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-all duration-500",
                  s <= step ? "bg-gradient-to-r from-amber-200 to-amber-500" : "bg-white/5"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-left">
        
        {/* STEP 1: BASIC INFO (Widescreen Two-Column Layout) */}
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start animate-in fade-in duration-300">
            {/* Left: Avatar Dropzone */}
            <div className="md:col-span-4 flex flex-col items-center space-y-4">
              <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider self-start">Ảnh Đại Diện *</span>
              
              <div 
                onClick={() => handleMockUpload("avatar", "maianh_avatar.jpg")}
                className={cn(
                  "w-full aspect-square max-w-[200px] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-300 relative overflow-hidden group",
                  mediaUploads.avatar 
                    ? "border-emerald-500/50 bg-[#03050c]/60" 
                    : "border-white/10 bg-[#03050c]/40 hover:border-amber-400/40 hover:bg-[#03050c]/60"
                )}
              >
                {mediaUploads.avatar ? (
                  <div className="text-center p-4">
                    <CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto mb-2 animate-bounce" />
                    <span className="block text-[10px] text-slate-300 font-bold truncate max-w-[150px]">{mediaUploads.avatar}</span>
                    <span className="block text-[8px] text-emerald-400 font-bold mt-1 uppercase tracking-wide">Đã tải lên</span>
                  </div>
                ) : (
                  <div className="text-center p-4">
                    <Upload className="h-8 w-8 text-slate-500 group-hover:text-amber-400 transition-colors mx-auto mb-2" />
                    <span className="block text-[10px] text-slate-300 font-bold">Kéo thả hoặc click</span>
                    <span className="block text-[8px] text-slate-500 mt-1 leading-normal">PNG, JPG tối đa 5MB</span>
                  </div>
                )}
              </div>
              <p className="text-[9px] text-slate-500 text-center">Chọn ảnh rõ mặt, biểu cảm tự nhiên</p>
            </div>

            {/* Right: Inputs */}
            <div className="md:col-span-8 grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Họ và tên *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-white/10 bg-[#03050c]/60 px-4 py-3 text-xs text-white focus:border-amber-400 focus:outline-none transition-all placeholder-slate-600"
                  placeholder="Nguyễn Mai Anh"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Năm sinh *</label>
                <input
                  type="number"
                  name="birthYear"
                  value={formData.birthYear}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-white/10 bg-[#03050c]/60 px-4 py-3 text-xs text-white focus:border-amber-400 focus:outline-none transition-all"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Khu vực sinh sống *</label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-white/10 bg-[#03050c]/60 px-3.5 py-3 text-xs text-white focus:border-amber-400 focus:outline-none transition-all"
                >
                  <option value="Hà Nội">Hà Nội</option>
                  <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                  <option value="Khác">Tỉnh thành khác</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Quê quán *</label>
                <input
                  type="text"
                  name="hometown"
                  value={formData.hometown}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-white/10 bg-[#03050c]/60 px-4 py-3 text-xs text-white focus:border-amber-400 focus:outline-none transition-all placeholder-slate-600"
                  placeholder="Ví dụ: Nam Định"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Số điện thoại *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-white/10 bg-[#03050c]/60 px-4 py-3 text-xs text-white focus:border-amber-400 focus:outline-none transition-all"
                  placeholder="0912345678"
                  required
                />
              </div>

              <div className="col-span-2 space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Email liên hệ *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-white/10 bg-[#03050c]/60 px-4 py-3 text-xs text-white focus:border-amber-400 focus:outline-none transition-all placeholder-slate-600"
                  placeholder="maianh@gmail.com"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: ANTHROPOMETRICS (Widescreen Silhouette & Horizontal Inputs) */}
        {step === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
            {/* Left Column: Visual mannequin statistics showcase */}
            <div className="md:col-span-5 rounded-2xl border border-white/5 bg-[#03050c]/60 p-5 flex flex-col items-center justify-center space-y-4">
              <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider self-start">Ngoại hình</span>
              
              {/* Silhouette diagram with lines and custom measurement nodes */}
              <div className="relative w-full max-w-[160px] aspect-[1/2] border border-white/5 rounded-xl bg-[#070913]/80 flex items-center justify-center p-3">
                {/* SVG Silhouette representation */}
                <svg viewBox="0 0 100 200" className="h-full w-full opacity-45 text-slate-400">
                  {/* Elegant symmetric head */}
                  <circle cx="50" cy="18" r="6" fill="currentColor" />
                  {/* Elegant symmetric neck */}
                  <path d="M 48,24 C 48,27 48.5,28 48.5,30 L 51.5,30 C 51.5,28 52,27 52,24 Z" fill="currentColor" />
                  {/* Elegant symmetric mannequin body torso and legs */}
                  <path d="M 50,30 
                           C 42,30 36,32 34,36 
                           C 33,42 35,54 36,60 
                           C 38,68 43,76 43,84 
                           C 43,92 39,102 38,108 
                           L 42,178 
                           C 43,182 46,182 47,178 
                           L 50,120 
                           L 53,178 
                           C 54,182 57,182 58,178 
                           L 62,108 
                           C 61,102 57,92 57,84 
                           C 57,76 62,68 64,60 
                           C 65,54 67,42 66,36 
                           C 64,32 58,30 50,30 Z" 
                        fill="currentColor" />
                  
                  {/* Indicator nodes circles */}
                  <circle cx="50" cy="60" r="3.5" fill="#f5a623" />
                  <circle cx="50" cy="84" r="3.5" fill="#a855f7" />
                  <circle cx="50" cy="108" r="3.5" fill="#14b8a6" />
                </svg>
                
                {/* Measuring labels with direct values */}
                <div className="absolute top-[28%] left-[-24px] bg-[#03050c] px-2 py-0.5 rounded border border-white/10 text-[8px] font-bold text-slate-300 shadow-md">
                  Vòng 1: {formData.bust} cm
                </div>
                <div className="absolute top-[40%] right-[-24px] bg-[#03050c] px-2 py-0.5 rounded border border-white/10 text-[8px] font-bold text-slate-300 shadow-md">
                  Vòng 2: {formData.waist} cm
                </div>
                <div className="absolute top-[52%] left-[-24px] bg-[#03050c] px-2 py-0.5 rounded border border-white/10 text-[8px] font-bold text-slate-300 shadow-md">
                  Vòng 3: {formData.hips} cm
                </div>
              </div>

              {/* Height & Weight centered directly below the silhouette body */}
              <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-amber-400/10 border border-amber-400/25 text-[9.5px] font-bold text-amber-300 shadow-sm mt-1">
                <span>Chiều cao: <strong className="text-white">{formData.height} cm</strong></span>
                <span className="text-amber-500/40">|</span>
                <span>Cân nặng: <strong className="text-white">{formData.weight} kg</strong></span>
              </div>
            </div>

            {/* Right Column: Numeric Inputs row & dropdowns */}
            <div className="md:col-span-7 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Chiều cao (cm) *</label>
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-white/10 bg-[#03050c]/60 px-4 py-3 text-xs text-white focus:border-amber-400 focus:outline-none transition-all"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Cân nặng (kg) *</label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-white/10 bg-[#03050c]/60 px-4 py-3 text-xs text-white focus:border-amber-400 focus:outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* Three rings measurement laid out horizontally */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Số đo 3 vòng (cm) *</label>
                <div className="grid grid-cols-3 gap-3">
                  <div className="relative">
                    <span className="absolute right-3 top-3 text-[9px] font-bold text-slate-500">V1</span>
                    <input
                      type="number"
                      name="bust"
                      value={formData.bust}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-white/10 bg-[#03050c]/60 pl-4 pr-8 py-3 text-xs text-white text-left focus:border-amber-400 focus:outline-none transition-all font-bold"
                      required
                    />
                  </div>
                  <div className="relative">
                    <span className="absolute right-3 top-3 text-[9px] font-bold text-slate-500">V2</span>
                    <input
                      type="number"
                      name="waist"
                      value={formData.waist}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-white/10 bg-[#03050c]/60 pl-4 pr-8 py-3 text-xs text-white text-left focus:border-amber-400 focus:outline-none transition-all font-bold"
                      required
                    />
                  </div>
                  <div className="relative">
                    <span className="absolute right-3 top-3 text-[9px] font-bold text-slate-500">V3</span>
                    <input
                      type="number"
                      name="hips"
                      value={formData.hips}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-white/10 bg-[#03050c]/60 pl-4 pr-8 py-3 text-xs text-white text-left focus:border-amber-400 focus:outline-none transition-all font-bold"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Tình trạng thẩm mỹ *</label>
                <select
                  name="plasticSurgery"
                  value={formData.plasticSurgery}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-white/10 bg-[#03050c]/60 px-3.5 py-3 text-xs text-white focus:border-amber-400 focus:outline-none transition-all"
                >
                  <option value="Vẻ đẹp hoàn toàn tự nhiên, chưa từng can thiệp">Vẻ đẹp tự nhiên (chưa can thiệp)</option>
                  <option value="Đã can thiệp nhẹ (Làm răng, tiêm filler...)">Can thiệp nhẹ (Răng, filler...)</option>
                  <option value="Đã đại phẫu (Nâng mũi, nâng ngực, gọt hàm...)">Đã đại phẫu (Mũi, ngực, hàm...)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Tình trạng kết hôn & Con cái *</label>
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-white/10 bg-[#03050c]/60 px-3.5 py-3 text-xs text-white focus:border-amber-400 focus:outline-none transition-all"
                >
                  <option value="Độc thân, chưa từng sinh con">Độc thân, chưa từng sinh con</option>
                  <option value="Đã kết hôn / Đã sinh con">Đã kết hôn / Đã sinh con</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: EDUCATION & SKILLS (Two-Column Widescreen Layout) */}
        {step === 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start animate-in fade-in duration-300">
            {/* Left side: Education & languages */}
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Trình độ học vấn hiện tại *</label>
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-white/10 bg-[#03050c]/60 px-4 py-3 text-xs text-white focus:border-amber-400 focus:outline-none transition-all placeholder-slate-600"
                  placeholder="Ví dụ: Cử nhân Học viện Ngoại giao"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-bold">Ngoại ngữ (Ngăn cách bằng dấu phẩy) *</label>
                <select
                  name="languages"
                  value={formData.languages}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-white/10 bg-[#03050c]/60 px-3.5 py-3 text-xs text-white focus:border-amber-400 focus:outline-none transition-all"
                >
                  <option value="Giao tiếp cơ bản / Chưa có chứng chỉ">Giao tiếp cơ bản / Chưa có chứng chỉ</option>
                  <option value="Khá (Tương đương IELTS 5.0 - 6.0)">Khá (Tương đương IELTS 5.0 - 6.0)</option>
                  <option value="Thành thạo / Lưu loát (Tương đương IELTS 6.5 trở lên)">Thành thạo / Lưu loát (IELTS &ge; 6.5)</option>
                </select>
              </div>
            </div>

            {/* Right side: Skills & experience */}
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Kỹ năng nổi bật *</label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-white/10 bg-[#03050c]/60 px-4 py-3 text-xs text-white focus:border-amber-400 focus:outline-none transition-all placeholder-slate-600"
                  placeholder="Ví dụ: Catwalk, Diễn xuất trước ống kính, Livestream"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Kinh nghiệm cuộc thi / Công việc từng làm</label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full rounded-xl border border-white/10 bg-[#03050c]/60 px-4 py-3 text-xs text-white focus:border-amber-400 focus:outline-none transition-all placeholder-slate-600 resize-none"
                  placeholder="Ví dụ: Từng tham gia Miss Teen Việt Nam, làm người mẫu ảnh lookbook tự do 2 năm..."
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: SOCIAL & PORTFOLIO (Left Socials, Right Upload Zone) */}
        {step === 4 && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start animate-in fade-in duration-300">
            {/* Left: Social Media Profiles and Followers */}
            <div className="md:col-span-6 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Tổng số lượng Followers (Hệ thống tự tính) *</label>
                <div className="relative">
                  <input
                    type="text"
                    value={getTotalFollowers().toLocaleString("vi-VN")}
                    disabled
                    className="w-full rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-xs text-amber-400 font-bold focus:outline-none cursor-not-allowed opacity-90"
                  />
                  <span className="absolute right-3.5 top-3 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                  </span>
                </div>
              </div>

              <div className="space-y-2.5">
                <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Liên kết nền tảng & Số lượng Followers</span>
                
                {/* TikTok Row */}
                <div className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-8 relative">
                    <span className="absolute left-3 top-3 text-slate-400">
                      <TiktokIcon className="h-3.5 w-3.5 text-slate-400" />
                    </span>
                    <input
                      type="url"
                      name="tiktokUrl"
                      value={formData.tiktokUrl}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-white/10 bg-[#03050c]/60 pl-8 pr-3 py-2.5 text-[10px] text-white focus:border-amber-400 focus:outline-none transition-all placeholder-slate-600"
                      placeholder="TikTok Profile URL"
                    />
                  </div>
                  <div className="col-span-4 relative">
                    <span className="absolute right-2.5 top-3 text-[7px] font-bold text-slate-500 uppercase">Followers</span>
                    <input
                      type="number"
                      name="tiktokFollowers"
                      value={formData.tiktokFollowers}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-white/10 bg-[#03050c]/60 pl-2.5 pr-11 py-2.5 text-[10px] text-white focus:border-amber-400 focus:outline-none transition-all font-bold"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>

                {/* Instagram Row */}
                <div className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-8 relative">
                    <span className="absolute left-3 top-3 text-slate-400">
                      <InstagramIcon className="h-3.5 w-3.5 text-slate-400" />
                    </span>
                    <input
                      type="url"
                      name="instagramUrl"
                      value={formData.instagramUrl}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-white/10 bg-[#03050c]/60 pl-8 pr-3 py-2.5 text-[10px] text-white focus:border-amber-400 focus:outline-none transition-all placeholder-slate-600"
                      placeholder="Instagram Profile URL"
                    />
                  </div>
                  <div className="col-span-4 relative">
                    <span className="absolute right-2.5 top-3 text-[7px] font-bold text-slate-500 uppercase">Followers</span>
                    <input
                      type="number"
                      name="instagramFollowers"
                      value={formData.instagramFollowers}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-white/10 bg-[#03050c]/60 pl-2.5 pr-11 py-2.5 text-[10px] text-white focus:border-amber-400 focus:outline-none transition-all font-bold"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>

                {/* Facebook Row */}
                <div className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-8 relative">
                    <span className="absolute left-3 top-3 text-slate-400">
                      <FacebookIcon className="h-3.5 w-3.5 text-slate-400" />
                    </span>
                    <input
                      type="url"
                      name="facebookUrl"
                      value={formData.facebookUrl}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-white/10 bg-[#03050c]/60 pl-8 pr-3 py-2.5 text-[10px] text-white focus:border-amber-400 focus:outline-none transition-all placeholder-slate-600"
                      placeholder="Facebook Profile URL"
                    />
                  </div>
                  <div className="col-span-4 relative">
                    <span className="absolute right-2.5 top-3 text-[7px] font-bold text-slate-500 uppercase">Followers</span>
                    <input
                      type="number"
                      name="facebookFollowers"
                      value={formData.facebookFollowers}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-white/10 bg-[#03050c]/60 pl-2.5 pr-11 py-2.5 text-[10px] text-white focus:border-amber-400 focus:outline-none transition-all font-bold"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>

                {/* YouTube Row */}
                <div className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-8 relative">
                    <span className="absolute left-3 top-3 text-slate-400">
                      <YoutubeIcon className="h-3.5 w-3.5 text-slate-400" />
                    </span>
                    <input
                      type="url"
                      name="youtubeUrl"
                      value={formData.youtubeUrl}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-white/10 bg-[#03050c]/60 pl-8 pr-3 py-2.5 text-[10px] text-white focus:border-amber-400 focus:outline-none transition-all placeholder-slate-600"
                      placeholder="YouTube Channel URL"
                    />
                  </div>
                  <div className="col-span-4 relative">
                    <span className="absolute right-2.5 top-3 text-[7px] font-bold text-slate-500 uppercase">Followers</span>
                    <input
                      type="number"
                      name="youtubeFollowers"
                      value={formData.youtubeFollowers}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-white/10 bg-[#03050c]/60 pl-2.5 pr-11 py-2.5 text-[10px] text-white focus:border-amber-400 focus:outline-none transition-all font-bold"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Media upload zones (Portfolio book, Intro video) */}
            <div className="md:col-span-6 space-y-3.5">
              <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Hồ Sơ Năng Lực (Media Uploads)</span>
              
              <div className="grid grid-cols-2 gap-3.5">
                {/* Portfolio images / CV zone */}
                <div 
                  onClick={() => handleMockUpload("portfolio", "portfolio_cv_maianh.pdf")}
                  className={cn(
                    "rounded-xl border border-dashed p-5 cursor-pointer text-center transition-all duration-300 relative overflow-hidden group min-h-[140px] flex flex-col justify-center items-center",
                    mediaUploads.portfolio ? "border-emerald-500/50 bg-[#03050c]/60" : "border-white/10 bg-[#03050c]/40 hover:border-amber-400/40"
                  )}
                >
                  <FileText className={cn("h-7 w-7 mx-auto mb-2", mediaUploads.portfolio ? "text-emerald-400 animate-pulse" : "text-slate-500 group-hover:text-amber-400 transition-colors")} />
                  <span className="block text-[10px] text-slate-300 font-bold truncate">Portfolio / CV *</span>
                  <span className="block text-[7.5px] text-slate-500 mt-1">{mediaUploads.portfolio ? "Đã tải lên" : "Tải lên tệp PDF/ZIP/DOCX"}</span>
                  {mediaUploads.portfolio && (
                    <span className="block text-[8px] text-emerald-400 font-mono mt-1 truncate max-w-[120px]">{mediaUploads.portfolio}</span>
                  )}
                </div>

                {/* Intro video zone (Optional) */}
                <div 
                  onClick={() => handleMockUpload("introVideo", "video_introduction.mp4")}
                  className={cn(
                    "rounded-xl border border-dashed p-5 cursor-pointer text-center transition-all duration-300 relative overflow-hidden group min-h-[140px] flex flex-col justify-center items-center",
                    mediaUploads.introVideo ? "border-emerald-500/50 bg-[#03050c]/60" : "border-white/10 bg-[#03050c]/40 hover:border-amber-400/40"
                  )}
                >
                  <Video className={cn("h-7 w-7 mx-auto mb-2", mediaUploads.introVideo ? "text-emerald-400 animate-pulse" : "text-slate-500 group-hover:text-amber-400 transition-colors")} />
                  <span className="block text-[10px] text-slate-300 font-bold truncate">Video Giới Thiệu</span>
                  <span className="block text-[7.5px] text-slate-500 mt-1">{mediaUploads.introVideo ? "Đã tải lên (Tùy chọn)" : "Tải lên tệp MP4 (Không bắt buộc)"}</span>
                  {mediaUploads.introVideo && (
                    <span className="block text-[8px] text-emerald-400 font-mono mt-1 truncate max-w-[120px]">{mediaUploads.introVideo}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: ORIENTATION SURVEY (Single Question Card UI, zero scroll) */}
        {step === 5 && (
          <div className="space-y-6 animate-in fade-in duration-300 max-w-2xl mx-auto py-2">
            
            {/* Header: Question indicator & Inner survey progress */}
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <div>
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">
                  Định Hướng AI
                </span>
                <h4 className="text-[12px] font-bold text-slate-300 mt-0.5">
                  Câu hỏi {activeSurveyQIdx + 1} / {SURVEY_QUESTIONS.length}
                </h4>
              </div>
              <div className="text-[9px] font-bold text-slate-500 bg-white/5 px-2 py-0.5 rounded">
                Đã trả lời: {Object.keys(surveyAnswers).length} / {SURVEY_QUESTIONS.length}
              </div>
            </div>

            {/* Centered Question Box */}
            <div className="rounded-2xl border border-white/5 bg-[#03050c]/40 p-6 space-y-5 text-center">
              <span className="inline-block text-[9px] font-bold text-slate-500 uppercase tracking-wider">Năng lực ứng xử & Định hướng</span>
              <h3 className="font-display font-extrabold text-sm md:text-base text-white leading-relaxed max-w-xl mx-auto">
                {activeQuestion.question}
              </h3>

              {/* Stacked Options */}
              <div className="grid grid-cols-1 gap-2.5 max-w-xl mx-auto pt-2">
                {activeQuestion.options.map((opt, oIdx) => {
                  const isSelected = surveyAnswers[activeQuestion.id] === oIdx;
                  return (
                    <button
                      type="button"
                      key={oIdx}
                      onClick={() => handleSurveySelect(activeQuestion.id, oIdx)}
                      className={cn(
                        "flex items-center gap-3.5 rounded-xl border px-5 py-3.5 text-xs text-left cursor-pointer transition-all duration-300 w-full",
                        isSelected
                          ? "border-amber-400 bg-amber-400/10 text-amber-300 font-bold shadow-[0_0_15px_rgba(245,158,11,0.06)]"
                          : "border-white/5 bg-[#070913]/30 hover:bg-white/5 text-slate-400 hover:text-slate-300"
                      )}
                    >
                      <div className={cn(
                        "h-4 w-4 rounded-full border flex items-center justify-center shrink-0",
                        isSelected ? "border-amber-400" : "border-slate-600"
                      )}>
                        {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />}
                      </div>
                      <span className="leading-tight">{opt.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Inner survey navigation */}
            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={() => {
                  if (activeSurveyQIdx > 0) {
                    setActiveSurveyQIdx(prev => prev - 1);
                  } else {
                    // Go back to Step 4
                    setStep(4);
                  }
                }}
                className="flex h-9 items-center justify-center rounded-lg border border-white/10 px-4 text-[10px] font-bold text-slate-400 hover:text-white transition-all gap-1"
              >
                <ArrowLeft className="h-3 w-3" /> Quay Lại
              </button>

              <button
                type="button"
                onClick={() => {
                  if (activeSurveyQIdx < SURVEY_QUESTIONS.length - 1) {
                    setActiveSurveyQIdx(prev => prev + 1);
                  }
                }}
                disabled={surveyAnswers[activeQuestion.id] === undefined}
                className={cn(
                  "flex h-9 items-center justify-center rounded-lg px-4 text-[10px] font-bold transition-all gap-1",
                  surveyAnswers[activeQuestion.id] !== undefined
                    ? "bg-white/10 hover:bg-white/15 text-white"
                    : "bg-slate-800 text-slate-600 cursor-not-allowed opacity-40"
                )}
              >
                Tiếp Theo <ArrowRight className="h-3 w-3" />
              </button>
            </div>

          </div>
        )}

        {/* Global Navigation Action Bar (Except Step 5 which has its own) */}
        {step < 5 && (
          <div className="flex gap-3 pt-5 border-t border-white/5">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="flex h-11 flex-1 items-center justify-center rounded-xl border border-white/10 bg-transparent font-display text-[11px] font-bold text-slate-300 hover:text-white hover:bg-white/5 transition-all"
              >
                <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Quay Lại
              </button>
            )}

            <button
              type="button"
              onClick={nextStep}
              disabled={!isStepValid()}
              className={cn(
                "flex h-11 flex-1 items-center justify-center rounded-xl font-display text-[11px] font-bold transition-all gap-1.5",
                isStepValid()
                  ? "bg-gradient-to-r from-amber-200 to-amber-500 text-slate-950 shadow-md hover:brightness-105"
                  : "bg-slate-800 text-slate-500 cursor-not-allowed opacity-50"
              )}
            >
              Tiếp Tục <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {/* Final Submit action button container at Step 5 */}
        {step === 5 && (
          <div className="flex justify-center pt-2">
            <button
              type="submit"
              disabled={!isStepValid()}
              className={cn(
                "flex h-11 w-full max-w-xs items-center justify-center rounded-xl font-display text-[11px] font-bold transition-all gap-1.5 shadow-lg",
                isStepValid()
                  ? "bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 text-slate-950 hover:brightness-105 active:scale-98"
                  : "bg-slate-800 text-slate-500 cursor-not-allowed opacity-50"
              )}
            >
              Hoàn Thành Khảo Sát & Xem Kết Quả <Sparkles className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

      </form>
    </div>
  );
}
