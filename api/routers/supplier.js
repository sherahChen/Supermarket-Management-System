
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
                // 总共有多少个文档
                var length = result.data.length;//24
                // 前端要设置每页要放的数量
                var qty = req.body.qty;//10
                var pageNo = req.body.pageNo;//开始是1
                // 要设几条分页呢
                var page = Math.ceil(length/qty);//3
console.log(pageNo)
                var resArr = {
                    data:result.data.slice((pageNo-1)*qty,qty*pageNo),
                    total:length
                }
                console.log(resArr)
                res.send(resArr);
            })
        })

        // 新增
        app.post('/add',function(req,res){
            db.mongodb.insert('supplier',req.body,function(result){
                res.send(result);
            })

        })
        // 删除
        app.post('/del',function(req,res){
            db.mongodb.delete('supplier',req.body,function(result){
                res.send(result);
                console.log(result)
            })

        })
        // 修改
        app.post('/change',function(req,res){

            db.mongodb.update('supplier',{id : req.body.id},req.body,function(result){
                res.send(result);
            })
        })
        // 查找
        app.post('/search',function(req,res){
            var val = req.body.name;
            // 查找只要包含输入的值即可
            // var reg = new RegExp("(^(?=.*("+val+")))");
             var reg = eval("/(^(?=.*("+val+")))/");
            db.mongodb.select('supplier',{name:reg},function(result){
                res.send(result);
                console.log(result)
            })
        })
        // 分页
        // app.post('/supplier',function(req,res){
        //     // 从数据库拿数据
        //     db.mongodb.select('supplier',{},function(result){

        //         res.send(result.data.slice(0,9));
        //     })
        // })

    }
}
// {req.body.info : {$exists:true}}
// {req.body.info:{$exists:true}}