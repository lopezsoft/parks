Ext.define('Admin.view.users.UsersController',{
    extend : 'Admin.core.base.BaseController',
    alias : 'controller.users',

    onPrint : function (btn) {
        var me      = btn.up('form'),
            xData   = me.down('grid').getSelection()[0],
            zStore  = me.down('grid').getStore(),
            params  = AuthToken.recoverParams(),
            dataSend=[],
            app     = Admin.getApplication();
        win     = Ext.create('Admin.view.users.views.ReceiveView');
        win.on('receive', function(btn){
            var 
                values  = win.down('form').getValues();
            dataSend    = xData.data;
            dataSend.discount       = values.discount;
            dataSend.value_paid     = values.value_paid;
            dataSend.value_to_pay   = values.value_to_pay;
            dataSend.change         = values.change;
            Ext.Ajax.request({
                url     : Global.getUrlBase() + 'api/report/settickets',
                headers: {
                    'Authorization ' : params.token_type +' ' + params.access_token
                },
                method      : 'GET',
                params      : {
                    records : JSON.stringify(dataSend),
                    user    : params.user.id,
                    type    : dataSend.type
                },
                success: function(r, opts) {
                    obj = Ext.decode(r.responseText);
                    if(obj.success == true){
                        var url = Global.getUrlBase() + obj.records.report;
                        app.showResult('Se ha realizado el cobro correctamente.');
                        app.getIframe(url,'pdf', me);
                        win.close();
                        zStore.reload();
                    }else{
                        app.showResult('Ocurrio un error al generar el ticket.');
                    }
                },
                failure: function(response, opts) {
                    app.showResult('server-side failure with status code ' + response.status);
                }
            });
        });
        win.down('form').loadRecord(xData);
        win.show();
    }
});