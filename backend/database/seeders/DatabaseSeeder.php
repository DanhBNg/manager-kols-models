<?php

namespace Database\Seeders;

use App\Models\Booking;
use App\Models\CalendarEvent;
use App\Models\Campaign;
use App\Models\CampaignTalent;
use App\Models\ContactRequest;
use App\Models\PageantRecommendation;
use App\Models\PartnerProfile;
use App\Models\Photo;
use App\Models\Profile;
use App\Models\SocialAccount;
use App\Models\SocialMetricsHistory;
use App\Models\SurveyResponse;
use App\Models\TalentScore;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::updateOrCreate(['email' => 'admin@example.com'], [
            'name' => 'Admin OnstageVN',
            'password' => 'password123',
            'type' => 'admin',
            'status' => 'active',
            'is_verified' => true,
        ]);

        $brand = User::updateOrCreate(['email' => 'brand.demo@example.com'], [
            'name' => 'Onstage Beauty Brand',
            'password' => 'password123',
            'type' => 'brand',
            'status' => 'active',
            'is_verified' => true,
        ]);

        PartnerProfile::updateOrCreate(['user_id' => $brand->id], [
            'organization_name' => 'Onstage Beauty Brand',
            'organization_type' => 'brand',
            'industry' => 'beauty',
            'website_url' => 'https://example.com',
            'fanpage_url' => 'https://facebook.com/onstage-beauty',
            'contact_name' => 'Brand Manager',
            'contact_phone' => '0900000001',
            'contact_email' => 'brand.demo@example.com',
            'city' => 'Ha Noi',
            'description' => 'Nhan hang beauty dang tim talent cho campaign ra mat san pham moi.',
            'verification_status' => 'verified',
        ]);

        $talentOne = $this->seedTalent('talent.linhchi@example.com', 'Linh Chi Model', 'Ha Noi', 'A', 172, 120000);
        $talentTwo = $this->seedTalent('talent.minhanh@example.com', 'Minh Anh KOL', 'Ho Chi Minh', 'B', 168, 45000);

        $campaign = Campaign::updateOrCreate(['title' => 'Launch mỹ phẩm tháng 7'], [
            'owner_user_id' => $brand->id,
            'job_type' => 'model',
            'description' => 'Cần model/KOL chụp lookbook và quay short video.',
            'city' => 'Ha Noi',
            'location' => 'Hoan Kiem',
            'start_date' => '2026-07-01',
            'end_date' => '2026-07-03',
            'talent_quantity' => 3,
            'budget_min' => 3000000,
            'budget_max' => 9000000,
            'requirements' => 'Cao trên 165cm, phù hợp phong cách beauty, có kinh nghiệm quay/chụp.',
            'status' => 'published',
            'published_at' => now(),
        ]);

        CampaignTalent::updateOrCreate([
            'campaign_id' => $campaign->id,
            'profile_id' => $talentOne->profile->id,
        ], [
            'status' => 'shortlisted',
            'notes' => 'Phù hợp visual beauty.',
        ]);

        CampaignTalent::updateOrCreate([
            'campaign_id' => $campaign->id,
            'profile_id' => $talentTwo->profile->id,
        ], [
            'status' => 'interview',
            'notes' => 'Có tệp follower tốt ở TikTok.',
        ]);

        $wishlist = $brand->wishlists()->updateOrCreate(['name' => 'Talent đã lưu'], [
            'description' => 'Danh sách talent demo để kiểm tra admin.',
        ]);
        $wishlist->items()->updateOrCreate(['profile_id' => $talentOne->profile->id], ['notes' => 'Ưu tiên cho campaign beauty.']);
        $wishlist->items()->updateOrCreate(['profile_id' => $talentTwo->profile->id], ['notes' => 'Phù hợp nội dung social.']);

        ContactRequest::updateOrCreate([
            'brand_user_id' => $brand->id,
            'talent_user_id' => $talentOne->id,
            'campaign_id' => $campaign->id,
        ], [
            'message' => 'Brand muốn trao đổi brief campaign beauty tháng 7.',
            'status' => 'pending',
        ]);

        Booking::updateOrCreate([
            'campaign_id' => $campaign->id,
            'partner_id' => $brand->id,
            'talent_user_id' => $talentOne->id,
        ], [
            'starts_at' => '2026-07-02 08:00:00',
            'ends_at' => '2026-07-02 17:00:00',
            'location' => 'Ha Noi',
            'compensation_amount' => 5000000,
            'platform_commission_rate' => 10,
            'platform_commission_amount' => 500000,
            'status' => 'pending',
            'payment_status' => 'pending',
        ]);
    }

    private function seedTalent(string $email, string $name, string $city, string $tier, int $height, int $followers): User
    {
        $talent = User::updateOrCreate(['email' => $email], [
            'name' => $name,
            'password' => 'password123',
            'type' => 'talent',
            'status' => 'active',
            'is_verified' => true,
        ]);

        $profile = Profile::updateOrCreate(['user_id' => $talent->id], [
            'full_name' => $name,
            'display_name' => $name,
            'slug' => str($name)->slug().'-'.$talent->id,
            'talent_types' => ['model', 'kol'],
            'city' => $city,
            'gender' => 'female',
            'birth_date' => '2002-01-01',
            'height_cm' => $height,
            'weight_kg' => 50,
            'measurements' => '82-60-88',
            'languages' => ['Vietnamese', 'English'],
            'skills' => ['posing', 'catwalk', 'livestream'],
            'experience_years' => 3,
            'bio' => 'Talent demo đã hoàn thiện hồ sơ để kiểm tra luồng admin.',
            'budget_min' => 2000000,
            'budget_max' => 8000000,
            'tier' => $tier,
            'tier_updated_at' => now(),
            'profile_completion' => 92,
            'rating' => 4.6,
            'verification_status' => 'verified',
            'is_public' => true,
        ]);

        Photo::updateOrCreate(['profile_id' => $profile->id, 'category' => 'portfolio'], [
            'path' => 'demo/portfolio-'.$profile->id.'.jpg',
            'url' => 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
            'disk' => 'public',
            'caption' => 'Ảnh portfolio demo',
            'is_cover' => true,
            'is_primary' => true,
            'uploaded_at' => now(),
        ]);

        $social = SocialAccount::updateOrCreate(['profile_id' => $profile->id, 'platform' => 'tiktok'], [
            'user_id' => $talent->id,
            'handle' => '@'.str($name)->slug(''),
            'username' => str($name)->slug(''),
            'url' => 'https://tiktok.com',
            'followers_count' => $followers,
            'is_verified' => true,
            'last_synced_at' => now(),
        ]);

        SocialMetricsHistory::updateOrCreate(['social_account_id' => $social->id], [
            'followers_count' => $followers,
            'following_count' => 300,
            'posts_count' => 80,
            'engagement_rate' => 3.8,
            'authenticity_score' => 82,
            'recorded_at' => now(),
        ]);

        CalendarEvent::updateOrCreate(['profile_id' => $profile->id, 'title' => 'Lịch rảnh demo'], [
            'user_id' => $talent->id,
            'status' => 'available',
            'event_type' => 'personal',
            'starts_at' => '2026-07-01 09:00:00',
            'ends_at' => '2026-07-01 17:00:00',
        ]);

        foreach (['A1' => $height, 'B1' => 3, 'C1' => $followers, 'D1' => 'national_pageant'] as $code => $answer) {
            SurveyResponse::updateOrCreate(['user_id' => $talent->id, 'question_code' => $code], [
                'section' => substr($code, 0, 1),
                'answer_value' => $answer,
                'submitted_at' => now(),
            ]);
        }

        foreach (['M1.1' => 8, 'M1.3' => 8.5, 'M1.5' => 8] as $criterion => $score) {
            TalentScore::updateOrCreate(['user_id' => $talent->id, 'criterion_code' => $criterion], [
                'score' => $score,
                'tier' => $tier,
                'calculated_at' => now(),
            ]);
        }

        PageantRecommendation::updateOrCreate(['user_id' => $talent->id, 'pageant_name' => 'Miss Cosmo Vietnam'], [
            'match_score' => 86,
            'reasoning' => 'Phù hợp tier hiện tại và phong cách hồ sơ demo.',
            'recommended_at' => now(),
        ]);

        return $talent->load('profile');
    }
}
