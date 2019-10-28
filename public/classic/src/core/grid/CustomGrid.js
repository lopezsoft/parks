Ext.define('Admin.core.grid.CustomGrid' ,{
    extend	: 'Ext.grid.Panel',
    alias 	: 'widget.customGrid',
	ui		: 'blue',
	title	: 'Consulta de datos',
    requires: [
        'Ext.grid.filters.Filters',
		'Admin.core.button.ButtonsCrud',
		'Admin.core.button.LargeButton',
		'Admin.core.button.PrintButton',
		'Admin.core.toolbar.CustomToolbar',
		'Admin.core.toolbar.ToolbarCrud',
		'Admin.core.toolbar.ToolbarSave',
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
		'Admin.core.button.ContainerButton',
		'Admin.core.button.ButtonPanel',
		'Ext.grid.selection.SpreadsheetModel',
		'Ext.grid.plugin.Clipboard',
		'Ext.grid.selection.Replicator',
		'Admin.core.container.ResponsiveContainer',
		'Admin.core.container.DataListContainer',
		'Admin.core.field.FieldSet',
		'Admin.core.field.FieldContainer',
		'Admin.core.field.YearField',
        'Ext.XTemplate',
        'Ext.util.KeyNav',
        'Ext.fx.*',
        'Ext.util.Memento',
        // 'Ext.ux.exporter.Exporter',
		'Admin.core.grid.Search',
		'Ext.ux.PreviewPlugin',
		'Admin.core.grid.CustomRowNumberer',
		'Admin.core.grid.CheckboxModel'
    ],
	viewConfig: {
		enableTextSelection	: true,
		markDirty			: true
	},
	editData	: false, // Propiedad que identifica si se está en edición.
    loadmask 	: true,
    border		: true,
    autoLoad	: true,
	// selModel	: 'CheckboxModel',
    columnLines	: true,
	reserveScrollbar	: true,
	frame   	: false,
	minHeight	: 300,
	maxHeight	: 550,
	scrollable	: true,
	// iconCls		: 'x-fa fa-th',
	allowDeselect : true,
    stripeRows      : true,
	plugins		: [
		{
		 	ptype : 'gridfilters'
		},
		{
			ptype : 'responsive'
		},
		{
			ptype			: 'gridSearch',
			readonlyIndexes	: ['note'],
			disableIndexes	: ['pctChange'],
			mode            : 'remote',
			flex			: 1,
			autoFocus		: false,
			independent		: true
		}
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
			var me			= this,
				data		= {},
				params  	= AuthToken.recoverParams(),
				disabled	= false;

			if (me.down('#buttonRoles')){
				if (selected.length > 0) {
					data	= selected[0].data;
					if(parseInt(data.type) == 1 || parseInt(data.type) == 3){
						disabled	= true;
					}else{
						disabled	= false;
					}
					me.down('#buttonRoles').setDisabled(disabled);
				}else{
					me.down('#buttonRoles').setDisabled(!selected.length);
				}
			}

			if (me.down('#buttonCahsSession')){
				if (selected.length > 0) {
					data	= params.user;
					if(parseInt(data.type) == 1 ){
						disabled	= false;
					}else{
						disabled	= true;
					}
					me.down('#buttonCahsSession').setDisabled(disabled);
				}else{
					me.down('#buttonCahsSession').setDisabled(!selected.length);
				}
			}

			if (me.down('#buttonCahsClosing')){
				if (selected.length > 0) {
					data	= params.user;
					ydata	= selected[0].data;
					if(ydata.id == data.id){
						disabled	= !selected.length;
					}else{
						if(parseInt(data.type) == 1 ){
							disabled	= true;
						}else{
							disabled	= false;
						}
					}
					me.down('#buttonCahsClosing').setDisabled(disabled);
				}else{
					me.down('#buttonCahsClosing').setDisabled(!selected.length);
				}
			}

			if (me.down('#buttonCahsCount')){
				me.down('#buttonCahsCount').setDisabled(!selected.length);
			}


			if (me.down('#plusButton')){
				me.down('#plusButton').setDisabled(!selected.length);
			}

			if (me.down('#minusButton')){
				me.down('#minusButton').setDisabled(!selected.length);
			}

			if (me.down('#saveButton')){
				me.down('#saveButton').setDisabled(!selected.length);
			}

			if (me.down('#editButton')){
				me.down('#editButton').setDisabled(!selected.length);
			}

			if (me.down('#deleteButton')){
				me.down('#deleteButton').setDisabled(!selected.length);
			}

			if (me.down('#printButton')){
				me.down('#printButton').setDisabled(!selected.length);
			}

			if (me.down('#customButton')) {
				me.down('#customButton').setDisabled(!selected.length);
			}

			if (me.down('#buttomImage')) {
				me.down('#buttomImage').setDisabled(!selected.length);
			}

		}
	},
	dockedItems: [
		{
	        xtype 		: 'pagination',
	        itemId		: 'pToolbar',
	        items 		: [
				{
					xtype		: 'exportButton'
				}
	        ]	
		}
	]
});
