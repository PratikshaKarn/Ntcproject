<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    // POST /api/auth/register
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'firstName' => 'required|string',
            'lastName'  => 'required|string',
            'email'     => 'required|email',
            'password'  => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['msg' => 'Please enter all fields'], 400);
        }

        $data = $validator->validated();

        if (User::where('email', $data['email'])->exists()) {
            return response()->json(['msg' => 'User already exists'], 400);
        }

        // --- CLIENT CODE GENERATION (AL001, AL002...) ---
        // Same logic as the Mongoose version: find the most recent
        // user whose clientCode starts with "AL" and increment it.
        $lastUser = User::where('clientCode', 'like', 'AL%')
            ->orderBy('created_at', 'desc')
            ->first();

        $nextCodeNumber = 1;
        if ($lastUser && $lastUser->clientCode) {
            $lastNumber = (int) str_replace('AL', '', $lastUser->clientCode);
            if ($lastNumber > 0) {
                $nextCodeNumber = $lastNumber + 1;
            }
        }
        $generatedClientCode = 'AL' . str_pad($nextCodeNumber, 3, '0', STR_PAD_LEFT);

        $user = User::create([
            'firstName'  => $data['firstName'],
            'lastName'   => $data['lastName'],
            'email'      => $data['email'],
            'password'   => Hash::make($data['password']),
            'clientCode' => $generatedClientCode,
        ]);

        $fullName = "{$user->firstName} {$user->lastName}";
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            '_id'        => $user->id,
            'name'       => $fullName,
            'email'      => $user->email,
            'role'       => $user->role,
            'clientCode' => $user->clientCode,
            'token'      => $token,
        ], 201);
    }

    // POST /api/auth/login
    public function login(Request $request)
    {
        $email = $request->input('email');
        $password = $request->input('password');

        if (!$email || !$password) {
            return response()->json(['msg' => 'Please enter all fields'], 400);
        }

        // Hardcoded admin login, ported as-is from the Node version.
        // Recommend moving this into the users table / .env once you migrate.
        $adminEmail = 'anbuildworks@gmail.com';
        $adminPass = 'Alnoor001@@##';

        if ($email === $adminEmail && $password === $adminPass) {
            $adminName = 'AL-NOOR ADMIN';
            $adminToken = 'admin_master_id_' . bin2hex(random_bytes(16));

            return response()->json([
                '_id'                  => 'admin_master_id',
                'name'                 => $adminName,
                'email'                => $adminEmail,
                'role'                 => 'admin',
                'clientCode'           => 'ADMIN',
                'hasPurchasedServices' => true,
                'token'                => $adminToken,
            ], 200);
        }

        $user = User::where('email', $email)->first();
        if (!$user || !Hash::check($password, $user->password)) {
            return response()->json(['msg' => 'Invalid credentials'], 400);
        }

        $fullName = "{$user->firstName} {$user->lastName}";
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            '_id'                  => $user->id,
            'name'                 => $fullName,
            'email'                => $user->email,
            'role'                 => $user->role,
            'clientCode'           => $user->clientCode,
            'hasPurchasedServices' => $user->hasPurchasedServices,
            'token'                => $token,
        ], 200);
    }

    // GET /api/auth/users
    public function getAllUsers()
    {
        $users = User::orderBy('created_at', 'desc')->get();
        return response()->json($users, 200);
    }

    // PUT /api/auth/users/{id}/portfolio
    public function updateUserPortfolio(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['msg' => 'User not found'], 404);
        }

        $user->portfolio = $request->input('portfolio');
        $user->hasPurchasedServices = true;
        $user->save();

        return response()->json(['msg' => 'Portfolio updated successfully', 'user' => $user], 200);
    }

    // GET /api/auth/users/{id}/portfolio
    public function getUserPortfolio($id)
    {
        $user = User::find($id, ['id', 'portfolio', 'hasPurchasedServices', 'clientCode']);
        if (!$user) {
            return response()->json(['msg' => 'User not found'], 404);
        }

        return response()->json($user, 200);
    }
}
