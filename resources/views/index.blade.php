<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Menu del sistema</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootswatch/4.3.1/cerulean/bootstrap.min.css">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/material-design-icons/3.0.1/iconfont/material-icons.min.css">
        <link rel="stylesheet" href="/fonts/fontawesome5-overrides.min.css?h=03ab36d1dde930b7d44a712f19075641">
        <link rel="stylesheet" href="/css/styles.min.css?h=d0f5fc10e96bdf27e1b93e68feaf68a6">
    </head>
    <body>
         <!-- Start: Team Boxed -->
        <div class="team-boxed">
            <div class="container">
                <!-- Start: Intro -->
                <div class="intro">
                    <h2 class="text-center">MENÚ DEL SISTEMA</h2>
                    <p class="text-center">Hola, bienvendo, en la parte inferior puedes elegir a que parte de la aplicación quieres ingresar y usar</p>
                </div>
                <!-- End: Intro -->
                <!-- Start: People -->
                <div class="row people">
                    <div class="col-md-6 col-lg-6 item">
                        <div class="box"><i class="fa fa-map-marker" style="height: 128px;width: 128px;font-size: 128px;"></i>                            
                            <h3 class="name"><a href="{{ url('/parks') }}">Juegos</a></h3>
                        </div>
                    </div>
                    {{-- <div class="col-md-6 col-lg-6 item">
                        <div class="box"><i class="fas fa-diagnoses" style="height: 128px;width: 128px;font-size: 128px;"></i>
                            <h3 class="name"><a href="{{ url('/fastfood/menu') }}">Comida rapida</a></h3>
                        </div>
                    </div> --}}
                    <div class="col-md-6 col-lg-6 item">
                        <div class="box">
                            <i class="material-icons" style="height: 128px;width: 128px;font-size: 128px;">dashboard</i>
                            <h3 class="name"><a href="{{ url('/dashboard/login') }}">Dashboard</a></h3>
                        </div>
                    </div>
                </div>
                <!-- End: People -->
            </div>
        </div>
        <!-- End: Team Boxed -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.bundle.min.js"></script>
    </body>
</html>
