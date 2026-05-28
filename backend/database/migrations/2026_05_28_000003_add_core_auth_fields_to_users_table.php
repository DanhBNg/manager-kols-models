<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table): void {
            $table->string('phone', 20)->nullable()->unique()->after('email');
            $table->boolean('is_verified')->default(false)->after('status');
            $table->boolean('is_ghost')->default(false)->after('is_verified');
            $table->timestamp('last_login_at')->nullable()->after('is_ghost');
            $table->index('type');
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table): void {
            $table->dropIndex(['type']);
            $table->dropIndex(['status']);
            $table->dropUnique(['phone']);
            $table->dropColumn(['phone', 'is_verified', 'is_ghost', 'last_login_at']);
        });
    }
};
