
Ext.define('Admin.store.sales.ServicesStore',{
    extend  : 'Admin.store.base.StoreApi',
    storeId : 'ServicesStore',
    pageSize  : 30,
    proxy: {
        extraParams : {
            pdbTable    : 'tb_service_time',
            query       : ''
        }
    },
    requires: [
        'Admin.model.sales.ServicesModel'
    ],
    model   : 'Admin.model.sales.ServicesModel'
});