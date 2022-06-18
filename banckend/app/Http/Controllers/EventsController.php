<?php

namespace App\Http\Controllers;

use App\Contracts\CrudContract;
use App\Models\Events\EventClass;
use Illuminate\Http\Request;

class EventsController extends Controller implements CrudContract
{
    //
    public function create(Request $request): \Illuminate\Http\JsonResponse
    {
        return (new EventClass())->create($request);
    }

    public function read(Request $request, $id = null): \Illuminate\Http\JsonResponse
    {
        return (new EventClass())->read($request, $id);
    }

    public function update(Request $request, $id): \Illuminate\Http\JsonResponse
    {
        return (new EventClass())->update($request, $id);
    }

    public function destroy(Request $request, $id): \Illuminate\Http\JsonResponse
    {
        return (new EventClass())->destroy($request, $id);
    }
}
