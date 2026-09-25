<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;

class ServiceController extends Controller
{
    // GET /api/services
    public function index()
    {
        return response()->json(Service::all(), 200);
    }
}
