<?php

namespace App\models;

use Illuminate\Support\Facades\DB;
use App\core\MasterModel;
use App\core\JReportModel;

class ReportSales extends MasterModel
{
    public function Sales()
    {
        $report         = new JReportModel();
        $reporName      = 'hello_world';
        $query          = 'hello_world';

        return $report->getReportExport($reporName,'pdf',$query);
    }
}
