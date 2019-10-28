Ext.define('Admin.view.sales.forms.CashSessionsView',{
    extend : 'Admin.core.base.WindowCrud',
    xtype   : 'cashsessionsview',
    alias   : 'widget.cashsessionsview',
    requires: [
        'Admin.view.sales.SalesController',
        'Admin.store.general.CashSessionsStore',
        'Admin.core.field.CheckBoxField',
        'Admin.core.field.NumberField'
    ],
    controller : 'sales',
    initComponent: function () {
        this.callParent(arguments);
        this.setTitle('Listado de sesiones de cajas');
    },
    items       : [
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
            store       : 'CashSessionsStore',
            columns: [
                { text: 'Usuario', dataIndex: 'username', width : 250 },
                { text: 'Total', dataIndex: 'total', width : 125, formatter  : 'usMoney' },
                { text: 'Abierta', dataIndex: 'opened', width : 80, xtype : 'checkcolumn' },
                { text: 'F. Apertura', dataIndex: 'opening_date', width : 100
                //   xtype: 'datecolumn',   format:'d-m-Y'
                },
                { text: 'H. Apertura', dataIndex: 'opening_time', width : 180,  xtype: 'datecolumn',   format:'d-m-Y h:i:s A'},
                { text: 'F. Y hora cierre', dataIndex: 'closing_date', width : 200,  xtype: 'datecolumn',   format:'d-m-Y h:i:s A' },
                { text: 'Documento', dataIndex: 'document', width : 120,
                    renderer : function (val) {
                        var sVal    = '<center><a href="'+Global.getUrlBase() + val + '" target="_blank"> '+
                        '<img src='+Global.getUrlBase()+'resources/images/PDF_32px.png width ="32" height = "32" >'+
                        '</a></center>';
                        // var rVal    = Ext.String.format(sVal,val);
                        return sVal;
                    }
                },
                { text: 'Tipo', dataIndex: 'user_type_name', width : 150 }
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
                            xtype 	: 'closeButton'
                        }
                    ]
                }
            ]
        }
    ],
    onReload : function(){
        zStore   = Ext.getStore('CashSessionsStore');
        zStore.load();
    }
});