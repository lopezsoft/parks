Ext.define('Admin.view.auth.AuthController',{
    extend : 'Admin.core.base.BaseController',
    alias : 'controller.auth',

    onLoginButton: function(btn) {
        var
            data    = btn.up('form').getValues()
            me      = this;
            win     = btn.up('window'),
            app     = Admin.getApplication();
        Ext.Ajax.request({
            url: Global.getUrlBase() + 'api/auth/login',
            params : {
                remember_me : 0,
                email       : data.email,
                password    : data.password
            },
            method      : 'POST',
            success: function(response, opts) {
               var 
                    obj     = Ext.decode(response.responseText);
                
                var   token = {
                        token 		: obj.access_token,
                        expires_at	: obj.expires_at,
                        token_type	: obj.token_type,
                        user        : obj.user,
                        access_id   : obj.access_id
                    }
                if(obj.success == true && obj.user.type == 1){
                    win.fireEvent('Success',btn);
                    me.onLogout(token);
                }else{
                    me.onLogout(token);
                    app.showResult('Error de autenticación. No tiene permisos de administrador');
                }
            },
            failure: function(response, opts) {
                app.showResult('server-side failure with status code ' + response.status);
            }
        });
    },

    onLogout: function (params) {
        var me      = this,
            app     = Admin.getApplication();
        Ext.Ajax.request({
            url     : Global.getUrlBase() + 'api/auth/logout',
            headers: {
                'Authorization' : params.token_type +' ' + params.token
            },
            params      : {
                user        : params.user.id,
                access_id   : params.access_id ? params.access_id : 0
            },
            method      : 'GET',
            success: function(response, opts) {
                
            },
            failure: function(response, opts) {
                app.showResult('server-side failure with status code ' + response.status);
            }
        });
    }
});