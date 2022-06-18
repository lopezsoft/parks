/**
 * Created by LOPEZSOFT2 on 12/12/2016.
 */
Ext.define('Admin.core.field.FieldSet',{
    extend  : 'Ext.form.FieldSet',
    border	: 1,
    defaultType : 'TextField',
    alias		: 'widget.fieldSet',
    layout	    : 'vbox',
    style: {
        borderStyle: 'solid'
    },
    defaults	: {
        flex: 1,
        labelWidth: 240
    }
});