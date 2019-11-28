const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const subCategorySchema = new mongoose.Schema({
    nume:{
        type:String,
        trim: true,
        required:true,
        maxlength:32
    },
    categorie:{
        type:ObjectId,
        ref: 'Category',
        required:true
    }
}, {timestamps:true})

module.exports = mongoose.model('SubCategory', subCategorySchema);