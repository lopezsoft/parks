/**
 * Created by LOPEZSOFT2 on 11/12/2016.
 */
Ext.define('Admin.model.general.TypeUsersModel',{
    extend  : 'Admin.model.base.BaseModel',
    property    : 'id',
    fields      : 
    [
        { name  : 'id', type : 'int'},
        { name  : 'user_type_name'},
        { name  : 'active'}
    ]
});
