<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PageController extends Controller
{
    function lending(Request $request) {
        return view('lending');
    }

    function waitlist(Request $request) {
        return view('waitlist');
    }
}