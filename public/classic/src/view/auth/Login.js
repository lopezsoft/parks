Ext.define('Admin.view.auth.Login', {
    extend: 'Ext.window.Window',
    xtype: 'login',

    frameHeader : false,
    requires: [
        'Admin.view.auth.Dialog',
        'Ext.container.Container',
        'Ext.form.field.Text',
        'Ext.form.field.Checkbox',
        'Ext.button.Button'
    ],

    requires: [
        'Admin.view.auth.AuthController',
        'Ext.layout.container.VBox'
    ],

    cls: 'auth-locked-window',
    closable    : false,
    resizable   : false,
    autoShow    : true,
    titleAlign  : 'center',
    maximized   : true,
    modal       : true,

    layout: {
        type    : 'vbox',
        align   : 'center',
        pack    : 'center'
    },

    controller: 'auth',

    defaultFocus: 'authdialog', // Focus the Auth Form to force field focus as well

    items: [
        {
            xtype: 'authdialog',
            defaultButton : 'loginButton',
            autoComplete: true,
            bodyPadding: '20 20',
            cls: 'auth-dialog-login',
            header: false,
            width: 415,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },

            defaults : {
                margin : '5 0'
            },

            items: [
                {
                    xtype: 'label',
                    text: 'Inicio de sesión'
                },
                {
                    xtype   : 'textfield',
                    cls     : 'auth-textbox',
                    name    : 'email',
                    vtype   : 'email',
                    height  : 55,
                    hideLabel   : true,
                    allowBlank  : false,
                    emptyText: 'Dirección de correo'
                },
                {
                    xtype       : 'textfield',
                    cls         : 'auth-textbox',
                    height      : 55,
                    hideLabel   : true,
                    emptyText   : 'Contraseña',
                    inputType   : 'password',
                    name        : 'password',
                    allowBlank  : false
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype   : 'checkboxfield',
                            flex    : 1,
                            cls     : 'form-panel-font-color rememberMeCheckbox',
                            height  : 30,
                            bind    : '{persist}',
                            boxLabel: 'Recuérdame',
                            name    : 'remember_me',
                            inputValue: '1',
                            uncheckedValue : '0'
                        },
                        {
                            xtype: 'box',
                            html: '<a href="#passwordreset" class="link-forgot-password">¿Olvidó su contraseña?</a>'
                        }
                    ]
                },
                {
                    xtype       : 'button',
                    reference   : 'loginButton',
                    scale       : 'large',
                    ui          : 'soft-blue',
                    iconAlign   : 'right',
                    iconCls     : 'x-fa fa-angle-right',
                    text        : 'Login',
                    formBind    : true,
                    handler     : 'onLoginButton'
                }
            ]
        }
    ],

    initComponent: function() {
        this.addCls('user-login-register-container');
        this.callParent(arguments);
    }
});
