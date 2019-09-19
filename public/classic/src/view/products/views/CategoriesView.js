Ext.define('Admin.view.products.views.CategoriesView',{
    extend : 'Admin.core.base.WindowCrud',
    xtype   : 'categoriesview',
    alias   : 'widget.categoriesview',
    controller      : 'products',
    closeAction 	: 'hide',
    initComponent: function () {
        this.callParent(arguments);
        this.setTitle('Agregar/Editar Categorias de Productos');
    },
    store   : 'CategoriesStore',
    items: [
        {
            xtype       : 'customForm',
            items: [
                {
                    fieldLabel  : 'Nombre de la categoria',
                    name        : 'category_name'
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