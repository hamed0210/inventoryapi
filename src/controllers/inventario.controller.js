const { request, response } = require('express')
// const shortid = require('shortid')

const inventarioModel = require('../models/inventario.model')
const ventasModel = require('../models/ventas.model')
const comprasModel = require('../models/compras.model')
const productosModel = require('../models/productos.model')

const Inventario = async (req = request, res = response) => {
	try {
		let result = []
		let productosList = []

		Promise.all([
			(result = await inventarioModel.findAll()),
			(productosList = await productosModel.findAll({
				attributes: ['codigo', 'nombre', 'descripcion'],
			})),
		])

		if (result === '')
			return res.status(400).json({
				message: 'No se encuentró ningun inventario registrado',
			})

		result.map((el) => {
			let productoList = []
			JSON.parse(el.productos).map((codigo) => {
				productosList.map((element) => {
					if (codigo.producto === element.codigo)
						return element.descripcion
							? productoList.push(
									`${codigo.cantidad} ${element.nombre} ${element.descripcion} `
							  )
							: productoList.push(`${codigo.cantidad} ${element.nombre}`)
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

const InventarioUpdate = async (req = request, res = response) => {
	const { codigo } = req.params
	const {
		id_proveedor,
		id_cliente,
		id_vendedor,
		id_comprador,
		productos,
		precio_total,
	} = req.body

	try {
		let resultCompra = {}
		let resultInventario = {}
		let resultVenta = {}
		let productosList = {}
		let cantPreviuosCompra = ''
		let cantPreviuosVenta = ''

		id_proveedor &&
			Promise.all([
				(resultCompra = await comprasModel.findByPk(codigo, {
					include: {
						model: inventarioModel,
					},
				})),
				(productosList = await productosModel.findAll({
					attributes: ['codigo', 'nombre', 'descripcion'],
				})),
			])

		id_cliente &&
			Promise.all([
				(resultVenta = await ventasModel.findByPk(codigo, {
					include: {
						model: inventarioModel,
					},
				})),
				(productosList = await productosModel.findAll({
					attributes: ['codigo', 'nombre', 'descripcion'],
				})),
			])

		if (resultCompra || resultVenta) {
			if (id_comprador) {
				resultInventario = resultCompra.inventario
				cantPreviuosCompra = resultCompra.productos
				Promise.all([
					await resultCompra.update({
						id_proveedor,
						id_comprador,
						productos,
						precio_total,
					}),
					await resultCompra.inventario.update({
						productos,
						precio: precio_total,
					}),
					(resultInventario.productos = productos),
					(resultInventario.precio = precio_total),
					JSON.parse(cantPreviuosCompra).forEach(async (el) => {
						const result = await productosModel.findByPk(el.producto, {
							attributes: ['stock'],
						})
						result &&
							JSON.parse(productos).forEach(async (element) => {
								if (el.producto === element.producto)
									if (el.cantidad !== element.cantidad)
										if (el.cantidad > element.cantidad)
											return await productosModel.update(
												{
													stock:
														parseInt(result.stock) -
														(parseInt(el.cantidad) -
															parseInt(element.cantidad)),
												},
												{ where: { codigo: el.producto } }
											)
										else
											return await productosModel.update(
												{
													stock:
														parseInt(result.stock) +
														Math.abs(
															parseInt(el.cantidad) - parseInt(element.cantidad)
														),
												},
												{ where: { codigo: el.producto } }
											)
							})
					}),
				])
			}

			if (id_vendedor) {
				resultInventario = resultVenta.inventario
				cantPreviuosVenta = resultVenta.productos
				Promise.all([
					await resultVenta.update({
						id_cliente,
						id_vendedor,
						productos,
						precio_total,
					}),
					await resultVenta.inventario.update({
						productos,
						precio: precio_total,
					}),
					(resultInventario.productos = productos),
					(resultInventario.precio = precio_total),
					JSON.parse(cantPreviuosVenta).forEach(async (el) => {
						const result = await productosModel.findByPk(el.producto, {
							attributes: ['stock'],
						})
						result &&
							JSON.parse(productos).forEach(async (element) => {
								if (el.producto === element.producto)
									if (el.cantidad !== element.cantidad)
										if (el.cantidad > element.cantidad)
											return await productosModel.update(
												{
													stock:
														parseInt(result.stock) +
														(parseInt(el.cantidad) -
															parseInt(element.cantidad)),
												},
												{ where: { codigo: el.producto } }
											)
										else
											return await productosModel.update(
												{
													stock:
														parseInt(result.stock) -
														Math.abs(
															parseInt(el.cantidad) - parseInt(element.cantidad)
														),
												},
												{ where: { codigo: el.producto } }
											)
							})
					}),
				])
			}
		} else {
			if (id_cliente)
				return res.status(400).json({
					message: `La venta con código ${codigo} no se encuentra registrada`,
				})
			return res.status(400).json({
				message: `La compra con código ${codigo} no se encuentra registrada`,
			})
		}

		let productoList = []
		JSON.parse(resultInventario.productos).map((codigo) => {
			productosList.map((element) => {
				if (codigo.producto === element.codigo)
					return element.descripcion
						? productoList.push(
								`${codigo.cantidad} ${element.nombre} ${element.descripcion} `
						  )
						: productoList.push(`${codigo.cantidad} ${element.nombre}`)
			})
		})
		resultInventario.productos = productoList

		for (let i = 0; i < resultInventario.productos.length; i++) {
			if (i + 1 !== resultInventario.productos.length)
				resultInventario.productos[i] = `${resultInventario.productos[i]}, `
		}

		if (id_cliente && resultInventario)
			return res.status(200).json({
				message: 'Venta actualizada correctamente',
				data: resultInventario,
			})

		if (resultInventario)
			return res.status(200).json({
				message: 'Compra actualizada correctamente',
				data: resultInventario,
			})
	} catch (error) {
		return res.status(400).json({
			message: 'Ocurrió un error al realizar la operación',
		})
	}
}

const InventaioDelete = async (req = request, res = response) => {
	const { codigo } = req.params

	try {
		const consultResult = await inventarioModel.findByPk(codigo)

		if (consultResult === '')
			return res.status(400).json({
				message: `No se encuentró inventario con id: ${codigo}`,
			})

		if (consultResult.tipo === 'Compra') {
			const resultDelete = await comprasModel.destroy({
				where: {
					codigo: consultResult.codigo_compra,
				},
			})
			if (resultDelete === 0)
				return res.status(400).json({
					message: `Error al intentar eliminar compra con código ${consultResult.codigo_compra}`,
				})

			JSON.parse(consultResult.productos).map(async (el) => {
				const result = await productosModel.findByPk(el.producto, {
					attributes: ['stock', 'cantidad_ventas'],
				})
				if (result)
					await productosModel.update(
						{
							stock: parseInt(result.stock) - parseInt(el.cantidad),
						},
						{ where: { codigo: el.producto } }
					)
			})

			return res.status(200).json({
				message: `Eliminada compra correctamente`,
			})
		}

		const resultDelete = await ventasModel.destroy({
			where: {
				codigo: consultResult.codigo_venta,
			},
		})

		if (resultDelete === 0)
			return res.status(400).json({
				message: `Error al intentar eliminar venta con código ${consultResult.codigo_venta}`,
			})

		JSON.parse(consultResult.productos).map(async (el) => {
			const result = await productosModel.findByPk(el.producto, {
				attributes: ['stock', 'cantidad_ventas'],
			})
			if (result)
				await productosModel.update(
					{
						stock: parseInt(result.stock) + parseInt(el.cantidad),
						cantidad_ventas: parseInt(result.cantidad_ventas) - 1,
					},
					{ where: { codigo: el.producto } }
				)
		})

		return res.status(200).json({
			message: `Eliminada venta correctamente`,
		})
	} catch (error) {
		return res.status(400).json({
			message: 'Ocurrió un error al realizar la operación',
		})
	}
}

module.exports = {
	Inventario,
	InventarioUpdate,
	InventaioDelete,
}
