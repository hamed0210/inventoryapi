const { request, response } = require('express')

const proveedoresModel = require('../models/proveedores.model')

const Proveedores = async (req = request, res = response) => {
	try {
		const result = await proveedoresModel.findAll()

		if (result === '')
			return res.status(400).json({
				message: 'No se encontró ningún proveedor registrado',
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
const Proveedor = async (req = request, res = response) => {
	const { id } = req.params

	try {
		const result = await proveedoresModel.findByPk(id)

		if (!result)
			return res.status(400).json({
				message: `No se encontró ningún proveedor registrado con el id ${id}`,
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
const ProveedorCreate = async (req = request, res = response) => {
	const { id, nombre, cel, email, dir, ciudad } = req.body

	if (!id || !nombre || !email || !dir || !ciudad || !cel)
		return res.status(400).json({
			message: 'Por favor ingresar datos requeridos',
		})

	try {
		const result = await proveedoresModel.findByPk(id)

		if (result)
			return res.status(400).json({
				message: 'El proveedor ya se encuentra registrado',
			})

		const newProveedor = await proveedoresModel.create({
			id,
			nombre,
			cel,
			email,
			dir,
			ciudad,
		})

		return res.status(201).json({
			message: 'Nuevo proveedor creado correctamente',
			data: newProveedor,
		})
	} catch (error) {
		return res.status(400).json({
			message: 'Ocurrió un error al realizar la operación',
		})
	}
}
const ProveedorUpdate = async (req = request, res = response) => {
	const { id } = req.params
	const { nombre, cel, email, dir, ciudad } = req.body

	try {
		const result = await proveedoresModel.findByPk(id)

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
				message: `El proveedor con id ${id} no se encuentra registrado`,
			})
		}

		return res.status(200).json({
			message: 'Proveedor actualizado correctamente',
			data: result,
		})
	} catch (error) {
		return res.status(400).json({
			message: 'Ocurrió un error al realizar la operación',
		})
	}
}
const ProveedorDelete = async (req = request, res = response) => {
	const { id } = req.params

	try {
		const result = proveedoresModel.destroy({
			where: {
				id: id,
			},
		})

		if (result === 0)
			return res.status(400).json({
				message: `Error al intentar eliminar proveedor con id ${id}`,
			})

		return res.status(200).json({
			message: 'Proveedor eliminado correctamente',
		})
	} catch (error) {
		return res.status(400).json({
			message: 'Ocurrió un error al realizar la operación',
		})
	}
}

module.exports = {
	Proveedores,
	Proveedor,
	ProveedorCreate,
	ProveedorUpdate,
	ProveedorDelete,
}
