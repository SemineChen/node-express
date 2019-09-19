# node+express初识

- 文档：mnd,npm ,github


## 初始化项目及npm安装

`npm init -y`---------初始化项目生成package.json文件

npm i --save 包名称@版本号------------安装你所需要的文件包生成node_module文件



## 一，node的使用方法

### 1.安装步骤和使用方法

http://nodejs.cn/api/http.html#http_http

node是相当于一个服务器，为了不让服务器一直重启需要安装nodemon

```javascript
npm i -g --svae node
npm i --save nodemon
```

引用node的步骤，这是用node的方法进行渲染界面

```javascript
//引入http服务
var http = require('http')
//引入文件的方法
var fs = require('fs');
//用art-template模板渲染
var template = require('art-template');

var url = require('url')

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
                    //comments这是一个数组对象
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

```

html文件中art-template时需要用到以下代码

```java
  {{each comments}}
                <li>{{$value.name}}{{$value.message}}</li>
  {{/each}}
```





## 二，express的使用方法



作用：express创建api服务器（ 接口 ），用于帮我们后端渲染项目，解决了node本身渲染前端项目复杂的问题

### 1.get和post方法

get获取表单提交内容的方法

```javascript
/*get的方法可以通过req.query获取表单提交信息*/
var parseObj = url.parse(req.url, true)//node中的urlAPI
     var getmessage = parseObj.query
            comments.push(getmessage)
                // 当提交表单时，请求码为302时，重新设置请求头
            res.statusCode = 302
            res.setHeader('location', "/")
            res.end()

```

post获取表单提交内容的方法

```javascript
/*post的方法可以通过安装npm install express body-parser*/
//body.query可以获取post提交的数据内容


var bodyParser = require('body-parser')
// 解析 application/json
app.use(bodyParser.json());
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

```

### 2.基本使用方法

```javascript
var express = require('express')
//用于表单post请求
var bodyParser = require('body-parser')

// 创建APP
var app = express()
    //模块化路由router.js
//var router = require('./router')引用路由router.js

// 解析 application/json
app.use(bodyParser.json());
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

//express渲染ntml界面   注意：配置模板引擎和body-parser一定要在app.use(router)之前
app.engine('html', require('express-art-template'));
//app.set('views',自己想要渲染文件的目标路径)可以改变渲染的文件路径
app.set('views', '../view');


// 处理静态资源  第一个/public/可以是任何内容，只是在url中请求时必须/自己定义的内容/然后对应的public下的路径
// 第一个/public/可以省略，访问路径的可以不用加/public/直接就访问public下的路径
app.use('/node_modules/', express.static('../node_modules'))
app.use('/public/', express.static('../public'))

// router(app)路由设计方法一
//app.use(router)路由设计方法二


// 用了express之后就用express.render()而不是expree.send()
//body-parser用于表单的post请求
 app.get('/', function(req, res) {
     fs.readFile('../public/json/data.json', function(err, data) {
         if (err) {
             return res.status(500).send('服务器错误！')
         }
         var students = JSON.parse(data).students //JSON.parse(data)获取的是json文件，JSON.parse(data).students获取的是json文件下的student对象
         console.log(students)
        res.render('index.html', {
             students: students
         })
     })

 })




// 监听端口   -g全局安装。安装modemon 执行nodemon main.js 他会自动监听你的文件变化，自动启动服务器
app.listen(3000, function() {
    console.log("express is running")
})
```

##### 基本使用方法2

```javascript
var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
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

app.use(router)

app.listen(3000, function() {
    console.log("blog is running...")
})
```



### 3.列表渲染数据(安装art-template)

安装(github中搜索，找到art-template的文档)，用于渲染界面的作用

```javascript
npm i art-template express-art-template
```

main.js中的操作

