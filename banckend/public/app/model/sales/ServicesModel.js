Ext.define('Admin.model.sales.ServicesModel',{
    extend  : 'Admin.model.base.BaseModel',
    fields  : [
        { name: 'id', type : 'int' },
        { name: 'time_name'},
        { name: 'time' },
        { name: 'active', type : 'bool' }
    ]
});