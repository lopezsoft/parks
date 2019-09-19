Ext.define('Admin.view.products.forms.ProductsForm',{
    extend : 'Admin.core.forms.CustomForm',
    xtype   : 'productsform',
    alias   : 'widget.productsform',
    requires: [
        'Admin.view.products.ProductsController',
        'Admin.store.products.ProductsStore',
        'Admin.core.field.CheckBoxField'
    ],
    controlle : 'products',
    initComponent: function () {
        this.callParent(arguments);
        this.setTitle('Datos de los productos');
    },
    buildWindow: function () {
        var
            me = this.getApp();
        this.winObject = Ext.create('Admin.view.products.views.ProductsView');
    },
    showWindow: function (btn) {
        var me = this.app,
            ts = this,
            data = ts.down('grid').getSelection()[0],
            form = [];
        Ext.require([
            'Admin.view.products.views.ProductsView'
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
            store       : 'ProductsStore',
            columns: [
                { text: 'Código', dataIndex: 'code', width : 100 },
                { text: 'Nombre del producto', dataIndex: 'product_name', width : 250 },
                { text: 'Precio', dataIndex: 'price', width : 100, formatter: 'usMoney' },
                { text: 'Código de barras', dataIndex: 'bar_code', width : 150 }
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