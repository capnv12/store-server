const express = require('express')
const router = express.Router()

const {inregistrare,logare,dezautentificare,requireLogare} = require('../controllers/auth')
const {userSignupValidator} = require('../validator/index')

router.post('/inregistrare', userSignupValidator, inregistrare);
router.post('/logare', logare)
router.get('/dezautentificare', dezautentificare)

module.exports = router;