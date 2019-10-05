Ext.define('Admin.model.LinesModel',{
    extend  : 'Admin.model.base.BaseModel',
    fields  : [
        { name: 'id', type : 'int' },
        { name: 'line_name'},
        { name: 'color' },
        { name: 'active' }
    ]
});