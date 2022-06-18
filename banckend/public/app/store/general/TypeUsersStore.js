/**
 * Created by LOPEZSOFT on 19/03/2016.
 */
Ext.define('Admin.store.general.TypeUsersStore',{
    extend  : 'Admin.store.base.StoreApi',
    storeId : 'TypeUsersStore',
    pageSize: 10,
    requires    : [
        'Admin.model.general.TypeUsersModel'
    ],
    model   : 'Admin.model.general.TypeUsersModel',
    proxy   : {
        extraParams : {
            pdbTable    : 'tb_type_users',
            query       : ''
        }
    }
});
