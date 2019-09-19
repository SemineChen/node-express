var mongoose = require('mongoose')

// 连接数据库
// mongoose.connect('mongodb://localhost:27017/test')
mongoose.connect('mongodb://localhost/test', { useMongoClient: true })
var Schema = mongoose.Schema


// 设计表结构，相当于表头
var userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_time: {
        type: Date,
        default: Date.now //其实就是调用的Date.now()方法
    },
    last_modified_time: {
        type: Date,
        default: Date.now //其实就是调用的Date.now()方法
    },
    avatar: {
        type: String,
        default: '/public/img/avatar-default.png'
    },
    bio: {
        type: String,
        default: ''
    },
    genter: {
        type: Number,
        enum: [-1, 0, 1],
        default: -1
    },
    birthday: {
        type: Date

    },
    status: {
        type: Number,
        //0没有权限闲置
        //1不可以评论
        //2不可以登录
        enum: [0, 1, 2],
        default: 0
    }


})


module.exports = mongoose.model('User', userSchema)