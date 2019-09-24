Ext.define('Admin.view.products.forms.LinesForm',{
    extend : 'Admin.core.forms.CustomForm',
    xtype   : 'linesform',
    alias   : 'widget.linesform',
    requires: [
        'Admin.view.products.ProductsController',
        'Admin.store.products.LinesStore',
        'Admin.core.field.CheckBoxField',
        'Ext.ux.colorpick.Field'
    ],
    controller : 'products',
    initComponent: function () {
        this.callParent(arguments);
        this.setTitle('Datos de las lineas de produstos');
    },
    buildWindow: function () {
        var
            me = this.getApp();
        this.winObject = Ext.create('Admin.view.products.views.LinesView');
    },
    showWindow: function (btn) {
        var me = this.app,
            ts = this,
            data = ts.down('grid').getSelection()[0],
            form = [];
        Ext.require([
            'Admin.view.products.views.LinesView'
        ]);

        Ext.onReady(function () {
            if (!ts.getWinObject()) {
                ts.buildWindow();
            }
            form = ts.winObject.down('form');
            if (btn.itemId == 'editButton') {
                form.loadRecord(data);
            } else {
                form.reset(true);
            };
            ts.winObject.show();
        });
    },
    showSaveButton  : false,
    items: [
        {
            xtype       : 'customGrid',
            store       : 'LinesStore',
            columns: [
                { text: 'Nombre de la línea', dataIndex: 'line_name', width : 250},
                { 
                    text: 'Color', 
                    dataIndex: 'color', 
                    width : 100,
                    renderer : function (val) {
                        return '<span style="color:#' + val + ';">' + val + '</span>';
                    }
                },
                { text: 'Activa', dataIndex: 'active', width : 80, xtype: 'checkcolumn', stopSelection: false }
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
                    xtype  : 'toolbarCrud'
                }
            ]
        }
    ]
});