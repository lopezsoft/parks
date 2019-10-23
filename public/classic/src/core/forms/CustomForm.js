/**
 * Created by LOPEZSOFT on 7/12/2015.
 */
Ext.define('Admin.core.forms.CustomForm',{
    extend  : 'Ext.form.Panel',
    bodyPadding		: 5,
    scrollable      : true,		
    layout			: 'anchor',
    alias           : 'widget.customForm',
    defaultFocus    : 'customText',
    defaultType     : 'customText',
    ui		        : 'blue',
    cls             : 'wizardone shadow',
    margin          : 20,
    requires: [
        'Admin.core.field.FieldSet',
        'Admin.core.toolbar.ToolbarSave',
        'Admin.core.field.CustomText'
    ],
    defaults: {
        width : '100%'
    },
    items   : [
    ],
    dockedItems: [{
        xtype		: 'toolbarSave'
    }],
    config: {
        winObject       : undefined,
        app             : undefined,
        store           : undefined,
        fileStore       : undefined,
        showSaveButton  : true
    },
    constructor: function (cfg) {
        var me = this;
        me.initConfig(cfg);
    },
    listeners: {
        afterrender: function (e) {
            var
                btn     = this.down('#saveButton');
            this.onCreateStore();
            if (btn) {
                btn.setVisible(this.getShowSaveButton());
            }
        },
        show : function(t,e){
        },
        activate : function(t,e){
        }
    },
    initComponent: function () {
        this.callParent(arguments);
        this.on({
            scope: this
        });
    },
    onCreateStore : function (){
        var
            store   = this.getFileStore(),
            me      = this;
        if (store) {
            cStore 	= 'Admin.store.'+store;
            Ext.require(cStore)
            Ext.onReady(function(){
                new Ext.create(cStore);
                me.onLoadStore();
            });
        }else{
            me.onLoadStore();
        }
    },
    onLoadStore : function (){
        var
            store   = this.getStore(),
            me      = this;
        if (store) {
            me.mask('Cargando...');
            Ext.onReady(function(){
                xStore = Ext.getStore(store);
                if(xStore){
                    xStore.load({
                        scope: this,
                        callback: function (records, operation, success) {
                            me.unmask();
                            if (records.length > 0) {                            
                                me.loadRecord(records[0]);
                            }
                        }
                    })
                }
            });
        }
    },
    closeForm: function (btn) {
        this.returnMainCard();
    },
    returnMainCard: function () { 
        var
            cont = this.getController();
        if (cont) {
            cont.onRestoreMainCardPanel();
        }
    },    
    constructor: function (config) {
        this.callParent(arguments);
        this.app = Admin.getApplication();
        this.initConfig(this.config, config);
    },
    /**Destructor*/
    onDestroy: function () {
        if (this.getWinObject()) {
            this.winObject.destroy();
        }
        this.callParent(arguments);
    },
    /**Constructor de ventanas*/
    buildWindow: function () {

    },
    /**Mostrador de ventanas*/
    showWindow: function (obj) {

    },
	/**
	 * Funcion utilizada para guardar los cambios realizados en una tienda
	 * @param storeName Nombre de la tienda Donde se sincronizan los datos
	 * @param reload : Indica si se Recarga la tienda despues de una inserción de registros
	 */

    onSave: function (btn) {
        var
            store = this.getStore();
        if (store) {
            this.saveData(store);
        }
    },
    saveData: function (storeName, reload) {
        var me      = this.getApp(),
            win     = this,
            form    = this,
            record  = form.getRecord(),
            values  = form.getValues(),
            store   = Ext.getStore(storeName);

        if (store.getModifiedRecords().length > 0) {
            me.onMsgWait('Guardando...');
        }
        if (record) { //Edición
            record.set(values);
            store.sync({
                success: function (batch, o) {
                    me.showResult('Se han guardado los datos');
                },
                failure: function (re) {
                    store.rejectChanges();
                },
                callback: function (b) {
                    me.onMsgClose();
                }
            });
        } else { // Insertar
            store.insert(0, values);
            store.sync({
                success: function (batch, o) {
                    me.showResult('Se han guardado los datos');
                    win.close();
                    if (reload == true) {
                        store.reload();
                    }
                },
                failure: function (re) {
                    store.rejectChanges();
                },
                callback: function (b) {
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
    cancelChanges: function (store, reload) {
        if (store) {
            store.rejectChanges();
            if (reload == true) {
                store.reload();
            }
        }
    }
});