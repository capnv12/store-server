const express = require('express')
const router = express.Router()

const { create, brandById, read, remove, update, list } = require('../controllers/brand')
const {requireLogare, isAdmin, isAuth} = require('../controllers/auth')
const { userById } = require('../controllers/user')

router.get('/brand/:brandId', read)
router.post('/brand/creare/:userId', requireLogare, isAuth, isAdmin, create);
router.delete('/brand/:brandId/:userId', requireLogare, isAuth, isAdmin, remove)
router.put('/brand/:brandId/:userId', requireLogare, isAuth, isAdmin, update);
router.get('/brand', list)

router.param('userId', userById)
router.param('brandId', brandById)

module.exports = router;