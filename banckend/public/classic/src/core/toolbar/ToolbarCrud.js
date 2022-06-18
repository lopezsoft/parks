Ext.define('Admin.core.toolbar.ToolbarCrud',{
	extend	: 'Admin.core.toolbar.CustomToolbar',
	alias 	: 'widget.toolbarCrud',
	requires: [
        'Admin.core.button.ButtonsCrud',
        'Admin.core.button.CloseButton'
    ],
	itemId	: 'toolbarCrud',
	items 	: [
		'->',
        {
        	xtype	: 'addButton'
        },'-',
        {
        	xtype	: 'editButton'
        },'-',
		{
			xtype	: 'deleteButton'
		},'-',
        {
			xtype 	: 'closeButton'
		}
		// ,'-','->',
		// {
		// 	xtype	: 'printButton'
		// },
		// {
		// 	xtype	: 'facebookButton'
		// },
		// {
		// 	xtype	: 'youtubeButton'
		// }
	]
});