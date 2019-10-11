Ext.define('Admin.view.users.forms.UsersForm',{
    extend  : 'Admin.view.users.forms.CustomersForm',
    xtype   : 'usersform',
    alias   : 'widget.usersform',
    initComponent: function () {
        this.callParent(arguments);
        this.setTitle('Usuarios');
    }
});