/**
 * Created by LOPEZSOFT on 10/02/2016.
 */
Ext.define('Admin.core.group.CheckboxGroup',{
    extend      : 'Ext.form.CheckboxGroup',
    labelStyle	: 'font-weight:bold',
    labelWidth	: 180,
    alias       : 'widget.checkboxGroup',
    msgTarget	: 'side',
    allowBlank  :false,
    columns     : 1,
    vertical    : true
});