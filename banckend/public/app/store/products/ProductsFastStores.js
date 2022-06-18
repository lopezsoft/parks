
Ext.define('Admin.store.products.ProductsFastStore',{
    extend  : 'Admin.store.base.StoreApi',
    storeId : 'ProductsFastStore',
    pageSize  : 0,
    proxy: {
        extraParams : {
            pdbTable    : 'tb_products',
            query       : '',
            branch      : '1',
            type        : 0
        },
        api: {
            create  : 'master/insertdata',
            read    : 'master/getproducts',
            update  : 'master/setdata',
            destroy : 'master/deletedata'
        }
    },
    requires: [
        'Admin.model.products.ProductsModel'
    ],
    model   : 'Admin.model.products.ProductsModel'
});