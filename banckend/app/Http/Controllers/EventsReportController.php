<?php

namespace App\Http\Controllers;

use App\Models\Events\EventsReport;

class EventsReportController extends Controller
{
    public function output($id): \Illuminate\Http\JsonResponse
    {
        return EventsReport::getEventsReport($id);
    }
}
