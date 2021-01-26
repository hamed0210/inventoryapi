module.exports = {
	db: {
		uri: process.env.DB_URI,
		name: process.env.DB_NAME,
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
	},

	jwtSecret: process.env.JWT_SECRET || 'JWTSecretKey',
}
