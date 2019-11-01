<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\core\MasterModel;
use Codedge\Fpdf\Fpdf\Fpdf;
use App\Barcode\FpdfBarcode;

class Report extends MasterModel
{
    public $path_logo_reports  = "resources/images/logo_reports.jpeg";

    public function CashClosing($user, $type, $date1, $date2, $name, $cash)
    {
        $total  = 0;
        $data   = [];
        try {
            $config         = $this->getConfigInvoive();
            $clashclosing   = $this->getCahsClosing($cash, $date1, $date2);
            $title          = ($type == 1) ? 'CIERRE DE CAJA' : 'ARQUEO DE CAJA' ;

            $line   = "------------------------------------------------------------------------------";
            $leftSpace  = 8;
            $pdf = new FpdfBarcode($orientation='P',$unit='mm', array(80,850));
            $pdf->AddPage();
            $pdf->SetLeftMargin(5);
            $pdf->SetRightMargin(5);
            $pdf->SetFont('Helvetica','B',8);    //Letra Helvetica, negrita (Bold), tam. 20
            $pdf->Image($this->path_logo_reports,2,5,75,45);
            $textypos   = 50;
            $cellHeight = 3;
            $pdf->setY(2);
            $pdf->setX($leftSpace);
            $pdf->MultiCell(0,$textypos,'',0,"C");
            foreach ($config as $key => $value) {
                if (!empty($value->headerline1)) {
                    $pdf->MultiCell(0,$cellHeight,utf8_decode(trim($value->headerline1)),0,"C");
                }
                if (!empty($value->headerline2)) {
                    $pdf->MultiCell(0,$cellHeight,utf8_decode(trim($value->headerline2)),0,"C");
                }
            }
            $pdf->SetX($leftSpace);
            $pdf->MultiCell(0,$cellHeight,utf8_decode($title),0,"C");
            $pdf->MultiCell(0,$cellHeight,'',0,"C");

            $pdf->setX($leftSpace);
            $pdf->SetFont('Helvetica','B',6);    //Letra Helvetica, negrita (Bold), tam. 20
            $pdf->MultiCell(0,$cellHeight,"DEL: ".$date1."  AL ".$date2);
            $pdf->setX($leftSpace);
            $pdf->MultiCell(0,$cellHeight, "FECHA: ".date('d-m-Y')." HORA: ".date('h:i:s A'));
            $pdf->setX($leftSpace);
            $pdf->MultiCell(0,$cellHeight, utf8_decode("CAJERO : ".$name));
        
            $path_report = "reports/tiket-f".$title."-u".$name."-t".date('d-m-Y-h-i-s-A').".pdf";

            $pdf->SetFont('Helvetica','B',7);    //Letra Helvetica, negrita (Bold), tam. 20
            $pdf->setX($leftSpace);
            $pdf->MultiCell(0,$cellHeight,$line,0,"C");
            $pdf->setX($leftSpace);
            $pdf->MultiCell(0,$cellHeight,'                          --- VENTAS ---                   ');
            $total =0;
            $off = $pdf->GetY();
            $pdf->SetFont('Helvetica','',7);
            foreach($clashclosing as $pro){
                $pdf->SetY($off);
                $pdf->setX($leftSpace + 2);
                $pdf->Cell(10,$cellHeight,  $pro->nro_sale,0,0,"R");
                $pdf->setX($leftSpace +11);
                $pdf->Cell(20,$cellHeight,  utf8_decode(Trim($pro->type_name)));
                $pdf->setX(21);
                $pdf->Cell(25,$cellHeight,  "$".number_format($pro->total,2,".",",") ,0,0,"R");
                $pdf->setX(47);
                $pdf->Cell(25,$cellHeight,  utf8_decode(Trim($pro->date)));
                $total  += $pro->total;
                $off+=3;
            }
            $textypos= 2 + $pdf->GetY();
            $pdf->SetY($textypos);
            $pdf->setX($leftSpace);
            $pdf->MultiCell(0,$cellHeight,$line,0,"C");

            $textypos= $cellHeight + $pdf->GetY();
            $pdf->SetFont('Helvetica','B',8);
            $pdf->SetY($textypos);
            $pdf->setX($leftSpace);
            $pdf->Cell(7,$cellHeight,"TOTAL: " );
            $pdf->setX(55);
            $pdf->Cell(15,$cellHeight,"$ ".number_format($total,2,".",","),0,0,"R");
            
            $pdf->SetFont('Helvetica','B',6);
            $textypos+=2;
            $pdf->SetY($textypos);
            $pdf->setX($leftSpace);
            $pdf->MultiCell(0,$cellHeight,$line,0,"C");
            $textypos= 1 + $pdf->GetY();
            $pdf->setY($textypos);
            $pdf->AutoPrint();
            $pdf->output("F",$path_report);
            if($type == 1){
                $data   = [];
                $data['total']          = $total;
                $data['opened']         = 0;
                $data['document']       = $path_report;
                DB::table('tb_cash_closing')
                        ->where('id', $cash)
                        ->limit(1)
                        ->update($data);
            }
            $result = $this->json_response(array(
                'report'    => $path_report
            ));
        } catch (\Throwable $th) {
            $result = $this->json_response_succes_error('Error al intentar guardar los cambios');
            throw $th;
        }
        return  $result;
    }

