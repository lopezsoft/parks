Ext.define('Admin.core.field.NumberField',{
	extend	: 'Ext.form.field.Number',
	minValue 	: 0,
	maxValue	: 1000000000,
	allowDecimals 	: true,
	decimalSeparator:'.',
	hideTrigger		: true,
    keyNavEnabled	: false,
    mouseWheelEnabled	: false,
    labelAlign	: 'top',
    labelStyle	: 'font-weight:bold',
    width 		: '100%',
	allowBlank 	: false,
	alias		: 'widget.numberField',
	selectOnFocus  : true,
	formatter	: 'usMoney',
	tooltip 	: '',
	emptyText 	: 'Digite los datos',
	labelWidth	: 180,
    listeners: {
	    'focus' : function (textField, event, eOpts) {
	        var me = this;
	        if (!Ext.isEmpty(this.tooltip)) {
	            new Ext.ToolTip({
	                target : this.id,
	                trackMouse : true,
	                maxWidth : 300,
	                minWidth : 100,
	                minHeight: 5,
	                html : '<p align="justify">'+this.tooltip +'</p>'
	            });
	        }
	    }
	}
});