Ext.define('Admin.view.profile.Social', {
    extend: 'Ext.panel.Panel',
    xtype: 'profilesocial',
    requires: [
        'Ext.Button',
        'Ext.Container'
    ],

    layout: {
        type: 'vbox',
        align: 'middle'
    },

    height: 320,
    
    bodyPadding: 20,
    
    items: [
        {
            xtype   : 'image',
            cls     : 'userProfilePic',
            height  : 120,
            width   : 120,
            alt     : 'profile-picture',
            itemId  : 'userImg',
            src     : 'resources/images/user-profile/20.png'
        },
        {
            xtype   : 'component',
            cls     : 'userProfileName',
            height  : '',
            itemId  : 'profile',
            html    : 'Jessica Warren'
        },
        {
            xtype   : 'button',
            width   : 220,
            text    : 'Foto de perfíl',
            iconCls     : 'fas fa-image',
            disabled    : true,
            platformConfig: {
                classic: {
                    scale: 'large'
                },
                modern: {
                    ui: 'action'
                }
            },
            margin  : '5 5 5 5',
            handler : function(btn){
                console.log(btn);
            }
        },
        {
            xtype   : 'button',
            width   : 220,
            text    : 'Editar perfíl',
            iconCls     : 'far fa-id-card',
            platformConfig: {
                classic: {
                    scale: 'large'
                },
                modern: {
                    ui: 'action'
                }
            },
            handler : function(btn){
                var 
                    app     = Admin.getApplication();
                    
                    app.setParamStore('UsersStore',{
                        pdbTable    : 'users',
                        query       : '',
                        type        : 0
                    });
                store   = Ext.getStore('UsersStore');
                win     = Ext.create('Admin.view.profile.ProfileView');
                win.show();
            }
        }
    ],
    listeners : {
        afterrender : function(ts,e){
            var  
                params      = AuthToken.recoverParams(),
                me          = ts;
            if(me && params){
                me.down('#profile').setHtml (params.user.first_name +' '+ params.user.last_name);
                me.down('#userImg').setSrc(params.user.avatar);
            }
        }
    }
});
