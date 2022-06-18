Ext.define('Admin.view.products.views.ProductsIgameView',{
    extend : 'Admin.core.base.WindowCrud',
    xtype   : 'productsimageview',
    alias   : 'widget.productsimageview',
    controller : 'products',
    closeAction 	: 'hide',
    initComponent: function () {
        this.callParent(arguments);
        this.setTitle('Agregar/Editar Imagen del Producto');
    },
    store : 'ProductsStore',
    items: [
        {
            xtype           : 'customForm',
            showSaveButton  : false,
            items: [
                {
                    xtype       : 'hiddenfield',
                    name        : 'id',
                    value       : '0'
                },
                {
                    xtype       : 'filefield',
                    name        : 'image',
                    fieldLabel  : 'Imagen',
                    labelWidth  : 50,
                    msgTarget   : 'side',
                    allowBlank  : true,
                    anchor      : '100%',
                    buttonText  : 'Seleccionar imagen...'
                }               
            ],
            buttons: [{
                text: 'Subir',
                handler: function(btn) {
                    var form    = btn.up('window').down('form').getForm(),
                        me      = Admin.getApplication();
                    if(form.isValid()) {
                        form.submit({
                            url: Global.getUrlBase() +  'api/master/setimageprod',
                            waitMsg: 'Cargando imagen...',
                            params   : {
                                pdbId       : JSON.stringify(form.getValues()),
                                pdbTable    : 'tb_products'
                            },
                            success: function(fp, o) {
                                me.showResult('Se ha cargado la imagen del producto correctamente.');
                            },
                            failure : function(r){
                                me.showResult('Error al cargar la imager del producto.');
                            }
                        });
                    }
                }
            }]
        }
    ]    
});