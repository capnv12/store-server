const express = require('express')
const router = express.Router()

const { create, productById, read, remove, update, list, listRelated, listCategories, listBySearch, photo } = require('../controllers/product')
const {requireLogare, isAdmin, isAuth} = require('../controllers/auth')
const { userById } = require('../controllers/user')

router.get('/produs/:productId', read)
router.post('/produs/creare/:userId', requireLogare, isAuth, isAdmin, create);
router.delete('/produs/:productId/:userId', requireLogare, isAuth, isAdmin, remove)
router.put('/produs/:productId/:userId', requireLogare, isAuth, isAdmin, update)

router.get('/produse', list)
router.get('/produse/related/:productId', listRelated)
router.post("/produse/by/search", listBySearch);
router.get("/produse/photo/:productId", photo);
// router.get('/produse/categorii', listCategories)

router.param('userId', userById)
router.param('productId', productById)

module.exports = router;