const mongoose = require('mongoose')
const Schema = mongoose.Schema

const noteSchema=new Schema({
    title:{
        type:String,
        default:null,
    },
    body:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    edit: {
        type: Boolean,
        default: false
      },
  
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    shareableLink: {
        type: String,
        default: null
    }
})

const Note = mongoose.model('Note',noteSchema)
module.exports = Note