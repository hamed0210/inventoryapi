const { request, response } = require('express')

const categoriasModel = require('../models/categorias.model')

const Categorias = async (req = request, res = response) => {
	try {
		const result = await categoriasModel.findAll()

		if (result == '')
			return res.status(400).json({
				message: 'No se encuentra ninguna categoría registrada',
			})

		return res.json({
			data: result,
		})
	} catch (error) {
		return res.json({
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

		return res.json({
			data: result,
		})
	} catch (error) {
		return res.json({
			message: 'Ocurrió un error al realizar la operación',
		})
	}
}
const CategoriaCreate = async (req = request, res = response) => {
	const { codigo, nombre } = req.body

	if (!codigo || !nombre)
		return res.status(400).json({
			message: 'Por favor ingresar datos requeridos',
		})

	try {
		const result = await categoriasModel.findByPk(codigo)

		if (result)
			return res.status(400).json({
				message: 'La categoría ya se encuentra registrada',
			})

		const newCategoria = await categoriasModel.create({
			codigo,
			nombre,
		})

		return res.json({
			message: 'Nueva categoría creada correctamente',
			data: [newCategoria],
		})
	} catch (error) {
		return res.json({
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

		return res.json({
			message: 'Categoría actualizada correctamente',
			data: [result],
		})
	} catch (error) {
		return res.json({
			message: 'Ocurrió un error al realizar la operación',
		})
	}
}
const CategoriaDelete = async (req = request, res = response) => {
	const { codigo } = req.params

	try {
		const result = categoriasModel.destroy({
			where: {
				codigo: codigo,
			},
		})

		if (result == 0)
			return res.status(400).json({
				message: `Error al intentar eliminar categoría con código ${codigo}`,
			})

		return res.json({
			message: 'Categoría eliminada correctamente',
		})
	} catch (error) {
		return res.json({
			message: 'Ocurrió un error al realizar la operación',
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
