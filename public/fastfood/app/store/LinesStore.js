
Ext.define('Admin.store.LinesStore',{
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
        'Admin.model.LinesModel'
    ],
    model   : 'Admin.model.LinesModel'
});