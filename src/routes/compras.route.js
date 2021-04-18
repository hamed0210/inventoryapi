const { Router } = require('express')
const passport = require('passport')

const {
	Compras,
	Compra,
	CompraUpdate,
	CompraDelete,
	CompraCreate,
} = require('../controllers/compras.controller')

const router = Router()

router.get(
	'/compras',
	passport.authenticate('jwt', { session: false }),
	Compras
)
router.get(
	'/compras/:codigo',
	passport.authenticate('jwt', { session: false }),
	Compra
)
router.post(
	'/compras',
	passport.authenticate('jwt', { session: false }),
	CompraCreate
)
router.put(
	'/compras/:codigo',
	passport.authenticate('jwt', { session: false }),
	CompraUpdate
)
router.delete(
	'/compras/:codigo',
	passport.authenticate('jwt', { session: false }),
	CompraDelete
)

module.exports = router
