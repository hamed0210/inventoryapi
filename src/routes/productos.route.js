const { Router } = require('express')
const passport = require('passport')

const {
	Productos,
	Producto,
	ProductoCreate,
	ProductoUpdate,
	ProductoDelete,
} = require('../controllers/productos.controller')

const { isAdmin } = require('../libs/auth.libs')

const router = Router()

router.get(
	'/productos',
	passport.authenticate('jwt', { session: false }),
	Productos
)
router.get(
	'/productos/:codigo',
	passport.authenticate('jwt', { session: false }),
	Producto
)
router.post(
	'/productos',
	passport.authenticate('jwt', { session: false }),
	ProductoCreate
)
router.put(
	'/productos/:codigo',
	passport.authenticate('jwt', { session: false }),
	isAdmin,
	ProductoUpdate
)
router.delete(
	'/productos/:codigo',
	passport.authenticate('jwt', { session: false }),
	isAdmin,
	ProductoDelete
)

router.post('/productosimg', (req, res) => {
	console.log(req.body)
})

module.exports = router
