Ext.define('Admin.store.base.StoreApi',{
	extend		: 'Admin.store.base.StoreUrl',
	storeId		: 'StoreApi',
	pageSize	: 60,
    proxy: {
		type	: 'ajax',
	    api: {
			    create  : 'c_general/insert_data',
			    read    : 'c_general/get_select',
			    update  : 'c_general/update_data',
			    destroy : 'c_general/delete_data'
		},
	    writer : {
			type 			: 'json',
			rootProperty	: 'records',
			encode 			: true
		}
	}
});
