
Ext.define('Admin.store.company.CompanyStore',{
    extend  : 'Admin.store.base.StoreApi',
    storeId : 'CompanyStore',
    pageSize  : 1,
    proxy: {
        extraParams : {
            pdbTable    : 'tb_company',
            query       : ''
        }
    },
    requires: [
        'Admin.model.company.CompanyModel'
    ],
    model   : 'Admin.model.company.CompanyModel'
});