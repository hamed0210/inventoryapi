const { Router } = require('express')

const { signIn } = require('../controllers/auth.controller')

const router = Router()

router.post('/signin', signIn)

module.exports = router
