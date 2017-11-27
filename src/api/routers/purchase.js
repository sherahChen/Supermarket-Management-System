var db = require('../db/dbhelper');
module.exports={
    register:function(app){
        app.get('/purchase/stock_in',function(req,res){
            var products=req.body.g_name;
            db.mongodb.select('stock_in',{r_goods:products},function(result){
                res.send(result);
            })
        })
    }
}