const { Sequelize } = require('sequelize')

const db = require('../database/database')

const Ventas = db.define(
	'venta',
	{
		codigo: {
			type: Sequelize.INTEGER.UNSIGNED,
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
		neto: {
			type: Sequelize.INTEGER,
		},
		total: {
			type: Sequelize.INTEGER,
		},
	},
	{
		timestamps: false,
	}
)

module.exports = Ventas
