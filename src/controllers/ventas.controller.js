const { request, response } = require('express')
const shortid = require('shortid')

const ventasModel = require('../models/ventas.model')
const productosModel = require('../models/productos.model')
const clientesModel = require('../models/clientes.model')
const inventarioModel = require('../models/inventario.model')

const Ventas = async (req = request, res = response) => {
	try {
		const result = await ventasModel.findAll()
		if (result === '')
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

	if (!Number(id_cliente))
		return res.status(400).json({
			message: 'Por favor seleccione un Cliente',
		})

	try {
		let newVenta = {}
		let clienteResult = ''
		let messageWarning = ''
		const codigo = shortid.generate()

		Promise.all([
			(newVenta = await ventasModel.create(
				{
					codigo,
					id_cliente,
					id_vendedor,
					productos,
					precio_total,
					inventario: [
						{
							codigo,
							tipo: 'Venta',
							id_usuario: id_vendedor,
							productos,
							precio: precio_total,
						},
					],
				},
				{
					include: {
						model: inventarioModel,
					},
				}
			)),
			JSON.parse(productos).map(async (el) => {
				const result = await productosModel.findByPk(el.producto, {
					attributes: [
						'nombre',
						'descripcion',
						'stock',
						'stock_minimo',
						'cantidad_ventas',
					],
				})
				if (result) {
					if (
						parseInt(result.stock) - parseInt(el.cantidad) <=
							parseInt(result.stock_minimo) &&
						parseInt(result.stock) - parseInt(el.cantidad) > 0
					) {
						messageWarning = `El producto ${result.nombre} ${result.descripcion} se esta agotando`
					}
					if (parseInt(result.stock) - parseInt(el.cantidad) == 0) {
						messageWarning = `El producto ${result.nombre} ${result.descripcion} en su stock llego a 0`
					}
					await productosModel.update(
						{
							stock: parseInt(result.stock) - parseInt(el.cantidad),
							cantidad_ventas: parseInt(result.cantidad_ventas) + 1,
						},
						{ where: { codigo: el.producto } }
					)
				}
			}),
			(clienteResult = await clientesModel.findByPk(id_cliente)),
			await clienteResult.update({
				cantidad_compras: parseInt(clienteResult.cantidad_compras) + 1,
				total_compras:
					parseInt(clienteResult.total_compras) + parseInt(precio_total),
			}),
		])

		return res.status(201).json({
			message: 'Nueva venta creada correctamente',
			messageWarning: messageWarning,
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

		if (result === 0)
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
