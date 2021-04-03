const { Sequelize } = require('sequelize')

const db = require('../database/database')

const Ventas = db.define(
	'ventas',
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
		producto: {
			type: Sequelize.STRING,
		},
		cantidad: {
			type: Sequelize.INTEGER,
		},
		precio_unidad: {
			type: Sequelize.FLOAT,
		},
		precio_total: {
			type: Sequelize.FLOAT,
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
