Ext.define('Admin.core.combo.ComboServices',{
	extend	: 'Admin.core.combo.CustomComboBox',
	alias	: 'widget.comboservices',
	fieldLabel	: 'Servicio',
    emptyText 	: 'Elija un servicio',
    requires: [
        'Admin.store.sales.ServicesStore'
    ],
    name		: 'id_time',
    displayField: 'time_name',
    valueField	: 'id',
    store		: 'ServicesStore',
    autoLoadOnValue : true
});
