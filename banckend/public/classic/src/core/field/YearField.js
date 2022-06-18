Ext.define('Admin.core.field.YearField',{
	extend	: 'Admin.core.field.NumberField',
	allowBlank	: false,
	name		: 'año',
	value		: new Date().getFullYear(),
	maxValue	: 2030,
	minValue	: 1950,
	alias		: 'widget.yearField',
	hideTrigger	: false,
	tooltip     : 'Año lectivo',
	// itemId      : 'yearField',
	labelAlign	: 'top',
	fieldLabel	: 'Año'
});