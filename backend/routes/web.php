<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'status' => 'ok',
        'service' => 'manager-kols-models-backend',
    ]);
});

Route::get('/health', fn () => response()->json([
    'status' => 'ok',
    'route' => 'web',
]));
