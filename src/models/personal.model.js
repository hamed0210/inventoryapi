const Sequelize = require('sequelize')

// const User = require('./user.model')
const sequelize = require('../database/database')

const Personal = sequelize.define(
	'persona',
	{
		id: {
			type: Sequelize.INTEGER.UNSIGNED,
			primaryKey: true,
		},
		nombres: {
			type: Sequelize.STRING,
		},
		apellidos: {
			type: Sequelize.STRING,
		},
		dir: {
			type: Sequelize.STRING,
		},
		ciudad: {
			type: Sequelize.STRING,
		},
		cel: {
			type: Sequelize.BIGINT,
		},
		id_usu: {
			type: Sequelize.INTEGER.UNSIGNED,
		},
	},
	{
		timestamps: false,
	}
)

// Personal.belongsTo(User)

module.exports = Personal
