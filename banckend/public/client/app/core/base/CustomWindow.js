Ext.define('Admin.core.base.CustomWindow' ,{
    extend: 'Ext.window.Window',
    requires: [
        'Ext.grid.filters.Filters'
    ],
    ui      :'win-blue',
    alias   : 'widget.customWindow',
    modal	: true,
    width	: 600,
    border	: true,
    iconCls			: 'x-fa fa-cloud',
    animCollapse	: false,
    constrainHeader	: true,
    layout			: 'fit',
    title			: 'Custom window',
    maximizable     : true,
    defaultFocus    : 'TextField',
    listeners       : {

        'resize' : function (win, width, height, eOpts ) {

            // TODO: Redefinir comportamientos segun el tamaño de la ventana
            me  = Admin.getApplication().getMainView().width;

            if (me<=780){
                win.maximized   = true ;
                win.maximizable = false
            }

        }
    }
 });