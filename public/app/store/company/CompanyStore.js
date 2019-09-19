
Ext.define('Admin.store.company.CompanyStore',{
    extend  : 'Admin.store.base.StoreApi',
    storeId : 'CompanyStore',
    pageSize  : 1,
    proxy: {
        extraParams : {
            pdbTable    : '',
            query       : ''
        },
        api: {
            create  : 'company/insertcompany',
            read    : 'company/getcompany',
            update  : 'company/setcompany',
            destroy : 'company/deletecompany'
        }
    },
    requires: [
        'Admin.model.company.CompanyModel'
    ],
    model   : 'Admin.model.company.CompanyModel'
});