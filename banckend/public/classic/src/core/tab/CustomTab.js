/**
 * Created by LOPEZSOFT2 on 13/02/2017.
 */
Ext.define('Admin.core.tab.CustomTab',{
    extend   : 'Ext.tab.Panel',
    alias   : 'widget.customTab',
    width   : '100%',
    height  : '100%',
    ui      :'tabblue',
    frame   : true,
    activeTab: 0,
    plain   : false,
    defaults: {
        bodyPadding: 1,
        scrollable: true
    }
});