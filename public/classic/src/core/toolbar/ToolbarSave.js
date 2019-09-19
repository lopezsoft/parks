Ext.define('Admin.core.toolbar.ToolbarSave',{
	extend	: 'Admin.core.toolbar.CustomToolbar',
	alias 	: 'widget.toolbarSave',
	frmBind	: true,
	requires: [
		'Admin.core.button.ExportButton'
    ],
	itemId	: 'toolbarSave',
	dock	: 'bottom',
	items 	: [
		{
			xtype	: 'facebookButton'
		},
		{
			xtype	: 'youtubeButton'
		},
		'->',
        {
        	xtype	: 'saveButton',
			iconAlign	: 'left',
			handler		: function (btn) {
                if (btn.up('window')) {
                    btn.up('window').onSave(btn);
				} else if (btn.up('form')) {
					btn.up('form').onSave(btn);
				}			
			}
        },'-',
        {
        	xtype	: 'closeButton',
			iconAlign: 'left',
			handler: function (btn) {
				var me = Admin.getApplication();
				if (btn.up('window')) {
					me.onCloseWin(btn);
				} else if (btn.up('form')) {
					btn.up('form').closeForm(btn);
				}	
			}
        }
	],
	listeners: {
		afterrender: function(tool,eOpts){
			if (tool.down('#saveButton')){
				tool.down('#saveButton').formBind = tool.frmBind;
			}
		}
	}
});
