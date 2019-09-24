Ext.define('Admin.model.sales.FootWearModel',{
    extend  : 'Admin.model.base.BaseModel',
    fields  : [
        { name: 'id', type : 'int' },
        { name: 'shoe_name'},
        { name: 'active', type : 'bool' }
    ]
});