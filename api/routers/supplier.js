
// 后端供货商js代码
var db = require('../db/dbhelper');
// 供应商
module.exprorts={
    sup:function(app){
        app.post('/supplier',function(req,res){
            // 从数据库拿数据
            db.mongodb
            res.send("supplier");
        })
    }
}