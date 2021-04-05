const { request, response } = require('express')
const shortid = require('shortid')

const ventasModel = require('../models/ventas.model')
const productosModel = require('../models/productos.model')

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
	const { id_cliente, id_vendedor, productos, precio_total } = req.body

	if (!id_cliente || !id_vendedor || !productos || !precio_total)
		return res.status(400).json({
			message: 'Por favor ingresar datos requeridos',
		})

	try {
		// let newVenta = {}
		// let productosArray = []
		// let messageWarning = ''

		// const verificarStock = (result, data) => {
		// 	if (result) {
		// 		if (
		// 			parseInt(result.stock) - parseInt(data.cantidad) >
		// 			parseInt(result.stock_minimo)
		// 		) {
		// 			productosArray.push(result)
		// 		}
		// 		if (
		// 			parseInt(result.stock) - parseInt(data.cantidad) <=
		// 				parseInt(result.stock_minimo) &&
		// 			parseInt(result.stock) - parseInt(data.cantidad) > 0
		// 		) {
		// 			productosArray.push(result)
		// 			messageWarning = `El producto ${result.nombre} ${result.descripcion} se esta agotando`
		// 		}
		// 		if (parseInt(result.stock) - parseInt(data.cantidad) == 0) {
		// 			productosArray.push(result)
		// 			messageWarning = `El producto ${result.nombre} ${result.descripcion} en su stock llego a 0`
		// 		}
		// 		if (parseInt(result.stock) - parseInt(data.cantidad) < 0) {
		// 			messageWarning = `La cantidad del producto ${result.nombre} ${result.descripcion} a vender es mayor al stock almacenado`
		// 		}
		// 	}
		// }

		// Promise.all([
		// 	JSON.parse(productos).forEach(async (el) => {
		// 		productoResust = await productosModel.findByPk(el.producto, {
		// 			attributes: ['nombre', 'descripcion', 'stock', 'stock_minimo'],
		// 		})
		// 		verificarStock(productoResust, el)
		// 	}),
		// (newVenta = await ventasModel.create({
		// 	codigo: shortid.generate(),
		// 	id_cliente,
		// 	id_vendedor,
		// 	productos,
		// 	precio_total,
		// })),
		// productosArray.map((el) => {
		// 	JSON.parse(productos).map(async (element) => {
		// 		await productosModel.update(
		// 			{
		// 				stock: parseInt(el.stock) - parseInt(element.cantidad),
		// 			},
		// 			{ where: { codigo: element.producto } }
		// 		)
		// 	})
		// }),
		// ])

		const newVenta = await ventasModel.create({
			codigo: shortid.generate(),
			id_cliente,
			id_vendedor,
			productos,
			precio_total,
		})

		return res.status(201).json({
			message: 'Nueva venta creada correctamente',
			// messageWarning: messageWarning,
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
