//引入mongodb
var mongodb = require('mongodb');

//启动MongoDB
var client = mongodb.MongoClient;

//设置MongoDB的地址
var connstr = 'mongodb://127.0.0.1:27017/test';

//封装函数使其返回结构一致
var apiresult = require('../module/apiresult');

//定义变量得到数据库
var db;

client.connect(connstr,function(_error,_db){
    if(_error){
        console.log(_error);
    }else{
        db = _db;
    }
})

module.exports = {
    //查
    select:function(_collection,_condition,_cb){
        db.collection(_collection).find(_condition || {}).toArray(function(error,result){
            _cb(apiresult(error ? false : true, error || result));
        })
    },
    //增
    insert:function(_collection,_data,_cb){
        db.collection(_collection).insert(_data,function(error,result){
            _cb(apiresult(error ? false : true, error || result));
        })
    },
    //改
    update: function(_collection,_condition,_cb){
        // console.log(_condition)
        var whereStr = {orderno:_condition.orderno}
        db.collection(_collection).update(whereStr,{$set:{state:_condition.state}},function(error,result){
            _cb(apiresult(error ? false : true, error || result));
        })
    },    
    //删
    delete: function(_collection,_condition,_cb){
        db.collection(_collection).remove(_condition,function(error,result){
            _cb(apiresult(error ? false : true, error || result));
        })
    }
}