/**
 * Created by LOPEZSOFT on 19/03/2016.
 */
Ext.define('Admin.store.general.CountryStore',{
    extend  : 'Admin.store.base.StoreUrl',
    storeId : 'CountryStore',
    pageSize: 300,
    requires    : [
        'Admin.model.general.CountryModel'
    ],
    model   : 'Admin.model.general.CountryModel',
    proxy   : {
        url : 'general/getcountries'
    }
});
