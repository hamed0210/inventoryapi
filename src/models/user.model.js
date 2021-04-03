const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')

// const Personal = require('./personal.model')
const sequelize = require('../database/database')

const User = sequelize.define(
	'usuario',
	{
		codigo: {
			type: Sequelize.STRING,
			primaryKey: true,
		},
		email: {
			type: Sequelize.STRING,
		},
		pass: {
			type: Sequelize.CHAR(60),
		},
		role: {
			type: Sequelize.ENUM('Admin', 'User'),
		},
	},
	{
		timestamps: false,
	}
)

// User.hasOne(Personal, { foreignKey: { name: 'email_per', allowNull: false } })

User.addHook('beforeValidate', async (user, next) => {
	if (!user.changed('pass')) return next()

	const salt = await bcrypt.genSalt(10)
	const hash = await bcrypt.hash(user.pass, salt)

	user.pass = hash
})

User.comparePassword = async ({ email, pass }) => {
	const user = await User.findOne({
		where: {
			email: email,
		},
	})

	return await bcrypt.compare(pass, user.pass)
}

module.exports = User
