<?php

namespace App\Http\Controllers\dashboard;


use app\models\dashboard\Company;
use app\models\dashboard\BranchOffices;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CompanyController extends Controller
{
    //
    public function getCompany()
    {
        $select = Company::all();
        echo $this->json_response($select->toArray(), 0);
    
    }
    public function getBranchOffices()
    {
        $select = BranchOffices::all();
        echo $this->json_response($$select->toArray(), 0);
    }
}
