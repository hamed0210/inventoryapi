const { Sequelize } = require('sequelize')

const db = require('../database/database')

const Categorias = db.define(
	'categoria',
	{
		codigo: {
			type: Sequelize.UUIDV4,
			primaryKey: true,
		},
		nombre: {
			type: Sequelize.STRING,
		},
	},
	{
		timestamps: false,
	}
)

module.exports = Categorias
