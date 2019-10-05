/**
 * Created by LOPEZSOFT on 19/03/2016.
 */
Ext.define('Admin.store.general.UsersStore',{
    extend  : 'Admin.store.base.StoreApi',
    storeId : 'UsersStore',
    pageSize: 300,
    requires    : [
        'Admin.model.general.UsersModel'
    ],
    model   : 'Admin.model.general.UsersModel',
    proxy   : {
        api: {
            create  : 'master/insertdata',
            read    : 'master/getusers',
            update  : 'master/setdata',
            destroy : 'master/deletedata'
        },
        extraParams : {
            pdbTable    : 'users',
            query       : '',
            type        : 3
        }
    }
});
