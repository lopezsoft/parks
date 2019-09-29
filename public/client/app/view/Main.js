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
                    autoLoad: false,
                    columns: [
                        { text: 'Servicio', dataIndex: 'shoe_name', flex : 2 },
                        { text: 'Precio', dataIndex: 'price', flex: 1, formatter : 'usMoney' }
                    ],
                    listeners: {
                        selectionchange: function(grid, selected, eOpts) {
                            var me	= this;
                            me.up('form').onSuma(grid);
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
                    margin  : '0 0 0 5',
                    autoLoad: false,
                    columns: [
                        { text: 'Servicio', dataIndex: 'shoe_name', flex : 2 },
                        { text: 'Precio', dataIndex: 'price', flex: 1, formatter : 'usMoney' }
                    ],
                    listeners: {
                        selectionchange: function(grid, selected, eOpts) {
                            var me	= this;
                            me.up('form').onSuma(grid);
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
            xValue  = me.down('#gridTime').getSelection(),
            xData   = [],
            params  = AuthToken.recoverParams();
            app     = Admin.getApplication(), 
            yValue  = me.down('#gridSer').getSelection();
        
        if (yValue.length > 0) {
            Ext.Array.each(yValue, function(data, index) {
                xData.push(data.data);
            });
        }
        if (xValue.length > 0) {
            Ext.Array.each(xValue, function(data, index) {
                xData.push(data.data);
            });
        }
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
            xValue  = me.down('#gridTime').getSelection(),
            xSum    = 0,
            yValue  = me.down('#gridSer').getSelection();
        
        if (yValue.length > 0) {
            Ext.Array.each(yValue, function(data, index) {
                xSum    += parseFloat(data.data.price);
            });
        }
        if (xValue.length > 0) {
            Ext.Array.each(xValue, function(data, index) {
                xSum    += parseFloat(data.data.price);
            });
        }
        me.down('#total').setValue(Ext.util.Format.usMoney(xSum));
    }
});
