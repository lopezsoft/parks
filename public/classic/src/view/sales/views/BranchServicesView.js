Ext.define('Admin.view.sales.views.BranchServicesView',{
    extend : 'Admin.core.base.WindowCrud',
    xtype   : 'branchservicesview',
    alias   : 'widget.branchservicesview',
    controller : 'sales',
    closeAction 	: 'hide',
    initComponent: function () {
        this.callParent(arguments);
        this.setTitle('Agregar/Editar Servicios por sucursal');
    },
    store : 'BranchServicesStore',
    items: [
        {
            xtype       : 'customForm',
            items: [
                {
                    xtype       : 'comboservices'
                },
                {
                    xtype       : 'combobranchoffices'
                },
                {
                    xtype       : 'numberField',
                    fieldLabel  : 'Precio',
                    name        : 'price'
                },
                {
                    xtype       : 'numberField',
                    fieldLabel  : 'Tiempo de gracia (Minutos)',
                    name        : 'extension'
                },
                {
                    xtype           : 'checkBoxField',
                    boxLabel        : 'Tiempo Ilimitado?',
                    name            : 'active'
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