Ext.define('Admin.view.users.views.UsersView',{
    extend : 'Admin.core.base.WindowCrud',
    xtype   : 'usersview',
    alias   : 'widget.usersview',
    controller : 'users',
    closeAction 	: 'hide',
    initComponent: function () {
        this.callParent(arguments);
        this.setTitle('Agregar/Editar Usuario/Cliente');
    },
    store : 'UsersStore',
    onSave  : function(btn){
        var me      = this.getApp(),
            form    = this.down('form'),
            values  = form.getValues(),
            record  = form.getRecord();
        if(record){
            this.onAjax('updateuser', values, record);
        }else{
            if (values.password == values.password_confirmation) {
                this.onAjax('signup', values);
            }else{
                me.showResult('Las contraseñas no coinciden');
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
                }else{
                    xstore.reload();
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
                    xtype           : 'checkBoxField',
                    boxLabel        : 'Activo',
                    name            : 'active'
                }
            ]
        }
    ]
});