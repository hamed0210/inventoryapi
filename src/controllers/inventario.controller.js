const { request, response } = require('express')

const ventasModel = require('../models/ventas.model')
const productosModel = require('../models/productos.model')

const Inventario = async (req = request, res = response) => {
	try {
		let result = []
		let productosList = []

		Promise.all([
			(result = await ventasModel.findAll()),
			(productosList = await productosModel.findAll({
				attributes: ['codigo', 'nombre', 'descripcion'],
			})),
		])

		result.map((el) => {
			let productoList = []
			JSON.parse(el.productos).map((codigo) => {
				productosList.map((element) => {
					if (codigo.producto === element.codigo)
						return productoList.push(`${element.nombre} ${element.descripcion}`)
				})
			})
			return (el.productos = productoList)
		})

		result.map((el) => {
			for (let i = 0; i < el.productos.length; i++) {
				if (i + 1 !== el.productos.length)
					el.productos[i] = `${el.productos[i]}, `
			}
		})

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
