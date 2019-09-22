Ext.define('Admin.store.base.StoreApi',{
	extend		: 'Admin.store.base.StoreUrl',
	storeId		: 'StoreApi',
	pageSize	: 60,
    proxy: {
		type	: 'ajax',
	    api: {
			    create  : 'master/insertdata',
			    read    : 'master/getdata',
			    update  : 'master/setdata',
			    destroy : 'master/deletedata'
		},
	    writer : {
			type 			: 'json',
			rootProperty	: 'records',
			encode 			: true
		}
	}
});
