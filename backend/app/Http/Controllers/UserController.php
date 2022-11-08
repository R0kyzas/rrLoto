<?php

namespace App\Http\Controllers;

use App\Models\Winner;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $winners = Winner::with('ticket')->get();

        return response()->json([
            'winners' => $winners,
        ]);
    }
}
