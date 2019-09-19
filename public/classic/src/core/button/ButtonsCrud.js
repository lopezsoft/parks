Ext.define('Admin.core.button.ButtonsCrud',{
	extend	: 'Admin.core.button.CustomButton',
	alias	: 'widget.addButton',
    itemId	: 'addButton',
    iconCls	: 'x-fa fa-plus',
    text	: 'Nuevo',
    tooltip	: 'Permite agregar un nuevo registro en la base de datos',
    ui		: 'soft-blue',
    iconAlign: 'left',
    handler: function (btn) {
        if (btn.up('window')) {
            btn.up('window').showWindow(btn);
        } else if(btn.up('form')) {
            btn.up('form').showWindow(btn);
        }
    }
});

Ext.define('Admin.core.button.EditButton',{
	extend	: 'Admin.core.button.CustomButton',
	alias	: 'widget.editButton',
    itemId	: 'editButton',
    text	: 'Editar',
    iconCls	: 'x-fa fa-pencil',
    tooltip	: 'Permite editar el registro seleccionado',
    disabled	: true,
    ui		    : 'soft-green',
    iconAlign	: 'left',
    handler: function (btn) {
        if (btn.up('window')) {
            btn.up('window').showWindow(btn);
        } else if(btn.up('form')) {
            btn.up('form').showWindow(btn);
        }
    }    
});

Ext.define('Admin.core.button.DeleteButton',{
	extend	: 'Admin.core.button.CustomButton',
	alias	: 'widget.deleteButton',
    itemId	: 'deleteButton',
    iconCls	: 'x-fa fa-minus',
    text	: 'Borrar',
    tooltip	: 'Permite borrar de la base de datos el registro seleccionado',
    disabled: true,
    handler : 'onGridDelete',
    ui		: 'soft-red',
    iconAlign	: 'left'
});

Ext.define('Admin.core.button.FacebookButton',{
    extend	: 'Admin.core.button.CustomButton',
    alias	: 'widget.facebookButton',
    itemId	: 'facebookButton',
    iconCls	: 'x-fa fa-facebook-official',
    tooltip	: 'Ayuda en Facebook',
    ui      : 'facebook',
    href    : 'https://www.facebook.com/lopezsoft.com.co/videos'
});

Ext.define('Admin.core.button.YoutubeButton',{
    extend	: 'Admin.core.button.CustomButton',
    alias	: 'widget.youtubeButton',
    itemId	: 'youtubeButton',
    iconCls	: 'x-fa fa-youtube-square',
    tooltip	: 'Ayuda en YouTube',
    ui      : 'soft-red',
    href    : 'https://www.youtube.com/playlist?list=PLdooI-heLtt0KSrRLrcT8dO2R5MFqJSYU'
});



