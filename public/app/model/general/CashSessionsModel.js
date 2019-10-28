/**
 * Created by LOPEZSOFT2 on 11/12/2016.
 */
Ext.define('Admin.model.general.CashSessionsModel',{
    extend  : 'Admin.model.base.BaseModel',
    property    : 'id',
    fields      : 
    [
        { name  : 'id', type : 'int'},
        { name  : 'id_user'},
        { name  : 'opening_date'},
        { name  : 'opening_time'},
        { name  : 'closing_date'},
        { name  : 'total'},
        { name  : 'date'},
        { name  : 'document'},
        { name  : 'opened', type : 'bool'},
        { name  : 'user_type_name'},
        { name  : 'username'}
    ]
});
