Ext.define('Admin.core.grid.CustomGrid' ,{
    extend	: 'Ext.grid.Panel',
    alias 	: 'widget.customGrid',
	// title	: 'Consulta de datos',
    requires: [
        'Ext.grid.filters.Filters',
		'Admin.core.button.ButtonsCrud',
		'Admin.core.button.LargeButton',
		'Admin.core.toolbar.CustomToolbar',
		'Admin.core.field.CustomDate',
		'Admin.core.field.NumberField',
		'Admin.core.field.TextAreaField',
		'Admin.core.field.CheckBoxField',
		'Admin.core.field.CustomText',
		'Admin.core.toolbar.Pagination',
		'Admin.core.forms.CustomForm',
		'Ext.form.field.Radio',
		'Admin.core.field.TimeField',
		'Admin.core.group.RadioGroup',
		'Ext.grid.selection.SpreadsheetModel',
		'Ext.grid.plugin.Clipboard',
		'Ext.grid.selection.Replicator',
		'Admin.core.container.DataListContainer',
		'Admin.core.field.FieldSet',
		'Admin.core.field.FieldContainer',
		'Admin.core.field.YearField',
        'Ext.XTemplate',
        'Ext.util.KeyNav',
        'Ext.util.Memento',
		'Admin.core.grid.Search',
		'Admin.core.grid.CustomRowNumberer',
		'Admin.core.grid.CheckboxModel'
    ],
	viewConfig: {
		enableTextSelection	: true,
		markDirty			: true
	},
    loadmask 	: true,
    border		: true,
    autoLoad	: true,
	selModel	: 'rowmodel',
    columnLines	: true,
	reserveScrollbar	: true,
	frame   	: false,
	minHeight	: 400,
	maxHeight	: 600,
	scrollable	: true,
	allowDeselect : true,
    stripeRows      : true,
	plugins		: [
		{
		 	ptype : 'gridfilters'
		},
		{
			ptype : 'responsive'
		}
		// {
		// 	ptype			: 'gridSearch',
		// 	readonlyIndexes	: ['note'],
		// 	disableIndexes	: ['pctChange'],
		// 	mode            : 'remote',
		// 	flex			: 1,
		// 	autoFocus		: false,
		// 	independent		: true
		// }
    ],
	defaults	: {
		menuDisabled	: true
	},
    listeners: {

		beforedestroy : function (grid) {
			var
				pg	= grid.getPlugin('gridSearch');
			if(!Ext.isEmpty(pg)){
				pg.onTriggerClear();
			}
		},
	    'render': function(grid, eOpts) {
			var me	= this;

			if (me.down('#pToolbar')) {
                me.down('#pToolbar').setStore(grid.getStore());
            }
		},
		'selectionchange': function(grid, selected, eOpts) {
			var me	= this;


			if (me.down('#saveButton')){
				me.down('#saveButton').setDisabled(!selected.length);
			}

			if (me.down('#editButton')){
				me.down('#editButton').setDisabled(!selected.length);
			}

			if (me.down('#deleteButton')){
				me.down('#deleteButton').setDisabled(!selected.length);
			}

			if (me.down('#minusButton')){
				me.down('#minusButton').setDisabled(!selected.length);
			}

			if (me.down('#plusButton')){
				me.down('#plusButton').setDisabled(!selected.length);
			}
			if (me.down('#upButton')){
				me.down('#upButton').setDisabled(!selected.length);
			}
			if (me.down('#downButton')){
				me.down('#downButton').setDisabled(!selected.length);
			}

			if (me.down('#printButton')){
				me.down('#printButton').setDisabled(!selected.length);
			}

			if (me.down('#customButton')) {
				me.down('#customButton').setDisabled(!selected.length);
			}

		}
	}
	// dockedItems: [
	// 	{
	//         xtype 		: 'pagination',
	//         itemId		: 'pToolbar'
	// 	}
	// ]
});
