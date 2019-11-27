const express = require('express')
const router = express.Router()

const {inregistrare} = require('../controllers/user')

router.post('/inregistrare', inregistrare);

module.exports = router;