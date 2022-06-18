Ext.define('Admin.view.company.views.BranchsView',{
    extend : 'Admin.core.base.WindowCrud',
    xtype   : 'branchsview',
    alias   : 'widget.branchsview',
    controller : 'company',
    closeAction 	: 'hide',
    initComponent: function () {
        this.callParent(arguments);
        this.setTitle('Agregar/Editar sucursal');
    },
    store   : 'BranchOfficesStore',
    items: [
        {
            xtype       : 'customForm',
            items: [
                {
                    fieldLabel  : 'Nombre de la sucursal',
                    name        : 'full_name'
                },
                {
                    fieldLabel  : 'Ubicación fisica',
                    name        : 'location'
                },
                {
                    fieldLabel  : 'Dirección',
                    name        : 'address'
                },
                {
                    fieldLabel  : 'Correo electrónico',
                    name        : 'email',
                    allowBlank  : true
                },
                {
                    fieldLabel  : 'Teléfonos',
                    name        : 'phone',
                    allowBlank  : true
                }
            ]
        }
    ]
});