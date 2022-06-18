Ext.define('Admin.view.main.MainController', {
    extend: 'Admin.core.base.BaseController',
    alias: 'controller.main',

    listen : {
        controller : {
            '#' : {
                unmatchedroute : 'onRouteChange'
            }
        }
    },

    routes: {
        ':node': 'onRouteChange'
    },

    lastView: null,

    setCurrentView: function(hashTag) {
        hashTag = (hashTag || '').toLowerCase();
        var me = this,
            refs = me.getReferences(),
            mainCard = refs.mainCardPanel,
            mainLayout = mainCard.getLayout(),
            navigationList = refs.navigationTreeList,
            store = navigationList.getStore(),
            node = store.findNode('routeId', hashTag) ||
                   store.findNode('viewType', hashTag),
            view = (node && node.get('viewType')) || 'page404',
            lastView = me.lastView,
            existingItem = mainCard.child('component[routeId=' + hashTag + ']'),
            newView;
        // Kill any previously routed window
        if (lastView && lastView.isWindow) {
            lastView.destroy();
        }

        lastView = mainLayout.getActiveItem();

        if (!existingItem) {
            if (view == 'page404') {
                this.redirectTo('');
                return true;
            }else{
                newView = Ext.create({
                    xtype: view,
                    routeId: hashTag,  // for existingItem search later
                    hideMode: 'offsets'
                });
            }
        }

        if (!newView || !newView.isWindow) {
            // !newView means we have an existing view, but if the newView isWindow
            // we don't add it to the card layout.
            if (existingItem) {
                // We don't have a newView, so activate the existing view.
                if (existingItem !== lastView) {
                    mainLayout.setActiveItem(existingItem);
                }
                newView = existingItem;
            }
            else {
                // newView is set (did not exist already), so add it and make it the
                // activeItem.
                Ext.suspendLayouts();
                mainLayout.setActiveItem(mainCard.add(newView));
                Ext.resumeLayouts(true);
            }
        }

        navigationList.setSelection(node);

        if (newView.isFocusable(true)) {
            newView.focus();
        }

        me.lastView = newView;
    },

    onNavigationTreeSelectionChange: function (tree, node) {
        var to = node && (node.get('routeId') || node.get('viewType'));
        if (to) {
            this.redirectTo(to);
        }
    },

    onToggleNavigationSize: function () {
        var me = this,
            refs = me.getReferences(),
            navigationList = refs.navigationTreeList,
            wrapContainer = refs.mainContainerWrap,
            collapsing = !navigationList.getMicro(),
            new_width = collapsing ? 64 : 290;

        if (Ext.isIE9m || !Ext.os.is.Desktop) {
            Ext.suspendLayouts();

            refs.senchaLogo.setWidth(new_width);

            navigationList.setWidth(new_width);
            navigationList.setMicro(collapsing);

            Ext.resumeLayouts(); // do not flush the layout here...

            // No animation for IE9 or lower...
            wrapContainer.layout.animatePolicy = wrapContainer.layout.animate = null;
            wrapContainer.updateLayout();  // ... since this will flush them
        }
        else {
            if (!collapsing) {
                // If we are leaving micro mode (expanding), we do that first so that the
                // text of the items in the navlist will be revealed by the animation.
                navigationList.setMicro(false);
            }

            // Start this layout first since it does not require a layout
            refs.senchaLogo.animate({dynamic: true, to: {width: new_width}});

            // Directly adjust the width config and then run the main wrap container layout
            // as the root layout (it and its chidren). This will cause the adjusted size to
            // be flushed to the element and animate to that new size.
            navigationList.width = new_width;
            wrapContainer.updateLayout({isRoot: true});
            navigationList.el.addCls('nav-tree-animating');

            // We need to switch to micro mode on the navlist *after* the animation (this
            // allows the "sweep" to leave the item text in place until it is no longer
            // visible.
            if (collapsing) {
                navigationList.on({
                    afterlayoutanimation: function () {
                        navigationList.setMicro(true);
                        navigationList.el.removeCls('nav-tree-animating');
                    },
                    single: true
                });
            }
        }
    },

    onMainViewRender:function() {
        if(AuthToken.isAuthenticated()){
            if (!window.location.hash) {
                this.redirectTo("dashboard");
            }
        }else{
            this.redirectTo("login");
        }
    },

    onRouteChange:function(id){
        let me  = this;
        let app = Admin.getApplication();
        if(AuthToken.isAuthenticated()){
            me.mask();
            switch (id) {
                case 'events/schedule':
                    window.open('apps/calendar', '_blank');
                    me.unMask();
                    me.setCurrentView('dashboard');
                    break;
                case 'company':
                    Ext.require([
                        'Admin.view.company.forms.CompanyForm'
                    ]);
                    Ext.onReady(function () {
                        me.unMask();
                        app.onStore('company.CompanyStore');
                        app.onStore('general.CountryStore');
                        me.setCurrentView(id);
                    });
                    break;
                case 'branchoffices':
                    Ext.require([
                        'Admin.view.company.forms.BranchsForm'
                    ]);
                    Ext.onReady(function () {
                        me.unMask();
                        app.onStore('company.BranchOfficesStore');
                        me.setCurrentView(id);
                    });
                    break;
                case 'products':
                    Ext.require([
                        'Admin.view.products.forms.ProductsForm'
                    ]);
                    Ext.onReady(function () {
                        me.unMask();
                        app.onStore('products.ProductsStore');
                        app.onStore('products.LinesStore');
                        app.onStore('products.CategoriesStore');
                        app.onStore('company.BranchOfficesStore');
                        me.setCurrentView(id);
                    });
                    break;
                case 'products/lines':
                    Ext.require([
                        'Admin.view.products.forms.LinesForm'
                    ]);
                    Ext.onReady(function () {
                        me.unMask();
                        app.onStore('products.LinesStore');
                        me.setCurrentView(id);
                    });
                    break;
                case 'products/categories':
                    Ext.require([
                        'Admin.view.products.forms.CategoriesForm'
                    ]);
                    Ext.onReady(function () {
                        me.unMask();
                        app.onStore('products.CategoriesStore');
                        me.setCurrentView(id);
                    });
                    break;
                case 'products/fastfood':
                    Ext.require([
                        'Admin.core.docs.ProductsBrowser',
                        'Admin.core.docs.InfoPanel',
                        'Admin.view.products.forms.FastFoodForm'
                    ]);
                    Ext.onReady(function () {
                        me.unMask();
                        app.onStore('fastfood.ProductsSalesStore');
                        app.onStore('products.ProductsFastStore');
                        app.onStore('products.CategoriesFastStore');
                        app.onStore('products.LinesFastStore');

                        win = Ext.create('Admin.view.products.forms.FastFoodForm');
                        win.on('onClose', function(){
                            me.setCurrentView('dashboard');
                        });
                        win.show();
                        // me.setCurrentView(id);
                    });
                    break;
                case 'sales/services':
                    Ext.require([
                        'Admin.view.sales.forms.ServicesForm'
                    ]);
                    Ext.onReady(function () {
                        me.unMask();
                        app.onStore('sales.ServicesStore');
                        me.setCurrentView(id);
                    });
                    break;
                case 'sales/branchservices':
                    Ext.require([
                        'Admin.view.sales.forms.BranchServicesForm'
                    ]);
                    Ext.onReady(function () {
                        me.unMask();
                        app.onStore('sales.BranchServicesStore');
                        app.onStore('sales.ServicesStore');
                        app.onStore('company.BranchOfficesStore');

                        me.setCurrentView(id);
                    });
                    break;
                case 'sales/footwear':
                    Ext.require([
                        'Admin.view.sales.forms.FootWearForm'
                    ]);
                    Ext.onReady(function () {
                        me.unMask();
                        app.onStore('sales.FootWearStore');
                        me.setCurrentView(id);
                    });
                    break;
                case 'sales/branchfootwear':
                    Ext.require([
                        'Admin.view.sales.forms.BranchFootWearForm'
                    ]);
                    Ext.onReady(function () {
                        me.unMask();
                        app.onStore('sales.BranchFootWearStore');
                        app.onStore('sales.FootWearStore');
                        app.onStore('company.BranchOfficesStore');
                        me.setCurrentView(id);
                    });
                    break;
                case 'settings/invoice':
                    Ext.require([
                        'Admin.view.settings.forms.ConfInvoiceForm'
                    ]);
                    Ext.onReady(function () {
                        me.unMask();
                        app.onStore('settings.ConfInvoiceStore');
                        app.onStore('company.BranchOfficesStore');
                        me.setCurrentView(id);
                    });
                    break;
                case 'customers':
                    Ext.require([
                        'Admin.view.users.forms.CustomersForm'
                    ]);
                    Ext.onReady(function () {
                        me.unMask();
                        app.onStore('general.UsersStore');
                        app.setParamStore('UsersStore',{
                            pdbTable    : 'users',
                            query       : '',
                            type        : 3
                        });
                        me.setCurrentView(id);
                    });
                    break;
                case 'customers/pretikets':
                    Ext.require([
                        'Admin.view.users.forms.PreTicketsForm'
                    ]);
                    Ext.onReady(function () {
                        me.unMask();
                        app.onStore('general.PreTicketsStore');
                        me.setCurrentView(id);
                    });
                    break;
                case 'users/list':
                    Ext.require([
                        'Admin.view.users.forms.UsersForm'
                    ]);
                    Ext.onReady(function () {
                        me.unMask();
                        app.onStore('general.UsersStore');
                        app.setParamStore('UsersStore',{
                            pdbTable    : 'users',
                            query       : '',
                            type        : 2
                        });
                        me.setCurrentView(id);
                    });
                    break;
                case 'users/profile':
                    Ext.require([
                        'Admin.view.profile.UserProfile'
                    ]);
                    Ext.onReady(function () {
                        me.unMask();
                        app.onStore('general.TypeUsersStore');
                        app.onStore('general.UsersStore');
                        me.setCurrentView(id);
                    });
                    break;
                case 'reports/cashcount':
                    Ext.require([
                        'Admin.view.sales.forms.CashClosingForm'
                    ]);
                    Ext.onReady(function () {
                        me.unMask();
                        app.onStore('general.UsersStore');
                        me.setCurrentView(id);
                    });
                    break;
                case 'reports/cashclosing':
                    Ext.require([
                        'Admin.view.sales.forms.CashClosingForm'
                    ]);
                    Ext.onReady(function () {
                        me.unMask();
                        app.onStore('general.UsersStore');
                        me.setCurrentView(id);
                    });
                    break;
                default:
                    Ext.require([
                        'Admin.*'
                    ]);
                    Ext.onReady(function(){
                        me.unMask();
                        me.setCurrentView(id);
                    });
                    break;
            }
        }else{
            AuthToken.redirectTo();
        }
    },

    onSearchRouteChange: function () {
        this.setCurrentView('searchresults');
    },

    onSwitchToModern: function () {
        Ext.Msg.confirm('Switch to Modern', 'Are you sure you want to switch toolkits?',
                        this.onSwitchToModernConfirmed, this);
    },

    onSwitchToModernConfirmed: function (choice) {
        if (choice === 'yes') {
            var s = location.search;

            // Strip "?classic" or "&classic" with optionally more "&foo" tokens
            // following and ensure we don't start with "?".
            s = s.replace(/(^\?|&)classic($|&)/, '').replace(/^\?/, '');

            // Add "?modern&" before the remaining tokens and strip & if there are
            // none.
            location.search = ('?modern&' + s).replace(/&$/, '');
        }
    },

    onEmailRouteChange: function () {
        this.setCurrentView('email');
    }
});
