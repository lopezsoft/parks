Ext.define('Admin.view.sales.SalesController',{
    extend : 'Admin.core.base.BaseController',
    alias : 'controller.sales',

    onCashSessions : function (btn) {
      var 
        app     = Admin.getApplication();

        app.onStore('general.CashSessionsStore');
        win = Ext.create('Admin.view.sales.forms.CashSessionsView');
        win.show();
    },
    onReCashClosing : function(btn){
        this.onRePrint(btn, 1);
    },

    onCashClosing : function(btn){
        var 
            app     = Admin.getApplication(),
            me      = this,
            win     = btn.up('form'),
            token   = AuthToken.recoverParams();
        if (token.user.type == 1) { // User administrator
            me.onPrint(btn, 1);
        }else{
            store   = Ext.getStore('PreTicketsStore');
            if(!store){
                app.onStore('general.PreTicketsStore');
                store   = Ext.getStore('PreTicketsStore');
            }
            if(store){
                win.mask('Cargando PRE-TICKETS');
                store.reload({
                    scope: this,
                    callback: function (records, operation, success) {
                        win.unmask();
                        if (records.length > 0) {                            
                            app.showResult('Hay PRE-TICKETS pendientes por cobrar.');
                        }else{
                            Ext.Msg.show({
                                title	: 'Cerrar caja',
                                message	: '¿Seguro que desea cerrar la caja?. Esta opción cerrará la sesión y no permitirá realizar más ventas al usuario.',
                                buttons	: Ext.Msg.YESNO,
                                icon	: Ext.Msg.QUESTION,
                                fn: function(xbtn) {
                                    if (xbtn === 'yes') {
                                        me.onVerify(btn, 1);         
                                    }
                                }
                            }); 
                        }
                    }
                });
            }
        }
    },
    onCashCount : function(btn){
        var 
            app     = Admin.getApplication(),
            me      = this,
            token   = AuthToken.recoverParams();
        if (token.user.type == 1) { // User administrator
            me.onPrint(btn, 2);
        }else{
            me.onVerify(btn, 2);
        }
    },

    onVerify : function(btn, type){
        var 
            app     = Admin.getApplication(),
            me      = this,
            token   = AuthToken.recoverParams();
        Ext.require([
            'Admin.view.auth.Login'
        ]);

        Ext.onReady(function(){
            win = Ext.create('Admin.view.auth.Login');
            win.on('Success', function(){
                me.onPrint(btn, type);
                win.close();
            });
            win.show();
        });
    },
    onPrint : function (btn, type) {
        var me      = btn.up('form'),
            win     = me,
            params  = AuthToken.recoverParams(),
            data    = btn.up('form').down('grid').getSelection()[0];
            
            app     = Admin.getApplication();
        
        win.mask('Generando informe, espere por favor');
        Ext.Ajax.request({
            url     : Global.getUrlBase() + 'api/report/cashclosing',
            headers: {
                'Authorization ' : params.token_type +' ' + params.access_token
            },
            method      : 'GET',
            params      : {
                user    : data.data.id,
                type    : type,
                username: data.data.first_name+' ' + data.data.last_name,
                cash    : params.cash.id    
            },
            success: function(r, opts) {
                obj = Ext.decode(r.responseText);
                if(obj.success == true){
                    var url = Global.getUrlBase() + obj.records.report;
                    app.showResult('Se ha realizado el cobro correctamente.');
                    if (type == 2) {
                        app.getIframe(url,'pdf', me);
                    }else{
                        Ext.require('Admin.core.docs.IframeView');
                        Ext.onReady(function () {
                            var
                                cHtml = '<object><embed width="100%" height="100%" src="'+url+'"></object>';
                            var win	= Ext.create('Admin.core.docs.IframeView',{
                                title 	: 'Vista previa del enlace',
                                html  	: cHtml,
                                width   : 700,
                                height  : 550,
                                maximized   : true
                            });
                            win.on('cancel', function(){
                                win.close();
                                AuthToken.onLogout();
                            })
                            win.show();
                        });
                    }
                }else{
                    app.showResult('Ocurrio un error al generar el ticket.');
                }
                win.unmask();
            },
            failure: function(response, opts) {
                win.unmask();
                app.showResult('server-side failure with status code ' + response.status);
            }
        });
    },
    onRePrint : function (btn, type) {
        var me      = btn.up('window'),
            win     = me,
            params  = AuthToken.recoverParams(),
            data    = btn.up('window').down('grid').getSelection()[0];
            
            app     = Admin.getApplication();
        
        win.mask('Generando informe, espere por favor');
        Ext.Ajax.request({
            url     : Global.getUrlBase() + 'api/report/cashclosing',
            headers: {
                'Authorization ' : params.token_type +' ' + params.access_token
            },
            method      : 'GET',
            params      : {
                user    : data.data.id_user,
                type    : type,
                username: data.data.username,
                date1   : data.data.opening_date,
                date2   : data.data.opening_date,
                cash    : data.id    
            },
            success: function(r, opts) {
                obj = Ext.decode(r.responseText);
                if(obj.success == true){
                    var url = Global.getUrlBase() + obj.records.report;
                    app.showResult('Se ha realizado el cobro correctamente.');
                    if (type == 2) {
                        app.getIframe(url,'pdf', me);
                    }else{
                        Ext.require('Admin.core.docs.IframeView');
                        Ext.onReady(function () {
                            var
                                cHtml = '<object><embed width="100%" height="100%" src="'+url+'"></object>';
                            var win	= Ext.create('Admin.core.docs.IframeView',{
                                title 	: 'Vista previa del enlace',
                                html  	: cHtml,
                                width   : 700,
                                height  : 550,
                                maximized   : true
                            });
                            win.on('cancel', function(){
                                win.close();
                            })
                            win.show();
                        });
                    }
                }else{
                    app.showResult('Ocurrio un error al generar el ticket.');
                }
                win.unmask();
            },
            failure: function(response, opts) {
                win.unmask();
                app.showResult('server-side failure with status code ' + response.status);
            }
        });
    }
});