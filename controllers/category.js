const Category = require('../models/category')
const {errorHandler} = require('../helpers/dbErrorHandler');

exports.categoryById = (req,res,next,id)=> {
    Category.findById(id).exec((err, category) => {
        if(err || !category){
            return res.status(400).json({
                error:'Categoria nu exista'
            })
        }
        req.category = category
        next()
    })
}

exports.read = (req, res) => {
    return res.json(req.category)
}

exports.create = (req, res) => {
    const category = new Category(req.body);
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({ data })
    })
}


exports.list = (req, res) => {
    Category.find().exec((err, category) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(category)
    })
}

exports.remove = (req, res) => {
    let category = req.category
    category.remove((err, deleteProduct) =>{
        if(err || !category){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message:"Categoria a fost stearsa"
        })
    })
}

exports.update = (req, res) => {
    const category = req.category
    category.nume = req.body.nume
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data)
    })
}