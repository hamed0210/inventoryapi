const { request, response } = require('express')

const ventasModel = require('../models/ventas.model')
const comprasModel = require('../models/compras.model')

const Inventario = async (req = request, res = response) => {
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
		console.log(error)
		return res.status(400).json({
			message: 'Ocurrió un error al realizar la operación',
		})
	}
}

// const VentaUpdate = async (req = request, res = response) => {
// 	const { codigo } = req.params
// 	const { id_cliente, id_vendedor, productos, cantidad } = req.body

// 	try {
// 		const result = await ventasModel.findByPk(codigo)

// 		if (result) {
// 			await result.update({
// 				id_cliente,
// 				id_vendedor,
// 				productos,
// 				cantidad,
// 			})
// 		} else {
// 			return res.status(400).json({
// 				message: `La venta con código ${codigo} no se encuentra registrada`,
// 			})
// 		}

// 		return res.status(200).json({
// 			message: 'venta actualizada correctamente',
// 			data: result,
// 		})
// 	} catch (error) {
// 		return res.status(400).json({
// 			message: 'Ocurrió un error al realizar la operación',
// 		})
// 	}
// }
// const VentaDelete = async (req = request, res = response) => {
// 	const { codigo } = req.params

// 	try {
// 		const result = ventasModel.destroy({
// 			where: {
// 				codigo: codigo,
// 			},
// 		})

// 		if (result == 0)
// 			return res.status(400).json({
// 				message: `Error al intentar eliminar venta con código ${codigo}`,
// 			})

// 		return res.status(200).json({
// 			message: 'venta eliminada correctamente',
// 		})
// 	} catch (error) {
// 		return res.status(400).json({
// 			message: 'Ocurrió un error al realizar la operación',
// 		})
// 	}
// }

module.exports = {
	Inventario,
}
