
Ext.define('Admin.store.CategoriesStore',{
    extend  : 'Admin.store.base.StoreApi',
    storeId : 'CategoriesStore',
    pageSize  : 1000,
    proxy: {
        extraParams : {
            pdbTable    : 'tb_product_categories',
            query       : ''
        }
    },
    requires: [
        'Admin.model.CategoriesModel'
    ],
    model   : 'Admin.model.CategoriesModel'
});