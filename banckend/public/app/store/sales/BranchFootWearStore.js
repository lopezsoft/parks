
Ext.define('Admin.store.sales.BranchFootWearStore',{
    extend  : 'Admin.store.base.StoreApi',
    storeId : 'BranchFootWearStore',
    pageSize  : 30,
    proxy: {
        extraParams : {
            pdbTable    : 'tb_headquarters_shoes',
            query       : ''
        },
        api: {
            create  : 'master/insertdata',
            read    : 'master/getbranchfootWear',
            update  : 'master/setdata',
            destroy : 'master/deletedata'
        }
    },
    requires: [
        'Admin.model.sales.BranchFootWearModel'
    ],
    model   : 'Admin.model.sales.BranchFootWearModel'
});