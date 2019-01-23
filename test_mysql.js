var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'test'
});

connection.connect();

var  sql = 'SELECT * FROM user';

connection.query(sql, function (err, result) {
    if (err) {
        console.log('[SELECT ERROR] - ', err.message);
        return;
    }

    console.log('--------------------------GO----------------------------');
    console.log(result);
    console.log('--------------------------------------------------------\n\n');
});

// var addSql = 'INSERT INTO user(name) VALUES(?)';
// var addSqlParams = ['按时发11生'];

// 查询
// connection.query(addSql, addSqlParams, function (err, result) {
//     if (err) {
//         console.log('[SELECT ERROR] - ', err.message);
//         return;
//     }

//     console.log('--------------------------GO----------------------------');
//     console.log(result);
//     console.log('--------------------------------------------------------\n\n');
// });

connection.end();