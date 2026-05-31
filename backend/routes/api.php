<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\CalendarEventController;
use App\Http\Controllers\Api\CampaignController;
use App\Http\Controllers\Api\CampaignTalentController;
use App\Http\Controllers\Api\ContactRequestController;
use App\Http\Controllers\Api\PartnerProfileController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\ProfileMediaController;
use App\Http\Controllers\Api\SocialAccountController;
use App\Http\Controllers\Api\SurveyController;
use App\Http\Controllers\Api\TalentController;
use App\Http\Controllers\Api\WishlistController;
use App\Http\Controllers\Api\WishlistItemController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Route;

Route::get('/health', fn () => response()->json([
    'status' => 'ok',
    'app' => config('app.name'),
]));

Route::get('/health/db', function () {
    try {
        DB::select('select 1');

        return response()->json([
            'status' => 'ok',
            'database' => config('database.default'),
            'has_sessions_table' => Schema::hasTable('sessions'),
            'has_users_table' => Schema::hasTable('users'),
        ]);
    } catch (Throwable $exception) {
        report($exception);

        return response()->json([
            'status' => 'error',
            'database' => config('database.default'),
            'message' => $exception->getMessage(),
        ], 500);
    }
});

Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::get('/auth/social/{provider}/redirect', [AuthController::class, 'socialRedirect']);
Route::get('/auth/social/{provider}/callback', [AuthController::class, 'socialCallback']);

Route::middleware('auth:sanctum')->group(function (): void {
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    Route::get('/partner/profile', [PartnerProfileController::class, 'show']);
    Route::put('/partner/profile', [PartnerProfileController::class, 'update']);

    Route::get('/talents', [TalentController::class, 'index']);
    Route::get('/talents/{profile}', [TalentController::class, 'show']);

    Route::get('/profiles/{profile}', [ProfileController::class, 'show']);
    Route::get('/my/profile', [ProfileController::class, 'showMine']);
    Route::put('/my/profile', [ProfileController::class, 'updateMine']);
    Route::get('/profiles/{profile}/completion', [ProfileController::class, 'completion']);
    Route::post('/profiles/{profile}/photos', [ProfileMediaController::class, 'storePhoto']);
    Route::delete('/profiles/{profile}/photos/{photo}', [ProfileMediaController::class, 'destroyPhoto']);
    Route::post('/profiles/{profile}/videos', [ProfileMediaController::class, 'storeVideo']);

    Route::post('/social/accounts', [SocialAccountController::class, 'store']);
    Route::post('/social/accounts/{socialAccount}/metrics', [SocialAccountController::class, 'metrics']);

    Route::get('/calendar/events', [CalendarEventController::class, 'index']);
    Route::post('/calendar/events', [CalendarEventController::class, 'store']);
    Route::put('/calendar/events/{event}', [CalendarEventController::class, 'update']);
    Route::delete('/calendar/events/{event}', [CalendarEventController::class, 'destroy']);

    Route::get('/bookings', [BookingController::class, 'index']);
    Route::post('/bookings', [BookingController::class, 'store']);

    Route::get('/wishlists', [WishlistController::class, 'index']);
    Route::post('/wishlists', [WishlistController::class, 'store']);
    Route::get('/wishlists/{wishlist}', [WishlistController::class, 'show']);
    Route::post('/wishlists/{wishlist}/items', [WishlistItemController::class, 'store']);
    Route::delete('/wishlists/{wishlist}/items/{item}', [WishlistItemController::class, 'destroy']);

    Route::get('/campaigns', [CampaignController::class, 'index']);
    Route::post('/campaigns', [CampaignController::class, 'store']);
    Route::get('/campaigns/{campaign}', [CampaignController::class, 'show']);
    Route::put('/campaigns/{campaign}', [CampaignController::class, 'update']);
    Route::post('/campaigns/{campaign}/publish', [CampaignController::class, 'publish']);
    Route::post('/campaigns/{campaign}/close', [CampaignController::class, 'close']);
    Route::get('/campaigns/{campaign}/talents', [CampaignTalentController::class, 'index']);
    Route::post('/campaigns/{campaign}/talents', [CampaignTalentController::class, 'store']);
    Route::put('/campaigns/{campaign}/talents/{campaignTalent}', [CampaignTalentController::class, 'update']);
    Route::delete('/campaigns/{campaign}/talents/{campaignTalent}', [CampaignTalentController::class, 'destroy']);

    Route::get('/contact-requests', [ContactRequestController::class, 'index']);
    Route::post('/contact-requests', [ContactRequestController::class, 'store']);
    Route::get('/contact-requests/{contactRequest}', [ContactRequestController::class, 'show']);
    Route::post('/contact-requests/{contactRequest}/cancel', [ContactRequestController::class, 'cancel']);

    Route::post('/survey/submit', [SurveyController::class, 'submit']);
    Route::get('/survey/progress', [SurveyController::class, 'progress']);
    Route::post('/survey/calculate', [SurveyController::class, 'calculate']);
    Route::get('/recommendations', [SurveyController::class, 'recommendations']);
});
