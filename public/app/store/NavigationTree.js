Ext.define('Admin.store.NavigationTree', {
    extend: 'Ext.data.TreeStore',

    storeId: 'NavigationTree',

    fields: [{
        name: 'text'
    }],

    root: {
        expanded: true,
        children: [
            {
                text: 'Dashboard',
                iconCls: 'x-fa fa-desktop',
                viewType: 'admindashboard',
                routeId: 'dashboard', // routeId defaults to viewType
                leaf: true
            },
            {
                text        : 'Empresa',
                iconCls     : 'x-fa fa-send',
                leaf        : false,
                expanded : false,
                children : [
                    {
                        text: 'Datos de la empresa',
                        iconCls: 'x-fa fa-file-o',
                        viewType    : 'companyform',
                        routeId     : 'company',
                        leaf        : true
                    },
                    {
                        text        : 'Sucursales',
                        iconCls     : 'x-fa fa-file-o',
                        viewType    : 'branchsform',
                        routeId     : 'branchoffices',
                        leaf        : true
                    }
                ]
            },
            {
                text: 'Ventas',
                iconCls: 'x-fa fa-user',
                leaf: false,
                expanded: false,
                children: [
                    {
                        text: 'Parametros',
                        iconCls: 'x-fa fa-file-o',
                        viewType: 'pageblank',
                        leaf: true
                    },
                    {
                        text: 'Procesos',
                        iconCls: 'x-fa fa-exclamation-triangle',
                        leaf: false,
                        expanded: false,
                        viewType: 'reciboporpredioform'
                    },
                    {
                        text: 'Consultas',
                        iconCls: 'x-fa fa-times-circle',
                        viewType: 'page500',
                        leaf: true
                    }
                ]
            },
            {
                text: 'Productos',
                iconCls: 'x-fa fa-file-o',
                leaf     : false,
                expanded : false,
                children : [
                    {
                        text        : 'Productos',
                        iconCls     : 'x-fa fa-file-o',
                        viewType    : 'productsform',
                        routeId     : 'products',
                        leaf        : true
                    },
                    {
                        text: 'Lineas',
                        iconCls: 'x-fa fa-file-o',
                        viewType    : 'linesform',
                        routeId     : 'products/lines',
                        leaf        : true
                    },
                    {
                        text: 'Categorias',
                        iconCls: 'x-fa fa-file-o',
                        viewType: 'categoriesform',
                        routeId     : 'products/categories',
                        leaf: true
                    }
                ]
            },
            {
                text: 'Personas',
                iconCls: 'x-fa fa-search',
                viewType: 'faq',
                leaf: true
            },
            {
                text: 'Usuarios',
                iconCls: 'x-fa fa-leanpub',
                expanded: false,
                selectable: false,
                children: [
                    {
                        text: 'Blank Page',
                        iconCls: 'x-fa fa-file-o',
                        viewType: 'pageblank',
                        leaf: true
                    },

                    {
                        text: '404 Error',
                        iconCls: 'x-fa fa-exclamation-triangle',
                        viewType: 'page404',
                        leaf: true
                    },
                    {
                        text: '500 Error',
                        iconCls: 'x-fa fa-times-circle',
                        viewType: 'page500',
                        leaf: true
                    },
                    {
                        text: 'Lock Screen',
                        iconCls: 'x-fa fa-lock',
                        viewType: 'lockscreen',
                        leaf: true
                    },

                    {
                        text: 'Login',
                        iconCls: 'x-fa fa-check',
                        viewType: 'login',
                        leaf: true
                    },
                    {
                        text: 'Register',
                        iconCls: 'x-fa fa-pencil-square-o',
                        viewType: 'register',
                        leaf: true
                    },
                    {
                        text: 'Password Reset',
                        iconCls: 'x-fa fa-lightbulb-o',
                        viewType: 'passwordreset',
                        leaf: true
                    }
                ]
            },
            {
                text: 'Ajustes',
                iconCls: 'x-fa fa-flask',
                viewType: 'widgets',
                leaf: true
            },
            {
                text: 'Login',
                iconCls: 'x-fa fa-flask',
                viewType: 'login',
                // routeId: 'login',
                leaf: true
            }
        ]
    }
});
