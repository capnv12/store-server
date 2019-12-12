const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const productSchema = new mongoose.Schema({
    nume:{
        type:String,
        trim: true,
        required:true,
        maxlength:32
    },
    subtitlu:{
        type:String,
        trim: true,
        required:true,
        maxlength:120
    },
    descriere:{
        type:String,
        trim: true,
        required:true,
        maxlength:2000
    },
    descriereScurta:{
        type:String,
        trim: true,
        required:true,
        maxlength:64
    },
    brand:{
        type:ObjectId,
        ref:'Brand',
    },
    categorie:{
        type:ObjectId,
        ref:'SubCategory',
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
        type:Number,
        'default': 0,
        min: 0,
        max: 1
    },
    cantitate:{
        type:Number,
        trim: true,
        maxlength:32
    },
    tipProdus:{
        type:ObjectId,
        ref:'TipProdus',
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
    inregistrare:{
        type: Number,
        'default': 0,
        min: 0,
        max: 1
    },
    ordine:{
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