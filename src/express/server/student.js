/*
 * 数据操作文件模块
 *职责：操作文件中的数据，不关心业务
 */

var dbPath = '../public/json/data.json'
var fs = require('fs')
    // 获取学生列表
exports.find = function(callback) {
    fs.readFile(dbPath, 'utf8', function(err, data) {
        if (err) {
            return callback(err)
        }
        callback(null, JSON.parse(data).students)
    })
}

//找到id
exports.findById = function(id, callback) {
    fs.readFile(dbPath, 'utf8', function(err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        var ret = students.find(function(item) {
            return item.id === parseInt(id)
        })
        callback(null, ret)
    })

}

// node的奥义调用异步自己封装API
// 添加保存学生
exports.save = function(student, callback) {
    fs.readFile(dbPath, 'utf8', function(err, data) {
        if (err) {
            callback(err)
        }
        var students = JSON.parse(data).students
            // 处理id的问题,json中必须是数字不叫‘’，加了'1'就变成字符串的拼接
        student.id = students[students.length - 1].id + 1
        students.push(student)
        var ret = JSON.stringify({
            students: students
        })
        fs.writeFile(dbPath, ret, function(err) {
            if (err) {
                callback(err)
            }
            callback(null)
        })
    })

}

// 更新学生
exports.update = function(student, callback) {
    fs.readFile(dbPath, 'utf8', function(err, data) {
        if (err) {
            callback(err)
        }
        var students = JSON.parse(data).students
        student.id = parseInt(student.id)
            // find方法是是rs6的语法item是遍历对象
        var stu = students.find(function(item) {
                return item.id === student.id
            })
            // 遍历对象
            //这个结果相当于stu.name=student.name把新的值赋给旧的值
        for (var key in student) {
            stu[key] = student[key]

        }
        var ret = JSON.stringify({
            students: students
        })
        fs.writeFile(dbPath, ret, function(err) {
            if (err) {
                callback()
            }
            callback(null)
        })

    })
}

// 删除学生
exports.delete = function(id, callback) {
    // 1.获取需要删除的id
    // 2，操作结果发送响应数据
    fs.readFile(dbPath, 'utf8', function(err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
            // findIndex方法专门用于查找元素的下标,deleteid为下标值
        var deleteid = students.findIndex(function(item) {
            return item.id === parseInt(id)
        })
        students.splice(deleteid, 1)
        var ret = JSON.stringify({
            students: students
        })
        fs.writeFile(dbPath, ret, function(err) {
            if (err) {
                callback(err)
            }
            callback(null)
        })
    })




}