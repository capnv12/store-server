const express = require('express')
const router = express.Router()

const { userById } = require('../controllers/user')
const {requireLogare, isAdmin, isAuth} = require('../controllers/auth')

router.get('/secret/:userId', requireLogare, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    })
})

router.param('userId', userById)

module.exports = router;