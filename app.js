var express = require('express')
var bodyparser = require('body-parser')
var router = require('./router.js')
var path = require('path')
var session = require('express-session')

var app = express()

//配置模板引擎
app.engine('html',require('express-art-template'))
// app.set('views',path.join(__dirname,'./views/')
// 默认从views下找

//提供静态资源服务
// app.use('/node_modules/',express.static(path.join('_dirname','./node_modules/')))
// app.use('/public/',express.static(path.join('_dirname','./public/')))
app.use('/node_modules/',express.static('./node_modules/'))
app.use('/public/',express.static('./public/'))

// 配置body-parser,解析表单post数据
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

// 配置session
app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:true
}))


// 使用路由
app.use(router)

app.listen(3000,function(){
    console.log('服务器已启动')
})