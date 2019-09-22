<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\core\MasterModel;

class MasterController extends Controller
{
    public function getTable(Request $request)
    {       
        $table = $request->input('pdbTable');
        $val    = new MasterModel();
        echo $val->getTable($table);
    }

    public function setTable(Request $request)
    {       
        $table      = $request->input('pdbTable');
        $records    = json_decode($request->input('records'));
        $val        = new MasterModel();
        echo $val->setTable($records,$table);
    }

    public function insertData(Request $request)
    {       
        $table      = $request->input('pdbTable');
        $records    = json_decode($request->input('records'));
        $val        = new MasterModel();
        echo $val->insertData($records,$table);
    }

    public function deleteData(Request $request)
    {       
        $table      = $request->input('pdbTable');
        $records    = json_decode($request->input('records'));
        $val        = new MasterModel();
        echo $val->deleteData($records,$table);
    }


}