    public function setTicketsServ($records = null, $user = 0, $type = 0,  $cash = 0)
    {
        
        if (!is_null($records)) {
            $total  = 0;
            $data   = [];
            try {
                DB::beginTransaction();
                $data['discount']       = $records->discount;
                $data['value_paid']     = $records->value_paid;
                $data['change']         = $records->change;
                $data['state']          = 'TICKET';
                $res    = DB::table('tb_sales_master')
                                ->where('id', $records->id)
                                ->update($data);
                $id_sale    = $records->id;
                
                $data   = [];
                $data['id_sale']        = $id_sale;
                $data['id_cash']        = $cash;
                DB::table('tb_sales_users')->insertGetId($data);

                $config     = $this->getConfigInvoive();
                $saleMaster = $this->getSaleMaster($id_sale, 1);
                $saleDetail = $this->getSaleDetail($id_sale, 1);

                $data   = [];
                $data['id_sale']            = $id_sale;
                $data['id_payment']         = 1;
                $data['amount']             = $saleMaster[0]->total;
                DB::table('tb_sales_payment')->insertGetId($data);

                DB::commit();

                $line   = "---------------------------------------------------------------------------";
                $leftSpace  = 8;
                $pdf = new FpdfBarcode($orientation='P',$unit='mm', array(80,850));
                $pdf->AddPage();
                $pdf->SetLeftMargin(5);
                $pdf->SetRightMargin(5);
                $pdf->SetFont('Helvetica','B',8);    //Letra Helvetica, negrita (Bold), tam. 20
                $pdf->Image($this->path_logo_reports,2,5,75,45);
                $textypos   = 50;
                $cellHeight = 3;
                $pdf->setY(2);
                $pdf->setX($leftSpace);
                $pdf->MultiCell(0,$textypos,'',0,"C");
                foreach ($config as $key => $value) {
                    if (!empty($value->headerline1)) {
                        $pdf->MultiCell(0,$cellHeight,utf8_decode(trim($value->headerline1)),0,"C");
                    }
                    if (!empty($value->headerline2)) {
                        $pdf->MultiCell(0,$cellHeight,utf8_decode(trim($value->headerline2)),0,"C");
                    }
                }
                $pdf->SetX($leftSpace);
                $pdf->MultiCell(0,$cellHeight,utf8_decode('TICKET DE VENTA'),0,"C");
                $nro_folio  = 0;
                $nro_user   = 0;
                $pdf->MultiCell(0,$cellHeight,'',0,"C");
                foreach ($saleMaster as $key => $value) {
                    $pdf->setX($leftSpace);
                    $pdf->SetFont('Helvetica','B',6);    //Letra Helvetica, negrita (Bold), tam. 20
                    $pdf->MultiCell(0,$cellHeight, "FECHA: ".date('d/m/Y',strtotime($value->date))." HORA: ".date('h:i:s A',strtotime($value->date))."     FOLIO: ".$value->nro_sale);
                    $nro_folio  = $value->nro_sale;
                    $nro_user   = $value->id_user;
                    $pdf->setX($leftSpace);
                    $pdf->MultiCell(0,$cellHeight, utf8_decode("CLIENTE: ".$value->customers."  Nº. CLIENTE: ".$value->id_user));
                }
                $path_report = "reports/tiket-f".$nro_folio."-u".$nro_user."-t".date('d-m-Y-h-i-s-A').".pdf";
                DB::update('UPDATE tb_sales_master SET document_ok = "'.$path_report.'" where id = ?', [$id_sale], ' LIMIT 1');
                $pdf->SetFont('Helvetica','B',7);    //Letra Helvetica, negrita (Bold), tam. 20
                $pdf->setX($leftSpace);
                $pdf->MultiCell(0,$cellHeight,$line,0,"C");
                $pdf->setX($leftSpace);
                $pdf->MultiCell(0,$cellHeight,'CANT  DETALLE                          PRECIO         TOTAL');
                $total =0;
                $off = $pdf->GetY();
                $pdf->SetFont('Helvetica','',7);
                
                foreach($saleDetail as $pro){
                    $pdf->SetY($off);
                    $pdf->setX($leftSpace + 2);
                    $pdf->Cell(5,$cellHeight,  $pro->amount,0,0,"R");
                    $pdf->setX($leftSpace +6);
                    // $pdf->Cell(40,$cellHeight,  utf8_decode(Trim($pro->detail)));
                    $pdf->setX(41);
                    $pdf->Cell(15,$cellHeight,  "$".number_format($pro->unit_price,2,".",",") ,0,0,"R");
                    $pdf->setX(57);
                    $pdf->Cell(15,$cellHeight,  "$".number_format($pro->total,2,".",",") ,0,0,"R");
                    $off+=3;
                    $pdf->SetY($off);
                    $pdf->setX($leftSpace + 5);
                    $pdf->MultiCell(0,$cellHeight,utf8_decode($pro->detail));
                    $off = $pdf->GetY();
                    // $off+=3;
                }
                $textypos= 2 + $pdf->GetY();
                $pdf->SetY($textypos);
                $pdf->setX($leftSpace);
                $pdf->MultiCell(0,$cellHeight,$line,0,"C");
                $pdf->MultiCell(0,$cellHeight,utf8_decode('FORMA DE PAGO'),0,"C");

                $textypos= 0 + $pdf->GetY();
                $pdf->SetY($textypos);
                $pdf->setX($leftSpace);
                $pdf->Cell(5,$cellHeight,"SUBTOTAL: " );

                $pdf->setX(63);
                $pdf->Cell(6,$cellHeight,"$ ".number_format($saleMaster[0]->subtotal,2,".",","),0,0,"R");
                $textypos= $cellHeight + $pdf->GetY();
                $pdf->SetY($textypos);
                $pdf->setX($leftSpace);
                $pdf->Cell(5,$cellHeight,"DESCUENTO: " );
                $pdf->setX(63);
                $pdf->Cell(6,$cellHeight,"$ ".number_format($saleMaster[0]->discount,2,".",","),0,0,"R");

                $textypos= $cellHeight + $pdf->GetY();
                $pdf->SetY($textypos);
                $pdf->setX($leftSpace);
                $pdf->Cell(5,$cellHeight,"TOTAL: " );
                $pdf->setX(63);
                $pdf->Cell(6,$cellHeight,"$ ".number_format($saleMaster[0]->total,2,".",","),0,0,"R");

                $textypos= $cellHeight + $pdf->GetY();
                $pdf->SetY($textypos);
                $pdf->setX($leftSpace);
                $pdf->Cell(5,$cellHeight,"EFECTIVO: " );
                $pdf->setX(63);
                $pdf->Cell(6,$cellHeight,"$ ".number_format($saleMaster[0]->value_paid,2,".",","),0,0,"R");

                $textypos= $cellHeight + $pdf->GetY();
                $pdf->SetY($textypos);
                $pdf->setX($leftSpace);
                $pdf->Cell(5,$cellHeight,"CAMBIO: " );
                $pdf->setX(63);
                $pdf->Cell(6,$cellHeight,"$ ".number_format($saleMaster[0]->change,2,".",","),0,0,"R");

                $textypos+=2;
                $pdf->SetY($textypos);
                $pdf->setX($leftSpace);
                $pdf->MultiCell(0,$cellHeight,$line,0,"C");
                $textypos = $pdf->GetY();
                $pdf->setY($textypos);
                $pdf->setX($leftSpace);
                foreach ($config as $key => $value) {
                    $pdf->SetFont('Helvetica','',7);
                    if (!empty(trim($value->footline1))) {
                        $pdf->MultiCell(0,$cellHeight,utf8_decode(trim($value->footline1)),0,"C");
                    }
                    if (!empty(trim($value->footline2))) {
                        $pdf->MultiCell(0,$cellHeight,utf8_decode(trim($value->footline2)),0,"C");
                    }
                    if (!empty(trim($value->footline3))) {
                        $pdf->MultiCell(0,$cellHeight,utf8_decode(trim($value->footline3)),0,"C");
                    }
                    if (!empty(trim($value->footline4))) {
                        $pdf->SetFont('Helvetica','',5);
                        $pdf->MultiCell(0,$cellHeight,utf8_decode(trim($value->footline4)),0,"C");
                    }
                }
                $textypos= $pdf->GetY();
                $pdf->setY($textypos);
                $pdf->setX($leftSpace);
                $pdf->MultiCell(0,$cellHeight,$line,0,"C");
                $textypos= 1 + $pdf->GetY();
                $pdf->setY($textypos);
                $pdf->EAN13(20,$textypos,$nro_folio,6);
                $pdf->AutoPrint();
                $pdf->output("F",$path_report);
                $result = $this->json_response(array(
                    'report'    => $path_report
                ));
            } catch (\Throwable $th) {
                DB::rollback();
                $result = $this->json_response_succes_error('Error al intentar guardar los cambios');
                throw $th;
            }
        }else{
            $result = $this->json_response_succes_error('Error en los datos recibidos');
        }

        return  $result;
    }

