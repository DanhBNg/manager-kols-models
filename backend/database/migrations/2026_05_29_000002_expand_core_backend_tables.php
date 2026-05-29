<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('profiles', function (Blueprint $table): void {
            $table->string('full_name')->nullable()->after('user_id');
            $table->string('district')->nullable()->after('city');
            $table->string('skin_tone')->nullable()->after('measurements');
            $table->string('hair_color')->nullable()->after('skin_tone');
            $table->boolean('has_tattoo')->default(false)->after('hair_color');
            $table->text('tattoo_description')->nullable()->after('has_tattoo');
            $table->json('languages')->nullable()->after('tattoo_description');
            $table->unsignedSmallInteger('experience_years')->nullable()->after('skills');
            $table->unsignedSmallInteger('work_radius')->nullable()->after('experience_years');
            $table->json('preferred_cities')->nullable()->after('work_radius');
            $table->string('agency_badge')->nullable()->after('preferred_cities');
            $table->timestamp('tier_updated_at')->nullable()->after('tier');
        });

        Schema::table('photos', function (Blueprint $table): void {
            $table->string('url')->nullable()->after('profile_id');
            $table->string('thumbnail_url')->nullable()->after('url');
            $table->string('category')->nullable()->after('thumbnail_url');
            $table->unsignedInteger('width')->nullable()->after('category');
            $table->unsignedInteger('height')->nullable()->after('width');
            $table->unsignedBigInteger('file_size')->nullable()->after('height');
            $table->unsignedInteger('display_order')->default(0)->after('sort_order');
            $table->boolean('is_primary')->default(false)->after('is_cover');
            $table->json('ai_tags')->nullable()->after('is_primary');
            $table->timestamp('uploaded_at')->nullable()->after('ai_tags');
        });

        Schema::table('videos', function (Blueprint $table): void {
            $table->string('thumbnail_url')->nullable()->after('url');
            $table->unsignedInteger('duration')->nullable()->after('thumbnail_url');
            $table->unsignedBigInteger('file_size')->nullable()->after('duration');
            $table->string('video_type')->nullable()->after('file_size');
            $table->timestamp('uploaded_at')->nullable()->after('video_type');
        });

        Schema::table('social_accounts', function (Blueprint $table): void {
            $table->foreignId('user_id')->nullable()->after('id')->constrained()->cascadeOnDelete();
            $table->string('platform_user_id')->nullable()->after('platform');
            $table->string('username')->nullable()->after('platform_user_id');
            $table->text('access_token')->nullable()->after('url');
            $table->text('refresh_token')->nullable()->after('access_token');
            $table->timestamp('token_expires_at')->nullable()->after('refresh_token');
            $table->timestamp('last_synced_at')->nullable()->after('token_expires_at');
        });

        Schema::create('social_metrics_history', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('social_account_id')->constrained()->cascadeOnDelete();
            $table->unsignedBigInteger('followers_count')->default(0);
            $table->unsignedBigInteger('following_count')->default(0);
            $table->unsignedInteger('posts_count')->default(0);
            $table->decimal('engagement_rate', 5, 2)->nullable();
            $table->decimal('authenticity_score', 5, 2)->nullable();
            $table->timestamp('recorded_at')->useCurrent();
            $table->timestamps();
        });

        Schema::table('calendar_events', function (Blueprint $table): void {
            $table->foreignId('user_id')->nullable()->after('id')->constrained()->cascadeOnDelete();
            $table->string('event_type')->default('personal')->after('status');
            $table->string('external_calendar_id')->nullable()->after('event_type');
        });

        Schema::create('bookings', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('campaign_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('partner_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('talent_user_id')->constrained('users')->cascadeOnDelete();
            $table->dateTime('starts_at');
            $table->dateTime('ends_at');
            $table->string('location')->nullable();
            $table->unsignedBigInteger('compensation_amount')->nullable();
            $table->decimal('platform_commission_rate', 5, 2)->default(10);
            $table->unsignedBigInteger('platform_commission_amount')->nullable();
            $table->string('status')->default('pending');
            $table->string('payment_status')->default('pending');
            $table->timestamps();
        });

        Schema::create('survey_responses', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('section', 1);
            $table->string('question_code', 10);
            $table->json('answer_value');
            $table->timestamp('submitted_at')->useCurrent();
            $table->timestamps();
            $table->unique(['user_id', 'question_code']);
        });

        Schema::create('talent_scores', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('criterion_code', 10);
            $table->decimal('score', 5, 2);
            $table->string('tier', 1);
            $table->timestamp('calculated_at')->useCurrent();
            $table->timestamps();
            $table->unique(['user_id', 'criterion_code']);
        });

        Schema::create('pageant_recommendations', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('pageant_name');
            $table->decimal('match_score', 5, 2);
            $table->text('reasoning');
            $table->timestamp('recommended_at')->useCurrent();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pageant_recommendations');
        Schema::dropIfExists('talent_scores');
        Schema::dropIfExists('survey_responses');
        Schema::dropIfExists('bookings');
        Schema::dropIfExists('social_metrics_history');
    }
};
