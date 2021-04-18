const { request, response } = require('express')

const clientesModel = require('../models/clientes.model')

const Clientes = async (req = request, res = response) => {
	try {
		const result = await clientesModel.findAll()

		if (result === '')
			return res.status(400).json({
				message: 'No se encontró ningún cliente registrado',
			})

		return res.status(200).json({
			data: result,
		})
	} catch (error) {
		return res.status(400).json({
			message: 'Ocurrió un error al realizar la operación',
		})
	}
}
const Cliente = async (req = request, res = response) => {
	const { id } = req.params

	try {
		const result = await clientesModel.findByPk(id)

		if (!result)
			return res.status(400).json({
				message: `No se encontró ningún cliente registrado con el id ${id}`,
			})

		return res.status(200).json({
			data: result,
		})
	} catch (error) {
		return res.status(400).json({
			message: 'Ocurrió un error al realizar la operación',
		})
	}
}
const ClienteCreate = async (req = request, res = response) => {
	const { id, nombre, cel, email, dir, ciudad } = req.body

	if (!id || !nombre || !email || !dir || !ciudad || !cel)
		return res.status(400).json({
			message: 'Por favor ingresar datos requeridos',
		})

	try {
		const result = await clientesModel.findByPk(id)

		if (result)
			return res.status(400).json({
				message: 'El cliente ya se encuentra registrado',
			})

		const newCliente = await clientesModel.create({
			id,
			nombre,
			cel,
			email,
			dir,
			ciudad,
		})

		return res.status(201).json({
			message: 'Nuevo cliente creado correctamente',
			data: newCliente,
		})
	} catch (error) {
		return res.status(400).json({
			message: 'Ocurrió un error al realizar la operación',
		})
	}
}
const ClienteUpdate = async (req = request, res = response) => {
	const { id } = req.params
	const { nombre, cel, email, dir, ciudad } = req.body

	try {
		const result = await clientesModel.findByPk(id)

		if (result) {
			await result.update({
				nombre,
				cel,
				email,
				dir,
				ciudad,
			})
		} else {
			return res.status(400).json({
				message: `El cliente con id ${id} no se encuentra registrado`,
			})
		}

		return res.status(200).json({
			message: 'cliente actualizado correctamente',
			data: result,
		})
	} catch (error) {
		return res.status(400).json({
			message: 'Ocurrió un error al realizar la operación',
		})
	}
}
const ClienteDelete = async (req = request, res = response) => {
	const { id } = req.params

	try {
		const result = clientesModel.destroy({
			where: {
				id: id,
			},
		})

		if (result === 0)
			return res.status(400).json({
				message: `Error al intentar eliminar cliente con id ${id}`,
			})

		return res.status(200).json({
			message: 'cliente eliminado correctamente',
		})
	} catch (error) {
		return res.status(400).json({
			message: 'Ocurrió un error al realizar la operación',
		})
	}
}

module.exports = {
	Clientes,
	Cliente,
	ClienteCreate,
	ClienteUpdate,
	ClienteDelete,
}
