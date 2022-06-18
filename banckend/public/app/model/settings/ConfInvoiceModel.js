Ext.define('Admin.model.settings.ConfInvoiceModel',{
    extend  : 'Admin.model.base.BaseModel',
    fields  : [
        { name: 'id', type : 'int' },
        { name: 'id_branch', type : 'int' },
        { name: 'headerline1'},
        { name: 'headerline2'},
        { name: 'footline1' },
        { name: 'footline2' },
        { name: 'footline3' },
        { name: 'footline4' },
        { name: 'image'},
        { name: 'mime'},
        { name: 'print_image', type : 'int' },
        { name: 'print_barcode', type : 'int' },
        { name: 'show_code', type : 'int' },
        { name: 'show_iva', type : 'int' },
        { name: 'prefix' },
        { name: 'initial_number', type: 'int' },
        { name: 'range_from', type: 'int' },
        { name: 'range_up', type: 'int' }
    ]
});