    public function setTicketsFast($records = null, $user = 0, $type = 0, $cash = 0)
    {
        
        if (!is_null($records)) {
            $total  = 0;
            $data   = [];
            try {
                DB::beginTransaction();
                $data['discount']       = $records->discount;
                $data['value_paid']     = $records->value_paid;
                $data['change']         = $records->change;
                $data['state']          = 'TICKET';
                $res    = DB::table('tb_sales_master')
                                ->where('id', $records->id)
                                ->update($data);
                $id_sale    = $records->id;

                $data   = [];
                $data['id_sale']        = $id_sale;
                $data['id_cash']        = $cash;
                DB::table('tb_sales_users')->insertGetId($data);

                $config     = $this->getConfigInvoive();
                $saleMaster = $this->getSaleMaster($id_sale, 2);
                $saleDetail = $this->getSaleDetail($id_sale, 2);
                
                $data   = [];
                $data['id_sale']            = $id_sale;
                $data['id_payment']         = 1;
                $data['amount']             = $saleMaster[0]->total;
                DB::table('tb_sales_payment')->insertGetId($data);
                DB::commit();   

                $line   = "---------------------------------------------------------------------------";
                $leftSpace  = 8;
                $pdf = new FpdfBarcode($orientation='P',$unit='mm', array(80,350));
                $pdf->AddPage();
                $pdf->SetLeftMargin(5);
                $pdf->SetRightMargin(5);
                $pdf->SetFont('Helvetica','B',8);    //Letra Helvetica, negrita (Bold), tam. 20
                $pdf->Image($this->path_logo_reports,2,5,75,45);
                $textypos   = 50;
                $cellHeight = 3;
                $pdf->setY(2);
                $pdf->setX($leftSpace);
                $pdf->MultiCell(0,$textypos,'',0,"C");
                foreach ($config as $key => $value) {
                    if (!empty($value->headerline1)) {
                        $pdf->MultiCell(0,$cellHeight,utf8_decode(trim($value->headerline1)),0,"C");
                    }
                    if (!empty($value->headerline2)) {
                        $pdf->MultiCell(0,$cellHeight,utf8_decode(trim($value->headerline2)),0,"C");
                    }
                }
                $pdf->SetX($leftSpace);
                $pdf->MultiCell(0,$cellHeight,utf8_decode('TICKET DE VENTA'),0,"C");
                $nro_folio  = 0;
                $nro_user   = 0;
                $pdf->MultiCell(0,$cellHeight,'',0,"C");
                foreach ($saleMaster as $key => $value) {
                    $pdf->setX($leftSpace);
                    $pdf->SetFont('Helvetica','B',6);    //Letra Helvetica, negrita (Bold), tam. 20
                    $pdf->MultiCell(0,$cellHeight, "FECHA: ".date('d/m/Y',strtotime($value->date))." HORA: ".date('h:i:s A',strtotime($value->date))."     FOLIO: ".$value->nro_sale);
                    $nro_folio  = $value->nro_sale;
                    $pdf->setX($leftSpace);
                    $pdf->MultiCell(0,$cellHeight, utf8_decode("CLIENTE: MOSTRADOR"));
                }
                $path_report = "reports/tiket-f".$nro_folio."-d".date('d-m-Y-h-i-s-A').".pdf";
                DB::update('UPDATE tb_sales_master SET document_ok = "'.$path_report.'" where id = ?', [$id_sale], ' LIMIT 1');
                $pdf->SetFont('Helvetica','B',7);    //Letra Helvetica, negrita (Bold), tam. 20
                $pdf->setX($leftSpace);
                $pdf->MultiCell(0,$cellHeight,$line,0,"C");
                $pdf->setX($leftSpace);
                $pdf->MultiCell(0,$cellHeight,'CANT  DETALLE                          PRECIO         TOTAL');
                $total =0;
                $off = $pdf->GetY();
                $pdf->SetFont('Helvetica','B',7);
                
                foreach($saleDetail as $pro){
                    $pdf->SetY($off);
                    $pdf->setX($leftSpace + 2);
                    $pdf->Cell(5,$cellHeight,  $pro->amount,0,0,"R");
                    $pdf->setX($leftSpace +6);
                    $pdf->Cell(40,$cellHeight,  utf8_decode(Trim($pro->product_name)));
                    $pdf->setX(41);
                    $pdf->Cell(15,$cellHeight,  "$".number_format($pro->unit_price,2,".",",") ,0,0,"R");
                    $pdf->setX(57);
                    $pdf->Cell(15,$cellHeight,  "$".number_format($pro->total,2,".",",") ,0,0,"R");
                    if(strlen(Trim($pro->detail)) > 0){
                        $off+=3;
                        $pdf->SetY($off);
                        $pdf->setX($leftSpace + 7);
                        $pdf->MultiCell(0,$cellHeight,utf8_decode($pro->detail));
                        $off = $pdf->GetY();
                    }else{
                        $off+=3;
                    }
                }
                $textypos= 2 + $pdf->GetY();
                $pdf->SetY($textypos);
                $pdf->setX($leftSpace);
                $pdf->MultiCell(0,$cellHeight,$line,0,"C");
                $pdf->MultiCell(0,$cellHeight,utf8_decode('FORMA DE PAGO'),0,"C");

                $textypos= 0 + $pdf->GetY();
                $pdf->SetY($textypos);
                $pdf->setX($leftSpace);
                $pdf->Cell(5,$cellHeight,"SUBTOTAL: " );

                $pdf->setX(63);
                $pdf->Cell(6,$cellHeight,"$ ".number_format($saleMaster[0]->subtotal,2,".",","),0,0,"R");
                $textypos= $cellHeight + $pdf->GetY();
                $pdf->SetY($textypos);
                $pdf->setX($leftSpace);
                $pdf->Cell(5,$cellHeight,"DESCUENTO: " );
                $pdf->setX(63);
                $pdf->Cell(6,$cellHeight,"$ ".number_format($saleMaster[0]->discount,2,".",","),0,0,"R");

                $textypos= $cellHeight + $pdf->GetY();
                $pdf->SetY($textypos);
                $pdf->setX($leftSpace);
                $pdf->Cell(5,$cellHeight,"TOTAL: " );
                $pdf->setX(63);
                $pdf->Cell(6,$cellHeight,"$ ".number_format($saleMaster[0]->total,2,".",","),0,0,"R");

                $textypos= $cellHeight + $pdf->GetY();
                $pdf->SetY($textypos);
                $pdf->setX($leftSpace);
                $pdf->Cell(5,$cellHeight,"EFECTIVO: " );
                $pdf->setX(63);
                $pdf->Cell(6,$cellHeight,"$ ".number_format($saleMaster[0]->value_paid,2,".",","),0,0,"R");

                $textypos= $cellHeight + $pdf->GetY();
                $pdf->SetY($textypos);
                $pdf->setX($leftSpace);
                $pdf->Cell(5,$cellHeight,"CAMBIO: " );
                $pdf->setX(63);
                $pdf->Cell(6,$cellHeight,"$ ".number_format($saleMaster[0]->change,2,".",","),0,0,"R");

                $textypos+=2;
                $pdf->SetY($textypos);
                $pdf->setX($leftSpace);
                $pdf->MultiCell(0,$cellHeight,$line,0,"C");
                $textypos = $pdf->GetY();
                $pdf->setY($textypos);
                $pdf->setX($leftSpace);
                foreach ($config as $key => $value) {
                    if (!empty(trim($value->footline1))) {
                        $pdf->MultiCell(0,$cellHeight,utf8_decode(trim($value->footline1)),0,"C");
                    }
                    if (!empty(trim($value->footline2))) {
                        $pdf->MultiCell(0,$cellHeight -3,utf8_decode(trim($value->footline2)),0,"C");
                    }
                    if (!empty(trim($value->footline3))) {
                        $pdf->MultiCell(0,$cellHeight -3,utf8_decode(trim($value->footline3)),0,"C");
                    }
                    // if (!empty(trim($value->footline4))) {
                    //     $pdf->MultiCell(0,$cellHeight -3,utf8_decode(trim($value->footline4)),0,"C");
                    // }
                }
                $textypos= $pdf->GetY();
                $pdf->setY($textypos);
                $pdf->setX($leftSpace);
                $pdf->MultiCell(0,$cellHeight,$line,0,"C");
                $textypos= 1 + $pdf->GetY();
                $pdf->setY($textypos);
                $pdf->EAN13(20,$textypos,$nro_folio,6);
                $pdf->AutoPrint();
                $pdf->output("F",$path_report);
                $result = $this->json_response(array(
                    'report'    => $path_report
                ));
            } catch (\Throwable $th) {
                DB::rollback();
                $result = $this->json_response_succes_error('Error al intentar guardar los cambios');
                throw $th;
            }
        }else{
            $result = $this->json_response_succes_error('Error en los datos recibidos');
        }

        return  $result;
    }

