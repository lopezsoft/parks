Ext.define('Admin.model.products.LinesModel',{
    extend  : 'Admin.model.base.BaseModel',
    fields  : [
        { name: 'id', type : 'int' },
        { name: 'line_name'},
        { name: 'color' },
        { name: 'active' }
    ]
});