```javascript
//express渲染.ntml结尾的文件   注意：配置模板引擎和body-parser一定要在app.use(router)之前
app.engine('html', require('express-art-template'));
//app.set('views',自己想要渲染文件的目标路径)可以改变渲染的文件路径
app.set('views', '../view');


// 用了express之后就用express.render()而不是expree.send()
//body-parser用于表单的post请求
 app.get('/', function(req, res) {
     fs.readFile('../public/json/data.json', function(err, data) {
         if (err) {
             return res.status(500).send('服务器错误！')
         }
         var students = JSON.parse(data).students //JSON.parse(data)获取的是json文件，JSON.parse(data).students获取的是json文件下的student对象
         console.log(students)
        res.render('index.html', {
             students: students
         })
     })

 })

```

HTML中操作

```JavaScript
// students为json数组名称 ，就是res.render中前一个students
                            {{each students}}
                            <tr>
                                <td>{{$value.id}}</td>
                                <td>{{$value.name}}</td>
                                <td>{{$value.age}}</td>
                                <td>{{$value.job}}</td>
                                <td>{{$value.paly}}</td>
                            </tr>
                            {{/each}}
```



### 4.路由设计

新建一个router.js专门用于处理路由

main.js主要放一些node及express的配置文件信息，作为主入口

student.js专门用于些封装函数处理业务逻辑，比如“增，删，改，查”

方法一

```javascript
//1.新建router文件，然后使用
module.exports = function(app) {
    app.get('/', function(req, res) {
       

    })
} 
//2.主main.js中
var router = require('./router')
router（app） 
```

方法二（express）

```javascript
//router.js文件中
var express = require('express')
    // 创建路由器
var router = express.Router()
    // 把路由都挂载到router容器中
router.get('/', function(req, res) {
   

})

module.exports = router //开放出router方法



//main.js文件中
 var router = require('./router')
app.use(router) 

```

### 5.设计操作数据的API文件模块（异步API）

1.新建一个js文件专门用于操作数据

2，若果需要获取一个函数中异步操作结果，则必须通过一个回调函数来获取

```javascript
/*
 * 数据操作文件模块
 *职责：操作文件中的数据，不关心业务
 */

var dbPath='./db.json'//获取接送文件的路径，方便操作
// 获取学生列表
exports.find = function() {

}


// 添加保存学生
exports.save = function() {

}

// 更新学生
exports.update = function() {

}

// 删除学生
exports.delete = function() {

}
```

### 6.include页面模块化

模块化：

```
{{include './header.html'}}
```

模板继承：

```JavaScript
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
	//孩子自己的样式
    {{block 'head'}}{{/block}}
</head>

<body>
    #<!-- 头部模块，不需要html header body标签 -->
    {{include './header.html'}}
    #<!-- block是需要被填坑的内容 -->
    {{block 'content'}}
    <h1>被block包裹的是需要被填坑的内容</h1>
    # <!-- 底部模块，不需要html header body标签 -->
    {{/block}} 
     {{include './footer.html'}}
      
      //孩子自己的脚本
     {{block 'script'}}{{/block}}
</body>

</html>
      
```



填坑内容的界面案列

```javascript
{{extend './layout.html'}}
{{block 'head'}}
可以些=写link,style任意形式
{{/block}}

{{block 'content'}}
<div>我是填坑内容</div>
{{/block}}
```



## 三，回调函数

1.封装函数的目的是为了拿到结果，进行下一步操作(获取异步操作结果)

2,settimeout,readfile,readdir,ajax都是异步操作

```javascript
function add(x,y,callback){
    //callback就是回调函数
    //var x=10
    //var y=20
    //var callback=function(ret){console.log(ret)}
    setTimeout(function(){
               var ret=x+y
               callback(ret)
               },1000)
}

add(10,20,function(ret){
    console.log(ret)
})
```

#### 1.回调地狱

callback hell:异步中套用了一个异步

目的：为了读文件时根据自己想要的顺序回调

缺点：嵌套太深



解决地狱嵌套的缺点：es6出现了一个API:Promise

