Ext.define('Admin.security.TokenStorage', {
    alternateClassName: ['TokenStorage', 'AuthToken'],
    singleton : true,
    constructor: function (cfg) {
        var me = this;
        me.initConfig(cfg);
    },
    config: {
        storageKey  : 'JWT'
    },    

    clear: function (cont) {
        localStorage.removeItem(this.getStorageKey());
        cont.redirectTo("dashboard");
    },

    recoverParams : function(){
        var 
            token   = this.recover();
        if (token){
            token = {
                token 		: token.access_token,
				expires_at	: token.expires_at,
				token_type	: token.token_type
            }
        }
        return token;
    },
    recover: function() {
        var 
            valToken= localStorage.getItem(this.getStorageKey()),
            token   = {};
        if (valToken){
            token   = Ext.decode(valToken)
        }else{
            token   = null 
        }
        return token;
    },

    save: function (token) {
        localStorage.setItem(this.getStorageKey(), token);
    },

    isAuthenticated : function (){
        return this.recover() ? true : false;
    },

    onLogout: function (params) {
        var me  = this,
            app = Admin.getApplication();
        Ext.Ajax.request({
            url     : Global.getUrlBase() + 'api/auth/logout',
            params : me.recoverParams(),
            method      : 'GET',
            success: function(response, opts) {
            //    window.reload();
                me.clear();
            },
            failure: function(response, opts) {
                app.showResult('server-side failure with status code ' + response.status);
            }
        });
    },

    onLogin : function (params, cont) {
        var me  = this,
            app = Admin.getApplication();
        Ext.Ajax.request({
            url: Global.getUrlBase() + 'api/auth/login',
            params : {
                remember_me : params.remember_me,
                email       : params.email,
                password    : params.password
            },
            method      : 'POST',
            success: function(response, opts) {
               var text = response.responseText;
               me.save(text);
               app.showResult('Bienvenido al sistema, te has autenticado correctamente.');
               cont.redirectTo("dashboard");
            },
            failure: function(response, opts) {
                app.showResult('server-side failure with status code ' + response.status);
            }
        });
    }
});