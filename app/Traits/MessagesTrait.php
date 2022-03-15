<?php
namespace App\Traits;

/**
 * Messages Trait
 */
trait MessagesTrait
{
     /**
     * 200 Ok
     *
     * @param  mixed $data []
     * @return JSON
     */
    static function getResponse($data = [])
    {
        $data['success']    = true;
        return response()->json($data);
    }

    static function getResponseMessage($message = ''){
        return Self::getResponse(['message' => $message]);
    }

    /**
     * 201 Created
     *
     * @param  mixed $data []
     * @return JSON
     */
    static function getResponse201($data = [])
    {
        $data['success'] = true;
        $data['payload'] = 'Recurso creado exitosamente.';

        return response()->json([], 201);
    }

    /**
     * 400 Bad Request
     *
     * @param  mixed $msg
     * @return void
     */
    static function getResponse400()
    {
        return response()->json([
            'success'   => false,
            'message'   => '400 Petición mala',
        ], 400);
    }

    static function getResponse401()
    {
        return response()->json([
            'success'   => false,
            'message'   => 'Acceso No autorizado',
        ], 401);
    }

    static function getResponse422()
    {
        $data['success']    = false;
        return response()->json($data, 422);
    }

        /**
     * 500 Internal Server Error
     * getErrorResponse: Retorna una respuesta de error 500
     *
     * @param  mixed $msg
     * @return JSON
     */
    public static function getResponse500($data = [])
    {

        $data['success'] = false;
        $data['payload'] = 'Internal Server Error';

        return response()->json($data, 500);
    }

    public static function getErrorResponse($msg = null){
        return Self::getResponse500(['message'  => $msg]);
    }

    /**
     * Retorna el total de decimales de un numero
     */
    function totalDecimals(string $amount)
    {
        $result = 0;
        if (strlen($amount) > 0) {
            $value = substr($amount, strpos($amount, ".") + 1);
            for ($i = 0; $i < strlen($value); $i++) {
                $n  = substr($value, $i, 1);
                if (intval($n) > 0) {
                    $result += 1;
                }
            }
        }
        return $result;
    }


    /**
     * Retorna una respuesta con los registros indicados
     *
     * @param  mixed $lis
     * @param  mixed $total
     * @return JSON
     */
    static function getRecordsResponse($lis = array(), $total = 0)
    {
        return response()->json([
            'success'   => true,
            'records'   => $lis,
            'total'     => $total,
        ], 200);
    }
}
