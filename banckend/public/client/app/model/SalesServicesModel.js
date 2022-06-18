Ext.define('Admin.model.SalesServicesModel',{
    extend  : 'Admin.model.base.BaseModel',
    fields  : [
        { name: 'id', type : 'int' },
        { name: 'id_branc', type : 'int' },
        { name: 'cant', type : 'int' },
        { name: 'price'},
        { name: 'total'},
        { name: 'unlimited_time'},
        { name: 'shoe_name' },
        { name: 'full_name' },
        { name: 'type', type : 'int' }
    ]
});