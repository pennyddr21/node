var request = require('request');
var qs = require('querystring');

function nodeRequest(method, url, data, successCallBack) {
    var method = method || 'POST'
    var data = data || {}
    var content = qs.stringify(data)
    var options = {
        method: method,
        url: url,
        form: content,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    request(options, function (err, response, body) {
        if (err) {
            console.log(err)
        } else {
            if (response.statusCode == 200) {
                successCallBack && successCallBack(body)
            } else {
                console.log('response.statusCode:' + response.statusCode);
            }
        }
    })
}

function nodePostRequest(url, data, successCallBack) {
    nodeRequest('POST', url, data, successCallBack)
}

function nodeGetRequest(url, data, successCallBack) {
    nodeRequest('GET', url, data, successCallBack)
}

module.exports = {
    nodePostRequest,
    nodeGetRequest
}