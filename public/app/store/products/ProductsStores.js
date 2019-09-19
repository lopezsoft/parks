
Ext.define('Admin.store.products.ProductsStore',{
    extend  : 'Admin.store.base.StoreApi',
    storeId : 'ProductsStore',
    pageSize  : 100,
    proxy: {
        extraParams : {
            pdbTable    : '',
            query       : ''
        },
        api: {
            create  : 'products/insertproducts',
            read    : 'products/getproducts',
            update  : 'products/setproducts',
            destroy : 'products/deleteproducts'
        }
    },
    requires: [
        'Admin.model.products.ProductsModel'
    ],
    model   : 'Admin.model.products.ProductsModel'
});