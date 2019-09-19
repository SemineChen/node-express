var express = require('express')
var bodyParser = require('body-parser')

//模块化路由router.js
var router = require('./router')


// 创建APP
var app = express()


// 解析 application/json
app.use(bodyParser.json());
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());


//express渲染ntml界面,
app.engine('html', require('express-art-template'));
//app.set('views',自己想要渲染文件的目标路径)可以改变渲染的文件路径
app.set('views', '../view');


// 处理静态资源  第一个/public/可以是任何内容，只是在url中请求时必须/自己定义的内容/然后对应的public下的路径
// 第一个/public/可以省略，访问路径的可以不用加/public/直接就访问public下的路径
app.use('/node_modules/', express.static('../node_modules'))
app.use('/public/', express.static('../public'))

// router(app)
app.use(router)


// 用了express之后就用express.render()而不是expree.send()
//body-parser用于表单的post请求
// app.get('/', function(req, res) {
//     fs.readFile('../public/json/data.json', function(err, data) {
//         if (err) {
//             return res.status(500).send('服务器错误！')
//         }
//         var students = JSON.parse(data).students //JSON.parse(data)获取的是json文件，JSON.parse(data).students获取的是json文件下的student对象
//         console.log(students)
//         res.render('index.html', {
//             students: students
//         })
//     })

// })




// 监听端口   -g全局安装。安装modemon 执行nodemon main.js 他会自动监听你的文件变化，自动启动服务器
app.listen(3000, function() {
    console.log("express is running")
})