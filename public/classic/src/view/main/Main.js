Ext.define('Admin.view.main.Main', {
    extend: 'Ext.container.Viewport',

    requires: [
        'Ext.button.Segmented',
        'Ext.list.Tree'
    ],
    alias : 'widget.Main',
    controller: 'main',
    viewModel: 'main',

    cls: 'sencha-dash-viewport',
    itemId: 'mainView',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    listeners: {
        render: 'onMainViewRender'
    },

    items: [
        {
            xtype: 'toolbar',
            cls: 'sencha-dash-dash-headerbar shadow',
            height: 64,
            itemId: 'headerBar',
            items: [
                {
                    xtype: 'component',
                    reference: 'senchaLogo',
                    cls: 'sencha-logo',
                    html: '<div class="main-logo"><img src="resources/images/company-logo.png">PEQUE PARKS</div>',
                    width: 290
                },
                {
                    margin: '0 0 0 8',
                    ui: 'header',
                    iconCls:'x-fa fa-navicon',
                    id: 'main-navigation-btn',
                    handler: 'onToggleNavigationSize'
                },
                '->',
                {
                    iconCls:'x-fa fa-th-large',
                    ui: 'header',
                    href: '#profile',
                    hrefTarget: '_self',
                    tooltip: 'Perfil de usuario'
                },
                {
                    iconCls     :'x-fa fa-sign-out',
                    ui          : 'header',
                    handler     : 'onCloseSesion',
                    text        : 'Salir',
                    tooltip     : 'Cerrar sesión y salir del sistema'
                },
                {
                    xtype   : 'tbtext',
                    text    : 'Usuario en línea',
                    itemId  : 'tbuser',
                    cls     : 'top-user-name'
                },
                {
                    xtype   : 'image',
                    cls     : 'header-right-profile-image',
                    height  : 35,
                    width   : 35,
                    alt     :'Imagen de usuario',
                    itemId  : 'userImg',
                    src     : 'resources/images/user-profile/2.png'
                }
            ]
        },
        {
            xtype: 'maincontainerwrap',
            id: 'main-view-detail-wrap',
            reference: 'mainContainerWrap',
            flex: 1,
            items: [
                {
                    xtype: 'treelist',
                    reference: 'navigationTreeList',
                    itemId: 'navigationTreeList',
                    ui: 'navigation',
                    store: 'NavigationTree',
                    width: 290,
                    expanderFirst: false,
                    expanderOnly: false,
                    listeners: {
                        selectionchange: 'onNavigationTreeSelectionChange'
                    }
                },
                {
                    xtype: 'container',
                    flex: 1,
                    reference: 'mainCardPanel',
                    cls: 'sencha-dash-right-main-container',
                    itemId: 'contentPanel',
                    layout: {
                        type: 'card',
                        anchor: '100%'
                    }
                }
            ]
        }
    ],
    listeners : {
        afterrender : function(e,o){
            var loadingMask = Ext.get('global-spinner'),
                me          = e,
                params      = AuthToken.recoverParams();
            // Ocultando la máscara
            if (loadingMask) {
                loadingMask.setOpacity(1);
                loadingMask.fadeOut({
                    remove: true,
                    duration: 1000,
                    opacity: 0
                });
            };
            if(me && params){
                me.down('#tbuser').setText(params.user.first_name);
                me.down('#userImg').setSrc(params.user.avatar);
            }
            
        }
    }
});
