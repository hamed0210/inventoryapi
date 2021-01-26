const { Sequelize } = require('sequelize')

const { db } = require('../config')

const sequelize = new Sequelize(db.name, db.username, db.password, {
	dialect: 'mysql',
	host: db.uri,
	pool: {
		max: 5,
		min: 0,
		require: 30000,
		idle: 10000,
	},
	logging: false,
})

sequelize
	.authenticate()
	.then(() => {
		console.log('Conectado')
	})
	.catch((err) => {
		console.log('No se conecto')
	})

module.exports = sequelize
