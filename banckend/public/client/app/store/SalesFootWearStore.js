
Ext.define('Admin.store.SalesFootWearStore',{
    extend  : 'Admin.store.base.StoreApi',
    storeId : 'SalesFootWearStore',
    pageSize  : 30,
    proxy: {
        extraParams : {
            pdbTable    : '',
            query       : '',
            type        : '1'
        },
        api: {
            create  : 'master/insertdata',
            read    : 'master/getsalesservice',
            update  : 'master/setdata',
            destroy : 'master/deletedata'
        },
    },
    requires: [
        'Admin.model.SalesServicesModel'
    ],
    model   : 'Admin.model.SalesServicesModel'
});