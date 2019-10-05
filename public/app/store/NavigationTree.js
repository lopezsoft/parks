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
                iconCls     : 'fas fa-building',
                leaf        : false,
                expanded : false,
                children : [
                    {
                        text: 'Datos de la empresa',
                        iconCls     : 'fas fa-building',
                        viewType    : 'companyform',
                        routeId     : 'company',
                        leaf        : true
                    },
                    {
                        text        : 'Sucursales',
                        iconCls     : 'fas fa-home',
                        viewType    : 'branchsform',
                        routeId     : 'branchoffices',
                        leaf        : true
                    }
                ]
            },
            {
                text: 'Ventas',
                iconCls: 'fas fa-store',
                leaf: false,
                expanded: false,
                children: [
                    {
                        text        : 'Servicios',
                        iconCls     : 'x-fa fa-money',
                        viewType    : 'servicesform',
                        routeId     : 'sales/services',
                        leaf        : true
                    },
                    {
                        text        : 'Servicios por sucursal',
                        iconCls     : 'x-fa fa-money',
                        viewType    : 'branchservicesform',
                        routeId     : 'sales/branchservices',
                        leaf        : true
                    },
                    {
                        text        : 'Calcetines',
                        iconCls     : 'fas fa-shoe-prints',
                        viewType    : 'footwearform',
                        routeId     : 'sales/footwear',
                        leaf        : true
                    },
                    {
                        text        : 'Calcetines por sucursal',
                        iconCls     : 'fas fa-shoe-prints',
                        viewType    : 'branchfoorwearform',
                        routeId     : 'sales/branchfootwear',
                        leaf        : true
                    }
                ]
            },
            {
                text: 'Productos',
                iconCls: 'fas fa-box-open',
                leaf     : false,
                expanded : false,
                children : [
                    {
                        text        : 'Productos',
                        iconCls     : 'fas fa-box-open',
                        viewType    : 'productsform',
                        routeId     : 'products',
                        leaf        : true
                    },
                    {
                        text: 'Lineas',
                        iconCls: 'x-fa fa-money',
                        viewType    : 'linesform',
                        routeId     : 'products/lines',
                        leaf        : true
                    },
                    {
                        text: 'Categorias',
                        iconCls: 'x-fa fa-money',
                        viewType: 'categoriesform',
                        routeId     : 'products/categories',
                        leaf: true
                    }
                ]
            },
            {
                text        : 'Clientes',
                iconCls     : 'fas fa-user-friends',
                leaf        : false,
                expanded    : true,
                children    : [
                    {
                        text        : 'Listado de Clientes',
                        iconCls     : 'fas fa-user-friends',
                        viewType    : 'customersform',
                        routeId     : 'customers',
                        leaf        : true
                    },
                    {
                        text        : 'Lstado de PRE-TICKETS',
                        iconCls     : 'fas fa-receipt',
                        viewType    : 'preticketsform',
                        routeId     : 'customers/pretikets',
                        leaf        : true
                    }
                ]
            },
            {
                text: 'Usuarios',
                iconCls: 'fas  fa-users-cog',
                expanded: false,
                selectable: false,
                children: [
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
                text        : 'Ajustes',
                iconCls     : 'x-fa fa-cogs',
                leaf        : false,
                expanded    : false,
                children : [
                    {
                        text        : 'tickets',
                        iconCls     : 'fas fa-receipt',
                        viewType    : 'confinvoiceform',
                        routeId     : 'settings/invoice',
                        leaf        : true
                    }
                    // {
                    //     text: 'Cajas/Terminales',
                    //     iconCls: 'fas fa-cash-register',
                    //     viewType: 'settings/cashregister',
                    //     leaf: true
                    // }
                ]
            }
        ]
    }
});
