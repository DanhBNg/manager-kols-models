<?php

namespace Tests\Feature;

use App\Models\User;
use App\Services\AdminPasswordService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Spatie\LaravelPasskeys\Models\Concerns\HasPasskeys;
use Stephenjude\FilamentTwoFactorAuthentication\Actions\DisableTwoFactorAuthentication;
use Stephenjude\FilamentTwoFactorAuthentication\TwoFactorAuthenticatable;
use Tests\TestCase;

class AdminSecurityTest extends TestCase
{
    use RefreshDatabase;

    public function test_only_admin_can_access_filament_panel(): void
    {
        $admin = User::factory()->create(['type' => 'admin']);
        $brand = User::factory()->create(['type' => 'brand']);

        $this->assertTrue($admin->canAccessPanel(app('filament')->getPanel('admin')));
        $this->assertFalse($brand->canAccessPanel(app('filament')->getPanel('admin')));
    }

    public function test_change_password_link_is_in_admin_user_menu(): void
    {
        $items = app('filament')->getPanel('admin')->getUserMenuItems();

        $this->assertArrayHasKey('change-password', $items);
        $this->assertSame('Đổi mật khẩu', $items['change-password']->getLabel());
        $this->assertStringEndsWith('/admin/change-password', $items['change-password']->getUrl());
    }

    public function test_admin_user_model_supports_two_factor_authentication(): void
    {
        $this->assertContains(TwoFactorAuthenticatable::class, class_uses_recursive(User::class));
        $this->assertContains(HasPasskeys::class, class_implements(User::class));
    }

    public function test_two_factor_authentication_link_is_in_admin_user_menu(): void
    {
        $items = app('filament')->getPanel('admin')->getUserMenuItems();
        $labels = array_map(fn ($item): string => $item->getLabel(), $items);

        $this->assertContains('Xác minh 2 bước', $labels);
    }

    public function test_two_factor_authentication_copy_is_vietnamese(): void
    {
        $this->assertSame(
            'Xác minh 2 bước',
            __('filament-two-factor-authentication::section.header')
        );

        $this->assertSame(
            'Mã xác minh 2 bước không hợp lệ.',
            __('filament-two-factor-authentication::pages.challenge.error')
        );

        $this->assertSame('Tắt', __('filament-two-factor-authentication::components.2fa.disable'));
    }

    public function test_admin_two_factor_authentication_can_be_disabled(): void
    {
        $admin = User::factory()->create([
            'type' => 'admin',
            'two_factor_secret' => encrypt('secret-key'),
            'two_factor_recovery_codes' => encrypt(json_encode(['recovery-code'])),
            'two_factor_confirmed_at' => now(),
        ]);

        $this->assertTrue($admin->hasEnabledTwoFactorAuthentication());

        app(DisableTwoFactorAuthentication::class)($admin);

        $admin->refresh();

        $this->assertFalse($admin->hasEnabledTwoFactorAuthentication());
        $this->assertNull($admin->two_factor_secret);
        $this->assertNull($admin->two_factor_recovery_codes);
        $this->assertNull($admin->two_factor_confirmed_at);
    }

    public function test_admin_can_change_own_password_with_current_password(): void
    {
        $admin = User::factory()->create([
            'type' => 'admin',
            'password' => Hash::make('old-password123'),
        ]);

        app(AdminPasswordService::class)->changePassword($admin, 'old-password123', 'new-password123');

        $this->assertTrue(Hash::check('new-password123', $admin->fresh()->password));
    }

    public function test_admin_change_password_rejects_wrong_current_password(): void
    {
        $admin = User::factory()->create([
            'type' => 'admin',
            'password' => Hash::make('old-password123'),
        ]);

        $this->expectException(ValidationException::class);

        app(AdminPasswordService::class)->changePassword($admin, 'wrong-password', 'new-password123');
    }
}
