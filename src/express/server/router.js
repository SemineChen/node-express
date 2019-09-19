var express = require('express')
var students = require('./student')

// 创建路由器
var router = express.Router()
    // 把路由都挂载到router容器中
router.get('/', function(req, res) {
    // fs.readFile('../public/json/data.json', function(err, data) {
    //     if (err) {
    //         return res.status(500).send('服务器错误！')
    //     }
    //     var students = JSON.parse(data).students //JSON.parse(data)获取的是json文件，JSON.parse(data).students获取的是json文件下的student对象
    //     res.render('index.html', {
    //         students: students
    //     })
    // })

    // 参数students对应的是下面的第二个students，通过回调函数获取到值了
    students.find(function(err, students) {
        if (err) {
            return res.status(500).send('服务器错误！')
        }

        res.render('index.html', {
            students: students
        })



    })
})

router.get('/add', function(req, res) {
    res.render('add.html')
})

router.post('/addstu', function(req, res) {
    var student = req.body
    console.log(student)
    students.save(student, function(err) {
        if (err) {
            return res.status(500).send('服务器错误！')
        }
        // 重新请求./的路径
        res.redirect('./')
    })
})

router.get('/edit', function(req, res) {
    // console.log(req.query.id)获取请求的id
    //渲染编辑页面
    //findById中的函数已经返回有了student这个参数的内容
    students.findById(parseInt(req.query.id), function(err, student) {
        if (err) {
            return res.status(500).send('服务器错误！')
        }
        res.render('edit.html', {
            student: student //渲染界面
        })

    })

})

router.post('/editstu', function(req, res) {
    students.update(req.body, function(err) {
        if (err) {
            return res.status(500).send('服务器错误！')
        }
        res.redirect('/')

    })
})

router.get('/delete', function(req, res) {
    students.delete(req.query.id, function(err) {
        if (err) {
            return res.status(500).send('服务器错误！')
        }
        res.redirect('/')
    })

})

module.exports = router