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
                    width: 300
                },
                {
                    margin: '0 0 0 8',
                    ui: 'header',
                    iconCls:'x-fa fa-navicon',
                    id: 'main-navigation-btn',
                    handler: 'onToggleNavigationSize'
                },
                '->',
                // {
                //     xtype: 'segmentedbutton',
                //     margin: '0 16 0 0',

                //     platformConfig: {
                //         ie9m: {
                //             hidden: true
                //         }
                //     },

                //     items: [{
                //         iconCls: 'x-fa fa-desktop',
                //         pressed: true
                //     }, {
                //         iconCls: 'x-fa fa-tablet',
                //         handler: 'onSwitchToModern',
                //         tooltip: 'Switch to modern toolkit'
                //     }]
                // },
                // {
                //     iconCls:'x-fa fa-search',
                //     ui: 'header',
                //     href: '#searchresults',
                //     hrefTarget: '_self',
                //     tooltip: 'See latest search'
                // },
                {
                    iconCls:'x-fa fa-question',
                    ui: 'header',
                    href: '#faq',
                    hrefTarget: '_self',
                    tooltip: 'Ayuda'
                },
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
                    xtype: 'tbtext',
                    text: 'Usuario en línea',
                    cls: 'top-user-name'
                },
                {
                    xtype: 'image',
                    cls: 'header-right-profile-image',
                    height: 35,
                    width: 35,
                    alt:'Imagen de usuario',
                    src: 'resources/images/user-profile/2.png'
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
                    width: 300,
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
            var loadingMask = Ext.get('global-spinner');
            // Ocultando la máscara
            if (loadingMask) {
                loadingMask.setOpacity(1);
                loadingMask.fadeOut({
                    remove: true,
                    duration: 1000,
                    opacity: 0
                });
            };
        }
    }
});
