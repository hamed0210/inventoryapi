const { Router } = require('express')
const passport = require('passport')

const {
	Ventas,
	Venta,
	VentaCreate,
	VentaUpdate,
	VentaDelete,
} = require('../controllers/ventas.controller')

const router = Router()

router.get('/ventas', passport.authenticate('jwt', { session: false }), Ventas)
router.get(
	'/ventas/:codigo',
	passport.authenticate('jwt', { session: false }),
	Venta
)
router.post(
	'/ventas',
	passport.authenticate('jwt', { session: false }),
	VentaCreate
)
router.put(
	'/ventas/:codigo',
	passport.authenticate('jwt', { session: false }),
	VentaUpdate
)
router.delete(
	'/ventas/:codigo',
	passport.authenticate('jwt', { session: false }),
	VentaDelete
)

module.exports = router
