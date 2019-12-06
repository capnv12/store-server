const express = require('express')
const router = express.Router()

const { create, subCategoryById, read, remove, update, list } = require('../controllers/subCategory')
const {requireLogare, isAdmin, isAuth} = require('../controllers/auth')
const { userById } = require('../controllers/user')

router.get('/sub-categorie/:subCategoryId', read)
router.post('/sub-categorie/creare/:userId', requireLogare, isAuth, isAdmin, create);
router.delete('/sub-categorie/:subCategoryId/:userId', requireLogare, isAuth, isAdmin, remove)
router.put('/sub-categorie/:subCategoryId/:userId', requireLogare, isAuth, isAdmin, update)
router.get('/sub-categorii', list)


router.param('userId', userById)
router.param('subCategoryId', subCategoryById)


module.exports = router;