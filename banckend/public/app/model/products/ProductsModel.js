Ext.define('Admin.model.products.ProductsModel',{
    extend  : 'Admin.model.base.BaseModel',
    fields  : [
        { name: 'id', type : 'int' },
        { name: 'code'},
        { name: 'bar_code' },
        { name: 'id_category', type : 'int' },
        { name: 'id_line', type : 'int' },
        { name: 'id_branch', type : 'int' },
        { name: 'product_name' },
        { name: 'detail' },
        { name: 'price', type: 'float' },
        { name: 'image' },
        { name: 'mime' },
        { name: 'active', type : 'bool' },
        { name: 'package', type : 'bool' },
        { name: 'category_name'},
        { name: 'color_category' },
        { name: 'line_name' },
        { name: 'line_color' },
        { name: 'full_name' }
    ]
});