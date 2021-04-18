const { request, response } = require('express')
const shortid = require('shortid')

const comprasModel = require('../models/compras.model')
const productosModel = require('../models/productos.model')
const inventarioModel = require('../models/inventario.model')

const Compras = async (req = request, res = response) => {
	try {
		const result = await comprasModel.findAll()
		if (result === '')
			return res.status(400).json({
				message: 'No se encuentró ninguna compra registrada',
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
const Compra = async (req = request, res = response) => {
	const { codigo } = req.params
	try {
		const result = await comprasModel.findByPk(codigo)

		if (!result)
			return res.status(400).json({
				message: `No se encuentró ninguna compra registrada con el código ${codigo}`,
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
const CompraCreate = async (req = request, res = response) => {
	const { id_proveedor, id_comprador, productos, precio_total } = req.body

	if (!id_proveedor || !id_comprador || !productos || !precio_total)
		return res.status(400).json({
			message: 'Por favor ingresar datos requeridos',
		})

	try {
		let newCompra = {}
		const codigo = shortid.generate()

		Promise.all([
			(newCompra = await comprasModel.create(
				{
					codigo,
					id_proveedor,
					id_comprador,
					productos,
					precio_total,
					inventario: [
						{
							codigo,
							tipo: 'Compra',
							id_usuario: id_comprador,
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
				const stockProducto = await productosModel.findByPk(el.producto, {
					attributes: ['stock'],
				})
				stockProducto &&
					(await productosModel.update(
						{
							stock: parseInt(stockProducto.stock) + parseInt(el.cantidad),
						},
						{ where: { codigo: el.producto } }
					))
			}),
		])

		return res.status(201).json({
			message: 'Nueva compra creada correctamente',
			data: newCompra,
		})
	} catch (error) {
		return res.status(400).json({
			message: 'Ocurrió un error al realizar la operación',
		})
	}
}
const CompraUpdate = async (req = request, res = response) => {
	const { codigo } = req.params
	const {
		id_proveedor,
		id_comprador,
		producto,
		cantidad,
		precio_unidad,
		precio_total,
	} = req.body

	try {
		const result = await comprasModel.findByPk(codigo)

		if (result) {
			await result.update({
				id_proveedor,
				id_comprador,
				producto,
				cantidad,
				precio_unidad,
				precio_total,
			})
		} else {
			return res.status(400).json({
				message: `La compra con código ${codigo} no se encuentra registrada`,
			})
		}

		return res.status(200).json({
			message: 'Compra actualizada correctamente',
			data: result,
		})
	} catch (error) {
		return res.status(400).json({
			message: 'Ocurrió un error al realizar la operación',
		})
	}
}
const CompraDelete = async (req = request, res = response) => {
	const { codigo } = req.params

	try {
		const result = comprasModel.destroy({
			where: {
				codigo: codigo,
			},
		})

		if (result === 0)
			return res.status(400).json({
				message: `Error al intentar eliminar compra con código ${codigo}`,
			})

		return res.status(200).json({
			message: 'Compra eliminada correctamente',
		})
	} catch (error) {
		return res.status(400).json({
			message: 'Ocurrió un error al realizar la operación',
		})
	}
}

module.exports = {
	Compras,
	Compra,
	CompraCreate,
	CompraUpdate,
	CompraDelete,
}
