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
                    fieldLabel  : 'Código',
                    name        : 'code',
                    allowBlank  : true
                },
                {
                    fieldLabel  : 'Código de barras',
                    name        : 'bar_code',   
                    allowBlank  : true
                },
                {
                    fieldLabel  : 'Nombre del producto',
                    name        : 'product_name'
                },
                {
                    xtype       : 'combobranchoffices'
                },
                {
                    xtype       : 'combocategories'
                },
                {
                    xtype       : 'combolines'
                },
                {
                    fieldLabel  : 'Precio de venta',
                    xtype       : 'numberField',
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