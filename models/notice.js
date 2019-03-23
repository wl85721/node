var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/ittest')
var Schema = mongoose.Schema

var noticeSchema = new Schema({
    title:{
        type:String
    },
    content:{
        type:String,
    }
})

module.exports = mongoose.model('Notice',noticeSchema)