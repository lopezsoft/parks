Ext.define('Admin.core.field.CustomDate',{
	extend : 'Ext.form.field.Date',
	labelAlign	: 'top',
    labelStyle	: 'font-weight:bold',
    width 		: '99%',
	allowBlank 	: false,
	alias		: 'widget.customDate',
	selectOnFocus  : true,
	msgTarget	: 'side',
	value		: new Date(),
	fieldLabel	: 'Fecha',
	format 		: 'Y-m-d',
	tooltip : ''
});