
Ext.define('Admin.store.products.ProductsStore',{
    extend  : 'Admin.store.base.StoreApi',
    storeId : 'ProductsStore',
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