const { request, response } = require('express')
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config')

const userModel = require('../models/user.model')
const personalModel = require('../models/personal.model')

const signIn = async (req = request, res = response) => {
	const { email, pass } = req.body

	if (!email || !pass) {
		return res
			.status(400)
			.json({ message: 'Por favor. Ingresar email y contraseña' })
	}

	try {
		const result = await userModel.findOne({
			where: {
				email: email,
			},
			include: {
				model: personalModel,
				attributes: { exclude: 'cod_usu' },
			},
		})

		if (!result) {
			return res
				.status(400)
				.json({ message: 'Los datos ingresados son incorrectos' })
		}

		const isMatch = await userModel.comparePassword(req.body)

		if (isMatch) {
			const token = createToken(result)
			return res.status(200).json({ token: token })
		}

		return res.status(400).json({
			message: 'Los datos ingresados son incorrectos',
		})
	} catch (error) {
		return res.status(400).json({
			message: 'Ocurrió un error al realizar la operación',
		})
	}
}

const createToken = (user) => {
	// generar un token
	return jwt.sign({ codigo: user.codigo }, jwtSecret, {
		expiresIn: '1d', //un dia
	})
}

module.exports = { signIn }
