# Talent Tiering Survey System - Implementation Plan

## Context

This plan implements the **30-Question Talent Tiering Survey System** described in `docs/for-bussinees/overview/Plan-intop-models.md`. The system evaluates KOLs/Models across 10 scoring criteria (M1.1-M1.10) to assign them into 4 tiers (S/A/B/C) and recommend suitable pageants.

**Why this matters:**
- Automates talent discovery and classification for agencies
- Provides data-driven tier assignments based on objective criteria
- Matches talents with appropriate pageant opportunities
- Creates a standardized evaluation framework across the platform

**User's original request:**
> "@../docs/for-bussinees/overview/Plan-intop-models.md # PHẦN A: BẢNG KHẢO SÁT 30 CÂU HỎI Quyet dinh ux ui roi tao plan @../docs/for-tech/plans/"

## Database Schema

### New Tables

**1. `survey_responses` - Stores raw survey answers**
```sql
CREATE TABLE survey_responses (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    section VARCHAR(1) NOT NULL, -- 'A', 'B', 'C', 'D'
    question_code VARCHAR(10) NOT NULL, -- 'A1', 'A2', etc.
    answer_value TEXT NOT NULL, -- JSON for multi-select, string for single
    submitted_at TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_section (user_id, section)
);
```

**2. `talent_scores` - Stores calculated scores per criterion**
```sql
CREATE TABLE talent_scores (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    criterion_code VARCHAR(10) NOT NULL, -- 'M1.1', 'M1.2', etc.
    score DECIMAL(5,2) NOT NULL, -- 0-10 scale
    tier VARCHAR(1) NOT NULL, -- 'S', 'A', 'B', 'C'
    calculated_at TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_criterion (user_id, criterion_code),
    INDEX idx_tier (tier)
);
```

**3. `pageant_recommendations` - Stores AI-generated recommendations**
```sql
CREATE TABLE pageant_recommendations (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    pageant_name VARCHAR(255) NOT NULL,
    match_score DECIMAL(5,2) NOT NULL, -- 0-100
    reasoning TEXT NOT NULL,
    recommended_at TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_score (user_id, match_score DESC)
);
```

**4. Update `profiles` table** (already exists in Core-Features-Technical-Specs.md)
```sql
ALTER TABLE profiles ADD COLUMN tier VARCHAR(1) DEFAULT NULL;
ALTER TABLE profiles ADD COLUMN tier_updated_at TIMESTAMP NULL;
```

## API Endpoints

### Survey Submission
```
POST /api/survey/submit
Body: {
    "section": "A",
    "answers": [
        {"question_code": "A1", "answer_value": "option_value"},
        {"question_code": "A2", "answer_value": ["multi", "select"]}
    ]
}
Response: {
    "success": true,
    "section_completed": "A",
    "next_section": "B"
}
```

### Get Survey Progress
```
GET /api/survey/progress
Response: {
    "completed_sections": ["A", "B"],
    "current_section": "C",
    "total_questions": 30,
    "answered_questions": 15
}
```

### Calculate Scores & Tier
```
POST /api/survey/calculate
Response: {
    "tier": "A",
    "overall_score": 78.5,
    "criteria_scores": {
        "M1.1": 8.5,
        "M1.2": 7.0,
        ...
    },
    "radar_chart_data": [...]
}
```

### Get Recommendations
```
GET /api/recommendations
Response: {
    "tier": "A",
    "pageants": [
        {
            "name": "Miss Universe Vietnam",
            "match_score": 85,
            "reasoning": "Strong social media presence..."
        }
    ]
}
```

## Frontend Components

### 1. Multi-Step Survey Form
**Location:** `resources/js/Pages/Survey/TalentSurvey.tsx`

**Structure:**
- 4-step wizard (Section A → B → C → D)
- Progress bar showing completion percentage
- Question types: Single select, Multi-select, Text input, Number input
- Auto-save on each answer
- Navigation: Previous/Next buttons, section tabs

