const { Sequelize } = require('sequelize')

const db = require('../database/database')

const Productos = db.define(
	'producto',
	{
		codigo: {
			type: Sequelize.STRING,
			primaryKey: true,
		},
		nombre: {
			type: Sequelize.STRING,
		},
		descripcion: {
			type: Sequelize.TEXT,
		},
		categoria: {
			type: Sequelize.STRING,
		},
		stock: {
			type: Sequelize.INTEGER,
		},
		precio_compra: {
			type: Sequelize.INTEGER,
		},
		precio_venta: {
			type: Sequelize.INTEGER,
		},
		imagen: {
			type: Sequelize.STRING,
		},
		creado_por: {
			type: Sequelize.INTEGER.UNSIGNED,
		},
	},
	{
		timestamps: false,
	}
)

module.exports = Productos
