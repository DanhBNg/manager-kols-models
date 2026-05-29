<?php

namespace Tests\Feature;

use App\Models\User;
use App\Services\AdminPasswordService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
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
