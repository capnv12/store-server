const express = require('express')
const router = express.Router()

const { create, categoryById, read, remove, update, list } = require('../controllers/category')
const {requireLogare, isAdmin, isAuth} = require('../controllers/auth')
const { userById } = require('../controllers/user')

router.get('/categorie/:categoryId', read)
router.post('/categorie/creare/:userId', requireLogare, isAuth, isAdmin, create);
router.delete('/categorie/:categoryId/:userId', requireLogare, isAuth, isAdmin, remove)
router.put('/categorie/:categoryId/:userId', requireLogare, isAuth, isAdmin, update);
router.get('/categorii', list)

router.param('userId', userById)
router.param('categoryId', categoryById)

module.exports = router;