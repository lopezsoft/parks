
Ext.define('Admin.store.products.LinesStore',{
    extend  : 'Admin.store.base.StoreApi',
    storeId : 'LinesStore',
    pageSize  : 1000,
    proxy: {
        extraParams : {
            pdbTable    : 'tb_product_lines',
            query       : ''
        }
    },
    requires: [
        'Admin.model.products.LinesModel'
    ],
    model   : 'Admin.model.products.LinesModel'
});