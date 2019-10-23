Ext.define('Admin.core.combo.ComboTypeUsers',{
	extend	: 'Admin.core.combo.CustomComboBox',
	alias	: 'widget.combotypeusers',
	fieldLabel	: 'Tipo de usuario',
    emptyText 	: 'Elija un tipo de usuario',
    requires: [
        'Admin.store.general.TypeUsersStore'
    ],
    name		: 'type',
    displayField: 'user_type_name',
    valueField	: 'id',
    store		: 'TypeUsersStore',
    autoLoadOnValue : true
});
