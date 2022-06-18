Ext.define('Admin.view.company.forms.BranchsForm',{
    extend : 'Admin.core.forms.CustomForm',
    xtype   : 'branchsform',
    alias   : 'widget.branchsform',
    requires: [
        'Admin.view.company.CompanyController',
        'Admin.store.company.BranchOfficesStore',
        'Admin.core.grid.CustomGrid',
        'Admin.core.toolbar.ToolbarCrud'
    ],
    controller : 'company',
    initComponent: function () {
        this.callParent(arguments);
        this.setTitle('Datos de las sucursales');
    },
    buildWindow: function () {
        var
            me = this.getApp();
        this.winObject = Ext.create('Admin.view.company.views.BranchsView');
    },
    showWindow: function (btn) {
        var me = this.app,
            ts = this,
            data = ts.down('grid').getSelection()[0],
            form = [];
        Ext.require([
            'Admin.view.company.views.BranchsView'
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
            store       : 'BranchOfficesStore',
            columns: [
                { text: 'Nombre de la sucursal', dataIndex: 'full_name', width : 200 },
                { text: 'Email', dataIndex: 'email', width : 250 },
                { text: 'Dirección', dataIndex: 'address', width : 250 },
                { text: 'Ubicación', dataIndex: 'location', width : 250 },
                { text: 'Phone', dataIndex: 'phone', width : 100 }
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