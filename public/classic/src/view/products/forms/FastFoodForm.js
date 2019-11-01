Ext.define('Admin.view.products.forms.FastFoodForm',{
    extend      : 'Ext.window.Window',
    alias       : 'widget.fastfoodform',
    xtype       : 'fastfoodform',
    uses: [
        'Ext.layout.container.Border',
        'Ext.form.field.Text',
        'Ext.form.field.ComboBox',
        'Admin.core.panel.CustomPanel',
        'Ext.toolbar.TextItem',
        'Ext.layout.container.Fit'
    ],
    controller : 'products',
    requires: [
        'Admin.view.products.ProductsController',
        'Admin.view.users.views.ReceiveView'
    ],
    autoShow    : true,
    ui          :'win-blue',
    layout      : 'border',
    // modal       : true,
    closeAction : 'destroy',
    border      : false,
    maximized   : true,
    bodyBorder  : false,
    config : {
        countRecord : 0 
    },
    constructor: function (cfg) {
        this.callParent(arguments);
        this.on('onClose',function(){
        });
	},
    initComponent: function () {
        var 
            app     = Admin.getApplication(),
            params  = AuthToken.recoverParams();
    
        this.setTitle('MENÚ - COMIDA RÁPIDA');

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
        if (params.user.type == 1) {
            this.onProducts(1);
        }else{
            this.onProducts(2);
        }
        this.onCategoryTool();
    },
    listeners   : {
        close : function(ts){
            ts.fireEvent('onClose');
        }
    },
    onRefresh : function () {
        var
            pStore = Ext.getStore('ProductsFastStore');
        if(pStore){
            pStore.reload();
        }
    },
    onProducts : function (val) {
        var
            app     = Admin.getApplication(),
            me      = this,
            name    = (val == 1) ? 'PAQUETES' : 'PRODUCTOS',
            pStore  = Ext.getStore('ProductsFastStore');
            // console.log(me);
        if(pStore){
            app.setParamStore('ProductsFastStore',{
                type        : val,
                pdbTable    : 'tb_products',
                branch      : '1'
            });
            try {
                // me.mask('Cargando productos y lineas de productos');
                pStore.reload({
                    callback : function(record){
                        me.onLinesTool();
                    }
                });
                me.setTitle('MENÚ - COMIDA RÁPIDA : ' + name );
            } catch (error) {
                // me.unmask();
            }
        }
    },

    onClear : function(){
        var me  = this;
        pStore = Ext.getStore('ProductsFastStore');
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
            xStore  = Ext.getStore('LinesFastStore'),
            zStore  = Ext.getStore('ProductsFastStore'),
            me      = this,
            items   = [],
            item    = {},
            xtool   = me.down('#toolLin');

        if (xStore) {
            xStore.reload({
                callback : function(records, o, e){
                    try {
                        xtool.removeAll();
                        zStore.each(function(dt){
                            xStore.each(function(d, index){
                                if(d.data.active == 1 && d.data.id == dt.data.id_line){
                                    item    = {
                                        active  : d.data.active,
                                        color   : d.data.color,
                                        value   : d.data.id,
                                        itemId  : d.data.id,
                                        text    : d.data.line_name,
                                        iconCls : null,
                                        tooltip : d.data.line_name,
                                        handler : function(btn){
                                            var me  = this.up('window');
                                            me.onFilterLines(btn);
                                        }
                                    };
                                    items.push(item);
                                    return false;
                                }
                            });
                        });
                        if(items.length > 0){
                            xtool.add(items);
                        }
                        // me.unmask();
                    } catch (error) {
                        // me.unmask();
                    }
                }
            })
        }
    },
    onCategoryTool : function(){
        var 
            zStore  = Ext.getStore('CategoriesFastStore')
            me      = this,
            xitems  = [],
            item    = {},
            params  = AuthToken.recoverParams(),
            ztool   = me.down('#toolCat');
        if (zStore) {
            zStore.reload({
                callback : function(records, o, e){
                    item    = {
                        text    : 'Refrescar',
                        iconCls : 'fas fa-sync',
                        tooltip : 'Actulizar la lista de los productos',
                        handler : function(btn){
                            var me  = this.up('window');
                            me.onRefresh(btn);
                        }
                    };
                    xitems.push(item);
                    item    = {
                        text    : 'Limpiar',
                        iconCls : 'fas fa-broom',
                        tooltip : 'Quita el filtro aplicado y muestra la lista de todos los productos',
                        handler : function(btn){
                            var me  = this.up('window');
                            me.onClear(btn);
                        }
                    };
                    xitems.push(item);
                    if (params.user.type == 1) {
                        item    = {
                            text    : 'Paquetes',
                            iconCls : 'fas fa-box-open',
                            tooltip : 'Muestra los productos tipo paquetes',
                            handler : function(btn){
                                var me  = this.up('window');
                                me.onProducts(1);
                            }
                        };
                        xitems.push(item);
                        item    = {
                            text    : 'Productos',
                            iconCls : 'fas fa-archive',
                            tooltip : 'Muestra solo los productos',
                            handler : function(btn){
                                var me  = this.up('window');
                                me.onProducts(2);
                            }
                        };
                        xitems.push(item);
                    }else{
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
                                    var me  = this.up('window');
                                    me.onFilterCategories(btn);
                                }
                            };
                            xitems.push(item);
                        });
                    }
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
            params  = AuthToken.recoverParams(),
            app     = Admin.getApplication(),
            total   = me.down('#total').getValue(),
            Button  = btn,
            dataSend=[],
            contr   = me.getController();
        Button.setDisabled(false);
        uStore.each(function(r,i){
            if (r.data.cant) {
                xData.push(r.data);
            }
        });

        if(xData.length > 0){
            win     = Ext.create('Admin.view.users.views.ReceiveView');
            var number = total.replace(/[^0-9\,-]+/g,"");
            win.down('#total').setValue(parseFloat(number));
            win.on('receive', function(btn){
                win.mask('Generando venta, espere por favor');
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
                            var 
                            values  = win.down('form').getValues();
                            dataSend                = {};
                            dataSend.discount       = parseFloat(values.discount) > 0 ? values.discount : 0;
                            dataSend.value_paid     = values.value_paid;
                            dataSend.value_to_pay   = values.value_to_pay;
                            dataSend.change         = values.change;
                            dataSend.id             = obj.records.id_sale;
                            Ext.Ajax.request({
                                url     : Global.getUrlBase() + 'api/report/settickets',
                                headers: {
                                    'Authorization ' : params.token_type +' ' + params.access_token
                                },
                                method      : 'GET',
                                params      : {
                                    records     : JSON.stringify(dataSend),
                                    user        : params.user.id,
                                    type        : 2,
                                    cash        : params.cash.id
                                },
                                success: function(r, opts) {
                                    obj = Ext.decode(r.responseText);
                                    if(obj.success == true){
                                        var url = Global.getUrlBase() + obj.records.report;
                                        app.showResult('Se ha realizado la venta correctamente.');
                                        app.getIframe(url,'pdf', me);
                                        win.close();
                                    }else{
                                        app.showResult('Ocurrio un error al generar el ticket.');
                                    }
                                    win.unmask();
                                    Button.setDisabled(false);
                                },
                                failure: function(response, opts) {
                                    win.unmask();
                                    Button.setDisabled(false);
                                    app.showResult('server-side failure with status code ' + response.status);
                                }
                            });
                            me.onClearGrid(me);                            
                        }else{
                            win.unmask();
                            Button.setDisabled(false);
                            app.showResult('Ocurrio un error al generar el ticket.');
                        }
                    },
                    failure: function(response, opts) {
                        win.unmask();
                        Button.setDisabled(false);
                        app.showResult('server-side failure with status code ' + response.status);
                    }
                });
            });
            win.show();
        }else{
            Button.setDisabled(false);
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
            // this.fireEvent('selected', selectedImage);
            this.down('infopanel').loadRecord(selectedImage);
        }
    }
});
