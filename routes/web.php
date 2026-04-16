<?php

use Illuminate\Support\Facades\Route;
use App\Controllers\PageController;

Route::get('/', [PageController::class, 'lending'])
    ->name('lending');

Route::get('/main', [PageController::class, 'mainPage'])
    ->name('main.page');