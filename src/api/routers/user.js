//user要实现的功能
//  *token
//  *连接数据库验证
var jwt = require('jsonwebtoken');
var apiresult = require('../module/apiresult');

var db = require('../db/dbhelper');

module.exports = {
    register:function(app){
        app.post('/login',function(req,res){
            //post的请求头包含信息
            console.log(req.body);
            db.mongodb.select('user',req.body,function(result){
                if(result.state && result.data.length > 0){
                    var token = jwt.sign({name:req.body.username},'srect',{
                        expiresIn:999
                    })
                    res.send(apiresult(true,{token:token}));
                }else{
                    res.send(apiresult(false,result.data));
                }
            })
        })
    }
}