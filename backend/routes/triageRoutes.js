const router=require('express').Router()

const controller=require('../controllers/triageController')

router.get('/priority',controller.getPriorityVictims)

module.exports=router
