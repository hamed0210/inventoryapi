const { Router } = require('express')
const passport = require('passport')

const {
	Users,
	User,
	UserCreate,
	UserUpdate,
	UserDelete,
} = require('../controllers/user.controller')
const { isAdmin } = require('../libs/auth.libs')

const router = Router()

router.get(
	'/users',
	passport.authenticate('jwt', { session: false }),
	isAdmin,
	Users
)
router.get(
	'/users/:id',
	passport.authenticate('jwt', { session: false }),
	isAdmin,
	User
)
router.post(
	'/users',
	passport.authenticate('jwt', { session: false }),
	isAdmin,
	UserCreate
)
router.put(
	'/users/:id',
	passport.authenticate('jwt', { session: false }),
	isAdmin,
	UserUpdate
)
router.delete(
	'/users/:id',
	passport.authenticate('jwt', { session: false }),
	isAdmin,
	UserDelete
)

module.exports = router
