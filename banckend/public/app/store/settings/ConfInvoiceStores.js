
Ext.define('Admin.store.settings.ConfInvoiceStore',{
    extend  : 'Admin.store.base.StoreApi',
    storeId : 'ConfInvoiceStore',
    pageSize  : 100,
    proxy: {
        extraParams : {
            pdbTable    : 'tb_configure_invoice',
            query       : ''
        }
    },
    requires: [
        'Admin.model.settings.ConfInvoiceModel'
    ],
    model   : 'Admin.model.settings.ConfInvoiceModel'
});