/**
 * Created by LOPEZSOFT2 on 11/12/2016.
 */
Ext.define('Admin.model.general.PreTicketsModel',{
    extend  : 'Admin.model.base.BaseModel',
    property    : 'id',
    fields      : 
    [
        { name  : 'id', type : 'int'},
        { name  : 'nro_sale'},
        { name  : 'total'},
        { name  : 'date'},
        { name  : 'document'},
        { name  : 'first_name'},
        { name  : 'last_name'}
    ]
});
