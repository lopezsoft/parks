Ext.define('Admin.core.combo.ComboCountries',{
	extend	: 'Admin.core.combo.CustomComboBox',
	alias	: 'widget.combocountries',
	fieldLabel	: 'País o Nación de origen',
    emptyText 	: 'Elija un País',
    requires: [
        'Admin.store.general.CountryStore'
    ],
    name		: 'id_country',
    displayField: 'country_name',
    valueField	: 'id',
    store		: 'CountryStore',
    autoLoadOnValue : true
});
