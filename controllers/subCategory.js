const SubCategory = require('../models/subCategory')
const {errorHandler} = require('../helpers/dbErrorHandler');
const formidable = require('formidable')
const _ = require('lodash')

exports.subCategoryById = (req,res,next,id) => {
    // SubCategory.findById(id).exec((err, subCategory) => {
    //     if(err || !subCategory){
    //         return res.status(400).json({
    //             error: 'Categoria nu a putut fi gasit'
    //         })
    //     }
    //     req.subCategory = subCategory
    //     next()
    // })
    SubCategory.findById(id).exec((err, subCategory) => {
        if(err || !subCategory){
            return res.status(400).json({
                error: 'Categoria nu a putut fi gasita'
            })
        }
        req.subCategory = subCategory
        next()
    })
}

    exports.read = (req, res) => {
        return res.json(req.subCategory)
    }

exports.create = (req,res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields) => {
        if(err) {
            return res.status(400).json({
                error: 'Creare sub-categorie esuata'
            })
        }
        let subCategory = new SubCategory(fields)

        subCategory.save((err, subCategory) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json({subCategory})
        })
    })
}

exports.update = (req,res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields) => {
        if(err) {
            return res.status(400).json({
                error: 'Creare sub-categorie esuata'
            })
        }
        let subCategory = req.subCategory
        subCategory = _.extend(subCategory, fields)

        subCategory.save((err, subCategory) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json({subCategory})
        })
    })
}

exports.remove = (req, res) => {
    let subCategory = req.subCategory
    subCategory.remove((err, deleteProduct) =>{
        if(err || !subCategory){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message:"Categoria a fost stearsa"
        })
    })
}