// exports.userSignupValidator = (req, res, next) => {
//     req.check('name', 'Name is requiered').notEmpty()
//     req.check('email', 'Email must be between 3 to 32 characters')
//         .matches(/.+\@.+..+/)
//         .withMessage('Email must contain @')
//         .isLength({
//             min: 4,
//             max: 32
//         });
//     req.check('password', 'Password is required').notEmpty()
//     req.check('password')
//         .isLength({ min: 6 })
//         .withMessage('Password most contain at least 6 charachters')
//         .matches(/\d/)
//         .withMessage('Passsword must contain a number');
//     const errors = req.validationErrors()
//     if (errors) {
//         const firstError = errors.map(error => error.msg)[0]
//         return res.status(400).json({ error: firstError })
//     }
//     next()
// }
exports.userSignupValidator = (req, res, next) => {
    req.check('email', 'Adresa de mail trebuie sa fie intre 3 si 32 caractere')
        .matches(/.+\@.+..+/)
        .withMessage('Adresa de mail trebuie sa contina @')
        .isLength({
            min:4,
            max:32
        })
        req.check('password', 'Parola este obligatorie').notEmpty()
        req.check('password').isLength({min:6}).withMessage('Parola trebuie sa aiba cel putin 6 caractere')
            .matches(/\d/).withMessage('Parola trebuie sa contina cel putin o cifra')
        const errors = req.validationErrors()
        if(errors){
            const firstError = errors.map(error => error.msg)[0]
            return res.status(400).json({error:firstError})
        }
        next();
}