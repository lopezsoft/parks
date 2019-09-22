/**
 * Created by LEWIS on 18/11/2015.
 */

Ext.define('Admin.core.base.BaseController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.base',

    /*
     * Propiedades personalizadas
     *
     */

    app : '', // Almacena la instancia de la aplicacion

    urlBase: '', // Almacena la URL base de la aplicacion para realizar consultas al servidor

    urlLoc: '', // Almacena la URL principal del sitio para cuando se cierra sesión

    config: {
        queryComp: null
    },

    init: function () {
        me = this;
        me.control({
            'PerfilUserView button#btnSave' : {
                click : this.onSavePerfil
            }
        });
    },

    onCreateQueryComp: function () {
        var
            me = this;
        if (!me.getQueryComp()) {
            me.setQueryComp(Ext.ComponentQuery.query('Main')[0].lookupReference('mainCardPanel'));
        }
    },

    mask: function (message) {
        var
            me = this,
            Comp = me.getQueryComp();
        if (!Comp) {
            me.onCreateQueryComp();
            Comp = me.getQueryComp();
        }
        Comp.el.mask(message ? message : 'Cargando');
    },

    unMask: function () {
        this.onCreateQueryComp();
        var
            me = this,
            Comp = me.getQueryComp();
        if (Comp) {
            Comp.el.unmask();
        }
    },

    /**
     * Función para actualizar la vista del panel Principal
     * @param {STRING} view Nombre de la vista a mostrar en el mainPanel
     */
    onUpdateMainCardPanel: function (view) {
        this.onCreateQueryComp();
        var me  = this,
            Comp = me.getQueryComp(),
            nItemsComp = Comp.items.length;
        me.mask();
        if (view) {
            Ext.onReady(function () {
                if (nItemsComp > 0) {
                    Comp.removeAll(true);
                }
                me.unMask();
                obj = Ext.create('Ext.container.Container',{
                    requires: [
                        'Ext.ux.layout.ResponsiveColumn'
                    ],
                    layout: 'responsivecolumn',
                    items: [
                        {
                            xtype: view,
                            userCls: 'big-100 small-100 shadow'
                        }
                    ]
                });
                Comp.add(obj);
                obj = null;
                me.unMask();
            });
        }else {
            me.unMask();
        }
    },

    /**
     * Cambia al menú indicado
     *
     */
    onRestoreMainCardPanel: function () {
        this.redirectTo('dashboard');
    },

	/**
	 * Funcion que se ejcuta cuando se pulsa el boton deshacer
	 * en una viasta con grid
	 * @param btn
	 * @param e
	 * @param eOpts
	 * @constructor
	 */

	onClickUndo : function(btn, e, eOpts) {
		var win 	= btn.up('window'),
			grid 	= win.down('grid'),
			store 	= grid.getStore(),
			btn1	= win.down('#btnSave') ? win.down('#btnSave') : win.down('#btnSaveAs'),
			btn2	= win.down('#btnUndo') ? win.down('#btnUndo') : win.down('#btnUndoAs');

		btn1.setDisabled(true);

		btn2.setDisabled(true);

		store.rejectChanges();
	},

    onExportExcel : function (btn) {
    /*	Ext.require(
			'Ext.exporter.text.CSV',
			'Ext.exporter.excel.Xlsx'
		);
    	Ext.onReady(function () {
    		var
				grid =  btn.up('grid');

			grid.saveDocumentAs({
				type: 'xlsx',
				title: 'Archivo excel',
				fileName: 'Archivo excel.xlsx'
			});
		});*/
    },

    onExportCSV : function (btn) {
        var
            component = btn.up('grid'),
            Exp     = Ext.ux.exporter.Exporter,
            data    = 'data:text/csv;base64,' + Exp.exportAny(component,'csv'),
            URL     = "Archivo delimitado." + Exp.getFormatterByName('csv').extension,
            link = document.createElement("a");
        link.download = URL;
        link.href = data;
        link.click();
    },

    /*
     * Almacena los valores en las propiedades
     *
     */

    setConfigVar: function () {
        me          = this;

        me.app      = Admin.getApplication();
        me.urlBase  = me.app.getUrlBase();
        me.urlLoc   = me.app.urlLocation();

    },

    /**
     * Funcion para cerrar sesión
     * @param btn
     * @param e
     * @param eOpts
     */

    onCloseSesion : function (btn, e, eOpts) {
        this.setConfigVar();

        var me		= this,
            cUrl    = Global.getUrlBase() +'api/auth/logout',
            bUrl	= me.urlLoc;

        Ext.Msg.show({
            title	: 'Cerrar sesión',
            message	: 'Desea cerrar  la sesión?',
            buttons	: Ext.Msg.YESNO,
            icon	: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'yes') {
                    AuthToken.onLogout(me);
                }
            }
        });
    },

    /**
     * Configuracion del menu del sistema
     * @param pressed
     */

    onToggleNav: function (pressed) {
        var treelist = this.lookupReference('treelist'),
            ct = this.lookupReference('treelistContainer');

      //  treelist.setExpanderFirst(!pressed);
       // treelist.setUi(pressed ? 'nav' : null);
       // treelist.setHighlightPath(pressed);
        //ct[pressed ? 'addCls' : 'removeCls']('treelist-with-nav');

        if (Ext.isIE8) {
          //  this.repaintList(treelist);
        }
    },

    onToggleNavigationSize: function () {
        var me = this,
            refs = me.getReferences(),
            navigationList = refs.navigationTreeList,
            wrapContainer = refs.mainContainerWrap,
            collapsing = !navigationList.getMicro(),
            new_width = collapsing ? 44 : 270;

        if (Ext.isIE9m || !Ext.os.is.Desktop) {
            Ext.suspendLayouts();

            refs.senchaLogo.setWidth(new_width);

            navigationList.setWidth(new_width);
            navigationList.setMicro(collapsing);

            Ext.resumeLayouts(); // do not flush the layout here...

            // No animation for IE9 or lower...
            wrapContainer.layout.animatePolicy = wrapContainer.layout.animate = null;
            wrapContainer.updateLayout();  // ... since this will flush them
        }
        else {
            if (!collapsing) {
                // If we are leaving micro mode (expanding), we do that first so that the
                // text of the items in the navlist will be revealed by the animation.
                navigationList.setMicro(false);
            }

            // Start this layout first since it does not require a layout
            refs.senchaLogo.animate({dynamic: true, to: {width: new_width}});

            // Directly adjust the width config and then run the main wrap container layout
            // as the root layout (it and its chidren). This will cause the adjusted size to
            // be flushed to the element and animate to that new size.
            navigationList.width = new_width;
            wrapContainer.updateLayout({isRoot: true});
            navigationList.el.addCls('nav-tree-animating');

            // We need to switch to micro mode on the navlist *after* the animation (this
            // allows the "sweep" to leave the item text in place until it is no longer
            // visible.
            if (collapsing) {
                navigationList.on({
                    afterlayoutanimation: function () {
                        navigationList.setMicro(true);
                        navigationList.el.removeCls('nav-tree-animating');
                    },
                    single: true
                });
            }
        }
    },

    repaintList: function(treelist, microMode) {
        treelist.getStore().getRoot().cascadeBy(function(btn) {
            var item, toolElement;

            item = treelist.getItem(btn);

            if (item && item.isTreeListItem) {
                if (microMode) {
                    toolElement = item.getToolElement();

                    if (toolElement && toolElement.isVisible(true)) {
                        toolElement.syncRepaint();
                    }
                }
                else {
                    if (item.element.isVisible(true)) {
                        item.iconElement.syncRepaint();
                        item.expanderElement.syncRepaint();
                    }
                }
            }
        });
    },

    /*
     Funcion para cerrar la ventana activa.
     */
    onCloseWin	: function (btn, e, eOpts) {
        var me = Admin.getApplication();
            me.onCloseWin(btn, e, eOpts);
    },

    /*
     Funcion para eliminar el registro seleccionado en el grid
     @retur : String, Mensaje al usuario
     */

    onGridDelete : function (btn, e, eOpts ) {
        var me	 = Admin.getApplication();
            me.onGridDelete(btn, e, eOpts);
    },

    /*
     Funcion para quitar el filtro del grid
     */
    onClearFilterGrid : function (btn, e, eOpts) {
        var me 	= Admin.getApplication();
            me.onClearFilterGrid(btn, e, eOpts);
    },

    /**
     * Funcion utilizada para guardar los cambios realizados en una tienda
     * @param record Registro con los datos de un update.
     * @param values Valores de los campos de un insert
     * @param store Donde se sincronizan los datos
     * @param data Los datos a enviar al servidor
     * @param win La ventana que se debe cerrar al hacer los cmabios satisfactoriamente
     * @param reload : Recarga la tienda despues de la inserción
     */
    onDataSave : function (record,values,store,data,win,reload) {
        var me = Admin.getApplication();
        if (store.getModifiedRecords().length > 0) {
            me.onMsgWait('Guardando...');
        }else {
           // win.close();
        }
        if (record) { //Edición
            record.set(values);
            store.sync({
                success : function(batch, o) {
                    me.showResult('Se han guardado los datos');
                    if (win) {
                        win.close();   
                    }
                },
				failure	: function (re) {
					store.rejectChanges();
				},
                callback    : function (b) {
                    me.onMsgClose();
                }
            });
        }else{ // Insertar
            store.insert(0,data);
            store.sync({
                success : function(batch, o){
                    me.showResult('Se han guardado los datos');
                    if (win) {
                        win.close();
                    }
                    if (reload == true){
                        store.reload();
                    }
                },
				failure	: function (re) {
					store.rejectChanges();
				},
                callback    : function (b) {
                    me.onMsgClose();
                }
            });
        };
    },
    /**
     * Funcion que muestra un Iframe con el informe devuelto del servidor
     * @param xUrl - La ruta del informe
     */
    getIframe : function (xUrl, xFormat) {
        var
            me  = this;
        // Ext.require('Admin.core.docs.IframeView');
        Ext.onReady(function () {
            if (xFormat == 'pdf') {
                var
                    cHtml = '<object><embed  width="100%" height="100%" src="'+xUrl+'"></object>';
                var win	= Ext.create('Admin.core.docs.IframeView',{
                    title 	: 'Vista previa del enlace',
                    html  	: cHtml,
                    width   : 700,
                    height  : 550,
                    maximized   : true
                });
                win.show();
            }else{
                me.onOpenUrl(xUrl);
            }
        });
    },
    /**
     * Funcion para ver documentos dentro de la interfaz del aplicativo
     * @param xUrl (string) : La dirección URL del documento o archivo
     * @param xFormat (string)  : Formato tipo MIME del archivo o documento
     */
    onViewDocument : function (xUrl, xFormat) {
        this.onOpenUrl(xUrl);
    },
    /**
     * Funcion para ver un enlace en un Iframe dentro del aplicativo
     * @param xUrl
     */
    onViewUrl : function (xUrl) {
        var
            cHtml = '<object><embed  width="100%" height="100%" src="'+xUrl+'"></object>';
        var win	= Ext.create('Admin.core.docs.IframeView',{
            title 	: 'Vista previa del enlace',
            html  	: cHtml,
            width   : 700,
            height  : 550
        });
        win.show();
        this.onOpenUrl(xUrl);
    },

    /**
     * Funcion para ver videos externos en nuestra aplicación
     * @param xUrl
     */
    onViewVideo : function (xUrl) {
        var
            retVal  = false,
            yt      = "https://www.youtube.com",
            rExp    = new RegExp(yt);
        rExp.exec(yt);
        retVal  = rExp.test(xUrl);
        if(retVal){ // Video en youtbe
            var
                newUrl= xUrl.replace('watch?v=','embed/');
                cHtml ='<iframe width="100%" height="100%" src="'+newUrl+'?&autoplay=1" cc_load_policy=1 frameborder="0" allowfullscreen></iframe>';
        }else{
            var
                cHtml  = '<object><embed  width="100%" height="100%" src="'+xUrl+'"></object>';
        }
        var win	= Ext.create('Admin.core.docs.IframeView',{
            html    : cHtml
        });
        win.show();
    },

    /**
     * Funcion para setear los datos que se enviar al servidor para lamar el reporte.
     * @param btn
     */
    onSetReport: function(btn){
        var url     = '',
            param   = {};

        this.onGenReport(btn,url,param);
    },

    /**
     * Funcion que gerena los reportes
     * @param btn
     * @param url - Url de donde se llamará el reporte
     * @param param - Parametros adiciones enviados para llamar el reporte
     */

    onGenReport: function (btn, url, param) {
        var me  	= this,
            cUrl	= Global.getUrlBase() + url,
            vMask;
        vMask = btn.up('window');
        if (Ext.isEmpty(vMask)){
            vMask   = btn.up('grid');
        }
        switch(btn.itemId){
            case 'btnHtml':
                xFormat = 'html';
                break;
            case 'btnRtf':
                xFormat = 'rtf';
                break;
            case 'btnXls':
                xFormat = 'xls';
                break;
            case 'btnDoc':
                xFormat = 'doc';
                break;
            case 'btnCsv':
                xFormat = 'csv';
                break;
            case 'btnPptx':
                xFormat = 'pptx';
                break;
            case 'btnPrint':
                xFormat = 'print';
                break;
            default	:
                xFormat = 'pdf';
                break;
        }
        xParam  = param;
        Object.defineProperty(xParam,'pFormat',{
                value : xFormat,
                writable: true,
                enumerable: true,
                configurable: true
            });
        if(!Ext.isEmpty(url)) {
            if (!Ext.isEmpty(vMask)) {
               // vMask.el.mask('Cargando reporte...')
            }
            Ext.Ajax.request({
                timeout : 120000000,
                url: cUrl,
                params: xParam,
                success: function (response) {
                    result = Ext.decode(response.responseText);
                    me.getIframe(result.path_report, xFormat);
                },
                failure: function (response) {
                    me.app.onError('No se pueden cargar los datos');
                },
                callback : function (response) {
                    if (!Ext.isEmpty(vMask)) {
                        vMask.el.unmask();
                    }
                }
            });
        }
    },

    onSavePerfil    : function (btn) {
        this.setConfigVar();
        var 
            form    = btn.up('form'),
            record  = form.getRecord(),
            values  = form.getValues(),
            data    = [],
            store   = Ext.getStore('UserStore'),
            me      = this;
        if (!Ext.isEmpty(values.pasw) && !Ext.isEmpty(values.pasw2)){
            var
                p1      = Global.sha1.hash(values.pasw),
                p2      = Global.sha1.hash(values.pasw2);
            if (p1 === p2) {
                r   = store.getAt(0);
                values.pasw = p1;
                values.pasw2 = p2;
                r.set('password', p1);
                me.onDataSave(record, values, store, data, null);
            }else{
                Ext.Msg.alert('Las contraseñas no coinciden');
            }
        }else{
            me.onDataSave(record, values, store, values, null);
        }
    },
    /**
     * Permite abrir un enlace en una nueva ventana
     * @param cUrl
     */
    onOpenUrl : function (cUrl) {
        var app = Admin.getApplication();
        app.onOpenUrl(cUrl);
    }

    

});
