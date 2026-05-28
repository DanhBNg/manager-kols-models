export type TalentProfile = {
  id: string;
  name: string;
  type: string;
  city: string;
  gender: string;
  age: number;
  height: number;
  tier: "A" | "B" | "C";
  verified: boolean;
  followers: string;
  rate: string;
  avatar: string;
  cover: string;
  skills: string[];
  experience: string;
  portfolio: string[];
  availability: string;
  completion: number;
};

export type Campaign = {
  id: string;
  title: string;
  jobType: string;
  city: string;
  startDate: string;
  endDate: string;
  talentQuantity: number;
  budget: string;
  status: "draft" | "published" | "closed";
  shortlistedTalentIds: string[];
  contactRequests: number;
  description: string;
};

export const partnerProfile = {
  organizationName: "L'Oréal Vietnam Cosmetics",
  organizationType: "brand",
  industry: "Beauty & Lifestyle",
  contactName: "Nguyễn Văn Hùng",
  contactEmail: "contact@loreal-vietnam.com",
  contactPhone: "0901234567",
  city: "TP. Hồ Chí Minh",
  completion: 82,
  verificationStatus: "Đang xác minh",
};

export const talents: TalentProfile[] = [
  {
    id: "tal-1",
    name: "Nguyễn Mai Anh",
    type: "KOL",
    city: "Hà Nội",
    gender: "Nữ",
    age: 24,
    height: 172,
    tier: "A",
    verified: true,
    followers: "120K",
    rate: "từ 8.000.000đ",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&h=500&q=80",
    cover: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80",
    skills: ["Livestream", "MC", "Beauty review"],
    experience: "3 năm làm KOL ngành mỹ phẩm, từng tham gia hơn 20 chiến dịch social commerce.",
    portfolio: ["Beauty Mega Live", "Organic Glow Launch", "Summer Makeup Lookbook"],
    availability: "Rảnh từ 10/06 đến 20/06",
    completion: 94,
  },
  {
    id: "tal-2",
    name: "Khánh Linh",
    type: "Model",
    city: "TP. Hồ Chí Minh",
    gender: "Nữ",
    age: 22,
    height: 175,
    tier: "B",
    verified: true,
    followers: "85K",
    rate: "từ 5.500.000đ",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&h=500&q=80",
    cover: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=900&q=80",
    skills: ["Lookbook", "Runway", "Fashion video"],
    experience: "Model lookbook và runway, phù hợp thời trang, lifestyle, mỹ phẩm cao cấp.",
    portfolio: ["Summer Fashion Runway", "Minimal Lookbook Q2"],
    availability: "Rảnh cuối tuần",
    completion: 88,
  },
  {
    id: "tal-3",
    name: "Lê Ngọc Hân",
    type: "MC",
    city: "TP. Hồ Chí Minh",
    gender: "Nữ",
    age: 27,
    height: 170,
    tier: "A",
    verified: true,
    followers: "240K",
    rate: "từ 12.000.000đ",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=500&h=500&q=80",
    cover: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80",
    skills: ["MC event", "Public speaking", "Interview"],
    experience: "MC sự kiện và đại sứ thương hiệu, mạnh về beauty, lifestyle và talkshow.",
    portfolio: ["Organic Glow Cosmetics", "Beauty Talk Live"],
    availability: "Cần đặt lịch trước 7 ngày",
    completion: 96,
  },
  {
    id: "tal-4",
    name: "Trần Thu Thảo",
    type: "PG",
    city: "Hà Nội",
    gender: "Nữ",
    age: 21,
    height: 168,
    tier: "C",
    verified: false,
    followers: "36K",
    rate: "từ 3.000.000đ",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&h=500&q=80",
    cover: "https://images.unsplash.com/photo-1493655161922-ef98929de9d8?auto=format&fit=crop&w=900&q=80",
    skills: ["PG event", "Activation", "Sampling"],
    experience: "PG activation tại trung tâm thương mại, phù hợp event ngắn ngày.",
    portfolio: ["Mall Activation", "Sampling FMCG"],
    availability: "Rảnh theo ca",
    completion: 72,
  },
  {
    id: "tal-5",
    name: "Phạm Minh Anh",
    type: "Dancer",
    city: "Đà Nẵng",
    gender: "Nữ",
    age: 23,
    height: 166,
    tier: "B",
    verified: true,
    followers: "62K",
    rate: "từ 4.500.000đ",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=500&h=500&q=80",
    cover: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80",
    skills: ["Dance performance", "Choreography", "TikTok video"],
    experience: "Dancer biểu diễn event, viral challenge và video ngắn cho nhãn hàng.",
    portfolio: ["Dance Challenge Launch", "Music Event"],
    availability: "Rảnh tháng 06/2026",
    completion: 84,
  },
];

export const savedTalentIds = ["tal-1", "tal-2", "tal-4"];

export const campaigns: Campaign[] = [
  {
    id: "camp-1",
    title: "Beauty Mega Live 06/2026",
    jobType: "KOL livestream",
    city: "Hà Nội",
    startDate: "2026-06-10",
    endDate: "2026-06-20",
    talentQuantity: 5,
    budget: "50.000.000đ - 80.000.000đ",
    status: "published",
    shortlistedTalentIds: ["tal-1", "tal-3"],
    contactRequests: 2,
    description: "Tìm KOL beauty livestream giới thiệu dòng sản phẩm mới, ưu tiên có kinh nghiệm review mỹ phẩm.",
  },
  {
    id: "camp-2",
    title: "Lookbook Summer Fashion",
    jobType: "Model lookbook",
    city: "TP. Hồ Chí Minh",
    startDate: "2026-07-01",
    endDate: "2026-07-03",
    talentQuantity: 3,
    budget: "25.000.000đ - 40.000.000đ",
    status: "draft",
    shortlistedTalentIds: ["tal-2"],
    contactRequests: 0,
    description: "Chụp lookbook thời trang hè, cần model nữ cao từ 170cm, phong cách clean, luxury.",
  },
  {
    id: "camp-3",
    title: "PG Event Khai Trương",
    jobType: "PG event",
    city: "Hà Nội",
    startDate: "2026-06-25",
    endDate: "2026-06-26",
    talentQuantity: 8,
    budget: "18.000.000đ - 30.000.000đ",
    status: "closed",
    shortlistedTalentIds: ["tal-4"],
    contactRequests: 1,
    description: "Cần PG cho sự kiện khai trương, làm theo ca, ưu tiên có kinh nghiệm activation.",
  },
];

export const contactRequests = [
  {
    id: "cr-1",
    talentId: "tal-1",
    campaignId: "camp-1",
    status: "pending",
    createdAt: "2026-05-28",
  },
  {
    id: "cr-2",
    talentId: "tal-3",
    campaignId: "camp-1",
    status: "viewed",
    createdAt: "2026-05-27",
  },
  {
    id: "cr-3",
    talentId: "tal-4",
    campaignId: "camp-3",
    status: "accepted",
    createdAt: "2026-05-20",
  },
];

