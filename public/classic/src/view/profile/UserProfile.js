Ext.define('Admin.view.profile.UserProfile', {
    extend: 'Admin.view.profile.UserProfileBase',
    xtype: 'profile',
    cls: 'userProfile-container',

    requires: [
        'Ext.ux.layout.ResponsiveColumn',
        'Admin.view.profile.ProfileView',
        'Admin.view.profile.Social'
    ],

    layout: 'responsivecolumn',

    items: [
        {
            xtype: 'profilesocial',            
            userCls: 'big-100 small-100 shadow'
        }
    ]
});
