
Ext.define('Admin.store.products.LinesFastStore',{
    extend  : 'Admin.store.base.StoreApi',
    storeId : 'LinesFastStore',
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