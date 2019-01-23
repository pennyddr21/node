var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
  if (err) throw err;
  var dbo = db.db("runoob");

  //插入site表一条数据
  // var myobj = { name: "菜鸟教程", url: "www.runoob" };
  // dbo.collection("site").insertOne(myobj, function(err, res) {
  //     if (err) throw err;
  //     console.log("文档插入成功");
  //     db.close();
  // });

  //查询site表
  dbo.collection("site").find({}).toArray(function (err, result) { // 返回集合中所有数据
    if (err) throw err;
    console.log(result);
    db.close();
  });
});