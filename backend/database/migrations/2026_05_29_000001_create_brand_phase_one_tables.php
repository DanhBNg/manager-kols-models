<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('partner_profiles', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->cascadeOnDelete();
            $table->string('organization_name');
            $table->string('organization_type');
            $table->string('industry')->nullable();
            $table->string('website_url')->nullable();
            $table->string('fanpage_url')->nullable();
            $table->string('contact_name');
            $table->string('contact_phone', 20)->nullable();
            $table->string('contact_email');
            $table->string('city');
            $table->text('description')->nullable();
            $table->string('verification_status')->default('pending');
            $table->timestamps();
        });

        Schema::create('profiles', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->cascadeOnDelete();
            $table->string('display_name');
            $table->string('slug')->unique();
            $table->json('talent_types');
            $table->string('city')->index();
            $table->string('gender')->nullable()->index();
            $table->date('birth_date')->nullable();
            $table->unsignedSmallInteger('height_cm')->nullable()->index();
            $table->unsignedSmallInteger('weight_kg')->nullable();
            $table->string('measurements')->nullable();
            $table->text('experience')->nullable();
            $table->json('skills')->nullable();
            $table->text('bio')->nullable();
            $table->unsignedBigInteger('budget_min')->nullable()->index();
            $table->unsignedBigInteger('budget_max')->nullable()->index();
            $table->string('tier')->nullable()->index();
            $table->unsignedTinyInteger('profile_completion')->default(0)->index();
            $table->decimal('rating', 3, 2)->nullable()->index();
            $table->string('verification_status')->default('pending')->index();
            $table->boolean('is_public')->default(false)->index();
            $table->timestamps();
        });

        Schema::create('photos', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('profile_id')->constrained()->cascadeOnDelete();
            $table->string('path');
            $table->string('disk')->default('public');
            $table->string('caption')->nullable();
            $table->boolean('is_cover')->default(false);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('videos', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('profile_id')->constrained()->cascadeOnDelete();
            $table->string('url');
            $table->string('title')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('social_accounts', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('profile_id')->constrained()->cascadeOnDelete();
            $table->string('platform')->index();
            $table->string('handle')->nullable();
            $table->string('url')->nullable();
            $table->unsignedBigInteger('followers_count')->default(0);
            $table->boolean('is_verified')->default(false);
            $table->timestamps();
        });

        Schema::create('calendar_events', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('profile_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->string('status')->default('available');
            $table->dateTime('starts_at');
            $table->dateTime('ends_at');
            $table->timestamps();
        });

        Schema::create('wishlists', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->text('description')->nullable();
            $table->timestamps();
        });

        Schema::create('wishlist_items', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('wishlist_id')->constrained()->cascadeOnDelete();
            $table->foreignId('profile_id')->constrained()->cascadeOnDelete();
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->unique(['wishlist_id', 'profile_id']);
        });

        Schema::create('campaigns', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('owner_user_id')->constrained('users')->cascadeOnDelete();
            $table->string('title');
            $table->string('job_type')->index();
            $table->text('description')->nullable();
            $table->string('city')->nullable()->index();
            $table->string('location')->nullable();
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->unsignedSmallInteger('talent_quantity')->default(1);
            $table->unsignedBigInteger('budget_min')->nullable();
            $table->unsignedBigInteger('budget_max')->nullable();
            $table->text('requirements')->nullable();
            $table->string('status')->default('draft')->index();
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });

        Schema::create('campaign_talents', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('campaign_id')->constrained()->cascadeOnDelete();
            $table->foreignId('profile_id')->constrained()->cascadeOnDelete();
            $table->string('status')->default('new')->index();
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->unique(['campaign_id', 'profile_id']);
        });

        Schema::create('contact_requests', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('brand_user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('talent_user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('campaign_id')->nullable()->constrained()->nullOnDelete();
            $table->text('message')->nullable();
            $table->string('status')->default('pending')->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contact_requests');
        Schema::dropIfExists('campaign_talents');
        Schema::dropIfExists('campaigns');
        Schema::dropIfExists('wishlist_items');
        Schema::dropIfExists('wishlists');
        Schema::dropIfExists('calendar_events');
        Schema::dropIfExists('social_accounts');
        Schema::dropIfExists('videos');
        Schema::dropIfExists('photos');
        Schema::dropIfExists('profiles');
        Schema::dropIfExists('partner_profiles');
    }
};