#### 2.promise

 promise本身不是异步

```javascript
var p1=new promise（function（resolve,reject）{
    fs.readFile('',function(err,data){
        if(err){
            reject(err)
        }
        resolve(data)
    })
}）
var p2=new promise（function（resolve,reject）{
    fs.readFile('',function(err,data){
        if(err){
            reject(err)
        }
        resolve(data)
    })
}）

#p.then就是resolve
p1
  .then(function(data){
    console.log(a)
    return p2      //a文件中嵌套b文件
})
   .then(function(data){
    console.log(b) //p2文件结果
    return p3
})
  .then(function(data){
    console.log(c) //p2文件结果
    return p3
})
```

代码优化后：

```javascript
function readfile(pathname){
    return new promise（function（resolve,reject）{
    fs.readFile(pathname,function(err,data){
        if(err){
            reject(err)
        }
        resolve(data)
    })
}
    
readfile('./sad.txt')
    .then(function(data){
    console.log(a)
    return readfile('./b.txt')
})
    .then(function(data){
    console.log(b)
})
```



## 四，JavaScript不支持模块化

1,一些存在的require.js和sea.js都是为了解决JavaScript不支持模块化的问题

## 五，MongoDB(mongoose)

- 表就是关系，或者说表与表之间存在关系
  - 所有的关系型数据库都需要通过SQL语言来操作
  - 所有的关系型数据库在操作之前都需要设计表结构
  - 而且数据表还支持约束
    - 唯一的
    - 主键
    - 默认值 
    - 非空
  - 非关系型非常灵活，就是key-value对
  - 但是mongoDB是长得最像关系型数据库
    - 数据库》数据库
    - 数据表》集合（数组）
    - 表记录》（文档对象）
  - mongooDB不需要设计表结构，可以任意往里面存数据，没有结构性这一说

```
1.官网下载安装

2.配置环境变量
找到mongodb的安装路径bin 列如：C:\Program Files\MongoDB\Server\4.2\bin

找到环境变量中的path,把上面的路径新增到path中

mongod --version
```



#### 1.开启关闭mongodb

启动：

```javascript
mongodb默认执行mongod命令所处盘符根目录下的/data/db作为自己的数据存储目录
所以在第一次执行该命令之前自己先手动新建一个/data/db

#mongod

//查看版本
mongod --version
```

如果想要修改默认的数据存储目录,可以：

```javascript
mongod --dbpath=数据存储目录路径
```

停止

```
ctrl+c
```

#### 2.连接数据库

连接：

```javascript
#该命令默认连接本机数据库
mongo
```

推出：

```javascript
#在连接状态时退出
exit
```

#### 3.基本命令

```
show dbs     #查看显示所有数据库
db           #查看当前操作的数据库
use 数据库名称      #切换到指定的数据库（如果没有会新建）
db.students.insertOne({"name":"jack"})                 #插入数据
db.students.find()                                     #查看当前的数据库内容
```

#### 4.在node中使用

1.使用第三方的mongoose来操作,mongoose是对mongodb的封装，网址：mongoosejs.com

```javascript
#npm i mongoose

  const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));
```

#### 5node中使用mysql

在npmjs.com网站中搜索mysql,找到安装步骤

```javascript
#npm install mysql

var mysql      = require('mysql');

//创建连接
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'me',
  password : 'secret',
  database : 'my_db'//数据库名字
});
 //连接数据库
connection.connect();
 //执行数据操作
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
 //关闭数据库
connection.end();
```

#### 6.mongoose的基本用法

地址：http://www.mongoosejs.net/docs/guide.html

安装：

- 使用第三方的mongoose来操作,mongoose是对mongodb的封装，网址：mongoosejs.com
- npm i mongoose

##### 1.1基本使用方法

