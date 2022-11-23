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
    defaultFocus: 'currencyField',
    items: [
        {
            xtype       : 'customForm',
            defaultType : 'currencyField',
            defaultFocus: 'currencyField',
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
                        change : function (ts) {
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
                        change : function (ts) {
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
                    fieldLabel  : 'Efectivo',
                    itemId      : 'value_paid',
                    name        : 'value_paid',
                    hasFocus    : true,
                    listeners   : {
                        change : function (ts) {
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
            listeners   : {
                afterrender : function(ts){
                    var comp    = ts.getComponent('value_paid');
                    if (comp) {
                        comp.focusEl.dom.focus();
                    }
                }
            },
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
    onCalcule : function(){
        var me      = this;
        var
            total           = parseFloat(me.down('#total').getValue()),
            discount        = me.down('#discount').getValue() ? parseFloat(me.down('#discount').getValue()) : 0,
            value_to_pay    = total - discount,
            value_paid      = me.down('#value_paid').getValue() ? parseFloat(me.down('#value_paid').getValue()) : 0;
        
            me.down('#value_to_pay').setValue( value_to_pay );
            if(value_paid > 0){
                me.down('#change').setValue( value_paid - value_to_pay);
            }else {
                me.down('#change').setValue(0);
            }

    }
});