**Key Features:**
- Validation per question (required fields, format checks)
- Conditional questions based on previous answers
- Mobile-responsive design
- Luxury Tech aesthetic (dark mode, gradient accents)

### 2. Results Dashboard
**Location:** `resources/js/Pages/Survey/Results.tsx`

**Components:**
- **Tier Badge**: Large animated badge showing S/A/B/C tier
  - S Tier: Gold gradient (#FFD700 → #FFA500)
  - A Tier: Silver gradient (#C0C0C0 → #E8E8E8)
  - B Tier: Purple gradient (#9333EA → #C084FC)
  - C Tier: Mint gradient (#10B981 → #6EE7B7)

- **Radar Chart**: 10-axis visualization using Chart.js
  - Axes: M1.1 through M1.10
  - Scale: 0-10
  - Filled area with tier-specific color

- **Criteria Breakdown**: Table showing individual scores
  - Criterion name, score, tier, improvement tips

- **Pageant Recommendations**: Card grid
  - Pageant name, match score, reasoning
  - CTA button: "Learn More" / "Apply Now"

### 3. Reusable Components
**Location:** `resources/js/Components/Survey/`

- `QuestionCard.tsx` - Individual question wrapper
- `ProgressBar.tsx` - Survey completion indicator
- `TierBadge.tsx` - Tier display component
- `RadarChart.tsx` - Chart.js wrapper for radar visualization
- `RecommendationCard.tsx` - Pageant recommendation display

## Scoring Algorithm Implementation

**Location:** `app/Services/TalentScoringService.php`

### Scoring Logic

**Step 1: Map Survey Answers to Criteria**
```php
// Example: Section A (Physical Attributes) → M1.1, M1.2, M1.3
private function mapAnswersToCriteria(array $responses): array
{
    $criteriaMap = [
        'A1' => 'M1.1', // Height → Physical Attributes
        'A2' => 'M1.1', // Weight → Physical Attributes
        'A3' => 'M1.2', // Facial features → Beauty Standards
        // ... 30 questions mapped to 10 criteria
    ];
    
    // Aggregate scores per criterion
}
```

**Step 2: Apply Hard Rules (Disqualifiers)**
```php
private function applyHardRules(array $responses): ?string
{
    // Example: Height < 1.60m → Auto C tier
    if ($responses['A1'] < 160) {
        return 'C';
    }
    
    // Example: No social media → Auto B tier max
    if (empty($responses['C1'])) {
        return 'B';
    }
    
    return null; // No hard rule triggered
}
```

**Step 3: Calculate Weighted Scores**
```php
private function calculateWeightedScore(array $criteriaScores): float
{
    $weights = [
        'M1.1' => 0.15, // Physical Attributes
        'M1.2' => 0.15, // Beauty Standards
        'M1.3' => 0.10, // Social Media
        'M1.4' => 0.10, // Communication
        'M1.5' => 0.10, // Experience
        'M1.6' => 0.10, // Education
        'M1.7' => 0.10, // Personality
        'M1.8' => 0.08, // Availability
        'M1.9' => 0.07, // Health
        'M1.10' => 0.05, // Special Skills
    ];
    
    $totalScore = 0;
    foreach ($criteriaScores as $code => $score) {
        $totalScore += $score * $weights[$code];
    }
    
    return $totalScore * 10; // Scale to 0-100
}
```

**Step 4: Assign Tier**
```php
private function assignTier(float $overallScore): string
{
    if ($overallScore >= 90) return 'S';
    if ($overallScore >= 70) return 'A';
    if ($overallScore >= 45) return 'B';
    return 'C';
}
```

### Pageant Recommendation Engine

**Location:** `app/Services/PageantRecommendationService.php`

```php
public function generateRecommendations(int $userId): array
{
    $tier = $this->getTierForUser($userId);
    $scores = $this->getScoresForUser($userId);
    
    // Tier-specific pageant pools
    $pageantPools = [
        'S' => ['Miss Universe', 'Miss World', 'Miss International'],
        'A' => ['Miss Earth', 'Miss Supranational', 'National Pageants'],
        'B' => ['Regional Pageants', 'Miss Tourism', 'Miss Charm'],
        'C' => ['Local Pageants', 'Miss Photogenic', 'Talent Shows'],
    ];
    
    // Match based on criteria strengths
    $recommendations = [];
    foreach ($pageantPools[$tier] as $pageant) {
        $matchScore = $this->calculateMatchScore($scores, $pageant);
        $reasoning = $this->generateReasoning($scores, $pageant);
        
        $recommendations[] = [
            'name' => $pageant,
            'match_score' => $matchScore,
            'reasoning' => $reasoning,
        ];
    }
    
    // Sort by match score descending
    usort($recommendations, fn($a, $b) => $b['match_score'] <=> $a['match_score']);
    
    return array_slice($recommendations, 0, 5); // Top 5
}
```

## UX/UI Design Specifications

### Design System

**Color Palette (Luxury Tech):**
- Background: `#0F172A` (slate-900)
- Surface: `#1E293B` (slate-800)
- Primary: `#3B82F6` (blue-500)
- Accent: `#8B5CF6` (violet-500)
- Text: `#F1F5F9` (slate-100)

**Typography:**
- Headings: Inter Bold, 24-48px
- Body: Inter Regular, 14-16px
- Monospace: JetBrains Mono, 12-14px

**Spacing:**
- Container max-width: 1280px
- Section padding: 64px vertical, 24px horizontal
- Card padding: 24px
- Button padding: 12px 24px

### Survey Flow UX

**Step 1: Welcome Screen**
- Hero section with tier badge showcase
- "Start Survey" CTA button
- Estimated time: 10-15 minutes
- Privacy notice

**Step 2: Section A (Physical Attributes)**
- Questions A1-A8
- Input types: Number (height/weight), Select (body type), Multi-select (features)
- Visual aids: Body type illustrations, feature examples

**Step 3: Section B (Skills & Experience)**
- Questions B1-B8
- Input types: Multi-select (skills), Number (years), Text (achievements)
- Conditional: If "No experience" → Skip B5-B7

**Step 4: Section C (Social Media & Personality)**
- Questions C1-C8
- Input types: URL (social links), Number (followers), Select (personality traits)
- Real-time follower count validation

**Step 5: Section D (Availability & Goals)**
- Questions D1-D6
- Input types: Date picker (availability), Multi-select (goals), Text (motivation)
- Calendar integration for availability

**Step 6: Review & Submit**
- Summary of all answers
- Edit buttons per section
- "Calculate My Tier" CTA button
- Loading animation during calculation (3-5 seconds)

**Step 7: Results Screen**
- Animated tier reveal (confetti for S/A tier)
- Radar chart with smooth animation
- Criteria breakdown accordion
- Pageant recommendations carousel
- Share results CTA (social media)
- "Improve My Score" tips section

### Mobile Responsiveness

- Survey form: Single column, full-width inputs
- Radar chart: Scaled to fit viewport, touch-enabled
- Recommendation cards: Vertical stack, swipeable
- Navigation: Bottom fixed bar with progress indicator

## File Structure

```
backend/
├── app/
│   ├── Http/Controllers/
│   │   └── SurveyController.php
│   ├── Services/
│   │   ├── TalentScoringService.php
│   │   └── PageantRecommendationService.php
│   └── Models/
│       ├── SurveyResponse.php
│       ├── TalentScore.php
│       └── PageantRecommendation.php
│
├── resources/js/
│   ├── Pages/Survey/
│   │   ├── TalentSurvey.tsx
│   │   ├── Results.tsx
│   │   └── Welcome.tsx
│   ├── Components/Survey/
│   │   ├── QuestionCard.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── TierBadge.tsx
│   │   ├── RadarChart.tsx
│   │   └── RecommendationCard.tsx
│   └── types/survey.d.ts
│
├── database/migrations/
│   ├── xxxx_create_survey_responses_table.php
│   ├── xxxx_create_talent_scores_table.php
│   ├── xxxx_create_pageant_recommendations_table.php
│   └── xxxx_add_tier_to_profiles_table.php
│
└── routes/
    └── api.php (add survey endpoints)
```

## Dependencies to Install

```bash
# Backend
composer require intervention/image  # For photo analysis (future)

# Frontend
npm install chart.js react-chartjs-2  # Radar chart
npm install framer-motion  # Animations
npm install react-hook-form @hookform/resolvers zod  # Form handling
npm install date-fns  # Date formatting
```

## Implementation Order

1. **Database Setup** (Day 1)
   - Create migrations for 3 new tables
   - Update profiles table with tier column
   - Run migrations and verify schema

2. **Backend Services** (Day 2-3)
   - Implement TalentScoringService with 10 criteria logic
   - Implement PageantRecommendationService
   - Create SurveyController with 4 endpoints
   - Write unit tests for scoring algorithm

3. **Frontend Components** (Day 4-5)
   - Build reusable components (QuestionCard, ProgressBar, etc.)
   - Implement TalentSurvey.tsx with 4-step wizard
   - Implement Results.tsx with radar chart and tier badge
   - Add form validation with Zod schemas

4. **Integration** (Day 6)
   - Connect frontend to API endpoints
   - Test survey flow end-to-end
   - Add loading states and error handling
   - Implement auto-save functionality

5. **Polish & Testing** (Day 7)
   - Add animations and transitions
   - Mobile responsiveness testing
   - Cross-browser testing
   - Performance optimization (lazy loading, code splitting)

## Verification Plan

### Manual Testing

1. **Survey Submission Flow**
   - Navigate to `/survey`
   - Complete all 30 questions across 4 sections
   - Verify auto-save works (refresh page mid-survey)
   - Submit and verify redirect to results page

2. **Scoring Accuracy**
   - Test with known input values
   - Verify tier assignment matches expected tier
   - Check radar chart displays correct scores
   - Verify hard rules trigger correctly (e.g., height < 160cm → C tier)

3. **Recommendations**
   - Verify pageants match tier level
   - Check match scores are reasonable (50-100 range)
   - Verify reasoning text is relevant

4. **Edge Cases**
   - Incomplete survey (missing required fields)
   - Invalid input (negative numbers, invalid URLs)
   - Duplicate submission (should update, not create new)
   - User without survey data (should show welcome screen)

### Automated Testing

```bash
# Backend tests
php artisan test --filter=SurveyTest
php artisan test --filter=TalentScoringTest

# Frontend tests (if implemented)
npm run test
```

### Database Verification

```sql
-- Check survey responses saved correctly
SELECT * FROM survey_responses WHERE user_id = 1;

-- Check scores calculated
SELECT * FROM talent_scores WHERE user_id = 1;

-- Check tier assigned to profile
SELECT id, name, tier, tier_updated_at FROM profiles WHERE id = 1;

-- Check recommendations generated
SELECT * FROM pageant_recommendations WHERE user_id = 1 ORDER BY match_score DESC;
```

### API Testing with Postman/Insomnia

1. POST `/api/survey/submit` with Section A answers
2. GET `/api/survey/progress` - should show Section A completed
3. POST `/api/survey/calculate` - should return tier and scores
4. GET `/api/recommendations` - should return 5 pageants

## Success Criteria

- ✅ User can complete 30-question survey in under 15 minutes
- ✅ Tier assignment is accurate based on scoring algorithm
- ✅ Radar chart displays all 10 criteria correctly
- ✅ Recommendations are relevant to user's tier
- ✅ Survey data persists across sessions (auto-save)
- ✅ Mobile-responsive design works on iOS/Android
- ✅ Page load time < 2 seconds
- ✅ No console errors or warnings

## Future Enhancements

- AI-powered photo analysis for M1.1 (Physical Attributes)
- Video analysis for M1.4 (Communication Skills)
- Social media API integration for real-time follower counts
- Peer comparison (show how user ranks vs others in same tier)
- Tier progression tracking (show improvement over time)
- Gamification (badges, achievements for completing survey)
- Export results as PDF report
