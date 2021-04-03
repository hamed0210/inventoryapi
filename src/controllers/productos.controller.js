const { request, response } = require('express')

const productosModel = require('../models/productos.model')
const categoriasModel = require('../models/categorias.model')

const Productos = async (req = request, res = response) => {
	try {
		const result = await productosModel.findAll({
			include: {
				model: categoriasModel,
				attributes: { exclude: 'codigo' },
			},
		})
		if (result == '')
			return res.status(400).json({
				message: 'No se encontró ningún producto registrado',
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
const Producto = async (req = request, res = response) => {
	const { codigo } = req.params

	try {
		const result = await productosModel.findByPk(codigo)

		if (!result)
			return res.status(400).json({
				message: `No se encontró ningún producto registrado con el código ${codigo}`,
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

const ProductoCreate = async (req = request, res = response) => {
	const {
		codigo,
		// imagen,
		nombre,
		descripcion,
		categoria,
		stock_minimo,
		precio_venta,
		creado_por,
	} = req.body

	if (
		!codigo ||
		// !imagen ||
		!nombre ||
		!descripcion ||
		!categoria ||
		!stock_minimo ||
		!precio_venta ||
		!creado_por
	)
		return res.status(400).json({
			message: 'Por favor ingresar datos requeridos',
		})

	try {
		const result = await productosModel.findOne({
			where: {
				codigo,
			},
		})

		if (result)
			return res.status(400).json({
				message: 'El producto ya se encuentra registrado',
			})

		const newProducto = await productosModel.create({
			codigo,
			// imagen,
			nombre,
			descripcion,
			categoria,
			stock_minimo,
			precio_venta,
			creado_por,
		})

		return res.status(201).json({
			message: 'Nuevo producto creado correctamente',
			data: newProducto,
		})
	} catch (error) {
		return res.status(400).json({
			message: 'Ocurrió un error al realizar la operación',
		})
	}
}

const ProductoUpdate = async (req = request, res = response) => {
	const { codigo } = req.params
	const {
		nombre,
		// imagen,
		descipcion,
		categoria,
		stock_minimo,
		precio_venta,
		creado_por,
	} = req.body

	try {
		const result = await productosModel.findByPk(codigo)

		if (result) {
			await result.update({
				nombre,
				// imagen,
				descipcion,
				categoria,
				stock_minimo,
				precio_venta,
				creado_por,
			})
		} else {
			return res.status(400).json({
				message: `EL producto con código ${codigo} no se encuentra registrado`,
			})
		}

		return res.status(200).json({
			message: 'Producto actualizado correctamente',
			data: result,
		})
	} catch (error) {
		return res.status(400).json({
			message: 'Ocurrió un error al realizar la operación',
		})
	}
}
const ProductoDelete = async (req = request, res = response) => {
	const { codigo } = req.params

	try {
		const result = productosModel.destroy({
			where: {
				codigo: codigo,
			},
		})

		if (result == 0)
			return res.status(400).json({
				message: `Error al intentar eliminar Producto con código ${codigo}`,
			})

		return res.status(200).json({
			message: 'Producto eliminado correctamente',
		})
	} catch (error) {
		return res.status(400).json({
			message: 'Ocurrió un error al realizar la operación',
		})
	}
}

module.exports = {
	Productos,
	Producto,
	ProductoCreate,
	ProductoUpdate,
	ProductoDelete,
}
