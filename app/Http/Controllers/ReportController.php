<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\models\Report;

class ReportController extends Controller
{
    public function getTicketServices(Request $request)
    {
        $report = new Report();
        $records    = json_decode($request->input('records'));
        $user       = $request->input('user');
        echo $report->getTicketServices(null, $records, $user);
    }
}
