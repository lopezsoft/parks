/**
 * Created by LOPEZSOFT2 on 11/12/2016.
 */
Ext.define('Admin.model.general.UsersModel',{
    extend  : 'Admin.model.base.BaseModel',
    property    : 'id',
    fields      : 
    [
        { name  : 'id', type : 'int'},
        { name  : 'type', type : 'int'},
        { name  : 'id_document', type : 'int'},
        { name  : 'first_name'},
        { name  : 'last_name'},
        { name  : 'dni'},
        { name  : 'email'},
        { name  : 'birthday'},
        { name  : 'active'}
    ]
});
