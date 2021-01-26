const isLogged = (req, res, next) => {
	if (req.isAuthenticated()) return next()
}

const isAdmin = async (req, res, next) => {
	if (req.user.role === 'Admin') {
		return next()
	}

	return res.status(403).json({ message: 'Requiere Admin role' })
}

module.exports = { isLogged, isAdmin }
