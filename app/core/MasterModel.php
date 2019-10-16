<?php

namespace App\core;

use App\User;
use Illuminate\Http\File;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class MasterModel
{

    /**
     * Nombre del campo de clave primaria de la tabla
     */
    public $primaryKey = "id";
    public $queryField = "";
    public $queryString = "";

    public function getRoles($user_id = 0, $type    = 0)
    {
        $table = DB::select("CALL sp_select_roles(" . $user_id .",". $type .")");
        return $this->json_response($table);
    }

    public function getSaleDetail($id = 0, $type = 1)
    {
        $table = DB::select("CALL sp_sales_detail(" . $id . "," . $type . ")");
        return $table;
    }

    public function getPreTickets()
    {
        return $this->json_response($this->getSaleMaster(0), 0);
    }

    public function getUsers($query = null, $start = 0, $limit = 0, $type = 3, $fields = null)
    {
        try {
            $sign = '=';
            if ($type != 3) {
                $sign = "<>";
                $type = 3;
            }
            if (!is_null($query) && !is_null($fields)) {
                $search = json_decode($fields);
                foreach ($search as $value) {
                    $select = User::where($value, 'like', '%' . $query . '%')
                        ->where('type', $sign, $type)
                        ->limit(1)
                        ->get();
                    if ($select->count() > 0) {
                        $this->queryField = $value;
                        break;
                    }
                }
                if (strlen($this->queryField) > 0) {
                    $select = User::where($this->queryField, 'like', '%' . $query . '%')
                        ->where('type', $sign, $type)
                        ->limit($limit, $start)
                        ->get();
                } else {
                    $select = User::where('first_name', 'like', '%' . $query . '%')
                        ->where('type', $sign, $type)
                        ->limit($limit, $start)
                        ->get();
                }
            } else {
                $select = User::where('type', $sign, $type)
                        ->limit($limit, $start)
                        ->get();
            }
            $result = $this->json_response($select, $select->count());
        } catch (\Throwable $th) {
            $result = $this->json_response_succes_error('Error en la consulta');
            throw $th;
        }
        return $result;
    }

    public function getProducts($id = 1)
    {
        $table = DB::select("CALL sp_products_fastfood(" . $id . ")");
        return $this->json_response($table);
    }

    public function setImageProd($file = null, $id = 0)
    {
        if (!is_null($file) and $id > 0) {
            //obtenemos el nombre del archivo
            $fielName = $file->getClientOriginalName();
            $urlM = "products/" . $id;
            Storage::putFileAs($urlM, new File($file), $fielName);
            $mime = Storage::mimeType($urlM . '/' . $fielName);
            DB::update('UPDATE tb_products SET mime = "' . $mime . '", image = "storage/' . $urlM . '/' . $fielName .
                '" WHERE id = ?', [$id]);
            $data = DB::table('tb_products')
                ->get()
                ->where($this->primaryKey, $id);

            return $this->json_response($data, 1);
        }
    }

    public function getSaleMaster($id = 0, $type = 1)
    {
        if ($type == 1) {
            $table = DB::select("CALL sp_sales_master(" . $id . ")");
        } else {
            $table = DB::select("CALL sp_sales_master_out(" . $id . ")");
        }
        return $table;
    }

    public function getConfigInvoive()
    {
        $result = DB::table('tb_configure_invoice')->get();
        return $result;
    }

    /**
     * Borra los cambios en la tabla pasada como parametro
     *
     * @$tb
     */
    public function deleteData($fields = null, string $tb = null, $ip, $user_id = 0)
    {
        if ($fields) {
            try {
                DB::beginTransaction();
                foreach ($fields as $key => $value) {
                    $data[$key] = $value;
                }
                $result = DB::table($tb)
                    ->where($data)
                    ->delete();

                $audit  = [
                    'id_user'   => $user_id,
                    'ip'        => $ip,
                    'table'     => $tb,
                    'what_did'  => "DELETE",
                    'data'      => json_encode($data)
                ];

                DB::table('tb_audit')->insert($audit);  
                DB::commit();
                $result = $this->json_response_succes($result);
            } catch (\Throwable $th) {
                DB::rollback();
                $result = $this->json_response_succes_error('Error al tratar de eliminar el registro');
                throw $th;
            }
            return  $result;
        }
    }

    /**
     * Inserta los cambios en la tabla pasada como parametro
     *
     * @$tb
     */
    public function insertData($fields = null, string $tb = null, $ip, $user_id = 0)
    {
        if ($fields) {
            try {
                DB::beginTransaction();            
                $fieldstb   = $this->getColumns($tb); // Listado de las columnas de la tabla
                $data       = [];
                foreach ($fields as $key => $value) {
                    if ($key !== $this->primaryKey) {
                        foreach ($fieldstb as $field) {
                            if($field->Field == $key ){
                                $data[$key] = $value;
                                break;
                            }
                        }
                    }
                }
                $result = DB::table($tb)
                    ->insertGetId($data);

                $audit  = [
                    'id_user'   => $user_id,
                    'ip'        => $ip,
                    'table'     => $tb,
                    'what_did'  => "INSERT",
                    'data'      => json_encode($data)
                ];
                DB::table('tb_audit')->insert($audit);
                DB::commit();
                $data = DB::table($tb)
                    ->get()
                    ->where($this->primaryKey, $result);

                $result =  $this->json_response($data, $result);
            } catch (\Throwable $th) {
                DB::rollback();
                $result = $this->json_response_succes_error('Error en la base de datos');
                throw $th;
            }

            return  $result;
        }
    }

    /**
     * Guarda los cambios en la tabla pasada como parametro
     *
     * @$tb
     */
    public function setTable($fields = null, string $tb = null, $ip, $user_id = 0)
    {
        if ($fields) {
            try {
                DB::beginTransaction();
                $fieldstb   = $this->getColumns($tb); // Listado de las columnas de la tabla
                if (is_array($fields)) {
                    foreach ($fields as $value) {
                        foreach ($value as $key => $val) {
                            foreach ($fieldstb as $field) {
                                if($field->Field == $key ){
                                    $data[$key] = $val;
                                    break;
                                }
                            }
                            if ($key == $this->primaryKey) {
                                $pKey = $val;
                            }
                        }
                        $result = DB::table($tb)
                                ->where($this->primaryKey, $pKey)
                                ->limit(1)
                                ->update($data);

                        $audit  = [
                            'id_user'   => $user_id,
                            'ip'        => $ip,
                            'table'     => $tb,
                            'what_did'  => "UPDATE",
                            'data'      => json_encode($data)
                        ];
                        DB::table('tb_audit')->insert($audit);
                    }
                }else{
                    foreach ($fields as $key => $value) {
                        foreach ($fieldstb as $field) {
                            if($field->Field == $key ){
                                $data[$key] = $value;
                                break;
                            }
                        }
                        if ($key == $this->primaryKey) {
                            $pKey = $value;
                        }
                    };
                    $result = DB::table($tb)
                        ->where($this->primaryKey, $pKey)
                        ->limit(1)
                        ->update($data);
                    $audit  = [
                        'id_user'   => $user_id,
                        'ip'        => $ip,
                        'table'     => $tb,
                        'what_did'  => "UPDATE",
                        'data'      => json_encode($data)
                    ];
                    DB::table('tb_audit')->insert($audit);
                }
                DB::commit();
                $result = $this->json_response_succes($result);
            } catch (\Throwable $th) {
                DB::rollback();
                $result = $data->json_response_succes_error('Error en la base de datos');
                throw $th;
            }
            return  $result;
        }
    }

    /**
     * Retorna los datos de un select a un tabla
     *
     */

    public function getSalesService($type)
    {
        $table = DB::select("CALL sp_services(" . $type . ")");
        return $this->json_response($table);
    }
    
    /**
     * Retorna los datos de un query
     *
    */

    public function sqlQuery(string $sqlStatement, string $sqlStatementCount, array $searchFields , $query = '', $start = 0, $limit = 0)
    {
        if (strlen($query) > 0) {
            $queryField = '';
            foreach ($searchFields as $field) {
                $table  = DB::select($sqlStatement." WHERE ".$field." LIKE ? LIMIT 1", ["%".$query."%"]);
                if (count($table) >0 ) {
                    $queryField   = $field;
                    break;
                }
            }

            if(strlen($queryField) > 0){
                $total  = DB::select($sqlStatementCount." WHERE ".$queryField." LIKE ? ", ["%".$query."%"]);
                $table  = DB::select($sqlStatement." WHERE ".$queryField." LIKE ? LIMIT ?, ?", ["%".$query."%", $start, $limit]);
                $result = $this->json_response($table, $total[0]->total);
            }else {
                $table      = null;
                $result = $this->json_response($table, 0);
            }
        }else {
            $total  = DB::select($sqlStatementCount);
            $table  = DB::select($sqlStatement." LIMIT ?, ?", [$start, $limit]);
            $result = $this->json_response($table, $total[0]->total);
        }
        return $result;
    }


    /**
     * Retorna los datos de un select a una tabla
     *
    */

    public function getTable(String $tb = null, $query = '', $start = 0, $limit = 0, $primaryKey = 'id' )
    {
        if (strlen($query) > 0) {
            $fiels      = $this->getColumns($tb);
            $queryField = '';
            foreach ($fiels as $field) {
                if ($field->Field <> $primaryKey) {
                    $table  = DB::table($tb)
                              ->where($field->Field,'like', '%'. $query .'%')
                              ->limit(1)
                              ->get();
                    if ($table->count() > 0 ) {
                        $queryField   = $field->Field;
                        break;
                    }
                }
            }

            if(strlen($queryField) > 0){
                $total  = DB::table($tb)
                            ->where($queryField, 'like', '%'. $query .'%')
                            ->count();
                $table  = DB::table($tb)->orderBy($primaryKey, 'DESC')
                            ->where($queryField, 'like', '%'. $query .'%')
                            ->offset($start)
                            ->limit($limit)
                            ->get();
            }else {
                $total  = 0;
                $table  = [];
            }
        }else {
            $total  = DB::table($tb)->count();
            $table  = DB::table($tb)->orderBy($primaryKey, 'DESC')
            ->offset($start)
            ->limit($limit)
            ->get();
        }
        return $this->json_response($table, $total);
    }

    /**
     * Retorna la respuesta Json de la API
     */
    public function json_response($lis = array(), $total = 0)
    {
        return json_encode(array(
            'success' => true,
            'records' => $lis,
            'total' => $total,
        ));
    }

    /**
     * Retorna la respuesta Json de la API
     */
    public function json_response_succes($lis = null)
    {
        return json_encode(array(
            'success' => true,
            'data' => $lis,
        ));
    }

    public function json_response_succes_error($lis = '')
    {
        return json_encode(array(
            'success' => false,
            'error' => $lis
        ));
    }

    public function getColumns($table = '')
    {
        if (strlen($table) >0 ) {
            $select = DB::select('SHOW COLUMNS FROM '.$table);
        }else {
            $select = null;
        }
        
        return $select;
    }
}