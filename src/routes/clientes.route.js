const { Router } = require('express')
const passport = require('passport')

const {
	Clientes,
	Cliente,
	ClienteCreate,
	ClienteUpdate,
	ClienteDelete,
} = require('../controllers/clientes.controller')

const { isAdmin } = require('../libs/auth.libs')

const router = Router()

router.get(
	'/clientes',
	passport.authenticate('jwt', { session: false }),
	Clientes
)
router.get(
	'/clientes/:id',
	passport.authenticate('jwt', { session: false }),
	Cliente
)
router.post(
	'/clientes',
	passport.authenticate('jwt', { session: false }),
	ClienteCreate
)
router.put(
	'/clientes/:id',
	passport.authenticate('jwt', { session: false }),
	isAdmin,
	ClienteUpdate
)
router.delete(
	'/clientes/:id',
	passport.authenticate('jwt', { session: false }),
	isAdmin,
	ClienteDelete
)

module.exports = router
