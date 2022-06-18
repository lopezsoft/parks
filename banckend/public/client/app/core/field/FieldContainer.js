/**
 * Created by LOPEZSOFT2 on 12/12/2016.
 */
Ext.define('Admin.core.field.FieldContainer',{
    extend  : 'Ext.form.FieldContainer',
    border	: 0,
    style: {
        borderStyle: 'none'
    },
    defaultType : 'customText',
    labelStyle	: 'font-weight:bold',
    layout	    : 'vbox',
    defaults	: {
        flex: 1,
        labelWidth: 120
    },
    bodyPadding: 2,
    alias		: 'widget.fieldContainer'
});