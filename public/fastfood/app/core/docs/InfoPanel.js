/**
 * @class Ext.chooser.InfoPanel
 * @extends Ext.panel.Panel
 * @author Ed Spencer
 * 
 * This panel subclass just displays information about an image. We have a simple template set via the tpl property,
 * and a single function (loadRecord) which updates the contents with information about another image.
 */
Ext.define('Admin.core.docs.InfoPanel', {
    extend  : 'Ext.panel.Panel',
    alias   : 'widget.infopanel',
    id      : 'img-detail-panel',
    bodyPadding		: 2,
    width   : 450,
    minWidth: 300,
    items   : [
        {
            xtype   : 'customGrid',
            // title   : '',
            itemId  : 'gridFoot',
            store   : 'ProductsSalesStore',
            autoLoad: false,
            columns: [
                { text: 'Cant', dataIndex: 'cant', width : 50, menuDisabled : true },
                { text: 'Detalle', dataIndex: 'product_name', flex : 1, menuDisabled : true },
                { text: 'Precio', dataIndex: 'price', width: 100, formatter : 'usMoney', menuDisabled : true },
                { text: 'Total', dataIndex: 'total', width: 100, formatter : 'usMoney', menuDisabled : true }
            ],
            dockedItems: [
                {
                    xtype		: 'customToolbar',
                    items   : [
                        '->', 
                        {
                            iconCls		: 'fas fa-chevron-up',
                            iconAlign	: 'left',
                            // scale       : 'large',
                            disabled    : true,
                            cls         : 'button-up-down',
                            itemId      : 'upButton',
                            handler : function (btn) {
                                btn.up('form').onPrevious(btn);
                            }
                        },'-',
                        {
                            iconCls		: 'fas fa-chevron-down',
                            iconAlign	: 'left',
                            // scale       : 'large',
                            disabled    : true,
                            cls         : 'button-up-down',
                            itemId      : 'downButton',
                            handler : function (btn) {
                                btn.up('form').onNext(btn);
                            }
                        },'-',
                        {
                            iconCls		: 'fas fa-trash-alt',
                            tooltip     : 'Eliminar producto seleccionado',
                            iconAlign	: 'left',
                            // scale       : 'large',
                            disabled    : true,
                            cls         : 'button-delete',
                            itemId      : 'deleteButton',
                            handler : function (btn) {
                                btn.up('form').onDelete(btn);
                            }
                        },'-',
                        {
                            iconCls		: 'fas fa-print',
                            tooltip     : 'Guarda el predido y genera el PRE-TICKET de venta.',
                            cls         : 'button-print',
                            text        : 'Aceptar',
                            iconAlign	: 'left',
                            // scale       : 'large',
                            handler : function (btn) {
                                btn.up('form').onTiket(btn);
                            }
                        },'-',
                        {
                            iconCls		: 'fas fa-broom',
                            cls         : 'button-close',
                            iconAlign	: 'left',
                            text        : 'Cancelar',
                            tooltip     : 'Cancela el pedido y limpia la venata.',
                            // scale       : 'large',  
                            handler : function (btn) {
                                btn.up('form').onClearGrid(btn);
                            }
                        }
                    ]
                },
                {
                    xtype		: 'customToolbar',
                    items   : [
                        '->', 
                        {
                            iconCls		: 'fas fa-plus',
                            tooltip     : 'Agregar más cantidad al producto seleccionado.',
                            iconAlign	: 'left',
                            scale       : 'large',
                            cls         : 'button-plus',
                            disabled    : true,
                            itemId      : 'plusButton',
                            handler : function (btn) {
                                btn.up('form').onPlus(btn);
                            }
                        },
                        {
                            iconCls		: 'fas fa-minus',
                            tooltip     : 'Quitar cantidad al producto seleccionado',
                            iconAlign	: 'left',
                            scale       : 'large',
                            itemId      : 'minusButton',
                            cls         : 'button-close',
                            disabled    : true,
                            handler : function (btn) {
                                btn.up('form').onMinus(btn);
                            }
                        },'-',
                        {
                            xtype           : 'customText',
                            labelAlign	    : 'left',
                            itemId          : 'total',
                            name            : 'total',
                            emptyText       : 'Total a pagar',
                            readOnly        : true,
                            allowBlank      : true,
                            width           : 300,
                            fieldStyle            : {
                                height          : '48px',
                                'font-weight'   : 'bold',
                                'font-size'     : '32px',
                                color           : 'red',
                                'text-align'    : 'right'
                            },
                            disabledCls     : 'class-text'
                        }
                    ]
                }
            ]
        }
    ],

    onSuma : function (ojb){
        var me      = this,
            zStore  = this.down('grid').getStore(),
            xSum    = 0;

        zStore.each(function(d, index){
            xSum    += parseFloat(d.data.total);
        });
        
        me.down('#total').setValue(Ext.util.Format.usMoney(xSum));
    },
    
    afterRender: function(){
        this.callParent();
        if (!Ext.isWebKit) {
            this.el.on('click', function(){
                alert('Los ejemplos de Sencha Touch están diseñados para funcionar en los navegadores WebKit. Es posible que no se muestren correctamente en otros navegadores.');
            }, this, {delegate: 'a'});
        }    
    },

    /**
     * Loads a given image record into the panel. Animates the newly-updated panel in from the left over 250ms.
     */
    loadRecord: function(record) {
        var 
            yStore  = this.down('grid').getStore(),
            value   = {},
            r       = {};
        if(yStore){
            if(yStore.getCount() > 0 ){
                r   = yStore.findRecord('id',record.data.id);
                if (r) {
                    value       = record.data;
                    if(value.cant){
                        value.cant  = 1 + parseInt(value.cant);
                        value.total = parseInt(value.cant) * parseFloat(record.data.price);
                        r.set(value);
                        r.commit();
                    }
                } else {
                    value       = record.data;
                    value.cant  = 1;
                    value.total = parseFloat(record.data.price);
                    yStore.insert(0, value);
                }
            }else{
                value       = record.data;
                value.cant  = 1;
                value.total = parseFloat(record.data.price);
                yStore.insert(0, value);
            }
            this.onSuma();
        }
    }
});