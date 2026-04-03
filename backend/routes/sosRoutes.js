const router = require('express').Router()

const controller = require('../controllers/sosController')

router.post('/',controller.receiveSOS)

module.exports = router

