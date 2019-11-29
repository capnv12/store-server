const express = require('express')
const router = express.Router()

const { userById, read, update } = require('../controllers/user')
const {requireLogare, isAdmin, isAuth} = require('../controllers/auth')

router.get('/secret/:userId', requireLogare, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    })
})

router.get('/user/:userId',requireLogare, isAuth, read)
router.put('/user/:userId',requireLogare, isAuth, update)

router.param('userId', userById)

module.exports = router;