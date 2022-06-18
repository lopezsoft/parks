
Ext.define('Admin.store.sales.FootWearStore',{
    extend  : 'Admin.store.base.StoreApi',
    storeId : 'FootWearStore',
    pageSize  : 30,
    proxy: {
        extraParams : {
            pdbTable    : 'tb_footwear',
            query       : ''
        }
    },
    requires: [
        'Admin.model.sales.FootWearModel'
    ],
    model   : 'Admin.model.sales.FootWearModel'
});