Ext.define('Admin.core.field.TextAreaField',{
	extend 		: 'Ext.form.field.TextArea',
    name      	: 'message',
    width    	: '100%',
    allowBlank 	: false,
	alias		: 'widget.textAreaField',
	selectOnFocus  : true,
    tooltip 	: '',
    emptyText 	: 'Digite los datos',
    labelAlign	: 'top',
	labelStyle	: 'font-weight:bold',
	labelWidth	: 180,
	msgTarget	: 'side',
	resizable	: false,
	grow		: true,
	shim		: true,
	growMin		: 40,
    listeners: {
	    'focus' : function (TextAreaField, event, eOpts) {
	        var me = this;
	        if (!Ext.isEmpty(this.tooltip)) {
	            new Ext.ToolTip({
	                target : this.id,
	                trackMouse : true,
	                maxWidth : 300,
	                minWidth : 100,
	                html : '<p align="justify">'+ this.tooltip +'</p>'
	            });
	        }
	    }
	}
});