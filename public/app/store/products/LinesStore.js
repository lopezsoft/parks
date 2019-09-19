
Ext.define('Admin.store.products.LinesStore',{
    extend  : 'Admin.store.base.StoreApi',
    storeId : 'LinesStore',
    pageSize  : 100,
    proxy: {
        extraParams : {
            pdbTable    : '',
            query       : ''
        },
        api: {
            create  : 'products/insertlines',
            read    : 'products/getlines',
            update  : 'products/setlines',
            destroy : 'products/deletelines'
        }
    },
    requires: [
        'Admin.model.products.LinesModel'
    ],
    model   : 'Admin.model.products.LinesModel'
});