<?php

namespace App\Http\Controllers\dashboard;


use App\models\dashboard\Company;
use App\models\dashboard\BranchOffices;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CompanyController extends Controller
{
    /**
     * Retornar toda la información de la tabla dtb_company
     */
    public function getCompany()
    {
        $select = Company::all();
        echo $this->json_response($select->toArray(), 0);
    
    }

    /**
     * Actualizar los datos de la tabla tb_company
     */

    public function setCompany(Request $request)
    {
        $fiels  = json_decode($request->input('records'));
        $up = Company::find(1);
        foreach ($fiels as $key => $value) {
            $up->$key   = $value;
        }
        $up->save();
        echo $this->json_response($up->toArray(),0);
    }
    
    public function getBranchOffices()
    {
        $select = BranchOffices::all();
        echo $this->json_response($select->toArray(), 0);
    }

    public function setBranchOffices(Request $request)
    {
        $fiels  = json_decode($request->input('records'));
        $up = BranchOffices::find($fiels->id);
        foreach ($fiels as $key => $value) {
            $up->$key   = $value;
        }
        $up->save();
        echo $this->json_response($up->toArray(),0);
    }
}
