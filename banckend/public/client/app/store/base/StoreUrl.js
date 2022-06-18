Ext.define('Admin.store.base.StoreUrl',{
	extend		: 'Ext.data.Store',
	storeId		: 'StoreUrl',
    pageSize	: 60,
	urlCrtl		: '', // Propiedad para controlar si la URL a sido cargada
    proxy: {
		type	: 'ajax',
	    reader	: {
	         type			: 'json',
	         rootProperty	: 'records',
	         totalProperty	: 'total'  
	    },
		timeout : 60000,
		listeners: {
	        exception: function(proxy, response, operation){
				var Msg = Ext.create('Ext.window.MessageBox', {
					alwaysOnTop	: true,
					modal		: true,
					closeAction	: 'destroy'
				}).show({
	                title: 'REMOTE EXCEPTION',
	                msg: "Ha ocurrido un error en el Servidor: " +response.responseText,
	                icon: Ext.MessageBox.ERROR,
	                buttons: Ext.Msg.OK
	            });
	        }
       }
	},

	listeners: {
		beforesync : function (o , eOpts) {
			var me = this,
				baseUrlSys = Global.getUrlBase()+'api/', // Obtenemos la URL base
				datos	= null,
				proxy 	= null,
				pUrl	= null,
				param	= {},
				pApi	= null;
			
			param	= AuthToken.recoverParams();
			datos 	= this; // Guardamos el Store
			proxy 	= datos.getProxy(); // Obtenemos el PROXY de Ajax
			pUrl	= proxy.url; // Obtenemos la URL que se ha pasado para la consulta el servidor
			pApi	= proxy.getApi();
			xparams	= proxy.getExtraParams();
			// xparams.Authorization 	= param.token_type +' '+ param.token;
			proxy.headers = 
				{
					Authorization : param.token_type +' '+ param.token
				};
			proxy.setExtraParams(xparams);

			if (me.urlCrtl === '') { // La Url no ha sido cargada, se carga.
				if (pUrl === '') {

					cCreate = baseUrlSys + pApi.create;
					cDestroy = baseUrlSys + pApi.destroy;
					cRead = baseUrlSys + pApi.read;
					cUpdate = baseUrlSys + pApi.update;

					api = {
						create: cCreate,
						read: cRead,
						update: cUpdate,
						destroy: cDestroy
					};

					proxy.setApi(api);

				} else {
					proxy.setUrl(baseUrlSys + pUrl);
				};

				me.urlCrtl	= 'baseFull' ;// Se llena la propiedad que controla la carga de la URL.
			}
		},

		beforeload: function (xStore, operation, eOpts ){
			var me = this,
					baseUrlSys = Global.getUrlBase()+'api/', // Obtenemos la URL base
					datos	= null,
					proxy 	= null,
					pUrl	= null,
					param	= {},
					pApi	= null;

			param	= AuthToken.recoverParams();
			datos 	= xStore; // Guardamos el Store
			proxy 	= datos.getProxy(); // Obtenemos el PROXY de Ajax
			pUrl	= proxy.url; // Obtenemos la URL que se ha pasado para la consulta el servidor
			pApi	= proxy.getApi();
			xparams	= proxy.getExtraParams();
			// xparams.Authorization 	= param.token_type +' '+ param.token;
			proxy.headers = 
				{
					Authorization : param.token_type +' '+ param.token
				};
			proxy.setExtraParams(xparams);

			if (me.urlCrtl === '') { // La Url no ha sido cargada, se carga.
				if (pUrl === '') {

					cCreate = baseUrlSys + pApi.create;
					cDestroy = baseUrlSys + pApi.destroy;
					cRead = baseUrlSys + pApi.read;
					cUpdate = baseUrlSys + pApi.update;

					api = {
						create: cCreate,
						read: cRead,
						update: cUpdate,
						destroy: cDestroy
					};

					proxy.setApi(api);

				} else {
					proxy.setUrl(baseUrlSys + pUrl);
				};

				me.urlCrtl	= 'baseFull' ;// Se llena la propiedad que controla la carga de la URL.
			}
		}
	}
});
