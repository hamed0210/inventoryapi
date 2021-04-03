const { Sequelize } = require('sequelize')

const db = require('../database/database')

const Compras = db.define(
	'compra',
	{
		codigo: {
			type: Sequelize.STRING,
			primaryKey: true,
		},
		id_proveedor: {
			type: Sequelize.INTEGER.UNSIGNED,
		},
		id_comprador: {
			type: Sequelize.INTEGER.UNSIGNED,
		},
		productos: {
			type: Sequelize.TEXT,
		},
		precio_total: {
			type: Sequelize.FLOAT,
		},
		fecha_compra: {
			type: Sequelize.DATE,
		},
	},
	{
		timestamps: false,
	}
)

module.exports = Compras
