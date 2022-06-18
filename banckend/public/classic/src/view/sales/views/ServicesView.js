Ext.define('Admin.view.sales.views.ServicesView',{
    extend : 'Admin.core.base.WindowCrud',
    xtype   : 'servicesview',
    alias   : 'widget.servicesview',
    controller : 'sales',
    closeAction 	: 'hide',
    initComponent: function () {
        this.callParent(arguments);
        this.setTitle('Agregar/Editar Servicios');
    },
    store : 'ServicesStore',
    items: [
        {
            xtype       : 'customForm',
            items: [
                {
                    fieldLabel  : 'Descipción',
                    name        : 'time_name'
                },
                {
                    fieldLabel  : 'Tiempo (Minutos)',
                    name        : 'time',   
                    allowBlank  : true
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