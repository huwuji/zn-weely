### node构建web服务器
1. 什么是web服务器：
>Web服务器一般指网站服务器，是指驻留于因特网上某种类型计算机的程序，Web服务器的基本功能就是提供Web信息浏览服务。它只需支持HTTP协议、HTML文档格式及URL，与客户端的网络浏览器配合。
大多数 web 服务器都支持服务端的脚本语言（php、python、ruby）等，并通过脚本语言从数据库获取数据，将结果返回给客户端浏览器。
目前最主流的三个Web服务器是Apache、Nginx、IIS。

2. 使用Node创建Web服务器
 以下是演示一个最基本的 HTTP 服务器架构(使用8081端口)，创建 serve.js文件如下：
 ```
 var http = require('http');
var fs = require('fs');
var url = require('url');

// 创建服务器
http.createServer( function (request, response) {  
   // 解析请求，包括文件名
   var pathname = url.parse(request.url).pathname;

   // 输出请求的文件名
   console.log("Request for " + pathname + " received.");

   // 从文件系统中读取请求的文件内容
   fs.readFile(pathname.substr(1), function (err, data) {
      if (err) {
         console.log(err);
         // HTTP 状态码: 404 : NOT FOUND
         // Content Type: text/plain
         response.writeHead(404, {'Content-Type': 'text/html'});
      }else{	         
         // HTTP 状态码: 200 : OK
         // Content Type: text/plain
         response.writeHead(200, {'Content-Type': 'text/html'});

         // 响应文件内容
         response.write(data.toString());		
      }
      //  发送响应数据
      response.end();
   });   
}).listen(8081);

// 控制台会输出以下信息
console.log('Server running at http://127.0.0.1:8081/');
 ```
 接下来我们在该目录下创建一个 index.htm 文件，代码如下：
```
<html>
<head>
<title>Sample Page</title>
</head>
<body>
Hello World!
</body>
</html>
```
执行 server.js 文件：
```
$ node server.js
Server running at http://127.0.0.1:8081/
```
接着我们在浏览器中打开地址：http://127.0.0.1:8081/index.htm,会显示Hello World!。大功告成

### 总结一下：
实现一个基础的基于node的web服务的步骤是：
1. 一个http通讯，可用客户端和服务器的通讯；
2. 解析url，确定URL对应的操作：这个操作可以是定位url指向文件位置，读取文件，这里类似get请求，如上查找和读取index.html的位置，然后读取这个文件。
>在HTTP请求中，我们可以通过路由提取出请求的URL以及GET/POST参数。然后对应不同的路由，路由决定了由谁(指定脚本)去响应客户端请求。
3. 文件操作。


### 基于node实现的express的web框架
安装 Express
安装 Express 并将其保存到依赖列表中：
```
$ npm install express --save
```
以上命令会将 Express 框架安装在当期目录的 node_modules 目录中， node_modules 目录下会自动创建 express 目录。以下几个重要的模块是需要与 express 框架一起安装的：

body-parser - node.js 中间件，用于处理 JSON, Raw, Text 和 URL 编码的数据。
cookie-parser - 这就是一个解析Cookie的工具。通过req.cookies可以取到传过来的cookie，并把它们转成对象。
multer - node.js 中间件，用于处理 enctype="multipart/form-data"（设置表单的MIME编码）的表单数据。
```
$ npm install body-parser --save
$ npm install cookie-parser --save
$ npm install multer --save
```
创建 express_demo.js 文件，代码如下所示：
```
//express_demo.js 文件
var express = require('express');
var app = express();

app.get('/', function (req, res) {
   res.send('Hello World');
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
```