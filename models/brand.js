const mongoose = require('mongoose')

const brandSchema = new mongoose.Schema({
    nume: {
        type: String,
        trim: true,
        // required: true,
        maxlength: 32,
        unique:true
    },
}, { timestamps: true })

module.exports = mongoose.model("Brand", brandSchema);