/**
 * Created by LOPEZSOFT2 on 11/12/2016.
 */
Ext.define('Admin.model.general.RolesModel',{
    extend  : 'Admin.model.base.BaseModel',
    property    : 'id',
    fields      : 
    [
        { name  : 'id', type : 'int'},
        { name  : 'id_user', type : 'int'},
        { name  : 'active'},
        { name  : 'name_menu'},
        { name  : 'name_item'}
    ]
});
