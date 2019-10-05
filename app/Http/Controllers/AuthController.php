<?php

namespace App\Http\Controllers;

use Avatar;
use Storage;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function registercustomer(Request $request)
    {
        $request->validate([
            'first_name'        => 'required|string',
            'last_name'         => 'required|string',
            // 'dni'               => 'required|string',
            'birthday'          => 'required|date',
            'email'             => 'required|string|email|unique:users',
            'password'          => 'required|string|confirmed',
        ]);
        $user = new User([
            'first_name'        => $request->first_name,
            'last_name'         => $request->last_name,
            'birthday'          => $request->birthday,
            'email'             => $request->email,
            // 'dni'               => $request->dni,
            'type'              => $request->type,
            'password'          => bcrypt($request->password),
        ]);
        $user->save();

        // $avatar = Avatar::create($user->first_name)->getImageObject()->encode('png');
        // Storage::put('avatars/'.$user->id.'/avatar.png', (string) $avatar);

        return response()->json([
            'message'   => 'Cliente registrado con exito!',
            'success'   => true,
            'user'      => $user
        ], 201);
    }
    
    public function signup(Request $request)
    {
        $request->validate([
            'first_name'        => 'required|string',
            'last_name'         => 'required|string',
            'email'             => 'required|string|email|unique:users',
            'password'          => 'required|string|confirmed',
        ]);
        $user = new User([
            'first_name'        => $request->first_name,
            'last_name'         => $request->last_name,
            'email'             => $request->email,
            'password'          => bcrypt($request->password),
        ]);
        $user->save();

        // $avatar = Avatar::create($user->first_name)->getImageObject()->encode('png');
        // Storage::put('avatars/'.$user->id.'/avatar.png', (string) $avatar);

        return response()->json([
            'message' => 'Successfully created user!'], 201);
    }

    public function loginclient(Request $request)
    {
        $request->validate([
            'email'       => 'required|string|email',
            'password'    => 'required|string',
            'remember_me' => 'boolean',
        ]);
        $credentials = request(['email', 'password']);
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'No autorizado',
                'success' => false], 401);
        }
        $user = $request->user();
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;
        if ($request->remember_me) {
            $token->expires_at = Carbon::now()->addWeeks(1);
        }
        $token->save();
        return response()->json([
            'access_token' => $tokenResult->accessToken,
            'token_type'   => 'Bearer',
            'success'      => true, 
            'expires_at'   => Carbon::parse(
                $tokenResult->token->expires_at)
                    ->toDateTimeString(),
            'user'         => $user
        ]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email'       => 'required|string|email',
            'password'    => 'required|string',
            'remember_me' => 'boolean',
        ]);
        $credentials = request(['email', 'password']);
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'No autorizado',
                'success' => false], 401);
        }
        $user = $request->user();
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;
        if ($request->remember_me) {
            $token->expires_at = Carbon::now()->addWeeks(1);
        }
        $token->save();
        return response()->json([
            'access_token' => $tokenResult->accessToken,
            'token_type'   => 'Bearer',
            'success'      => true, 
            'expires_at'   => Carbon::parse(
                $tokenResult->token->expires_at)
                    ->toDateTimeString(),
            'user'         => $user
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json(['message' => 
            'Successfully logged out']);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
