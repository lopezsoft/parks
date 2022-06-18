Ext.define('Admin.view.settings.forms.ConfInvoiceForm',{
    extend : 'Admin.core.forms.CustomForm',
    xtype   : 'confinvoiceform',
    alias   : 'widget.confinvoiceform',
    requires: [
        'Admin.view.settings.SettingsController',
        'Admin.store.settings.ConfInvoiceStore',
        'Admin.core.field.CheckBoxField',
        'Admin.core.combo.ComboBranchOffices',
        'Admin.core.field.TextAreaField',
        'Admin.core.field.CustomText',
        'Ext.layout.container.Column',
        'Admin.core.tab.CustomTab',
        'Admin.core.field.NumberField'
    ],
    controller : 'settings',
    initComponent: function () {
        this.callParent(arguments);
        this.setTitle('Datos de tickets');
    },
    buildWindow: function () {
        var
            me = this.getApp();
        this.winObject = Ext.create('Admin.view.settings.views.ConfInvoiceView');
    },
    showWindow: function (btn) {
        var me = this.app,
            ts = this,
            data = ts.down('grid').getSelection()[0],
            form = [];
        Ext.require([
            'Admin.view.settings.views.ConfInvoiceView'
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
            store       : 'ConfInvoiceStore',
            columns: [
                { text: 'Sucursal', dataIndex: 'id_branch', width : 100 },
                { text: 'Num. Inicial', dataIndex: 'initial_number', width : 110 },
                { text: 'Prefijo', dataIndex: 'prefix', width : 100 }
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