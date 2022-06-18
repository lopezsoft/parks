Ext.define('Admin.core.combo.CustomComboBox',{
	extend	: 'Ext.form.field.ComboBox',
	alias	: 'widget.customComboBox',
	queryMode	: 'remote',
	allowBlank	: false,
	labelAlign	: 'top',
    labelStyle	: 'font-weight:bold',
    queryCaching: true,
    typeAhead   : true,
    selectOnFocus   : true,
    focusable		: true,
    width 		: '100%',
    emptyText 	: 'Seleccione por favor...',
    queryDelay	: '10',
    labelWidth	: 180,
    autoLoadOnValue : true,
    minChars    : 2,
    anyMatch    : true,
    modal       : true,
    frame       : true,
    pageSize    : 30,
    enableRegEx : true,
    listeners: {
        beforequery: function(qe){
            delete qe.combo.lastQuery;
        },
        focusenter : function (t) {
            oldValue = t.value;
            if (oldValue) {
                t.expand();
            }

        }
    }
});

