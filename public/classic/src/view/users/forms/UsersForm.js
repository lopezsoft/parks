Ext.define('Admin.view.users.forms.UsersForm',{
    extend  : 'Admin.view.users.forms.CustomersForm',
    xtype   : 'usersform',
    alias   : 'widget.usersform',
    initComponent: function () {
        this.callParent(arguments);
        this.setTitle('Usuarios');
    },
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