Ext.define('Admin.core.combo.ComboBranchOffices',{
	extend	: 'Admin.core.combo.CustomComboBox',
	alias	: 'widget.combobranchoffices',
	fieldLabel	: 'Sucursal',
    emptyText 	: 'Elija una sucursal',
    requires: [
        'Admin.store.company.BranchOfficesStore'
    ],
    name		: 'id_branch',
    displayField: 'full_name',
    valueField	: 'id',
    store		: 'BranchOfficesStore',
    autoLoadOnValue : true
});
