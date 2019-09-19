post请求需要用到body-parse==========npm i body-parse
body.query可以获取post提交的数据内容


<!-- 路由设计 -->

方法一
<!-- 1.新建router文件，然后使用 -->
<!-- module.exports = function(app) {
    app.get('/', function(req, res) {
       

    })
} -->
<!-- 2.主main.js中
var router = require('./router')
router（app） -->

方法二（express方法）
router.js文件中
<!-- var express = require('express')
    // 创建路由器
var router = express.Router()
    // 把路由都挂载到router容器中
router.get('/', function(req, res) {
   

})

module.exports = router -->
main.js文件中
<!-- var router = require('./router')
app.use(router) -->


表单提交如何把表单内容保存到data.json文件中
1，先读出来，然后转乘对象(注意：表单中的name必须写否则获取不到提交的值)
2，然后往对像中push数据
3，然后把对象转成字符串
4，然后把字符串写入文件
