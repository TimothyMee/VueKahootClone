<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    //

    public function verify(Request $request)
    {
        $request = $request->all();
        if($request['gamepin'] == "5497202"){
            return 1;
        }
        return 0;
    }
}
