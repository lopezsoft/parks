Ext.define('Admin.view.users.forms.CustomersForm',{
    extend : 'Admin.core.forms.CustomForm',
    xtype   : 'customersform',
    alias   : 'widget.customersform',
    requires: [
        'Admin.view.users.UsersController',
        'Admin.store.general.UsersStore',
        'Admin.core.field.CheckBoxField',
        'Admin.core.combo.ComboLines',
        'Admin.core.field.NumberField'
    ],
    controller : 'users',
    initComponent: function () {
        this.callParent(arguments);
        this.setTitle('Datos de los Clientes');
    },
    buildWindow: function () {
        var
            me = this.getApp();
        this.winObject = Ext.create('Admin.view.users.views.UsersView');
    },
    showWindow: function (btn) {
        var me = this.app,
            ts = this,
            data = ts.down('grid').getSelection()[0],
            form = [];
        Ext.require([
            'Admin.view.users.views.UsersView'
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
            store       : 'UsersStore',
            columns: [
                { text: 'Nombres', dataIndex: 'first_name', width : 125 },
                { text: 'Apellidos', dataIndex: 'last_name', width : 125 },
                { text: 'Correo', dataIndex: 'email', width : 220},
                { text: 'Fecha de nacimiento', dataIndex: 'birthday', width : 150 },
                { text: 'Imagen', dataIndex: 'avatar', width : 72,
                    renderer : function (val) {
                        var sVal    = '<center><a href='+Global.getUrlBase()+'{0} target="_blank"> '+
                        '<img src='+Global.getUrlBase()+'{0} width ="32" height = "32" >'+
                        '</a></center>';
                        var rVal    = Ext.String.format(sVal,val);
                        return rVal;
                    }
                },
                { text: 'Activo', dataIndex: 'active', width : 80, xtype : 'checkcolumn' }

            ],
            dockedItems: [
                // {
                //     xtype       : 'customToolbar',
                //     items       : [
                //         {
                //             text    : 'Imagen',
                //             itemId  : 'buttomImage',
                //             disabled: true,
                //             handler : function(btn){
                //                 var 
                //                     sel = btn.up('form').down('grid').getSelection(),
                //                     me  = Admin.getApplication(),
                //                     win = null;
                //                 if(sel.length > 0){
                //                     win     = Ext.create('Admin.view.users.views.UsersIgameView');
                //                     form    = win.down('form');
                //                     form.loadRecord(sel[0]);
                //                     win.show();
                //                 }
                //             }
                //         }
                //     ]
                // },
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