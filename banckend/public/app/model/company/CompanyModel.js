Ext.define('Admin.model.company.CompanyModel',{
    extend  : 'Admin.model.base.BaseModel',
    fields  : [
        { name: 'id', type : 'int' },
        { name: 'id_country', type : 'int' },
        { name: 'business_name' },
        { name: 'address' },
        { name: 'email' },
        { name: 'phone' },
        { name: 'mobile' },
        { name: 'city' },
        { name: 'logo' },
        { name: 'mime' },
        { name: 'active', type : 'bool' }
    ]
});