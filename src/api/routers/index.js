/*
    这是总的路由
 */

var express = require('express');//引入express框架
var app = express();//加载express()
var bp = require('body-parser');//post的中间件引入模块

var userRouter = require('./user');
var productRouter = require('./product');
var paymentRouter = require('./payment');
var socketRouter = require('./socket');

module.exports = {
    start:function(_port){
        app.use(bp.urlencoded({extended:false}));

        //设置跨域请求
        app.all('*', function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
            res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
            res.header("X-Powered-By",' 3.2.1')
            if(req.method=="OPTIONS") {
                res.sendStatus(200);/*让options请求快速返回*/
            } else{
                next();
            }
        });

        /*
            这些是路由的分发
         */
        userRouter.register(app);
        productRouter.register(app);
        paymentRouter.register(app);
        socketRouter.actions(app,express)

        app.listen(_port,function(){
            console.log('Server running on http://localhost:'+ _port);
        });
    }
}