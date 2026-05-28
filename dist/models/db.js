"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
// Pre-seeded Brands
let brands = [
    {
        id: 'b1',
        name: 'Glow Beauty',
        logo: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=150&h=150&q=80',
        industry: 'Mỹ phẩm & Chăm sóc da',
        verified: true
    },
    {
        id: 'b2',
        name: 'VNDress Fashion',
        logo: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=150&h=150&q=80',
        industry: 'Thời trang cao cấp',
        verified: true
    },
    {
        id: 'b3',
        name: 'Luxury Diamonds',
        logo: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=150&h=150&q=80',
        industry: 'Trang sức xa xỉ',
        verified: true
    }
];
// Pre-seeded Talents
let talents = [
    {
        id: 't1',
        name: 'Nguyễn Mai Anh',
        birthYear: 2002,
        location: 'Hà Nội',
        hometown: 'Nam Định',
        phone: '0912345678',
        email: 'maianh.nguyen@beautyapp.vn',
        avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&h=300&q=80',
        height: 172,
        weight: 51,
        bust: 85,
        waist: 60,
        hips: 90,
        plasticSurgery: false,
        maritalStatus: 'Độc thân',
        education: 'Cử nhân Học viện Ngoại giao',
        languages: ['Tiếng Anh (IELTS 7.5)', 'Tiếng Việt'],
        skills: ['Catwalk', 'MC song ngữ', 'Social Content', 'Diễn xuất trước ống kính'],
        socialLinks: {
            tiktok: '@maianh_beauty',
            instagram: 'maianh.nguyen',
            facebook: 'fb.com/maianh.nguyen.beauty'
        },
        portfolioImages: [
            'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&h=1000&q=80',
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&h=1000&q=80'
        ],
        videoCatwalk: 'https://assets.mixkit.co/videos/preview/mixkit-beautiful-woman-walking-in-slow-motion-41804-large.mp4',
        videoIntro: 'https://assets.mixkit.co/videos/preview/mixkit-girl-smiling-at-the-camera-in-close-up-39987-large.mp4',
        followersCount: 120000,
        engagementRate: 4.8,
        profileScore: 82,
        tier: 'A',
        rateCard: {
            'Instagram Post': 3000000,
            'TikTok Video': 5000000,
            'Livestream 2h': 8000000,
            'Event Appearance': 10000000
        },
        availabilityCalendar: ['2026-06-24', '2026-06-25', '2026-06-28'],
        reliability: 96,
        reviewsCount: 18,
        averageRating: 4.9,
        surveyAnswers: [],
        surveyScores: { pageant: 75, runway: 80, kol: 91 },
        mainCategory: 'KOL / Người mẫu ảnh / Giải trí thế hệ mới'
    },
    {
        id: 't2',
        name: 'Lê Khánh Linh',
        birthYear: 2004,
        location: 'TP. Hồ Chí Minh',
        hometown: 'Đồng Nai',
        phone: '0987654321',
        email: 'khanhlinh.le@beautyapp.vn',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&h=300&q=80',
        height: 168,
        weight: 49,
        bust: 83,
        waist: 59,
        hips: 89,
        plasticSurgery: false,
        maritalStatus: 'Độc thân',
        education: 'Sinh viên Đại học Ngoại thương',
        languages: ['Tiếng Anh (IELTS 6.5)', 'Tiếng Trung (HSK 4)', 'Tiếng Việt'],
        skills: ['Livestream bán hàng', 'Pose dáng lookbook', 'Dance cover', 'Makeup content'],
        socialLinks: {
            tiktok: '@khanhlinh_koc',
            instagram: 'linh.khanhh'
        },
        portfolioImages: [
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&h=1000&q=80',
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&h=1000&q=80'
        ],
        videoIntro: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-talking-to-camera-mockup-40339-large.mp4',
        followersCount: 85000,
        engagementRate: 5.2,
        profileScore: 74,
        tier: 'B',
        rateCard: {
            'Instagram Post': 2000000,
            'TikTok Video': 3500000,
            'Livestream 2h': 6000000
        },
        availabilityCalendar: ['2026-06-25', '2026-06-26', '2026-06-27'],
        reliability: 98,
        reviewsCount: 12,
        averageRating: 4.8,
        surveyAnswers: [],
        surveyScores: { pageant: 60, runway: 70, kol: 88 },
        mainCategory: 'KOL / Người mẫu ảnh / Giải trí thế hệ mới'
    },
    {
        id: 't3',
        name: 'Đặng Ngọc Hân',
        birthYear: 2000,
        location: 'Hà Nội',
        hometown: 'Hải Phòng',
        phone: '0901234567',
        email: 'ngochan.dang@beautyapp.vn',
        avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=300&h=300&q=80',
        height: 176,
        weight: 53,
        bust: 86,
        waist: 61,
        hips: 91,
        plasticSurgery: true,
        maritalStatus: 'Độc thân',
        education: 'Cử nhân Đại học RMIT',
        languages: ['Tiếng Anh (IELTS 8.0)', 'Tiếng Pháp', 'Tiếng Việt'],
        skills: ['High-fashion Catwalk', 'Trả lời phỏng ứng xử', 'MC Sự kiện', 'Brand Ambassador'],
        socialLinks: {
            tiktok: '@ngochan_pageant',
            instagram: 'ngochan.official',
            facebook: 'fb.com/ngochan.dang.queen'
        },
        portfolioImages: [
            'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=800&h=1000&q=80',
            'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&h=1000&q=80'
        ],
        videoCatwalk: 'https://assets.mixkit.co/videos/preview/mixkit-woman-walking-down-a-runway-at-a-fashion-show-42280-large.mp4',
        followersCount: 250000,
        engagementRate: 3.8,
        profileScore: 88,
        tier: 'A',
        rateCard: {
            'Catwalk Show': 15000000,
            'Event Appearance': 12000000,
            'TikTok Video': 7000000
        },
        availabilityCalendar: ['2026-06-24', '2026-06-26', '2026-06-30'],
        reliability: 92,
        reviewsCount: 24,
        averageRating: 4.7,
        surveyAnswers: [],
        surveyScores: { pageant: 92, runway: 86, kol: 72 },
        mainCategory: 'Hoa hậu / Hoa khôi / Đại sứ sắc đẹp'
    },
    {
        id: 't4',
        name: 'Trần Hoàng Gia Linh',
        birthYear: 1999,
        location: 'TP. Hồ Chí Minh',
        hometown: 'Đà Nẵng',
        phone: '0977889911',
        email: 'gialinh.tran@beautyapp.vn',
        avatar: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=300&h=300&q=80',
        height: 178,
        weight: 54,
        bust: 88,
        waist: 58,
        hips: 92,
        plasticSurgery: false,
        maritalStatus: 'Độc thân',
        education: 'Cử nhân Nghệ thuật Điện ảnh Đại học Sân khấu Điện ảnh',
        languages: ['Tiếng Anh lưu loát', 'Tiếng Việt'],
        skills: ['Supermodel Catwalk', 'Diễn xuất phim điện ảnh', 'Đại sứ thương hiệu B2B', 'Public Speaking'],
        socialLinks: {
            tiktok: '@gialinh_supervip',
            instagram: 'gialinh.tran.celeb',
            facebook: 'fb.com/gialinh.tran.celeb'
        },
        portfolioImages: [
            'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=800&h=1000&q=80',
            'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=800&h=1000&q=80'
        ],
        videoCatwalk: 'https://assets.mixkit.co/videos/preview/mixkit-woman-walking-in-slow-motion-in-front-of-lights-42023-large.mp4',
        followersCount: 1200000,
        engagementRate: 6.5,
        profileScore: 95,
        tier: 'S',
        rateCard: {
            'Catwalk Show': 50000000,
            'Event Appearance': 40000000,
            'Instagram Post': 20000000
        },
        availabilityCalendar: ['2026-06-28', '2026-06-29', '2026-06-30'],
        reliability: 95,
        reviewsCount: 35,
        averageRating: 5.0,
        surveyAnswers: [],
        surveyScores: { pageant: 84, runway: 96, kol: 89 },
        mainCategory: 'Siêu mẫu Runway / High-end Professional'
    }
];
// Pre-seeded Campaigns
let campaigns = [
    {
        id: 'c1',
        brandId: 'b1',
        title: 'Beauty Mega Live 06/2026',
        type: 'KOC livestream bán hàng',
        requirements: {
            tier: ['A', 'B'],
            gender: 'Nữ',
            minHeight: 165,
            location: 'Hà Nội',
            skills: ['Livestream bán hàng', 'Social Content'],
            minFollowers: 50000,
            minEngagement: 4.0
        },
        budget: 12000000,
        talentCount: 2,
        startDate: '2026-06-25',
        endDate: '2026-06-25',
        location: 'Studio Cầu Giấy, Hà Nội',
        jobBrief: 'Livestream giới thiệu dòng son dưỡng mới và phấn phủ glowy skin. Cần Talent có khả năng tương tác tốt, am hiểu mỹ phẩm và năng động trước camera.',
        status: 'Active'
    },
    {
        id: 'c2',
        brandId: 'b2',
        title: 'Summer Runway Collection 2026',
        type: 'Người mẫu runway',
        requirements: {
            tier: ['S', 'A'],
            minHeight: 172,
            skills: ['Catwalk', 'Pose dáng lookbook'],
            minFollowers: 100000
        },
        budget: 15000000,
        talentCount: 15,
        startDate: '2026-06-28',
        endDate: '2026-06-29',
        location: 'Gem Center, TP. Hồ Chí Minh',
        jobBrief: 'Trình diễn bộ sưu tập đầm dạ hội Haute Couture mùa hè. Yêu cầu catwalk phong thái sang trọng, uyển chuyển và đúng nhịp nhạc.',
        status: 'Active'
    },
    {
        id: 'c3',
        brandId: 'b3',
        title: 'Luxury Diamond Launch Event Guest',
        type: 'Event guest / KOL khách mời',
        requirements: {
            tier: ['S'],
            minHeight: 170,
            skills: ['Brand Ambassador', 'MC song ngữ']
        },
        budget: 45000000,
        talentCount: 1,
        startDate: '2026-06-30',
        endDate: '2026-06-30',
        location: 'Metropole Hotel, Hà Nội',
        jobBrief: 'Tham gia với tư cách khách mời danh dự (Celeb). Chụp ảnh check-in thảm đỏ, mang trang sức kim cương của thương hiệu, đăng bài PR trên social.',
        status: 'Active'
    }
];
// Pre-seeded Bookings
let bookings = [
    {
        id: 'bk1',
        campaignId: 'c1',
        talentId: 't1',
        brandId: 'b1',
        agreedRate: 8000000,
        status: 'Escrowed',
        escrowAmount: 8000000,
        platformFee: 400000,
        talentPayout: 7600000,
        timeline: [
            { status: 'Draft', timestamp: '2026-05-25T10:00:00Z', note: 'Chiến dịch được tạo nháp' },
            { status: 'Invited', timestamp: '2026-05-25T11:00:00Z', note: 'Gửi lời mời book Nguyễn Mai Anh' },
            { status: 'Accepted', timestamp: '2026-05-25T14:30:00Z', note: 'Nguyễn Mai Anh đã chấp nhận lời mời' },
            { status: 'Escrowed', timestamp: '2026-05-26T09:15:00Z', note: 'Glow Beauty đã thanh toán đặt cọc 8,000,000đ thành công. Tiền đang được bảo vệ.' }
        ]
    },
    {
        id: 'bk2',
        campaignId: 'c1',
        talentId: 't2',
        brandId: 'b1',
        agreedRate: 6000000,
        status: 'Pending Review',
        escrowAmount: 6000000,
        platformFee: 300000,
        talentPayout: 5700000,
        timeline: [
            { status: 'Draft', timestamp: '2026-05-24T09:00:00Z' },
            { status: 'Invited', timestamp: '2026-05-24T10:00:00Z' },
            { status: 'Accepted', timestamp: '2026-05-24T11:20:00Z' },
            { status: 'Escrowed', timestamp: '2026-05-24T15:00:00Z', note: 'Đã đặt cọc.' },
            { status: 'In Progress', timestamp: '2026-05-25T20:00:00Z', note: 'Đang tiến hành livestream.' },
            { status: 'Pending Review', timestamp: '2026-05-25T22:30:00Z', note: 'Talent đã upload link video livestream nghiệm thu.' }
        ],
        deliverablesProofUrl: 'https://tiktok.com/@khanhlinh_koc/live/playback-1823912'
    },
    {
        id: 'bk3',
        campaignId: 'c2',
        talentId: 't3',
        brandId: 'b2',
        agreedRate: 15000000,
        status: 'Completed',
        escrowAmount: 15000000,
        platformFee: 750000,
        talentPayout: 14250000,
        timeline: [
            { status: 'Draft', timestamp: '2026-05-20T10:00:00Z' },
            { status: 'Invited', timestamp: '2026-05-20T10:30:00Z' },
            { status: 'Accepted', timestamp: '2026-05-21T08:00:00Z' },
            { status: 'Escrowed', timestamp: '2026-05-21T14:00:00Z' },
            { status: 'In Progress', timestamp: '2026-05-22T08:00:00Z' },
            { status: 'Pending Review', timestamp: '2026-05-22T19:00:00Z' },
            { status: 'Completed', timestamp: '2026-05-23T10:00:00Z', note: 'Brand đã nghiệm thu. Tiền đã giải ngân về ví Talent.' }
        ],
        reviewFromBrand: { rating: 5, comment: 'Đặng Ngọc Hân trình diễn chuyên nghiệp, trang phục ôm khít và catwalk sang trọng. Đúng giờ.' }
    }
];
// Helper functions for our in-memory DB
exports.db = {
    getTalents: () => talents,
    getTalentById: (id) => talents.find(t => t.id === id),
    saveTalent: (talent) => {
        const idx = talents.findIndex(t => t.id === talent.id);
        if (idx !== -1) {
            talents[idx] = talent;
        }
        else {
            talents.push(talent);
        }
        return talent;
    },
    getBrands: () => brands,
    getBrandById: (id) => brands.find(b => b.id === id),
    getCampaigns: () => campaigns,
    getCampaignById: (id) => campaigns.find(c => c.id === id),
    saveCampaign: (campaign) => {
        const idx = campaigns.findIndex(c => c.id === campaign.id);
        if (idx !== -1) {
            campaigns[idx] = campaign;
        }
        else {
            campaigns.push(campaign);
        }
        return campaign;
    },
    getBookings: () => bookings,
    getBookingById: (id) => bookings.find(bk => bk.id === id),
    saveBooking: (booking) => {
        const idx = bookings.findIndex(bk => bk.id === booking.id);
        if (idx !== -1) {
            bookings[idx] = booking;
        }
        else {
            bookings.push(booking);
        }
        return booking;
    }
};
