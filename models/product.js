const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const productSchema = new mongoose.Schema({
    nume:{
        type:String,
        trim: true,
        required:true,
        maxlength:32
    },
    descriere:{
        type:String,
        trim: true,
        required:true,
        maxlength:2000
    },
    brand:{
        type:String,
        trim: true,
        required:true,
        maxlength:32
    },
    categorie:{
        type:ObjectId,
        ref:'SubCategory',
        required:true
    },
    pret:{
        type:Number,
        trim: true,
        maxlength:32
    },
    pretRedus:{
        type:Number,
        trim: true,
        maxlength:32
    },
    SKU:{
        type:String,
        trim: true,
        required:true,
        maxlength:32
    },
    inStoc:{
        type:Boolean,
        required:true
    },
    cantitate:{
        type:Number,
        trim: true,
        maxlength:32
    },
    tipProdus:{
        type:String,
        trim: true,
        maxlength:32
    },
    specificatii:{
        type:String,
        trim: true,
        maxlength:2000
    },
    inTheBox:{
        type:String,
        trim: true,
        maxlength:2000
    },photo: {
        data: Buffer,
        content: String,
    },
    photo1: {
        data: Buffer,
        content: String
    },
    photo2: {
        data: Buffer,
        content: String
    },
    photo3: {
        data: Buffer,
        content: String
    },
    video: {
        data: Buffer,
        content: String
    },
    sold:{
        type: Number,
        'default': 0
    },
    rating: {
        type: Number,
        'default': 0,
        min: 0,
        max: 5
    }

}, {timestamps:true})

module.exports = mongoose.model('Product', productSchema);