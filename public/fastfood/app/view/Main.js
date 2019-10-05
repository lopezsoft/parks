Ext.define('Admin.view.Main',{
    extend      : 'Admin.core.forms.CustomForm',
    alias       : 'widget.Main',
    viewModel   : 'main',
    alias       : 'widget.formview',
    uses: [
        'Ext.layout.container.Border',
        'Ext.form.field.Text',
        'Ext.form.field.ComboBox',
        'Admin.core.panel.CustomPanel',
        'Ext.toolbar.TextItem',
        'Ext.layout.container.Fit'
    ],
    layout: 'border',
    defaults: {
        border: false,
        xtype: 'panel',
        layout: 'anchor'
    },
    config : {
        countRecord : 0 
    },
    initComponent: function () {
        var 
            report  = AuthToken.recoverReport();
        this.setTitle('MENÚ - COMIDA RÁPIDA');
        if(report){
            Admin.getApplication().getIframe(report,'pdf');
        };

        this.items = [
            {
                xtype   : 'panel',
                region  : 'north',
                dockedItems: [
                    {
                        xtype   : 'customToolbar',
                        itemId  : 'toolLin',
                        dock    : 'top',
                        defaults : {
                            border  : false,
                            cls     : 'button-cat',   
                            scale   : 'large',
                            xtype   : 'customButton'
                        },
                        items   : []
                    }
                ]
            },
            {
                xtype   : 'panel',
                region  : 'center',
                layout  : 'fit',
                items   : [
                    {
                        xtype           : 'productsbrowser',
                        scrollable      : true,
                        id              : 'img-chooser-view',
                        listeners: {
                            scope: this,
                            selectionchange: this.onIconSelect,
                            itemdblclick: this.fireImageSelected
                        }
                    }
                ],
                dockedItems: [
                    {
                        xtype   : 'customToolbar',
                        itemId  : 'toolCat',
                        dock    : 'bottom',
                        defaults : {
                            border  : false,
                            cls     : 'button-cat',   
                            scale   : 'large',
                            xtype   : 'customButton'
                        },
                        items   : []
                    }
                ]           
            },
            {
                xtype   : 'infopanel',
                region  : 'east',
                split   : true
            }
        ];

        this.callParent(arguments);
        this.onLinesTool();
        this.onCategoryTool();
    },
    onRefresh : function () {
        var
         pStore = Ext.getStore('ProductsStore');
        if(pStore){
            pStore.reload();
        }
    },
    onClear : function(){
        var me  = this;
        pStore = Ext.getStore('ProductsStore');
        if(pStore){
            if(pStore.isFiltered()){
                pStore.clearFilter();
                me.setTitle('MENÚ - COMIDA RÁPIDA')
            }
        }
    },
    onFilterCategories : function (btn){
        var view        = this.down('productsbrowser'),
            store       = view.getStore(),
            me          = this,
            newValue    = btn.value,
            value       = btn.getText();
        
        store.getFilters().replaceAll({
            property: 'id_category',
            anyMatch: true,
            value   : newValue
        });
        me.setTitle('MENÚ - COMIDA RÁPIDA - CATEGORIA: ' + value.toUpperCase())
    },
    onFilterLines : function (btn){
        var view        = this.down('productsbrowser'),
            store       = view.getStore(),
            me          = this,
            newValue    = btn.value,
            value       = btn.getText();
        
        store.getFilters().replaceAll({
            property: 'id_line',
            anyMatch: true,
            value   : newValue
        });
        me.setTitle('MENÚ - COMIDA RÁPIDA - LÍNEA: ' + value.toUpperCase())
    },
    onLinesTool : function(){
        var 
            xStore  = Ext.getStore('LinesStore')
            me      = this,
            items   = [],
            item    = {};
        if (xStore) {
            xStore.reload({
                callback : function(records, o, e){
                    var xtool = me.down('#toolLin');
                    xStore.each(function(d, index){
                        if(d.data.active == 1){
                            item    = {
                                active  : d.data.active,
                                color   : d.data.color,
                                value   : d.data.id,
                                text    : d.data.line_name,
                                iconCls : null,
                                tooltip : d.data.line_name,
                                handler : function(btn){
                                    me.onFilterLines(btn);
                                }
                            };
                            items.push(item);
                        }
                    });
                    if(items.length > 0){
                        xtool.add(items);
                    }
                }
            })
        }
    },
    onCategoryTool : function(){
        var 
            zStore  = Ext.getStore('CategoriesStore')
            me      = this,
            xitems  = [],
            item    = {};
        if (zStore) {
            zStore.reload({
                callback : function(records, o, e){
                    var ztool = me.down('#toolCat');
                    item    = {
                        text    : 'Refrescar',
                        iconCls : 'fas fa-sync',
                        tooltip : 'Actulizar la lista de los productos',
                        handler : function(btn){
                            me.onRefresh(btn);
                        }
                    };
                    xitems.push(item);
                    item    = {
                        text    : 'Limpiar',
                        iconCls : 'fas fa-broom',
                        tooltip : 'Quita el filtro aplicado y muestra la lista de todos los productos',
                        handler : function(btn){
                            me.onClear(btn);
                        }
                    };
                    xitems.push(item);
                    item    = '-';
                    xitems.push(item);

                    zStore.each(function(d, index){
                        item    = {
                            active  : d.data.active,
                            color   : d.data.color,
                            value   : d.data.id,
                            text    : d.data.category_name,
                            iconCls : null,
                            tooltip : d.data.category_name,
                            handler : function(btn){
                                me.onFilterCategories(btn);
                            }
                        };
                        xitems.push(item);
                    });
                    if(xitems.length > 0){
                        ztool.add(xitems);
                    }
                }
            })
        }
    },
    onTiket : function (btn) {
        var me      = this,
            uStore  = me.down('grid').getStore(),
            xData   = [],
            params  = AuthToken.recoverParams();
            app     = Admin.getApplication();
        
        uStore.each(function(r,i){
            if (r.data.cant) {
                xData.push(r.data);
            }
        });

        if(xData.length > 0){
            Ext.Ajax.request({
                url     : Global.getUrlBase() + 'api/report/getticketfastfood',
                headers: {
                    'Authorization ' : params.token_type +' ' + params.access_token
                },
                method      : 'GET',
                params      : {
                    records : JSON.stringify(xData),
                    user    : params.user.id
                },
                success: function(r, opts) {
                    obj = Ext.decode(r.responseText);
                    if(obj.success == true){
                        var url = Global.getUrlBase() + obj.records.report;
                        app.showResult('Se ha realizado el pedido correctamente.');
                        AuthToken.saveReport(url);
                        app.getIframe(url,'pdf', me);
                        me.onClearGrid(me);
                    }else{
                        app.showResult('Ocurrio un error al generar el ticket.');
                    }
                },
                failure: function(response, opts) {
                    app.showResult('server-side failure with status code ' + response.status);
                }
            });
        }else{
            app.showResult('No hay productos para generar el recibo.');
        }
    },

    onPlus : function(btn){
        var 
            me          = this,
            app         = Admin.getApplication(),
            xyStore     = me.down('grid').getStore(),
            data        = me.down('grid').getSelection(),
            panel       = me.down('infopanel'),
            value       = {},
            record      = {},
            r           = {};
        if(xyStore && data.length > 0){
            if(xyStore.getCount() > 0 ){
                record  = data[0];
                r   = xyStore.findRecord('id',record.data.id);
                if (r) {
                    value       = record.data;
                    value.cant  = 1 + parseInt(value.cant);
                    value.total = parseInt(value.cant) * parseFloat(record.data.price);
                    r.set(value);
                    r.commit();
                    app.showResult('Cantidad agregada.');
                };
                panel.onSuma();
            };
        }
    },
    onMinus : function(btn){
        var 
            me          = this,
            app         = Admin.getApplication(),
            xyStore     = me.down('grid').getStore(),
            data        = me.down('grid').getSelection(),
            panel       = me.down('infopanel'),
            record      = {},
            value       = {},
            r           = {};
        if(xyStore && data.length > 0){
            if(xyStore.getCount() > 0 ){
                record  = data[0];
                r   = xyStore.findRecord('id',record.data.id);
                if (r) {
                    value       = record.data;
                    if (parseInt(value.cant) > 1) {
                        value.cant  = parseInt(value.cant) - 1;
                        value.total = parseInt(value.cant) * parseFloat(record.data.price);
                        r.set(value);
                        r.commit();
                        app.showResult('Se ha quitado una unidad.');
                    } else {
                        app.showResult('No puede dejar la cantidad en CEROS.');
                    }
                };
                panel.onSuma();
            };
        }
    },
    onDelete : function(btn){
        var 
            me          = this,
            app         = Admin.getApplication(),
            xyStore     = me.down('grid').getStore(),
            record      = me.down('grid').getSelection(),
            panel       = me.down('infopanel');
        if(xyStore && record.length > 0){
            if(xyStore.getCount() > 0 ){
                xyStore.remove(record);
                app.showResult('Se ha eliminado el producto.');
                panel.onSuma();
            };
        }
    },
    onNext : function(btn){
        var 
            me          = this,
            grid        = me.down('grid'),
            zyStore     = grid.getStore(),
            record      = grid.getSelection(),
            find        = {};
        if (record.length > 0) {
            if(me.getCountRecord() >= zyStore.getCount()){
                find    = zyStore.getAt(0);
                me.setCountRecord(1);
            }else{
                cn      = me.getCountRecord();
                find    = zyStore.getAt(cn);
                me.setCountRecord(cn + 1);
            }
        } else {
            find    = zyStore.getAt(0);
            me.setCountRecord(1);
        }
        if (find) {
            grid.setSelection(find);
        }
    },

    onPrevious : function(btn){
        var 
            me          = this,
            grid        = me.down('grid'),
            zyStore     = grid.getStore(),
            record      = grid.getSelection(),
            find        = {},
            countStore  = zyStore.getCount();
        if (record.length > 0) {
            if(me.getCountRecord() > 0){
                find    = zyStore.getAt(me.getCountRecord());
                me.setCountRecord(me.getCountRecord() - 1);
            }else{
                cn      = countStore;
                find    = zyStore.getAt(me.getCountRecord());
                me.setCountRecord(countStore - 1);
            }
        } else {
            find    = zyStore.getAt(0);
            me.setCountRecord(countStore);
        }
        if (find) {
            grid.setSelection(find);
        }
    },

    /**
     * @private
     * Called whenever the user types in the Filter textfield. Filters the DataView's store
     */
     filter: function(field, newValue) {
        var view = this.down('iconbrowser'),
            store = view.getStore(),
            selModel = view.getSelectionModel(),
            selection = selModel.getSelection()[0];
        
        store.getFilters().replaceAll({
            property: 'name',
            anyMatch: true,
            value   : newValue
        });
        if (selection && store.indexOf(selection) === -1) {
            selModel.clearSelections();
            // this.down('infopanel').clear();
        }
        
    },

    onClearGrid : function(btn){
        var
            me          = this,
            xyStore     = Ext.getStore('ProductsSalesStore'),
            pn          = me.down('infopanel');
            gird        = me.down('grid');
        if(xyStore){
                xyStore.clearData({});
                gird.setStore('');
                gird.setStore('ProductsSalesStore');
                pn.onSuma();
        }
    },
    
    
    /**
     * Called whenever the user clicks on an item in the DataView. This tells the info panel in the east region to
     * display the details of the image that was clicked on
     */
    onIconSelect: function(dataview, selections) {
        var selected = selections[0];
        
        if (selected) {
            this.down('infopanel').loadRecord(selected);
        }
    },
    
    /**
     * Fires the 'selected' event, informing other components that an image has been selected
     */
    fireImageSelected: function() {
        var selectedImage = this.down('productsbrowser').selModel.getSelection()[0];
        if (selectedImage) {
            this.fireEvent('selected', selectedImage);
            this.down('infopanel').loadRecord(selectedImage);
        }
    }
});
