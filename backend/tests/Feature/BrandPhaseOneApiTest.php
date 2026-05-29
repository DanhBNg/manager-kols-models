<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

class BrandPhaseOneApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_phase_one_tables_exist(): void
    {
        foreach ([
            'partner_profiles',
            'profiles',
            'photos',
            'videos',
            'social_accounts',
            'calendar_events',
            'wishlists',
            'wishlist_items',
            'campaigns',
            'campaign_talents',
            'contact_requests',
        ] as $table) {
            $this->assertTrue(Schema::hasTable($table), "{$table} table is missing.");
        }
    }

    public function test_brand_can_create_and_update_partner_profile(): void
    {
        $brand = User::factory()->create(['type' => 'brand']);

        $this->actingAs($brand, 'sanctum')
            ->putJson('/api/partner/profile', [
                'organization_name' => 'Onstage Beauty',
                'organization_type' => 'brand',
                'industry' => 'beauty',
                'website_url' => 'https://example.com',
                'fanpage_url' => 'https://facebook.com/onstage',
                'contact_name' => 'Danh Nguyen',
                'contact_phone' => '0901234567',
                'contact_email' => 'brand@example.com',
                'city' => 'Ha Noi',
                'description' => 'Can tuyen talent cho chien dich my pham.',
            ])
            ->assertOk()
            ->assertJsonPath('data.organization_name', 'Onstage Beauty')
            ->assertJsonPath('data.organization_type', 'brand')
            ->assertJsonPath('data.verification_status', 'pending');

        $this->actingAs($brand, 'sanctum')
            ->getJson('/api/partner/profile')
            ->assertOk()
            ->assertJsonPath('data.organization_name', 'Onstage Beauty');
    }

    public function test_talent_user_cannot_manage_partner_profile(): void
    {
        $talent = User::factory()->create(['type' => 'talent']);

        $this->actingAs($talent, 'sanctum')
            ->putJson('/api/partner/profile', [
                'organization_name' => 'Wrong Account',
                'organization_type' => 'brand',
                'industry' => 'beauty',
                'contact_name' => 'Talent User',
                'contact_email' => 'talent@example.com',
                'city' => 'Ha Noi',
            ])
            ->assertForbidden();
    }

    public function test_brand_can_search_talents_with_filters_and_view_detail(): void
    {
        $brand = User::factory()->create(['type' => 'brand']);
        $talent = User::factory()->create([
            'name' => 'Minh Anh',
            'type' => 'talent',
            'is_verified' => true,
        ]);

        $profileId = $this->createTalentProfile($talent, [
            'display_name' => 'Minh Anh Model',
            'talent_types' => ['model', 'kol'],
            'city' => 'Ho Chi Minh',
            'gender' => 'female',
            'birth_date' => now()->subYears(24)->toDateString(),
            'height_cm' => 172,
            'budget_min' => 3000000,
            'budget_max' => 8000000,
            'tier' => 'A',
            'profile_completion' => 88,
            'rating' => 4.7,
        ]);

        $this->actingAs($brand, 'sanctum')
            ->getJson('/api/talents?q=minh&type=model&city=Ho%20Chi%20Minh&gender=female&min_age=20&max_age=30&min_height=170&verified=1&tier=A&sort=rating')
            ->assertOk()
            ->assertJsonPath('data.0.id', $profileId)
            ->assertJsonPath('data.0.display_name', 'Minh Anh Model');

        $this->actingAs($brand, 'sanctum')
            ->getJson("/api/talents/{$profileId}")
            ->assertOk()
            ->assertJsonPath('data.id', $profileId)
            ->assertJsonPath('data.user.email', null);
    }

    public function test_brand_can_manage_wishlist_items_without_duplicates(): void
    {
        $brand = User::factory()->create(['type' => 'brand']);
        $talent = User::factory()->create(['type' => 'talent']);
        $profileId = $this->createTalentProfile($talent);

        $wishlistId = $this->actingAs($brand, 'sanctum')
            ->postJson('/api/wishlists', [
                'name' => 'Danh sach da luu',
                'description' => 'Talent tiem nang',
            ])
            ->assertCreated()
            ->assertJsonPath('data.name', 'Danh sach da luu')
            ->json('data.id');

        $this->actingAs($brand, 'sanctum')
            ->postJson("/api/wishlists/{$wishlistId}/items", [
                'profile_id' => $profileId,
                'notes' => 'Hop voi campaign thang 7',
            ])
            ->assertCreated()
            ->assertJsonPath('data.profile.id', $profileId);

        $this->actingAs($brand, 'sanctum')
            ->postJson("/api/wishlists/{$wishlistId}/items", [
                'profile_id' => $profileId,
            ])
            ->assertUnprocessable();

        $this->actingAs($brand, 'sanctum')
            ->getJson("/api/wishlists/{$wishlistId}")
            ->assertOk()
            ->assertJsonCount(1, 'data.items');
    }

    public function test_brand_can_create_publish_close_campaign_and_manage_talent_stage(): void
    {
        $brand = User::factory()->create(['type' => 'brand']);
        $talent = User::factory()->create(['type' => 'talent']);
        $profileId = $this->createTalentProfile($talent);

        $campaignId = $this->actingAs($brand, 'sanctum')
            ->postJson('/api/campaigns', [
                'title' => 'Launch my pham thang 7',
                'job_type' => 'model',
                'description' => 'Can model chup lookbook.',
                'city' => 'Ha Noi',
                'location' => 'Hoan Kiem',
                'start_date' => '2026-07-01',
                'end_date' => '2026-07-03',
                'talent_quantity' => 3,
                'budget_min' => 3000000,
                'budget_max' => 9000000,
                'requirements' => 'Cao tren 165cm, co kinh nghiem beauty.',
            ])
            ->assertCreated()
            ->assertJsonPath('data.status', 'draft')
            ->json('data.id');

        $this->actingAs($brand, 'sanctum')
            ->postJson("/api/campaigns/{$campaignId}/publish")
            ->assertOk()
            ->assertJsonPath('data.status', 'published');

        $campaignTalentId = $this->actingAs($brand, 'sanctum')
            ->postJson("/api/campaigns/{$campaignId}/talents", [
                'profile_id' => $profileId,
                'status' => 'shortlisted',
                'notes' => 'Uu tien phong cach beauty.',
            ])
            ->assertCreated()
            ->assertJsonPath('data.status', 'shortlisted')
            ->json('data.id');

        $this->actingAs($brand, 'sanctum')
            ->putJson("/api/campaigns/{$campaignId}/talents/{$campaignTalentId}", [
                'status' => 'interview',
                'notes' => 'Hen trao doi brief.',
            ])
            ->assertOk()
            ->assertJsonPath('data.status', 'interview');

        $this->actingAs($brand, 'sanctum')
            ->postJson("/api/campaigns/{$campaignId}/close")
            ->assertOk()
            ->assertJsonPath('data.status', 'closed');
    }

    public function test_brand_can_create_and_cancel_contact_request(): void
    {
        $brand = User::factory()->create(['type' => 'brand']);
        $talent = User::factory()->create(['type' => 'talent']);
        $profileId = $this->createTalentProfile($talent);

        $requestId = $this->actingAs($brand, 'sanctum')
            ->postJson('/api/contact-requests', [
                'profile_id' => $profileId,
                'message' => 'Muon moi ban tham gia campaign beauty.',
            ])
            ->assertCreated()
            ->assertJsonPath('data.status', 'pending')
            ->json('data.id');

        $this->actingAs($brand, 'sanctum')
            ->postJson("/api/contact-requests/{$requestId}/cancel")
            ->assertOk()
            ->assertJsonPath('data.status', 'cancelled');
    }

    /**
     * @param array<string, mixed> $overrides
     */
    private function createTalentProfile(User $user, array $overrides = []): int
    {
        return (int) $user->profile()->create(array_merge([
            'display_name' => $user->name,
            'slug' => 'profile-'.$user->id,
            'talent_types' => ['model'],
            'city' => 'Ha Noi',
            'gender' => 'female',
            'birth_date' => now()->subYears(22)->toDateString(),
            'height_cm' => 168,
            'weight_kg' => 50,
            'measurements' => '82-60-88',
            'experience' => 'Da tham gia nhieu campaign.',
            'skills' => ['posing', 'livestream'],
            'bio' => 'Talent demo',
            'budget_min' => 2000000,
            'budget_max' => 6000000,
            'tier' => 'B',
            'profile_completion' => 75,
            'rating' => 4.2,
            'verification_status' => 'verified',
            'is_public' => true,
        ], $overrides))->id;
    }
}
