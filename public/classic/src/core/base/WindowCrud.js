Ext.define('Admin.core.base.WindowCrud' ,{
    extend: 'Ext.window.Window',
    requires: [
		'Ext.grid.filters.Filters',
		'Admin.core.field.CustomText'
    ],
    ui      :'win-blue',
    modal	: true,
	width	: 700,
	alias	: 'widget.windowCrud',
    border	: false,
	minHeight		: 150,
	height			: '100%',
    maximizable 	: true,
    iconCls			: 'x-fa fa-cloud',
    animCollapse	: false,
    constrainHeader	: true,
    closeAction 	: 'destroy',
    layout			: 'fit',
    title			: 'Form base',
    defaultFocus    : 'customText',
    autoShow		: false,
	config			: {
		winObject	: undefined,
		app			: undefined,
		store		: undefined,
		reloadStore	: true
	},
	initComponent	: function(){
    	this.callParent(arguments);
    	this.on({
			scope	: this
		})
	},
	constructor : function (config) {
    	this.callParent(arguments);
		this.app	= Admin.getApplication();
		this.initConfig(this.config, config);
	},
	/**Destructor*/
	onDestroy : function(){
		if (this.getWinObject()){
			this.winObject.destroy();
		}
		this.callParent(arguments);
	},

	/**Constructor de ventanas*/
	buildWindow	: function(){

	},

	/**Mostrador de ventanas*/
	showWindow	: function(obj){

	},

	/**
	 * Funcion utilizada para guardar los cambios realizados en una tienda
	 * @param storeName Nombre de la tienda Donde se sincronizan los datos
	 * @param reload : Indica si se Recarga la tienda despues de una inserción de registros
	 */

	onSave	: function(btn){
		var
			me		= this,
			store 	= this.getStore();
			console.log(store);
		if (store) {
			this.saveData(store, me.getReloadStore());
		}
	},

	saveData	: function(storeName,reload){
		var me 		= this.getApp(),
			win		= this,
			form    = win.down('form'),
			record  = form.getRecord(),
			values  = form.getValues(),
			store   = Ext.getStore(storeName);

		if (store.getModifiedRecords().length > 0) {
			me.onMsgWait('Guardando...');
		}
		if (record) { //Edición
			record.set(values);
			store.sync({
				success : function(batch, o) {
					me.showResult('Se han guardado los datos');
					win.close();
				},
				failure	: function (re) {
					store.rejectChanges();
				},
				callback    : function (b) {
					me.onMsgClose();
				}
			});
		}else{ // Insertar
			store.insert(0,values);
			store.sync({
				success : function(batch, o){
					me.showResult('Se han guardado los datos');
					win.close();
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
	 * Funcion utilizada para carcelar los cambios realizados en una tienda
	 * @param store Donde se sincronizan los datos
	 * @param reload : Indica si se recarga la tienda luedo de carcelar los cambios
	 */
	cancelChanges : function(store,reload){
		if(store){
			store.rejectChanges();
			if (reload == true){
				store.reload();
			}
		}
	},
    listeners       : {

        'resize' : function (win, width, height, eOpts ) {
			
			// TODO: Revisar el tamaño de la ventana

            me  = Admin.getApplication().getMainView().width;

            if (me<=780){
                win.maximized   = true ;
                win.maximizable = false
            }

        }
	},
	
	afterRender: function () {
        var me = this;

        me.callParent(arguments);

        me.syncSize();

        // Since we want to always be a %age of the viewport, we have to watch for
        // resize events.
        Ext.on(me.resizeListeners = {
            resize: me.onViewportResize,
            scope: me,
            buffer: 50
        });
    },

    doDestroy: function () {
        Ext.un(this.resizeListeners);

        this.callParent();
    },

    onViewportResize: function () {
        this.syncSize();
    },

    syncSize: function () {
        var width = Ext.Element.getViewportWidth(),
            height = Ext.Element.getViewportHeight();

        // We use percentage sizes so we'll never overflow the screen (potentially
        // clipping buttons and locking the user in to the dialog).

        this.setSize(Math.floor(width * 0.9), Math.floor(height * 0.9));
        this.setXY([ Math.floor(width * 0.05), Math.floor(height * 0.05) ]);
    }
 });
