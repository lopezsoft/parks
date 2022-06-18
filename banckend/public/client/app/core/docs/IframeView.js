/**
 * Created by LOPEZSOFT2 on 24/04/2017.
 */
Ext.define('Admin.core.docs.IframeView',{
    extend  : 'Admin.core.base.CustomWindow',
    alias   : 'widget.iframeView',
    closable        : false,
    iconCls			: '',
    constrainHeader	: false,
    fixed           : true,
    hideShadowOnDeactivate : false,
    animateShadow   : true,
    border      : false,
    resizable   : true,
    bodyBorder  : false,
    width       : 600,
    height      : 450,
    maximizable : false,
    header      : false,
    // alwaysOnTop	: true,
    constructor : function (config) {
        var me  = this;
        Ext.apply(me.config, config);
        this.callParent(arguments);
        me.on('cancel',function (me) {

        });
        return me;
    },
    dockedItems: [
        {
            xtype	: 'toolbar',
            dock	: 'top',
            items   : [
                ,'->',
                {
                    xtype   : 'customButton',
                    iconCls :'x-fa fa-sign-out',
                    iconAlign   : 'left',
                    text    : 'Cerrar',
                    cls     : 'button-close',
                    handler: function (btn) {
                        Admin.getApplication().onClose(btn);    
                    }
                }
            ]
        }
    ]
});