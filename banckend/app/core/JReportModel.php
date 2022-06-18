<?php

namespace App\core;

use Illuminate\Http\File;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use JasperPHP\JasperPHP;

/**
 * PHP Jasper Report Utlis
 * Clase para generar reportes de Jaspert Report desde php
 * 
 */

class JReportModel {
    //
    /**
	 * Conexion jdbc
	 * @var  $connection 
	 */
	private $connection = NULL;
	
	/**
	 * Driver jdbc de la conexion
	 * @var  String $driver 
	*/
	 
	private $driver	= "com.mysql.jdbc.Driver";
	/**
	* Nombre de la base de datos para la conexion jdbc
	* @var String $database_name
	*/
	private $database_name	= 'dbname';
	
	private $host			= 'localhost';
    
	/**
	 * string o url de la conexion jdbc 
	 * 
	 * @var  String $connection_string 
	 */
    private $connection_string	= "jdbc:mysql://localhost/";
    

	/**
	 * usuario de la conexion  jdbc
	 * 
	 * @var  String $user 
	 */
	private $username_db	= 'root';
    
    private $port           = '3307';
    
	/**
	* Contraseña del usuario de la conexion jdbc
	* @var String $password_db
	* 
	*/
	private $password_db	= NULL;
	
	/*
	 *Indica una conexion jdbc
	 *@var JdbcConnection  
	 */
	private $jdbc_connection;
	
	/**
	* Propiedades para almacenar las rutas de los informes en sus respentivos formatos	
	*/
	public $path_folder_pdf;
	public $path_folder_doc; 
	public $path_folder_csv; 
	public $path_folder_txt; 
	public $path_folder_pptx; 
	public $path_folder_html;
	public $path_folder_rtf;
	public $path_folder_xls;
	public $path_folder_xlsx;
	public $path_report;
    public $path_report_put;
    public $directory_path;

    var $path_delim = '/';
	
	/**
	* Cargamos la Libreia Jdbc_connection_class
	*/
	
	private	$url_java		= NULL;
	
	//Variables del informe
	public	$p_title		= 'TITULO DEL REPORTE';
 	public	$p_nit			= '';
	public	$p_footer		= 'Leyenda del reporte'; 
	public	$p_dane			= '';
	public 	$p_resol		= '';
	public	$p_img_left		= '';
	public 	$p_img_right	= '';
	public  $p_escudo;
	public  $p_marketing;
    public	$subreport_dir	= '';

    public function __construct()
    {
        $this->path_folder_pdf	= 'pdf';
		$this->path_folder_doc	= 'doc'; 
		$this->path_folder_csv	= 'csv'; 
		$this->path_folder_txt	= 'txt'; 
		$this->path_folder_pptx	= 'pptx';
		$this->path_folder_html = 'html';
		$this->path_folder_rtf 	= 'rtf';
        $this->path_folder_xls 	= 'xls';
        $this->path_folder_xlsx = 'xlsx';
        $this->driver			= "mysql" /** mysql || postgres */;

        $delim				    = $this->path_delim;
        
        $this->port             = env('DB_PORT', '3307');
        $this->database_name    = env('DB_DATABASE', 'forge');
        $this->username_db		= env('DB_USERNAME', 'root');
		$this->password_db		= env('DB_PASSWORD', '');
		$this->host				= env('DB_HOST', '127.0.0.1');
        
        $this->path_report  = 'reportsjr';

        if (!is_dir($this->path_report)) {
            mkdir($this->path_report,0777,true);
        }
        
        $dir    = $this->path_report.$delim;

        if (!is_dir($dir.$this->path_folder_pdf)) {
            mkdir($dir.$this->path_folder_pdf,0777,true);
        }

        if (!is_dir($dir.$this->path_folder_doc)) {
            mkdir($dir.$this->path_folder_doc,0777,true);
        }

        if (!is_dir($dir.$this->path_folder_pptx)) {
            mkdir($dir.$this->path_folder_pptx,0777,true);
        }

        if (!is_dir($dir.$this->path_folder_xls)) {
            mkdir($dir.$this->path_folder_xls,0777,true);
		}
		
        if (!is_dir($dir.$this->path_folder_xlsx)) {
            mkdir($dir.$this->path_folder_xlsx,0777,true);
        }

        if (!is_dir($dir.$this->path_folder_html)) {
            mkdir($dir.$this->path_folder_html,0777,true);
        }

        if (!is_dir($dir.$this->path_folder_rtf)) {
            mkdir($dir.$this->path_folder_rtf,0777,true);
        }

        if (!is_dir($dir.$this->path_folder_csv)) {
            mkdir($dir.$this->path_folder_csv,0777,true);
        }

        $this->path_folder_pdf	= $dir.'pdf';
		$this->path_folder_doc	= $dir.'doc'; 
		$this->path_folder_csv	= $dir.'csv'; 
		$this->path_folder_txt	= $dir.'txt'; 
		$this->path_folder_pptx	= $dir.'pptx';
		$this->path_folder_html = $dir.'html';
		$this->path_folder_rtf 	= $dir.'rtf';
        $this->path_folder_xls 	= $dir.'xls';
        
        $this->subreport_dir    = $this->path_report;
    }