    public function setTicketFastFood(string $tb = null, $records = null, $user = 0)
    {
        
        if (is_array($records)) {
            $total  = 0;
            $data   = [];
            foreach ($records as $key => $value) {
                $total  += $value->total;
            }
            try {
                DB::beginTransaction();
                $data['subtotal']   = $total;
                $data['id_branch']  = 1;
                $data['state']      = "PRE";
                $data['type']       = "2";
                $id_sale    = DB::table('tb_sales_master')->insertGetId($data);

                if($id_sale > 0 ){
                    foreach ($records as $key => $value) {
                        $data   = [];
                        $data['id_sale']        = $id_sale;
                        $data['id_product']     = $value->id;
                        $data['amount']         = $value->cant;
                        $data['unit_price']     = $value->price;
                        DB::table('tb_sales_detail')->insertGetId($data);
                    }

                    DB::commit();
                    $config     = $this->getConfigInvoive();
                    $saleMaster = $this->getSaleMaster($id_sale, 2);
                    $line   = "--------------------------------------------------------------";
                    $leftSpace  = 8;

                    $pdf = new FpdfBarcode($orientation='P',$unit='mm', array(80,350));
                    $pdf->AddPage();
                    $pdf->SetLeftMargin(5);
                    $pdf->SetRightMargin(5);
                    $pdf->SetFont('Helvetica','B',8);    //Letra Helvetica, negrita (Bold), tam. 20
                    $pdf->Image($this->path_logo_reports,2,5,75,45);
                    $textypos   = 50;
                    $cellHeight = 3;
                    $pdf->setY(2);
                    $pdf->setX($leftSpace);
                    $pdf->MultiCell(0,$textypos,'',0,"C");
                    foreach ($config as $key => $value) {
                        if (!empty($value->headerline1)) {
                            $pdf->MultiCell(0,$cellHeight,utf8_decode(trim($value->headerline1)),0,"C");
                        }
                        if (!empty($value->headerline2)) {
                            $pdf->MultiCell(0,$cellHeight,utf8_decode(trim($value->headerline2)),0,"C");
                        }
                    }
                    $pdf->SetX($leftSpace);
                    $pdf->MultiCell(0,$cellHeight,utf8_decode('TICKET DE PRE-VENTA FASTFOOD'),0,"C");
                    $nro_folio  = 0;
                    $nro_user   = 0;
                    $pdf->MultiCell(0,$cellHeight,'',0,"C");
                    foreach ($saleMaster as $key => $value) {
                        $pdf->setX($leftSpace);
                        $pdf->SetFont('Helvetica','B',6);    //Letra Helvetica, negrita (Bold), tam. 20
                        $pdf->MultiCell(0,$cellHeight, "FECHA: ".date('d/m/Y',strtotime($value->date))." HORA: ".date('h:i:s A',strtotime($value->date))."     FOLIO: ".$value->nro_sale);
                        $nro_folio  = $value->nro_sale;
                        // $nro_user   = $value->id_user;
                        // $pdf->setX($leftSpace);
                        // $pdf->MultiCell(0,$cellHeight, utf8_decode("CLIENTE: ".$value->first_name." ".$value->last_name."  Nº. CLIENTE: ".$value->id_user));
                    }
                    $path_report = "reports/tiket-f".$nro_folio."-d".date('d-m-Y-h-i-s-A').".pdf";
                    DB::update('UPDATE tb_sales_master SET document = "'.$path_report.'" where id = ?', [$id_sale], ' LIMIT 1');
                    $pdf->SetFont('Helvetica','B',7);    //Letra Helvetica, negrita (Bold), tam. 20
                    $pdf->setX($leftSpace);
                    $pdf->MultiCell(0,$cellHeight,$line,0,"C");
                    $pdf->setX($leftSpace);
                    $pdf->MultiCell(0,$cellHeight,'CANT  DETALLE                          PRECIO         TOTAL');
                    $total =0;
                    $off = $pdf->GetY();
                    $pdf->SetFont('Helvetica','B',7);
                    $cellHeight = 3;
                    foreach($records as $pro){
                        $pdf->SetY($off);
                        $pdf->setX($leftSpace + 2);
                        $pdf->Cell(5,$cellHeight,  $pro->cant,0,0,"R");
                        $pdf->setX($leftSpace +6);
                        $pdf->Cell(40,$cellHeight,  utf8_decode(Trim($pro->product_name)));
                        $pdf->setX(41);
                        $pdf->Cell(15,$cellHeight,  "$".number_format($pro->price,2,".",",") ,0,0,"R");
                        $pdf->setX(57);
                        $pdf->Cell(15,$cellHeight,  "$".number_format($pro->total,2,".",",") ,0,0,"R");
                        $total += $pro->total;
                        $off+=3;
                    }
                    $cellHeight = 3;
                    $textypos= 2 + $pdf->GetY();
                    $pdf->SetY($textypos);
                    $pdf->setX($leftSpace);
                    $pdf->MultiCell(0,$cellHeight,$line,0,"C");
                    $textypos= 0 + $pdf->GetY();
                    $pdf->SetY($textypos);
                    $pdf->setX($leftSpace);
                    $pdf->Cell(5,$cellHeight,"TOTAL A PAGAR: " );
                    $pdf->setX(63);
                    $pdf->Cell(6,$cellHeight,"$ ".number_format($total,2,".",","),0,0,"R");
                    $textypos+=2;
                    $pdf->SetY($textypos);
                    $pdf->setX($leftSpace);
                    $pdf->MultiCell(0,$cellHeight,$line,0,"C");
                    $textypos = $pdf->GetY();
                    $pdf->setY($textypos);
                    $pdf->setX($leftSpace);
                    foreach ($config as $key => $value) {
                        if (!empty(trim($value->footline1))) {
                            $pdf->MultiCell(0,$cellHeight,utf8_decode(trim($value->footline1)),0,"C");
                        }
                        if (!empty(trim($value->footline2))) {
                            $pdf->MultiCell(0,$cellHeight -3,utf8_decode(trim($value->footline2)),0,"C");
                        }
                        if (!empty(trim($value->footline3))) {
                            $pdf->MultiCell(0,$cellHeight -3,utf8_decode(trim($value->footline3)),0,"C");
                        }
                        // if (!empty(trim($value->footline4))) {
                        //     $pdf->MultiCell(0,$cellHeight -3,utf8_decode(trim($value->footline4)),0,"C");
                        // }
                    }
                    $textypos= $pdf->GetY();
                    $pdf->setY($textypos);
                    $pdf->setX($leftSpace);
                    $pdf->MultiCell(0,$cellHeight,$line,0,"C");
                    $textypos= 1 + $pdf->GetY();
                    $pdf->setY($textypos);
                    $barcode = $pdf->EAN13(20,$textypos,$nro_folio,6);
                    $data = [];
                    $data['barcode']       = $barcode;
                    $res    = DB::table('tb_sales_master')
                                    ->where('id', $id_sale)
                                    ->update($data);
                    $pdf->AutoPrint();
                    $pdf->output("F",$path_report);
                    $result = $this->json_response(array(
                        'report'    => $path_report,
                        'id_sale'   => $id_sale
                    ));
                }else{
                    DB::rollback();
                    $result = $this->json_response_succes_error('Error al intentar guardar los cambios');
                }
            } catch (\Throwable $th) {
                DB::rollback();
                $result = $this->json_response_succes_error('Error al intentar guardar los cambios');
                throw $th;
            }
        }else{
            $result = $this->json_response_succes_error('Error en los datos recibidos');
        }

        return  $result;
    }
    
