Ext.define('Admin.model.sales.BranchFootWearModel',{
    extend  : 'Admin.model.base.BaseModel',
    fields  : [
        { name: 'id', type : 'int' },
        { name: 'id_branch', type : 'int' },
        { name: 'id_footwear', type : 'int' },
        { name: 'price'},
        { name: 'active', type : 'bool' }
    ]
});