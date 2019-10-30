Ext.define('Admin.view.Main',{
    extend      : 'Admin.core.forms.CustomForm',
    alias       : 'widget.Main',
    viewModel   : 'main',
    alias       : 'widget.formview',
    initComponent: function () {
        var client  = ''
            token   = AuthToken.recoverParams(),
            report  = AuthToken.recoverReport();
        if (token) {
            client  = 'CLIENTE: ' + token.user.first_name+ ' ' + token.user.last_name;
        };
        this.callParent(arguments);
        this.setTitle('SERVICIOS - ' + client);
        if(report){
            Admin.getApplication().getIframe(report,'pdf');
            // this.openForPrint(report);
        }
    },
    layout: 'hbox',
    defaults: {
        border: false,
        xtype: 'panel',
        flex: 1,
        layout: 'anchor'
    },
    items: [
        {   
            items: [
                {
                    xtype   : 'customGrid',
                    title   : 'CALCETINES',
                    itemId  : 'gridSer',
                    store   : 'SalesFootWearStore',
                    plugins: {
                        ptype       : 'cellediting',
                        clicksToEdit: 1
                    },
                    selModel: {
                        type: 'cellmodel'
                    },
                    autoLoad: false,
                    columns: [
                        { text: 'Cant', dataIndex: 'cant', width : 70, 
                            editor: {
                                xtype       : 'numberfield',
                                value       : 1,
                                maxValue    : 999,
                                allowBlank  : false,
                                minValue    : 0,
                                listeners   : {
                                    change : function(ts, newValue){
                                        var me	= this;
                                        me.up('form').onSuma(ts);
                                    }
                                }
                            }
                        },
                        { text: 'Servicio', dataIndex: 'shoe_name', flex : 2 },
                        { text: 'Precio', dataIndex: 'price', flex: 1, formatter : 'usMoney' },
                        { text: 'Total', dataIndex: 'total', flex: 1, formatter : 'usMoney' }
                    ],
                    listeners: {
                        edit : function(editor, e){
                            e.record.commit();
                            var me	= this;
                            me.up('form').onSuma(editor);
                        },
                        rowdblclick :  function(ts , record){
                            record.data.cant = parseInt(record.data.cant) + 1;
                            record.commit();
                            ts.up('form').onSuma(ts);
                        }
                    }
                }
            ]
        },
        { 
            items: [
                {
                    xtype   : 'customGrid',
                    title   : 'TIEMPO',
                    itemId  : 'gridTime',
                    store   : 'SalesServicesStore',
                    plugins: {
                        ptype       : 'cellediting',
                        clicksToEdit: 1
                    },
                    selModel: {
                        type: 'cellmodel'
                    },
                    margin  : '0 0 0 5',
                    autoLoad: false,
                    columns: [
                        { text: 'Cant', dataIndex: 'cant', width : 70, 
                        editor: {
                            xtype       : 'numberfield',
                            value       : 1,
                            maxValue    : 999,  
                            allowBlank  : false,
                            minValue    : 0,
                            listeners   : {
                                change : function(ts, newValue){
                                    var me	= this;
                                    me.up('form').onSuma(ts);
                                }
                            }
                        }},
                        { text: 'Servicio', dataIndex: 'shoe_name', flex : 2 },
                        { text: 'Precio', dataIndex: 'price', flex: 1, formatter : 'usMoney' },
                        { text: 'Total', dataIndex: 'total', flex: 1, formatter : 'usMoney' }
                    ],
                    listeners: {
                        edit : function(editor, e){
                            e.record.commit();
                            var me	= this;
                            me.up('form').onSuma(editor);
                        },
                        rowdblclick :  function(ts , record){
                            record.data.cant = parseInt(record.data.cant) + 1;
                            record.commit();
                            ts.up('form').onSuma(ts);
                        }
                    }
                }
            ]
        }
    ],
    listeners  : {
        afterrender : function (r,t) {
            var
                xStore  = Ext.getStore('SalesServicesStore'),
                zStore  = Ext.getStore('SalesFootWearStore');
            if(!report){
                xStore.reload({
                    callback : function(r) {
                        zStore.reload();
                    }
                });
            }
        }
    },
    dockedItems: [
        {
            xtype		: 'customToolbar',
            items   : [
                '->', 
                {
                    xtype       : 'customButton',
                    iconCls		: 'fas fa-print',
                    text        : 'Guardar e imprimir',
                    cls         : 'button-print',
                    userCls     : 'button-print',
                    scale       : 'large',
                    handler : function (btn) {
                        btn.up('form').onTiket(btn);
                    }
                },'-',
                {
                    xtype       : 'customButton',
                    iconCls		: 'fas fa-sign-out-alt',
                    cls         : 'button-close',
                    text        : 'Cancelar',
                    scale       : 'large',  
                    handler : function (btn) {
                        Admin.getApplication().onClose(btn);
                    }
                }
            ]
        },
        {
            xtype		: 'customToolbar',
            items   : [
                '->', 
                {
                    xtype           : 'customText',
                    labelAlign	    : 'left',
                    itemId          : 'total',
                    name            : 'total',
                    emptyText       : 'Total a pagar',
                    readOnly        : true,
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
        },
        {
            xtype		: 'customToolbar',
            items   : [
                {
                    xtype   : 'image',
                    height  : 156,
                    src     : Global.getUrlBase() +  'assets/img/footwear.gif'
                }
            ]
        }
    ],
    openForPrint : function(fileSrc) {
        console.log(fileSrc);
        Ext.DomHelper.append(document.body, {
            tag : 'iframe',
            name : 'printIframe',
            src : '?userAction=actionPrint&tmpFileName='+fileSrc
        });
    },
    onTiket : function (btn) {
        var me      = this,
            xValue  = me.down('#gridTime').getStore(),
            xData   = [],
            params  = AuthToken.recoverParams();
            app     = Admin.getApplication(), 
            yValue  = me.down('#gridSer').getStore();
        
        yValue.each(function(re,ind){
            if (parseInt(re.data.cant) > 0 ) {
                xData.push(re.data);
            }
        });

        xValue.each(function(re,ind){
            if (parseInt(re.data.cant) > 0 ) {
                xData.push(re.data);
            }
        });
        
        if(xData.length > 0){
            Ext.Ajax.request({
                url     : Global.getUrlBase() + 'api/report/getticketservices',
                headers: {
                    'Authorization ' : params.token_type +' ' + params.access_token
                },
                method      : 'GET',
                params      : {
                    records : JSON.stringify(xData),
                    user    : params.user.id
                },
                success: function(r, opts) {
                    obj = Ext.decode(r.responseText);
                    if(obj.success == true){
                        var url = Global.getUrlBase() + obj.records.report;
                        app.showResult('Se ha realizado el pedido correctamente.');
                        AuthToken.saveReport(url);
                        app.getIframe(url,'pdf');
                    }else{
                        app.showResult('Ocurrio un error al generar el ticket.');
                    }
                },
                failure: function(response, opts) {
                    app.showResult('server-side failure with status code ' + response.status);
                }
            });
        }else{
            app.showResult('No hay servicios que guardar');
        }
    },

    onSuma (ojb){
        var me      = this,
            xStore  = me.down('#gridTime').getStore(),
            xSum    = 0,
            yStore  = me.down('#gridSer').getStore();
        
        xStore.each(function(re, ind){
            value   = re.data;
            if (parseInt(re.data.cant) > 0) {
                xSum    += parseInt(re.data.cant) *  parseFloat(re.data.price);
                value.total = parseInt(re.data.cant) *  parseFloat(re.data.price);
                re.set(value);   
                re.commit();
            }else{
                value.total = 0;
                re.set(value);   
                re.commit();
            }
        });

        yStore.each(function(re, ind){
            value   = re.data;
            if (parseInt(re.data.cant) > 0) {
                xSum    += parseInt(re.data.cant) *  parseFloat(re.data.price);
                value.total = parseInt(re.data.cant) *  parseFloat(re.data.price);
                re.set(value);   
                re.commit();
            }else{
                value.total = 0;
                re.set(value);   
                re.commit();
            }
        });

        me.down('#total').setValue(Ext.util.Format.usMoney(xSum));
    }
});
