const { Router } = require('express')
const passport = require('passport')

const { signIn } = require('../controllers/auth.controller')

const router = Router()

router.post('/signin', signIn)

router.get(
	'/check',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		res.json({ user: req.user })
	}
)

module.exports = router
