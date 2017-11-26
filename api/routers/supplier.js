
// 后端供货商js代码
var apirequire = require('../modules/apiresult.js');
var db = require('../db/dbhelper');
// 供应商
module.exports={
    sup:function(app){
        app.post('/supplier',function(req,res){
            // 从数据库拿数据
            db.mongodb.select('supplier',{},function(result){

                res.send(result);
            })
        })

        app.post('/add',function(req,res){
            db.mongodb.insert('supplier',req.body,function(result){
                res.send(result);
            })

        })
        app.post('/del',function(req,res){
            db.mongodb.delete('supplier',req.body,function(result){
                res.send(result.data);
                console.log(req.body)
                console.log(result)
            })

        })

    }
}