/**
 * Created by LOPEZSOFT on 10/02/2016.
 */
Ext.define('Admin.core.group.RadioGroup',{
    extend      : 'Ext.form.RadioGroup',
    labelStyle	: 'font-weight:bold',
    labelWidth	: 180,
    alias       : 'widget.radioGroup',
    msgTarget	: 'side',
    allowBlank  :false,
    columns     : 1,
    vertical    : true
});