const { request, response } = require('express')
// const uuid = require('uuid')
const shortid = require('shortid')

const categoriasModel = require('../models/categorias.model')

const Categorias = async (req = request, res = response) => {
	try {
		const result = await categoriasModel.findAll()

		if (result == '')
			return res.status(400).json({
				message: 'No se encuentra ninguna categoría registrada',
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
const Categoria = async (req = request, res = response) => {
	const { codigo } = req.params

	try {
		const result = await categoriasModel.findByPk(codigo)

		if (!result)
			return res.status(400).json({
				message: `No se encuentra ninguna categoría registrada con el código ${codigo}`,
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
const CategoriaCreate = async (req = request, res = response) => {
	const { nombre } = req.body

	if (!nombre)
		return res.status(400).json({
			message: 'Por favor ingresar datos requeridos',
		})

	try {
		const result = await categoriasModel.findOne({
			where: {
				nombre: nombre,
			},
		})

		if (result)
			return res.status(400).json({
				message: 'La categoría ya se encuentra registrada',
			})

		const newCategoria = await categoriasModel.create({
			// codigo: uuid.v4(),
			codigo: shortid.generate(),
			nombre,
		})

		return res.status(201).json({
			message: 'Nueva categoría creada correctamente',
			data: newCategoria,
		})
	} catch (error) {
		return res.status(400).json({
			message: 'Ocurrió un error al realizar la operación',
		})
	}
}
const CategoriaUpdate = async (req = request, res = response) => {
	const { codigo } = req.params
	const { nombre } = req.body

	try {
		const result = await categoriasModel.findByPk(codigo)

		if (result) {
			await result.update({
				nombre,
			})
		} else {
			return res.status(400).json({
				message: `La categoría con código ${codigo} no se encuentra registrada`,
			})
		}

		return res.status(200).json({
			message: 'Categoría actualizada correctamente',
			data: result,
		})
	} catch (error) {
		return res.status(400).json({
			message: 'Ocurrió un error al realizar la operación',
		})
	}
}
const CategoriaDelete = async (req = request, res = response) => {
	const { codigo } = req.params

	try {
		const result = await categoriasModel.destroy({
			where: {
				codigo: codigo,
			},
		})

		console.log(result)

		if (result == 0)
			return res.status(400).json({
				message: `Error al intentar eliminar categoría con código ${codigo}`,
			})

		return res.status(200).json({
			message: 'Categoría eliminada correctamente',
		})
	} catch (error) {
		return res.status(400).json({
			message:
				'Ocurrió un error al realizar la operación, es posible que el elemento este siendo usado',
		})
	}
}

module.exports = {
	Categorias,
	Categoria,
	CategoriaCreate,
	CategoriaUpdate,
	CategoriaDelete,
}
