Ext.define('Admin.view.sales.views.FootWearView',{
    extend : 'Admin.core.base.WindowCrud',
    xtype   : 'footwearview',
    alias   : 'widget.footwearview',
    controller : 'sales',
    closeAction 	: 'hide',
    initComponent: function () {
        this.callParent(arguments);
        this.setTitle('Agregar/Editar Calcetín');
    },
    store : 'FootWearStore',
    items: [
        {
            xtype       : 'customForm',
            items: [
                {
                    fieldLabel  : 'Descipción',
                    name        : 'shoe_name'   
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