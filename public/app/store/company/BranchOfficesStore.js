
Ext.define('Admin.store.company.BranchOfficesStore',{
    extend  : 'Admin.store.base.StoreApi',
    storeId : 'BranchOfficesStore',
    pageSize  : 10,
    proxy: {
        extraParams : {
            pdbTable    : 'tb_branch_offices',
            query       : ''
        }
    },
    requires: [
        'Admin.model.company.BranchOfficesModel'
    ],
    model   : 'Admin.model.company.BranchOfficesModel'
});