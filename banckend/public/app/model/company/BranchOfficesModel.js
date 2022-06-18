Ext.define('Admin.model.company.BranchOfficesModel',{
    extend  : 'Admin.model.base.BaseModel',
    fields  : [
        { name: 'id', type : 'int' },
        { name: 'full_name' },
        { name: 'email' },
        { name: 'address' },
        { name: 'phone' },
        { name: 'location' },
        { name: 'active', type : 'bool' }
    ]
});