<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>MENÚ DE REGISTRO</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootswatch/4.3.1/cerulean/bootstrap.min.css">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/material-design-icons/3.0.1/iconfont/material-icons.min.css">
         <!-- Styles -->
        <link href="{{ asset('assets/css/styles.min.css?h=28f8fc1429469e8e064612799b42de09') }}" rel="stylesheet">
        <link href="{{ asset('assets/fonts/fontawesome5-overrides.min.css?h=03ab36d1dde930b7d44a712f19075641') }}" rel="stylesheet">
        <link href="{{ asset('assets/alertifyjs/css/alertify.min.css') }}" rel="stylesheet">
        <link href="{{ asset('assets/alertifyjs/css/themes/bootstrap.min.css') }}" rel="stylesheet">

         <!-- jQuery & jQuery UI + theme (required) -->
         
         <link  href="{{ asset('keyboard/css/jquery-ui.min.css') }}" rel="stylesheet">
         
         <!-- keyboard widget css & script (required) -->
        <link href="{{ asset('keyboard/css/keyboard.css') }}" rel="stylesheet">
        
    </head>    
    <body style="background-image: url(&quot;/assets/img/register.jpg?h=f080acb5cbe7549e88726c3454ee36cd&quot;);">
        <!-- Start: Team Boxed -->
        <div class="team-boxed">
            <div class="container">
                <!-- Start: Intro -->
                <div class="intro">
                    <h2 class="text-center">MENÚ DE REGISTRO</h2>
                    <p class="text-center">En la parte inferior puede registrar sus datos personales para tener acceso a nuestra aplicación</p>
                </div>
                <!-- End: Intro -->
                <!-- Start: People -->
                <div class="row people">
                    <div class="col-sm-12 col-xs-12 col-md-12 col-lg-6 item" style="margin: auto;">
                            <div class="box"><i class="fa fa-users" style="font-size: 128px;"></i>
                            <h3 class="name" style="margin: 0px;width: 100%;padding: 5px;">Registrarse</h3>
                            <form  class="register"  method="POST" action="{{ url('/api/auth/register') }}">
                                @csrf
                                <div class="form-group">
                                    <input class="form-control form-control-lg" type="text" id="first_name" name="first_name" placeholder="Nombres" autocomplete="on" required="" autofocus>
                                </div>
                                <div class="form-group">
                                    <input class="form-control form-control-lg" type="text" id="last_name" name="last_name" placeholder="Apellidos" autocomplete="on" required="">
                                </div>
                                <div class="form-group">
                                    <input class="form-control form-control-lg" type="text" id="dni" name="dni" placeholder="Documento de identidad" autocomplete="on" required="">
                                </div>
                                <div class="form-group">
                                    <label class="text-left" style="width: 100%;">Fecha de nacimiento</label>
                                    <input class="form-control form-control-lg" type="date" id="birthday" name="birthday" required="">
                                </div>
                                <div class="form-group">
                                    <input class="form-control form-control-lg" type="text" id="email" autocomplete="on" required="" inputmode="email" placeholder="Correo electrónico" name="email">
                                </div>
                                <div class="form-group">
                                    <input class="form-control form-control-lg" type="password" id="password" required="" name="password" placeholder="Contraseña">
                                </div>
                                <div class="form-group">
                                    <input class="form-control form-control-lg" type="password" id="password_confirmation" required="" name="password_confirmation" placeholder="Repetir Contraseña">
                                </div>
                                <div class="form-group">
                                    <button class="btn btn-primary btn-lg" type="submit" style="width: 100%;">Registrarse</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <!-- End: People -->
            </div>
        </div>
        <!-- End: Team Boxed -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.bundle.min.js"></script>
        <script src="{{ asset('assets/alertifyjs/alertify.min.js') }}" defer></script>
        <script src="{{ asset('assets/js/index.js') }}" defer></script>
        <script src="{{ asset('keyboard/js/jquery-ui-custom.min.js') }}" defer></script>
        <script src="{{ asset('keyboard/js/jquery.keyboard.min.js') }}" defer></script>
        <script src="{{ asset('keyboard/js/jquery.mousewheel.min.js') }}" defer></script>
        <script src="{{ asset('keyboard/languages/es.min.js') }}" defer></script>
    </body>       
</html>
