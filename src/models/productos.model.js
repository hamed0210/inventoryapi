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
		medidas: {
			type: Sequelize.STRING,
		},
		categoria: {
			type: Sequelize.STRING,
		},
		stock: {
			type: Sequelize.INTEGER,
		},
		stock_minimo: {
			type: Sequelize.INTEGER,
		},
		// imagen: {
		// 	type: Sequelize.STRING,
		// },
		precio_venta: {
			type: Sequelize.FLOAT,
		},
		cantidad_ventas: {
			type: Sequelize.INTEGER,
		},
		creado_por: {
			type: Sequelize.INTEGER.UNSIGNED,
		},
		fecha_creacion: {
			type: Sequelize.DATE,
		},
	},
	{
		timestamps: false,
	}
)

module.exports = Productos
