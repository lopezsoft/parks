Ext.define('Admin.Application', {
    extend: 'Ext.app.Application',
    
    name: 'Admin',
    requires : [
        'Admin.security.TokenStorage',
		'Admin.sockets.data.proxy.SocketIo',
		'Admin.sockets.Socket',
        'Ext.util.TaskRunner',
		'Admin.view.config.Configs'
    ],

    stores: [
        'NavigationTree'
    ],

    defaultToken : 'dashboard',

    // The name of the initial view to create. This class will gain a "viewport" plugin
    // if it does not extend Ext.Viewport.
    //
    mainView: 'Admin.view.main.Main',

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    },
    

    /*
     *Funcion para setear las URLs del PROXY para las consultas al SERVIDOR
     *
     */

    setUrlProxy : function (xStore){
        var me = this,
            baseUrlSys = me.getUrlBase(),
            datos	= null,
            proxy 	= null,
            pUrl	= null,
            pApi	= null;

        datos 	= Ext.getStore(xStore);
        proxy 	= datos.getProxy();
        pUrl	= proxy.url;
        pApi	= proxy.getApi();

        if (pUrl == ''){
            cCreate		= baseUrlSys+pApi.create;
            cDestroy	= baseUrlSys+pApi.destroy;
            cRead		= baseUrlSys+pApi.read;
            cUpdate		= baseUrlSys+pApi.update;

            api = {
                create  : cCreate,
                read    : cRead,
                update  : cUpdate,
                destroy : cDestroy
            };

            proxy.setApi(api);

        }else{
            proxy.setUrl(baseUrlSys+pUrl);
        }
    },

    /*
     * URL Base de la aplicacion
     *
     */
    getUrlBase : function () {
        return Global.getUrlBase();
    },

    urlLocation : function () {

        return Global.getUrlLocation();
    },

    /**
     * Funcion para configurar la URL de los STORES
     * @param xStore  Nombre del Store
     */

    setUrlProxy : function (xStore){
        var me          = this,
            baseUrlSys  = me.getUrlBase(),
            datos	    = null,
            proxy 	    = null,
            pUrl	    = null,
            pApi	    = null;

        datos 	= Ext.getStore(xStore);

        proxy 	= datos.getProxy();
        pUrl	= proxy.url;
        pApi	= proxy.getApi();

        if (pUrl == ''){
            cCreate		= baseUrlSys+pApi.create;
            cDestroy	= baseUrlSys+pApi.destroy;
            cRead		= baseUrlSys+pApi.read;
            cUpdate		= baseUrlSys+pApi.update;

            api = {
                create  : cCreate,
                read    : cRead,
                update  : cUpdate,
                destroy : cDestroy
            };

            proxy.setApi(api);

        }else{
            proxy.setUrl(baseUrlSys+pUrl);
        }
    },

    /*
     Funcion para crear ventanas
     @cTitle : String, Titulo de la ventana
     @cWin   : String, nombre de la ventana a crear
     @return : Object, valor de retorno,
     */
    getWindow : function (cTitle, cWin) {

        return Ext.create(cWin);
    },

    /*
     Funcion para crear los Stores
     @xStore : STRINS, Nombre del Store
     */
    onStore : function (xStore) {
        var cStore = '';

        cStore 	= 'Admin.store.'+xStore;

        new Ext.create(cStore);
    },

    /*
     Funcion para crear los Controladores
     @xController : STRINS, Nombre del Controlador
     */
    onController : function (xController) {
        var cController, xc = '';

        cController 	= 'Admin.'+xController;

       xc = Admin.getApplication();
       xc.createController(cController);
    },

    /*
     funcion que muestra mensaje de espera
     */
    onMsgWait : function(ms) {
        if (Ext.isEmpty(ms)){
            Ext.Msg.wait(AppLang.getSMsgLoading());
        }else {
            Ext.Msg.wait(ms);
        };
    },

    onMsgClose : function() {
        Ext.Msg.hide();
    },
    
    /*
     Funcion para setear los parametrps de un Data Store y recargarlo
     @cStore : String, Nombre del Store
     @extParam : array
     @reload : Bolean, indica si se recarga el Store después de setearlo (Opcional),
     */
    setParamStore : function (cStore, extParam, reload) {
        var datos	= Ext.getStore(cStore);
        if (datos){
			proxy 	= datos.getProxy();
			proxy.setExtraParams(extParam);
			if (reload == true) {
				datos.reload();
			}
		}
    },

    /*
     Funcion para extraer los parametrps de un Data Store
     @cStore : String, Nombre del Store
     RETURNS : Devuelve el objeto con los paramentros
     */

    getParamStore : function (cStore) {
        if(Ext.isEmpty(cStore)){
            this.onAler('El parametro del STORE está vacío : getParamStore');
            return false;
        }else{
            var datos	= Ext.getStore(cStore);
            proxy 	= datos.getProxy();

            return proxy.getExtraParams();
        };
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

    /*
     Funcion para eliminar el registro seleccionado en el grid
     @retur : String, Mensaje al usuario
     */

    onGridDelete : function (btn, e, eOpts ) {
        var cbtn = btn,
            me	 = this;

        Ext.Msg.show({
            title	: 'Elimiar datos',
            message	: 'Desea eliminar el registro?',
            buttons	: Ext.Msg.YESNO,
            icon	: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'yes') {
                    var grid 	= cbtn.up('grid'),
                        records = [],
                        store = null;
                    if (!grid) { 
                        grid = cbtn.up('window').down('grid');
                    }
                    if (!grid) {
                        grid = cbtn.up('form').down('grid');
                    }
                    if (grid) {
                        store = grid.getStore();
                        records = grid.getSelectionModel().getSelection();
                        if (records.length > 0) {
                            grid.mask('Borrando datos');
                            store.remove(records);
                            store.sync({
                                success: function (b, o) {
                                    grid.unmask();
                                    me.showResult('Se ha realizado la acción de borrado');
                                    store.reload();
                                },
                                failure: function (b, o) {
                                    grid.unmask();
                                    me.showResult('No se ha realizado la acción de borrado');
                                    store.reload();
                                }
                            });
                        } else { 
                            me.showResult('Debe seleccionar un registro a borrar.');
                        }
                    } else { 
                        me.showResult('Error desconocido. Comuniquese con el soporte técnico.');
                    }

                }
            }
        });

    },

	onRecordDelete : function (records, cStore) {
		var me	 = this;
		if(Ext.isEmpty(cStore)){
			me.onAler('El parametro del STORE está vacío : store');
			return false;
		}
		Ext.Msg.show({
			title	: 'Elimiar datos',
			message	: 'Desea eliminar el registro?',
			buttons	: Ext.Msg.YESNO,
			icon	: Ext.Msg.QUESTION,
            alwaysOnTop : true,
			fn: function(btn) {
				if (btn === 'yes') {
					me.onMsgWait();
					var
						store 	= Ext.getStore(cStore);
					store.remove(records);
					store.sync({
						success : function (b, o) {
							Ext.Msg.hide();
							me.showResult('Se ha realizado la acción de borrado');
							store.reload();
						},
						failure : function (b, o) {
							Ext.Msg.hide();
							me.showResult('No se ha realizado la acción de borrado');
							store.reload();
						}
					});
				}
			}
		});

	},



    /*
     Funcion para quitar el filtro del grid
     */
    onClearFilterGrid : function (btn, e, eOpts) {
        var 	win 	= btn.up('window');

        if (win == null) {
            grid	= btn.up('grid');
        }else{
            grid	= win.down('grid');
        }

        grid.filters.clearFilters();
    },

    /*
     Funcion para cerrar la ventana activa.
     */
    onCloseWin	: function (btn, e, eOpts) {
        var win 	= btn.up('window'),
            form    = null;

        if (!Ext.isEmpty(win)) {
            form	= win.down('form');
        }

        if (!form == null){
            form.getForm().reset();
        }

        if (!Ext.isEmpty(win)) {
            win.close();
        }
    },

    onError: function (msgError) {
        var Msg = Ext.create('Ext.window.MessageBox', {
            alwaysOnTop: true,
            modal: true,
            closeAction: 'destroy'
        }).show({
            title: 'ASAIE ERROR',
            msg: "Mensaje de error : " + msgError,
            icon: Ext.MessageBox.ERROR,
            buttons: Ext.Msg.OK
        });

    },

    onAler : function (msgAler) {
        Ext.MessageBox.show({
            title   : 'ASAIE ALERTA',
            msg     : msgAler,
            alwaysOnTop : true,
            icon    : Ext.MessageBox.INFO,
            buttons : Ext.Msg.OK
        });
    },

    /**
     * Permite abrir un enlace en una nueva ventana
     * @param cUrl String
     */
    onOpenUrl : function (cUrl, target) {
        var 
            Url    = encodeURI(cUrl);
        window.open(Url, target);
    }
});
