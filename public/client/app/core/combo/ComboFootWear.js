Ext.define('Admin.core.combo.ComboFootWear',{
	extend	: 'Admin.core.combo.CustomComboBox',
	alias	: 'widget.combofootwear',
	fieldLabel	: 'Calcetín',
    emptyText 	: 'Elija un calcetín',
    requires: [
        'Admin.store.sales.FootWearStore'
    ],
    name		: 'id_footwear',
    displayField: 'shoe_name',
    valueField	: 'id',
    store		: 'FootWearStore',
    autoLoadOnValue : true
});
