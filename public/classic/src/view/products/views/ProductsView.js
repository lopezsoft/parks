Ext.define('Admin.view.products.views.ProductsView',{
    extend : 'Admin.core.base.WindowCrud',
    xtype   : 'productsview',
    alias   : 'widget.productsview',
    controller : 'products',
    closeAction 	: 'hide',
    initComponent: function () {
        this.callParent(arguments);
        this.setTitle('Agregar/Editar Productos');
    },
    store : 'ProductsStore',
    items: [
        {
            xtype       : 'customForm',
            items: [
                {
                    fieldLabel  : 'Nombre del producto',
                    name        : 'product_name'
                },
                {
                    fieldLabel  : 'Código',
                    name        : 'code',
                    allowBlank  : true
                },
                {
                    fieldLabel  : 'Dirección',
                    name        : 'address'
                },
                {
                    fieldLabel  : 'Código de barras',
                    name        : 'bar_code',   
                    allowBlank  : true
                },
                {
                    fieldLabel  : 'Precio de venta',
                    name        : 'price',
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