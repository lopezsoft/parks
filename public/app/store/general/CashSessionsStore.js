/**
 * Created by LOPEZSOFT on 19/03/2016.
 */
Ext.define('Admin.store.general.CashSessionsStore',{
    extend  : 'Admin.store.base.StoreApi',
    storeId : 'CashSessionsStore',
    pageSize: 300,
    requires    : [
        'Admin.model.general.CashSessionsModel'
    ],
    model   : 'Admin.model.general.CashSessionsModel',
    proxy   : {
        api: {
            create  : 'master/insertdata',
            read    : 'master/getcashsessions',
            update  : 'master/setdata',
            destroy : 'master/deletedata'
        },
        extraParams : {
            pdbTable    : 'tb_cash_closing',
            query       : ''
        }
    }
});
