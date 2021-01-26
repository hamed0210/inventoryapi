const { Router } = require('express')
const passport = require('passport')

const router = Router()

router.get(
	'/home',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		// console.log(req.user.email_usu)
		// console.log(req.user.persona.nombres_per)
		res.status(200).json({ messaje: 'hola home' })
	}
)

module.exports = router
