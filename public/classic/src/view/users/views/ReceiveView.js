Ext.define('Admin.view.users.views.ReceiveView',{
    extend : 'Admin.core.base.WindowCrud',
    xtype   : 'receiveview',
    alias   : 'widget.receiveview',
    controller : 'users',
    closeAction 	: 'hide',
    initComponent: function () {
        this.callParent(arguments);
        this.setTitle('Cobrar Venta');
        this.on('receive', function(btn){

        });
    },
    maxWidth    : 450,
    alwaysOnTop : true,
    defaultFocus: 'numberField',
    items: [
        {
            xtype       : 'customForm',
            defaultType : 'numberField',
            defaultFocus: 'numberField',
            defaults    : {
                fieldStyle          : {
                    height          : '48px',
                    'font-weight'   : 'bold',
                    'font-size'     : '32px',
                    color           : 'red',
                    'text-align'    : 'right'
                }
            },
            items: [
                {
                    fieldLabel  : 'Total',
                    name        : 'total',
                    itemId      : 'total',
                    readOnly    : true,
                    listeners   : {
                        change : function (ts, nv, ov) {
                            ts.up('window').onCalcule(ts);
                        }
                    }
                },
                {
                    fieldLabel  : 'Descuento',
                    itemId      : 'discount',
                    name        : 'discount', 
                    alias       : 'widget.discount',
                    allowBlank  : true,
                    listeners   : {
                        change : function (ts, nv, ov) {
                            ts.up('window').onCalcule(ts);
                        }
                    }
                },
                {
                    fieldLabel  : 'Valor a pagar',
                    itemId      : 'value_to_pay',
                    name        : 'value_to_pay',
                    readOnly    : true
                },
                {
                    fieldLabel  : 'Valor pagado',
                    itemId      : 'value_paid',
                    name        : 'value_paid',
                    listeners   : {
                        change : function (ts, nv, ov) {
                            ts.up('window').onCalcule(ts);
                        }
                    }
                },
                {
                    fieldLabel  : 'Cambio',
                    itemId      : 'change',
                    readOnly    : true,
                    name        : 'change'   
                }
            ],
            dockedItems: [{
                xtype		: 'toolbarSave',
                dock	: 'bottom',
                items 	: [
                    '->',
                    {
                        xtype	    : 'saveButton',
                        iconAlign	: 'left',
                        text        : 'Guardar cobro',
                        handler		: function (btn) {
                            var 
                                win = btn.up('window');
                            win.fireEvent('receive',btn);
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
                ]
            }]
        }
    ],
    onCalcule : function(btn){
        var me      = this,
            total   = parseFloat(me.down('#total').getValue()),
            discount= me.down('#discount').getValue() ? parseFloat(me.down('#discount').getValue()) : 0,
            value_to_pay    = total - discount,
            value_paid      = me.down('#value_paid').getValue() ? parseFloat(me.down('#value_paid').getValue()) : 0;

            me.down('#value_to_pay').setValue( value_to_pay );
            // if(value_paid == 0){
            //     me.down('#value_paid').setValue(value_to_pay);
            // }
            value_paid      = parseFloat(me.down('#value_paid').getValue());
                        
            me.down('#change').setValue( value_paid - value_to_pay);
    }
});