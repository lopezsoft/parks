Ext.define('Admin.view.profile.ProfileView',{
    extend : 'Admin.core.base.WindowCrud',
    xtype   : 'profileview',
    alias   : 'widget.profileview',
    controller : 'users',
    closeAction 	: 'hide',
    initComponent: function () {
        this.callParent(arguments);
        this.setTitle('Editar Perfíl de usuario');
    },
    store : 'UsersStore',
    onSave  : function(btn){
        var me      = this.getApp(),
            form    = this.down('form'),
            values  = form.getValues(),
            record  = form.getRecord();
        if(values.password.length > 0){
            if(values.password.length > 5){
                if (values.password == values.password_confirmation) {
                    this.onAjax('signup', values);
                }else{
                    me.showResult('Las contraseñas no coinciden');
                }
            }else{
                me.showResult('Las contraseña es demasiado corta. Debe tener al menos 6 caracteres');
            }
        }else{
            if(record){
                this.onAjax('updateuser', values, record);
            }
        }
    },
    onAjax  : function(xurl, xvalues, record){
        var 
            params  = AuthToken.recoverParams(),
            me      = this,
            app     = Admin.getApplication(),
            xstore  = Ext.getStore('UsersStore');
        xvalues.user_id = params.user.id;
        me.mask('Guardando cambios...');
        Ext.Ajax.request({
            url     : Global.getUrlBase() + 'api/auth/'+ xurl,
            headers: {
                'Authorization'    : params.token_type +' ' + params.token
            },
            method      : 'POST',
            params      : xvalues,
            success: function(response, opts) {
                if (record) {
                    record.set(xvalues);
                    record.commit();
                }
                me.unmask();
                me.close()
            },
            failure: function(response, opts) {
                me.unmask();
                app.showResult('server-side failure with status code ' + response.status);
            }
        });
    },
    items: [
        {
            xtype       : 'customForm',
            store       : 'UsersStore',
            items: [
                {
                    xtype       : 'hiddenfield',
                    name        : 'id'
                },
                {
                    fieldLabel  : 'Nombres',
                    name        : 'first_name'
                },
                {
                    fieldLabel  : 'Apellidos',
                    name        : 'last_name'   
                },
                {
                    xtype       : 'customDate',
                    fieldLabel  : 'Fecha de nacimiento',
                    name        : 'birthday'   
                },
                {
                    fieldLabel  : 'Correo electrónico',
                    name        : 'email',
                    vtype       : 'email'
                },
                {
                    fieldLabel  : 'Contraseña',
                    name        : 'password',
                    inputType   : 'password',
                    itemId      : 'password',
                    allowBlank  : true
                },
                {
                    fieldLabel  : 'Confirmar Contraseña',
                    name        : 'password_confirmation',
                    inputType   : 'password',
                    itemId      : 'confirm',
                    allowBlank  : true
                },
                {
                    xtype           : 'combotypeusers',
                    disabled        : true
                },
                {
                    xtype           : 'checkBoxField',
                    boxLabel        : 'Activo',
                    disabled        : true,
                    name            : 'active'
                }
            ]
        }
    ]
});