var mongoose = require('mongoose')
var Schema  = mongoose.Schema

// 连接数据库本地
// 指定连接的数据库不需要存在 当你插入第一条数据是会自动创建
mongoose.connect('mongodb://localhost/test')

// 设计集合结构（可以理解为表结构）
// 用户信息
var userSchema = new Schema({
    username:{
        type:String,
        required:true  //不能为空
    },
    password:{
        type:String,
        required:true
    }
})

// 将文档结构发布为模型
// 第一个参数传入大写名词单数表示数据库名称 最终回转成小写的复数名称
// 返回模型构造函数
var User = mongoose.model('User',userSchema)

// 有了模型对象函数之后就可以使用构造函数应用其中的数据了
// 增删改查

// 增加
var admin = new User(
    {
       username:'admin' ,
       password:'123456'
    }
)

//持久化数据
// admin.save(function(err,ret){
//     if(err)
//     {
//         console.log('保存失败')
//     }
//     else{
//         console.log('保存成功')
//         console.log(ret)
//     }
// })

// 删除
// User.remove({
//     username:'admin'
// },function(err,ret){
//     if(err){
//         console.log('删除失败')
//     }
//     else{
//         console.log('删除成功')
//     }
// })

// findOneAndRemove()  findByIdAndRemove()

// 修改(更新)
User.findByIdAndUpdate('5c7526c5ae4fc15404b32b32',{
    password:'123'
},function(err,ret){
    if(err){
        console.log('更新失败')
    }
    else{
        console.log('更新成功')
    }
})
// update() findByIdAndUpdate()

// 查询

// 查询所有
User.find(function(err,ret){
    if(err){
        console.log('查询失败')
    }
    else{
        console.log(ret)
    }
})

// 条件查找
// User.find({
//     username:'admin'
// },function(err,ret){
//     if(err){
//         console.log('查询失败')
//     }
//     else{
//         console.log(ret)
//     }
//     })

// User.findOne //按条件查询单个