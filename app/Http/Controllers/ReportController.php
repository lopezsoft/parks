<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\models\Report;

class ReportController extends Controller
{

    public function CashClosing(Request $request)
    {
        $report     = new Report();
        $user       = $request->input('user');
        $type       = $request->input('type');
        $date1      = $request->input('date1');
        $date2      = $request->input('date2');
        $name       = $request->input('username');
        $session_id = $request->input('session_id');

        $date1 = ($date1) ? $date1 : date('Y-m-d');
        $date2 = ($date2) ? $date2 : date('Y-m-d');
        echo $report->CashClosing($user, $type, $date1, $date2, $name, $session_id);   
    }

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
