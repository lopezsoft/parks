Ext.define('Admin.model.CategoriesModel',{
    extend  : 'Admin.model.base.BaseModel',
    fields  : [
        { name: 'id', type : 'int' },
        { name: 'category_name'},
        { name: 'color' },
        { name: 'active', type : 'bool' }
    ]
});