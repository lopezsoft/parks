/**
 * Created by LOPEZSOFT on 19/03/2016.
 */
Ext.define('Admin.store.general.UsersStore',{
    extend  : 'Admin.store.base.StoreApi',
    storeId : 'UsersStore',
    pageSize: 30,
    requires    : [
        'Admin.model.general.UsersModel'
    ],
    model   : 'Admin.model.general.UsersModel',
    proxy   : {
        api: {
            // create  : 'auth/signup',
            read    : 'master/getusers',
            // update  : 'auth/updateuser',
            destroy : 'master/deletedata'
        },
        extraParams : {
            pdbTable    : 'users',
            query       : '',
            type        : 3
        }
    }
});
