Ext.define('Admin.view.products.forms.CategoriesForm',{
    extend : 'Admin.core.forms.CustomForm',
    xtype   : 'categoriesform',
    alias   : 'widget.categoriesform',
    requires: [
        'Admin.view.products.ProductsController',
        'Admin.store.products.CategoriesStore',
        'Admin.core.field.CheckBoxField',
        'Ext.ux.colorpick.Field'
    ],
    controller : 'products',
    initComponent: function () {
        this.callParent(arguments);
        this.setTitle('Datos de las categorias de produstos');
    },
    buildWindow: function () {
        var
            me = this.getApp();
        this.winObject = Ext.create('Admin.view.products.views.CategoriesView');
    },
    showWindow: function (btn) {
        var me = this.app,
            ts = this,
            data = ts.down('grid').getSelection()[0],
            form = [];
        Ext.require([
            'Admin.view.products.views.CategoriesView'
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
            store       : 'CategoriesStore',
            columns: [
                { text: 'Nombre de la categoria', dataIndex: 'category_name', width : 250},
                { 
                    text        : 'Color', 
                    dataIndex   : 'color', 
                    width       : 100,
                    renderer    : function (val) {
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