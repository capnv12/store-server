const express = require('express')
const router = express.Router()

const { create } = require('../controllers/category')
const {requireLogare, isAdmin, isAuth} = require('../controllers/auth')
const { userById } = require('../controllers/user')

router.post('/categorie/creare/:userId', requireLogare, isAuth, isAdmin, create);

router.param('userId', userById)

module.exports = router;