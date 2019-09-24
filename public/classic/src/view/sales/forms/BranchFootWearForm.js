Ext.define('Admin.view.sales.forms.BranchFootWearForm',{
    extend : 'Admin.core.forms.CustomForm',
    xtype   : 'branchfoorwearform',
    alias   : 'widget.branchfoorwearform',
    requires: [
        'Admin.view.sales.SalesController',
        'Admin.store.sales.BranchFootWearStore',
        'Admin.core.combo.ComboFootWear',
        'Admin.core.combo.ComboBranchOffices',
        'Admin.core.field.CheckBoxField',
        'Admin.core.field.NumberField'
    ],
    controller : 'sales',
    initComponent: function () {
        this.callParent(arguments);
        this.setTitle('Calcetines por sucursal');
    },
    buildWindow: function () {
        var
            me = this.getApp();
        this.winObject = Ext.create('Admin.view.sales.views.BranchFootWearView');
    },
    showWindow: function (btn) {
        var me = this.app,
            ts = this,
            data = ts.down('grid').getSelection()[0],
            form = [];
        Ext.require([
            'Admin.view.sales.views.BranchFootWearView'
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
            store       : 'BranchFootWearStore',
            columns: [
                { text: 'Surcusal', dataIndex: 'id_branch', width : 100 },
                { text: 'Calcetín', dataIndex: 'id_footwear', width : 100 },
                { text: 'Precio', dataIndex: 'price', width : 150, formatter: 'usMoney' },
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