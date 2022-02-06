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
                'message' => ['user' => 'User not found']
            ]);
        }

        $user = Auth::user();
        $token = $user->createToken('amb_auth_token');

        return response()->json([
            'success' => true,
            'access_token' => $token->plainTextToken,
            'token_type' => 'Bearer',
            'user' => $user,
            'user_role' => $user->getUserRole()
        ]);
    }

    public function logout(Request $request)
    {
        $user = Auth::user();

        if(!is_null($user)) {
            $user->tokens()->delete();
        }

        return response()->json([
            'success' => true,
            'message' => 'Successfull log out',
        ]);
    }

    public function isTokenValid()
    {
        $isValid = false;
        $user = Auth::user();
        $role = '';

        if(!is_null($user)) {
            $isValid = true;
            $role = $user->getUserRole();
        }

        return response()->json([
            'is_token_valid' => $isValid,
            'user_role' => $role
        ]);
    }
}
