
Ext.define('Admin.store.ProductsStore',{
    extend  : 'Admin.store.base.StoreApi',
    storeId : 'ProductsStore',
    pageSize  : 0,
    proxy: {
        extraParams : {
            pdbTable    : '',
            query       : '',
            branch      : '1'
        },
        api: {
            create  : 'master/insertdata',
            read    : 'master/getproducts',
            update  : 'master/setdata',
            destroy : 'master/deletedata'
        },
    },
    requires: [
        'Admin.model.ProductsModel'
    ],
    model   : 'Admin.model.ProductsModel'
});