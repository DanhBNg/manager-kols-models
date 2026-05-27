"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateMatchScore = calculateMatchScore;
exports.matchTalentsForCampaign = matchTalentsForCampaign;
/**
 * Calculates a match score (0-100%) between a campaign's requirements and a talent's profile.
 */
function calculateMatchScore(talent, campaign) {
    let score = 0;
    const reqs = campaign.requirements;
    // 1. Tier Match (Weight: 30%)
    if (reqs.tier && reqs.tier.length > 0) {
        if (reqs.tier.includes(talent.tier)) {
            score += 30;
        }
        else {
            // Partial credit for adjacent tiers
            const tiers = ['S', 'A', 'B', 'C'];
            const talentIdx = tiers.indexOf(talent.tier);
            const isAdjacent = reqs.tier.some(t => Math.abs(tiers.indexOf(t) - talentIdx) === 1);
            if (isAdjacent) {
                score += 15;
            }
        }
    }
    else {
        score += 30; // No tier restriction
    }
    // 2. Height Match (Weight: 20%)
    if (reqs.minHeight && reqs.minHeight > 0) {
        if (talent.height >= reqs.minHeight) {
            score += 20;
        }
        else if (reqs.minHeight - talent.height <= 3) {
            score += 10; // Slightly shorter but within 3cm
        }
    }
    else {
        score += 20;
    }
    // 3. Location Match (Weight: 15%)
    if (reqs.location) {
        const isOnlineJob = campaign.type.toLowerCase().includes('online') || campaign.location.toLowerCase().includes('online');
        if (talent.location.toLowerCase().trim() === reqs.location.toLowerCase().trim()) {
            score += 15;
        }
        else if (isOnlineJob) {
            score += 15; // Location doesn't matter for online work
        }
        else {
            score += 5; // Can still travel but at a lower preference
        }
    }
    else {
        score += 15;
    }
    // 4. Skills Match (Weight: 15%)
    if (reqs.skills && reqs.skills.length > 0) {
        const matchedSkills = reqs.skills.filter(skill => talent.skills.some(ts => ts.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(ts.toLowerCase())));
        const matchRatio = matchedSkills.length / reqs.skills.length;
        score += Math.round(matchRatio * 15);
    }
    else {
        score += 15;
    }
    // 5. Social Metrics Match (Weight: 20% - 10% followers, 10% engagement)
    let socialScore = 0;
    if (reqs.minFollowers && reqs.minFollowers > 0) {
        if (talent.followersCount >= reqs.minFollowers) {
            socialScore += 10;
        }
        else if (talent.followersCount >= reqs.minFollowers * 0.7) {
            socialScore += 5; // Close enough (70% of req)
        }
    }
    else {
        socialScore += 10;
    }
    if (reqs.minEngagement && reqs.minEngagement > 0) {
        if (talent.engagementRate >= reqs.minEngagement) {
            socialScore += 10;
        }
        else if (talent.engagementRate >= reqs.minEngagement * 0.7) {
            socialScore += 5;
        }
    }
    else {
        socialScore += 10;
    }
    score += socialScore;
    return Math.min(100, Math.max(0, score));
}
/**
 * Ranks all talents for a specific campaign, returning sorted records with match percentage.
 */
function matchTalentsForCampaign(talents, campaign) {
    return talents
        .map(talent => ({
        talent,
        matchScore: calculateMatchScore(talent, campaign)
    }))
        .sort((a, b) => b.matchScore - a.matchScore);
}
