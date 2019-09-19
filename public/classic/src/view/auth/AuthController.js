Ext.define('Admin.view.auth.AuthController',{
    extend : 'Admin.core.base.BaseController',
    alias : 'controller.auth',

    onLoginButton: function(btn) {
        var
            data    = btn.up('form').getValues()
            me      = this;
            AuthToken.onLogin(data,me);
    }

});