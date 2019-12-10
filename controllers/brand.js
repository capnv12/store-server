const Brand = require('../models/brand')
const {errorHandler} = require('../helpers/dbErrorHandler');

exports.brandById = (req,res,next,id)=> {
    Brand.findById(id).exec((err, brand) => {
        if(err || !brand){
            return res.status(400).json({
                error:'Brandul nu exista'
            })
        }
        req.brand = brand
        next()
    })
}

exports.read = (req, res) => {
    return res.json(req.brand)
}

exports.create = (req, res) => {
    const brand = new Brand(req.body);
    brand.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({ data })
    })
}


exports.list = (req, res) => {
    Brand.find().exec((err, brand) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(brand)
    })
}

exports.remove = (req, res) => {
    let brand = req.brand
    brand.remove((err, deleteProduct) =>{
        if(err || !brand){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message:"Brandul a fost sters"
        })
    })
}

exports.update = (req, res) => {
    const brand = req.brand
    brand.nume = req.body.nume
    brand.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data)
    })
}