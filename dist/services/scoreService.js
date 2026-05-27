"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateProfileScore = calculateProfileScore;
exports.determineTier = determineTier;
exports.evaluateSurvey = evaluateSurvey;
/**
 * Calculates a profile score out of 100 based on details provided.
 */
function calculateProfileScore(talent) {
    let score = 0;
    // Basic Info (20 points max)
    if (talent.name && talent.email && talent.phone && talent.avatar)
        score += 20;
    else if (talent.name)
        score += 10;
    // Body Metrics (20 points max)
    if (talent.height > 0 && talent.weight > 0 && talent.bust > 0 && talent.waist > 0 && talent.hips > 0) {
        score += 20;
    }
    else if (talent.height > 0) {
        score += 10;
    }
    // Education & Languages (15 points max)
    if (talent.education)
        score += 5;
    if (talent.languages && talent.languages.length > 0) {
        score += Math.min(10, talent.languages.length * 5);
    }
    // Social Links (15 points max)
    if (talent.socialLinks) {
        const linksCount = Object.values(talent.socialLinks).filter(link => !!link).length;
        score += Math.min(15, linksCount * 5);
    }
    // Media upload (15 points max)
    if (talent.videoCatwalk || talent.videoIntro)
        score += 10;
    if (talent.videoCatwalk && talent.videoIntro)
        score += 5;
    // Portfolio images (15 points max)
    if (talent.portfolioImages && talent.portfolioImages.length > 0) {
        score += Math.min(15, talent.portfolioImages.length * 5);
    }
    return Math.min(100, score);
}
/**
 * Evaluates the talent tier based on followers count and profile score.
 */
function determineTier(profileScore, followersCount) {
    if (profileScore >= 90 && followersCount >= 1000000) {
        return 'S'; // Celeb / Super VIP
    }
    if (profileScore >= 80 && followersCount >= 100000) {
        return 'A'; // High-end Professional
    }
    if (profileScore >= 60 && followersCount >= 30000) {
        return 'B'; // Mid-range / Freelance
    }
    return 'C'; // Entry-level / Newbie
}
/**
 * Grades survey answers to determine career direction scores and category.
 */
function evaluateSurvey(answers) {
    // Base weights for the 5 survey questions
    let pageantSum = 0;
    let runwaySum = 0;
    let kolSum = 0;
    let answeredCount = 0;
    const gradingMatrix = {
        1: [
            { pageant: 10, runway: 5, kol: 25 }, // Option 0: Brand Ambassador/KOL
            { pageant: 10, runway: 30, kol: 5 }, // Option 1: Runway Fashion
            { pageant: 30, runway: 15, kol: 5 } // Option 2: Pageant Contest
        ],
        2: [
            { pageant: 5, runway: 5, kol: 30 }, // Option 0: TikTok/YT
            { pageant: 10, runway: 20, kol: 15 }, // Option 1: IG/FB
            { pageant: 20, runway: 10, kol: 5 } // Option 2: Offline focused
        ],
        3: [
            { pageant: 10, runway: 5, kol: 30 }, // Option 0: Under 1m68
            { pageant: 25, runway: 20, kol: 15 }, // Option 1: 1m68 - 1m73
            { pageant: 25, runway: 30, kol: 10 } // Option 2: Over 1m73
        ],
        4: [
            { pageant: 30, runway: 10, kol: 25 }, // Option 0: Public Speaking & Fluent English
            { pageant: 15, runway: 10, kol: 30 }, // Option 1: Charming VN communication
            { pageant: 10, runway: 25, kol: 5 } // Option 2: Artistic expressions only
        ],
        5: [
            { pageant: 30, runway: 15, kol: 10 }, // Option 0: International Beauty Queen style
            { pageant: 10, runway: 30, kol: 5 }, // Option 1: High-Fashion edgy style
            { pageant: 5, runway: 5, kol: 30 } // Option 2: Young, trendy, active style
        ]
    };
    answers.forEach(ans => {
        const questionGrading = gradingMatrix[ans.questionId];
        if (questionGrading && questionGrading[ans.answerIndex]) {
            const points = questionGrading[ans.answerIndex];
            pageantSum += points.pageant;
            runwaySum += points.runway;
            kolSum += points.kol;
            answeredCount++;
        }
    });
    // Calculate percentage scores (max potential points per track is 30 * number of questions)
    const maxPossible = answeredCount > 0 ? answeredCount * 30 : 150;
    const scores = {
        pageant: Math.round((pageantSum / maxPossible) * 100) || 50,
        runway: Math.round((runwaySum / maxPossible) * 100) || 50,
        kol: Math.round((kolSum / maxPossible) * 100) || 50
    };
    // Determine main category based on highest score
    let mainCategory = 'KOL / Người mẫu ảnh / Giải trí thế hệ mới';
    if (scores.pageant >= scores.runway && scores.pageant >= scores.kol) {
        mainCategory = 'Hoa hậu / Hoa khôi / Đại sứ sắc đẹp';
    }
    else if (scores.runway >= scores.pageant && scores.runway >= scores.kol) {
        mainCategory = 'Siêu mẫu Runway / High-end Professional';
    }
    return { scores, mainCategory };
}
