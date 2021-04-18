const { request, response } = require('express')
const shortid = require('shortid')

const userModel = require('../models/user.model')

const Users = async (req = request, res = response) => {
	try {
		const users = await userModel.findAll({
			attributes: { exclude: ['pass', 'codigo'] },
		})

		if (users === '') {
			return res.status(400).json({
				message: 'No se encuentró ningún usuario registrado',
			})
		}
		return res.status(200).json({
			data: users,
		})
	} catch (error) {
		return res.status(400).json({
			message: 'Ocurrió un error al realizar la operación',
		})
	}
}

const User = async (req = request, res = response) => {
	const { id } = req.params

	try {
		const user = await userModel.findOne({
			where: {
				codigo: id,
			},
			attributes: { exclude: ['pass', 'codigo'] },
		})

		if (!user)
			return res.status(400).json({
				message: `No se encuentró ningún usuario registrado con el id ${id}`,
			})

		return res.status(200).json({
			message: 'Users retrieved',
			data: user,
		})
	} catch (error) {
		return res.status(400).json({
			message: 'Ocurrió un error al realizar la operación',
		})
	}
}

const UserCreate = async (req = request, res = response) => {
	const {
		id,
		nombres,
		apellidos,
		dir,
		ciudad,
		cel,
		email,
		pass,
		role,
	} = req.body

	if (
		!id ||
		!nombres ||
		!apellidos ||
		!dir ||
		!ciudad ||
		!cel ||
		!email ||
		!pass
	) {
		return res
			.status(400)
			.json({ message: 'Por favor. Ingresar todos los datos' })
	}

	try {
		const resultUserId = await userModel.findByPk(id)

		const resultUserEmail = await userModel.findOne({
			where: { email },
		})

		if (resultUserId)
			return res
				.status(400)
				.json({ message: 'El id ya se encuentra registrado' })

		if (resultUserEmail)
			return res
				.status(400)
				.json({ message: 'El email ya se encuentra registrado' })

		// const UUID = shortid.generate()

		const newUSer = await userModel.create({
			codigo: shortid.generate(),
			id,
			email,
			nombres,
			apellidos,
			cel,
			dir,
			ciudad,
			pass,
			role,
		})

		console.log(newUSer)

		return res.status(201).json({
			message: 'Nuevo usuario creado correctamente',
		})
	} catch (error) {
		return res.status(400).json({
			message: 'Ocurrió un error al realizar la operación',
		})
	}
}

const UserUpdate = async (req = request, res = response) => {
	const { id } = req.params
	const { role, nombres, apellidos, dir, ciudad, cel, email } = req.body

	try {
		const result = await userModel.findByPk(id)

		if (!result)
			return res.status(400).json({
				message: `El usuario con id ${id} no se encuentra registrado`,
			})

		const resultUpdate = await result.update(
			{
				email,
				nombres,
				apellidos,
				cel,
				dir,
				ciudad,
				role,
			}
			// { attributes: { exclude: ['pass', 'codigo'] } }
		)

		console.log(resultUpdate)

		return res.status(200).json({
			message: 'Usuario actualizado correctamente',
			data: resultUpdate,
		})
	} catch (error) {
		return res.status(400).json({
			message: 'Ocurrió un error al realizar la operación',
		})
	}
}

const UserDelete = async (req = request, res = response) => {
	const { id } = req.params

	try {
		const userResult = await userModel.findByPk(id)

		const result = await userResult.destroy()

		if (result === 0)
			return res.status(400).json({
				message: `Error al intentar eliminar usuario con id ${id}`,
			})
		return res.status(200).json({
			message: 'Usuario eliminado correctamente',
		})
	} catch (error) {
		return res.status(400).json({
			message: 'Ocurrió un error al realizar la operación',
		})
	}
}

module.exports = { UserDelete, UserUpdate, Users, User, UserCreate }
