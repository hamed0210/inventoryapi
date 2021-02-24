const { Sequelize } = require('sequelize')

const database = require('../database/database')

const Clientes = database.define(
	'cliente',
	{
		id: {
			type: Sequelize.INTEGER.UNSIGNED,
			primaryKey: true,
		},
		nombre: {
			type: Sequelize.STRING,
		},
		email: {
			type: Sequelize.STRING,
		},
		cel: {
			type: Sequelize.BIGINT,
		},
		dir: {
			type: Sequelize.STRING,
		},
		ciudad: {
			type: Sequelize.STRING,
		},
	},
	{
		timestamps: false,
	}
)

module.exports = Clientes
