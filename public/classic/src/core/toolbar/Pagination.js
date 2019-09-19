/**
 * Created by LOPEZSOFT on 6/12/2015.
 */
Ext.define('Admin.core.toolbar.Pagination', {
    extend  : 'Ext.toolbar.Paging',
    alias   : 'widget.pagination',
    itemId  : 'pagination',
    dock	: 'bottom',
    resizable   : false,
    scrollable  : true,
    displayInfo : true,
    cls         : 'color-tool',
    config  :{
        showPrint: false,
        showExport: false
    },
    items 		: [
        {
            xtype       : 'btnExporter'
        },
        {
            xtype		: 'btnPrinter'
        }
    ],
    listeners : {
        afterrender : function(ob, e){
            if (ob.down('#btnPrinter')) {
                ob.down('#btnPrinter').setVisible(ob.getShowPrint());
            }
            if (ob.down('#btnExporter')) {
                ob.down('#btnExporter').setVisible(ob.getShowExport());
            }
        }
    }
});