var http = require('http')
var fs = require('fs');
var template = require('art-template');

var url = require('url')

// var server = http.createServer()

// server.on('request', function(req, res) {
//     var url = req.url

//     console.log(req.url)

// })
var comments = [{
        name: "小明",
        message: "我是消息内容，如果你无法描述说明你还不够了解他",
        data: "2019-11-12"
    },
    {
        name: "小明",
        message: "我是消息内容，如果你无法描述说明你还不够了解他",
        data: "2019-11-12"
    },
    {
        name: "小明",
        message: "我是消息内容，如果你无法描述说明你还不够了解他",
        data: "2019-11-12"
    },
    {
        name: "小明",
        message: "我是消息内容，如果你无法描述说明你还不够了解他",
        data: "2019-11-12"
    }
]
http.createServer(function(req, res) {
        // url.parse将请求的路径转化为对象
        var parseObj = url.parse(req.url, true)
            // pathName为请求的路径
        var pathName = parseObj.pathname
            // var url = req.url
        if (pathName == '/') {
            fs.readFile('./view/index.html', function(err, data) {
                if (err) {
                    return res.end('出现404的错误')
                }
                // 使用art-template进行模板渲染
                var html = template.render(data.toString(), {
                    comments: comments
                });

                res.end(html)
            })
        } else if (pathName == '/post') {
            fs.readFile('./view/post.html', function(err, data) {
                if (err) {
                    return res.end('出现404的错误')
                }
                res.end(data)
            })

        } else if (pathName == "/pinglun") {

            var getmessage = parseObj.query
            comments.push(getmessage)
                // 当提交表单时，请求码为302时，重新设置请求头
            res.statusCode = 302
            res.setHeader('location', "/")
            res.end()


        } else if (pathName.indexOf("/public/") === 0) {
            //处理静态文件/public/
            console.log(url); //打印出来的时/public/css/css.css/
            fs.readFile('.' + pathName, function(err, data) {
                if (err) {
                    return res.end('出现404的错误')
                }
                res.end(data)

            })

        } else {
            fs.readFile('./view/404.html', function(err, data) {

                if (err) {
                    return res.end('出现404的错误')
                }
                res.end(data)
            })
        }
    })
    .listen(3000, 'localhost', function() {
        console.log("监听的是3000的端口")
    })