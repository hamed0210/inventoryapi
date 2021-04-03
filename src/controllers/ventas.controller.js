const { request, response } = require('express')
const shortid = require('shortid')

const ventasModel = require('../models/ventas.model')

const Ventas = async (req = request, res = response) => {
	try {
		const result = await ventasModel.findAll()
		if (result == '')
			return res.status(400).json({
				message: 'No se encuentró ninguna venta registrada',
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
const Venta = async (req = request, res = response) => {
	const { codigo } = req.params

	try {
		const result = await ventasModel.findByPk(codigo)

		if (!result)
			return res.status(400).json({
				message: `No se encuentró ninguna venta registrada con el código ${codigo}`,
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
const VentaCreate = async (req = request, res = response) => {
	const { cogido, id_cliente, id_vendedor, productos, cantidad } = req.body

	if (!cogido || !id_cliente || !id_vendedor || !productos || !cantidad)
		return res.status(400).json({
			message: 'Por favor ingresar datos requeridos',
		})

	try {
		const result = await ventasModel.findOne({
			where: {
				codigo: codigo,
			},
		})

		if (result)
			return res.status(400).json({
				message: 'La venta ya se encuentra registrada',
			})

		const newVenta = await ventasModel.create({
			cogido,
			id_cliente,
			id_vendedor,
			productos,
			cantidad,
		})

		return res.status(201).json({
			message: 'Nueva venta creada correctamente',
			data: newVenta,
		})
	} catch (error) {
		return res.status(400).json({
			message: 'Ocurrió un error al realizar la operación',
		})
	}
}
const VentaUpdate = async (req = request, res = response) => {
	const { codigo } = req.params
	const { id_cliente, id_vendedor, productos, cantidad } = req.body

	try {
		const result = await ventasModel.findByPk(codigo)

		if (result) {
			await result.update({
				id_cliente,
				id_vendedor,
				productos,
				cantidad,
			})
		} else {
			return res.status(400).json({
				message: `La venta con código ${codigo} no se encuentra registrada`,
			})
		}

		return res.status(200).json({
			message: 'venta actualizada correctamente',
			data: result,
		})
	} catch (error) {
		return res.status(400).json({
			message: 'Ocurrió un error al realizar la operación',
		})
	}
}
const VentaDelete = async (req = request, res = response) => {
	const { codigo } = req.params

	try {
		const result = ventasModel.destroy({
			where: {
				codigo: codigo,
			},
		})

		if (result == 0)
			return res.status(400).json({
				message: `Error al intentar eliminar venta con código ${codigo}`,
			})

		return res.status(200).json({
			message: 'venta eliminada correctamente',
		})
	} catch (error) {
		return res.status(400).json({
			message: 'Ocurrió un error al realizar la operación',
		})
	}
}

module.exports = {
	Ventas,
	Venta,
	VentaCreate,
	VentaUpdate,
	VentaDelete,
}
