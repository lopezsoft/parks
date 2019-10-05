<?php

namespace App\core;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\File;

class MasterModel
{

    /**
     * Nombre del campo de clave primaria de la tabla
     */
    public  $primaryKey = "id";

    public function getProducts($id = 1)
    {
        $table  = DB::select("CALL sp_products_fastfood(".$id.")");
        return $this->json_response($table);
    }

    public function setImageProd($file = null, $id = 0)
    {
        if(!is_null($file) and $id > 0){
            //obtenemos el nombre del archivo
            $fielName   = $file->getClientOriginalName();  
            $urlM   = "products/".$id;
            Storage::putFileAs($urlM, new File($file), $fielName);
            $mime       = Storage::mimeType($urlM.'/'.$fielName);          
            DB::update('UPDATE tb_products SET mime = "'.$mime.'", image = "storage/'.$urlM.'/'.$fielName.
            '" WHERE id = ?', [$id]);
            $data   = DB::table('tb_products')
                        ->get()
                        ->where($this->primaryKey,$id);

            return $this->json_response($data,1);
        }
    }

    public function getSaleMaster($id = 0, $type = 1)
    {
        if ($type == 1) {
            $table  = DB::select("CALL sp_sales_master(".$id.")");
        }else{
            $table  = DB::select("CALL sp_sales_master_out(".$id.")");
        }
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
    public function deleteData($fields = null, string $tb = null)
    {
        if ($fields) {
            foreach ($fields as $key => $value) {
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
    public function insertData($fields = null, string $tb = null)
    {
       if ($fields) {
            foreach ($fields as $key => $value) {
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
    public function setTable($fields = null, string $tb = null)
    {
       if ($fields) {
            foreach ($fields as $key => $value) {
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
        $table  = DB::table($tb)->orderBy($this->primaryKey,'DESC')->get();
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
