const { Router } = require('express')
const passport = require('passport')

const {
	Categorias,
	Categoria,
	CategoriaCreate,
	CategoriaUpdate,
	CategoriaDelete,
} = require('../controllers/categorias.controller')

const { isAdmin } = require('../libs/auth.libs')

const router = Router()

router.get(
	'/categorias',
	passport.authenticate('jwt', { session: false }),
	Categorias
)
router.get(
	'/categorias/:codigo',
	passport.authenticate('jwt', { session: false }),
	Categoria
)
router.post(
	'/categorias',
	passport.authenticate('jwt', { session: false }),
	CategoriaCreate
)
router.put(
	'/categorias/:codigo',
	passport.authenticate('jwt', { session: false }),
	isAdmin,
	CategoriaUpdate
)
router.delete(
	'/categorias/:codigo',
	passport.authenticate('jwt', { session: false }),
	isAdmin,
	CategoriaDelete
)

module.exports = router
