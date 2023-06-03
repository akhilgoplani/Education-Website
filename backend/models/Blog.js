const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = mongoose.Schema({
    
    content: {
        type:String,
        required:true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    chapter:{
        type:String,
        required:true,

    },
    isPublic: {
        type: Boolean,
        default: false
    },
    shareableLink: {
        type: String,
        default: null
    },


    textbookName:{
        type:Array,
        ref:'Textbook',
        required:false,
    }
}, { timestamps: true })


const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog 