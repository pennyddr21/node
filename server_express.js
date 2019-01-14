//express_demo.js 文件
var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
   res.send('lsafjskdfj;');
})

app.get('/listUser', function (req, res) {
    res.send('12212;');
})

app.get('/index.html', function (req, res) {
  res.sendFile(__dirname + "/" + "index.html");
})

var server = app.listen(8888, function () {
  
  var host = server.address().address
  var port = server.address().port
  
  console.log("应用实例，访问地址为 http://127.0.0.1:8888");
  
})
