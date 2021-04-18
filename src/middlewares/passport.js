const { Strategy, ExtractJwt } = require('passport-jwt')

const { jwtSecret } = require('../config')
const User = require('../models/user.model')

const opts = {
	//Esta obcion extrae el token enviado en la cabezera authorization, con la palabra bearer
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: jwtSecret,
}

// payload = contenido que esta dentro del token en la funcion createToken
module.exports = new Strategy(opts, async (payload, done) => {
	try {
		const user = await User.findOne({
			where: { codigo: payload.codigo },
			attributes: { exclude: ['pass', 'codigo'] },
		})

		if (user) return done(null, user)

		return done(null, false)
	} catch (error) {
		console.log(error)
	}
})
