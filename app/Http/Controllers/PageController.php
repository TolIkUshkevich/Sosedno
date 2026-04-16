<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PageController extends Controller
{
    function lending(Request $request) {
        return view('lending');
    }

    function mainPage(Request $request)
    {
        return view('mainPage');
    }
    
}