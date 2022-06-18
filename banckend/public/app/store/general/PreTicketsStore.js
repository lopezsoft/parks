/**
 * Created by LOPEZSOFT on 19/03/2016.
 */
Ext.define('Admin.store.general.PreTicketsStore',{
    extend  : 'Admin.store.base.StoreApi',
    storeId : 'PreTicketsStore',
    pageSize: 300,
    requires    : [
        'Admin.model.general.PreTicketsModel'
    ],
    model   : 'Admin.model.general.PreTicketsModel',
    proxy   : {
        api: {
            create  : 'master/insertdata',
            read    : 'master/getpretickets',
            update  : 'master/setdata',
            destroy : 'master/deletedata'
        },
        extraParams : {
            pdbTable    : 'tb_sales_master',
            query       : ''
        }
    }
});
