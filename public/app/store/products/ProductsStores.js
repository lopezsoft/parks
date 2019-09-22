
Ext.define('Admin.store.products.ProductsStore',{
    extend  : 'Admin.store.base.StoreApi',
    storeId : 'ProductsStore',
    pageSize  : 100,
    proxy: {
        extraParams : {
            pdbTable    : 'tb_products',
            query       : ''
        }
    },
    requires: [
        'Admin.model.products.ProductsModel'
    ],
    model   : 'Admin.model.products.ProductsModel'
});