
Ext.define('Admin.core.button.ExportButton',{
    extend	: 'Ext.button.Button',
    alias	: 'widget.exportButton',
    tooltipType : 'title',
    tooltip 	: 'Exportar',
    itemId		: 'exportButton',
    iconCls		: 'x-fa fa-download',
    iconAlign	: 'left',
    ui			: 'soft-green',
    text	    : 'Exportar',
    menu 		: [
       /* {
            text	: 'Excel',
            iconCls	: 'x-fa fa-file-excel-o',
            itemId	: 'btnExcel',
            handler	: 'onExportExcel'
        },*/
        {            text	: 'CSV',
            iconCls	: 'x-fa fa-file-o',
            itemId	: 'btnCSV',
            handler	: 'onExportCSV'
        }
    ]
});

Ext.define('Admin.core.button.SaveButton',{
    extend	: 'Admin.core.button.CustomButton',
    iconCls	: 'x-fa fa-floppy-o',
    tooltip	: 'Guardar cambios',
    ui		: 'soft-blue',
    alias	: 'widget.saveButton',
    tooltipType : 'title',
    iconAlign	: 'left',
    text	    : 'Guardar',
    disabled 	: true,
    itemId      : 'saveButton'
});

Ext.define('Admin.core.button.UndoButton',{
    extend	: 'Admin.core.button.CustomButton',
    iconCls	: 'x-fa fa-undo',
    tooltip	: 'Deshacer cambios',
    ui		: 'soft-green',
    alias	: 'widget.undoButton',
	handler     : 'onClickUndo',
    tooltipType : 'title',
    iconAlign	: 'left',
    text	    : 'Deshacer',
    disabled 	: true,
    itemId      : 'undoButton'
});
