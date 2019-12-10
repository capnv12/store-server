const TipProdus = require('../models/tipProdus')
const {errorHandler} = require('../helpers/dbErrorHandler');

exports.tipProdusById = (req,res,next,id)=> {
    TipProdus.findById(id).exec((err, tipProdus) => {
        if(err || !tipProdus){
            return res.status(400).json({
                error:'Acest tip de produs nu exista'
            })
        }
        req.tipProdus = tipProdus
        next()
    })
}

exports.read = (req, res) => {
    return res.json(req.tipProdus)
}

exports.create = (req, res) => {
    const tipProdus = new TipProdus(req.body);
    tipProdus.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({ data })
    })
}


exports.list = (req, res) => {
    TipProdus.find().exec((err, tipProdus) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(tipProdus)
    })
}

exports.remove = (req, res) => {
    let tipProdus = req.tipProdus
    tipProdus.remove((err, deleteProduct) =>{
        if(err || !tipProdus){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message:"Tipul de produs a fost sters"
        })
    })
}

exports.update = (req, res) => {
    const tipProdus = req.tipProdus
    tipProdus.nume = req.body.nume
    tipProdus.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data)
    })
}