<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Team;

class TeamController extends Controller
{
    // GET /api/team
    public function index()
    {
        return response()->json(Team::all(), 200);
    }
}
