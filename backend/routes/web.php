<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Survey routes
    Route::get('/survey', function () {
        return Inertia::render('Survey/Welcome');
    })->name('survey.welcome');

    Route::get('/survey/start', function () {
        return Inertia::render('Survey/TalentSurvey');
    })->name('survey.start');

    Route::get('/survey/results', function () {
        return Inertia::render('Survey/Results');
    })->name('survey.results');
});

require __DIR__.'/auth.php';
