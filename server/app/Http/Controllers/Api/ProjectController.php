<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;

class ProjectController extends Controller
{
    // GET /api/projects
    public function index()
    {
        return response()->json(Project::orderBy('created_at', 'desc')->get(), 200);
    }
}
