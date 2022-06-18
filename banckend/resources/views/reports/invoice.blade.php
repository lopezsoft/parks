<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		{{-- <link rel="stylesheet" type="text/css" href="{{ asset('assets/reports/css/invoice.css') }} "> --}}
		<style>
			body{
				font-family: sans-serif;
			}

			@page {
				margin: 60px 40px;
			}
			header {
				left: 0px;
				top: -60px;
				right: 0px;
				height: auto;
				background-color: #fff;
			}
			header h1{
				margin: 10px 0;
			}
			header h2{
				margin: 0 0 10px 0;
			}

			header img {
				max-width: 128px;
			}

			header table {
				width: 100%;
				border: 0px none;
				background-color: white;
			}

			header table th {
				border: 0px none;
			}


			#content {
				background-color: #fff;
			}

			#content table {
				font-size: 12px;
			}

			#content table th {
				border: 0px none;
			}

			#content #header-lines {
				font-size: 7;
				font-weight: bold;
				text-align: right;
				padding: 2px;
			}
			#content #detail-lines {
				font-size: 8;
				text-align: right;
				padding: 2px;
			}
			#content #detail-lines #unit {
				width: 18px;
			}
			#content #detail-lines #detail {
				width: 362px;
				text-align: left;
			}
			#content #detail-lines #amount {
				width: 30px;
			}
			#content #detail-lines #code {
				width: 40px;
			}
			#content #detail-lines #totals {
				width: 100px;
			}

			#content #total {
				font-size: 8;
				font-weight: normal;
				padding: 2px;
			}

			#content #total #rowspan {
				width: 380px;
				text-align: left;
			}

			#content #total #left {
				width: 183px;
				text-align: left;
			}

			#content #total #right {
				width: 128px;
				text-align: right;
			}
		</style>
	</head>
	<body>
		<header>
			<table>
                <tbody>
                    <tr>
                        @if (isset($logo))
                            @if (isset($headerLine2))
                                @if (Str::length($headerLine2) > 5)
                                    <th rowspan="2">
                                        <img src="{{ $logo }}">
                                    </th>
                                @else
                                    <th rowspan="1">
                                        <img src="{{ $logo }}">
                                    </th>
                                @endif
                            @else
                                <th rowspan="1">
                                    <img src="{{ $logo }}">
                                </th>
                            @endif
                        @endif
                        @if (isset($headerLine1))
                        <td>
                            <div>
                                {!! $headerLine1 !!}
                            </div>
                        </td>
                        @endif
                    </tr>
                    @if (isset($headerLine2))
                        @if (Str::length($headerLine2) > 5)
                        <tr>
                            <td>
                                {!! $headerLine2 !!}
                            </td>
                        </tr>
                        @endif
                    @endif
                </tbody>
			</table>
		</header>
		<div id="content">
			<hr>
			<table>
				<tr>
					<td>
						{{ "CLIENTE: {$saleMaster->company_name} R.T.N: {$saleMaster->dni}" }}
					</td>
				</tr>
				<tr>
					<td>
						{{ "DIRECCIÓN: {$saleMaster->address}" }}
					</td>
				</tr>
			</table>
			<hr>
			<table>
				<tr>
					<th>Forma de pago</th>
					<th>Medio de pago</th>
					<th>Fecha</th>
					<th>Hora</th>
					<th>Plazo</th>
					<th>Fecha de vencimiento</th>
					<th>{{ "{$saleMaster->invoice_name} Nº." }}</th>
				</tr>
				<tr>
					<td>{{ $saleMaster->payment_method }}</td>
					<td>{{ $saleMaster->means_name }}</td>
					<td>{{ date('d/m/Y',strtotime($saleMaster->invoice_date)) }}</td>
					<td>{{ date('h:i:s A',strtotime($saleMaster->invoice_time)) }}</td>
					<td>{{ $saleMaster->time_limit }}</td>
					<td>{{ date('d/m/Y',strtotime($saleMaster->expiration_date)) }}</td>
					<td> {{ "{$saleMaster->prefix}{$saleMaster->invoice_nro}" }}</td>
				</tr>
			</table>
			<hr>
			{{-- Detalle  --}}
			<table>
				<tr id="header-lines">
					{{-- <th>CÓDIGO</th> --}}
					<th>CANT.</th>
					<th>U/M</th>
					<th>DESCRIPCIÓN</th>
					<th>PRECIO UNITARIO</th>
					<th>DESCUENTO</th>
					<th>TOTAL</th>
				</tr>
				@foreach ($details as $line)
				<tr id="detail-lines">
					{{-- <td id="code">
						{{ $line->sku ?? $line->internal_code }}
					</td> --}}
					<td id="amount">
						{{ $line->amount }}
					</td>
					<td id="unit">
						{{ $line->abbre_unit }}
					</td>
					<td id="detail">
						{{ $line->detail }}
					</td>
					<td id="totals">
						{{ $line->unit_price}}
					</td>
					<td id="totals">
						{{ $line->discount }}
					</td>
					<td id="totals">
						{{ $line->total}}
					</td>
				</tr>
				@endforeach
			</table>
			<hr>
			{{-- Footer --}}
			@if (strlen($saleMaster->notes) > 0)
			<table>
				<tr>
					<td>
						Observaciones: {{ $saleMaster->notes }}
					</td>
				</tr>
			</table>
			@endif
			<table id="total">
				<tr>
					<th rowspan="{{$rowspan}}">
						{{ $letters }}
					</th>
					<th id="left">
						SUBTOTAL
					</th>
					<th id="right">{{ "{$saleMaster->Symbol} ".number_format($saleMaster->subtotal,2,".",",") }}</th>
				</tr>
				@foreach ($taxAll as $tax)
				<tr>
					<th id="left">
						{{ $tax->description_in_sales }}
					</th>
					<th id="right">{{ "{$saleMaster->Symbol} ".number_format($tax->total,2,".",",") }}</th>
				</tr>
				@endforeach
				<tr>
					<th id="left">
						DESCUENTOS Y REBAJAS
					</th>
					<th id="right">{{ "{$saleMaster->Symbol} ".number_format($saleMaster->discount,2,".",",") }}</th>
				</tr>
				<tr>
					<th rowspan="{{$rowspan}}" id="rowspan">
						{{$saleMaster->username}}
					</th>
				</tr>
				@foreach ($taxAll as $tax)
					@if ($tax->decimal_rate > 1)
						<tr>
							<th id="left">
								{{ $tax->name_taxe }} {{ number_format($tax->rate_value,0,".",",") }}%
							</th>
							<th id="right">{{ "{$saleMaster->Symbol} ".number_format($tax->tax_value,2,".",",") }}</th>
						</tr>
					@endif
				@endforeach
				<tr>
					<th id="left">
						TOTAL
					</th>
					<th id="right">{{ "{$saleMaster->Symbol} ".number_format($saleMaster->total,2,".",",") }}</th>
				</tr>
			</table>
			<hr>
			<table>
				<tr>
					<td>
						{!! $saleMaster->footline1 !!}
					</td>
				</tr>
				<tr>
					<td>
						{!! $saleMaster->footline2 !!}
					</td>
				</tr>
				<tr>
					<td>
						{!! $saleMaster->footline3 !!}
					</td>
				</tr>
				<tr>
					<td>
						{!! $saleMaster->footline4 !!}
					</td>
				</tr>
			</table>
		</div>
	</body>
</html>
