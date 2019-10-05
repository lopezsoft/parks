<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\core\MasterModel;
use Codedge\Fpdf\Fpdf\Fpdf;
use App\Barcode\FpdfBarcode;

class Report extends MasterModel
{
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
                    $line   = "------------------------------------------------------------------------------------------------------";
                    $leftSpace  = 8;
                    $pdf = new FpdfBarcode($orientation='P',$unit='mm', array(80,350));
                    $pdf->AddPage();
                    $pdf->SetLeftMargin(8);
                    $pdf->SetRightMargin(8);
                    $pdf->SetFont('Arial','B',5);    //Letra Arial, negrita (Bold), tam. 20
                    $textypos   = 5;
                    $cellHeight = 2;
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
                        $pdf->SetFont('Arial','B',4);    //Letra Arial, negrita (Bold), tam. 20
                        $pdf->MultiCell(0,$cellHeight, "FECHA: ".date('d/m/Y',strtotime($value->date))." HORA: ".date('h:i:s A',strtotime($value->date))."     FOLIO: ".$value->nro_sale);
                        $nro_folio  = $value->nro_sale;
                        // $nro_user   = $value->id_user;
                        // $pdf->setX($leftSpace);
                        // $pdf->MultiCell(0,$cellHeight, utf8_decode("CLIENTE: ".$value->first_name." ".$value->last_name."  Nº. CLIENTE: ".$value->id_user));
                    }
                    $path_report = "reports/tiket-f".$nro_folio."-d".date('d-m-Y-h-i-s-A').".pdf";
                    $pdf->SetFont('Arial','B',5);    //Letra Arial, negrita (Bold), tam. 20
                    $pdf->setX($leftSpace);
                    $pdf->MultiCell(0,$cellHeight,$line,0,"C");
                    $pdf->setX($leftSpace);
                    $pdf->MultiCell(0,$cellHeight,'CANT  DETALLE                                                    PRECIO                    TOTAL');
                    $total =0;
                    $off = $pdf->GetY();
                    $pdf->SetFont('Arial','',5);
                   
                    foreach($records as $pro){
                        $pdf->SetY($off);
                        $pdf->setX($leftSpace + 2);
                        $pdf->Cell(5,$cellHeight,  $pro->cant,0,0,"R");
                        $pdf->setX($leftSpace +6);
                        $pdf->Cell(40,$cellHeight,  Trim($pro->product_name));
                        $pdf->setX(41);
                        $pdf->Cell(15,$cellHeight,  "$".number_format($pro->price,2,".",",") ,0,0,"R");
                        $pdf->setX(57);
                        $pdf->Cell(15,$cellHeight,  "$".number_format($pro->total,2,".",",") ,0,0,"R");
                        $total += $pro->total;
                        $off+=2;
                    }
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
                        if (!empty(trim($value->footline4))) {
                            $pdf->MultiCell(0,$cellHeight -3,utf8_decode(trim($value->footline4)),0,"C");
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
                $total  += $value->price;
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
                            $data['unit_price']     = $value->price;
                            DB::table('tb_sales_detail_footwear')->insertGetId($data);
                        }else{
                            $data['id_sales']       = $id_sale;
                            $data['id_service']     = $value->id;
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
                    $line   = "------------------------------------------------------------------------------------------------------";
                    $leftSpace  = 8;
                    $pdf = new FpdfBarcode($orientation='P',$unit='mm', array(80,350));
                    $pdf->AddPage();
                    $pdf->SetLeftMargin(8);
                    $pdf->SetRightMargin(8);
                    $pdf->SetFont('Arial','B',5);    //Letra Arial, negrita (Bold), tam. 20
                    $textypos   = 5;
                    $cellHeight = 2;
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
                        $pdf->SetFont('Arial','',4);    //Letra Arial, negrita (Bold), tam. 20
                        $pdf->MultiCell(0,$cellHeight, "FECHA: ".date('d/m/Y',strtotime($value->date))." HORA: ".date('h:i:s A',strtotime($value->date))."     FOLIO: ".$value->nro_sale);
                        $nro_folio  = $value->nro_sale;
                        $nro_user   = $value->id_user;
                        $pdf->setX($leftSpace);
                        $pdf->MultiCell(0,$cellHeight, utf8_decode("CLIENTE: ".$value->first_name." ".$value->last_name."  Nº. CLIENTE: ".$value->id_user));
                    }
                    $path_report = "reports/tiket-f".$nro_folio."-u".$nro_user."-t".date('d-m-Y-h-i-s-A').".pdf";
                    $pdf->SetFont('Arial','B',5);    //Letra Arial, negrita (Bold), tam. 20
                    $pdf->setX($leftSpace);
                    $pdf->MultiCell(0,$cellHeight,$line,0,"C");
                    $pdf->setX($leftSpace);
                    $pdf->MultiCell(0,$cellHeight,'CONCEPTO                                                                                       TOTAL');
                    $total =0;
                    $off = $pdf->GetY();
                    $pdf->SetFont('Arial','',5);
                   
                    foreach($records as $pro){
                        $pdf->SetY($off);
                        $pdf->setX($leftSpace + 2);
                        $pdf->Cell(50,$cellHeight,  $pro->shoe_name);
                        $pdf->setX(53);
                        $pdf->Cell(15,$cellHeight,  "$".number_format($pro->price,2,".",",") ,0,0,"R");
                        $total += $pro->price;
                        $off+=2;
                    }
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
                        if (!empty(trim($value->footline1))) {
                            $pdf->MultiCell(0,$cellHeight,utf8_decode(trim($value->footline1)),0,"C");
                        }
                        if (!empty(trim($value->footline2))) {
                            $pdf->MultiCell(0,$cellHeight -3,utf8_decode(trim($value->footline2)),0,"C");
                        }
                        if (!empty(trim($value->footline3))) {
                            $pdf->MultiCell(0,$cellHeight -3,utf8_decode(trim($value->footline3)),0,"C");
                        }
                        if (!empty(trim($value->footline4))) {
                            $pdf->MultiCell(0,$cellHeight -3,utf8_decode(trim($value->footline4)),0,"C");
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