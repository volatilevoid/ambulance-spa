<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:32',
            'password' => 'required|string|max:32'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ]);
        }

        if(!Auth::attempt(['username' => $request->username, 'password' => $request->password])) {
            return response()->json([
                'success' => false,
                'message' => 'invalid user'
            ]);
        }

        $user = Auth::user();
        $token = $user->createToken('amb_auth_token');

        return response()->json([
            'success' => true,
            'access_token' => $token->plainTextToken,
            'token_type' => 'Bearer',
            'user_role' => $user->user_role_id === User::USER_ROLE_ADMIN ? 'admin' : 'doctor'
        ]);
    }

    public function logout()
    {
        Auth::user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Successfull log out',
        ]);
    }
}
