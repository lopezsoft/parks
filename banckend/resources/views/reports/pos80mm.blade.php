<!DOCTYPE html>
<html lang="es">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<style>
			body{
				font-family: sans-serif;
			}
			@page {
				margin: 10px 10px;
			}
			header {
				left: 0;
				top: -10px;
				right: 0;
				height: auto;
				background-color: #fff;
				text-align: center;
			}
			header h1{
				margin: 10px 0;
			}
			header h2{
				margin: 0 0 10px 0;
			}

			header img {
				max-height: 128px;
			}

			#content {
				ackground-color: #fff;
			}

			#content table {
				font-size: 12px;
			}

			#content #totals-lines {
				font-size: 12px;
				font-weight: bold;
				text-align: right;
                alignment: right;
				padding: 4px;
			}

			#content #totals-lines #amount {
				width: 30px;
			}


			#content #total {
				font-size: 12px;
				font-weight: bold;
				padding: 4px;
			}

			#content #total #left {
				font-size: 7px;
				width: 148px;
				text-align: left;
			}

			#content #total #right {
				width: 124px;
				text-align: right;
			}
		</style>
        <title></title>
    </head>
	<body>
		<header>
			<table>
				@if (isset($logo))
				<tr>
					<th>
						<img src="{{ $logo }}" alt="">
					</th>
				</tr>
				@endif
				@if (isset($headerLine1))
				<tr>
					<th>
						<div>
							{!! $headerLine1 !!}
						</div>
					</th>
				</tr>
				@endif
				@if (isset($headerLine2))
				<tr>
					<th>
						{!! $headerLine2 !!}
					</th>
				</tr>
				@endif
			</table>
		</header>
		<div id="content">
			<hr>
			<table>
				<tr>
                    <th>Fecha</th>
                    <td>{{ date('d/m/Y',strtotime($event->detail->paymentDate)) }}</td>
                    <th>Hora</th>
                    <td>{{ date('h:i:s A',strtotime($event->detail->timestamp)) }}</td>
				</tr>
			</table>
			<table>
				<tr>
					<th>
						{{ "FOLIO Nº." }}
					</th>
                    <td>
						{{ "{$event->folio}" }}
					</td>
				</tr>
			</table>
            <table>
				<tr>
					<th>
						{{ "CLIENTE: " }}
					</th>
                    <td>
						{{ "{$event->client->full_name}" }}
					</td>
				</tr>
			</table>
            <table>
				<tr>
					<th>
						{{ "CAJERO: " }}
					</th>
                    <td>
						{{ "{$event->user->full_name}" }}
					</td>
				</tr>
			</table>
			<hr>
			<table>
				<tr>
					<td  colspan="3">
						{{ "EVENTO PARA EL "}} {{ date('d/m/Y h:i:s A',strtotime($event->start)) }}{{ ", HASTA EL" }}
                        {{ date('d/m/Y h:i:s A',strtotime($event->end)) }}
					</td>
				</tr>
                <tr>
					<td  colspan="3">
						{{ $line->product->product_name }}
					</td>
				</tr>
                <tr>
					<td  colspan="3">
						{{ $line->product->detail }}
					</td>
				</tr>
                <tr>
                    <th>CANT</th>
                    <th>PRECIO</th>
                    <th>TOTAL</th>
                </tr>
				<tr id="totals-lines">
					<td id="amount">
						{{ $line->amount }}
					</td>
					<td>
						{{$event->Symbol}} {{ $line->price }}
					</td>
					<td>
                        {{$event->Symbol}} {{ $line->total}}
					</td>
				</tr>
			</table>
			<hr>
			<table id="total">
				<tr>
					<th id="left">
						SUBTOTAL
					</th>
					<th id="right">{{ "{$event->Symbol} ".number_format($event->detail->total,2,".",",") }}</th>
				</tr>
				<tr>
					<th id="left">
						DESCUENTO
					</th>
					<th id="right">{{ "{$event->Symbol} ".number_format($event->detail->discount,2,".",",") }}</th>
				</tr>
				<tr>
					<th id="left">
						TOTAL
					</th>
					<th id="right">{{ "{$event->Symbol} ".number_format($event->detail->total,2,".",",") }}</th>
				</tr>
				<tr>
					<th id="left">
						EFECTIVO
					</th>
					<th id="right">{{ "{$event->Symbol} ".number_format($event->detail->total - $event->detail->balance,2,".",",") }}</th>
				</tr>
				<tr>
					<th id="left">
						SALDO PENDIENTE
					</th>
					<th id="right">{{ "{$event->Symbol} ".number_format($event->detail->balance,2,".",",") }}</th>
				</tr>
			</table>
			<hr>
			<table>
				<tr>
					<th>
						{!! $footerline !!}
					</th>
				</tr>
			</table>
		</div>
	</body>
</html>
