/**
 * Created by LOPEZSOFT2 on 2/04/2017.
 */
Ext.tip.QuickTipManager.init();  // enable tooltips
Ext.define('Admin.core.field.HtmlEditor',{
    extend  : 'Ext.form.field.HtmlEditor',
    alias   : 'widget.HtmlEditor',
    scrollable  : true,
    shim        : true,
    labelStyle	: 'font-weight:bold',
    allowBlank 	: false,
    enableSourceEdit    : true,
    keyMapEnabled       : true,
    resizable           : true,
    enableFont	        : false,
    labelWidth	        : 180,
    height              : 180,
    fontFamilies        : [
        ''
    ]
});