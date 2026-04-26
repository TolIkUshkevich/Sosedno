<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;

Route::get('/', [PageController::class, 'lending'])
    ->name('lending');

Route::get('/waitlist', [PageController::class, 'waitlist'])
    ->name('waitlist');
