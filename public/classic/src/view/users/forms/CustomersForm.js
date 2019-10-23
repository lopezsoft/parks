Ext.define('Admin.view.users.forms.CustomersForm',{
    extend : 'Admin.core.forms.CustomForm',
    xtype   : 'customersform',
    alias   : 'widget.customersform',
    requires: [
        'Admin.view.users.UsersController',
        'Admin.store.general.UsersStore',
        'Admin.store.general.RolesStore',
        'Admin.core.field.CheckBoxField',
        'Admin.core.combo.ComboLines',
        'Admin.core.field.NumberField',
        'Admin.core.combo.ComboTypeUsers',
        'Admin.view.users.views.RolesView'
    ],
    controller : 'users',
    initComponent: function () {
        this.callParent(arguments);
        this.setTitle('Datos de los Clientes');
    },
    buildWindow: function () {
        var
            me = this.getApp();
        me.onStore('general.TypeUsersStore');
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
                form.down('#password').setVisible(false);
                form.down('#password').allowBlank   = true;
                form.down('#confirm').setVisible(false);
                form.down('#confirm').allowBlank   = true;
                form.loadRecord(data);
            } else {
                form.down('#password').setVisible(true);
                form.down('#password').allowBlank   = false;
                form.down('#confirm').setVisible(true);
                form.down('#confirm').allowBlank   = false;
                form.reset(true);
            };
            ts.winObject.show();
        });
    },
    viewRole : function(btn){
        var  
            me      = this.getApp(),
            token   = AuthToken.recoverParams(),
            data    = this.down('grid').getSelection()[0];
        me.onStore('general.RolesStore');
        me.setParamStore('RolesStore',{
            user_id     : data.id,
            pdbTable    : 'tb_roles',
            type        : 2
        });            
        win = Ext.create('Admin.view.users.views.RolesView');
        win.show();
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
                { text: 'Tipo', dataIndex: 'type', width : 60},
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
                    xtype  : 'toolbarCrud',
                    items 	: [
                        '->',
                        {
                            itemId  : 'buttonRoles',
                            text    : 'Permisos',
                            ui      : 'facebook',
                            disabled: true,
                            iconCls : 'fas fa-user-tag',
                            handler : function (btn) {
                                var 
                                    ts = btn.up('window') || btn.up('form');
                                ts.viewRole(btn);
                            }
                        },'-',
                        {
                            xtype	: 'addButton'
                        },'-',
                        {
                            xtype	: 'editButton'
                        },'-',
                        {
                            xtype	: 'deleteButton'
                        },'-',
                        {
                            xtype 	: 'closeButton'
                        }
                    ]
                }
            ]
        }
    ],
    listeners : {
        activate : function(ts){
            var app = Admin.getApplication();
            app.setParamStore('UsersStore',{
                pdbTable    : 'users',
                query       : '',
                type        : 2
            });
            store   = Ext.getStore('UsersStore');
            store.reload();
        }
    }
});