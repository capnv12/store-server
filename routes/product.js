const express = require('express')
const router = express.Router()

const { create, productById, read, remove, update, list, listRelated, listCategories, listBySearch, photo, photo1,photo2,photo3,video } = require('../controllers/product')
const {requireLogare, isAdmin, isAuth} = require('../controllers/auth')
const { userById } = require('../controllers/user')

router.get('/produs/:productId', read)
router.post('/produs/creare/:userId', requireLogare, isAuth, isAdmin, create);
router.delete('/produs/:productId/:userId', requireLogare, isAuth, isAdmin, remove)
router.put('/produs/:productId/:userId', requireLogare, isAuth, isAdmin, update)

router.get('/produse', list)
router.get('/produse/related/:productId', listRelated)
router.post("/produse/by/search", listBySearch);
router.get("/produs/photo/:productId", photo);
router.get("/produs/photo1/:productId", photo1);
router.get("/produs/photo2/:productId", photo2);
router.get("/produs/photo3/:productId", photo3);
router.get("/produs/video/:productId", video);
// router.get('/produse/categorii', listCategories)

router.param('userId', userById)
router.param('productId', productById)

module.exports = router;