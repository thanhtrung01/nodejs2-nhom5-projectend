const router = require('express').Router()

const authCTRL = require('../controllers/auth/auth.controller')

router.post('/login', authCTRL.login)
router.post('/register', authCTRL.register)


module.exports=router
