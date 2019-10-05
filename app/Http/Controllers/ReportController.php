<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\models\Report;

class ReportController extends Controller
{


    public function setTickets(Request $request)
    {
        $report = new Report();
        $records    = json_decode($request->input('records'));
        $user       = $request->input('user');
        $type       = $request->input('type');
        if($type == 2){
            echo $report->setTicketsFast($records, $user, $type);   
        }else{
            echo $report->setTicketsServ($records, $user, $type);   
        }
    }

    public function setTicketFastFood(Request $request)
    {
        $report = new Report();
        $records    = json_decode($request->input('records'));
        $user       = $request->input('user');
        echo $report->setTicketFastFood(null, $records, $user);
    }

    public function getTicketServices(Request $request)
    {
        $report = new Report();
        $records    = json_decode($request->input('records'));
        $user       = $request->input('user');
        echo $report->getTicketServices(null, $records, $user);
    }
}
