Ext.define('Admin.view.sales.forms.CashClosingForm',{
    extend : 'Admin.core.forms.CustomForm',
    xtype   : 'cashclosingform',
    alias   : 'widget.cashclosingform',
    requires: [
        'Admin.view.sales.SalesController',
        'Admin.store.general.UsersStore',
        'Admin.core.field.CheckBoxField',
        'Admin.view.sales.forms.CashSessionsView',
        'Admin.core.combo.ComboLines',
        'Admin.core.field.NumberField'
    ],
    controller : 'sales',
    initComponent: function () {
        this.callParent(arguments);
        this.setTitle('Cortes de caja');
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
                            xtype	: 'addButton',
                            itemId  : 'buttonCahsSession',
                            disabled: true,
                            text    : 'Sesiones de caja',
                            iconCls : 'fas fa-receipt',
                            handler : 'onCashSessions'
                        },'-',
                        {
                            xtype	: 'editButton',
                            itemId  : 'buttonCahsClosing',
                            disabled: true,
                            text    : 'Cierre de caja',
                            iconCls : 'fas fa-receipt',
                            handler : 'onCashClosing'
                        },'-',
                        {
                            xtype	: 'editButton',
                            text    : 'Arqueo de caja',
                            itemId  : 'buttonCahsCount',
                            iconCls : 'fas fa-receipt',
                            handler : 'onCashCount'
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
            var 
                app     = Admin.getApplication(),
                token   = AuthToken.recoverParams();
            if (token.user.type == 1) {
                app.setParamStore('UsersStore',{
                    pdbTable    : 'sales',
                    query       : '',
                    type        : 2
                });
            }else{
                app.setParamStore('UsersStore',{
                    pdbTable    : 'sales',
                    query       : '',
                    type        : 0
                });
            }
            store   = Ext.getStore('UsersStore');
            store.reload();
        }
    }
});