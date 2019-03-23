var express = require('express')
var Student = require('./models/students')
var Grade = require('./models/grade')
var Teacher = require('./models/teacher')
var Studentuser = require('./models/user_student')
var Teacheruser = require('./models/user_teacher')
var Notice = require('./models/notice')
var md5 = require('blueimp-md5')

var router = express.Router()

// ------------------------登陆注册路由------------------------------------ //
// get登陆界面并渲染(/login) 已完成
router.get('/login',function(req,res){
    res.render('login.html')
    // console.log(req.session.student)
})
// post登陆界面数据(/login) 已完成
router.post('/login', function (req, res){
  var body = req.body
  console.log(body)
  if (body.chara == '学生') {
    Studentuser.findOne({
      studentusername: body.studentusername,
      password: body.password
    }, function (err, student) {
      if (err) {
        return res.status(500).json({
          err_code: 500,
          message: err.message
        })
      }
      // 如果用户名和密码匹配，则 user 是查询到的用户对象，否则就是 null
      if (!student) {
        return res.status(200).json({
          err_code: 1,
          message: 'Email or password is invalid.'
        })
      }
      // 用户存在，登陆成功，通过 Session 记录登陆状态
      req.session.student = student

      res.status(200).json({
        err_code: 5,
        message: 'OK'
      })
    })
  }
  else if (body.chara == '教师') {
    Teacheruser.findOne({
      studentusername: body.studentusername,
      password: body.password
    }, function (err, student) {
      if (err) {
        return res.status(500).json({
          err_code: 500,
          message: err.message
        })
      }
      // 如果用户名和密码匹配，则 user 是查询到的用户对象，否则就是 null
      if (!student) {
        return res.status(200).json({
          err_code: 1,
          message: 'Email or password is invalid.'
        })
      }
      // 用户存在，登陆成功，通过 Session 记录登陆状态
      req.session.student = student

      res.status(200).json({
        err_code: 6,
        message: 'OK'
      })
    })
  }
  else {
    Student.findOne({
      studentusername: body.studentusername,
      password: body.password
    }, function (err, student) {
      if (err) {
        return res.status(500).json({
          err_code: 500,
          message: err.message
        })
      }
      // 如果用户名和密码匹配，则 user 是查询到的用户对象，否则就是 null
      if (!student) {
        return res.status(200).json({
          err_code: 1,
          message: 'Email or password is invalid.'
        })
      }
      // 用户存在，登陆成功，通过 Session 记录登陆状态
      req.session.student = student

      res.status(200).json({
        err_code: 0,
        message: 'OK'
      })
    })
  }

})

// get注册界面(/register) 已完成
router.get('/register',function(req,res){
    res.render('register.html')
})

// post注册界面数据(/register) 已完成
// 使用MD5对密码进行加密
router.post('/register',function(req,res){
    var body = req.body
    // 判断学生用户是否存在
    console.log(body)
    if(body.chara == '学生'){
      Studentuser.findOne({
        studentusername:body.studentusername
        },function(err,data){
        if(err){
            return res.status(500).json({
                err_code:500,
                message:'服务端错误'
            })
        }
        if(body.password !== body.repeatpassword){
          return res.status(200).json({
            err_code:2,
            message:'两次密码不相同'
        })
        }
        if(data){
            return res.status(200).json({
                err_code:1,
                message:'用户已存在'
            })
            return res.send(`邮箱或者密码已存在，请重试`)
        }
        new Studentuser(body).save(function(err,student){
            if(err){
                console.log(err)
                return res.status(500).json({
                    err_code:500,
                    message:'服务端错误'
                })
            }
            // req.session.student = student

            res.status(200).json({
                err_code:0,
                message:'ok'
            })
        })
    })  
    }
    else if(body.chara == '教师'){
      Teacheruser.findOne({
        studentusername:body.studentusername
        },function(err,data){
        if(err){
            return res.status(500).json({
                err_code:500,
                message:'服务端错误'
            })
        }
        if(body.password !== body.repeatpassword){
          return res.status(200).json({
            err_code:2,
            message:'两次密码不相同'
        })
        }
        if(data){
            return res.status(200).json({
                err_code:1,
                message:'用户已存在'
            })
            return res.send(`用户名或者密码已存在，请重试`)
        }
        new Teacheruser(body).save(function(err,student){
            if(err){
                console.log(err)
                return res.status(500).json({
                    err_code:500,
                    message:'服务端错误'
                })
            }
            // req.session.student = student

            res.status(200).json({
                err_code:0,
                message:'ok'
            })
        })
    })  
    }  
})


// ---------------------------管理员端学生管理路由-------------------------- //
// get管理员端学生成绩界面（/manager/student） 已完成
router.get('/manager/student',function(req,res){
  Grade.find(function(err,grade){
      if(err){
      return res.status(500).send('Server error')
        }
        res.render('student.html',{grade:grade})  
    })
})

//get查找学生成绩数据（/manager/student/find）  已完成
router.get('/manager/student/find',function(req,res){
  var id = req.query.idname
  Grade.find({idname:id},function (err,ret) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.render('find.html',{grade:ret}) 
  })
})

