<?php

namespace App\Http\Controllers\general;

use App\models\general\Countries;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class GeneralController extends Controller
{
    public function getCountries()
    {
        $select = Countries::all();
        echo $this->json_response($select->toArray(),0);
    }
}