```javascript
//1.引入mongoose
var mongoose=require('mongoose')

//连接数据可，指定连接的数据库不需要存在，当你插入第一条数据后就会自动创建出来
mongoose.connect('mongodb://localhost/test', { useMongoClient: true })


var Schema=mongoose.Schema

//2.设计表结构
  var userSchema = new Schema({
		username:{
            type:string,
            required:true //必须有
        },
      passworld:{
            type:string,
            required:true
        }
  });


//3.将文档结构发布为模型
//mongoose.model方法将一个架构发布为model。第一个参数，第一个传入大写字符串表示你的数据库名字。第二个参数，结构Schema
module.exports=mongoose.model('User',userSchema)
```

##### 1.2新增数据

```javascript
var admin= new User({
    username:'admin',
    pasword:'123456'
})

admin.save(function(err,data){
    if(err){
        
    }else{
          
    }
})
```

##### 1.3查询数据

```
User.find({
   name:'zs'
},function(err,data){

})
```

##### 1.4删除数据

```
User.remove({
name:'zs'
},function(err,data){

})
```

##### 1.5更新

```
User.findByIdAndUpdate('id的值'，{password:'123'}，function(err,data){

})
```



## 六，Path路径操作模块

- path.basename

  - 获取一个路径的文件名（包含扩展名如：index.js）

- path.dirname

  - 获取路径中的目录部分（如：c://data）

- path.extname

  - 获取路径的扩展名（如：.js）

- path.parse

  - 把路径转化为一个对象

  - ```
    root根路径
    dir目录
    base包含后缀名的文件名
    ext后缀名
    name不包含后缀名的文件名
    ```

    

- path.join

  - 当你进行路径拼接的时候，建议使用这个方法

- path.isAbsolute判断是不是一个绝对路径

## 七，node中（_dirname）

每个模块中，除了require，exports等模块相关的API之外，还有两个其他成员

- —dirname可以用来获取当前文件模块所属目录的绝对路径
- —filename可以用来获取当前文件的绝对路径

在文件操作中，使用相对论路径是不靠普的，所以只用此方法去解决

## 八，加密（MD5）

- 查文档，github上或npmjs上找文档

- 一般加密需要加多成

  使用方法：

  ```javascript
  npm install md5
  
  
  var md5 = require('md5');
  //多加几层就是多次加密，一般加密会用多层加密
  md5(md5('message'))
  ```

  

## 九，session记录用户状态

npmjs中搜索“express-session”

```javascript
//安装
npm install express-session

//使用
var session = require('express-session')

//应用到配置文件js中
app.use(session({
  secret: 'keyboard cat',
    //自定义的加密字符串，防止别人也用这个中间件，可以自己取个名字，目的是增加安全性
  resave: false,
  saveUninitialized: true
    //无论你是否使用session，默认都会给你分配一把session钥匙
}))

//具体使用（读取用户登录状态）
当插件配置完成后，可以通过req,session来访问成员
添加session数据：req.session.name='admin'
访问session数据：req.session.name
```

案列：

-  req.session.user=user（把注册的用户记录到session中）

持久化session存储：

```
//当前页面获取session
res.render('index.html',{
  user:req.session.user
})

```

服务器一旦重启，session数据就会丢失，一般生产环境会用持久化存储（有插件存储到数据库）

## 十，注册完重定向的问题

```
window.location.href="/"
```

## 十一，express的中间件

express中：对中间件有几种分类

1，不关心请求路径和请求方法（任何请求都会进入到这个方法）

```javascript
app.use(function(req,res){
    console.log('请求进来了....')
})
```

2,中间件本身是一种方法，有三个参数

```javascript
#app.use()执行有先后顺序
#next是一个函数，会执行下一个环节

app.use(function(req,res,next){
	next（）
})
```

3，以  /xxx开头的路径中间件

```javascript
#拿到的是不含’/a‘开头的路径。如/a/f/g/g/g/得到的是/f/g/g/g/
app.use('/a',function(req,res,next){

})
```

