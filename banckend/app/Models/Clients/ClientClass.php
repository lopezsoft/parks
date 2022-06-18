<?php

namespace App\Models\Clients;

use App\User;

class ClientClass
{
    public static function getAll(): \Illuminate\Http\JsonResponse
    {
        $query   = User::where('type', 3)->get();
        return response()->json([
            'success' => true,
            'records' => $query,
            'total' => count($query),
        ]);
    }
}
