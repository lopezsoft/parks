<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
        <title>MENÚ DE REGISTRO</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootswatch/4.3.1/cerulean/bootstrap.min.css">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/material-design-icons/3.0.1/iconfont/material-icons.min.css">
        <link rel="stylesheet" href="/assets/fonts/fontawesome5-overrides.min.css?h=03ab36d1dde930b7d44a712f19075641">
        <link rel="stylesheet" href="/assets/css/styles.min.css?h=28f8fc1429469e8e064612799b42de09">
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
                    <div class="col-md-6 col-lg-4 item" style="margin: auto;">
                        <div class="box"><i class="fa fa-users" style="font-size: 128px;"></i>
                            <h3 class="name" style="margin: 0px;width: 100%;padding: 5px;">Registrarse</h3>
                            <form>
                                <div class="form-group"><input class="form-control form-control-lg" type="text" id="name" name="names" placeholder="Nombres" autocomplete="on" required=""></div>
                                <div class="form-group"><input class="form-control form-control-lg" type="text" id="lastname" name="lastname" placeholder="Apellidos" autocomplete="on" required=""></div>
                                <div class="form-group"><label class="text-left" style="width: 100%;">Fecha de nacimiento</label><input class="form-control form-control-lg" type="date" name="birthdate" required=""></div>
                                <div class="form-group"><input class="form-control form-control-lg" type="text" id="acEmail" autocomplete="on" autofocus="" required="" inputmode="email" placeholder="Correo electrónico" name="reEmail"></div>
                                <div class="form-group"><input class="form-control form-control-lg" type="password" id="acPass" required="" name="rePass" placeholder="Contraseña"></div>
                                <div class="form-group"><input class="form-control form-control-lg" type="password" id="acPass" required="" name="reRePass" placeholder="Repetir Contraseña"></div>
                                <div class="form-group"><button class="btn btn-primary btn-lg" type="submit" style="width: 100%;">Registrarse</button></div>
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
    </body>       
</html>