	/**
	* 
	* @param string $nameReport, Nonbre del reporte creado en JasReport
	* @param string $format, Formato o extensión del informe
	* @param string $query, sentencia SQL.
	* @param string $param, parametros del reporte SQL.
	* 
	* @return
	*/	
	public function getReportExport ($nameReport, $format, $query, $param = []) {
		$name				= $nameReport;
		//Reporte a Procesar : Este nombre es del reporte creado en JasReport
		$nameReport			= $this->path_report.$this->path_delim.$nameReport;		
		
		//Ruta donde se encuentra guardado el informe
		$path_save_report 	=	$this->path_report;		

		//Parametro en caso de que el reporte no este parametrizado		

		if(count($param) == 0){			
			$parm	= array(
				'SQL_PARAM' 	=> $query,
				'SUBREPORT_DIR' => $this->subreport_dir
			);			
		}else{
			$parm	= array(
				'SQL_PARAM' 	=> $query,
				'SUBREPORT_DIR' => $this->subreport_dir
            );	
            		
			foreach($param as $key => $value){
				$parm[$key] = $value;
			}
		}
		
		try {
			switch ($format) {
				case 'pdf':
					$output	= $this->path_folder_pdf.$this->path_delim;
					break;
				case 'pptx':
					$output	= $this->path_folder_pptx.$this->path_delim;
					break;
				case 'docx':
					$output	= $this->path_folder_doc.$this->path_delim;
					break;
				case 'csv':
					$output	= $this->path_folder_csv.$this->path_delim;
					break;
				case 'txt':
					$output	= $this->path_folder_txt.$this->path_delim;
					break;
				case 'html':
					$output	= $this->path_folder_html.$this->path_delim;
					break;
				case 'rtf':
					$output	= $this->path_folder_rtf.$this->path_delim;
					break;
				case 'xls':
					$output	= $this->path_folder_xls.$this->path_delim;
					break;
				case 'xlsx':
					$output	= $this->path_folder_xlsx.$this->path_delim;
					break;
				default:
					$output	= $this->path_folder_pdf.$this->path_delim;
					break;
			}

			$date	= date('Y-m-d-h-i-s');
			if(!is_dir($output.$date)){
				mkdir($output.$date,0777,true);
				$output	= $output.$date;
			}

			$jasper = new JasperPHP;
			// Compile a JRXML to Jasper
			$jasper->compile($nameReport.'.jrxml')->execute();
			
			$jasper->process(
				$nameReport. '.jasper',
				$output,
				array($format),
				$parm,
				array(
					'driver' 	=> $this->driver,
					'username' 	=> $this->username_db,
					'host' 		=> $this->host,
					'database' 	=> $this->database_name,
					'port' 		=> $this->port
				)
			)->execute();

			$request	= array(
				'success'		=> TRUE,
				'report'		=> utf8_encode($output.$this->path_delim.$name.".".$format)
			);
			
			$request	= json_encode($request);
		} catch (\Throwable $th) {
			// Depuración de errores
			exec($jasper->output().' 2>&1', $output_error);
			print_r($output_error);
			print_r($output);
			
			$request	= array(
				'success'		=> FALSE,
				'report'	=> utf8_encode($output)
			);
			
			$request	= json_encode($request);
			throw $th;
		}	

		return $request;
	}
    
}
