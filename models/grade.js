var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/ittest')
var Schema = mongoose.Schema

var gradeSchema = new Schema({
    idname:{
        type:String,
        required:true
    },
    class:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    score:{
        type:Number,
        required:true 
    },
    pass:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Grade',gradeSchema)