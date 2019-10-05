Ext.define('Admin.security.TokenStorage', {
    alternateClassName: ['TokenStorage', 'AuthToken'],
    singleton : true,
    constructor: function (cfg) {
        var me = this;
        me.initConfig(cfg);
    },
    config: {
        storageKey  : 'token-fastfood',
        keyReport   : 'token-report-fastfood'
    },    

    clear: function (cont) {
        localStorage.removeItem(this.getStorageKey());
        localStorage.removeItem(this.getKeyReport());
        window.location.href    = "/fastfood/login"
    },

    clearReport: function (cont) {
        localStorage.removeItem(this.getKeyReport());
    },

    recoverReport : function() {
        var 
            valToken= localStorage.getItem(this.getKeyReport()),
            token   = {};
        if (valToken){
            token   = valToken;
        }else{
            token   = null;
        }
        return token;
    },

    recoverParams : function(){
        var 
            token   = this.recover();
        if (token){
            token = {
                token 		: token.access_token,
				expires_at	: token.expires_at,
                token_type	: token.token_type,
                user        : token.user
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

    saveReport: function (path) {
        localStorage.setItem(this.getKeyReport(), path);
    },

    isAuthenticated : function (){
        return this.recover() ? true : false;
    },

    onLogout: function (cont) {
        var me  = this,
            params = me.recoverParams(),
            app = Admin.getApplication();
        Ext.Ajax.request({
            url     : Global.getUrlBase() + 'api/auth/logout',
            headers: {
                'Authorization ' : params.token_type +' ' + params.access_token
            },
            method      : 'GET',
            success: function(response, opts) {
                me.clear(cont);
            },
            failure: function(response, opts) {
                app.showResult('server-side failure with status code ' + response.status);
            }
        });
    }

});

