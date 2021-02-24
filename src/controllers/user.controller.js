const { request, response } = require('express')
const uuid = require('uuid')
const shortid = require('shortid')

const userModel = require('../models/user.model')
const personalModel = require('../models/personal.model')

const Users = async (req = request, res = response) => {
	try {
		const users = await userModel.findAll({
			include: {
				model: personalModel,
				attributes: { exclude: 'id_usu', include: 'id' },
			},
			attributes: { exclude: ['pass', 'id'] },
		})

		if (users == '') {
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
				id: id,
			},
			include: {
				model: personalModel,
				attributes: { exclude: 'id_usu' },
			},
			attributes: { exclude: 'pass' },
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
		const result = await userModel.findOne({
			where: {
				email: email,
			},
		})

		if (result)
			return res
				.status(400)
				.json({ message: 'El usuario ya se encuentra registrado' })

		const UUID = shortid.generate()

		const newUser = await userModel.create(
			{
				id: shortid.generate(),
				email,
				pass,
				role,
				persona: [
					{
						id,
						nombres,
						apellidos,
						dir,
						ciudad,
						cel,
						id_usu: UUID,
					},
				],
			},
			{ include: 'persona' }
		)

		return res.status(201).json({
			message: 'Nuevo usuario creado correctamente',
			data: newUser,
		})
	} catch (error) {
		return res.status(400).json({
			message: 'Ocurrió un error al realizar la operación',
		})
	}
}

const UserUpdate = async (req = request, res = response) => {
	const { id } = req.params
	const { pass, role, nombres, apellidos, dir, ciudad, cel, email } = req.body

	try {
		const result = await personalModel.findOne({
			where: {
				id: id,
			},
		})

		if (result) {
			await result.update(
				{
					id: id,
					nombres,
					apellidos,
					dir,
					ciudad,
					cel,
					usuario: [{ email, pass, role }],
				},
				{ include: 'usuario' }
			)
		} else {
			return res.status(400).json({
				message: `El usuario con id ${id} no se encuentra registrado`,
			})
		}
		return res.status(200).json({
			message: 'Usuario actualizado correctamente',
			data: result,
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
		const result = await userModel.destroy({
			where: {
				id: id,
			},
		})

		if (result == 0)
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
