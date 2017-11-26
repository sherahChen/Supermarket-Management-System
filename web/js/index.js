require(['config'],function(){
    require(['jquery','jqueryUI','supplier','global'],function(){
        $( "#accordion" ).accordion({
          heightStyle: "content"
        });
    });
});