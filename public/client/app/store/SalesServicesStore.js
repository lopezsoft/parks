
Ext.define('Admin.store.SalesServicesStore',{
    extend  : 'Admin.store.base.StoreApi',
    storeId : 'SalesServicesStore',
    pageSize  : 30,
    proxy: {
        extraParams : {
            pdbTable    : '',
            query       : '',
            type        : '2'
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