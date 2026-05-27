"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../models/db");
const scoreService_1 = require("../services/scoreService");
const matchService_1 = require("../services/matchService");
const router = (0, express_1.Router)();
// ==========================================
// 1. TALENT ENDPOINTS
// ==========================================
// Get all talents
router.get('/talents', (req, res) => {
    res.json(db_1.db.getTalents());
});
// Get talent by ID
router.get('/talents/:id', (req, res) => {
    const talent = db_1.db.getTalentById(req.params.id);
    if (!talent) {
        res.status(404).json({ error: 'Không tìm thấy hồ sơ Talent.' });
        return;
    }
    res.json(talent);
});
// Onboard / Create Talent Profile
router.post('/talents/onboard', (req, res) => {
    try {
        const data = req.body;
        // Generate new ID or use provided one
        const id = data.id || 't' + (db_1.db.getTalents().length + 1);
        const existing = db_1.db.getTalentById(id);
        const newTalent = {
            id,
            name: data.name || (existing ? existing.name : 'Chưa cập nhật'),
            birthYear: Number(data.birthYear) || (existing ? existing.birthYear : 2000),
            location: data.location || (existing ? existing.location : 'Hà Nội'),
            hometown: data.hometown || (existing ? existing.hometown : 'Chưa cập nhật'),
            phone: data.phone || (existing ? existing.phone : ''),
            email: data.email || (existing ? existing.email : ''),
            avatar: data.avatar || (existing ? existing.avatar : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80'),
            // Measurements
            height: Number(data.height) || (existing ? existing.height : 0),
            weight: Number(data.weight) || (existing ? existing.weight : 0),
            bust: Number(data.bust) || (existing ? existing.bust : 0),
            waist: Number(data.waist) || (existing ? existing.waist : 0),
            hips: Number(data.hips) || (existing ? existing.hips : 0),
            plasticSurgery: data.plasticSurgery === true || data.plasticSurgery === 'true' || (existing ? existing.plasticSurgery : false),
            maritalStatus: data.maritalStatus || (existing ? existing.maritalStatus : 'Độc thân'),
            education: data.education || (existing ? existing.education : ''),
            languages: Array.isArray(data.languages) ? data.languages : (existing ? existing.languages : ['Tiếng Việt']),
            skills: Array.isArray(data.skills) ? data.skills : (existing ? existing.skills : []),
            socialLinks: data.socialLinks || (existing ? existing.socialLinks : {}),
            portfolioImages: data.portfolioImages || (existing ? existing.portfolioImages : []),
            videoCatwalk: data.videoCatwalk || (existing ? existing.videoCatwalk : ''),
            videoIntro: data.videoIntro || (existing ? existing.videoIntro : ''),
            followersCount: Number(data.followersCount) || (existing ? existing.followersCount : 10000),
            engagementRate: Number(data.engagementRate) || (existing ? existing.engagementRate : 2.5),
            // Defaults/calculated later
            profileScore: 0,
            tier: 'C',
            rateCard: data.rateCard || (existing ? existing.rateCard : { 'Social Post': 1000000 }),
            availabilityCalendar: data.availabilityCalendar || (existing ? existing.availabilityCalendar : []),
            reliability: existing ? existing.reliability : 95,
            reviewsCount: existing ? existing.reviewsCount : 0,
            averageRating: existing ? existing.averageRating : 5.0,
            // Keep survey if exists
            surveyAnswers: existing ? existing.surveyAnswers : [],
            surveyScores: existing ? existing.surveyScores : undefined,
            mainCategory: existing ? existing.mainCategory : undefined
        };
        // Auto-calculate profile completeness score
        newTalent.profileScore = (0, scoreService_1.calculateProfileScore)(newTalent);
        // Auto-determine Tier
        newTalent.tier = (0, scoreService_1.determineTier)(newTalent.profileScore, newTalent.followersCount);
        db_1.db.saveTalent(newTalent);
        res.status(201).json(newTalent);
    }
    catch (error) {
        res.status(400).json({ error: error.message || 'Lỗi dữ liệu đầu vào.' });
    }
});
// Submit Survey API
router.post('/talents/:id/survey', (req, res) => {
    const talent = db_1.db.getTalentById(req.params.id);
    if (!talent) {
        res.status(404).json({ error: 'Không tìm thấy Talent.' });
        return;
    }
    const answers = req.body.answers;
    if (!answers || !Array.isArray(answers)) {
        res.status(400).json({ error: 'Cần gửi mảng câu trả lời surveyAnswers.' });
        return;
    }
    const result = (0, scoreService_1.evaluateSurvey)(answers);
    talent.surveyAnswers = answers;
    talent.surveyScores = result.scores;
    talent.mainCategory = result.mainCategory;
    // Re-assess completeness score with survey done
    talent.profileScore = (0, scoreService_1.calculateProfileScore)(talent);
    talent.tier = (0, scoreService_1.determineTier)(talent.profileScore, talent.followersCount);
    db_1.db.saveTalent(talent);
    res.json({
        message: 'Nộp khảo sát thành công!',
        surveyScores: result.scores,
        mainCategory: result.mainCategory,
        profileScore: talent.profileScore,
        tier: talent.tier
    });
});
// ==========================================
// 2. BRAND & CAMPAIGN ENDPOINTS
// ==========================================
// Get all brands
router.get('/brands', (req, res) => {
    res.json(db_1.db.getBrands());
});
// Get all campaigns
router.get('/campaigns', (req, res) => {
    res.json(db_1.db.getCampaigns());
});
// Get campaign by ID
router.get('/campaigns/:id', (req, res) => {
    const campaign = db_1.db.getCampaignById(req.params.id);
    if (!campaign) {
        res.status(404).json({ error: 'Không tìm thấy chiến dịch.' });
        return;
    }
    res.json(campaign);
});
// Create campaign
router.post('/campaigns', (req, res) => {
    try {
        const data = req.body;
        const id = 'c' + (db_1.db.getCampaigns().length + 1);
        const newCampaign = {
            id,
            brandId: data.brandId || 'b1',
            title: data.title || 'Chiến dịch mới',
            type: data.type || 'KOL/KOC',
            requirements: {
                tier: data.requirements?.tier || ['B', 'C'],
                gender: data.requirements?.gender || 'Nữ',
                minHeight: Number(data.requirements?.minHeight) || 160,
                location: data.requirements?.location || 'Hà Nội',
                skills: data.requirements?.skills || [],
                minFollowers: Number(data.requirements?.minFollowers) || 0,
                minEngagement: Number(data.requirements?.minEngagement) || 0,
                minAge: Number(data.requirements?.minAge) || 18,
                maxAge: Number(data.requirements?.maxAge) || 35
            },
            budget: Number(data.budget) || 10000000,
            talentCount: Number(data.talentCount) || 1,
            startDate: data.startDate || new Date().toISOString().split('T')[0],
            endDate: data.endDate || new Date().toISOString().split('T')[0],
            location: data.location || 'Hà Nội',
            jobBrief: data.jobBrief || '',
            status: 'Active'
        };
        db_1.db.saveCampaign(newCampaign);
        res.status(201).json(newCampaign);
    }
    catch (error) {
        res.status(400).json({ error: error.message || 'Lỗi tạo chiến dịch.' });
    }
});
// Get AI matched talents for campaign
router.get('/campaigns/:id/matches', (req, res) => {
    const campaign = db_1.db.getCampaignById(req.params.id);
    if (!campaign) {
        res.status(404).json({ error: 'Không tìm thấy chiến dịch.' });
        return;
    }
    const talents = db_1.db.getTalents();
    const matchedList = (0, matchService_1.matchTalentsForCampaign)(talents, campaign);
    res.json(matchedList);
});
// ==========================================
// 3. BOOKING & ESCROW ENDPOINTS
// ==========================================
// Get all bookings
router.get('/bookings', (req, res) => {
    res.json(db_1.db.getBookings());
});
// Get booking by ID
router.get('/bookings/:id', (req, res) => {
    const booking = db_1.db.getBookingById(req.params.id);
    if (!booking) {
        res.status(404).json({ error: 'Không tìm thấy booking.' });
        return;
    }
    res.json(booking);
});
// Create a booking / Send invitation
router.post('/bookings', (req, res) => {
    try {
        const { campaignId, talentId, agreedRate } = req.body;
        if (!campaignId || !talentId || !agreedRate) {
            res.status(400).json({ error: 'Thiếu campaignId, talentId hoặc agreedRate.' });
            return;
        }
        const campaign = db_1.db.getCampaignById(campaignId);
        const talent = db_1.db.getTalentById(talentId);
        if (!campaign || !talent) {
            res.status(404).json({ error: 'Không tìm thấy Campaign hoặc Talent.' });
            return;
        }
        const id = 'bk' + (db_1.db.getBookings().length + 1);
        const rate = Number(agreedRate);
        const platformFee = Math.round(rate * 0.05); // 5% fee
        const talentPayout = rate - platformFee;
        const newBooking = {
            id,
            campaignId,
            talentId,
            brandId: campaign.brandId,
            agreedRate: rate,
            status: 'Invited',
            escrowAmount: 0,
            platformFee,
            talentPayout,
            timeline: [
                { status: 'Invited', timestamp: new Date().toISOString(), note: `Đã gửi lời mời book ${talent.name} với giá ${rate.toLocaleString()}đ` }
            ]
        };
        db_1.db.saveBooking(newBooking);
        res.status(201).json(newBooking);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Update Booking Status & Trigger Escrow State Machine
router.post('/bookings/:id/status', (req, res) => {
    const booking = db_1.db.getBookingById(req.params.id);
    if (!booking) {
        res.status(404).json({ error: 'Không tìm thấy booking.' });
        return;
    }
    const { status, note } = req.body;
    const validStatuses = [
        'Accepted', 'Escrow Pending', 'Escrowed', 'In Progress', 'Pending Review', 'Completed', 'Disputed', 'Cancelled'
    ];
    if (!status || !validStatuses.includes(status)) {
        res.status(400).json({ error: 'Trạng thái chuyển đổi không hợp lệ.' });
        return;
    }
    // State specific side effects
    if (status === 'Escrowed') {
        booking.escrowAmount = booking.agreedRate;
    }
    booking.status = status;
    booking.timeline.push({
        status,
        timestamp: new Date().toISOString(),
        note: note || `Đổi trạng thái booking thành: ${status}`
    });
    db_1.db.saveBooking(booking);
    res.json(booking);
});
exports.default = router;
