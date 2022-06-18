
Ext.define('Admin.store.fastfood.ProductsSalesStore',{
    extend  : 'Admin.store.base.StoreApi',
    storeId : 'ProductsSalesStore',
    pageSize  : 0,
    proxy: {
        extraParams : {
            pdbTable    : '',
            query       : '',
            branch      : '1'
        },
        api: {
            create  : 'report/setticketfastfood',
            read    : 'master/getproducts',
            update  : 'master/setdata',
            destroy : 'master/deletedata'
        }
    },
    requires: [
        'Admin.model.fastfood.ProductsSalesModel'
    ],
    model   : 'Admin.model.fastfood.ProductsSalesModel'
});