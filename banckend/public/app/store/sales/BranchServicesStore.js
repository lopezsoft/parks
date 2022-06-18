
Ext.define('Admin.store.sales.BranchServicesStore',{
    extend  : 'Admin.store.base.StoreApi',
    storeId : 'BranchServicesStore',
    pageSize  : 30,
    proxy: {
        extraParams : {
            pdbTable    : 'tb_branch_services',
            query       : ''
        },
        api: {
            create  : 'master/insertdata',
            read    : 'master/getbranchservices',
            update  : 'master/setdata',
            destroy : 'master/deletedata'
        }
    },
    requires: [
        'Admin.model.sales.BranchServicesModel'
    ],
    model   : 'Admin.model.sales.BranchServicesModel'
});