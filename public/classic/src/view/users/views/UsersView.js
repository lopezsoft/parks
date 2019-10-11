Ext.define('Admin.view.users.views.UsersView',{
    extend : 'Admin.core.base.WindowCrud',
    xtype   : 'usersview',
    alias   : 'widget.usersview',
    controller : 'users',
    closeAction 	: 'hide',
    initComponent: function () {
        this.callParent(arguments);
        this.setTitle('Agregar/Editar Usuario/Cliente');
    },
    store : 'UsersStore',
    items: [
        {
            xtype       : 'customForm',
            items: [
                {
                    fieldLabel  : 'Nombres',
                    name        : 'first_name'
                },
                {
                    fieldLabel  : 'Apellidos',
                    name        : 'last_name'   
                },
                {
                    xtype       : 'customDate',
                    fieldLabel  : 'Fecha de nacimiento',
                    name        : 'birthday'   
                },
                {
                    fieldLabel  : 'Correo electrónico',
                    name        : 'email',
                    vtype       : 'email'
                },
                {
                    xtype           : 'checkBoxField',
                    boxLabel        : 'Activo',
                    name            : 'active'
                }
            ]
        }
    ]
});