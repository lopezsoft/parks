
Ext.Loader.setConfig({                
    enabled : true,
    paths   : {
        'Admin'             : 'app',
        'Admin.view'        : 'app/view',
        'Admin.core'        : 'app/core',
        'Admin.model'       : 'app/model',
        'Admin.store'       : 'app/store',
    } 
});

Ext.application({
    extend  : 'Ext.app.Application',
    name	: 'Admin',
    requires: [
        'Admin.security.TokenStorage',
        'Admin.core.grid.CustomGrid',
        'Admin.view.config.Configs',
        'Admin.view.Main',
        'Admin.core.button.CustomButton',
        'Admin.core.toolbar.CustomToolbar'
    ],

    stores: [
        'SalesServicesStore',
        'SalesFootWearStore'
    ],
    init : function () {
        var me 		= this,
            win		= null;
    },

    mainView: 'Admin.view.Main',

    launch : function name(params) {
        var loadingMask = Ext.get('global-spinner'),
            token       = AuthToken.recoverParams();
        // Ocultando la máscara
        if (loadingMask) {
            loadingMask.setOpacity(1);
            loadingMask.fadeOut({
                remove: true,
                duration: 1000,
                opacity: 0
            });
        };
        this.onCreateGrid(token);
    },

    onCreateGrid : function(token){
        if (!token) {
            window.location.href    = "/parks"
        }
    },

    /*
        Funcion para crear ventanas
        @cTitle : String, Titulo de la ventana
        @cWin   : String, nombre de la ventana a crear
        @return : Object, valor de retorno,
    */
    getWindow : function (cTitle, cWin) {
        var win 		= new Ext.create(cWin);

        if (cTitle == null) {

        }else{
            win.title	= cTitle;
        }

        return win;
    },

    /*
        Funcion para crear los Stores
        @xStore : STRINS, Nombre del Store
    */
    onStore : function (xStore) {
        var cStore = '';

        cStore 	= 'ADA.store.'+xStore;

        new Ext.create(cStore);
    },

    /*
       Funcion para crear los Controladores
       @xController : STRINS, Nombre del Controlador
   */
    onController : function (xController) {
        var cController = '';

        cController 	= 'ADA.controller.'+xController;

        ADA.getApplication().createController(cController);
    },

    /*
        funcion que muestra mensaje de espera
    */
    onMsgWait : function() {
        Ext.Msg.wait('Cargando...');
    },
    onAler : function (msgAler) {
        Ext.MessageBox.show({
            title   : 'S.M.E ALERTA',
            msg     : msgAler,
            alwaysOnTop : true,
            icon    : Ext.MessageBox.INFO,
            buttons : Ext.Msg.OK
        });
    },

    /*
     Funcion para mostrar un mesaje al usuario cuando realiza una operacion
     @text : String, Mensaje a mostrar al usuario
     */

    showResult : function(text) {
        Ext.toast({
            html: text,
            closable: false,
            align	: 'tr',
            slideInDuration: 400,
            minWidth: 200,
            //border 	: false,
            frame	: true
        });
    },

    /**
     * Funcion que muestra un Iframe con el informe devuelto del servidor
     * @param xUrl - La ruta del informe
     */
    getIframe : function (xUrl, xFormat) {
        var
            me  = this;
        Ext.require('Admin.core.docs.IframeView');
        Ext.onReady(function () {
            if (xFormat == 'pdf') {
                var
                    cHtml = '<object><embed width="100%" height="100%" src="'+xUrl+'"></object>';
                var win	= Ext.create('Admin.core.docs.IframeView',{
                    title 	: 'Vista previa del enlace',
                    html  	: cHtml,
                    width   : 700,
                    height  : 550,
                    maximized   : true
                });
                document.addEventListener("afterprint", function(){
                    console.log('onafterprint');
                });
                win.show();
            }else{
                me.onOpenUrl(xUrl);
            }
        });
    },

    onClose : function (btn, e, eOpts) {
        var
            me  = btn.up('window');
        Ext.Msg.show({
            title	: 'Cerrar sesión',
            message	: 'Desea cerrar  la sesión?',
            buttons	: Ext.Msg.YESNO,
            icon	: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'yes') {
                    if(me){
                        me.fireEvent('cancel',me);
                        me.close();
                    }
                    AuthToken.clear();
                }
            }
        });
    }

});