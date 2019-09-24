
Ext.define('Admin.store.sales.BranchFootWearStore',{
    extend  : 'Admin.store.base.StoreApi',
    storeId : 'BranchFootWearStore',
    pageSize  : 30,
    proxy: {
        extraParams : {
            pdbTable    : 'tb_headquarters_shoes',
            query       : ''
        }
    },
    requires: [
        'Admin.model.sales.BranchFootWearModel'
    ],
    model   : 'Admin.model.sales.BranchFootWearModel'
});