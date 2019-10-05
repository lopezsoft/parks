Ext.define('Admin.view.products.forms.ProductsForm',{
    extend : 'Admin.core.forms.CustomForm',
    xtype   : 'productsform',
    alias   : 'widget.productsform',
    requires: [
        'Admin.view.products.ProductsController',
        'Admin.store.products.ProductsStore',
        'Admin.core.field.CheckBoxField',
        'Admin.core.combo.ComboCategories',
        'Admin.core.combo.ComboLines',
        'Admin.core.combo.ComboBranchOffices',
        'Admin.core.field.NumberField'
    ],
    controller : 'products',
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
            'Admin.view.products.views.ProductsView',
            'Admin.view.products.views.ProductsIgameView'
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
                { text: 'Código de barras', dataIndex: 'bar_code', width : 150 },
                { text: 'Imagen', dataIndex: 'image', width : 72,
                    renderer : function (val) {
                        var sVal    = '<center><a href='+Global.getUrlBase()+'{0} target="_blank"> '+
                        '<img src='+Global.getUrlBase()+'{0} width ="32" height = "32" >'+
                        '</a></center>';
                        var rVal    = Ext.String.format(sVal,val);
                        return rVal;
                    }
                }
            ],
            dockedItems: [
                {
                    xtype       : 'customToolbar',
                    items       : [
                        {
                            text    : 'Imagen',
                            itemId  : 'buttomImage',
                            disabled: true,
                            handler : function(btn){
                                var 
                                    sel = btn.up('form').down('grid').getSelection(),
                                    me  = Admin.getApplication(),
                                    win = null;
                                if(sel.length > 0){
                                    win     = Ext.create('Admin.view.products.views.ProductsIgameView');
                                    form    = win.down('form');
                                    form.loadRecord(sel[0]);
                                    win.show();
                                }
                            }
                        }
                    ]
                },
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