<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Report;
use App\Models\ReportSales;

class ReportController extends Controller
{

    public function CashClosing(Request $request)
    {
        $report_sales   = new ReportSales();
        $report_sales->Sales();

        $report     = new Report();
        $user       = $request->input('user');
        $type       = $request->input('type');
        $date1      = $request->input('date1');
        $date2      = $request->input('date2');
        $name       = $request->input('username');
        $cash       = $request->input('cash');

        $date1 = ($date1) ? $date1 : date('Y-m-d');
        $date2 = ($date2) ? $date2 : date('Y-m-d');
        return $report->CashClosing($user, $type, $date1, $date2, $name, $cash);
    }

    public function setTickets(Request $request)
    {
        $report = new Report();
        $records    = json_decode($request->input('records'));
        $user       = $request->input('user');
        $type       = $request->input('type');
        $cash       = $request->input('cash');
        if($type == 2){
            return $report->setTicketsFast($records, $user, $type, $cash);
        }else{
            return $report->setTicketsServ($records, $user, $type, $cash);
        }
    }

    public function setTicketFastFood(Request $request)
    {
        $report = new Report();
        $records    = json_decode($request->input('records'));
        $user       = $request->input('user');
        return $report->setTicketFastFood(null, $records, $user);
    }

    public function getTicketServices(Request $request)
    {
        $report = new Report();
        $records    = json_decode($request->input('records'));
        $user       = $request->input('user');
        return $report->getTicketServices(null, $records, $user);
    }
}
