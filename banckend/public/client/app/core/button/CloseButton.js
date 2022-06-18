Ext.define('Admin.core.button.CloseButton',{
	extend	: 'Admin.core.button.CustomButton',
	alias	: 'widget.closeButton',
	itemId	: 'closeButton',
    iconCls	: 'x-fa fa-arrow-circle-left',
    handler: function (btn) {
        var me = Admin.getApplication();
        if (btn.up('window')) {
            me.onCloseWin(btn);
        } else if (btn.up('form')) {
            btn.up('form').closeForm(btn);
        }
    },
    tooltip	    : 'Cerrar y volver a la ventana anterior',
    text        : 'Cerrar',
    iconAlign	: 'left'
});
