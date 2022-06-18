Ext.define('Admin.core.combo.ComboExpand',{
	extend 	: 'Admin.core.combo.CustomComboBox',
	alias	: 'widget.ComboExpand',
	queryMode 	: 'local',
	listeners   : {
		focusenter	: function( cb, event, eOpts ){
				this.expand();		
		}
	}	
});