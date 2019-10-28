<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\core\MasterModel;

class MasterController extends Controller
{

    public function getCashSessions(Request $request)
    {
        $model  = new MasterModel();
        echo $model->getCashSessions();
    }


    /**
     * Calcetines por sucursal
     */
    public function getBranchFootWear(Request $request)
    {       
        $table  = $request->input('pdbTable');
        $query  = $request->input('query');
        $start  = $request->input('start');
        $limit  = $request->input('limit');
        $sqlQuery   = "SELECT t1.*, t2.shoe_name, t3.full_name ".
                    "FROM tb_headquarters_shoes AS t1 ".
                    "LEFT JOIN tb_footwear AS t2 ON t1.id_footwear = t2.id ".
                    "LEFT JOIN tb_branch_offices AS t3 ON t1.id_branch = t3.id";
        $sqlCount   = "SELECT COUNT(t1.id) AS total ".
                    "FROM tb_headquarters_shoes AS t1 ".
                    "LEFT JOIN tb_footwear AS t2 ON t1.id_footwear = t2.id ".
                    "LEFT JOIN tb_branch_offices AS t3 ON t1.id_branch = t3.id";
        $arrayFields    = array("t2.time_name", "t3.full_name");
        $val    = new MasterModel();
        echo $val->sqlQuery($sqlQuery, $sqlCount, $arrayFields, $query, $start, $limit);
    }

    /**
     * Servicios por sucursal
     */
    public function getBranchServices(Request $request)
    {       
        $table  = $request->input('pdbTable');
        $query  = $request->input('query');
        $start  = $request->input('start');
        $limit  = $request->input('limit');
        $sqlQuery   = "SELECT t1.*, t2.time_name, t3.full_name ".
                    "FROM  tb_branch_services AS t1 ".
                    "LEFT JOIN tb_service_time AS t2 ON t1.id_time	 = t2.id ".
                    "LEFT JOIN tb_branch_offices AS t3 ON t1.id_branch = t3.id";
        $sqlCount   = "SELECT COUNT(t1.id) AS total ".
                    "FROM  tb_branch_services AS t1 ".
                    "LEFT JOIN tb_service_time AS t2 ON t1.id_time	 = t2.id ".
                    "LEFT JOIN tb_branch_offices AS t3 ON t1.id_branch = t3.id";
        $arrayFields    = array("t2.time_name", "t3.full_name");
        $val    = new MasterModel();
        echo $val->sqlQuery($sqlQuery, $sqlCount, $arrayFields, $query, $start, $limit);
    }


    public function getPreTickets(Request $request)
    {
        $val    = new MasterModel();
        echo $val->getPreTickets();
    }

    public function getUsers(Request $request)
    {
        $type   = $request->input('type');
        $query  = $request->input('query');
        $start  = $request->input('start');
        $limit  = $request->input('limit');
        $fields = $request->input('fields');
        $user   = $request->input('user');
        $val    = new MasterModel();
        echo $val->getUsers($query, $start, $limit, $type, $fields, $user);
    }

    public function getProducts(Request $request)
    {
        $branch = $request->input('branch');
        $type   = $request->input('type');
        $val    = new MasterModel();
        echo $val->getProducts($type, $branch);
    }

    
    public function getTable(Request $request)
    {       
        $table  = $request->input('pdbTable');
        $query  = $request->input('query');
        $start  = $request->input('start');
        $limit  = $request->input('limit');
        $val    = new MasterModel();
        echo $val->getTable($table, $query, $start, $limit);
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
        $ip         = $request->ip();
        $user       = $request->input('user');
        $val        = new MasterModel();
        echo $val->setTable($records,$table, $ip, $user);
    }

    public function insertData(Request $request)
    {       
        $table      = $request->input('pdbTable');
        $ip         = $request->ip();
        $user       = $request->input('user');
        $records    = json_decode($request->input('records'));
        $val        = new MasterModel();
        $file       = $request->file('image');
        echo $val->insertData($records,$table, $ip, $user);
    }

    public function deleteData(Request $request)
    {       
        $table      = $request->input('pdbTable');
        $records    = json_decode($request->input('records'));
        $ip         = $request->ip();
        $user       = $request->input('user');
        $val        = new MasterModel();
        echo $val->deleteData($records,$table, $ip, $user);
    }


}
