Ext.define('Admin.view.settings.views.ConfInvoiceView',{
    extend : 'Admin.core.base.WindowCrud',
    xtype   : 'confinvoiceview',
    alias   : 'widget.confinvoiceview',
    controller      : 'settings',
    closeAction 	: 'hide',
    initComponent: function () {
        this.callParent(arguments);
        this.setTitle('Agregar/Editar Datos del tickets');
    },
    store   : 'ConfInvoiceStore',
    maxWidth: 550,    
    items: [
        {
            xtype       : 'customForm',
            margin      : 5,
            items: [
                {
                    xtype       : 'customTab',
                    frame       : true,
                    defaults: {
                        bodyPadding: 5,
                        scrollable: true,
                        layout: {
                            type: 'column',
                            columnCount: 1
                        },
                        defaults: {
                            columnWidth: 1
                        }
                    },
                    items : [
                        {
                            title   : 'Encabezado',
                            items : [
                                {
                                    xtype       : 'combobranchoffices'
                                },
                                {
                                    xtype       : 'textAreaField',
                                    fieldLabel  : 'Linea 1',
                                    name        : 'headerline1'
                                },
                                {
                                    xtype       : 'textAreaField',
                                    fieldLabel  : 'Linea 2',
                                    allowBlank  : true,
                                    name        : 'headerline2'
                                },
                                {
                                    xtype       : 'checkBoxField',
                                    fieldLabel  : 'Imprimir código de barras',
                                    labelWidth	: 360,
                                    name        : 'print_barcode'
                                },
                                {
                                    xtype       : 'checkBoxField',
                                    labelWidth	: 360,
                                    fieldLabel  : 'Imprimir código del producto',
                                    name        : 'show_code'
                                },
                                {
                                    xtype       : 'checkBoxField',
                                    labelWidth	: 360,
                                    fieldLabel  : 'Imprimir IVA',
                                    name        : 'show_iva'
                                },
                                {
                                    xtype       : 'customText',
                                    fieldLabel  : 'Prefijo',
                                    allowBlank  : true,
                                    name        : 'prefix'
                                },
                                {
                                    xtype       : 'numberField',
                                    fieldLabel  : 'Número inicial del tickets',
                                    allowBlank  : false,
                                    name        : 'initial_number'
                                }
                            ]
                        },
                        {
                            title   : 'Pie de página',
                            items : [
                                {
                                    xtype       : 'textAreaField',
                                    fieldLabel  : 'Linea 1',
                                    allowBlank  : true,
                                    name        : 'footline1'
                                },
                                {
                                    xtype       : 'textAreaField',
                                    fieldLabel  : 'Linea 2',
                                    allowBlank  : true,
                                    name        : 'footline2'
                                },
                                {
                                    xtype       : 'textAreaField',
                                    fieldLabel  : 'Linea 3',
                                    allowBlank  : true,
                                    name        : 'footline3'
                                },
                                {
                                    xtype       : 'textAreaField',
                                    fieldLabel  : 'Linea 4',
                                    allowBlank  : true,
                                    name        : 'footline4'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});