var http = require('http');
var url = require('url');
var fs = require('fs');
var util = require('util');
var querystring = require('querystring');
var app = require('express')();


var mimetype = {
    'txt':'text/plain',
    'html':'text/html',
    'css': 'text/css',
    'xml': 'application/xml',
    'json': 'application/json',
    'js': 'application/javascript',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'gif': 'image/gif',
    'png': 'image/png',
    'svg': 'image/svg+xml'
}

var page_404 =function(req,res,path){
    res.writeHead(404,{
        'Content-Type':'text/html'
    });
    res.write('<!doctype html>\n');
    res.write('<title>404 Not Found</title>\n');
    res.write('<h1>Not Found</h1>');
    res.write(
    '<p>The requested URL ' +
     path + 
    ' was not found on this server.</p>'
    );
    res.end();
}

var page_500 = function(req,res,error){
    res.writeHead(500, {
      'Content-Type': 'text/html'
    });
    res.write('<!doctype html>\n');
    res.write('<title>Internal Server Error</title>\n');
    res.write('<h1>Internal Server Error</h1>');
    res.write('<pre>' + util.inspect(error) + '</pre>');
}
http.createServer(function(req,res){
    var pathname = url.parse(req.url).pathname;
    var realPath = __dirname + pathname;

    if(req.method == "POST" && !mimetype[realPath.split('.').pop()]){
        //定义了一个post变量,用于暂存请求体的信息
        var post = '';

        //通过req的data事件监听函数,每当接受到请求体的数据,就累加到post变量中
        req.on('data',function(chunk){
            post +=chunk;
        });

        //在end事件触发后,通过querystring.parse将post解析为真正的POST请求格式,然后客户端返回
        req.on('end',function(){
            post = querystring.parse(post);
            res.end(util.inspect(post));
        })
        return;
    }
    fs.exists(realPath,function(exists){
        if(!exists){
            return page_404(req,res,pathname);
        }else{
            var file = fs.createReadStream(realPath);
            res.writeHead(200,{
                'Content-Type': mimetype[realPath.split('.').pop()] || 'text/plain'
            });
            file.on('data',res.write.bind(res));
            console.log(res);
            file.on('close',res.end.bind(res));
            file.on('error',function(err){
                return page_500(req,res,err);
            });
        }
    })

}).listen(1337);

console.log('Server running at http://10.3.135.14:1337/');