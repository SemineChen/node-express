var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var session = require('express-session')
var router = require('./router')

var app = express()
    // 开放静态界面
app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))

// art-templatemo模板引擎
//express渲染.ntml结尾的文件   注意：配置模板引擎和body-parser一定要在app.use(router)之前
app.engine('html', require('express-art-template'));
//app.set('views',自己想要渲染文件的目标路径)可以改变渲染的文件路径
app.set('views', path.join(__dirname, './views/'))

// 配置解析表单 POST 请求体插件（注意：一定要在 app.use(router) 之前 ）
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.use(router)

app.listen(2000, function() {
    console.log("blog is running...")
})