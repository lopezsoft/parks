<?php

namespace App\Contracts;

use Illuminate\Http\Request;

interface CrudContract
{
    public function create(Request $request);
    public function read(Request $request, $id = null);
    public function update(Request $request, $id);
    public function destroy(Request $request, $id);
}
