<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>MENÚ FASTFOOD</title>
        <!-- Fonts -->
        <link href  = "https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <link rel   = "stylesheet" href="{{ asset('css/site.css') }}"> 
        <link rel   = "stylesheet" href="{{ asset('css/chooser.css') }}"> 
        <link rel   = "stylesheet" href="{{ asset('ext/build/classic/theme-triton/resources/theme-triton-all.css') }}"> 
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/material-design-icons/3.0.1/iconfont/material-icons.min.css">

        <!-- jQuery & jQuery UI + theme (required) -->
        
        <link  href="{{ asset('keyboard/css/jquery-ui.min.css') }}" rel="stylesheet">
        
        <!-- keyboard widget css & script (required) -->
        <link href="{{ asset('keyboard/css/keyboard.css') }}" rel="stylesheet">

        <script type="text/javascript">
            var Ext = Ext || {}; // Ext namespace won't be defined yet...
            
            // This function is called by the Microloader after it has performed basic
            // device detection. The results are provided in the "tags" object. You can
            // use these tags here or even add custom tags. These can be used by platform
            // filters in your manifest or by platformConfig expressions in your app.
            //
            Ext.beforeLoad = function (tags) {
                var s = location.search,  // the query string (ex "?foo=1&bar")
                    profile;
    
                // For testing look for "?classic" or "?modern" in the URL to override
                // device detection default.
                //
                if (s.match(/\bclassic\b/)) {
                    profile = 'classic';
                }
                else if (s.match(/\bmodern\b/)) {
                    profile = 'modern';
                }
                // uncomment this if you have added native build profiles to your app.json
                /*else if (tags.webview) {
                    if (tags.ios) {
                        profile = 'ios';
                    }
                    // add other native platforms here
                }*/
                else {
                    //profile = tags.desktop ? 'classic' : 'modern';
                    profile = tags.phone ? 'modern' : 'classic';
                }
                
                Ext.manifest = profile; // this name must match a build profile name
                
                // This function is called once the manifest is available but before
                // any data is pulled from it.
                //
                //return function (manifest) {
                    // peek at / modify the manifest object
                //};
            };
            </script>
        <!-- Scripts -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.bundle.min.js"></script>
        <script src="{{ asset('assets/js/index.js') }}" defer></script>
        <script src="{{ asset('keyboard/js/jquery-ui-custom.min.js') }}" defer></script>
        <script src="{{ asset('keyboard/js/jquery.keyboard.min.js') }}" defer></script>
        <script src="{{ asset('keyboard/js/jquery.mousewheel.min.js') }}" defer></script>
        <script src="{{ asset('keyboard/languages/es.min.js') }}" defer></script>
        <!-- The line below must be kept intact for Sencha Cmd to build your application -->
        <script type="text/javascript" src="{{ asset('ext/build/ext-all.js') }}" defer></script>
        <script type="text/javascript" src="{{ asset('ext/build/classic/theme-triton/theme-triton.js') }}" defer></script>
        <script type="text/javascript" src="{{ asset('ext/build/classic/locale/locale-es.js') }}" defer></script>

        <script type="text/javascript" src="{{ asset('fastfood/app.js') }}" defer></script>
        
    </head>
    <body>

        <div id="global-spinner" class="spinner">
            <div class="blob blob-0"></div>
            <div class="blob blob-1"></div>
            <div class="blob blob-2"></div>
            <div class="blob blob-3"></div>
            <div class="blob blob-4"></div>
            <div class="blob blob-5"></div>
        </div>
    </body>
</html>
