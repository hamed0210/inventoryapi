const { Router } = require('express')
const passport = require('passport')

const {
	Inventario,
	InventarioUpdate,
	InventaioDelete,
} = require('../controllers/inventario.controller')

const router = Router()

router.get(
	'/inventario',
	passport.authenticate('jwt', { session: false }),
	Inventario
)

router.put(
	'/inventario/:codigo',
	passport.authenticate('jwt', { session: false }),
	InventarioUpdate
)

router.delete(
	'/inventario/:codigo',
	passport.authenticate('jwt', { session: false }),
	InventaioDelete
)

module.exports = router
