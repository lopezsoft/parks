/**
 * Created by LOPEZSOFT on 6/02/2016.
 */
Ext.define('Admin.core.field.TimeField',{
    extend      : 'Ext.form.field.Time',
    msgTarget	: 'side',
    fieldLabel  : 'Hora',
    minValue    : '06:00 AM',
    maxValue    : '11:59 PM',
    increment   : 1,
    selectOnFocus  : true,
    labelWidth	: 180,
    labelAlign	: 'left',
    labelStyle	: 'font-weight:bold',
    width 		: '100%',
    allowBlank 	: false,
    alias       : 'widget.timeField',
    emptyText 	: 'Campo obligatorio',
    tooltip 	: '',
    listeners: {
        'focus' : function (textField, event, eOpts) {
            var me = this;
            if (!Ext.isEmpty(this.tooltip)) {
                new Ext.ToolTip({
                    target : this.id,
                    trackMouse : true,
                    maxWidth : 300,
                    minWidth : 100,
                    html : '<p align="justify">'+ this.tooltip +'</p>'
                });
            }
        }
    }
});