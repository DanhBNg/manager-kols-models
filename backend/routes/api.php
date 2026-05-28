<?php

use App\Http\Controllers\SurveyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Survey endpoints
    Route::prefix('survey')->group(function () {
        Route::post('/submit', [SurveyController::class, 'submit']);
        Route::get('/progress', [SurveyController::class, 'progress']);
        Route::post('/calculate', [SurveyController::class, 'calculate']);
    });

    // Recommendations endpoint
    Route::get('/recommendations', [SurveyController::class, 'recommendations']);
});
