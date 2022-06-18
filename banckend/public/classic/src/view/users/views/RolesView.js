Ext.define('Admin.view.users.views.RolesView',{
    extend : 'Admin.core.base.WindowCrud',
    xtype   : 'rolesview',
    alias   : 'widget.rolesview',
    controller : 'users',
    initComponent: function () {
        this.callParent(arguments);
        this.setTitle('Roles de usuario - permisos');
    },
    items: [
        {
            xtype       : 'customGrid',
            plugins		: [
                {
                    ptype : 'gridfilters'
                },
                {
                    ptype : 'responsive'
                },
                {
                    ptype			: 'gridSearch',
                    readonlyIndexes	: ['note'],
                    disableIndexes	: ['pctChange'],
                    mode            : 'local',
                    flex			: 1,
                    autoFocus		: false,
                    independent		: true
                },
                {
                    ptype: 'cellediting',
                    clicksToEdit: 1
                }
            ],
            selModel: {
                type: 'cellmodel'
            },
            store       : 'RolesStore',
            columns: [
                { text: 'Menú', dataIndex: 'name_menu', width : 200 },
                { text: 'Item del menú', dataIndex: 'name_item', width : 250},
                { text: 'Permiso', dataIndex: 'active', width : 100, xtype: 'checkcolumn' }
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
                            xtype	    : 'saveButton',
                            disabled    : false,
                            itemId      : 'btnSave',
                            handler     : function(btn){
                                var
                                    store   = Ext.getStore('RolesStore');
                                    store.sync();
                            }
                        },'-',
                        {
                            xtype	    : 'undoButton',
                            disabled    : false,
                            itemId      : 'btnUndo',
                            handler     : function(btn){
                                var store   = Ext.getStore('RolesStore');
                                if(store){
                                    store.rejectChanges();
                                }
                            }
                        },'-',
                        {
                            xtype 	: 'closeButton'
                        }
                    ]
                }
            ]
        }
    ]
});