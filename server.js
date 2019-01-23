//node第三方框架express.js 文件
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var node_http = require('./node_http');

//nodejs连接mongodb
var MongoClient = require('mongodb').MongoClient;
var mongoUrl = "mongodb://localhost:27017/";

//nodejs连接mysql
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'test'
});
connection.connect();

// 创建 application/x-www-form-urlencoded 编码解析
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

//允许跨域请求 设置header申明
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    //这段仅仅为了方便返回json而已
    res.header("Content-Type", "application/json;charset=utf-8");
    if (req.method.toUpperCase() == 'OPTIONS') {
        //让options请求快速返回
        res.sendStatus(200);
    } else {
        next();
    }
});

app.get('/', function (req, res) {
    res.send('lsafjskdfj;');
})

app.post('/listUser', function (req, res) {
    // 输出 JSON 格式 form get请求 req.query  post请求 req.body
    var response = {
        "first_name": req.body.first_name,
        "last_name": req.body.last_name
    };
    console.log(response);
    res.write(JSON.stringify(response));
    res.end();
})

app.post('/getNodeCors', function (req, res) {
    node_http.nodePostRequest('http://pretest.wayaa.com/crm-h5/loan-product/detail', { id: 4 }, function (data) {
        res.write(JSON.stringify(data));
        res.end();
    });
})

app.post('/process_get', function (req, res) {
    // console.log(req.body.id);  //获取后缀query的参数

    // connection.connect();
    var sql = 'SELECT * FROM user';
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        res.write(JSON.stringify(result));
        res.end();
    });
    connection.end();
})

var testIndex = 0;
app.post('/process_insert_mongodb', function (req, res) {
    ++testIndex;
    // console.log(req.body.id);  //获取后缀query的参数

    MongoClient.connect(mongoUrl, { useNewUrlParser: true }, function(err_connect, db) {
        if (err_connect) throw err_connect;
        var dbo = db.db("MongoDB_Test");
        var myobj = { name: "测试数据"+testIndex, value: req.body.value };
        dbo.collection("test_db").insertOne(myobj, function(err, response) {
            if (err) throw err;
            res.write(JSON.stringify("文档插入成功"));
            res.end();
            db.close();
        });
    });
})

app.post('/process_select_mongodb', function (req, res) {
    // console.log(req.body.id);  //获取后缀query的参数
    MongoClient.connect(mongoUrl, { useNewUrlParser: true }, function(err_connect, db) {
        if (err_connect) throw err_connect;
        var dbo = db.db("MongoDB_Test");
        var myobj = { name: "测试数据"+testIndex, value: req.body.value };
        dbo.collection("test_db").find({}).toArray(function(err, response) {
            if (err) throw err;
            res.write(JSON.stringify(response));
            res.end();
            db.close();
        });
    });
})

app.get('/index.html', function (req, res) {
    res.sendFile(__dirname + "/" + "index.html");
})

var server = app.listen(8888, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://127.0.0.1:8888");

})
