Ext.define('Admin.view.sales.views.BranchFootWearView',{
    extend : 'Admin.core.base.WindowCrud',
    xtype   : 'branchfootwearview',
    alias   : 'widget.branchfootwearview',
    controller : 'sales',
    closeAction 	: 'hide',
    initComponent: function () {
        this.callParent(arguments);
        this.setTitle('Agregar/Editar Calcetines por sucursal');
    },
    store : 'BranchFootWearStore',
    items: [
        {
            xtype       : 'customForm',
            items: [
                {
                    xtype       : 'combofootwear'
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
                    xtype           : 'checkBoxField',
                    boxLabel        : 'Activo',
                    name            : 'active'
                }
            ]
        }
    ]
});