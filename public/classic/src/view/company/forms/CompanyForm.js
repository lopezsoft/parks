Ext.define('Admin.view.company.forms.CompanyForm',{
    extend : 'Admin.core.panel.CustomPanel',
    xtype   : 'companyform',
    alias   : 'widget.companyform',
    requires: [
        'Admin.view.company.CompanyController',
        'Admin.store.general.CountryStore',
        'Admin.store.company.CompanyStore',
        'Admin.core.combo.ComboCountries'
    ],
    controller : 'company',
    initComponent: function () {
        this.callParent(arguments);
        this.setTitle('Datos de la empresa o compañia');
    },
    items: [
        {
            xtype       : 'customForm',
            store       : 'CompanyStore',
            items: [
                {
                    fieldLabel  : 'Nombre de la empresa',
                    name        : 'business_name'
                },
                {
                    xtype       : 'combocountries'
                },
                {
                    fieldLabel  : 'Ciudad',
                    name        : 'city'
                },
                {
                    fieldLabel  : 'Dirección',
                    name        : 'address'
                },
                {
                    fieldLabel  : 'Correo electrónico',
                    name        : 'email'
                },
                {
                    fieldLabel  : 'Teléfono fijo',
                    name        : 'phone',
                    allowBlank  : true
                },
                {
                    fieldLabel  : 'Teléfono celular',
                    name        : 'mobile',
                    allowBlank  : true
                }
            ]
        }
    ],
    listeners   : {

    }
});