// get添加学生界面（/add） 已完成
router.get('/manager/student/add',function(req,res){
   res.render('add.html')
})

// post添加学生界面数据（/add） 已完成
router.post('/manager/student/add',function(req,res){
    new Grade(req.body).save(function(err){
        if(err){
            console.log(err)
            return res.status(500).send('Server error')
        }
        res.redirect('/manager/student')
    })
})

// 渲染编辑学生数据(/edit) 已完成
router.get('/manager/student/edit', function (req, res) {
    Grade.findById(req.query.id.replace(/"/g, ''), function (err, grade) {
      if (err) {
        return res.status(500).send('Server error.')
      }
      res.render('edit.html', {
        grade:grade
      })
    })
})
  
// post编辑学生数据（/edit）已完成
router.post('/manager/student/edit', function (req, res) {
    var id = req.body.id.replace(/"/g, '')
    Grade.findByIdAndUpdate(id, req.body, function (err) {
      if (err) {
        return res.status(500).send('Server error.')
      }
      res.redirect('/manager/student')
    })
})

// 删除学生成绩数据(/manager/student/delete) 已完成
router.get('/manager/student/delete',function(req,res){
    var id = req.query.id.replace(/"/g,'')
    Grade.findByIdAndRemove(id,function(err){
        if(err){
            return res.status(500).send('Server error.')
        }
        res.redirect('/manager/student')
    })
})


// -------------------------管理员首页-------------------------------------- //
// get管理员首页（/manager/home）
router.get('/manager/home',function(req,res){
  // console.log(req.session.student.studentusername)
  Notice.find(function(err,notice){
    if(err){
      return res.status(500).send('Server error')
    }
    res.render('home.html',{notice:notice,user:req.session.student.studentusername})
  })
})

// post管理员首页删除公告（/manager/home）
router.get('/manager/home/delete',function(req,res){
  var id = req.query.id.replace(/"/g,'')
  Notice.findByIdAndRemove(id,function(err){
      if(err){
          return res.status(500).send('Server error.')
      }
      res.redirect('/manager/home')
  })
})

// -------------------------管理员教师信息管理界面--------------------------- //
// get管理员教师信息界面（/manager/teacher）已完成
router.get('/manager/teacher',function(req,res){
    Teacher.find(function (err, teacher) {
      if (err) {
        console.log(err)
        return res.status(500).send('Server error.')
      }
      res.render('teacher.html', {
        teacher:teacher
      })
    })
})

// get添加教师信息（/teacher/add） 已完成
router.get('/manager/teacher/add',function(req,res){
  res.render('teacher_add.html')
})

// post添加教师信息（/teacher/add） 已完成
router.post('/manager/teacher/add',function(req,res){
  new Teacher(req.body).save(function(err){
      if(err){
        console.log(err)
        return res.status(500).send('Server error')
      }
      res.redirect('/manager/teacher')
  })
})

// get编辑教师信息（/teacher/edit）  已完成
router.get('/manager/teacher/edit',function(req,res){
  Teacher.findById(req.query.id.replace(/"/g, ''), function (err, teacher) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.render('teacher_edit.html', {
      teacher:teacher
    })
  })
})

// post编辑教师信息（/teacher/edit）  已完成
router.post('/manager/teacher/edit', function (req, res) {
  var id = req.body.id.replace(/"/g, '')
  Teacher.findByIdAndUpdate(id, req.body, function (err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/manager/teacher')
  })
})

// 删除教师成绩数据(/manager/teacher/delete) 已完成
router.get('/manager/teacher/delete',function(req,res){
  var id = req.query.id.replace(/"/g,'')
  Teacher.findByIdAndRemove(id,function(err){
      if(err){
          return res.status(500).send('Server error.')
      }
      res.redirect('/manager/teacher')
  })
})

// get查找教师（/manager/teacher/find） 已完成
router.get('/manager/teacher/find',function(req,res){
  var id = req.query.name
  Teacher.find({name:id},function (err,ret) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.render('teacher_find.html',{teacher:ret}) 
  })
})

// ---------------------------管理员发布公告--------------------------------- //
// get管理员发布公告界面（/manager/notice）
router.get('/manager/notice',function(req,res){
  res.render('notice.html')
})

// post管理员提交公告界面（/manager/notice）
router.post('/manager/notice',function(req,res){
  new Notice(req.body).save(function(err){
    if(err){
        console.log(err)
        return res.status(500).send('Server error')
    }
    res.redirect('/manager/home')
  })
})

// 删除用户(/manager/user)
router.get('/manager/user/delete',function(req,res){
  var id = req.query.id.replace(/"/g,'')
  Studentuser.findByIdAndRemove(id,function(err){
      if(err){
          return res.status(500).send('Server error.')
      }
      res.redirect('/manager/user')
  })
})

// get管理员用户管理界面（/manager/user）（未完成）
router.get('/manager/user',function(req,res){
  Studentuser.find(function(err,studentuser){
    if(err){
      console.log(err)
      return res.status(500).send('Server error')
      }
    res.render('user.html',{studentuser:studentuser})  
  })

  // Teacheruser.find(function(err,teacheruser){
  //   if(err){
  //     console.log(err)
  //     return res.status(500).send('Server error')
  //     }
  //   res.render('user.html',{teacheruser:teacheruser})  
  // })
})


// ---------------------------管理员修改密码-------------------------------- //
// get管理员修改密码界面（/manager/repassword） 已完成
router.get('/manager/repassword',function(req,res){
  res.render('repassword.html')
})

// post管理员修改密码（/manager/repassword） 已完成
router.post('/manager/repassword',function(req,res){
  console.log(req.body)
  Student.findOneAndUpdate({studentusername:req.body.studentusername,password:req.body.oldpassword}, {password:req.body.password}, function (err,pass) {
    if (err) {
      // console.log(err)
      return res.status(500).send('Server error.')
    }
    console.log(pass)
    if(!pass){
      return res.status(200).json({
        err_code: 1,
        message: '密码不正确'
      })
    }
    res.status(200).json({
      err_code: 0,
      message: 'OK'
    })
  })
})

// ------------------------------学生界面----------------------------------- //
// get学生界面（/student/home）
router.get('/student/home',function(req,res){
  Notice.find(function(err,notice){
    if(err){
      return res.status(500).send('Server error.')
    }
    else{
      res.render('students_page/home.html',{
        notice:notice,
        user:req.session.student.studentusername
      })
    }
  })
})


// get学生成绩界面（/student/score）
router.get('/student/score',function(req,res){
  Grade.find({idname:req.query.user},function(err,grade){
    if(err){
    return res.status(500).send('Server error')
      }
      res.render('./students_page/score.html',{grade:grade})  
  })
})

// get学生修改密码界面（/student/repassword）
router.get('/student/repassword',function(req,res){
  res.render('students_page/repassword.html')
})

// post学生修改密码界面（/student/repassword）
router.post('/student/repassword',function(req,res){
  console.log(req.body)
  Studentuser.findOneAndUpdate({studentusername:req.body.studentusername,password:req.body.oldpassword}, {password:req.body.password}, function (err,pass) {
    if (err) {
      // console.log(err)
      return res.status(500).send('Server error.')
    }
    console.log(pass)
    if(!pass){
      return res.status(200).json({
        err_code: 1,
        message: '密码不正确'
      })
    }
    res.status(200).json({
      err_code: 0,
      message: 'OK'
    })
  })
})


// ------------------------------教师界面----------------------------------- //
// get教师界面（/teacher/home）
router.get('/teacher/home',function(req,res){
  Notice.find(function(err,notice){
    if(err){
      return res.status(500).send('Server error.')
    }
    else{
      res.render('teachers_page/home.html',{
        notice:notice,
        user:req.session.student.studentusername
      })
    }
  })
})

// get教师管理学生成绩界面（/teacher/score）
router.get('/teacher/score',function(req,res){
  Grade.find({},function(err,grade){
    if(err){
      console.log(err)
    return res.status(500).send('Server error')
      }
      res.render('teachers_page/score.html',{grade:grade})  
  })
})

// get教师修改密码界面（/teacher/repassword）
router.get('/teacher/repassword',function(req,res){
  res.render('teachers_page/repassword.html')
})

// post教师修改密码界面（/teacher/repassword）
router.post('/teacher/repassword',function(req,res){
  console.log(req.body)
  Teacheruser.findOneAndUpdate({studentusername:req.body.studentusername,password:req.body.oldpassword}, {password:req.body.password}, function (err,pass) {
    if (err) {
      // console.log(err)
      return res.status(500).send('Server error.')
    }
    console.log(pass)
    if(!pass){
      return res.status(200).json({
        err_code: 1,
        message: '密码不正确'
      })
    }
    res.status(200).json({
      err_code: 0,
      message: 'OK'
    })
  })
})

//  教师增删改查
// get增加
router.get('/teacher/student/add',function(req,res){
  res.render('teachers_page/add.html')
})

// post添加
router.post('/teacher/student/add',function(req,res){
  new Grade(req.body).save(function(err){
    if(err){
        console.log(err)
        return res.status(500).send('Server error')
    }
    res.redirect('/teacher/score')
  })
})

// get编辑
router.get('/teacher/student/edit',function(req,res){
  Grade.findById(req.query.id.replace(/"/g, ''), function (err, grade) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.render('teachers_page/edit.html', {
      grade:grade
    })
  })
})

// post编辑
router.post('/teacher/student/edit', function (req, res) {
  var id = req.body.id.replace(/"/g, '')
  Grade.findByIdAndUpdate(id, req.body, function (err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/teacher/score')
  })
})

//get查找学生成绩数据（/teacher/student/find）  已完成
router.get('/teacher/student/find',function(req,res){
  var id = req.query.idname
  Grade.find({idname:id},function (err,ret) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.render('teachers_page/find.html',{grade:ret}) 
  })
})





module.exports = router  