<?php

namespace App\Http\Controllers;

use App\Models\Clients\ClientClass;

class ClientsController extends Controller
{
    public function getAll(): \Illuminate\Http\JsonResponse
    {
        return ClientClass::getAll();
    }
}
