<?php
namespace App\Traits;

/**
 * Messages Trait
 */
trait MessagesTrait
{
    static function getResponse($data = []): \Illuminate\Http\JsonResponse
    {
        $data['success']    = true;
        return response()->json($data);
    }

    static function getResponseMessage($message = ''): \Illuminate\Http\JsonResponse
    {
        return self::getResponse(['message' => $message]);
    }

    static function getResponse201($data = []): \Illuminate\Http\JsonResponse
    {
        $data['success'] = true;
        $data['message'] = 'Recurso creado exitosamente.';

        return response()->json($data, 201);
    }


    static function getResponse400(): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'success'   => false,
            'message'   => '400 Petición mala',
        ], 400);
    }

    static function getResponse401(): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'success'   => false,
            'message'   => 'Acceso No autorizado',
        ], 401);
    }

    static function getResponse422(): \Illuminate\Http\JsonResponse
    {
        $data['success']    = false;
        return response()->json($data, 422);
    }

    /**
     * 500 Internal Server Error
     * getErrorResponse: Retorna una respuesta de error 500
     *
     * @param array $data
     * @return \Illuminate\Http\JsonResponse
     */
    public static function getResponse500($data = []): \Illuminate\Http\JsonResponse
    {
        $data['success'] = false;
        return response()->json($data, 500);
    }

    public static function getErrorResponse($msg = null){
        return self::getResponse500(['message'  => $msg]);
    }
}
