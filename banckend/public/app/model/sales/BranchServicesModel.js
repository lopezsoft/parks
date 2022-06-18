Ext.define('Admin.model.sales.BranchServicesModel',{
    extend  : 'Admin.model.base.BaseModel',
    fields  : [
        { name: 'id', type : 'int' },
        { name: 'id_branch', type : 'int' },
        { name: 'id_time', type : 'int' },
        { name: 'price'},
        { name: 'extension'},
        { name: 'unlimited_time', type : 'bool' },
        { name: 'active', type : 'bool' },
        { name: 'time_name'},
        { name: 'full_name'}
    ]
});