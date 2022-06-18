Ext.define('Admin.view.sales.forms.ServicesForm',{
    extend : 'Admin.core.forms.CustomForm',
    xtype   : 'servicesform',
    alias   : 'widget.servicesform',
    requires: [
        'Admin.view.sales.SalesController',
        'Admin.store.sales.ServicesStore',
        'Admin.core.field.CheckBoxField',
        'Admin.core.field.NumberField'
    ],
    controller: 'sales',
    initComponent: function () {
        this.callParent(arguments);
        this.setTitle('Servicios');
    },
    buildWindow: function () {
        var
            me = this.getApp();
        this.winObject = Ext.create('Admin.view.sales.views.ServicesView');
    },
    showWindow: function (btn) {
        var me = this.app,
            ts = this,
            data = ts.down('grid').getSelection()[0],
            form = [];
        Ext.require([
            'Admin.view.sales.views.ServicesView'
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
            store       : 'ServicesStore',
            columns: [
                { text: 'Descripción', dataIndex: 'time_name', width : 150 },
                { text: 'Tiempo', dataIndex: 'time', width : 250 },
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