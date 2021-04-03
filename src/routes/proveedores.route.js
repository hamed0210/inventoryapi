const { Router } = require('express')
const passport = require('passport')

const {
	Proveedores,
	Proveedor,
	ProveedorCreate,
	ProveedorUpdate,
	ProveedorDelete,
} = require('../controllers/proveedores.controller')

const { isAdmin } = require('../libs/auth.libs')

const router = Router()

router.get(
	'/proveedores',
	passport.authenticate('jwt', { session: false }),
	Proveedores
)
router.get(
	'/proveedores/:id',
	passport.authenticate('jwt', { session: false }),
	Proveedor
)
router.post(
	'/proveedores',
	passport.authenticate('jwt', { session: false }),
	ProveedorCreate
)
router.put(
	'/proveedores/:id',
	passport.authenticate('jwt', { session: false }),
	isAdmin,
	ProveedorUpdate
)
router.delete(
	'/proveedores/:id',
	passport.authenticate('jwt', { session: false }),
	isAdmin,
	ProveedorDelete
)

module.exports = router
