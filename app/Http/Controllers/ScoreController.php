<?php

namespace App\Http\Controllers;

use App\Events\CorrectAnswer;
use Illuminate\Http\Request;

class ScoreController extends Controller
{
    public function correctScore(Request $request)
    {
        $request = $request->all();

        broadcast(new CorrectAnswer($request['user'], $request['score']))->toOthers();
        return 'Good Job';
    }
}
