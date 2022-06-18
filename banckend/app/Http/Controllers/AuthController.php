<?php

namespace App\Http\Controllers;

use Avatar;
use Storage;
use App\User;
use App\Roles;
use App\core\MasterModel;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function updateuser(Request $request)
    {

        $data = [
            'first_name'        => $request->first_name,
            'last_name'         => $request->last_name,
            'email'             => $request->email,
            'birthday'          => $request->birthday
        ];

        if($request->active){
            $data['active'] = $request->active;
        }

        if($request->type){
            $data['type'] = $request->type;
        }

        if(strlen($request->password) > 5){
            $data['password']   = bcrypt($request->password);
        }

        $user_id    = $request->user_id;
        $ip         = $request->ip();

        User::where('id',$request->id)->update($data);
        $model  = new MasterModel();
        $model->audit($user_id,$ip,"users","UPDATE",$data);
        return response()->json([
            'message' => 'Successfully updated user!',
            'success' => true], 201);
    }

    public function roles(Request $request)
    {
        $model  = new MasterModel();
        echo $model->getRoles($request->input('user_id'),$request->input('type'));
    }

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
            'birthday'          => 'required|date',
            'password'          => 'required|string|confirmed',
        ]);
        $user = new User([
            'first_name'        => $request->first_name,
            'last_name'         => $request->last_name,
            'email'             => $request->email,
            'birthday'          => $request->birthday,
            'type'              => $request->type,
            'password'          => bcrypt($request->password),
        ]);
        $user->save();

        $user_id    = $request->user_id;
        $ip         = $request->ip();
        $model  = new MasterModel();
        $model->audit($user_id,$ip,"users","INSERT",$user);

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
        $token = $user->createToken($request->input('email'));
        return response()->json([
            'access_token' => $token->plainTextToken,
            'token_type'   => 'Bearer',
            'success'      => true,
            'expires_at'   => null,
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
        $token = $user->createToken($request->input('email'));

        $data       = [
            'id_user'       => $user->id,
            'ip'            => $request->ip()
        ];

        $access_id  = DB::table('tb_access_users')
                        ->insertGetId($data);

        $date   = date('Y-m-d');

        $this->createChashClosing($date, $user);

        $cashSession= DB::table('tb_cash_closing')
                            ->where('id_user', $user->id)
                            ->where('opening_date', $date)
                            ->where('opened', 1)
                            ->limit(1)
                            ->get();

        return response()->json([
            'access_token'  => $token->plainTextToken,
            'token_type'    => 'Bearer',
            'success'       => true,
            'user'          => $user,
            'access_id'     => $access_id,
            'cash_session'  => $cashSession,
            'date'          => $date
        ]);
    }

    private function createChashClosing($date, $user) {
        $query  = DB::table('tb_cash_closing')
                    ->where('id_user', $user->id)
                    ->where('opened', 1)
                    ->where('opening_date', $date)
                    ->first();

        if(!$query) {
            $data   = [
                'id_user'       => $user->id,
                'opening_date'  => $date
            ];

            DB::table('tb_cash_closing')->insert($data);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        $access_id  = $request->input('access_id');
        if($access_id > 0){
            $data       = [
                'active'            => 0
            ];
            DB::table('tb_access_users')
                            ->where('id', $access_id)
                            ->limit(1)
                            ->update($data);
        }
        return response()->json([
            'message'       => 'Successfully logged out',
            'success'       => true]);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
