Ext.define('Admin.core.combo.ComboCategories',{
	extend	: 'Admin.core.combo.CustomComboBox',
	alias	: 'widget.combocategories',
	fieldLabel	: 'Categoria de producto',
    emptyText 	: 'Elija una categoria',
    requires: [
        'Admin.store.products.CategoriesStore'
    ],
    name		: 'id_category',
    displayField: 'category_name',
    valueField	: 'id',
    store		: 'CategoriesStore',
    autoLoadOnValue : true
});
