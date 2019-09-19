
Ext.define('Admin.store.products.CategoriesStore',{
    extend  : 'Admin.store.base.StoreApi',
    storeId : 'CategoriesStore',
    pageSize  : 100,
    proxy: {
        extraParams : {
            pdbTable    : '',
            query       : ''
        },
        api: {
            create  : 'products/insertcategories',
            read    : 'products/getcategories',
            update  : 'products/setcategories',
            destroy : 'products/deletecategories'
        }
    },
    requires: [
        'Admin.model.products.CategoriesModel'
    ],
    model   : 'Admin.model.products.CategoriesModel'
});