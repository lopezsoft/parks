Ext.define('Admin.view.users.forms.PreTicketsForm',{
    extend : 'Admin.core.forms.CustomForm',
    xtype   : 'preticketsform',
    alias   : 'widget.preticketsform',
    requires: [
        'Admin.view.users.UsersController',
        'Admin.store.general.PreTicketsStore',
        'Admin.core.field.CheckBoxField',
        'Admin.core.combo.ComboLines',
        'Admin.view.users.views.ReceiveView',
        'Admin.core.field.NumberField'
    ],
    controller : 'users',
    initComponent: function () {
        this.callParent(arguments);
        this.setTitle('Listado de Tickets pendientes (PRE-TICKETS)');
    },
    config  : {
        task    : {}
    },
    showSaveButton  : false,
    items: [
        {
            xtype       : 'customGrid',
            plugins		: [
                {
                     ptype : 'gridfilters'
                },
                {
                    ptype : 'responsive'
                },
                {
                    ptype			: 'gridSearch',
                    readonlyIndexes	: ['note'],
                    disableIndexes	: ['pctChange'],
                    mode            : 'local',
                    flex			: 1,
                    autoFocus		: false,
                    independent		: true
                }
            ],
            selModel	: 'rowmodel',
            store       : 'PreTicketsStore',
            columns: [
                { text: 'Nº. PRE-TICKET', dataIndex: 'nro_sale', width : 120 },
                { text: 'Total', dataIndex: 'total', width : 125, formatter  : 'usMoney' },
                { text: 'Cliente', dataIndex: 'customers', width : 250},
                { text: 'Fecha y hora', dataIndex: 'date', width : 200,  xtype: 'datecolumn',   format:'d-m-Y h:1:s A' },
                { text: 'Documento', dataIndex: 'document', width : 120,
                    renderer : function (val) {
                        var sVal    = '<center><a href='+Global.getUrlBase()+'{0} target="_blank"> '+
                        '<img src='+Global.getUrlBase()+'resources/images/PDF_32px.png width ="32" height = "32" >'+
                        '</a></center>';
                        var rVal    = Ext.String.format(sVal,val);
                        return rVal;
                    }
                },
                { text: 'Código de barras', dataIndex: 'barcode', width : 125 },
                { text: 'Tipo', dataIndex: 'type_name', width : 150 }
            ],
            dockedItems: [
                {
                    xtype 		: 'pagination',
                    items 		: [
                        {
                            xtype		: 'exportButton'
                        }
                    ]	
                },
                {
                    xtype  : 'toolbarCrud',
                    items 	: [
                        '->',
                        {
                            xtype	    : 'customButton',
                            tooltip 	: 'Cobrar e imprimir ticket',
                            text 	    : 'Cobrar e imprimir ticket',
                            itemId		: 'printButton',
                            iconCls		: 'x-fa fa-print',
                            disabled 	: true,
                            handler     : 'onPrint'
                        },'-',
                        {
                            xtype 	: 'closeButton'
                        }
                    ]
                }
            ]
        }
    ],
    listeners : {
        afterrender : function(ts){
            var 
                runner  = new Ext.util.TaskRunner(),
                tk ;
            tk = runner.newTask({
                run: function(){
                    var 
                        store   = Ext.getStore('PreTicketsStore');
                        store.reload();
                },
                interval: 30000
            });
            ts.setTask(tk);
        },
        activate : function(ts){
            var 
                task    = ts.getTask();
            if (task) {
                task.start();
            }
        },
        deactivate : function(ts){
            var 
                task    = ts.getTask();
            if (task) {
                task.stop();
            }
        },
        destroy : function(ts){
            var 
                task    = ts.getTask();
            if (task) {
                task.stop();
            }
        }
    }
});