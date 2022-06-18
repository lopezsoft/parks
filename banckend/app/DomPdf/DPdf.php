<?php

namespace App\DomPDF;

use Dompdf\Dompdf;
// use Dompdf\Options;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\View;

Class DPdf extends Dompdf {
	
	public function __construct($options = null)
	{
		$options	= [
			'chroot'									=> realpath(base_path()),
			'isPhpEnabled'						=> true,
			'isRemoteEnabled'					=> true,
			'isHtml5ParserEnabled'		=> true,
		];
		parent::__construct($options);
	}
	

	public function save($path)
	{
		$this->render();
		Storage::put($path, $this->output());
	}

	function setPaper80mm(){
		$paper_size = array(0,0,226,2500);
		$this->setPaper($paper_size);
	}
    
    /**
     * Load a View and convert to HTML
     *
     * @param  mixed $view
     * @param  mixed $data
     * @param  mixed $mergeData
     * @param  mixed $encoding
     * @return void
     */
    public function loadView($view, $data = array(), $mergeData = array(), $encoding = null){
			$html = View::make($view, $data, $mergeData)->render();
			return $this->loadHTML($html, $encoding);
	}
}