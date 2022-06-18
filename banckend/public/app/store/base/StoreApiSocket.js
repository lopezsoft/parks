Ext.define('Admin.store.base.StoreApiSocket',{
	extend		: 'Admin.store.base.StoreUrlSocket',
    proxy: {
		type	: 'socketio',
		storeId	: 'StoreApiSocket',
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
