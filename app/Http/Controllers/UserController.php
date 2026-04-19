<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function store(Request $request) {
        $name = $request->input('name');
        $surname = $request->input('surname');
        $age = $request->input('name');
        $city = $request->input('city');
        $telegramUserName = $request->input('telegram_user_name');
        $status = $request->input('status');
        $referralSource = $request->input('referral_source');
        
        User::create([
            'name' => $name,
            'surname' => $surname,
            'age' => $age,
            'city' => $city,
            'natelegram_user_nameme' => $telegramUserName,
            'nastatusme' => $status,
            'referral_source' => $referralSource    
        ]);

        return response('ok', 200);
    }
}
