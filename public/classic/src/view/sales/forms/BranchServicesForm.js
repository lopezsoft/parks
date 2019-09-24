Ext.define('Admin.view.sales.forms.BranchServicesForm',{
    extend : 'Admin.core.forms.CustomForm',
    xtype   : 'branchservicesform',
    alias   : 'widget.branchservicesform',
    requires: [
        'Admin.view.sales.SalesController',
        'Admin.store.sales.BranchServicesStore',
        'Admin.core.combo.ComboServices',
        'Admin.core.combo.ComboBranchOffices',
        'Admin.core.field.CheckBoxField',
        'Admin.core.field.NumberField'
    ],
    controller : 'sales',
    initComponent: function () {
        this.callParent(arguments);
        this.setTitle('Servcios por sucursal');
    },
    buildWindow: function () {
        var
            me = this.getApp();
        this.winObject = Ext.create('Admin.view.sales.views.BranchServicesView');
    },
    showWindow: function (btn) {
        var me = this.app,
            ts = this,
            data = ts.down('grid').getSelection()[0],
            form = [];
        Ext.require([
            'Admin.view.sales.views.BranchServicesView'
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
            store       : 'BranchServicesStore',
            columns: [
                { text: 'Surcusal', dataIndex: 'id_branch', width : 100 },
                { text: 'Servicio', dataIndex: 'id_time', width : 100 },
                { text: 'Precio', dataIndex: 'price', width : 150, formatter: 'usMoney' },
                { text: 'T. Ilimitado', dataIndex: 'unlimited_time', width : 120,  xtype: 'checkcolumn' },
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