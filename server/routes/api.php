<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\TeamController;
use Illuminate\Support\Facades\Route;

// Root welcome route (equivalent of app.get('/', ...) in server.js)
Route::get('/', function () {
    return response()->json([
        'message' => 'Welcome to the AL-NOOR BuildWorks API',
        'status'  => 'Running',
    ]);
});

// /api/contact  -> POST
Route::post('/contact', [ContactController::class, 'store']);

// /api/projects -> GET
Route::get('/projects', [ProjectController::class, 'index']);

// /api/services -> GET
Route::get('/services', [ServiceController::class, 'index']);

// /api/team -> GET
Route::get('/team', [TeamController::class, 'index']);

// /api/auth/*
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/users', [AuthController::class, 'getAllUsers']);
    Route::put('/users/{id}/portfolio', [AuthController::class, 'updateUserPortfolio']);
    Route::get('/users/{id}/portfolio', [AuthController::class, 'getUserPortfolio']);
});
