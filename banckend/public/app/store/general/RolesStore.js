/**
 * Created by LOPEZSOFT on 19/03/2016.
 */
Ext.define('Admin.store.general.RolesStore',{
    extend  : 'Admin.store.base.StoreApi',
    storeId : 'RolesStore',
    pageSize: 30,
    requires    : [
        'Admin.model.general.RolesModel'
    ],
    model   : 'Admin.model.general.RolesModel',
    proxy   : {
        api: {
            create  : 'master/insertdata',
            read    : 'auth/roles',
            update  : 'master/setdata'
            // destroy : 'master/deletedata'
        },
        extraParams : {
            pdbTable    : 'tb_sales_master',
            query       : ''
        }
    }
});
