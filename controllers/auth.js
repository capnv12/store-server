const User = require('../models/user');
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const {errorHandler} = require('../helpers/dbErrorHandler');

exports.inregistrare = (req, res) => {
    console.log('req.body', req.body);
    const user = new User(req.body)
        user.save((err,user) =>{
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            user.salt = undefined
            user.hashed_parola = undefined
            res.json({
                user
            })
        })
}

exports.logare = (req, res) => {
    const {email, password} = req.body
    User.findOne({email}, (err, user) => {
        if(err || !user){
            return res.status(400).json({
                err:'Nu exista utilizator cu acest email. Te rugam inregistreaza-te'
            })
        }
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: 'Adresa de email si parola nu corespund'
            })
        }

        const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET)
        res.cookie('t',token, {expire: new Date() + 9999})
        const {_id, email, role} = user
        return res.json({token, user:{_id, email, role}})
    })
}

exports.dezautentificare = (req, res) => {
    res.clearCookie('t')
    res.json({message:"Dezautentificat"})
}

exports.requireLogare = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty:'auth'
})

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id
    if(!user){
        return res.status(403).json({
            error: 'Acces respins!'
        })
    }
    next()
}

exports.isAdmin = (req, res, next) => {
    if(req.profile.role !== 0) {
        return res.status(403).json ({
            error: 'Resurse admin! Acces respins!'
        })
    }
    next()
}