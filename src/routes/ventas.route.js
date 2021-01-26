const { Router } = require('express')
const passport = require('passport')

const {
	Ventas,
	Venta,
	VentaUpdate,
	VentaDelete,
} = require('../controllers/ventas.controller')

const { isAdmin } = require('../libs/auth.libs')

const router = Router()

router.get('/ventas', passport.authenticate('jwt', { session: false }), Ventas)
router.get(
	'/ventas/:codigo',
	passport.authenticate('jwt', { session: false }),
	Venta
)
router.put(
	'/ventas/:codigo',
	passport.authenticate('jwt', { session: false }),
	isAdmin,
	VentaUpdate
)
router.delete(
	'/ventas/:codigo',
	passport.authenticate('jwt', { session: false }),
	isAdmin,
	VentaDelete
)

module.exports = router
