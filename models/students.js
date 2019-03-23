var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/ittest')
var Schema = mongoose.Schema


var studentSchema = new Schema({
    studentusername:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})


// var Student = mongoose.model('Student',studentSchema)

// var admin = new Student(
//     {
//        studentusername:'admin' ,
//        password:'123456'
//     }
// )
// admin.save(function(err,ret){
//     if(err)
//     {
//         console.log('保存失败')
//     }
//     else{
//         console.log('保存成功')
//     }
// })

module.exports = mongoose.model('Student',studentSchema)