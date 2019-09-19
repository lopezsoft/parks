Ext.define('Admin.view.products.views.LinesView',{
    extend : 'Admin.core.base.WindowCrud',
    xtype   : 'linesview',
    alias   : 'widget.linesview',
    controller : 'products',
    closeAction 	: 'hide',
    initComponent: function () {
        this.callParent(arguments);
        this.setTitle('Agregar/Editar Línea de Productos');
    },
    items: [
        {
            xtype       : 'customForm',
            items: [
                {
                    fieldLabel  : 'Nombre de la línea',
                    name        : 'line_name'
                },
                {
                    fieldLabel  : 'Color',
                    name        : 'color',
                    allowBlank  : true
                },
                {
                    xtype           : 'checkBoxField',
                    boxLabel        : 'Activa',
                    name            : 'active'
                }
            ]
        }
    ]
});