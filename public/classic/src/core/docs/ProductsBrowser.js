/**
 * @class Ext.chooser.IconBrowser
 * @extends Ext.view.View
 *
 * This is a really basic subclass of Ext.view.View. All we're really doing here is providing the template that dataview
 * should use (the tpl property below), and a Store to get the data from. In this case we're loading data from a JSON
 * file over AJAX.
 */
Ext.define('Admin.core.docs.ProductsBrowser', {
    extend: 'Ext.view.View',
    alias: 'widget.productsbrowser',
    
    uses: 'Admin.store.products.ProductsStore',
    
	singleSelect    : true,
    overItemCls: 'x-view-over',
    itemSelector: 'div.thumb-wrap',
    tpl: [
        // '<div class="details">',
            '<tpl for=".">',
                '<div class="thumb-wrap">',
                    '<div class="thumb">',
                        '<img src= "'+Global.getUrlBase()+'{image}" />',
                    '</div>',
                    '<span>{product_name}</span>',
                    '<span>$ {price}</span>',
                '</div>',
            '</tpl>'
        // '</div>'
    ],
    
    initComponent: function() {
        this.store = Ext.create('Admin.store.products.ProductsStore', {
            autoLoad: true,
            sorters: 'line_name'
        });
        
        this.callParent(arguments);
    }
});