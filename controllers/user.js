const User = require('../models/user')


exports.userById = (req,res,next,id) => {
    User.findById(id).exec((err,user) => {
        if(err || !user) {
            return res.status(400).json({
                error: 'Utilizatorul nu a fost gasit'
            })
        }
        req.profile = user
        next()
    })
}

exports.read = (req, res) => {
    req.profile.hashed_parola = undefined
    req.profile.salt = undefined
    return res.json(req.profile)

}
exports.update = (req, res) => {
    User.findOneAndUpdate({_id: req.profile._id}, {$set: req.body}, {new:true, useFindAndModify: false}, (err, user) => {
        if(err){
            return res.status(400).json({
                error: 'Nu esti autorizat pentru a face aceste operatiuni'
            })
        }
        user.hashed_parola = undefined
        user.salt = undefined
        res.json(user)
    })
}
// exports.update = (req, res) => {
//     User.findOneAndUpdate({_id: req.profile._id}, {$set: req.body}, {new:true}, (err, user) =>{
//         if(err) {
//             return res.status(400).json({
//                 error: 'You are not authoried to perform this action'
//             })
//         }
//         user.hashed_password = undefined
//         user.salt = undefined
//         res.json(user)
//     })

// }