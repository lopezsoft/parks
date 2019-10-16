Ext.define('Admin.security.TokenStorage', {
    alternateClassName: ['TokenStorage', 'AuthToken'],
    singleton : true,
    constructor: function (cfg) {
        var me = this;
        me.initConfig(cfg);
    },
    config: {
        storageKey  : 'JWT',
        storageOut   : 'token-dashboard'
    },  

    redirectTo : function(){
        var url = Global.getUrlBase() + 'dashboard/login';
        window.location.href = url;
    },
    
    clearOut : function (cont) {
        localStorage.removeItem(this.getStorageOut());
    },

    clear: function (cont) {
        var url = Global.getUrlBase() + 'dashboard/login';
        localStorage.removeItem(this.getStorageKey());
        window.location.href = url;
    },

    recoverParams : function(){
        var 
            token   = this.recover();
        if (token){
            token = {
                token 		: token.access_token,
				expires_at	: token.expires_at,
                token_type	: token.token_type,
                user        : token.user,
                access_id   : token.access_id
            }
        }
        return token;
    },

    recoverOut: function() {
        var 
            valToken= localStorage.getItem(this.getStorageOut()),
            token   = {};
        if (valToken){
            token   = Ext.decode(valToken)
        }else{
            token   = null 
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
        this.clearOut();
    },

    isAuthenticated : function (){
        var out = this.recoverOut();
        if(out){
            this.save(JSON.stringify(out));
        }
        return this.recover() ? true : false;
    },

    onLogout: function (cont) {
        var me      = this,
            params  = me.recoverParams(),
            app     = Admin.getApplication();
        Ext.Ajax.request({
            url     : Global.getUrlBase() + 'api/auth/logout',
            headers: {
                'Authorization' : params.token_type +' ' + params.token
            },
            params      : {
                user        : params.user.access_id,
                access_id   : params.access_id ? params.access_id : 0
            },
            method      : 'GET',
            success: function(response, opts) {
                me.clear(cont);
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
               var 
                    text    = response.responseText
                    obj     = Ext.decode(response.responseText);
                if(obj.success == true){
                    me.save(text);
                    app.showResult('Bienvenido al sistema, te has autenticado correctamente.');
                    cont.redirectTo("dashboard");
                    if(obj.user.type !== 1){
                        me.onLogout(cont);
                    }else{
                        window.location.reload();
                    }
                }else{
                    app.showResult('Error de autenticación.');
                }
            },
            failure: function(response, opts) {
                app.showResult('server-side failure with status code ' + response.status);
            }
        });
    }
});