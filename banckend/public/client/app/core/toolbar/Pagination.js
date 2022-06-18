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
    displayInfo : true
});