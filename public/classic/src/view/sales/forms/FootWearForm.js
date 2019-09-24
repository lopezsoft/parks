Ext.define('Admin.view.sales.forms.FootWearForm',{
    extend : 'Admin.core.forms.CustomForm',
    xtype   : 'footwearform',
    alias   : 'widget.footwearform',
    requires: [
        'Admin.view.sales.SalesController',
        'Admin.store.sales.FootWearStore',
        'Admin.core.field.CheckBoxField',
        'Admin.core.field.NumberField'
    ],
    controller : 'sales',
    initComponent: function () {
        this.callParent(arguments);
        this.setTitle('Calcetines');
    },
    buildWindow: function () {
        var
            me = this.getApp();
        this.winObject = Ext.create('Admin.view.sales.views.FootWearView');
    },
    showWindow: function (btn) {
        var me = this.app,
            ts = this,
            data = ts.down('grid').getSelection()[0],
            form = [];
        Ext.require([
            'Admin.view.sales.views.FootWearView'
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
            store       : 'FootWearStore',
            columns: [
                { text: 'Descripción', dataIndex: 'shoe_name', flex : 1 },
                { text: 'Activo', dataIndex: 'active', width : 80, xtype: 'checkcolumn' }
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