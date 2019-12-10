const express = require('express')
const router = express.Router()

const { create, tipProdusById, read, remove, update, list } = require('../controllers/tipProdus')
const {requireLogare, isAdmin, isAuth} = require('../controllers/auth')
const { userById } = require('../controllers/user')

router.get('/tip-produs/:tipProdusId', read)
router.post('/tip-produs/creare/:userId', requireLogare, isAuth, isAdmin, create);
router.delete('/tip-produs/:tipProdusId/:userId', requireLogare, isAuth, isAdmin, remove)
router.put('/tip-produs/:tipProdusId/:userId', requireLogare, isAuth, isAdmin, update);
router.get('/tipuri-produs', list)

router.param('userId', userById)
router.param('tipProdusId', tipProdusById)

module.exports = router;