
Ext.define('Admin.store.products.CategoriesFastStore',{
    extend  : 'Admin.store.base.StoreApi',
    storeId : 'CategoriesFastStore',
    pageSize  : 1000,
    proxy: {
        extraParams : {
            pdbTable    : 'tb_product_categories',
            query       : ''
        }
    },
    requires: [
        'Admin.model.products.CategoriesModel'
    ],
    model   : 'Admin.model.products.CategoriesModel'
});