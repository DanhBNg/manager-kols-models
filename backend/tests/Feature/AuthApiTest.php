<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\User as SocialiteUser;
use Mockery;
use Tests\TestCase;

class AuthApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_users_table_has_core_spec_fields(): void
    {
        $this->assertTrue(Schema::hasColumns('users', [
            'phone',
            'type',
            'status',
            'is_verified',
            'is_ghost',
            'last_login_at',
        ]));
    }

    public function test_user_can_register_and_receive_token(): void
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Nguyen Van A',
            'email' => 'talent@example.com',
            'phone' => '0901234567',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'type' => 'talent',
        ]);

        $response->assertCreated()
            ->assertJsonPath('user.email', 'talent@example.com')
            ->assertJsonPath('user.phone', '0901234567')
            ->assertJsonPath('user.type', 'talent')
            ->assertJsonStructure(['token']);

        $this->assertDatabaseHas('users', [
            'email' => 'talent@example.com',
            'phone' => '0901234567',
            'type' => 'talent',
            'status' => 'active',
            'is_verified' => false,
            'is_ghost' => false,
        ]);
    }

    public function test_register_rejects_unsupported_user_type(): void
    {
        $this->postJson('/api/auth/register', [
            'name' => 'Unsupported User',
            'email' => 'unsupported-register@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'type' => 'admin',
        ])->assertUnprocessable()
            ->assertJsonValidationErrors(['type']);
    }

    public function test_user_can_login_and_fetch_profile_with_token(): void
    {
        $user = User::factory()->create([
            'email' => 'brand@example.com',
            'password' => Hash::make('password123'),
            'type' => 'brand',
            'status' => 'active',
        ]);

        $login = $this->postJson('/api/auth/login', [
            'email' => 'brand@example.com',
            'password' => 'password123',
        ]);

        $token = $login->assertOk()
            ->assertJsonPath('user.id', $user->id)
            ->assertJsonPath('user.type', 'brand')
            ->json('token');

        $this->assertNotNull($user->fresh()->last_login_at);

        $this->withToken($token)
            ->getJson('/api/auth/me')
            ->assertOk()
            ->assertJsonPath('user.email', 'brand@example.com');
    }

    public function test_login_rejects_wrong_password(): void
    {
        User::factory()->create([
            'email' => 'wrong-password@example.com',
            'password' => Hash::make('password123'),
        ]);

        $this->postJson('/api/auth/login', [
            'email' => 'wrong-password@example.com',
            'password' => 'wrong-password',
        ])->assertUnprocessable()
            ->assertJsonValidationErrors(['email']);
    }

    public function test_user_can_logout_current_token(): void
    {
        $user = User::factory()->create([
            'type' => 'talent',
            'status' => 'active',
        ]);

        $token = $user->createToken('auth-token')->plainTextToken;

        $this->withToken($token)
            ->postJson('/api/auth/logout')
            ->assertNoContent();

        $this->withToken($token)
            ->getJson('/api/auth/me')
            ->assertUnauthorized();
    }

    public function test_social_callback_creates_user_and_redirects_to_frontend_with_token(): void
    {
        config(['app.frontend_url' => 'http://localhost:3000']);

        $socialUser = (new SocialiteUser())->map([
            'id' => 'google-user-123',
            'name' => 'Google User',
            'email' => 'google-user@example.com',
            'avatar' => 'https://example.com/avatar.png',
        ]);

        $provider = Mockery::mock();
        $provider->shouldReceive('stateless')->once()->andReturnSelf();
        $provider->shouldReceive('user')->once()->andReturn($socialUser);

        Socialite::shouldReceive('driver')
            ->once()
            ->with('google')
            ->andReturn($provider);

        $response = $this->getJson('/api/auth/social/google/callback?type=brand');

        $response->assertRedirect();

        $location = $response->headers->get('Location');

        $this->assertStringStartsWith('http://localhost:3000/auth/social/callback?', $location);
        $this->assertStringContainsString('token=', $location);
        $this->assertStringContainsString('type=brand', $location);

        $this->assertDatabaseHas('users', [
            'email' => 'google-user@example.com',
            'type' => 'brand',
            'social_provider' => 'google',
            'social_id' => 'google-user-123',
        ]);
    }
}
