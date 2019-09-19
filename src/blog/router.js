var express = require('express')
var User = require('./models/user')

var md5 = require('md5');

var router = express.Router()



router.get('/', function(req, res) {
    console.log(req.session.user)
    res.render('index.html', {
        user: req.session.user
    })
})
router.get('/register', function(req, res) {
    res.render('register.html')
})
router.post('/register', function(req, res) {
    var body = req.body
        // console.log(body)
    User.findOne({
        $or: [
            { email: body.email },
            { nickname: body.nickname }
        ]
    }, function(err, data) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "服务器错误！"
            })
        }
        if (data) {
            return res.status(200).json({
                err_code: 1,
                message: "用户名或者密码存在！",
                form: body
            })
        }
        body.password = md5(md5(body.password))
        new User(body).save(function(err, user) {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: 'Internal error.'
                })
            }
            req.session.user = user
            res.status(200).json({
                err_code: 0,
                message: "链接成功"
            })


        })

    })
})
router.get('/login', function(req, res) {
    req.session.user = unll
    res.redirect('login.html')
})


module.exports = router