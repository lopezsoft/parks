
Ext.define('Admin.store.company.BranchOfficesStore',{
    extend  : 'Admin.store.base.StoreApi',
    storeId : 'BranchOfficesStore',
    pageSize  : 10,
    proxy: {
        extraParams : {
            pdbTable    : '',
            query       : ''
        },
        api: {
            create  : 'company/insertbranchoffices',
            read    : 'company/getbranchoffices',
            update  : 'company/setbranchoffices',
            destroy : 'company/deletebranchoffices'
        }
    },
    requires: [
        'Admin.model.company.BranchOfficesModel'
    ],
    model   : 'Admin.model.company.BranchOfficesModel'
});