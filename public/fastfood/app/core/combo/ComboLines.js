Ext.define('Admin.core.combo.ComboLines',{
	extend	: 'Admin.core.combo.CustomComboBox',
	alias	: 'widget.combolines',
	fieldLabel	: 'Línea de producto',
    emptyText 	: 'Elija una línea de producto',
    requires: [
        'Admin.store.products.LinesStore'
    ],
    name		: 'id_line',
    displayField: 'line_name',
    valueField	: 'id',
    store		: 'LinesStore',
    autoLoadOnValue : true
});
