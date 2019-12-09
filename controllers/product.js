const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
const Product = require('../models/product')
const {errorHandler} = require('../helpers/dbErrorHandler');

exports.productById = (req,res,next,id) => {
    Product.findById(id).exec((err, product) => {
        if(err || !product){
            return res.status(400).json({
                error: 'Produsul nu a putut fi gasit'
            })
        }
        req.product = product
        next()
    })
}

exports.read = (req, res) => {
    req.product.photo = undefined
    req.product.photo1 = undefined
    req.product.photo2 = undefined
    req.product.photo3 = undefined
    req.product.video = undefined
    return res.json(req.product)
}

exports.remove = (req, res) => {
    let product = req.product
    product.remove((err, deleteProduct) =>{
        if(err || !product){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message:"Produsul a fost sters"
        })
    })
}


exports.create = (req,res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if(err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            })
        }
        let product = new Product(fields)
        const { photo, photo1, photo2, photo3 } = files
        const { nume, descriere, brand, categorie, SKU, inStoc } = fields

        if(!nume || !descriere || !brand || !categorie || !SKU || !inStoc){
            return res.status(400).json({
                error: 'Campurile sunt obligatorii'
            })
        }

        if(files.photo){
            if(photo.size > 5000000){
                return res.status(400).json({
                    error: 'Imagainea trebuie sa fie mai mica de 5 MB'
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }
        if(files.photo1){
            if(photo1.size > 5000000){
                return res.status(400).json({
                    error: 'Imagainea trebuie sa fie mai mica de 5 MB'
                })
            }
            product.photo1.data = fs.readFileSync(files.photo1.path)
            product.photo1.contentType = files.photo1.type
        }
        if(files.photo2){
            if(photo2.size > 5000000){
                return res.status(400).json({
                    error: 'Imagainea trebuie sa fie mai mica de 5 MB'
                })
            }
            product.photo2.data = fs.readFileSync(files.photo2.path)
            product.photo2.contentType = files.photo2.type
        }
        if(files.photo3){
            if(photo3.size > 5000000){
                return res.status(400).json({
                    error: 'Imagainea trebuie sa fie mai mica de 5 MB'
                })
            }
            product.photo3.data = fs.readFileSync(files.photo3.path)
            product.photo3.contentType = files.photo3.type
        }
        if(files.video){
            if(files.video.size > 20000000){
                return res.status(400).json({
                    error: 'Video-ul trebuie sa fie mai mic de 20 MB'
                })
            }
            product.video.data = fs.readFileSync(files.video.path)
            product.video.contentType = files.video.type
        }

        product.save((err, product) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json({product})
        })
    })
}

exports.update = (req,res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if(err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            })
        }
        let product = req.product
        product = _.extend(product, fields)

        const { photo, photo1, photo2, photo3 } = files
        const { nume, descriere, brand, categorie, SKU, inStoc } = fields

        if(!nume || !descriere || !brand || !categorie || !SKU || !inStoc){
            return res.status(400).json({
                error: 'Campurile sunt obligatorii'
            })
        }

        if(files.photo){
            if(photo.size > 5000000){
                return res.status(400).json({
                    error: 'Imagainea trebuie sa fie mai mica de 5 MB'
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }
        if(files.photo1){
            if(photo1.size > 5000000){
                return res.status(400).json({
                    error: 'Imagainea trebuie sa fie mai mica de 5 MB'
                })
            }
            product.photo1.data = fs.readFileSync(files.photo1.path)
            product.photo1.contentType = files.photo1.type
        }
        if(files.photo2){
            if(photo2.size > 5000000){
                return res.status(400).json({
                    error: 'Imagainea trebuie sa fie mai mica de 5 MB'
                })
            }
            product.photo2.data = fs.readFileSync(files.photo2.path)
            product.photo2.contentType = files.photo2.type
        }
        if(files.photo3){
            if(photo3.size > 5000000){
                return res.status(400).json({
                    error: 'Imagainea trebuie sa fie mai mica de 5 MB'
                })
            }
            product.photo3.data = fs.readFileSync(files.photo3.path)
            product.photo3.contentType = files.photo3.type
        }
        if(files.video){
            if(files.video.size > 20000000){
                return res.status(400).json({
                    error: 'Video-ul trebuie sa fie mai mic de 20 MB'
                })
            }
            product.video.data = fs.readFileSync(files.video.path)
            product.video.contentType = files.video.type
        }

        product.save((err, product) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json({product})
        })
    })
}


// sell/arrival

exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    Product.find()
        .select("-photo").select("-photo1").select("-photo2").select("-photo3").select("-video")
        .populate('subCategory')
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, products) =>{
            if(err){
                return res.status(400).json({
                    error: "Produsele nu au fost gasite"
                })
            }
            res.json(products)
        })
}
exports.listInCategory = (req,res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    Product.find({_id: req.product, categorie: req.product.categorie})
    .limit(limit)
    .populate('subCategory', '_id name')
    .exec((err, products) => {
        if(err){
            if(err){
            return res.status(400).json({
                error:"Produsele nu au fost gasite"
            })
        }
        }
        res.json(products)
    })
}

exports.listRelated = (req,res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    Product.find({_id: {$ne: req.product}, categorie: req.product.categorie})
    .limit(limit)
    .populate('subCategory', '_id name')
    .exec((err, products) => {
        if(err){
            if(err){
            return res.status(400).json({
                error:"Produsele nu au fost gasite"
            })
        }
        }
        res.json(products)
    })
}

exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "pret") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Product.find(findArgs)
        .select("-photo").select("-photo1").select("-photo2").select("-photo3").select("-video")
        .populate("subCategory")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};


exports.photo = (req, res, next) =>{
    if(req.product.photo.data) {
        res.set('Content-Type',req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
}
exports.photo1 = (req, res, next) =>{
    if(req.product.photo1.data) {
        res.set('Content-Type',req.product.photo1.contentType)
        return res.send(req.product.photo1.data)
    }
}
exports.photo2 = (req, res, next) =>{
    if(req.product.photo2.data) {
        res.set('Content-Type',req.product.photo2.contentType)
        return res.send(req.product.photo2.data)
    }
}
exports.photo3 = (req, res, next) =>{
    if(req.product.photo3.data) {
        res.set('Content-Type',req.product.photo3.contentType)
        return res.send(req.product.photo3.data)
    }
}
exports.video = (req, res, next) =>{
    if(req.product.video.data) {
        res.set('Content-Type',req.product.video.contentType)
        return res.send(req.product.video.data)
    }
}


// exports.listCategories = (req, res) => {
//     Product.distinct('category', {}, (err, categorie) => {
//         if(err){
//             return res.status(400).json({
//                 error:"Categories not found"
//             })
//         }
//         res.json(categorie)
//     })
// }