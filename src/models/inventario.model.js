const { Sequelize } = require('sequelize')

const db = require('../database/database')

const Compras = db.define(
	'inventario',
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
		},
		codigo_compra: {
			type: Sequelize.STRING,
		},
		codigo_venta: {
			type: Sequelize.STRING,
		},
		tipo: {
			type: Sequelize.ENUM('Compra', 'Venta'),
		},
		id_usuario: {
			type: Sequelize.INTEGER.UNSIGNED,
		},
		productos: {
			type: Sequelize.TEXT,
		},
		precio: {
			type: Sequelize.INTEGER,
		},
		fecha_creacion: {
			type: Sequelize.DATE,
		},
	},
	{
		timestamps: false,
	}
)

module.exports = Compras
