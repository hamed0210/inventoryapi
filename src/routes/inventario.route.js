const { Router } = require('express')
const passport = require('passport')

const { Inventario } = require('../controllers/inventario.controller')

const router = Router()

router.get(
	'/inventario',
	passport.authenticate('jwt', { session: false }),
	Inventario
)
// router.put(
// 	'/ventas/:codigo',
// 	passport.authenticate('jwt', { session: false }),
// 	isAdmin,
// 	VentaUpdate
// )
// router.delete(
// 	'/ventas/:codigo',
// 	passport.authenticate('jwt', { session: false }),
// 	isAdmin,
// 	VentaDelete
// )

module.exports = router
