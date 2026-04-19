<?php

use Illuminate\Support\Facades\Route;
use App\Controllers\PageController;
use App\Controllers\UserController;

Route::get('/', [PageController::class, 'lending'])
    ->name('lending');

Route::get('/main', [PageController::class, 'mainPage'])
    ->name('main.page');

Route::post('/main/users', [UserController::class, 'store'])
    ->name('users.store');