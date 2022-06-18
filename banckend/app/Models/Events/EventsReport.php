<?php

namespace App\Models\Events;

use App\Traits\MessagesTrait;
use Exception;
use App\DomPdf\DPdf;
use App\Core\MasterModel;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class EventsReport extends MasterModel
{
    public static $path_logo_reports  = "resources/images/logo_reports.jpeg";

    public static function getEventsReport($eventId): \Illuminate\Http\JsonResponse
    {
        try {
            $event          = EventModel::where('id', $eventId)->first();
            $path           = 'public/reports/events';
            Storage::makeDirectory($path);

            $outputName     = "evento-f".$event->folio."-d".date('d-m-Y-h-i-s-A').".pdf";
            $pathReport     = "storage/reports/events/{$outputName}";

            $pathLogoReports= public_path(self::$path_logo_reports);
            $config         = DB::table('tb_configure_invoice')->first();

            $pdf 	        = new DPdf();
            $event->Symbol  = "$";
            $data	= [
                "logo"				=> $pathLogoReports,
                "headerLine1"	    => $config->headerline1,
                "headerLine2"	    => $config->headerline2,
                "footerline"	    => $config->footline1,
                "event"	            => $event,
                "line"	            => $event->detail,
            ];

            $pdf->loadView('reports.pos80mm', $data);
            $pdf->setPaper80mm();

            $path_s   = "{$path}/{$outputName}";
            $pdf->save($path_s);

            return MessagesTrait::getResponse201([
                'pathFile'  => utf8_encode($pathReport),
            ]);
        } catch (Exception $e) {
            return MessagesTrait::getResponse500([
                'error' => $e->getMessage()
            ]);
        }
    }
}
