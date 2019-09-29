<?php

namespace App\core;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class MasterModel
{

    /**
     * Nombre del campo de clave primaria de la tabla
     */
    public  $primaryKey = "id";

    public function getSaleMaster($id = 0)
    {
        $table  = DB::select("CALL sp_sales_master(".$id.")");
        return $table;
    }
    
    public function getConfigInvoive()
    {
        $result = DB::table('tb_configure_invoice')->get();
        return  $result;
    }


    /**
     * Borra los cambios en la tabla pasada como parametro
     * 
     * @$tb 
     */
    public function deleteData($fiels = null, string $tb = null)
    {
        if ($fiels) {
            foreach ($fiels as $key => $value) {
                $data   [$key] = $value;  
            }
        $result =  DB::table($tb)
                    ->where($data)
                    ->delete();
        return $this->json_response_succes($result);
       }
    }

    /**
     * Inserta los cambios en la tabla pasada como parametro
     * 
     * @$tb 
     */
    public function insertData($fiels = null, string $tb = null)
    {
       if ($fiels) {
            foreach ($fiels as $key => $value) {
                if($key !== $this->primaryKey){
                    $data   [$key] = $value;  
                }
            }
        $result =  DB::table($tb)
                    ->insertGetId($data);
                    
        $data   = DB::table($tb)
                            ->get()
                            ->where($this->primaryKey,$result);
        
        return $this->json_response($data,$result);
       }
    }


    /**
     * Guarda los cambios en la tabla pasada como parametro
     * 
     * @$tb 
     */
    public function setTable($fiels = null, string $tb = null)
    {
       if ($fiels) {
            foreach ($fiels as $key => $value) {
                $data   [$key] = $value;  
                if($key == $this->primaryKey){
                    $pKey   = $value;
                }
            }
        $result =  DB::table($tb)
                    ->where($this->primaryKey,$pKey)
                    ->update($data);
        return $this->json_response_succes($result);
       }
    }

    /**
     * Retorna los datos de un select a un tabla
     * 
     */

    public function getSalesService($type)
    {
        $table  = DB::select("CALL sp_services(".$type.")");
        return $this->json_response($table);
    }

    /**
     * Retorna los datos de un select a un tabla
     * 
     */

    public function getTable(String $tb = null)
    {
        $table  = DB::table($tb)->get();
        return $this->json_response($table, $table->count());
    }
    

    /**
     * Retorna la respuesta Json de la API
    */
    public function json_response($lis = array(), $total = 0)
    {
        return json_encode(array(
            'success'   => TRUE,
            'records'   => $lis,
            'total'     => $total
        ));
    }

    /**
     * Retorna la respuesta Json de la API
    */
   public function json_response_succes($lis = null)
   {
       return json_encode(array(
           'success'   => TRUE,
           'data'   => $lis
       ));
   }

   public function json_response_succes_error($lis = '')
   {
       return json_encode(array(
           'success'   => FALSE,
           'error'   => $lis
       ));
   }
}
