require.config({
    paths:{
        jquery:'../libs/jquery-3.2.1',
        common:'common',
        jqueryUI:'../libs/jquery-ui-1.12.1/jquery-ui'

    },
    shim:{
       common:['jquery'],
       jqueryUI:['jquery']
      
    }

});