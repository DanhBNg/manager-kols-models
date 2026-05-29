<?php

namespace Tests\Feature;

use App\Models\Campaign;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class BackendExpansionApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_core_expansion_tables_exist(): void
    {
        foreach ([
            'social_metrics_history',
            'bookings',
            'survey_responses',
            'talent_scores',
            'pageant_recommendations',
        ] as $table) {
            $this->assertTrue(Schema::hasTable($table), "{$table} table is missing.");
        }
    }

    public function test_talent_can_manage_profile_and_media(): void
    {
        Storage::fake('public');

        $talent = User::factory()->create(['type' => 'talent']);

        $profileId = $this->actingAs($talent, 'sanctum')
            ->putJson('/api/my/profile', [
                'display_name' => 'Linh Chi',
                'talent_types' => ['model', 'mc'],
                'city' => 'Ha Noi',
                'gender' => 'female',
                'birth_date' => '2002-05-20',
                'height_cm' => 170,
                'weight_kg' => 50,
                'measurements' => '82-60-88',
                'skin_tone' => 'warm',
                'hair_color' => 'black',
                'has_tattoo' => false,
                'languages' => ['Vietnamese', 'English'],
                'skills' => ['posing', 'catwalk'],
                'experience_years' => 2,
                'work_radius' => 30,
                'preferred_cities' => ['Ha Noi', 'Da Nang'],
                'bio' => 'Talent dang xay dung portfolio.',
                'budget_min' => 2000000,
                'budget_max' => 7000000,
                'is_public' => true,
            ])
            ->assertOk()
            ->assertJsonPath('data.display_name', 'Linh Chi')
            ->json('data.id');

        $this->actingAs($talent, 'sanctum')
            ->postJson("/api/profiles/{$profileId}/photos", [
                'file' => UploadedFile::fake()->create('portfolio.jpg', 100, 'image/jpeg'),
                'category' => 'portfolio',
                'caption' => 'Anh portfolio',
                'is_primary' => true,
            ])
            ->assertCreated()
            ->assertJsonPath('data.category', 'portfolio');

        $this->actingAs($talent, 'sanctum')
            ->postJson("/api/profiles/{$profileId}/videos", [
                'url' => 'https://example.com/showreel.mp4',
                'title' => 'Showreel',
                'video_type' => 'skill_showcase',
            ])
            ->assertCreated()
            ->assertJsonPath('data.title', 'Showreel');

        $this->actingAs($talent, 'sanctum')
            ->getJson("/api/profiles/{$profileId}/completion")
            ->assertOk()
            ->assertJsonPath('data.score', 100);
    }

    public function test_talent_can_manage_social_metrics_and_calendar(): void
    {
        $talent = User::factory()->create(['type' => 'talent']);
        $profile = $this->createProfile($talent);

        $accountId = $this->actingAs($talent, 'sanctum')
            ->postJson('/api/social/accounts', [
                'profile_id' => $profile->id,
                'platform' => 'tiktok',
                'handle' => '@linhchi',
                'url' => 'https://tiktok.com/@linhchi',
                'followers_count' => 120000,
            ])
            ->assertCreated()
            ->assertJsonPath('data.platform', 'tiktok')
            ->json('data.id');

        $this->actingAs($talent, 'sanctum')
            ->postJson("/api/social/accounts/{$accountId}/metrics", [
                'followers_count' => 121000,
                'following_count' => 400,
                'posts_count' => 90,
                'engagement_rate' => 3.5,
                'authenticity_score' => 82,
            ])
            ->assertCreated()
            ->assertJsonPath('data.followers_count', 121000);

        $this->actingAs($talent, 'sanctum')
            ->postJson('/api/calendar/events', [
                'profile_id' => $profile->id,
                'title' => 'Ranh chup lookbook',
                'status' => 'available',
                'event_type' => 'personal',
                'starts_at' => '2026-07-01 09:00:00',
                'ends_at' => '2026-07-01 12:00:00',
            ])
            ->assertCreated()
            ->assertJsonPath('data.status', 'available');
    }

    public function test_brand_can_create_booking_request(): void
    {
        $brand = User::factory()->create(['type' => 'brand']);
        $talent = User::factory()->create(['type' => 'talent']);
        $profile = $this->createProfile($talent);
        $campaign = Campaign::create([
            'owner_user_id' => $brand->id,
            'title' => 'Campaign booking',
            'job_type' => 'model',
            'status' => 'published',
        ]);

        $this->actingAs($brand, 'sanctum')
            ->postJson('/api/bookings', [
                'campaign_id' => $campaign->id,
                'profile_id' => $profile->id,
                'starts_at' => '2026-07-02 08:00:00',
                'ends_at' => '2026-07-02 17:00:00',
                'location' => 'Ha Noi',
                'compensation_amount' => 5000000,
            ])
            ->assertCreated()
            ->assertJsonPath('data.status', 'pending')
            ->assertJsonPath('data.payment_status', 'pending');
    }

    public function test_talent_can_submit_survey_calculate_tier_and_get_recommendations(): void
    {
        $talent = User::factory()->create(['type' => 'talent']);
        $this->createProfile($talent);

        $this->actingAs($talent, 'sanctum')
            ->postJson('/api/survey/submit', [
                'section' => 'A',
                'answers' => [
                    ['question_code' => 'A1', 'answer_value' => 172],
                    ['question_code' => 'B1', 'answer_value' => 3],
                    ['question_code' => 'C1', 'answer_value' => 120000],
                    ['question_code' => 'D1', 'answer_value' => 'national_pageant'],
                ],
            ])
            ->assertOk()
            ->assertJsonPath('section_completed', 'A');

        $this->actingAs($talent, 'sanctum')
            ->postJson('/api/survey/calculate')
            ->assertOk()
            ->assertJsonPath('tier', 'A')
            ->assertJsonFragment(['M1.1' => 8.0]);

        $this->actingAs($talent, 'sanctum')
            ->getJson('/api/recommendations')
            ->assertOk()
            ->assertJsonCount(3, 'pageants');
    }

    private function createProfile(User $user): Profile
    {
        return Profile::create([
            'user_id' => $user->id,
            'display_name' => $user->name,
            'slug' => 'profile-'.$user->id,
            'talent_types' => ['model'],
            'city' => 'Ha Noi',
            'gender' => 'female',
            'birth_date' => '2002-01-01',
            'height_cm' => 170,
            'skills' => ['posing'],
            'bio' => 'Talent demo',
            'budget_min' => 2000000,
            'budget_max' => 6000000,
            'profile_completion' => 80,
            'verification_status' => 'verified',
            'is_public' => true,
        ]);
    }
}
