const { Router } = require('express')

const { isLogged } = require('../libs/auth.libs')

const router = Router()

router.get('/logout', isLogged, (req, res) => {
	req.logOut()
	res.redirect('/signin')
})

module.exports = router