    public function getTicketServices(string $tb = null, $records = null, $user = 0)
    {
        
        if (is_array($records)) {
            $total  = 0;
            $data   = [];
            foreach ($records as $key => $value) {
                $total  += $value->total;
            }
            try {
                DB::beginTransaction();
                $data['subtotal']   = $total;
                $data['id_branch']  = 1;
                $data['state']      = "PRE";
                $id_sale    = DB::table('tb_sales_master')->insertGetId($data);

                $data   = [];
                $data['id_user']    = $user;
                $data['id_sale']    = $id_sale;
                DB::table('tb_sales_customers')->insertGetId($data);

                if($id_sale > 0 ){
                    foreach ($records as $key => $value) {
                        $data   = [];
                        if($value->type == 1){
                            $data['id_sales']       = $id_sale;
                            $data['id_footwear']    = $value->id;
                            $data['amount']         = $value->cant;
                            $data['unit_price']     = $value->price;
                            DB::table('tb_sales_detail_footwear')->insertGetId($data);
                        }else{
                            $data['id_sales']       = $id_sale;
                            $data['id_service']     = $value->id;
                            $data['amount']         = $value->cant;
                            $data['unit_price']     = $value->price;
                            $id_serv = DB::table('tb_sales_detail_services')->insertGetId($data);
                            $data   = [];
                            $data['id_user']        = $user;
                            $data['id_service']     = $id_serv;
                            DB::table('tb_access_control')->insertGetId($data);
                        }
                    }
                    DB::commit();
                    $config     = $this->getConfigInvoive();
                    $saleMaster = $this->getSaleMaster($id_sale);
                    $line   = "---------------------------------------------------------------------------";
                    $leftSpace  = 8;
                    $pdf = new FpdfBarcode($orientation='P',$unit='mm', array(80,850));
                    $pdf->AddPage();
                    $pdf->SetLeftMargin(5);
                    $pdf->SetRightMargin(5);
                    $pdf->SetFont('Helvetica','B',8);    //Letra Helvetica, negrita (Bold), tam. 20
                    $pdf->Image($this->path_logo_reports,2,5,75,45);
                    $textypos   = 50;
                    $cellHeight = 3;
                    $pdf->setY(2);
                    $pdf->setX($leftSpace);
                    $pdf->MultiCell(0,$textypos,'',0,"C");
                    foreach ($config as $key => $value) {
                        if (!empty($value->headerline1)) {
                            $pdf->MultiCell(0,$cellHeight,utf8_decode(trim($value->headerline1)),0,"C");
                        }
                        if (!empty($value->headerline2)) {
                            $pdf->MultiCell(0,$cellHeight,utf8_decode(trim($value->headerline2)),0,"C");
                        }
                    }
                    $pdf->SetX($leftSpace);
                    $pdf->MultiCell(0,$cellHeight,utf8_decode('TICKET DE PRE-VENTA'),0,"C");
                    $nro_folio  = 0;
                    $nro_user   = 0;
                    foreach ($saleMaster as $key => $value) {
                        $pdf->setX($leftSpace);
                        $pdf->SetFont('Helvetica','B',6);    //Letra Helvetica, negrita (Bold), tam. 20
                        $pdf->MultiCell(0,$cellHeight, "FECHA: ".date('d/m/Y',strtotime($value->date))." HORA: ".date('h:i:s A',strtotime($value->date))."     FOLIO: ".$value->nro_sale);
                        $nro_folio  = $value->nro_sale;
                        $nro_user   = $value->id_user;
                        $pdf->setX($leftSpace);
                        $pdf->MultiCell(0,$cellHeight, utf8_decode("CLIENTE: ".$value->customers."  Nº. CLIENTE: ".$value->id_user));
                    }
                    $path_report = "reports/tiket-f".$nro_folio."-u".$nro_user."-t".date('d-m-Y-h-i-s-A').".pdf";
                    $pdf->SetFont('Helvetica','B',7);    //Letra Helvetica, negrita (Bold), tam. 20
                    $pdf->setX($leftSpace);
                    $pdf->MultiCell(0,$cellHeight,$line,0,"C");
                    $pdf->setX($leftSpace);
                    $pdf->MultiCell(0,$cellHeight,'CANT  DETALLE                          PRECIO         TOTAL');
                    $total =0;
                    $off = $pdf->GetY();
                    $pdf->SetFont('Helvetica','',7);
                    $cellHeight = 3;
                    foreach($records as $pro){
                        $pdf->SetY($off);
                        $pdf->setX($leftSpace + 2);
                        $pdf->Cell(5,$cellHeight,  $pro->cant,0,0,"R");
                        $pdf->setX($leftSpace +6);
                        // $pdf->Cell(40,$cellHeight,  utf8_decode(Trim($pro->shoe_name)));
                        $pdf->setX(41);
                        $pdf->Cell(15,$cellHeight,  "$".number_format($pro->price,2,".",",") ,0,0,"R");
                        $pdf->setX(57);
                        $pdf->Cell(15,$cellHeight,  "$".number_format($pro->total,2,".",",") ,0,0,"R");
                        $off+=3;
                        $pdf->SetY($off);
                        $pdf->setX($leftSpace + 5);
                        $pdf->MultiCell(0,$cellHeight,utf8_decode($pro->shoe_name));
                        $off = $pdf->GetY();
                        $total += $pro->total;
                        // $off+=3;
                    }
                    $cellHeight = 3;
                    $textypos= 2 + $pdf->GetY();
                    $pdf->SetY($textypos);
                    $pdf->setX($leftSpace);
                    $pdf->MultiCell(0,$cellHeight,$line,0,"C");
                    $textypos= 0 + $pdf->GetY();
                    $pdf->SetY($textypos);
                    $pdf->setX($leftSpace);
                    $pdf->Cell(5,$cellHeight,"TOTAL A PAGAR: " );
                    $pdf->setX(63);
                    $pdf->Cell(5,$cellHeight,"$ ".number_format($total,2,".",","),0,0,"R");
                    $textypos+=2;
                    $pdf->SetY($textypos);
                    $pdf->setX($leftSpace);
                    $pdf->MultiCell(0,$cellHeight,$line,0,"C");
                    $textypos = $pdf->GetY();
                    $pdf->setY($textypos);
                    $pdf->setX($leftSpace);
                    foreach ($config as $key => $value) {
                        $pdf->SetFont('Helvetica','',7);
                        if (!empty(trim($value->footline1))) {
                            $pdf->MultiCell(0,$cellHeight,utf8_decode(trim($value->footline1)),0,"C");
                        }
                        if (!empty(trim($value->footline2))) {
                            $pdf->MultiCell(0,$cellHeight,utf8_decode(trim($value->footline2)),0,"C");
                        }
                        if (!empty(trim($value->footline3))) {
                            $pdf->MultiCell(0,$cellHeight,utf8_decode(trim($value->footline3)),0,"C");
                        }
                        if (!empty(trim($value->footline4))) {
                            $pdf->SetFont('Helvetica','',5);
                            $pdf->MultiCell(0,$cellHeight,utf8_decode(trim($value->footline4)),0,"C");
                        }
                    }
                    $textypos= $pdf->GetY();
                    $pdf->setY($textypos);
                    $pdf->setX($leftSpace);
                    $pdf->MultiCell(0,$cellHeight,$line,0,"C");
                    $textypos= 1 + $pdf->GetY();
                    $pdf->setY($textypos);
                    $barcode    = $pdf->EAN13(20,$textypos,$nro_folio,6);
                    $data = [];
                    $data['barcode']       = $barcode;
                    $res    = DB::table('tb_sales_master')
                                    ->where('id', $id_sale)
                                    ->update($data);
                    $pdf->AutoPrint();
                    $pdf->output("F",$path_report);
                    $result = $this->json_response(array(
                        'report'    => $path_report
                    ));
                    DB::update('UPDATE tb_sales_master SET document = "'.$path_report.'" where id = ?', [$id_sale], ' LIMIT 1');
                }else{
                    DB::rollback();
                    $result = $this->json_response_succes_error('Error al intentar guardar los cambios');
                }
            } catch (\Throwable $th) {
                DB::rollback();
                $result = $this->json_response_succes_error('Error al intentar guardar los cambios');
                throw $th;
            }
        }else{
            $result = $this->json_response_succes_error('Error en los datos recibidos');
        }

        return  $result;
    }
}
