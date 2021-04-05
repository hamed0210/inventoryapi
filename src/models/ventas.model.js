const { Sequelize } = require('sequelize')

const db = require('../database/database')

const Ventas = db.define(
	'sale',
	{
		codigo: {
			type: Sequelize.STRING,
			primaryKey: true,
		},
		id_cliente: {
			type: Sequelize.INTEGER.UNSIGNED,
		},
		id_vendedor: {
			type: Sequelize.INTEGER.UNSIGNED,
		},
		productos: {
			type: Sequelize.TEXT,
		},
		precio_total: {
			type: Sequelize.INTEGER,
		},
		fecha_venta: {
			type: Sequelize.DATE,
		},
	},
	{
		timestamps: false,
	}
)

module.exports = Ventas
