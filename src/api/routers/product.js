var db = require('../db/dbhelper')

var apiresult = require('../module/apiresult');

module.exports = {
    register:function(app){
        app.post('/getproduct',function(req,res){
            var barcode = req.body.barcode;
            db.mongodb.select('product',{barcode:barcode},function(result){
                if(result.state && result.data.length > 0){
                    res.send(apiresult(true,result.data));
                }else{
                    res.send(apiresult(false,result.data));
                }
            })
        })
    }
}