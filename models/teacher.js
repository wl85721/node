var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/ittest')
var Schema = mongoose.Schema

var teacherSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    educate:{
        type:String,
        required:true 
    },
    section:{
        type:String,
        required:true
    },
    phone:{
        type:String,
    }
})

module.exports = mongoose.model('Teacher',teacherSchema)