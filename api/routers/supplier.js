
// 后端供货商js代码
var apirequire = require('../modules/apiresult.js');
var db = require('../db/dbhelper');

var ObjectId = require('mongodb').ObjectID;
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
                res.send(result);
                console.log(result)
            })

        })
        app.post('/change',function(req,res){

            db.mongodb.update('supplier',{id : req.body.id},req.body,function(result){
                res.send(result);
            })
        })
        app.post('/search',function(req,res){
            db.mongodb.select('supplier',{name:req.body.name},function(result){
                res.send(result);
                console.log(result)
            })
        })

    }
}
// {req.body.info : {$exists:true}}
// {req.body.info:{$exists:true}}