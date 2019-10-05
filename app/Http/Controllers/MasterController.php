<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\core\MasterModel;

class MasterController extends Controller
{

    public function getProducts(Request $request)
    {
        $type   = $request->input('branch');
        $val    = new MasterModel();
        echo $val->getProducts($type);
    }

    
    public function getTable(Request $request)
    {       
        $table = $request->input('pdbTable');
        $val    = new MasterModel();
        echo $val->getTable($table);
    }

    public function getSalesService(Request $request)
    {
        $type= $request->input('type');
        $val    = new MasterModel();
        echo $val->getSalesService($type);
    }

    public function setImageProd(Request $request)
    {       
        $table      = $request->input('pdbTable');
        $val        = new MasterModel();
        $file       = $request->file('image');
        echo $val->setImageProd($file, $request->input('id'));
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
        $file       = $request->file('image');
        echo $val->insertData($records,$table, $file);
    }

    public function deleteData(Request $request)
    {       
        $table      = $request->input('pdbTable');
        $records    = json_decode($request->input('records'));
        $val        = new MasterModel();
        echo $val->deleteData($records,$table);
    }


}
